import { motion } from "framer-motion";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import BookAppointmentIcon from "../../../assets/bookAppointment.svg";
import landigPageS1 from "../../assets/landing-page/landigPageS1.webm";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <motion.section
      className="relative min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={landigPageS1} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-green-900/70" />

      <div className="relative z-10 min-h-[80vh] sm:min-h-screen flex flex-col justify-between 2xl:justify-center px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-6 py-8 sm:py-12 md:py-16 lg:py-20 2xl:py-10">
        <motion.div
          className="flex-1 2xl:flex-none flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 md:space-y-8 2xl:space-y-10 max-w-xl sm:max-w-2xl md:max-w-4xl 2xl:max-w-5xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-amber-900/20 backdrop-blur-md border border-amber-700/30 rounded-lg text-white font-medium text-[10px] sm:text-xs md:text-sm lg:text-base shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ancient Wisdom • Modern Healing
          </motion.div>

          <motion.h1
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl  2xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-200 via-green-300 to-emerald-200 leading-snug sm:leading-tight px-2 sm:px-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Journey to Holistic Wellness
          </motion.h1>

          <motion.p
            className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-white font-light max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl px-2 sm:px-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Experience the transformative power of Ayurveda and Natural Healing
            at Swagrama Wellness Center
          </motion.p>
        </motion.div>

        <motion.div
          className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 2xl:mt-6 pb-4 sm:pb-6 md:pb-8 lg:pb-12 2xl:pb-0 flex justify-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <motion.button
            className="flex items-center gap-2 px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white backdrop-blur-xl bg-gradient-to-r from-green-400/25 to-lime-400/25 border border-white/30 shadow-[0_8px_30px_rgba(34,197,94,0.35)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.55)] hover:from-green-400/35 hover:to-lime-400/35 transition-all duration-300"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigate("/healing");
            }}
          >
            <img src={BookAppointmentIcon} className="w-4 h-4 sm:w-5 sm:h-5" />
            Book Appointment
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default memo(HeroSection);
