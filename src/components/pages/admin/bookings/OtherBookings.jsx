import React from 'react';
import { Avatar, IconButton } from '@mui/material';
import { VisibilityOutlined as ViewIcon, EditOutlined as EditIcon, DeleteOutline as DeleteIcon, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { StatusBadge, OriginBadge } from './BookingComponents';

const OTHER_DATA = Array.from({ length: 3 }, (_, i) => ({
  id: `#OTH-20${i + 1}`,
  date: 'Oct 27, 2023',
  time: 'N/A',
  customer: 'Corporate Guest',
  origin: 'MOBILE',
  service: 'Annual Membership',
  lastFollowUp: 'Oct 01, 2023',
  status: 'CONFIRMED',
  avatar: 'CG',
  phone: 'N/A',
  img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200'
}));

const OtherBookings = ({ onSelect, selectedId }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#fbfcfa]">
      <div className="flex justify-between items-center mb-4 px-4 pt-4 shrink-0">
        <div>
          <h1 className="text-[20px] font-bold text-[#003d33] tracking-tighter uppercase leading-none">Other Bookings</h1>
          <p className="text-gray-400 text-[10px] font-normal uppercase mt-1">Manage miscellaneous gift cards and memberships.</p>
        </div>
        <button className="bg-[#003d33] text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-[10.5px] font-bold shadow-sm transition-all active:scale-95">
          <span className="text-[14px] leading-none">+</span> New Entry
        </button>
      </div>

      <div className="flex-1 overflow-auto bg-white border-y border-gray-100 [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:bg-gray-200">
        <table className="w-full text-left border-collapse min-w-[750px] table-auto">
          <thead className="sticky top-0 bg-[#fafafa] z-20">
            <tr>
              <th className="px-4 py-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">BOOKING DETAILS</th>
              <th className="px-4 py-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">CUSTOMER</th>
              <th className="px-4 py-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">ORIGIN</th>
              <th className="px-4 py-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">SERVICE</th>
              <th className="px-4 py-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">LAST FOLLOW-UP</th>
              <th className="px-4 py-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap text-center">STATUS</th>
              <th className="px-4 py-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {OTHER_DATA.map((booking) => {
              const isSelected = selectedId === booking.id;
              return (
                <tr key={booking.id} onClick={() => onSelect(booking)} className={`group cursor-pointer transition-all ${isSelected ? 'bg-[#f4f7f6]' : 'hover:bg-gray-50/50'}`}>
                  <td className="px-4 py-2 whitespace-nowrap relative">
                    {isSelected && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#003d33]" />}
                    <div className="flex flex-col">
                      <span className="text-[10.5px] font-bold text-[#1a2a0f]">{booking.id}</span>
                      <span className="text-[8.5px] text-gray-400 font-medium tracking-tight whitespace-nowrap">{booking.date} • {booking.time}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Avatar sx={{ width: 22, height: 22, bgcolor: '#d4edda', color: '#6d9751', fontSize: '10px', fontWeight: 700 }}>A</Avatar>
                      <span className="text-[11px] font-bold text-[#1a2a0f]">{booking.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2"><OriginBadge origin={booking.origin} /></td>
                  <td className="px-4 py-2 whitespace-nowrap"><span className="text-[10px] font-bold text-gray-700">{booking.service}</span></td>
                  <td className="px-4 py-2 whitespace-nowrap italic text-gray-400 font-medium text-[9px]">{booking.lastFollowUp}</td>
                  <td className="px-4 py-2 text-center"><StatusBadge status={booking.status} /></td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-center gap-1">
                      <IconButton size="small" className="!p-1"><ViewIcon className="!text-[16px] text-gray-400" /></IconButton>
                      <IconButton size="small" className="!p-1"><EditIcon className="!text-[16px] text-gray-400" /></IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className="footer-compact px-4 py-2.5 flex items-center justify-between shrink-0 bg-white">
        <span className="text-[9px] font-bold text-gray-400 uppercase">Showing {OTHER_DATA.length} Entries</span>
        <div className="flex items-center gap-1.5">
          <IconButton size="small"><ChevronLeft className="!text-sm" /></IconButton>
          <button className="w-5 h-5 flex items-center justify-center rounded-lg bg-[#003d33] text-[9.5px] font-bold text-white">1</button>
          <IconButton size="small"><ChevronRight className="!text-sm" /></IconButton>
        </div>
      </footer>
    </div>
  );
};

export default OtherBookings;
