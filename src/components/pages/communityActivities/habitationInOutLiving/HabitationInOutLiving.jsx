import { motion, useScroll, useTransform } from "framer-motion";
import {
  Home,
  Waves,
  HolidayVillage,
  CalendarMonth,
  AccessTime,
  ArrowForward,
  CheckCircle,
} from "@mui/icons-material";

import ipdSinglePng from "../../../assets/membership/community/ipdSingle.jpg";
import OutDoorLivingPng from "../../../assets/membership/community/outDoor.jpg";
import wellHouseSinglePng from "../../../assets/membership/community/wellHouseSingle.jpg";
import { useState, useRef } from "react";
import OPDBookingModal from "../../healingServices/opdClinic/OPDBookingModal";

const retreatData = [
  {
    id: 1,
    serviceName: "Outdoor Living",
    titleHindi: "खुला आकाश जीवन",
    description:
      "A restorative outdoor living experience designed to reconnect the body and mind with nature through mindful routines and natural rhythms.",
    price: 2500,
    image: OutDoorLivingPng,
    date: "Jan 2025 – Jan 2026",
    time: "Check-in 11:15 | Check-out 13:45",
    icon: HolidayVillage,
    includes: ["Food", "Accommodation", "Training", "Guidance", "Medical Care"],
    gradient: "from-green-500 to-lime-600",
    bgGradient: "from-green-50 via-lime-50 to-green-100",
  },
  {
    id: 2,
    serviceName: "Single Room",
    titleHindi: "एकांतवास कक्ष",
    description:
      "A quiet, private healing space ideal for focused recovery, rest, and personalized wellness routines under medical supervision.",
    price: 3000,
    image: ipdSinglePng,
    date: "Jan 2025 – Jan 2026",
    time: "Check-in 11:15 | Check-out 13:45",
    icon: Home,
    includes: ["Food", "Private Stay", "Training", "Guidance", "Medical Care"],
    gradient: "from-green-600 to-lime-500",
    bgGradient: "from-green-50 via-lime-50 to-green-100",
  },
  {
    id: 3,
    serviceName: "Wellness Single",
    titleHindi: "स्वास्थ्य मंगल",
    description:
      "A premium wellness stay integrating therapeutic care, nutrition, and guided lifestyle practices for holistic rejuvenation.",
    price: 3750,
    image: wellHouseSinglePng,
    date: "Jan 2025 – Jan 2026",
    time: "Check-in 11:15 | Check-out 13:45",
    icon: Waves,
    includes: ["Food", "Wellness Stay", "Training", "Guidance", "Medical Care"],
    gradient: "from-lime-600 to-green-600",
    bgGradient: "from-lime-50 via-green-50 to-lime-100",
  },
];

const HabitationInOutLiving = () => {
  const [openAppointmentBookModal, setOpenAppointmentBookModal] =
    useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-green-100 px-4 py-5 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-400 to-lime-400 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-lime-400 to-green-400 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="w-full mx-auto relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8 md:mb-12"
        >
        

          <h1 className="text-3xl md:text-4xl mt-5 font-bold bg-gradient-to-r from-green-700 via-lime-600 to-green-700 bg-clip-text text-transparent mb-2 leading-tight">
            Swagrama Wellness Retreats
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-green-700 mt-2 text-sm md:text-base max-w-2xl mx-auto font-light"
          >
            Discover transformative healing through
            <span className="font-semibold"> nature-integrated living</span>
          </motion.p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {retreatData.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                onHoverStart={() => setHoveredCard(item.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative"
              >
                <motion.div
                  whileHover={{ y: -8, rotateY: 2 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="relative rounded-2xl overflow-hidden backdrop-blur-2xl bg-white/60 border border-white/80 shadow-2xl h-full flex flex-col"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-30 pointer-events-none transition-opacity duration-500`}
                  />
                  <motion.div
                    animate={{
                      x: hoveredCard === item.id ? ["-100%", "100%"] : "-100%",
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                  />
                  <div className="relative h-40 md:h-44 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      src={item.image}
                      alt={item.serviceName}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                      className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-lg px-3 py-1.5 rounded-full shadow-lg"
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className={`text-transparent bg-gradient-to-r ${item.gradient} bg-clip-text`}
                      >
                        <Icon sx={{ fontSize: 16 }} className="!text-green-700" />
                      </motion.div>
                      <span className="text-xs font-bold text-green-900">
                        {item.titleHindi}
                      </span>
                    </motion.div>
                    {/* <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.4 }}
                      className="absolute top-3 right-3 bg-gradient-to-r from-green-600 to-lime-600 text-white px-3 py-1.5 rounded-full shadow-lg"
                    >
                      <span className="text-xs font-bold">₹{item.price}</span>
                      <span className="text-[10px] opacity-90">/day</span>
                    </motion.div> */}
                  </div>
                  <div className="p-4 md:p-5 flex flex-col flex-grow relative z-10">
                    <div className="flex-grow">
                      <h2 className="text-lg md:text-xl font-bold text-green-900 mb-2 group-hover:text-green-700 transition-colors duration-300">
                        {item.serviceName}
                      </h2>

                      <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="space-y-2 mb-3">
                        <motion.div
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-2 text-xs text-green-800 bg-green-50/50 rounded-lg px-2.5 py-1.5"
                        >
                          <CalendarMonth sx={{ fontSize: 14 }} className="text-green-600" />
                          <span className="font-medium">{item.date}</span>
                        </motion.div>
                        <motion.div
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-2 text-xs text-green-800 bg-green-50/50 rounded-lg px-2.5 py-1.5"
                        >
                          <AccessTime sx={{ fontSize: 14 }} className="text-green-600" />
                          <span className="font-medium">{item.time}</span>
                        </motion.div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.includes.map((inc, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay: index * 0.15 + 0.5 + idx * 0.05,
                              type: "spring",
                              stiffness: 200,
                            }}
                            whileHover={{ scale: 1.05, y: -1 }}
                            className="group/tag flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-gradient-to-r from-green-100 to-lime-100 text-green-800 backdrop-blur shadow-sm hover:shadow-md transition-all duration-300"
                          >
                            <CheckCircle
                              sx={{ fontSize: 11 }}
                              className="text-green-600"
                            />
                            {inc}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => {
                        setOpenAppointmentBookModal(true);
                        setSelectedService(item);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`mt-4 w-full bg-gradient-to-r ${item.gradient} text-white px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group/btn relative overflow-hidden`}
                    >
                      <motion.div
                        animate={{
                          x: hoveredCard === item.id ? ["0%", "200%"] : "0%",
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      />

                      <span className="relative z-10">Book Your Retreat</span>
                      <motion.div
                        animate={{ x: hoveredCard === item.id ? 4 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10"
                      >
                        <ArrowForward sx={{ fontSize: 16 }} />
                      </motion.div>
                    </motion.button>
                  </div>
                </motion.div>
                <motion.div
                  animate={{
                    opacity: hoveredCard === item.id ? 0.6 : 0,
                    scale: hoveredCard === item.id ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-2xl blur-xl -z-10`}
                />
              </motion.div>
            );
          })}
        </div>

   
      </motion.div>
      {openAppointmentBookModal && (
        <OPDBookingModal
          open={openAppointmentBookModal}
          handleClose={() => {
            setOpenAppointmentBookModal(false);
            setSelectedService(null);
          }}
          selectedService={selectedService}
        />
      )}
    </div>
  );
};

export default HabitationInOutLiving;