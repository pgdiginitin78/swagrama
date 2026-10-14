import { CheckPaymentStatus } from "../../../services/bookAppointment/BookAppointmentServices";

// ============================================================
// Configuration
// ============================================================

const POLL_INTERVAL = 2500;
const INITIAL_POLL_DELAY = 2000;
const MAX_POLL_COUNT = 150;

// These must be the origins serving your C# PaymentCallback HTML.
// The CheckPaymentStatus API and callback page can share this origin.
const ALLOWED_CALLBACK_ORIGINS = new Set([
  "https://ayurmitra.in",
  "https://www.ayurmitra.in",
]);

const SUCCESS_STATUSES = new Set(["success"]);

const FAILURE_STATUSES = new Set([
  "failed",
  "failure",
  "cancelled",
  "canceled",
  "rejected",
  "declined",
  "expired",
]);

const SUPPORTED_MESSAGE_TYPES = new Set([
  "SABPAISA_PAYMENT_RESPONSE",
  "PAYMENT_COMPLETE",
  "PAYMENT_SUCCESS",
]);

// ============================================================
// Helpers
// ============================================================

const getPaymentStatus = (data) => {
  const candidates = [
    data?.paymentStatus,
    data?.data?.paymentStatus,
    data?.result?.paymentStatus,
    data?.transaction?.paymentStatus,
    data?.status,
    data?.data?.status,
    data?.result?.status,
  ];

  const value = candidates.find(
    (item) => typeof item === "string" && item.trim() !== "",
  );

  return value ? value.trim().toLowerCase() : "";
};

const closePaymentWindow = (paymentWindow) => {
  if (!paymentWindow) return;

  try {
    if (!paymentWindow.closed) {
      paymentWindow.close();
    }
  } catch (error) {
    // Browsers may restrict window access or closing.
    console.warn("Could not close payment window:", error);
  }
};

const focusBookingWindow = () => {
  try {
    window.focus();
  } catch (error) {
    // Focusing another window can be restricted by the browser.
  }
};

const noop = () => {};

// ============================================================
// Payment status polling
// ============================================================

const startPaymentStatusPolling = (
  paymentWindow,
  clinicId,
  clientTxnId,
  onSuccess,
  onFailure,
) => {
  let timeoutId = null;
  let isStopped = false;
  let isChecking = false;
  let pollCount = 0;
  let consecutiveErrors = 0;
  let immediateCheckRequested = false;

  const cleanup = () => {
    if (isStopped) return;

    isStopped = true;

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    window.removeEventListener("focus", handleUserReturn);
    window.removeEventListener("message", handleMessage);

    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };

  const finishSuccess = (data) => {
    if (isStopped) return;

    cleanup();
    closePaymentWindow(paymentWindow);
    focusBookingWindow();

    try {
      onSuccess?.(data);
    } catch (error) {
      console.error("Payment success callback failed:", error);
    }
  };

  const finishFailure = (data) => {
    if (isStopped) return;

    cleanup();
    closePaymentWindow(paymentWindow);
    focusBookingWindow();

    try {
      onFailure?.(data);
    } catch (error) {
      console.error("Payment failure callback failed:", error);
    }
  };

  const scheduleCheck = (delay) => {
    if (isStopped) return;

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      void checkStatus();
    }, delay);
  };

  const checkStatus = async () => {
    if (isStopped) return;

    // Avoid overlapping API requests.
    if (isChecking) {
      immediateCheckRequested = true;
      return;
    }

    if (pollCount >= MAX_POLL_COUNT) {
      finishFailure({
        paymentStatus: "Timeout",
        message:
          "Payment verification timed out. If money was deducted, " +
          "check the booking status before attempting another payment.",
      });

      return;
    }

    isChecking = true;
    pollCount++;

    try {
      const response = await CheckPaymentStatus(clinicId, clientTxnId);

      if (isStopped) return;

      // Axios response.data is normally the API response body.
      const data = response?.data ?? response;
      const paymentStatus = getPaymentStatus(data);

      consecutiveErrors = 0;

      console.log(
        `[Payment Poll #${pollCount}] Payment status:`,
        paymentStatus || "Pending / Unknown",
      );

      // Success is accepted only when the backend confirms it.
      if (SUCCESS_STATUSES.has(paymentStatus)) {
        finishSuccess(data);
        return;
      }

      // Explicit terminal failure from the status API.
      if (FAILURE_STATUSES.has(paymentStatus)) {
        const failureData =
          data && typeof data === "object"
            ? {
                ...data,
                paymentStatus: data.paymentStatus ?? paymentStatus,
              }
            : {
                paymentStatus,
                response: data,
              };

        finishFailure(failureData);
        return;
      }

      // Pending or unknown response:
      // keep polling until a final status or timeout.
    } catch (error) {
      if (isStopped) return;

      consecutiveErrors++;

      console.warn(
        `[Payment Poll #${pollCount}] API request failed. ` +
          `Consecutive errors: ${consecutiveErrors}`,
        error,
      );

      // Retry transient errors rather than prematurely failing.
      // MAX_POLL_COUNT still limits the overall polling duration.
    } finally {
      isChecking = false;

      if (!isStopped) {
        const nextDelay = immediateCheckRequested ? 0 : POLL_INTERVAL;

        immediateCheckRequested = false;
        scheduleCheck(nextDelay);
      }
    }
  };

  // ==========================================================
  // Trigger an immediate status check
  // ==========================================================

  const requestImmediateCheck = () => {
    if (isStopped) return;

    if (isChecking) {
      immediateCheckRequested = true;
      return;
    }

    scheduleCheck(0);
  };

  const handleUserReturn = () => {
    if (isStopped) return;

    console.log("Booking page is active. Checking payment status...");

    requestImmediateCheck();
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      handleUserReturn();
    }
  };

  // ==========================================================
  // Payment callback message listener
  // ==========================================================

  const handleMessage = (event) => {
    if (isStopped) return;

    // Verify the origin of the C# callback page.
    if (!ALLOWED_CALLBACK_ORIGINS.has(event.origin)) {
      return;
    }

    // If available, verify that the message came from our popup.
    if (paymentWindow && event.source !== paymentWindow) {
      return;
    }

    const payload = event.data;

    if (!payload || typeof payload !== "object") {
      return;
    }

    if (!SUPPORTED_MESSAGE_TYPES.has(payload.type)) {
      return;
    }

    // Prevent messages for a different transaction from triggering
    // this payment flow.
    if (
      payload.clientTxnId != null &&
      String(payload.clientTxnId) !== String(clientTxnId)
    ) {
      return;
    }

    console.log(
      "[Payment Callback] Result message received. " +
        "Verifying the result through the backend.",
    );

    // Do not trust the popup message alone to declare success
    // or failure. The status API remains authoritative.
    requestImmediateCheck();
  };

  if (
    clinicId == null ||
    String(clinicId).trim() === "" ||
    !clientTxnId ||
    String(clientTxnId).trim() === ""
  ) {
    finishFailure({
      paymentStatus: "InvalidRequest",
      message: "Clinic ID or payment transaction ID is missing.",
    });

    return cleanup;
  }

  window.addEventListener("focus", handleUserReturn);

  document.addEventListener("visibilitychange", handleVisibilityChange);

  window.addEventListener("message", handleMessage);

  // Perform the first check after a short delay.
  scheduleCheck(INITIAL_POLL_DELAY);

  return cleanup;
};

