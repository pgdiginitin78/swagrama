import { motion } from "framer-motion";
import { memo, useState } from "react";
import DoctorIcon from "../../../assets/communityHealers.svg";
import { cardVariants, containerVariants, healers } from "../HomePageConstants";

const CommunityHealers = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="py-5 px-4 sm:px-6 lg:px-8 2xl:px-0">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-4 shadow-md"
          >
            <img
              src={DoctorIcon}
              alt="Doctor Icon"
              width="40"
              height="40"
              loading="lazy"
              decoding="async"
              className="h-10 w-10"
            />
          </motion.div>

          <h2 className="font-bold text-gray-900 text-3xl sm:text-4xl tracking-tight mb-4">
            Our Community Healers
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Dedicated practitioners bringing together Ayurveda, Yoga,
            Homoeopathy &amp; Modern Medicine
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {healers.map((healer) => (
            <motion.div
              key={healer.id}
              variants={cardVariants}
              whileHover={{ y: -12 }}
              onHoverStart={() => setHoveredId(healer.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="relative"
            >
              <div
                className={`relative h-[350px] 2xl:h-[450px] overflow-hidden group cursor-pointer rounded-3xl bg-stone-900 transition-all duration-500 ${
                  hoveredId === healer.id
                    ? "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                    : "shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
                }`}
              >
                <motion.img
                  src={healer.image}
                  alt={healer.name}
                  width="280"
                  height="350"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{
                    scale: hoveredId === healer.id ? 1.08 : 1,
                    filter:
                      hoveredId === healer.id
                        ? "brightness(0.9)"
                        : "brightness(1)",
                  }}
                  transition={{ duration: 0.5 }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col items-center text-center">
                  <motion.h3
                    className="text-white text-lg font-bold mb-1 tracking-tight leading-tight"
                    animate={{ y: hoveredId === healer.id ? -4 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {healer.name}
                  </motion.h3>

                  <motion.p
                    className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide uppercase"
                    animate={{ y: hoveredId === healer.id ? -4 : 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    {healer.specialty}
                  </motion.p>

                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{
                      width: hoveredId === healer.id ? "40px" : "0px",
                      opacity: hoveredId === healer.id ? 1 : 0,
                    }}
                    className="h-1 bg-emerald-500 rounded-full mt-2"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default memo(CommunityHealers);
