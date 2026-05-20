import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputArea from "../../../common/formFields/InputArea";
import { RefundPayment } from "../../../../services/communityActivitiesServices/CommunityActivitiesServices";
import { useAuth } from "../../../../context/AuthContext";
import { useLoader } from "../../../common/commonLoader/LoaderContext";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import { successAlert ,errorAlert} from "../../../common/toast/CustomToast";

const schema = yup.object().shape({
  RefundReason: yup
    .string()
    .required("Refund reason is required")
    .min(3, "Min 3 characters"),
});

const PaymentRefundDialog = ({
  open,
  onClose,
  onConfirm,
  bookingData = {},
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { RefundReason: "" },
    mode: "onChange",
  });
  const { user } = useAuth();
  const { isLoading, setIsLoading } = useLoader();

  console.log("bookingData", bookingData);

  const handleConfirm = handleSubmit((data) => {
    setIsLoading(true);
    const payload = {
      userId: bookingData?.userId,
      BookingId: bookingData?.bookingId,
      Amount: bookingData?.amount || bookingData?.totalAmount || 0,
      RefundBy: user?.userId,
      RefundReason: data?.RefundReason,
      PaymentFor: bookingData?.type || bookingData?.paymentFor,
      role: user?.role,
      clinicFid: 5,
    };

    RefundPayment(payload)
      .then((res) => {
        setIsLoading(false);
        const refundResponse=JSON.parse(res?.data?.refundResponse)
        if (refundResponse?.message) {
          successAlert(refundResponse?.message);
          onConfirm?.(data);       
          handleClose()
        }
      })
      .catch((error) => {
        setIsLoading(false);
        errorAlert(error?.message);
      });
  });

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const formattedDate = (() => {
    const raw =
      bookingData?.date ||
      bookingData?.fromDate ||
      bookingData?.appointmentDate ||
      bookingData?.checkInDate ||
      bookingData?.checkIn;

    if (!raw) return "—";

    const d = new Date(raw);

    return isNaN(d)
      ? raw
      : d.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  })();

  const formattedAmount = bookingData?.amount
    ? `₹ ${Number(bookingData?.amount || bookingData?.totalAmount || 0).toLocaleString("en-IN")}`
    : "—";

  const activityName =
    bookingData?.title ||
    bookingData?.name ||
    bookingData?.serviceName ||
    bookingData?.service ||
    bookingData?.room;

  const summaryRows = [
    { label: "Booking ID", value: bookingData?.bookingId || "—" },
    {
      label: "Type",
      value: bookingData?.type || bookingData?.paymentFor || "—",
    },
    { label: "Activity", value: activityName },
    { label: "Date", value: formattedDate },
    {
      label: "Status",
      value: bookingData?.status || bookingData?.bookingStatus || "",
    },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="relative z-10 w-full sm:max-w-md bg-white flex flex-col sm:rounded-2xl sm:shadow-2xl sm:mx-4 max-h-screen sm:max-h-[90vh] rounded-t-2xl shadow-xl">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-md bg-red-50  flex items-center justify-center flex-shrink-0">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <div>
              <p className="text-[0.95rem] sm:text-base font-bold text-slate-900 leading-tight">
                Payment Refund
              </p>
              <p className="text-[0.7rem] text-slate-400 font-medium mt-0.5">
                Review &amp; submit refund request
              </p>
            </div>
          </div>

          <CancelButtonModal onClick={handleClose} />
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-4 sm:px-6 py-4 sm:py-5 space-y-4">
          <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-3.5 py-2.5 border-b border-slate-200 bg-slate-100">
              <span className="text-[0.625rem] font-extrabold text-slate-400 tracking-widest uppercase">
                Booking Summary
              </span>
            </div>

            <div className="px-3.5 py-3 flex flex-col gap-2.5">
              {summaryRows.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-center gap-2 flex-wrap"
                >
                  <span className="text-xs font-medium text-slate-500">
                    {label}
                  </span>
                  <span className="text-xs font-semibold text-slate-800 break-all">
                    {value}
                  </span>
                </div>
              ))}

              <div className="flex justify-between items-center gap-2 pt-2.5 mt-0.5 border-t border-slate-200">
                <span className="text-[0.8rem] font-semibold text-slate-500">
                  Amount Paid
                </span>
                <span className="text-base font-extrabold text-green-600">
                  {formattedAmount}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[0.625rem] font-extrabold text-slate-400 tracking-widest uppercase">
              Refund Reason
            </span>
            <InputArea
              control={control}
              name="RefundReason"
              label="Describe the reason for this refund"
              minRows={4}
              maxRows={7}
              errors={errors.RefundReason}
            />
          </div>

          <div className="flex items-start gap-2 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-xl">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#882e2e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 flex-shrink-0"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className="text-[0.72rem] font-semibold text-ayuBrown leading-relaxed">
              Refunds are typically processed within 5–7 business days to your
              original payment method.
            </span>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 px-4 sm:px-6 py-4 sm:py-4 border-t border-slate-100 flex-shrink-0">
          <button
            onClick={handleConfirm}
            className="w-full sm:flex-1 rounded py-3 text-sm font-bold text-white bg-green-500 hover:bg-green-600 active:scale-[0.98] transition-all shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_18px_rgba(37,99,235,0.4)]"
          >
            Request Refund
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentRefundDialog;
