import React, { memo } from "react";
import { motion } from "framer-motion";
import { fadeUp, containerVariants, itemVariants, mergedMemberships } from "../MembershipConstants";

const MembershipPlans = ({ setSelectedService, setOpenEnquiryModal }) => {
  return (
    <section className="py-20 px-4 md:px-12 bg-gradient-to-br from-green-900 to-green-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-lime-400 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-400 rounded-full blur-[120px]" />
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-20 relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-lime-200 via-white to-green-200 bg-clip-text text-transparent">
          Membership Tiers
        </h2>
        <p className="text-xl text-green-100/80 max-w-3xl mx-auto font-medium leading-relaxed">
          Choose the membership that best fits your journey towards a natural
          and balanced lifestyle with Swagrama Community.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-[1400px] mx-auto relative z-10"
      >
        {mergedMemberships.map((membership, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`group flex flex-col h-full rounded-2xl md:rounded-[2.5rem] bg-white/5 backdrop-blur-md border ${
              membership.featured
                ? "border-lime-400/50 ring-4 ring-lime-400/10 shadow-[0_20px_50px_rgba(163,230,53,0.15)] scale-105"
                : "border-white/10"
            } hover:border-white/20 transition-all duration-500 overflow-hidden mt-2 md:mt-0`}
          >
            {membership.featured && (
              <div className="absolute top-0 right-0 py-1.5 px-6 rounded-bl-3xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg animate-pulse whitespace-nowrap bg-gradient-to-r from-lime-400 to-green-500 text-green-950">
                Most Preferred
              </div>
            )}

            <div className={`p-8 bg-gradient-to-br ${membership.gradientClass}`}>
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 rounded-2xl bg-white/40 shadow-xl backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
                  <membership.icon className="w-8 h-8 text-green-900" />
                </div>
                <div className="text-right">
                  <div className="text-green-900/60 font-black text-xs uppercase tracking-widest mb-1">
                    {membership.duration}
                  </div>
                  <div className="text-sm font-bold text-green-950/80 px-2 py-0.5 rounded-full bg-black/5 inline-block">
                    {membership.couponCode}
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-black text-green-950 leading-tight mb-2 group-hover:translate-x-1 transition-transform">
                {membership.title}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-green-950">
                  ₹{membership.primaryDiscount.toLocaleString("en-IN")}
                </span>
                <span className="text-lg text-green-900/40 line-through decoration-2 font-bold opacity-60">
                  ₹{membership.price.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <p className="text-green-50/70 text-sm leading-relaxed mb-8 italic border-l-2 border-lime-400/30 pl-4">
                {membership.description}
              </p>

              <div className="space-y-4 mb-10 flex-1">
                {membership.benifits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4 group/benefit">
                    <div className="mt-1 w-2 h-2 rounded-full bg-lime-400 group-hover/benefit:scale-125 transition-transform" />
                    <span className="text-sm font-medium text-green-50/90 leading-tight">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedService(membership);
                  setOpenEnquiryModal(true);
                }}
                className={`w-full py-2 sm:py-5 rounded-2xl text-base font-black transition-all duration-300 relative overflow-hidden group/btn flex items-center justify-center gap-3 ${
                  membership.featured
                    ? "bg-gradient-to-r from-lime-400 to-green-400 text-green-950 shadow-lg shadow-lime-400/20 hover:shadow-lime-400/40"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                <span className="relative z-10">Select Membership</span>
                <span className="text-xl group-hover/btn:translate-x-2 transition-transform">
                  →
                </span>
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default memo(MembershipPlans);
