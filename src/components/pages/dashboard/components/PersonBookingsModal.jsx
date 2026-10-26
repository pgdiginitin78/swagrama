import React from "react";
import { Modal, Box } from "@mui/material";
import {
  AccessTime as TimeIcon,
  CalendarMonth as CalendarIcon,
  ChevronRight as ChevronRightIcon,
  MedicalServices as MedicalIcon,
  Spa as SpaIcon,
} from "@mui/icons-material";
import { ModalStyle } from "../../../common/modalStyle/ModalStyle";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import MaleIcon from "../../../../assets/3d_male_avatar.webp";
import FemaleIcon from "../../../../assets/3d_female_avatar.webp";
import { StatusBadge } from "./ActivityCard";

const formatTime = (timeStr) => {
  if (!timeStr || typeof timeStr !== "string") return timeStr || "";

  const trimmed = timeStr.trim();
  const ampmMatch = trimmed.match(/(AM|PM)/i);

  if (ampmMatch) {
    const period = ampmMatch[1].toUpperCase();
    const cleanTime = trimmed.replace(/\s*(AM|PM)\s*/gi, "").trim();
    if (cleanTime.includes(":")) {
      const [hours, minutes] = cleanTime.split(":");
      const h = parseInt(hours, 10);
      const m = (minutes || "00").substring(0, 2);
      if (!isNaN(h)) {
        return `${h}:${m} ${period}`;
      }
    }
    return trimmed;
  }

  if (trimmed.includes(":") && trimmed.split(":").length >= 2) {
    const [hours, minutes] = trimmed.split(":");
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

const PersonBookingsModal = ({
  open,
  onClose,
  groupData,
  onSelectBooking,
}) => {
  if (!open || !groupData) return null;

  const { userName, gender, items = [], type } = groupData;
  const isFemale = String(gender || "").toLowerCase().startsWith("f");
  const avatar = isFemale ? FemaleIcon : MaleIcon;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="person-bookings-modal-title"
    >
      <Box
        sx={ModalStyle}
        className="w-[95%] sm:w-[88%] md:w-[78%] lg:w-[62%] max-w-3xl max-h-[88vh] rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#1b3d1b] via-[#285228] to-[#1b3d1b] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-emerald-900/40">
          <div className="flex items-center gap-3.5 min-w-0 pr-10">
            <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm p-1 flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
              <img
                src={avatar}
                alt={userName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="min-w-0">
              <h2
                id="person-bookings-modal-title"
                className="text-base sm:text-lg font-black tracking-tight text-white truncate"
              >
                {userName}&apos;s Previous Bookings
              </h2>
              <p className="text-white/75 text-[11px] sm:text-xs font-medium flex items-center gap-2 mt-0.5">
                <span className="capitalize">{type || "Booking"}</span>
                <span>•</span>
                <span className="bg-white/15 px-2 py-0.5 rounded-full font-bold">
                  {items.length} completed records
                </span>
              </p>
            </div>
          </div>
          <CancelButtonModal onClick={onClose} />
        </div>

        {/* Subheader info strip */}
        <div className="bg-[#f0f7ed] px-5 sm:px-6 py-2.5 border-b border-[#e2edd9] flex items-center justify-between text-[11px] text-[#2e5e2e] font-semibold">
          <span>Click any booking below to view full summary</span>
          <span className="text-[#4a7c2c] font-bold">
            All records verified
          </span>
        </div>

        {/* Bookings List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-[#f8f9f6] custom-scrollbar">
          {items.map((booking, idx) => {
            const bookingId =
              booking.bookingId ||
              booking.appointmentId ||
              booking.id ||
              idx + 1;
            const title =
              booking.title ||
              booking.therapyName ||
              booking.TherapyName ||
              (booking.DoctorName
                ? `Dr. ${booking.DoctorName}`
                : booking.doctorName
                  ? `Dr. ${booking.doctorName}`
                  : null) ||
              booking.department ||
              booking.Department ||
              `${type || "Booking"} Session`;

            const subtitle =
              booking.DoctorName && booking.Department
                ? `${booking.Department} Department`
                : booking.doctorName && booking.department
                  ? `${booking.department} Department`
                  : booking.TherapyName || booking.therapyName
                    ? "Therapy Session"
                    : booking.type || "Completed Visit";

            const dateStr = formatDate(
              booking.date || booking.Date || booking.appointmentDate,
            );
            const timeStr = formatTime(
              booking.startTime ||
                booking.StartTime ||
                booking.time ||
                booking.total,
            );
            const amount =
              booking.amount != null
                ? booking.amount
                : booking.Amount != null
                  ? booking.Amount
                  : null;

            const isTherapy =
              String(booking.type || "").toLowerCase().includes("therapy") ||
              Boolean(booking.therapyName || booking.TherapyName);

            return (
              <div
                key={bookingId}
                onClick={() => {
                  onClose();
                  onSelectBooking(booking);
                }}
                className="group relative p-4 bg-white rounded-xl border border-gray-100 hover:border-[#4a7c2c]/40 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3.5"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div
                    className={`p-2.5 rounded-xl shrink-0 flex items-center justify-center ${
                      isTherapy
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {isTherapy ? (
                      <SpaIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <MedicalIcon sx={{ fontSize: 20 }} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-gray-900 group-hover:text-[#4a7c2c] transition-colors truncate">
                        {title}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        #{bookingId}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                      {subtitle}
                    </p>

                    <div className="flex items-center gap-3 mt-1.5 text-[11px] text-gray-500 font-semibold flex-wrap">
                      <div className="flex items-center gap-1 text-gray-600">
                        <CalendarIcon
                          sx={{ fontSize: 13, color: "#4a7c2c" }}
                        />
                        <span>{dateStr || "—"}</span>
                      </div>
                      {timeStr && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <TimeIcon sx={{ fontSize: 13, color: "#4a7c2c" }} />
                          <span>{timeStr}</span>
                        </div>
                      )}
                      {amount != null && (
                        <div className="flex items-center text-emerald-700 font-bold">
                          <span>₹{Number(amount).toLocaleString("en-IN")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                  <StatusBadge status="Completed" />
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#4a7c2c] bg-[#f0fdf4] group-hover:bg-[#4a7c2c] group-hover:text-white rounded-lg transition-colors border border-[#4a7c2c]/20"
                  >
                    <span>Details</span>
                    <ChevronRightIcon sx={{ fontSize: 15 }} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-white border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">
            Total {items.length} records found for {userName}
          </span>
          <CommonButton
            label="Close"
            onClick={onClose}
            className="!bg-gray-100 !text-gray-700 hover:!bg-gray-200 !shadow-none font-bold"
          />
        </div>
      </Box>
    </Modal>
  );
};

export default PersonBookingsModal;
