import { yupResolver } from "@hookform/resolvers/yup";
import {
  AccessTime as AccessTimeIcon,
  CalendarMonth as CalendarMonthIcon,
} from "@mui/icons-material";
import { Box, Divider, Modal } from "@mui/material";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useAuth } from "../../../context/AuthContext";
import {
  bookAppointment
} from "../../../services/bookAppointment/BookAppointmentServices";
import { useLoader } from "../../common/commonLoader/LoaderContext";

import {
  BookDetoxTherapy,
  GetTherapySlots
} from "../../../services/healingServices/detoxTherapyServices/DetoxTherapyServices";
import CancelButtonModal from "../../common/button/CancelButtonModal";
import CommonButton from "../../common/button/CommonButton";
import DatePickerField from "../../common/formFields/DatePickerField";
import { ModalStyle } from "../../common/modalStyle/ModalStyle";
import { errorAlert, successAlert } from "../../common/toast/CustomToast";

function TimeSlotChip({ slot, isSelected, onSelect, isPast }) {
  const isDisabled = isPast || slot.isAvailable === false || slot.count === 0;

  return (
    <motion.button
      whileHover={isDisabled ? {} : { y: -1 }}
      whileTap={isDisabled ? {} : { scale: 0.97 }}
      type="button"
      onClick={onSelect}
      disabled={isDisabled}
      className={`
    relative w-full px-2 py-1.5 rounded-lg text-[10px] font-medium
    flex items-center justify-between gap-2 border
    transition-all duration-150
    ${isSelected
          ? "bg-emerald-500 border-emerald-500 text-white"
          : isDisabled
            ? "bg-slate-100 border-slate-200 text-slate-400"
            : "bg-white border-slate-300 text-slate-800 hover:border-emerald-400"
        }
    disabled:opacity-60 disabled:cursor-not-allowed
  `}
    >
      <span className="whitespace-normal leading-tight text-left">
        {slot?.slotStartTime} - {slot?.slotEndTime}
      </span>
    </motion.button>
  );
}

const validationSchema = yup.object().shape({
  appointmentDate: yup
    .date()
    .nullable()
    .required("Date is required")
    .typeError("Date is required"),
});

const generateTimeSlots = (durationInMinutes) => {
  const duration = parseInt(durationInMinutes) || 30;
  const slots = [];
  let currentMinutes = 9 * 60; // 9:00 AM
  const endMinutes = 19 * 60; // 7:00 PM

  while (currentMinutes + duration <= endMinutes) {
    const startH = Math.floor(currentMinutes / 60);
    const startM = currentMinutes % 60;
    const endMins = currentMinutes + duration;
    const endH = Math.floor(endMins / 60);
    const endM = endMins % 60;

    const formatTimeStr = (h, m) =>
      `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`;

    slots.push({
      slotStartTime: formatTimeStr(startH, startM),
      slotEndTime: formatTimeStr(endH, endM),
      isAvailable: true,
    });

    currentMinutes += duration;
  }
  return slots;
};

