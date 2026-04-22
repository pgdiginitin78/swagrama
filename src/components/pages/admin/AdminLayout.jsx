import React, { useState } from "react";
import AdminDrawer from "./AdminDrawer";
import SuperAdminDashboard from "./SuperAdminDashboard";
import EnquiryDashboard from "./EnquiryDashboard";

import BookingsDashboard from "./BookingsDashboard";

/* Placeholder pages for unimplemented sections */
const PlaceholderPage = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
    <div className="w-16 h-16 rounded-2xl bg-[#e8f5e0] flex items-center justify-center mb-4">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3d6b1f" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="9" y1="15" x2="12" y2="15" />
      </svg>
    </div>
    <h2 className="text-[18px] font-black text-[#1a2a0f] m-0">{title}</h2>
    <p className="text-[12px] text-[#9aa090] mt-2 font-medium">This section is coming soon.</p>
  </div>
);

const CONTENT_MAP = {
  dashboard: <SuperAdminDashboard />,
  enquiries: <EnquiryDashboard />,
  bookings: <BookingsDashboard />,
  inventory: <PlaceholderPage title="Inventory" />,
  masters: <PlaceholderPage title="Masters" />,
  settings: <PlaceholderPage title="Settings" />,
};

const AdminLayout = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="flex overflow-hidden bg-[#f7f9f5]" style={{ height: "calc(100vh - 4rem)" }}>
      {/* Sidebar */}
      <AdminDrawer
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        mobileOpen={mobileDrawerOpen}
        onMobileClose={() => setMobileDrawerOpen(false)}
      />

      {/* Main content wrapper */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-[#e8ede4] sticky top-0 z-20">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="w-8 h-8 rounded-lg border border-[#e8ede4] bg-white flex items-center justify-center cursor-pointer hover:bg-[#f5f6f2] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a4a30" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#3d6b1f] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
            </div>
            <span className="text-[13px] font-black text-[#1a2a0f]">
              Swagrama{" "}
              <span className="text-[#3d6b1f]">Admin</span>
            </span>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-auto h-full">
          {CONTENT_MAP[activeMenu] || <PlaceholderPage title="Page Not Found" />}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
