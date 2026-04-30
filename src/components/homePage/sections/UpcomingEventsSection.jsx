import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

const UpcomingEventsSection = ({
  eventsDataUpdated,
  setOpenRegisterModal,
  setSelectedEvents,
}) => {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-10 px-4 sm:px-6 lg:px-12 ">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-green-900 mb-8 sm:mb-12"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          Upcoming Events
          <motion.span
            className="block h-1 w-24 sm:w-28 bg-gradient-to-r from-green-600 to-lime-500 mt-2 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "16rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4">
          {eventsDataUpdated.map((event, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -8 }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-t-2xl border flex flex-col h-full w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col flex-1"
                  >
                    <div className="relative w-full h-[200px] md:h-[145px] bg-gradient-to-br from-lime-100 via-green-100 to-lime-50 rounded-t-xl border border-lime-200 flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.img
                          src={event.image}
                          className="h-36 w-full object-cover"
                          alt={event.title}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-lime-600 flex justify-center items-center to-green-700 px-2 text-center rounded-full">
                        <span className="text-[10px] font-bold text-white py-1">
                          {event?.month}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 px-2 pt-1 pb-3 gap-y-2">
                      <div className="bg-white/90 backdrop-blur-sm py-0.5 rounded-full flex justify-end">
                        <span className="text-[12px] font-bold text-lime-700">
                          Date : {event.date}
                        </span>
                      </div>

                      <div className="flex items-start gap-1.5">
                        <h3 className="text-[12px] md:text-xs font-bold text-stone-800 leading-tight flex-1">
                          {event.serviceName}
                        </h3>
                      </div>

                      <div className="flex items-start gap-1">
                        <svg
                          className="w-5 h-5 text-green-600 flex-shrink-0"
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
                        <p className="text-stone-600 text-[12px] leading-snug">
                          {event.description}
                        </p>
                      </div>

                      <div className="flex items-start gap-1">
                        <svg
                          className="w-5 h-5 text-green-700 flex-shrink-0"
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
                        <p className="text-[12px] text-stone-600 leading-snug">
                          <span className="font-bold">Benefits :&nbsp;</span>
                          {event.benefits}
                        </p>
                      </div>

                      <div className="flex justify-between items-center w-full mt-auto pt-2">
                        <motion.button
                          className="border border-lime-600 flex items-center space-x-2 text-lime-600 px-4 sm:px-5 py-1.5 rounded-[5px] font-semibold shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            navigate("/calendar", { state: event })
                          }
                        >
                          <ReadMoreIcon /> <span>Events</span>
                        </motion.button>

                        <motion.button
                          className="bg-gradient-to-r from-green-700 to-lime-600 text-white px-4 sm:px-5 py-2 rounded-[5px] font-semibold shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setOpenRegisterModal(true);
                            setSelectedEvents(event);
                          }}
                        >
                          Book Event
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default memo(UpcomingEventsSection);
