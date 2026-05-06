import React, { useEffect, useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import AddNewService from "./AddNewService";
import { GetTherapyNameByServiceCategory } from "../../../../services/healingServices/detoxTherapyServices/DetoxTherapyServices";
import LoadingSpinner from "../../../common/table/LoadingSpinner";
import CommonPaginationTable from "../../../common/table/CommonPaginationTable";

export default function TherapyMaster() {
  const [openTherapyModal, setOpenTherapyModal] = useState(false);
  const [therapyList, setTherapyList] = useState([]);
  const [page, setPage] = useState(0);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const populateTable = (forPagination) => {
    setLoadingSpinner(true);
    GetTherapyNameByServiceCategory(
      5,
      0,
      !forPagination ? 1 : page + 1,
      rowsPerPage,
    )
      .then((res) => {
        if (forPagination) {
          setTherapyList((prevData) => [...prevData, ...res.data.data.data]);
        } else {
          setTherapyList(res.data.data.data);
        }
        setCount(res.data.data.totalRecords);

        setLoadingSpinner(false);
      })
      .catch((error) => {
        setLoadingSpinner(false);
      });
  };

  useEffect(() => {
    populateTable();
  }, []);

  console.log("therapyList", therapyList);

  return (
    <div>
      <div className="w-full p-5">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-semibold text-2xl text-ayuMid">
            Service /Therapy Master
          </h1>
          <CommonButton
            label={"Create Service"}
            onClick={() => setOpenTherapyModal(true)}
            className={"border border-ayuMid text-ayuMid bg-green-100"}
          />
        </div>

        <div className="my-5">
          {loadingSpinner && (
            <div className="my-40 text-center flex-1">
              <LoadingSpinner />
            </div>
          )}
          {therapyList?.length > 0 ? (
            <div className="flex-1">
              <CommonPaginationTable
                dataResult={therapyList}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                count={count}
                setCount={setCount}
                setRowsPerPage={setRowsPerPage}
                tableClass={"h-[430px] border cursor-pointer"}
                setDataResult={setTherapyList}
                populateTable={populateTable}
                highlightRow={false}
                removeHeaders={[
                  "serviceGroupId",
                  "serviceId",
                  "serviceImage",
                  "doctorId",
                  "isDouble",
                  "serviceRoomIds",
                ]}
                // renderInput={renderInput}
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

      {openTherapyModal && (
        <AddNewService
          open={openTherapyModal}
          handleClose={() => setOpenTherapyModal(false)}
          populateTable={populateTable}
        />
      )}
    </div>
  );
}
