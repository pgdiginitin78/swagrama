import { yupResolver } from "@hookform/resolvers/yup";
import {
  AccessTime,
  CheckCircleOutline,
  ChevronLeft,
  ChevronRight,
  ErrorOutline,
  EventAvailable,
  InfoOutlined,
  MeetingRoom,
  PersonOutline,
} from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isBefore,
  isSameDay,
  parse,
  startOfMonth,
  startOfToday,
  subMonths,
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import SummaryIcon from "../../../../assets/SummaryIcon.svg";
import { useAuth } from "../../../../context/AuthContext";
import {
  getPatientDataByMobileNo,
  InitiatePayment,
} from "../../../../services/bookAppointment/BookAppointmentServices";
import {
  BookDetoxTherapy,
  TherapySlots,
} from "../../../../services/healingServices/detoxTherapyServices/DetoxTherapyServices";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import { useLoader } from "../../../common/commonLoader/LoaderContext";
import ConfirmationModal from "../../../common/ConfirmationModal";
import DropdownField from "../../../common/formFields/DropdownField";
import { ModalStyle } from "../../../common/modalStyle/ModalStyle";
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

export default function BookTherapySession({ open, onClose, item }) {
  const backdropRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const selectedDateRef = useRef(null);
  const prevFreqRef = useRef(null);
  const [sessionsCount, setSessionsCount] = useState(1);
  const [daysCount, setDaysCount] = useState(1);
  const [frequency, setFrequency] = useState(1);
  const [isCustomFrequency, setIsCustomFrequency] = useState(false);
  const [days, setDays] = useState([
    { date: startOfToday(), requiredSessions: 1, selectedSlots: [] },
  ]);
  const [activePickerIndex, setActivePickerIndex] = useState(0);
  const [calendarBaseDate, setCalendarBaseDate] = useState(startOfToday());
  const [suggestedDate, setSuggestedDate] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [genderPreference, setGenderPreference] = useState("No Preference");
  const [patientOptions, setPatientOptions] = useState([]);
  const [rawTherapySlots, setRawTherapySlots] = useState([]);
  const [therapySlots, setTherapySlots] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [isSlotsLoading, setIsSlotsLoading] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const [finalSaveObj, setFinalSaveObj] = useState(null);
  const [openAddPatient, setOpenAddPatient] = useState(false);

  const cancelPaymentRef = useRef(null);
  const { user } = useAuth();
  const { setIsLoading } = useLoader();

  const schema = yup.object().shape({
    selectGuest: yup
      .object()
      .shape({
        id: yup.mixed().required(),
        label: yup.string().required(),
      })
      .nullable()
      .required("Please select a guest"),
  });

  const { control, watch, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { selectGuest: null },
    mode: "onChange",
  });

  const selectedGuest = watch("selectGuest");

  useEffect(() => {
    if (!selectedGuest) return;
    setDays((prevDays) => {
      let hasChanges = false;
      const nextDays = prevDays.map((day) => {
        const validSlots = day.selectedSlots.filter((slot) =>
          isTherapySlotSelectable(slot, selectedGuest),
        );
        if (validSlots.length !== day.selectedSlots.length) {
          hasChanges = true;
          return { ...day, selectedSlots: validSlots };
        }
        return day;
      });
      if (hasChanges) {
        errorAlert(
          "Some selected slots were removed because their assigned room does not allow the chosen guest's gender.",
        );
      }
      return hasChanges ? nextDays : prevDays;
    });
  }, [selectedGuest]);

  const isTherapySlotSelectable = (slot, guest) => {
    if (!slot) return false;
    if (!guest || !guest.gender) return true;

    if (slot.status && String(slot.status).toLowerCase() !== "available")
      return false;

    const maxBookings =
      typeof slot.maxBookings === "number" ? slot.maxBookings : 1;
    const currentBookingCount =
      typeof slot.bookingCount === "number" ? slot.bookingCount : 0;
    if (currentBookingCount >= maxBookings) return false;

    const g = String(guest.gender).toLowerCase().trim();
    const guestGender = g.startsWith("f")
      ? "female"
      : g.startsWith("m")
        ? "male"
        : g;
    const genderMsg = String(slot.genderMessage || "").toLowerCase();

    if (!genderMsg || genderMsg.includes("both")) return true;

    const words = genderMsg.split(/[^a-z]+/);
    if (words.includes(guestGender)) return true;

    return false;
  };

  const getSlotGenderValidation = (slot, guest, therapyName) => {
    if (!slot) return null;
    const roomId =
      slot.serviceRoomID ||
      item?.serviceRoomId ||
      item?.serviceRoomID ||
      "N/A";
    const genderMsg = slot.genderMessage || "Available for both Gender";
    const serviceTitle = therapyName || item?.serviceName || "this therapy";

    if (!guest || !guest.gender) {
      return {
        status: "info",
        isValid: true,
        roomId,
        genderMsg,
        title: `Room ${roomId} • Allowed: ${genderMsg}`,
        message: `Room ${roomId} allows "${genderMsg}" for ${serviceTitle}. Select a guest to validate room eligibility.`,
        boxClass: "bg-[#f0f7f4] border-[#c2ddcf] text-ayuTulsi",
        badgeClass: "bg-[#d4e8c2] text-ayuTulsi border-ayuMid/30",
        iconType: "info",
      };
    }

    const g = String(guest.gender).toLowerCase().trim();
    const guestGender = g.startsWith("f")
      ? "Female"
      : g.startsWith("m")
        ? "Male"
        : String(guest.gender).charAt(0).toUpperCase() +
          String(guest.gender).slice(1);
    const isAllowed = isTherapySlotSelectable(slot, guest);

    if (isAllowed) {
      return {
        status: "success",
        isValid: true,
        roomId,
        genderMsg,
        guestGender,
        title: `Room ${roomId} Approved`,
        message: `Room ${roomId} allows "${genderMsg}" for ${serviceTitle}. Guest ${guest.label || "Selected Guest"} (${guestGender}) is eligible for this room.`,
        boxClass: "bg-emerald-50 border-emerald-200 text-emerald-800",
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
        iconType: "success",
      };
    } else {
      return {
        status: "error",
        isValid: false,
        roomId,
        genderMsg,
        guestGender,
        title: `Room ${roomId} Restriction`,
        message: `Room ${roomId} allows "${genderMsg}" for ${serviceTitle}. Guest ${guest.label || "Selected Guest"} (${guestGender}) is not permitted in this room.`,
        boxClass: "bg-rose-50 border-rose-200 text-rose-800",
        badgeClass: "bg-rose-100 text-rose-800 border-rose-300",
        iconType: "error",
      };
    }
  };

  const durationNum = parseInt(item?.duration) || 30;
  const slotsNeeded = Math.max(1, Math.ceil(durationNum / 30));

  const getTargetSessionsForDay = (dayIdx, totalSessions, totalDays) => {
    if (totalDays <= 1) return Math.max(1, totalSessions);
    const base = Math.floor(totalSessions / totalDays);
    const remainder = totalSessions % totalDays;
    return Math.max(1, base + (dayIdx < remainder ? 1 : 0));
  };

  useEffect(() => {
    if (sessionsCount > 0 && daysCount > 0) {
      setDays((prev) => {
        const next = [...prev];
        for (let i = 0; i < next.length; i++) {
          if (!next[i].id) {
            next[i] = { ...next[i], id: `day-${i}` };
          }
        }
        const baseDate = next[0]?.date || startOfToday();

        if (next.length === 0) {
          next.push({ id: `day-0`, date: baseDate, selectedSlots: [] });
        }

        while (next.length < daysCount) {
          next.push({
            id: `day-${next.length}`,
            date: null,
            selectedSlots: [],
          });
        }
        if (next.length > daysCount) {
          next.length = daysCount;
        }

        const isSequential =
          !isCustomFrequency && typeof frequency === "number";
        const step = typeof frequency === "number" ? frequency : 1;

        for (let i = 0; i < next.length; i++) {
          if (i === 0) {
            if (!next[0].date) next[0].date = baseDate;
          } else {
            if (isSequential) {
              const seqDate = addDays(next[0].date, i * step);
              const dateChanged =
                !next[i].date || !isSameDay(next[i].date, seqDate);
              next[i] = {
                ...next[i],
                date: seqDate,
                selectedSlots: dateChanged ? [] : next[i].selectedSlots,
              };
            } else {
              const minD = next[i - 1]?.date || baseDate;
              if (!next[i].date || isBefore(next[i].date, minD)) {
                next[i] = {
                  ...next[i],
                  date: addDays(minD, 1),
                  selectedSlots: [],
                };
              }
            }
          }
        }

        return next;
      });

      if (activePickerIndex !== null && activePickerIndex >= daysCount) {
        setActivePickerIndex(daysCount - 1);
      }
    } else {
      setDays([]);
      setActivePickerIndex(null);
    }
  }, [sessionsCount, daysCount, frequency, isCustomFrequency]);

  const handleGetPatientData = () => {
    if (user !== null) {
      getPatientDataByMobileNo(user?.mobileNo, user.userId, "IPD", 5)
        .then((res) => {
          const data = res?.data?.data;
          if (data?.length) {
            setPatientOptions(
              data.map((d) => ({
                ...d,
                id: d.patientId,
                value: d.patientId,
                label: `${d.firstName} ${d.lastName}`,
              })),
            );
          }
        })
        .catch((err) => err);
    }
  };

  useEffect(() => {
    handleGetPatientData();
  }, [user]);

  const [exploringDate, setExploringDate] = useState(null);

  useEffect(() => {
    if (activePickerIndex !== null) {
      const activeSession = days[activePickerIndex];
      let initialDate = activeSession?.date || null;

      if (
        !isCustomFrequency &&
        typeof frequency === "number" &&
        activePickerIndex > 0
      ) {
        const baseDate = days[0]?.date || startOfToday();
        initialDate = addDays(baseDate, activePickerIndex * frequency);
      }

      setExploringDate(initialDate);

      if (!initialDate && activePickerIndex > 0) {
        const prevDate = days[activePickerIndex - 1]?.date;
        if (prevDate) {
          const step =
            !isCustomFrequency && typeof frequency === "number" ? frequency : 1;
          const suggested = addDays(prevDate, step);
          setSuggestedDate(suggested);
          setCalendarBaseDate(startOfMonth(suggested));
        } else {
          setSuggestedDate(null);
        }
      } else {
        setSuggestedDate(null);
        if (initialDate) {
          setCalendarBaseDate(startOfMonth(initialDate));
        }
      }

      const timer = setTimeout(() => {
        if (selectedDateRef.current) {
          selectedDateRef.current.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setExploringDate(null);
      setSuggestedDate(null);
    }
  }, [activePickerIndex, frequency, isCustomFrequency]);

  const activeExplorerDate =
    exploringDate ||
    (activePickerIndex !== null && days?.[activePickerIndex]?.date
      ? days[activePickerIndex].date
      : null);

  const activeDate = activeExplorerDate
    ? format(activeExplorerDate, "yyyy-MM-dd")
    : null;

  useEffect(() => {
    if (!open || !item?.serviceId || !activeDate) {
      setRawTherapySlots([]);
      setTherapySlots([]);
      return;
    }

    setIsSlotsLoading(true);

    TherapySlots(item.serviceId, activeDate)
      .then((res) => {
        console.log("therapy slots", res?.data?.data);
        const data = Array.isArray(res?.data?.data) ? res?.data?.data : [];
        setRawTherapySlots(data);
      })
      .catch((error) => {
        console.error("therapy slots error", error);
        setRawTherapySlots([]);
        setTherapySlots([]);
      })
      .finally(() => setIsSlotsLoading(false));
  }, [open, item?.serviceId, activeDate]);

  const availableRooms = useMemo(() => {
    const map = new Map();
    rawTherapySlots.forEach((s) => {
      const rId =
        s.serviceRoomID ||
        item?.serviceRoomId ||
        item?.serviceRoomID;
      if (rId && !map.has(rId)) {
        map.set(rId, {
          serviceRoomID: rId,
          genderMessage: s.genderMessage || "Available for both Gender",
        });
      }
    });
    return Array.from(map.values());
  }, [rawTherapySlots, item]);

  const activeRoomId = useMemo(() => {
    const currentDaySelectedRoom =
      activePickerIndex !== null
        ? days[activePickerIndex]?.selectedSlots?.[0]?.serviceRoomID
        : null;
    if (currentDaySelectedRoom) {
      return currentDaySelectedRoom;
    }
    if (
      selectedRoomId &&
      availableRooms.some((r) => r.serviceRoomID === selectedRoomId)
    ) {
      return selectedRoomId;
    }
    if (selectedGuest?.gender && availableRooms.length > 0) {
      const compatibleRoom = availableRooms.find((r) =>
        isTherapySlotSelectable(r, selectedGuest),
      );
      if (compatibleRoom) return compatibleRoom.serviceRoomID;
    }
    return availableRooms[0]?.serviceRoomID || null;
  }, [activePickerIndex, days, selectedRoomId, availableRooms, selectedGuest]);

  useEffect(() => {
    if (!rawTherapySlots.length) {
      setTherapySlots([]);
      return;
    }

    let filtered = rawTherapySlots;
    if (activeRoomId) {
      filtered = rawTherapySlots.filter(
        (s) =>
          (s.serviceRoomID || item?.serviceRoomId || item?.serviceRoomID) ===
          activeRoomId,
      );
    }

    const uniqueMap = new Map();
    filtered.forEach((s) => {
      if (s?.startTime && !uniqueMap.has(s.startTime)) {
        uniqueMap.set(s.startTime, s);
      }
    });

    const sorted = Array.from(uniqueMap.values()).sort((a, b) =>
      (a.startTime || "").localeCompare(b.startTime || ""),
    );

    setTherapySlots(sorted);
  }, [rawTherapySlots, activeRoomId, item]);

  if (!open || !item) return null;

  const priceParsed =
    parseInt(String(item?.charges || "0").replace(/[^0-9]/g, "")) || 0;
  const subTotal = priceParsed * sessionsCount;
  const taxes = Math.round(subTotal * 0);
  const total = subTotal + taxes;
  const shortServiceName =
    item?.serviceName?.split(" ").slice(0, 3).join(" ") || "Therapy";

  const visibleDates = eachDayOfInterval({
    start: startOfMonth(calendarBaseDate),
    end: endOfMonth(calendarBaseDate),
  });

  const handleSessionChange = (val) => {
    if (val === "" || val === null) {
      setSessionsCount(0);
      return;
    }
    const n = Math.max(1, Math.min(20, parseInt(val) || 1));
    setSessionsCount(n);
    if (daysCount > n) {
      setDaysCount(n);
    }
  };

  const handleDaysChange = (val) => {
    if (val === "" || val === null) {
      setDaysCount(0);
      return;
    }
    const n = Math.max(1, Math.min(20, parseInt(val) || 1));
    setDaysCount(n);
    if (sessionsCount < n) {
      setSessionsCount(n);
    }
    if (n > 1) {
      if (
        !isCustomFrequency &&
        (frequency === null || frequency === undefined)
      ) {
        setFrequency(1);
      }
    } else {
      setFrequency(1);
      setIsCustomFrequency(false);
    }
  };

  const nextMonth = () => setCalendarBaseDate(addMonths(calendarBaseDate, 1));
  const prevMonth = () => {
    const minMonth =
      activePickerIndex !== null &&
      activePickerIndex > 0 &&
      days[activePickerIndex - 1]?.date
        ? days[activePickerIndex - 1].date
        : startOfToday();
    const prev = subMonths(calendarBaseDate, 1);
    if (!isBefore(endOfMonth(prev), minMonth)) setCalendarBaseDate(prev);
  };

  const handleDateSelect = (date, idx) => {
    setSuggestedDate(null);
    setExploringDate(date);

    setDays((prev) => {
      const next = [...prev];
      if (!next[idx]) return prev;

      const dateChanged = !next[idx].date || !isSameDay(next[idx].date, date);
      next[idx] = {
        ...next[idx],
        date: date,
        selectedSlots: dateChanged ? [] : next[idx].selectedSlots,
      };

      const isSequential = !isCustomFrequency && typeof frequency === "number";
      const step = typeof frequency === "number" ? frequency : 1;

      if (idx === 0 && isSequential) {
        for (let j = 1; j < next.length; j++) {
          const cascadedDate = addDays(date, j * step);
          const cascadedChanged =
            !next[j].date || !isSameDay(next[j].date, cascadedDate);
          next[j] = {
            ...next[j],
            date: cascadedDate,
            selectedSlots: cascadedChanged ? [] : next[j].selectedSlots,
          };
        }
      }

      return next;
    });
  };

  const isSingleSlotSelectable = (slot, dayIdx, targetDateOverride) => {
    if (!slot) return false;
    const currentTargetDate =
      targetDateOverride ||
      (activePickerIndex === dayIdx && exploringDate) ||
      days[dayIdx]?.date;

    const currentSessionDateStr = currentTargetDate
      ? format(currentTargetDate, "yyyy-MM-dd")
      : activeDate;

    const currentDayId = days[dayIdx]?.id || `day-${dayIdx}`;

    const isAlreadySelectedByOtherSession = days.some((d, dIdx) => {
      const dId = d.id || `day-${dIdx}`;
      if (dId === currentDayId) return false;
      if (!d.date) return false;
      return (
        format(d.date, "yyyy-MM-dd") === currentSessionDateStr &&
        d.selectedSlots.some(
          (s) =>
            s.startTime === slot.startTime &&
            (s.serviceRoomID && slot.serviceRoomID
              ? s.serviceRoomID === slot.serviceRoomID
              : true),
        )
      );
    });

    let isPastTime = false;
    if (
      currentTargetDate &&
      isSameDay(currentTargetDate, startOfToday()) &&
      slot.startTime
    ) {
      try {
        const [h, m] = slot.startTime.split(":");
        const slotDate = new Date();
        slotDate.setHours(parseInt(h, 10) || 0, parseInt(m, 10) || 0, 0, 0);
        if (slotDate < new Date()) {
          isPastTime = true;
        }
      } catch (e) {
        isPastTime = false;
      }
    }

    const isValidForGuest = isTherapySlotSelectable(slot, selectedGuest);

    return isValidForGuest && !isPastTime && !isAlreadySelectedByOtherSession;
  };

  const getConsecutiveSlotGroup = (
    startSlot,
    requiredCount,
    availableSlots,
    dayIdx,
    targetDate,
  ) => {
    if (!startSlot || requiredCount <= 1) {
      const isSingleOk = isSingleSlotSelectable(startSlot, dayIdx, targetDate);
      if (!isSingleOk) {
        return {
          valid: false,
          reason: `The slot at ${formatTime(startSlot?.startTime)} is not available for selection.`,
          slots: [],
        };
      }
      return { valid: true, slots: [startSlot] };
    }

    const startIdx = availableSlots.findIndex(
      (s) =>
        s.startTime === startSlot.startTime &&
        (s.serviceRoomID && startSlot.serviceRoomID
          ? s.serviceRoomID === startSlot.serviceRoomID
          : true),
    );

    if (startIdx < 0) {
      return {
        valid: false,
        reason: `Selected slot at ${formatTime(startSlot.startTime)} was not found.`,
        slots: [],
      };
    }

    if (startIdx + requiredCount > availableSlots.length) {
      return {
        valid: false,
        reason: `The ${durationNum}-minute therapy requires ${requiredCount} consecutive available slots starting at ${formatTime(startSlot.startTime)}, but there are not enough remaining slots in the schedule.`,
        slots: [],
      };
    }

    const group = availableSlots.slice(startIdx, startIdx + requiredCount);

    for (let k = 0; k < group.length - 1; k++) {
      const currentEnd = group[k].endTime;
      const nextStart = group[k + 1].startTime;
      if (currentEnd && nextStart && currentEnd !== nextStart) {
        return {
          valid: false,
          reason: `The ${durationNum}-minute therapy requires ${requiredCount} continuous consecutive slots starting at ${formatTime(startSlot.startTime)}, but the slots are not continuous.`,
          slots: [],
        };
      }
    }

    for (const s of group) {
      if (
        startSlot.serviceRoomID &&
        s.serviceRoomID &&
        s.serviceRoomID !== startSlot.serviceRoomID
      ) {
        return {
          valid: false,
          reason: `All consecutive slots for the therapy session must be in the same room (Room ${startSlot.serviceRoomID}).`,
          slots: [],
        };
      }
      if (!isSingleSlotSelectable(s, dayIdx, targetDate)) {
        return {
          valid: false,
          reason: `The ${durationNum}-minute therapy requires ${requiredCount} consecutive available slots starting at ${formatTime(startSlot.startTime)}, but slot at ${formatTime(s.startTime)} is not available or already booked.`,
          slots: [],
        };
      }
    }

    return { valid: true, slots: group };
  };

  const handleTimeSelect = (slot, dayIdx) => {
    if (!isTherapySlotSelectable(slot, selectedGuest)) {
      const g = String(selectedGuest?.gender || "").trim();
      const guestGender = g.startsWith("f")
        ? "Female"
        : g.startsWith("m")
          ? "Male"
          : g;
      errorAlert(
        `Room ${slot.serviceRoomID || ""} is designated as "${slot.genderMessage || "restricted"}" for ${item?.serviceName || "this therapy"} and cannot be booked for ${selectedGuest?.label || "guest"} (${guestGender}).`,
      );
      return;
    }

    if (slot.serviceRoomID) {
      setSelectedRoomId(slot.serviceRoomID);
    }

    const isSequential = !isCustomFrequency && typeof frequency === "number";
    const step = typeof frequency === "number" ? frequency : 1;

    let targetDate = days[dayIdx]?.date;
    if (dayIdx === 0) {
      targetDate = exploringDate || days[0]?.date || startOfToday();
    } else if (isSequential) {
      const baseDate = days[0]?.date || startOfToday();
      targetDate = addDays(baseDate, dayIdx * step);
    } else {
      targetDate = exploringDate || days[dayIdx]?.date || startOfToday();
    }

    setDays((prev) => {
      const next = [...prev];
      const day = { ...next[dayIdx] };
      const isDateChanging = !day.date || !isSameDay(day.date, targetDate);

      let selectedSlots = isDateChanging ? [] : [...(day.selectedSlots || [])];

      const existingIdx = selectedSlots.findIndex(
        (s) =>
          s.startTime === slot.startTime &&
          (s.serviceRoomID && slot.serviceRoomID
            ? s.serviceRoomID === slot.serviceRoomID
            : true),
      );

      // If clicking already selected slot -> Deselect it
      if (existingIdx >= 0 && !isDateChanging) {
        if (slotsNeeded > 1) {
          const blockStartIdx =
            Math.floor(existingIdx / slotsNeeded) * slotsNeeded;
          selectedSlots.splice(blockStartIdx, slotsNeeded);
        } else {
          selectedSlots.splice(existingIdx, 1);
        }
      } else {
        // Clicking new slot
        const checkResult = getConsecutiveSlotGroup(
          slot,
          slotsNeeded,
          therapySlots,
          dayIdx,
          targetDate,
        );

        if (!checkResult.valid) {
          errorAlert(checkResult.reason);
          return prev;
        }

        const maxDaySessions = getTargetSessionsForDay(
          dayIdx,
          sessionsCount,
          daysCount,
        );
        const currentDaySessions = Math.floor(
          selectedSlots.length / slotsNeeded,
        );

        // If this day already reached its session quota, CHANGE / REPLACE slot
        if (currentDaySessions >= maxDaySessions) {
          if (maxDaySessions <= 1) {
            selectedSlots = [...checkResult.slots];
          } else {
            selectedSlots.splice(
              (currentDaySessions - 1) * slotsNeeded,
              slotsNeeded,
              ...checkResult.slots,
            );
          }
        } else {
          // This day still has capacity
          const totalSelectedSlotsExcludingThisDay = prev.reduce(
            (sum, d, i) => (i === dayIdx ? sum : sum + d.selectedSlots.length),
            0,
          );
          const totalRequiredSlots = sessionsCount * slotsNeeded;

          if (
            totalSelectedSlotsExcludingThisDay +
              selectedSlots.length +
              slotsNeeded >
            totalRequiredSlots
          ) {
            if (selectedSlots.length >= slotsNeeded) {
              selectedSlots.splice(
                selectedSlots.length - slotsNeeded,
                slotsNeeded,
                ...checkResult.slots,
              );
            } else {
              errorAlert(
                `All ${sessionsCount} session(s) have already been selected across your scheduled days. Deselect a session from another day first.`,
              );
              return prev;
            }
          } else {
            selectedSlots.push(...checkResult.slots);
          }
        }
      }

      day.date = targetDate;
      day.selectedSlots = selectedSlots;
      next[dayIdx] = day;

      // In sequential mode, changing Day 0 cascades dates to subsequent days
      if (dayIdx === 0 && isSequential) {
        for (let j = 1; j < next.length; j++) {
          const cascadedDate = addDays(targetDate, j * step);
          const dateChanged =
            !next[j].date || !isSameDay(next[j].date, cascadedDate);
          next[j] = {
            ...next[j],
            date: cascadedDate,
            selectedSlots: dateChanged ? [] : next[j].selectedSlots,
          };
        }
      }

      const maxDaySessions = getTargetSessionsForDay(
        dayIdx,
        sessionsCount,
        daysCount,
      );
      const targetSlotsForDay = maxDaySessions * slotsNeeded;

      // Auto-advance only if next day does not have slots selected yet
      if (selectedSlots.length >= targetSlotsForDay && dayIdx < daysCount - 1) {
        const nextIdx = dayIdx + 1;
        if (
          !next[nextIdx]?.selectedSlots ||
          next[nextIdx].selectedSlots.length === 0
        ) {
          const nextDate =
            next[nextIdx]?.date ||
            (isSequential ? addDays(targetDate, step) : addDays(targetDate, 1));
          next[nextIdx] = { ...next[nextIdx], date: nextDate };
          setTimeout(() => {
            setActivePickerIndex(nextIdx);
            setExploringDate(nextDate);
          }, 150);
        }
      }

      return next;
    });
  };

  const canPickSession = (idx) => idx === 0 || Boolean(days[idx - 1]?.date);

  const totalSelectedSessions = days.reduce(
    (sum, d) => sum + Math.floor(d.selectedSlots.length / slotsNeeded),
    0,
  );
  const totalSelectedSlots = days.reduce(
    (sum, d) => sum + d.selectedSlots.length,
    0,
  );
  const totalRequiredSlots = sessionsCount * slotsNeeded;

  const allScheduled =
    sessionsCount > 0 &&
    totalSelectedSessions === sessionsCount &&
    days.every((d) => Boolean(d.date)) &&
    selectedGuest;

  console.log("selectedGuest", item);

  const handleConfirmBooking = () => {
    if (!user) {
      errorAlert("login first");
      return;
    }
    if (isPaymentPending) return;

    if (totalSelectedSlots !== totalRequiredSlots) {
      errorAlert(
        "Please select all required time slots for your scheduled sessions.",
      );
      return;
    }

    if (!selectedGuest) {
      errorAlert("Please select a guest for this therapy booking.");
      return;
    }

    // Check room and gender validity for every selected slot
    for (const day of days) {
      for (const slot of day.selectedSlots) {
        if (!slot.serviceRoomID) {
          errorAlert(
            "One or more selected slots do not have an assigned room. Please re-select your slots.",
          );
          return;
        }
        if (!isTherapySlotSelectable(slot, selectedGuest)) {
          const g = String(selectedGuest?.gender || "").trim();
          const guestGender = g.startsWith("f")
            ? "Female"
            : g.startsWith("m")
              ? "Male"
              : g;
          errorAlert(
            `Room ${slot.serviceRoomID} allows "${slot.genderMessage || "restricted"}" for ${item?.serviceName || "this therapy"}, which does not permit guest ${selectedGuest?.label || ""} (${guestGender}). Please select an eligible slot.`,
          );
          return;
        }
      }
    }
    const saveObj = {
      userId:
        selectedGuest?.userId ||
        selectedGuest?.patientUserId ||
        selectedGuest?.id ||
        selectedGuest?.value,
      createdBy: user?.userId,
      serviceGroupID: item?.serviceGroupId || item?.serviceGroupID,
      serviceFid: item?.serviceId || item?.serviceFid,
      fromDate: days[0]?.date ? format(days[0].date, "yyyy-MM-dd") : "",
      toDate: days[days.length - 1]?.date
        ? format(days[days.length - 1].date, "yyyy-MM-dd")
        : "",
      serviceRoomID:
        days.flatMap((d) => d.selectedSlots).find((s) => s?.serviceRoomID)
          ?.serviceRoomID ||
        item?.serviceRoomId ||
        item?.serviceRoomID,
      totalAmount: total,
      slots: days.flatMap((d) =>
        d.selectedSlots.map((slot) => {
          const parseToDisplay = (timeStr) => {
            if (!timeStr) return "N/A";
            try {
              let finalDate;
              if (timeStr.includes("AM") || timeStr.includes("PM")) {
                finalDate = parse(timeStr, "hh:mm a", new Date());
              } else {
                const parsedDate = parse(timeStr, "HH:mm:ss", new Date());
                finalDate = isNaN(parsedDate.getTime())
                  ? parse(timeStr, "HH:mm", new Date())
                  : parsedDate;
              }
              return !isNaN(finalDate.getTime())
                ? format(finalDate, "HH:mm:ss")
                : timeStr;
            } catch (e) {
              return timeStr || "N/A";
            }
          };

          return {
            SlotDate: d.date ? format(d.date, "yyyy-MM-dd") : "N/A",
            slotStart: parseToDisplay(slot.startTime),
            slotEnd: parseToDisplay(slot.endTime),
          };
        }),
      ),
    };
    console.log("saveObj", saveObj);
    setFinalSaveObj(saveObj);
    setOpenConfirmationModal(true);
  };

  const initiateBookingPayment = async () => {
    if (isPaymentPending) return;
    try {
      setIsLoading(true);
      const bookingRes = await BookDetoxTherapy(finalSaveObj);
      const bookingData = bookingRes?.data;

      if (bookingData?.message) {
        const bookingId = bookingData?.bookingId || bookingData?.data;

        const tempObj = {
          amount: total,
          userId: bookingId?.patientUserId,
          paymentFor: "TherapyBooking",
          bookingId: bookingId?.therapyBookingId || bookingId,
        };
        console.log("bookingData", bookingId);

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
              setDays([
                {
                  date: startOfToday(),
                  requiredSessions: 1,
                  selectedSlots: [],
                },
              ]);
              setDaysCount(1);
              setSessionsCount(1);
              reset();
              onClose();
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
          errorAlert(data?.message || "Failed to initiate payment");
        }
      } else {
        setIsLoading(false);
        errorAlert(bookingData?.message || "Booking failed");
      }
    } catch (error) {
      console.log("bookingDataError", error);
      setIsLoading(false);
      errorAlert(
        error?.response?.data?.message ||
          error?.message ||
          "An unexpected error occurred during the booking process.",
      );
    }
  };
  const handleReset = () => {
    reset();
    setSessionsCount(1);
    setFrequency(1);
    setDays([{ date: startOfToday(), requiredSessions: 1, selectedSlots: [] }]);
    setDaysCount(1);
    setActivePickerIndex(0);
    setCalendarBaseDate(startOfToday());
    setIsFirstTime(false);
    setGenderPreference("No Preference");
  };

  return (
    <>
      <Modal open={open}>
        <Box
          sx={ModalStyle}
          ref={backdropRef}
          className="w-[96%] sm:w-[90%] md:w-[80%] lg:w-[65%] xl:w-[52%] max-h-[94vh] p-2 overflow-hidden rounded-[9px] bg-[#faf9f6]  flex flex-col"
        >
          <div className="flex items-center justify-between md:px-4  pb-3 border-b border-[#e8ede4] flex-shrink-0">
            <h1 className="font-serif text-ayuTulsi text-base sm:text-lg font-bold leading-tight">
              Book Therapy Session
            </h1>
            <CancelButtonModal onClick={onClose} />
          </div>

          <div className="overflow-y-auto flex-1 no-scrollbar">
            <div className="p-2 md:p-4 space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start bg-[#eef6e8] rounded-[9px] p-3 gap-3 border border-[#d4e8c2] shadow-sm"
              >
                <img
                  src={item?.serviceImage}
                  alt={item?.serviceName}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl shadow-sm flex-shrink-0 mt-0.5"
                />
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-1">
                    <span className="bg-lime text-ayuMid text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                      DETOX HOUSE
                    </span>
                    <span className="text-ayuMid/50 text-[9px] font-semibold uppercase hidden sm:inline">
                      Detox & Rejuvenation
                    </span>
                  </div>
                  <h2 className="font-serif text-ayuTulsi text-sm sm:text-base font-bold leading-snug break-words line-clamp-2">
                    {item?.serviceName}
                  </h2>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-500">
                      <AccessTime
                        style={{ fontSize: 12 }}
                        className="text-ayuMid"
                      />
                      {item?.duration} Min
                    </span>
                    <span className="font-bold text-ayuTulsi text-sm">
                      ₹{item.charges}
                    </span>
                  </div>
                </div>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <span className="text-gray-500 text-[10px] font-bold  block uppercase tracking-widest">
                    Number of Sessions
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSessionChange(sessionsCount - 1)}
                      className="w-10 h-10 flex-shrink-0 rounded-[5px] bg-[#f0f4ef] border border-[#e4ebdd] text-ayuMid font-bold text-xl flex items-center justify-center hover:bg-ayuMid hover:text-white active:scale-95 transition-all"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      placeholder="1"
                      value={sessionsCount === 0 ? "" : sessionsCount}
                      onChange={(e) => handleSessionChange(e.target.value)}
                      onBlur={() => {
                        if (sessionsCount === 0) setSessionsCount(1);
                      }}
                      className="flex-1 bg-[#f4f7f2] rounded-[5px] p-1.5 text-ayuTulsi font-bold text-base text-center outline-none border-2 border-transparent focus:border-ayuMid focus:bg-white transition-all shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleSessionChange(sessionsCount + 1)}
                      className="w-10 h-10 flex-shrink-0 rounded-[5px] bg-[#f0f4ef] border border-[#e4ebdd] text-ayuMid font-bold text-xl flex items-center justify-center hover:bg-ayuMid hover:text-white active:scale-95 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] font-bold  block uppercase tracking-widest">
                    Number of Days
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDaysChange(daysCount - 1)}
                      className="w-10 h-10 flex-shrink-0 rounded-[5px] bg-[#f0f4ef] border border-[#e4ebdd] text-ayuMid font-bold text-xl flex items-center justify-center hover:bg-ayuMid hover:text-white active:scale-95 transition-all"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      placeholder="1"
                      value={daysCount === 0 ? "" : daysCount}
                      onChange={(e) => handleDaysChange(e.target.value)}
                      onBlur={() => {
                        if (daysCount === 0) setDaysCount(1);
                      }}
                      className="flex-1 bg-[#f4f7f2] rounded-[5px] p-1.5 text-ayuTulsi font-bold text-base text-center outline-none border-2 border-transparent focus:border-ayuMid focus:bg-white transition-all shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleDaysChange(daysCount + 1)}
                      className="w-10 h-10 flex-shrink-0 rounded-[5px] bg-[#f0f4ef] border border-[#e4ebdd] text-ayuMid font-bold text-xl flex items-center justify-center hover:bg-ayuMid hover:text-white active:scale-95 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {daysCount > 1 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4">
                      <span className="text-gray-500 text-[10px] font-bold mb-2 block uppercase tracking-widest">
                        Session Frequency
                      </span>
                      <div className="flex flex-col gap-3">
                        <div className="bg-[#f0f4ef] p-1.5 rounded-[5px] border border-[#e4ebdd] flex flex-wrap items-center gap-1.5">
                          {[
                            { label: "Daily", value: 1 },
                            { label: "Alternate Day", value: 2 },
                            { label: "Weekly", value: 7 },
                            { label: "Custom", value: "custom" },
                          ].map((opt) => {
                            const isActive =
                              opt.value === "custom"
                                ? isCustomFrequency
                                : !isCustomFrequency && frequency === opt.value;
                            return (
                              <button
                                key={opt.label}
                                type="button"
                                onClick={() => {
                                  if (opt.value === "custom") {
                                    setIsCustomFrequency(true);
                                    setFrequency("custom");
                                  } else {
                                    setIsCustomFrequency(false);
                                    setFrequency(opt.value);
                                  }
                                }}
                                className={`flex-1 min-w-[70px] py-2 px-2 rounded text-[11px] font-bold transition-all shadow-sm ${
                                  isActive
                                    ? "bg-ayuMid text-white"
                                    : "bg-white text-gray-600 hover:bg-[#e4ebdd]"
                                }`}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>

                        <AnimatePresence>
                          {isCustomFrequency && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="flex items-center gap-2 bg-[#f4f7f2] p-2.5 rounded-[5px] border border-[#e4ebdd] text-ayuMid text-xs font-semibold">
                                <span>
                                  ✨ Custom frequency enabled: You can select
                                  any preferred date for each session
                                  independently below.
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {(daysCount === 1 ||
                  (daysCount > 1 &&
                    (frequency !== null || isCustomFrequency))) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-serif text-ayuTulsi text-sm font-bold border-l-4 border-ayuMid pl-3">
                        Choose Date & Time
                      </h3>
                    </div>
                    <div className="flex flex-col gap-3">
                      {days.map((schedule, idx) => {
                        const isLocked = !canPickSession(idx);
                        const isPicking = activePickerIndex === idx;
                        return (
                          <div
                            key={idx}
                            className={
                              isLocked ? "opacity-40 pointer-events-none" : ""
                            }
                          >
                            <div className="flex items-center gap-1.5 mb-1.5 text-ayuMid font-black text-[10px] uppercase tracking-widest">
                              <EventAvailable style={{ fontSize: 12 }} />
                              <span>Day {idx + 1}</span>
                            </div>

                            {!isPicking && !schedule.date ? (
                              <div
                                onClick={() => {
                                  if (!isLocked) {
                                    setActivePickerIndex(idx);
                                    setExploringDate(days[idx]?.date || null);
                                  }
                                }}
                                className="border border-dashed border-[#c4d4be] bg-white rounded-[9px] py-4 px-4 flex items-center justify-between cursor-pointer hover:bg-[#f9faf7] active:scale-[0.99] transition-all"
                              >
                                <span className="text-gray-400 text-xs font-medium">
                                  Select schedule
                                </span>
                                <span className="text-ayuMid text-[10px] font-bold bg-[#eef6e8] px-3 py-1 rounded-full uppercase">
                                  Choose
                                </span>
                              </div>
                            ) : activePickerIndex === idx ? (
                              <motion.div
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="bg-[#f0f4ef] rounded-[9px] p-3 sm:p-4 border border-[#e4ebdd] overflow-hidden"
                              >
                                <div className="flex justify-between items-center mb-3">
                                  <span className="font-bold text-[#3b594b] text-sm uppercase tracking-wide">
                                    {format(calendarBaseDate, "MMMM yyyy")}
                                  </span>
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={prevMonth}
                                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-ayuMid shadow-sm transition-all"
                                    >
                                      <ChevronLeft fontSize="small" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={nextMonth}
                                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-ayuMid shadow-sm transition-all"
                                    >
                                      <ChevronRight fontSize="small" />
                                    </button>
                                  </div>
                                </div>

                                <div
                                  ref={scrollContainerRef}
                                  className="flex gap-2 overflow-x-auto pb-3 mb-3 no-scrollbar scroll-smooth"
                                >
                                  {visibleDates.map((date, i) => {
                                    const minDateForSession =
                                      idx > 0 && days[idx - 1]?.date
                                        ? days[idx - 1].date
                                        : startOfToday();
                                    const isToday = isSameDay(
                                      date,
                                      startOfToday(),
                                    );
                                    const seqMode =
                                      !isCustomFrequency &&
                                      typeof frequency === "number" &&
                                      idx > 0;
                                    const seqDate = seqMode
                                      ? addDays(
                                          days[0]?.date || startOfToday(),
                                          idx * frequency,
                                        )
                                      : null;
                                    const isDisabled = seqMode
                                      ? !isSameDay(date, seqDate)
                                      : isBefore(date, minDateForSession);

                                    const activeTargetDate =
                                      activePickerIndex === idx && exploringDate
                                        ? exploringDate
                                        : schedule.date;

                                    const isSelected =
                                      activeTargetDate &&
                                      isSameDay(date, activeTargetDate);

                                    // Use suggestedDate for scroll focus when no date chosen yet
                                    const isSuggested =
                                      !schedule.date &&
                                      suggestedDate &&
                                      isSameDay(date, suggestedDate) &&
                                      activePickerIndex === idx;

                                    const isTargetDate =
                                      isSelected ||
                                      isSuggested ||
                                      (!schedule.date &&
                                        !suggestedDate &&
                                        isToday);
                                    return (
                                      <button
                                        key={i}
                                        type="button"
                                        ref={
                                          isTargetDate ? selectedDateRef : null
                                        }
                                        disabled={isDisabled}
                                        onClick={() =>
                                          handleDateSelect(date, idx)
                                        }
                                        className={`flex flex-col items-center justify-center rounded-[5px] min-w-[48px] h-[60px] flex-shrink-0 transition-all
                                        ${
                                          isDisabled
                                            ? "text-gray-200 cursor-not-allowed"
                                            : isSelected
                                              ? "bg-ayuMid text-white shadow-md"
                                              : isSuggested
                                                ? "bg-ayuMid/10 text-ayuMid border-2 border-dashed border-ayuMid shadow-sm"
                                                : isToday
                                                  ? "bg-ayuMid/10 text-ayuMid border-2 border-ayuMid shadow-sm"
                                                  : "bg-white text-gray-500 border border-gray-100 hover:border-ayuMid active:scale-95"
                                        }`}
                                      >
                                        <span
                                          className={`text-[9px] font-bold uppercase tracking-tighter mb-0.5 ${isSelected ? "text-white/70" : "text-gray-400"}`}
                                        >
                                          {format(date, "EEE")}
                                        </span>
                                        <span className="text-sm font-bold">
                                          {format(date, "d")}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Room Selector if multiple rooms available */}
                                {availableRooms.length > 1 && (
                                  <div className="mb-3">
                                    <div className="flex items-center justify-between mb-1.5">
                                      <span className="text-[#6d8a7c] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                                        <MeetingRoom sx={{ fontSize: 13 }} />
                                        Select Room
                                      </span>
                                      {activeRoomId && (
                                        <span className="text-[10px] font-bold text-ayuMid bg-[#f0f4ef] px-2 py-0.5 rounded border border-[#e4ebdd]">
                                          Showing Room {activeRoomId}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                      {availableRooms.map((rm) => {
                                        const isRoomActive =
                                          activeRoomId === rm.serviceRoomID;
                                        const validation =
                                          getSlotGenderValidation(
                                            {
                                              serviceRoomID: rm.serviceRoomID,
                                              genderMessage: rm.genderMessage,
                                            },
                                            selectedGuest,
                                            item?.serviceName,
                                          );
                                        const isAllowed = validation
                                          ? validation.isValid
                                          : true;

                                        return (
                                          <button
                                            key={rm.serviceRoomID}
                                            type="button"
                                            onClick={() =>
                                              setSelectedRoomId(
                                                rm.serviceRoomID,
                                              )
                                            }
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 active:scale-95 ${
                                              isRoomActive
                                                ? "bg-ayuMid text-white border-ayuMid shadow-xs"
                                                : "bg-white text-gray-700 border-[#e4ebdd] hover:border-ayuMid hover:bg-[#f0f4ef]"
                                            }`}
                                          >
                                            <span>Room {rm.serviceRoomID}</span>
                                            <span
                                              className={`text-[9px] px-1.5 py-0.5 rounded font-normal ${
                                                isRoomActive
                                                  ? "bg-white/20 text-white"
                                                  : isAllowed
                                                    ? "bg-[#eef6ec] text-[#4a6b5d]"
                                                    : "bg-rose-50 text-rose-700 font-semibold"
                                              }`}
                                            >
                                              {rm.genderMessage}
                                            </span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}

                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[#6d8a7c] text-[10px] font-bold uppercase tracking-widest">
                                    Available Slots
                                  </span>
                                  {activeRoomId && availableRooms.length <= 1 && (
                                    <span className="text-[10px] font-bold text-ayuMid bg-[#f0f4ef] px-2 py-0.5 rounded border border-[#e4ebdd]">
                                      Room {activeRoomId}
                                      {availableRooms[0]?.genderMessage
                                        ? ` • ${availableRooms[0].genderMessage}`
                                        : ""}
                                    </span>
                                  )}
                                </div>
                                <div className="slots-scroll flex flex-wrap gap-2 min-h-[40px] max-h-[220px] overflow-y-auto pr-1 items-center content-start">
                                  {isSlotsLoading ? (
                                    <div className="w-full flex flex-col items-center justify-center py-4">
                                      <div className="w-6 h-6 border-2 border-ayuMid/20 border-t-ayuMid rounded-full animate-spin" />
                                      <span className="text-[10px] font-bold text-ayuMid/60 mt-2 uppercase tracking-tight">
                                        Loading Slots...
                                      </span>
                                    </div>
                                  ) : therapySlots.length > 0 ? (
                                    therapySlots.map((slot, i) => {
                                      const t = slot.startTime;
                                      const isExploringSameDate =
                                        !exploringDate ||
                                        !schedule.date ||
                                        isSameDay(exploringDate, schedule.date);

                                      const isSelected =
                                        isExploringSameDate &&
                                        schedule.selectedSlots.some(
                                          (s) =>
                                            s.startTime === t &&
                                            (s.serviceRoomID && slot.serviceRoomID
                                              ? s.serviceRoomID === slot.serviceRoomID
                                              : true),
                                        );

                                      const isSingleValid =
                                        isSingleSlotSelectable(slot, idx);

                                      const isDisabledSlot =
                                        !isSelected && !isSingleValid;

                                      return (
                                        <button
                                          key={i}
                                          type="button"
                                          disabled={isDisabledSlot}
                                          onClick={() => {
                                            if (!isDisabledSlot) {
                                              handleTimeSelect(slot, idx);
                                            }
                                          }}
                                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 active:scale-95 ${
                                            isSelected
                                              ? "bg-ayuMid text-white border-ayuMid shadow-sm"
                                              : isDisabledSlot
                                                ? "bg-gray-100/50 text-gray-300 border-gray-200 cursor-not-allowed"
                                                : "bg-white text-gray-600 border-[#e4ebdd] hover:border-ayuMid hover:bg-[#f0f4ef]"
                                          }`}
                                        >
                                          <span>
                                            {formatTime(slot.startTime)}
                                            {slot.endTime
                                              ? ` - ${formatTime(slot.endTime)}`
                                              : ""}
                                          </span>
                                          {isDisabledSlot && (
                                            <span className="text-[9px] text-gray-400 font-normal truncate max-w-[100px]">
                                              (Selected)
                                            </span>
                                          )}
                                        </button>
                                      );
                                    })
                                  ) : (
                                    <div className="text-[10px] text-gray-400 font-bold italic text-center py-2 w-full">
                                      {schedule.date
                                        ? "No slots available for this date"
                                        : "Please select a date first"}
                                    </div>
                                  )}
                                </div>

                                {/* Room & Gender Validation Box */}
                                {(() => {
                                  const activeSlot =
                                    schedule.selectedSlots?.[0] ||
                                    (therapySlots.length > 0
                                      ? therapySlots[0]
                                      : null);
                                  const isSlotSelected =
                                    schedule.selectedSlots?.length > 0;
                                  const validation = getSlotGenderValidation(
                                    activeSlot,
                                    selectedGuest,
                                    item?.serviceName,
                                  );
                                  if (!validation) return null;

                                  return (
                                    <div
                                      className={`mt-3 p-3 rounded-xl border flex items-start gap-2.5 transition-all ${validation.boxClass}`}
                                    >
                                      <div className="mt-0.5 shrink-0">
                                        {validation.iconType === "success" ? (
                                          <CheckCircleOutline
                                            fontSize="small"
                                            className="text-emerald-600"
                                          />
                                        ) : validation.iconType === "error" ? (
                                          <ErrorOutline
                                            fontSize="small"
                                            className="text-rose-600"
                                          />
                                        ) : (
                                          <InfoOutlined
                                            fontSize="small"
                                            className="text-ayuTulsi"
                                          />
                                        )}
                                      </div>
                                      <div className="flex-1 text-xs">
                                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                          <span className="font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/80 border border-current shadow-xs">
                                            Room {validation.roomId}
                                          </span>
                                          <span className="font-semibold text-[10px] px-2 py-0.5 rounded bg-white/80 border border-current shadow-xs">
                                            {validation.genderMsg}
                                          </span>
                                          {isSlotSelected && (
                                            <span className="text-[10px] font-bold text-ayuMid bg-white/80 px-2 py-0.5 rounded border border-ayuMid/30">
                                              Selected Slot
                                            </span>
                                          )}
                                        </div>
                                        <p className="font-medium text-[11px] leading-snug">
                                          {validation.message}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })()}

                                <div className="mt-3 flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (idx < daysCount - 1) {
                                        const nextIdx = idx + 1;
                                        const nextDate =
                                          days[nextIdx]?.date ||
                                          (schedule.date
                                            ? addDays(
                                                schedule.date,
                                                !isCustomFrequency &&
                                                  typeof frequency === "number"
                                                  ? frequency
                                                  : 1,
                                              )
                                            : null);
                                        setActivePickerIndex(nextIdx);
                                        if (nextDate)
                                          setExploringDate(nextDate);
                                      } else {
                                        setActivePickerIndex(null);
                                      }
                                    }}
                                    className="text-ayuMid font-bold text-[11px] uppercase tracking-wider hover:underline"
                                  >
                                    Done
                                  </button>
                                </div>
                              </motion.div>
                            ) : (
                              <div
                                onClick={() => {
                                  if (!isLocked) {
                                    setActivePickerIndex(idx);
                                    setExploringDate(days[idx]?.date || null);
                                  }
                                }}
                                className="bg-white border border-[#e4ebdd] rounded-2xl p-3 flex justify-between items-center cursor-pointer hover:shadow-sm active:scale-[0.99] transition-all"
                              >
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-800 font-bold text-sm">
                                      {schedule.date
                                        ? format(
                                            schedule.date,
                                            "EEE, MMM d, yyyy",
                                          )
                                        : "Select Date"}
                                    </span>
                                    {schedule.selectedSlots?.length > 0 &&
                                      schedule.selectedSlots[0]?.serviceRoomID && (
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#f0f4ef] text-ayuMid border border-[#e4ebdd]">
                                          Room {schedule.selectedSlots[0].serviceRoomID}
                                        </span>
                                      )}
                                  </div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span
                                      className={`text-[11px] font-bold uppercase ${
                                        schedule.selectedSlots?.length > 0
                                          ? "text-ayuMid"
                                          : "text-amber-600"
                                      }`}
                                    >
                                      {schedule.selectedSlots?.length > 0
                                        ? `${Math.floor(schedule.selectedSlots.length / slotsNeeded)} session(s) (${formatTime(schedule.selectedSlots[0].startTime)}${
                                            schedule.selectedSlots[
                                              schedule.selectedSlots.length - 1
                                            ].endTime
                                              ? ` - ${formatTime(
                                                  schedule.selectedSlots[
                                                    schedule.selectedSlots
                                                      .length - 1
                                                  ].endTime,
                                                )}`
                                              : ""
                                          })`
                                        : "Select slot"}
                                    </span>
                                    {schedule.selectedSlots?.length > 0 &&
                                      schedule.selectedSlots[0]?.genderMessage && (
                                        <span className="text-[10px] font-medium text-[#4a6b5d] bg-[#eef6ec] px-1.5 py-0.5 rounded border border-[#dce8d8]">
                                          {schedule.selectedSlots[0].genderMessage}
                                        </span>
                                      )}
                                  </div>
                                </div>
                                <div className="bg-[#f0f4ef] p-1.5 rounded-lg text-ayuMid">
                                  <AccessTime fontSize="small" />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div>
                <h3 className="font-serif text-ayuTulsi text-sm font-bold mb-2.5 border-l-4 border-ayuMid pl-3">
                  Guest Details
                </h3>
                <div className="bg-[#f0f4ef] rounded-[5px] p-3 flex items-center gap-3 border border-[#e4ebdd]">
                  <div className="w-9 h-9 rounded-full bg-[#d4e8c2] flex items-center justify-center text-ayuMid flex-shrink-0">
                    <PersonOutline fontSize="small" />
                  </div>

                  <div>
                    <span className="font-bold text-ayuTulsi text-sm block">
                      Guest Info
                    </span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                      Please select from profile
                    </span>
                  </div>
                  <div className="flex justify-end flex-1">
                    <CommonButton
                      type="button"
                      onClick={() => setOpenAddPatient(true)}
                      label="+ Add Guest"
                      className="bg-booking-primary text-white  hover:bg-booking-primaryDark transition-all shadow-sm shrink-0"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="font-serif text-ayuTulsi text-sm font-bold mb-3 border-l-4 border-ayuMid pl-3">
                    Wellness Info
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <span className="text-gray-500 font-bold text-[10px] uppercase tracking-wider block">
                        First time taking this?
                      </span>
                      <div className="bg-white p-3 rounded-[5px] border border-[#e4ebdd] flex items-center gap-5 min-h-[44px]">
                        {["Yes", "No"].map((opt) => (
                          <label
                            key={opt}
                            className="flex items-center gap-1.5 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="firstTime"
                              checked={(opt === "Yes") === isFirstTime}
                              onChange={() => setIsFirstTime(opt === "Yes")}
                              className="w-3.5 h-3.5 accent-ayuMid"
                            />
                            <span className="text-gray-700 font-bold text-xs">
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-gray-500 font-bold text-[10px] uppercase tracking-wider block">
                        Preferred therapist
                      </span>
                      <div className="bg-white p-3 rounded-[5px] border border-[#e4ebdd] flex items-center gap-3 min-h-[44px] overflow-x-auto custom-scrollbar-wellness-stay">
                        {["No Preference", "Male", "Female"].map((opt) => (
                          <label
                            key={opt}
                            className="flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                          >
                            <input
                              type="radio"
                              name="genderPref"
                              checked={genderPreference === opt}
                              onChange={() => setGenderPreference(opt)}
                              className="w-3.5 h-3.5 accent-ayuMid"
                            />
                            <span className="text-gray-700 font-bold text-[10px]">
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <DropdownField
                    control={control}
                    name="selectGuest"
                    placeholder="Select Guest"
                    dataArray={patientOptions}
                    isClearable={true}
                    searchIcon={true}
                  />
                  {selectedGuest && (
                    <div className="mt-2.5 p-2.5 rounded-xl border bg-white border-[#e4ebdd] flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          Guest Gender:
                        </span>
                        <span className="text-xs font-bold text-ayuTulsi bg-[#f0f4ef] px-2 py-0.5 rounded border border-[#e4ebdd] capitalize">
                          {selectedGuest.gender || "Not specified"}
                        </span>
                      </div>
                      {days.some((d) => d.selectedSlots.length > 0) && (() => {
                        const allPassed = days.every((d) =>
                          d.selectedSlots.every((s) =>
                            isTherapySlotSelectable(s, selectedGuest),
                          ),
                        );
                        return allPassed ? (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                            <CheckCircleOutline sx={{ fontSize: 13 }} />
                            Eligible for selected room(s)
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 flex items-center gap-1">
                            <ErrorOutline sx={{ fontSize: 13 }} />
                            Room restriction mismatch
                          </span>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-[#f4f7f2] rounded-[9px] p-4 border border-[#e4ebdd]">
                <div className="flex items-center justify-between border-b border-ayuMid/20 pb-3 mb-3">
                  <h3 className="font-serif text-ayuBrown text-sm font-bold">
                    Summary
                  </h3>
                  <img
                    src={SummaryIcon}
                    alt="Summary"
                    className="text-ayuBrown h-7 w-10"
                  />
                </div>
                <div className="flex flex-col gap-2 text-xs font-bold text-gray-500 border-b border-ayuMid/10 pb-3 mb-3">
                  <div className="flex justify-between items-start">
                    <span>Sessions</span>
                    <span className="text-ayuTulsi">
                      {sessionsCount} × {shortServiceName}
                    </span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="flex-shrink-0">Schedule</span>
                    <div className="flex flex-col items-end gap-1">
                      {days.some((d) => d.selectedSlots.length > 0) ? (
                        days.flatMap((d, dIdx) =>
                          d.selectedSlots.map((slot, sIdx) => (
                            <div
                              key={`${dIdx}-${sIdx}`}
                              className="flex flex-col items-end gap-0.5"
                            >
                              <span className="text-ayuMid text-[10px] bg-white px-2 py-0.5 rounded border border-ayuMid/20 font-bold">
                                {format(d.date, "MMM d")} •{" "}
                                {formatTime(slot.startTime)}
                                {slot.serviceRoomID
                                  ? ` • Room ${slot.serviceRoomID}`
                                  : ""}
                              </span>
                              {slot.genderMessage && (
                                <span className="text-[9px] text-[#4a6b5d] bg-[#eef6ec] px-1.5 py-0.5 rounded font-medium">
                                  {slot.genderMessage}
                                </span>
                              )}
                            </div>
                          )),
                        )
                      ) : (
                        <span className="text-gray-400 italic text-[10px]">
                          Not scheduled yet
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-xs font-bold text-gray-500 border-b border-ayuMid/10 pb-3 mb-3">
                  <div className="flex justify-between items-center px-1">
                    <span>Price / Session</span>
                    <span className="text-ayuTulsi">
                      ₹{priceParsed.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-[#eef6e8] p-2 rounded-lg">
                    <span className="text-ayuTulsi">Subtotal</span>
                    <span className="text-ayuTulsi font-black">
                      ₹{subTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-1 text-[10px]">
                    <span>Taxes (18%)</span>
                    <span className="text-ayuTulsi">
                      ₹{taxes.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-serif text-ayuBrown font-black text-base">
                    Total
                  </span>
                  <span className="text-ayuMid font-black text-2xl tracking-tighter">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <CommonButton
                  type="button"
                  label="Reset"
                  className={"border border-red-600 text-red-600 bg-red-100"}
                  onClick={handleReset}
                />
                <CommonButton
                  type="button"
                  label="Confirm Booking"
                  disabled={!allScheduled}
                  className="w-full bg-gradient-to-r from-ayuMid to-ayuTulsi text-white  text-sm   active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={handleConfirmBooking}
                />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
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
      <ConfirmationModal
        confirmationOpen={openConfirmationModal}
        confirmationLabel="Confirm Therapy Booking"
        confirmationMsg={`Are you sure you want to book ${sessionsCount} session(s) of ${item?.serviceName}${
          days.flatMap((d) => d.selectedSlots).find((s) => s?.serviceRoomID)?.serviceRoomID
            ? ` in Room ${days.flatMap((d) => d.selectedSlots).find((s) => s?.serviceRoomID)?.serviceRoomID}`
            : ""
        }? Total Amount: ₹${total.toLocaleString()}`}
        confirmationSubmitFunc={initiateBookingPayment}
        confirmationHandleClose={() => {
          if (cancelPaymentRef.current) {
            cancelPaymentRef.current();
            cancelPaymentRef.current = null;
          }
          setIsPaymentPending(false);
          setOpenConfirmationModal(false);
        }}
        confirmationButtonMsg={
          isPaymentPending ? "Processing..." : "Confirm & Pay"
        }
        disabled={isPaymentPending}
      />
    </>
  );
}
