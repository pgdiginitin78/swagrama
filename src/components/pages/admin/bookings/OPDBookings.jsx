import {
  People as PeopleIcon,
  Person as PersonIcon,
  RestartAlt as ResetIcon,
} from "@mui/icons-material";
import ComputerIcon from "@mui/icons-material/Computer";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { Chip } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GetAllOPDBookingList } from "../../../../services/adminDashboard/AdminDashboardServices";
import CommonButton from "../../../common/button/CommonButton";
import CommonPaginationTable from "../../../common/table/CommonPaginationTable";
import LoadingSpinner from "../../../common/table/LoadingSpinner";
import { EmptyDetailView } from "./BookingComponents";
import OPDDetailView from "./OPDDetailView";

// ── Status style maps ─────────────────────────────────────────────────────────
const STATUS_PILL = {
  Pending: "text-amber-600 border border-amber-400 bg-amber-100",
  Booked: "text-emerald-700 border border-emerald-500 bg-emerald-100",
  Cancelled: "text-red-700 border border-red-500 bg-red-100",
  "Check In": "text-orange-700 border border-orange-400 bg-orange-100",
  Completed: "text-emerald-800 border border-emerald-600 bg-emerald-100",
  "Check Out": "text-teal-700 border border-teal-500 bg-teal-100",
};
const STATUS_DOT = {
  Pending: "bg-amber-400",
  Booked: "bg-emerald-500",
  Cancelled: "bg-red-500",
  "Check In": "bg-orange-400",
  Completed: "bg-emerald-600",
  "Check Out": "bg-teal-500",
};

const OPDBookings = ({ onSelect, selectedId, refreshTrigger }) => {
  const [opdList, setOpdList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [filters, setFilters] = useState({
    paymentStatus: "all",
    bookingStatus: "all",
  });

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== "all",
  ).length;

  const populateTable = (forPagination) => {
    const obj = {
      ...filters,
      page: !forPagination ? 1 : page + 1,
      pageSize: rowsPerPage,
      clinicId: 5,
    };
    setLoadingSpinner(true);
    setSelectedRow(null);
    GetAllOPDBookingList(obj)
      .then((res) => {
        if (forPagination) {
          setOpdList((prevData) => [...prevData, ...res.data.data.data]);
        } else {
          setOpdList(res.data.data.data);
        }
        setTotalCount(res.data.data.totalRecords);

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
    if (header === "status") {
      const status = row["status"]?.trim();
      return (
        <span
          className={`inline-flex items-center gap-1.5 justify-center px-4 py-1 uppercase text-[10px] font-bold rounded-2xl min-w-[100px] ${
            STATUS_PILL[status] ||
            "text-green-600 border border-green-300 bg-green-100"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              STATUS_DOT[status] || "bg-green-400"
            }`}
          />
          {status}
        </span>
      );
    }
    if (header === "customer") {
      const initials = row.customer
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("");
      return (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center uppercase text-white font-medium">
            {initials}
          </div>
          <span className="font-medium">{row.customer}</span>
        </div>
      );
    }
    if (header === "origin") {
      return (
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center space-x-2 font-medium">
            {row.origin === "web" ? (
              <ComputerIcon
                style={{ fontSize: "18px" }}
                className="text-green-600"
              />
            ) : row.origin === "app" ? (
              <SmartphoneIcon
                style={{ fontSize: "18px" }}
                className="text-green-600"
              />
            ) : null}
            <span className="capitalize">{row.origin}</span>
          </div>
        </div>
      );
    }
    return row[header];
  };

  useEffect(() => {
    populateTable();
  }, [refreshTrigger]);

  console.log("selectedRow", onSelect);
  return (
    <div className="h-full overflow-y-auto px-2 no-scrollbar font-inter">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        *, body {  box-sizing: border-box; }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .pulse-dot { animation: pulse-dot 1.5s infinite; }
        .font-inter {
  font-family: 'Inter', sans-serif;
}
      `}</style>
      {/* Header */}
      <div className="flex justify-between items-center mb-2 px-2 pt-4 shrink-0 ">
        <div>
          <h1 className="text-[20px] font-bold text-[#003d33] tracking-tighter leading-none ">
            OPD Bookings
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#fcfdfc] border border-[#d4e9ce] rounded px-4 py-2.5 mb-4 flex items-center justify-start gap-4 shadow-sm"
      >
        <div className="flex items-center gap-6 divide-x divide-[#d4e9ce]/40">
          <div className="flex flex-col gap-1 pr-1">
            <span className="text-[14px] font-semibold  text-[#6a9060]">
              Payment
            </span>
            <div className="flex gap-1">
              {["all", "paid", "unpaid"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleFilter("paymentStatus", opt)}
                  className={`px-5 py-1 rounded text-[12px] font-semibold capitalize transition-all ${
                    filters.paymentStatus === opt
                      ? "bg-[#003d33] text-white shadow-sm"
                      : "text-[#4c7c70] hover:bg-[#d4e9ce]/20"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 pl-6 pr-1">
            <span className="text-[14px] font-semibold  text-[#6a9060]">
              Booking
            </span>
            <div className="flex gap-1">
              {["all", "pending", "confirmed", "canceled"].map((opt) => (
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
          className="flex flex-wrap gap-1.5 mb-2 shrink-0 px-2"
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

      <div className="flex flex-1 gap-2 overflow-hidden h-full">
        <div className="flex-1 transition-all duration-300">
          {loadingSpinner ? (
            <div className="my-40 flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {opdList?.length > 0 ? (
                <div className="">
                  <CommonPaginationTable
                    dataResult={opdList}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    setPage={setPage}
                    count={totalCount}
                    setCount={setTotalCount}
                    setRowsPerPage={setRowsPerPage}
                    tableClass={"h-[530px] border cursor-pointer"}
                    setDataResult={setOpdList}
                    populateTable={populateTable}
                    handleSelectedRow={(row) => {
                      setSelectedRow(row);
                      if (onSelect) onSelect(row);
                    }}
                    customRowBgColor={"#cde8b8"}
                    renderInput={renderInput}
                    editableColumns={["status", "customer", "origin"]}
                    removeHeaders={["paymentStatus", "amount","paymentFor","userId","appointmnetId","serviceId","clinicId","doctorId","createdAt","updatedAt","departmentId","isRefund","isCancelBooking"]}
                  />
                </div>
              ) : (
                <>
                  {!loadingSpinner && (
                    <div className="my-40 text-center flex-1 text-sm font-semibold">
                      No Records Found
                      <span className="animate-pulse">...</span>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>

        <div className="w-[350px] xl:w-[350px] h-full hidden lg:block shrink-0">
          {selectedRow ? (
            <div className="h-full animate-in fade-in slide-in-from-right duration-300">
              <OPDDetailView
                selectedBooking={selectedRow}
                onClose={() => {
                  setSelectedRow(null);
                  if (onSelect) onSelect(null);
                }}
                onRescheduleSuccess={() => populateTable()}
              />
            </div>
          ) : (
            <EmptyDetailView />
          )}
        </div>
      </div>
    </div>
  );
};

export default OPDBookings;
