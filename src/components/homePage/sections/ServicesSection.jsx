import React, { memo } from "react";
import { motion } from "framer-motion";
import { services } from "../HomePageConstants";

const ServicesSection = () => {
  return (
    <section className="py-12 sm:py-10  px-4 sm:px-6 lg:px-12 ">
      <motion.div
        className="max-w-7xl mx-auto text-center space-y-6 sm:space-y-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl  font-bold text-green-900"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Healing Services
        </motion.h2>
        <p className="text-base sm:text-lg text-green-700 max-w-2xl mx-auto px-4">
          Traditional Ayurvedic Treatments For Modern Wellness
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mt-8">
          {services.map((item, i) => (
            <motion.div
              key={i}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="relative h-32 sm:h-40 bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center overflow-hidden">
                <motion.img
                  src={item.img}
                  className="h-24 sm:h-28 object-contain transition-transform duration-500"
                  alt={item.title}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                />
                <div className="absolute inset-0 bg-green-900/10 group-hover:bg-green-900/5 transition-all" />
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="text-base  font-semibold text-green-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs  text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default memo(ServicesSection);
