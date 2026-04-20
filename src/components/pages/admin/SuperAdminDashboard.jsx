import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  MenuItem,
  Select,
  FormControl,
  Drawer,
  Button,
} from "@mui/material";
import {
  TrendingUp,
  AccountBalanceWallet,
  People,
  MedicalServices,
  LocalHospital,
  Search,
  FilterList,
  Assignment,
  CalendarMonth,
  Hotel,
  Timeline,
  MoreVert,
  ArrowForward,
  Close,
  Download,
  Visibility,
} from "@mui/icons-material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const G = "#3d6b1f";
const G2 = "#5a9e2f";
const G3 = "#e8f5e0";

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
      <div
        style={{
          background: "#fff",
          border: "1px solid #e8f5e0",
          borderRadius: 12,
          padding: "8px 14px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        }}
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#9e9e9e",
            marginBottom: 2,
          }}
        >
          {label}
        </p>
        <p style={{ fontSize: 13, fontWeight: 800, color: G }}>
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
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

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
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f8f5",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <main
        style={{ maxWidth: 1600, margin: "0 auto", padding: "20px 16px 40px" }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            paddingBottom: 20,
            borderBottom: "1px solid #e8ede4",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(20px, 3vw, 28px)",
                fontWeight: 900,
                color: "#1a2a0f",
                letterSpacing: "-0.5px",
              }}
            >
              Super Admin <span style={{ color: G }}>Dashboard</span>
            </h1>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: 12,
                color: "#8a9580",
                fontWeight: 500,
              }}
            >
              Global ecosystem monitoring & financial analytics
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{ textAlign: "right", display: "none" }}
              className="sm-show"
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#b0bba5",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#3a4a30",
                }}
              >
                System Administrator <span style={{ color: G2 }}>• Live</span>
              </p>
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: G,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 900,
              }}
            >
              SA
            </div>
            <button
              style={{
                width: 36,
                height: 36,
                border: "1px solid #e0e8d8",
                borderRadius: 10,
                background: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666",
              }}
            >
              <Download sx={{ fontSize: 17 }} />
            </button>
          </div>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {KPIData.map((kpi, i) => (
            <motion.div
              key={kpi.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              onClick={() => handleDetailClick(kpi, "stat")}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "14px 16px",
                border: "1px solid #eef0ea",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -16,
                  right: -16,
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: kpi.bg,
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    background: kpi.bg,
                    color: kpi.fg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {kpi.icon}
                </div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#9aa090",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {kpi.title}
                </span>
              </div>
              <div
                style={{
                  fontSize: "clamp(18px, 2.5vw, 22px)",
                  fontWeight: 900,
                  color: "#1a2a0f",
                  letterSpacing: "-0.5px",
                  lineHeight: 1,
                }}
              >
                {kpi.value}
              </div>
              <div
                style={{
                  marginTop: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    padding: "2px 6px",
                    borderRadius: 5,
                    background: kpi.trend.startsWith("+")
                      ? "#e8f5e0"
                      : "#f5f5f5",
                    color: kpi.trend.startsWith("+") ? G : "#9e9e9e",
                  }}
                >
                  {kpi.trend}
                </span>
                <span
                  style={{ fontSize: 9, color: "#b0bba5", fontWeight: 500 }}
                >
                  {kpi.sub}
                </span>
              </div>
            </motion.div>
          ))}
        </section>

        <section style={{ marginBottom: 20 }}>
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              border: "1px solid #eef0ea",
              padding: "18px 20px",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: "#e8f5e0",
                    color: G,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AccountBalanceWallet sx={{ fontSize: 15 }} />
                </div>
                <span
                  style={{ fontSize: 13, fontWeight: 800, color: "#1a2a0f" }}
                >
                  Earnings & Revenue Trends
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    background: "#e8f5e0",
                    color: G,
                    padding: "2px 7px",
                    borderRadius: 20,
                  }}
                >
                  Real-time
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  background: "#f5f6f2",
                  borderRadius: 9,
                  padding: 3,
                  gap: 2,
                }}
              >
                {["Weekly", "Monthly"].map((p, i) => (
                  <button
                    key={p}
                    style={{
                      padding: "4px 10px",
                      fontSize: 10,
                      fontWeight: 700,
                      borderRadius: 7,
                      border: "none",
                      cursor: "pointer",
                      background: i === 0 ? "#fff" : "transparent",
                      color: i === 0 ? G : "#9aa090",
                      boxShadow:
                        i === 0 ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 16,
              }}
            >
              <div style={{ minHeight: 220 }}>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart
                    data={earningsTrend}
                    margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
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
                      width={42}
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
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <div style={{ minHeight: 220 }}>
                  <p
                    style={{
                      margin: "0 0 8px",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#9aa090",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Therapy Split
                  </p>
                  <ResponsiveContainer width="100%" height={190}>
                    <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <Pie
                        data={therapyRevenue}
                        cx="50%"
                        cy="45%"
                        innerRadius="45%"
                        outerRadius="70%"
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {therapyRevenue.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i]} cornerRadius={3} />
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
                <div style={{ minHeight: 220 }}>
                  <p
                    style={{
                      margin: "0 0 8px",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#9aa090",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Clinic Revenue
                  </p>
                  <ResponsiveContainer width="100%" height={190}>
                    <BarChart
                      data={categoryRevenue}
                      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
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
                        tick={{ fontSize: 9, fontWeight: 600, fill: "#9aa090" }}
                        dy={4}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 9, fontWeight: 600, fill: "#9aa090" }}
                        tickFormatter={(v) => `${v / 1000}k`}
                        width={30}
                      />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="revenue"
                        radius={[5, 5, 0, 0]}
                        maxBarSize={24}
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
        </section>

        <section
          style={{
            background: "#fff",
            borderRadius: 18,
            border: "1px solid #eef0ea",
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #f5f6f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "#ede7f6",
                  color: "#4527a0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Assignment sx={{ fontSize: 15 }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#1a2a0f" }}>
                Doctor Assignments & Capacity
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#f5f6f2",
                  borderRadius: 10,
                  padding: "6px 10px",
                }}
              >
                <Search sx={{ fontSize: 14, color: "#9aa090" }} />
                <input
                  placeholder="Search by doctor..."
                  value={searchDoc}
                  onChange={(e) => setSearchDoc(e.target.value)}
                  style={{
                    border: "none",
                    background: "transparent",
                    outline: "none",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#3a4a30",
                    width: 140,
                  }}
                />
              </div>
              <select
                value={clinicFilter}
                onChange={(e) => setClinicFilter(e.target.value)}
                style={{
                  background: "#f5f6f2",
                  border: "none",
                  borderRadius: 10,
                  padding: "7px 10px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#3a4a30",
                  outline: "none",
                  cursor: "pointer",
                }}
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
          <div style={{ overflowX: "auto", width: "100%" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: 700,
              }}
            >
              <thead>
                <tr style={{ background: "#fafbf8" }}>
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
                      style={{
                        padding: "10px 14px",
                        textAlign: "left",
                        fontSize: 9,
                        fontWeight: 800,
                        color: "#9aa090",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #f0f2ec",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doc, i) => (
                  <tr
                    key={doc.id}
                    style={{
                      borderBottom: "1px solid #f5f6f2",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#fafbf8")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={{ padding: "11px 14px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 9,
                        }}
                      >
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: G3,
                            color: G,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 900,
                            flexShrink: 0,
                          }}
                        >
                          {doc.name.charAt(4)}
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 800,
                              color: "#1a2a0f",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {doc.name}
                          </div>
                          <div
                            style={{
                              fontSize: 9,
                              color: "#9aa090",
                              fontWeight: 500,
                            }}
                          >
                            {doc.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "11px 14px" }}>
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 4 }}
                      >
                        {doc.therapies.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              background: G3,
                              color: G,
                              padding: "2px 7px",
                              borderRadius: 5,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "11px 14px",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#3a4a30",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {doc.clinic}
                    </td>
                    <td style={{ padding: "11px 14px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <div
                          style={{
                            width: 50,
                            height: 5,
                            background: "#eef0ea",
                            borderRadius: 99,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${(doc.bookings / 20) * 100}%`,
                              height: "100%",
                              background: G,
                              borderRadius: 99,
                            }}
                          />
                        </div>
                        <span
                          style={{ fontSize: 11, fontWeight: 800, color: G }}
                        >
                          {doc.bookings}/20
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "11px 14px" }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: doc.upcoming > 3 ? "#e65100" : "#3d6b1f",
                        }}
                      >
                        {doc.upcoming}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "11px 14px",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#9aa090",
                      }}
                    >
                      {doc.completed}
                    </td>
                    <td style={{ padding: "11px 14px" }}>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 800,
                          padding: "3px 8px",
                          borderRadius: 20,
                          background: statusColor(doc.status).bg,
                          color: statusColor(doc.status).fg,
                          textTransform: "uppercase",
                        }}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td style={{ padding: "11px 14px" }}>
                      <button
                        onClick={() => handleDetailClick(doc, "doctor")}
                        style={{
                          width: 28,
                          height: 28,
                          border: "1px solid #e8ede4",
                          borderRadius: 8,
                          background: "#fff",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: G,
                        }}
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
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              border: "1px solid #eef0ea",
              padding: "18px 20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: "#e3f2fd",
                    color: "#1565c0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Timeline sx={{ fontSize: 15 }} />
                </div>
                <span
                  style={{ fontSize: 13, fontWeight: 800, color: "#1a2a0f" }}
                >
                  Live Booking Lifecycle
                </span>
              </div>
              <button
                onClick={() => handleDetailClick({ label: "All" }, "list")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  background: "none",
                  border: "none",
                  fontSize: 10,
                  fontWeight: 800,
                  color: G,
                  cursor: "pointer",
                }}
              >
                MANAGE ALL <ArrowForward sx={{ fontSize: 11 }} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {bookingTracking.map((b) => (
                <div
                  key={b.id}
                  onClick={() => handleDetailClick(b, "booking")}
                  style={{
                    padding: "12px 14px",
                    border: "1px solid #f0f2ec",
                    borderRadius: 13,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#fafbf8";
                    e.currentTarget.style.borderColor = "#d4e8c4";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.borderColor = "#f0f2ec";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 10,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: "#1a2a0f",
                        }}
                      >
                        {b.patient}
                      </div>
                      <div
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: "#9aa090",
                          marginTop: 2,
                          textTransform: "uppercase",
                        }}
                      >
                        {b.therapy} · {b.doctor}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 800,
                        padding: "3px 8px",
                        borderRadius: 20,
                        background: bookingStatusColor(b.status).bg,
                        color: bookingStatusColor(b.status).fg,
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {b.status}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 5,
                        background: "#f0f2ec",
                        borderRadius: 99,
                        overflow: "hidden",
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${b.progress}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                          height: "100%",
                          borderRadius: 99,
                          background:
                            b.progress === 100
                              ? G
                              : b.progress === 0
                                ? "#e0e0e0"
                                : G2,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: "#9aa090",
                        minWidth: 28,
                        textAlign: "right",
                      }}
                    >
                      {b.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              border: "1px solid #eef0ea",
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: "#fff3e0",
                    color: "#e65100",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Hotel sx={{ fontSize: 15 }} />
                </div>
                <span
                  style={{ fontSize: 13, fontWeight: 800, color: "#1a2a0f" }}
                >
                  Upcoming Stays & Check-ins
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: G2,
                    display: "inline-block",
                    animation: "pulse 1.5s infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    color: G,
                    textTransform: "uppercase",
                  }}
                >
                  3 Arriving
                </span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                flex: 1,
              }}
            >
              {checkInsData.map((c) => (
                <div
                  key={c.id}
                  onClick={() => handleDetailClick(c, "checkin")}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "12px 14px",
                    border: "1px solid #f0f2ec",
                    borderRadius: 13,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#fafbf8";
                    e.currentTarget.style.borderColor = "#d4e8c4";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.borderColor = "#f0f2ec";
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: c.type === "Stay" ? "#fff3e0" : "#e8f5e0",
                      color: c.type === "Stay" ? "#e65100" : G,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {c.type === "Stay" ? (
                      <Hotel sx={{ fontSize: 17 }} />
                    ) : (
                      <MedicalServices sx={{ fontSize: 17 }} />
                    )}
                    <span
                      style={{ fontSize: 7, fontWeight: 800, marginTop: 1 }}
                    >
                      {c.type.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: "#1a2a0f",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "60%",
                        }}
                      >
                        {c.patient}
                      </div>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          background: "#e8f5e0",
                          color: G,
                          padding: "2px 7px",
                          borderRadius: 20,
                        }}
                      >
                        {c.room}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#9aa090",
                        marginTop: 2,
                        textTransform: "uppercase",
                      }}
                    >
                      {c.therapy} · {c.doctor}
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          background: "#f5f6f2",
                          color: "#5a6652",
                          padding: "3px 7px",
                          borderRadius: 7,
                        }}
                      >
                        🕐 {c.time}
                      </span>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          background: "#e8f5e0",
                          color: G,
                          padding: "3px 7px",
                          borderRadius: 7,
                        }}
                      >
                        {c.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              style={{
                marginTop: 14,
                width: "100%",
                padding: "10px",
                border: "2px dashed #e8ede4",
                borderRadius: 13,
                background: "transparent",
                fontSize: 10,
                fontWeight: 700,
                color: "#9aa090",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = G;
                e.currentTarget.style.color = G;
                e.currentTarget.style.background = "#f7faf4";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e8ede4";
                e.currentTarget.style.color = "#9aa090";
                e.currentTarget.style.background = "transparent";
              }}
            >
              View All Operational Logs →
            </button>
          </div>
        </section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 12,
          }}
        >
          <div
            style={{
              background: "#1a2a0f",
              borderRadius: 18,
              padding: "20px 22px",
              color: "#fff",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: -20,
                right: -20,
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(90,158,47,0.2)",
              }}
            />
            <p
              style={{
                margin: "0 0 12px",
                fontSize: 9,
                fontWeight: 800,
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Network Growth
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    letterSpacing: "-1px",
                  }}
                >
                  +14%
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#a3e635",
                    marginTop: 3,
                  }}
                >
                  Growth this quarter
                </div>
              </div>
              <TrendingUp
                sx={{ fontSize: 38, color: "#a3e635", opacity: 0.8 }}
              />
            </div>
            <button
              style={{
                marginTop: 16,
                fontSize: 10,
                fontWeight: 800,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                padding: "7px 14px",
                borderRadius: 10,
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
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
            {
              label: "Store Revenue",
              val: "₹18.2L",
              sub: "This month",
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "#fff",
                borderRadius: 18,
                border: "1px solid #eef0ea",
                padding: "20px 22px",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  color: "#9aa090",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                  marginBottom: 10,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#1a2a0f",
                  letterSpacing: "-0.5px",
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#9aa090",
                  marginTop: 4,
                }}
              >
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 400 },
            borderLeft: "none",
            boxShadow: "-8px 0 32px rgba(0,0,0,0.06)",
          },
        }}
      >
        {selectedDetail && (
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              background: "#fafbf8",
            }}
          >
            <div
              style={{
                padding: "18px 20px",
                borderBottom: "1px solid #eef0ea",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#fff",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 9,
                    fontWeight: 800,
                    color: "#9aa090",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {selectedDetail.dataType} details
                </p>
                <h2
                  style={{
                    margin: "3px 0 0",
                    fontSize: 17,
                    fontWeight: 900,
                    color: "#1a2a0f",
                  }}
                >
                  {selectedDetail.name ||
                    selectedDetail.title ||
                    selectedDetail.patient ||
                    "Details"}
                </h2>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  border: "1px solid #eef0ea",
                  background: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                }}
              >
                <Close sx={{ fontSize: 16 }} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "16px",
                  marginBottom: 14,
                  border: "1px solid #eef0ea",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: G,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  {(
                    selectedDetail.name ||
                    selectedDetail.patient ||
                    "S"
                  ).charAt(0)}
                </div>
                <div>
                  <div
                    style={{ fontSize: 15, fontWeight: 900, color: "#1a2a0f" }}
                  >
                    {selectedDetail.name ||
                      selectedDetail.patient ||
                      selectedDetail.label}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#9aa090",
                      fontWeight: 600,
                      marginTop: 2,
                    }}
                  >
                    #{selectedDetail.id || "SYS-7711"}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                {[
                  {
                    label: "Category",
                    val: selectedDetail.therapy || selectedDetail.dataType || "General",
                  },
                  { label: "Priority", val: "HIGH", highlight: true },
                  { label: "Status", val: selectedDetail.status || "Active" },
                  { 
                    label: selectedDetail.dataType === 'doctor' ? "Contact" : "Time/Date", 
                    val: selectedDetail.phone || selectedDetail.time || selectedDetail.date || "—" 
                  },
                ].map((f) => (
                  <div
                    key={f.label}
                    style={{
                      background: "#fff",
                      border: "1px solid #eef0ea",
                      borderRadius: 12,
                      padding: "12px 14px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 800,
                        color: "#9aa090",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        marginBottom: 4,
                      }}
                    >
                      {f.label}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: f.highlight ? G : "#3a4a30",
                      }}
                    >
                      {f.val}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Detailed Context Based on Type */}
              <div
                style={{
                   background: "#fff",
                   borderRadius: 16,
                   padding: "16px",
                   marginBottom: 14,
                   border: "1px solid #eef0ea",
                }}
              >
                 <div style={{ fontSize: 10, fontWeight: 800, color: "#1a2a0f", textTransform: 'uppercase', marginBottom: 8 }}>
                    Actionable Context
                 </div>
                 <div style={{ fontSize: 11, color: "#6a7560", lineHeight: 1.6 }}>
                    {selectedDetail.dataType === 'booking' && `This booking for ${selectedDetail.patient} is currently at ${selectedDetail.progress}% completion. Monitor the associated staff for timely delivery.`}
                    {selectedDetail.dataType === 'doctor' && `Assigned to ${selectedDetail.clinic}. Expertise includes ${selectedDetail.therapies?.join(', ')}. Currently maintaining efficient capacity.`}
                    {selectedDetail.dataType === 'checkin' && `Check-in scheduled for ${selectedDetail.time} with a duration of ${selectedDetail.duration}. Room ${selectedDetail.room} is prepared.`}
                    {selectedDetail.dataType === 'stat' && `Real-time metric reflecting ${selectedDetail.title}. Trend analysis indicates a ${selectedDetail.trend} shift compared to historical data.`}
                 </div>
              </div>

              <div
                style={{
                  background: "#fff",
                  border: "1px solid #eef0ea",
                  borderRadius: 16,
                  padding: "14px",
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: "#1a2a0f",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    marginBottom: 10,
                  }}
                >
                  System Synchronization
                </div>
                <div
                  style={{
                    height: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f5f6f2",
                    borderRadius: 12,
                    border: "1px dashed #e0e5da",
                  }}
                >
                  <span
                    style={{ fontSize: 10, color: "#b0bba5", fontWeight: 600 }}
                  >
                    Fetching audit logs from {selectedDetail.dataType} module...
                  </span>
                </div>
              </div>
              <p
                style={{
                  fontSize: 10,
                  color: "#b0bba5",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                }}
              >
                Data source: swagrama-react/{selectedDetail.dataType}
              </p>
            </div>
            <div
              style={{
                padding: "16px 20px",
                borderTop: "1px solid #eef0ea",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 12,
                  border: "none",
                  background: G,
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 800,
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Execute Module Action
              </button>
              <button
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: 12,
                  border: "1px solid #eef0ea",
                  background: "#fff",
                  color: "#9aa090",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                View Full Timeline
              </button>
            </div>
          </div>
        )}
      </Drawer>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        * { box-sizing: border-box; }
        @media (min-width: 640px) { .sm-show { display: block !important; } }
      `}</style>
    </div>
  );
};

export default SuperAdminDashboard;
