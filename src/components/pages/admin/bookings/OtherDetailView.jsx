import {
  Close as CloseIcon,
  EventNote as EventNoteIcon,
  MeetingRoom as RoomIcon,
  MedicalServices as ServiceIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import PaymentRefundDialog from "../../dashboard/components/PaymentRefundDialog";
import RescheduleBookings from "../../dashboard/components/RescheduleBookings";
import { useState } from "react";

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

const OpdDetailRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-2 py-2 border-b border-gray-100 last:border-0">
    <span className="text-green-600 mt-0.5 flex-shrink-0 text-[16px]">
      {icon}
    </span>
    <div className="flex-1 min-w-0">
      <p className="text-[12px] font-semibold text-gray-400  mb-0.5">{label}</p>
      <p className="text-[12px] font-semibold text-[#1a2e22] truncate">
        {value ?? "—"}
      </p>
    </div>
  </div>
);

const OtherDetailView = ({ selectedBooking, onClose }) => {
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);

  if (!selectedBooking) return null;

  const status = selectedBooking.status || "Pending";
  const statusClass =
    status === "Success"
      ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
      : "bg-amber-100 text-amber-700 border border-amber-300";
  console.log("selectedBooking", selectedBooking);

  const handleConfirmRefund = () => {
    console.log("Refund requested for:", selectedBooking);
    setRefundDialogOpen(false);
  };

  return (
    <div className="flex flex-col h-auto pb-10 bg-white w-full overflow-hidden border rounded-lg shadow-sm">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 shrink-0">
        <div>
          <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">
            Active Selection
          </p>
          <h2 className="text-[12px] font-bold text-[#002a24] leading-tight">
            Other Booking Details
          </h2>
        </div>
        <IconButton size="small" onClick={onClose} className="!p-1">
          <CloseIcon className="!text-[14px]" />
        </IconButton>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="bg-gradient-to-br from-[#003d33] to-[#004d40] px-4 py-10 text-center">
          {selectedBooking?.image ? (
            <img
              src={selectedBooking.image}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#cde8b8] mx-auto flex items-center justify-center text-[#003d33] text-lg font-black mb-2 border-2 border-white/20 shadow-sm">
              {getInitials(selectedBooking.customer)}
            </div>
          )}

          <h3 className="text-white text-[14px] font-black leading-tight">
            {selectedBooking.customer}
          </h3>
          <p className="text-white/60 text-[10px] font-medium mt-0.5">
            {selectedBooking.city || "No City Provided"}
          </p>
        </div>

        <div className="p-3 space-y-4">
          <div className="bg-[#f0f7ee] border border-[#d4e9ce] rounded p-3">
            <div className="flex items-center gap-2 mb-2">
              <ServiceIcon style={{ fontSize: 16, color: "#4c7c70" }} />
              <div>
                <p className="text-[12px] font-semibold  text-[#6a9060]">
                  Activity / Service
                </p>
                <p className="text-[10px] font-bold text-[#002a24]">
                  {selectedBooking.activityName ||
                    selectedBooking.service ||
                    "—"}
                </p>
              </div>
              <span
                className={`ml-auto px-2 py-0.5 rounded text-[8px] font-bold ${statusClass}`}
              >
                {status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-[#d4e9ce]/50">
              <div>
                <p className="text-[12px] font-semibold text-[#6a9060]">
                  Visit Date
                </p>
                <p className="text-[10px] font-bold text-[#002a24]">
                  {formatDate(selectedBooking.visitDate)}
                </p>
              </div>
              <div>
                <p className="text-[12px] font-semibold text-[#6a9060]">
                  Time Slot
                </p>
                <p className="text-[10px] font-bold text-[#002a24]">
                  {selectedBooking.checkIn} - {selectedBooking.checkOut}
                </p>
              </div>
            </div>
          </div>

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
      <div className="flex gap-2 px-3 py-2.5 border-t border-gray-100 shrink-0">
        <button
          type="button"
          onClick={() => setRefundDialogOpen(true)}
          className="flex-1 py-2 rounded bg-red-100 text-red-600 text-[14px] font-semibold  border border-red-600 "
        >
          Cancel
        </button>
        <button
        type="button"
        onClick={() => setRescheduleOpen(true)}
        className="flex-1 py-2 rounded bg-[#f0f7ee] text-[#003d33] text-[14px] font-semibold  border border-[#c8dfc2]">
          Reschedule
        </button>
      </div>

      {refundDialogOpen && (
        <PaymentRefundDialog
          open={refundDialogOpen}
          onClose={() => setRefundDialogOpen(false)}
          onConfirm={handleConfirmRefund}
          bookingData={selectedBooking}
        />
      )}

      {rescheduleOpen && (
        <RescheduleBookings
          open={rescheduleOpen}
          onClose={() => setRescheduleOpen(false)}
          bookingData={selectedBooking}
          onConfirm={(payload) => {
            console.log("Reschedule payload:", payload);
            setRescheduleOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default OtherDetailView;
