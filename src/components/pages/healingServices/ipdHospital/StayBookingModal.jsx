import { yupResolver } from "@hookform/resolvers/yup";
import {
  AccessTime,
  Add,
  ArrowBackIos,
  ArrowForwardIos,
  Bed as BedIcon,
  CalendarMonth,
  KeyboardArrowDown,
  PeopleAlt,
  Remove,
} from "@mui/icons-material";
import PetsIcon from "@mui/icons-material/Pets";
import {
  Box,
  FormControl,
  MenuItem,
  Modal,
  Popover,
  Select,
  Switch,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { LocalizationProvider, TimeClock } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
  subMonths,
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../../../context/AuthContext";
import {
  getAgeDetails,
  getPatientDataByMobileNo,
  InitiatePayment,
} from "../../../../services/bookAppointment/BookAppointmentServices";
import {
  checkRoomAvailability,
  checkRoomGender,
  getRoomBookingDetails,
  wellnessStayBooking,
} from "../../../../services/healingServices/wellnessStay/WellnessStayServices";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import { useLoader } from "../../../common/commonLoader/LoaderContext";
import ConfirmationModal from "../../../common/ConfirmationModal";
import DropdownField from "../../../common/formFields/DropdownField";
import InputField from "../../../common/formFields/InputField";
import { ModalStyle } from "../../../common/modalStyle/ModalStyle";
import { errorAlert, successAlert } from "../../../common/toast/CustomToast";
import AddPatientModal from "../../opdBooking/AddPatientModal";
import { RedirectToSabPaisa } from "../../opdBooking/RedirectToSabPaisa";
import RadioField from "../../../common/formFields/RadioField";

function StayBookingModal({
  open,
  handleClose,
  selectedService,
  handleGetRoomList,
}) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkInTime, setCheckInTime] = useState("14:15:00");
  const [checkOut, setCheckOut] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState("11:15:00");
  const [selectingFor, setSelectingFor] = useState("checkIn");

  const [openTermsModal, setOpenTermsModal] = useState(false);
  const [tempTermsAccepted, setTempTermsAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [inTimeAnchorEl, setInTimeAnchorEl] = useState(null);
  const [outTimeAnchorEl, setOutTimeAnchorEl] = useState(null);

  const [guests, setGuests] = useState({
    rooms: 1,
    adults: 1,
    children: 0,
    childrenAges: [],
  });

  const [activeTab, setActiveTab] = useState("calendar");
  const [flexibleDuration, setFlexibleDuration] = useState("1 week");
  const [selectedFlexibleMonth, setSelectedFlexibleMonth] = useState(null);
  const [calendarAnchorEl, setCalendarAnchorEl] = useState(null);
  const [guestsAnchorEl, setGuestsAnchorEl] = useState(null);
  const [calendarViewDate, setCalendarViewDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);
  const [roomStatus, setRoomStatus] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const [finalSaveObj, setFinalSaveObj] = useState(null);
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [patientOptions, setPatientOptions] = useState([]);
  const [ageDetailsConfig, setAgeDetailsConfig] = useState([]);
  const [genderCriteria, setGenderCriteria] = useState("");
  const [selectedRoomDetails, setSelectedRoomDetails] = useState(null);

  const cancelPaymentRef = useRef(null);
  const { user } = useAuth();
  const { setIsLoading } = useLoader();

  const carouselRef = useRef(null);
  const checkInDateRef = useRef(null);
  const inTimeRef = useRef(null);
  const checkOutDateRef = useRef(null);
  const outTimeRef = useRef(null);
  const guestInputRef = useRef(null);

  const schema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    mobile: yup
      .string()
      .required("Mobile number is required")
      .matches(/^[0-9]{10}$/, "Must be 10 digits"),
    city: yup.string().required("City is required"),
    patientFid: yup
      .object()
      .shape({
        id: yup.mixed().required(),
        label: yup.string().required(),
      })
      .nullable()
      .required("Patient selection is required"),
    noOfAdults: yup
      .number()
      .typeError("Must be a number")
      .min(1, "Minimum 1 adult")
      .max(3, "Maximum 3 adults allowed")
      .test(
        "no-children-with-3-adults",
        "Cannot have children with 3 adults",
        function (value) {
          const { noOfChildren } = this.parent;
          return !(value === 3 && noOfChildren > 0);
        },
      ),

    noOfChildren0to5: yup.number().min(0).max(2).default(0),
    noOfChildren6to12: yup.number().min(0).max(2).default(0),
  });

  const { control, watch, setValue, reset } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      city: "",
      gender: "Male",
      bringingPet: false,
      patientFid: null,
      twinSharing: false,
      sameGenderRules: false,
      noOfAdults: 1,
      noOfChildren0to5: 0,
      noOfChildren6to12: 0,
      mealPreference: {
        label: "Organic Full Board (Included)",
        value: "Organic Full Board (Included)",
      },
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const patientFid = watch("patientFid");
  const formValues = watch();

  console.log("formValues", formValues);

  useEffect(() => {
    setRoomStatus(null);
  }, [
    checkIn,
    checkOut,
    formValues.noOfAdults,
    formValues.noOfChildren0to5,
    formValues.noOfChildren6to12,
    guests.rooms,
  ]);

  useEffect(() => {
    if (checkIn && checkOut) {
      handleCheckVailabilty();
    }
  }, [checkIn, checkOut]);

  useEffect(() => {
    const adults = Number(formValues?.noOfAdults) || 0;
    const children0to5 = Number(formValues?.noOfChildren0to5) || 0;
    const children6to12 = Number(formValues?.noOfChildren6to12) || 0;
    const totalChildren = children0to5 + children6to12;

    if (adults > 3) {
      setValue("noOfAdults", 3);
    } else if (adults === 3 && totalChildren > 0) {
      setValue("noOfChildren0to5", 0);
      setValue("noOfChildren6to12", 0);
    }
  }, [formValues?.noOfAdults]);

  useEffect(() => {
    const adults = Number(formValues?.noOfAdults) || 0;
    const children0to5 = Number(formValues?.noOfChildren0to5) || 0;
    const children6to12 = Number(formValues?.noOfChildren6to12) || 0;
    const totalChildren = children0to5 + children6to12;

    if (totalChildren > 2) {
      if (children0to5 > 2) setValue("noOfChildren0to5", 2);
      if (children6to12 > 2) setValue("noOfChildren6to12", 2);
    } else if (totalChildren > 0 && adults > 2) {
      setValue("noOfAdults", 2);
    }
  }, [formValues?.noOfChildren0to5, formValues?.noOfChildren6to12]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "next" ? 200 : -200;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleDateClick = (date) => {
    if (isBefore(date, startOfToday())) return;
    if (isDateBooked(date)) return;

    if (selectingFor === "checkIn") {
      setCheckIn(date);
      if (checkOut && (isBefore(checkOut, date) || isSameDay(date, checkOut))) {
        setCheckOut(null);
      }
      setSelectingFor("checkOut");
    } else {
      if (!checkIn || isBefore(date, checkIn)) {
        setCheckIn(date);
        setCheckOut(null);
        setSelectingFor("checkOut");
      } else if (isSameDay(date, checkIn)) {
        setCheckIn(null);
        setCheckOut(null);
        setSelectingFor("checkIn");
      } else {
        setCheckOut(date);
        setHoveredDate(null);
        setCalendarAnchorEl(null);
        setSelectingFor("checkIn");
      }
    }
  };

  const calculateTotal = () => {
    if (!selectedService)
      return {
        stay: 0,
        taxes: 0,
        petSurcharge: 0,
        adultSurcharge: 0,
        childrenSurcharge: 0,
        total: 0,
        days: 0,
        petPct: 0,
        kid0to5Pct: 0,
        kid6to12Pct: 0,
      };

    const dailyBase = Number(selectedService.price) || 0;
    const days =
      checkIn && checkOut ? differenceInCalendarDays(checkOut, checkIn) : 1;
    const effectiveDays = days > 0 ? days : 1;

    const noOfAdults = parseInt(formValues?.noOfAdults, 10) || 1;
    const isTwinSharing = Boolean(formValues?.twinSharing);

    let baseAdultsToCharge = 2;
    if (isTwinSharing && noOfAdults === 1) {
      baseAdultsToCharge = 1;
    }

    const stayTotal = dailyBase * baseAdultsToCharge * effectiveDays;
    const wellness = 0;

    const petConfig = (ageDetailsConfig || []).find(
      (d) => d.criterialType === "Pet",
    );
    const kid0to5Config = (ageDetailsConfig || []).find(
      (d) => d.ageGroup === "0-5",
    );
    const kid6to12Config = (ageDetailsConfig || []).find(
      (d) => d.ageGroup === "6-12",
    );

    const petPct = Number(petConfig?.percentage) || 0;
    const kid0to5Pct = Number(kid0to5Config?.percentage) || 0;
    const kid6to12Pct = Number(kid6to12Config?.percentage) || 0;

    let petSurcharge = 0;
    if (formValues?.bringingPet) {
      petSurcharge = dailyBase * (petPct / 100);
    }

    let adultSurcharge = 0;
    if (noOfAdults === 3) {
      adultSurcharge = dailyBase * 0.75 * effectiveDays;
    }

    const children0to5Count = parseInt(formValues?.noOfChildren0to5, 10) || 0;
    const children6to12Count = parseInt(formValues?.noOfChildren6to12, 10) || 0;

    const childrenSurcharge =
      (children0to5Count * dailyBase * (kid0to5Pct / 100) +
        children6to12Count * dailyBase * (kid6to12Pct / 100)) *
      effectiveDays;

    const totalWithoutTaxes =
      stayTotal + wellness + petSurcharge + adultSurcharge + childrenSurcharge;
    const taxes = totalWithoutTaxes * 0;

    return {
      stay: stayTotal,
      wellness: wellness,
      taxes: taxes,
      petSurcharge: petSurcharge,
      adultSurcharge: adultSurcharge,
      childrenSurcharge: childrenSurcharge,
      total: totalWithoutTaxes + taxes,
      days: effectiveDays,
      petPct,
      kid0to5Pct,
      kid6to12Pct,
    };
  };

  const costs = calculateTotal();

  const getBookedDateRanges = () => {
    if (!Array.isArray(selectedRoomDetails) || selectedRoomDetails.length === 0)
      return [];
    return selectedRoomDetails
      .filter((b) => b.checkInDate && b.checkOutDate)
      .map((b) => ({
        start: new Date(b.checkInDate),
        end: new Date(b.checkOutDate),
        bookingId: b.bookingId,
      }));
  };

  const bookedRanges = getBookedDateRanges();

  const isDateBooked = (date) => {
    return bookedRanges.some((range) =>
      isWithinInterval(date, { start: range.start, end: range.end }),
    );
  };

  const isBookedRangeStart = (date) =>
    bookedRanges.some((r) => isSameDay(date, r.start));

  const isBookedRangeEnd = (date) =>
    bookedRanges.some((r) => isSameDay(date, r.end));

  const isDateSelected = (date) =>
    (checkIn && isSameDay(date, checkIn)) ||
    (checkOut && isSameDay(date, checkOut));

  const isDateInRange = (date) => {
    if (checkIn && checkOut) {
      return isWithinInterval(date, { start: checkIn, end: checkOut });
    }
    if (checkIn && hoveredDate && !checkOut) {
      if (isBefore(hoveredDate, checkIn)) return false;
      return isWithinInterval(date, { start: checkIn, end: hoveredDate });
    }
    return false;
  };

  const renderCalendar = (monthDate) => {
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDay = day;
        const isCurrentMonth = isSameMonth(currentDay, monthStart);
        const isPast = isBefore(currentDay, startOfToday());
        const booked = isCurrentMonth && !isPast && isDateBooked(currentDay);
        const bookedStart = booked && isBookedRangeStart(currentDay);
        const bookedEnd = booked && isBookedRangeEnd(currentDay);
        const selected = isDateSelected(currentDay);
        const inRange = isDateInRange(currentDay);
        const isStart = checkIn && isSameDay(currentDay, checkIn);
        const isEnd = checkOut && isSameDay(currentDay, checkOut);
        const isDisabled = isPast || booked;
        const isToday = isSameDay(currentDay, new Date());

        days.push(
          <div
            key={currentDay.toString()}
            title={booked ? "Not available" : undefined}
            onMouseEnter={() =>
              isCurrentMonth && !isDisabled && setHoveredDate(currentDay)
            }
            onMouseLeave={() => setHoveredDate(null)}
            onClick={() =>
              isCurrentMonth && !isDisabled && handleDateClick(currentDay)
            }
            onTouchEnd={(e) => {
              if (isCurrentMonth && !isDisabled) {
                e.preventDefault();
                handleDateClick(currentDay);
              }
            }}
            className={[
              "relative flex items-center justify-center h-8 w-8 md:h-10 md:w-10 text-[13px] transition-all",
              !isCurrentMonth ? "opacity-0 pointer-events-none" : "",
              booked ? "cursor-not-allowed" : "",
              isDisabled && !booked ? "cursor-default pointer-events-none" : "",
              !booked ? "cursor-pointer" : "",
              !booked && inRange && isCurrentMonth
                ? "bg-booking-primaryLight/50"
                : "",
              isStart && isCurrentMonth && !booked ? "rounded-l-full" : "",
              isEnd && isCurrentMonth && !booked ? "rounded-r-full" : "",
              checkIn &&
              !checkOut &&
              isSameDay(currentDay, hoveredDate) &&
              isCurrentMonth &&
              !booked
                ? "rounded-r-full"
                : "",
              booked && isCurrentMonth ? "bg-rose-50" : "",
              bookedStart ? "rounded-l-full" : "",
              bookedEnd ? "rounded-r-full" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {!booked && inRange && isCurrentMonth && (
              <div className="absolute inset-0 bg-booking-primaryLight/30 z-0" />
            )}

            <div
              className={[
                "relative z-10 w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-full text-[12px] md:text-[13px] font-medium transition-all",
                selected && isCurrentMonth && !booked
                  ? "bg-booking-primary text-white font-semibold shadow-sm"
                  : "",
                isToday && !booked && !selected
                  ? "ring-1 ring-booking-primary text-booking-primary font-semibold"
                  : "",
                !booked && !selected && !isDisabled && isCurrentMonth
                  ? "hover:bg-gray-100 text-gray-700"
                  : "",
                booked && isCurrentMonth ? "bg-rose-100 text-rose-300" : "",
                isPast && !booked ? "text-gray-300" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {format(currentDay, "d")}
            </div>
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="flex" key={day.toString()}>
          {days}
        </div>,
      );
      days = [];
    }

    return (
      <div className="w-full">
        <div className="text-center font-semibold text-gray-700 mb-3 text-sm">
          {format(monthDate, "MMMM yyyy")}
        </div>
        <div className="flex mb-2">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d, index) => (
            <div
              key={index}
              className="w-8 md:w-9 text-[9px] font-semibold text-gray-400 text-center uppercase tracking-wider"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="space-y-0.5">{rows}</div>
      </div>
    );
  };

  const handleCheckVailabilty = () => {
    if (!checkIn || !checkOut) return;
    setIsSearching(true);
    setRoomStatus(null);
    checkRoomAvailability(
      selectedService?.roomTypeId,
      checkIn && !isNaN(new Date(checkIn).getTime())
        ? format(new Date(checkIn), "yyyy-MM-dd")
        : "",
      checkInTime,
      checkOut && !isNaN(new Date(checkOut).getTime())
        ? format(new Date(checkOut), "yyyy-MM-dd")
        : "",
      checkOutTime,
    )
      .then((res) => {
        setRoomStatus(res?.data);
        setIsSearching(false);
      })
      .catch((err) => {
        console.error("Check availability error:", err);
        setRoomStatus("error");
        setIsSearching(false);
      });
  };

  const handleConfirmBooking = () => {
    if (!user) {
      errorAlert("Please login first!");
      return;
    }
    if (!checkIn || !checkOut) {
      errorAlert("Please select check-in and check-out dates!");
      return;
    }
    if (patientFid === null) {
      errorAlert("Please select guest!");
      return;
    }
    const saveObj = {
      userId: patientFid?.userId,
      resortId: 1,
      clinicFid: 5,
      createdBy: user?.userId,
      roomTypeId: selectedService?.roomTypeId,
      stayType: selectedService?.maxOcc === 1 ? "Seperate" : "Double",
      checkInDate: checkIn ? format(new Date(checkIn), "yyyy-MM-dd") : "",
      CheckoutDate: checkOut ? format(new Date(checkOut), "yyyy-MM-dd") : "",
      checkInTime: checkInTime,
      checkOutTime: checkOutTime,
      noOfPersons: Number(formValues?.noOfAdults) || 1,
      noOfChildren:
        (Number(formValues?.noOfChildren0to5) || 0) +
        (Number(formValues?.noOfChildren6to12) || 0),
      isPet: formValues?.bringingPet || false,
      twinSharing: formValues?.twinSharing || false,
      totalAmount: costs?.total || 0,
      guestFullName: formValues?.fullName || "",
      emailId: formValues?.email || "",
      mobile: String(formValues?.mobile || ""),
      city: formValues?.city || "",
      sameGender: formValues?.sameGenderRules || false,
    };
    console.log("saveObj", formValues, saveObj);

    setFinalSaveObj(saveObj);
    setOpenConfirmationModal(true);
  };

  const initiateBookingPayment = async () => {
    if (isPaymentPending) return;
    try {
      setIsLoading(true);
      const bookingRes = await wellnessStayBooking(finalSaveObj);
      const bookingData = bookingRes?.data;

      if (bookingData?.message) {
        const bookingId = bookingData?.data;

        const tempObj = {
          amount: costs.total,
          patientId: patientFid?.patientId,
          userId: patientFid?.userId,
          bookingId: bookingId?.bookingId,
          paymentFor: "StayBooking",
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
              setOpenConfirmationModal(false);
              setIsPaymentPending(false);
              handleClose();
              if (handleGetRoomList) handleGetRoomList();
            },
            (errorStatus) => {
              const msg =
                errorStatus?.message || "Payment failed or cancelled.";
              errorAlert(msg);
              setOpenConfirmationModal(false);
              setIsPaymentPending(false);
            },
          );
        } else {
          setIsLoading(false);
          errorAlert(data?.message);
        }
      } else {
        setIsLoading(false);
        errorAlert(bookingData?.message);
      }
    } catch (error) {
      setIsLoading(false);
      errorAlert("An unexpected error occurred during the booking process.");
    }
  };

  const handleGetPatientData = () => {
    getPatientDataByMobileNo(user?.mobileNo, user.userId, "IPD", 5)
      .then((res) => {
        const dataArray = res?.data?.data;
        if (Array.isArray(dataArray) && dataArray.length > 0) {
          const filterData = dataArray.find(
            (item) => item.patientId === user?.userId,
          );
          setPatientOptions(
            dataArray.map((d) => ({
              ...d,
              id: d.userId,
              value: d.userId,
              label: `${d.firstName} ${d.lastName}`,
            })),
          );
          if (filterData) {
            setValue(
              "fullName",
              `${filterData.firstName} ${filterData.lastName}`,
            );
            setValue("email", filterData.emailId || "");
            setValue("mobile", filterData.mobileNo || "");
            setValue("city", filterData.city || "");
            setValue("noOfAdults", 1);
          }
        }
      })
      .catch((err) => console.error("Error fetching patient data:", err));
  };

  useEffect(() => {
    if (patientFid !== null && patientFid !== undefined) {
      setValue("fullName", patientFid.label);
      setValue("mobile", patientFid.mobileNo);
      setValue("age", patientFid?.age);
      setValue("city", patientFid.city);
      setValue("email", patientFid.emailId);
      setValue("gender", patientFid?.gender);
      setValue("noOfAdults", 1);
      checkRoomGender(selectedService?.roomTypeId, patientFid?.userId)
        .then((res) => {
          setGenderCriteria(res?.data?.data);
        })
        .catch((err) => setGenderCriteria(""));
    } else {
      setGenderCriteria("");
      setValue("fullName", "");
      setValue("mobile", "");
      setValue("age", "");
      setValue("city", "");
      setValue("email", "");
      setValue("gender", "");
      setValue("noOfAdults", 1);
    }

    getAgeDetails()
      .then((res) => {
        setAgeDetailsConfig(res.data.data);
      })
      .catch((err) => setAgeDetailsConfig([]));
  }, [patientFid, selectedService]);

  useEffect(() => {
    if (!user) return;
    handleGetPatientData();
  }, [user]);

  useEffect(() => {
    if (
      selectedService &&
      selectedService !== null &&
      selectedService !== undefined
    ) {
      setSelectedRoomDetails(null);
      getRoomBookingDetails(selectedService?.roomTypeId)
        .then((res) => {
          setSelectedRoomDetails(res.data.data);
        })
        .catch(
          (err) => console.error("Error fetching room booking details:", err),
          setSelectedRoomDetails(null),
        );
    }
  }, [selectedService]);

  const currentAdults = parseInt(formValues?.noOfAdults, 10) || 1;
  const currentTwinSharing = Boolean(formValues?.twinSharing);

  const breakdownItems = [
    {
      label: `Stay (${costs.days} Day${costs.days > 1 ? "s" : ""})`,
      value: costs.stay,
      show: true,
    },
    {
      label: "Taxes & Service",
      value: Math.round(costs.taxes),
      show: true,
    },
    {
      label: `Pet Charges (${costs.petPct}%)`,
      value: Math.round(costs.petSurcharge),
      show: costs.petSurcharge > 0,
    },
    {
      label: "Extra Adult Surcharge (75%)",
      value: Math.round(costs.adultSurcharge),
      show: costs.adultSurcharge > 0,
    },
    {
      label: "Children Surcharge",
      value: Math.round(costs.childrenSurcharge),
      show: costs.childrenSurcharge > 0,
    },
  ].filter((item) => item.show);

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={ModalStyle}
          className="w-[98%]  md:w-[90%] lg:w-[80%] xl:w-[65%] 2xl:w-[45%] max-h-[95dvh] overflow-hidden rounded-xl bg-booking-bg p-0 flex flex-col no-scrollbar"
        >
          <div className="sticky top-0 z-30 bg-white flex items-center justify-between px-3 py-2 border-b border-booking-border shadow-sm">
            <h1 className="text-booking-primaryDark  text-lg md:text-2xl font-bold leading-tight">
              Stay Booking
            </h1>
            <CancelButtonModal onClick={handleClose} />
          </div>

          <div className="p-2 sm:p-3 flex-1 overflow-y-auto no-scrollbar">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="relative group/searchbar">
                <motion.div
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-2 flex flex-col gap-2 border group-hover/searchbar:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row items-stretch gap-2">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2  gap-2">
                      <div className="flex items-stretch border  rounded-[5px] bg-white  hover:border-booking-primary transition-colors">
                        <div
                          ref={checkInDateRef}
                          onClick={() => {
                            setCalendarAnchorEl(checkInDateRef.current);
                            setSelectingFor("checkIn");
                            if (checkIn) setCalendarViewDate(checkIn);
                          }}
                          onTouchEnd={(e) => {
                            e.preventDefault();
                            setCalendarAnchorEl(checkInDateRef.current);
                            setSelectingFor("checkIn");
                            if (checkIn) setCalendarViewDate(checkIn);
                          }}
                          className="flex-1 flex flex-col px-3 py-1.5 cursor-pointer hover:bg-gray-50 transition-all border-r border-gray-50"
                        >
                          <p className="text-[7px] font-bold text-booking-primary uppercase tracking-[0.15em] mb-0.5">
                            Check-in
                          </p>
                          <div className="flex items-center gap-1.5">
                            <CalendarMonth
                              className="text-booking-primary/60"
                              sx={{ fontSize: 13 }}
                            />
                            <span className="text-gray-800 font-bold text-[11px] tracking-tight truncate">
                              {checkIn
                                ? format(checkIn, "MMM dd, yyyy")
                                : "Add date"}
                            </span>
                          </div>
                        </div>
                        <div
                          ref={inTimeRef}
                          onClick={() => setInTimeAnchorEl(inTimeRef.current)}
                          onTouchEnd={(e) => {
                            e.preventDefault();
                            setInTimeAnchorEl(inTimeRef.current);
                          }}
                          className="w-24 flex flex-col px-2 py-1.5 cursor-pointer hover:bg-gray-50 transition-all"
                        >
                          <p className="text-[7px] font-bold text-booking-primary uppercase tracking-[0.15em] mb-0.5">
                            Time
                          </p>
                          <div className="flex items-center gap-1">
                            <AccessTime
                              className="text-booking-primary/60"
                              sx={{ fontSize: 12 }}
                            />
                            <span className="text-gray-800 font-bold text-[11px]">
                              {checkInTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-stretch border  rounded-[5px] bg-white overflow-hidden hover:border-booking-primary transition-colors">
                        <div
                          ref={checkOutDateRef}
                          onClick={() => {
                            setCalendarAnchorEl(checkOutDateRef.current);
                            setSelectingFor("checkOut");
                            if (checkOut) setCalendarViewDate(checkOut);
                            else if (checkIn) setCalendarViewDate(checkIn);
                          }}
                          onTouchEnd={(e) => {
                            e.preventDefault();
                            setCalendarAnchorEl(checkOutDateRef.current);
                            setSelectingFor("checkOut");
                            if (checkOut) setCalendarViewDate(checkOut);
                            else if (checkIn) setCalendarViewDate(checkIn);
                          }}
                          className="flex-1 flex flex-col px-3 py-1.5 cursor-pointer hover:bg-gray-50 transition-all border-r border-gray-50"
                        >
                          <p className="text-[7px] font-bold text-booking-primary uppercase tracking-[0.15em] mb-0.5">
                            Check-out
                          </p>
                          <div className="flex items-center gap-1.5">
                            <CalendarMonth
                              className="text-booking-primary/60"
                              sx={{ fontSize: 13 }}
                            />
                            <span className="text-gray-800 font-bold text-[11px] tracking-tight truncate">
                              {checkOut
                                ? format(checkOut, "MMM dd, yyyy")
                                : "Add date"}
                            </span>
                          </div>
                        </div>
                        <div
                          ref={outTimeRef}
                          onClick={() => setOutTimeAnchorEl(outTimeRef.current)}
                          onTouchEnd={(e) => {
                            e.preventDefault();
                            setOutTimeAnchorEl(outTimeRef.current);
                          }}
                          className="w-24 flex flex-col px-2 py-1.5 cursor-pointer hover:bg-gray-50 transition-all"
                        >
                          <p className="text-[7px] font-bold text-booking-primary uppercase tracking-[0.15em] mb-0.5">
                            Time
                          </p>
                          <div className="flex items-center gap-1">
                            <AccessTime
                              className="text-booking-primary/60"
                              sx={{ fontSize: 12 }}
                            />
                            <span className="text-gray-800 font-bold text-[11px]">
                              {checkOutTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {roomStatus && !isSearching && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="mt-2 overflow-hidden"
                    >
                      <div
                        className={`p-3 rounded-xl border flex items-center gap-3 ${
                          roomStatus?.message === "Sold Out" ||
                          roomStatus === "unavailable" ||
                          roomStatus === "error"
                            ? "bg-red-50 border-red-100 text-red-700"
                            : "bg-emerald-50 border-emerald-100 text-booking-primary"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                            roomStatus?.message === "Sold Out" ||
                            roomStatus === "unavailable" ||
                            roomStatus === "error"
                              ? "bg-white text-red-500"
                              : "bg-white text-booking-primary"
                          }`}
                        >
                          {roomStatus?.message === "Sold Out" ||
                          roomStatus === "unavailable" ||
                          roomStatus === "error" ? (
                            <svg
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider">
                            {roomStatus?.message ||
                              (roomStatus === "available"
                                ? "Available"
                                : "Unavailable")}
                          </p>
                          <p className="text-[10px] opacity-80 font-medium">
                            {roomStatus?.message === "Sold Out" ||
                            roomStatus === "unavailable"
                              ? "Please try different dates"
                              : roomStatus === "error"
                                ? "Failed to check availability. Please try again."
                                : "Rooms are available for the selected dates."}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Popover
                  open={Boolean(inTimeAnchorEl)}
                  anchorEl={inTimeAnchorEl}
                  onClose={() => setInTimeAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  PaperProps={{
                    sx: {
                      borderRadius: "16px",
                      mt: 1,
                      boxShadow: "0 20px 50px rgba(38, 61, 33, 0.15)",
                      overflow: "hidden",
                      border: "1px solid rgba(212, 232, 194, 0.5)",
                    },
                  }}
                >
                  <div className="bg-white flex flex-col items-center">
                    <div className="w-full text-center py-2.5 bg-[#f0f4ef] border-b border-[#e4ebdd]">
                      <p className="text-[9px] font-black text-booking-primary uppercase tracking-[0.2em] mb-0.5">
                        In Time
                      </p>
                      <p className="text-[11px] font-bold text-booking-primaryDark">
                        Selected: {checkInTime}
                      </p>
                    </div>
                    <div className="p-2">
                      <TimeClock
                        value={parse(checkInTime, "HH:mm:ss", new Date())}
                        onChange={(val) =>
                          setCheckInTime(format(val, "HH:mm:ss"))
                        }
                        ampm={false}
                        sx={{
                          "& .MuiClock-pin": { backgroundColor: "#263d21" },
                          "& .MuiClockPointer-root": {
                            backgroundColor: "#263d21",
                          },
                          "& .MuiClockPointer-thumb": {
                            backgroundColor: "#263d21",
                            borderColor: "#263d21",
                          },
                          "& .MuiClock-clock": {
                            backgroundColor: "#f9faf7",
                          },
                        }}
                      />
                    </div>
                    <div className="w-full flex justify-end p-3 border-t border-gray-100 bg-gray-50/50">
                      <button
                        onClick={() => setInTimeAnchorEl(null)}
                        className="px-6 py-2 bg-gradient-to-r from-booking-primary to-booking-primaryDark text-white text-[10px] font-bold rounded-lg hover:shadow-lg transition-all active:scale-95 uppercase tracking-widest"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </Popover>

                <Popover
                  open={Boolean(outTimeAnchorEl)}
                  anchorEl={outTimeAnchorEl}
                  onClose={() => setOutTimeAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  PaperProps={{
                    sx: {
                      borderRadius: "16px",
                      mt: 1,
                      boxShadow: "0 20px 50px rgba(38, 61, 33, 0.15)",
                      overflow: "hidden",
                      border: "1px solid rgba(212, 232, 194, 0.5)",
                    },
                  }}
                >
                  <div className="bg-white flex flex-col items-center">
                    <div className="w-full text-center py-2.5 bg-[#f0f4ef] border-b border-[#e4ebdd]">
                      <p className="text-[9px] font-black text-booking-primary uppercase tracking-[0.2em] mb-0.5">
                        Out Time
                      </p>
                      <p className="text-[11px] font-bold text-booking-primaryDark">
                        Selected: {checkOutTime}
                      </p>
                    </div>
                    <div className="p-2">
                      <TimeClock
                        value={parse(checkOutTime, "HH:mm:ss", new Date())}
                        onChange={(val) =>
                          setCheckOutTime(format(val, "HH:mm:ss"))
                        }
                        ampm={false}
                        sx={{
                          "& .MuiClock-pin": { backgroundColor: "#263d21" },
                          "& .MuiClockPointer-root": {
                            backgroundColor: "#263d21",
                          },
                          "& .MuiClockPointer-thumb": {
                            backgroundColor: "#263d21",
                            borderColor: "#263d21",
                          },
                          "& .MuiClock-clock": {
                            backgroundColor: "#f9faf7",
                          },
                        }}
                      />
                    </div>
                    <div className="w-full flex justify-end p-3 border-t border-gray-100 bg-gray-50/50">
                      <button
                        onClick={() => {
                          setOutTimeAnchorEl(null);
                          setTimeout(() => {
                            if (guestInputRef.current) {
                              setGuestsAnchorEl(guestInputRef.current);
                            }
                          }, 300);
                        }}
                        className="px-6 py-2 bg-gradient-to-r from-booking-primary to-booking-primaryDark text-white text-[10px] font-bold rounded-lg hover:shadow-lg transition-all active:scale-95 uppercase tracking-widest"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </Popover>

                <Popover
                  open={Boolean(calendarAnchorEl)}
                  anchorEl={calendarAnchorEl}
                  onClose={() => setCalendarAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  PaperProps={{
                    sx: {
                      borderRadius: "12px",
                      mt: 1,
                      boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
                      border: "1px solid rgba(0,0,0,0.04)",
                      overflow: "hidden",
                      width: {
                        xs: "calc(100vw - 24px)",
                        sm: "360px",
                        md: "680px",
                      },
                      maxWidth: "calc(100vw - 24px)",
                    },
                  }}
                >
                  <div
                    className="bg-white flex flex-col"
                    style={{ maxHeight: "80dvh" }}
                  >
                    <div className="flex items-center justify-center gap-6 py-3 border-b border-gray-100 flex-shrink-0">
                      <button
                        onClick={() => setActiveTab("calendar")}
                        className={`pb-1 px-3 font-semibold text-xs transition-all relative ${activeTab === "calendar" ? "text-booking-primary" : "text-gray-400 hover:text-gray-600"}`}
                      >
                        Calendar
                        {activeTab === "calendar" && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-booking-primary rounded-t-full"
                          />
                        )}
                      </button>
                      <button
                        onClick={() => setActiveTab("flexible")}
                        className={`pb-1 px-3 font-semibold text-xs transition-all relative ${activeTab === "flexible" ? "text-booking-primary" : "text-gray-400 hover:text-gray-600"}`}
                      >
                        I'm flexible
                        {activeTab === "flexible" && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-booking-primary rounded-t-full"
                          />
                        )}
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4">
                      {activeTab === "calendar" && (
                        <div className="relative animate-in fade-in duration-300">
                          <div className="absolute top-0 left-0 right-0 flex justify-between items-center z-20 pointer-events-none">
                            <button
                              onClick={() =>
                                setCalendarViewDate(
                                  subMonths(calendarViewDate, 1),
                                )
                              }
                              className="pointer-events-auto p-1.5 hover:bg-booking-primaryLight/50 rounded-full transition-all text-booking-primary"
                            >
                              <ArrowBackIos
                                sx={{ fontSize: 12 }}
                                className="ml-1"
                              />
                            </button>
                            <button
                              onClick={() =>
                                setCalendarViewDate(
                                  addMonths(calendarViewDate, 1),
                                )
                              }
                              className="pointer-events-auto p-1.5 hover:bg-booking-primaryLight/50 rounded-full transition-all text-booking-primary"
                            >
                              <ArrowForwardIos sx={{ fontSize: 12 }} />
                            </button>
                          </div>
                          <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1 min-w-[280px]">
                              {renderCalendar(calendarViewDate)}
                            </div>
                            <div className="flex-1 min-w-[280px]">
                              {renderCalendar(addMonths(calendarViewDate, 1))}
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-booking-primary inline-block"></span>
                              <span className="text-[10px] text-gray-500">
                                Selected
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-booking-primaryLight inline-block"></span>
                              <span className="text-[10px] text-gray-500">
                                Your stay
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-rose-300 inline-block"></span>
                              <span className="text-[10px] text-rose-300 ">
                                Not available
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "flexible" && (
                        <div className="space-y-5 animate-in fade-in duration-300 w-full">
                          <div className="space-y-3">
                            <p className="text-gray-800 font-semibold text-sm tracking-tight">
                              How long do you want to stay?
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {["3 nights", "1 week", "1 month"].map(
                                (duration) => (
                                  <button
                                    key={duration}
                                    onClick={() =>
                                      setFlexibleDuration(duration)
                                    }
                                    className={`px-4 py-2 rounded-full border-2 font-semibold text-[11px] transition-all duration-300 ${
                                      flexibleDuration === duration
                                        ? "bg-booking-primaryLight border-booking-primary text-booking-primary shadow-sm"
                                        : "border-gray-100 text-booking-primaryDark hover:border-gray-200"
                                    }`}
                                  >
                                    {duration}
                                  </button>
                                ),
                              )}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="space-y-0.5">
                              <p className="text-gray-800 font-semibold text-sm tracking-tight">
                                When do you want to stay?
                              </p>
                              <p className="text-[11px] text-booking-primary font-medium">
                                Select your preferred month
                              </p>
                            </div>

                            <div className="relative group/carousel px-4">
                              <div
                                ref={carouselRef}
                                style={{
                                  scrollbarWidth: "none",
                                  msOverflowStyle: "none",
                                }}
                                className="flex gap-2 overflow-x-auto pb-1 pt-1 scroll-smooth [&::-webkit-scrollbar]:hidden"
                              >
                                {Array.from({ length: 12 }).map((_, i) => {
                                  const monthDate = addMonths(new Date(), i);
                                  const monthLabel = format(monthDate, "MMMM");
                                  const yearLabel = format(monthDate, "yyyy");
                                  const isSelected =
                                    selectedFlexibleMonth &&
                                    isSameMonth(
                                      monthDate,
                                      selectedFlexibleMonth,
                                    );
                                  return (
                                    <button
                                      key={i}
                                      onClick={() =>
                                        setSelectedFlexibleMonth(
                                          startOfMonth(monthDate),
                                        )
                                      }
                                      className={`flex-shrink-0 w-20 py-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                                        isSelected
                                          ? "bg-booking-primaryLight border-booking-primary shadow-sm"
                                          : "bg-white border-gray-100 hover:border-gray-200"
                                      }`}
                                    >
                                      <CalendarMonth
                                        sx={{ fontSize: 14 }}
                                        className="text-booking-primary"
                                      />
                                      <div className="text-center leading-none">
                                        <p
                                          className={`text-[9px] pt-1 font-semibold uppercase tracking-tighter ${isSelected ? "text-booking-primary" : "text-gray-800"}`}
                                        >
                                          {monthLabel}
                                        </p>
                                        <p className="text-[8px] font-semibold text-booking-primary mt-0.5">
                                          {yearLabel}
                                        </p>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                              <button
                                onClick={() => scrollCarousel("prev")}
                                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1 border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-90 z-10 transition-colors"
                              >
                                <ArrowBackIos
                                  sx={{ fontSize: 10 }}
                                  className="text-gray-600 ml-0.5"
                                />
                              </button>
                              <button
                                onClick={() => scrollCarousel("next")}
                                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1 border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-90 z-10 transition-colors"
                              >
                                <ArrowForwardIos
                                  sx={{ fontSize: 10 }}
                                  className="text-gray-600"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/20 flex-shrink-0 flex items-center justify-between gap-3">
                      <button
                        onClick={() => {
                          setCheckIn(null);
                          setCheckOut(null);
                          setHoveredDate(null);
                          setFlexibleDuration("1 week");
                          setSelectedFlexibleMonth(null);
                        }}
                        className="text-ayuBrown font-bold hover:text-ayuBrown/80 transition-all text-[10px] tracking-widest uppercase"
                      >
                        Clear all
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCalendarAnchorEl(null)}
                          className="px-4 py-2 bg-white border border-gray-100 text-booking-primary font-semibold rounded-lg hover:bg-gray-50 transition-all text-xs"
                        >
                          Cancel
                        </button>
                        <CommonButton
                          type="button"
                          label="Select"
                          onClick={() => {
                            if (
                              activeTab === "flexible" &&
                              selectedFlexibleMonth
                            ) {
                              const start = startOfMonth(selectedFlexibleMonth);
                              let end;
                              if (flexibleDuration === "3 nights")
                                end = addDays(start, 3);
                              else if (flexibleDuration === "1 week")
                                end = addDays(start, 7);
                              else end = addMonths(start, 1);
                              setCheckIn(start);
                              setCheckOut(end);
                              setSelectingFor("checkIn");
                            }
                            setCalendarAnchorEl(null);
                          }}
                          className="bg-booking-primary text-white min-w-[80px]"
                        />
                      </div>
                    </div>
                  </div>
                </Popover>

                <Popover
                  open={Boolean(guestsAnchorEl)}
                  anchorEl={guestsAnchorEl}
                  onClose={() => setGuestsAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  PaperProps={{
                    sx: {
                      borderRadius: "12px",
                      mt: 1,
                      p: 2.5,
                      width: { xs: "calc(100vw - 24px)", sm: "300px" },
                      maxWidth: "calc(100vw - 24px)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      border: "1px solid rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  <div className="space-y-4">
                    {[
                      {
                        label: "Room",
                        key: "rooms",
                        min: 1,
                        subtitle: null,
                        subtitleColor: null,
                      },
                      {
                        label: "Adults",
                        key: "adults",
                        min: 1,
                        subtitle: "Ages 13 or above",
                        subtitleColor: "text-booking-primary",
                      },
                      {
                        label: "Children",
                        key: "children",
                        min: 0,
                        subtitle: "Ages 0–12",
                        subtitleColor: "text-ayuBrown",
                      },
                    ].map(({ label, key, min, subtitle, subtitleColor }) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">
                            {label}
                          </p>
                          {subtitle && (
                            <p className={`text-[10px] ${subtitleColor}`}>
                              {subtitle}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            disabled={label === "Room" || guests[key] <= min}
                            onClick={() => {
                              if (key === "children") {
                                setGuests((g) => {
                                  const newCount = Math.max(
                                    min,
                                    g.children - 1,
                                  );
                                  return {
                                    ...g,
                                    children: newCount,
                                    childrenAges: g.childrenAges.slice(
                                      0,
                                      newCount,
                                    ),
                                  };
                                });
                              } else {
                                setGuests((g) => ({
                                  ...g,
                                  [key]: Math.max(min, g[key] - 1),
                                }));
                              }
                            }}
                            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all text-ayuBrown disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Remove sx={{ fontSize: 14 }} />
                          </button>
                          <span className="w-4 text-center font-semibold text-sm text-gray-800">
                            {guests[key]}
                          </span>
                          <button
                            type="button"
                            disabled={
                              label === "Room" ||
                              (key === "adults" &&
                                (guests.adults >= 3 ||
                                  (guests.children > 0 &&
                                    guests.adults >= 2))) ||
                              (key === "children" &&
                                (guests.children >= 2 || guests.adults >= 3))
                            }
                            onClick={() => {
                              if (key === "children") {
                                setGuests((g) => ({
                                  ...g,
                                  children: g.children + 1,
                                  childrenAges: [...g.childrenAges, ""],
                                }));
                              } else {
                                setGuests((g) => ({ ...g, [key]: g[key] + 1 }));
                              }
                            }}
                            className="w-8 h-8 rounded-full border border-booking-primary text-booking-primary flex items-center justify-center hover:bg-booking-primaryLight active:scale-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Add sx={{ fontSize: 14 }} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {guests.children > 0 && (
                      <div className="pt-3 border-t border-gray-100 space-y-3">
                        <p className="text-[10px] text-booking-primary leading-tight">
                          Enter your children's correct ages for accurate
                          pricing.
                        </p>
                        <div className="space-y-2">
                          {Array.from({ length: guests.children }).map(
                            (_, i) => (
                              <FormControl key={i} fullWidth size="small">
                                <Select
                                  value={guests.childrenAges[i] || ""}
                                  onChange={(e) => {
                                    const newAges = [...guests.childrenAges];
                                    newAges[i] = e.target.value;
                                    setGuests((g) => ({
                                      ...g,
                                      childrenAges: newAges,
                                    }));
                                  }}
                                  displayEmpty
                                  variant="outlined"
                                  sx={{
                                    borderRadius: "9px",
                                    fontSize: "11px",
                                    ".MuiSelect-select": { py: 1 },
                                  }}
                                  IconComponent={KeyboardArrowDown}
                                >
                                  <MenuItem
                                    value=""
                                    disabled
                                    sx={{
                                      fontSize: "11px",
                                      "&::before": {
                                        display: "none !important",
                                      },
                                    }}
                                  >
                                    Age of Child {i + 1}
                                  </MenuItem>
                                  {Array.from({ length: 13 }).map((_, age) => (
                                    <MenuItem
                                      key={age}
                                      value={age}
                                      sx={{
                                        fontSize: "11px",
                                        "&::before": {
                                          display: "none !important",
                                        },
                                      }}
                                    >
                                      {age} years old
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    <div className="pt-3 flex justify-end gap-2 border-t border-gray-100">
                      <button
                        onClick={() => setGuestsAnchorEl(null)}
                        className="px-4 py-2 text-[11px] font-semibold text-booking-primary hover:text-gray-600 transition-all"
                      >
                        Cancel
                      </button>
                      <CommonButton
                        type="button"
                        onClick={() => {
                          setValue("noOfAdults", guests.adults);
                          let children0to5 = 0;
                          let children6to12 = 0;
                          guests.childrenAges.forEach((age) => {
                            if (age !== "" && age >= 0 && age <= 5)
                              children0to5++;
                            else if (age !== "" && age >= 6 && age <= 12)
                              children6to12++;
                          });
                          setValue("noOfChildren0to5", children0to5);
                          setValue("noOfChildren6to12", children6to12);
                          setGuestsAnchorEl(null);
                        }}
                        className="bg-booking-primary text-white"
                        label="Apply"
                      />
                    </div>
                  </div>
                </Popover>
              </div>
            </LocalizationProvider>
            <div className="flex flex-col gap-2 pt-2 border rounded-[9px] p-2 mt-2">
              <p className="text-[10px] font-bold text-booking-primary uppercase tracking-widest">
                Preferences
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    label: "Bringing a Pet?",
                    sub: "Pre-approval required",
                    subColor: "text-booking-primary",
                    field: "bringingPet",
                  },
                  {
                    label: "Twin Sharing?",
                    sub: "Share with another guest",
                    subColor: "text-booking-primary",
                    field: "twinSharing",
                  },
                  {
                    label: "Same-gender rules?",
                    sub: "*Only share with same gender",
                    subColor: "text-red-500",
                    field: "sameGenderRules",
                  },
                ].map(({ label, sub, subColor, field }) => (
                  <div
                    key={field}
                    className="flex items-center justify-between bg-gray-50/50 p-2 rounded-xl border  hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                        <PeopleAlt
                          className="text-booking-primary"
                          sx={{ fontSize: 16 }}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-xs sm:text-[13px]">
                          {label}
                        </p>
                        <p className={`text-[10px] font-semibold ${subColor}`}>
                          {sub}
                        </p>
                      </div>
                    </div>
                    <Switch
                      size="small"
                      checked={formValues[field]}
                      onChange={(e) => setValue(field, e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#4B6B53",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          { backgroundColor: "#4B6B53" },
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full mt-2">
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[9px] p-3 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.06)] flex flex-col gap-3"
              >
                <div className="border-b border-booking-primary/10 pb-2">
                  <h2 className="text-base sm:text-lg font-serif text-ayuBrown font-bold">
                    Reservation Summary
                  </h2>
                </div>

                <div className="bg-booking-primaryLight p-3 rounded-xl flex items-center gap-3 border border-booking-primary/10">
                  <BedIcon
                    className="text-booking-primary flex-shrink-0"
                    sx={{ fontSize: 20 }}
                  />
                  <span className="text-booking-primary font-semibold text-sm tracking-tight line-clamp-2">
                    {selectedService
                      ? selectedService.serviceName.split("|")[1] ||
                        selectedService.serviceName
                      : "Select your stay"}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold text-booking-primary uppercase tracking-widest">
                      Guest Information
                    </p>
                    <CommonButton
                      type="button"
                      onClick={() => setOpenAddPatient(true)}
                      label="+ Add Guest"
                      className="bg-booking-primary text-white  hover:bg-booking-primaryDark transition-all shadow-sm shrink-0"
                    />
                  </div>
                  <div className="mt-2">
                    <DropdownField
                      control={control}
                      name="patientFid"
                      placeholder="Select Guest"
                      dataArray={patientOptions}
                      isClearable={true}
                      searchIcon={true}
                    />
                  </div>
                  {genderCriteria !== "" &&
                    genderCriteria !== "Booking Allowed" && (
                      <div className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-2.5">
                        <div className="mt-0.5 text-amber-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3m0 4h.01M10.29 3.86l-7.5 13A1 1 0 003.66 18h16.68a1 1 0 00.87-1.5l-7.5-13a1 1 0 00-1.74 0z"
                            />
                          </svg>
                        </div>

                        <div>
                          <h4 className="font-semibold text-[11px] text-amber-800">
                            Gender Restriction
                          </h4>
                          <p className="mt-0.5 text-[10px] text-amber-700">
                            {genderCriteria}
                          </p>
                        </div>
                      </div>
                    )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="">
                      <InputField
                        control={control}
                        name="fullName"
                        label="Full Name"
                        variant="outlined"
                      />
                    </div>
                    <div className="">
                      <RadioField
                        control={control}
                        name="gender"
                        label={"Gender"}
                        dataArray={[
                          { label: "Male", value: "Male" },
                          { label: "Female", value: "Female" },
                          { value: "Other", label: "Other" },
                        ]}
                      />
                    </div>
                    <InputField
                      control={control}
                      name="email"
                      label="Email Address"
                      variant="outlined"
                      dontCapitalize={"none"}
                    />
                    <InputField
                      control={control}
                      name="mobile"
                      label="Mobile"
                      variant="outlined"
                    />
                    <InputField
                      control={control}
                      name="city"
                      label="City"
                      variant="outlined"
                    />
                    <InputField
                      control={control}
                      name="noOfAdults"
                      label="Adults (Max 3)"
                      variant="outlined"
                      type="number"
                      inputProps={{ min: 1, max: 3 }}
                      disabled={!formValues?.twinSharing}
                    />
                    <div className="flex items-center justify-between p-2 border rounded-[9px] bg-white hover:border-booking-primary transition-colors">
                      <div className="flex flex-col">
                        <p className="text-[11px] font-bold text-booking-primary uppercase tracking-wider">
                          Children (0-5 Years)
                        </p>
                        <p className="text-[9px] text-gray-500 font-medium">
                          Max 2 total children
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={
                            (Number(formValues?.noOfChildren0to5) || 0) <= 0 ||
                            !formValues?.twinSharing
                          }
                          onClick={() =>
                            setValue(
                              "noOfChildren0to5",
                              Math.max(
                                0,
                                (Number(formValues?.noOfChildren0to5) || 0) - 1,
                              ),
                            )
                          }
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all text-ayuBrown disabled:opacity-30"
                        >
                          <Remove sx={{ fontSize: 12 }} />
                        </button>
                        <span className="w-4 text-center font-bold text-xs text-gray-800">
                          {Number(formValues?.noOfChildren0to5) || 0}
                        </span>
                        <button
                          type="button"
                          disabled={
                            !formValues?.twinSharing ||
                            (Number(formValues?.noOfChildren0to5) || 0) +
                              (Number(formValues?.noOfChildren6to12) || 0) >=
                              2 ||
                            (Number(formValues?.noOfAdults) || 0) >= 3
                          }
                          onClick={() =>
                            setValue(
                              "noOfChildren0to5",
                              (Number(formValues?.noOfChildren0to5) || 0) + 1,
                            )
                          }
                          className="w-7 h-7 rounded-full border border-booking-primary text-booking-primary flex items-center justify-center hover:bg-booking-primaryLight active:scale-90 transition-all disabled:opacity-30"
                        >
                          <Add sx={{ fontSize: 12 }} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 border rounded-[9px] bg-white hover:border-booking-primary transition-colors">
                      <div className="flex flex-col">
                        <p className="text-[11px] font-bold text-booking-primary uppercase tracking-wider">
                          Children (6-12 Years)
                        </p>
                        <p className="text-[9px] text-gray-500 font-medium">
                          Max 2 total children
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={
                            (Number(formValues?.noOfChildren6to12) || 0) <= 0 ||
                            !formValues?.twinSharing
                          }
                          onClick={() =>
                            setValue(
                              "noOfChildren6to12",
                              Math.max(
                                0,
                                (Number(formValues?.noOfChildren6to12) || 0) -
                                  1,
                              ),
                            )
                          }
                          className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all text-ayuBrown disabled:opacity-30"
                        >
                          <Remove sx={{ fontSize: 12 }} />
                        </button>
                        <span className="w-4 text-center font-bold text-xs text-gray-800">
                          {Number(formValues?.noOfChildren6to12) || 0}
                        </span>
                        <button
                          type="button"
                          disabled={
                            !formValues?.twinSharing ||
                            (Number(formValues?.noOfChildren0to5) || 0) +
                              (Number(formValues?.noOfChildren6to12) || 0) >=
                              2 ||
                            (Number(formValues?.noOfAdults) || 0) >= 3
                          }
                          onClick={() =>
                            setValue(
                              "noOfChildren6to12",
                              (Number(formValues?.noOfChildren6to12) || 0) + 1,
                            )
                          }
                          className="w-7 h-7 rounded-full border border-booking-primary text-booking-primary flex items-center justify-center hover:bg-booking-primaryLight active:scale-90 transition-all disabled:opacity-30"
                        >
                          <Add sx={{ fontSize: 12 }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  className="flex overflow-hidden rounded-xl border border-[rgba(160,130,80,0.18)] bg-[#faf7f2]"
                >
                  <div
                    className="w-[5px] shrink-0"
                    style={{
                      background:
                        "linear-gradient(180deg, #9B5E4D 0%, #6E3B2E 50%, #4B241B 100%)",
                    }}
                  />

                  <div className="flex flex-1 items-center gap-3 p-[12px_14px]">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
          border border-[rgba(160,130,80,0.2)] bg-white shadow-[0_2px_12px_rgba(160,130,80,0.1)]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#a08230"
                        strokeWidth={1.4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 11l1-7h16l1 7" />
                        <path d="M3 11a9 9 0 0 0 18 0" />
                        <path d="M12 20v2" />
                        <path d="M8 22h8" />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <p className="mb-1 text-[9px] uppercase tracking-[.28em] text-[#a08230]">
                        Meal Preference
                      </p>

                      <p className="mb-2 text-[13px] font-light leading-[1.65] text-[#7a6e62]">
                        Two Curated Sunrise–Sunset Ayurveda Routine, Veg
                        Wholesome Meals, and Herbal Gud Green Tea crafted for a
                        relaxing and Natural Healing.
                      </p>

                      <div className="flex flex-wrap gap-[7px]">
                        {[{ label: "Green Tea", icon: <TeaIcon /> }].map(
                          ({ label, icon }) => (
                            <span
                              key={label}
                              className="inline-flex items-center gap-[5px] rounded-full border
                                        border-[rgba(160,130,80,0.22)] bg-white px-[11px] py-1
                                        text-[10.5px] tracking-[.04em] text-[#8b6914]"
                            >
                              {icon}
                              {label}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-booking-primary/5 flex flex-col gap-1.5">
                  {breakdownItems.map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-500 font-semibold text-[10px] tracking-wider">
                        {label}
                      </span>
                      <span className="text-booking-primaryDark font-semibold text-sm">
                        ₹{value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4 pt-2 border-t border-dashed border-booking-primary/20">
                  <div>
                    <h3 className="text-base font-serif text-ayuBrown font-bold leading-none mb-1">
                      Total Amount
                    </h3>
                    <span className="text-[9px] text-booking-primary font-medium uppercase tracking-wider">
                      Includes all taxes & fees
                    </span>
                  </div>
                  <span className="text-2xl font-serif text-booking-primary font-black tracking-tight">
                    ₹{Math.round(costs.total).toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-col pt-2 border-t border-dashed border-booking-primary/20">
                  <span
                    className="text-[11px] text-blue-600 font-semibold cursor-pointer underline mb-2 inline-block"
                    onClick={() => {
                      setTempTermsAccepted(termsAccepted);
                      setOpenTermsModal(true);
                    }}
                  >
                    View Terms & Conditions and Policy
                  </span>
                  <div className="flex justify-end space-x-2">
                    <CommonButton
                      type="button"
                      label="Reset"
                      className="border border-red-600 text-red-600 bg-red-50"
                      onClick={reset}
                    />
                    <CommonButton
                      label={"Book Now"}
                      onClick={handleConfirmBooking}
                      disabled={!termsAccepted}
                      className={`w-full text-sm transition-all active:scale-[0.98] tracking-widest ${
                        termsAccepted
                          ? "bg-gradient-to-r from-booking-primary to-booking-primaryDark text-white shadow-lg shadow-booking-primary/10"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
                      }`}
                    />
                  </div>
                </div>
              </motion.div>

              <div className="mt-2 mb-1 grid grid-cols-3 gap-2">
                {[
                  {
                    icon: <PeopleAlt sx={{ fontSize: 18 }} />,
                    label: "Twin Sharing",
                  },
                  {
                    icon: <PetsIcon sx={{ fontSize: 18 }} />,
                    label: "Pet Pre-Approved",
                  },
                  {
                    icon: <CalendarMonth sx={{ fontSize: 18 }} />,
                    label: "72-Hr Cancel",
                  },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="bg-booking-primaryLight/30 py-2 px-2 rounded-xl flex flex-col items-center justify-center text-center gap-1 border border-booking-primary/5 shadow-sm hover:bg-booking-primaryLight/50 transition-all"
                  >
                    <div className="text-booking-primary bg-white h-8 w-8 rounded-full shadow-sm flex items-center justify-center">
                      {badge.icon}
                    </div>
                    <p className="text-[8px] sm:text-[9px] font-black text-booking-primary uppercase tracking-tight leading-tight">
                      {badge.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal open={openTermsModal} onClose={() => setOpenTermsModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "95%",
            maxWidth: 600,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            mb={1}
            fontWeight="bold"
            color="primary"
          >
            Terms & Conditions and Policy
          </Typography>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-booking-primaryDark flex-shrink-0" />
                <p className="text-[14px] xl:text-[15px] text-gray-600 leading-snug">
                  You can cancel your booking up to 24 hours before check-in.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-booking-primaryDark flex-shrink-0" />
                <p className="text-[14px] xl:text-[15px] text-gray-600 leading-snug">
                  <span className="font-semibold text-booking-primaryDark">
                    25% of the booking amount
                  </span>{" "}
                  will be deducted as a cancellation fee.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-booking-primaryDark flex-shrink-0" />
                <p className="text-[14px] xl:text-[15px] text-gray-600 leading-snug">
                  <span className="font-semibold text-booking-primaryDark">
                    No refund
                  </span>{" "}
                  will be provided for cancellations made less than 24 hours
                  before check-in.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-booking-primaryDark flex-shrink-0" />
                <p className="text-[14px] xl:text-[15px] text-gray-600 leading-snug">
                  <span className="font-semibold text-booking-primaryDark">
                    No refund
                  </span>{" "}
                  will be provided if you do not check in on your scheduled
                  booking date.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-booking-primaryDark flex-shrink-0" />
                <p className="text-[14px] xl:text-[15px] text-gray-600 leading-snug">
                  Date changes are subject to room availability.
                </p>
              </div>
            </div>
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={tempTermsAccepted}
                onChange={(e) => setTempTermsAccepted(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2" fontWeight="medium">
                I accept the terms & conditions and policy.
              </Typography>
            }
          />
          <Box display="flex" justifyContent="flex-end" gap={2} mt={1}>
            <CommonButton
              label="Cancel"
              onClick={() => setOpenTermsModal(false)}
              className="border border-gray-300 text-gray-700 bg-white"
            />
            <CommonButton
              label="Confirm"
              onClick={() => {
                setTermsAccepted(tempTermsAccepted);
                setOpenTermsModal(false);
              }}
              className="bg-booking-primary text-white"
            />
          </Box>
        </Box>
      </Modal>

      <ConfirmationModal
        confirmationOpen={openConfirmationModal || isPaymentPending}
        confirmationHandleClose={() => {
          if (isPaymentPending) {
            cancelPaymentRef.current?.();
            setIsPaymentPending(false);
            setOpenConfirmationModal(false);
          } else {
            setOpenConfirmationModal(false);
          }
        }}
        confirmationSubmitFunc={
          isPaymentPending ? () => {} : initiateBookingPayment
        }
        confirmationLabel={
          isPaymentPending ? "Payment in Progress" : "Confirm Stay Booking"
        }
        confirmationMsg={
          isPaymentPending
            ? "Please complete the transaction in the new tab to secure your room. Do not close this window."
            : "Are you sure you want to book this stay?"
        }
        confirmationButtonMsg={
          isPaymentPending ? "Waiting..." : "Confirm & Pay"
        }
        disabled={isPaymentPending}
      />
      {openAddPatient && (
        <AddPatientModal
          open={openAddPatient}
          title="Guest Registration"
          handleClose={() => {
            setOpenAddPatient(false);
            handleGetPatientData();
          }}
        />
      )}
    </>
  );
}

export default StayBookingModal;

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#A08230"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2V4" />
    <path d="M12 20V22" />
    <path d="M4.93 4.93L6.34 6.34" />
    <path d="M17.66 17.66L19.07 19.07" />
    <path d="M2 12H4" />
    <path d="M20 12H22" />
    <path d="M4.93 19.07L6.34 17.66" />
    <path d="M17.66 6.34L19.07 4.93" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a08230"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
  </svg>
);

const TeaIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a08230"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
);
