import React from 'react';
import { Avatar, IconButton } from '@mui/material';
import { Close as CloseIcon, LocalPhoneOutlined as CallIcon, StickyNote2Outlined as NoteIcon, HealingOutlined as HealingIcon, TouchApp as TouchIcon } from '@mui/icons-material';

export const StatusBadge = ({ status }) => {
  const styles = {
    CONFIRMED: 'text-[#2e7d32] before:bg-[#2e7d32]',
    PENDING: 'text-[#757575] before:bg-[#757575]',
    CANCELLED: 'text-[#d32f2f] before:bg-[#d32f2f]'
  };
  return (
    <span className={`relative pl-3 text-[8.5px] font-normal ${styles[status] || ''} flex items-center whitespace-nowrap`}>
      <span className="absolute left-0 w-1 h-1 rounded-full bg-current" />
      {status}
    </span>
  );
};

export const OriginBadge = ({ origin }) => {
  const styles = {
    MOBILE: 'bg-[#ecf4e6] text-[#6d9751]',
    AYURMITRA: 'bg-[#dcf3f0] text-[#48a999]',
    SWAGRAM: 'bg-[#e0f1f1] text-[#4a9f94]'
  };
  return (
    <span className={`px-1.5 py-0.5 rounded text-[8px] font-normal uppercase tracking-tighter ${styles[origin] || ''}`}>
      {origin}
    </span>
  );
};

export const BookingDetailContent = ({ selectedBooking, onClose }) => {
  if (!selectedBooking) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center bg-[#f4f7f6]">
        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm">
          <TouchIcon className="text-[#003d33] !text-2xl" />
        </div>
        <h3 className="text-[13px] font-semibold text-[#002a24] mb-1.5 uppercase tracking-tight">SELECT A BOOKING</h3>
        <p className="text-[9.5px] text-gray-400 font-normal leading-relaxed max-w-[160px]">Click on any row to view details and patient history.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#f4f7f6] overflow-y-auto [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
      <div className="p-4 pb-12 flex flex-col min-h-full">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[13px] font-semibold text-[#002a24] uppercase tracking-wider py-1">Booking Details</h2>
          <IconButton size="small" onClick={onClose}><CloseIcon className="!text-sm text-gray-400" /></IconButton>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-[80px] h-[80px] rounded-[24px] overflow-hidden shadow-sm">
              <img src={selectedBooking.img} alt={selectedBooking.customer} className="w-full h-full object-cover" />
            </div>
            <span className="absolute -bottom-1 -right-1 bg-[#4c7c70] text-white text-[7.5px] font-normal px-1.5 py-0.5 rounded border border-[#f4f7f6] uppercase">VIP</span>
          </div>
          <h3 className="text-[17px] font-normal text-[#002a24] mt-4 mb-0.5">{selectedBooking.customer}</h3>
          <div className="flex items-center gap-1.5 text-gray-400 font-normal text-[10px]">
            <CallIcon className="!text-xs" />
            <span>{selectedBooking.phone}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100/50">
            <p className="text-[8px] font-normal text-gray-300 uppercase tracking-widest mb-3">Appointment Info</p>
            <div className="grid grid-cols-2 gap-y-3.5">
              <div><p className="text-gray-400 text-[8.5px] font-normal uppercase mb-0.5">Booking ID</p><p className="text-[#002a24] text-[10.5px] font-normal">{selectedBooking.id}</p></div>
              <div><p className="text-gray-400 text-[8.5px] font-normal uppercase mb-0.5">Service</p><p className="text-[#002a24] text-[10.5px] font-normal">{selectedBooking.service}</p></div>
              <div><p className="text-gray-400 text-[8.5px] font-normal uppercase mb-0.5">Date</p><p className="text-[#002a24] text-[10.5px] font-normal">{selectedBooking.date}</p></div>
              <div><p className="text-gray-400 text-[8.5px] font-normal uppercase mb-0.5">Time</p><p className="text-[#002a24] text-[10.5px] font-normal">{selectedBooking.time}</p></div>
            </div>
          </div>

          <div>
            <p className="text-[8px] font-normal text-gray-300 uppercase tracking-widest mb-3">Summary Info</p>
            <div className="space-y-3.5">
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-[#4c5c40] flex items-center justify-center text-white"><NoteIcon className="!text-[16px]" /></div>
                <div className="min-w-0"><h4 className="text-[10.5px] font-normal text-[#002a24] mb-0.5">Quick Notes</h4><p className="text-[9px] text-gray-400 font-normal leading-tight">Patient details and activity log summary.</p></div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-8 h-8 rounded-lg bg-[#c0e6d6] flex items-center justify-center text-[#4c7c70]"><HealingIcon className="!text-[16px]" /></div>
                <div className="min-w-0"><h4 className="text-[10.5px] font-normal text-[#002a24] mb-0.5">Active Status</h4><p className="text-[9px] text-gray-400 font-normal leading-tight">Current activity and session status log.</p></div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8 pb-4 flex gap-3">
            <button className="flex-1 py-3 rounded-full bg-gray-200 text-gray-700 text-[11px] font-normal transition-colors">Reschedule</button>
            <button className="flex-1 py-3 rounded-full bg-[#003d33] text-white text-[11px] font-normal shadow-lg shadow-teal-900/10">Actions</button>
          </div>
        </div>
      </div>
    </div>
  );
};
