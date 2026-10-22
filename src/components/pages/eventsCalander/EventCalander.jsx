import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import BookEventForm from "../bookEventForm/BookEventForm";
import { eventsData2026 } from "./eventsData2026";
import VisitorsFormModal from "../communityActivities/vision/VisitorsFormModal";

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [openBookEventModal, setOpenEventBookModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const location = useLocation();
  const passedData = location.state;

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonthNum = today.getMonth();
  const currentYear = today.getFullYear();

  const setDayOnly = (dateStr) => {
    const [day, month] = dateStr.split("/");
    return { day: parseInt(day), month: parseInt(month) - 1 };
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (month) => {
    return new Date(2026, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month) => {
    return new Date(2026, month, 1).getDay();
  };

  const eventsByDate = useMemo(() => {
    const map = {};
    eventsData2026.forEach((event) => {
      const [day, month] = event.date.split("/");
      const key = `${parseInt(month)}-${parseInt(day)}`;
      if (!map[key]) map[key] = [];
      map[key].push(event);
    });
    return map;
  }, []);

  const getEventsForDate = useCallback(
    (day) => {
      const key = `${currentMonth + 1}-${day}`;
      return eventsByDate[key] || [];
    },
    [currentMonth, eventsByDate],
  );

  const isPastDate = (day) => {
    if (currentYear !== 2026) return false;
    if (currentMonth < currentMonthNum) return true;
    if (currentMonth > currentMonthNum) return false;
    return day < currentDay;
  };

  const isToday = (day) => {
    return (
      currentYear === 2026 &&
      currentMonth === currentMonthNum &&
      day === currentDay
    );
  };

  const handleDateClick = (day) => {
    if (isPastDate(day)) return;
    setSelectedDate({ day: day, month: currentMonth });
    const events = getEventsForDate(day);
    setSelectedEvents(events);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square p-0.5"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const events = getEventsForDate(day);
      const hasEvents = events.length > 0;
      const isSelected =
        selectedDate?.day === day && selectedDate?.month === currentMonth;
      const isPast = isPastDate(day);
      const isTodayDate = isToday(day);

      const formatMarathiText = (text = "", limit = 8) => {
        const marathiOnly = text.replace(/[A-Za-z0-9]/g, "").trim();
        return marathiOnly.length > limit
          ? marathiOnly.slice(0, limit) + "…"
          : marathiOnly;
      };

      days.push(
        <motion.div
          key={day}
          whileHover={!isPast ? { scale: 1.05 } : {}}
          whileTap={!isPast ? { scale: 0.95 } : {}}
          onClick={() => handleDateClick(day)}
          className={`aspect-square p-0.5 sm:p-1 rounded-md sm:rounded-lg transition-all relative border
            ${isPast ? "opacity-40 cursor-not-allowed bg-gray-100" : "cursor-pointer"}
            ${
              isSelected && !isPast
                ? "bg-gradient-to-br border from-lime-600 to-green-700 text-white shadow-md shadow-lime-500/30"
                : isTodayDate && !isPast
                  ? "bg-gradient-to-br border from-amber-600 to-amber-700 text-white ring-2 ring-amber-400 shadow-lg"
                  : hasEvents && !isPast
                    ? "bg-gradient-to-br from-lime-50 to-green-50 hover:from-lime-100 hover:to-green-100 border border-lime-200"
                    : !isPast
                      ? "hover:bg-amber-50/50 border"
                      : "border border-gray-200"
            }`}
        >
          <div className="flex flex-col h-full items-center justify-center gap-0.5">
            <span
              className={`font-semibold leading-none
                text-[10px] sm:text-xs md:text-sm lg:text-base
                ${isSelected && !isPast ? "text-white" : isTodayDate && !isPast ? "text-white" : isPast ? "text-gray-400" : "text-stone-700"}
              `}
            >
              {day}
            </span>

            {hasEvents && !isPast && (
              <span
                className={` py-1
                  text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px]
                  leading-tight text-center px-0.5
                  line-clamp-1
                  ${isSelected ? "text-white/90" : isTodayDate ? "text-white/90" : "text-green-700"}
                `}
              >
                {formatMarathiText(events[0].serviceName, 8)}
              </span>
            )}

            {isTodayDate && !isPast && (
              <motion.div
                className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-400 rounded-full"
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: [1, 0.6, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </div>
        </motion.div>,
      );
    }
    return days;
  };

  useEffect(() => {
    if (passedData !== undefined && passedData !== null) {
      setSelectedEvents([passedData]);
      setSelectedDate(setDayOnly(passedData.date));
    }
  }, [passedData]);

  useEffect(() => {
    if (currentYear === 2026 && !selectedDate) {
      const todayEvents = getEventsForDate(currentDay);
      if (todayEvents.length > 0 && currentMonth === currentMonthNum) {
        setSelectedDate({ day: currentDay, month: currentMonthNum });
        setSelectedEvents(todayEvents);
      }
    }
  }, [
    currentMonth,
    currentDay,
    selectedDate,
    currentMonthNum,
    currentYear,
    getEventsForDate,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-lime-50 to-green-50 p-2 sm:p-4 md:p-6 lg:px-16 lg:py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-lime-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-3 sm:mb-4"
        >
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">

            <h1 className="text-xl sm:text-2xl md:text-3xl py-1 font-bold bg-gradient-to-r from-lime-700 via-green-700 to-lime-800 bg-clip-text text-transparent">
              स्ववर्षपद Calendar 2026
            </h1>
   
          </div>
          <p className="text-stone-600 text-[10px] sm:text-xs md:text-sm font-medium">
            Discover wellness and cultural events
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-2 sm:gap-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl shadow-lime-500/10 p-2 sm:p-3 md:p-4 border border-lime-100">
              <div className="flex items-center justify-between mb-2 sm:mb-3 pb-1.5 sm:pb-2 border-b border-lime-200">
                <button
                  onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))}
                  disabled={currentMonth === 0}
                  className="p-1 sm:p-1.5 rounded-lg hover:bg-lime-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-stone-700"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="text-center">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-lime-700 to-green-700 bg-clip-text text-transparent">
                    {months[currentMonth]}
                  </h2>
                  <span className="text-xs sm:text-sm text-stone-500 font-medium">
                    2026
                  </span>
                </div>

                <button
                  onClick={() =>
                    setCurrentMonth(Math.min(11, currentMonth + 1))
                  }
                  disabled={currentMonth === 11}
                  className="p-1 sm:p-1.5 rounded-lg hover:bg-lime-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-stone-700"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                  <div
                    key={idx}
                    className="text-center text-[10px] sm:text-xs md:text-sm font-bold text-stone-600 p-0.5 sm:p-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-0.5 sm:gap-3">
                {renderCalendar()}
              </div>

              <div className="mt-2 sm:mt-3 pt-1.5 sm:pt-2 border-t border-lime-200 flex flex-wrap gap-2 sm:gap-3 justify-center text-[9px] sm:text-[10px] md:text-xs">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br from-amber-500 to-amber-600"></div>
                  <span className="text-stone-600 font-medium">Today</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-lime-600 to-green-600"></div>
                  <span className="text-stone-600 font-medium">Has Events</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br from-lime-600 to-green-700"></div>
                  <span className="text-stone-600 font-medium">Selected</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-300"></div>
                  <span className="text-stone-600 font-medium">Past</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl shadow-green-500/10 lg:sticky lg:top-4 border border-green-100 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <AnimatePresence mode="wait">
                {selectedEvents.length > 0 ? (
                  <motion.div
                    key={selectedDate}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-2 mb-2"
                  >
                    <div className="relative w-full h-36 md:h-32 lg:h-[260px] 2xl:h-[360px] bg-gradient-to-br from-lime-100 via-green-100 to-lime-50 overflow-hidden border border-lime-200">
                      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        {selectedEvents?.[0]?.image ? (
                          <img
                            src={selectedEvents[0].image}
                            alt="Event"
                            className="h-full w-full object-cover object-center"
                          />
                        ) : (
                          <svg
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-lime-600/30"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                          </svg>
                        )}
                      </div>

                      <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 bg-white/90 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 rounded-full">
                        <span className="text-[10px] sm:text-xs font-bold text-lime-700">
                          {selectedEvents[0].date}
                        </span>
                      </div>
                      <div className="absolute top-1.5 sm:top-2 text-center align-middle right-1.5 sm:right-2 bg-gradient-to-r from-lime-600 to-green-700 px-1.5 sm:px-2 py-0.5 rounded-full">
                        <span className="text-[9px] sm:text-[10px] font-bold text-white flex justify-center items-center">
                          {selectedEvents.length === 1 ? "Event" : "Events"}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-lime-50/50 to-green-50/50 rounded-lg sm:rounded-xl p-1.5 sm:p-2 m-1.5 sm:m-2 border border-lime-200">
                      <div className="space-y-1.5 sm:space-y-2">
                        {selectedEvents.map((event, idx) => (
                          <div
                            key={idx}
                            className="bg-white rounded-md sm:rounded-lg p-1.5 sm:p-2 border border-lime-200"
                          >
                            <div className="flex items-start gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-lime-600 to-green-700 flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-[9px] sm:text-[10px] font-bold">
                                  {idx + 1}
                                </span>
                              </div>
                              <h3 className="text-[11px] sm:text-xs md:text-sm font-bold text-stone-800 leading-tight flex-1">
                                {event.serviceName}
                              </h3>
                            </div>

                            <div className="flex items-center gap-1 mb-1 sm:mb-1.5 pl-5 sm:pl-6">
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <p className="text-stone-600 text-[10px] sm:text-xs leading-snug">
                                {event.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 mb-1 sm:mb-1.5 pl-5 sm:pl-6">
                              <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 text-green-700 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <p className="text-[10px] sm:text-xs text-stone-600 leading-snug">
                                <span className="font-bold">Benefits: </span>
                                {event.benefits}
                              </p>
                            </div>

                            <div className="flex items-center gap-1 sm:gap-1.5 pl-5 sm:pl-6">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  setOpenEventBookModal(true);
                                  setCurrentEvent(event);
                                }}
                                className="ml-auto px-3 py-2 bg-gradient-to-r from-lime-600 to-green-700 text-white font-bold rounded text-xs shadow-sm hover:shadow-md transition-all"
                              >
                                Book Event
                              </motion.button>
                            </div>

                            {idx < selectedEvents.length - 1 && (
                              <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-lime-200"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-6 sm:py-8 px-3"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-lime-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 border-2 border-lime-200">
                      <svg
                        className="w-6 h-6 sm:w-8 sm:h-8 text-lime-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-stone-700 mb-1">
                      Select a Date
                    </h3>
                    <p className="text-[10px] sm:text-xs text-stone-500">
                      Click on a date to view event details
                    </p>
                    <div className="mt-2 sm:mt-3 inline-block px-2 sm:px-3 py-1 sm:py-1.5 bg-lime-50 rounded-lg border border-lime-200">
                      <span className="text-[9px] sm:text-[10px] text-lime-800 font-medium">
                        🍃 Discover Wellness Events
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
      {openBookEventModal && (
        <VisitorsFormModal
          open={openBookEventModal}
          handleClose={() => {
            setOpenEventBookModal(false);
            setCurrentEvent(null);
          }}
          serviceDetails={currentEvent}
          origin={"AnnualEvents"}
        />
      )}
    </div>
  );
};

export default EventCalendar;


export { eventsData2026 };
