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
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ minHeight: 'auto', '& .MuiTabs-indicator': { backgroundColor: '#4c7c70', height: 2 }, '& .MuiTab-root': { textTransform: 'uppercase', minWidth: 'auto', p: '4px 10px', fontSize: '9px', fontWeight: 800, color: '#999', letterSpacing: '0.1em', '&.Mui-selected': { color: '#003d33' } } }}>
          <Tab label="OPD" /><Tab label="Therapy" /><Tab label="Wellness Stay" /><Tab label="Other" />
        </Tabs>
        <div className="flex items-center gap-2">
          <div className="relative flex items-center bg-[#ecedeb] rounded-md px-2.5 py-1 w-48">
            <input type="text" placeholder="Quick search..." className="bg-transparent border-none outline-none text-[9.5px] w-full text-gray-700 font-medium" />
            <SearchIcon className="text-gray-400 !text-[13px] ml-2" />
          </div>
          <IconButton size="small"><NotificationsIcon className="text-gray-600 !text-lg" /></IconButton>
          <IconButton size="small"><ProfileIcon className="text-gray-600 !text-xl" /></IconButton>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden p-2 gap-2">
        <main className={`flex-1 flex flex-col overflow-hidden bg-white rounded-xl border border-gray-100 ${selectedBooking ? 'hidden lg:flex' : 'flex'}`}>
          {renderActiveTab()}
        </main>

        <aside className={`flex-shrink-0 bg-white border border-gray-100 rounded-xl transition-all duration-300 flex flex-col overflow-hidden ${selectedBooking ? 'fixed inset-0 z-10 lg:relative lg:inset-auto w-full lg:w-[360px] xl:w-[400px]' : 'hidden lg:flex lg:w-[320px] xl:w-[360px] h-full'}`}>
          <BookingDetailContent 
            selectedBooking={selectedBooking} 
            onClose={() => setSelectedBooking(null)} 
            type={activeTab === 1 ? 'THERAPY' : 'STAY'} 
          />
        </aside>
      </div>
    </motion.div>
  );
};

export default BookingsDashboard;
