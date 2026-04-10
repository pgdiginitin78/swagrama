import {
  AccessTime,
  ChevronLeft,
  ChevronRight,
  EventAvailable,
  PersonOutline,
  ReceiptLong,
} from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isBefore,
  isSameDay,
  startOfMonth,
  startOfToday,
  subMonths,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../context/AuthContext";
import { getPatientDataByMobileNo } from "../../../../services/bookAppointment/BookAppointmentServices";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import DropdownField from "../../../common/formFields/DropdownField";
import { ModalStyle } from "../../../common/modalStyle/ModalStyle";

const TIMES = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
];

export default function BookTherapySession({ open, onClose, item }) {
  const backdropRef = useRef(null);
  const [sessionsCount, setSessionsCount] = useState(1);
  const [schedules, setSchedules] = useState([
    { date: startOfToday(), time: null },
  ]);
  const [activePickerIndex, setActivePickerIndex] = useState(0);
  const [calendarBaseDate, setCalendarBaseDate] = useState(startOfToday());
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [genderPreference, setGenderPreference] = useState("No Preference");
  const [patientOptions, setPatientOptions] = useState([]);

  const { user } = useAuth();
  const { control } = useForm({ defaultValues: { selectGuest: null } });

  useEffect(() => {
    if (sessionsCount > 0) {
      setSchedules((prev) => {
        const next = [...prev];
        if (next.length === 0) next.push({ date: startOfToday(), time: null });
        while (next.length < sessionsCount)
          next.push({ date: null, time: null });
        next.length = sessionsCount;
        return next;
      });
    } else {
      setSchedules([]);
      setActivePickerIndex(null);
    }
  }, [sessionsCount]);

  useEffect(() => {
    if (!user) return;
    getPatientDataByMobileNo(user?.mobileNo, 5)
      .then((res) => {
        const data = res?.data?.data;
        if (data?.length) {
          setPatientOptions(
            data.map((d) => ({
              ...d,
              id: d.userId,
              value: d.userId,
              label: `${d.firstName} ${d.lastName}`,
            })),
          );
        }
      })
      .catch(() => {});
  }, [user]);

  if (!open || !item) return null;

  const priceParsed = parseInt(String(item.price).replace(/[^0-9]/g, "")) || 0;
  const subTotal = priceParsed * sessionsCount;
  const taxes = Math.round(subTotal * 0.1);
  const total = subTotal + taxes;
  const shortServiceName =
    item?.serviceName?.split(" ").slice(0, 3).join(" ") || "Therapy";

  const visibleDates = eachDayOfInterval({
    start: startOfMonth(calendarBaseDate),
    end: endOfMonth(calendarBaseDate),
  });

  const handleSessionChange = (val) => {
    const n = Math.max(0, Math.min(20, parseInt(val) || 0));
    setSessionsCount(n);
  };

  const nextMonth = () => setCalendarBaseDate(addMonths(calendarBaseDate, 1));
  const prevMonth = () => {
    const prev = subMonths(calendarBaseDate, 1);
    if (!isBefore(endOfMonth(prev), startOfToday())) setCalendarBaseDate(prev);
  };

  const handleDateSelect = (date, idx) => {
    const next = [...schedules];
    next[idx] = { ...next[idx], date };
    setSchedules(next);
  };

  const handleTimeSelect = (time, idx) => {
    const next = [...schedules];
    next[idx] = { ...next[idx], time };
    setSchedules(next);
    if (schedules[idx]?.date) {
      setActivePickerIndex(idx < sessionsCount - 1 ? idx + 1 : null);
    }
  };

  const canPickSession = (idx) =>
    idx === 0 || (schedules[idx - 1]?.date && schedules[idx - 1]?.time);

  const allScheduled =
    sessionsCount > 0 && schedules.every((s) => s.date && s.time);

  return (
    <Modal open={open}>
      <Box
        sx={ModalStyle}
        ref={backdropRef}
        className="w-[96%] sm:w-[90%] md:w-[80%] lg:w-[65%] xl:w-[52%] max-h-[94vh] overflow-hidden rounded-[9px] bg-[#faf9f6] p-0 flex flex-col"
      >
        <div className="flex items-center justify-between md:px-4 md:pt-4 pb-3 border-b border-[#e8ede4] flex-shrink-0">
          <h1 className="font-serif text-ayuTulsi text-base sm:text-lg font-bold leading-tight">
            Book Therapy Session
          </h1>
          <CancelButtonModal onClick={onClose} />
        </div>

        <div className="overflow-y-auto flex-1 custom-scrollbar-wellness-stay">
          <div className="p-2 md:p-4 space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start bg-[#eef6e8] rounded-[9px] p-3 gap-3 border border-[#d4e8c2] shadow-sm"
            >
              <img
                src={item?.image}
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
                    45 Min
                  </span>
                  <span className="font-bold text-ayuTulsi text-sm">
                    ₹{priceParsed.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>

            <div>
              <span className="text-gray-500 text-[10px] font-bold mb-2 block uppercase tracking-widest">
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
                  min="0"
                  max="20"
                  placeholder="0"
                  value={sessionsCount === 0 ? "" : sessionsCount}
                  onChange={(e) => handleSessionChange(e.target.value)}
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

            <AnimatePresence>
              {sessionsCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <h3 className="font-serif text-ayuTulsi text-sm font-bold mb-3 border-l-4 border-ayuMid pl-3">
                    Choose Date & Time
                  </h3>
                  <div className="flex flex-col gap-3">
                    {schedules.map((schedule, idx) => {
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
                            <span>Session {idx + 1}</span>
                          </div>

                          {!isPicking && (!schedule.date || !schedule.time) ? (
                            <div
                              onClick={() =>
                                !isLocked && setActivePickerIndex(idx)
                              }
                              className="border border-dashed border-[#c4d4be] bg-white rounded-[9px] py-4 px-4 flex items-center justify-between cursor-pointer hover:bg-[#f9faf7] active:scale-[0.99] transition-all"
                            >
                              <span className="text-gray-400 text-xs font-medium">
                                Select schedule
                              </span>
                              <span className="text-ayuMid text-[10px] font-bold bg-[#eef6e8] px-3 py-1 rounded-full uppercase">
                                Choose
                              </span>
                            </div>
                          ) : isPicking ? (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
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

                              <div className="flex gap-2 overflow-x-auto pb-3 mb-3 custom-scrollbar-wellness-stay">
                                {visibleDates.map((date, i) => {
                                  const isDisabled = isBefore(
                                    date,
                                    startOfToday(),
                                  );
                                  const isSelected =
                                    schedule.date &&
                                    isSameDay(date, schedule.date);
                                  return (
                                    <button
                                      key={i}
                                      type="button"
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

                              <span className="text-[#6d8a7c] text-[10px] font-bold mb-2 block uppercase tracking-widest">
                                Available Slots
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {TIMES.map((t, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => handleTimeSelect(t, idx)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border active:scale-95
                                      ${
                                        schedule.time === t
                                          ? "bg-ayuMid text-white border-ayuMid"
                                          : "bg-white text-gray-500 border-[#e4ebdd] hover:border-ayuMid"
                                      }`}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                              <div className="mt-3 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => setActivePickerIndex(null)}
                                  className="text-ayuMid font-bold text-[11px] uppercase tracking-wider hover:underline"
                                >
                                  Done
                                </button>
                              </div>
                            </motion.div>
                          ) : (
                            <div
                              onClick={() => setActivePickerIndex(idx)}
                              className="bg-white border border-[#e4ebdd] rounded-2xl p-3 flex justify-between items-center cursor-pointer hover:shadow-sm active:scale-[0.99] transition-all"
                            >
                              <div className="flex flex-col">
                                <span className="text-gray-800 font-bold text-sm">
                                  {format(schedule.date, "MMM d, yyyy")}
                                </span>
                                <span className="text-ayuMid font-bold text-[11px] uppercase mt-0.5">
                                  {schedule.time || "No time selected"}
                                </span>
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
              </div>
            </div>

            <div>
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

            <div className="bg-[#f4f7f2] rounded-[9px] p-4 border border-[#e4ebdd]">
              <div className="flex items-center justify-between border-b border-ayuMid/20 pb-3 mb-3">
                <h3 className="font-serif text-ayuBrown text-sm font-bold">
                  Summary
                </h3>
                <ReceiptLong fontSize="small" className="text-ayuBrown" />
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
                    {schedules.length > 0 ? (
                      schedules.map((s, i) =>
                        s.date && s.time ? (
                          <span
                            key={i}
                            className="text-ayuMid text-[10px] bg-white px-2 py-0.5 rounded border border-ayuMid/20"
                          >
                            {format(s.date, "MMM d")} • {s.time}
                          </span>
                        ) : s.date ? (
                          <span key={i} className="text-gray-400 text-[10px]">
                            {format(s.date, "MMM d")} • No time
                          </span>
                        ) : null,
                      )
                    ) : (
                      <span className="text-gray-400 italic text-[10px]">
                        No sessions
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
                  <span>Taxes (10%)</span>
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
                label="Cancel"
                className={"border border-red-600 text-red-600 bg-red-100"}
                onClick={onClose}
              />
              <CommonButton
                type="button"
                label="Confirm Booking"
                disabled={!allScheduled}
                className="w-full bg-gradient-to-r from-ayuMid to-ayuTulsi text-white  text-sm   active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
