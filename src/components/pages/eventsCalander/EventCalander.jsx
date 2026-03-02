import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import BookEventForm from "../bookEventForm/BookEventForm";
import HoliDahanImg from "../../assets/calendarEvent/HoliDahan.png"
import HoliFestivalImg from "../../assets/calendarEvent/HoliFestival.png"


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
  }, [currentMonth,currentDay,selectedDate,currentMonthNum,currentYear,getEventsForDate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-lime-50 to-green-50 p-2 sm:p-4 md:p-6 lg:px-16 lg:py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-lime-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-3 sm:mb-4"
        >
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-lime-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
            </svg>
            <h1 className="text-xl sm:text-2xl md:text-3xl py-1 font-bold bg-gradient-to-r from-lime-700 via-green-700 to-lime-800 bg-clip-text text-transparent">
              स्ववर्षपद Calendar 2026
            </h1>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-lime-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
            </svg>
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
                    <div className="relative w-full h-24 sm:h-28 md:h-32 lg:h-40 bg-gradient-to-br from-lime-100 via-green-100 to-lime-50 overflow-hidden border border-lime-200">
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
                                className="ml-auto px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-lime-600 to-green-700 text-white font-bold rounded text-[10px] sm:text-xs shadow-sm hover:shadow-md transition-all"
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
        <BookEventForm
          open={openBookEventModal}
          handleClose={() => {
            setOpenEventBookModal(false);
            setCurrentEvent(null);
          }}
          eventDetails={currentEvent}
        />
      )}
    </div>
  );
};

export default EventCalendar;

