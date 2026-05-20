import { yupResolver } from "@hookform/resolvers/yup";
import Event from "@mui/icons-material/Event";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Modal } from "@mui/material";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Banknote, Calendar, Clock, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../../../context/AuthContext";
import {
  getPatientDataByMobileNo,
  getServicesByClinicId,
  InitiatePayment,
} from "../../../../services/bookAppointment/BookAppointmentServices";
import {
  BookDetoxTherapy,
  GetTherapySlots,
} from "../../../../services/healingServices/detoxTherapyServices/DetoxTherapyServices";
import { GetNatureTherapySlotsByUser } from "../../../../services/healingServices/natureTherapyServices/NatureTherapyServices";
import ConfirmationModal from "../../../common/ConfirmationModal";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import { useLoader } from "../../../common/commonLoader/LoaderContext";
import CheckBoxField from "../../../common/formFields/CheckBoxField";
import DatePickerField from "../../../common/formFields/DatePickerField";
import DropdownField from "../../../common/formFields/DropdownField";
import InputArea from "../../../common/formFields/InputArea";
import InputField from "../../../common/formFields/InputField";
import { errorAlert, successAlert } from "../../../common/toast/CustomToast";
import AddPatientModal from "../../opdBooking/AddPatientModal";
import { RedirectToSabPaisa } from "../../opdBooking/RedirectToSabPaisa";
import { ModalStyle } from "../../../common/modalStyle/ModalStyle";

