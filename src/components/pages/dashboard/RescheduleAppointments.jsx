import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Divider, Modal } from "@mui/material";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  CalendarMonth as CalendarMonthIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import { Stethoscope, Clock } from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import { useLoader } from "../../common/commonLoader/LoaderContext";
import {
  bookAppointment,
  getDoctorAvailableSlots,
  RescheduleAppointment,
  RescheduleBooking,
} from "../../../services/bookAppointment/BookAppointmentServices";
import { getDoctorListByLocationDepartment } from "../../../services/healingServices/opdClinic/OPDClinicServices";

import CancelButtonModal from "../../common/button/CancelButtonModal";
import CommonButton from "../../common/button/CommonButton";
import DatePickerField from "../../common/formFields/DatePickerField";
import DropdownField from "../../common/formFields/DropdownField";
import { ModalStyle } from "../../common/modalStyle/ModalStyle";
import { errorAlert, successAlert } from "../../common/toast/CustomToast";

function TimeSlotChip({ slot, isSelected, onSelect }) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      type="button"
      onClick={onSelect}
      disabled={!slot.slotStartTime || slot?.count === 0}
      className={`
    relative w-full px-2 py-1.5 rounded-lg text-[10px] font-medium
    flex items-center justify-between gap-2 border
    transition-all duration-150
    ${
      isSelected
        ? "bg-emerald-500 border-emerald-500 text-white"
        : slot?.count === 0
          ? "bg-slate-100 border-slate-200 text-slate-400"
          : slot?.count <= 3
            ? "bg-amber-100 border-amber-300 text-amber-900"
            : "bg-white border-slate-300 text-slate-800 hover:border-emerald-400"
    }
    disabled:opacity-60 disabled:cursor-not-allowed
  `}
    >
      <span className="whitespace-normal leading-tight text-left">
        {slot?.slotStartTime} - {slot?.slotEndTime}
      </span>

      <span
        className={`
      flex-shrink-0 flex items-center justify-center min-w-[20px] h-5 px-1.5
      rounded-md text-[9px] font-bold
      ${
        isSelected
          ? "bg-white/20 text-white"
          : slot?.count === 0
            ? "bg-red-100 text-red-600"
            : slot?.count <= 3
              ? "bg-amber-200 text-amber-900"
              : "bg-emerald-100 text-emerald-700"
      }
    `}
      >
        {slot?.count}
      </span>
    </motion.button>
  );
}

const dropdownObjectSchema = yup
  .object()
  .shape({
    id: yup.mixed().required(),
    label: yup.string().required(),
  })
  .nullable()
  .required("Doctor is required");

const validationSchema = yup.object().shape({
  doctorFid: dropdownObjectSchema.typeError("Doctor is required"),
  appointmentDate: yup
    .date()
    .nullable()
    .required("Date is required")
    .typeError("Date is required"),
});

