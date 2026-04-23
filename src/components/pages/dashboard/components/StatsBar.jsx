import React from "react";

const StatsBar = ({ userDashboardCount }) => {
  const stats = [
    {
      label: "Upcoming",
      value: userDashboardCount?.upcomingCount || 0,
      sub: "Sessions this month",
    },
    {
      label: "Completed",
      value: userDashboardCount?.completedCount || 0,
      sub: "Lifetime visits",
    },
    {
      label: "Orders",
      value: userDashboardCount?.orderCount || 0,
      sub: "Active shipments",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4"
        >
          <p className="text-xl sm:text-2xl font-black text-gray-900">
            {s.value}
          </p>
          <p className="text-[10px] sm:text-xs font-bold text-[#4a7c2c] mt-0.5">
            {s.label}
          </p>
          <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5 hidden sm:block">
            {s.sub}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
