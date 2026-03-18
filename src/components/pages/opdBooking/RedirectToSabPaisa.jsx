import { CheckPaymentStatus } from "../../../services/bookAppointment/BookAppointmentServices";

const startPaymentStatusPolling = (
  paymentWindow,
  clinicId,
  clientTxnId,
  onSuccess,
  onFailure,
) => {
  const POLL_INTERVAL = 1000;

  const interval = setInterval(async () => {
    try {
      const response = await CheckPaymentStatus(clinicId, clientTxnId);
      const status = response?.data;

      if (
        status?.status === 200 &&
        status?.paymentStatus === "Success" &&
        status?.isUsed === false
      ) {
        clearInterval(interval);

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
        clearInterval(interval);

        if (paymentWindow && !paymentWindow.closed) {
          paymentWindow.close();
        }

        onFailure?.(status);
        return;
      }

      if (paymentWindow && paymentWindow.closed) {
        clearInterval(interval);
        onFailure?.({
          paymentStatus: "CancelledByUser",
          message: "Transaction cancelled by user.",
        });
        return;
      }
    } catch (error) {
      clearInterval(interval);

      if (paymentWindow && !paymentWindow.closed) {
        paymentWindow.close();
      }

      onFailure?.(error);
    }
  }, POLL_INTERVAL);

  return interval;
};

export const RedirectToSabPaisa = (
  data,
  clinicId,
  clientTxnId,
  onSuccess,
  onFailure,
) => {
  const paymentWindow = window.open("", "_blank");

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