export default function RescheduleAppointments({
  open,
  onClose,
  bookingData,
  onSuccess,
  onRescheduleSuccess,
}) {
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [slotError, setSlotError] = useState("");

  const { user } = useAuth();
  const { setIsLoading } = useLoader();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      doctorFid: null,
      appointmentDate: new Date(),
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const doctorValue = watch("doctorFid");
  const appointmentDate = watch("appointmentDate");


  useEffect(() => {
    if (!open || !bookingData) return;

    setValue("appointmentDate", new Date(bookingData.date));
    if (bookingData?.slotTime) {
      const [start, end] = bookingData.slotTime.split("-");
      setSelectedTimeSlot({
        slotStartTime: start?.trim(),
        slotEndTime: end?.trim(),
      });
    } else if (bookingData?.SloteStartTime) {
      setSelectedTimeSlot({
        slotStartTime: bookingData.SloteStartTime,
        slotEndTime: bookingData.SloteEndTime,
      });
    }
    const clinicId = bookingData?.clinicId || bookingData?.clinicFid || 5;

    getDoctorListByLocationDepartment(clinicId, bookingData?.department)
      .then((res) => {
        const data = res?.data?.data || [];
        const formatted = data.map((doc) => ({
          ...doc,
          id: doc.userId,
          value: doc.userId,
          label: `${doc.firstName} ${doc.lName}`,
        }));
        setDoctorOptions(formatted);

        const docId = bookingData?.doctorFid || bookingData?.doctorId;
        const docName = bookingData?.doctor || bookingData?.doctorName;
        if (docId) {
          const match = formatted.find((d) => d.id === docId);
          if (match) setValue("doctorFid", match);
        } else if (docName) {
          const match = formatted.find(
            (d) =>
              `${d.firstName} ${d.lName}`
                .toLowerCase()
                .includes(docName.toLowerCase()) ||
              docName
                .toLowerCase()
                .includes(`${d.firstName} ${d.lName}`.toLowerCase()),
          );
          if (match) setValue("doctorFid", match);
        }
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setDoctorOptions([]);
      });
  }, [open, bookingData, setValue]);

  console.log("appointmentDate",appointmentDate)

  useEffect(() => {
    if (doctorValue && bookingData) {
      setSlotError("");
      setLoadingSlots(true);
      setDoctorSlots([]);

      const formattedDate =
        appointmentDate &&
        !isNaN(new Date(appointmentDate).getTime())
          ? format(new Date(appointmentDate), "yyyy-MM-dd")
          : "";
      const clinicId = bookingData?.clinicId || bookingData?.clinicFid || 5;

      getDoctorAvailableSlots(doctorValue.userId, formattedDate, clinicId)
        .then((res) => {
          const data = res?.data?.data || [];
          setDoctorSlots(data);

          let foundMatch = false;
          const origDate = bookingData?.date
            ? format(new Date(bookingData.date), "yyyy-MM-dd")
            : "";
          if (formattedDate === origDate) {
            if (bookingData?.slotTime) {
              const [start] = bookingData.slotTime.split("-");
              const match = data.find(
                (s) => s.slotStartTime?.trim() === start?.trim(),
              );
              if (match) {
                setSelectedTimeSlot(match);
                foundMatch = true;
              }
            } else if (bookingData?.SloteStartTime) {
              const match = data.find(
                (s) => s.slotStartTime === bookingData.SloteStartTime,
              );
              if (match) {
                setSelectedTimeSlot(match);
                foundMatch = true;
              }
            }
          }

          if (!foundMatch && selectedTimeSlot) {
            const stillExists = data.find(
              (s) => s.slotStartTime === selectedTimeSlot.slotStartTime,
            );
            if (!stillExists) setSelectedTimeSlot(null);
          } else if (!foundMatch) {
            setSelectedTimeSlot(null);
          }

          if (data.length === 0) {
            setSlotError(res?.data?.message || "");
          }
        })
        .catch((err) => {
          console.error("Error fetching slots:", err);
          setSlotError(err?.response?.data?.message || "");
          setDoctorSlots([]);
        })
        .finally(() => setLoadingSlots(false));
    } else {
      setDoctorSlots([]);
      setSelectedTimeSlot(null);
    }
  }, [doctorValue, appointmentDate, bookingData]);

  console.log("bookingData", bookingData);

  const handleReschedule = handleSubmit((data) => {
    if (!selectedTimeSlot) {
      setSlotError("Please select a time slot");
      return;
    }

    const payload = {
      bookingId: bookingData?.bookingId,
      clinicFid: 5,
      AppointmentFid: bookingData?.bookingId,
      appoinmentDate:
        data.appointmentDate && !isNaN(new Date(data.appointmentDate).getTime())
          ? format(new Date(data.appointmentDate), "yyyy-MM-dd")
          : "",
      SloteStartTime: selectedTimeSlot?.slotStartTime,
      SloteEndTime: selectedTimeSlot?.slotEndTime,
      rescheduledBy: user?.userId,
    };

    setIsLoading(true);
    bookAppointment(payload, user?.userId)
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.status === 200) {
          successAlert(
            res.data.message || "Appointment rescheduled successfully!",
          );
          onSuccess?.();
          onClose();
          onRescheduleSuccess();
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Reschedule error:", err);
        errorAlert("An error occurred while rescheduling the appointment");
      });
  });

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
                Reschedule Booking
              </h2>
              <p className="text-white/70 text-[10.5px] mt-0.5 font-medium">
                Update date, doctor, or time slot
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
                <DropdownField
                  control={control}
                  name="doctorFid"
                  placeholder="Choose Doctor *"
                  dataArray={doctorOptions}
                  error={errors.doctorFid}
                  isDisabled={true}
                />
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
                {!doctorValue ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center h-full">
                    <Stethoscope className="w-6 h-6 text-slate-300 mb-1" />
                    <p className="text-slate-500 text-[10px] font-bold">
                      Select a Doctor First
                    </p>
                  </div>
                ) : loadingSlots ? (
                  <div className="flex flex-col items-center justify-center py-6 h-full">
                    <div className="w-6 h-6 border-2 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                    <p className="text-slate-400 text-[9px] font-bold mt-1.5">
                      Checking slots...
                    </p>
                  </div>
                ) : doctorSlots.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-6 text-center h-full">
                    <Clock className="w-6 h-6 text-slate-300 mb-1" />
                    <p className="text-slate-400 font-bold text-[10px]">
                      {slotError || "No slots available"}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1 no-scrollbar">
                    {doctorSlots.map((slot, index) => (
                      <div key={index} className="w-full">
                        <TimeSlotChip
                          slot={slot}
                          isSelected={
                            selectedTimeSlot?.slotStartTime ===
                            slot.slotStartTime
                          }
                          onSelect={() => {
                            setSelectedTimeSlot(slot);
                            setSlotError("");
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {slotError && doctorSlots.length > 0 && (
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
