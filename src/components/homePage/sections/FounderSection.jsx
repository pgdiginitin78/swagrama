import React, { memo } from "react";
import { motion } from "framer-motion";
import { fadeInUp, scaleIn, staggerContainer } from "../HomePageConstants";
import SantoshSuryavanshi from "../../assets/landing-page/ourexperts/SantoshSuryawanshi.webp";

const FounderSection = ({ foundersRef, isFoundersInView }) => {
  return (
    <section className="py-5 px-12  ">
      <div className="w-full mx-auto">
        <motion.div
          ref={foundersRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isFoundersInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="text-[#C65A3A] tracking-[0.2em] uppercase text-sm font-medium"
          >
            Our Mentor & Founder
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl text-[#111827] mt-4 mb-6"
          >
            Leading with Wisdom
          </motion.h2>
          <motion.div
            variants={scaleIn}
            className="grid justify-center mx-auto mt-12"
          >
            <div className="relative bg-gradient-to-tr from-green-100 via-lime-100 to-emerald-100 rounded-3xl p-8 md:p-12 shadow-elevated overflow-hidden border">
              <div className="absolute top-0 right-0 w-64 h-64 bg-forest/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <motion.div whileHover={{ scale: 1.05 }} className="relative">
                  <img
                    src={SantoshSuryavanshi}
                    alt="Vaidya Santosh Suryawanshi"
                    className="w-48 h-48 rounded-2xl object-cover object-top shadow-soft"
                  />
                  <div
                    className="  absolute -bottom-4 right-10
                      px-4 py-2 rounded-lg
                      text-sm  text-ayuMid font-semibold
                      backdrop-blur-xl
                      bg-gradient-to-r from-green-400/25 to-lime-400/25
                      border border-white/30
                      shadow-[0_6px_20px_rgba(34,197,94,0.45)]"
                  >
                    MD Ayurveda
                  </div>
                </motion.div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="font-serif text-2xl text-[#111827] mb-2">
                    Vaidya Santosh Suryawanshi
                  </h3>
                  <p className="text-[#C65A3A] font-medium mb-4">
                    Mentor & Guiding Force
                  </p>
                  <div className="space-y-2 text-[#6B7280]">
                    <div className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0"></span>
                      <span>CEO & Promotor : JnanaYogAyu Pvt. Ltd.</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0"></span>
                      <span>
                        Partner: SwaGrama Ayurveda Yoga Nisarga Agro Tourism LLP
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0"></span>
                      <span>Proprietor : Ayurvijnana Chikitsalaya</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0"></span>
                      <span>Partner : Smart Unity Healthcare LLP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(FounderSection);
