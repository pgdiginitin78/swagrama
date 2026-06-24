import { CheckPaymentStatus } from "../../../services/bookAppointment/BookAppointmentServices";

const startPaymentStatusPolling = (
  paymentWindow,
  clinicId,
  clientTxnId,
  onSuccess,
  onFailure,
) => {
  const POLL_INTERVAL = 3000;
  let timeoutId = null;
  let isStopped = false;
  let pollCount = 0;
  // Track if the window has ever navigated away from the initial blank page.
  // When the form submits, window goes cross-origin to SabPaisa.
  // After payment, it goes cross-origin to the backend callback.
  // We detect the backend callback by: window is cross-origin AND paymentStatus is Success.
  let hasBeenCrossOrigin = false;

  const poll = async () => {
    if (isStopped) return;
    pollCount++;

    // Detect if window is currently cross-origin (inaccessible location)
    let isCrossOrigin = false;
    try {
      const _ = paymentWindow?.location?.href;
      // If we can read the URL and it's not about:blank, treat as same-origin accessible
      hasBeenCrossOrigin = false; // still accessible means still on same origin
    } catch (e) {
      isCrossOrigin = true;
      hasBeenCrossOrigin = true; // once cross-origin, track it
    }

    try {
      const response = await CheckPaymentStatus(clinicId, clientTxnId);
      const status = response?.data;

      console.log(`[Poll #${pollCount}] paymentStatus: "${status?.paymentStatus}"`, status);

      if (isStopped) return;

      if (status?.status === 200 && status?.paymentStatus === "Success") {
        isStopped = true;
        if (paymentWindow && !paymentWindow.closed) {
          paymentWindow.close();
        }
        onSuccess?.(status);
        return;
      }

      if (
        status?.paymentStatus === "Failed" ||
        status?.paymentStatus === "Cancelled"
      ) {
        isStopped = true;
        if (paymentWindow && !paymentWindow.closed) {
          paymentWindow.close();
        }
        onFailure?.(status);
        return;
      }

      if (paymentWindow && paymentWindow.closed) {
        isStopped = true;
        onFailure?.({
          paymentStatus: "CancelledByUser",
          message: "Transaction cancelled by user.",
        });
        return;
      }

      // Schedule next poll only if not stopped
      if (!isStopped) {
        timeoutId = setTimeout(poll, POLL_INTERVAL);
      }
    } catch (error) {
      if (isStopped) return;
      isStopped = true;
      if (paymentWindow && !paymentWindow.closed) {
        paymentWindow.close();
      }
      onFailure?.(error);
    }
  };

  timeoutId = setTimeout(poll, POLL_INTERVAL);

  return () => {
    isStopped = true;
    if (timeoutId) clearTimeout(timeoutId);
  };
};

export const RedirectToSabPaisa = (
  data,
  clinicId,
  clientTxnId,
  onSuccess,
  onFailure,
) => {
  const paymentWindow = window.open("", "_blank");

  console.log("paymentWindow",paymentWindow)

  if (!paymentWindow) {
    onFailure?.({
      message: "Payment window was blocked by the browser. Please allow popups.",
    });
    return () => {};
  }

  const form = paymentWindow.document.createElement("form");
  form.method = "POST";
  form.action = data.sabPaisaUrl;

  const encData = paymentWindow.document.createElement("input");
  encData.type = "hidden";
  encData.name = "encData";
  encData.value = data.encData;

  const clientCode = paymentWindow.document.createElement("input");
  clientCode.type = "hidden";
  clientCode.name = "clientCode";
  clientCode.value = data.clientCode;

  form.appendChild(encData);
  form.appendChild(clientCode);

  paymentWindow.document.body.appendChild(form);
  form.submit();

  const interval = startPaymentStatusPolling(
    paymentWindow,
    clinicId,
    clientTxnId,
    onSuccess,
    onFailure,
  );

  return () => {
    if (interval) clearInterval(interval);
    if (paymentWindow && !paymentWindow.closed) {
      paymentWindow.close();
    }
  };
};
