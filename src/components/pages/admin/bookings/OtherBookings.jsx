import { RestartAlt as ResetIcon } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GetOtherBookingsList } from "../../../../services/adminDashboard/AdminDashboardServices";
import CommonButton from "../../../common/button/CommonButton";
import CommonPaginationTable from "../../../common/table/CommonPaginationTable";
import LoadingSpinner from "../../../common/table/LoadingSpinner";
import { EmptyDetailView } from "./BookingComponents";
import OtherDetailView from "./OtherDetailView";


const OTHER_DATA = Array.from({ length: 3 }, (_, i) => ({
  id: `#OTH-20${i + 1}`,
  date: "Oct 27, 2023",
  time: "N/A",
  customer: "Corporate Guest",
  origin: "MOBILE",
  service: "Annual Membership",
  lastFollowUp: "Oct 01, 2023",
  status: "CONFIRMED",
  avatar: "CG",
  phone: "N/A",
  img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200",
}));

const OtherBookings = ({ onSelect, selectedId, refreshTrigger }) => {
  const [otherBookingList, setOtherBookingList] = useState([]);
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

  const populateTable = (newPage) => {
    const currentPage = typeof newPage === "number" ? newPage : page;
    let obj = {
      ...filters,
      page: currentPage + 1,
      pageSize: rowsPerPage,
    };
    setLoadingSpinner(true);
    setOtherBookingList([]);
    setSelectedRow(null)
    GetOtherBookingsList(obj)
      .then((res) => {
        setOtherBookingList(res.data.data.data);
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
      const status = row["status"]?.trim() || "Pending";
      
      const statusConfig = {
        Success: {
          pill: "text-emerald-700 border-emerald-500 bg-emerald-100",
          dot: "bg-emerald-500"
        },
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
    populateTable();
  }, [refreshTrigger]);

  console.log("selectedRow", selectedRow);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center mb-2 px-4 pt-4 shrink-0">
        <div>
          <h1 className="text-[24px] font-semibold capitalize  text-[#003d33]  leading-none">
            Other Bookings
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
            <span className="text-[14px] font-semibold capitalize text-[#6a9060]">
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
                      : "text-[#4c7c70] bg-[#d4e9ce]/20"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 pl-6 pr-1">
            <span className="text-[14px] font-semibold capitalize text-[#6a9060]">
              Booking
            </span>
            <div className="flex gap-1">
              {["all", "pending", "confirmed", "canceled"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleFilter("bookingStatus", opt)}
                  className={`px-4 py-1 rounded text-[12px] font-semibold capitalize transition-all ${
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
          className="flex flex-wrap gap-1.5 mb-2 shrink-0 px-4"
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
          {loadingSpinner && (
            <div className="my-40 flex justify-center">
              <LoadingSpinner />
            </div>
          )}

          {otherBookingList?.length > 0 ? (
            <div className="">
              <CommonPaginationTable
                dataResult={otherBookingList}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                count={totalCount}
                setCount={setTotalCount}
                setRowsPerPage={setRowsPerPage}
                tableClass={"h-[420px] border cursor-pointer"}
                setDataResult={setOtherBookingList}
                populateTable={populateTable}
                renderInput={renderInput}
                editableColumns={["status"]}
                handleSelectedRow={(row) => {
                  setSelectedRow(row);
                  if (onSelect) onSelect(row);
                }}
                customRowBgColor={"#cde8b8"}
                removeHeaders={['city',"checkIn","checkOut"]}
              />
            </div>
          ) : (
            <>
              {!loadingSpinner && (
                <div className="my-40 text-center flex-1 text-sm font-semibold">
                  No Records Found<span className="animate-pulse">...</span>
                </div>
              )}
            </>
          )}
        </div>

        <div className="w-[350px] xl:w-[350px] h-full hidden lg:block shrink-0">
          {selectedRow ? (
            <div className="h-full animate-in fade-in slide-in-from-right duration-300">
              <OtherDetailView
                selectedBooking={selectedRow}
                onClose={() => {
                  setSelectedRow(null);
                  if (onSelect) onSelect(null);
                }}
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

export default OtherBookings;
