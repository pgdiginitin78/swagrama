import React from 'react';
import { Avatar, IconButton } from '@mui/material';
import { VisibilityOutlined as ViewIcon, EditOutlined as EditIcon, DeleteOutline as DeleteIcon, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { StatusBadge, OriginBadge } from './BookingComponents';

const THERAPY_DATA = Array.from({ length: 8 }, (_, i) => ({
  id: `#THR-50${i + 1}`,
  date: 'Oct 25, 2023',
  time: '09:00 AM',
  customer: i % 2 === 0 ? 'Anish Agarwal' : 'Sonia Varma',
  origin: 'SWAGRAM',
  service: i % 2 === 0 ? 'Abhyanga' : 'Shirodhara',
  lastFollowUp: 'Sep 20, 2023',
  status: 'CONFIRMED',
  avatar: i % 2 === 0 ? 'AA' : 'SV',
  phone: '+91 91234 56789',
  img: 'https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?w=200'
}));

const TherapyBookings = ({ onSelect, selectedId }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4 px-1 shrink-0">
        <div>
          <h1 className="text-[22px] md:text-[26px] font-semibold py-1 text-[#003d33] tracking-tighter uppercase leading-none">Therapy Bookings</h1>
          <p className="text-gray-400 text-[9.5px] font-normal uppercase">Manage wellness therapies and specialized sessions.</p>
        </div>
        <button className="bg-[#003d33] text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-[11.5px] font-normal shadow-sm transition-all active:scale-95">
          <span className="text-[17px] leading-none">+</span> New Therapy
        </button>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-gray-100 bg-white shadow-sm [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:border-none [&::-webkit-scrollbar-thumb]:rounded-full">
        <table className="w-full text-left border-collapse min-w-[750px] table-auto">
          <thead className="sticky top-0 bg-[#fafafa] z-20">
            <tr>
              <th className="px-4 py-3 text-[8.5px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">BOOKING DETAILS</th>
              <th className="px-4 py-3 text-[8.5px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">CUSTOMER</th>
              <th className="px-4 py-3 text-[8.5px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">ORIGIN</th>
              <th className="px-4 py-3 text-[8.5px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">SERVICE</th>
              <th className="px-4 py-3 text-[8.5px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">LAST FOLLOW-UP</th>
              <th className="px-4 py-3 text-[8.5px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">STATUS</th>
              <th className="px-4 py-3 text-[8.5px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {THERAPY_DATA.map((booking) => {
              const isSelected = selectedId === booking.id;
              return (
                <tr key={booking.id} onClick={() => onSelect(booking)} className={`group cursor-pointer transition-all ${isSelected ? 'bg-[#f4f7f6]' : 'hover:bg-gray-50/50'}`}>
                  <td className="px-4 py-2 whitespace-nowrap relative">
                    {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#003d33]" />}
                    <div className={`flex flex-col ${isSelected ? 'pl-2' : ''}`}>
                      <span className="text-[11px] font-normal text-[#1a2a0f]">{booking.id}</span>
                      <span className="text-[8px] text-gray-400 font-normal tracking-tight">{booking.date} • {booking.time}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <Avatar sx={{ width: 22, height: 22, bgcolor: '#d4edda', color: '#6d9751', fontSize: '10px', fontWeight: 400 }}>{booking.avatar}</Avatar>
                      <span className="text-[11px] font-normal text-[#1a2a0f]">{booking.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2"><OriginBadge origin={booking.origin} /></td>
                  <td className="px-4 py-2 whitespace-nowrap"><span className="text-[10px] font-normal text-gray-700">{booking.service}</span></td>
                  <td className="px-4 py-2 whitespace-nowrap italic text-gray-400 font-normal text-[8.5px]">{booking.lastFollowUp}</td>
                  <td className="px-4 py-2"><StatusBadge status={booking.status} /></td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-center gap-2 opacity-100 transition-opacity">
                      <IconButton size="small" className="!p-1"><ViewIcon className="!text-[17px] text-gray-500" /></IconButton>
                      <IconButton size="small" className="!p-1"><EditIcon className="!text-[17px] text-gray-500" /></IconButton>
                      <IconButton size="small" className="!p-1"><DeleteIcon className="!text-[17px] text-gray-500" /></IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className="py-2 flex items-center justify-between shrink-0 px-1">
        <span className="text-[9px] font-normal text-gray-400 uppercase">Showing 1-{THERAPY_DATA.length} of {THERAPY_DATA.length} Bookings</span>
        <div className="flex items-center gap-1.5">
          <IconButton size="small"><ChevronLeft className="!text-sm" /></IconButton>
          <button className="w-5 h-5 flex items-center justify-center rounded-full bg-[#003d33] text-[9.5px] font-normal text-white shadow-sm">1</button>
          <IconButton size="small"><ChevronRight className="!text-sm" /></IconButton>
        </div>
      </footer>
    </div>
  );
};

export default TherapyBookings;
