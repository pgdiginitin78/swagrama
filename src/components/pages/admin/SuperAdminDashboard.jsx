import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AccountBalanceWallet,
  ArrowForward,
  Assignment,
  CalendarMonth,
  Close,
  Hotel,
  MedicalServices,
  People,
  Search,
  Timeline,
  TrendingUp,
  Visibility,
  Menu,
} from "@mui/icons-material";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const G = "#3d6b1f";
const G2 = "#5a9e2f";

const KPIData = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "₹82,45,000",
    trend: "+24.1%",
    sub: "incl. Shop & Services",
    icon: <AccountBalanceWallet sx={{ fontSize: 18 }} />,
    bg: "#e8f5e0",
    fg: "#3d6b1f",
  },
  {
    id: "membership",
    title: "Memberships",
    value: "458",
    trend: "+15",
    sub: "Gold/Platinum active",
    icon: <People sx={{ fontSize: 18 }} />,
    bg: "#e3f2fd",
    fg: "#1565c0",
  },
  {
    id: "shop",
    title: "Store Orders",
    value: "142",
    trend: "+8.2%",
    sub: "pending fulfillment",
    icon: <CalendarMonth sx={{ fontSize: 18 }} />,
    bg: "#fce4ec",
    fg: "#c62828",
  },
  {
    id: "stays",
    title: "Stay Occupancy",
    value: "82%",
    trend: "Full",
    sub: "Hospitals & Detox",
    icon: <Hotel sx={{ fontSize: 18 }} />,
    bg: "#ede7f6",
    fg: "#4527a0",
  },
  {
    id: "consultations",
    title: "Today's OPD",
    value: "28",
    trend: "Live",
    sub: "consultations in prog",
    icon: <Timeline sx={{ fontSize: 18 }} />,
    bg: "#fff3e0",
    fg: "#e65100",
  },
];

const earningsTrend = [
  { name: "Mon", amount: 45000 },
  { name: "Tue", amount: 52000 },
  { name: "Wed", amount: 48000 },
  { name: "Thu", amount: 61000 },
  { name: "Fri", amount: 55000 },
  { name: "Sat", amount: 72000 },
  { name: "Sun", amount: 68000 },
];

const categoryRevenue = [
  { name: "OPD/Clinic", revenue: 145000 },
  { name: "Hospital/Stay", revenue: 268000 },
  { name: "E-Shop", revenue: 112000 },
  { name: "Wellness", revenue: 85000 },
  { name: "Nature/Beauty", revenue: 45000 },
];

const therapyRevenue = [
  { name: "Ayurveda", value: 35 },
  { name: "Panchakarma", value: 25 },
  { name: "Nature Therapy", value: 20 },
  { name: "Beauty/Detox", value: 20 },
];

const PIE_COLORS = ["#3d6b1f", "#5a9e2f", "#81c784", "#c8e6c9"];

const doctorAssignments = [
  {
    id: 1,
    name: "Dr. Arvind Sharma",
    therapies: ["OPD Consultation", "Panchakarma"],
    clinic: "Wellness Wing",
    bookings: 12,
    upcoming: 4,
    completed: 45,
    status: "Busy",
    email: "arvind@swagrama.com",
    phone: "+91 98XXX XXX01",
  },
  {
    id: 2,
    name: "Dr. Sunitha Reddy",
    therapies: ["Yoga", "Meditation"],
    clinic: "City Center",
    bookings: 8,
    upcoming: 2,
    completed: 32,
    status: "Available",
    email: "sunitha@swagrama.com",
    phone: "+91 98XXX XXX02",
  },
  {
    id: 3,
    name: "Dr. Rajesh Kumar",
    therapies: ["Detox Stay", "Healing"],
    clinic: "North Branch",
    bookings: 15,
    upcoming: 6,
    completed: 58,
    status: "Active",
    email: "rajesh@swagrama.com",
    phone: "+91 98XXX XXX03",
  },
  {
    id: 4,
    name: "Dr. Meera Iyer",
    therapies: ["Ayurveda"],
    clinic: "Wellness Wing",
    bookings: 5,
    upcoming: 1,
    completed: 22,
    status: "Available",
    email: "meera@swagrama.com",
    phone: "+91 98XXX XXX04",
  },
];

