import {
  Close as CloseIcon,
  FilterList as FilterIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  RestartAlt as ResetIcon,
  TrendingUp as TrendingIcon,
} from "@mui/icons-material";
import {
  Chip,
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
import { EmptyDetailView } from "./BookingComponents";
import StayDetailView from "./StayDetailView";

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



export default function WellnessStayBookings({
  onSelect,
  selectedId,
  refreshTrigger,
}) {
  const [next24HoursArrivals, setNext24HoursArrivals] = useState(null);
  const [upcomingStays, setUpcomingStays] = useState([]);
  const [page, setPage] = useState(0);
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

  const populateTable = (forPagination) => {
    const filterData = filters;
    const obj = {
      ...filterData,
      page: !forPagination ? 1 : page + 1,
      pageSize: rowsPerPage,
      clinicId: 5,
      type: "all",
    }; 
    setSelectedRow(null)
    setLoadingSpinner(true)
    GetUpcomingStays(5, obj)
      .then((res) => {
        if (forPagination) {
          setUpcomingStays((prevData) => [...prevData, ...res.data.data.data]);
        } else {
          setUpcomingStays(res.data.data.data);
        }
        setCount(res.data.data.totalRecords);
        setLoadingSpinner(false);
      })
      .catch((error) => {
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

  const renderInput = (row, _index, header) => {
    if (header === "bookingStatus") {
      const status = row["bookingStatus"]?.trim() || "Pending";
      
      const statusConfig = {
        Confirmed: {
          pill: "text-emerald-700 border-emerald-500 bg-emerald-100",
          dot: "bg-emerald-500"
        },
        Pending: {
          pill: "text-amber-600 border-amber-400 bg-amber-100",
          dot: "bg-amber-400"
        },
        Canceled: {
          pill: "text-red-700 border-red-500 bg-red-100",
          dot: "bg-red-500"
        },
        "Check-In": {
          pill: "text-[#e7f5ed] border-[#3b4b3e] bg-[#3b4b3e]",
          dot: "bg-emerald-400"
        },
        "Check-Out": {
          pill: "text-teal-700 border-teal-500 bg-teal-100",
          dot: "bg-teal-500"
        },
        Default: {
          pill: "text-gray-600 border-gray-300 bg-gray-100",
          dot: "bg-gray-400"
        }
      };

      const config = statusConfig[status] || statusConfig.Default;

      return (
        <span
          className={`inline-flex items-center gap-1.5 justify-center px-4 py-1 uppercase text-[10px] font-bold rounded-2xl min-w-[100px] border ${config.pill}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {status}
        </span>
      );
    }
    return row[header];
  };

  useEffect(() => {
    GetNext24HoursArrivals()
      .then((res) => {
        setNext24HoursArrivals(res.data.data);
      })
      .catch((err) => err);
    populateTable();
  }, [refreshTrigger]);

  console.log("selectedRow", selectedRow);

  return (
    <div className="flex-1 flex flex-col px-2 min-h-screen  ">
      <div className="flex flex-col h-full">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 shrink-0"
        >
          <div>
            <h1 className="text-[24px] font-black text-[#002a24] tracking-tight leading-none mb-2 ">
              Wellness Stay
            </h1>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {activeFilterCount > 0 && (
              <button
                onClick={() => handleFilter("reset", null, true)}
                className="flex items-center gap-1 text-[8px] font-black uppercase tracking-wide text-[#4c7c70] bg-[#d4e9ce] px-2 py-1 rounded-lg hover:bg-[#c4dfbd] transition-colors"
              >
                <ResetIcon style={{ fontSize: 10 }} />
                Reset Filters
              </button>
            )}
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

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#fcfdfc] border border-[#d4e9ce] rounded px-4 py-2.5 mb-4 flex items-center justify-start gap-4 shadow-sm"
        >
          <div className="flex items-center gap-6 divide-x divide-[#d4e9ce]/40">
            <div className="flex flex-col gap-1 pr-1">
              <span className="text-[14px] font-semibold capitalize text-[#6a9060]">Payment</span>
              <div className="flex gap-1">
                {["all", "paid", "unpaid"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleFilter("paymentStatus", opt)}
                    className={`px-5 py-1 rounded text-[12px] font-semibold capitalize transition-all ${
                      filters.paymentStatus === opt
                        ? "bg-[#003d33] text-white shadow-sm"
                        : "text-[#4c7c70] bg-[#d4e9ce]/20"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 pl-6 pr-1">
              <span className="text-[14px] font-semibold capitalize  text-[#6a9060]">Booking</span>
              <div className="flex gap-1">
                {["all", "confirmed", "pending"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleFilter("bookingStatus", opt)}
                    className={`px-5 py-1 rounded text-[12px] font-semibold capitalize transition-all ${
                      filters.bookingStatus === opt
                        ? "bg-[#003d33] text-white shadow-sm"
                        : "text-[#4c7c70] bg-[#d4e9ce]/20"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 pl-6 pr-1">
              <span className="text-[14px] font-semibold capitalize  text-[#6a9060]">Room Type</span>
              <Select
                value={filters.roomType}
                onChange={(e) => handleFilter("roomType", e.target.value)}
                displayEmpty
                variant="standard"
                disableUnderline
                sx={{
                  fontSize: "9px",
                  fontWeight: 800,
                  color: "#003d33",
                  minWidth: 80,
                  "& .MuiSelect-select": { py: 0 },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      "& .MuiMenuItem-root": {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#003d33",
                        "&::before": { display: "none !important" },
                      },
                    },
                  },
                }}
              >
                {["all"].map((opt) => (
                  <MenuItem key={opt} value={opt} sx={{ fontSize: "12px", fontWeight: 600 }}>
                    {opt.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="flex flex-col gap-1 pl-6">
              <span className="text-[14px] font-semibold capitalize text-[#6a9060]">Occupancy</span>
              <ToggleButtonGroup
                value={filters.occupancyType}
                exclusive
                onChange={(e, v) => v && handleFilter("occupancyType", v)}
                size="small"
                sx={{
                  height: "24px",
                  "& .MuiToggleButton-root": {
                    border: "none !important",
                    borderRadius: "5px !important",
                    fontSize: "12px",
                    fontWeight: 600,
                    px: 1.5,
                    color: "#6a9060",
                    "&.Mui-selected": {
                      background: "#003d33 !important",
                      color: "white",
                    },
                  },
                }}
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="Seperate"><PersonIcon style={{ fontSize: 11, marginRight: 2 }} />One</ToggleButton>
                <ToggleButton value="Double"><PeopleIcon style={{ fontSize: 11, marginRight: 2 }} />Two</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>

          <div className="pl-4">
            <CommonButton
              type="button"
              searchIcon={true}
              onClick={() => populateTable()}
              className="bg-[#003d33] text-white hover:bg-[#002a24] transition-all "
              style={{ height: "32px" }}
            />
          </div>
        </motion.div>

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

        <div className="flex gap-2 h-full flex-1 overflow-hidden">
          <div className="flex-1 transition-all duration-300">
            {loadingSpinner && (
              <div className="my-32 flex justify-center items-center flex-1">
                <LoadingSpinner />
              </div>
            )}
            {upcomingStays?.length > 0 ? (
              <main className=" flex-1 h-full">
                <CommonPaginationTable
                  dataResult={upcomingStays}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  setPage={setPage}
                  count={count}
                  setCount={setCount}
                  setRowsPerPage={setRowsPerPage}
                  tableClass={"h-[460px] border cursor-pointer"}
                  setDataResult={setUpcomingStays}
                  populateTable={populateTable}
                  renderInput={renderInput}
                  editableColumns={["bookingStatus"]}
                  handleSelectedRow={(row) => {
                    setSelectedRow(row);
                    if (onSelect) onSelect(row);
                  }}
                  customRowBgColor={"#cde8b8"}
                  removeHeaders={[
                    "bookingId",
                    "patientId",
                    "doctor",
                    "twinsharing",
                    "financials",
                    "petFriendly",
                    "daysRemaining",
                    "images",
                    "amount"
                  ]}
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

          <div className="w-[350px] xl:w-[400px] h-full hidden lg:block shrink-0">
            {selectedRow ? (
              <div className="h-full animate-in fade-in slide-in-from-right duration-300">
                <StayDetailView
                  selectedBooking={selectedRow}
                  onClose={() => {
                    setSelectedRow(null);
                    if (onSelect) onSelect(null);
                  }}
                  onSuccess={populateTable}
                />
              </div>
            ) : (
              <EmptyDetailView />
            )}
          </div>
        </div>
      </div>


    </div>
  );
}
