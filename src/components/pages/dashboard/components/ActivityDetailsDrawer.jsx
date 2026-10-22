import {
  EventNote as BookingIcon,
  Person,
  LocalShipping as ShippingIcon,
  Spa as SpaIcon,
  Hotel as StayIcon,
} from "@mui/icons-material";
import { Drawer, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import CommonButton from "../../../common/button/CommonButton";
import PaymentRefundDialog from "./PaymentRefundDialog";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import RescheduleAppointments from "../RescheduleAppointments";
import RescheduleTherapy from "../RescheduleTherapy";

const formatTime = (timeStr) => {
  if (!timeStr || typeof timeStr !== "string") return timeStr || null;
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
  if (!dateStr) return null;
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
  return typeof dateStr === "string" ? dateStr : null;
};

const formatAmount = (amount) => {
  if (amount == null || amount === "") return null;
  const num = Number(amount);
  return !isNaN(num) ? `₹${num.toLocaleString("en-IN")}` : `₹${amount}`;
};

const getActivityDisplayData = (data) => {
  if (!data) return null;
  const rawType = data.type || "";
  const type = typeof rawType === "string" ? rawType.toLowerCase() : "";
  const isStay =
    rawType === "StayBooking" || type === "stay" || type === "staybooking";
  const isOPD = rawType === "OPD" || type === "opd";

  const isTherapy =
    rawType === "TherapyBooking" ||
    type === "therapy" ||
    type === "therapybooking" ||
    type.includes("therapy") ||
    Boolean(data.therapyName || data.TherapyName);

  // Safely extract therapy name with multiple fallbacks
  const therapyName =
    (typeof data.therapyName === "string" && data.therapyName.trim()) ||
    (typeof data.TherapyName === "string" && data.TherapyName.trim()) ||
    (typeof data.serviceName === "string" && data.serviceName.trim()) ||
    (isTherapy && typeof data.title === "string" && data.title.trim()) ||
    (isTherapy && typeof data.name === "string" && data.name.trim()) ||
    null;

  const rawImage = data.images || data.image || null;
  const image = Array.isArray(rawImage)
    ? rawImage[0]
    : typeof rawImage === "string"
      ? rawImage
      : null;

  return {
    id: data.bookingId || data.id || "N/A",
    name:
      therapyName ||
      (typeof data.title === "string" && data.title.trim()) ||
      (typeof data.name === "string" && data.name.trim()) ||
      data.doctorName ||
      "Activity",
    therapyName,
    isTherapy,
    expert: isStay
      ? "Wellness Stay"
      : isTherapy
        ? therapyName || "Therapy Session"
        : data.expert || (data.doctorName ? data.department : rawType),
    date: formatDate(data.date),
    time: formatTime(data.startTime || data.time),
    endTime: formatTime(data.endTime),
    amount: formatAmount(data.amount),
    type: type || "activity",
    rawType,
    status: data.status,
    prep:
      typeof data.note === "string"
        ? data.note
        : typeof data.prep === "string"
          ? data.prep
          : "",
    step: typeof data.step === "number" ? data.step : 0,
    image,
    doctorName: data.doctorName || null,
    department: data.department || null,
    userName: data.userName || data.patientName || data.createdByName || null,
    isStay,
    isOPD,
    checkoutdate: data.checkoutdate ? formatDate(data.checkoutdate) : null,
  };
};

const TYPE_STYLES = {
  therapy: {
    bg: "bg-green-50",
    icon: <SpaIcon sx={{ fontSize: 20 }} className="text-green-800" />,
  },
  therapybooking: {
    bg: "bg-green-50",
    icon: <SpaIcon sx={{ fontSize: 20 }} className="text-green-800" />,
  },
  order: {
    bg: "bg-green-50",
    icon: <ShippingIcon sx={{ fontSize: 20 }} className="text-green-800" />,
  },
  stay: {
    bg: "bg-green-50",
    icon: <BookingIcon sx={{ fontSize: 20 }} className="text-green-800" />,
  },
  staybooking: {
    bg: "bg-green-50",
    icon: <StayIcon sx={{ fontSize: 20 }} className="text-green-800" />,
  },
};

const SHIP_STEPS = ["Packed", "Picked", "In Transit", "Delivered"];

const Field = ({ label, children, className = "" }) => (
  <div
    className={`p-2 2xl:p-3 bg-green-50/50 rounded-[10px] 2xl:rounded-[12px] border border-green-100 shadow-[0_2px_8px_rgba(21,128,61,0.03)] ${className}`}
  >
    <p className="text-[8px] 2xl:text-[9px] font-bold text-green-800/60 uppercase tracking-[0.15em] mb-0.5 2xl:mb-1">
      {label}
    </p>
    {children}
  </div>
);

const ActivityDetailsDrawer = ({
  item,
  open,
  onClose,
  onRescheduleSuccess,
}) => {
  const [refundDialogOpen, setRefundDialogOpen] = React.useState(false);
  const [rescheduleOpen, setRescheduleOpen] = React.useState(false);

  if (!item) return null;
  const d = getActivityDisplayData(item);
  if (!d) return null;

  const typeStyle = TYPE_STYLES[d.type] ||
    (d.isTherapy ? TYPE_STYLES.therapy : null) || {
      bg: "bg-green-50",
      icon: <BookingIcon sx={{ fontSize: 20 }} className="text-green-800" />,
    };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: { xs: "100%", sm: 380 },
          backgroundColor: "#FDFDFB",
        },
      }}
    >
      <div className="flex flex-col h-full bg-[#FDFDFB]">
        <div className="flex items-center justify-between px-3 2xl:px-5 py-3 2xl:py-4 border-b border-green-100 shrink-0 bg-white shadow-[0_2px_10px_rgba(21,128,61,0.02)]">
          <p className="text-xs 2xl:text-sm font-bold text-green-800 tracking-wider  font-serif">
            Activity Details
          </p>
          <CancelButtonModal onClick={onClose} />
        </div>

        <div className="flex-1 overflow-y-auto px-3 2xl:px-4 py-3 2xl:py-5 space-y-3 2xl:space-y-4 no-scrollbar">
          {d.image && (
            <div className="w-full h-56 2xl:h-64 rounded-xl 2xl:rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(21,128,61,0.08)] border border-green-100">
              <img
                src={d.image}
                alt={d.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}

          <div className="flex items-start justify-between gap-2 2xl:gap-3 p-3 2xl:p-4 bg-white border border-green-100 rounded-xl 2xl:rounded-2xl shadow-[0_4px_16px_rgba(21,128,61,0.04)]">
            <div className="flex items-start gap-2 2xl:gap-3 flex-1 min-w-0">
              <div
                className={`p-2 2xl:p-2.5 rounded-[10px] 2xl:rounded-[12px] shrink-0 ${typeStyle.bg} shadow-inner mt-0.5`}
              >
                {typeStyle.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[8px] 2xl:text-[10px] font-bold text-green-800/60 uppercase tracking-[0.1em] mb-px 2xl:mb-0.5">
                  {d.isOPD
                    ? "Consultation For"
                    : d.isStay
                      ? "Stay Booking"
                      : d.isTherapy
                        ? "Therapy Booking"
                        : "Activity"}
                </p>
                <p className="text-[12px] 2xl:text-[14px] font-bold text-green-800 tracking-wide leading-snug break-words">
                  {d.userName || d.name}
                </p>
                <p className="text-[9px] 2xl:text-[11px] font-medium text-green-800/60 tracking-widest uppercase mt-0.5 2xl:mt-1">
                  {d.isTherapy
                    ? d.therapyName || d.expert || "Therapy"
                    : d.department || d.expert}
                </p>
              </div>
            </div>
            {d.status && (
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[8px] 2xl:text-[9px] font-bold text-green-800/60 uppercase tracking-widest mb-1 2xl:mb-1.5">
                  Status
                </span>
                <div className="bg-lime-50 border border-lime-200 px-2 2xl:px-2.5 py-1 2xl:py-1.5 rounded-lg flex items-center gap-1 2xl:gap-1.5 shadow-sm">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute inline-flex h-3 w-3 rounded-full bg-lime-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-500"></span>
                  </div>{" "}
                  <span className="text-[9px] 2xl:text-[10px] font-bold text-lime-600 uppercase tracking-wider">
                    {d.status}
                  </span>
                </div>
              </div>
            )}
          </div>

          {(d.therapyName || d.isTherapy) && (
            <Field label="Therapy Name">
              <p className="text-[11px] 2xl:text-[13px] font-semibold text-green-800 tracking-wide leading-relaxed">
                {d.therapyName || "—"}
              </p>
            </Field>
          )}

          <div className="grid grid-cols-2 gap-2 2xl:gap-3">
            <Field label={d.isStay ? "Check-in Date" : "Date"}>
              <p className="text-[11px] 2xl:text-[13px] font-semibold text-green-800/80 tracking-wide">
                {d.date || "—"}
              </p>
            </Field>
            {d.checkoutdate && (
              <Field label="Check-out Date">
                <p className="text-[11px] 2xl:text-[13px] font-semibold text-green-800/80 tracking-wide">
                  {d.checkoutdate}
                </p>
              </Field>
            )}
            <Field
              label="Amount"
              className={d.checkoutdate ? "" : "col-span-2"}
            >
              <p className="text-[11px] 2xl:text-[13px] font-semibold text-green-800/80 tracking-wide">
                {d.amount ?? "—"}
              </p>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-2 2xl:gap-3">
            <Field
              label={
                d.isStay
                  ? "Check-in Time"
                  : d.isOPD
                    ? "Appointment Time"
                    : "Time"
              }
            >
              <p className="text-[11px] 2xl:text-[13px] font-semibold text-green-800/80 tracking-wide">
                {d.time || "—"}
              </p>
            </Field>
            <Field
              label={
                d.isStay ? "Check-out Time" : d.isOPD ? "End Time" : "End Time"
              }
            >
              <p className="text-[11px] 2xl:text-[13px] font-semibold text-green-800/80 tracking-wide">
                {d.endTime || "—"}
              </p>
            </Field>
          </div>

          {d.doctorName && (
            <Field label="Consulting Doctor" className="col-span-2">
              <p className="text-[12px] 2xl:text-[14px] font-bold text-green-800 tracking-wide leading-relaxed">
                Dr. {d.doctorName}
              </p>
            </Field>
          )}

          {d.isStay && d.expert && (
            <Field label="Room Type" className="col-span-2">
              <p className="text-[11px] 2xl:text-[13px] font-semibold text-green-800/80 tracking-wide leading-relaxed">
                {d.expert}
              </p>
            </Field>
          )}

          {d.prep && (
            <div className="p-2.5 2xl:p-3.5 bg-green-50/50 border border-green-100 rounded-xl 2xl:rounded-2xl shadow-[0_2px_8px_rgba(21,128,61,0.02)]">
              <p className="text-[8px] 2xl:text-[9px] font-bold text-green-800 uppercase tracking-[0.15em] mb-1 2xl:mb-1.5">
                Prep Note
              </p>
              <p className="text-[10px] 2xl:text-[12px] font-medium text-green-800/80 leading-relaxed italic">
                "{d.prep}"
              </p>
            </div>
          )}

          {d.type === "order" && (
            <div className="p-2.5 2xl:p-3.5 bg-white border border-green-100 rounded-xl 2xl:rounded-2xl shadow-[0_4px_16px_rgba(21,128,61,0.04)]">
              <p className="text-[8px] 2xl:text-[9px] font-bold text-green-800/60 uppercase tracking-[0.15em] mb-2 2xl:mb-3">
                Shipping Progress
              </p>
              <Stepper activeStep={d.step} alternativeLabel>
                {SHIP_STEPS.map((label) => (
                  <Step key={label}>
                    <StepLabel>
                      <span className="text-[8px] 2xl:text-[9px] font-bold uppercase text-green-800/70 tracking-wider">
                        {label}
                      </span>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          )}
        </div>

        {item?.familyMembers && item?.familyMembers.length > 0 && (
          <div className="mx-3 mt-2">
            <p className="text-[9px] font-bold text-[#6a9060] uppercase tracking-wide mb-1">
              Family Members
            </p>
            <div className="bg-white rounded-lg border border-gray-100 divide-y divide-gray-50">
              {item?.familyMembers.map((member, idx) => (
                <div
                  key={member?.familyMemberId || member?.id || idx}
                  className="flex items-center justify-between gap-2 px-3 py-1.5"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-[#f0f7ee] flex items-center justify-center shrink-0">
                      <Person style={{ fontSize: 12, color: "#4c7c70" }} />
                    </div>
                    <span className="text-[11px] font-semibold text-[#002a24] truncate">
                      {`${member?.firstName || ""} ${member?.lastName || ""}`.trim() ||
                        "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {member?.age != null && (
                      <span className="text-[9px] text-gray-400 font-medium">
                        {member.age} yrs
                      </span>
                    )}
                    {member?.gender && (
                      <span className="text-[9px] text-gray-400 font-medium">
                        {member.gender}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 2xl:gap-3 px-3 2xl:px-4 py-3 2xl:py-4 border-t border-green-100 bg-white shrink-0 shadow-[0_-4px_16px_rgba(21,128,61,0.02)]">
          <CommonButton
            type="button"
            label="Cancel Booking"
            disabled={
              item?.isCancelBooking === false ||
              item?.isCancelBooking === null ||
              (item?.bookingSource || item?.bookingsource) === "Aayurmitra" ||
              (item?.bookingSource || item?.bookingsource) === "App" ||
              item?.bookingStatus === "Cancelled" ||
              item?.status === "Cancelled"
            }
            onClick={() => setRefundDialogOpen(true)}
            className={`disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 text-[10px] 2xl:text-xs border bg-red-50 text-red-700 border-red-700 hover:bg-green-50 transition-all shadow-sm font-semibold tracking-wide py-2 2xl:py-2.5 ${d.isStay ? "w-full" : "flex-1"}`}
          />

          <CommonButton
            type="button"
            disabled={
              item?.isCancelBooking === false ||
              item?.isCancelBooking === null ||
              !d.isStay ||
              (item?.bookingSource || item?.bookingsource) === "Aayurmitra" ||
              (item?.bookingSource || item?.bookingsource) === "App" ||
              item?.bookingStatus === "Cancelled" ||
              item?.status === "Cancelled"
            }
            label="Reschedule Booking"
            className="flex-1  disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 text-[10px] 2xl:text-xs bg-green-600 text-white hover:opacity-90 transition-all shadow-[0_4px_12px_rgba(21,128,61,0.25)] font-semibold tracking-wide py-2 2xl:py-2.5"
            onClick={() => setRescheduleOpen(true)}
          />
        </div>
      </div>

      {refundDialogOpen && (
        <PaymentRefundDialog
          open={refundDialogOpen}
          onClose={() => setRefundDialogOpen(false)}
          onConfirm={() => {
            setRefundDialogOpen(false);
            onRescheduleSuccess?.();
            onClose?.();
          }}
          bookingData={item}
        />
      )}

      {rescheduleOpen &&
        (d.isOPD === true ? (
          <RescheduleAppointments
            open={rescheduleOpen}
            onClose={() => setRescheduleOpen(false)}
            bookingData={item}
            onSuccess={() => {
              setRescheduleOpen(false);
              onRescheduleSuccess?.();
              onClose?.();
            }}
            onRescheduleSuccess={() => {
              setRescheduleOpen(false);
              onRescheduleSuccess?.();
              onClose?.();
            }}
          />
        ) : (
          <RescheduleTherapy
            open={rescheduleOpen}
            onClose={() => setRescheduleOpen(false)}
            bookingData={item}
            onSuccess={() => {
              setRescheduleOpen(false);
              onRescheduleSuccess?.();
              onClose?.();
            }}
            onRescheduleSuccess={() => {
              setRescheduleOpen(false);
              onRescheduleSuccess?.();
              onClose?.();
            }}
          />
        ))}
    </Drawer>
  );
};

export default ActivityDetailsDrawer;
