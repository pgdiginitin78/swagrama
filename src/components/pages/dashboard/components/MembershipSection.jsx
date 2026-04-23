import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle as CheckCircleIcon,
  AutoAwesome as SparkleIcon,
} from "@mui/icons-material";

const MembershipSection = ({
  membershipTiers,
  selectedTier,
  setSelectedTier,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-5"
    >
      <div>
        <h2 className="text-lg sm:text-xl font-black text-gray-900">
          Membership Plans
        </h2>
        <p className="text-xs text-gray-400 font-medium mt-0.5">
          Upgrade to unlock premium wellness experiences
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {membershipTiers.map((tier) => (
          <motion.div
            key={tier.id}
            whileHover={{ y: -4 }}
            onClick={() => !tier.current && setSelectedTier(tier)}
            className={`relative flex flex-col rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
              tier.current
                ? "border-gray-200 bg-white cursor-default"
                : selectedTier?.id === tier.id
                  ? "border-[#4a7c2c] bg-white cursor-pointer shadow-lg shadow-green-900/10"
                  : "border-gray-100 bg-white cursor-pointer hover:border-gray-300"
            }`}
          >
            {!tier.current && tier.id === "gold" && (
              <div className="absolute top-3 right-3 bg-amber-400 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                Popular
              </div>
            )}
            {tier.current && (
              <div className="absolute top-3 right-3 bg-[#4a7c2c] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                Active
              </div>
            )}

            <div className={`bg-gradient-to-br ${tier.color} p-5`}>
              <div className="flex items-center gap-2">
                <span className="text-white/90">{tier.icon}</span>
                <p className="text-sm font-black text-white">{tier.name}</p>
              </div>
              <p className="text-xl font-black text-white mt-3">{tier.price}</p>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="space-y-2.5 flex-1">
                {tier.perks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircleIcon
                      sx={{
                        fontSize: 14,
                        color: tier.current ? "#94a3b8" : "#4a7c2c",
                        marginTop: "1px",
                        flexShrink: 0,
                      }}
                    />
                    <span className="text-[11px] font-semibold text-gray-600 leading-tight">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>

              <button
                disabled={tier.current}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!tier.current) setSelectedTier(tier);
                }}
                className={`mt-5 w-full py-2.5 rounded-lg text-xs font-bold transition-all ${
                  tier.current
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#0f1f0f] text-white hover:bg-[#1a3a1a] active:scale-95"
                }`}
              >
                {tier.current ? "Current Plan" : `Upgrade to ${tier.name}`}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <SparkleIcon
            sx={{
              color: "#4a7c2c",
              fontSize: 18,
              marginTop: "1px",
              flexShrink: 0,
            }}
          />
          <div>
            <p className="text-xs font-black text-[#4a7c2c]">Why Upgrade?</p>
            <p className="text-[11px] text-green-800 font-medium mt-1 leading-relaxed">
              Higher tiers unlock deeper healing experiences — from dedicated
              wellness coaches to full family coverage and retreat access. Every
              upgrade brings you closer to complete holistic health.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MembershipSection;
