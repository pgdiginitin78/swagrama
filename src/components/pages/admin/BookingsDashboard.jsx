import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, Tab, IconButton, Box } from "@mui/material";
import {
  Search as SearchIcon,
  NotificationsNone as NotificationsIcon,
  AccountCircleOutlined as ProfileIcon,
} from "@mui/icons-material";
import OPDBookings from "./bookings/OPDBookings";
import TherapyBookings from "./bookings/TherapyBookings";
import WellnessStayBookings from "./bookings/WellnessStayBookings";
import OtherBookings from "./bookings/OtherBookings";

const BookingsDashboard = ({ initialTab, onTabConsumed }) => {
  const [activeTab, setActiveTab] = useState(initialTab ?? 0);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

  useEffect(() => {
    if (initialTab !== undefined) {
      setActiveTab(initialTab);
      setSelectedBooking(null);
      if (onTabConsumed) onTabConsumed();
    }
  }, [initialTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedBooking(null);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 0:
        return (
          <OPDBookings
            onSelect={setSelectedBooking}
            selectedId={selectedBooking?.id}
            refreshTrigger={refreshTrigger}
          />
        );
      case 1:
        return (
          <TherapyBookings
            onSelect={setSelectedBooking}
            selectedId={selectedBooking?.id}
            refreshTrigger={refreshTrigger}
          />
        );
      case 2:
        return (
          <WellnessStayBookings
            onSelect={setSelectedBooking}
            selectedId={selectedBooking?.id}
            refreshTrigger={refreshTrigger}
          />
        );
      case 3:
        return (
          <OtherBookings
            onSelect={setSelectedBooking}
            selectedId={selectedBooking?.id}
            refreshTrigger={refreshTrigger}
          />
        );
      default:
        return (
          <OPDBookings
            onSelect={setSelectedBooking}
            selectedId={selectedBooking?.id}
            refreshTrigger={refreshTrigger}
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full bg-[#fbfbf8] "
    >
      <header className="flex flex-col md:flex-row items-center justify-between px-4 py-1 w-full border-b border-gray-100 gap-2 shrink-0">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          
          sx={{
            width:"100%",
            minHeight: "40px",

        
            color: "green",
            "& .MuiTabs-indicator": {
              height: "4px",
              borderRadius: "5px",
              backgroundColor: "green",
              width: "60px",
            },

            "& .MuiTabs-flexContainer": {
              gap: "10px",
              px: 1,
            },

            "& .MuiTab-root": {
              textTransform: "none",
              minHeight: "50px",
              p: 0,
              color: "#4e4a57",
              fontWeight: 700,
              fontSize: "14px",
              transition: "all .25s ease",
              color: "green",

              "& .tab-box": {
                width: "100%",
                height: "36px",
                borderRadius: "5px",
                border: "3px solid transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all .25s ease",
                background: "transparent",
                color: "green",
              },

              "&.Mui-selected .tab-box": {
            
                background: "",
                boxShadow: "0 4px 12px rgba(108,90,145,0.12)",
              },
            },
          }}
        >
          <Tab label={<Box className="tab-box">OPD</Box>} />

          <Tab label={<Box className="tab-box">Therapy</Box>} />

          <Tab label={<Box className="tab-box">Wellness Stay</Box>} />

          <Tab label={<Box className="tab-box">Other</Box>} />
        </Tabs>
      </header>

      <div className="flex flex-1 p-2 gap-2 overflow-hidden">
        <main className="flex-1 flex flex-col rounded-xl border border-gray-100 overflow-hidden">
          {renderActiveTab()}
        </main>
      </div>
    </motion.div>
  );
};

export default BookingsDashboard;
