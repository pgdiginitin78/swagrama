import {
  Close as CloseIcon,
  FilterList as FilterIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  RestartAlt as ResetIcon,
  TrendingUp as TrendingIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Chip,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  GetNext24HoursArrivals,
  GetUpcomingStays,
} from "../../../../services/adminDashboard/AdminDashboardServices";
import CommonButton from "../../../common/button/CommonButton";
import CommonPaginationTable from "../../../common/table/CommonPaginationTable";
import LoadingSpinner from "../../../common/table/LoadingSpinner";

const STAY_DATA = [
  {
    id: "#SWG-2024-8831",
    date: "12 Oct, 10:30 AM",
    customer: "Ananya Mehta",
    roomType: "Premium Suite",
    occupancyType: "Twin Sharing",
    occupancyIcon: "twin",
    stayDates: "15 Oct - 22 Oct",
    duration: "7 Nights",
    paymentStatus: "PAID",
    bookingStatus: "CONFIRMED",
    avatar: "AM",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200",
    phone: "+91 98200 11234",
    email: "ananya.mehta@gmail.com",
    amount: "₹42,000",
    notes: "Early check-in requested. Vegan meal plan.",
  },
  {
    id: "#SWG-2024-8842",
    date: "12 Oct, 11:15 AM",
    customer: "Rajiv Malhotra",
    roomType: "Deluxe Cottage",
    occupancyType: "Single Occupancy",
    occupancyIcon: "single",
    stayDates: "Today - 20 Oct",
    duration: "Checked-in",
    paymentStatus: "PARTIALLY PAID",
    bookingStatus: "CHECKED-IN",
    avatar: "RM",
    avatarImg:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4df85b?w=200",
    phone: "+91 97300 55678",
    email: "rajiv.m@outlook.com",
    amount: "₹28,500",
    notes: "Balance ₹9,500 due on checkout.",
  },
  {
    id: "#SWG-2024-8855",
    date: "12 Oct, 12:45 PM",
    customer: "Sneha Kapoor",
    roomType: "Standard Room",
    occupancyType: "Twin Sharing",
    occupancyIcon: "twin",
    stayDates: "22 Oct - 27 Oct",
    duration: "5 Nights",
    paymentStatus: "UNPAID",
    bookingStatus: "PENDING",
    avatar: "SK",
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=200",
    phone: "+91 99100 87654",
    email: "sneha.kapoor@yahoo.com",
    amount: "₹18,750",
    notes: "Awaiting advance payment confirmation.",
  },
];

const statusStyles = {
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CONFIRMED: "bg-teal-50 text-teal-700 border-teal-200",
  "PARTIALLY PAID": "bg-amber-50 text-amber-700 border-amber-200",
  "CHECKED-IN": "bg-lime-50 text-lime-700 border-lime-200",
  UNPAID: "bg-red-50 text-red-700 border-red-200",
  PENDING: "bg-gray-100 text-gray-500 border-gray-200",
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.08 + i * 0.07,
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2 + i * 0.07,
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: { opacity: 0, x: 10, transition: { duration: 0.18 } },
};

const panelVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
};

const StatusBadge = ({ status }) => (
  <span
    className={`px-2 py-0.5 rounded text-[7px] font-bold tracking-wide uppercase border ${statusStyles[status] || "bg-gray-50 text-gray-600 border-gray-200"} whitespace-nowrap`}
  >
    {status}
  </span>
);

