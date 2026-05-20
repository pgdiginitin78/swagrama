import {
  FilterList as FilterIcon,
  RestartAlt as ResetIcon,
} from "@mui/icons-material";
import { Chip } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GetTherapyBookingList } from "../../../../services/adminDashboard/AdminDashboardServices";
import CommonButton from "../../../common/button/CommonButton";
import CommonPaginationTable from "../../../common/table/CommonPaginationTable";
import LoadingSpinner from "../../../common/table/LoadingSpinner";
import { EmptyDetailView } from "./BookingComponents";
import TherapyAdminBooking from "./TherapyAdminBooking";
import TherapyDetailView from "./TherapyDetailView";

const THERAPY_DATA = [
  {
    id: "#BK-9021",
    date: "Oct 24",
    time: "10:30 AM",
    customer: "Elena Rodriguez",
    phone: "+1 415-555-0123",
    therapy: "Shirodhara",
    source: "WEBSITE",
    type: "IPD",
    facility: "Lotus Suite 4",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    avatar: "ER",
    img: "https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?w=800",
    detail: "Oil Flow",
    duration: "60 Minutes",
    intensity: "Soft/Calming",
  },
  {
    id: "#BK-8944",
    date: "Oct 24",
    time: "11:45 AM",
    customer: "Marcus Chen",
    phone: "+1 212-555-0988",
    therapy: "Abhyanga",
    source: "MOBILE",
    type: "OPD",
    facility: "—",
    status: "CHECKED-IN",
    paymentStatus: "PARTIALLY PAID",
    avatar: "MC",
    img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800",
    detail: "Full Body",
    duration: "90 Minutes",
    intensity: "Medium",
  },
  {
    id: "#BK-9102",
    date: "Oct 24",
    time: "02:15 PM",
    customer: "Sarah Jenkins",
    phone: "+44 20-7946-0112",
    therapy: "Udvartana",
    source: "ADMIN",
    type: "IPD",
    facility: "Garden Villa B",
    status: "RESCHEDULED",
    paymentStatus: "UNPAID",
    avatar: "SJ",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecee?w=800",
    detail: "Powder Massage",
    duration: "60 Minutes",
    intensity: "Deep Tissue",
  },
  {
    id: "#BK-8851",
    date: "Oct 24",
    time: "04:00 PM",
    customer: "David Miller",
    phone: "+1 312-555-0744",
    therapy: "Pizhichil",
    source: "WEBSITE",
    type: "OPD",
    facility: "—",
    status: "CONFIRMED",
    paymentStatus: "PAID",
    avatar: "DM",
    img: "https://images.unsplash.com/photo-1620733723572-11c53f7ecba1?w=800",
    detail: "Royal Bath",
    duration: "75 Minutes",
    intensity: "Relaxing",
  },
];

const TherapyBookings = ({ onSelect, selectedId, refreshTrigger }) => {
  const [openTherapyBookingModal, setOpenTherapyBookingModal] = useState(false);
  const [therapyList, setTherapyList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  //GetTherapyBookingList

  const [filters, setFilters] = useState({
    paymentStatus: "all",
    bookingStatus: "all",
  });

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== "all",
  ).length;

  const populateTable = (forPagination) => {
    setLoadingSpinner(true);
    setSelectedRow(null);
    GetTherapyBookingList(
      5,
      !forPagination ? 1 : page + 1,
      rowsPerPage,
      filters,
    )
      .then((res) => {
        if (forPagination) {
          setTherapyList((prevData) => [...prevData, ...res.data.data.data]);
        } else {
          setTherapyList(res.data.data.data);
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

  return (
    <div className="flex-1 flex flex-col  ">
      <div className="flex justify-between items-center mb-2 px-5 pt-5 shrink-0">
        <div>
          <h1 className="text-[20px] font-bold text-[#002a24] leading-tight tracking-tight ">
            Therapy Bookings
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
        className="bg-[#fcfdfc] border border-[#d4e9ce] rounded px-4 py-2.5 m-4  flex items-center justify-start gap-4 shadow-sm"
      >
        <div className="flex items-center gap-6 divide-x divide-[#d4e9ce]/40">
          <div className="flex flex-col gap-1 pr-1">
            <span className="text-[14px] font-semibold text-[#6a9060]">
              Payment
            </span>
            <div className="flex gap-1">
              {["all", "paid", "unpaid"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleFilter("paymentStatus", opt)}
                  className={`px-5 py-1  rounded text-[12px] font-semibold capitalize transition-all ${
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
            <span className="text-[14px] font-semibold text-[#6a9060]">
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
          className="flex flex-wrap gap-1.5 mb-2 shrink-0 px-5"
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

          {therapyList?.length > 0 ? (
            <div className="px-4 pb-4 h-full">
              <CommonPaginationTable
                dataResult={therapyList}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                count={totalCount}
                setCount={setTotalCount}
                setRowsPerPage={setRowsPerPage}
                tableClass={"h-[460px] border cursor-pointer"}
                setDataResult={setTherapyList}
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
                  "userId",
                  "serviceGroupName",
                  "doctorName",
                  "roomName",
                  "fromDate",
                  "toDate",
                  "duration",
                  "amount",
                  "charges",
                  "totalAmount",
                  "image",
                  "patientId",
                  "paymentFor"
                ]}
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
        </div>

        <div className="w-[350px]  h-full hidden lg:block shrink-0">
          {selectedRow ? (
            <div className="h-full animate-in fade-in slide-in-from-right duration-300">
              <TherapyDetailView
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

      {openTherapyBookingModal && (
        <TherapyAdminBooking
          open={openTherapyBookingModal}
          handleClose={() => setOpenTherapyBookingModal(false)}
        />
      )}
    </div>
  );
};

export default TherapyBookings;
