import {
  CalendarMonth as CalendarIcon,
  Receipt as ReceiptIcon
} from "@mui/icons-material";
import { Drawer } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

// Components
import TherapyIcon from "../../../assets/TherapyIcon.svg";
import ActivityDetailsDrawer from "./components/ActivityDetailsDrawer";
import DashboardHeader from "./components/DashboardHeader";
import DashboardSidebar from "./components/DashboardSidebar";
import GenericSection from "./components/GenericSection";
import MembershipSection from "./components/MembershipSection";
import MembershipUpgradeDrawer from "./components/MembershipUpgradeDrawer";
import OverviewSection from "./components/OverviewSection";

// Hooks & Constants
import { MEMBERSHIP_TIERS, MENU_ITEMS } from "./constants/dashboardConstants";
import useUserDashboard from "./hooks/useUserDashboard";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);

  const {
    userDashboardCount,
    upcomingActivities,
    upcomingOPD,
    upcomingTherapies,
    refresh,
  } = useUserDashboard(user);

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
                <OverviewSection
                  user={user}
                  userDashboardCount={userDashboardCount}
                  upcomingActivities={upcomingActivities}
                  upcomingOPD={upcomingOPD}
                  upcomingTherapies={upcomingTherapies}
                  setActiveTab={setActiveTab}
                  setSelectedItem={setSelectedItem}
                />
              )}
              {activeTab === "appointments" && (
                <GenericSection
                  title="Consultations"
                  icon={<CalendarIcon sx={{ fontSize: 20 }} />}
                  data={upcomingOPD}
                  setSelectedItem={setSelectedItem}
                />
              )}
              {activeTab === "therapies" && (
                <GenericSection
                  title="Therapies"
                  icon={<img src={TherapyIcon} alt="Therapies" className="h-5 w-5" />}
                  data={upcomingTherapies}
                  setSelectedItem={setSelectedItem}
                />
              )}
              {activeTab === "shop" && (
                <GenericSection
                  title="Order History"
                  icon={<ReceiptIcon sx={{ fontSize: 20 }} />}
                  data={[]}
                  setSelectedItem={setSelectedItem}
                />
              )}
              {activeTab === "membership" && (
                <MembershipSection
                  membershipTiers={MEMBERSHIP_TIERS}
                  selectedTier={selectedTier}
                  setSelectedTier={setSelectedTier}
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

      <ActivityDetailsDrawer
        item={selectedItem}
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onRescheduleSuccess={refresh}
      />

      <MembershipUpgradeDrawer
        tier={selectedTier}
        open={!!selectedTier}
        onClose={() => setSelectedTier(null)}
        currentRank={user?.membershipRank || "Silver Plus"}
      />

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
