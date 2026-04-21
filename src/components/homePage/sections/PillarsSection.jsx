import React, { memo } from "react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  scaleIn,
  staggerContainer,
  containerVariants,
  cardVariants,
  getIcon,
} from "../HomePageConstants";
import { partnersData } from "../HomePageConstants";
import { Divider } from "@mui/material";

const PillarsSection = ({ healersRef, isHealersInView }) => {
  return (
    <section ref={healersRef} className="pb-5 px-4 md:px-12 xl:px-20 ">
      <div className="w-full mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isHealersInView ? "visible" : "hidden"}
          className="text-center mb-5 pt-5"
        >
          <motion.span
            variants={fadeInUp}
            className="text-[#C65A3A] tracking-[0.2em] uppercase text-sm font-medium"
          >
            Our Founders &
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl text-[#111827] mt-4 mb-6"
          >
            Pillars of SwaGrama
          </motion.h2>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-7xl mx-auto"
        >
          {partnersData.map((healer, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-tr from-green-100 via-lime-100 to-emerald-100 backdrop-blur-xl rounded-[2rem] p-6 shadow-soft hover:shadow-elevated transition-all duration-500 border border-white/50 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-200 to-lime-200 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                  <img
                    src={healer.image}
                    alt={healer.name}
                    className="relative w-32 h-32 rounded-2xl object-cover object-top shadow-md"
                  />
                </div>

                <h3 className="font-serif text-xl text-[#111827] mb-1 group-hover:text-green-700 transition-colors">
                  {healer.name}
                </h3>
                <p className="text-sm font-medium text-green-600 mb-4 tracking-wide">
                  {healer.title}
                </p>

          

                <div className="space-y-2.5 w-full">
                  {healer.roles.map((role, roleIndex) => (
                    <motion.div
                      key={roleIndex}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{
                        x: 0,
                        opacity: 1,
                      }}
                      transition={{ delay: roleIndex * 0.1 }}
                      className="flex items-start text-left  gap-2 text-xs text-gray-600 bg-green-50 p-2 rounded-lg"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1E8E7A] mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed">{role}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(PillarsSection);
