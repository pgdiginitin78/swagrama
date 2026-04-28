import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import {
  VisibilityOutlined as ViewIcon,
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { StatusBadge, OriginBadge } from "./BookingComponents";
import CommonButton from "../../../common/button/CommonButton";
import { GetAllOPDBookingList } from "../../../../services/adminDashboard/AdminDashboardServices";
import CommonPaginationTable from "../../../common/table/CommonPaginationTable";
import LoadingSpinner from "../../../common/table/LoadingSpinner";
import ComputerIcon from "@mui/icons-material/Computer";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

const OPDBookings = () => {
  const [opdList, setOpdList] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const populateTable = (forPagination) => {
    let obj = {
      page: !forPagination ? 0 : page,
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
        console.log("1234567890", res.data.data);

        setTotalCount(res.data.data.totalRecords);
        setLoadingSpinner(false);
      })
      .catch((error) => {
        setLoadingSpinner(false);
      });
  };

  const renderInput = (row, index, header) => {
    if (header === "status") {
      const statusStyles = {
        Pending: "text-amber-600 border border-amber-400 bg-amber-100",
        Confirmed: "text-emerald-700 border border-emerald-500 bg-emerald-100",
        Canceled: "text-red-700 border border-red-500 bg-red-100",
        "Check-In": "text-orange-700 border border-orange-400 bg-orange-100",
        Completed: "text-emerald-800 border border-emerald-600 bg-emerald-100",
        "Check-Out": "text-teal-700 border border-teal-500 bg-teal-100",
      };

      const dotStyles = {
        Pending: "bg-amber-400",
        Confirmed: "bg-emerald-500",
        Canceled: "bg-red-500",
        "Check-In": "bg-orange-400",
        Completed: "bg-emerald-600",
        "Check-Out": "bg-teal-500",
      };

      const status = row["status"]?.trim();

      return (
        <span
          className={`inline-flex items-center gap-1.5 justify-center px-4 py-1 text-xs font-medium rounded-2xl min-w-[110px] ${
            statusStyles[status] ||
            "text-gray-600 border border-gray-300 bg-gray-100"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              dotStyles[status] || "bg-gray-400"
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
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white  font-medium">
            {initials}
          </div>
          <span className="font-medium">{row.customer}</span>
        </div>
      );
    }
    if (header === "origin") {
      return (
        <div className="flex items-center gap-2.5">
          <div className=" flex items-center justify-center space-x-2 font-medium">
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
            ) : (
              ""
            )}{" "}
            <span className="text-capitalize">{row.origin}</span>
          </div>
        </div>
      );
    }
    return row[header];
  };



  useEffect(() => {
    populateTable();
  }, []);

  console.log("opdList", opdList);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#fbfcfa]">
      <div className="flex justify-between items-center mb-4 px-4 pt-4 shrink-0">
        <div>
          <h1 className="text-[20px] font-bold text-[#003d33] tracking-tighter uppercase leading-none">
            OPD Bookings
          </h1>
          <p className="text-gray-400 text-[10px] font-normal  mt-1">
            Manage outpatient department consultations.
          </p>
        </div>
        <CommonButton
          className="bg-[#003d33] text-white text-[10.5px] shadow-sm transition-all active:scale-95"
          label="+ New OPD Booking"
        />
      </div>

      {loadingSpinner && (
        <div className="my-40 flex justify-center">
          <LoadingSpinner />
        </div>
      )}

      {opdList?.length > 0 ? (
        <div className="mb-5">
          <CommonPaginationTable
            dataResult={opdList}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            count={totalCount}
            setCount={setTotalCount}
            setRowsPerPage={setRowsPerPage}
            tableClass={"h-[370px] border cursor-pointer"}
            setDataResult={setOpdList}
            populateTable={populateTable}
            handleSelectedRow={(row) => setSelectedRow(row)}
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
              No Records Found<span className="animate-pulse">...</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OPDBookings;
