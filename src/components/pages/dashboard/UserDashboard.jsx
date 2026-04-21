import {
  ArrowForward as ArrowForwardIcon,
  EventNote as BookingIcon,
  CalendarMonth as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  SpaceDashboard as DashboardIcon,
  Diamond as DiamondIcon,
  History as HistoryIcon,
  Logout as LogoutIcon,
  CardMembership as MembershipIcon,
  Menu as MenuIcon,
  Receipt as ReceiptIcon,
  LocalShipping as ShippingIcon,
  Spa as SpaIcon,
  AutoAwesome as SparkleIcon,
  Star as StarIcon,
  AccessTime as TimeIcon,
  EmojiEvents as TrophyIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Drawer,
  IconButton,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import TherapyIcon from "../../../assets/TherapyIcon.svg";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);

  const mockData = useMemo(
    () => ({
      appointments: [
        {
          id: "OPD-9921",
          name: "Dr. Arvind Sharma",
          expert: "Ayurveda Consultation",
          date: "Apr 21, 2026",
          time: "10:30 AM",
          status: "Upcoming",
          type: "appointment",
          prep: "Fast for 2 hours before your pulse diagnosis.",
        },
        {
          id: "OPD-8802",
          name: "Dr. Sunitha Reddy",
          expert: "Yoga Therapist",
          date: "May 02, 2026",
          time: "09:00 AM",
          status: "Completed",
          type: "appointment",
        },
      ],
      orders: [
        {
          id: "#ORD-7790",
          name: "Wellness Pack",
          expert: "Copper Bottle, Yoga Mat",
          date: "Apr 18, 2026",
          total: "₹3,200",
          status: "In Transit",
          step: 2,
          tracking: "SW-TRK-7711",
          type: "order",
        },
        {
          id: "#ORD-7721",
          name: "Healing Kit",
          expert: "Ashwagandha, Tulsi Tea",
          date: "Apr 15, 2026",
          total: "₹1,450",
          status: "Delivered",
          step: 3,
          tracking: "SW-TRK-7705",
          type: "order",
        },
      ],
      therapies: [
        {
          id: "TH-201",
          name: "Panchakarma Detox",
          expert: "Phase 1: Deep Cleansing",
          date: "Apr 25, 2026",
          time: "08:00 AM",
          status: "Upcoming",
          center: "Wellness Wing Room 204",
          type: "therapy",
          prep: "Drink 500ml warm water upon waking.",
        },
        {
          id: "TH-092",
          name: "Aroma Therapy",
          expert: "Relaxation Cycle",
          date: "Apr 20, 2026",
          time: "05:00 PM",
          status: "Upcoming",
          center: "Main Sanctuary",
          type: "therapy",
        },
      ],
      membership: {
        rank: "Silver Plus",
        since: "Jan 2026",
        valid: "Lifetime",
        perks: [
          "15% Store Discount",
          "Unlimited Yoga Access",
          "Priority OPD Support",
          "Full Health Record Access",
        ],
      },
    }),
    [],
  );

  const membershipTiers = [
    {
      id: "silver",
      name: "Silver Plus",
      current: true,
      icon: <StarIcon />,
      price: "Active",
      color: "from-slate-400 to-slate-500",
      accent: "#94a3b8",
      perks: [
        "15% Store Discount",
        "Unlimited Yoga Access",
        "Priority OPD Support",
        "Full Health Record Access",
      ],
    },
    {
      id: "gold",
      name: "Gold",
      current: false,
      icon: <TrophyIcon />,
      price: "₹2,999/yr",
      color: "from-amber-400 to-orange-500",
      accent: "#f59e0b",
      perks: [
        "25% Store Discount",
        "Unlimited Yoga & Meditation",
        "Priority OPD + Home Visits",
        "Full Health Records + Analytics",
        "Quarterly Detox Package",
        "Dedicated Wellness Coach",
      ],
    },
    {
      id: "platinum",
      name: "Platinum",
      current: false,
      icon: <DiamondIcon />,
      price: "₹5,999/yr",
      color: "from-lime-500 to-green-700",
      accent: "#7c3aed",
      perks: [
        "40% Store Discount",
        "All Gold Benefits",
        "Unlimited Therapy Sessions",
        "Annual Panchakarma Retreat",
        "24/7 Doctor on Call",
        "Family Health Coverage",
        "VIP Lounge Access",
      ],
    },
  ];

  const menuItems = [
    {
      id: "overview",
      label: "Wellness Hub",
      icon: <DashboardIcon sx={{ fontSize: 17 }} />,
    },
    {
      id: "appointments",
      label: "Consultations",
      icon: <CalendarIcon sx={{ fontSize: 17 }} />,
    },
    {
      id: "therapies",
      label: "Therapies",
      icon: <SpaIcon sx={{ fontSize: 17 }} />,
    },
    {
      id: "shop",
      label: "Orders",
      icon: <ReceiptIcon sx={{ fontSize: 17 }} />,
    },
    {
      id: "membership",
      label: "Membership",
      icon: <MembershipIcon sx={{ fontSize: 17 }} />,
    },
  ];

  const SidebarContent = () => (
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
              {mockData.membership.rank} Member
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
              setMobileDrawerOpen(false);
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

  const StatusBadge = ({ status }) => {
    const isActive = status === "Upcoming" || status === "In Transit";
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
          isActive
            ? "bg-emerald-50 text-emerald-600"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {isActive && (
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        )}
        {status}
      </span>
    );
  };

  const ActivityCard = ({ data }) => (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
      onClick={() => setSelectedItem(data)}
      className="flex flex-col justify-between p-4 bg-white border border-gray-100 rounded-xl cursor-pointer transition-all duration-200 min-w-0"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div
          className={`p-2.5 rounded-lg shrink-0 ${
            data.type === "therapy"
              ? "bg-emerald-50 text-emerald-600"
              : data.type === "order"
                ? "bg-amber-50 text-amber-600"
                : "bg-blue-50 text-blue-600"
          }`}
        >
          {data.type === "therapy" ? (
            <img src={TherapyIcon} alt="Therapy" className="w-4 h-4" />
          ) : data.type === "order" ? (
            <ShippingIcon sx={{ fontSize: 16 }} />
          ) : (
            <BookingIcon sx={{ fontSize: 16 }} />
          )}
        </div>
        <StatusBadge status={data.status} />
      </div>

      <div className="mb-3 flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900 leading-tight truncate">
          {data.name}
        </p>
        <p className="text-[11px] text-gray-400 font-medium mt-0.5 truncate">
          {data.expert}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50 gap-2">
        <div className="flex items-center gap-1.5 text-gray-500 min-w-0">
          <TimeIcon sx={{ fontSize: 12, color: "#4a7c2c", flexShrink: 0 }} />
          <span className="text-[10px] font-semibold truncate">
            {data.date}
          </span>
        </div>
        <span className="text-[10px] font-bold text-gray-400 shrink-0">
          {data.time || data.total}
        </span>
      </div>
    </motion.div>
  );

  const StatsBar = () => (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {[
        { label: "Upcoming", value: "3", sub: "Sessions this month" },
        { label: "Completed", value: "12", sub: "Lifetime visits" },
        { label: "Orders", value: "2", sub: "Active shipments" },
      ].map((s, i) => (
        <div
          key={i}
          className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4"
        >
          <p className="text-xl sm:text-2xl font-black text-gray-900">
            {s.value}
          </p>
          <p className="text-[10px] sm:text-xs font-bold text-[#4a7c2c] mt-0.5">
            {s.label}
          </p>
          <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5 hidden sm:block">
            {s.sub}
          </p>
        </div>
      ))}
    </div>
  );

  const renderOverview = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 sm:space-y-5"
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#0f1f0f] p-5 sm:p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <SparkleIcon sx={{ color: "#a3e635", fontSize: 13 }} />
            <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">
              Wellness Journey
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            नमस्ते, <span className="text-[#a3e635]">{user?.firstName}</span>
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-2 max-w-md leading-relaxed">
            Your natural healing path is unfolding. Your next session is
            tomorrow at 10:30 AM.
          </p>
          <button
            onClick={() => setActiveTab("appointments")}
            className="mt-4 sm:mt-5 inline-flex items-center gap-2 bg-[#4a7c2c] text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-[#3d6824] transition-colors"
          >
            <span>View Schedule</span>
            <ArrowForwardIcon sx={{ fontSize: 13 }} />
          </button>
        </div>
      </div>

      <StatsBar />

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-black text-gray-900">
              Upcoming Activities
            </p>
            <button className="text-[11px] font-bold text-[#4a7c2c]">
              View all →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ActivityCard data={mockData.appointments[0]} />
            <ActivityCard data={mockData.therapies[0]} />
            <ActivityCard data={mockData.orders[0]} />
            <ActivityCard data={mockData.therapies[1]} />
          </div>
        </div>

        <div className="w-full lg:w-64 xl:w-72 shrink-0 bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-black text-gray-900 uppercase tracking-wide">
              Membership
            </p>
            <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
              <StarIcon sx={{ fontSize: 14 }} />
            </div>
          </div>
          <p className="text-xl font-black text-gray-900">
            {mockData.membership.rank}
          </p>
          <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
            Since {mockData.membership.since} · Lifetime
          </p>
          <div className="mt-4 space-y-2.5">
            {mockData.membership.perks.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircleIcon
                  sx={{ color: "#4a7c2c", fontSize: 13, flexShrink: 0 }}
                />
                <span className="text-[11px] font-semibold text-gray-600">
                  {p}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setActiveTab("membership")}
            className="mt-5 w-full py-2.5 bg-[#0f1f0f] text-white text-xs font-bold rounded-lg hover:bg-[#1a3a1a] transition-colors"
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderGenericSection = (title, icon, data) => (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-5"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2.5 bg-[#f0fdf4] text-[#4a7c2c] rounded-xl shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight truncate">
              {title}
            </h2>
            <p className="text-[11px] text-gray-400 font-medium">
              {data.length} records
            </p>
          </div>
        </div>
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-50 shrink-0">
          <HistoryIcon sx={{ fontSize: 14 }} />
          <span>Export</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {data.map((item, i) => (
          <ActivityCard key={i} data={item} />
        ))}
      </div>
    </motion.div>
  );

  const renderMembership = () => (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-5"
    >
      <div>
        <h2 className="text-lg sm:text-xl font-black text-gray-900">
          Membership Plans
        </h2>
        <p className="text-xs text-gray-400 font-medium mt-0.5">
          Upgrade to unlock premium wellness experiences
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {membershipTiers.map((tier) => (
          <motion.div
            key={tier.id}
            whileHover={{ y: -4 }}
            onClick={() => !tier.current && setSelectedTier(tier)}
            className={`relative flex flex-col rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
              tier.current
                ? "border-gray-200 bg-white cursor-default"
                : selectedTier?.id === tier.id
                  ? "border-[#4a7c2c] bg-white cursor-pointer shadow-lg shadow-green-900/10"
                  : "border-gray-100 bg-white cursor-pointer hover:border-gray-300"
            }`}
          >
            {!tier.current && tier.id === "gold" && (
              <div className="absolute top-3 right-3 bg-amber-400 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                Popular
              </div>
            )}
            {tier.current && (
              <div className="absolute top-3 right-3 bg-[#4a7c2c] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                Active
              </div>
            )}

            <div className={`bg-gradient-to-br ${tier.color} p-5`}>
              <div className="flex items-center gap-2">
                <span className="text-white/90">{tier.icon}</span>
                <p className="text-sm font-black text-white">{tier.name}</p>
              </div>
              <p className="text-xl font-black text-white mt-3">{tier.price}</p>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="space-y-2.5 flex-1">
                {tier.perks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircleIcon
                      sx={{
                        fontSize: 14,
                        color: tier.current ? "#94a3b8" : "#4a7c2c",
                        marginTop: "1px",
                        flexShrink: 0,
                      }}
                    />
                    <span className="text-[11px] font-semibold text-gray-600 leading-tight">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>

              <button
                disabled={tier.current}
                onClick={(e) => {
                  e.stopPropagation();
                  !tier.current && setSelectedTier(tier);
                }}
                className={`mt-5 w-full py-2.5 rounded-lg text-xs font-bold transition-all ${
                  tier.current
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-[#0f1f0f] text-white hover:bg-[#1a3a1a] active:scale-95"
                }`}
              >
                {tier.current ? "Current Plan" : `Upgrade to ${tier.name}`}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <SparkleIcon
            sx={{
              color: "#4a7c2c",
              fontSize: 18,
              marginTop: "1px",
              flexShrink: 0,
            }}
          />
          <div>
            <p className="text-xs font-black text-[#4a7c2c]">Why Upgrade?</p>
            <p className="text-[11px] text-green-800 font-medium mt-1 leading-relaxed">
              Higher tiers unlock deeper healing experiences — from dedicated
              wellness coaches to full family coverage and retreat access. Every
              upgrade brings you closer to complete holistic health.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex min-h-screen bg-[#f8f8f6]">
      <aside className="hidden md:flex md:w-52 lg:w-[200px] sticky top-0 h-screen flex-shrink-0 z-20">
        <div className="w-full">
          <SidebarContent />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
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
              {menuItems.find((m) => m.id === activeTab)?.label}
            </p>
            <p className="text-[10px] text-gray-400 font-medium">
              Tuesday, April 21, 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#f0fdf4] border border-[#dcfce7] px-3 py-1.5 rounded-lg">
              <StarIcon sx={{ color: "#4a7c2c", fontSize: 13 }} />
              <span className="text-[11px] font-bold text-[#4a7c2c]">
                {mockData.membership.rank}
              </span>
            </div>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "#0f1f0f",
                fontSize: 12,
                fontWeight: 900,
              }}
            >
              {user?.firstName?.charAt(0)}
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6">
          <AnimatePresence mode="wait">
            <div key={activeTab}>
              {activeTab === "overview" && renderOverview()}
              {activeTab === "appointments" &&
                renderGenericSection(
                  "Consultations",
                  <CalendarIcon sx={{ fontSize: 20 }} />,
                  mockData.appointments,
                )}
              {activeTab === "therapies" &&
                renderGenericSection(
                  "Healing Journey",
                  <SpaIcon sx={{ fontSize: 20 }} />,
                  mockData.therapies,
                )}
              {activeTab === "shop" &&
                renderGenericSection(
                  "Order History",
                  <ReceiptIcon sx={{ fontSize: 20 }} />,
                  mockData.orders,
                )}
              {activeTab === "membership" && renderMembership()}
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
        <SidebarContent />
      </Drawer>

      <Drawer
        anchor="right"
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        PaperProps={{ sx: { width: "100%", maxWidth: 420 } }}
      >
        {selectedItem && (
          <div className="flex flex-col h-full bg-white">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <p className="text-sm font-black text-gray-900">
                Activity Details
              </p>
              <IconButton onClick={() => setSelectedItem(null)} size="small">
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div
                  className={`p-3 rounded-xl shrink-0 ${
                    selectedItem.type === "therapy"
                      ? "bg-emerald-100 text-emerald-600"
                      : selectedItem.type === "order"
                        ? "bg-amber-100 text-amber-600"
                        : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {selectedItem.type === "therapy" ? (
                    <SpaIcon />
                  ) : selectedItem.type === "order" ? (
                    <ShippingIcon />
                  ) : (
                    <BookingIcon />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-gray-900 truncate">
                    {selectedItem.name}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-wide">
                    {selectedItem.id}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Date
                  </p>
                  <p className="text-xs font-bold text-gray-800">
                    {selectedItem.date}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Time / Amount
                  </p>
                  <p className="text-xs font-bold text-gray-800">
                    {selectedItem.time || selectedItem.total}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                  Status
                </p>
                <StatusBadge status={selectedItem.status} />
              </div>

              {selectedItem.expert && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Details
                  </p>
                  <p className="text-xs font-semibold text-gray-700">
                    {selectedItem.expert}
                  </p>
                </div>
              )}

              {selectedItem.prep && (
                <div className="p-4 bg-[#f0fdf4] border border-[#dcfce7] rounded-xl">
                  <p className="text-[9px] font-black text-[#4a7c2c] uppercase tracking-widest mb-2">
                    Preparation Note
                  </p>
                  <p className="text-xs font-medium text-green-900 leading-relaxed">
                    "{selectedItem.prep}"
                  </p>
                </div>
              )}

              {selectedItem.type === "order" && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">
                    Shipping Progress
                  </p>
                  <Stepper activeStep={selectedItem.step} alternativeLabel>
                    {["Packed", "Picked", "In Transit", "Delivered"].map(
                      (label) => (
                        <Step key={label}>
                          <StepLabel>
                            <span className="text-[9px] font-black uppercase text-gray-500">
                              {label}
                            </span>
                          </StepLabel>
                        </Step>
                      ),
                    )}
                  </Stepper>
                </div>
              )}
            </div>

            <div className="p-4 sm:p-5 border-t border-gray-100 shrink-0">
              <button className="w-full py-3 border-2 border-gray-200 text-gray-600 font-bold text-xs rounded-xl hover:bg-gray-50 active:scale-95 transition-all">
                Need Help?
              </button>
            </div>
          </div>
        )}
      </Drawer>

      <Drawer
        anchor="right"
        open={!!selectedTier}
        onClose={() => setSelectedTier(null)}
        PaperProps={{ sx: { width: "100%", maxWidth: 400 } }}
      >
        {selectedTier && (
          <div className="flex flex-col h-full bg-white">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <p className="text-sm font-black text-gray-900">Upgrade Plan</p>
              <IconButton onClick={() => setSelectedTier(null)} size="small">
                <CloseIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              <div
                className={`bg-gradient-to-br ${selectedTier.color} rounded-2xl p-6 text-white`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {selectedTier.icon}
                  <p className="text-sm font-black">{selectedTier.name}</p>
                </div>
                <p className="text-3xl font-black">{selectedTier.price}</p>
                <p className="text-xs opacity-70 mt-1">
                  per year · cancel anytime
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">
                  All Benefits Included
                </p>
                <div className="space-y-3">
                  {selectedTier.perks.map((p, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircleIcon
                        sx={{
                          color: "#4a7c2c",
                          fontSize: 15,
                          marginTop: "1px",
                          flexShrink: 0,
                        }}
                      />
                      <span className="text-xs font-semibold text-gray-700">
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <p className="text-[10px] font-black text-amber-700">
                  Upgrading from {mockData.membership.rank}
                </p>
                <p className="text-[11px] text-amber-600 font-medium mt-1">
                  You'll keep all existing benefits and gain everything listed
                  above.
                </p>
              </div>
            </div>
            <div className="p-4 sm:p-5 border-t border-gray-100 space-y-3 shrink-0">
              <button className="w-full py-3 bg-[#0f1f0f] text-white font-bold text-xs rounded-xl hover:bg-[#1a3a1a] active:scale-95 transition-all">
                Confirm Upgrade to {selectedTier.name}
              </button>
              <button
                onClick={() => setSelectedTier(null)}
                className="w-full py-3 text-gray-500 font-bold text-xs rounded-xl hover:bg-gray-50 transition-all"
              >
                Maybe Later
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default UserDashboard;
