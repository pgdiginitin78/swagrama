import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { History as HistoryIcon } from "@mui/icons-material";
import ActivityCard from "./ActivityCard";
import GroupedPersonCard from "./GroupedPersonCard";
import PersonBookingsModal from "./PersonBookingsModal";

const groupBookingsByPerson = (list = [], sectionType = "") => {
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
        type: item.type || sectionType || "Consultation",
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

const GenericSection = ({
  title,
  icon,
  data = [],
  setSelectedItem,
  filterType,
  onFilterChange,
  loading = false,
}) => {
  const [selectedPersonGroup, setSelectedPersonGroup] = useState(null);

  const processedData = useMemo(() => {
    if (filterType !== "previous") {
      return { isGrouped: false, items: data };
    }
    const grouped = groupBookingsByPerson(data, title);
    return { isGrouped: true, items: grouped, totalRecords: data.length };
  }, [data, filterType, title]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2.5 bg-[#f0fdf4] text-[#4a7c2c] rounded-xl shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight truncate">
              {title}
            </h2>
            <p className="text-[11px] text-gray-400 font-medium">
              {data.length} {filterType ? `${filterType} ` : ""}records
              {filterType === "previous" &&
                processedData.isGrouped &&
                processedData.items.length < data.length && (
                  <span className="ml-1 text-emerald-700 font-bold">
                    ({processedData.items.length} persons)
                  </span>
                )}
            </p>
          </div>
        </div>

        {onFilterChange && (
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-xl border border-gray-200/70 shrink-0 self-start sm:self-auto shadow-sm">
            <button
              type="button"
              onClick={() => onFilterChange("upcoming")}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
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
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
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
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                filterType === "previous"
                  ? "bg-white text-gray-900 shadow-sm font-black"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <HistoryIcon sx={{ fontSize: 14 }} />
              Previous
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 pb-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="p-4 bg-white border border-gray-100 rounded-xl animate-pulse space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                <div className="w-20 h-6 bg-gray-200 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
              <div className="pt-3 border-t border-gray-50 flex justify-between">
                <div className="h-3 bg-gray-100 rounded w-1/3" />
                <div className="h-3 bg-gray-100 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 px-4 bg-white rounded-2xl border border-gray-100 text-center">
          <div className="p-3 bg-gray-50 text-gray-400 rounded-full mb-3">
            <HistoryIcon sx={{ fontSize: 26 }} />
          </div>
          <p className="text-sm font-bold text-gray-800">
            No {filterType === "today" ? "today's" : filterType || ""} {title.toLowerCase()} found
          </p>
          <p className="text-xs text-gray-400 mt-1 max-w-xs">
            {filterType === "today"
              ? `You don't have any ${title.toLowerCase()} scheduled for today.`
              : filterType === "previous"
              ? `You don't have any previous ${title.toLowerCase()} recorded yet.`
              : `You don't have any upcoming ${title.toLowerCase()} scheduled.`}
          </p>
        </div>
      ) : (
        <div className="max-h-[650px] overflow-y-auto pr-1 group custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 pb-6 items-stretch">
            {processedData.isGrouped
              ? processedData.items.map((group) => (
                  <GroupedPersonCard
                    key={group.key}
                    group={group}
                    onOpenModal={setSelectedPersonGroup}
                  />
                ))
              : data.map((item, i) => (
                  <ActivityCard
                    key={item.bookingId || item.id || i}
                    data={item}
                    onClick={setSelectedItem}
                  />
                ))}
          </div>
        </div>
      )}

      {/* Person Bookings Material UI Modal */}
      <PersonBookingsModal
        open={Boolean(selectedPersonGroup)}
        onClose={() => setSelectedPersonGroup(null)}
        groupData={selectedPersonGroup}
        onSelectBooking={(booking) => {
          if (setSelectedItem) setSelectedItem(booking);
        }}
      />
    </motion.div>
  );
};

export default GenericSection;
