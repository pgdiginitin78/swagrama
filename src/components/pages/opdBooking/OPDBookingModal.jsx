import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clock, FileText, Stethoscope, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CancelButtonModal from "../../common/button/CancelButtonModal";
import CommonButton from "../../common/button/CommonButton";
import DatePickerField from "../../common/formFields/DatePickerField";
import DropdownField from "../../common/formFields/DropdownField";
import InputField from "../../common/formFields/InputField";
import {
  getClinicList,
  getDoctorAvailableSlots,
  getDoctorsByClinicId,
  getLocationList,
  getPatientDataByMobileNo,
  getServicesByClinicId,
} from "../../../services/bookAppointment/BookAppointmentServices";
import { format } from "date-fns";
import AddPatientModal from "./AddPatientModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
};

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

function TimeSlotChip({ slot, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={!slot.slotStartTime}
      className={`
        relative px-3 py-2 rounded-xl font-semibold text-xs transition-all duration-200
        ${
          isSelected
            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
            : "bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:shadow-md border border-slate-200 hover:border-emerald-300"
        }
        disabled:opacity-40 disabled:cursor-not-allowed
      `}
    >
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <span className="font-bold">{slot.slotStartTime}</span>
        <svg className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="font-normal opacity-90">{slot.slotEndTime}</span>
      </span>
    </button>
  );
}

