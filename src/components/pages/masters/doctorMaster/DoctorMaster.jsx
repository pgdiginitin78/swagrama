import React, { useEffect, useState } from "react";
import AddNewDoctors from "./AddNewDoctors";
import CommonButton from "../../../common/button/CommonButton";
import { GetDoctorList } from "../../../../services/masters/DoctorMasterServices";
import LoadingSpinner from "../../../common/table/LoadingSpinner";
import CommonPaginationTable from "../../../common/table/CommonPaginationTable";
import { Avatar } from "@mui/material";

const STATUS_PILL = {
  Available: "text-emerald-700 border border-emerald-500 bg-emerald-100",
  Unavailable: "text-red-700 border border-red-500 bg-red-100",
};
const STATUS_DOT = {
  Available: "bg-emerald-500",
  Unavailable: "bg-red-500",
};

export default function DoctorMaster() {
  const [openDoctorModal, setOpenDoctorModal] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  const [page, setPage] = useState(0);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);



  const populateTable = (forPagination) => {
    setLoadingSpinner(true);
    GetDoctorList(5, !forPagination ? 1 : page + 1, rowsPerPage)
      .then((res) => {
        if (forPagination) {
          setDoctorList((prevData) => [...prevData, ...res.data.data.data]);
        } else {
          setDoctorList(res.data.data.data);
        }
        setCount(res.data.data.totalRecords);

        setLoadingSpinner(false);
      })
      .catch((error) => {
        setLoadingSpinner(false);
      });
  };

  const renderInput = (row, _index, header) => {
    if (header === "doctorName") {
      return (
        <div className="flex items-center gap-2.5">
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: "13px",
              fontWeight: 600,
              bgcolor: "#f0fdfa",
              color: "#0d9488",
              border: "1px solid #ccfbf1",
            }}
            src={row["photo"] || ""}
          >
            {row["doctorName"]?.trim().charAt(0).toUpperCase()}
          </Avatar>
          <span className="font-medium text-slate-700">
            {row["doctorName"]}
          </span>
        </div>
      );
    }

    if (header === "isAvailable") {
      const isAvailable = row["isAvailable"];
      const statusText = isAvailable ? "Available" : "Unavailable";
      return (
        <span
          className={`inline-flex items-center gap-1.5 justify-center px-4 py-1  text-xs font-medium rounded-2xl min-w-[110px] ${
            STATUS_PILL[statusText] ||
            "text-gray-600 border border-gray-300 bg-gray-100"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              STATUS_DOT[statusText] || "bg-gray-400"
            }`}
          />
          {statusText}
        </span>
      );
    }

    return row[header];
  };

  useEffect(() => {
    populateTable();
  }, []);

  console.log("doctorList", doctorList, count);

  return (
    <div>
      <div className="w-full p-5">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-semibold text-2xl text-ayuMid">Doctor Master</h1>
          <CommonButton
            label={"Create Doctor"}
            onClick={() => setOpenDoctorModal(true)}
            className={"border border-ayuMid text-ayuMid bg-green-100"}
          />
        </div>

        <div className="my-5">
          {loadingSpinner && (
            <div className="my-40 text-center flex-1">
              <LoadingSpinner />
            </div>
          )}
          {doctorList?.length > 0 ? (
            <div className="flex-1">
              <CommonPaginationTable
                dataResult={doctorList}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                count={count}
                setCount={setCount}
                setRowsPerPage={setRowsPerPage}
                tableClass={"h-[430px] border cursor-pointer"}
                setDataResult={setDoctorList}
                populateTable={populateTable}
                highlightRow={false}
                removeHeaders={["sessions", "doctorId"]}
                renderInput={renderInput}
                editableColumns={["isAvailable", "doctorName"]}
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
      </div>

      {openDoctorModal && (
        <AddNewDoctors
          open={openDoctorModal}
          handleClose={() => setOpenDoctorModal(false)}
          populateTable={populateTable}
        />
      )}
    </div>
  );
}
