import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Modal } from "@mui/material";
import { CalendarMonth as CalendarMonthIcon } from "@mui/icons-material";
import { format } from "date-fns";

import { ModalStyle } from "../../../common/modalStyle/ModalStyle";
import DatePickerField from "../../../common/formFields/DatePickerField";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import {
  BookDetoxTherapy,
  GetTherapySlots,
} from "../../../../services/healingServices/detoxTherapyServices/DetoxTherapyServices";
import { errorAlert, successAlert } from "../../../common/toast/CustomToast";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useLoader } from "../../../common/commonLoader/LoaderContext";
import { SaveActivities } from "../../../../services/communityActivitiesServices/CommunityActivitiesServices";

// ─── Static Time Slots ────────────────────────────────────────────────────────
const staticTimeSlots = [
  { slotStartTime: "09:00:00", slotEndTime: "09:30:00", isAvailable: true },
  { slotStartTime: "09:30:00", slotEndTime: "10:00:00", isAvailable: true },
  { slotStartTime: "10:00:00", slotEndTime: "10:30:00", isAvailable: true },
  { slotStartTime: "10:30:00", slotEndTime: "11:00:00", isAvailable: true },
  { slotStartTime: "11:00:00", slotEndTime: "11:30:00", isAvailable: true },
  { slotStartTime: "11:30:00", slotEndTime: "12:00:00", isAvailable: true },
  { slotStartTime: "12:00:00", slotEndTime: "12:30:00", isAvailable: true },
  { slotStartTime: "12:30:00", slotEndTime: "13:00:00", isAvailable: true },
  { slotStartTime: "13:00:00", slotEndTime: "13:30:00", isAvailable: true },
  { slotStartTime: "13:30:00", slotEndTime: "14:00:00", isAvailable: true },
  { slotStartTime: "14:00:00", slotEndTime: "14:30:00", isAvailable: true },
  { slotStartTime: "14:30:00", slotEndTime: "15:00:00", isAvailable: true },
  { slotStartTime: "15:00:00", slotEndTime: "15:30:00", isAvailable: true },
  { slotStartTime: "15:30:00", slotEndTime: "16:00:00", isAvailable: true },
  { slotStartTime: "16:00:00", slotEndTime: "16:30:00", isAvailable: true },
  { slotStartTime: "16:30:00", slotEndTime: "17:00:00", isAvailable: true },
  { slotStartTime: "17:00:00", slotEndTime: "17:30:00", isAvailable: true },
  { slotStartTime: "17:30:00", slotEndTime: "18:00:00", isAvailable: true },
  { slotStartTime: "18:00:00", slotEndTime: "18:30:00", isAvailable: true },
  { slotStartTime: "18:30:00", slotEndTime: "19:00:00", isAvailable: true },
];

// ─── Validation Schema ─────────────────────────────────────────────────────────
const validationSchema = yup.object().shape({
  rescheduleDate: yup
    .date()
    .nullable()
    .required("Date is required")
    .typeError("Date is required"),
});

// ─── Helper: check if slot is in the past (only relevant when date = today) ────
function isSlotPast(slot, selectedDate) {
  if (!selectedDate) return false;
  const sel = new Date(selectedDate);
  const today = new Date();
  // Only disable past slots when the chosen date is today
  const isToday =
    sel.getFullYear() === today.getFullYear() &&
    sel.getMonth() === today.getMonth() &&
    sel.getDate() === today.getDate();
  if (!isToday) return false;

  // Compare slot end time (HH:MM:SS) with current time
  const [eh, em, es] = slot.slotEndTime.split(":").map(Number);
  const slotEnd = new Date();
  slotEnd.setHours(eh, em, es || 0, 0);
  return slotEnd <= today;
}

