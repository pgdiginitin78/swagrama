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
import { GetOtherBookingsList } from "../../../../services/adminDashboard/AdminDashboardServices";
import CommonPaginationTable from "../../../common/table/CommonPaginationTable";
import LoadingSpinner from "../../../common/table/LoadingSpinner";
import CommonButton from "../../../common/button/CommonButton";

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

const OtherBookings = ({ onSelect, selectedId }) => {
  const [otherBookingList, setOtherBookingList] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const populateTable = (forPagination) => {
    let obj = {
      page: !forPagination ? 0 : page,
      pageSize: rowsPerPage,
    };
    setLoadingSpinner(true);
    GetOtherBookingsList(obj)
      .then((res) => {
        if (forPagination) {
          setOtherBookingList((prevData) => [
            ...prevData,
            ...res.data.data.data,
          ]);
        } else {
          setOtherBookingList(res.data.data.data);
        }
        console.log("1234567890",res.data.data);
        
        setTotalCount(res.data.data.totalRecords);
        setLoadingSpinner(false);
      })
      .catch((error) => {
        setLoadingSpinner(false);
      });
  };

  useEffect(() => {
    populateTable();
  }, []);

  console.log("otherBookingList", otherBookingList);

  return (
    <div className="flex-1 flex flex-col  bg-[#fbfcfa]">
      <div className="flex justify-between items-center mb-4 px-4 pt-4 shrink-0">
        <div>
          <h1 className="text-[20px] font-bold text-[#003d33] tracking-tighter uppercase leading-none">
            Other Bookings
          </h1>
          <p className="text-gray-400 text-[10px] font-normal uppercase mt-1">
            Manage miscellaneous gift cards and memberships.
          </p>
        </div>
        <CommonButton
          type="button"
          className="bg-[#003d33] text-white  transition-all active:scale-95"
          label="+ New Entry"
          onClick={() => {}}
        />
      </div>

      {loadingSpinner && (
        <div className="my-40 flex justify-center">
          <LoadingSpinner />
        </div>
      )}

      {otherBookingList?.length > 0 ? (
        <div className="mb-5">
          <CommonPaginationTable
            dataResult={otherBookingList}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            count={totalCount}
            setCount={setTotalCount}
            setRowsPerPage={setRowsPerPage}
            tableClass={"h-[370px] border cursor-pointer"}
            setDataResult={setOtherBookingList}
            populateTable={populateTable}
            handleSelectedRow={(row) => setSelectedRow(row)}
            customRowBgColor={"#cde8b8"}
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

export default OtherBookings;