export const eventsData2026 = [
  {
    month: "January",
    date: "01/01/2026",
    serviceName: "नवीन वर्ष",
    description: "New Year celebrations",
    benefits: "Joy, wellness, community bonding",
    value: 2000,
  },
  {
    month: "January",
    date: "09/01/2026 To 12/01/2026",
    serviceName: "स्वामी विवेकानंद जयंती & राष्ट्रीय युवा दिन",
    description:
      "Celebrations of Swami Vivekananda Jayanti & National Youth Day",
    benefits: "Youth empowerment, cultural learning",
    value: 2000,
  },
  {
    month: "January",
    date: "13/01/2026",
    serviceName: "लोहडी Lohri",
    description: "Lohri festival celebration",
    benefits: "Cultural awareness, community bonding",
    value: 2000,
  },
  {
    month: "January",
    date: "14/01/2026",
    serviceName: "मकर संक्रांत Makar Sankranti",
    description: "Harvest festival celebrations",
    benefits: "Cultural learning, seasonal wellness",
    value: 2000,
  },

  {
    month: "January",
    date: "23/01/2026",
    serviceName: "वसन्त पञ्चमी सरस्वती पूजन",
    description: "Vasant Panchami & Saraswati Puja",
    benefits: "Education, cultural learning",
    value: 2000,
  },
  {
    month: "January",
    date: "25/01/2026",
    serviceName: "बालकपालक Youth Guardian Family Camp",
    description: "Family camp + Sun Bath festival",
    benefits: "Wellness, cultural awareness",
    value: 2000,
  },
  {
    month: "January",
    date: "26/01/2026",
    serviceName: "गणतंत्र दिन Republic Day",
    description: "National Republic Day celebrations",
    benefits: "Civic awareness, cultural pride",
    value: 2000,
  },
  {
    month: "January",
    date: "30/01/2026",
    serviceName: "गांधी पुण्यतिथि",
    description: "Mahatma Gandhi remembrance",
    benefits: "Cultural learning, reflection",
    value: 2000,
  },
  {
    month: "February",
    date: "01/02/2026",
    serviceName: "गुरु रविदास जयंती",
    description: "Celebration of Guru Ravidas Jayanti",
    benefits: "Cultural, Spiritual",
    value: null,
  },

  {
    month: "February",
    date: "04/02/2026",
    serviceName: "Cancer Awareness Day",
    description: "Awareness and health-focused activities",
    benefits: "Educational, Wellness",
    value: 2000,
  },

  {
    month: "February",
    date: "12/02/2026",
    serviceName: "महर्षि दयानंद सरस्वती जयंती",
    description: "Commemoration of Maharshi Dayanand Saraswati",
    benefits: "Cultural",
    value: null,
  },

  {
    month: "February",
    date: "15/02/2026",
    serviceName: "महाशिवरात्रि Mahashivaratri",
    description: "Spiritual celebration of Lord Shiva",
    benefits: "Spiritual",
    value: 2000,
  },
  {
    month: "February",
    date: "19/02/2026",
    serviceName: "शिवाजी महाराज जयंती Shivaji Jayanti",
    description: "Celebration of Shivaji Maharaj Jayanti",
    benefits: "Cultural",
    value: 2000,
  },

  {
    month: "March",
    date: "03/03/2026",
    serviceName: "होलिका दहन Holika Dahan",
    description: "Celebration of Holika Dahan",
    benefits: "Cultural",
    value: 2000,
    image:HoliDahanImg
  },
  {
    month: "March",
    date: "04/03/2026",
    serviceName: "स्वधूलिवन्दन Holi Festival",
    description: "Ash worship and Holi rituals",
    benefits: "Cultural, Spiritual",
    value: 2000,
    image:HoliFestivalImg
  },
  {
    month: "March",
    date: "06/03/2026",
    serviceName: "छत्रपती शिवाजी महाराज जयंती",
    description: "Traditional healing commune & Shivaji Jayanti ",
    benefits: "Wellness, Cultural",
    value: 2000,
  },

  {
    month: "March",
    date: "08/03/2026",
    serviceName: "स्वरङ्गपञ्चमी Colour Festival/ International Women's Day ",
    description: "Healing commune with festivals and awareness.",
    benefits: "Wellness, Cultural",
    value: 2000,
  },
  {
    month: "March",
    date: "19/03/2026",
    serviceName: "स्वनववर्ष गुढी पाडवा युगादी",
    description: "New Year celebrations with traditional rituals",
    benefits: "Cultural, Wellness",
    value: 2000,
  },
  {
    month: "March",
    date: "21/03/2026",
    serviceName: "गण गौर Chaitra Gauri Gangauri",
    description: "Traditional festival celebration",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "March",
    date: "26/03/2026",
    serviceName: "स्वएकवचन उत्सव : राम नवमी ",
    description: "Celebration of Ram Navami",
    benefits: "Cultural, Spiritual",
    value: 2000,
  },
  {
    month: "April",
    date: "01/04/2026",
    serviceName: "Banking Detox आर्थिक वर्ष",
    description: "Financial year start with wellness",
    benefits: "Wellness, Educational",
    value: 2000,
  },
  {
    month: "April",
    date: "02/04/2026",
    serviceName: "सामर्थ्यदिन / Hanuman Jayanti / चैत्र पोर्णिमा",
    description: "Hanuman Jayanti celebrations",
    benefits: "Cultural, Spiritual",
    value: 2000,
  },
  {
    month: "April",
    date: "14/04/2026",
    serviceName: "Solar New Year आंबेडकर जयंती बैसाखी",
    description: "Celebration of Solar New Year and Ambedkar Jayanti ",
    benefits: "Cultural, Educational",
    value: null,
  },

  {
    month: "April",
    date: "21/04/2026",
    serviceName: "शंकराचार्य सूरदास जयंती",
    description: "Commemoration of Shankaracharya and Surdas Jayanti.",
    benefits: "Cultural, Spiritual",
    value: null,
  },
  {
    month: "April",
    date: "22/04/2026",
    serviceName: "Earth Day पृथ्वी दिन",
    description: "Celebration and awareness of Earth Day",
    benefits: "Educational, Wellness",
    value: 2000,
  },
  {
    month: "April",
    date: "25/04/2026",
    serviceName: "सीता नवमी Sita Navami",
    description: "Celebration of Sita Navami",
    benefits: "Cultural, Spiritual",
    value: 2000,
  },
  {
    month: "May",
    date: "01/05/2026",
    serviceName: "वैशाख बुद्ध पोर्णिमा Workers Day",
    description:
      "Observance of Buddha Poornima and International Workers' Day ",
    benefits: "Cultural, Educational",
    value: 2000,
  },

  {
    month: "May",
    date: "03/05/2026",
    serviceName: "विश्व हास्य दिवस ",
    description: "Healing commune combined with International Humor Day.",
    benefits: "Wellness, Cultural",
    value: 2000,
  },
  {
    month: "May",
    date: "10/05/2026",
    serviceName: "मातृ दिन",
    description:
      "Physician wellness program and life knowledge sessions on Ayurveda with Mother's Day celebration.",
    benefits: "Wellness, Educational",
    value: 2000,
  },
  {
    month: "May",
    date: "27/05/2026",
    serviceName: "बकरी ईद Eid",
    description: "Celebration of Bakri Eid",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "May",
    date: "31/05/2026",
    serviceName: "विश्व तंबाखू निषेध दिन ",
    description: "World No Tobacco Day observance.",
    benefits: "Wellness, Cultural",
    value: 2000,
  },
  {
    month: "June",
    date: "05/06/2026",
    serviceName: "विश्व पर्यावरण दिन ",
    description: "Healing commune and World Environment Day",
    benefits: "Wellness, Cultural",
    value: 2000,
  },

  {
    month: "June",
    date: "17/06/2026",
    serviceName: "महाराणा प्रताप जयंती, इस्लामी नव वर्ष अल हिज्रा ",
    description: "Commemorative celebrations.",
    benefits: "Cultural",
    value: null,
  },

  {
    month: "June",
    date: "21/06/2026",
    serviceName: "पितृ दिन / आंतरराष्ट्रीय योग दिन / मोठा दिवस",
    description: "Observance of ancestors and International Yoga Day ",
    benefits: "Wellness, Cultural",
    value: 2000,
  },
  {
    month: "June",
    date: "26/06/2026",
    serviceName: "मुहर्रम",
    description: "Religious observance",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "June",
    date: "29/06/2026",
    serviceName: "वट पोर्णिमा, कबीरदास जयंती ",
    description: "Religious and cultural celebration ",
    benefits: "Cultural",
    value: null,
  },

  {
    month: "July",
    date: "16/07/2026",
    serviceName: "जगन्नाथ रथयात्रा",
    description: "Rath Yatra festival",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "July",
    date: "29/07/2026",
    serviceName: "गुरु पोर्णिमा",
    description: "Guru Purnima observance",
    benefits: "Cultural, Spiritual",
    value: null,
  },
  {
    month: "August",
    date: "02/08/2026",
    serviceName: "मैत्रेय दिन",
    description: "Friendship/Compassion Day",
    benefits: "Cultural, Wellness",
    value: null,
  },
  {
    month: "August",
    date: "15/08/2026",
    serviceName: "स्वतंत्रता दिवस/Independence Day",
    description: "National celebration",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "August",
    date: "17/08/2026",
    serviceName: "नागपंचमी",
    description: "Religious festival",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "August",
    date: "19/08/2026",
    serviceName: "तुलसीदास जयंती",
    description: "Birth anniversary celebration",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "August",
    date: "26/08/2026",
    serviceName: "ओणम / ईद ए मिलाद ",
    description: "Religious and cultural celebration",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "August",
    date: "28/08/2026",
    serviceName: "रक्षाबंधन",
    description: "Sibling bonding festival",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "September",
    date: "04/09/2026",
    serviceName: "कृष्ण जन्माष्टमी, अगस्त्य अर्ध्य",
    description: "Birth of Lord Krishna celebration",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "September",
    date: "05/09/2026",
    serviceName: "गोपाल काला दही हंडी, शिक्षक दिन",
    description: "Dahi Handi and Teacher's Day",
    benefits: "Cultural, Educational",
    value: 2000,
  },
  {
    month: "September",
    date: "11/09/2026",
    serviceName: "बेंदूर - बैल पोळा - स्ववृषभोत्सव / BullFestival",
    description: "Traditional bull festival",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "September",
    date: "14/09/2026",
    serviceName: "हरतालिका गौरी, मंगळा, मंगळा गौर, गणेश स्थापना, हिन्दी दिवस ",
    description: "Religious and national celebrations",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "September",
    date: "15/09/2026",
    serviceName: "ऋषि पंचमी, अभियंता दिन, विश्वेश्वरैया जयंती",
    description: "Observances of Rishi Panchami and Engineers' Day",
    benefits: "Cultural, Educational",
    value: 2000,
  },
  {
    month: "September",
    date: "17/09/2026",
    serviceName: "गौरी आवाहन, राधाष्टमी",
    description: "Religious festival",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "September",
    date: "18/09/2026",
    serviceName: "जेष्ठ गौरी पूजा",
    description: "Religious festival",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "September",
    date: "19/09/2026",
    serviceName: "जेष्ठ गौरी विसर्जन",
    description: "Festival conclusion",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "September",
    date: "20/09/2026",
    serviceName: "स्वग्राम गणेश विसर्जन",
    description: "Ganesh Visarjan",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "September",
    date: "25/09/2026",
    serviceName: "अनंत चतुर्थी गणेश विसर्जन",
    description: "Ganesh festival",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "September",
    date: "27/09/2026",
    serviceName: "पितृ पक्ष प्रारंभ Ancestor Week",
    description: "Ancestor observance",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "October",
    date: "02/10/2026",
    serviceName: "गांधी जयंती Gandhi Jayanti",
    description: "National celebration",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "October",
    date: "10/10/2026",
    serviceName: "सर्वपितृ अमावस्या",
    description: "Ancestor observance",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "October",
    date: "11/10/2026",
    serviceName:
      "नवरात्री प्रारंभ भोंडला / Navratri, घटस्थापना / Ghatsthapana, मृत्तिका पूजन / Mruttika Pujan",
    description: "Navratri festival start",
    benefits: "Cultural, Spiritual",
    value: 2000,
  },
  {
    month: "October",
    date: "16–17/10/2026",
    serviceName: "सरस्वती आवाहन & पूजा",
    description: "Worship of Goddess Saraswati",
    benefits: "Cultural, Educational",
    value: null,
  },
  {
    month: "October",
    date: "19/10/2026",
    serviceName: "दुर्गाष्टमी / महानवमी",
    description: "Navratri festival celebration",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "October",
    date: "20/10/2026",
    serviceName: "विजयादशमी / दसरा / Vijayadashami-Dasara, मध्वाचार्य जयंती",
    description: "Festival and scholar observance",
    benefits: "Cultural, Educational",
    value: 2000,
  },
  {
    month: "October",
    date: "21/10/2026",
    serviceName: "मध्वाचार्य जयंती",
    description: "Scholar observance",
    benefits: "Educational",
    value: 2000,
  },
  {
    month: "October",
    date: "25/10/2026",
    serviceName: "कोजागिरी / Kojagiri Pornima, शरद पोर्णिमा",
    description: "Full moon observance",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "October",
    date: "26/10/2026",
    serviceName: "वाल्मीकी मीराबाई जयंती",
    description: "Saints' birth anniversaries",
    benefits: "Cultural, Spiritual",
    value: null,
  },
  {
    month: "October",
    date: "29/10/2026",
    serviceName: "करवा चौथ",
    description: "Couple fasting and rituals",
    benefits: "Cultural, Wellness",
    value: null,
  },
  {
    month: "November",
    date: "04/11/2026",
    serviceName: "दुर्ग बांधणी Fort Construction",
    description: "Traditional fort construction activity at Swagrama",
    benefits: "Cultural engagement, teamwork, historical learning ",
    value: 2000,
  },
  {
    month: "November",
    date: "05/11/2026",
    serviceName: "गौवत्सद्वादशी Cow Calf Ceremony / वसू बारस VasuBaras ",
    description: "Ritual celebrating cow and calf; auspicious ceremonies ",
    benefits: "Strengthens connection with cows, cultural learning",
    value: 2000,
  },
  {
    month: "November",
    date: "06/11/2026",
    serviceName: "धनोत्रयोदशी Dhanotrayodashi",
    description: "Observance of Dhanteras / festival rituals",
    benefits: "Spiritual benefits, prosperity rituals",
    value: 2000,
  },
  {
    month: "November",
    date: "08/11/2026",
    serviceName: "Dipavali – Lakshmi Pujan नरक चतुर्दशी ",
    description: "Diwali – Lakshmi Puja and rituals ",
    benefits: "Spiritual cleansing, prosperity, wellness ",
    value: 2000,
  },

  {
    month: "November",
    date: "10/11/2026",
    serviceName: "Dipavali Padwa / Balipratipada / Govardhan Puja ",
    description: "Diwali festival rituals and Govardhan celebration ",
    benefits: "Spiritual benefits, prosperity",
    value: 2000,
  },
  {
    month: "November",
    date: "11/11/2026",
    serviceName: "भाऊबीज",
    description: "Festival of brothers and sisters",
    benefits: "Family bonding, cultural tradition",
    value: 2000,
  },

  {
    month: "November",
    date: "14/11/2026",
    serviceName: "बाल दिवस / नेहरू जयंत",
    description: "Children's Day & Nehru Jayanti celebrations",
    benefits: "Educational, fun, cultural awareness",
    value: 2000,
  },
  {
    month: "November",
    date: "21/11/2026",
    serviceName: "तुलसी विवाह Tulasi Vivah",
    description: "Holy ceremonial marriage of Tulasi plant ",
    benefits: "Spiritual merit, cultural immersion",
    value: 2000,
  },
  {
    month: "November",
    date: "24/11/2026",
    serviceName: "गुरुनानक जयंती GuruNanak Jayanti",
    description: "Celebration of Guru Nanak's birth anniversary ",
    benefits: "Spiritual inspiration, cultural enrichment ",
    value: 2000,
  },

  {
    month: "December",
    date: "01/12/2026",
    serviceName: "विश्व एड्स दिन ",
    description: "Health & spiritual observances ",
    benefits: "Awareness, wellness, spiritual merit",
    value: 2000,
  },

  {
    month: "December",
    date: "14/12/2026",
    serviceName: "विवाह पंचमी",
    description: "Wedding-related ceremony ",
    benefits: "Spiritual & cultural benefit ",
    value: 2000,
  },

  {
    month: "December",
    date: "20/12/2026",
    serviceName: "गीता जयंती / मोक्षदा एकादशी",
    description: "Health & spiritual observances ",
    benefits: "Awareness, wellness, spiritual merit ",
    value: 2000,
  },

  {
    month: "December",
    date: "23/12/2026",
    serviceName: "दत्तात्रय जयंती ",
    description: "Celebration of Dattatreya Jayanti ",
    benefits: "Spiritual growth, cultural learning ",
    value: 2000,
  },
];
