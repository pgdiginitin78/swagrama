import React from "react";
import { Modal, Box, Typography, Divider, Grid } from "@mui/material";
import { format } from "date-fns";
import {
  CalendarToday,
  AccessTime,
  PersonOutline,
  HotelOutlined,
  GroupOutlined,
  PetsOutlined,
  ChildCareOutlined,
  EmailOutlined,
  PhoneOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
};

const InfoChip = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 p-3 bg-white/60 rounded-xl border border-[#a08230]/10 hover:bg-white transition-colors shadow-sm">
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f4f1ea] text-[#8b6914] shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] uppercase tracking-widest text-[#7a6e62] font-semibold mb-0.5">
        {label}
      </p>
      <p className="text-[13px] font-bold text-[#2d2822] leading-tight truncate">
        {value || "—"}
      </p>
    </div>
  </div>
);

const PriceRow = ({ label, value, isTotal = false }) => (
  <div
    className={`flex items-center justify-between py-2.5 ${
      isTotal
        ? "mt-2 pt-3 border-t-2 border-[#263d21]/20"
        : "border-b border-gray-100/50"
    }`}
  >
    <p
      className={`${
        isTotal
          ? "text-[14px] font-black uppercase tracking-wider text-[#263d21]"
          : "text-[12px] font-medium text-[#5c544b]"
      }`}
    >
      {label}
    </p>
    <p
      className={`${
        isTotal
          ? "text-[18px] font-black text-[#263d21]"
          : "text-[13px] font-bold text-[#4a7c3f]"
      }`}
    >
      ₹{value.toLocaleString("en-IN")}
    </p>
  </div>
);

