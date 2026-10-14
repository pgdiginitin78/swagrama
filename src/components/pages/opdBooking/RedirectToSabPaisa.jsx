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

  let hasBeenCrossOrigin = false;

  const poll = async () => {
    if (isStopped) return;
    pollCount++;

    let isCrossOrigin = false;
    try {
      const _ = paymentWindow?.location?.href;

      hasBeenCrossOrigin = false;
    } catch (e) {
      isCrossOrigin = true;
      hasBeenCrossOrigin = true;
    }

    try {
      const response = await CheckPaymentStatus(clinicId, clientTxnId);
      const status = response?.data;

      console.log(
        `[Poll #${pollCount}] paymentStatus: "${status?.paymentStatus}"`,
        status,
      );

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

  console.log("paymentWindow", paymentWindow);

  if (!paymentWindow) {
    onFailure?.({
      message:
        "Payment window was blocked by the browser. Please allow popups.",
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
