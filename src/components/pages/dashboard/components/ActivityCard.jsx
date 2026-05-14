import React from "react";
import { motion } from "framer-motion";
import {
  AccessTime as TimeIcon,
  LocalShipping as ShippingIcon,
} from "@mui/icons-material";
import TherapyIcon from "../../../../assets/TherapyIcon.svg";
import DoctorIcon from "../../../../assets/doctorIcon.svg";
import BedRoomIcon from "../../../assets/bedRoomIcon.svg";

export const StatusBadge = ({ status }) => {
  const isActive = status === "Upcoming" || status === "In Transit";
  return (
    <span
      className={`inline-flex items-center gap-1 px-4 py-1 rounded text-[14px] font-bold whitespace-nowrap ${
        isActive
          ? "bg-emerald-50 text-emerald-600 border border-emerald-600"
          : "bg-gray-100 text-gray-400 border"
      }`}
    >
      {isActive && (
        <span className="w-1 h-1 rounded-full bg-emerald-500  animate-pulse shrink-0" />
      )}
      {status}
    </span>
  );
};

const formatTime = (timeStr) => {
  if (!timeStr || typeof timeStr !== "string") return timeStr;
  if (timeStr.includes(":") && timeStr.split(":").length >= 2) {
    const [hours, minutes] = timeStr.split(":");
    let h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minutes} ${ampm}`;
  }
  return timeStr;
};

const getActivityDisplayData = (data) => {
  if (!data) return null;

  return {
    id: data.id || "N/A",
    name: data.title || data.name || data.doctorName,
    expert:
      data.type === "Stay"
        ? "Wellness Stay"
        : data.expert || (data.doctorName ? data.department : data.type),
    date: data.date?.includes("T")
      ? new Date(data.date).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : data.date,
    time: formatTime(data.startTime || data.time || data.total),
    type: data.type?.toLowerCase(),
    status: data.status,
    prep: data.prep,
    step: data.step,
  };
};

const ActivityCard = ({ data, onClick }) => {
  const displayData = getActivityDisplayData(data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
      onClick={() => onClick(data)}
      className="flex flex-col justify-between p-4 bg-white border border-gray-100 rounded-xl cursor-pointer transition-all duration-200 min-w-0"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div
          className={`p-2.5 rounded-lg shrink-0 ${
            displayData.type?.includes("therapy")
              ? "bg-emerald-50 text-emerald-600"
              : displayData.type === "order"
                ? "bg-amber-50 text-amber-600"
                : displayData.type === "stay"
                  ? "bg-purple-50 text-green-600"
                  : "bg-blue-50 text-blue-600"
          }`}
        >
          {displayData.type?.includes("therapy") ? (
            <img src={TherapyIcon} alt="Therapy" className="w-6 h-6" />
          ) : displayData.type === "order" ? (
            <ShippingIcon sx={{ fontSize: 16 }} />
          ) : displayData.type === "stay" ? (
            <img src={BedRoomIcon} alt="" className="w-6 h-6" />
          ) : (
            <img src={DoctorIcon} alt="Expert" className="w-6 h-6" />
          )}
        </div>
        <StatusBadge status={displayData.status} />
      </div>

      <div className="mb-3 flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900 leading-tight">
          {displayData.name}
        </p>
        <p className="text-[11px] text-gray-400 font-medium mt-0.5">
          {displayData.expert}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50 gap-2">
        <div className="flex items-center gap-1.5 text-gray-500 min-w-0">
          <TimeIcon sx={{ fontSize: 12, color: "#4a7c2c", flexShrink: 0 }} />
          <span className="text-[10px] font-semibold">
            {displayData.date}
          </span>
        </div>
        <span className="text-[10px] font-bold text-gray-400 shrink-0">
          {displayData.time}
        </span>
      </div>
    </motion.div>
  );
};

export default ActivityCard;