function BookingPreviewModal({
  open,
  onClose,
  onConfirm,
  selectedService,
  checkIn,
  checkOut,
  checkInTime,
  checkOutTime,
  formValues,
  familyMembers,
  outdoorMembers,
  isOutdoorLeaving,
  breakdownItems,
  costs,
}) {
  const allMembers = isOutdoorLeaving ? outdoorMembers : familyMembers;
  const totalMembers = allMembers ? allMembers.length : 0;
  const totalPeopleCount = 1 + totalMembers; // Primary guest + additional

  const checkInDisplay = checkIn
    ? format(new Date(checkIn), "MMM dd, yyyy")
    : "—";
  const checkOutDisplay = checkOut
    ? format(new Date(checkOut), "MMM dd, yyyy")
    : "—";
  const inTimeDisplay = checkInTime ? checkInTime.substring(0, 5) : "";
  const outTimeDisplay = checkOutTime ? checkOutTime.substring(0, 5) : "";

  return (
    <Modal open={open} onClose={onClose} disableEscapeKeyDown>
      <Box
        sx={ModalStyle}
        className="w-[95%] max-w-2xl max-h-[95dvh] overflow-hidden rounded-3xl bg-[#faf7f2] shadow-2xl flex flex-col border border-[#a08230]/20"
      >
        {/* Header - Nature Theme */}
        <div className="relative px-6 py-5 bg-[#263d21] overflow-hidden shrink-0 flex items-center justify-between">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 0%, #4a7c3f 0%, transparent 50%)' }}></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
              <HotelOutlined sx={{ fontSize: 24, color: "#e8f0e6" }} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#a8cfa1] font-bold mb-1">
                Booking Preview
              </p>
              <h2 className="text-white font-black text-[20px] leading-tight tracking-wide">
                {selectedService?.serviceName || selectedService?.roomTypeName || "Wellness Stay"}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="relative z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 transition-all flex items-center justify-center text-white border border-white/20"
          >
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 flex flex-col gap-6 bg-[#faf7f2]">
          
          {/* Quick Stats Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#4a7c3f]/10 rounded-2xl border border-[#4a7c3f]/20">
            <div className="flex items-center gap-2">
              <AccessTime sx={{ fontSize: 18, color: "#263d21" }} />
              <p className="text-[13px] font-bold text-[#263d21]">
                {costs.days} Night{costs.days > 1 ? "s" : ""}
              </p>
            </div>
            <div className="h-4 w-px bg-[#4a7c3f]/30 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <GroupOutlined sx={{ fontSize: 18, color: "#263d21" }} />
              <p className="text-[13px] font-bold text-[#263d21]">
                {totalPeopleCount} Guest{totalPeopleCount > 1 ? "s" : ""}
              </p>
            </div>
            <div className="h-4 w-px bg-[#4a7c3f]/30 hidden sm:block"></div>
            <div className="flex items-center gap-2">
               <CalendarToday sx={{ fontSize: 16, color: "#263d21" }} />
               <p className="text-[13px] font-bold text-[#263d21]">
                 {checkInDisplay} - {checkOutDisplay}
               </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Primary Guest Info */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[11px] uppercase tracking-widest text-[#8b6914] font-bold px-1">
                Guest Details
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <InfoChip
                  icon={<PersonOutline fontSize="small" />}
                  label="Name"
                  value={formValues?.fullName}
                />
                <InfoChip
                  icon={<PhoneOutlined fontSize="small" />}
                  label="Contact"
                  value={formValues?.mobile}
                />
                <InfoChip
                  icon={<EmailOutlined fontSize="small" />}
                  label="Email"
                  value={formValues?.email}
                />
              </div>
            </div>

            {/* Stay Details */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[11px] uppercase tracking-widest text-[#8b6914] font-bold px-1">
                Stay Details
              </h3>
              <div className="grid grid-cols-1 gap-2">
                <InfoChip
                  icon={<CalendarToday fontSize="small" />}
                  label="Arrival"
                  value={`${checkInDisplay} @ ${inTimeDisplay}`}
                />
                <InfoChip
                  icon={<CalendarToday fontSize="small" />}
                  label="Departure"
                  value={`${checkOutDisplay} @ ${outTimeDisplay}`}
                />
                 {formValues?.city && (
                  <InfoChip
                    icon={<LocationOnOutlined fontSize="small" />}
                    label="City"
                    value={formValues?.city}
                  />
                 )}
              </div>
            </div>
          </div>

          {/* Additional Info (Members & Pets) - Only show if exist */}
          {(totalMembers > 0 || formValues?.bringingPet || formValues?.noOfChildren0to5 > 0 || formValues?.noOfChildren6to12 > 0) && (
            <div className="p-4 bg-white rounded-2xl border border-[#a08230]/20 shadow-sm">
              <h3 className="text-[11px] uppercase tracking-widest text-[#8b6914] font-bold mb-3">
                Additional Inclusions
              </h3>
              <div className="flex flex-wrap gap-2">
                {totalMembers > 0 && (
                   <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f1ea] rounded-lg border border-[#e2d5c4] text-[#5c544b] text-[12px] font-semibold">
                     <GroupOutlined sx={{ fontSize: 16, color: "#8b6914" }} />
                     {totalMembers} Extra Member{totalMembers > 1 ? "s" : ""}
                   </div>
                )}
                {formValues?.bringingPet && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f1ea] rounded-lg border border-[#e2d5c4] text-[#5c544b] text-[12px] font-semibold">
                    <PetsOutlined sx={{ fontSize: 16, color: "#8b6914" }} />
                    Bringing Pet
                  </div>
                )}
                {Number(formValues?.noOfChildren0to5) > 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f1ea] rounded-lg border border-[#e2d5c4] text-[#5c544b] text-[12px] font-semibold">
                    <ChildCareOutlined sx={{ fontSize: 16, color: "#8b6914" }} />
                    {formValues.noOfChildren0to5} Child (0-5)
                  </div>
                )}
                 {Number(formValues?.noOfChildren6to12) > 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f1ea] rounded-lg border border-[#e2d5c4] text-[#5c544b] text-[12px] font-semibold">
                    <ChildCareOutlined sx={{ fontSize: 16, color: "#8b6914" }} />
                    {formValues.noOfChildren6to12} Child (6-12)
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pricing Section */}
          <div className="mt-2 p-5 bg-white rounded-2xl border border-[#a08230]/30 shadow-md">
             <h3 className="text-[11px] uppercase tracking-widest text-[#8b6914] font-bold mb-3">
                Payment Summary
              </h3>
              <div className="flex flex-col">
                {breakdownItems.map((item, i) => (
                  <PriceRow key={i} label={item.label} value={item.value} />
                ))}
                <PriceRow label="Total Amount" value={Math.round(costs.total)} isTotal={true} />
              </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="shrink-0 p-5 border-t border-[#a08230]/20 bg-[#faf7f2] flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-[#d5c7b4] text-[#7a6e62] text-[13px] font-bold uppercase tracking-widest hover:border-[#a08230] hover:text-[#8b6914] hover:bg-white transition-all"
          >
            Edit Details
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto py-3 px-8 rounded-xl text-white text-[14px] font-black uppercase tracking-widest transition-all hover:shadow-lg active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #263d21 0%, #4a7c3f 100%)",
              boxShadow: "0 4px 14px rgba(38, 61, 33, 0.25)"
            }}
          >
            Looks Good, Proceed
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default BookingPreviewModal;
