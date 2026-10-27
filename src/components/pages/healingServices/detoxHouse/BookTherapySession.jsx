import { yupResolver } from "@hookform/resolvers/yup";
import {
  AccessTime,
  Block,
  CheckCircle,
  CheckCircleOutline,
  ChevronLeft,
  ChevronRight,
  Close,
  ErrorOutline,
  EventAvailable,
  InfoOutlined,
  PersonOutline,
  Check,
  Refresh,
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
import { useEffect, useRef, useState } from "react";
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
import {
  NO_ROOM_MESSAGE,
  findBestRoomBlock,
  isSlotAllowedForGender,
  isSlotAvailable,
  isTherapySlotSelectable,
  normalizeGender,
  rankRoomsForGuest,
  reassignSessionRooms,
} from "./Therapyroomutils";

export {
  normalizeGender,
  isSlotAllowedForGender,
  isSlotAvailable,
  isTherapySlotSelectable,
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

export default function BookTherapySession({ open, onClose, item }) {
  const backdropRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const selectedDateRef = useRef(null);
  const [sessionsCount, setSessionsCount] = useState(1);
  const [daysCount, setDaysCount] = useState(1);
  const [frequency, setFrequency] = useState(1);
  const [isCustomFrequency, setIsCustomFrequency] = useState(false);
  const [days, setDays] = useState([
    { date: startOfToday(), requiredSessions: 1, selectedSlots: [] },
  ]);
  const [activePickerIndex, setActivePickerIndex] = useState(0);
  const [activeSessionSlotIndex, setActiveSessionSlotIndex] = useState(0);
  const [calendarBaseDate, setCalendarBaseDate] = useState(startOfToday());
  const [suggestedDate, setSuggestedDate] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [genderPreference, setGenderPreference] = useState("No Preference");
  const [patientOptions, setPatientOptions] = useState([]);
  const [rawTherapySlots, setRawTherapySlots] = useState([]);
  const [therapySlots, setTherapySlots] = useState([]);
  const [isSlotsLoading, setIsSlotsLoading] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const [finalSaveObj, setFinalSaveObj] = useState(null);
  const [openAddPatient, setOpenAddPatient] = useState(false);

  const [guestGenderOverride, setGuestGenderOverride] = useState(null);
  const [confirmModalData, setConfirmModalData] = useState(null);

  const cancelPaymentRef = useRef(null);
  const prevGuestKeyRef = useRef(null);
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
  const selectedGuestId = selectedGuest?.id ?? selectedGuest?.value ?? null;

  const getEffectiveGuest = () => {
    const overrideGender =
      guestGenderOverride && guestGenderOverride.guestId === selectedGuestId
        ? guestGenderOverride.gender
        : null;

    const base =
      selectedGuest && (selectedGuest.gender || selectedGuest.label)
        ? selectedGuest
        : null;

    if (!base && overrideGender) {
      return {
        gender: overrideGender,
        normalizedGender: overrideGender,
        genderLocked: true,
      };
    }
    if (!base) return null;

    const norm = normalizeGender(base);
    const resolvedGender = overrideGender || norm || base.gender || "";
    return {
      ...base,
      gender: resolvedGender,
      normalizedGender: resolvedGender,
      genderLocked: Boolean(overrideGender),
    };
  };

  const effectiveGender = normalizeGender(getEffectiveGuest());
  const guestKey = `${selectedGuestId ?? ""}|${effectiveGender}`;

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
          const targetDaySessions = getTargetSessionsForDay(
            i,
            sessionsCount,
            daysCount,
          );
          if (i === 0) {
            if (!next[0].date) next[0].date = baseDate;
            let curSess = Array.isArray(next[0].sessions)
              ? [...next[0].sessions]
              : [];
            while (curSess.length < targetDaySessions) curSess.push(null);
            if (curSess.length > targetDaySessions)
              curSess.length = targetDaySessions;
            next[0].sessions = curSess;
            next[0].selectedSlots = curSess.filter(Boolean).flat();
          } else {
            if (isSequential) {
              const seqDate = addDays(next[0].date, i * step);
              const dateChanged =
                !next[i].date || !isSameDay(next[i].date, seqDate);
              let curSess =
                dateChanged || !Array.isArray(next[i].sessions)
                  ? Array(targetDaySessions).fill(null)
                  : [...next[i].sessions];
              while (curSess.length < targetDaySessions) curSess.push(null);
              if (curSess.length > targetDaySessions)
                curSess.length = targetDaySessions;
              next[i] = {
                ...next[i],
                date: seqDate,
                sessions: curSess,
                selectedSlots: dateChanged
                  ? []
                  : curSess.filter(Boolean).flat(),
              };
            } else {
              const minD = next[i - 1]?.date || baseDate;
              const dateChanged = !next[i].date || isBefore(next[i].date, minD);
              let curSess =
                dateChanged || !Array.isArray(next[i].sessions)
                  ? Array(targetDaySessions).fill(null)
                  : [...next[i].sessions];
              while (curSess.length < targetDaySessions) curSess.push(null);
              if (curSess.length > targetDaySessions)
                curSess.length = targetDaySessions;
              next[i] = {
                ...next[i],
                date: dateChanged ? addDays(minD, 1) : next[i].date,
                sessions: curSess,
                selectedSlots: dateChanged
                  ? []
                  : curSess.filter(Boolean).flat(),
              };
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
            const formatted = data.map((d) => {
              const uniqueId =
                d.patientId ??
                d.id ??
                d.userId ??
                d.patientUserId ??
                `${d.firstName || ""}_${d.lastName || ""}`;
              const rawName =
                `${d.firstName || ""} ${d.lastName || ""}`.trim() ||
                d.label ||
                "Guest";
              const normGender = normalizeGender(d);
              const displayGender =
                normGender || (d.gender ? String(d.gender).trim() : "");
              return {
                ...d,
                id: uniqueId,
                value: uniqueId,
                gender: displayGender,
                normalizedGender: normGender,
                label: displayGender
                  ? `${rawName} (${displayGender})`
                  : rawName,
              };
            });
            setPatientOptions(formatted);
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

    let cancelled = false;
    setIsSlotsLoading(true);

    TherapySlots(item.serviceId, activeDate)
      .then((res) => {
        if (cancelled) return;
        const data = Array.isArray(res?.data?.data) ? res?.data?.data : [];
        setRawTherapySlots(data);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("therapy slots error", error);
        setRawTherapySlots([]);
        setTherapySlots([]);
      })
      .finally(() => {
        if (!cancelled) setIsSlotsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, item?.serviceId, activeDate]);

  useEffect(() => {
    if (!rawTherapySlots.length) {
      setTherapySlots([]);
      return;
    }

    const effectiveGuest = getEffectiveGuest();

    const slotsByTime = new Map();
    rawTherapySlots.forEach((s) => {
      if (!s?.startTime) return;
      const key = `${s.startTime}|${s.endTime || ""}`;
      if (!slotsByTime.has(key)) {
        slotsByTime.set(key, []);
      }
      slotsByTime.get(key).push(s);
    });

    const combined = [];
    slotsByTime.forEach((roomSlots) => {
      const eligibleRooms = rankRoomsForGuest(roomSlots, effectiveGuest);
      const repSlot = eligibleRooms[0] || roomSlots[0];

      combined.push({
        ...repSlot,
        allRoomsAtTime: roomSlots,
        isSelectableForPatient: eligibleRooms.length > 0,
        eligibleRoomsCount: eligibleRooms.length,
      });
    });

    const sorted = combined.sort((a, b) =>
      (a.startTime || "").localeCompare(b.startTime || ""),
    );

    setTherapySlots(sorted);
  }, [rawTherapySlots, selectedGuest, user, guestGenderOverride]);

  const revalidateSelectionsForGuest = async () => {
    const snapshotDays = days;
    const guest = getEffectiveGuest();

    const hasSelection = snapshotDays.some(
      (d) => d.date && Array.isArray(d.sessions) && d.sessions.some(Boolean),
    );
    if (!hasSelection) return;

    const dateKeys = [
      ...new Set(
        snapshotDays
          .filter(
            (d) =>
              d.date && Array.isArray(d.sessions) && d.sessions.some(Boolean),
          )
          .map((d) => format(d.date, "yyyy-MM-dd")),
      ),
    ];

    const slotsByDate = {};
    await Promise.all(
      dateKeys.map(async (dk) => {
        if (dk === activeDate) {
          slotsByDate[dk] = rawTherapySlots;
          return;
        }
        try {
          const res = await TherapySlots(item.serviceId, dk);
          slotsByDate[dk] = Array.isArray(res?.data?.data)
            ? res.data.data
            : null;
        } catch (e) {
          slotsByDate[dk] = null;
        }
      }),
    );

    const takenKeys = new Set();
    let anyCleared = false;

    const nextDays = snapshotDays.map((d) => {
      if (!d.date || !Array.isArray(d.sessions)) return d;
      const dk = format(d.date, "yyyy-MM-dd");
      const { sessions, cleared } = reassignSessionRooms({
        sessions: d.sessions,
        rawSlots: slotsByDate[dk] ?? null,
        guest,
        dateKey: dk,
        takenKeys,
      });
      if (cleared.length) anyCleared = true;
      return {
        ...d,
        sessions,
        selectedSlots: sessions.filter(Boolean).flat(),
      };
    });

    setDays((prev) =>
      prev.map((d, i) => (snapshotDays[i] === d ? nextDays[i] : d)),
    );

    if (anyCleared) {
      const firstEmpty = nextDays[0]?.sessions?.findIndex((s) => !s);
      if (typeof firstEmpty === "number" && firstEmpty >= 0) {
        setActiveSessionSlotIndex(firstEmpty);
      }
      errorAlert(NO_ROOM_MESSAGE);
    }
  };

  useEffect(() => {
    if (prevGuestKeyRef.current === null) {
      prevGuestKeyRef.current = guestKey;
      return;
    }
    if (prevGuestKeyRef.current === guestKey) return;
    prevGuestKeyRef.current = guestKey;
    if (!open || !item?.serviceId) return;
    revalidateSelectionsForGuest();
  }, [guestKey]);

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
      const targetDaySessions = getTargetSessionsForDay(
        idx,
        sessionsCount,
        daysCount,
      );

      next[idx] = {
        ...next[idx],
        date: date,
        sessions: dateChanged
          ? Array(targetDaySessions).fill(null)
          : next[idx].sessions,
        selectedSlots: dateChanged ? [] : next[idx].selectedSlots,
      };

      const isSequential = !isCustomFrequency && typeof frequency === "number";
      const step = typeof frequency === "number" ? frequency : 1;

      if (idx === 0 && isSequential) {
        for (let j = 1; j < next.length; j++) {
          const cascadedDate = addDays(date, j * step);
          const cascadedChanged =
            !next[j].date || !isSameDay(next[j].date, cascadedDate);
          const jTargetSessions = getTargetSessionsForDay(
            j,
            sessionsCount,
            daysCount,
          );
          next[j] = {
            ...next[j],
            date: cascadedDate,
            sessions: cascadedChanged
              ? Array(jTargetSessions).fill(null)
              : next[j].sessions,
            selectedSlots: cascadedChanged ? [] : next[j].selectedSlots,
          };
        }
      }

      return next;
    });
    setActiveSessionSlotIndex(0);
  };

  const isSingleSlotSelectable = (
    slot,
    dayIdx,
    targetDateOverride,
    activeSessIdx,
  ) => {
    if (!slot) return false;
    const currentTargetDate =
      targetDateOverride ||
      (activePickerIndex === dayIdx && exploringDate) ||
      days[dayIdx]?.date;

    const currentSessionDateStr = currentTargetDate
      ? format(currentTargetDate, "yyyy-MM-dd")
      : activeDate;

    const isAlreadySelected = days.some((d, dIdx) => {
      if (!d.date) return false;
      const dDateStr = format(d.date, "yyyy-MM-dd");
      if (dDateStr !== currentSessionDateStr) return false;

      if (Array.isArray(d.sessions)) {
        return d.sessions.some((sessSlots, sIdx) => {
          if (!sessSlots) return false;
          if (dIdx === dayIdx && sIdx === activeSessIdx) return false;
          return sessSlots.some(
            (s) =>
              s.startTime === slot.startTime &&
              (s.serviceRoomID && slot.serviceRoomID
                ? s.serviceRoomID === slot.serviceRoomID
                : true),
          );
        });
      }

      return (d.selectedSlots || []).some((s, sIdx) => {
        if (dIdx === dayIdx && typeof activeSessIdx === "number") {
          const slotSessionNum = Math.floor(sIdx / slotsNeeded);
          if (slotSessionNum === activeSessIdx) return false;
        }
        return (
          s.startTime === slot.startTime &&
          (s.serviceRoomID && slot.serviceRoomID
            ? s.serviceRoomID === slot.serviceRoomID
            : true)
        );
      });
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

    const isValidForGuest = isTherapySlotSelectable(slot, getEffectiveGuest());

    return isValidForGuest && !isPastTime && !isAlreadySelected;
  };

  const getConsecutiveSlotGroup = (
    startSlot,
    requiredCount,
    availableSlots,
    dayIdx,
    targetDate,
    activeSessIdx,
  ) => {
    if (!startSlot) {
      return { valid: false, reason: NO_ROOM_MESSAGE, slots: [] };
    }

    const block = findBestRoomBlock(
      rawTherapySlots,
      startSlot.startTime,
      requiredCount,
      getEffectiveGuest(),
      (s) => !isSingleSlotSelectable(s, dayIdx, targetDate, activeSessIdx),
    );

    if (block) return { valid: true, slots: block };

    return {
      valid: false,
      reason:
        requiredCount > 1
          ? `This ${durationNum}-minute therapy requires ${requiredCount} continuous 30-minute slots starting at ${formatTime(startSlot.startTime)}. Please choose another start time.`
          : NO_ROOM_MESSAGE,
      slots: [],
    };
  };
  console.log("days1234", days);
  const applySlotToSession = (slot, dayIdx, targetDateOverride) => {
    const isSequential = !isCustomFrequency && typeof frequency === "number";
    const step = typeof frequency === "number" ? frequency : 1;

    let targetDate = targetDateOverride || days[dayIdx]?.date;
    if (dayIdx === 0) {
      targetDate =
        targetDateOverride || days[0]?.date || exploringDate || startOfToday();
    } else if (isSequential) {
      const baseDate = days[0]?.date || startOfToday();
      targetDate = addDays(baseDate, dayIdx * step);
    } else {
      targetDate =
        targetDateOverride ||
        days[dayIdx]?.date ||
        exploringDate ||
        startOfToday();
    }

    const curDay = days[dayIdx] || {};
    const maxDaySessions = getTargetSessionsForDay(
      dayIdx,
      sessionsCount,
      daysCount,
    );

    let targetSessIdx = activeSessionSlotIndex;
    if (targetSessIdx < 0 || targetSessIdx >= maxDaySessions) {
      const curS = Array.isArray(curDay.sessions) ? curDay.sessions : [];
      const firstEmpty = curS.findIndex((s) => !s);
      targetSessIdx = firstEmpty >= 0 ? firstEmpty : 0;
    }

    const checkResult = getConsecutiveSlotGroup(
      slot,
      slotsNeeded,
      rawTherapySlots,
      dayIdx,
      targetDate,
      targetSessIdx,
    );

    if (!checkResult.valid) {
      errorAlert(checkResult.reason);
      return false;
    }

    setDays((prev) => {
      const next = [...prev];
      const day = { ...next[dayIdx] };
      const isDateChanging = !day.date || !isSameDay(day.date, targetDate);

      let currentSessions =
        Array.isArray(day.sessions) && !isDateChanging
          ? [...day.sessions]
          : Array.from({ length: maxDaySessions }).map((_, s) => {
              if (isDateChanging) return null;
              const chunk = (day.selectedSlots || []).slice(
                s * slotsNeeded,
                (s + 1) * slotsNeeded,
              );
              return chunk.length === slotsNeeded ? chunk : null;
            });

      while (currentSessions.length < maxDaySessions)
        currentSessions.push(null);
      if (currentSessions.length > maxDaySessions)
        currentSessions.length = maxDaySessions;

      currentSessions[targetSessIdx] = checkResult.slots;

      const nextIncomplete = currentSessions.findIndex((s) => !s);
      if (nextIncomplete >= 0) {
        setActiveSessionSlotIndex(nextIncomplete);
      }

      day.date = targetDate;
      day.sessions = currentSessions;
      day.selectedSlots = currentSessions.filter(Boolean).flat();
      next[dayIdx] = day;

      if (dayIdx === 0 && isSequential) {
        for (let j = 1; j < next.length; j++) {
          const cascadedDate = addDays(targetDate, j * step);
          const dateChanged =
            !next[j].date || !isSameDay(next[j].date, cascadedDate);
          const jTargetSessions = getTargetSessionsForDay(
            j,
            sessionsCount,
            daysCount,
          );
          next[j] = {
            ...next[j],
            date: cascadedDate,
            sessions: dateChanged
              ? Array(jTargetSessions).fill(null)
              : next[j].sessions,
            selectedSlots: dateChanged ? [] : next[j].selectedSlots,
          };
        }
      }

      const targetSlotsForDay = maxDaySessions * slotsNeeded;

      if (
        day.selectedSlots.length >= targetSlotsForDay &&
        dayIdx < daysCount - 1
      ) {
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
            setActiveSessionSlotIndex(0);
          }, 300);
        }
      }

      return next;
    });

    return true;
  };

  const handleSlotClick = (slot, dayIdx) => {
    const date = days[dayIdx]?.date || exploringDate || startOfToday();
    applySlotToSession(slot, dayIdx, date);
  };

  const handleTimeSelect = (slot, dayIdx) => {
    handleSlotClick(slot, dayIdx);
  };

  const handleClearDaySessions = (dayIdx) => {
    setDays((prev) => {
      const next = [...prev];
      const targetDaySessions = getTargetSessionsForDay(
        dayIdx,
        sessionsCount,
        daysCount,
      );
      next[dayIdx] = {
        ...next[dayIdx],
        sessions: Array(targetDaySessions).fill(null),
        selectedSlots: [],
      };
      return next;
    });
    setActiveSessionSlotIndex(0);
  };

  const handleRemoveSession = (dayIdx, sessIdx) => {
    setDays((prev) => {
      const next = [...prev];
      const day = { ...next[dayIdx] };
      const maxDaySessions = getTargetSessionsForDay(
        dayIdx,
        sessionsCount,
        daysCount,
      );
      const currentSessions = Array.isArray(day.sessions)
        ? [...day.sessions]
        : Array.from({ length: maxDaySessions }).map((_, s) => {
            const chunk = (day.selectedSlots || []).slice(
              s * slotsNeeded,
              (s + 1) * slotsNeeded,
            );
            return chunk.length === slotsNeeded ? chunk : null;
          });

      currentSessions[sessIdx] = null;
      day.sessions = currentSessions;
      day.selectedSlots = currentSessions.filter(Boolean).flat();
      next[dayIdx] = day;
      return next;
    });
    setActiveSessionSlotIndex(sessIdx);
  };

  const canPickSession = (idx) => idx === 0 || Boolean(days[idx - 1]?.date);

  const totalSelectedSessions = days.reduce(
    (sum, d) =>
      sum +
      (Array.isArray(d.sessions)
        ? d.sessions.filter((s) => s && s.length === slotsNeeded).length
        : Math.floor((d.selectedSlots?.length || 0) / slotsNeeded)),
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

    const effectiveGuest = getEffectiveGuest();
    const patientGender = normalizeGender(effectiveGuest);

    let invalidSlotFound = null;
    let isGenderMismatch = false;

    const allScheduledSessions = [];

    days.forEach((day, dIdx) => {
      const dDate = day.date || days[0]?.date;
      const dDateStr = dDate
        ? format(dDate, "EEE, dd MMM yyyy")
        : `Day ${dIdx + 1}`;

      const dayTargetSessions = getTargetSessionsForDay(
        dIdx,
        sessionsCount,
        daysCount,
      );

      for (let sIdx = 0; sIdx < dayTargetSessions; sIdx++) {
        const sGroup =
          Array.isArray(day.sessions) && day.sessions[sIdx]
            ? day.sessions[sIdx]
            : (day.selectedSlots || []).slice(
                sIdx * slotsNeeded,
                (sIdx + 1) * slotsNeeded,
              );

        if (sGroup && sGroup.length > 0) {
          const startSlot = sGroup[0];
          const endSlot = sGroup[sGroup.length - 1];
          const timeStr = `${formatTime(startSlot.startTime)} - ${formatTime(endSlot.endTime)}`;

          const isRawDate =
            day.date && format(day.date, "yyyy-MM-dd") === activeDate;
          const rawStart =
            (isRawDate
              ? rawTherapySlots.find(
                  (r) =>
                    r.startTime === startSlot.startTime &&
                    (!startSlot.serviceRoomID ||
                      r.serviceRoomID === startSlot.serviceRoomID),
                )
              : null) || startSlot;

          const genderMsg =
            rawStart.genderMessage || startSlot.genderMessage || "";
          const isAllowed = sGroup.every((g) =>
            isSlotAllowedForGender(g, effectiveGuest),
          );
          const isAvail = isSlotAvailable(rawStart);

          if (!isAllowed) {
            invalidSlotFound = rawStart;
            isGenderMismatch = true;
          } else if (!isAvail && !invalidSlotFound) {
            invalidSlotFound = rawStart;
            isGenderMismatch = false;
          }

          allScheduledSessions.push({
            sessionNumber: allScheduledSessions.length + 1,
            dayNumber: dIdx + 1,
            dateStr: dDateStr,
            timeStr,
            genderMsg,
            serviceRoomID: rawStart.serviceRoomID || startSlot.serviceRoomID,
            roomName: rawStart.roomName || startSlot.roomName,
            roomNumber: rawStart.roomNumber || startSlot.roomNumber,
            isAllowed,
            isAvail,
            isValid: isAllowed && isAvail,
          });
        }
      }
    });

    const firstSession = allScheduledSessions[0] || {};
    const firstDay = days[0];
    const dateFormatted = firstDay?.date
      ? format(firstDay.date, "EEE, dd MMM yyyy")
      : "Selected Date";

    const targetSession =
      allScheduledSessions.find((s) => !s.isValid) || firstSession;

    const timeFormatted =
      allScheduledSessions.length > 1
        ? allScheduledSessions
            .map((s) => `Session ${s.sessionNumber}: ${s.timeStr}`)
            .join(", ")
        : targetSession.timeStr || "";

    const dynamicRoomName = targetSession.roomName || "";
    const dynamicRoomNumber = targetSession.roomNumber || "";
    const dynamicServiceRoomId =
      targetSession.serviceRoomID ||
      item?.serviceRoomId ||
      item?.serviceRoomID ||
      "";

    let roomDisplay = "";
    let roomFieldLabel = "Slot Type";

    if (dynamicRoomName) {
      roomDisplay = dynamicRoomName;
      roomFieldLabel = "Room";
    } else if (dynamicRoomNumber) {
      roomDisplay = `Room ${dynamicRoomNumber}`;
      roomFieldLabel = "Room";
    } else if (dynamicServiceRoomId) {
      roomDisplay = `Room ${dynamicServiceRoomId}`;
      roomFieldLabel = "Room";
    } else {
      roomDisplay = "Available Slot";
      roomFieldLabel = "Status";
    }

    const rawPatientName =
      effectiveGuest?.label?.replace(/\s*\([^)]*\)$/, "") ||
      effectiveGuest?.firstName ||
      "Guest";
    const patientLabel = `${rawPatientName} (${patientGender || "Not Specified"})`;

    const isValidationPassed =
      !invalidSlotFound && allScheduledSessions.every((s) => s.isValid);

    let validationMessage = "";
    if (isValidationPassed) {
      validationMessage = `Booking allowed: All ${allScheduledSessions.length} session${
        allScheduledSessions.length > 1 ? "s are" : " is"
      } valid for ${patientLabel}.`;
    } else if (isGenderMismatch) {
      validationMessage = NO_ROOM_MESSAGE;
    } else {
      validationMessage = "Selected slot is unavailable or fully booked.";
    }

    setConfirmModalData({
      dateStr: dateFormatted,
      timeStr: timeFormatted,
      roomStr: roomDisplay,
      roomLabel: roomFieldLabel,
      patientStr: patientLabel,
      sessionsList: allScheduledSessions,
      isValid: isValidationPassed,
      validationMsg: validationMessage,
    });

    if (!isValidationPassed) {
      errorAlert(validationMessage);
      setOpenConfirmationModal(true);
      return;
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
        targetSession?.serviceRoomID ||
        item?.serviceRoomId ||
        item?.serviceRoomID ||
        1,
      totalAmount: total,
      RoomFrequency: isCustomFrequency
        ? "Custom"
        : frequency === 2
          ? "Alternate Day"
          : frequency === 7
            ? "Weekly"
            : typeof frequency === "string"
              ? frequency
              : "Daily",
      NumberOfSessions: sessionsCount,
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
            ServiceRoomID: slot.serviceRoomID,
          };
        }),
      ),
    };
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
              setGuestGenderOverride(null);
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
    setGuestGenderOverride(null);
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
                        const targetDaySessions = getTargetSessionsForDay(
                          idx,
                          sessionsCount,
                          daysCount,
                        );
                        const completedDaySessions = Math.floor(
                          (schedule.selectedSlots?.length || 0) / slotsNeeded,
                        );
                        const isDayComplete =
                          completedDaySessions >= targetDaySessions;

                        return (
                          <div
                            key={idx}
                            className={
                              isLocked ? "opacity-40 pointer-events-none" : ""
                            }
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-1.5 text-ayuMid font-black text-[10px] uppercase tracking-widest">
                                <EventAvailable style={{ fontSize: 12 }} />
                                <span>Day {idx + 1}</span>
                                <span className="text-gray-300 font-normal">
                                  •
                                </span>
                                <span className="text-gray-600 font-bold normal-case">
                                  {targetDaySessions}{" "}
                                  {targetDaySessions === 1
                                    ? "Session"
                                    : "Sessions"}
                                </span>
                              </div>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  isDayComplete
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    : completedDaySessions > 0
                                      ? "bg-amber-50 text-amber-700 border-amber-200"
                                      : "bg-gray-100 text-gray-500 border-gray-200"
                                }`}
                              >
                                {completedDaySessions} of {targetDaySessions}{" "}
                                scheduled
                              </span>
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

                                {completedDaySessions > 0 && schedule.date && (
                                  <div className="mb-2.5 p-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200 flex items-center justify-between gap-2 text-xs">
                                    <div className="flex items-center gap-2 text-emerald-900 font-medium min-w-0">
                                      <CheckCircleOutline
                                        sx={{ fontSize: 16 }}
                                        className="text-emerald-700 shrink-0"
                                      />
                                      <span className="truncate">
                                        All sessions for Day {idx + 1} are
                                        scheduled on{" "}
                                        <strong className="font-bold">
                                          {format(
                                            schedule.date,
                                            "EEEE, MMMM d, yyyy",
                                          )}
                                        </strong>
                                        .
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            `Changing the date for Day ${idx + 1} will clear the currently scheduled sessions for this day so you can choose new times on the new date. Proceed?`,
                                          )
                                        ) {
                                          handleClearDaySessions(idx);
                                        }
                                      }}
                                      className="text-[10px] font-bold text-amber-800 bg-white hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300 transition-all shrink-0"
                                    >
                                      Change Day Date
                                    </button>
                                  </div>
                                )}

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
                                    const isOtherDateBlocked =
                                      completedDaySessions > 0 &&
                                      schedule.date &&
                                      !isSameDay(date, schedule.date);
                                    const isDisabled = seqMode
                                      ? !isSameDay(date, seqDate)
                                      : isOtherDateBlocked ||
                                        isBefore(date, minDateForSession);

                                    const activeTargetDate =
                                      activePickerIndex === idx && exploringDate
                                        ? exploringDate
                                        : schedule.date;

                                    const isSelected =
                                      activeTargetDate &&
                                      isSameDay(date, activeTargetDate);

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

                                {targetDaySessions > 1 && (
                                  <div className="mb-3 p-2.5 rounded-xl bg-white/90 border border-[#e4ebdd]">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-ayuTulsi flex items-center gap-1.5">
                                        <span>Sessions for Day {idx + 1}</span>
                                        <span className="text-gray-400 font-normal">
                                          ({completedDaySessions} of{" "}
                                          {targetDaySessions} scheduled)
                                        </span>
                                      </span>
                                      <span className="text-[10px] text-gray-400 hidden sm:inline">
                                        Tap a session to select or change time
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                      {Array.from({
                                        length: targetDaySessions,
                                      }).map((_, sIdx) => {
                                        const sGroup = Array.isArray(
                                          schedule.sessions,
                                        )
                                          ? schedule.sessions[sIdx]
                                          : (
                                              schedule.selectedSlots || []
                                            ).slice(
                                              sIdx * slotsNeeded,
                                              (sIdx + 1) * slotsNeeded,
                                            );
                                        const isSessDone =
                                          sGroup &&
                                          sGroup.length === slotsNeeded;
                                        const isSessActive =
                                          activeSessionSlotIndex === sIdx;

                                        return (
                                          <button
                                            key={sIdx}
                                            type="button"
                                            onClick={() =>
                                              setActiveSessionSlotIndex(sIdx)
                                            }
                                            className={`p-2.5 rounded-xl text-left transition-all border flex flex-col gap-0.5 active:scale-95 ${
                                              isSessActive
                                                ? "bg-ayuMid text-white border-ayuMid shadow-xs ring-2 ring-ayuMid/30"
                                                : isSessDone
                                                  ? "bg-emerald-50/80 text-emerald-900 border-emerald-200 hover:bg-emerald-100"
                                                  : "bg-white text-gray-600 border-dashed border-amber-300 hover:border-ayuMid"
                                            }`}
                                          >
                                            <div className="flex items-center justify-between">
                                              <span className="text-[10px] font-bold uppercase tracking-tight">
                                                Session {sIdx + 1}
                                              </span>
                                              {isSessDone ? (
                                                <span
                                                  className={`text-[9px] font-bold ${
                                                    isSessActive
                                                      ? "text-white/90"
                                                      : "text-emerald-700"
                                                  }`}
                                                >
                                                  ✓ Set
                                                </span>
                                              ) : (
                                                <span className="text-[9px] font-bold text-amber-700 italic">
                                                  Choose
                                                </span>
                                              )}
                                            </div>
                                            <span
                                              className={`text-xs font-semibold truncate ${
                                                isSessActive
                                                  ? "text-white"
                                                  : isSessDone
                                                    ? "text-emerald-800"
                                                    : "text-gray-400"
                                              }`}
                                            >
                                              {isSessDone
                                                ? `${formatTime(sGroup[0].startTime)} - ${formatTime(
                                                    sGroup[sGroup.length - 1]
                                                      .endTime,
                                                  )}`
                                                : "Tap time slot below"}
                                            </span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}

                                <div className="flex items-center justify-between mb-2.5">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[#6d8a7c] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                      <AccessTime sx={{ fontSize: 13 }} />
                                      Available Time Slots
                                    </span>
                                    {targetDaySessions > 1 && (
                                      <span className="text-[10px] font-bold text-ayuTulsi bg-[#e8ede4] px-2 py-0.5 rounded border border-[#d6dfd0]">
                                        Selecting Session{" "}
                                        {activeSessionSlotIndex + 1}
                                      </span>
                                    )}
                                  </div>
                                  {therapySlots.length > 0 && (
                                    <span className="text-[10px] font-bold text-ayuMid bg-[#f0f4ef] px-2.5 py-0.5 rounded-full border border-[#e4ebdd]">
                                      {
                                        therapySlots.filter(
                                          (s) => s.isSelectableForPatient,
                                        ).length
                                      }{" "}
                                      available
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
                                      const matchesTime = (timeA, timeB) => {
                                        if (!timeA || !timeB) return false;
                                        if (timeA === timeB) return true;
                                        return (
                                          String(timeA).trim().slice(0, 5) ===
                                          String(timeB).trim().slice(0, 5)
                                        );
                                      };

                                      let assignedSessionIdx = -1;
                                      let matchedSlotInfo = null;

                                      if (Array.isArray(schedule.sessions)) {
                                        assignedSessionIdx =
                                          schedule.sessions.findIndex(
                                            (sess) =>
                                              sess &&
                                              sess.some((sg) => {
                                                if (
                                                  matchesTime(
                                                    sg.startTime,
                                                    slot.startTime,
                                                  )
                                                ) {
                                                  matchedSlotInfo = sg;
                                                  return true;
                                                }
                                                return false;
                                              }),
                                          );
                                      }

                                      if (
                                        assignedSessionIdx < 0 &&
                                        (schedule.selectedSlots || []).length >
                                          0
                                      ) {
                                        for (
                                          let s = 0;
                                          s <
                                          Math.floor(
                                            schedule.selectedSlots.length /
                                              slotsNeeded,
                                          );
                                          s++
                                        ) {
                                          const sGroup =
                                            schedule.selectedSlots.slice(
                                              s * slotsNeeded,
                                              (s + 1) * slotsNeeded,
                                            );
                                          if (
                                            sGroup.some((sg) => {
                                              if (
                                                matchesTime(
                                                  sg.startTime,
                                                  slot.startTime,
                                                )
                                              ) {
                                                matchedSlotInfo = sg;
                                                return true;
                                              }
                                              return false;
                                            })
                                          ) {
                                            assignedSessionIdx = s;
                                            break;
                                          }
                                        }
                                      }

                                      const isSelectedByThisDay =
                                        assignedSessionIdx >= 0;

                                      const effectiveGuest =
                                        getEffectiveGuest();
                                      const patientGender =
                                        normalizeGender(effectiveGuest);

                                      const hasGenderConflict =
                                        isSelectedByThisDay &&
                                        matchedSlotInfo &&
                                        !isTherapySlotSelectable(
                                          matchedSlotInfo,
                                          effectiveGuest,
                                        ) &&
                                        !isSlotAllowedForGender(
                                          matchedSlotInfo,
                                          patientGender,
                                        );

                                      return (
                                        <button
                                          key={i}
                                          type="button"
                                          onClick={() => {
                                            if (isSelectedByThisDay) {
                                              handleRemoveSession(
                                                idx,
                                                assignedSessionIdx,
                                              );
                                              successAlert("Slot unselected.");
                                              return;
                                            }

                                            handleSlotClick(slot, idx);
                                          }}
                                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                                            isSelectedByThisDay
                                              ? hasGenderConflict
                                                ? "bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-400"
                                                : "bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-500/50"
                                              : "bg-white text-gray-700 border-emerald-500 hover:border-emerald-700 hover:bg-emerald-50/50"
                                          }`}
                                        >
                                          <span>
                                            {formatTime(slot.startTime)}
                                            {slot.endTime
                                              ? ` - ${formatTime(slot.endTime)}`
                                              : ""}
                                          </span>
                                          {isSelectedByThisDay && (
                                            <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-white/20 text-white shrink-0">
                                              {hasGenderConflict && "Re-select"}
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

                                <div className="mt-2.5 pt-2 border-t border-[#e4ebdd] flex flex-wrap items-center gap-4 text-[10px] text-gray-600">
                                  <span className="flex items-center gap-1.5 font-medium">
                                    <span className="w-3.5 h-3.5 rounded border-2 border-emerald-500 bg-emerald-50 inline-block" />
                                    <span>Selectable slot</span>
                                  </span>
                                  <span className="flex items-center gap-1.5 font-medium text-gray-400">
                                    <span className="w-3.5 h-3.5 rounded border border-gray-200 bg-gray-100 flex items-center justify-center text-gray-400">
                                      <Block sx={{ fontSize: 9 }} />
                                    </span>
                                    <span>Unavailable</span>
                                  </span>
                                </div>

                                <div className="mt-3 flex flex-col gap-2">
                                  {Array.from({
                                    length: targetDaySessions,
                                  }).map((_, sIdx) => {
                                    const sGroup = Array.isArray(
                                      schedule.sessions,
                                    )
                                      ? schedule.sessions[sIdx]
                                      : (schedule.selectedSlots || []).slice(
                                          sIdx * slotsNeeded,
                                          (sIdx + 1) * slotsNeeded,
                                        );
                                    const isSessDone =
                                      sGroup && sGroup.length === slotsNeeded;
                                    const isSessActive =
                                      activeSessionSlotIndex === sIdx;

                                    if (isSessDone) {
                                      return (
                                        <div
                                          key={sIdx}
                                          className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between gap-3"
                                        >
                                          <div className="flex items-center gap-2.5 min-w-0">
                                            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                              <CheckCircleOutline
                                                sx={{ fontSize: 16 }}
                                              />
                                            </div>
                                            <div className="min-w-0">
                                              <div className="text-xs font-bold text-gray-800 flex items-center gap-1.5 flex-wrap">
                                                {targetDaySessions > 1 && (
                                                  <span className="text-[10px] font-bold uppercase tracking-wider text-ayuTulsi bg-white px-2 py-0.5 rounded border border-[#e4ebdd]">
                                                    Session {sIdx + 1}
                                                  </span>
                                                )}
                                                <span>
                                                  {formatTime(
                                                    sGroup[0].startTime,
                                                  )}
                                                  {sGroup[sGroup.length - 1]
                                                    ?.endTime
                                                    ? ` - ${formatTime(sGroup[sGroup.length - 1].endTime)}`
                                                    : ""}
                                                </span>
                                                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
                                                  {durationNum} min session
                                                </span>
                                              </div>
                                              <div className="text-[11px] text-gray-500 font-medium truncate">
                                                {schedule.date
                                                  ? format(
                                                      schedule.date,
                                                      "EEEE, MMMM d, yyyy",
                                                    )
                                                  : "Selected Date"}
                                              </div>
                                              {selectedGuest &&
                                                normalizeGender(
                                                  getEffectiveGuest(),
                                                ) &&
                                                !isSlotAllowedForGender(
                                                  sGroup[0],
                                                  getEffectiveGuest(),
                                                ) && (
                                                  <div className="mt-1 text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded flex items-center gap-1">
                                                    <Block
                                                      sx={{ fontSize: 11 }}
                                                    />
                                                    This time is no longer
                                                    available for the selected
                                                    guest. Please choose another
                                                    time.
                                                  </div>
                                                )}
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-2 shrink-0">
                                            {targetDaySessions > 1 && (
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  setActiveSessionSlotIndex(
                                                    sIdx,
                                                  )
                                                }
                                                className="text-[10px] font-bold text-ayuMid bg-white hover:bg-ayuMid/10 px-2 py-1 rounded border border-[#e4ebdd] transition-all"
                                              >
                                                Change
                                              </button>
                                            )}
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleRemoveSession(idx, sIdx)
                                              }
                                              className="text-[10px] font-bold text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2 py-1 rounded transition-colors"
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        </div>
                                      );
                                    }

                                    return (
                                      <div
                                        key={sIdx}
                                        onClick={() =>
                                          setActiveSessionSlotIndex(sIdx)
                                        }
                                        className={`p-3 rounded-xl border border-dashed flex items-center justify-between gap-2 cursor-pointer transition-all ${
                                          isSessActive
                                            ? "bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/40"
                                            : "bg-white/80 border-[#e4ebdd] hover:border-ayuMid"
                                        }`}
                                      >
                                        <div className="flex items-center gap-2.5">
                                          <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                                            <InfoOutlined
                                              sx={{ fontSize: 16 }}
                                            />
                                          </div>
                                          <div>
                                            <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                                                Session {sIdx + 1} of{" "}
                                                {targetDaySessions}
                                              </span>
                                              <span>Not scheduled yet</span>
                                            </div>
                                            <div className="text-[11px] text-gray-500 font-medium">
                                              Tap an available time slot above (
                                              {durationNum} min required)
                                            </div>
                                          </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-ayuMid bg-white px-2.5 py-1 rounded-lg border border-ayuMid/30 shrink-0">
                                          Select Slot
                                        </span>
                                      </div>
                                    );
                                  })}
                                </div>

                                <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#e4ebdd]">
                                  <span className="text-[11px] font-medium text-gray-600">
                                    {completedDaySessions >=
                                    targetDaySessions ? (
                                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                                        <CheckCircleOutline
                                          sx={{ fontSize: 14 }}
                                        />
                                        All {targetDaySessions} session
                                        {targetDaySessions > 1 ? "s" : ""}{" "}
                                        scheduled
                                      </span>
                                    ) : (
                                      <span className="text-amber-700 font-semibold">
                                        {targetDaySessions -
                                          completedDaySessions}{" "}
                                        session
                                        {targetDaySessions -
                                          completedDaySessions >
                                        1
                                          ? "s"
                                          : ""}{" "}
                                        left to schedule for Day {idx + 1}
                                      </span>
                                    )}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    {completedDaySessions > 0 && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          handleClearDaySessions(idx);
                                          successAlert(
                                            `Day ${idx + 1} sessions reset.`,
                                          );
                                        }}
                                        className="text-[10px] font-bold text-gray-600 hover:text-rose-600 bg-white hover:bg-rose-50 px-2.5 py-1.5 rounded-lg border border-gray-200 transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                                      >
                                        <Refresh sx={{ fontSize: 13 }} />
                                        Reset Slots
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (
                                          completedDaySessions <
                                          targetDaySessions
                                        ) {
                                          const firstIncomplete = Array.from({
                                            length: targetDaySessions,
                                          }).findIndex((_, s) => {
                                            const sGroup = Array.isArray(
                                              schedule.sessions,
                                            )
                                              ? schedule.sessions[s]
                                              : (
                                                  schedule.selectedSlots || []
                                                ).slice(
                                                  s * slotsNeeded,
                                                  (s + 1) * slotsNeeded,
                                                );
                                            return (
                                              !sGroup ||
                                              sGroup.length < slotsNeeded
                                            );
                                          });
                                          if (firstIncomplete >= 0) {
                                            setActiveSessionSlotIndex(
                                              firstIncomplete,
                                            );
                                          }
                                        } else if (idx < daysCount - 1) {
                                          const nextIdx = idx + 1;
                                          const nextDate =
                                            days[nextIdx]?.date ||
                                            (schedule.date
                                              ? addDays(
                                                  schedule.date,
                                                  !isCustomFrequency &&
                                                    typeof frequency ===
                                                      "number"
                                                    ? frequency
                                                    : 1,
                                                )
                                              : null);
                                          setActivePickerIndex(nextIdx);
                                          setActiveSessionSlotIndex(0);
                                          if (nextDate)
                                            setExploringDate(nextDate);
                                        } else {
                                          const guestNow = getEffectiveGuest();
                                          const takenKeys = new Set();
                                          let blocked = false;

                                          const nextDays = days.map((d) => {
                                            if (
                                              !d.date ||
                                              !Array.isArray(d.sessions)
                                            )
                                              return d;
                                            const dk = format(
                                              d.date,
                                              "yyyy-MM-dd",
                                            );
                                            const { sessions, cleared } =
                                              reassignSessionRooms({
                                                sessions: d.sessions,
                                                rawSlots:
                                                  dk === activeDate
                                                    ? rawTherapySlots
                                                    : null,
                                                guest: guestNow,
                                                dateKey: dk,
                                                takenKeys,
                                              });
                                            if (cleared.length) blocked = true;
                                            return {
                                              ...d,
                                              sessions,
                                              selectedSlots: sessions
                                                .filter(Boolean)
                                                .flat(),
                                            };
                                          });

                                          setDays(nextDays);

                                          if (blocked) {
                                            errorAlert(NO_ROOM_MESSAGE);
                                            return;
                                          }
                                          setActivePickerIndex(null);
                                        }
                                      }}
                                      className={`font-bold text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all ${
                                        completedDaySessions >=
                                        targetDaySessions
                                          ? "bg-ayuMid text-white hover:bg-ayuTulsi shadow-xs cursor-pointer"
                                          : "text-ayuMid hover:underline cursor-pointer"
                                      }`}
                                    >
                                      {completedDaySessions < targetDaySessions
                                        ? `Schedule Session ${completedDaySessions + 1}`
                                        : idx < daysCount - 1
                                          ? "Next Day →"
                                          : "Done ✓"}
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            ) : (
                              <div
                                onClick={() => {
                                  if (!isLocked) {
                                    setActivePickerIndex(idx);
                                    setActiveSessionSlotIndex(0);
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
                                    <span
                                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                        isDayComplete
                                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                          : completedDaySessions > 0
                                            ? "bg-amber-50 text-amber-700 border-amber-200"
                                            : "bg-gray-100 text-gray-500 border-gray-200"
                                      }`}
                                    >
                                      {completedDaySessions} of{" "}
                                      {targetDaySessions} Scheduled
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                                    {completedDaySessions > 0 ? (
                                      Array.from({
                                        length: targetDaySessions,
                                      }).map((_, s) => {
                                        const sGroup = Array.isArray(
                                          schedule.sessions,
                                        )
                                          ? schedule.sessions[s]
                                          : (
                                              schedule.selectedSlots || []
                                            ).slice(
                                              s * slotsNeeded,
                                              (s + 1) * slotsNeeded,
                                            );
                                        if (
                                          !sGroup ||
                                          sGroup.length < slotsNeeded
                                        )
                                          return null;
                                        return (
                                          <span
                                            key={s}
                                            className="text-ayuMid font-semibold bg-[#f0f4ef] px-2 py-0.5 rounded border border-[#e4ebdd]"
                                          >
                                            {targetDaySessions > 1
                                              ? `Session ${s + 1}: `
                                              : ""}
                                            {formatTime(sGroup[0].startTime)} -{" "}
                                            {formatTime(
                                              sGroup[sGroup.length - 1].endTime,
                                            )}
                                          </span>
                                        );
                                      })
                                    ) : (
                                      <span className="text-amber-600 font-bold">
                                        Tap to schedule sessions
                                      </span>
                                    )}
                                    {!isDayComplete &&
                                      completedDaySessions > 0 && (
                                        <span className="text-amber-600 font-bold italic">
                                          (Tap to schedule remaining)
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
                          Guest Gender :
                        </span>
                        <span className="text-xs font-bold text-ayuTulsi capitalize">
                          {getEffectiveGuest()?.gender || "Not specified"}
                        </span>
                      </div>
                      {days.some((d) => d.selectedSlots.length > 0) &&
                        (() => {
                          const eff = getEffectiveGuest();
                          const allPassed = days.every((d) =>
                            d.selectedSlots.every((s) =>
                              isTherapySlotSelectable(s, eff),
                            ),
                          );
                          return allPassed ? (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                              <CheckCircleOutline sx={{ fontSize: 13 }} />
                              Schedule confirmed for guest
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 flex items-center gap-1">
                              <ErrorOutline sx={{ fontSize: 13 }} />
                              Please re-select time slot
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
                      {days.some(
                        (d) => d.selectedSlots && d.selectedSlots.length > 0,
                      ) ? (
                        days.flatMap((d, dIdx) => {
                          const targetDSessions = getTargetSessionsForDay(
                            dIdx,
                            sessionsCount,
                            daysCount,
                          );
                          const items = [];
                          for (let s = 0; s < targetDSessions; s++) {
                            const sGroup = Array.isArray(d.sessions)
                              ? d.sessions[s]
                              : (d.selectedSlots || []).slice(
                                  s * slotsNeeded,
                                  (s + 1) * slotsNeeded,
                                );
                            if (sGroup && sGroup.length === slotsNeeded) {
                              items.push(
                                <div
                                  key={`${dIdx}-sess-${s}`}
                                  className="flex flex-col items-end gap-0.5"
                                >
                                  <span className="text-ayuMid text-[10px] bg-white px-2 py-0.5 rounded border border-ayuMid/20 font-bold flex items-center gap-1">
                                    <span>
                                      {d.date
                                        ? format(d.date, "MMM d")
                                        : `Day ${dIdx + 1}`}
                                    </span>
                                    <span className="text-gray-300">•</span>
                                    {targetDSessions > 1 && (
                                      <span className="text-ayuTulsi">
                                        Session {s + 1}:
                                      </span>
                                    )}
                                    <span>
                                      {formatTime(sGroup[0].startTime)} -{" "}
                                      {formatTime(
                                        sGroup[sGroup.length - 1].endTime,
                                      )}
                                    </span>
                                  </span>
                                </div>,
                              );
                            } else {
                              items.push(
                                <div
                                  key={`${dIdx}-pending-${s}`}
                                  className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[10px] font-semibold flex items-center gap-1"
                                >
                                  <span>
                                    {d.date
                                      ? format(d.date, "MMM d")
                                      : `Day ${dIdx + 1}`}
                                  </span>
                                  <span className="text-amber-300">•</span>
                                  <span>
                                    {targetDSessions > 1
                                      ? `Session ${s + 1}`
                                      : "Session"}{" "}
                                    pending
                                  </span>
                                </div>,
                              );
                            }
                          }
                          return items;
                        })
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

              {!allScheduled && (
                <div className="text-[11px] text-amber-700 bg-amber-50/80 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1.5 font-medium">
                  <InfoOutlined
                    sx={{ fontSize: 14 }}
                    className="text-amber-600 shrink-0"
                  />
                  <span>
                    {totalSelectedSessions < sessionsCount
                      ? `Please schedule the remaining ${sessionsCount - totalSelectedSessions} session(s) above to confirm booking.`
                      : !selectedGuest
                        ? "Please select a guest above to confirm booking."
                        : "Please complete all day and slot selections to confirm booking."}
                  </span>
                </div>
              )}

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

      {openConfirmationModal && confirmModalData ? (
        <Modal
          open={openConfirmationModal}
          onClose={() => {
            if (cancelPaymentRef.current) {
              cancelPaymentRef.current();
              cancelPaymentRef.current = null;
            }
            setIsPaymentPending(false);
            setOpenConfirmationModal(false);
          }}
          className="flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 font-serif">
                Confirm Booking
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsPaymentPending(false);
                  setOpenConfirmationModal(false);
                }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg cursor-pointer"
              >
                <Close fontSize="small" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div className="grid grid-cols-[80px_1fr] gap-2 text-sm">
                <span className="text-gray-500 font-medium">Patient</span>
                <span className="text-gray-900 font-semibold">
                  : {confirmModalData.patientStr}
                </span>
                <span className="text-gray-500 font-medium">Date</span>
                <span className="text-gray-900 font-semibold">
                  : {confirmModalData.dateStr}
                </span>
              </div>

              {confirmModalData?.sessionsList && (
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <div className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center justify-between">
                    <span>Scheduled Sessions</span>
                    <span className="text-ayuMid font-semibold">
                      {confirmModalData.sessionsList.length} Sessions
                    </span>
                  </div>
                  <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
                    {confirmModalData.sessionsList.map((sess) => (
                      <div
                        key={sess.sessionNumber}
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs ${
                          sess.isValid
                            ? "bg-[#f8faf7] border-[#d4e8c2]"
                            : "bg-rose-50 border-rose-200"
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-gray-900 flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-ayuMid text-white shrink-0">
                              Session {sess.sessionNumber}
                            </span>
                            <span>{sess.timeStr}</span>
                          </div>
                          <div className="text-[11px] text-gray-500 font-medium mt-0.5 truncate">
                            {sess.dateStr}
                          </div>
                        </div>
                        <div className="shrink-0">
                          {sess.isValid ? (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                              ✓ Valid
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                              Unavailable
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!confirmModalData.isValid && (
                <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-rose-800 text-xs font-semibold">
                  <ErrorOutline
                    className="text-rose-600 shrink-0"
                    fontSize="small"
                  />
                  <span>{confirmModalData.validationMsg}</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpenConfirmationModal(false)}
                className="px-4 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!confirmModalData.isValid || isPaymentPending}
                onClick={initiateBookingPayment}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all shadow-sm cursor-pointer ${
                  confirmModalData.isValid
                    ? "bg-emerald-700 text-white hover:bg-emerald-800"
                    : "bg-rose-300 text-white cursor-not-allowed opacity-75"
                }`}
              >
                {isPaymentPending ? "Processing..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        <ConfirmationModal
          confirmationOpen={openConfirmationModal}
          confirmationLabel="Confirm Therapy Booking"
          confirmationMsg={`Are you sure you want to book ${sessionsCount} session(s) of ${item?.serviceName}? Total Amount: ₹${total.toLocaleString()}`}
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
      )}
    </>
  );
}
