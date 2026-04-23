import React from "react";
import { motion } from "framer-motion";
import {
  ArrowForward as ArrowForwardIcon,
  AutoAwesome as SparkleIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import ActivityCard from "./ActivityCard";
import StatsBar from "./StatsBar";
import MembershipIcon from "../../../../assets/membershipIcon.svg";

const OverviewSection = ({
  user,
  userDashboardCount,
  upcomingActivities,
  upcomingOPD,
  upcomingTherapies,
  mockData,
  setActiveTab,
  setSelectedItem,
}) => {
  const hasUpcomingData = 
    upcomingActivities?.length > 0 ||
    upcomingOPD?.length > 0 ||
    upcomingTherapies?.length > 0;

  const activities = hasUpcomingData 
    ? [...upcomingActivities, ...upcomingOPD, ...upcomingTherapies]
    : [
        mockData.appointments[0],
        mockData.therapies[0],
        mockData.orders[0],
        mockData.therapies[1],
      ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 sm:space-y-5"
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#0f1f0f] p-5 sm:p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <SparkleIcon sx={{ color: "#a3e635", fontSize: 13 }} />
            <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">
              Wellness Journey
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            नमस्ते, <span className="text-[#a3e635]">{user?.firstName}</span>
          </h1>
          <button
            onClick={() => setActiveTab("appointments")}
            className="mt-4 sm:mt-5 inline-flex items-center gap-2 bg-[#4a7c2c] text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-[#3d6824] transition-colors"
          >
            <span>View Schedule</span>
            <ArrowForwardIcon sx={{ fontSize: 13 }} />
          </button>
        </div>
      </div>

      <StatsBar userDashboardCount={userDashboardCount} />

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-black text-gray-900">
              Upcoming Activities
            </p>
          </div>
          <div className="max-h-[500px] overflow-y-auto pr-1 group custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
              {activities.map((activity, idx) => (
                <ActivityCard 
                  key={activity.id || idx} 
                  data={activity} 
                  onClick={setSelectedItem}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-64 xl:w-72 shrink-0 bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-black text-gray-900 uppercase tracking-wide">
              Membership
            </p>
            <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
              <img src={MembershipIcon} alt="Membership" className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xl font-black text-gray-900">
            {mockData.membership.rank}
          </p>
          <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
            Since {mockData.membership.since} · Lifetime
          </p>
          <div className="mt-4 space-y-2.5">
            {mockData.membership.perks.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircleIcon
                  sx={{ color: "#4a7c2c", fontSize: 13, flexShrink: 0 }}
                />
                <span className="text-[11px] font-semibold text-gray-600">
                  {p}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setActiveTab("membership")}
            className="mt-5 w-full py-2.5 bg-[#0f1f0f] text-white text-xs font-bold rounded-lg hover:bg-[#1a3a1a] transition-colors"
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OverviewSection;
