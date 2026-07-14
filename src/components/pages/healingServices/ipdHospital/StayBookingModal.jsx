import { yupResolver } from "@hookform/resolvers/yup";
import {
  AccessTime,
  Add,
  ArrowBackIos,
  ArrowForwardIos,
  Bed as BedIcon,
  CalendarMonth,
  Delete,
  KeyboardArrowDown,
  PeopleAlt,
  Remove,
} from "@mui/icons-material";
import PetsIcon from "@mui/icons-material/Pets";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Modal,
  Popover,
  Select,
  Switch,
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
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import DropdownField from "../../../common/formFields/DropdownField";
import InputField from "../../../common/formFields/InputField";
import RadioField from "../../../common/formFields/RadioField";
import { ModalStyle } from "../../../common/modalStyle/ModalStyle";
import { errorAlert, successAlert } from "../../../common/toast/CustomToast";
import AddPatientModal from "../../opdBooking/AddPatientModal";
import { RedirectToSabPaisa } from "../../opdBooking/RedirectToSabPaisa";
import BookingPreviewModal from "./BookingPreviewModal";
import StayIcon from "../../../../assets/StayIcon.png";
import ReservationIcon from "../../../../assets/ReservationIcon.svg";

const NAME_INPUT_REGEX = /[^a-zA-Z\s]/g;

const sanitizeNameValue = (value) => value.replace(NAME_INPUT_REGEX, "");

const findDuplicateMemberIndexes = (members) => {
  const duplicates = new Set();
  members.forEach((member, index) => {
    if (!member.firstName || !member.lastName) return;
    const firstName = member.firstName.toLowerCase().trim();
    const lastName = member.lastName.toLowerCase().trim();
    members.forEach((other, otherIndex) => {
      if (index === otherIndex || !other.firstName || !other.lastName) return;
      if (
        other.firstName.toLowerCase().trim() === firstName &&
        other.lastName.toLowerCase().trim() === lastName
      ) {
        duplicates.add(index);
      }
    });
  });
  return duplicates;
};

const SectionLabel = ({ children, tone = "sage" }) => {
  const toneMap = {
    sage: "text-booking-primary",
    clay: "text-[#9B5E4D]",
    gold: "text-[#a08230]",
  };
  return (
    <p
      className={`text-[10px] font-bold uppercase tracking-[0.2em] ${toneMap[tone]}`}
    >
      {children}
    </p>
  );
};

const LeafIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 20c8.5 0 15-6 15-15C10 5 4 11.5 4 20Z" />
    <path d="M6 18C11 13 14 10 18 6" />
  </svg>
);

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
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const [finalSaveObj, setFinalSaveObj] = useState(null);
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [patientOptions, setPatientOptions] = useState([]);
  const [ageDetailsConfig, setAgeDetailsConfig] = useState([]);
  const [genderCriteria, setGenderCriteria] = useState("");
  const [selectedRoomDetails, setSelectedRoomDetails] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [cachedAvailableOccupancy, setCachedAvailableOccupancy] = useState(0);
  const isOutdoorLeaving = selectedService?.roomTypeId === 6;
  const [outdoorMembers, setOutdoorMembers] = useState([]);

  const outdoor0to5Count = outdoorMembers.filter(
    (m) => m.age !== "" && m.age !== null && Number(m.age) < 6,
  ).length;
  const outdoorMemberLimit =
    cachedAvailableOccupancy > 0
      ? cachedAvailableOccupancy + outdoor0to5Count
      : 0;

  const cancelPaymentRef = useRef(null);
  const { user } = useAuth();
  const { setIsLoading } = useLoader();

  const carouselRef = useRef(null);
  const checkInDateRef = useRef(null);
  const inTimeRef = useRef(null);
  const checkOutDateRef = useRef(null);
  const outTimeRef = useRef(null);
  const guestInputRef = useRef(null);

  const isAdmin =
    String(user?.role || "")
      .trim()
      .toLowerCase() === "admin";

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
      sharingType: "Own",
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

  const adultFamilyCount = familyMembers.filter(
    (m) => !m.age || Number(m.age) > 12,
  ).length;
  const child6to12FamilyCount = familyMembers.filter(
    (m) =>
      m.age !== "" &&
      m.age !== null &&
      Number(m.age) >= 6 &&
      Number(m.age) <= 12,
  ).length;
  const child0to5FamilyCount = familyMembers.filter(
    (m) => m.age !== "" && m.age !== null && Number(m.age) < 6,
  ).length;

  const noOfChildren6to12Stepper = Number(formValues?.noOfChildren6to12) || 0;
  const noOfChildren0to5Stepper = Number(formValues?.noOfChildren0to5) || 0;

  const totalAdults = 1 + adultFamilyCount;
  const total6to12 = child6to12FamilyCount + noOfChildren6to12Stepper;
  const total0to5 = child0to5FamilyCount + noOfChildren0to5Stepper;
  const totalChildrenAll = total6to12 + total0to5;

  const isRoomUnavailable =
    roomStatus &&
    roomStatus !== "error" &&
    ((typeof roomStatus?.availableOccupancy === "number" &&
      roomStatus.availableOccupancy <= 0) ||
      (typeof roomStatus?.message === "string" &&
        roomStatus.message.trim().toLowerCase() === "room is unavailable"));

  const twinAvail = roomStatus?.availableOccupancy ?? 2;

  const existingAge0to5 = Number(roomStatus?.age0To5Count) || 0;
  const existingAge6to12 = Number(roomStatus?.age6To12Count) || 0;
  const roomRestriction = roomStatus?.restriction || "";
  const isGenderRestricted = /only/i.test(roomRestriction);

  const twinMaxExtraAdults =
    !isOutdoorLeaving && formValues?.twinSharing
      ? twinAvail === 2
        ? 1
        : 0
      : null;

  const maxAdults = (() => {
    if (!isOutdoorLeaving && formValues?.twinSharing) {
      if (twinAvail >= 3) return 1;
      if (twinAvail === 1) return 1;
      if (twinAvail === 2) return 2;
      return cachedAvailableOccupancy > 0 ? cachedAvailableOccupancy : 3;
    }
    return cachedAvailableOccupancy > 0 ? cachedAvailableOccupancy : 3;
  })();

  const adultSlotsRemaining = maxAdults - totalAdults;
  const childSlotsRemaining = (() => {
    if (
      !isOutdoorLeaving &&
      formValues?.sharingType === "Family" &&
      !formValues?.twinSharing
    ) {
      if (totalAdults === 3) return Math.max(0, 1 - totalChildrenAll);
      return Math.max(0, 2 - totalChildrenAll);
    }
    if (!isOutdoorLeaving && formValues?.twinSharing) {
      const avail = roomStatus?.availableOccupancy ?? 2;
      if (avail === 2) {
        if (totalAdults === 2)
          return Math.max(
            0,
            3 - totalChildrenAll - existingAge0to5 - existingAge6to12,
          );
        return Math.max(
          0,
          2 - totalChildrenAll - existingAge0to5 - existingAge6to12,
        );
      }
      if (avail === 1)
        return Math.max(
          0,
          1 - totalChildrenAll - existingAge0to5 - existingAge6to12,
        );
      if (avail >= 3) {
        if (total6to12 > 0 || existingAge6to12 > 0)
          return Math.max(0, 1 - existingAge6to12 - total6to12);
        return Math.max(0, 2 - existingAge0to5 - total0to5);
      }
    }
    if (!isOutdoorLeaving && formValues?.sharingType === "Own") {
      return 0;
    }
    return Math.max(0, 2 - totalChildrenAll);
  })();

  const familyMemberLimit = (() => {
    if (
      !isOutdoorLeaving &&
      formValues?.sharingType === "Family" &&
      !formValues?.twinSharing
    ) {
      return 3;
    }
    if (!isOutdoorLeaving && formValues?.twinSharing) {
      const avail = roomStatus?.availableOccupancy ?? 2;
      if (avail === 2)
        return Math.max(0, 4 - existingAge0to5 - existingAge6to12);
      if (avail === 1)
        return Math.max(0, 1 - existingAge0to5 - existingAge6to12);
      if (avail >= 3) {
        if (existingAge6to12 > 0) return Math.max(0, 1 - existingAge6to12);
        return Math.max(0, 2 - existingAge0to5);
      }
    }
    if (!isOutdoorLeaving && formValues?.sharingType === "Own") {
      return 0;
    }
    return maxAdults - 1 + 2;
  })();

  useEffect(() => {
    setRoomStatus(null);
    setCachedAvailableOccupancy(0);
  }, [checkIn, checkOut, guests.rooms, formValues?.twinSharing]);

  useEffect(() => {
    if ((checkIn && checkOut) || formValues?.twinSharing) {
      handleCheckVailabilty();
    }
  }, [checkIn, checkOut, formValues?.twinSharing]);

  useEffect(() => {
    const children0to5 = Number(formValues?.noOfChildren0to5) || 0;
    const children6to12 = Number(formValues?.noOfChildren6to12) || 0;
    const totalChildren = children0to5 + children6to12;

    if (totalChildren > 2) {
      if (children0to5 > 2) setValue("noOfChildren0to5", 2);
      if (children6to12 > 2) setValue("noOfChildren6to12", 2);
    }
  }, [formValues?.noOfChildren0to5, formValues?.noOfChildren6to12]);

  useEffect(() => {
    if (formValues?.twinSharing) {
      setValue("sharingType", "Own");
      setFamilyMembers([]);
    }
  }, [formValues?.twinSharing]);

  useEffect(() => {
    if (
      !isOutdoorLeaving &&
      (formValues?.sharingType === "Family" || formValues?.twinSharing)
    ) {
      setValue("noOfAdults", 1 + adultFamilyCount);
    } else if (!isOutdoorLeaving && formValues?.sharingType === "Own") {
      setValue("noOfAdults", 1);
    }
  }, [
    familyMembers,
    formValues?.sharingType,
    formValues?.twinSharing,
    isOutdoorLeaving,
    patientFid,
    setValue,
  ]);

  const handleAddFamilyMember = useCallback(() => {
    setFamilyMembers((prev) => {
      if (prev.length >= familyMemberLimit) return prev;
      return [
        ...prev,
        { firstName: "", lastName: "", age: "", gender: "Male" },
      ];
    });
  }, [familyMemberLimit]);

  const handleRemoveFamilyMember = useCallback((index) => {
    setFamilyMembers((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleAddOutdoorMember = useCallback(() => {
    setOutdoorMembers((prev) => {
      if (prev.length >= outdoorMemberLimit) return prev;
      return [
        ...prev,
        { firstName: "", lastName: "", age: "", gender: "Male" },
      ];
    });
  }, [outdoorMemberLimit]);

  const handleRemoveOutdoorMember = useCallback((index) => {
    setOutdoorMembers((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleOutdoorMemberChange = useCallback((index, field, value) => {
    let nextValue = value;
    if ((field === "firstName" || field === "lastName") && nextValue !== "") {
      nextValue = sanitizeNameValue(nextValue);
    }
    if (field === "age" && nextValue !== "") {
      const num = parseInt(nextValue, 10);
      if (num > 120) return;
    }
    setOutdoorMembers((prev) =>
      prev.map((member, i) =>
        i === index ? { ...member, [field]: nextValue } : member,
      ),
    );
  }, []);

  const handleFamilyMemberChange = useCallback((index, field, value) => {
    let nextValue = value;
    if ((field === "firstName" || field === "lastName") && nextValue !== "") {
      nextValue = sanitizeNameValue(nextValue);
    }
    if (field === "age" && nextValue !== "") {
      const num = parseInt(nextValue, 10);
      if (num > 120) return;
    }
    setFamilyMembers((prev) =>
      prev.map((member, i) =>
        i === index ? { ...member, [field]: nextValue } : member,
      ),
    );
  }, []);

  const familyMemberDuplicateIndexes = useMemo(
    () => findDuplicateMemberIndexes(familyMembers),
    [familyMembers],
  );

  const outdoorMemberDuplicateIndexes = useMemo(
    () => findDuplicateMemberIndexes(outdoorMembers),
    [outdoorMembers],
  );

  const familyAdultInvalidIndexes = useMemo(() => {
    const invalid = new Set();
    if (twinMaxExtraAdults === null) return invalid;
    let adultSeen = 0;
    familyMembers.forEach((m, idx) => {
      const age = m.age;
      const isAdult =
        age === "" || age === null || age === undefined || Number(age) > 12;
      if (isAdult) {
        adultSeen++;
        if (adultSeen > twinMaxExtraAdults) invalid.add(idx);
      }
    });
    return invalid;
  }, [familyMembers, twinMaxExtraAdults]);

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

  const closeCalendarPopover = () => {
    if (checkIn && !checkOut) {
      const autoCheckOut = addDays(checkIn, 1);
      if (!isDateBooked(autoCheckOut)) {
        setCheckOut(autoCheckOut);
      }
    }
    setCalendarAnchorEl(null);
  };

  const calculateTotal = () => {
    if (!selectedService)
      return {
        stay: 0,
        taxes: 0,
        petSurcharge: 0,
        adultSurcharge: 0,
        adultSurchargePct: 75,
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
    const isFamilyMode =
      !isOutdoorLeaving &&
      (formValues?.sharingType === "Family" || isTwinSharing);

    let baseAdultsToCharge = 1;
    let wholeRoomSurcharge = 0;

    if (isOutdoorLeaving) {
      const outdoorAdultCount = outdoorMembers.filter(
        (m) => m.age === "" || m.age === null || Number(m.age) > 12,
      ).length;
      baseAdultsToCharge = 1 + outdoorAdultCount;
    } else {
      const familyAdultCount = familyMembers.filter(
        (m) => !m.age || Number(m.age) > 12,
      ).length;
      const actualAdults = 1 + familyAdultCount;

      if (isTwinSharing && actualAdults === 1) {
        baseAdultsToCharge = 1;
      } else if (formValues?.sharingType === "Own") {
        baseAdultsToCharge = 1;
        wholeRoomSurcharge = dailyBase * 1 * effectiveDays;
      } else if (formValues?.sharingType === "Family") {
        if (actualAdults === 1) {
          baseAdultsToCharge = 1;
          wholeRoomSurcharge = dailyBase * 1 * effectiveDays;
        } else {
          baseAdultsToCharge = 2;
        }
      } else {
        baseAdultsToCharge = Math.min(actualAdults, 2);
      }
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
    let extraAdultsCount = 0;

    const children0to5Count = parseInt(formValues?.noOfChildren0to5, 10) || 0;
    const children6to12Count = parseInt(formValues?.noOfChildren6to12, 10) || 0;

    let chargedChildren6to12 = children6to12Count;

    let childrenSurcharge =
      (children0to5Count * dailyBase * (kid0to5Pct / 100) +
        children6to12Count * dailyBase * (kid6to12Pct / 100)) *
      effectiveDays;

    if (isFamilyMode && familyMembers.length >= 2) {
      for (let i = 1; i < familyMembers.length; i++) {
        const extraMember = familyMembers[i];
        const rawAge = extraMember?.age;
        const extraAge =
          rawAge !== "" && rawAge !== null && rawAge !== undefined
            ? Number(rawAge)
            : null;

        if (extraAge === null || extraAge > 12) {
          adultSurcharge += dailyBase * 0.75 * effectiveDays;
          extraAdultsCount++;
        } else if (extraAge >= 6 && extraAge <= 12) {
          childrenSurcharge += dailyBase * (kid6to12Pct / 100) * effectiveDays;
          chargedChildren6to12++;
        }
      }
    } else if (noOfAdults === 3) {
      adultSurcharge = dailyBase * 0.75 * effectiveDays;
      extraAdultsCount++;
    }

    if (isOutdoorLeaving && outdoorMembers.length > 0) {
      for (let i = 0; i < outdoorMembers.length; i++) {
        const outMember = outdoorMembers[i];
        const rawAge = outMember?.age;
        const outAge =
          rawAge !== "" && rawAge !== null && rawAge !== undefined
            ? Number(rawAge)
            : null;

        if (outAge >= 6 && outAge <= 12) {
          childrenSurcharge += dailyBase * (kid6to12Pct / 100) * effectiveDays;
          chargedChildren6to12++;
        }
      }
    }

    const totalWithoutTaxes =
      stayTotal +
      wellness +
      petSurcharge +
      adultSurcharge +
      childrenSurcharge +
      wholeRoomSurcharge;
    const taxes = totalWithoutTaxes * 0;

    return {
      stay: stayTotal,
      wellness: wellness,
      taxes: taxes,
      petSurcharge: petSurcharge,
      adultSurcharge: adultSurcharge,
      childrenSurcharge: childrenSurcharge,
      wholeRoomSurcharge: wholeRoomSurcharge,
      total: totalWithoutTaxes + taxes,
      days: effectiveDays,
      petPct,
      kid0to5Pct,
      kid6to12Pct,
      baseAdultsToCharge,
      extraAdultsCount,
      chargedChildren6to12,
    };
  };

  const costs = useMemo(
    () => calculateTotal(),
    [
      selectedService,
      checkIn,
      checkOut,
      formValues?.noOfAdults,
      formValues?.twinSharing,
      formValues?.bringingPet,
      formValues?.noOfChildren0to5,
      formValues?.noOfChildren6to12,
      formValues?.sharingType,
      ageDetailsConfig,
      familyMembers,
      outdoorMembers,
    ],
  );

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

  const bookedRanges = useMemo(
    () => getBookedDateRanges(),
    [selectedRoomDetails],
  );

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
              "relative flex items-center justify-center h-9 w-9 md:h-11 md:w-11 text-[13px] transition-all",
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
              booked && isCurrentMonth ? "bg-[#FBEAE7]" : "",
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
                "relative z-10 w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-[12px] md:text-[13px] font-semibold transition-all",
                selected && isCurrentMonth && !booked
                  ? "bg-gradient-to-br from-booking-primary to-booking-primaryDark text-white shadow-md shadow-booking-primary/30"
                  : "",
                isToday && !booked && !selected
                  ? "ring-1 ring-[#a08230] text-[#a08230] font-bold"
                  : "",
                !booked && !selected && !isDisabled && isCurrentMonth
                  ? "hover:bg-booking-primaryLight/60 text-[#3F3A32]"
                  : "",
                booked && isCurrentMonth ? "bg-[#F6D8D3] text-[#C97B70]" : "",
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
        <div className="flex justify-between" key={day.toString()}>
          {days}
        </div>,
      );
      days = [];
    }

    return (
      <div className="w-full">
        <div className="text-center font-bold text-[#3F3A32] mb-3 text-sm tracking-wide">
          {format(monthDate, "MMMM yyyy")}
        </div>
        <div className="flex justify-between mb-2">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d, index) => (
            <div
              key={index}
              className="w-9 md:w-11 text-[9px] font-bold text-booking-primary/60 text-center uppercase tracking-wider"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="space-y-1">{rows}</div>
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
      Boolean(formValues?.twinSharing),
    )
      .then((res) => {
        setRoomStatus(res?.data);
        setCachedAvailableOccupancy(res?.data?.availableOccupancy ?? 0);
        setIsSearching(false);
      })
      .catch((err) => {
        console.error("Check availability error:", err);
        setRoomStatus("error");
        setCachedAvailableOccupancy(0);
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
    if (isRoomUnavailable) {
      errorAlert(
        "This room is unavailable for the selected dates. Please select other dates.",
      );
      return;
    }
    if (patientFid === null) {
      errorAlert("Please select guest!");
      return;
    }

    if (isOutdoorLeaving && outdoorMembers.length > 1) {
      if (outdoorMemberDuplicateIndexes.size > 0) {
        errorAlert("Members cannot have the same First Name and Last Name.");
        return;
      }
    }

    if (
      !isOutdoorLeaving &&
      (formValues?.sharingType === "Family" || formValues?.twinSharing) &&
      familyMembers.length > 1
    ) {
      if (familyMemberDuplicateIndexes.size > 0) {
        errorAlert("Members cannot have the same First Name and Last Name.");
        return;
      }
    }

    if (
      !isOutdoorLeaving &&
      formValues?.twinSharing &&
      familyAdultInvalidIndexes.size > 0
    ) {
      errorAlert(
        "Please fix family members: extra adults are not allowed for this room's occupancy.",
      );
      return;
    }

    if (!isOutdoorLeaving) {
      if (!formValues?.twinSharing && formValues?.sharingType === "Family") {
        if (familyMembers.length === 0) {
          errorAlert("Please add at least one family member!");
          return;
        }
        const hasIncompleteMember = familyMembers.some(
          (member) =>
            member.age === "" ||
            member.age === null ||
            member.age === undefined ||
            !member.gender,
        );
        if (hasIncompleteMember) {
          errorAlert("Please fill age and gender for all family members!");
          return;
        }
      }
    }

    if (roomStatus && roomStatus !== "error") {
      const avail = roomStatus?.availableOccupancy ?? null;
      const roomGender = roomStatus?.gender ?? null;

      const requestedAdults = Number(formValues?.noOfAdults) || 1;

      if (avail !== null) {
        if (avail <= 0) {
          errorAlert("This room is fully occupied. No beds available.");
          return;
        }
        if (!isOutdoorLeaving) {
          if (!formValues?.twinSharing && formValues?.sharingType === "Own") {
            if (totalAdults > 1 || totalChildrenAll > 0) {
              errorAlert("Own Room allows exactly 1 Adult and 1 Pet only.");
              return;
            }
          } else if (formValues?.twinSharing) {
            if (avail === 2) {
              if (totalAdults === 1) {
                if (total6to12 > 0 || total0to5 > 2) {
                  errorAlert(
                    "First Twin booking allows 1 Adult + up to two 0-5 yrs children.",
                  );
                  return;
                }
              } else if (totalAdults === 2) {
                if (total0to5 > 2 || total6to12 > 1) {
                  errorAlert(
                    "When booking 2 beds in Twin Sharing, you can bring up to two 0-5 yrs children and one 6-12 yrs child.",
                  );
                  return;
                }
              } else {
                errorAlert("Twin Sharing allows maximum 2 adults.");
                return;
              }
            } else if (avail === 1) {
              if (totalAdults > 1 || total0to5 > 0 || total6to12 > 1) {
                errorAlert(
                  "Second Twin booking allows 1 Adult + up to one 6-12 yrs child.",
                );
                return;
              }
            } else if (avail === 3) {
              if (totalAdults > 1) {
                errorAlert(
                  "Twin Sharing allows 1 Adult per bed for this room.",
                );
                return;
              }
              if (total0to5 > 2) {
                errorAlert(
                  "1 Adult may bring up to two children aged 0-5 yrs.",
                );
                return;
              }
              if (total6to12 > 1) {
                errorAlert("1 Adult may bring up to one child aged 6-12 yrs.");
                return;
              }
              if (total0to5 > 0 && total6to12 > 0) {
                errorAlert(
                  "Please choose either up to two children 0-5 yrs OR one child 6-12 yrs, not both.",
                );
                return;
              }
            }
          } else if (
            !formValues?.twinSharing &&
            formValues?.sharingType === "Family"
          ) {
            let isValidFamily = false;
            if (totalAdults === 3 && total0to5 <= 1 && total6to12 === 0)
              isValidFamily = true;
            else if (totalAdults <= 2 && total0to5 <= 2 && total6to12 === 0)
              isValidFamily = true;
            else if (totalAdults <= 2 && total0to5 === 0 && total6to12 <= 1)
              isValidFamily = true;

            if (!isValidFamily) {
              errorAlert(
                "Family room allows: 3 Adults + 1 Child(0-5) OR 2 Adults + 2 Children(0-5) OR 2 Adults + 1 Child(6-12).",
              );
              return;
            }
          }
        } else {
          if (1 + outdoorMembers.length - outdoor0to5Count > avail) {
            errorAlert(
              `Maximum occupancy of ${avail} reached for this service. Children 0-5 do not count towards occupancy.`,
            );
            return;
          }
        }
      }

      if (isGenderRestricted && roomGender !== null) {
        const guestGender = formValues?.gender || "";
        const roomGenderLower = roomGender.toLowerCase();
        const guestGenderLower = guestGender.toLowerCase();
        if (guestGenderLower && guestGenderLower !== roomGenderLower) {
          errorAlert(
            `This room is reserved for ${roomGender} guests only. Your profile gender (${guestGender}) does not match.`,
          );
          return;
        }
      }
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
      own:
        !isOutdoorLeaving &&
        !formValues?.twinSharing &&
        formValues?.sharingType === "Own",
      familyMember: isOutdoorLeaving
        ? outdoorMembers.length > 0
        : formValues?.twinSharing
          ? familyMembers.length > 0
          : formValues?.sharingType === "Family",
      familyMembers: isOutdoorLeaving
        ? outdoorMembers.length > 0
          ? outdoorMembers
          : null
        : (formValues?.twinSharing || formValues?.sharingType === "Family") &&
            familyMembers.length > 0
          ? familyMembers
          : null,
      totalAmount: costs?.total || 0,
      guestFullName: formValues?.fullName || "",
      emailId: formValues?.email || "",
      mobile: String(formValues?.mobile || ""),
      city: formValues?.city || "",
      sameGender: null,
    };

    setFinalSaveObj(saveObj);
    setOpenPreviewModal(true);
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
              setIsPaymentPending(false);
              handleClose();
              if (handleGetRoomList) handleGetRoomList();
            },
            (errorStatus) => {
              const msg =
                errorStatus?.message || "Payment failed or cancelled.";
              errorAlert(msg);
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
    getPatientDataByMobileNo(user?.mobileNo, user?.userId, "IPD", 5)
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
      if (familyMembers.length === 0) {
        setValue("noOfAdults", 1);
      }
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

  const breakdownItems = useMemo(
    () =>
      [
        {
          label: `Stay (${costs.baseAdultsToCharge} Adult${costs.baseAdultsToCharge > 1 ? "s" : ""}, ${costs.days} Day${costs.days > 1 ? "s" : ""})`,
          value: costs.stay,
          show: true,
        },
        {
          label: "Whole Room / Private Occupancy Surcharge",
          value: costs.wholeRoomSurcharge,
          show: costs.wholeRoomSurcharge > 0,
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
          label: `Extra Adults (${costs.extraAdultsCount}) (75%)`,
          value: Math.round(costs.adultSurcharge),
          show: costs.adultSurcharge > 0,
        },
        {
          label: `Children 6-12 Years (${costs.chargedChildren6to12}) (50%)`,
          value: Math.round(costs.childrenSurcharge),
          show: costs.childrenSurcharge > 0,
        },
      ].filter((item) => item.show),
    [costs],
  );

  const AvailabilityMeter = ({ available, occupied, bookings }) => {
    const avail = Number(available) || 0;
    const occ = Number(occupied) || 0;
    const total = avail + occ;
    const filledPct = total > 0 ? Math.round((occ / total) * 100) : 0;

    return (
      <div className="w-full sm:w-56 shrink-0">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-[12px] font-bold text-booking-primaryDark">
            {avail} Bed{avail === 1 ? "" : "s"} Available
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
            of {total} total
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-[#F1EBDD] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-booking-primary to-booking-primaryDark transition-all duration-500"
            style={{ width: `${Math.max(0, 100 - filledPct)}%` }}
          />
        </div>
        {bookings > 0 && (
          <p className="mt-1 text-[9px] text-gray-400">
            {bookings} existing booking{bookings === 1 ? "" : "s"} for these
            dates
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={ModalStyle}
          className="w-[98%] md:w-[92%] lg:w-[85%] xl:w-[70%] 2xl:w-[52%] max-h-[95dvh] overflow-hidden rounded-2xl bg-[#FBF8F2] p-0 flex flex-col no-scrollbar border border-[#E7E1D3] shadow-2xl"
        >
          <div className="h-[3px] w-full bg-gradient-to-r from-[#9B5E4D] via-[#a08230] to-booking-primary shrink-0" />

          <div className="sticky top-0 z-30 bg-[#F7F4EA] flex items-center justify-between px-3 sm:px-5 py-3 border-b border-[#E7E1D3]">
            <div className="flex items-center gap-2.5">
              <div className="w-16 h-16 rounded-full bg-booking-primaryLight/70 flex items-center justify-center shrink-0">
                <img src={StayIcon} className=" text-booking-primaryDark" />
              </div>
              <div>
                <h1 className="text-booking-primaryDark text-base md:text-xl font-bold leading-tight tracking-tight">
                  Stay Booking
                </h1>
                <p className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a08230]">
                  Ayurvedic Wellness Retreat
                </p>
              </div>
            </div>
            <CancelButtonModal onClick={handleClose} />
          </div>

          <div className="p-3 sm:p-5 flex-1 overflow-y-auto no-scrollbar flex flex-col gap-3">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="relative group/searchbar">
                <motion.div
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-lg shadow-[0_10px_30px_rgba(75,107,83,0.08)] p-2.5 flex flex-col gap-2 border border-[#EEE9DC] transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row items-stretch gap-2">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-stretch border border-[#EEE9DC] rounded-lg bg-white hover:border-booking-primary transition-colors overflow-hidden">
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
                          className="flex-1 flex flex-col px-3 py-2 cursor-pointer hover:bg-booking-primaryLight/20 transition-all border-r border-[#EEE9DC] min-w-0"
                        >
                          <p className="text-[7px] font-bold text-booking-primary uppercase tracking-[0.18em] mb-0.5">
                            Check-in
                          </p>
                          <div className="flex items-center gap-1.5">
                            <CalendarMonth
                              className="text-booking-primary/60 shrink-0"
                              sx={{ fontSize: 13 }}
                            />
                            <span className="text-[#3F3A32] font-bold text-[11px] tracking-tight truncate">
                              {checkIn
                                ? format(checkIn, "MMM dd, yyyy")
                                : "Add date"}
                            </span>
                          </div>
                        </div>
                        <div
                          ref={inTimeRef}
                          onClick={() => {
                            if (isAdmin) {
                              setInTimeAnchorEl(inTimeRef.current);
                            }
                          }}
                          onTouchEnd={(e) => {
                            if (isAdmin) {
                              e.preventDefault();
                              setInTimeAnchorEl(inTimeRef.current);
                            }
                          }}
                          className={`w-20 sm:w-24 shrink-0 flex flex-col px-2 py-2 transition-all ${
                            isAdmin
                              ? "cursor-pointer hover:bg-booking-primaryLight/20"
                              : "cursor-default pointer-events-none select-none"
                          }`}
                        >
                          <p className="text-[7px] font-bold text-booking-primary uppercase tracking-[0.18em] mb-0.5">
                            Time
                          </p>
                          <div className="flex items-center gap-1">
                            <AccessTime
                              className="text-booking-primary/60 shrink-0"
                              sx={{ fontSize: 12 }}
                            />
                            <span className="text-[#3F3A32] font-bold text-[11px] truncate">
                              {checkInTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-stretch border border-[#EEE9DC] rounded-lg bg-white overflow-hidden hover:border-booking-primary transition-colors">
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
                          className="flex-1 flex flex-col px-3 py-2 cursor-pointer hover:bg-booking-primaryLight/20 transition-all border-r border-[#EEE9DC] min-w-0"
                        >
                          <p className="text-[7px] font-bold text-booking-primary uppercase tracking-[0.18em] mb-0.5">
                            Check-out
                          </p>
                          <div className="flex items-center gap-1.5">
                            <CalendarMonth
                              className="text-booking-primary/60 shrink-0"
                              sx={{ fontSize: 13 }}
                            />
                            <span className="text-[#3F3A32] font-bold text-[11px] tracking-tight truncate">
                              {checkOut
                                ? format(checkOut, "MMM dd, yyyy")
                                : "Add date"}
                            </span>
                          </div>
                        </div>
                        <div
                          ref={outTimeRef}
                          onClick={() => {
                            if (isAdmin) {
                              setOutTimeAnchorEl(outTimeRef.current);
                            }
                          }}
                          onTouchEnd={(e) => {
                            if (isAdmin) {
                              e.preventDefault();
                              setOutTimeAnchorEl(outTimeRef.current);
                            }
                          }}
                          className={`w-20 sm:w-24 shrink-0 flex flex-col px-2 py-2 transition-all ${
                            isAdmin
                              ? "cursor-pointer hover:bg-booking-primaryLight/20"
                              : "cursor-default pointer-events-none select-none"
                          }`}
                        >
                          <p className="text-[7px] font-bold text-booking-primary uppercase tracking-[0.18em] mb-0.5">
                            Time
                          </p>
                          <div className="flex items-center gap-1">
                            <AccessTime
                              className="text-booking-primary/60 shrink-0"
                              sx={{ fontSize: 12 }}
                            />
                            <span className="text-[#3F3A32] font-bold text-[11px] truncate">
                              {checkOutTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="mt-2 flex flex-col gap-2.5 bg-white border border-[#EEE9DC] rounded-lg p-3">
                  <SectionLabel>Preferences</SectionLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      {
                        label: "Bringing a Pet?",
                        sub: "Pre-approval required",
                        subColor: "text-booking-primary",
                        field: "bringingPet",
                      },
                      {
                        label: "Twin Sharing?",
                        sub: "Affects bed availability below",
                        subColor: "text-booking-primary",
                        field: "twinSharing",
                      },
                    ].map(({ label, sub, subColor, field }) => (
                      <div
                        key={field}
                        className="flex items-center justify-between  p-2.5 rounded-lg border border-[#EEE9DC] hover:bg-booking-primaryLight/20 transition-colors gap-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                            <PeopleAlt
                              className="text-booking-primary"
                              sx={{ fontSize: 16 }}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-[#3F3A32] text-xs sm:text-[13px] truncate">
                              {label}
                            </p>
                            <p
                              className={`text-[10px] font-semibold ${subColor} truncate`}
                            >
                              {sub}
                            </p>
                          </div>
                        </div>
                        <Switch
                          size="small"
                          checked={formValues[field]}
                          disabled={
                            field === "twinSharing" &&
                            (isOutdoorLeaving ||
                              selectedService?.roomName === "Well House")
                          }
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

                <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-lg border border-[#EEE9DC] px-3 py-2.5 shadow-[0_6px_20px_rgba(75,107,83,0.05)]">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        roomStatus === "error" || isRoomUnavailable
                          ? "bg-[#FBEAE7] text-[#C97B70]"
                          : "bg-booking-primaryLight/70 text-booking-primaryDark"
                      }`}
                    >
                      <BedIcon sx={{ fontSize: 16 }} />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#3F3A32]">
                        {isSearching
                          ? "Checking availability…"
                          : !checkIn || !checkOut
                            ? "Pick your dates"
                            : roomStatus === "error"
                              ? "Couldn't check availability"
                              : isRoomUnavailable
                                ? "Room is Unavailable"
                                : roomStatus
                                  ? "Available"
                                  : "Pick your dates"}
                      </h4>

                      <p className="text-[10px] text-gray-500 truncate">
                        {!checkIn || !checkOut
                          ? "Select check-in and check-out to see live availability."
                          : roomStatus === "error"
                            ? "Please try again in a moment."
                            : roomStatus?.message
                              ? roomStatus.message
                              : isRoomUnavailable
                                ? "Please select a different date to book this room."
                                : roomStatus
                                  ? formValues?.twinSharing
                                    ? "Availability shown for twin sharing."
                                    : "Room is available for booking."
                                  : ""}
                      </p>
                      {!isSearching &&
                        roomStatus &&
                        roomStatus !== "error" &&
                        !isRoomUnavailable &&
                        roomRestriction && (
                          <p className="text-[9px] font-semibold text-booking-primary truncate">
                            {roomRestriction}
                          </p>
                        )}
                    </div>
                  </div>

                  {!isSearching &&
                    roomStatus &&
                    roomStatus !== "error" &&
                    !isRoomUnavailable && (
                      <AvailabilityMeter
                        available={roomStatus?.availableOccupancy}
                        occupied={roomStatus?.currentOccupancy}
                        bookings={roomStatus?.totalBookings}
                      />
                    )}
                </div>

                {isRoomUnavailable && (
                  <div className="flex items-start gap-2 rounded-xl border border-[#F1C6BE] bg-[#FBEAE7] px-3 py-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-[#C97B70] mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <p className="text-[11px] text-[#B15B4F] font-semibold">
                      {roomStatus?.message
                        ? `${roomStatus.message}. Please choose different check-in / check-out dates to continue.`
                        : "This room is unavailable for the selected dates. Please choose different check-in / check-out dates to continue."}
                    </p>
                  </div>
                )}

                <Popover
                  open={Boolean(inTimeAnchorEl) && isAdmin}
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
                        className="px-6 py-2 bg-gradient-to-r from-booking-primary to-booking-primaryDark text-white text-[10px] font-bold rounded hover:shadow-lg transition-all active:scale-95 uppercase tracking-widest"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </Popover>

                <Popover
                  open={Boolean(outTimeAnchorEl) && isAdmin}
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
                        className="px-6 py-2 bg-gradient-to-r from-booking-primary to-booking-primaryDark text-white text-[10px] font-bold rounded hover:shadow-lg transition-all active:scale-95 uppercase tracking-widest"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </Popover>

                <Popover
                  open={Boolean(calendarAnchorEl)}
                  anchorEl={calendarAnchorEl}
                  onClose={closeCalendarPopover}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  PaperProps={{
                    sx: {
                      borderRadius: "8px",
                      mt: 1,
                      boxShadow: "0 20px 50px rgba(75,107,83,0.16)",
                      border: "1px solid #EEE9DC",
                      overflow: "hidden",
                      width: {
                        xs: "calc(100vw - 24px)",
                        sm: "380px",
                        md: "700px",
                      },
                      maxWidth: "calc(100vw - 24px)",
                    },
                  }}
                >
                  <div
                    className="bg-white flex flex-col"
                    style={{ maxHeight: "80dvh" }}
                  >
                    <div className="flex items-center justify-center gap-6 py-3 border-b border-[#EEE9DC] bg-[#FBF8F2] flex-shrink-0">
                      <button
                        onClick={() => setActiveTab("calendar")}
                        className={`pb-1 px-3 font-bold text-xs transition-all relative ${activeTab === "calendar" ? "text-booking-primary" : "text-gray-400 hover:text-gray-600"}`}
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
                        className={`pb-1 px-3 font-bold text-xs transition-all relative ${activeTab === "flexible" ? "text-booking-primary" : "text-gray-400 hover:text-gray-600"}`}
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
                              className="pointer-events-auto p-1.5 hover:bg-booking-primaryLight/50 rounded-full transition-all text-booking-primary bg-white shadow-sm border border-[#EEE9DC]"
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
                              className="pointer-events-auto p-1.5 hover:bg-booking-primaryLight/50 rounded-full transition-all text-booking-primary bg-white shadow-sm border border-[#EEE9DC]"
                            >
                              <ArrowForwardIos sx={{ fontSize: 12 }} />
                            </button>
                          </div>
                          <div className="flex flex-col md:flex-row gap-8 pt-9 md:pt-0">
                            <div className="flex-1 min-w-[280px]">
                              {renderCalendar(calendarViewDate)}
                            </div>
                            <div className="flex-1 min-w-[280px] hidden md:block">
                              {renderCalendar(addMonths(calendarViewDate, 1))}
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-[#EEE9DC] flex flex-wrap items-center gap-x-4 gap-y-1.5">
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-gradient-to-br from-booking-primary to-booking-primaryDark inline-block"></span>
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
                              <span className="w-3 h-3 rounded-full bg-[#F6D8D3] inline-block"></span>
                              <span className="text-[10px] text-[#C97B70]">
                                Booked
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "flexible" && (
                        <div className="space-y-5 animate-in fade-in duration-300 w-full">
                          <div className="space-y-3">
                            <p className="text-[#3F3A32] font-semibold text-sm tracking-tight">
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
                                        : "border-[#EEE9DC] text-booking-primaryDark hover:border-booking-primary/40"
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
                              <p className="text-[#3F3A32] font-semibold text-sm tracking-tight">
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
                                          : "bg-white border-[#EEE9DC] hover:border-booking-primary/40"
                                      }`}
                                    >
                                      <CalendarMonth
                                        sx={{ fontSize: 14 }}
                                        className="text-booking-primary"
                                      />
                                      <div className="text-center leading-none">
                                        <p
                                          className={`text-[9px] pt-1 font-semibold uppercase tracking-tighter ${isSelected ? "text-booking-primary" : "text-[#3F3A32]"}`}
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
                                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1 border border-[#EEE9DC] flex items-center justify-center hover:bg-booking-primaryLight/30 active:scale-90 z-10 transition-colors"
                              >
                                <ArrowBackIos
                                  sx={{ fontSize: 10 }}
                                  className="text-gray-600 ml-0.5"
                                />
                              </button>
                              <button
                                onClick={() => scrollCarousel("next")}
                                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1 border border-[#EEE9DC] flex items-center justify-center hover:bg-booking-primaryLight/30 active:scale-90 z-10 transition-colors"
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

                    <div className="px-4 py-3 border-t border-[#EEE9DC] bg-[#FBF8F2] flex-shrink-0 flex items-center justify-between gap-3">
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
                          onClick={closeCalendarPopover}
                          className="px-4 py-2 bg-white border border-[#EEE9DC] text-booking-primary font-semibold rounded-lg hover:bg-booking-primaryLight/20 transition-all text-xs"
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
                            closeCalendarPopover();
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
                      borderRadius: "16px",
                      mt: 1,
                      p: 2.5,
                      width: { xs: "calc(100vw - 24px)", sm: "300px" },
                      maxWidth: "calc(100vw - 24px)",
                      boxShadow: "0 10px 30px rgba(75,107,83,0.14)",
                      border: "1px solid #EEE9DC",
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
                        subtitleColor: "text-[#9B5E4D]",
                      },
                    ].map(({ label, key, min, subtitle, subtitleColor }) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-[#3F3A32] text-sm">
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
                            className="w-8 h-8 rounded-full border border-[#EEE9DC] flex items-center justify-center hover:bg-booking-primaryLight/20 active:scale-90 transition-all text-ayuBrown disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Remove sx={{ fontSize: 14 }} />
                          </button>
                          <span className="w-4 text-center font-semibold text-sm text-[#3F3A32]">
                            {guests[key]}
                          </span>
                          <button
                            type="button"
                            disabled={(() => {
                              if (label === "Room") return true;
                              const avail =
                                roomStatus?.availableOccupancy ?? null;
                              if (key === "adults") {
                                const maxAdults =
                                  avail !== null && avail < 3 ? avail : 3;
                                if (
                                  guests.adults >= maxAdults ||
                                  (guests.children > 0 && guests.adults >= 2)
                                )
                                  return true;
                              }
                              if (key === "children") {
                                if (avail !== null && avail <= 2) return true;
                                if (guests.children >= 2 || guests.adults >= 3)
                                  return true;
                              }
                              return false;
                            })()}
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
                      <div className="pt-3 border-t border-[#EEE9DC] space-y-3">
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

                    <div className="pt-3 flex justify-end gap-2 border-t border-[#EEE9DC]">
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

            {!formValues?.twinSharing &&
              !isOutdoorLeaving &&
              !isRoomUnavailable && (
                <div className="flex flex-col gap-2 bg-white border border-[#EEE9DC] rounded-2xl p-3">
                  <SectionLabel>Sharing Preference</SectionLabel>
                  <RadioField
                    control={control}
                    name="sharingType"
                    label="Choose Sharing Type"
                    dataArray={[
                      { label: "Own", value: "Own" },
                      { label: "Family", value: "Family" },
                    ]}
                  />
                </div>
              )}

            {!isOutdoorLeaving &&
              !isRoomUnavailable &&
              (formValues?.sharingType === "Family" ||
                formValues?.twinSharing) && (
                <div className="flex flex-col gap-2 bg-white border border-[#EEE9DC] rounded-lg p-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <SectionLabel>
                        Family Members ({familyMembers.length})
                      </SectionLabel>
                      <button
                        type="button"
                        disabled={
                          adultSlotsRemaining <= 0 && childSlotsRemaining <= 0
                        }
                        onClick={handleAddFamilyMember}
                        className="px-3 py-2 bg-booking-primary text-white text-[10px] font-bold rounded hover:bg-booking-primaryDark transition-all disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-widest shrink-0"
                      >
                        + Add Member
                      </button>
                    </div>

                    {familyMemberLimit >= 1 && (
                      <div className="flex flex-col gap-2 mt-1">
                        {(existingAge0to5 > 0 || existingAge6to12 > 0) && (
                          <div className="flex items-start gap-2 rounded-lg border border-[#EBD6A4] bg-[#FBF2E1] px-2.5 py-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5 text-[#a08230] mt-0.5 shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <p className="text-[10px] text-[#8b6914] font-medium leading-relaxed">
                              This room already has{" "}
                              {existingAge0to5 > 0 &&
                                `${existingAge0to5} child${existingAge0to5 > 1 ? "ren" : ""} aged 0–5`}
                              {existingAge0to5 > 0 &&
                                existingAge6to12 > 0 &&
                                " and "}
                              {existingAge6to12 > 0 &&
                                `${existingAge6to12} child${existingAge6to12 > 1 ? "ren" : ""} aged 6–12`}{" "}
                              booked from another reservation, reducing the
                              child slots available for this booking.
                            </p>
                          </div>
                        )}
                        {totalAdults + total6to12 >
                          cachedAvailableOccupancy && (
                          <div className="flex items-start gap-2 rounded-lg border border-[#F1C6BE] bg-[#FBEAE7] px-2.5 py-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5 text-[#C97B70] mt-0.5 shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                            <p className="text-[10px] text-[#B15B4F] font-medium">
                              Occupancy full! Maximum {cachedAvailableOccupancy}{" "}
                              beds allowed. Any additional child must be aged
                              &le; 5.
                            </p>
                          </div>
                        )}
                        <div className="flex items-start gap-2 rounded-lg border border-[#EBD6A4] bg-[#FBF2E1] px-2.5 py-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 text-[#a08230] mt-0.5 shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-[10px] text-[#8b6914] font-medium leading-relaxed">
                            <strong>3rd person charge is age-based:</strong> Age
                            13+ &rarr; 75% extra bed &bull; Age 6&ndash;12
                            &rarr;{" "}
                            {ageDetailsConfig.find((c) => c.ageGroup === "6-12")
                              ?.percentage || 50}
                            % surcharge &bull;{" "}
                            <span className="text-booking-primaryDark font-semibold">
                              Age 0&ndash;5 &rarr; Free
                            </span>
                          </p>
                        </div>
                      </div>
                    )}

                    {familyMembers.length > 0 && (
                      <div className="overflow-auto max-h-64 border border-[#EEE9DC] rounded-xl">
                        <table className="w-full min-w-[560px] border-collapse text-[11px]">
                          <thead className="sticky top-0 z-10">
                            <tr className="bg-[#FBF8F2]">
                              <th className="border border-[#EEE9DC] px-2 py-1.5 text-left font-bold text-booking-primary uppercase tracking-wider text-[9px] bg-[#FBF8F2]">
                                First Name
                              </th>
                              <th className="border border-[#EEE9DC] px-2 py-1.5 text-left font-bold text-booking-primary uppercase tracking-wider text-[9px] bg-[#FBF8F2]">
                                Last Name
                              </th>
                              <th className="border border-[#EEE9DC] px-2 py-1.5 text-left font-bold text-booking-primary uppercase tracking-wider text-[9px] bg-[#FBF8F2] w-16">
                                Age
                              </th>
                              <th className="border border-[#EEE9DC] px-2 py-1.5 text-left font-bold text-booking-primary uppercase tracking-wider text-[9px] bg-[#FBF8F2] w-24">
                                Gender
                              </th>
                              <th className="border border-[#EEE9DC] px-2 py-1.5 text-center font-bold text-booking-primary uppercase tracking-wider text-[9px] bg-[#FBF8F2] w-16">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {familyMembers.map((member, index) => {
                              const isDuplicate =
                                familyMemberDuplicateIndexes.has(index);
                              const isInvalidAdult =
                                familyAdultInvalidIndexes.has(index);
                              return (
                                <>
                                  <tr key={index}>
                                    <td className="border border-[#EEE9DC] px-1.5 py-1 align-top">
                                      <input
                                        type="text"
                                        value={member.firstName}
                                        onChange={(e) =>
                                          handleFamilyMemberChange(
                                            index,
                                            "firstName",
                                            e.target.value,
                                          )
                                        }
                                        placeholder="First Name"
                                        className={`w-full px-1.5 py-1 border rounded text-[11px] focus:outline-none ${
                                          isDuplicate || isInvalidAdult
                                            ? "border-[#E27B6A] focus:border-[#C7503E]"
                                            : "border-[#EEE9DC] focus:border-booking-primary"
                                        }`}
                                      />
                                    </td>
                                    <td className="border border-[#EEE9DC] px-1.5 py-1 align-top">
                                      <input
                                        type="text"
                                        value={member.lastName}
                                        onChange={(e) =>
                                          handleFamilyMemberChange(
                                            index,
                                            "lastName",
                                            e.target.value,
                                          )
                                        }
                                        placeholder="Last Name"
                                        className={`w-full px-1.5 py-1 border rounded text-[11px] focus:outline-none ${
                                          isDuplicate || isInvalidAdult
                                            ? "border-[#E27B6A] focus:border-[#C7503E]"
                                            : "border-[#EEE9DC] focus:border-booking-primary"
                                        }`}
                                      />
                                    </td>
                                    <td className="border border-[#EEE9DC] px-1.5 py-1 align-top">
                                      <input
                                        type="number"
                                        min={0}
                                        max={120}
                                        value={member.age}
                                        onChange={(e) =>
                                          handleFamilyMemberChange(
                                            index,
                                            "age",
                                            e.target.value,
                                          )
                                        }
                                        placeholder="Age"
                                        className={`w-full px-1.5 py-1 border rounded text-[11px] focus:outline-none ${
                                          isInvalidAdult
                                            ? "border-[#E27B6A] focus:border-[#C7503E]"
                                            : "border-[#EEE9DC] focus:border-booking-primary"
                                        }`}
                                      />
                                    </td>
                                    <td className="border border-[#EEE9DC] px-1.5 py-1 align-top">
                                      <select
                                        value={member.gender}
                                        onChange={(e) =>
                                          handleFamilyMemberChange(
                                            index,
                                            "gender",
                                            e.target.value,
                                          )
                                        }
                                        className="w-full px-1.5 py-1 border border-[#EEE9DC] rounded text-[11px] focus:outline-none focus:border-booking-primary bg-white"
                                      >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                      </select>
                                    </td>
                                    <td className="border border-[#EEE9DC] px-1.5 py-1 text-center align-top">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveFamilyMember(index)
                                        }
                                        className="w-6 h-6 rounded-full border border-[#E27B6A] text-[#C7503E] flex items-center justify-center hover:bg-[#FBEAE7] active:scale-90 transition-all mx-auto"
                                      >
                                        <Delete sx={{ fontSize: 12 }} />
                                      </button>
                                    </td>
                                  </tr>
                                  {isDuplicate && (
                                    <tr key={`${index}-error`}>
                                      <td
                                        colSpan={5}
                                        className="border border-[#EEE9DC] px-2 py-1 bg-[#FBEAE7] text-[#C7503E] text-[10px] font-semibold"
                                      >
                                        This member has the same first and last
                                        name as another member.
                                      </td>
                                    </tr>
                                  )}
                                  {isInvalidAdult && (
                                    <tr key={`${index}-adult-error`}>
                                      <td
                                        colSpan={5}
                                        className="border border-[#EEE9DC] px-2 py-1 bg-[#FBEAE7] text-[#C7503E] text-[10px] font-semibold"
                                      >
                                        {twinMaxExtraAdults === 1
                                          ? "Only 1 extra adult is allowed for Twin Sharing at this occupancy."
                                          : "Only the primary guest can be an adult for Twin Sharing at this occupancy."}{" "}
                                        This member must be a child (0–5 or 6–12
                                        yrs).
                                      </td>
                                    </tr>
                                  )}
                                </>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

            {isOutdoorLeaving && !isRoomUnavailable && (
              <div className="flex flex-col gap-2 bg-white border border-[#EEE9DC] rounded-lg p-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <SectionLabel>
                    Members ({outdoorMembers.length}/{outdoorMemberLimit})
                  </SectionLabel>
                  <button
                    type="button"
                    disabled={outdoorMembers.length >= outdoorMemberLimit}
                    onClick={handleAddOutdoorMember}
                    className="px-3 py-1.5 bg-booking-primary text-white text-[10px] font-bold rounded hover:bg-booking-primaryDark transition-all disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-widest shrink-0"
                  >
                    + Add Member
                  </button>
                </div>

                {outdoorMembers.length > 0 && (
                  <div className="overflow-auto max-h-64 border border-[#EEE9DC] rounded-xl">
                    <table className="w-full min-w-[560px] border-collapse text-[11px]">
                      <thead className="sticky top-0 z-10">
                        <tr className="bg-[#FBF8F2]">
                          <th className="border border-[#EEE9DC] px-2 py-1.5 text-left font-bold text-booking-primary uppercase tracking-wider text-[9px] bg-[#FBF8F2]">
                            First Name
                          </th>
                          <th className="border border-[#EEE9DC] px-2 py-1.5 text-left font-bold text-booking-primary uppercase tracking-wider text-[9px] bg-[#FBF8F2]">
                            Last Name
                          </th>
                          <th className="border border-[#EEE9DC] px-2 py-1.5 text-left font-bold text-booking-primary uppercase tracking-wider text-[9px] bg-[#FBF8F2] w-16">
                            Age
                          </th>
                          <th className="border border-[#EEE9DC] px-2 py-1.5 text-left font-bold text-booking-primary uppercase tracking-wider text-[9px] bg-[#FBF8F2] w-24">
                            Gender
                          </th>
                          <th className="border border-[#EEE9DC] px-2 py-1.5 text-center font-bold text-booking-primary uppercase tracking-wider text-[9px] bg-[#FBF8F2] w-16">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {outdoorMembers.map((member, index) => {
                          const isDuplicate =
                            outdoorMemberDuplicateIndexes.has(index);
                          return (
                            <>
                              <tr key={index}>
                                <td className="border border-[#EEE9DC] px-1.5 py-1 align-top">
                                  <input
                                    type="text"
                                    value={member.firstName}
                                    onChange={(e) =>
                                      handleOutdoorMemberChange(
                                        index,
                                        "firstName",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="First Name"
                                    className={`w-full px-1.5 py-1 border rounded text-[11px] focus:outline-none ${
                                      isDuplicate
                                        ? "border-[#E27B6A] focus:border-[#C7503E]"
                                        : "border-[#EEE9DC] focus:border-booking-primary"
                                    }`}
                                  />
                                </td>
                                <td className="border border-[#EEE9DC] px-1.5 py-1 align-top">
                                  <input
                                    type="text"
                                    value={member.lastName}
                                    onChange={(e) =>
                                      handleOutdoorMemberChange(
                                        index,
                                        "lastName",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Last Name"
                                    className={`w-full px-1.5 py-1 border rounded text-[11px] focus:outline-none ${
                                      isDuplicate
                                        ? "border-[#E27B6A] focus:border-[#C7503E]"
                                        : "border-[#EEE9DC] focus:border-booking-primary"
                                    }`}
                                  />
                                </td>
                                <td className="border border-[#EEE9DC] px-1.5 py-1 align-top">
                                  <input
                                    type="number"
                                    min={0}
                                    max={120}
                                    value={member.age}
                                    onChange={(e) =>
                                      handleOutdoorMemberChange(
                                        index,
                                        "age",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Age"
                                    className="w-full px-1.5 py-1 border border-[#EEE9DC] rounded text-[11px] focus:outline-none focus:border-booking-primary"
                                  />
                                </td>
                                <td className="border border-[#EEE9DC] px-1.5 py-1 align-top">
                                  <select
                                    value={member.gender}
                                    onChange={(e) =>
                                      handleOutdoorMemberChange(
                                        index,
                                        "gender",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-1.5 py-1 border border-[#EEE9DC] rounded text-[11px] focus:outline-none focus:border-booking-primary bg-white"
                                  >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                  </select>
                                </td>
                                <td className="border border-[#EEE9DC] px-1.5 py-1 text-center align-top">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleRemoveOutdoorMember(index)
                                    }
                                    className="w-5 h-5 rounded-full border border-[#E27B6A] text-[#C7503E] hover:bg-[#FBEAE7] transition-all inline-flex items-center justify-center active:scale-95 mx-auto"
                                  >
                                    <Remove sx={{ fontSize: 14 }} />
                                  </button>
                                </td>
                              </tr>
                              {isDuplicate && (
                                <tr key={`${index}-error`}>
                                  <td
                                    colSpan={5}
                                    className="border border-[#EEE9DC] px-2 py-1 bg-[#FBEAE7] text-[#C7503E] text-[10px] font-semibold"
                                  >
                                    This member has the same first and last name
                                    as another member.
                                  </td>
                                </tr>
                              )}
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-3.5 border border-[#EEE9DC] shadow-[0_10px_40px_rgba(75,107,83,0.06)] flex flex-col gap-3.5"
            >
              <div className="flex items-center gap-2 border-b border-booking-primary/10 pb-2.5">
                <div className="w-7 h-7 rounded-full bg-booking-primaryLight/60 flex items-center justify-center shrink-0">
                  <img
                    src={ReservationIcon}
                    className="w-7 h-7 text-booking-primaryDark"
                  />
                </div>
                <h2 className="text-base sm:text-lg font-serif text-booking-primary font-bold">
                  Reservation Summary
                </h2>
              </div>

              <div className="bg-booking-primaryLight/60 p-3 rounded-xl flex items-center gap-3 border border-booking-primary/10">
                <BedIcon
                  className="text-booking-primary flex-shrink-0"
                  sx={{ fontSize: 20 }}
                />
                <span className="text-booking-primaryDark font-semibold text-sm tracking-tight line-clamp-2">
                  {selectedService
                    ? selectedService.serviceName.split("|")[1] ||
                      selectedService.serviceName
                    : "Select your stay"}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <SectionLabel>Guest Information</SectionLabel>
                  <CommonButton
                    type="button"
                    onClick={() => setOpenAddPatient(true)}
                    label="+ Add Guest"
                    className="bg-booking-primary text-white hover:bg-booking-primaryDark transition-all shadow-sm shrink-0"
                  />
                </div>
                <div className="mt-1">
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
                    <div className="flex items-start gap-2 rounded-xl border border-[#EBD6A4] bg-[#FBF2E1] p-2.5">
                      <div className="mt-0.5 text-[#a08230]">
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
                        <h4 className="font-semibold text-[11px] text-[#8b6914]">
                          Gender Restriction
                        </h4>
                        <p className="mt-0.5 text-[10px] text-[#8b6914]">
                          {genderCriteria}
                        </p>
                      </div>
                    </div>
                  )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
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
                  {!isOutdoorLeaving && (
                    <InputField
                      control={control}
                      name="noOfAdults"
                      label="Adults (Max 3)"
                      variant="outlined"
                      type="number"
                      inputProps={{ min: 1, max: 3 }}
                      disabled={true}
                    />
                  )}
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

                  <div className="flex-1 min-w-0">
                    <p className="mb-1 text-[9px] uppercase tracking-[.28em] text-[#a08230]">
                      Meal Preference
                    </p>

                    <p className="mb-2 text-[13px] font-light leading-[1.65] text-[#7a6e62]">
                      Two Curated Sunrise–Sunset Ayurveda Routine, Veg Wholesome
                      Meals, and Herbal Gud Green Tea crafted for a relaxing and
                      Natural Healing.
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

              <div className="pt-2 border-t border-booking-primary/10 flex flex-col gap-1.5">
                {breakdownItems.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center gap-2"
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

              <div className="flex items-center justify-between gap-4 pt-2.5 border-t border-dashed border-booking-primary/20">
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
                <div className="flex justify-end space-x-2">
                  <CommonButton
                    type="button"
                    label="Reset"
                    className="border border-[#E27B6A] text-[#C7503E] bg-[#FBEAE7]"
                    onClick={reset}
                  />
                  <CommonButton
                    label={"Book Now"}
                    onClick={handleConfirmBooking}
                    disabled={isRoomUnavailable}
                    className={`w-full text-sm transition-all active:scale-[0.98] tracking-widest ${
                      isRoomUnavailable
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-booking-primary to-booking-primaryDark text-white shadow-lg shadow-booking-primary/10"
                    }`}
                  />
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-2">
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
                  className="bg-booking-primaryLight/30 py-2.5 px-2 rounded-xl flex flex-col items-center justify-center text-center gap-1 border border-booking-primary/10 shadow-sm hover:bg-booking-primaryLight/50 transition-all"
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
            bgcolor: "#FBF8F2",
            borderRadius: 3,
            boxShadow: 24,
            p: 3,
            border: "1px solid #E7E1D3",
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
                if (!tempTermsAccepted) return;
                setOpenTermsModal(false);
                initiateBookingPayment();
              }}
              disabled={!tempTermsAccepted}
              className="bg-booking-primary text-white"
            />
          </Box>
        </Box>
      </Modal>

      <BookingPreviewModal
        open={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        onConfirm={() => {
          setOpenPreviewModal(false);
          setOpenTermsModal(true);
        }}
        selectedService={selectedService}
        checkIn={checkIn}
        checkOut={checkOut}
        checkInTime={checkInTime}
        checkOutTime={checkOutTime}
        formValues={formValues}
        familyMembers={familyMembers}
        outdoorMembers={outdoorMembers}
        isOutdoorLeaving={isOutdoorLeaving}
        breakdownItems={breakdownItems}
        costs={costs}
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
