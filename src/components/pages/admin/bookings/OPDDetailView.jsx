import {
  AccessTime as AccessTimeIcon,
  Apartment as DepartmentIcon,
  Close as CloseIcon,
  EventNote as EventNoteIcon,
  Info as OriginIcon,
  CreditCard as PaymentIcon,
  Payments as PaymentsIcon,
  Person as DoctorIcon,
  MedicalServices as ServiceIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import PaymentRefundDialog from "../../dashboard/components/PaymentRefundDialog";

import { useState } from "react";
import RescheduleAppointments from "../../dashboard/RescheduleAppointments";

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
    <span className="text-green-600 mt-0.5 flex-shrink-0 text-[14px]">
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

const OPDDetailView = ({ selectedBooking, onClose, onRescheduleSuccess }) => {
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openRescheduleModal, setOpenRescheduleModal] = useState(false);

  if (!selectedBooking) return null;
  const status = selectedBooking.status?.trim();
  console.log("Refund requested for:", selectedBooking);
  const handleConfirmRefund = () => {
    setOpenCancelModal(false);
  };

  const patientId = selectedBooking.userId ?? selectedBooking.appointmnetId;

  return (
    <div className="flex flex-col h-auto pb-5 bg-white w-full max-w-full mx-auto border rounded-lg overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100">
        <div>
          <p className="text-[7px] sm:text-[8px] font-bold text-gray-400 uppercase tracking-widest">
            Active Selection
          </p>
          <h2 className="text-[12px] sm:text-[13px] font-bold text-[#002a24]">
            OPD Booking Details
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

      <div className="bg-gradient-to-br from-[#003d33] to-[#006651] px-4 sm:px-5 py-4 sm:py-5 flex flex-col items-center gap-2">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-400 flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-md">
          {getInitials(selectedBooking.customer)}
        </div>
        <p className="text-white text-[13px] sm:text-[14px] font-semibold uppercase text-center">
          {selectedBooking.customer}
        </p>
        {patientId != null && (
          <p className="text-emerald-200 text-[10px] sm:text-[11px] font-medium -mt-1">
            Patient ID: {patientId}
          </p>
        )}
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold ${
            OPD_STATUS_PILL[status] ||
            "text-gray-600 bg-gray-100 border border-gray-300"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              OPD_STATUS_DOT[status] || "bg-green-600"
            }`}
          />
          {status}
        </span>
      </div>



      <div className=" grid grid-cols-2 gap-2 overflow-y-auto px-3 py-2">
        <OpdDetailRow
          icon={<ServiceIcon />}
          label="Service"
          value={selectedBooking.service}
        />
        <OpdDetailRow
          icon={<DepartmentIcon />}
          label="Department"
          value={selectedBooking.departmentName}
        />
        <OpdDetailRow
          icon={<DoctorIcon />}
          label="Doctor"
          value={
            selectedBooking.doctorName
              ? `Dr. ${selectedBooking.doctorName}`
              : "—"
          }
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
            selectedBooking.amount != null ? `₹ ${selectedBooking.amount}` : "—"
          }
        />
        <OpdDetailRow
          icon={<PaymentIcon />}
          label="Payment Status"
          valueEl={
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold ${
                OPD_PAYMENT_PILL[selectedBooking.paymentStatus] ||
                "text-gray-600 bg-gray-100 border border-gray-300"
              }`}
            >
              {selectedBooking.paymentStatus ?? "—"}
            </span>
          }
        />
        <OpdDetailRow
          icon={<OriginIcon />}
          label="Booking Source"
          value={selectedBooking.origin}
        />
      </div>

      <div className="flex gap-2 px-4 border-t border-gray-100 pt-3">
        <button
          type="button"
          disabled={
            selectedBooking?.origin !== "web" || selectedBooking?.amount === 0
          }
          onClick={() => setOpenCancelModal(true)}
          className={`flex-1 py-2.5 rounded text-[12px] font-semibold border transition-all duration-200 ${
            selectedBooking?.origin !== "web" || selectedBooking?.amount === 0
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60"
              : "text-red-600 border-red-600 bg-red-50 hover:bg-red-100 cursor-pointer"
          }`}
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={
            selectedBooking?.origin !== "web" || selectedBooking?.amount === 0
          }
          onClick={() => setOpenRescheduleModal(true)}
          className={`flex-1 py-2.5 rounded text-[12px] font-semibold border transition-all duration-200 
            ${
              selectedBooking?.origin !== "web" || selectedBooking?.amount === 0
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60"
                : "text-white bg-[#003d33] hover:bg-[#002a24] border-[#003d33] cursor-pointer"
            }`}
        >
          Reschedule
        </button>
      </div>

      {openCancelModal && (
        <PaymentRefundDialog
          open={openCancelModal}
          onClose={() => setOpenCancelModal(false)}
          onConfirm={handleConfirmRefund}
          bookingData={selectedBooking}
        />
      )}

      {openRescheduleModal && (
        <RescheduleAppointments
          open={openRescheduleModal}
          onClose={() => setOpenRescheduleModal(false)}
          bookingData={selectedBooking}
          onSuccess={onRescheduleSuccess}
          onRescheduleSuccess={onRescheduleSuccess}
        />
      )}
    </div>
  );
};

export default OPDDetailView;