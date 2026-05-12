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
  GetBeautyTherapySlots
} from "../../../../services/healingServices/beautyTherapyServices/BeautyTherapyServices";
import { BookDetoxTherapy, GetTherapySlots } from "../../../../services/healingServices/detoxTherapyServices/DetoxTherapyServices";
import CancelButtonModal from "../../../common/button/CancelButtonModal";

import CommonButton from "../../../common/button/CommonButton";
import { useLoader } from "../../../common/commonLoader/LoaderContext";
import ConfirmationModal from "../../../common/ConfirmationModal";
import CheckBoxField from "../../../common/formFields/CheckBoxField";
import DatePickerField from "../../../common/formFields/DatePickerField";
import DropdownField from "../../../common/formFields/DropdownField";
import InputArea from "../../../common/formFields/InputArea";
import InputField from "../../../common/formFields/InputField";
import { errorAlert, successAlert } from "../../../common/toast/CustomToast";
import AddPatientModal from "../../opdBooking/AddPatientModal";
import { RedirectToSabPaisa } from "../../opdBooking/RedirectToSabPaisa";

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

const dropdownObjectSchema = yup
  .object()
  .shape({
    id: yup.mixed().required(),
    label: yup.string().required(),
  })
  .nullable()
  .required("This field is required");

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  mobile: yup.string().required("Mobile number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  city: yup.string().nullable(),
  serviceFid: dropdownObjectSchema.typeError("Therapy is required"),
  bookingDate: yup.date().required("Booking date is required").nullable(),
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

const staticTimeSlots = [
  { slotStartTime: "09:00:00", slotEndTime: "10:00:00", isAvailable: true },
  { slotStartTime: "10:00:00", slotEndTime: "11:00:00", isAvailable: true },
  { slotStartTime: "11:00:00", slotEndTime: "12:00:00", isAvailable: true },
  { slotStartTime: "12:00:00", slotEndTime: "13:00:00", isAvailable: true },
  { slotStartTime: "13:00:00", slotEndTime: "14:00:00", isAvailable: true },
  { slotStartTime: "14:00:00", slotEndTime: "15:00:00", isAvailable: true },
  { slotStartTime: "15:00:00", slotEndTime: "16:00:00", isAvailable: true },
  { slotStartTime: "16:00:00", slotEndTime: "17:00:00", isAvailable: true },
]

function TimeSlotChip({ slot, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={!slot.isAvailable}
      className={`
        relative px-2 py-2 rounded-md font-semibold text-[10px] transition-all duration-200 
        ${
          isSelected
            ? "bg-booking-primary text-white shadow-md"
            : "bg-slate-100 text-booking-label hover:bg-booking-primaryLight border border-booking-border"
        }
        disabled:opacity-40 disabled:cursor-not-allowed
      `}
    >
      <span className="flex items-center space-x-1 whitespace-nowrap">
        <span className="font-bold">{formatTime(slot.slotStartTime)}</span>
        <NavigateNextIcon sx={{ fontSize: 14 }} />
        <span className="font-normal opacity-90">{formatTime(slot.slotEndTime)}</span>
      </span>
    </button>
  );
}

const BeautyTherapyBookingModal = ({ open, handleClose, eventDetails }) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);

  // API specific states
  const [servicesOptions, setServicesOptions] = useState([]);
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [slotError, setSlotError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [patientOptions, setPatientOptions] = useState([]);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);


  const { setIsLoading } = useLoader();
  const cancelPaymentRef = useRef(null);
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
      fullName: "",
      email: "",
      mobile: "",
      city: "",
      patientFid: null,
      serviceFid: null,
      bookingDate: new Date(),
      termsAccepted: false,
      specialRequest: "",
      totalAmount: 0,
      perDayAmount: 0,
    },
    mode: "onChange",
  });

  const patientFid = watch("patientFid");

  const bookingDate = watch("bookingDate");
  const selectedServiceValue = watch("serviceFid");
  const termsAccepted = watch("termsAccepted");

  console.log("selectedServiceValue", selectedServiceValue);

  useEffect(() => {
    setValue("clinicFid", { id: 5, value: 5, label: "Swagram Community" });
    setValue("location", { id: 1, value: 1, label: "Lavale" });
  }, [setValue]);

  useEffect(() => {
    setDoctorSlots([]);
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

    useEffect(() => {
      if (eventDetails?.serviceId && bookingDate) {
        const formattedDate = format(new Date(bookingDate), "yyyy-MM-dd");
        GetTherapySlots(formattedDate, eventDetails?.serviceId, formattedDate, 5)
          .then((res) => {
            console.log("slotsData", res?.data.data);
            setBookedSlots(res.data.data);
          })
          .catch((err) => setBookedSlots([]));
      }
    }, [eventDetails, bookingDate]);

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
    if (selectedServiceValue !== null) {
      const price = selectedServiceValue?.charges || 0;
      const gst = Math.round(price);
      setValue("perDayAmount", 0);
      setValue("totalAmount", price);
    }
  }, [selectedServiceValue, setValue]);

  useEffect(() => {
    if (user !== null) {
      handleGetPatientData();
    }
  }, [user]);

  useEffect(() => {
    setValue("serviceFid", {
      ...eventDetails,
      id: eventDetails.serviceName,
      value: eventDetails.serviceName,
      label: eventDetails.serviceName,
      charges: eventDetails.charges || 0,
    });
  }, [eventDetails, setValue]);

  useEffect(() => {
    if (user?.userId && bookingDate) {
      setSelectedTimeSlot(null);
      setSlotError("");
      setLoading(true);

      const bookingDateStr =
        bookingDate && !isNaN(new Date(bookingDate).getTime())
          ? format(new Date(bookingDate), "yyyy-MM-dd")
          : "";

      GetBeautyTherapySlots(user.userId, bookingDateStr)
        .then((res) => {
          const data = res?.data?.data || [];
          const slots = data?.length > 0 ? data : staticTimeSlots;
          setDoctorSlots(slots);
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
  }, [user?.userId, bookingDate]);

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
      userId: user?.userId || null,
      patientFid: patientFid?.userId,
      createdBy: user?.userId,
      clinicFid: 5,
      SpecificRequest: data.specialRequest,
      no_Of_Person: 1,
      No_Of_Sessions: 1,
      Amount: watch("totalAmount"),
      fromDate: format(new Date(data.bookingDate), "yyyy-MM-dd"),
      toDate: format(new Date(data.bookingDate), "yyyy-MM-dd"),
      totalAmount: watch("totalAmount"),
      doctorFid: null,
      serviceGroupID: eventDetails?.serviceGroupId,
      serviceFid: eventDetails?.serviceId,
      slots: [
        {
          SlotDate:
            data.bookingDate && !isNaN(new Date(data.bookingDate).getTime())
              ? format(new Date(data.bookingDate), "yyyy-MM-dd")
              : "",
          slotStart: selectedTimeSlot?.slotStartTime,
          slotEnd: selectedTimeSlot?.slotEndTime,
        },
      ],
      FirstTimeTaking: null,
    };
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
          userId: user?.userId,
          patientId: patientFid?.userId,
          paymentFor: "TherapyBooking",
          bookingId: bookingId?.therapyBookingId || bookingId,
        };

        const res = await InitiatePayment(
          5,
          patientFid?.userId || user?.userId,
          tempObj,
        );
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
              setValue("bookingDate", new Date());
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
              <div className="relative bg-booking-bg rounded-[9px] shadow-2xl border border-booking-border overflow-hidden">
                <div className="sticky top-0 z-20 bg-white border-b border-booking-border px-4 sm:px-6 py-3 shadow-md flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-bold text-booking-text flex items-center gap-2">
                    <span className="bg-booking-primary/10 p-1.5 rounded-[9px] flex items-center justify-center">
                      <Event
                        sx={{ fontSize: 20, color: "var(--booking-primary)" }}
                        className="text-booking-primary"
                      />
                    </span>
                    Book Beauty Therapy
                  </h2>
                  <CancelButtonModal onClick={handleClose} />
                </div>

                <div className="max-h-[calc(90vh-88px)] overflow-y-auto px-4 sm:px-6 py-6 no-scrollbar bg-[#f8fafc]">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid lg:grid-cols-3 gap-5">
                      <motion.div
                        variants={sectionVariants}
                        className="lg:col-span-2 space-y-5"
                      >
                        {/* Patient & Therapy Info */}
                        <div className="bg-booking-surface rounded-[9px] shadow-sm border border-booking-border overflow-hidden">
                          <div className="bg-booking-primaryLight px-4 py-2 md:flex justify-between items-center gap-2 font-bold text-booking-primary">
                            <div className="p-1.5 flex space-x-3 items-center rounded-[9px]">
                              <User className="w-5 h-5 " />
                              <h2 className="text-base sm:text-lg flex-1 whitespace-nowrap">
                                Patient & Therapy Details
                              </h2>
                            </div>
                            <div className="flex justify-end ">
                              <CommonButton
                                type="button"
                                onClick={() => setOpenAddPatient(true)}
                                label="+ Add Patient"
                                className="bg-booking-primary text-white  hover:bg-booking-primaryDark transition-all shadow-sm shrink-0"
                              />
                            </div>
                          </div>
                          <div className="p-4 sm:p-5">
                            <div className="mb-4">
                              <DropdownField
                                control={control}
                                name="patientFid"
                                placeholder="Select Patient"
                                dataArray={patientOptions}
                                isClearable={true}
                                searchIcon={true}
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="md:col-span-2">
                                <InputField
                                  control={control}
                                  name="fullName"
                                  label="Full Name *"
                                  error={errors.fullName}
                                  shrink={true}
                                />
                              </div>
                              <div>
                                <InputField
                                  control={control}
                                  name="mobile"
                                  label="Mobile Number *"
                                  error={errors.mobile}
                                  shrink={true}
                                />
                              </div>
                              <div>
                                <InputField
                                  control={control}
                                  name="email"
                                  label="Email Address *"
                                  error={errors.email}
                                  shrink={true}
                                />
                              </div>
                              <div className="md:col-span-2">
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

                        {/* Schedule Info */}
                        <div className="bg-booking-surface rounded-[9px] shadow-sm border border-booking-border overflow-hidden">
                          <div className="bg-booking-primaryLight px-4 py-2 flex items-center gap-2 text-booking-primary font-bold">
                            <div className="p-1.5 bg-booking-primary/10 rounded-lg">
                              <Calendar className="w-5 h-5" />
                            </div>
                            <h2 className="text-base sm:text-lg">
                              Schedule Options
                            </h2>
                          </div>
                          <div className="p-4 sm:p-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="">
                                {/* <DropdownField
                                  control={control}
                                  name="doctorFid"
                                  placeholder="Select Therapist *"
                                  dataArray={doctorOptions}
                                  error={errors.doctorFid}
                                /> */}

                                <DropdownField
                                  control={control}
                                  name="serviceFid"
                                  placeholder="Select Therapy *"
                                  dataArray={servicesOptions}
                                  error={errors.serviceFid}
                                  isDisabled={
                                    eventDetails?.serviceName ? true : false
                                  }
                                />
                              </div>
                              <div className="md:col-span-2 sm:col-span-1">
                                <DatePickerField
                                  control={control}
                                  name="bookingDate"
                                  label="Booking Date *"
                                  inputFormat="dd-MM-yyyy"
                                  disablePast={true}
                                  error={errors.bookingDate}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-booking-surface rounded-[9px] shadow-sm border border-booking-border overflow-hidden p-4 sm:p-5">
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
                        <div className="bg-booking-surface rounded-[9px] shadow-sm border border-booking-border lg:sticky lg:top-0 h-full flex flex-col">
                          <div className="bg-booking-secondaryLight px-4 py-2 flex items-center gap-2 rounded-t-[9px] text-booking-secondary font-bold">
                            <div className="p-1.5 bg-booking-secondary/10 rounded-[9px]">
                              <Clock className="w-5 h-5" />
                            </div>
                            <h2 className="text-base sm:text-lg">
                              Available Slots
                            </h2>
                          </div>

                          <div className="p-4 sm:p-5 flex-1 relative min-h-[200px]">
                            {loading ? (
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80">
                                <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
                                <p className="mt-3 text-sm text-slate-500 font-medium animate-pulse">
                                  Loading slots...
                                </p>
                              </div>
                            ) : doctorSlots?.length > 0 ?(
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-2 gap-2 content-start h-full"
                              >
                                {doctorSlots.map((slot, index) => {
                                  const matchingBookedSlot = (bookedSlots || []).find(
                                    (bs) =>
                                      bs.slotStartTime === slot.slotStartTime &&
                                      bs.slotEndTime === slot.slotEndTime
                                  );

                                  let isAvailable = matchingBookedSlot
                                    ? matchingBookedSlot.isAvailable
                                    : slot.isAvailable;

                                  // Disable past slots if booking for today
                                  const bookingDateStr =
                                    bookingDate && !isNaN(new Date(bookingDate).getTime())
                                      ? format(new Date(bookingDate), "yyyy-MM-dd")
                                      : "";
                                  const today = format(new Date(), "yyyy-MM-dd");
                                  const currentTime = format(new Date(), "HH:mm:ss");

                                  if (bookingDateStr === today) {
                                    if (slot.slotStartTime < currentTime) {
                                      isAvailable = false;
                                    }
                                  }

                                  return (
                                    <TimeSlotChip
                                      key={index}
                                      slot={{ ...slot, isAvailable }}
                                      isSelected={
                                        selectedTimeSlot?.slotStartTime ===
                                        slot.slotStartTime
                                      }
                                      onSelect={() => {
                                        setSelectedTimeSlot({ ...slot, isAvailable });
                                        setSlotError("");
                                      }}
                                    />
                                  );
                                })}
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center h-full text-center p-6 bg-slate-50 rounded-[9px] border border-dashed border-slate-200"
                              >
                                {bookingDate ? (
                                  <>
                                    <div className="w-12 h-12 bg-booking-primaryLight rounded-full flex items-center justify-center mb-3">
                                      <Clock className="w-6 h-6 text-booking-primary" />
                                    </div>
                                    <p className="text-slate-600 font-medium">
                                      No slots available
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <div className="w-12 h-12 bg-booking-primaryLight rounded-full flex items-center justify-center mb-3">
                                      <Calendar className="w-6 h-6 text-booking-primary" />
                                    </div>
                                    <p className="text-slate-500 font-medium text-sm">
                                      Select Booking Date to view slots.
                                    </p>
                                  </>
                                )}
                              </motion.div>
                            )}
                          </div>
                          {slotError && (
                            <div className="px-4 py-2 bg-red-50 text-red-500 text-xs font-medium border-y border-red-100 flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-red-500"></span>
                              {slotError}
                            </div>
                          )}

                          {/* Bill Summary Section */}
                          <div className="bg-booking-primaryLight mx-4 mb-4 p-4 rounded-[9px] border border-booking-primary/20 shadow-sm">
                            <div className="flex items-center gap-2 mb-3 border-b border-booking-primary/10 pb-2">
                              <Banknote className="w-4 h-4 text-booking-primary" />
                              <h3 className="text-[11px] font-bold uppercase tracking-widest text-booking-primaryDark">
                                Bill Summary
                              </h3>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-[11px] font-medium">
                                <span className="text-slate-500">
                                  Service Charge
                                </span>
                                <span className="text-slate-700 font-bold">
                                  ₹{selectedServiceValue?.charges || 0}
                                </span>
                              </div>
                              <div className="flex justify-between text-[11px] font-medium">
                                <span className="text-slate-500">
                                  GST (18%)
                                </span>
                                <span className="text-slate-700 font-bold">
                                  ₹{Math.round(0)}
                                </span>
                              </div>
                              <div className="pt-2 mt-2 border-t border-booking-primary/10 flex justify-between items-end">
                                <div>
                                  <p className="text-[9px] text-booking-primary font-bold uppercase tracking-tighter">
                                    Total Payable
                                  </p>
                                  <p className="text-xl font-black text-booking-primaryDark leading-none">
                                    ₹{watch("totalAmount")?.toLocaleString()}
                                  </p>
                                </div>
                                <div className="text-[8px] text-slate-400 font-medium italic">
                                  Inclusive of GST
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    <div className="flex justify-end gap-3 md:pt-6 pb-2">
                      <CommonButton
                        type="button"
                        onClick={reset}
                        label="Reset"
                        className="bg-red-50 border border-red-600 text-red-600 "
                      />
                      <CommonButton
                        type="submit"
                        label="Book Now"
                        onClick={handleSubmit(onSubmit)}
                        className="bg-booking-primary hover:bg-booking-primaryDark text-white  transition-transform w-full sm:w-auto"
                        disabled={!termsAccepted}
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
        confirmationSubmitFunc={handleConfirmBooking}
        confirmationLabel="Confirm Therapy Booking"
        confirmationMsg="Are you sure you want to book this beauty therapy for the selected slot?"
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

export default BeautyTherapyBookingModal;
