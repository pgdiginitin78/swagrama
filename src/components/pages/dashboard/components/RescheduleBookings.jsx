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
function TimeSlotChip({ slot, isSelected, isPast, onSelect }) {
  const fmt = (t) => {
    const [h, m] = t.split(":");
    let hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${m} ${ampm}`;
  };

  return (
    <button
      type="button"
      disabled={isPast}
      onClick={!isPast ? onSelect : undefined}
      title={isPast ? "This slot has already passed" : undefined}
      className={`
        w-full py-2 px-1.5 rounded-lg text-[10px] sm:text-[11px] font-semibold
        transition-all duration-200 border text-center leading-tight
        ${
          isPast
            ? "bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed line-through"
            : isSelected
              ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200 active:scale-95"
              : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/60 active:scale-95"
        }
      `}
    >
      <span className="block">{fmt(slot.slotStartTime)}</span>
      <span className="block text-[9px] opacity-70">
        {fmt(slot.slotEndTime)}
      </span>
    </button>
  );
}

export default function RescheduleBookings({
  open,
  onClose,
  onConfirm,
  bookingData = {},
}) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotError, setSlotError] = useState("");

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

  const handleClose = () => {
    reset();
    setSelectedSlot(null);
    setSlotError("");
    onClose?.();
  };

  const onSubmit = handleSubmit((data) => {
    if (!selectedSlot) {
      setSlotError("Please select a time slot");
      return;
    }

    const payload = {
      bookingId: bookingData?.bookingId || bookingData?.id,
      rescheduleDate: data.rescheduleDate
        ? format(new Date(data.rescheduleDate), "yyyy-MM-dd")
        : "",
      slotStartTime: selectedSlot.slotStartTime,
      slotEndTime: selectedSlot.slotEndTime,
    };

    onConfirm?.(payload);
    handleClose();
  });

  const bookingId = bookingData?.bookingId || bookingData?.id || "—";
  const patientName =
    bookingData?.customer ||
    bookingData?.fullName ||
    bookingData?.patientName ||
    "—";
  const currentDate = (() => {
    const d =
      bookingData?.date ||
      bookingData?.appointmentDate ||
      bookingData?.fromDate;
    if (!d) return "—";
    const parsed = new Date(d);
    return isNaN(parsed) ? d : format(parsed, "dd MMM yyyy");
  })();
  const currentTime =
    bookingData?.time || bookingData?.slotTime || bookingData?.startTime || "—";

  if (!open) return null;

  return (
    <Modal open={open}>
      <Box
        sx={ModalStyle}
        className="w-[95%] max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
        style={{ maxHeight: "90vh", display: "flex", flexDirection: "column" }}
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

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-2 px-4 sm:px-5 py-3 bg-slate-50 border-b border-slate-100 shrink-0">
          {[
            { label: "Booking ID", value: bookingId },
            { label: "Patient", value: patientName },
            { label: "Current Date", value: currentDate },
            { label: "Current Time", value: currentTime },
          ].map(({ label, value }) => (
            <div key={label}>
              <span className="block text-[8.5px] uppercase tracking-wider text-slate-400 font-extrabold">
                {label}
              </span>
              <span className="text-[11px] text-slate-800 font-bold truncate block">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-4 sm:px-5 py-4 space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
              New Date <span className="text-red-500">*</span>
            </label>
            <DatePickerField
              control={control}
              name="rescheduleDate"
              label="Select Date"
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

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                Select Time Slot <span className="text-red-500">*</span>
              </label>
              {selectedSlot && (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ✓ Selected
                </span>
              )}
            </div>

            <div className="bg-slate-50 rounded-xl border border-slate-200 p-3">
              <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                Morning · AM
              </p>
              {(() => {
                const amSlots = staticTimeSlots.filter(
                  (s) => parseInt(s.slotStartTime) < 12,
                );
                return (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
                    {amSlots.map((slot, i) => {
                      const past = isSlotPast(slot, selectedDate);
                      return (
                        <TimeSlotChip
                          key={i}
                          slot={slot}
                          isSelected={
                            selectedSlot?.slotStartTime === slot.slotStartTime
                          }
                          isPast={past}
                          onSelect={() => {
                            setSelectedSlot(slot);
                            setSlotError("");
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })()}

              <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 pt-2 border-t border-slate-200">
                Afternoon &amp; Evening · PM
              </p>
              {(() => {
                const pmSlots = staticTimeSlots.filter(
                  (s) => parseInt(s.slotStartTime) >= 12,
                );
                return (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {pmSlots.map((slot, i) => {
                      const past = isSlotPast(slot, selectedDate);
                      return (
                        <TimeSlotChip
                          key={i}
                          slot={slot}
                          isSelected={
                            selectedSlot?.slotStartTime === slot.slotStartTime
                          }
                          isPast={past}
                          onSelect={() => {
                            setSelectedSlot(slot);
                            setSlotError("");
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {slotError && (
              <p className="text-red-500 text-[10px] font-semibold">
                {slotError}
              </p>
            )}

            {selectedSlot && (
              <div className="flex items-center justify-between p-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                <div>
                  <span className="block text-[8px] font-bold text-emerald-600 uppercase tracking-wider">
                    Selected Slot
                  </span>
                  <span className="text-[12px] font-extrabold text-emerald-800">
                    {selectedSlot.slotStartTime} – {selectedSlot.slotEndTime}
                  </span>
                </div>
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
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
        <div className="flex flex-col-reverse sm:flex-row gap-2.5 px-4 sm:px-5 py-4 border-t border-slate-100 shrink-0">
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
            className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200 text-xs shadow-md shadow-emerald-600/20 flex-1"
          />
        </div>
      </Box>
    </Modal>
  );
}
