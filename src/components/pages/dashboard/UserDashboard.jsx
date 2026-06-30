import { Drawer } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import DashboardHeader from "./components/DashboardHeader";
import DashboardSidebar from "./components/DashboardSidebar";
import MembershipSection from "./components/MembershipSection";
import OverviewTab from "./tabs/OverviewTab";
import AppointmentsTab from "./tabs/AppointmentsTab";
import TherapiesTab from "./tabs/TherapiesTab";
import ShopTab from "./tabs/ShopTab";
import { MEMBERSHIP_TIERS, MENU_ITEMS } from "./constants/dashboardConstants";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const activeTabLabel = MENU_ITEMS.find((m) => m.id === activeTab)?.label;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-screen bg-[#f8f8f6]"
    >
      <aside className="hidden md:flex md:w-52 lg:w-[200px] sticky top-0 h-screen flex-shrink-0 z-20">
        <div className="w-full">
          <DashboardSidebar
            user={user}
            menuItems={MENU_ITEMS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            logout={logout}
            membershipRank={user?.membershipRank || "Silver Plus"}
          />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          user={user}
          activeTabLabel={activeTabLabel}
          setMobileDrawerOpen={setMobileDrawerOpen}
        />

        <main className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6">
          <AnimatePresence mode="wait">
            <div key={activeTab}>
              {activeTab === "overview" && (
                <OverviewTab user={user} setActiveTab={setActiveTab} />
              )}
              {activeTab === "appointments" && <AppointmentsTab user={user} />}
              {activeTab === "therapies" && <TherapiesTab user={user} />}
              {activeTab === "shop" && <ShopTab user={user} />}
              {activeTab === "membership" && (
                <MembershipSection
                  membershipTiers={MEMBERSHIP_TIERS}
                  user={user}
                />
              )}
            </div>
          </AnimatePresence>
        </main>
      </div>

      <Drawer
        anchor="left"
        open={isMobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        PaperProps={{ sx: { width: 240, bgcolor: "#0f1f0f" } }}
      >
        <DashboardSidebar
          user={user}
          menuItems={MENU_ITEMS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setMobileDrawerOpen={setMobileDrawerOpen}
          logout={logout}
          membershipRank={user?.membershipRank || "Silver Plus"}
        />
      </Drawer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: #4a7c2c;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }
      `,
        }}
      />
    </motion.div>
  );
};

export default UserDashboard;
