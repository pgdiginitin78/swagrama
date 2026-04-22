import React from "react";

const DashboardIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const EnquiriesIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <circle cx="12" cy="12" r="0.1" />
    <path d="M12 9v4" />
    <path d="M12 16h.01" />
  </svg>
);

const BookingsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="m9 16 2 2 4-4" />
  </svg>
);

const InventoryIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="21 8 21 21 3 21 3 8" />
    <rect x="1" y="3" width="22" height="5" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>
);

const MastersIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const menuItems = [
  { key: "dashboard", label: "Dashboard", Icon: DashboardIcon },
  { key: "enquiries", label: "Enquiries", Icon: EnquiriesIcon },
  { key: "bookings", label: "Bookings", Icon: BookingsIcon },
  { key: "inventory", label: "Inventory", Icon: InventoryIcon },
  { key: "masters", label: "Masters", Icon: MastersIcon },
  { key: "settings", label: "Settings", Icon: SettingsIcon },
];

const AdminDrawer = ({
  activeMenu,
  onMenuChange,
  mobileOpen,
  onMobileClose,
}) => {
  return (
    <>
      <style>{`
        /* Kill global leaf icons */
        .drawer-nav-container ul li::before { content: none !important; }
        .drawer-nav-container ul li { display: block !important; padding: 0 !important; margin: 0 !important; }
      `}</style>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`
    fixed top-0 left-0 z-40 flex flex-col h-screen lg:h-full
    bg-[#f8f9f7] border-r border-[#e5ebe0]
    transition-transform duration-300 ease-in-out
    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0 lg:static lg:z-auto
  `}
        style={{ width: "200px" }}
      >
        <nav className="flex-1 px-3 pt-5 overflow-y-auto drawer-nav-container pb-4 flex flex-col">
          <ul className="list-none m-0 p-0 space-y-1">
            {menuItems
              .filter((item) => item.key !== "settings")
              .map(({ key, label, Icon }) => {
                const isActive = activeMenu === key;
                return (
                  <li key={key}>
                    <button
                      onClick={() => {
                        onMenuChange(key);
                        if (mobileOpen) onMobileClose();
                      }}
                      className={`
                w-full flex items-center gap-4 px-5 py-3
                border-none cursor-pointer text-left transition-all duration-150
                rounded-xl
                ${
                  isActive
                    ? "bg-white text-[#1e5d66] shadow-sm"
                    : "bg-transparent text-[#4a5568] hover:bg-black/5"
                }
              `}
                    >
                      <span
                        className={`flex-shrink-0 flex items-center ${
                          isActive ? "text-[#1e5d66]" : "text-[#4a5568]"
                        }`}
                      >
                        <Icon />
                      </span>
                      <span className="text-[14px] font-semibold leading-none">
                        {label}
                      </span>
                    </button>
                  </li>
                );
              })}
          </ul>

          <ul className="list-none m-0 p-0 space-y-1 mt-auto pt-10">
            {menuItems
              .filter((item) => item.key === "settings")
              .map(({ key, label, Icon }) => {
                const isActive = activeMenu === key;
                return (
                  <li key={key}>
                    <button
                      onClick={() => {
                        onMenuChange(key);
                        if (mobileOpen) onMobileClose();
                      }}
                      className={`
                w-full flex items-center gap-4 px-5 py-3
                border-none cursor-pointer text-left transition-all duration-150
                rounded-xl
                ${
                  isActive
                    ? "bg-white text-[#1e5d66] shadow-sm"
                    : "bg-transparent text-[#4a5568] hover:bg-black/5"
                }
              `}
                    >
                      <span
                        className={`flex-shrink-0 flex items-center ${
                          isActive ? "text-[#1e5d66]" : "text-[#4a5568]"
                        }`}
                      >
                        <Icon />
                      </span>
                      <span className="text-[14px] font-semibold leading-none">
                        {label}
                      </span>
                    </button>
                  </li>
                );
              })}
          </ul>
        </nav>

        <div className="shrink-0 p-4 bg-[#f8f9f7] border-t border-[#e5ebe0]">
          <div className="bg-white rounded-2xl p-3 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src="https://media.licdn.com/dms/image/v2/C4D03AQE1V2G2lXv7zA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1623912169647?e=2147483647&v=beta&t=4G0H0Z4Y5G0H0Z4Y5G0H0Z4Y5G0H0Z4Y5G0H0Z4Y5"
                alt="Admin"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  if (e.target.nextSibling)
                    e.target.nextSibling.style.display = "flex";
                }}
              />
              <div className="hidden w-full h-full items-center justify-center bg-[#1e5d66] text-white font-bold text-xs">
                SA
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-[#1e5d66] truncate m-0">
                Swagram Admin
              </p>
              <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-tighter m-0">
                SUPERUSER
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminDrawer;
