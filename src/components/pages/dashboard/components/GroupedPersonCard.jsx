import React from "react";
import { motion } from "framer-motion";
import { AccessTime as TimeIcon } from "@mui/icons-material";
import MaleIcon from "../../../../assets/3d_male_avatar.webp";
import FemaleIcon from "../../../../assets/3d_female_avatar.webp";
import CommonButton from "../../../common/button/CommonButton";
import { StatusBadge } from "./ActivityCard";

const formatTime = (timeStr) => {
  if (!timeStr || typeof timeStr !== "string") return timeStr || "";
  const cleanTimeStr = timeStr.replace(/\s*(AM|PM|am|pm)\s*/gi, "").trim();
  if (cleanTimeStr.includes(":") && cleanTimeStr.split(":").length >= 2) {
    const [hours, minutes] = cleanTimeStr.split(":");
    let h = parseInt(hours, 10);
    if (!isNaN(h)) {
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      const m = (minutes || "00").substring(0, 2);
      return `${h}:${m} ${ampm}`;
    }
  }
  return timeStr;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    }
  } catch (e) {
    // fallback
  }
  return String(dateStr);
};

const GroupedPersonCard = ({ group, onOpenModal }) => {
  const { userName, gender, department, type, items = [] } = group;
  const isFemale = String(gender || "").toLowerCase().startsWith("f");
  const avatar = isFemale ? FemaleIcon : MaleIcon;
  const count = items.length;

  const latestItem = items[0] || {};
  const latestDate = formatDate(
    latestItem.date || latestItem.Date || latestItem.appointmentDate
  );
  const latestTime = formatTime(
    latestItem.startTime ||
      latestItem.StartTime ||
      latestItem.time ||
      latestItem.total
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
      onClick={() => onOpenModal && onOpenModal(group)}
      className="flex flex-col justify-between h-full p-4 bg-white border border-gray-100 hover:border-[#4a7c2c]/40 rounded-xl cursor-pointer transition-all duration-200 min-w-0 group shadow-sm"
    >
      <div>
        {/* Top row: Avatar on left, Completed badge on right - strictly non-wrapping */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="relative shrink-0">
            <div className="p-2.5 rounded-lg shrink-0 flex items-center justify-center overflow-hidden bg-blue-50/50">
              <motion.img
                src={avatar}
                alt={userName}
                className="w-8 h-8 object-cover rounded-full shadow-sm"
                // animate={{ y: [-2, 2, -2] }}
                // transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
            </div>

          </div>

          <div className="shrink-0">
            <StatusBadge status="Completed" />
          </div>
        </div>

        {/* Middle row: Name and Department/Type */}
        <div className="mb-3 min-w-0">
          <p className="text-sm font-bold text-gray-900 leading-tight truncate group-hover:text-[#4a7c2c] transition-colors">
            {userName}
          </p>
          <p className="text-[11px] text-gray-400 font-medium capitalize mt-0.5 truncate">
            {department || type || "Opd"}
          </p>
        </div>
      </div>

      {/* Bottom section: Date & Time + Action Button */}
      <div className="space-y-2.5 pt-3 border-t border-gray-50">
        <div className="flex items-center justify-between text-gray-500 gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <TimeIcon sx={{ fontSize: 12, color: "#4a7c2c", flexShrink: 0 }} />
            <span className="text-[10px] font-semibold truncate">
              {latestDate || "—"}
            </span>
          </div>
          {latestTime && (
            <span className="text-[10px] font-bold text-gray-400 shrink-0">
              {latestTime}
            </span>
          )}
        </div>

        <CommonButton
          label={`View Bookings (${count})`}
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenModal) onOpenModal(group);
          }}
          fullWidth
          className="!bg-[#4a7c2c] hover:!bg-[#3d6824] !text-white !h-8 !px-3 !text-xs !font-semibold !rounded-lg !w-full !justify-center !shadow-none"
        />
      </div>
    </motion.div>
  );
};

export default GroupedPersonCard;
