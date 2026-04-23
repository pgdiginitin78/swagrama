import React from "react";
import { Avatar } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const DashboardHeader = ({ 
  user, 
  activeTabLabel, 
  setMobileDrawerOpen 
}) => {
  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 md:hidden sticky top-0 z-30">
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="p-1.5 rounded-lg hover:bg-gray-100 active:bg-gray-200"
        >
          <MenuIcon sx={{ color: "#4a7c2c", fontSize: 22 }} />
        </button>
        <span className="text-xs font-black text-[#4a7c2c] uppercase tracking-widest">
          Swagrama
        </span>
        <Avatar
          sx={{
            width: 30,
            height: 30,
            bgcolor: "#4a7c2c",
            fontSize: 12,
            fontWeight: 900,
          }}
        >
          {user?.firstName?.charAt(0)}
        </Avatar>
      </header>

      <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-20">
        <div>
          <p className="text-sm font-black text-gray-900">
            {activeTabLabel}
          </p>
          <p className="text-[10px] text-gray-400 font-medium capitalize">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;
