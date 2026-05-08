import { useEffect, useState } from "react";
import { GetOtherBookingsList } from "../../../../services/adminDashboard/AdminDashboardServices";
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

  const populateTable = (newPage) => {
    const currentPage = typeof newPage === "number" ? newPage : page;
    let obj = {
      page: currentPage + 1,
      pageSize: rowsPerPage,
    };
    setLoadingSpinner(true);
    setOtherBookingList([])
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

  useEffect(() => {
    populateTable();
  }, [refreshTrigger]);

  console.log("selectedRow", selectedRow);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center mb-4 px-4 pt-4 shrink-0">
        <div>
          <h1 className="text-[20px] font-bold text-[#003d33] tracking-tighter uppercase leading-none">
            Other Bookings
          </h1>
 
        </div>
        {/* <CommonButton
          type="button"
          className="bg-[#003d33] text-white  transition-all active:scale-95"
          label="+ New Entry"
          onClick={() => {}}
        /> */}
      </div>

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
                handleSelectedRow={(row) => {
                  setSelectedRow(row);
                  if (onSelect) onSelect(row);
                }}
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
