import {
  Close as CloseIcon,
  Restaurant as MealIcon,
  Pets as PetIcon
} from '@mui/icons-material';
import {
  Divider,
  IconButton
} from '@mui/material';

import {
  Laptop as AdminIcon,
  History as HistoryIcon,
  Smartphone as MobileIcon,
  MeetingRoom as RoomIcon,
  Language as WebIcon
} from '@mui/icons-material';

export const StatusBadge = ({ status }) => {
  const styles = {
    CONFIRMED: 'bg-[#e7f5ed] text-[#3e9d6d]',
    'CHECKED-IN': 'bg-[#3b4b3e] text-[#e7f5ed]',
    RESCHEDULED: 'bg-[#e2e8f0] text-[#718096]',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-tight ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
};

export const PaymentStatusBadge = ({ status }) => {
  const styles = {
    PAID: 'bg-[#e7f5ed] text-[#3e9d6d]',
    'PARTIALLY PAID': 'bg-[#f4f7d4] text-[#8ea62a]',
    UNPAID: 'bg-[#feeded] text-[#e53e3e]',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-tight ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
};

export const OriginBadge = ({ origin }) => {
  const icons = {
    WEBSITE: <WebIcon className="!text-[10px]" />,
    MOBILE: <MobileIcon className="!text-[10px]" />,
    ADMIN: <AdminIcon className="!text-[10px]" />,
  };
  return (
    <div className="flex items-center gap-1 text-[8.5px] font-bold text-gray-500 uppercase tracking-wider">
      {icons[origin]}
      <span>{origin}</span>
    </div>
  );
};

export const BookingDetailContent = ({ selectedBooking, onClose, type = 'STAY' }) => {
  if (!selectedBooking) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full p-6 text-center bg-[#fcfcf9]">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm border border-gray-100">
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-100" />
        </div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Active Selection</p>
        <h3 className="text-[18px] font-bold text-[#002a24] mb-1">Booking Details</h3>
      </div>
    );
  }

  if (type === 'THERAPY') {
    return (
      <div className="flex flex-col h-full bg-[#f9faf9]  p-3.5 relative">
        <IconButton size="small" onClick={onClose} className="!absolute !top-3 !right-3 !bg-white shadow-sm !p-1 z-10">
          <CloseIcon className="!text-[14px] text-gray-400" />
        </IconButton>

        <div className="mb-3">
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Active Selection</p>
          <h2 className="text-[16px] font-bold text-[#002a24] leading-none">Booking Details</h2>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-thumb]:bg-gray-200">
          <div className="relative rounded-xl overflow-hidden mb-3">
            <img src={selectedBooking.img || 'https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?w=800'} alt="Therapy" className="w-full aspect-[16/8] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
              <span className="text-[7px] font-bold text-[#b8d433] uppercase mb-0.5">Primary Treatment</span>
              <h3 className="text-[14px] font-bold text-white leading-tight">{selectedBooking.service} ({selectedBooking.detail || 'Oil Flow'})</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-white p-2 rounded-xl shadow-sm border border-white">
              <p className="text-[7px] font-bold text-gray-400 uppercase mb-0.5">Duration</p>
              <h4 className="text-[10px] font-bold text-[#002a24]">{selectedBooking.duration || '60 Minutes'}</h4>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-sm border border-white">
              <p className="text-[7px] font-bold text-gray-400 uppercase mb-0.5">Intensity</p>
              <h4 className="text-[10px] font-bold text-[#002a24]">{selectedBooking.intensity || 'Soft/Calming'}</h4>
            </div>
          </div>

          <div className="bg-[#eef2f0] p-3 rounded-xl border border-white mb-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 bg-[#003d33] rounded flex items-center justify-center text-white">
                <RoomIcon className="!text-[14px]" />
              </div>
              <div>
                <h4 className="text-[9.5px] font-bold text-[#002a24] leading-none mb-0.5">{selectedBooking.facility || 'Lotus Suite 4'}</h4>
                <p className="text-[7px] font-bold text-gray-500 uppercase leading-none tracking-tighter">Assigned Daycare Facility</p>
              </div>
            </div>
            <p className="text-[9px] text-gray-600 leading-tight font-normal">
              {selectedBooking.facilityDesc || 'Premium private suite with climate control and attached hydro-therapeutic shower. Prepared with fresh linens and essential oils at 10:00 AM.'}
            </p>
          </div>

          <div className="mb-2">
            <div className="flex items-center gap-1.5 mb-2.5">
              <HistoryIcon className="!text-[12px] text-gray-500" />
              <h4 className="text-[8.5px] font-bold text-[#002a24] uppercase tracking-wider">Patient History</h4>
            </div>
            <div className="space-y-3 pl-2 border-l border-gray-200 ml-1">
              <div className="relative">
                <div className="absolute -left-[11px] top-1 w-1.5 h-1.5 rounded-full bg-[#3e9d6d] border border-white" />
                <h5 className="text-[9.5px] font-bold text-[#002a24] leading-none">Abhyanga Massage</h5>
                <p className="text-[8px] text-gray-400 font-normal leading-none mt-1">Oct 12, 2023 • Dr. Gupta</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[11px] top-1 w-1.5 h-1.5 rounded-full bg-gray-300 border border-white" />
                <h5 className="text-[9.5px] font-bold text-[#002a24] leading-none tracking-tighter">Consultation (Vata)</h5>
                <p className="text-[8px] text-gray-400 font-normal leading-none mt-1">Sep 28, 2023 • Initial Visit</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-1.5 pt-3">
          <button className="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-[#002a24] text-[9.5px] font-bold transition-all active:scale-95">Reschedule</button>
          <button className="flex-1 py-2 rounded-xl bg-[#003d33] text-white text-[9.5px] font-bold transition-all active:scale-95 shadow-md shadow-[#003d33]/10 uppercase">Check-in</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white  shadow-2xl">
      <div className="p-3.5 flex items-center justify-between border-b border-gray-50">
        <h2 className="text-[12px] font-bold text-[#002a24] uppercase tracking-widest leading-none">Stay Summary</h2>
        <IconButton size="small" onClick={onClose} className="!p-1 hover:bg-gray-100">
          <CloseIcon className="!text-[16px] text-gray-300" />
        </IconButton>
      </div>

      <div className="flex-1 overflow-y-auto p-3.5 [&::-webkit-scrollbar]:hidden">
        <div className="relative mb-4">
          <div className="aspect-[2/1] rounded-xl overflow-hidden shadow-sm border border-gray-50">
            <img src={selectedBooking.img} alt="Room" className="w-full h-full object-cover" />
            <div className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10">
              <span className="text-[6.5px] font-bold text-white uppercase tracking-[0.15em]">{selectedBooking.roomType || 'Deluxe Cottage'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col mb-4 px-0.5">
          <div className="flex justify-between items-center mb-0.5">
            <h3 className="text-[14px] font-black text-[#002a24] tracking-tight">{selectedBooking.customer}</h3>
            <span className="px-2 py-0.5 rounded-md bg-[#e8f5e9] text-[#2d7d32] text-[7.5px] font-black tracking-tight uppercase border border-[#c8e6c9]">ACTIVE</span>
          </div>
          <p className="text-[9.5px] text-gray-400 font-bold opacity-70">Check-in: {selectedBooking.date || 'Oct 12, 2:00 PM'}</p>
        </div>

        <div className="mb-4">
          <p className="text-[7.5px] font-black text-gray-200 uppercase tracking-[0.2em] mb-2 px-0.5">Stay Experience</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-[#f9f9f7] border border-gray-50/50">
              <PetIcon className="!text-[13px] text-[#4c5c40] opacity-80" />
              <div className="min-w-0">
                <p className="text-[9px] font-black text-[#002a24] leading-none mb-0.5">Pet Friendly</p>
                <p className="text-[8px] text-[#4c5c40] font-bold opacity-40 truncate">Gold. Retriever</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-[#f9f9f7] border border-gray-50/50">
              <MealIcon className="!text-[13px] text-[#4c5c40] opacity-80" />
              <div className="min-w-0">
                <p className="text-[9px] font-black text-[#002a24] leading-none mb-0.5">Meal Plan</p>
                <p className="text-[8px] text-[#4c5c40] font-bold opacity-40 truncate">Full Board</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-[7.5px] font-black text-gray-200 uppercase tracking-[0.2em] mb-2 px-0.5">Special Requests</p>
          <div className="px-4 py-3 rounded-xl bg-[#fffef4] border border-[#f5f0d5]">
            <p className="text-[9px] text-[#827a4d] font-bold italic leading-snug text-center opacity-70 italic tracking-tight">
              "Bathroom accessibility. Low-sodium organic meal options."
            </p>
          </div>
        </div>
        <div className="mb-2">
          <p className="text-[7.5px] font-black text-gray-200 uppercase tracking-[0.2em] mb-3 px-0.5">Financial Overview</p>
          <div className="space-y-1.5 px-1">
            <div className="flex justify-between items-center text-[9.5px]">
              <span className="text-gray-400 font-bold">Base Room Rate</span>
              <span className="text-[#002a24] font-black">₹1,12,000</span>
            </div>
            <div className="flex justify-between items-center text-[9.5px]">
              <span className="text-gray-400 font-bold">Wellness Add-ons</span>
              <span className="text-[#002a24] font-black">₹15,500</span>
            </div>
            <div className="flex justify-between items-center text-[9.5px]">
              <span className="text-gray-400 font-bold">Taxes (GST)</span>
              <span className="text-[#002a24] font-black">₹22,950</span>
            </div>
            <Divider className="!my-2.5 !opacity-20" />
            <div className="flex justify-between items-center">
              <span className="text-[12px] text-[#003d33] font-black tracking-tight uppercase">Total Amount</span>
              <span className="text-[14px] text-[#003d33] font-black">₹1,50,450</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3.5 border-t border-gray-50 flex gap-2 shrink-0">
        <button className="flex-1 py-2.5 rounded-lg bg-[#003d33] text-white text-[9.5px] font-black uppercase tracking-[0.1em] transition-all active:scale-95 shadow-sm">
          CHECK-OUT
        </button>
        <button className="flex-1 py-2.5 rounded-lg bg-[#f5f5f5] text-[#4d5d40] text-[9.5px] font-black uppercase tracking-[0.1em] transition-all hover:bg-gray-200 active:scale-95">
          VIEW INVOICE
        </button>
      </div>
    </div>
  );
};