export default function BookAppointment({ open, handleClose }) {
  const [locationListOptions, setLocationListOptions] = useState([]);
  const [clinicsOptions, setClinicOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [servicesOptions, setServicesOptions] = useState([]);
  const [openAddPatientModal, setOpenAddPatientModal] = useState(false);
  const [patientOptions, setPatientOptions] = useState([]);
  const [doctorSlots, setDoctorSlots] = useState([]);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      clinicFid: null,
      patientFid: null,
      doctorFid: null,
      serviceFid: null,
      appointmentDate: null,
      Status: "",
      SloteEndTime: null,
      SloteStartTime: null,
      ServiceDetails: "",
      taxDeatils: "",
      EncounterStatus: "",
      location: null,
    },
    mode: "onChange",
  });

  const clinicFidValue = watch("clinicFid");
  const locationValue = watch("location");
  const doctorValue = watch("doctorFid");
  const appointmentDate = watch("appointmentDate");

  const userData = localStorage.getItem("user");

  const handleReset = () => {
    setSelectedTimeSlot(null);
    document.querySelectorAll("select, input").forEach((input) => {
      input.value = "";
    });
  };

  const handleBookAppointment = (dataObj) => {};

  useEffect(() => {
    getLocationList()
      .then((res) => {
        const data = res?.data?.data;
        if (data?.length) {
          setLocationListOptions(
            data.map((item) => ({
              ...item,
              id: item.fid,
              value: item.fid,
              label: item.locationName,
            })),
          );
        }
      })
      .catch((error) => error);
  }, []);

  useEffect(() => {
    if (locationValue?.id > 0) {
      getClinicList(locationValue?.id)
        .then((res) => {
          const data = res?.data?.data;
          if (data?.length) {
            setClinicOptions(
              data.map((item) => ({
                ...item,
                id: item.clinicid,
                value: item.clinicid,
                label: item.clinicName,
              })),
            );
          }
        })
        .catch((err) => console.log(err.message));
    }
  }, [locationValue]);

  console.log("doctorSlots", doctorSlots);

  useEffect(() => {
    if (clinicFidValue?.id > 0) {
      getDoctorsByClinicId(clinicFidValue?.id)
        .then((res) => {
          const data = res?.data?.data;
          if (data?.length) {
            setDoctorOptions(
              data.map((item) => ({
                ...item,
                id: item.userId,
                value: item.userId,
                label: `${item.firstName} ${item.lName}`,
              })),
            );
          }
        })
        .catch((error) => error);

      getServicesByClinicId(clinicFidValue?.id)
        .then((res) => {
          const data = res?.data?.data;
          if (data?.length) {
            setServicesOptions(
              data.map((item) => ({
                ...item,
                id: item.serviceFid,
                value: item.serviceFid,
                label: `${item.serviceName}`,
              })),
            );
          }
        })
        .catch((error) => error);

      if (userData !== null) {
        getPatientDataByMobileNo(
          JSON.parse(userData)?.mobileNo,
          clinicFidValue?.id,
        )
          .then((res) => {
            const data = res?.data?.data;
            if (data?.length) {
              setPatientOptions(
                data.map((item) => ({
                  ...item,
                  id: item.serviceFid,
                  value: item.serviceFid,
                  label: `${item.serviceName}`,
                })),
              );
            }
          })
          .catch((error) => error);
      }
    }
  }, [clinicFidValue, userData]);

  console.log("doctorValue", doctorValue, appointmentDate);
  useEffect(() => {
    if (
      doctorValue !== null &&
      appointmentDate !== null &&
      clinicFidValue !== null
    ) {
      getDoctorAvailableSlots(
        doctorValue?.id,
        format(new Date(appointmentDate), "yyyy-MM-dd"),
        clinicFidValue?.id,
      )
        .then((res) => {
          const data = res?.data?.data;
          if (data?.length) {
            setDoctorSlots(data);
          }
        })
        .catch((err) => console.log(err.message));
    }
  }, [doctorValue, appointmentDate, clinicFidValue]);

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-xl">
          <AnimatePresence>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-[95vw] sm:w-[85vw] md:w-[75vw] lg:w-[900px] xl:w-[1000px] max-w-[1200px]"
            >
              <div className="relative bg-gradient-to-br from-white via-emerald-50/30 to-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden">
                <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-emerald-100 px-4 sm:px-6 py-4 shadow-sm">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 w-full">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                        className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                      >
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </motion.div>
                      <div>
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent whitespace-nowrap">
                          Book an Appointment
                        </h1>
                        <p className="text-xs text-slate-500 hidden sm:block">
                          Schedule your visit with our healthcare professionals
                        </p>
                      </div>
                    </div>
                    <CancelButtonModal onClick={handleClose} />
                  </div>
                </div>

                <div className="max-h-[calc(90vh-88px)] overflow-y-auto px-4 sm:px-6 py-6 custom-scrollbar">
                  <form
                    onSubmit={handleSubmit(handleBookAppointment)}
                    className="space-y-5"
                  >
                    <div className="grid lg:grid-cols-3 gap-5">
                      <motion.div
                        variants={sectionVariants}
                        className="lg:col-span-2 space-y-5"
                      >
                        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-slate-200">
                          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 flex items-center gap-2">
                            <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-white">
                              Patient Information
                            </h2>
                          </div>
                          <div className="p-4 sm:p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex justify-end col-span-2">
                                <CommonButton
                                  label="+ Add Patient"
                                  className="
                                      border border-emerald-500 hover:bg-emerald-50
                                      text-emerald-500"
                                  onClick={() => setOpenAddPatientModal(true)}
                                />
                              </div>
                              <DropdownField
                                control={control}
                                name="location"
                                placeholder="Select Location"
                                dataArray={locationListOptions}
                              />
                              <DropdownField
                                control={control}
                                name="clinicFid"
                                placeholder="Select Clinic"
                                dataArray={clinicsOptions}
                              />
                              <DropdownField
                                control={control}
                                name="serviceFid"
                                placeholder="Select Service"
                                dataArray={servicesOptions}
                              />
                              <DropdownField
                                control={control}
                                name="patientFid"
                                placeholder="Select Patient"
                                dataArray={patientOptions}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-slate-200">
                          <div className="bg-gradient-to-r from-lime-400 to-emerald-400 px-4 py-2 flex items-center gap-2">
                            <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                              <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-white">
                              Schedule Details
                            </h2>
                          </div>
                          <div className="p-4 sm:p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
                              <div className="col-span-2">
                                <DropdownField
                                  control={control}
                                  name="doctorFid"
                                  placeholder="Select Doctor"
                                  dataArray={doctorOptions}
                                />
                              </div>
                              <DatePickerField
                                control={control}
                                name="appointmentDate"
                                label="Appointment Date"
                                inputFormat="dd-MM-yyyy"
                                disablePast={true}
                              />
                              <DropdownField
                                control={control}
                                name="Status"
                                placeholder="Select Status"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-slate-200">
                          <div className="bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-2 flex items-center gap-2">
                            <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                              <FileText className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-white">
                              Additional Details
                            </h2>
                          </div>
                          <div className="p-4 sm:p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
                              <div className="col-span-2">
                                <InputField
                                  control={control}
                                  name="ServiceDetails"
                                  label="Service Details"
                                />
                              </div>
                              <InputField
                                control={control}
                                name="taxDetails"
                                label="Tax Details"
                              />
                              <InputField
                                control={control}
                                name="EncounterStatus"
                                label="Encounter Status"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={sectionVariants}
                        className="lg:col-span-1"
                      >
                        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-slate-200 lg:sticky lg:top-0">
                          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 flex items-center gap-2">
                            <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg">
                              <Clock className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-white">
                              Available Slots
                            </h2>
                          </div>

                          <div className="p-4 sm:p-5">
                            <AnimatePresence mode="wait">
                              {!doctorValue ? (
                                <motion.div
                                  key="no-doctor"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  className="flex flex-col items-center justify-center py-12 text-center"
                                >
                                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-4 shadow-inner">
                                    <Stethoscope className="w-8 h-8 text-slate-400" />
                                  </div>
                                  <p className="text-slate-600 text-sm font-medium mb-1">
                                    No Doctor Selected
                                  </p>
                                  <p className="text-slate-400 text-xs px-4">
                                    Please select a doctor and date to view
                                    available time slots
                                  </p>
                                </motion.div>
                              ) : loading ? (
                                <motion.div
                                  key="loading"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="flex flex-col items-center justify-center py-12"
                                >
                                  <div className="relative">
                                    <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-b-teal-600 rounded-full animate-spin animation-delay-150"></div>
                                  </div>
                                  <p className="text-slate-600 text-sm font-medium mt-4">
                                    Loading available slots...
                                  </p>
                                </motion.div>
                              ) : doctorSlots.length === 0 ? (
                                <motion.div
                                  key="no-slots"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  className="flex flex-col items-center justify-center py-12 text-center"
                                >
                                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mb-4 shadow-inner">
                                    <Clock className="w-8 h-8 text-orange-500" />
                                  </div>
                                  <p className="text-slate-600 text-sm font-medium mb-1">
                                    No Slots Available
                                  </p>
                                  <p className="text-slate-400 text-xs px-4">
                                    No available slots for the selected date
                                  </p>
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="slots"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="space-y-4 max-h-[450px] overflow-y-auto pr-1 custom-scrollbar"
                                >
                                  <div>
                                    <div className="grid grid-cols-2 gap-2">
                                      {doctorSlots.map((slot, index) => (
                                        <TimeSlotChip
                                          key={index}
                                          slot={slot}
                                          isSelected={
                                            selectedTimeSlot?.slotStartTime ===
                                            slot.slotStartTime
                                          }
                                          onSelect={() =>
                                            setSelectedTimeSlot(slot)
                                          }
                                        />
                                      ))}
                                    </div>
                                  </div>

                                  {selectedTimeSlot && (
                                    <motion.div
                                      initial={{
                                        opacity: 0,
                                        y: 10,
                                        scale: 0.95,
                                      }}
                                      animate={{ opacity: 1, y: 0, scale: 1 }}
                                      className="mt-4 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200 shadow-sm"
                                    >
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <p className="text-xs text-emerald-600 font-semibold mb-1 uppercase tracking-wide">
                                            Selected Time
                                          </p>
                                          <p className="text-lg font-bold text-emerald-900">
                                            {selectedTimeSlot.slotStartTime}
                                          </p>
                                        </div>
                                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                          <svg
                                            className="w-5 h-5 text-white"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path d="M5 13l4 4L19 7" />
                                          </svg>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      variants={sectionVariants}
                      className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-4 border-t border-slate-200"
                    >
                      <CommonButton
                        type="button"
                        label="Reset"
                        onClick={handleReset}
                        className=" bg-white border px-5 border-red-500 text-red-600 hover:bg-red-50 transition-all duration-200"
                      />
                      <CommonButton
                        type="submit"
                        label="Book Appointment"
                        className="bg-gradient-to-r from-emerald-500 to-green-500  text-white  transition-all duration-200"
                      />
                    </motion.div>
                  </form>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Modal>
      {openAddPatientModal && (
        <AddPatientModal
          open={openAddPatientModal}
          handleClose={() => setOpenAddPatientModal(false)}
        />
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #10b981 transparent;
        }
        @keyframes spin-delay {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </>
  );
}
