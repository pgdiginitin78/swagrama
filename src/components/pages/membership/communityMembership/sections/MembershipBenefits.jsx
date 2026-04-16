import React, { memo } from "react";
import { motion } from "framer-motion";
import { benefits, fadeUp, containerVariants, itemVariants } from "../MembershipConstants";

const MembershipBenefits = () => {
  return (
    <section className="py-20 px-4 md:px-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-100 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50 -z-10" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-black text-green-900 mb-6">
          Membership Benefits
        </h2>
        <p className="text-lg text-green-700 max-w-2xl mx-auto font-medium">
          Unlock a world of holistic wellness and community wisdom with our
          exclusive membership privileges.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group p-6 rounded-2xl bg-white border border-green-100 shadow-sm hover:shadow-xl hover:border-green-300 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-lime-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                {benefit.icon}
              </div>
              <p className="text-gray-700 leading-relaxed font-medium group-hover:text-green-900 transition-colors">
                {benefit.text}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default memo(MembershipBenefits);