const SummaryCard = ({
  title,
  value,
  subtitle,
  type,
  progress,
  trend,
  index,
}) => {
  const isDark = type === "dark";
  const isSilver = type === "silver";
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="show"
      whileHover={{ y: -1, transition: { duration: 0.18 } }}
      className={`flex-1 min-w-[20px] p-2 rounded-lg flex flex-col justify-between border ${
        isDark
          ? "bg-[#2e3d28] border-[#3a4a32] text-white"
          : isSilver
            ? "bg-gradient-to-br from-[#eef4ec] to-[#deebd9] border-[#cde0c8] text-[#002a24]"
            : "bg-[#f0f7ee] border-[#d4e9ce] text-[#002a24]"
      }`}
      style={{ minHeight: 60 }}
    >
      <div>
        <p
          className={`text-[7.5px] font-black uppercase tracking-[0.18em] ${isDark ? "text-[#8aab82]" : "text-[#6a9060]"} mb-0.5`}
        >
          {title}
        </p>
        <div className="flex items-end gap-1.5">
          <h2 className="text-xl font-black tracking-tighter leading-none">
            {value}
          </h2>
          {trend && (
            <div className="flex items-center gap-0.5 text-[7.5px] font-bold mb-0.5 text-[#4c7c70]">
              <TrendingIcon style={{ fontSize: 10 }} />
              <span>{trend}</span>
            </div>
          )}
        </div>
        {subtitle && (
          <p
            className={`text-[8px] font-medium mt-0.5 leading-none ${isDark ? "text-[#8aab82]" : "text-[#6a9060]"}`}
          >
            {subtitle}
          </p>
        )}
      </div>
      {progress !== undefined && (
        <div className="w-full h-[3px] bg-[#c8dfc2] rounded-full overflow-hidden mt-2">
          <motion.div
            className="h-full bg-[#4c7c70] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}
    </motion.div>
  );
};

const MobileBookingCard = ({ booking, index, onSelect, isSelected }) => (
  <motion.div
    custom={index}
    variants={rowVariants}
    initial="hidden"
    animate="show"
    exit="exit"
    onClick={() => onSelect(booking)}
    whileTap={{ scale: 0.99 }}
    className={`rounded-xl border p-2.5 cursor-pointer transition-colors ${isSelected ? "bg-[#e0f0db] border-[#b2d0ac]" : "bg-[#f0f7ee] border-[#d4e9ce]"}`}
  >
    <div className="flex items-start justify-between gap-2 mb-2">
      <div className="flex items-center gap-2">
        <Avatar
          src={booking.avatarImg}
          sx={{
            width: 30,
            height: 30,
            bgcolor: "#c8dfc2",
            color: "#2e5c28",
            fontSize: "10px",
            fontWeight: 700,
          }}
        >
          {booking.avatar}
        </Avatar>
        <div>
          <p className="text-[11px] font-bold text-[#002a24] leading-tight">
            {booking.customer}
          </p>
          <p className="text-[8px] text-gray-400 font-medium mt-0.5">
            {booking.id}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <StatusBadge status={booking.bookingStatus} />
        <StatusBadge status={booking.paymentStatus} />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-1.5">
      <div className="bg-white border border-[#d4e9ce] rounded-lg p-1.5">
        <p className="text-[7px] font-black uppercase tracking-wide text-[#6a9060] mb-0.5">
          Room
        </p>
        <p className="text-[10px] font-bold text-[#4c7c70] leading-tight">
          {booking.roomType}
        </p>
      </div>
      <div className="bg-white border border-[#d4e9ce] rounded-lg p-1.5">
        <p className="text-[7px] font-black uppercase tracking-wide text-[#6a9060] mb-0.5">
          Stay
        </p>
        <p className="text-[10px] font-bold text-[#002a24] leading-tight">
          {booking.stayDates}
        </p>
      </div>
    </div>
  </motion.div>
);

const FilterDrawer = ({ open, onClose, filters, onChange, activeCount }) => {
  const paymentOptions = ["ALL", "PAID", "PARTIALLY PAID", "UNPAID"];
  const bookingOptions = ["ALL", "CONFIRMED", "CHECKED-IN", "PENDING"];
  const roomOptions = [
    "ALL",
    "Premium Suite",
    "Deluxe Cottage",
    "Standard Room",
  ];
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "85vw", sm: 340 },
          borderRadius: "10px 0 0 10px",
          p: 0,
          background: "#f0f7ee",
        },
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#d4e9ce]">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#6a9060]">
              Refine
            </p>
            <h3 className="text-[15px] font-black text-[#002a24] tracking-tight leading-tight">
              Filters
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {activeCount > 0 && (
              <button
                onClick={() => onChange("reset")}
                className="flex items-center gap-1 text-[8px] font-black uppercase tracking-wide text-[#4c7c70] bg-[#d4e9ce] px-2 py-1 rounded-lg"
              >
                <ResetIcon style={{ fontSize: 10 }} />
                Reset
              </button>
            )}
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                background: "#daefd4",
                borderRadius: "10px",
                padding: "4px",
              }}
            >
              <CloseIcon style={{ fontSize: 14, color: "#2e5c28" }} />
            </IconButton>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#6a9060] mb-2">
              Payment Status
            </p>
            <div className="flex flex-wrap gap-1.5">
              {paymentOptions.map((opt) => (
                <motion.button
                  key={opt}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onChange("payment", opt)}
                  className={`px-2.5 py-1 rounded-lg text-[8.5px] font-bold uppercase tracking-wide border transition-all ${filters.payment === opt ? "bg-[#003d33] text-white border-[#003d33]" : "bg-white text-gray-500 border-[#d4e9ce] hover:border-[#003d33] hover:text-[#003d33]"}`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </div>
          <Divider sx={{ borderColor: "#d4e9ce" }} />
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#6a9060] mb-2">
              Booking Status
            </p>
            <div className="flex flex-wrap gap-1.5">
              {bookingOptions.map((opt) => (
                <motion.button
                  key={opt}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onChange("booking", opt)}
                  className={`px-2.5 py-1 rounded-lg text-[8.5px] font-bold uppercase tracking-wide border transition-all ${filters.booking === opt ? "bg-[#003d33] text-white border-[#003d33]" : "bg-white text-gray-500 border-[#d4e9ce] hover:border-[#003d33] hover:text-[#003d33]"}`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </div>
          <Divider sx={{ borderColor: "#d4e9ce" }} />
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#6a9060] mb-2">
              Room Type
            </p>
            <FormControl fullWidth size="small">
              <Select
                value={filters.room}
                onChange={(e) => onChange("room", e.target.value)}
                displayEmpty
                sx={{
                  borderRadius: "10px",
                  fontSize: "10px",
                  fontWeight: 700,
                  background: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d4e9ce",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#4c7c70",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#003d33",
                  },
                }}
              >
                {roomOptions.map((opt) => (
                  <MenuItem
                    key={opt}
                    value={opt}
                    sx={{ fontSize: "10px", fontWeight: 600 }}
                  >
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Divider sx={{ borderColor: "#d4e9ce" }} />
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#6a9060] mb-2">
              Occupancy Type
            </p>
            <ToggleButtonGroup
              value={filters.occupancy}
              exclusive
              onChange={(e, v) => v && onChange("occupancy", v)}
              fullWidth
              size="small"
              sx={{
                "& .MuiToggleButton-root": {
                  borderRadius: "10px !important",
                  fontSize: "8px",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "1px solid #d4e9ce !important",
                  color: "#6b7280",
                  mx: 0.3,
                  "&.Mui-selected": {
                    background: "#003d33",
                    color: "white",
                    borderColor: "#003d33 !important",
                  },
                },
              }}
            >
              <ToggleButton value="ALL">All</ToggleButton>
              <ToggleButton value="single">
                <PersonIcon style={{ fontSize: 11, marginRight: 3 }} />
                Single
              </ToggleButton>
              <ToggleButton value="twin">
                <PeopleIcon style={{ fontSize: 11, marginRight: 3 }} />
                Twin
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <div className="px-4 py-3 border-t border-[#d4e9ce]">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="w-full py-2.5 bg-[#003d33] text-white text-[10px] font-black uppercase tracking-[0.15em] rounded-xl shadow-sm"
          >
            Apply Filters
          </motion.button>
        </div>
      </div>
    </Drawer>
  );
};

export default function WellnessStayBookings({ onSelect, selectedId }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [next24HoursArrivals, setNext24HoursArrivals] = useState(null);
  const [upcomingStays, setUpcomingStays] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [filters, setFilters] = useState({
    payment: "ALL",
    booking: "ALL",
    room: "ALL",
    occupancy: "ALL",
  });

  const handleFilter = (key, val) => {
    if (key === "reset")
      setFilters({
        payment: "ALL",
        booking: "ALL",
        room: "ALL",
        occupancy: "ALL",
      });
    else setFilters((p) => ({ ...p, [key]: val }));
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== "ALL",
  ).length;

  console.log("next24HoursArrivals", upcomingStays);

  const populateTable = (forPagination) => {
    let obj = {
      page: !forPagination ? 1 : page,
      pageSize: rowsPerPage,
      type: "all",
      // paymentStatus: "",
      // bookingStatus: "",
      // roomType: "",
      // occupancyType: "",
    };
    setLoadingSpinner(true);
    GetUpcomingStays(obj)
      .then((res) => {
        if (forPagination) {
          setUpcomingStays((prevData) => [...prevData, ...res.data.data.data]);
        } else {
          setUpcomingStays(res.data.data.data);
        }
        console.log("res.data.data", res.data.data);
        setCount(res.data.data.totalRecords);
        setLoadingSpinner(false);
      })
      .catch((error) => {
        setLoadingSpinner(false);
      });
  };

  useEffect(() => {
    GetNext24HoursArrivals()
      .then((res) => {
        setNext24HoursArrivals(res.data.data);
      })
      .catch((err) => err);
    populateTable();
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#fbfbf8] h-screen p-3 ">
      <div className="flex flex-col h-full">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 shrink-0"
        >
          <div>
            <p className="text-[7.5px] font-black uppercase tracking-[0.2em] text-[#4d7040] mb-0.5">
              Sanctuary Management
            </p>
            <h1 className="text-[17px] font-black text-[#002a24] tracking-tight leading-none uppercase">
              Wellness Stay
            </h1>
            <p className="text-[8.5px] text-[#5a7a50] font-medium mt-0.5">
              124 active and upcoming sanctuary stays
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Badge
              badgeContent={activeFilterCount}
              color="error"
              overlap="circular"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "6.5px",
                  minWidth: "11px",
                  height: "11px",
                  fontWeight: 900,
                },
              }}
            >
              <CommonButton
                type="button"
                icon={<FilterIcon style={{ fontSize: 11 }} />}
                label="Filter"
                className={"bg-[#2e3d28] text-white"}
                onClick={() => setDrawerOpen(true)}
              />
            </Badge>
            <CommonButton
              type="button"
              label="+ New Booking"
              className={"bg-[#2e3d28] text-white"}
            />
          </div>
        </motion.div>

        <div className="flex gap-2 mb-3 overflow-x-auto pb-0.5 shrink-0">
          <SummaryCard
            index={0}
            title="Total Occupancy"
            value="0%"
            progress={0}
          />
          <SummaryCard
            index={1}
            title="Upcoming Arrivals"
            value={next24HoursArrivals?.next24HoursArrivalCount || 0}
            subtitle="Next 24 hours"
            type="dark"
          />
          <SummaryCard
            index={2}
            title="Peak Revenue"
            value="₹0.00"
            trend="--"
            type="silver"
          />
        </div>

        {activeFilterCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-1.5 mb-2 shrink-0"
          >
            {Object.entries(filters).map(([key, val]) =>
              val !== "ALL" ? (
                <Chip
                  key={key}
                  label={`${key}: ${val}`}
                  onDelete={() => handleFilter(key, "ALL")}
                  size="small"
                  sx={{
                    fontSize: "8px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    background: "#c8dfc2",
                    color: "#002a24",
                    "& .MuiChip-deleteIcon": {
                      color: "#4c7c70",
                      fontSize: "12px",
                    },
                    borderRadius: "7px",
                    height: "22px",
                  }}
                />
              ) : null,
            )}
          </motion.div>
        )}

        <div className="flex gap-3 h-full flex-1 ">
          {loadingSpinner && (
            <div className="my-32 flex justify-center items-center flex-1">
              <LoadingSpinner />
            </div>
          )}
          {upcomingStays?.length > 0 ? (
            <main className="">
              <CommonPaginationTable
                dataResult={upcomingStays}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                count={count}
                setCount={setCount}
                setRowsPerPage={setRowsPerPage}
                tableClass={"h-[320px] border cursor-pointer"}
                setDataResult={setUpcomingStays}
                populateTable={populateTable}
                handleSelectedRow={(row) => setSelectedRow(row)}
                customRowBgColor={"#cde8b8"}
              />
            </main>
          ) : (
            <>
              {!loadingSpinner && (
                <div className="my-32 text-center flex-1 text-sm font-semibold">
                  No Records Found
                  <span className="animate-pulse">...</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={handleFilter}
        activeCount={activeFilterCount}
      />
    </div>
  );
}