export default function RescheduleTherapy({
  open,
  onClose,
  bookingData,
  onSuccess,
  onRescheduleSuccess,
}) {
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [slotError, setSlotError] = useState("");

  const [bookedSlots, setBookedSlots] = useState([]);
  const [therapySlots, setTherapySlots] = useState(() =>
    generateTimeSlots(bookingData?.duration),
  );


  const { user } = useAuth();
  const { setIsLoading } = useLoader();

  console.log("bookingData", bookingData);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      therapyId: null,
      appointmentDate: new Date(),
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const therapyValue = watch("therapyId");
  const appointmentDate = watch("appointmentDate");

  useEffect(() => {
    if (!open || !bookingData) return;

    setValue("appointmentDate", new Date(bookingData?.date || new Date()));
    if (bookingData?.slotTime) {
      const [start, end] = bookingData?.slotTime.split("-");
      setSelectedTimeSlot({
        slotStartTime: start?.trim(),
        slotEndTime: end?.trim(),
      });
    } else if (bookingData?.startTime) {
      setSelectedTimeSlot({
        slotStartTime: bookingData?.startTime,
        slotEndTime: bookingData?.endTime,
      });
    }
  }, [open, bookingData, setValue]);

  const handleReschedule = handleSubmit((data) => {
    if (!selectedTimeSlot) {
      setSlotError("Please select a time slot");
      return;
    }

    const formattedDate =
      data.appointmentDate && !isNaN(new Date(data.appointmentDate).getTime())
        ? format(new Date(data.appointmentDate), "yyyy-MM-dd")
        : "";

    const newPayload = {
      TherapyBookingId: bookingData?.bookingId,
      ClinicFid: 5,
      RescheduledBy: bookingData?.userId,
      FromDate: formattedDate,
      ToDate: formattedDate,
      ServiceFid: bookingData?.serviceId,
      UserId: user?.userId,
      Slots: [
        {
          SlotDate: formattedDate,
          SlotStart: selectedTimeSlot?.slotStartTime,
          SlotEnd: selectedTimeSlot?.slotEndTime,
        },
      ],
    };

    setIsLoading(true);
    BookDetoxTherapy(newPayload)
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.statusCode === 200) {
          successAlert(res.data.message);
          onSuccess?.();
          onClose();
          onRescheduleSuccess();
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Reschedule error:", err);
        errorAlert("An error occurred while rescheduling the therapy");
      });
  });

  useEffect(() => {
    if (appointmentDate !== null) {
      setLoadingSlots(true);
      if (bookingData?.date) {
        const formattedDate = format(appointmentDate, "yyyy-MM-dd");
        GetTherapySlots(formattedDate, bookingData?.serviceId, formattedDate, 5)
          .then((res) => {
            console.log("slotsData", res?.data.data);
            setBookedSlots(res.data.data);
            setLoadingSlots(false);
          })
          .catch((err) => {
            setBookedSlots([]);
            setLoadingSlots(false);
          });
      }
    }
  }, [bookingData, appointmentDate]);

  console.log("services", therapySlots);

  if (!open) return null;

  return (
    <Modal open={open}>
      <Box
        sx={ModalStyle}
        className="w-[95%] h-[80%] xl:h-[80%] 2xl:h-[60%] max-w-2xl rounded-xl bg-white border shadow-2xl overflow-y-auto no-scrollbar"
      >
        <div className="bg-gradient-to-br from-emerald-800 to-teal-800 px-5 py-4 relative text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <CalendarMonthIcon sx={{ color: "#fff", fontSize: 22 }} />
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight">
                Reschedule Therapy
              </h2>
              <p className="text-white/70 text-[10.5px] mt-0.5 font-medium">
                Update date, therapy, or time slot
              </p>
            </div>
          </div>
          <CancelButtonModal onClick={onClose} />
        </div>
        <div className="p-4 bg-slate-50 border-b border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-medium text-slate-600">
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">
              Booking ID
            </span>
            <span className="text-slate-800 font-bold">
              {bookingData?.bookingId || "—"}
            </span>
          </div>
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">
              Patient
            </span>
            <span className="text-slate-800 font-bold truncate block">
              {bookingData?.customer || bookingData?.userName || "—"}
            </span>
          </div>
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">
              Current Date
            </span>
            <span className="text-slate-800 font-bold">
              {(() => {
                const dateVal =
                  bookingData?.date || bookingData?.appointmentDate;
                if (!dateVal) return "—";
                const d = new Date(dateVal);
                return isNaN(d) ? dateVal : format(d, "dd MMM yyyy");
              })()}
            </span>
          </div>
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-extrabold">
              Slot Time
            </span>
            <span className="text-slate-800 font-bold">
              {bookingData?.time || bookingData?.startTime || "—"}
            </span>
          </div>
        </div>

        <form onSubmit={handleReschedule} className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[12px] font-bold text-slate-700 mb-1 block">
                  Therapy Name
                </label>
                <div className="w-full bg-slate-100/70 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-700 font-bold text-sm shadow-inner truncate">
                  {bookingData?.therapyName ||
                    bookingData?.TherapyName ||
                    bookingData?.name ||
                    bookingData?.title ||
                    "—"}
                </div>
              </div>

              <div className="space-y-1">
                <DatePickerField
                  control={control}
                  name="appointmentDate"
                  label="Date *"
                  inputFormat="dd-MM-yyyy"
                  disablePast={true}
                  error={errors.appointmentDate}
                />
              </div>
            </div>

            {/* Right side: Available Time Slots */}
            <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100 flex flex-col min-h-[180px]">
              <label className="text-[10px] font-black text-slate-400  tracking-widest block mb-2 flex items-center gap-1.5">
                <AccessTimeIcon
                  sx={{ fontSize: 13 }}
                  className="text-slate-500"
                />
                Available Slots *
              </label>

              <div className="flex-1">
                {loadingSlots ? (
                  <div className="flex flex-1 items-center justify-center h-40">
                    <div className="w-8 h-8 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin" />
                  </div>
                ) : therapySlots?.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1 no-scrollbar">
                    {therapySlots.map((slot, index) => {
                      const isToday =
                        appointmentDate &&
                        new Date(appointmentDate).toDateString() ===
                        new Date().toDateString();
                      let isPast = false;
                      if (isToday && slot.slotStartTime) {
                        const [h, m, s] = slot.slotStartTime
                          .split(":")
                          .map(Number);
                        const slotDateTime = new Date();
                        slotDateTime.setHours(h, m, s, 0);
                        isPast = slotDateTime < new Date();
                      }

                      const matchedBookedSlot = (bookedSlots || []).find(
                        (bs) =>
                          bs.slotStartTime === slot.slotStartTime &&
                          bs.slotEndTime === slot.slotEndTime,
                      );
                      const isAvailable =
                        (matchedBookedSlot
                          ? matchedBookedSlot.isAvailable
                          : slot.isAvailable) && !slot?.isBookedByUser;

                      const isDisabled = isPast || !isAvailable;
                      return (
                        <TimeSlotChip
                          key={index}
                          slot={{ ...slot, isAvailable }}
                          isPast={isDisabled}
                          isSelected={
                            selectedTimeSlot?.slotStartTime ===
                            slot.slotStartTime
                          }
                          onSelect={() => {
                            if (!isDisabled) {
                              setSelectedTimeSlot(slot);
                              setSlotError("");
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col flex-1 items-center justify-center h-40 text-center p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                    <Clock className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="text-[11px] text-slate-400 font-medium leading-snug">
                      {appointmentDate
                        ? "No slots available for this date"
                        : "Select a date to view available slots"}
                    </p>
                  </div>
                )}

                {slotError && (
                  <p className="text-red-500 text-[11px] mt-2 font-semibold text-center">
                    {slotError}
                  </p>
                )}
              </div>

              {slotError && (
                <p className="text-red-500 text-[9px] font-bold mt-2 text-center bg-red-50 py-1 rounded">
                  {slotError}
                </p>
              )}

              {selectedTimeSlot && (
                <div className="mt-2.5 p-2 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-200 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="block text-[8px] font-bold text-emerald-600 uppercase">
                      Selected Slot
                    </span>
                    <span className="font-extrabold text-emerald-800">
                      {selectedTimeSlot.slotStartTime} -{" "}
                      {selectedTimeSlot.slotEndTime}
                    </span>
                  </div>
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
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
          </div>

          <Divider className="!my-2" />

          {/* Footer buttons */}
          <div className="flex justify-end gap-3">
            <CommonButton
              type="button"
              label="Cancel"
              onClick={onClose}
              className="bg-white border px-4 py-2 border-red-500 text-red-500 hover:bg-red-50 transition-all duration-200 text-xs"
            />
            <CommonButton
              type="submit"
              label="Confirm Reschedule"
              className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200 text-xs shadow-md shadow-emerald-600/20"
            />
          </div>
        </form>
      </Box>
    </Modal>
  );
}
