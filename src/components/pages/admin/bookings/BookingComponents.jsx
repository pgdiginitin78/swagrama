import {
  Close as CloseIcon,
  Pets as PetIcon,
  AccessTime as AccessTimeIcon,
  Laptop as AdminIcon,
  EventNote as EventNoteIcon,
  Smartphone as MobileIcon,
  CreditCard as PaymentIcon,
  Payments as PaymentsIcon,
  MeetingRoom as RoomIcon,
  MedicalServices as ServiceIcon,
  Language as WebIcon,
  PeopleAlt as TwinIcon,
  LocalHospital as DoctorIcon,
  RestaurantMenu as MealIcon,
} from "@mui/icons-material";

import { IconButton } from "@mui/material";

export const StatusBadge = ({ status }) => {
  const styles = {
    CONFIRMED: "bg-[#e7f5ed] text-[#3e9d6d]",
    "CHECKED-IN": "bg-[#3b4b3e] text-[#e7f5ed]",
    RESCHEDULED: "bg-[#e2e8f0] text-[#718096]",
  };

  return (
    <span
      className={`px-2.5 sm:px-3 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold tracking-tight ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};

export const PaymentStatusBadge = ({ status }) => {
  const styles = {
    PAID: "bg-[#e7f5ed] text-[#3e9d6d]",
    "PARTIALLY PAID": "bg-[#f4f7d4] text-[#8ea62a]",
    UNPAID: "bg-[#feeded] text-[#e53e3e]",
  };

  return (
    <span
      className={`px-2.5 sm:px-3 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold tracking-tight ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};

export const OriginBadge = ({ origin }) => {
  const icons = {
    WEBSITE: <WebIcon className="!text-[10px]" />,
    MOBILE: <MobileIcon className="!text-[10px]" />,
    ADMIN: <AdminIcon className="!text-[10px]" />,
  };

  return (
    <div className="flex items-center gap-1 text-[8px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-wider">
      {icons[origin]}
      <span>{origin}</span>
    </div>
  );
};

const OPD_STATUS_PILL = {
  Pending: "text-amber-700 bg-amber-100 border border-amber-300",
  Confirmed: "text-emerald-700 bg-emerald-100 border border-emerald-400",
  Canceled: "text-red-700 bg-red-100 border border-red-400",
  "Check-In": "text-orange-700 bg-orange-100 border border-orange-300",
  Completed: "text-emerald-800 bg-emerald-100 border border-emerald-500",
  "Check-Out": "text-teal-700 bg-teal-100 border border-teal-400",
};

const OPD_STATUS_DOT = {
  Pending: "bg-amber-400",
  Confirmed: "bg-emerald-500",
  Canceled: "bg-red-500",
  "Check-In": "bg-orange-400",
  Completed: "bg-emerald-600",
  "Check-Out": "bg-teal-500",
};

const OPD_PAYMENT_PILL = {
  Success: "text-emerald-700 bg-emerald-100 border border-emerald-400",
  Pending: "text-amber-700 bg-amber-100 border border-amber-300",
  Failed: "text-red-700 bg-red-100 border border-red-400",
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d)) return "—";

  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const OpdDetailRow = ({ icon, label, value, valueEl }) => (
  <div className="flex items-start gap-2 sm:gap-3 py-2 sm:py-3 border-b border-gray-100 last:border-0">
    <span className="text-gray-400 mt-0.5 flex-shrink-0 text-[14px]">
      {icon}
    </span>

    <div className="flex-1 min-w-0">
      <p className="text-[8px] sm:text-[9.5px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
        {label}
      </p>

      {valueEl ? (
        valueEl
      ) : (
        <p className="text-[12px] sm:text-[13px] font-semibold text-[#1a2e22] truncate">
          {value ?? "—"}
        </p>
      )}
    </div>
  </div>
);

export const BookingDetailContent = ({
  selectedBooking,
  onClose,
  type = "STAY",
}) => {
  if (!selectedBooking) {
    return (
      <div className="flex flex-col items-center  justify-center w-full h-full p-4 sm:p-6 text-center bg-[#fcfcf9] border rounded-lg">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white flex items-center justify-center mb-3 sm:mb-4 shadow-sm border border-gray-100">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-dashed border-gray-100" />
        </div>

        <p className="text-[8px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
          Active Selection
        </p>

        <h3 className="text-[16px] sm:text-[18px] font-bold text-[#002a24]">
          Booking Details
        </h3>
      </div>
    );
  }

  if (type === "OPD") {
    const status = selectedBooking.status?.trim();

    return (
      <div className="flex flex-col h-full bg-white w-full max-w-full sm:max-w-md lg:max-w-lg mx-auto border rounded-lg " >
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100">
          <div>
            <p className="text-[7px] sm:text-[8px] font-bold text-gray-400 uppercase tracking-widest">
              Active Selection
            </p>

            <h2 className="text-[12px] sm:text-[13px] font-bold text-[#002a24]">
              OPD Booking Details
            </h2>
          </div>

          <IconButton size="small" onClick={onClose} className="!p-1">
            <CloseIcon className="!text-[14px] sm:!text-[15px]" />
          </IconButton>
        </div>

        <div className="bg-gradient-to-br from-[#003d33] to-[#006651] px-4 sm:px-5 py-4 sm:py-5 flex flex-col items-center gap-2">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-400 flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-md">
            {getInitials(selectedBooking.customer)}
          </div>

          <p className="text-white text-[13px] sm:text-[14px] font-bold text-center">
            {selectedBooking.customer}
          </p>

          <span
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold ${
              OPD_STATUS_PILL[status] ||
              "text-gray-600 bg-gray-100 border border-gray-300"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                OPD_STATUS_DOT[status] || "bg-gray-400"
              }`}
            />
            {status}
          </span>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-2 overflow-y-auto px-3 ">
          <OpdDetailRow
            icon={<ServiceIcon />}
            label="Service"
            value={selectedBooking.service}
          />

          <OpdDetailRow
            icon={<EventNoteIcon />}
            label="Appointment Date"
            value={formatDate(selectedBooking.appointmentDate)}
          />

          <OpdDetailRow
            icon={<AccessTimeIcon />}
            label="Slot Time"
            value={selectedBooking.slotTime}
          />

          <OpdDetailRow
            icon={<PaymentsIcon />}
            label="Amount"
            value={
              selectedBooking.amount != null
                ? `₹ ${selectedBooking.amount}`
                : "—"
            }
          />

          <OpdDetailRow
            icon={<PaymentIcon />}
            label="Payment Status"
            valueEl={
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold ${
                  OPD_PAYMENT_PILL[selectedBooking.paymentStatus] ||
                  "text-gray-600 bg-gray-100 border border-gray-300"
                }`}
              >
                {selectedBooking.paymentStatus ?? "—"}
              </span>
            }
          />
        </div>

        <div className="flex gap-2 p-3 sm:p-4 border-t border-gray-100">
          <button className="flex-1 py-2 sm:py-2.5 rounded-xl bg-white border border-gray-200 text-[#002a24] text-[9px] sm:text-[10px] font-bold">
            Reschedule
          </button>

          <button className="flex-1 py-2 sm:py-2.5 rounded-xl bg-[#003d33] text-white text-[9px] sm:text-[10px] font-bold uppercase">
            Check-In
          </button>
        </div>
      </div>
    );
  }

  if (type === "OTHER") {
    const status = selectedBooking.status || "Pending";
    const statusClass = status === "Success" 
      ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
      : "bg-amber-100 text-amber-700 border border-amber-300";

    return (
      <div className="flex flex-col h-full bg-white w-full overflow-hidden border rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 shrink-0">
          <div>
            <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">Active Selection</p>
            <h2 className="text-[12px] font-bold text-[#002a24] leading-tight">Other Booking Details</h2>
          </div>
          <IconButton size="small" onClick={onClose} className="!p-1">
            <CloseIcon className="!text-[14px]" />
          </IconButton>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Top Banner with Name */}
          <div className="bg-gradient-to-br from-[#003d33] to-[#004d40] p-4 text-center">
             <div className="w-12 h-12 rounded-full bg-[#cde8b8] mx-auto flex items-center justify-center text-[#003d33] text-lg font-black mb-2 border-2 border-white/20 shadow-sm">
                {getInitials(selectedBooking.customer)}
             </div>
             <h3 className="text-white text-[14px] font-black leading-tight">{selectedBooking.customer}</h3>
             <p className="text-white/60 text-[9px] font-medium mt-0.5">{selectedBooking.city || "No City Provided"}</p>
          </div>

          <div className="p-3 space-y-4">
             {/* Main Info Card */}
             <div className="bg-[#f0f7ee] border border-[#d4e9ce] rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                   <ServiceIcon style={{ fontSize: 13, color: "#4c7c70" }} />
                   <div>
                      <p className="text-[7px] font-black uppercase tracking-widest text-[#6a9060]">Activity / Service</p>
                      <p className="text-[11px] font-bold text-[#002a24]">{selectedBooking.activityName || selectedBooking.service || "—"}</p>
                   </div>
                   <span className={`ml-auto px-2 py-0.5 rounded-full text-[8px] font-bold ${statusClass}`}>
                      {status.toUpperCase()}
                   </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-[#d4e9ce]/50">
                   <div>
                      <p className="text-[7px] font-black uppercase tracking-widest text-[#6a9060]">Visit Date</p>
                      <p className="text-[10px] font-bold text-[#002a24]">{formatDate(selectedBooking.visitDate)}</p>
                   </div>
                   <div>
                      <p className="text-[7px] font-black uppercase tracking-widest text-[#6a9060]">Time Slot</p>
                      <p className="text-[10px] font-bold text-[#002a24]">{selectedBooking.checkIn} - {selectedBooking.checkOut}</p>
                   </div>
                </div>
             </div>

             {/* Secondary Details */}
             <div className="grid grid-cols-2 gap-2">
                <OpdDetailRow 
                  icon={<EventNoteIcon className="!text-[14px]" />}
                  label="Service Group"
                  value={selectedBooking.service}
                />
                <OpdDetailRow 
                  icon={<RoomIcon className="!text-[14px]" />}
                  label="Location"
                  value={selectedBooking.city}
                />
             </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-3 py-2.5 border-t border-gray-100 shrink-0">
          <button className="flex-1 py-2 rounded-lg bg-[#003d33] text-white text-[9px] font-black uppercase tracking-wide">
            Print Ticket
          </button>
          <button className="flex-1 py-2 rounded-lg bg-[#f0f7ee] text-[#003d33] text-[9px] font-black uppercase tracking-wide border border-[#c8dfc2]">
            Reschedule
          </button>
        </div>
      </div>
    );
  }

  /* ── STAY template ── */
  const statusStyles = {
    Confirmed: "bg-emerald-100 text-emerald-700 border border-emerald-300",
    Pending:   "bg-amber-100  text-amber-700  border border-amber-300",
    "Check-In": "bg-[#3b4b3e] text-[#e7f5ed]",
    "Check-Out": "bg-teal-100 text-teal-700 border border-teal-300",
    Canceled:  "bg-red-100   text-red-700   border border-red-300",
  };

  const checkInFormatted = (() => {
    const d = new Date(selectedBooking.checkInDate);
    if (isNaN(d)) return "—";
    const date = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    const time = selectedBooking.checkInTime
      ? selectedBooking.checkInTime.slice(0, 5)
      : "";
    return `${date}${time ? ", " + time : ""}`;
  })();

  const bookingStatus = selectedBooking.bookingStatus || "Pending";

  return (
    <div className="flex flex-col h-full bg-white w-full overflow-hidden border rounded-lg z-0">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 shrink-0">
        <div>
          <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">Active Selection</p>
          <h2 className="text-[12px] font-bold text-[#002a24] leading-tight">Stay Booking Details</h2>
        </div>
        <IconButton size="small" onClick={onClose} className="!p-1">
          <CloseIcon className="!text-[14px]" />
        </IconButton>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto">

        {/* Room card */}
        <div className="mx-3 mt-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
          {/* Room visual */}
          <div className="relative bg-gradient-to-br from-[#1a2e22] to-[#2e4a38] h-[90px] flex items-center justify-center">
            <RoomIcon style={{ fontSize: 38, color: "rgba(255,255,255,0.18)" }} />
            <span className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm text-white text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/30">
              {selectedBooking.room || "—"}
            </span>
          </div>

          {/* Name + status */}
          <div className="bg-white px-3 py-2 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[13px] font-black text-[#002a24] truncate leading-tight">
                {selectedBooking.customer || "—"}
              </p>
              <p className="text-[9px] text-gray-400 font-medium mt-0.5">
                Check-in: {checkInFormatted}
              </p>
            </div>
            <span className={`shrink-0 px-2 py-0.5 rounded-full text-[8px] font-bold ${
              statusStyles[bookingStatus] || "bg-gray-100 text-gray-600"
            }`}>
              {bookingStatus.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Stay period */}
        {selectedBooking.stayDetails && (
          <div className="mx-3 mt-2 px-3 py-2 rounded-lg bg-[#f0f7ee] border border-[#d4e9ce] flex items-center gap-2">
            <EventNoteIcon style={{ fontSize: 13, color: "#4c7c70" }} />
            <div>
              <p className="text-[7px] font-black uppercase tracking-widest text-[#6a9060]">Stay Period</p>
              <p className="text-[11px] font-bold text-[#002a24]">{selectedBooking.stayDetails}</p>
            </div>
            {selectedBooking.daysRemaining && (
              <span className="ml-auto text-[7.5px] font-black uppercase text-[#4c7c70] bg-[#d4e9ce] px-2 py-0.5 rounded-full">
                {selectedBooking.daysRemaining}
              </span>
            )}
          </div>
        )}

        {/* Stay Experience */}
        <div className="mx-3 mt-3">
          <p className="text-[7px] font-black uppercase tracking-[0.18em] text-[#6a9060] mb-1.5">Stay Experience</p>
          <div className="grid grid-cols-2 gap-1.5">
            <div className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border ${
              selectedBooking.petFriendly
                ? "bg-[#f0fdf4] border-emerald-200"
                : "bg-gray-50 border-gray-100"
            }`}>
              <PetIcon style={{ fontSize: 14, color: selectedBooking.petFriendly ? "#3e9d6d" : "#aaa" }} />
              <div>
                <p className={`text-[8px] font-bold ${
                  selectedBooking.petFriendly ? "text-emerald-700" : "text-gray-400"
                }`}>Pet Friendly</p>
                <p className="text-[7px] text-gray-400">
                  {selectedBooking.petFriendly ? "Allowed" : "Not Opted"}
                </p>
              </div>
            </div>

            <div className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border ${
              selectedBooking.twinsharing
                ? "bg-[#f0f7ee] border-[#c8dfc2]"
                : "bg-gray-50 border-gray-100"
            }`}>
              <TwinIcon style={{ fontSize: 14, color: selectedBooking.twinsharing ? "#4c7c70" : "#aaa" }} />
              <div>
                <p className={`text-[8px] font-bold ${
                  selectedBooking.twinsharing ? "text-[#003d33]" : "text-gray-400"
                }`}>Twin Sharing</p>
                <p className="text-[7px] text-gray-400">
                  {selectedBooking.twinsharing ? "Double Room" : "Single"}
                </p>
              </div>
            </div>

            {selectedBooking.doctor !== undefined && (
              <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg border bg-gray-50 border-gray-100 col-span-2">
                <DoctorIcon style={{ fontSize: 14, color: selectedBooking.doctor ? "#3e9d6d" : "#aaa" }} />
                <div>
                  <p className="text-[8px] font-bold text-gray-500">Doctor</p>
                  <p className="text-[7px] text-gray-400">
                    {selectedBooking.doctor || "Not Assigned"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Financial Overview */}
        <div className="mx-3 mt-3 mb-3">
          <p className="text-[7px] font-black uppercase tracking-[0.18em] text-[#6a9060] mb-1.5">Financial Overview</p>
          <div className="bg-white rounded-xl border border-gray-100 px-3 py-2 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-gray-500 font-medium">Base Room Rate</span>
              <span className="text-[9px] font-bold text-[#002a24]">—</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-gray-500 font-medium">Wellness Add-ons</span>
              <span className="text-[9px] font-bold text-[#002a24]">—</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-gray-500 font-medium">Taxes (GST)</span>
              <span className="text-[9px] font-bold text-[#002a24]">—</span>
            </div>
            <div className="h-px bg-gray-100 my-1" />
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-[#002a24]">Grand Total</span>
              <span className={`text-[10px] font-black ${
                selectedBooking.financials === "Pending" ? "text-amber-600" : "text-[#003d33]"
              }`}>
                {selectedBooking.financials === "Pending" ? "Pending" : selectedBooking.financials || "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer actions ── */}
      <div className="flex gap-2 px-3 py-2.5 border-t border-gray-100 shrink-0">
        <button className="flex-1 py-2 rounded-lg bg-[#003d33] text-white text-[9px] font-black uppercase tracking-wide shadow-sm hover:bg-[#004d40] transition-colors">
          Check-In
        </button>
        <button className="flex-1 py-2 rounded-lg bg-[#f0f7ee] text-[#003d33] text-[9px] font-black uppercase tracking-wide border border-[#c8dfc2] hover:bg-[#d4e9ce] transition-colors">
          View Invoice
        </button>
      </div>
    </div>
  );
};
