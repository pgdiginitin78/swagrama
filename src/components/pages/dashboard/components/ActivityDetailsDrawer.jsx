import React from "react";
import { Drawer, IconButton, Stepper, Step, StepLabel } from "@mui/material";
import {
  Close as CloseIcon,
  EventNote as BookingIcon,
  LocalShipping as ShippingIcon,
  Spa as SpaIcon,
} from "@mui/icons-material";
import { StatusBadge } from "./ActivityCard";
import CommonButton from "../../../common/button/CommonButton";

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
    prep: data.note || "",
    step: data.step,
  };
};

const ActivityDetailsDrawer = ({ item, open, onClose }) => {
  if (!item) return null;
  const displayData = getActivityDisplayData(item);
console.log("displayData",item);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: "100%", maxWidth: 420 } }}
    >
      <div className="flex flex-col h-[95%] bg-white">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <p className="text-sm font-black text-gray-900">Activity Details </p>
          <IconButton onClick={onClose} size="small">
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div
              className={`p-3 rounded-xl shrink-0 ${
                displayData.type === "therapy"
                  ? "bg-emerald-100 text-emerald-600"
                  : displayData.type === "order"
                    ? "bg-amber-100 text-amber-600"
                    : displayData.type === "stay"
                      ? "bg-green-100 text-green-600"
                      : "bg-amber-100 text-ayuBrown"
              }`}
            >
              {displayData.type === "therapy" ? (
                <SpaIcon />
              ) : displayData.type === "order" ? (
                <ShippingIcon />
              ) : (
                <BookingIcon />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black text-gray-900 truncate">
                {displayData.name}
              </p>
              <p className="text-[10px] font-bold text-gray-400 mt-0.5  tracking-wide">
                {displayData.id}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-[14px] font-semibold text-gray-400   mb-1">
                Date
              </p>
              <p className="text-sm font-bold text-gray-800">
                {displayData.date}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-[14px] font-semibold text-gray-400   mb-1">
                Time / Amount
              </p>
              <p className="text-sm font-bold text-gray-800">
                {displayData.time}
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-[14px] font-semibold text-gray-400   mb-1">
              Status
            </p>
            <StatusBadge status={displayData.status} />
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-[14px] font-semibold text-gray-400   mb-1">
              Details
            </p>
            <p className="text-sm font-bold text-gray-700">
              {displayData.expert}
            </p>
          </div>

          {displayData.prep && (
            <div className="p-4 bg-[#f0fdf4] border border-[#dcfce7] rounded-xl">
              <p className="text-[9px] font-black text-[#4a7c2c] uppercase tracking-widest mb-2">
                Preparation Note
              </p>
              <p className="text-xs font-medium text-green-900 leading-relaxed">
                "{displayData.prep}"
              </p>
            </div>
          )}

          {displayData.type === "order" && (
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">
                Shipping Progress
              </p>
              <Stepper activeStep={displayData.step} alternativeLabel>
                {["Packed", "Picked", "In Transit", "Delivered"].map(
                  (label) => (
                    <Step key={label}>
                      <StepLabel>
                        <span className="text-[9px] font-black uppercase text-gray-500">
                          {label}
                        </span>
                      </StepLabel>
                    </Step>
                  ),
                )}
              </Stepper>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center px-4 ">
          <CommonButton
            type="button"
            label="Cancel"
            className=" border border-red-500 text-red-500"
          />
          <CommonButton
            type="button"
            label="Reschedule"
            className=" px-5  bg-ayuMid text-white"
          />
        </div>

        {/* <div className="p-4 sm:p-5 border-t border-gray-100 shrink-0">
          <button className="w-full py-3 border-2 border-gray-200 text-gray-600 font-bold text-xs rounded-xl hover:bg-gray-50 active:scale-95 transition-all">
            Need Help?
          </button>
        </div> */}
      </div>
    </Drawer>
  );
};

export default ActivityDetailsDrawer;
