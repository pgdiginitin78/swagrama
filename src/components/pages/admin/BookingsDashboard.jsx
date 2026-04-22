import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, Tab, IconButton } from '@mui/material';
import { Search as SearchIcon, NotificationsNone as NotificationsIcon, AccountCircleOutlined as ProfileIcon } from '@mui/icons-material';
import OPDBookings from './bookings/OPDBookings';
import TherapyBookings from './bookings/TherapyBookings';
import WellnessStayBookings from './bookings/WellnessStayBookings';
import OtherBookings from './bookings/OtherBookings';
import { BookingDetailContent } from './bookings/BookingComponents';

const BookingsDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedBooking(null);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 0: return <OPDBookings onSelect={setSelectedBooking} selectedId={selectedBooking?.id} />;
      case 1: return <TherapyBookings onSelect={setSelectedBooking} selectedId={selectedBooking?.id} />;
      case 2: return <WellnessStayBookings onSelect={setSelectedBooking} selectedId={selectedBooking?.id} />;
      case 3: return <OtherBookings onSelect={setSelectedBooking} selectedId={selectedBooking?.id} />;
      default: return <OPDBookings onSelect={setSelectedBooking} selectedId={selectedBooking?.id} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full bg-[#fbfbf8] overflow-hidden font-sans"
    >
      <header className="flex flex-col md:flex-row items-center justify-between px-4 py-1 bg-[#fbfbf8] border-b border-gray-100 gap-2 shrink-0">
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ minHeight: 'auto', '& .MuiTabs-indicator': { backgroundColor: '#4c7c70', height: 2 }, '& .MuiTab-root': { textTransform: 'none', minWidth: 'auto', p: '6px 12px', fontSize: '11px', fontWeight: 400, color: '#888', '&.Mui-selected': { color: '#003d33' } } }}>
          <Tab label="OPD" /><Tab label="Therapy" /><Tab label="Wellness Stay" /><Tab label="Other" />
        </Tabs>
        <div className="flex items-center gap-3">
          <div className="relative flex items-center bg-[#ecedeb] rounded-full px-3 py-1 w-56">
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-[11px] w-full text-gray-700 font-normal" />
            <SearchIcon className="text-gray-400 !text-sm ml-2" />
          </div>
          <IconButton size="small"><NotificationsIcon className="text-gray-600 !text-lg" /></IconButton>
          <IconButton size="small"><ProfileIcon className="text-gray-600 !text-xl" /></IconButton>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className={`flex-1 flex flex-col p-4 overflow-hidden ${selectedBooking ? 'hidden lg:flex' : 'flex'}`}>
          {renderActiveTab()}
        </main>

        <aside className={`h-[calc(100%-12px)] flex-shrink-0 bg-[#f4f7f6] border-l border-gray-100 transition-all duration-300 ring-1 ring-black/5 rounded-xl self-center ${selectedBooking ? 'fixed inset-0 z-10 lg:relative lg:inset-auto w-full lg:w-[320px] xl:w-[350px]' : 'hidden lg:flex lg:w-[320px] xl:w-[350px]'}`}>
          <BookingDetailContent selectedBooking={selectedBooking} onClose={() => setSelectedBooking(null)} />
        </aside>
      </div>
    </motion.div>
  );
};

export default BookingsDashboard;