const bookingTracking = [
  {
    id: "OPD-9921",
    patient: "Rahul Mehta",
    therapy: "OPD Consultation",
    doctor: "Dr. Arvind Sharma",
    clinic: "Wellness Wing",
    status: "Ongoing",
    progress: 75,
    date: "Apr 20",
    time: "10:30 AM",
  },
  {
    id: "ORD-7790",
    patient: "Sneha Kapur",
    therapy: "Wellness Product Pack",
    doctor: "E-Shop Order",
    clinic: "Main Center",
    status: "Upcoming",
    progress: 30,
    date: "Apr 21",
    time: "Out for Delivery",
  },
  {
    id: "TH-201",
    patient: "Amit Verma",
    therapy: "Panchakarma Detox",
    doctor: "Dr. Rajesh Kumar",
    clinic: "IPD Wellness",
    status: "Completed",
    progress: 100,
    date: "Apr 18",
    time: "Phase 1 Complete",
  },
  {
    id: "MEM-882",
    patient: "Priya Singh",
    therapy: "Membership Upgrade",
    doctor: "System Auto",
    clinic: "Community Hub",
    status: "Completed",
    progress: 100,
    date: "Apr 17",
    time: "Silver -> Gold",
  },
];

const checkInsData = [
  {
    id: 1,
    patient: "Karan Johar",
    therapy: "Detox Stay",
    doctor: "Dr. Rajesh Kumar",
    clinic: "Detox House",
    time: "10:00 AM",
    duration: "3 Days",
    type: "Stay",
    room: "204B",
  },
  {
    id: 2,
    patient: "Ananya Pandey",
    therapy: "Beauty Therapy",
    doctor: "Wellness Staff",
    clinic: "Nature Sanctuary",
    time: "11:30 AM",
    duration: "Today",
    type: "Therapy",
    room: "Room 12",
  },
  {
    id: 3,
    patient: "Vicky Kaushal",
    therapy: "IPD Wellness Stay",
    doctor: "Dr. Arvind Sharma",
    clinic: "Hospital Wing",
    time: "02:00 PM",
    duration: "7 Days",
    type: "Stay",
    room: "101A",
  },
];

const statusColor = (s) => {
  if (s === "Available") return { bg: "#e8f5e0", fg: "#3d6b1f" };
  if (s === "Busy") return { bg: "#fff3e0", fg: "#e65100" };
  if (s === "Active") return { bg: "#e3f2fd", fg: "#1565c0" };
  return { bg: "#f5f5f5", fg: "#616161" };
};

const bookingStatusColor = (s) => {
  if (s === "Ongoing") return { bg: "#e3f2fd", fg: "#1565c0" };
  if (s === "Completed") return { bg: "#e8f5e0", fg: "#3d6b1f" };
  if (s === "Upcoming") return { bg: "#ede7f6", fg: "#4527a0" };
  return { bg: "#fafafa", fg: "#9e9e9e" };
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#e8f5e0] rounded-xl px-3.5 py-2 shadow-lg">
        <p className="text-[10px] font-bold text-[#9e9e9e] mb-0.5">{label}</p>
        <p className="text-[13px] font-extrabold text-[#3d6b1f] m-0">
          ₹{(payload[0].value / 1000).toFixed(0)}k
        </p>
      </div>
    );
  }
  return null;
};