// ─── Time Slot Chip ────────────────────────────────────────────────────────────
function TimeSlotChip({ slot, isSelected, isPast, isBooked, onSelect }) {
  const fmt = (t) => {
    const [h, m] = t.split(":");
    let hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${m} ${ampm}`;
  };

  const disabled = isPast || isBooked;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={!disabled ? onSelect : undefined}
      title={
        isBooked
          ? "This slot is already booked"
          : isPast
            ? "This slot has already passed"
            : undefined
      }
      className={`
        w-full py-2 px-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold
        transition-all duration-200 border text-center leading-tight
        ${
          isBooked
            ? "bg-red-50 text-red-300 border-red-200 cursor-not-allowed"
            : isPast
              ? "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed line-through"
              : isSelected
                ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200 active:scale-95"
                : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/60 active:scale-95"
        }
      `}
    >
      <span className="block">{fmt(slot.slotStartTime)}</span>
      <span className="block text-[9px] opacity-70">
        {isBooked ? "Booked" : fmt(slot.slotEndTime)}
      </span>
    </button>
  );
}

export default function RescheduleOtherBookings({
  open,
  onClose,
  onConfirm,
  bookingData = {},
  populateTable,
}) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingPayload, setPendingPayload] = useState(null);
  const { setIsLoading } = useLoader();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { rescheduleDate: new Date() },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const selectedDate = watch("rescheduleDate");

  useEffect(() => {
    if (selectedSlot && isSlotPast(selectedSlot, selectedDate)) {
      setSelectedSlot(null);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (open && bookingData) {
      let tStart =
        bookingData?.time ||
        bookingData?.slotTime ||
        bookingData?.startTime ||
        bookingData?.checkIn;

      if (bookingData?.slotDetails?.length > 0) {
        const fmt = (ts) => (ts?.includes("T") ? ts.split("T")[1] : ts);
        tStart = fmt(bookingData.slotDetails[0].slotStartTime);
      }

      if (tStart) {
        const prefix = tStart.slice(0, 5);
        const found = staticTimeSlots.find((s) =>
          s.slotStartTime.startsWith(prefix),
        );
        if (found) {
          setSelectedSlot(found);
        }
      }

      const d =
        bookingData?.date ||
        bookingData?.appointmentDate ||
        bookingData?.fromDate ||
        bookingData?.visitDate ||
        bookingData?.slotDetails?.[0]?.slotDate;
      if (d) {
        const parsed = new Date(d);
        if (!isNaN(parsed)) {
          reset({ rescheduleDate: parsed });
        }
      }
    }
  }, [open, bookingData, reset]);

  const handleClose = () => {
    reset();
    setSelectedSlot(null);
    setConfirmOpen(false);
    setPendingPayload(null);
    setIsLoading(false);
    onClose?.();
  };

  console.log("bookingData", bookingData);

  const onSubmit = handleSubmit((data) => {
    const payload = {
      bookingId: bookingData?.bookingId || bookingData?.id,
      checkin: bookingData?.checkIn,
      checkOut: bookingData?.checkOut,
      visitDate: data.rescheduleDate
        ? format(new Date(data.rescheduleDate), "yyyy-MM-dd")
        : "",
      origin: bookingData?.paymentFor,
      ClinicFid: 5,
    };

    console.log("payload", payload);
    setPendingPayload(payload);
    setConfirmOpen(true);
  });

  const handleConfirmReschedule = () => {
    if (!pendingPayload) return;
    setIsLoading(true);
    SaveActivities(pendingPayload)
      .then((res) => {
        const resData = res?.data;
        if (resData?.message) {
          successAlert(resData.message);
          setConfirmOpen(false);
          handleClose();
          populateTable();
        }
      })
      .catch((err) => {
        errorAlert(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bookingId = bookingData?.bookingId || bookingData?.id || "";
  const patientName =
    bookingData?.customer ||
    bookingData?.fullName ||
    bookingData?.patientName ||
    "—";
  const currentDate = (() => {
    const d =
      bookingData?.date ||
      bookingData?.appointmentDate ||
      bookingData?.fromDate ||
      bookingData?.visitDate ||
      bookingData?.slotDetails?.[0]?.slotDate;
    if (!d) return "—";
    const parsed = new Date(d);
    return isNaN(parsed) ? d : format(parsed, "dd MMM yyyy");
  })();

  const currentTime = (() => {
    const t =
      bookingData?.time ||
      bookingData?.slotTime ||
      bookingData?.startTime ||
      bookingData?.checkIn;
    if (t) return t;
    if (bookingData?.slotDetails?.length > 0) {
      const start = bookingData.slotDetails[0].slotStartTime;
      const end = bookingData.slotDetails[0].slotEndTime;
      const fmt = (ts) => (ts?.includes("T") ? ts.split("T")[1] : ts);
      if (start && end) return `${fmt(start)} - ${fmt(end)}`;
      if (start) return fmt(start);
    }
    return "—";
  })();

  const serviceName =
    bookingData?.therapy ||
    bookingData?.therapyName ||
    bookingData?.service ||
    bookingData?.activityName ||
    bookingData?.service ||
    bookingData?.serviceName ||
    "-";

  console.log("bookingData", bookingData);

  if (!open) return null;

  return (
    <>
      <Modal open={open}>
        <Box
          sx={ModalStyle}
          className="w-[95%] max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
          style={{
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="bg-gradient-to-r from-emerald-700 to-teal-700 px-4 sm:px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
                <CalendarMonthIcon sx={{ color: "#fff", fontSize: 20 }} />
              </div>
              <div>
                <h2 className="font-bold text-sm sm:text-base text-white leading-tight">
                  Reschedule Booking
                </h2>
                <p className="text-white/65 text-[10px] mt-0.5 font-medium">
                  Choose a new date &amp; time slot
                </p>
              </div>
            </div>
            <CancelButtonModal onClick={handleClose} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2  gap-x-3 gap-y-2 px-4 sm:px-5 py-3 bg-slate-50 border-b border-slate-100 shrink-0">
            {[
              { label: "Booking ID", value: bookingId },
              { label: "Service/Therapy", value: serviceName },
              { label: "Patient", value: patientName },
              { label: "Event Date", value: currentDate },
              { label: "Event Time", value: currentTime },
            ].map(({ label, value }) => (
              <div key={label}>
                <span className="block text-[8.5px] uppercase tracking-wider text-slate-400 font-extrabold">
                  {label}
                </span>
                <span className="text-[11px] text-slate-800 font-bold truncate block">
                  {value || "-"}
                </span>
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar px-4 sm:px-5 py-4 space-y-4">
            <div className="space-y-1">
              <DatePickerField
                control={control}
                name="rescheduleDate"
                label="Select Date *"
                inputFormat="dd-MM-yyyy"
                disablePast={true}
                error={errors.rescheduleDate}
              />
              {errors.rescheduleDate && (
                <p className="text-red-500 text-[10px] font-semibold mt-0.5">
                  {errors.rescheduleDate.message}
                </p>
              )}
            </div>

            <div className="flex items-start gap-2 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-xl">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#92400e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="text-[10.5px] font-semibold text-amber-800 leading-relaxed">
                Rescheduling is subject to availability. Your previous slot will
                be released upon confirmation.
              </span>
            </div>
          </div>
          <div className="flex flex-col-reverse justify-end sm:flex-row gap-2.5 px-4 sm:px-5 py-4 border-t border-slate-100 shrink-0">
            <CommonButton
              type="button"
              label="Cancel"
              onClick={handleClose}
              className="border border-red-400 text-red-500 hover:bg-red-50 transition-all duration-200 text-xs"
            />
            <CommonButton
              type="button"
              label="Confirm Reschedule"
              onClick={onSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200 text-xs shadow-md shadow-emerald-600/20"
            />
          </div>
        </Box>
      </Modal>
      <ConfirmationModal
        confirmationOpen={confirmOpen}
        confirmationHandleClose={() => {
          setConfirmOpen(false);
        }}
        confirmationSubmitFunc={handleConfirmReschedule}
        confirmationLabel="Confirm Reschedule"
        confirmationMsg="Are you sure you want to reschedule this booking with the newly selected date and time?"
        confirmationButtonMsg="Yes, Reschedule"
      />
    </>
  );
}
