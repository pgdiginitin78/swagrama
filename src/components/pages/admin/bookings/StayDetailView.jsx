import {
  Close as CloseIcon,
  EventNote as EventNoteIcon,
  MeetingRoom as RoomIcon,
  LocalHospital as DoctorIcon,
  PeopleAlt as TwinIcon,
  Pets as PetIcon,
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
    Pending: "bg-amber-100  text-amber-700  border border-amber-300",
    "Check-In": "bg-[#3b4b3e] text-[#e7f5ed]",
    "Check-Out": "bg-teal-100 text-teal-700 border border-teal-300",
    Canceled: "bg-red-100 text-red-600 border border-red-300",
  };

  const checkInFormatted = (() => {
    const d = new Date(selectedBooking.checkInDate);
    if (isNaN(d)) return "—";
    const date = d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
    const time = selectedBooking.checkInTime
      ? selectedBooking.checkInTime.slice(0, 5)
      : "";
    return `${date}${time ? ", " + time : ""}`;
  })();

  const bookingStatus = selectedBooking.bookingStatus || "Pending";

  const handleCheckInOut = (bookingId) => {
    UpdateStayCheckInOut(bookingId, 5)
      .then((res) => {
        successAlert(res.data.message);
        if (onSuccess) onSuccess();
      })
      .catch((err) => err);
  };

  return (
    <div className="flex flex-col h-full bg-white w-full border rounded-lg overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 shrink-0">
        <div>
          <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">
            Active Selection
          </p>
          <h2 className="text-[12px] font-bold text-[#002a24] leading-tight">
            Stay Booking Details
          </h2>
        </div>
        <IconButton size="small" onClick={onClose} className="!p-1">
          <CloseIcon className="!text-[14px]" />
        </IconButton>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-3 mt-3 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="relative bg-gradient-to-br from-[#1a2e22] to-[#2e4a38] h-[200px] flex items-center justify-center">
            {selectedBooking?.images ? (
              <img
                src={selectedBooking.images}
                alt=""
                className="w-full h-full object-top"
              />
            ) : (
              <RoomIcon
                style={{ fontSize: 38, color: "rgba(255,255,255,0.18)" }}
              />
            )}
            <span className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm text-white text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-white/30">
              {selectedBooking.room || "—"}
            </span>
          </div>

          <div className="bg-white px-3 py-2 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[13px] font-black text-[#002a24] truncate leading-tight">
                {selectedBooking.customer || "—"}
              </p>
              <p className="text-[12px] text-gray-400 font-medium mt-0.5">
                Check-in: {checkInFormatted}
              </p>
            </div>
            <span
              className={`shrink-0 px-2 py-0.5 rounded text-[8px] font-bold ${statusStyles[bookingStatus] || "bg-gray-100 text-gray-600"}`}
            >
              {bookingStatus.toUpperCase()}
            </span>
          </div>
        </div>

        {selectedBooking.stayDetails && (
          <div className="mx-3 mt-2 px-3 py-2 rounded-lg bg-[#f0f7ee] border border-[#d4e9ce] flex items-center gap-2">
            <EventNoteIcon style={{ fontSize: 14, color: "#4c7c70" }} />
            <div>
              <p className="text-[14px] font-semibold capitalize  text-[#6a9060]">
                Stay Period
              </p>
              <p className="text-[12px] font-bold text-[#002a24]">
                {selectedBooking.stayDetails}
              </p>
            </div>
            {selectedBooking.daysRemaining && (
              <span className="ml-auto text-[10px] font-semibold capitalize  text-[#4c7c70] bg-[#d4e9ce] px-2 py-0.5 rounded">
                {selectedBooking.daysRemaining}
              </span>
            )}
          </div>
        )}

        <div className="mx-3 mt-3">
          <p className="text-[12px] font-semibold capitalize  text-[#6a9060] mb-1.5">
            Stay Experience
          </p>

          <div className="grid grid-cols-2 gap-1.5 mb-3">
            <div
              className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border ${
                selectedBooking.petFriendly
                  ? "bg-[#f0fdf4] border-emerald-200"
                  : "bg-gray-50 border-gray-100"
              }`}
            >
              <PetIcon
                style={{
                  fontSize: 14,
                  color: selectedBooking.petFriendly ? "#3e9d6d" : "green",
                }}
              />
              <div>
                <p
                  className={`text-[12px] font-bold ${
                    selectedBooking.petFriendly
                      ? "text-emerald-700"
                      : "text-gray-400"
                  }`}
                >
                  Pet Friendly
                </p>
                <p className="text-[10px] text-gray-400">
                  {selectedBooking.petFriendly ? "Allowed" : "Not Opted"}
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border ${
                selectedBooking.twinsharing
                  ? "bg-[#f0f7ee] border-[#c8dfc2]"
                  : "bg-gray-50 border-gray-100"
              }`}
            >
              <TwinIcon
                style={{
                  fontSize: 14,
                  color: selectedBooking.twinsharing ? "#4c7c70" : "green",
                }}
              />
              <div>
                <p
                  className={`text-[12px] font-bold ${
                    selectedBooking.twinsharing
                      ? "text-[#003d33]"
                      : "text-gray-400"
                  }`}
                >
                  Twin Sharing
                </p>
                <p className="text-[10px] text-gray-400">
                  {selectedBooking.twinsharing ? "Double Room" : "Single"}
                </p>
              </div>
            </div>
          </div>
          {selectedBooking.doctor !== undefined && (
            <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg border bg-gray-50 border-gray-100">
              <DoctorIcon
                style={{
                  fontSize: 14,
                  color: selectedBooking.doctor ? "#3e9d6d" : "green",
                }}
              />
              <div>
                <p className="text-[12px] font-bold text-gray-500">Doctor</p>
                <p className="text-[10px] text-gray-400">
                  {selectedBooking.doctor || "Not Assigned"}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mx-3 mt-3 mb-3">
          <p className="text-[12px] font-semibold capitalize text-[#6a9060] mb-1.5">
            Financial Overview
          </p>
          <div className="bg-white rounded-xl border border-gray-100 px-3 py-2 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-gray-500 font-medium">
                Base Room Rate
              </span>
              <span className="text-[9px] font-bold text-[#002a24]">
                {selectedBooking?.charges}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-gray-500 font-medium">
                Wellness Add-ons
              </span>
              <span className="text-[9px] font-bold text-[#002a24]">—</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-gray-500 font-medium">
                Taxes (GST)
              </span>
              <span className="text-[9px] font-bold text-[#002a24]">—</span>
            </div>
            <div className="h-px bg-gray-100 my-1" />
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-black text-[#002a24]">
                Grand Total
              </span>
              <span
                className={`text-[14px] font-black ${selectedBooking.amount && selectedBooking.amount !== null && selectedBooking.amount !== undefined ? "text-green-600" : "text-[#003d33]"}`}
              >
                {selectedBooking.amount &&
                selectedBooking.amount !== null &&
                selectedBooking.amount !== undefined
                  ? selectedBooking.amount
                  : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 px-3 py-2.5 border-t border-gray-100 shrink-0">
        <button
          type="button"
          onClick={() => handleCheckInOut(selectedBooking.bookingId)}
          className="flex-1 py-2 rounded bg-[#003d33] text-white text-[12px] font-semibold   shadow-sm hover:bg-[#004d40] "
        >
          {selectedBooking?.financials === "Pending" ? "Check-In" : "Check-Out"}
        </button>
        <button
          type="button"
          onClick={() => setOpenCancelModal(true)}
          className="flex-1 py-2 rounded bg-red-100 text-red-600 text-[12px] font-semibold border border-red-600 "
        >
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
