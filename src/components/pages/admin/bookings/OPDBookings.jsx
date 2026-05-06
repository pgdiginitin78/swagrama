import ComputerIcon from "@mui/icons-material/Computer";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { useEffect, useState } from "react";
import { GetAllOPDBookingList } from "../../../../services/adminDashboard/AdminDashboardServices";
import CommonButton from "../../../common/button/CommonButton";
import CommonPaginationTable from "../../../common/table/CommonPaginationTable";
import LoadingSpinner from "../../../common/table/LoadingSpinner";
import OPDDetailView from "./OPDDetailView";


import { StatusBadge, OriginBadge, EmptyDetailView } from "./BookingComponents";

// ── Status style maps ─────────────────────────────────────────────────────────
const STATUS_PILL = {
  Pending: "text-amber-600 border border-amber-400 bg-amber-100",
  Confirmed: "text-emerald-700 border border-emerald-500 bg-emerald-100",
  Canceled: "text-red-700 border border-red-500 bg-red-100",
  "Check-In": "text-orange-700 border border-orange-400 bg-orange-100",
  Completed: "text-emerald-800 border border-emerald-600 bg-emerald-100",
  "Check-Out": "text-teal-700 border border-teal-500 bg-teal-100",
};
const STATUS_DOT = {
  Pending: "bg-amber-400",
  Confirmed: "bg-emerald-500",
  Canceled: "bg-red-500",
  "Check-In": "bg-orange-400",
  Completed: "bg-emerald-600",
  "Check-Out": "bg-teal-500",
};

const OPDBookings = ({ onSelect, selectedId, refreshTrigger }) => {
  const [opdList, setOpdList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);


  const populateTable = (forPagination) => {
    const obj = {
      page: !forPagination ? 1 : page + 1,
      pageSize: rowsPerPage,
      clinicId: 5,
    };
    setLoadingSpinner(true);
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

  const renderInput = (row, _index, header) => {
    if (header === "status") {
      const status = row["status"]?.trim();
      return (
        <span
          className={`inline-flex items-center gap-1.5 justify-center px-4 py-1 uppercase text-xs font-medium rounded-2xl min-w-[110px] ${
            STATUS_PILL[status] ||
            "text-gray-600 border border-gray-300 bg-gray-100"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              STATUS_DOT[status] || "bg-gray-400"
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
                className="text-indigo-600"
              />
            ) : row.origin === "app" ? (
              <SmartphoneIcon
                style={{ fontSize: "18px" }}
                className="text-emerald-600"
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
    <div className="h-full overflow-y-auto px-4 no-scrollbar">
      <style>{`
        *, body {  box-sizing: border-box; }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .pulse-dot { animation: pulse-dot 1.5s infinite; }
      `}</style>
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-4 pt-4 shrink-0">
        <div>
          <h1 className="text-[20px] font-bold text-[#003d33] tracking-tighter leading-none">
            OPD Bookings
          </h1>
          <p className="text-gray-400 text-[10px] font-normal mt-1">
            Manage outpatient department consultations.
          </p>
        </div>
        {/* <CommonButton
          className="bg-[#003d33] text-white text-[10.5px] shadow-sm transition-all active:scale-95"
          label="+ New OPD Booking"
        /> */}
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden h-full">
        <div className="flex-1 transition-all duration-300">
          {loadingSpinner && (
            <div className="my-40 flex justify-center">
              <LoadingSpinner />
            </div>
          )}

          {opdList?.length > 0 ? (
            <div className="px-4 pb-4 h-full">
              <CommonPaginationTable
                dataResult={opdList}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                count={totalCount}
                setCount={setTotalCount}
                setRowsPerPage={setRowsPerPage}
                tableClass={"h-[460px] border cursor-pointer"}
                setDataResult={setOpdList}
                populateTable={populateTable}
                handleSelectedRow={(row) => {
                  setSelectedRow(row);
                  if (onSelect) onSelect(row);
                }}
                customRowBgColor={"#cde8b8"}
                renderInput={renderInput}
                editableColumns={["status", "customer", "origin"]}
                removeHeaders={["paymentStatus", "amount"]}
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

        <div className="w-[350px] xl:w-[400px] h-full hidden lg:block shrink-0">
          {selectedRow ? (
            <div className="h-full animate-in fade-in slide-in-from-right duration-300">
              <OPDDetailView
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

export default OPDBookings;
