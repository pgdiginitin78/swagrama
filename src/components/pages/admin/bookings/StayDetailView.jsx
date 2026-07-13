import {
  Close as CloseIcon,
  DateRange as DateRangeIcon,
  MeetingRoom as RoomIcon,
  LocalHospital as DoctorIcon,
  PeopleAlt as TwinIcon,
  Pets as PetIcon,
  CurrencyRupee as RupeeIcon,
  Language as SourceIcon,
  ConfirmationNumber as BookingIdIcon,
  Person as PersonIcon,
  Login as CheckInIcon,
  Logout as CheckOutIcon,
  AccessTime as TimeIcon,
  HourglassTop as DaysRemainingIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelCircleIcon,
  AccountBalance as PaymentIcon,
  Spa as WellnessIcon,
  ReceiptLong as TaxIcon,
  MonetizationOn as TotalIcon,
  SwapHoriz as RefundIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { UpdateStayCheckInOut } from "../../../../services/adminDashboard/AdminDashboardServices";
import { successAlert } from "../../../common/toast/CustomToast";
import PaymentRefundDialog from "../../dashboard/components/PaymentRefundDialog";
import { useState } from "react";

const StayDetailView = ({ selectedBooking, onClose, onSuccess }) => {
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const handleConfirmRefund = (refundData) => {
    console.log("Refund Data:", refundData);
    setOpenCancelModal(false);
  };

  if (!selectedBooking) return null;

  const statusStyles = {
    Confirmed: "bg-emerald-100 text-emerald-700 border border-emerald-300",
    Pending: "bg-amber-100 text-amber-700 border border-amber-300",
    "Check-In": "bg-[#3b4b3e] text-[#e7f5ed]",
    "Check-Out": "bg-teal-100 text-teal-700 border border-teal-300",
    Canceled: "bg-red-100 text-red-600 border border-red-300",
  };

  const financialStatusStyles = {
    Paid: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    Pending: "bg-amber-100 text-amber-700 border border-amber-200",
    Refunded: "bg-blue-100 text-blue-700 border border-blue-200",
    Failed: "bg-red-100 text-red-600 border border-red-200",
  };

  const formatDateOnly = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d)) return "—";
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const bookingStatus = selectedBooking.bookingStatus || "Pending";
  const financialStatus = selectedBooking.financials || "Pending";

  const handleCheckInOut = (bookingId) => {
    UpdateStayCheckInOut(bookingId, 5)
      .then((res) => {
        successAlert(res.data.message);
        if (onSuccess) onSuccess();
      })
      .catch((err) => err);
  };

  const InfoRow = ({ label, value, icon: Icon, iconColor = "#6a9060" }) => (
    <div className="flex items-center justify-between gap-2 py-1.5 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-1.5 min-w-0">
        {Icon && <Icon style={{ fontSize: 12, color: iconColor }} />}
        <span className="text-[10px] text-gray-400 font-medium shrink-0">
          {label}
        </span>
      </div>
      <span className="text-[11px] font-semibold text-[#002a24] text-right truncate max-w-[55%]">
        {value || "—"}
      </span>
    </div>
  );

  const OptionChip = ({
    active,
    activeColor,
    inactiveColor,
    Icon,
    label,
    activeText,
    inactiveText,
  }) => (
    <div
      className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border ${
        active
          ? `bg-[#f0f7ee] border-[${activeColor}]`
          : "bg-gray-50 border-gray-100"
      }`}
    >
      <div
        className={`p-1 rounded-md ${active ? "bg-white shadow-sm" : "bg-gray-100"}`}
      >
        <Icon style={{ fontSize: 13, color: active ? activeColor : "#bbb" }} />
      </div>
      <div>
        <p
          className={`text-[10px] font-bold ${active ? `text-[${activeColor}]` : "text-gray-400"}`}
        >
          {label}
        </p>
        <div className="flex items-center gap-0.5 mt-0.5">
          {active ? (
            <CheckCircleIcon style={{ fontSize: 9, color: "#3e9d6d" }} />
          ) : (
            <CancelCircleIcon style={{ fontSize: 9, color: "#ccc" }} />
          )}
          <p className="text-[8px] text-gray-400">
            {active ? activeText : inactiveText}
          </p>
        </div>
      </div>
    </div>
  );
  console.log("selectedBooking", selectedBooking);
  return (
    <div className="flex flex-col h-full bg-white w-full border rounded-lg overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 shrink-0 bg-white">
        <div>
          <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">
            Active Selection
          </p>
          <h2 className="text-[13px] font-bold text-[#002a24] leading-tight">
            Stay Booking Details
          </h2>
        </div>
        <IconButton onClick={onClose} size="small">
          <CloseIcon style={{ fontSize: 18, color: "#ef4444" }} />
        </IconButton>
      </div>
      <div className="flex-1 overflow-y-auto pb-1">
        <div className="mx-3 mt-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="relative h-[255px] bg-gradient-to-br from-[#1a2e22] to-[#2e4a38]">
            {selectedBooking?.images ? (
              <img
                src={selectedBooking.images}
                alt={selectedBooking.room || "Room"}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <RoomIcon
                  style={{ fontSize: 38, color: "rgba(255,255,255,0.18)" }}
                />
              </div>
            )}
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded border border-white/20 max-w-[70%]">
              <RoomIcon
                style={{ fontSize: 9, color: "rgba(255,255,255,0.8)" }}
              />
              <span className="text-white text-[8px] font-bold uppercase tracking-wide truncate">
                {selectedBooking.room || "—"}
              </span>
            </div>
          </div>
          <div className="bg-white px-3 py-2 flex items-center justify-between gap-2">
            <div className="min-w-0 flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-full bg-[#f0f7ee] flex items-center justify-center shrink-0">
                <PersonIcon style={{ fontSize: 15, color: "#4c7c70" }} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-black text-[#002a24] truncate leading-tight">
                  {selectedBooking.customer || "—"}
                </p>
                <p className="text-[9px] text-gray-400 font-medium flex items-center gap-0.5">
                  <BookingIdIcon style={{ fontSize: 9, color: "#aaa" }} />
                  Patient ID: {selectedBooking.patientId || "—"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span
                className={`px-2 py-0.5 rounded-full text-[7px] font-bold ${statusStyles[bookingStatus] || "bg-gray-100 text-gray-600"}`}
              >
                {bookingStatus.toUpperCase()}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[7px] font-bold ${financialStatusStyles[financialStatus] || "bg-gray-100 text-gray-600"}`}
              >
                {financialStatus.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="mx-3 mt-2 rounded-lg bg-[#f0f7ee] border border-[#d4e9ce] px-3 py-2">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1">
              <DateRangeIcon style={{ fontSize: 13, color: "#4c7c70" }} />
              <p className="text-[9px] font-bold text-[#6a9060] uppercase tracking-wide">
                Stay Period
              </p>
            </div>
            {selectedBooking.daysRemaining && (
              <div className="flex items-center gap-1 bg-[#003d33] text-white px-2 py-0.5 rounded-full">
                <DaysRemainingIcon style={{ fontSize: 9, color: "#a3d9b4" }} />
                <span className="text-[8px] font-bold">
                  {selectedBooking.daysRemaining}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white rounded-lg px-2 py-1.5 border border-[#d4e9ce]">
              <div className="flex items-center gap-1 mb-0.5">
                <CheckInIcon style={{ fontSize: 11, color: "#4c7c70" }} />
                <p className="text-[8px] text-gray-500 font-semibold">
                  Check-In
                </p>
              </div>
              <p className="text-[10px] font-bold text-[#002a24] leading-snug">
                {formatDateOnly(selectedBooking.checkInDate)}
              </p>
              {selectedBooking.checkInTime && (
                <div className="flex items-center gap-0.5 mt-0.5">
                  <TimeIcon style={{ fontSize: 9, color: "#4c7c70" }} />
                  <p className="text-[9px] text-[#4c7c70] font-semibold">
                    {selectedBooking.checkInTime.slice(0, 5)}
                  </p>
                </div>
              )}
            </div>
            <div className="bg-white rounded-lg px-2 py-1.5 border border-[#d4e9ce]">
              <div className="flex items-center gap-1 mb-0.5">
                <CheckOutIcon style={{ fontSize: 11, color: "#e07070" }} />
                <p className="text-[8px] text-gray-500 font-semibold">
                  Check-Out
                </p>
              </div>
              <p className="text-[10px] font-bold text-[#002a24] leading-snug">
                {formatDateOnly(selectedBooking.checkOutDate)}
              </p>
              {selectedBooking.checkoutTime && (
                <div className="flex items-center gap-0.5 mt-0.5">
                  <TimeIcon style={{ fontSize: 9, color: "#e07070" }} />
                  <p className="text-[9px] text-red-400 font-semibold">
                    {selectedBooking.checkoutTime.slice(0, 5)}
                  </p>
                </div>
              )}
            </div>
          </div>
          {selectedBooking.stayDetails && (
            <div className="flex items-center justify-center gap-1.5 mt-1.5 bg-white rounded py-0.5 border border-[#d4e9ce]">
              <DateRangeIcon style={{ fontSize: 10, color: "#4c7c70" }} />
              <p className="text-[10px] font-semibold text-[#4c7c70]">
                {selectedBooking.stayDetails}
              </p>
            </div>
          )}
        </div>

        <div className="mx-3 mt-2 bg-white rounded-lg border border-gray-100 px-3 py-2">
          <p className="text-[9px] font-bold text-[#6a9060] uppercase tracking-wide mb-1">
            Booking Info
          </p>
          <InfoRow
            label="Booking ID"
            value={`#${selectedBooking.bookingId}`}
            icon={BookingIdIcon}
            iconColor="#7c6f4c"
          />
          <InfoRow
            label="Payment For"
            value={selectedBooking.paymentFor}
            icon={PaymentIcon}
            iconColor="#4c7c70"
          />
          <InfoRow
            label="Source"
            value={selectedBooking.bookingSource}
            icon={SourceIcon}
            iconColor="#5a7aab"
          />
          <InfoRow
            label="Doctor"
            value={selectedBooking.doctor || "Not Assigned"}
            icon={DoctorIcon}
            iconColor={selectedBooking.doctor ? "#3e9d6d" : "#bbb"}
          />
        </div>
        <div className="mx-3 mt-2">
          <p className="text-[9px] font-bold text-[#6a9060] uppercase tracking-wide mb-1">
            Stay Options
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            <OptionChip
              active={selectedBooking.petFriendly}
              activeColor="#3e9d6d"
              Icon={PetIcon}
              label="Pet Friendly"
              activeText="Allowed"
              inactiveText="Not Opted"
            />
            <OptionChip
              active={selectedBooking.twinsharing}
              activeColor="#4c7c70"
              Icon={TwinIcon}
              label="Twin Sharing"
              activeText="Double Room"
              inactiveText="Single"
            />
          </div>
        </div>
        {selectedBooking?.familyMembers &&
          selectedBooking?.familyMembers?.length > 0 && (
            <div className="mx-3 mt-2">
              <p className="text-[9px] font-bold text-[#6a9060] uppercase tracking-wide mb-1">
                Family Members
              </p>
              <div className="bg-white rounded-lg border border-gray-100 divide-y divide-gray-50">
                {selectedBooking?.familyMembers.map((member) => (
                  <div
                    key={member.familyMemberId}
                    className="flex items-center justify-between gap-2 px-3 py-1.5"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-[#f0f7ee] flex items-center justify-center shrink-0">
                        <PersonIcon
                          style={{ fontSize: 12, color: "#4c7c70" }}
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-[#002a24] truncate">
                        {`${member.firstName || ""} ${member.lastName || ""}`.trim() ||
                          "—"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {member.age != null && (
                        <span className="text-[9px] text-gray-400 font-medium">
                          {member.age} yrs
                        </span>
                      )}
                      {member.gender && (
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
        <div className="mx-3 mt-2 mb-2">
          <p className="text-[9px] font-bold text-[#6a9060] uppercase tracking-wide mb-1">
            Financial Overview
          </p>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-3 py-1.5 space-y-0">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                <div className="flex items-center gap-1">
                  <RoomIcon style={{ fontSize: 10, color: "#9ca3af" }} />
                  <span className="text-[9px] text-gray-400 font-medium">
                    Base Room Rate
                  </span>
                </div>
                <span className="text-[9px] font-bold text-[#002a24]">
                  {selectedBooking?.charges
                    ? `₹${selectedBooking.charges}`
                    : "—"}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                <div className="flex items-center gap-1">
                  <WellnessIcon style={{ fontSize: 10, color: "#9ca3af" }} />
                  <span className="text-[9px] text-gray-400 font-medium">
                    Wellness Add-ons
                  </span>
                </div>
                <span className="text-[9px] font-bold text-[#002a24]">—</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                <div className="flex items-center gap-1">
                  <TaxIcon style={{ fontSize: 10, color: "#9ca3af" }} />
                  <span className="text-[9px] text-gray-400 font-medium">
                    Taxes (GST)
                  </span>
                </div>
                <span className="text-[9px] font-bold text-[#002a24]">—</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-1">
                  <TotalIcon style={{ fontSize: 12, color: "#3e9d6d" }} />
                  <span className="text-[11px] font-black text-[#002a24]">
                    Grand Total
                  </span>
                </div>
                <div className="flex items-center gap-0.5">
                  <RupeeIcon style={{ fontSize: 12, color: "#16a34a" }} />
                  <span
                    className={`text-[14px] font-black ${selectedBooking.amount ? "text-green-600" : "text-[#003d33]"}`}
                  >
                    {selectedBooking.amount
                      ? selectedBooking.amount.toLocaleString("en-IN")
                      : "—"}
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`flex items-center justify-center gap-1 px-3 py-1 ${
                selectedBooking.isRefund
                  ? "bg-blue-50 text-blue-600"
                  : financialStatus === "Pending"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {selectedBooking.isRefund ? (
                <RefundIcon style={{ fontSize: 10 }} />
              ) : financialStatus === "Pending" ? (
                <TimeIcon style={{ fontSize: 10 }} />
              ) : (
                <CheckCircleIcon style={{ fontSize: 10 }} />
              )}
              <span className="text-[8px] font-bold tracking-wide">
                {selectedBooking.isRefund
                  ? "REFUND INITIATED"
                  : financialStatus === "Pending"
                    ? "PAYMENT PENDING"
                    : "PAYMENT RECEIVED"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 px-3 py-2.5 border-t border-gray-100 shrink-0 bg-white">
        <button
          type="button"
          onClick={() => handleCheckInOut(selectedBooking.bookingId)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded bg-[#003d33] text-white text-[11px] font-semibold shadow-sm hover:bg-[#004d40] transition-colors"
        >
          {selectedBooking?.financials === "Pending" ? (
            <>
              <CheckInIcon style={{ fontSize: 13 }} />
              Check-In
            </>
          ) : (
            <>
              <CheckOutIcon style={{ fontSize: 13 }} />
              Check-Out
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => setOpenCancelModal(true)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded bg-red-50 text-red-600 text-[11px] font-semibold border border-red-300 hover:bg-red-100 transition-colors"
        >
          <CancelCircleIcon style={{ fontSize: 13 }} />
          Cancel
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
    </div>
  );
};

export default StayDetailView;
