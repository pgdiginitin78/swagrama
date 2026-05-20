import {
  EventNote as BookingIcon,
  LocalShipping as ShippingIcon,
  Spa as SpaIcon,
  Hotel as StayIcon,
} from "@mui/icons-material";
import { Drawer, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import CommonButton from "../../../common/button/CommonButton";
import { StatusBadge } from "./ActivityCard";
import PaymentRefundDialog from "./PaymentRefundDialog";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import RescheduleAppointments from "../RescheduleAppointments";

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

const formatDate = (dateStr) =>
  dateStr?.includes("T")
    ? new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : dateStr;

const formatAmount = (amount) =>
  amount != null
    ? `₹${Number(amount).toLocaleString("en-IN")}`
    : null;

const getActivityDisplayData = (data) => {
  if (!data) return null;
  const type = data.type?.toLowerCase();
  const isStay = data.type === "StayBooking";

  return {
    id: data.bookingId || data.id || "N/A",
    name: data.title || data.name || data.doctorName,
    expert: isStay
      ? "Wellness Stay"
      : data.expert || (data.doctorName ? data.department : data.type),
    date: formatDate(data.date),
    time: formatTime(data.startTime || data.time),
    endTime: formatTime(data.endTime),
    amount: formatAmount(data.amount),
    type,
    rawType: data.type,
    status: data.status,
    prep: data.note || "",
    step: data.step,
    image: data.images || null,
    doctorName: data.doctorName || null,
    department: data.department || null,
    isStay,
  };
};

const TYPE_STYLES = {
  therapy: { bg: "bg-emerald-100 text-emerald-600", icon: <SpaIcon sx={{ fontSize: 18 }} /> },
  order: { bg: "bg-amber-100 text-amber-600", icon: <ShippingIcon sx={{ fontSize: 18 }} /> },
  stay: { bg: "bg-green-100 text-green-600", icon: <BookingIcon sx={{ fontSize: 18 }} /> },
  staybooking: { bg: "bg-teal-100 text-teal-600", icon: <StayIcon sx={{ fontSize: 18 }} /> },
};

const SHIP_STEPS = ["Packed", "Picked", "In Transit", "Delivered"];

const Field = ({ label, children, className = "" }) => (
  <div className={`p-2.5 bg-gray-50 rounded-lg ${className}`}>
    <p className="text-[10px] font-semibold text-gray-400 mb-0.5">{label}</p>
    {children}
  </div>
);

const ActivityDetailsDrawer = ({ item, open, onClose, onRescheduleSuccess }) => {
  const [refundDialogOpen, setRefundDialogOpen] = React.useState(false);
  const [rescheduleOpen, setRescheduleOpen] = React.useState(false);

  if (!item) return null;
  const d = getActivityDisplayData(item);
  const typeStyle = TYPE_STYLES[d.type] || { bg: "bg-amber-100 text-ayuBrown", icon: <BookingIcon sx={{ fontSize: 18 }} /> };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: "100%", maxWidth: { xs: "100%", sm: 360 } },
      }}
    >
      <div className="flex flex-col h-full bg-white">
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100 shrink-0">
          <p className="text-xs font-black text-gray-900 tracking-wide">Activity Details</p>
          <CancelButtonModal onClick={onClose} />
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2.5 space-y-2 no-scrollbar">
          {d.image && (
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <img
                src={d.image}
                alt={d.name}
                className="w-full h-full object-cover object-top "
              />
            </div>
          )}

          <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-lg">
            <div className={`p-2 rounded-lg shrink-0 ${typeStyle.bg}`}>{typeStyle.icon}</div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black text-gray-900 truncate">{d.name}</p>
              <p className="text-[9px] font-bold text-gray-400 tracking-wide mt-0.5">
                #{d.id}
              </p>
            </div>
            <StatusBadge status={d.status} />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Field label="Date">
              <p className="text-xs font-bold text-gray-800">{d.date}</p>
            </Field>
            <Field label="Amount">
              <p className="text-xs font-bold text-gray-800">{d.amount ?? "—"}</p>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Field label="Check-in Time">
              <p className="text-xs font-bold text-gray-800">{d.time || "—"}</p>
            </Field>
            <Field label="Check-out Time">
              <p className="text-xs font-bold text-gray-800">{d.endTime || "—"}</p>
            </Field>
          </div>

          {(d.doctorName || d.department || d.expert) && (
            <Field label={d.isStay ? "Room Type" : "Details"} className="col-span-2">
              <p className="text-xs font-bold text-gray-700">
                {d.doctorName || d.department || d.expert}
              </p>
            </Field>
          )}

          {d.prep && (
            <div className="p-2.5 bg-[#f0fdf4] border border-[#dcfce7] rounded-lg">
              <p className="text-[9px] font-black text-[#4a7c2c] uppercase tracking-widest mb-1">
                Prep Note
              </p>
              <p className="text-[10px] font-medium text-green-900 leading-relaxed">
                "{d.prep}"
              </p>
            </div>
          )}

          {d.type === "order" && (
            <div className="p-2.5 bg-gray-50 rounded-lg">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2.5">
                Shipping Progress
              </p>
              <Stepper activeStep={d.step} alternativeLabel>
                {SHIP_STEPS.map((label) => (
                  <Step key={label}>
                    <StepLabel>
                      <span className="text-[8px] font-black uppercase text-gray-500">
                        {label}
                      </span>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          )}
        </div>

        <div className="flex gap-2 px-3 py-2.5 border-t border-gray-100 shrink-0">
          <CommonButton
            type="button"
            label="Cancel Booking"
            onClick={() => setRefundDialogOpen(true)}
            className={`text-xs border border-red-500 text-red-500 ${d.isStay ? "w-full" : "flex-1"}`}
          />
          {!d.isStay && (
            <CommonButton
              type="button"
              label="Reschedule"
              className="flex-1 text-xs bg-ayuMid text-white"
              onClick={() => setRescheduleOpen(true)}
            />
          )}
        </div>
      </div>

      {refundDialogOpen && (
        <PaymentRefundDialog
          open={refundDialogOpen}
          onClose={() => setRefundDialogOpen(false)}
          onConfirm={() => {
            console.log("Refund requested for:", item);
            setRefundDialogOpen(false);
          }}
          bookingData={item}
        />
      )}

      {rescheduleOpen && (
        <RescheduleAppointments
          open={rescheduleOpen}
          onClose={() => setRescheduleOpen(false)}
          bookingData={item}
          onSuccess={onRescheduleSuccess}
        />
      )}
    </Drawer>
  );
};

export default ActivityDetailsDrawer;