const schema = yup.object().shape({
  serviceFid: yup.object().nullable().required("Therapy is required"),
  fromDate: yup
    .date()
    .typeError("Invalid date")
    .required("Date is required")
    .nullable(),
  noOfPerson: yup
    .number()
    .typeError("Must be a number")
    .min(1, "At least 1 person is required")
    .max(20, "Maximum 20 persons allowed")
    .required("Required"),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms")
    .required(),
  specialRequest: yup.string().nullable(),
  fullName: yup.string().required("Full name is required"),
  mobile: yup.string().required("Mobile number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  city: yup.string().nullable(),
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

const formatTime = (timeStr) => {
  if (!timeStr || typeof timeStr !== "string") return timeStr;
  if (!timeStr.includes(":")) return timeStr;
  try {
    const [h, m] = timeStr.split(":");
    let hours = parseInt(h);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${m} ${ampm}`;
  } catch (e) {
    return timeStr;
  }
};

const staticTimeSlots = [
  { slotStartTime: "09:00:00", slotEndTime: "10:00:00", isAvailable: true },
  { slotStartTime: "10:00:00", slotEndTime: "11:00:00", isAvailable: true },
  { slotStartTime: "11:00:00", slotEndTime: "12:00:00", isAvailable: true },
  { slotStartTime: "12:00:00", slotEndTime: "13:00:00", isAvailable: true },
  { slotStartTime: "13:00:00", slotEndTime: "14:00:00", isAvailable: true },
  { slotStartTime: "14:00:00", slotEndTime: "15:00:00", isAvailable: true },
  { slotStartTime: "15:00:00", slotEndTime: "16:00:00", isAvailable: true },
  { slotStartTime: "16:00:00", slotEndTime: "17:00:00", isAvailable: true },
];

function TimeSlotChip({ slot, isSelected, onSelect, isPast }) {
  const isDisabled = !slot.isAvailable || slot.isBookedByUser || isPast;
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isDisabled}
      title={isPast ? "This time slot has already passed" : undefined}
      className={`
        relative px-2 py-2 rounded-md font-semibold text-[10px] transition-all duration-200 
        ${
          isSelected
            ? "bg-booking-primary text-white shadow-md"
            : isPast
              ? "bg-slate-100 text-slate-400 border border-slate-200 line-through"
              : "bg-slate-100 text-booking-label hover:bg-booking-primaryLight border border-booking-border"
        }
        disabled:opacity-40 disabled:cursor-not-allowed
      `}
    >
      <span className="flex items-center space-x-1 whitespace-nowrap">
        <span className="font-bold">{formatTime(slot.slotStartTime)}</span>
        <NavigateNextIcon sx={{ fontSize: 14 }} />
        <span className="font-normal opacity-90">
          {formatTime(slot.slotEndTime)}
        </span>
      </span>
    </button>
  );
}

const NatureTherapyBookingModal = ({ open, handleClose, therapy }) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);
  const [servicesOptions, setServicesOptions] = useState([]);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [slotError, setSlotError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [patientOptions, setPatientOptions] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const { setIsLoading } = useLoader();

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
      serviceFid: null,
      fromDate: new Date(),
      noOfPerson: 1,
      termsAccepted: false,
      specialRequest: "",
      totalAmount: 0,
      perDayAmount: 0,
      fullName: "",
      email: "",
      mobile: "",
      city: "",
      patientFid: null,
    },
    mode: "onChange",
  });

  const patientFid = watch("patientFid");
  const cancelPaymentRef = useRef(null);
  const fromDate = watch("fromDate");
  const noOfPerson = watch("noOfPerson");
  const termsAccepted = watch("termsAccepted");

  useEffect(() => {
    const totalPeople = parseInt(noOfPerson) || 1;

    // Fixed tiered pricing
    let pricePerPerson;
    if (totalPeople >= 5) {
      pricePerPerson = 500; // 5 or more persons
    } else if (totalPeople >= 2) {
      pricePerPerson = 750; // 2 to 4 persons
    } else {
      pricePerPerson = 1000; // 1 person
    }

    const sessionAmount = pricePerPerson * totalPeople;
    setValue("perDayAmount", pricePerPerson);
    setValue("totalAmount", sessionAmount);

    setValue("serviceFid", {
      ...therapy,
      value: therapy.serviceId,
      label: therapy?.serviceName,
    });
  }, [noOfPerson, therapy, setValue]);

  console.log("therapy", therapy);

  useEffect(() => {
    setSelectedTimeSlot(null);
    setSlotError("");
    getServicesByClinicId(5)
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
  }, [setValue]);

  const handleGetPatientData = () => {
    getPatientDataByMobileNo(user?.mobileNo, user.userId, "IPD", 5)
      .then((res) => {
        const data = res?.data?.data || [];
        const filterData = data.find(
          (item) => String(item.patientId) === String(user?.userId),
        );
        if (data?.length) {
          setPatientOptions(
            data.map((d) => ({
              ...d,
              id: d.patientId,
              value: d.patientId,
              label: `${d.firstName || ""} ${d.lastName || ""}`.trim(),
            })),
          );
          if (filterData) {
            setValue(
              "fullName",
              `${filterData.firstName || ""} ${filterData.lastName || ""}`.trim(),
            );
            setValue("email", filterData.emailId || "");
            setValue("mobile", String(filterData.mobileNo || ""));
            setValue("city", filterData.city || "");
          }
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (patientFid !== null && patientFid !== undefined) {
      setValue("fullName", patientFid.label);
      setValue("mobile", String(patientFid.mobileNo || ""));
      setValue("email", patientFid.emailId || "");
      setValue("city", patientFid.city || "");
    }
  }, [patientFid, setValue]);

  useEffect(() => {
    if (user !== null) {
      handleGetPatientData();
    }
  }, [user]);

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
    if (therapy?.serviceId && fromDate) {
      const formattedDate = format(new Date(fromDate), "yyyy-MM-dd");
      GetTherapySlots(formattedDate, therapy?.serviceId, formattedDate, 5)
        .then((res) => {
          console.log("slotsData", res?.data.data);
          setBookedSlots(res.data.data);
        })
        .catch((err) => setBookedSlots([]));
    }
  }, [therapy, fromDate]);

  useEffect(() => {
    if (user?.userId && fromDate) {
      setSelectedTimeSlot(null);
      setSlotError("");
      setLoading(true);
      GetNatureTherapySlotsByUser(
        user.userId,
        fromDate && !isNaN(new Date(fromDate).getTime())
          ? format(new Date(fromDate), "yyyy-MM-dd")
          : "",
      )
        .then((res) => {
          const data = res?.data?.data;
          if (data?.length) {
            setDoctorSlots(data);
          } else {
            setDoctorSlots(staticTimeSlots);
          }
          setLoading(false);
        })
        .catch(() => {
          setDoctorSlots(staticTimeSlots);
          setLoading(false);
        });
    } else {
      setDoctorSlots([]);
      setSelectedTimeSlot(null);
    }
  }, [user?.userId, fromDate]);

  console.log("selectedTimeSlot", therapy);

  const onSubmit = (data) => {
    if (!user) {
      errorAlert("login first");
      return;
    }
    if (!selectedTimeSlot) {
      setSlotError("Please select a time slot");
      return;
    }
    setSlotError("");
    const saveObj = {
      role: patientFid?.userId === user?.userId ? "self" : "other",
      userId: patientFid?.userId,
      patientFid: patientFid?.userId,
      createdBy: user?.userId,
      clinicFid: 5,
      no_Of_Person: data.noOfPerson,
      No_Of_Sessions: 1,
      TherapyName: therapy?.serviceName,
      doctorFid: null,
      fromDate: format(new Date(data.fromDate), "yyyy-MM-dd"),
      toDate: format(new Date(data.fromDate), "yyyy-MM-dd"),
      SpecificRequest: data.specialRequest,
      Amount: watch("totalAmount"),
      totalAmount: watch("totalAmount"),
      serviceGroupID: therapy?.serviceGroupId,
      serviceFid: therapy?.serviceId,
      slots: [
        {
          SlotDate:
            data.fromDate && !isNaN(new Date(data.fromDate).getTime())
              ? format(new Date(data.fromDate), "yyyy-MM-dd")
              : "",
          slotStart: selectedTimeSlot?.slotStartTime,
          slotEnd: selectedTimeSlot?.slotEndTime,
        },
      ],
      FirstTimeTaking: null,
    };

    console.log("naturTherapySaveObj", saveObj);
    setFormData(saveObj);
    setOpenConfirmation(true);
  };

  const handleConfirmBooking = async () => {
    if (isPaymentPending || !formData) return;
    try {
      setIsLoading(true);
      const bookingRes = await BookDetoxTherapy(formData);
      const bookingData = bookingRes?.data;

      if (bookingData?.message) {
        const bookingId = bookingData?.bookingId || bookingData?.data;

        const tempObj = {
          amount: watch("totalAmount"),
          userId: bookingId?.patientUserId,
          paymentFor: "TherapyBooking",
          bookingId: bookingId?.therapyBookingId || bookingId,
        };

        const res = await InitiatePayment(5, bookingId?.patientUserId, tempObj);
        const data = res?.data;

        if (data?.status === 200) {
          setIsLoading(false);
          setIsPaymentPending(true);

          cancelPaymentRef.current = RedirectToSabPaisa(
            data,
            5,
            data.clientTxnId,
            async () => {
              successAlert(bookingData.message);
              setOpenConfirmation(false);
              setIsPaymentPending(false);
              handleClose();
              reset();
              setValue("fromDate", new Date());
            },
            (errorStatus) => {
              const msg =
                errorStatus?.message || "Payment failed or cancelled.";
              errorAlert(msg);
              setOpenConfirmation(false);
              setIsPaymentPending(false);
            },
          );
        } else {
          setIsLoading(false);
          errorAlert(data?.message || "Failed to initiate payment");
        }
      } else {
        setIsLoading(false);
        errorAlert(bookingData?.message || "Booking failed");
      }
    } catch (error) {
      setIsLoading(false);
      errorAlert("An unexpected error occurred during the booking process.");
      console.error(error);
    }
  };

  return (
    <>
      <Modal open={open}>
        <Box
          sx={ModalStyle}
          className="w-[98%] sm:w-[95%] md:w-[90%] lg:w-[80%] xl:w-[75%] 2xl:w-[65%] max-h-[90dvh] overflow-hidden rounded-xl  p-0 no-scrollbar"
        >
          <AnimatePresence>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Modal Card */}
              <div className="relative bg-[#f8fafc] rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
                {/* ── Sticky Header ── */}
                <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 shadow-sm flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
                    <span className="bg-emerald-50 p-1.5 rounded-lg flex items-center justify-center">
                      <Event
                        sx={{ fontSize: 20, color: "var(--booking-primary)" }}
                      />
                    </span>
                    Book Nature Therapy
                  </h2>
                  <CancelButtonModal onClick={handleClose} />
                </div>

                {/* ── Scrollable Body ── */}
                <div className="max-h-[calc(90vh-64px)] overflow-y-auto px-4 sm:px-6 py-6 no-scrollbar">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* ── Main Grid: left 8 cols | right 4 cols ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      {/* ════════════ LEFT COLUMN ════════════ */}
                      <motion.div
                        variants={sectionVariants}
                        className="lg:col-span-8 flex flex-col gap-5"
                      >
                        {/* — Patient Information Card — */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                          <div className="bg-emerald-50 px-5 py-3 flex items-center gap-3">
                            <User className="w-4 h-4 text-emerald-700 shrink-0" />
                            <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-widest flex-1">
                              Patient Information
                            </h2>
                            <CommonButton
                              type="button"
                              onClick={() => setOpenAddPatient(true)}
                              label="+ Add Patient"
                              className="bg-white border border-emerald-600 text-emerald-700 text-xs hover:bg-emerald-50 transition-colors shadow-sm shrink-0 px-3 py-1 rounded-md"
                            />
                          </div>

                          <div className="p-5 space-y-4">
                            {/* Patient selector */}
                            <DropdownField
                              control={control}
                              name="patientFid"
                              placeholder="Select Patient"
                              dataArray={patientOptions}
                              isClearable={true}
                              searchIcon={true}
                            />

                            {/* Fields grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="col-span-1 sm:col-span-2">
                                <InputField
                                  control={control}
                                  name="fullName"
                                  label="Full Name *"
                                  error={errors.fullName}
                                  shrink={true}
                                />
                              </div>
                              <InputField
                                control={control}
                                name="mobile"
                                label="Mobile Number *"
                                error={errors.mobile}
                                shrink={true}
                              />
                              <InputField
                                control={control}
                                name="email"
                                label="Email Address *"
                                error={errors.email}
                                shrink={true}
                              />
                              <div className="col-span-1 sm:col-span-2">
                                <InputField
                                  control={control}
                                  name="city"
                                  label="City"
                                  error={errors.city}
                                  shrink={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* — Therapy & Schedule Card — */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                          <div className="bg-emerald-50 px-5 py-3 flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                            <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                              Therapy &amp; Schedule
                            </h2>
                          </div>

                          <div className="p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="col-span-1 sm:col-span-2">
                                <DropdownField
                                  control={control}
                                  name="serviceFid"
                                  placeholder="Select Therapy *"
                                  dataArray={[]}
                                  error={errors.serviceFid}
                                  isDisabled={true}
                                />
                              </div>
                              <DatePickerField
                                control={control}
                                name="fromDate"
                                label="Appointment Date *"
                                inputFormat="dd-MM-yyyy"
                                disablePast={true}
                                error={errors.fromDate}
                              />
                              <InputField
                                control={control}
                                name="noOfPerson"
                                label="Number of Persons *"
                                type="number"
                                error={errors.noOfPerson}
                                InputProps={{ inputProps: { min: 1, max: 20 } }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* — Special Requests Card — */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-5 space-y-4">
                          <InputArea
                            name="specialRequest"
                            control={control}
                            label="Specific Requests or Medical Conditions"
                            placeholder="Please mention any special requirements..."
                            error={errors.specialRequest}
                          />
                          <CheckBoxField
                            name="termsAccepted"
                            control={control}
                            label="I agree to the clinical guidelines and terms."
                            error={errors.termsAccepted}
                          />
                        </div>
                      </motion.div>

                      {/* ════════════ RIGHT COLUMN ════════════ */}
                      <motion.div
                        variants={sectionVariants}
                        className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-0 h-fit"
                      >
                        {/* — Time Slots Card — */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                          <div className="bg-sky-50 px-5 py-3 flex items-center gap-3">
                            <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                            <h2 className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                              Available Slots
                            </h2>
                          </div>

                          <div className="p-4 min-h-[180px] flex flex-col">
                            {loading ? (
                              /* Spinner */
                              <div className="flex flex-1 items-center justify-center h-40">
                                <div className="w-8 h-8 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin" />
                              </div>
                            ) : doctorSlots?.length > 0 ? (
                              /* Slot chips grid */
                              <div className="grid grid-cols-2 gap-2">
                                {doctorSlots.map((slot, index) => {
                                  // Disable past slots only when the selected date is today
                                  const isToday =
                                    fromDate &&
                                    new Date(fromDate).toDateString() ===
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

                                  const matchedBookedSlot = (
                                    bookedSlots || []
                                  ).find(
                                    (bs) =>
                                      bs.slotStartTime === slot.slotStartTime &&
                                      bs.slotEndTime === slot.slotEndTime,
                                  );
                                  const isAvailable =
                                    (matchedBookedSlot
                                      ? matchedBookedSlot.isAvailable
                                      : slot.isAvailable) &&
                                    !slot?.isBookedByUser;

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
                              /* Empty state */
                              <div className="flex flex-col flex-1 items-center justify-center h-40 text-center p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                                <Clock className="w-8 h-8 text-slate-300 mb-2" />
                                <p className="text-[11px] text-slate-400 font-medium leading-snug">
                                  {fromDate
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
                        </div>

                        {/* — Bill Summary Card — */}
                        <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 p-5">
                          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-emerald-100">
                            <Banknote className="w-4 h-4 text-emerald-700 shrink-0" />
                            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
                              Bill Summary
                            </h3>
                          </div>

                          <div className="space-y-2.5">
                            {/* Price / Person */}
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-500 font-medium">
                                Price / Person
                              </span>
                              <span className="font-bold text-slate-700">
                                ₹{watch("perDayAmount")?.toLocaleString()}
                              </span>
                            </div>

                            {/* Persons */}
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-500 font-medium">
                                Persons
                              </span>
                              <span className="font-bold text-slate-700">
                                × {watch("noOfPerson")}
                              </span>
                            </div>

                            {/* GST */}
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-500 font-medium">
                                GST &amp; TC
                              </span>
                              <span className="font-bold text-slate-700">
                                0
                              </span>
                            </div>

                            {/* Total + CTA */}
                            <div className="pt-3 border-t border-emerald-200 flex justify-between items-end gap-3">
                              <div>
                                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mb-0.5">
                                  Total Amount
                                </p>
                                <p className="text-2xl font-black tracking-tight text-emerald-800">
                                  ₹{watch("totalAmount")?.toLocaleString()}
                                </p>
                              </div>
                              <CommonButton
                                type="submit"
                                label="Book Now"
                                className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white  transition-all"
                                disabled={!termsAccepted}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* ── Mobile-only footer CTA (hidden on lg+) ── */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 lg:hidden">
                      <CommonButton
                        type="button"
                        onClick={reset}
                        label="Reset"
                        className="border border-red-600 text-red-600 bg-red-50 px-4 py-2 rounded-lg text-xs"
                      />
                      <CommonButton
                        type="submit"
                        label="Confirm Booking"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs"
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
        // confirmationHandleClose={() => setOpenConfirmation(false)}
        confirmationSubmitFunc={handleConfirmBooking}
        confirmationLabel="Confirm Therapy Booking"
        confirmationMsg="Are you sure you want to book this nature therapy for the selected slot?"
        confirmationHandleClose={() => {
          if (cancelPaymentRef.current) {
            cancelPaymentRef.current();
            cancelPaymentRef.current = null;
          }
          setIsPaymentPending(false);
          setOpenConfirmation(false);
        }}
        confirmationButtonMsg={
          isPaymentPending ? "Processing..." : "Confirm & Pay"
        }
        disabled={isPaymentPending}
      />

      {openAddPatient && (
        <AddPatientModal
          open={openAddPatient}
          handleClose={() => {
            setOpenAddPatient(false);
            handleGetPatientData();
          }}
        />
      )}
    </>
  );
};

export default NatureTherapyBookingModal;
