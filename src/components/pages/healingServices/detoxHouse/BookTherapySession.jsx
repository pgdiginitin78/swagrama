import React, { useRef, useState, useEffect } from "react";
import { Box, Modal } from "@mui/material";
import { ModalStyle } from "../../../common/modalStyle/ModalStyle";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  EventAvailable,
  PersonOutline,
  ReceiptLong,
  AccessTime,
  KeyboardArrowDown,
} from "@mui/icons-material";
import {
  format,
  startOfToday,
  isSameDay,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isBefore,
} from "date-fns";
import CommonButton from "../../../common/button/CommonButton";

export default function BookTherapySession({ open, onClose, item }) {
  const backdropRef = useRef(null);
  const [sessionsCount, setSessionsCount] = useState(1);
  const [schedules, setSchedules] = useState([
    { date: startOfToday(), time: null },
  ]);
  const [activePickerIndex, setActivePickerIndex] = useState(0);
  const [calendarBaseDate, setCalendarBaseDate] = useState(startOfToday());

  const [selectedGuest, setSelectedGuest] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [healthConcerns, setHealthConcerns] = useState("");
  const [genderPreference, setGenderPreference] = useState("No Preference");

  useEffect(() => {
    if (sessionsCount > 0) {
      setSchedules((prev) => {
        const newSchedules = [...prev];
        if (newSchedules.length === 0) {
          newSchedules.push({ date: startOfToday(), time: null });
        }
        if (newSchedules.length < sessionsCount) {
          for (let i = newSchedules.length; i < sessionsCount; i++) {
            newSchedules.push({ date: null, time: null });
          }
        } else if (newSchedules.length > sessionsCount) {
          newSchedules.length = sessionsCount;
        }
        return newSchedules;
      });
    } else {
      setSchedules([]);
      setActivePickerIndex(null);
    }
  }, [sessionsCount]);

  if (!open || !item) return null;

  const priceParsed = parseInt(String(item.price).replace(/[^0-9]/g, "")) || 0;
  const subTotal = priceParsed * sessionsCount;
  const taxes = subTotal * 0.1;
  const total = subTotal + taxes;

  const handleSessionChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 0) setSessionsCount(val);
    else if (e.target.value === "") setSessionsCount(0);
  };

  const nextMonth = () => setCalendarBaseDate(addMonths(calendarBaseDate, 1));
  const prevMonth = () => {
    const prev = subMonths(calendarBaseDate, 1);
    if (!isBefore(endOfMonth(prev), startOfToday())) setCalendarBaseDate(prev);
  };

  const visibleDates = eachDayOfInterval({
    start: startOfMonth(calendarBaseDate),
    end: endOfMonth(calendarBaseDate),
  });
  const times = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
  ];

  const handleDateSelect = (date, idx) => {
    const newSchedules = [...schedules];
    newSchedules[idx] = { ...newSchedules[idx], date };
    setSchedules(newSchedules);
  };

  const handleTimeSelect = (time, idx) => {
    const newSchedules = [...schedules];
    newSchedules[idx] = { ...newSchedules[idx], time };
    setSchedules(newSchedules);
  };

  const canPickSession = (idx) =>
    idx === 0 || (schedules[idx - 1]?.date && schedules[idx - 1]?.time);
  const shortServiceName =
    item?.serviceName?.split(" ").slice(0, 3).join(" ") || "Therapy";

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={ModalStyle}
        ref={backdropRef}
        className="w-[98%] md:w-[90%] lg:w-[85%] xl:w-[60%] max-h-[92vh] overflow-y-auto rounded-[9px] bg-[#faf9f6] p-0 custom-scrollbar-wellness-stay"
      >
        <h1 className="text-ayuTulsi font-serif text-lg font-semibold leading-tight pb-2">
          Book Therapy Session
        </h1>
        <CancelButtonModal onClick={onClose} />
        <div className="p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center bg-green-50 rounded-xl p-3 gap-4 shadow-sm mb-5 border border-green-100"
          >
            <img
              src={item?.image}
              alt={item?.serviceName}
              className="w-24 h-24 object-cover rounded-lg shadow-sm"
            />
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="bg-lime text-ayuMid text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                  DETOX HOUSE
                </span>
                <span className="text-ayuMid/60 text-[10px] font-medium uppercase">
                  Detox & Rejuvenation
                </span>
              </div>
              <h2 className="text-ayuTulsi font-serif text-lg font-bold leading-tight line-clamp-1 py-1">
                {item?.serviceName}
              </h2>
              <div className="flex items-center gap-4 text-gray-500 mt-1">
                <span className="flex items-center gap-1 text-[11px] font-semibold">
                  <AccessTime
                    style={{ fontSize: 13 }}
                    className="text-ayuMid"
                  />{" "}
                  45 Min
                </span>
                <span className="font-bold text-ayuTulsi text-sm tracking-tight">
                  ₹{priceParsed.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex-1 max-w-xs">
                  <span className="text-gray-500 text-[11px] font-bold mb-1.5 block uppercase tracking-wider">
                    Number of Sessions
                  </span>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={sessionsCount === 0 ? "" : sessionsCount}
                    onChange={handleSessionChange}
                    className="w-full bg-[#f4f7f2] rounded-lg p-2.5 text-gray-800 font-bold text-base outline-none border-2 border-transparent focus:border-ayuMid focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>

              {sessionsCount > 0 && (
                <div className="mb-6">
                  <h3 className="text-ayuTulsi font-serif text-base font-bold mb-3 border-l-4 border-ayuMid pl-3">
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
                            <EventAvailable style={{ fontSize: 13 }} />
                            <span>Session {idx + 1}</span>
                          </div>

                          {!isPicking && (!schedule.date || !schedule.time) ? (
                            <div
                              onClick={() =>
                                !isLocked && setActivePickerIndex(idx)
                              }
                              className="border border-dashed border-[#c4d4be] bg-white rounded-xl py-4 px-6 flex items-center justify-between cursor-pointer hover:bg-[#f9faf7] transition-all group"
                            >
                              <span className="text-gray-400 text-xs font-medium">
                                Select schedule
                              </span>
                              <span className="text-ayuMid text-xs font-bold bg-lime-light px-3 py-1 rounded-full uppercase">
                                Choose
                              </span>
                            </div>
                          ) : isPicking ? (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              className="bg-[#f0f4ef] rounded-2xl p-4 md:p-5 shadow-sm border border-[#e4ebdd] overflow-hidden"
                            >
                              <div className="flex justify-between items-center mb-4">
                                <span className="font-bold text-[#3b594b] text-sm uppercase tracking-wider">
                                  {format(calendarBaseDate, "MMMM yyyy")}
                                </span>
                                <div className="flex gap-2">
                                  <button
                                    onClick={prevMonth}
                                    className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-ayuMid shadow-sm transition-all"
                                  >
                                    <ChevronLeft fontSize="small" />
                                  </button>
                                  <button
                                    onClick={nextMonth}
                                    className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-ayuMid shadow-sm transition-all"
                                  >
                                    <ChevronRight fontSize="small" />
                                  </button>
                                </div>
                              </div>

                              <div className="flex gap-2 overflow-x-auto pb-3 mb-4 custom-scrollbar-wellness-stay">
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
                                      disabled={isDisabled}
                                      onClick={() =>
                                        handleDateSelect(date, idx)
                                      }
                                      className={`flex flex-col items-center justify-center rounded-xl min-w-[50px] h-[65px] transition-all
                                                                        ${isDisabled ? "text-gray-200" : isSelected ? "bg-ayuMid text-white shadow-md" : "bg-white text-gray-500 border border-gray-100 hover:border-ayuMid"}`}
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

                              <span className="text-[#6d8a7c] text-[10px] font-bold mb-3 block uppercase tracking-widest">
                                Available Slots
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {times.map((t, i) => (
                                  <button
                                    key={i}
                                    onClick={() => {
                                      handleTimeSelect(t, idx);
                                      if (schedule.date)
                                        setActivePickerIndex(null);
                                    }}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border
                                                                    ${schedule.time === t ? "bg-ayuMid text-white border-ayuMid" : "bg-white text-gray-500 border-[#e4ebdd] hover:border-ayuMid"}`}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                              <div className="mt-4 flex justify-end">
                                <button
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
                              className="bg-white border border-[#e4ebdd] rounded-xl p-3 flex justify-between items-center cursor-pointer hover:shadow-sm transition-all"
                            >
                              <div className="flex flex-col">
                                <span className="text-gray-800 font-bold text-sm tracking-tight">
                                  {format(schedule.date, "MMM d, yyyy")}
                                </span>
                                <span className="text-ayuMid font-bold text-[11px] uppercase">
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
                </div>
              )}

              <div className="space-y-6">
                <div className="guest-section">
                  <h3 className="text-ayuTulsi font-serif text-base font-bold mb-2.5 border-l-4 border-ayuMid pl-3">
                    Guest Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex-1 col-span-2">
                      <span className="text-gray-400 text-[10px] font-bold mb-1.5 block uppercase tracking-wider">
                        Select Guest
                      </span>
                      <div className="bg-white border border-[#e4ebdd] rounded-xl p-2.5 flex justify-between items-center cursor-pointer hover:border-ayuMid transition-all shadow-sm">
                        <span className="text-gray-800 font-bold text-xs">
                          {selectedGuest || "Select from profile"}
                        </span>
                        <KeyboardArrowDown
                          fontSize="small"
                          className="text-gray-400"
                        />
                      </div>
                    </div>
                    <div className="bg-[#f0f4ef] rounded-xl p-3 flex items-center gap-3 border border-[#e4ebdd] mt-4 md:mt-0 col-span-2">
                      <div className="w-10 h-10 rounded-full bg-lime-light flex items-center justify-center text-ayuMid shadow-inner">
                        <PersonOutline fontSize="small" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-ayuTulsi text-sm">
                          Guest Info
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                          Please select from profile
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="wellness-section">
                  <h3 className="text-ayuTulsi font-serif text-base font-bold mb-2.5 border-l-4 border-ayuMid pl-3">
                    Wellness Info
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div className="space-y-1.5">
                      <span className="text-gray-500 font-bold text-[10px] uppercase tracking-wider block">
                        First time taking this?
                      </span>
                      <div className="bg-white p-3 rounded-xl border border-[#e4ebdd] flex items-center gap-6 h-11">
                        {["Yes", "No"].map((opt) => (
                          <label
                            key={opt}
                            className="flex items-center gap-1.5 cursor-pointer group"
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
                      <div className="flex items-center gap-4 bg-white p-2.5 rounded-xl border border-[#e4ebdd] h-11">
                        {["No Preference", "Male", "Female"].map((opt) => (
                          <label
                            key={opt}
                            className="flex items-center gap-1.5 cursor-pointer group whitespace-nowrap"
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

                <div className="bg-[#f4f7f2] rounded-2xl p-4 md:p-6 border border-[#e4ebdd]">
                  <h3 className="text-ayuBrown font-serif text-base font-bold mb-4 flex items-center justify-between border-b border-ayuMid/20 pb-2">
                    Summary{" "}
                    <ReceiptLong fontSize="small" className="text-ayuBrown" />
                  </h3>
                  <div className="flex flex-col gap-2.5 text-xs font-bold text-gray-500 border-b border-ayuMid/10 pb-4 mb-4">
                    <div className="flex justify-between items-start">
                      <span>Sessions</span>
                      <span className="text-ayuTulsi">
                        {sessionsCount} x {shortServiceName}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span>Schedule</span>
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
                              <span
                                key={i}
                                className="text-gray-400 text-[10px]"
                              >
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
                  <div className="flex flex-col gap-2 text-xs font-bold text-gray-500 border-b border-ayuMid/10 pb-4 mb-4">
                    <div className="flex justify-between items-center px-1">
                      <span>Price / Session</span>
                      <span className="text-ayuTulsi">
                        ₹{priceParsed.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-lime-light/30 p-2 rounded-lg">
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
                    <span className="text-ayuBrown font-black text-lg">
                      Total
                    </span>
                    <span className="text-ayuMid font-black text-2xl tracking-tighter">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <CommonButton
                    type="button"
                    label="Confirm Booking"
                    disabled={
                      sessionsCount === 0 ||
                      schedules.some((s) => !s.date || !s.time)
                    }
                    className="bg-gradient-to-r from-ayuMid to-ayuTulsi text-white  transform active:scale-95 transition-all w-full sm:w-auto text-sm disabled:opacity-40"
                    onClick={onClose}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
