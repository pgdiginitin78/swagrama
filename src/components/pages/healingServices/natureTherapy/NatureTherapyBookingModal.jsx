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
  TherapySlots,
} from "../../../../services/healingServices/detoxTherapyServices/DetoxTherapyServices";
import ConfirmationModal from "../../../common/ConfirmationModal";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import { useLoader } from "../../../common/commonLoader/LoaderContext";
import CheckBoxField from "../../../common/formFields/CheckBoxField";
import DatePickerField from "../../../common/formFields/DatePickerField";
import DropdownField from "../../../common/formFields/DropdownField";
import InputArea from "../../../common/formFields/InputArea";
import InputField from "../../../common/formFields/InputField";
import { ModalStyle } from "../../../common/modalStyle/ModalStyle";
import { errorAlert, successAlert } from "../../../common/toast/CustomToast";
import AddPatientModal from "../../opdBooking/AddPatientModal";
import { RedirectToSabPaisa } from "../../opdBooking/RedirectToSabPaisa";

const NATURE_THERAPY_PRICE_MAP = {
  114: { single: 400, group: 200, bulk: 100 },
  111: { single: 750, group: 500, bulk: 250 },
  110: { single: 750, group: 500, bulk: 250 },
  115: { single: 400, group: 200, bulk: 100 },
  112: { single: 400, group: 200, bulk: 100 },
  113: { single: 750, group: 500, bulk: 250 },
};

const DEFAULT_THERAPY_PRICING = { single: 1000, group: 750, bulk: 500 };

const resolveTherapyPricing = (therapy, origin) => {
  if (
    therapy?.pricing &&
    !Array.isArray(therapy.pricing) &&
    therapy.pricing.single != null &&
    therapy.pricing.group != null &&
    therapy.pricing.bulk != null
  ) {
    const single = Number(therapy.pricing.single) || 0;
    const group = Number(therapy.pricing.group) || 0;
    const bulk = Number(therapy.pricing.bulk) || 0;
    if (single > 0) {
      return {
        single,
        group: Math.max(1, group),
        bulk: Math.max(1, bulk),
      };
    }
    return { single, group, bulk };
  }

  const baseCharges = Number(therapy?.charges) || 0;

  if (origin === "Yoga Therapy") {
    if (baseCharges > 0) {
      return {
        single: baseCharges,
        group: Math.max(1, Math.round(baseCharges * 0.75)),
        bulk: Math.max(1, Math.round(baseCharges * 0.5)),
      };
    }
    return DEFAULT_THERAPY_PRICING;
  }

  const mapped = NATURE_THERAPY_PRICE_MAP[therapy?.serviceId];
  if (mapped) return mapped;

  if (baseCharges > 0) {
    return {
      single: baseCharges,
      group: Math.max(1, Math.round(baseCharges * 0.5)),
      bulk: Math.max(1, Math.round(baseCharges * 0.25)),
    };
  }

  return DEFAULT_THERAPY_PRICING;
};

const getPricePerPerson = (pricing, totalPeople) => {
  if (totalPeople >= 5) return pricing.bulk;
  if (totalPeople >= 2) return pricing.group;
  return pricing.single;
};

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
    .integer("Must be a whole number")
    .min(1, "At least 1 person is required")
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
  patientFid: yup.object().nullable().required("Patient is required"),
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
  if (!timeStr || typeof timeStr !== "string") return timeStr || "";

  const trimmed = timeStr.trim();
  const ampmMatch = trimmed.match(/(AM|PM)/i);

  if (ampmMatch) {
    const period = ampmMatch[1].toUpperCase();
    const cleanTime = trimmed.replace(/\s*(AM|PM)\s*/gi, "").trim();
    if (cleanTime.includes(":")) {
      const [hours, minutes] = cleanTime.split(":");
      const h = parseInt(hours, 10);
      const m = (minutes || "00").substring(0, 2);
      if (!isNaN(h)) {
        return `${h}:${m} ${period}`;
      }
    }
    return trimmed;
  }

  if (trimmed.includes(":") && trimmed.split(":").length >= 2) {
    const [hours, minutes] = trimmed.split(":");
    let h = parseInt(hours, 10);
    if (!isNaN(h)) {
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      const m = (minutes || "00").substring(0, 2);
      return `${h}:${m} ${ampm}`;
    }
  }
  return timeStr;
};

