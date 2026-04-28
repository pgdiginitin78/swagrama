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
  Box
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
      className={`flex-1 min-w-[20px] px-2 py-4 rounded-lg flex flex-col justify-between border ${
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

const FilterDrawer = ({
  open,
  onClose,
  filters,
  onChange,
  activeCount,
  populateTable,
}) => {
  const paymentOptions = ["all", "paid", "unpaid"];
  const bookingOptions = ["all", "confirmed", "pending"];
  const roomOptions = ["all"];
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
                  onClick={() => onChange("paymentStatus", opt)}
                  className={`px-2.5 py-1 rounded-lg text-[8.5px] font-bold uppercase tracking-wide border transition-all ${filters.paymentStatus === opt ? "bg-[#003d33] text-white border-[#003d33]" : "bg-white text-gray-500 border-[#d4e9ce] hover:border-[#003d33] hover:text-[#003d33]"}`}
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
                  onClick={() => onChange("bookingStatus", opt)}
                  className={`px-2.5 py-1 rounded-lg text-[8.5px] font-bold uppercase tracking-wide border transition-all ${filters.bookingStatus === opt ? "bg-[#003d33] text-white border-[#003d33]" : "bg-white text-gray-500 border-[#d4e9ce] hover:border-[#003d33] hover:text-[#003d33]"}`}
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
                value={filters.roomType}
                onChange={(e) => onChange("roomType", e.target.value)}
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
              value={filters.occupancyType}
              exclusive
              onChange={(e, v) => v && onChange("occupancyType", v)}
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
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="Seperate">
                <PersonIcon style={{ fontSize: 11, marginRight: 3 }} />
                Seperate
              </ToggleButton>
              <ToggleButton value="Double">
                <PeopleIcon style={{ fontSize: 11, marginRight: 3 }} />
                Double
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <div className="px-4 py-3 border-t border-[#d4e9ce]">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              onClose();
              populateTable();
            }}
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
    paymentStatus: "all",
    bookingStatus: "all",
    roomType: "all",
    occupancyType: "all",
  });


  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== "all",
  ).length;

  const populateTable = (forPagination, currentFilters) => {
    const filterData = currentFilters || filters;
    let obj = {
      ...filterData,
      page: typeof forPagination === "number" ? forPagination + 1 : 1,
      pageSize: rowsPerPage,
      type: "all",
    };
    setLoadingSpinner(true);
    GetUpcomingStays(obj)
      .then((res) => {
        const responseData = res?.data?.data?.data || [];
        const totalRecords = res?.data?.data?.totalRecords || 0;

        setUpcomingStays(responseData);
        setCount(totalRecords);
        setLoadingSpinner(false);
      })
      .catch((error) => {
        console.error("Error fetching upcoming stays:", error);
        setLoadingSpinner(false);
      });
  };

  const handleFilter = (key, val, shouldRefresh = false) => {
    if (key === "reset") {
      const resetFilters = {
        paymentStatus: "all",
        bookingStatus: "all",
        roomType: "all",
        occupancyType: "all",
      };
      setFilters(resetFilters);
      if (shouldRefresh) populateTable(0, resetFilters);
    } else {
      setFilters((p) => {
        const updated = { ...p, [key]: val };
        if (shouldRefresh) populateTable(0, updated);
        return updated;
      });
    }
  };

  useEffect(() => {
    GetNext24HoursArrivals()
      .then((res) => {
        setNext24HoursArrivals(res.data.data);
      })
      .catch((err) => err);
    populateTable();
  }, []);

  console.log("selectedRow",selectedRow);
  

  return (
    <div className="flex-1 flex flex-col bg-[#fbfbf8] min-h-screen  ">
      <div className="flex flex-col h-full">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 shrink-0"
        >
          <div>
            <p className="text-[7.5px] font-black  tracking-[0.2em] text-[#4d7040] mb-0.5">
              Sanctuary Management
            </p>
            <h1 className="text-[17px] font-black text-[#002a24] tracking-tight leading-none ">
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
                  fontSize: "8px",
                  minWidth: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  fontWeight: 900,
                  zIndex: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0",
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
              val !== "all" ? (
                <Chip
                  key={key}
                  label={`${key}: ${val}`}
                  onDelete={() => handleFilter(key, "all", true)}
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
            <main className="pb-5 flex-1">
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
                handleSelectedRow={(row) => { setSelectedRow(row); if (onSelect) onSelect(row); }}
                customRowBgColor={"#cde8b8"}
                removeHeaders={["doctor","twinsharing","financials","petFriendly","bookingStatus","daysRemaining"]}
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
        populateTable={populateTable}
      />
    </div>
  );
}
