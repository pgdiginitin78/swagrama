import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowForward as ArrowForwardIcon,
  AutoAwesome as SparkleIcon,
  CheckCircle as CheckCircleIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import ActivityCard from "./ActivityCard";
import StatsBar from "./StatsBar";
import MembershipIcon from "../../../../assets/membershipIcon.svg";
import GroupedPersonCard from "./GroupedPersonCard";
import PersonBookingsModal from "./PersonBookingsModal";

const groupBookingsByPerson = (list = [], defaultType = "Activity") => {
  const groupsMap = new Map();

  list.forEach((item) => {
    const rawName = item.userName || item.name || item.patientName || "User";
    const key = (
      item.userId ||
      item.patientId ||
      item.userName ||
      item.name ||
      "unknown"
    )
      .toString()
      .trim()
      .toLowerCase();

    if (!groupsMap.has(key)) {
      groupsMap.set(key, {
        key,
        userName: rawName,
        gender: item.gender || item.userGender || "male",
        department: item.department || item.Department || item.type,
        type: item.type || defaultType,
        items: [],
      });
    }

    groupsMap.get(key).items.push(item);
  });

  const groups = Array.from(groupsMap.values());
  groups.forEach((group) => {
    group.items.sort((a, b) => {
      const da = new Date(a.date || a.Date || a.appointmentDate || 0).getTime();
      const db = new Date(b.date || b.Date || b.appointmentDate || 0).getTime();
      return db - da;
    });
  });

  return groups;
};

const OverviewSection = ({
  user,
  userDashboardCount,
  upcomingActivities = [],
  filterType = "upcoming",
  onFilterChange,
  loadingActivities = false,
  setActiveTab,
  setSelectedItem,
}) => {
  const [selectedPersonGroup, setSelectedPersonGroup] = useState(null);

  const processedActivities = useMemo(() => {
    if (filterType !== "previous") {
      return { isGrouped: false, items: upcomingActivities };
    }
    const grouped = groupBookingsByPerson(upcomingActivities, "Activity");
    return { isGrouped: true, items: grouped };
  }, [upcomingActivities, filterType]);

  const activities = upcomingActivities;

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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <p className="text-sm font-black text-gray-900">
              {filterType === "today"
                ? "Today's Activities"
                : filterType === "upcoming"
                ? "Upcoming Activities"
                : "Previous Activities"}
            </p>
            {onFilterChange && (
              <div className="inline-flex items-center p-1 bg-gray-100 rounded-xl border border-gray-200/70 shrink-0 self-start sm:self-auto shadow-sm">
                <button
                  type="button"
                  onClick={() => onFilterChange("upcoming")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
                    filterType === "upcoming"
                      ? "bg-white text-[#4a7c2c] shadow-sm font-black"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      filterType === "upcoming"
                        ? "bg-[#4a7c2c] animate-pulse"
                        : "bg-gray-400"
                    }`}
                  />
                  Upcoming
                </button>
                <button
                  type="button"
                  onClick={() => onFilterChange("today")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
                    filterType === "today"
                      ? "bg-white text-emerald-600 shadow-sm font-black"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      filterType === "today"
                        ? "bg-emerald-500 animate-ping"
                        : "bg-gray-400"
                    }`}
                  />
                  Today's
                </button>
                <button
                  type="button"
                  onClick={() => onFilterChange("previous")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
                    filterType === "previous"
                      ? "bg-white text-gray-900 shadow-sm font-black"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <HistoryIcon sx={{ fontSize: 13 }} />
                  Previous
                </button>
              </div>
            )}
          </div>

          {loadingActivities ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className="p-4 bg-white border border-gray-100 rounded-xl animate-pulse space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                    <div className="w-20 h-6 bg-gray-200 rounded" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="pt-3 border-t border-gray-50 flex justify-between">
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                    <div className="h-3 bg-gray-100 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-2xl border border-gray-100 text-center">
              <div className="p-2.5 bg-gray-50 text-gray-400 rounded-full mb-2">
                <HistoryIcon sx={{ fontSize: 24 }} />
              </div>
              <p className="text-xs font-bold text-gray-800">
                No {filterType === "today" ? "today's" : filterType} activities found
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5 max-w-xs">
                {filterType === "today"
                  ? "You don't have any activities scheduled for today."
                  : filterType === "previous"
                  ? "You don't have any past activities recorded yet."
                  : "You don't have any upcoming activities scheduled."}
              </p>
            </div>
          ) : (
            <div className="max-h-[500px] overflow-y-auto pr-1 group custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4 items-stretch">
                {processedActivities.isGrouped
                  ? processedActivities.items.map((group) => (
                      <GroupedPersonCard
                        key={group.key}
                        group={group}
                        onOpenModal={setSelectedPersonGroup}
                      />
                    ))
                  : activities.map((activity, idx) => (
                      <ActivityCard
                        key={activity.id || idx}
                        data={activity}
                        onClick={setSelectedItem}
                      />
                    ))}
              </div>
            </div>
          )}
        </div>

        <PersonBookingsModal
          open={Boolean(selectedPersonGroup)}
          onClose={() => setSelectedPersonGroup(null)}
          groupData={selectedPersonGroup}
          onSelectBooking={(booking) => {
            if (setSelectedItem) setSelectedItem(booking);
          }}
        />

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
            {user?.membershipRank || "Silver Plus"}
          </p>
          <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
            Since {user?.membershipSince || "Jan 2026"} · Lifetime
          </p>
          <div className="mt-4 space-y-2.5">
            {(user?.membershipPerks || [
              "15% Store Discount",
              "Unlimited Yoga Access",
              "Priority OPD Support",
              "Full Health Record Access",
            ]).map((p, i) => (
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
