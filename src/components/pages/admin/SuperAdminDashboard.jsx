import {
  AccountBalanceWallet,
  Assignment,
  CalendarMonth,
  Close,
  Hotel,
  MedicalServices,
  People,
  Search,
  Timeline
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
import {
  GetClinicRevenue,
  GetDashboardCount,
  GetDoctorDashboard,
  GetRevenueTrends,
  GetTherapySplit,
  GetUpcomingStays
} from "../../../services/adminDashboard/AdminDashboardServices";
import EarningIcon from "../../assets/dashboard/EarningIcon.svg"
import TotalMoney from "../../assets/dashboard/TotalMoney.svg"
import ShopOrderIcon from "../../assets/dashboard/ShopOrderIcon.svg"
import DoctorsIcon from "../../assets/dashboard/DoctorsIcon.svg"




const G = "#3d6b1f";
const G2 = "#5a9e2f";


const categoryRevenue = [
  { name: "OPD/Clinic", revenue: 0 },
  { name: "Hospital/Stay", revenue: 0 },
  { name: "E-Shop", revenue: 0 },
  { name: "Wellness", revenue: 0 },
  { name: "Nature/Beauty", revenue: 0 },
];


const PIE_COLORS = ["#3d6b1f", "#5a9e2f", "#81c784", "#c8e6c9"];

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

const SuperAdminDashboard = ({ onNavigate }) => {
  const [searchDoc, setSearchDoc] = useState("");
  const [clinicFilter, setClinicFilter] = useState("All");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [upCommingStays, setUpCommingStays] = useState([]);
  const [docData, setDocData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [revenueTrends, setRevenueTrends] = useState([]);
  const [therapySplit, setTherapySplit] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [dashboardStats, setDashboardStats] = useState(null);

  const KPIData = [
    {
      id: "revenue",
      title: "Total Revenue",
      value: `₹${dashboardStats?.totalRevenue ?? 0}`,
      trend: "+0%",
      sub: "incl. Shop & Services",
      icon: <img src={TotalMoney} alt="Total Money" style={{height:"24px",width:"24px"}} />,
      bg: "#e8f5e0",
      fg: "#3d6b1f",
    },
    {
      id: "membership",
      title: "Memberships",
      value: `₹${dashboardStats?.membership ?? 0}`,
      trend: "0",
      sub: "Active members",
      icon: <People sx={{ fontSize: 18 }} />,
      bg: "#e3f2fd",
      fg: "#1565c0",
    },
    {
      id: "shop",
      title: "Store Orders",
      value: `₹${dashboardStats?.storeOrders ?? 0}`,
      trend: "0",
      sub: "pending fulfillment",
      icon: <img src={ShopOrderIcon} alt="Shop Order" style={{height:"20px",width:"20px"}} />,
      bg: "#fce4ec",
      fg: "#c62828",
    },
    {
      id: "stays",
      title: "Stay Revenue",
      value: `₹${dashboardStats?.stayOccupancy ?? 0}`,
      trend: "N/A",
      sub: "Hospitals & Detox",
      icon: <Hotel sx={{ fontSize: 18 }} />,
      bg: "#ede7f6",
      fg: "#4527a0",
    },
    {
      id: "consultations",
      title: "OPD Revenue",
      value: `₹${dashboardStats?.opd ?? 0}`,
      trend: "Live",
      sub: "consultations in prog",
      icon: <Timeline sx={{ fontSize: 18 }} />,
      bg: "#fff3e0",
      fg: "#e65100",
    },
  ];

  const filteredDoctors = (docData || []).filter(
    (doc) =>
      (doc.doctorName || "").toLowerCase().includes(searchDoc.toLowerCase()) &&
      (clinicFilter === "All" || (doc.clinic || "N/A") === clinicFilter),
  );

  const handleDetailClick = (item, type) => {
    setSelectedDetail({ ...item, dataType: type });
    setDrawerOpen(true);
  };
  console.log("revenueTrends", revenueTrends);

  useEffect(() => {
    GetUpcomingStays(5, {
      type: "confirm",
    })
      .then((res) => {
        console.log("res", res);
        if (res?.data?.data?.data?.length > 0) {
          setUpCommingStays(res?.data?.data?.data);
        }
      })
      .catch((err) => err);
  }, []);

  useEffect(() => {
    GetClinicRevenue(5, selectedPeriod)
      .then((res) => {
        if (res?.data?.data?.length > 0) {
          setRevenueData(res.data.data);
        }
      })
      .catch((err) => err);

    GetDoctorDashboard(5)
      .then((res) => {
        setDocData(res?.data?.data);
      })
      .catch((err) => err);

    GetRevenueTrends(5, selectedPeriod)
      .then((res) => {
        console.log("res", res);
        const modifiedData = res.data.data.map((list) => {
          return {
            ...list,
            name: list.label,
          };
        });
        setRevenueTrends(modifiedData);
      })
      .catch((err) => err);
    GetTherapySplit(5, selectedPeriod)
      .then((res) => {
        const rawData = res?.data?.data;
        const dataArray = Array.isArray(rawData)
          ? rawData
          : Array.isArray(rawData?.data)
            ? rawData.data
            : [];

        const modifiedData = dataArray.map((list) => ({
          ...list,
          name: list.therapyName || "Unknown",
          value: parseFloat(list.percentage) || 0,
        }));

        setTherapySplit(modifiedData);
      })
      .catch((err) => console.error("Error fetching therapy split:", err));

    GetDashboardCount(5, selectedPeriod)
      .then((res) => {
        console.log("Dashboard Count Response:", res);
        setDashboardStats(res?.data?.data);
      })
      .catch((err) => console.error("Error fetching dashboard count:", err));
  }, [selectedPeriod]);

  console.log("docData", docData);
  console.log("therapySplit", dashboardStats);

  return (
    <div className="h-full overflow-y-auto px-4 no-scrollbar">
      <style>{`
        *, body {  box-sizing: border-box; }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .pulse-dot { animation: pulse-dot 1.5s infinite; }
      `}</style>

      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full pt-5 pb-10"
      >
        <header className="flex items-center justify-between mb-6 pb-5 border-b border-[#e8ede4] flex-wrap gap-3">
          <div>
            <h1 className="m-0 text-[clamp(20px,3vw,28px)] font-black text-[#1a2a0f] tracking-tight">
              <span className="text-[#3d6b1f]">Dashboard</span>
            </h1>
            {/* <p className="mt-0.5 mb-0 text-xs text-[#8a9580] font-medium">
              Global ecosystem monitoring & financial analytics
            </p> */}
          </div>
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block text-right"></div>
            <div className="flex bg-[#f5f6f2] border border-[#3d6b1f] rounded-[9px] p-0.5 gap-0.5">
              {["weekly", "monthly", "yearly"].map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPeriod(p)}
                  className={`px-2.5 py-1 text-[14px] font-semibold rounded-[7px] border-none cursor-pointer transition-all ${
                    selectedPeriod === p
                      ? "bg-green-200 text-green-600 shadow-sm"
                      : "bg-transparent text-gray-600"
                  }`}
                >
                  {p}
                </button>
              ))}
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
          <div className="bg-white rounded border border-[#eef0ea] p-[18px]">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className=" flex items-center justify-center">
                  <img src={EarningIcon} alt="Earnings Icon" style={{ width: '24px', height: '24px' }} />
                </div>
                <span className="text-[13px] font-extrabold text-[#1a2a0f]">
                  Earnings & Revenue Trends
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-hidden">
              <div className="h-[200px] md:h-[290px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueTrends}
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
                  <div className="h-[250px] md:h-[290px] relative flex items-center justify-center">
                    {therapySplit.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart
                          key={`pie-${selectedPeriod}-${therapySplit.length}`}
                        >
                          <Pie
                            data={therapySplit}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                            minAngle={15}
                            isAnimationActive={true}
                          >
                            {therapySplit.map((entry, i) => (
                              <Cell
                                key={`cell-${i}`}
                                fill={PIE_COLORS[i % PIE_COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <RechartsTooltip />
                          <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconSize={8}
                            wrapperStyle={{ fontSize: "10px" }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-[#9aa090]">
                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                          No Data Available
                        </div>
                        <div className="text-[8px] mt-1 italic">
                          Try changing the time period
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="m-0 mb-2 text-[10px] font-bold text-[#9aa090] uppercase tracking-[0.5px]">
                    Clinic Revenue
                  </p>
                  <div className="h-[200px] md:h-[290px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={
                          (revenueData || []).length > 0
                            ? revenueData.map((r) => ({
                                name: r.category,
                                revenue: r.amount,
                              }))
                            : categoryRevenue
                        }
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
{console.log("filteredDoctors", filteredDoctors)}
        <section
          id="staff-assignments"
          className="bg-white rounded-[18px] border border-[#eef0ea] overflow-hidden mb-5"
        >
          <div className="px-5 py-4 border-b border-[#f5f6f2] flex items-center justify-between flex-wrap gap-2.5">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                <img
                  src={DoctorsIcon}
                  alt="Doctors"
                  width={24}
                  height={24}
                  style={{ fontSize: 15 }}
                />
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
                  new Set((docData || []).map((d) => d.clinic || "N/A")),
                ).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto w-full max-h-[400px] overflow-y-auto no-scrollbar">
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#fafbf8]">
                  {[
                    "Doctor",
                    "Bookings",
                    "Upcoming",
                    "Completed",
                    "Status",
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
                    key={doc.doctorId}
                    className="border-b border-[#f5f6f2] hover:bg-[#fafbf8] transition-colors duration-150"
                  >
                    <td className="px-3.5 py-[11px]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-[30px] h-[30px] rounded-full bg-[#e8f5e0] text-[#3d6b1f] flex items-center justify-center text-[11px] font-black flex-shrink-0">
                          {(doc.doctorName || "D")
                            .trim()
                            .replace(/^Dr\.\s*/i, "")
                            .charAt(0)}
                        </div>
                        <div>
                          <div className="text-[12px] font-extrabold text-[#1a2a0f] whitespace-nowrap">
                            {doc.doctorName}
                          </div>
                          <div className="text-[9px] text-[#9aa090] font-medium">
                            {doc.departmentName || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-3.5 py-[11px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-[50px] h-[5px] bg-[#eef0ea] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#3d6b1f] rounded-full"
                            style={{
                              width: `${((doc.bookedCount || 0) / 20) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-[11px] font-extrabold text-[#3d6b1f]">
                          {doc.bookedCount || 0}/20
                        </span>
                      </div>
                    </td>
                    <td className="px-3.5 py-[11px]">
                      <span
                        className={`text-[12px] font-extrabold ${
                          (doc.upcomingCount || 0) > 3
                            ? "text-[#e65100]"
                            : "text-[#3d6b1f]"
                        }`}
                      >
                        {doc.upcomingCount || 0}
                      </span>
                    </td>
                    <td className="px-3.5 py-[11px] text-[11px] font-bold text-[#9aa090]">
                      {doc.completedCount || 0}
                    </td>
                    <td className="px-3.5 py-[11px]">
                      <span
                        className="text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase"
                        style={{
                          background: statusColor(doc.availability).bg,
                          color: statusColor(doc.availability).fg,
                        }}
                      >
                        {doc.availability}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="live-procedures" className="grid gap-4 mb-5">
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
                  {upCommingStays?.length > 0 ? upCommingStays?.length : 0}
                  Arriving
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 flex-1">
              {upCommingStays?.length > 0 &&
                upCommingStays?.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => handleDetailClick(c, "checkin")}
                    className="flex gap-3 p-3 border border-[#f0f2ec] rounded-[13px] cursor-pointer hover:bg-[#fafbf8] hover:border-[#d4e8c4] transition-all duration-150"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                      style={{
                        background:
                          c.staytype === "Stay" ? "#fff3e0" : "#e8f5e0",
                        color: c.staytype === "Stay" ? "#e65100" : G,
                      }}
                    >
                      {c.staytype === "Stay" ? (
                        <Hotel sx={{ fontSize: 17 }} />
                      ) : (
                        <MedicalServices sx={{ fontSize: 17 }} />
                      )}
                      <span className="text-[7px] font-extrabold mt-0.5">
                        {c.staytype?.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="text-[12px] font-extrabold text-[#1a2a0f] truncate max-w-[60%] flex space-x-5">
                          <span>{c.fullName || c.customer}</span>
                        </div>
                        <span className="flex space-x-4">
                          <span className="text-[9px] font-bold bg-[#e8f5e0] text-[#3d6b1f] px-1.5 py-0.5 rounded-full">
                            {c?.roomType || c.room}
                          </span>
                          <span
                            className={`text-[9px] px-2 py-0.5 rounded-full font-semibold
                              ${c?.bookingStatus === "Confirmed" ? "bg-green-100 text-green-700" : ""}
                              ${c?.bookingStatus === "Pending" ? "bg-yellow-100 text-yellow-700" : ""}
                              ${c?.bookingStatus === "Cancelled" ? "bg-red-100 text-red-700" : ""}
                              ${c?.bookingStatus === "Completed" ? "bg-blue-100 text-blue-700" : ""}
                            `}
                          >
                            {c?.bookingStatus}
                          </span>
                        </span>
                      </div>
                      <div className="text-[9px] font-bold text-[#9aa090] mt-0.5 uppercase">
                        {c?.therapy} · {c.doctor}
                      </div>
                      <div className="flex gap-1.5 mt-2">
                        <span className="text-[9px] font-bold bg-[#f5f6f2] text-[#5a6652] px-1.5 py-0.5 rounded-[7px]">
                          🕐 {c.checkInTime}
                        </span>
                        <span className="text-[9px] font-bold bg-[#e8f5e0] text-[#3d6b1f] px-1.5 py-0.5 rounded-[7px]">
                          {c.daysRemaining}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <button
              onClick={() => onNavigate && onNavigate("bookings", 2)}
              className="mt-3.5 w-full py-2.5 border-2 border-dashed border-[#e8ede4] rounded-[13px] bg-transparent text-[10px] font-bold text-[#9aa090] cursor-pointer tracking-[0.5px] hover:border-[#3d6b1f] hover:text-[#3d6b1f] hover:bg-[#f7faf4] transition-all duration-150"
            >
              View All Stays →
            </button>
          </div>
        </section>
      </motion.main>

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
