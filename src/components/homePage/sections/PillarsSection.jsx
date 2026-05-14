import { motion } from "framer-motion";
import React, { memo } from "react";
import {
  cardVariants,
  containerVariants,
  fadeInUp,
  partnersData,
  staggerContainer
} from "../HomePageConstants";

const PillarsSection = ({ healersRef, isHealersInView }) => {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  return (
    <section ref={healersRef} className="pb-24 px-4 md:px-12 xl:px-6 bg-[#fafaf9]">
      <div className="w-full mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isHealersInView ? "visible" : "hidden"}
          className="text-center mb-16 pt-10"
        >
          <motion.span
            variants={fadeInUp}
            className="text-[#C65A3A] tracking-[0.3em] uppercase text-xs font-bold"
          >
            Our Visionaries &
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="font-serif text-3xl md:text-4xl  text-[#111827] mt-4"
          >
            Pillars of SwaGrama
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mx-auto px-3 md:px-5"
        >
          {partnersData.map((healer, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover="hover"
              className="relative h-[450px] 2xl:h-[600px] rounded-[1rem] overflow-hidden shadow-2xl group cursor-pointer transition-all duration-700"
            >
              {/* Background Image with Zoom Effect */}
              <img
                src={healer.image}
                alt={healer.name}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Multi-layered Gradient Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

              {/* Content Container */}
              <div className="absolute inset-0 p-5 2xl:p-10 flex flex-col justify-end">
                
                {/* Roles List - Full Width and Clean on Hover */}
                <div className="absolute inset-0 px-4 flex items-center justify-center pointer-events-none z-20">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : 20
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="space-y-2 w-full px-3"
                  >
                    {healer.roles.map((role, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{
                          opacity: hoveredIndex === index ? 1 : 0,
                          scale: hoveredIndex === index ? 1 : 0.95
                        }}
                        transition={{
                          duration: 0.3,
                          delay: hoveredIndex === index ? idx * 0.05 : 0
                        }}
                        className="text-white text-[11px] md:text-sm font-medium text-center w-full"
                      >
                        <div className="block w-full py-2 px-2 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
                          {role}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Aesthetic Divider Line */}
                <div className="h-[1px] w-full bg-gradient-to-r from-white/40 via-white/10 to-transparent mb-3" />

                {/* Name and Professional Title */}
                <motion.div
                  animate={{
                    y: hoveredIndex === index ? -5 : 0,
                    opacity: hoveredIndex === index ? 0.8 : 1
                  }}
                  transition={{ duration: 0.4 }}
                >
                    <h3 className="font-serif text-2xl 2xl:text-3xl text-white mb-2 tracking-tight group-hover:text-orange-50 transition-colors">
                      {healer.name}
                    </h3>
                    <p className="text-xs md:text-sm font-bold text-orange-400 tracking-[0.25em] uppercase">
                      {healer.title}
                    </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(PillarsSection);
