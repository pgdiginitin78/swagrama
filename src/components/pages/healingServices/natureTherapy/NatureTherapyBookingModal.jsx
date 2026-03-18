import { yupResolver } from "@hookform/resolvers/yup";
import { Close as CloseIcon, Event } from "@mui/icons-material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Modal } from "@mui/material";
import { differenceInDays, format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Banknote, Calendar, Clock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../../../context/AuthContext";
import {
  getClinicList,
  getDoctorAvailableSlots,
  getDoctorsByClinicId,
  getLocationList,
  getPatientDataByMobileNo,
  getServicesByClinicId,
} from "../../../../services/bookAppointment/BookAppointmentServices";
import ConfirmationModal from "../../../common/ConfirmationModal";
import CommonButton from "../../../common/button/CommonButton";
import CheckBoxField from "../../../common/formFields/CheckBoxField";
import DatePickerField from "../../../common/formFields/DatePickerField";
import DropdownField from "../../../common/formFields/DropdownField";
import InputArea from "../../../common/formFields/InputArea";
import InputField from "../../../common/formFields/InputField";

const dropdownObjectSchema = yup
  .object()
  .shape({
    id: yup.mixed().required(),
    label: yup.string().required(),
  })
  .nullable()
  .required("This field is required");

const schema = yup.object().shape({
  location: dropdownObjectSchema.typeError("Location is required"),
  clinicFid: dropdownObjectSchema.typeError("Clinic is required"),
  patientFid: dropdownObjectSchema.typeError("Patient is required"),
  doctorFid: dropdownObjectSchema.typeError("Therapist/Doctor is required"),
  serviceFid: dropdownObjectSchema.typeError("Therapy is required"),
  fromDate: yup.date().required("From date is required").nullable(),
  toDate: yup.date().required("To date is required").nullable(),
  noOfPerson: yup
    .number()
    .typeError("Must be a number")
    .min(1, "At least 1 person is required")
    .required("Required"),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms")
    .required(),
  specialRequest: yup.string().nullable(),
});

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
        relative px-2 py-2 rounded-md font-semibold text-[10px] transition-all duration-200 
        ${
          isSelected
            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
            : "bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:shadow-md border border-slate-200 hover:border-emerald-300"
        }
        disabled:opacity-40 disabled:cursor-not-allowed
      `}
    >
      <span className="flex items-center space-x-1 whitespace-nowrap">
        <span className="font-bold">{slot.slotStartTime}</span>
        <NavigateNextIcon sx={{ fontSize: 14 }} />
        <span className="font-normal opacity-90">{slot.slotEndTime}</span>
      </span>
    </button>
  );
}

const NatureTherapyBookingModal = ({ open, handleClose, therapy }) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);

  const [locationListOptions, setLocationListOptions] = useState([]);
  const [clinicsOptions, setClinicOptions] = useState([]);
  const [patientOptions, setPatientOptions] = useState([]);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [servicesOptions, setServicesOptions] = useState([]);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [slotError, setSlotError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      location: null,
      clinicFid: null,
      patientFid: null,
      doctorFid: null,
      serviceFid: null,
      fromDate: null,
      toDate: null,
      noOfPerson: 1,
      termsAccepted: false,
      specialRequest: "",
      totalAmount: 0,
      perDayAmount: 0,
    },
    mode: "onChange",
  });

  const locationValue = watch("location");
  const clinicFidValue = watch("clinicFid");
  const doctorValue = watch("doctorFid");
  const fromDate = watch("fromDate");
  const toDate = watch("toDate");
  const noOfPerson = watch("noOfPerson");

  useEffect(() => {
    let days = 0;
    if (fromDate && toDate) {
      days =
        Math.max(0, differenceInDays(new Date(toDate), new Date(fromDate))) + 1;
    }

    const totalPeople = parseInt(noOfPerson) || 1;

    let pricePerPerson = 1000;
    if (therapy) {
      const singlePrice = therapy.price
        ? parseInt(therapy.price.split("/")[0])
        : 1000;
      const groupPrice = therapy.priceRange
        ? parseInt(therapy.priceRange.split("/")[0])
        : 750;
      const bulkPrice = therapy.bulkPrice
        ? parseInt(therapy.bulkPrice.split("/")[0])
        : 500;

      if (totalPeople >= 5) {
        pricePerPerson = bulkPrice;
      } else if (totalPeople >= 2) {
        pricePerPerson = groupPrice;
      } else {
        pricePerPerson = singlePrice;
      }
    }

    const sessionAmount = pricePerPerson * (totalPeople > 0 ? totalPeople : 1);

    setValue("perDayAmount", sessionAmount);
    setValue("totalAmount", days > 0 ? days * sessionAmount : sessionAmount);
  }, [fromDate, toDate, noOfPerson, therapy, setValue]);

  useEffect(() => {
    getLocationList()
      .then((res) => {
        const data = res?.data?.data;
        if (data?.length) {
          const formatted = data.map((item) => ({
            ...item,
            id: item.fid,
            value: item.fid,
            label: item.locationName,
          }));
          setLocationListOptions(formatted);
          const filterLocation = formatted.filter(
            (item) => item.label === "Lavale",
          );
          setValue("location", filterLocation[0]);
        }
      })
      .catch((error) => console.error(error));
  }, [setValue]);

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

  useEffect(() => {
    if (clinicsOptions?.length > 0) {
      const filterClinic = clinicsOptions.filter(
        (item) => item.label === "Swagram Community",
      );
      setValue("clinicFid", filterClinic[0]);
    }
  }, [clinicsOptions, setValue]);

  useEffect(() => {
    if (clinicFidValue?.id > 0) {
      setValue("doctorFid", null);
      setDoctorSlots([]);
      setSelectedTimeSlot(null);
      setSlotError("");

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
        .catch((error) => console.error(error));

      getServicesByClinicId(clinicFidValue?.id)
        .then((res) => {
          const data = res?.data?.data;
          if (data?.length) {
            const formatted = data.map((item) => ({
              ...item,
              id: item.serviceFid,
              value: item.serviceFid,
              label: `${item.serviceName}`,
              charges: item.charges || 0,
            }));
            setServicesOptions(formatted);
          }
        })
        .catch((error) => console.error(error));

      if (user !== null) {
        getPatientDataByMobileNo(user?.mobileNo, clinicFidValue?.id)
          .then((res) => {
            const data = res?.data?.data;
            if (data?.length) {
              setPatientOptions(
                data.map((item) => ({
                  ...item,
                  id: item.userId,
                  value: item.userId,
                  label: `${item.firstName} ${item.lastName}`,
                })),
              );
            }
          })
          .catch((error) => console.error(error));
      }
    }
  }, [clinicFidValue, user, setValue]);

  useEffect(() => {
    if (patientOptions?.length > 0 && user?.userId) {
      const filterPatient = patientOptions.filter(
        (item) => item.id === user?.userId,
      );
      setValue("patientFid", filterPatient[0] || null);
    }
  }, [patientOptions, user, setValue]);

  useEffect(() => {
    if (servicesOptions?.length > 0 && therapy?.nameEnglish) {
      const matchedService = servicesOptions.find(
        (item) =>
          item.label.toLowerCase() === therapy.nameEnglish.toLowerCase(),
      );
      if (matchedService) {
        setValue("serviceFid", matchedService);
      } else {
        setValue("serviceFid", {
          id: therapy.nameEnglish,
          value: therapy.nameEnglish,
          label: therapy.nameEnglish,
          charges: therapy.price ? parseInt(therapy.price.split("/")[0]) : 0,
        });
      }
    }
  }, [servicesOptions, therapy, setValue]);

  useEffect(() => {
    if (doctorValue?.id && fromDate && clinicFidValue?.id) {
      setSelectedTimeSlot(null);
      setSlotError("");
      setLoading(true);
      getDoctorAvailableSlots(
        doctorValue.id,
        format(new Date(fromDate), "yyyy-MM-dd"),
        clinicFidValue.id,
      )
        .then((res) => {
          const data = res?.data?.data;
          if (data?.length) {
            setDoctorSlots(data);
          } else {
            setDoctorSlots([]);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setDoctorSlots([]);
      setSelectedTimeSlot(null);
    }
  }, [doctorValue?.id, fromDate, clinicFidValue]);

  const onSubmit = (data) => {
    if (!selectedTimeSlot) {
      setSlotError("Please select a time slot");
      return;
    }
    setSlotError("");
    const saveObj = {
      ...data,
      SloteEndTime: selectedTimeSlot?.slotEndTime,
      SloteStartTime: selectedTimeSlot?.slotStartTime,
    };
    setFormData(saveObj);
    setOpenConfirmation(true);
  };

  const handleConfirmBooking = () => {
    console.log("Nature Therapy Booking Confirmed:", formData);
    setOpenConfirmation(false);
    reset();
    handleClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            outline: "none",
          }}
        >
          <AnimatePresence>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-[95vw] sm:w-[85vw] md:w-[75vw] lg:w-[900px] xl:w-[1000px] max-w-[1200px]"
            >
              <div className="relative bg-gradient-to-br from-white via-emerald-50/30 to-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden">
                <div className="sticky top-0 z-20 bg-emerald-600 px-4 sm:px-6 py-3 shadow-sm flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span className="bg-white/20 p-1.5 rounded-lg flex items-center justify-center">
                      <Event sx={{ fontSize: 20 }} />
                    </span>
                    Book Nature Therapy
                  </h2>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-white hover:bg-white/20 p-1 rounded-full transition-colors flex items-center justify-center"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="max-h-[calc(90vh-88px)] overflow-y-auto px-4 sm:px-6 py-6 custom-scrollbar bg-[#f8fafc]">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid lg:grid-cols-3 gap-5">
                      <motion.div
                        variants={sectionVariants}
                        className="lg:col-span-2 space-y-5"
                      >
                        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 flex items-center gap-2">
                            <div className="p-1.5 bg-white/20 rounded-lg">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-white">
                              Patient & Therapy Details
                            </h2>
                          </div>
                          <div className="p-4 sm:p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="col-span-2 hidden">
                                <DropdownField
                                  control={control}
                                  name="location"
                                  dataArray={locationListOptions}
                                  isDisabled={true}
                                />
                                <DropdownField
                                  control={control}
                                  name="clinicFid"
                                  dataArray={clinicsOptions}
                                  isDisabled={true}
                                />
                              </div>
                              <DropdownField
                                control={control}
                                name="patientFid"
                                placeholder="Select Patient *"
                                dataArray={patientOptions}
                                error={errors.patientFid}
                              />
                              <DropdownField
                                control={control}
                                name="serviceFid"
                                placeholder="Select Therapy *"
                                dataArray={servicesOptions}
                                error={errors.serviceFid}
                                isDisabled={therapy?.nameEnglish ? true : false}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                          <div className="bg-gradient-to-r from-lime-400 to-emerald-400 px-4 py-2 flex items-center gap-2">
                            <div className="p-1.5 bg-white/20 rounded-lg">
                              <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-white">
                              Schedule Options
                            </h2>
                          </div>
                          <div className="p-4 sm:p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="col-span-2">
                                <DropdownField
                                  control={control}
                                  name="doctorFid"
                                  placeholder="Select Therapist *"
                                  dataArray={doctorOptions}
                                  error={errors.doctorFid}
                                />
                              </div>
                              <DatePickerField
                                control={control}
                                name="fromDate"
                                label="From Date *"
                                inputFormat="dd-MM-yyyy"
                                disablePast={true}
                                error={errors.fromDate}
                              />
                              <DatePickerField
                                control={control}
                                name="toDate"
                                label="To Date *"
                                inputFormat="dd-MM-yyyy"
                                disablePast={true}
                                error={errors.toDate}
                              />
                              <InputField
                                control={control}
                                name="noOfPerson"
                                label="Number of Person *"
                                type="number"
                                error={errors.noOfPerson}
                                InputProps={{ inputProps: { min: 1 } }}
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                              <div className="flex flex-col">
                                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                                  <Banknote className="w-3.5 h-3.5" /> Amount
                                  per Session
                                </span>
                                <InputField
                                  name="perDayAmount"
                                  control={control}
                                  type="text"
                                  disabled={true}
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5" /> Total
                                  Amount
                                </span>
                                <InputField
                                  name="totalAmount"
                                  control={control}
                                  type="text"
                                  disabled={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden p-4 sm:p-5">
                          <InputArea
                            name="specialRequest"
                            control={control}
                            label="Any specific requests?"
                            placeholder="Type your message here..."
                            error={errors.specialRequest}
                          />
                          <div className="mt-4">
                            <CheckBoxField
                              name="termsAccepted"
                              control={control}
                              label="I agree to the terms and conditions and clinical guidelines."
                              error={errors.termsAccepted}
                            />
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={sectionVariants}
                        className="lg:col-span-1"
                      >
                        <div className="bg-white rounded-xl shadow-md border border-slate-200 lg:sticky lg:top-0 h-full flex flex-col">
                          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 flex items-center gap-2 rounded-t-lg">
                            <div className="p-1.5 bg-white/20 rounded-lg">
                              <Clock className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-white">
                              Available Slots
                            </h2>
                          </div>

                          <div className="p-4 sm:p-5 flex-1 relative min-h-[300px]">
                            {loading ? (
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80">
                                <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
                                <p className="mt-3 text-sm text-slate-500 font-medium animate-pulse">
                                  Loading slots...
                                </p>
                              </div>
                            ) : doctorSlots?.length > 0 ? (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-2 gap-2 content-start h-full"
                              >
                                {doctorSlots.map((slot, index) => (
                                  <TimeSlotChip
                                    key={index}
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
                                ))}
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center h-full text-center p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200"
                              >
                                {doctorValue && fromDate ? (
                                  <>
                                    <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-3">
                                      <Clock className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <p className="text-slate-600 font-medium">
                                      No slots available
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">
                                      Please select a different date (From Date)
                                      or therapist.
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
                                      <Calendar className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <p className="text-slate-500 font-medium">
                                      Select therapist and From Date to view
                                      slots
                                    </p>
                                  </>
                                )}
                              </motion.div>
                            )}
                          </div>

                          {slotError && (
                            <div className="px-4 py-2 bg-red-50 text-red-500 text-xs font-medium border-t border-red-100 flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-red-500"></span>
                              {slotError}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 pb-2">
                      <CommonButton
                        type="button"
                        onClick={handleClose}
                        label="Cancel"
                        className="rounded-lg border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-colors w-full sm:w-auto"
                      />
                      <CommonButton
                        type="submit"
                        label="Book Now"
                        onClick={handleSubmit(onSubmit)}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md font-semibold px-8 transition-transform w-full sm:w-auto"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Modal>

      <ConfirmationModal
        confirmationOpen={openConfirmation}
        confirmationHandleClose={() => setOpenConfirmation(false)}
        confirmationSubmitFunc={handleConfirmBooking}
        confirmationLabel="Confirm Therapy Booking"
        confirmationMsg="Are you sure you want to book this nature therapy for the selected slot?"
        confirmationButtonMsg="Confirm Booking"
      />
    </>
  );
};

export default NatureTherapyBookingModal;