const getSlotAvailableCapacity = (slot) => {
  if (!slot || typeof slot.maxBookings !== "number") return null;
  return Math.max(0, slot.maxBookings - (slot.bookingCount || 0));
};

const getDisabledReasonBadge = ({ isTimePast, isFull, genderOk, genderMessage }) => {
  if (isTimePast) return "Time passed";
  if (isFull) return "Full";
  if (genderOk === false) {
    const msg = String(genderMessage || "").toLowerCase();
    if (msg.includes("female")) return "Female only";
    if (msg.includes("male")) return "Male only";
    return "Restricted";
  }
  return null;
};

function TimeSlotChip({
  slot,
  isSelected,
  onSelect,
  isTimePast = false,
  requestedPersons = 0,
}) {
  const availableCapacity = getSlotAvailableCapacity(slot);
  const isFull = availableCapacity !== null && availableCapacity <= 0;
  const exceedsChipCapacity =
    availableCapacity !== null &&
    availableCapacity > 0 &&
    requestedPersons > availableCapacity;
  const displayRemaining =
    isSelected &&
    availableCapacity !== null &&
    requestedPersons >= 1 &&
    !exceedsChipCapacity
      ? Math.max(0, availableCapacity - requestedPersons)
      : availableCapacity;
  const isDisabled =
    !slot.isAvailable ||
    slot.isBookedByUser ||
    isTimePast ||
    isFull ||
    (!isSelected && exceedsChipCapacity);
  const disabledReason = isDisabled
    ? getDisabledReasonBadge({
        isTimePast,
        isFull,
        genderOk: slot.genderOk,
        genderMessage: slot.genderMessage,
      })
    : null;
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isDisabled}
      title={
        isTimePast
          ? "This time slot has already passed"
          : slot.genderOk === false
            ? slot.genderMessage || "Not allowed for selected patient gender"
            : isFull
              ? "No capacity remaining"
              : exceedsChipCapacity
                ? `Only ${availableCapacity} spot(s) left; reduce Number of Persons to ${availableCapacity} or less`
                : availableCapacity !== null
                  ? `${slot.genderMessage ? `${slot.genderMessage} • ` : ""}${availableCapacity} of ${slot.maxBookings} spots available`
                  : slot.genderMessage
      }
      className={`
        relative px-2 py-2 rounded-md font-semibold text-[10px] transition-all duration-200 flex flex-col items-start gap-0.5
        ${
          isSelected
            ? "bg-booking-primary text-white shadow-md"
            : isDisabled
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
      {availableCapacity !== null && (
        <span
          className={`text-[9px] font-medium ${
            isSelected
              ? "text-white/90"
              : isDisabled || exceedsChipCapacity
                ? "text-red-500"
                : "text-emerald-700"
          }`}
        >
          {disabledReason
            ? isFull
              ? "Full"
              : `${availableCapacity} left • ${disabledReason}`
            : exceedsChipCapacity
              ? `Only ${availableCapacity} left`
              : `${displayRemaining} left`}
        </span>
      )}
    </button>
  );
}

const NatureTherapyBookingModal = ({ open, handleClose, therapy, origin }) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);
  const [servicesOptions, setServicesOptions] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [slotError, setSlotError] = useState("");
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [patientOptions, setPatientOptions] = useState([]);
  const [therapySlots, setTherapySlots] = useState([]);
  const [isSlotsLoading, setIsSlotsLoading] = useState(false);
  const [capacityWarning, setCapacityWarning] = useState("");
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

  const isGenderAllowed = (slot, patient) => {
    if (!patient || !patient.gender) return true;
    const g = String(patient.gender).toLowerCase().trim();
    const patientGender = g.startsWith("f") ? "female" : g.startsWith("m") ? "male" : g;
    const msg = String(slot.genderMessage || "").toLowerCase();
    if (!msg || msg.includes("both")) return true;
    return msg.split(/[^a-z]+/).includes(patientGender);
  };

  const isSlotTimeInPast = (startTime, dateValue) => {
    if (!dateValue || !startTime) return false;
    const targetDate = new Date(dateValue);
    if (isNaN(targetDate.getTime())) return false;
    const now = new Date();
    if (targetDate.toDateString() !== now.toDateString()) return false;
    const [h, m, s] = String(startTime).split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return false;
    const slotDateTime = new Date();
    slotDateTime.setHours(h, m, s || 0, 0);
    return slotDateTime < now;
  };

  const doctorSlots = therapySlots.map((s) => {
    const genderOk = isGenderAllowed(s, patientFid);
    const availableCapacity = getSlotAvailableCapacity(s);
    const hasCapacity = availableCapacity === null ? true : availableCapacity > 0;
    const isTimePast = isSlotTimeInPast(s.startTime, fromDate);
    return {
      ...s,
      slotStartTime: s.startTime,
      slotEndTime: s.endTime,
      availableCapacity,
      genderOk,
      isTimePast,
      isAvailable:
        String(s.status || "").toLowerCase() === "available" &&
        hasCapacity &&
        genderOk,
    };
  });

  const activeSelectedSlot = selectedTimeSlot
    ? doctorSlots.find(
        (s) =>
          s.slotStartTime === selectedTimeSlot.slotStartTime &&
          s.serviceRoomID === selectedTimeSlot.serviceRoomID,
      ) || selectedTimeSlot
    : null;

  const selectedSlotCapacity = activeSelectedSlot
    ? getSlotAvailableCapacity(activeSelectedSlot)
    : null;

  const bookableCapacities = doctorSlots
    .filter((s) => s.isAvailable && !s.isTimePast && s.availableCapacity !== null)
    .map((s) => s.availableCapacity);

  const maxDayAvailableCapacity =
    bookableCapacities.length > 0 ? Math.max(...bookableCapacities) : null;

  const hasAnyBookableSlot = doctorSlots.some(
    (s) =>
      s.isAvailable &&
      !s.isTimePast &&
      (s.availableCapacity === null || s.availableCapacity > 0),
  );

  const noCapacityRemains =
    !isSlotsLoading && Boolean(fromDate) && !hasAnyBookableSlot;

  const activeAvailableCapacity =
    selectedSlotCapacity !== null
      ? selectedSlotCapacity
      : noCapacityRemains
        ? 0
        : maxDayAvailableCapacity;

  const parsedRequestedPersons = parseInt(noOfPerson, 10);
  const requestedPersons = Number.isNaN(parsedRequestedPersons)
    ? 0
    : parsedRequestedPersons;

  const exceedsSelectedCapacity =
    activeAvailableCapacity !== null &&
    requestedPersons > activeAvailableCapacity;

  const remainingAfterSelection =
    selectedSlotCapacity !== null &&
    requestedPersons >= 1 &&
    requestedPersons <= selectedSlotCapacity
      ? Math.max(0, selectedSlotCapacity - requestedPersons)
      : selectedSlotCapacity;

  const isBookingDisabled =
    !termsAccepted ||
    noCapacityRemains ||
    (selectedSlotCapacity !== null && selectedSlotCapacity <= 0) ||
    exceedsSelectedCapacity ||
    requestedPersons < 1;

  useEffect(() => {
    if (noOfPerson === "" || noOfPerson === null || noOfPerson === undefined) {
      setCapacityWarning("");
      return;
    }
    const n = parseInt(noOfPerson, 10);
    if (isNaN(n) || n < 1) {
      setCapacityWarning("");
      setValue("noOfPerson", 1, { shouldValidate: true });
      return;
    }
    if (
      activeAvailableCapacity !== null &&
      activeAvailableCapacity > 0 &&
      n > activeAvailableCapacity
    ) {
      setCapacityWarning(
        `Maximum ${activeAvailableCapacity} person(s) allowed for this slot.`,
      );
      setValue("noOfPerson", activeAvailableCapacity, {
        shouldValidate: true,
        shouldDirty: true,
      });
      return;
    }
    if (n !== activeAvailableCapacity) {
      setCapacityWarning("");
    }
    if (n !== Number(noOfPerson)) {
      setValue("noOfPerson", n, { shouldValidate: true });
    }
  }, [noOfPerson, activeAvailableCapacity, setValue]);

  useEffect(() => {
    setCapacityWarning("");
  }, [fromDate, open]);

  useEffect(() => {
    if (
      selectedTimeSlot &&
      patientFid &&
      !isGenderAllowed(selectedTimeSlot, patientFid)
    ) {
      setSelectedTimeSlot(null);
    }
  }, [patientFid]);

  useEffect(() => {
    if (!therapy) return;
    const totalPeople = parseInt(noOfPerson, 10) || 1;
    const pricing = resolveTherapyPricing(therapy, origin);
    const pricePerPerson = getPricePerPerson(pricing, totalPeople);

    const sessionAmount = pricePerPerson * totalPeople;
    setValue("perDayAmount", pricePerPerson);
    setValue("totalAmount", sessionAmount);

    setValue("serviceFid", {
      ...therapy,
      value: therapy.serviceId,
      label: therapy?.serviceName,
    });
  }, [noOfPerson, therapy, origin, setValue]);

  useEffect(() => {
    setSelectedTimeSlot(null);
    setSlotError("");
    if(patientFid?.userId){
      getServicesByClinicId(5,patientFid?.userId)
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
    }
  }, [setValue,patientFid?.userId]);

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
              { shouldValidate: true },
            );
            setValue("email", filterData.emailId || "", {
              shouldValidate: true,
            });
            setValue("mobile", String(filterData.mobileNo || ""), {
              shouldValidate: true,
            });
            setValue("city", filterData.city || "", { shouldValidate: true });
          }
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (patientFid !== null && patientFid !== undefined) {
      setValue("fullName", patientFid.label, { shouldValidate: true });
      setValue("mobile", String(patientFid.mobileNo || ""), {
        shouldValidate: true,
      });
      setValue("email", patientFid.emailId || "", { shouldValidate: true });
      setValue("city", patientFid.city || "", { shouldValidate: true });
    } else {
      setValue("fullName", "");
      setValue("mobile", "");
      setValue("email", "");
      setValue("city", "");
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
    if (
      !open ||
      !therapy?.serviceId ||
      !fromDate ||
      isNaN(new Date(fromDate).getTime())
    ) {
      setTherapySlots([]);
      return;
    }

    const activeDate = format(new Date(fromDate), "yyyy-MM-dd");
    setSelectedTimeSlot(null);
    setSlotError("");
    setIsSlotsLoading(true);

    TherapySlots(therapy.serviceId, activeDate)
      .then((res) => {
        console.log("therapy slots", res?.data?.data);
        const data = Array.isArray(res?.data?.data) ? res?.data?.data : [];
        const slotByStartTime = new Map();
        data.forEach((s) => {
          if (!s?.startTime) return;
          const existing = slotByStartTime.get(s.startTime);
          const cap = getSlotAvailableCapacity(s) ?? 0;
          const existingCap = existing ? getSlotAvailableCapacity(existing) ?? 0 : -1;
          if (!existing || cap > existingCap) {
            slotByStartTime.set(s.startTime, s);
          }
        });
        const uniqueData = Array.from(slotByStartTime.values());
        uniqueData.sort((a, b) =>
          (a.startTime || "").localeCompare(b.startTime || ""),
        );
        setTherapySlots(uniqueData);
      })
      .catch((error) => {
        console.error("therapy slots error", error);
        setTherapySlots([]);
      })
      .finally(() => setIsSlotsLoading(false));
  }, [open, therapy?.serviceId, fromDate]);

  const onSubmit = (data) => {
    if (!user) {
      errorAlert("login first");
      return;
    }
    if (!selectedTimeSlot) {
      setSlotError("Please select a time slot");
      errorAlert("Please select a time slot");
      return;
    }
    if (!selectedTimeSlot?.serviceRoomID) {
      setSlotError("Selected slot has no room assigned. Please re-select.");
      errorAlert("Selected slot has no room assigned. Please re-select.");
      return;
    }
    if (noCapacityRemains || (selectedSlotCapacity !== null && selectedSlotCapacity <= 0)) {
      const msg = "No capacity remaining for the selected slot.";
      setSlotError(msg);
      errorAlert(msg);
      return;
    }
    const requestedCount = parseInt(data.noOfPerson, 10) || 1;
    if (requestedCount < 1) {
      errorAlert("At least 1 person is required.");
      return;
    }
    if (activeAvailableCapacity !== null && requestedCount > activeAvailableCapacity) {
      const msg = `Only ${activeAvailableCapacity} person(s) available for the selected slot.`;
      setSlotError(msg);
      errorAlert(msg);
      return;
    }
    setSlotError("");
    if (!isGenderAllowed(selectedTimeSlot, patientFid)) {
      const msg = selectedTimeSlot?.genderMessage || "Slot not allowed for this patient's gender";
      setSlotError(msg);
      errorAlert(msg);
      return;
    }
    const saveObj = {
      role: patientFid?.userId === user?.userId ? "self" : "other",
      userId: patientFid?.userId,
      patientFid: patientFid?.userId,
      createdBy: user?.userId,
      clinicFid: 5,
      no_Of_Person: parseInt(data.noOfPerson, 10) || 1,
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
      serviceRoomID:
        selectedTimeSlot?.serviceRoomID ||
        therapy?.serviceRoomId ||
        therapy?.serviceRoomID,
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
      origin: origin || "Nature Therapy",
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
      const serverMsg =
        error?.response?.data?.message ||
        "An unexpected error occurred during the booking process.";
      errorAlert(serverMsg);
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
              <div className="relative bg-[#f8fafc] rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 shadow-sm flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
                    <span className="bg-emerald-50 p-1.5 rounded-lg flex items-center justify-center">
                      <Event
                        sx={{ fontSize: 20, color: "var(--booking-primary)" }}
                      />
                    </span>
                    {origin === "Yoga Therapy"
                      ? "Book Yoga Therapy"
                      : "Book Nature Therapy"}
                  </h2>
                  <CancelButtonModal onClick={handleClose} />
                </div>

                <div className="max-h-[calc(90vh-64px)] overflow-y-auto px-4 sm:px-6 py-6 no-scrollbar">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      <motion.div
                        variants={sectionVariants}
                        className="lg:col-span-8 flex flex-col gap-5"
                      >
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
                            <div className="flex flex-col">
                              <DropdownField
                                control={control}
                                name="patientFid"
                                placeholder="Select Patient *"
                                dataArray={patientOptions}
                                isClearable={true}
                                searchIcon={true}
                                error={errors.patientFid}
                              />
                              {errors.patientFid && (
                                <p className="text-red-500 text-[10px] mt-1 ml-1">
                                  {errors.patientFid.message}
                                </p>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="col-span-1 sm:col-span-2">
                                <div className="flex flex-col">
                                  <InputField
                                    control={control}
                                    name="fullName"
                                    label="Full Name *"
                                    error={errors.fullName}
                                    shrink={true}
                                  />
                                  {errors.fullName && (
                                    <p className="text-red-500 text-[10px] mt-1 ml-1">
                                      {errors.fullName.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <InputField
                                  control={control}
                                  name="mobile"
                                  label="Mobile Number *"
                                  error={errors.mobile}
                                  shrink={true}
                                />
                                {errors.mobile && (
                                  <p className="text-red-500 text-[10px] mt-1 ml-1">
                                    {errors.mobile.message}
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-col">
                                <InputField
                                  control={control}
                                  name="email"
                                  label="Email Address *"
                                  error={errors.email}
                                  shrink={true}
                                  dontCapitalize="none"
                                />
                                {errors.email && (
                                  <p className="text-red-500 text-[10px] mt-1 ml-1">
                                    {errors.email.message}
                                  </p>
                                )}
                              </div>
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
                                <div className="flex flex-col">
                                  <DropdownField
                                    control={control}
                                    name="serviceFid"
                                    placeholder="Select Therapy *"
                                    dataArray={[]}
                                    error={errors.serviceFid}
                                    isDisabled={true}
                                  />
                                  {errors.serviceFid && (
                                    <p className="text-red-500 text-[10px] mt-1 ml-1">
                                      {errors.serviceFid.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <DatePickerField
                                  control={control}
                                  name="fromDate"
                                  label="Appointment Date *"
                                  inputFormat="dd-MM-yyyy"
                                  disablePast={true}
                                  error={errors.fromDate}
                                />
                                {errors.fromDate && (
                                  <p className="text-red-500 text-[10px] mt-1 ml-1">
                                    {errors.fromDate.message}
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-col">
                                <InputField
                                  control={control}
                                  name="noOfPerson"
                                  label="Number of Persons *"
                                  type="number"
                                  error={errors.noOfPerson}
                                  disabled={
                                    noCapacityRemains ||
                                    (selectedSlotCapacity !== null &&
                                      selectedSlotCapacity <= 0)
                                  }
                                  onKeyDown={(e) => {
                                    if (["-", "+", "e", "E", "."].includes(e.key))
                                      e.preventDefault();
                                  }}
                                  inputProps={{
                                    min: 1,
                                    max:
                                      activeAvailableCapacity !== null &&
                                      activeAvailableCapacity > 0
                                        ? activeAvailableCapacity
                                        : undefined,
                                    step: 1,
                                  }}
                                />
                                {errors.noOfPerson && (
                                  <p className="text-red-500 text-[10px] mt-1 ml-1">
                                    {errors.noOfPerson.message}
                                  </p>
                                )}
                                {capacityWarning && (
                                  <p className="text-amber-700 text-[10px] mt-1 ml-1 font-semibold">
                                    {capacityWarning}
                                  </p>
                                )}
                                {exceedsSelectedCapacity && activeAvailableCapacity > 0 && (
                                  <p className="text-red-500 text-[10px] mt-1 ml-1 font-semibold">
                                    Requested {requestedPersons} person(s) exceeds available capacity ({activeAvailableCapacity} remaining).
                                  </p>
                                )}
                                {selectedSlotCapacity !== null ? (
                                  selectedSlotCapacity > 0 ? (
                                    <p className="text-emerald-700 text-[11px] mt-1 ml-1 font-medium">
                                      Available: {selectedSlotCapacity} of{" "}
                                      {activeSelectedSlot?.maxBookings}
                                      {requestedPersons >= 1 && !exceedsSelectedCapacity
                                        ? ` • Remaining after ${requestedPersons} person(s): ${remainingAfterSelection}`
                                        : ""}
                                    </p>
                                  ) : (
                                    <p className="text-red-500 text-[11px] mt-1 ml-1 font-semibold">
                                      No capacity remaining for this slot.
                                    </p>
                                  )
                                ) : noCapacityRemains ? (
                                  <p className="text-red-500 text-[11px] mt-1 ml-1 font-semibold">
                                    No capacity remaining for this date.
                                  </p>
                                ) : maxDayAvailableCapacity !== null ? (
                                  <p className="text-slate-500 text-[11px] mt-1 ml-1 font-medium">
                                    Available capacity: up to {maxDayAvailableCapacity} person(s)
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-5 space-y-4">
                          <InputArea
                            name="specialRequest"
                            control={control}
                            label="Specific Requests or Medical Conditions"
                            placeholder="Please mention any special requirements..."
                            error={errors.specialRequest}
                          />
                          <div className="flex flex-col">
                            <CheckBoxField
                              name="termsAccepted"
                              control={control}
                              label="I agree to the clinical guidelines and terms."
                              error={errors.termsAccepted}
                            />
                            {errors.termsAccepted && (
                              <p className="text-red-500 text-[10px] mt-1 ml-1">
                                {errors.termsAccepted.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        variants={sectionVariants}
                        className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-0 h-fit"
                      >
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                          <div className="bg-sky-50 px-5 py-3 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                              <h2 className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                                Available Slots
                              </h2>
                            </div>
                            {selectedSlotCapacity !== null && (
                              <span
                                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                                  selectedSlotCapacity > 0 && !exceedsSelectedCapacity
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-red-100 text-red-600"
                                }`}
                              >
                                {selectedSlotCapacity > 0
                                  ? `${
                                      requestedPersons >= 1 && !exceedsSelectedCapacity
                                        ? remainingAfterSelection
                                        : selectedSlotCapacity
                                    } / ${activeSelectedSlot?.maxBookings} left`
                                  : "Full"}
                              </span>
                            )}
                          </div>

                          <div className="p-4 min-h-[180px] flex flex-col">
                            {isSlotsLoading ? (
                              <div className="flex flex-1 items-center justify-center h-40">
                                <div className="w-8 h-8 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin" />
                              </div>
                            ) : doctorSlots?.length > 0 ? (
                              <div className="grid grid-cols-2 gap-2">
                                {doctorSlots.map((slot, index) => {
                                  const isPast = Boolean(slot.isTimePast);
                                  const isAvailable = slot.isAvailable;
                                  const chipCapacity = getSlotAvailableCapacity(slot);
                                  const isSlotSelected =
                                    selectedTimeSlot?.slotStartTime ===
                                    slot.slotStartTime;
                                  const exceedsThisSlot =
                                    !isSlotSelected &&
                                    chipCapacity !== null &&
                                    chipCapacity > 0 &&
                                    requestedPersons > chipCapacity;

                                  const isDisabled =
                                    isPast || !isAvailable || exceedsThisSlot;
                                  return (
                                      <TimeSlotChip
                                        key={index}
                                        slot={{ ...slot, isAvailable }}
                                        isTimePast={isPast}
                                        requestedPersons={requestedPersons}
                                        isSelected={isSlotSelected}
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

                        <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 p-5">
                          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-emerald-100">
                            <Banknote className="w-4 h-4 text-emerald-700 shrink-0" />
                            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
                              Bill Summary
                            </h3>
                          </div>

                          <div className="space-y-2.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-500 font-medium">
                                Price / Person
                              </span>
                              <span className="font-bold text-slate-700">
                                ₹{watch("perDayAmount")?.toLocaleString()}
                              </span>
                            </div>

                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-500 font-medium">
                                Persons
                              </span>
                              <span className="font-bold text-slate-700">
                                × {watch("noOfPerson")}
                              </span>
                            </div>

                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-500 font-medium">
                                GST &amp; TC
                              </span>
                              <span className="font-bold text-slate-700">
                                0
                              </span>
                            </div>

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
                                className={
                                  isBookingDisabled
                                    ? "bg-slate-400 text-white cursor-not-allowed opacity-70"
                                    : "bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white transition-all"
                                }
                                disabled={isBookingDisabled}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

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
                        className={
                          isBookingDisabled
                            ? "bg-slate-400 text-white font-bold px-4 py-2 rounded-lg text-xs cursor-not-allowed opacity-70"
                            : "bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs"
                        }
                        disabled={isBookingDisabled}
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
