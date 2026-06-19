import React, { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SantoshSuryavanshi from "../../assets/landing-page/ourexperts/Vaidya Santosh Suryawanshi.png";

const fly = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const credentials = [
  { role: "CEO & Promotor", org: "JnanaYogAyu Pvt. Ltd." },
  { role: "Partner", org: "SwaGrama Ayurveda Yoga Nisarga Agro Tourism LLP" },
  { role: "Proprietor", org: "Ayurvijnana Chikitsalaya" },
  { role: "Partner", org: "Smart Unity Healthcare LLP" },
];

const FounderSection = ({ foundersRef, isFoundersInView }) => {
  const internalRef = useRef(null);
  const ref = foundersRef || internalRef;
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const show = isFoundersInView !== undefined ? isFoundersInView : inView;

  return (
    <section
      ref={ref}
      className="relative py-12 px-4 sm:py-16 sm:px-8 lg:py-20 lg:px-16 xl:py-24 xl:px-24 2xl:py-32 2xl:px-12"
    >
      <div className="max-w-4xl sm:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-7xl mx-auto">
        <motion.div
          variants={fly(0)}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          className="flex items-center justify-center gap-3 mb-8 sm:mb-10 lg:mb-14 2xl:mb-16"
        >
          <div className="w-8 sm:w-10 lg:w-12 2xl:w-16 h-px bg-ayuBrown" />
          <span className="text-[9px] sm:text-[10px] lg:text-[11px] 2xl:text-xs tracking-[0.45em] uppercase font-medium text-ayuBrown">
            Mentor &amp; Founder
          </span>
          <div className="w-8 sm:w-10 lg:w-12 2xl:w-16 h-px bg-ayuBrown" />
        </motion.div>

        <motion.div
          variants={fly(0.1)}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-12 border border-amber-200/40 rounded-sm overflow-hidden bg-white"
        >
          <div className="sm:col-span-5 lg:col-span-4 relative min-h-64 sm:min-h-96 lg:min-h-[520px] xl:min-h-[580px] 2xl:min-h-[600px] bg-stone-100 flex flex-col justify-end overflow-hidden">
            <img
              src={SantoshSuryavanshi}
              alt="Vaidya Santosh Suryawanshi"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 lg:h-32 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="relative z-10 text-center mb-4 sm:mb-5 lg:mb-6 2xl:mb-8">
              <span className="inline-block text-[9px] sm:text-[10px] lg:text-[11px] 2xl:text-xs tracking-[0.35em] uppercase font-medium text-white px-4 py-1.5 border border-white/40 bg-white/15 backdrop-blur-md rounded-sm">
                MD Ayurveda
              </span>
            </div>
          </div>

          <div className="sm:col-span-7 lg:col-span-8 flex flex-col p-6 sm:p-8 lg:p-10 xl:p-12 2xl:p-16 border-t sm:border-t-0 sm:border-l border-ayuBrown">
            <div className="w-8 sm:w-10 lg:w-12 2xl:w-14 h-px bg-ayuBrown mb-4 sm:mb-5 lg:mb-6" />

            <motion.p
              variants={fly(0.18)}
              initial="hidden"
              animate={show ? "visible" : "hidden"}
              className="text-[9px] sm:text-[10px] lg:text-[11px] 2xl:text-xs tracking-[0.45em] uppercase font-medium text-amber-500 mb-2 sm:mb-3"
            >
              Guiding Force
            </motion.p>

            <motion.h2
              variants={fly(0.22)}
              initial="hidden"
              animate={show ? "visible" : "hidden"}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light leading-[1.1] tracking-tight text-stone-800 mb-1"
            >
              Vaidya Santosh
              <br />
              <em className="italic font-light">Suryawanshi</em>
            </motion.h2>

            <motion.p
              variants={fly(0.26)}
              initial="hidden"
              animate={show ? "visible" : "hidden"}
              className="text-[9px] sm:text-[10px] lg:text-[11px] 2xl:text-xs tracking-[0.25em] uppercase font-medium text-amber-700/70 mb-6 sm:mb-8 lg:mb-10 2xl:mb-12"
            >
              Ayurvedic Physician &amp; Visionary Leader
            </motion.p>

            <div className="h-px bg-stone-100 mb-5 sm:mb-6 lg:mb-8 2xl:mb-10" />

            <p className="text-[8px] sm:text-[9px] lg:text-[10px] 2xl:text-[11px] tracking-[0.55em] uppercase font-medium text-stone-300 mb-4 sm:mb-5 lg:mb-6 2xl:mb-8">
              Roles &amp; Affiliations
            </p>

            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 2xl:gap-6 flex-1">
              {credentials.map(({ role, org }, i) => (
                <motion.div
                  key={i}
                  variants={fly(0.3 + i * 0.08)}
                  initial="hidden"
                  animate={show ? "visible" : "hidden"}
                  className="flex items-start gap-3 sm:gap-4 lg:gap-5"
                >
                  <span
                    className={`mt-1.5 flex-shrink-0 w-1 h-1 sm:w-1.5 sm:h-1.5 2xl:w-2 2xl:h-2 rounded-full ${
                      i % 2 === 0 ? "bg-amber-400" : "bg-green-600"
                    }`}
                  />
                  <div>
                    <p className="text-[9px] sm:text-[10px] lg:text-[11px] 2xl:text-xs tracking-[0.3em] uppercase font-medium text-amber-700 mb-0.5">
                      {role}
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base 2xl:text-lg text-stone-600 font-light leading-snug">
                      {org}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(FounderSection);
