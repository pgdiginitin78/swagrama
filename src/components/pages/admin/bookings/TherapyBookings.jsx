import React from 'react';
import { Avatar, IconButton } from '@mui/material';
import { 
  VisibilityOutlined as ViewIcon, 
  EditOutlined as EditIcon, 
  ChevronLeft, 
  ChevronRight,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { StatusBadge, OriginBadge, PaymentStatusBadge } from './BookingComponents';

const THERAPY_DATA = [
  {
    id: '#BK-9021',
    date: 'Oct 24',
    time: '10:30 AM',
    customer: 'Elena Rodriguez',
    phone: '+1 415-555-0123',
    therapy: 'Shirodhara',
    source: 'WEBSITE',
    type: 'IPD',
    facility: 'Lotus Suite 4',
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    avatar: 'ER',
    img: 'https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?w=800',
    detail: 'Oil Flow',
    duration: '60 Minutes',
    intensity: 'Soft/Calming'
  },
  {
    id: '#BK-8944',
    date: 'Oct 24',
    time: '11:45 AM',
    customer: 'Marcus Chen',
    phone: '+1 212-555-0988',
    therapy: 'Abhyanga',
    source: 'MOBILE',
    type: 'OPD',
    facility: '—',
    status: 'CHECKED-IN',
    paymentStatus: 'PARTIALLY PAID',
    avatar: 'MC',
    img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800',
    detail: 'Full Body',
    duration: '90 Minutes',
    intensity: 'Medium'
  },
  {
    id: '#BK-9102',
    date: 'Oct 24',
    time: '02:15 PM',
    customer: 'Sarah Jenkins',
    phone: '+44 20-7946-0112',
    therapy: 'Udvartana',
    source: 'ADMIN',
    type: 'IPD',
    facility: 'Garden Villa B',
    status: 'RESCHEDULED',
    paymentStatus: 'UNPAID',
    avatar: 'SJ',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecee?w=800',
    detail: 'Powder Massage',
    duration: '60 Minutes',
    intensity: 'Deep Tissue'
  },
  {
    id: '#BK-8851',
    date: 'Oct 24',
    time: '04:00 PM',
    customer: 'David Miller',
    phone: '+1 312-555-0744',
    therapy: 'Pizhichil',
    source: 'WEBSITE',
    type: 'OPD',
    facility: '—',
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    avatar: 'DM',
    img: 'https://images.unsplash.com/photo-1620733723572-11c53f7ecba1?w=800',
    detail: 'Royal Bath',
    duration: '75 Minutes',
    intensity: 'Relaxing'
  }
];

const TherapyBookings = ({ onSelect, selectedId }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#fbfcfa]">
      <div className="flex justify-between items-center mb-4 px-5 pt-5 shrink-0">
        <div>
          <h1 className="text-[20px] font-bold text-[#002a24] leading-tight tracking-tight uppercase">Therapy Bookings</h1>
          <p className="text-gray-400 text-[10px] font-normal uppercase mt-0.5">Manage schedules and patient arrivals for today.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-white border border-gray-100 text-[#002a24] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-[10.5px] font-bold shadow-sm transition-all hover:bg-gray-50">
            <FilterIcon className="!text-[14px]" /> Filters
          </button>
          <button className="bg-[#002a24] text-white px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-[10.5px] font-bold shadow-sm transition-all active:scale-95">
            <span className="text-[14px] leading-none">+</span> New Booking
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto px-5 [&::-webkit-scrollbar]:h-[3px] [&::-webkit-scrollbar-thumb]:bg-gray-200">
        <table className="w-full text-left border-separate border-spacing-y-1.5 min-w-[900px]">
          <thead>
            <tr>
              <th className="pb-1 px-3 text-[8.5px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">BOOKING ID & SCHEDULE</th>
              <th className="pb-1 px-3 text-[8.5px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">CUSTOMER</th>
              <th className="pb-1 px-3 text-[8.5px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">THERAPY & SOURCE</th>
              <th className="pb-1 px-3 text-[8.5px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">TYPE / FACILITY</th>
              <th className="pb-1 px-3 text-[8.5px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">STATUS</th>
              <th className="pb-1 px-3 text-[8.5px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">PAYMENT STATUS</th>
              <th className="pb-1 px-3 text-[8.5px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {THERAPY_DATA.map((booking) => {
              const isSelected = selectedId === booking.id;
              return (
                <tr 
                  key={booking.id} 
                  onClick={() => onSelect(booking)} 
                  className={`group cursor-pointer transition-all duration-200 ${isSelected ? 'z-10 relative' : ''}`}
                >
                  <td className={`px-4 py-2 bg-white first:rounded-l-xl transition-all duration-200 ${isSelected ? 'shadow-sm border-y border-l border-[#002a24]/10' : 'group-hover:bg-gray-50/50 border-y border-l border-transparent'}`}>
                    <div className="flex flex-col">
                      <span className="text-[11.5px] font-bold text-[#002a24]">{booking.id}</span>
                      <span className="text-[9.5px] text-gray-400 font-medium tracking-tighter">{booking.date} • {booking.time}</span>
                    </div>
                  </td>
                  <td className={`px-4 py-2 bg-white transition-all duration-200 ${isSelected ? 'shadow-sm border-y border-[#002a24]/10' : 'group-hover:bg-gray-50/50 border-y border-transparent'}`}>
                    <div className="flex flex-col">
                      <span className="text-[11.5px] font-bold text-[#002a24]">{booking.customer}</span>
                      <span className="text-[9.5px] text-gray-400 font-medium tracking-tighter">{booking.phone}</span>
                    </div>
                  </td>
                  <td className={`px-4 py-2 bg-white transition-all duration-200 ${isSelected ? 'shadow-sm border-y border-[#002a24]/10' : 'group-hover:bg-gray-50/50 border-y border-transparent'}`}>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11.5px] font-bold text-[#002a24]">{booking.therapy}</span>
                      <OriginBadge origin={booking.source} />
                    </div>
                  </td>
                  <td className={`px-4 py-2 bg-white transition-all duration-200 ${isSelected ? 'shadow-sm border-y border-[#002a24]/10' : 'group-hover:bg-gray-50/50 border-y border-transparent'}`}>
                    <div className="flex flex-col leading-none">
                      <span className="text-[10px] font-bold text-gray-400 mb-0.5">{booking.type}</span>
                      {booking.facility !== '—' ? (
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#4c7c70] font-bold underline underline-offset-2 decoration-gray-100">{booking.facility.split(' ')[0]}</span>
                          <span className="text-[10px] text-gray-400 font-normal underline underline-offset-2 decoration-gray-100">{booking.facility.split(' ').slice(1).join(' ')}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-gray-400">—</span>
                      )}
                    </div>
                  </td>
                  <td className={`px-4 py-2 bg-white transition-all duration-200 ${isSelected ? 'shadow-sm border-y border-[#002a24]/10' : 'group-hover:bg-gray-50/50 border-y border-transparent'}`}>
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className={`px-4 py-2 bg-white transition-all duration-200 ${isSelected ? 'shadow-sm border-y border-[#002a24]/10' : 'group-hover:bg-gray-50/50 border-y border-transparent'}`}>
                    <PaymentStatusBadge status={booking.paymentStatus} />
                  </td>
                  <td className={`px-4 py-2 bg-white last:rounded-r-xl text-center transition-all duration-200 ${isSelected ? 'shadow-sm border-y border-r border-[#002a24]/10' : 'group-hover:bg-gray-50/50 border-y border-r border-transparent'}`}>
                    <div className="flex items-center justify-center gap-0.5">
                      <IconButton size="small" className="!p-1.5"><ViewIcon className="!text-[16px] text-gray-400" /></IconButton>
                      <IconButton size="small" className="!p-1.5"><EditIcon className="!text-[16px] text-gray-400" /></IconButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className="px-5 py-4 flex items-center justify-between shrink-0 border-t border-gray-50">
        <span className="text-[10px] font-bold text-gray-400 uppercase">Showing 4 of 28 Bookings</span>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-100 text-gray-400 transition-all hover:bg-gray-50 active:scale-95 shadow-sm"><ChevronLeft className="!text-sm" /></button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#003d33] text-white transition-all active:scale-95 shadow-sm text-[10px] font-bold">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-100 text-gray-400 transition-all hover:bg-gray-50 active:scale-95 shadow-sm"><ChevronRight className="!text-sm" /></button>
        </div>
      </footer>
    </div>
  );
};

export default TherapyBookings;
