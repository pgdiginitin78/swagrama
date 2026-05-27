import {
  Close as CloseIcon,
  AccessTime as AccessTimeIcon,
  EventNote as EventNoteIcon,
  MedicalServices as ServiceIcon,
  LocalHospital as DoctorIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import PaymentRefundDialog from "../../dashboard/components/PaymentRefundDialog";
import RescheduleBookings from "../../dashboard/components/RescheduleBookings";

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg border bg-gray-50 border-gray-100">
    <span className="text-[#7ccb5e] text-[14px] flex-shrink-0">{icon}</span>
    <div className="min-w-0">
      <p className="text-[8px] font-bold text-gray-500 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-[10px] text-[#002a24] font-semibold truncate">
        {value || "—"}
      </p>
    </div>
  </div>
);

const TherapyDetailView = ({ selectedBooking, onClose,populateTable }) => {
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);

  if (!selectedBooking) return null;

  const statusStyles = {
    CONFIRMED: "bg-emerald-100 text-emerald-700 border border-emerald-300",
    "CHECKED-IN": "bg-[#3b4b3e] text-[#e7f5ed]",
    RESCHEDULED: "bg-amber-100 text-amber-700 border border-amber-300",
  };

  const handleConfirmRefund = () => {
    console.log("Refund requested for:", selectedBooking);
    setRefundDialogOpen(false);
  };

  return (
    <div className="flex flex-col h-auto pb-10 bg-white w-full border rounded-lg overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 shrink-0">
        <div>
          <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">
            Active Selection
          </p>
          <h2 className="text-[12px] font-bold text-[#002a24]">
            Therapy Details
          </h2>
        </div>
        <IconButton onClick={onClose}>
          <CloseIcon
            height={10}
            width={10}
            className="text-red-600  hover:bg-red-50 rounded-full text-lg"
          />
        </IconButton>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-3 mt-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="relative h-[180px] bg-gradient-to-br from-[#1a2e22] to-[#2e4a38] flex items-center justify-center">
            {selectedBooking.image ? (
              <img
                src={selectedBooking.image}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <ServiceIcon
                style={{ fontSize: 40, color: "rgba(255,255,255,0.2)" }}
              />
            )}
            <span className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm text-white text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-white/30">
              {selectedBooking.therapy}
            </span>
          </div>

          <div className="bg-white px-3 py-2 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[13px] font-black text-[#002a24] truncate leading-tight">
                {selectedBooking.customer}
              </p>
              <p className="text-[9px] text-gray-400 font-medium mt-0.5">
                {selectedBooking.date} • {selectedBooking.time}
              </p>
            </div>
            <span
              className={`shrink-0 px-2 py-0.5 rounded-full text-[8px] font-bold ${statusStyles[selectedBooking.status] || "bg-gray-100 text-gray-600"}`}
            >
              {selectedBooking.status}
            </span>
          </div>
        </div>

        <div className="p-3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <DetailRow
              icon={<AccessTimeIcon />}
              label="Duration"
              value={selectedBooking.duration}
            />
            <DetailRow
              icon={<ServiceIcon />}
              label="Intensity"
              value={selectedBooking.intensity}
            />
          </div>

          <div className="bg-[#f0f7ee] border border-[#d4e9ce] rounded-lg p-3">
            <p className="text-[7px] font-black uppercase tracking-widest text-[#6a9060] mb-1">
              Description
            </p>
            <p className="text-[11px] font-medium text-[#002a24]">
              {selectedBooking.detail}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <DetailRow
              icon={<LocationIcon />}
              label="Facility"
              value={selectedBooking.facility}
            />
            <DetailRow
              icon={<DoctorIcon />}
              label="Doctor"
              value={selectedBooking.doctor || "Not Assigned"}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-4  mt-4 gap-2">
        <CommonButton
          type="button"
          label="Reschedule"
          disabled={
            selectedBooking?.isCancelBooking === false ||
            selectedBooking?.bookingsource === "Aayurmitra" ||
            selectedBooking?.bookingStatus === "Cancelled"
          }
          onClick={() => {
            setRescheduleOpen(true);
          }}
          className="flex-1 px-5 bg-ayuMid text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <CommonButton
          type="button"
          label="Cancel"
          disabled={
            selectedBooking?.isRefund === false ||
            selectedBooking?.bookingsource === "Aayurmitra" ||
            selectedBooking?.bookingStatus === "Cancelled"
          }
          onClick={() => {
            setRefundDialogOpen(true);
          }}
          className="flex-1 border border-red-500 text-red-500 disabled:bg-gray-300  disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      {/* <div className="flex gap-2 px-3 py-2.5 border-t border-gray-100 shrink-0">
        <button className="flex-1 py-2 rounded-lg bg-[#003d33] text-white text-[9px] font-black uppercase tracking-wide">
          Start Session
        </button>
        <button className="flex-1 py-2 rounded-lg bg-[#f0f7ee] text-[#003d33] text-[9px] font-black uppercase tracking-wide border border-[#c8dfc2]">
          Reschedule
        </button>
      </div> */}
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
          populateTable={populateTable}
        />
      )}
    </div>
  );
};

export default TherapyDetailView;