const SuperAdminDashboard = () => {
  const [searchDoc, setSearchDoc] = useState("");
  const [clinicFilter, setClinicFilter] = useState("All");
  const [navOpen, setNavOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setNavOpen(false);
    }
  };

  const filteredDoctors = doctorAssignments.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchDoc.toLowerCase()) &&
      (clinicFilter === "All" || doc.clinic === clinicFilter),
  );

  const handleDetailClick = (item, type) => {
    setSelectedDetail({ ...item, dataType: type });
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen  px-4 md:px-9">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900&display=swap');
        *, body { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .pulse-dot { animation: pulse-dot 1.5s infinite; }
      `}</style>

      <main className="max-w-[1600px] mx-auto pt-5 pb-10">
        <header className="flex items-center justify-between mb-6 pb-5 border-b border-[#e8ede4] flex-wrap gap-3">
          <div>
            <h1 className="m-0 text-[clamp(20px,3vw,28px)] font-black text-[#1a2a0f] tracking-tight">
              Super Admin <span className="text-[#3d6b1f]">Dashboard</span>
            </h1>
            <p className="mt-0.5 mb-0 text-xs text-[#8a9580] font-medium">
              Global ecosystem monitoring & financial analytics
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block text-right">
              <p className="m-0 text-[10px] font-bold text-[#b0bba5] uppercase tracking-widest">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
           
          </div>
        </header>

        <section
          id="kpi-overview"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5"
        >
          {KPIData.map((kpi, i) => (
            <motion.div
              key={kpi.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              onClick={() => handleDetailClick(kpi, "stat")}
              className="bg-white rounded-2xl p-3.5 border border-[#eef0ea] cursor-pointer relative overflow-hidden"
            >
              <div
                className="absolute -top-4 -right-4 w-14 h-14 rounded-full opacity-60"
                style={{ background: kpi.bg }}
              />
              <div className="flex items-center gap-2 mb-2.5">
                <div
                  className="w-[30px] h-[30px] rounded-[9px] flex items-center justify-center flex-shrink-0"
                  style={{ background: kpi.bg, color: kpi.fg }}
                >
                  {kpi.icon}
                </div>
                <span className="text-[10px] font-bold text-[#9aa090] uppercase tracking-[0.5px] leading-tight">
                  {kpi.title}
                </span>
              </div>
              <div className="text-[clamp(18px,2.5vw,22px)] font-black text-[#1a2a0f] tracking-tight leading-none">
                {kpi.value}
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-[5px] ${
                    kpi.trend.startsWith("+")
                      ? "bg-[#e8f5e0] text-[#3d6b1f]"
                      : "bg-[#f5f5f5] text-[#9e9e9e]"
                  }`}
                >
                  {kpi.trend}
                </span>
                <span className="text-[9px] text-[#b0bba5] font-medium">
                  {kpi.sub}
                </span>
              </div>
            </motion.div>
          ))}
        </section>

        <section className="mb-5">
          <div className="bg-white rounded-[18px] border border-[#eef0ea] p-[18px]">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#e8f5e0] text-[#3d6b1f] flex items-center justify-center">
                  <AccountBalanceWallet sx={{ fontSize: 15 }} />
                </div>
                <span className="text-[13px] font-extrabold text-[#1a2a0f]">
                  Earnings & Revenue Trends
                </span>
                <span className="text-[9px] font-bold bg-[#e8f5e0] text-[#3d6b1f] px-1.5 py-0.5 rounded-full">
                  Real-time
                </span>
              </div>
              <div className="flex bg-[#f5f6f2] rounded-[9px] p-0.5 gap-0.5">
                {["Weekly", "Monthly"].map((p, i) => (
                  <button
                    key={p}
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-[7px] border-none cursor-pointer transition-all ${
                      i === 0
                        ? "bg-white text-[#3d6b1f] shadow-sm"
                        : "bg-transparent text-[#9aa090]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-hidden">
              <div className="h-[200px] md:h-[290px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={earningsTrend}
                    margin={{ top: 5, right: 8, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="eg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={G} stopOpacity={0.18} />
                        <stop offset="95%" stopColor={G} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f0f2ec"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 600, fill: "#9aa090" }}
                      dy={6}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fontWeight: 600, fill: "#9aa090" }}
                      tickFormatter={(v) => `₹${v / 1000}k`}
                      width={40}
                      domain={[30000, "auto"]}
                    />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke={G}
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#eg)"
                      dot={false}
                      activeDot={{
                        r: 5,
                        fill: G,
                        stroke: "#fff",
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <p className="m-0 mb-2 text-[10px] font-bold text-[#9aa090] uppercase tracking-[0.5px]">
                    Therapy Split
                  </p>
                  <div className="h-[250px] md:h-[290px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                      >
                        <Pie
                          data={therapyRevenue}
                          cx="50%"
                          cy="50%"
                          innerRadius="38%"
                          outerRadius="60%"
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {therapyRevenue.map((_, i) => (
                            <Cell
                              key={i}
                              fill={PIE_COLORS[i]}
                              cornerRadius={3}
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip formatter={(v, n) => [`${v}%`, n]} />
                        <Legend
                          iconType="circle"
                          iconSize={7}
                          wrapperStyle={{ fontSize: 9, fontWeight: 700 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="m-0 mb-2 text-[10px] font-bold text-[#9aa090] uppercase tracking-[0.5px]">
                    Clinic Revenue
                  </p>
                  <div className="h-[200px] md:h-[290px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={categoryRevenue}
                        margin={{ top: 0, right: 4, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#f0f2ec"
                        />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 8,
                            fontWeight: 600,
                            fill: "#9aa090",
                          }}
                          dy={4}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fontSize: 8,
                            fontWeight: 600,
                            fill: "#9aa090",
                          }}
                          tickFormatter={(v) => `${v / 1000}k`}
                          width={28}
                        />
                        <RechartsTooltip content={<CustomTooltip />} />
                        <Bar
                          dataKey="revenue"
                          radius={[5, 5, 0, 0]}
                          maxBarSize={22}
                        >
                          {categoryRevenue.map((_, i) => (
                            <Cell
                              key={i}
                              fill={i % 2 === 0 ? G : G2}
                              opacity={0.88}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="staff-assignments"
          className="bg-white rounded-[18px] border border-[#eef0ea] overflow-hidden mb-5"
        >
          <div className="px-5 py-4 border-b border-[#f5f6f2] flex items-center justify-between flex-wrap gap-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#ede7f6] text-[#4527a0] flex items-center justify-center">
                <Assignment sx={{ fontSize: 15 }} />
              </div>
              <span className="text-[13px] font-extrabold text-[#1a2a0f]">
                Doctor Assignments & Capacity
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-[#f5f6f2] rounded-[10px] px-2.5 py-1.5">
                <Search sx={{ fontSize: 14, color: "#9aa090" }} />
                <input
                  placeholder="Search by doctor..."
                  value={searchDoc}
                  onChange={(e) => setSearchDoc(e.target.value)}
                  className="border-none bg-transparent outline-none text-[11px] font-semibold text-[#3a4a30] w-[140px]"
                />
              </div>
              <select
                value={clinicFilter}
                onChange={(e) => setClinicFilter(e.target.value)}
                className="bg-[#f5f6f2] border-none rounded-[10px] px-2.5 py-2 text-[11px] font-bold text-[#3a4a30] outline-none cursor-pointer"
              >
                <option value="All">All Clinics</option>
                {Array.from(
                  new Set(doctorAssignments.map((d) => d.clinic)),
                ).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#fafbf8]">
                  {[
                    "Doctor",
                    "Therapies",
                    "Clinic",
                    "Bookings",
                    "Upcoming",
                    "Completed",
                    "Status",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3.5 py-2.5 text-left text-[9px] font-extrabold text-[#9aa090] uppercase tracking-[0.5px] whitespace-nowrap border-b border-[#f0f2ec]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-[#f5f6f2] hover:bg-[#fafbf8] transition-colors duration-150"
                  >
                    <td className="px-3.5 py-[11px]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-[30px] h-[30px] rounded-full bg-[#e8f5e0] text-[#3d6b1f] flex items-center justify-center text-[11px] font-black flex-shrink-0">
                          {doc.name.charAt(4)}
                        </div>
                        <div>
                          <div className="text-[12px] font-extrabold text-[#1a2a0f] whitespace-nowrap">
                            {doc.name}
                          </div>
                          <div className="text-[9px] text-[#9aa090] font-medium">
                            {doc.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3.5 py-[11px]">
                      <div className="flex flex-wrap gap-1">
                        {doc.therapies.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] font-bold bg-[#e8f5e0] text-[#3d6b1f] px-1.5 py-0.5 rounded-[5px]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3.5 py-[11px] text-[11px] font-bold text-[#3a4a30] whitespace-nowrap">
                      {doc.clinic}
                    </td>
                    <td className="px-3.5 py-[11px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-[50px] h-[5px] bg-[#eef0ea] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#3d6b1f] rounded-full"
                            style={{ width: `${(doc.bookings / 20) * 100}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-extrabold text-[#3d6b1f]">
                          {doc.bookings}/20
                        </span>
                      </div>
                    </td>
                    <td className="px-3.5 py-[11px]">
                      <span
                        className={`text-[12px] font-extrabold ${
                          doc.upcoming > 3 ? "text-[#e65100]" : "text-[#3d6b1f]"
                        }`}
                      >
                        {doc.upcoming}
                      </span>
                    </td>
                    <td className="px-3.5 py-[11px] text-[11px] font-bold text-[#9aa090]">
                      {doc.completed}
                    </td>
                    <td className="px-3.5 py-[11px]">
                      <span
                        className="text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase"
                        style={{
                          background: statusColor(doc.status).bg,
                          color: statusColor(doc.status).fg,
                        }}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-3.5 py-[11px]">
                      <button
                        onClick={() => handleDetailClick(doc, "doctor")}
                        className="w-7 h-7 border border-[#e8ede4] rounded-lg bg-white cursor-pointer flex items-center justify-center text-[#3d6b1f] hover:bg-[#f7faf4] transition-colors"
                      >
                        <Visibility sx={{ fontSize: 14 }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          id="live-procedures"
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5"
        >
          <div className="bg-white rounded-[18px] border border-[#eef0ea] p-[18px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#e3f2fd] text-[#1565c0] flex items-center justify-center">
                  <Timeline sx={{ fontSize: 15 }} />
                </div>
                <span className="text-[13px] font-extrabold text-[#1a2a0f]">
                  Live Booking Lifecycle
                </span>
              </div>
              <button
                onClick={() => handleDetailClick({ label: "All" }, "list")}
                className="flex items-center gap-1 bg-transparent border-none text-[10px] font-extrabold text-[#3d6b1f] cursor-pointer uppercase"
              >
                MANAGE ALL <ArrowForward sx={{ fontSize: 11 }} />
              </button>
            </div>
            <div className="flex flex-col gap-2.5">
              {bookingTracking.map((b) => (
                <div
                  key={b.id}
                  onClick={() => handleDetailClick(b, "booking")}
                  className="p-3 border border-[#f0f2ec] rounded-[13px] cursor-pointer hover:bg-[#fafbf8] hover:border-[#d4e8c4] transition-all duration-150"
                >
                  <div className="flex justify-between items-start mb-2.5">
                    <div>
                      <div className="text-[12px] font-extrabold text-[#1a2a0f]">
                        {b.patient}
                      </div>
                      <div className="text-[9px] font-bold text-[#9aa090] mt-0.5 uppercase">
                        {b.therapy} · {b.doctor}
                      </div>
                    </div>
                    <span
                      className="text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase whitespace-nowrap"
                      style={{
                        background: bookingStatusColor(b.status).bg,
                        color: bookingStatusColor(b.status).fg,
                      }}
                    >
                      {b.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-[5px] bg-[#f0f2ec] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${b.progress}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{
                          background:
                            b.progress === 100
                              ? G
                              : b.progress === 0
                                ? "#e0e0e0"
                                : G2,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-extrabold text-[#9aa090] min-w-[28px] text-right">
                      {b.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[18px] border border-[#eef0ea] p-[18px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#fff3e0] text-[#e65100] flex items-center justify-center">
                  <Hotel sx={{ fontSize: 15 }} />
                </div>
                <span className="text-[13px] font-extrabold text-[#1a2a0f]">
                  Upcoming Stays & Check-ins
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5a9e2f] inline-block pulse-dot" />
                <span className="text-[9px] font-extrabold text-[#3d6b1f] uppercase">
                  3 Arriving
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 flex-1">
              {checkInsData.map((c) => (
                <div
                  key={c.id}
                  onClick={() => handleDetailClick(c, "checkin")}
                  className="flex gap-3 p-3 border border-[#f0f2ec] rounded-[13px] cursor-pointer hover:bg-[#fafbf8] hover:border-[#d4e8c4] transition-all duration-150"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                    style={{
                      background: c.type === "Stay" ? "#fff3e0" : "#e8f5e0",
                      color: c.type === "Stay" ? "#e65100" : G,
                    }}
                  >
                    {c.type === "Stay" ? (
                      <Hotel sx={{ fontSize: 17 }} />
                    ) : (
                      <MedicalServices sx={{ fontSize: 17 }} />
                    )}
                    <span className="text-[7px] font-extrabold mt-0.5">
                      {c.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="text-[12px] font-extrabold text-[#1a2a0f] truncate max-w-[60%]">
                        {c.patient}
                      </div>
                      <span className="text-[9px] font-bold bg-[#e8f5e0] text-[#3d6b1f] px-1.5 py-0.5 rounded-full">
                        {c.room}
                      </span>
                    </div>
                    <div className="text-[9px] font-bold text-[#9aa090] mt-0.5 uppercase">
                      {c.therapy} · {c.doctor}
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      <span className="text-[9px] font-bold bg-[#f5f6f2] text-[#5a6652] px-1.5 py-0.5 rounded-[7px]">
                        🕐 {c.time}
                      </span>
                      <span className="text-[9px] font-bold bg-[#e8f5e0] text-[#3d6b1f] px-1.5 py-0.5 rounded-[7px]">
                        {c.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3.5 w-full py-2.5 border-2 border-dashed border-[#e8ede4] rounded-[13px] bg-transparent text-[10px] font-bold text-[#9aa090] cursor-pointer uppercase tracking-[0.5px] hover:border-[#3d6b1f] hover:text-[#3d6b1f] hover:bg-[#f7faf4] transition-all duration-150">
              View All Operational Logs →
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-[#1a2a0f] rounded-[18px] p-5 text-white relative overflow-hidden">
            <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full bg-[#5a9e2f]/20" />
            <p className="m-0 mb-3 text-[9px] font-extrabold text-white/35 uppercase tracking-widest">
              Network Growth
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[32px] font-black tracking-tight">
                  +14%
                </div>
                <div className="text-[11px] font-bold text-[#a3e635] mt-0.5">
                  Growth this quarter
                </div>
              </div>
              <TrendingUp
                sx={{ fontSize: 38, color: "#a3e635", opacity: 0.8 }}
              />
            </div>
            <button className="mt-4 text-[10px] font-extrabold bg-white/10 border border-white/10 text-white px-3.5 py-1.5 rounded-[10px] cursor-pointer uppercase tracking-[0.5px] hover:bg-white/20 transition-colors">
              View Full Report
            </button>
          </div>
          {[
            {
              label: "Cumulative Patients",
              val: "12,482",
              sub: "Life-to-date",
            },
            {
              label: "Avg. Ticket Size",
              val: "₹18,400",
              sub: "Per transaction",
            },
            { label: "Store Revenue", val: "₹18.2L", sub: "This month" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-[18px] border border-[#eef0ea] p-5"
            >
              <div className="text-[9px] font-extrabold text-[#9aa090] uppercase tracking-[0.5px] mb-2.5">
                {s.label}
              </div>
              <div className="text-[26px] font-black text-[#1a2a0f] tracking-tight">
                {s.val}
              </div>
              <div className="text-[10px] font-semibold text-[#9aa090] mt-1">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </main>

      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isDrawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] z-50 shadow-2xl transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedDetail && (
          <div className="h-full flex flex-col bg-[#fafbf8]">
            <div className="px-5 py-[18px] border-b border-[#eef0ea] flex items-center justify-between bg-white">
              <div>
                <p className="m-0 text-[9px] font-extrabold text-[#9aa090] uppercase tracking-[0.5px]">
                  {selectedDetail.dataType} details
                </p>
                <h2 className="m-0 mt-0.5 text-[17px] font-black text-[#1a2a0f]">
                  {selectedDetail.name ||
                    selectedDetail.title ||
                    selectedDetail.patient ||
                    "Details"}
                </h2>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-[10px] border border-[#eef0ea] bg-white cursor-pointer flex items-center justify-center text-[#666] hover:bg-[#f5f5f5] transition-colors"
              >
                <Close sx={{ fontSize: 16 }} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="bg-white rounded-2xl p-4 mb-3.5 border border-[#eef0ea] flex items-center gap-3.5">
                <div className="w-[52px] h-[52px] rounded-full bg-[#3d6b1f] text-white flex items-center justify-center text-[20px] font-black flex-shrink-0">
                  {(
                    selectedDetail.name ||
                    selectedDetail.patient ||
                    "S"
                  ).charAt(0)}
                </div>
                <div>
                  <div className="text-[15px] font-black text-[#1a2a0f]">
                    {selectedDetail.name ||
                      selectedDetail.patient ||
                      selectedDetail.label}
                  </div>
                  <div className="text-[10px] text-[#9aa090] font-semibold mt-0.5">
                    #{selectedDetail.id || "SYS-7711"}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                {[
                  {
                    label: "Category",
                    val:
                      selectedDetail.therapy ||
                      selectedDetail.dataType ||
                      "General",
                  },
                  { label: "Priority", val: "HIGH", highlight: true },
                  { label: "Status", val: selectedDetail.status || "Active" },
                  {
                    label:
                      selectedDetail.dataType === "doctor"
                        ? "Contact"
                        : "Time/Date",
                    val:
                      selectedDetail.phone ||
                      selectedDetail.time ||
                      selectedDetail.date ||
                      "—",
                  },
                ].map((f) => (
                  <div
                    key={f.label}
                    className="bg-white border border-[#eef0ea] rounded-xl p-3"
                  >
                    <div className="text-[9px] font-extrabold text-[#9aa090] uppercase tracking-[0.5px] mb-1">
                      {f.label}
                    </div>
                    <div
                      className={`text-[12px] font-extrabold ${
                        f.highlight ? "text-[#3d6b1f]" : "text-[#3a4a30]"
                      }`}
                    >
                      {f.val}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl p-4 mb-3.5 border border-[#eef0ea]">
                <div className="text-[10px] font-extrabold text-[#1a2a0f] uppercase mb-2">
                  Actionable Context
                </div>
                <div className="text-[11px] text-[#6a7560] leading-relaxed">
                  {selectedDetail.dataType === "booking" &&
                    `This booking for ${selectedDetail.patient} is currently at ${selectedDetail.progress}% completion. Monitor the associated staff for timely delivery.`}
                  {selectedDetail.dataType === "doctor" &&
                    `Assigned to ${selectedDetail.clinic}. Expertise includes ${selectedDetail.therapies?.join(", ")}. Currently maintaining efficient capacity.`}
                  {selectedDetail.dataType === "checkin" &&
                    `Check-in scheduled for ${selectedDetail.time} with a duration of ${selectedDetail.duration}. Room ${selectedDetail.room} is prepared.`}
                  {selectedDetail.dataType === "stat" &&
                    `Real-time metric reflecting ${selectedDetail.title}. Trend analysis indicates a ${selectedDetail.trend} shift compared to historical data.`}
                </div>
              </div>
              <div className="bg-white border border-[#eef0ea] rounded-2xl p-3.5 mb-3.5">
                <div className="text-[10px] font-extrabold text-[#1a2a0f] uppercase tracking-[0.5px] mb-2.5">
                  System Synchronization
                </div>
                <div className="h-[120px] flex items-center justify-center bg-[#f5f6f2] rounded-xl border border-dashed border-[#e0e5da]">
                  <span className="text-[10px] text-[#b0bba5] font-semibold">
                    Fetching audit logs from {selectedDetail.dataType} module...
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-[#b0bba5] italic leading-relaxed">
                Data source: swagrama-react/{selectedDetail.dataType}
              </p>
            </div>
            <div className="px-5 py-4 border-t border-[#eef0ea] bg-white flex flex-col gap-2">
              <button className="w-full py-3 rounded-xl border-none bg-[#3d6b1f] text-white text-[11px] font-extrabold cursor-pointer uppercase tracking-[0.5px] hover:bg-[#2d5015] transition-colors">
                Execute Module Action
              </button>
              <button className="w-full py-2.5 rounded-xl border border-[#eef0ea] bg-white text-[#9aa090] text-[11px] font-bold cursor-pointer uppercase tracking-[0.5px] hover:bg-[#fafbf8] transition-colors">
                View Full Timeline
              </button>
            </div>
          </div>
        )}
      </div>

  
    </div>
  );
};

export default SuperAdminDashboard;
