import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookAppointmentIcon from "../../../assets/bookAppointment.svg";
import landigPageS1 from "../../assets/landing-page/landigPageS1.webm";
const heroPoster = "/heroPoster.webp";

const HeroSection = () => {
  const navigate = useNavigate();
  const [canStreamVideo, setCanStreamVideo] = useState(false);

  useEffect(() => {
    // Only stream the 13.8MB video on desktop devices with high-speed connection after idle/load
    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ));

    if (isMobile) {
      // Mobile displays the high-res crisp hero poster image directly without 13.8MB data waste
      return;
    }

    if ("requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(
        () => setCanStreamVideo(true),
        { timeout: 3500 },
      );
      return () => window.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(() => setCanStreamVideo(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* High-priority immediate responsive LCP image for mobile and desktop */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none">
        <source
          media="(max-width: 767px)"
          srcSet="/heroPoster-mobile.webp"
          type="image/webp"
        />
        <img
          src={heroPoster}
          alt="Swagrama Holistic Wellness"
          width="1536"
          height="1024"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </picture>

      {/* Video stream on desktop once idle */}
      {canStreamVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroPoster}
          width="1920"
          height="1080"
          aria-hidden="true"
          className="hidden md:block absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src={landigPageS1} type="video/webm" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-green-900/70" />

      <div className="relative z-10 min-h-[80vh] sm:min-h-screen flex flex-col justify-between 2xl:justify-center px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-6 py-8 sm:py-12 md:py-16 lg:py-20 2xl:py-10">
        <motion.div
          className="flex-1 2xl:flex-none flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6 md:space-y-8 2xl:space-y-10 max-w-xl sm:max-w-2xl md:max-w-4xl 2xl:max-w-5xl mx-auto"
          initial={{ opacity: 1 }} animate={{ opacity: 1 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-amber-900/20 backdrop-blur-md border border-amber-700/30 rounded-lg text-white font-medium text-[10px] sm:text-xs md:text-sm lg:text-base shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ancient Wisdom • Modern Healing
          </motion.div>

          <motion.h1
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-200 via-green-300 to-emerald-200 leading-snug sm:leading-tight px-2 sm:px-4"
            initial={{ opacity: 1 }} animate={{ opacity: 1 }}
          >
            Journey to Holistic Wellness
          </motion.h1>

          <motion.p
            className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl text-white font-light max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl px-2 sm:px-4"
            initial={{ opacity: 1 }} animate={{ opacity: 1 }}
          >
            Experience the transformative power of Ayurveda and Natural Healing
            at Swagrama Wellness Center
          </motion.p>
        </motion.div>

        <motion.div
          className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 2xl:mt-6 pb-4 sm:pb-6 md:pb-8 lg:pb-12 2xl:pb-0 flex justify-center"
          initial={{ opacity: 1 }} animate={{ opacity: 1 }}
        >
          <motion.button
            className="flex items-center gap-2 px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white backdrop-blur-xl bg-gradient-to-r from-green-400/25 to-lime-400/25 border border-white/30 shadow-[0_8px_30px_rgba(34,197,94,0.35)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.55)] hover:from-green-400/35 hover:to-lime-400/35 transition-all duration-300"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigate("/healing");
            }}
          >
            <img
              src={BookAppointmentIcon}
              alt="Book appointment"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            Book Appointment
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(HeroSection);
