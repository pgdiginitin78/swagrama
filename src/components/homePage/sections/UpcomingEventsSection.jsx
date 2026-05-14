import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const UpcomingEventsSection = ({
  eventsDataUpdated,
  setOpenRegisterModal,
  setSelectedEvents,
}) => {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-10 px-4 sm:px-6 lg:px-12 ">
      <motion.div
        className="w-full mx-auto"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {eventsDataUpdated.map((event, i) => (
            <motion.div
              key={i}
              className="relative h-[350px] 2xl:h-[450px] rounded-[1rem] overflow-hidden group cursor-pointer shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              onClick={() => navigate("/calendar", { state: event })}
            >
              <motion.img
                src={event.image}
                alt={event.serviceName}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute top-5 right-5">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  {event?.month}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end min-h-[50%]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <h3 className="text-2xl font-extrabold text-white mb-3 leading-tight tracking-tight">
                    {event.serviceName}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
                    {event.description}
                  </p>
                </motion.div>
                <div className="flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <motion.button
                    className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 text-white py-3 rounded text-xs font-bold uppercase tracking-wider transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/calendar", { state: event });
                    }}
                  >
                    Details
                  </motion.button>
                  <motion.button
                    className="flex-1 bg-gradient-to-r from-green-500 to-lime-500 text-white py-3 rounded text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenRegisterModal(true);
                      setSelectedEvents(event);
                    }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default memo(UpcomingEventsSection);