// ============================================================
// Start SabPaisa payment
// ============================================================

export const RedirectToSabPaisa = (
  data,
  clinicId,
  clientTxnId,
  onSuccess,
  onFailure,
) => {
  const paymentDetails =
    data?.data && typeof data.data === "object" ? data.data : data;

  const targetTxnId =
    clientTxnId ?? paymentDetails?.clientTxnId ?? data?.clientTxnId;

  const targetClinicId = clinicId ?? paymentDetails?.clinicId ?? data?.clinicId;

  // Do not silently use another clinic ID.
  if (
    targetClinicId == null ||
    String(targetClinicId).trim() === "" ||
    !targetTxnId ||
    String(targetTxnId).trim() === ""
  ) {
    onFailure?.({
      paymentStatus: "InvalidRequest",
      message:
        "The clinic ID or transaction ID is missing. " + "Please try again.",
    });

    return noop;
  }

  // Validate the payment gateway URL and required form fields.
  let paymentUrl;

  try {
    paymentUrl = new URL(paymentDetails?.sabPaisaUrl);

    if (paymentUrl.protocol !== "https:") {
      throw new Error("The payment gateway must use HTTPS.");
    }
  } catch (error) {
    onFailure?.({
      paymentStatus: "InvalidRequest",
      message: "The payment gateway URL is invalid.",
    });

    return noop;
  }

  const encData = paymentDetails?.encData;
  const clientCode = paymentDetails?.clientCode;

  if (
    typeof encData !== "string" ||
    !encData.trim() ||
    typeof clientCode !== "string" ||
    !clientCode.trim()
  ) {
    onFailure?.({
      paymentStatus: "InvalidRequest",
      message: "Required payment gateway information is missing.",
    });

    return noop;
  }

  // Open the popup synchronously, ideally from the user's click event,
  // to reduce the chance of the browser blocking it.
  let paymentWindow = null;

  try {
    paymentWindow = window.open("about:blank", "_blank");
  } catch (error) {
    console.warn("Could not open payment window:", error);
  }

  if (!paymentWindow) {
    onFailure?.({
      paymentStatus: "PopupBlocked",
      message:
        "The payment window was blocked. Please allow popups " +
        "for ayurmitra.in and try again.",
    });

    return noop;
  }

  let formSubmitted = false;

  try {
    const popupDocument = paymentWindow.document;

    const form = popupDocument.createElement("form");

    form.method = "POST";
    form.action = paymentUrl.href;
    form.acceptCharset = "UTF-8";

    const fields = {
      encData,
      clientCode,
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = popupDocument.createElement("input");

      input.type = "hidden";
      input.name = name;
      input.value = value;

      form.appendChild(input);
    });

    if (!popupDocument.body) {
      throw new Error("Payment window document is not ready.");
    }

    popupDocument.body.appendChild(form);
    form.submit();

    formSubmitted = true;
  } catch (error) {
    console.error("Could not submit SabPaisa form:", error);

    closePaymentWindow(paymentWindow);

    onFailure?.({
      paymentStatus: "InitializationFailed",
      message: "Unable to start the payment gateway. Please try again.",
    });

    return noop;
  }

  if (!formSubmitted) {
    closePaymentWindow(paymentWindow);
    return noop;
  }

  console.log("[Payment Initiated]", {
    clinicId: targetClinicId,
    transactionReady: Boolean(targetTxnId),
  });

  const stopPolling = startPaymentStatusPolling(
    paymentWindow,
    targetClinicId,
    targetTxnId,
    onSuccess,
    onFailure,
  );

  // Call this returned function if the booking component unmounts
  // or the user explicitly cancels the payment flow.
  return () => {
    stopPolling();
    closePaymentWindow(paymentWindow);
  };
};
