import React from "react";
import { Avatar } from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";

const DashboardSidebar = ({ 
  user, 
  menuItems, 
  activeTab, 
  setActiveTab, 
  setMobileDrawerOpen, 
  logout,
  membershipRank 
}) => {
  return (
    <div className="flex flex-col h-full bg-[#0f1f0f]">
      <div className="px-5 py-7 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Avatar
            sx={{
              width: 38,
              height: 38,
              bgcolor: "#4a7c2c",
              fontSize: 14,
              fontWeight: 900,
            }}
          >
            {user?.firstName?.charAt(0)}
          </Avatar>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white leading-tight truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[10px] text-white/40 font-semibold mt-0.5">
              {membershipRank} Member
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              if (setMobileDrawerOpen) setMobileDrawerOpen(false);
            }}
            className={`flex items-center w-full px-4 py-3 gap-3 transition-all duration-200 rounded-lg group ${
              activeTab === item.id
                ? "bg-[#4a7c2c] text-white"
                : "text-white/40 hover:text-white/70 hover:bg-white/5"
            }`}
          >
            <span
              className={`shrink-0 transition-colors ${
                activeTab === item.id
                  ? "text-white"
                  : "text-white/30 group-hover:text-white/60"
              }`}
            >
              {item.icon}
            </span>
            <span className="text-xs font-bold tracking-wide">
              {item.label}
            </span>
            {activeTab === item.id && (
              <span className="ml-auto w-1 h-1 rounded-full bg-white/60 shrink-0" />
            )}
          </button>
        ))}
      </nav>

      <div className="px-3 pb-6">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 gap-3 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all rounded-lg"
        >
          <LogoutIcon sx={{ fontSize: 17 }} />
          <span className="text-xs font-bold">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
