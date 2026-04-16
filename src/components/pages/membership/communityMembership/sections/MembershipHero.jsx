import React, { memo } from "react";
import { motion } from "framer-motion";
import CommunityMembershipImg from "../../../../assets/membership/communityMembership.webp";

const MembershipHero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden -mt-20 sm:-mt-24 md:mt-0">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat w-full"
        style={{ backgroundImage: `url(${CommunityMembershipImg})` }}
      />

      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/40 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex h-full items-end justify-center px-2 md:px-0   pb-3 sm:pb-6 md:pb-0"
      >
        <div className="w-full max-w-full backdrop-blur-md bg-green-200/40 px-4 py-3 sm:py-5 md:py-5 border border-white/50 shadow-xl text-center rounded-2xl md:rounded-none">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1.5 drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]">
            <span className="bg-gradient-to-r from-green-800 via-lime-700 to-amber-800 bg-clip-text text-transparent">
              स्वग्रामसदस्यत्व
            </span>
          </h1>

          <h2 className="text-base sm:text-xl md:text-2xl lg:text-2xl font-bold text-green-900 mb-1.5 sm:mb-2 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">
            Community Membership
          </h2>

          <p className="text-xs sm:text-sm  text-green-900 font-bold leading-relaxed mb-1.5 sm:mb-2 drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
            आरोग्य आणि संस्थात्मक उन्नतीकडे एक पाऊल. समाजातून आरोग्यपूर्ण सेवा
            देणारे विश्वासार्ह, स्वयंपूर्ण गाव
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default memo(MembershipHero);
