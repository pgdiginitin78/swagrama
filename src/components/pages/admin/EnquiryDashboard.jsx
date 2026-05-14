import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommonButton from "../../common/button/CommonButton";
import { useForm } from "react-hook-form";
import SearchDropdown from "../../common/formFields/SearchDropdown";
import DropdownField from "../../common/formFields/DropdownField";
import DatePickerField from "../../common/formFields/DatePickerField";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import {
  GetEnquiryByTypeDropdown,
  GetEnquiryList,
  GetServiceTypeDropdown,
  SearchEnquiry,
} from "../../../services/adminDashboard/AdminDashboardServices";
import CommonPaginationTable from "../../common/table/CommonPaginationTable";
import LoadingSpinner from "../../common/table/LoadingSpinner";
import { format, isValid } from "date-fns";

const Avatar = ({ name, size = 32 }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="flex-shrink-0 rounded-full flex items-center justify-center font-bold"
      style={{
        width: size,
        height: size,
        backgroundColor: "#cde8b8",
        color: "#2d5a1a",
        fontSize: size >= 40 ? 12 : 9,
      }}
    >
      {initials}
    </div>
  );
};

const TypeBadge = ({ type }) => {
  const styles = {
    Membership: "bg-[#dcf0d3] text-[#1e5c0a]",
    Community: "bg-[#e8e0ff] text-[#5b3db8]",
    OPD: "bg-[#dbeafe] text-[#1e40af]",
    Wellness: "bg-[#ccfbf1] text-[#065f46]",
    Stay: "bg-[#fef3c7] text-[#92400e]",
  };
  const cls = styles[type] || "bg-[#f1f5f9] text-[#475569]";
  return (
    <span
      className={`inline-block font-bold tracking-wider px-1.5 py-0.5 rounded text-[8px] uppercase ${cls}`}
    >
      {type}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    INTERESTED: {
      bg: "bg-[#e0f2fe]",
      text: "text-[#0369a1]",
      dot: "bg-[#38bdf8]",
    },
    NEW: { bg: "bg-[#f1f5f9]", text: "text-[#475569]", dot: "bg-[#94a3b8]" },
    PENDING: {
      bg: "bg-[#fff7ed]",
      text: "text-[#c2410c]",
      dot: "bg-[#fb923c]",
    },
    CONVERTED: {
      bg: "bg-[#dcfce7]",
      text: "text-[#166534]",
      dot: "bg-[#4ade80]",
    },
    LOST: { bg: "bg-[#fee2e2]", text: "text-[#991b1b]", dot: "bg-[#f87171]" },
  };
  const s = styles[status] || styles.NEW;
  return (
    <span
      className={`inline-flex items-center gap-1 font-bold px-1 py-0.5 rounded text-[8px] ${s.bg} ${s.text}`}
    >
      <span className={`w-0.5 h-0.5 rounded-full flex-shrink-0 ${s.dot}`} />
      {status}
    </span>
  );
};

const DetailPanel = ({ enquiry, onClose }) => {
  const styles = {
    Membership: "bg-[#dcf0d3] text-[#1e5c0a]",
    Community: "bg-[#e8e0ff] text-[#5b3db8]",
    OPD: "bg-[#dbeafe] text-[#1e40af]",
    Wellness: "bg-[#ccfbf1] text-[#065f46]",
    Stay: "bg-[#fef3c7] text-[#92400e]",
  };
  return (
    <div className="flex flex-col h-full w-full bg-white">
      <div className="flex-shrink-0 p-3 border-b border-[#eef0ea]">
        <p className="text-[6px] font-bold text-[#b0bba5] uppercase tracking-widest mb-0.5">
          Enquiry Detail
        </p>
        <div className="flex items-center justify-between">
          <h3 className="text-[13px] font-bold text-[#1a2a0f] leading-none">
            #{enquiry.id}
          </h3>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded border border-[#e5ebe0] bg-white flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
          >
            <CloseIcon sx={{ fontSize: 14 }} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 no-scrollbar">
        <section>
          <p className="text-[6px] font-bold text-[#b0bba5] uppercase tracking-widest mb-1">
            Applicant Info
          </p>
          <div className="flex items-center gap-2 p-2 rounded-md bg-[#f4f9f1] border border-[#e0ead6]">
            <Avatar name={enquiry.applicant} size={32} />
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-[#1a2a0f] leading-tight truncate">
                {enquiry.applicant}
              </div>
              <div className="text-[8px] text-[#b0bba5] mt-0.5 leading-tight">
                {enquiry.phone}
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-2">
          <div className="rounded-xl p-2 bg-[#f4f9f1] border border-[#e0ead6]">
            <p className="text-[7px] font-bold text-[#9aa090] uppercase tracking-wider mb-1">
              Type
            </p>
            <span
              className={`inline-block text-[9px] font-black px-2 py-0.5 rounded ${styles[enquiry?.enquiryType] || "bg-gray-100 text-gray-700"}`}
            >
              {enquiry?.enquiryType}
            </span>
          </div>
          <div className="rounded-xl p-2 bg-[#f4f9f1] border border-[#e0ead6]">
            <p className="text-[7px] font-bold text-[#9aa090] uppercase tracking-wider mb-1">
              Service
            </p>
            <p className="text-[10px] font-extrabold text-[#1a2a0f] leading-tight">
              {enquiry?.service}
            </p>
          </div>
        </section>

        <section>
          <p className="text-[6px] font-bold text-[#b0bba5] uppercase tracking-widest mb-1">
            Latest Note
          </p>
          <div className="rounded-md p-2 bg-[#f0f9eb] border border-[#cde8b8]">
            <p className="text-[9px] text-[#3a4a30] italic leading-tight">
              "{enquiry?.latestNote}"
            </p>
            <p className="mt-1 text-[6px] font-semibold text-[#b0bba5] uppercase tracking-wider">
              Added by {enquiry?.noteBy} · {enquiry?.noteAgo}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-2">
          <div className="rounded-lg p-2 bg-[#f4f9f1] border border-[#e0ead6]">
            <p className="text-[7px] font-bold text-[#9aa090] uppercase tracking-wider mb-1">
              Status
            </p>
            <StatusBadge status={enquiry?.status} />
          </div>
          <div className="rounded-md p-2 bg-[#f4f9f1] border border-[#e0ead6]">
            <p className="text-[6px] font-bold text-[#b0bba5] uppercase tracking-wider mb-1">
              Follow-Up
            </p>
            <p className="text-[8px] font-bold text-[#1a2a0f] leading-tight">
              {enquiry?.nextFollowUp || "—"}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

const MobileDetailSheet = ({ enquiry, onClose }) => (
  <AnimatePresence>
    {enquiry && (
      <>
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
        <motion.div
          key="sheet"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white rounded-t-2xl border-t border-green-200 max-h-[85vh] overflow-hidden flex flex-col"
        >
          <div className="flex-shrink-0 w-10 h-1 bg-gray-300 rounded-full mx-auto mt-2 mb-1" />
          <div className="flex-1 overflow-hidden">
            <DetailPanel enquiry={enquiry} onClose={onClose} />
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const FilterDrawer = ({ open, onClose, children }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          key="filter-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 z-40 sm:hidden"
          onClick={onClose}
        />
        <motion.div
          key="filter-drawer"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="fixed top-0 left-0 right-0 z-50 sm:hidden bg-white rounded-b-2xl shadow-xl p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-bold text-[#1E5151]">Filters</span>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500"
            >
              <CloseIcon sx={{ fontSize: 16 }} />
            </button>
          </div>
          {children}
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const EnquiryDashboard = () => {
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [enquiryTypeOptions, setEnquiryTypeOptions] = useState([]);
  const [enquiryServiceOptions, setEnquiryServiceOptions] = useState([]);
  const [enquiryList, setEnquiryList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [enquiryOptions, setEnquiryOptions] = useState([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const { control, watch, reset } = useForm({
    defaultValues: {
      searchEnquiry: null,
      enquiryType: null,
      serviceType: null,
      status: null,
      enquiryDate: null,
    },
    mode: "onChange",
  });

  const searchEnquiry = watch("searchEnquiry");
  const enquiryType = watch("enquiryType");
  const serviceType = watch("serviceType");
  const enquiryDate = watch("enquiryDate");
  const status = watch("status");

  const populateTable = (newPage) => {
    const currentPage = typeof newPage === "number" ? newPage : page;
    const obj = {
      page: currentPage + 1,
      size: rowsPerPage,
      EnquiryName: searchEnquiry !== null ? searchEnquiry?.label : null,
      EnquiryByType: enquiryType !== null ? enquiryType?.label : null,
      ServiceType: serviceType !== null ? serviceType?.label : null,
      EnquiryDate:
        enquiryDate && isValid(new Date(enquiryDate))
          ? format(new Date(enquiryDate), "yyyy-MM-dd")
          : null,
      EnquiryStatus: status !== null ? status?.value : null,
    };
    setLoadingSpinner(true);
    setEnquiryList([]);
    GetEnquiryList(obj)
      .then((res) => {
        setEnquiryList(res.data.data.data);
        setCount(res.data.data.totalRecords);
        setLoadingSpinner(false);
      })
      .catch(() => setLoadingSpinner(false));
  };

  const handleSearchEnquires = (searchString) => {
    if (searchString !== "") {
      SearchEnquiry(searchString)
        .then((res) => {
          if (res.data.data?.length > 0) {
            const filteredData = res?.data?.data?.map((item) => ({
              ...item,
              value: item.enquiryName,
              label: item.enquiryName,
            }));
            setEnquiryOptions(filteredData);
          }
        })
        .catch((err) => err);
    } else {
      setEnquiryOptions([]);
    }
  };

  useEffect(() => {
    GetEnquiryByTypeDropdown()
      .then((res) => {
        if (res.data.statusCode === 200) {
          setEnquiryTypeOptions(
            res.data.data.map((item) => ({ label: item, value: item })),
          );
        }
      })
      .catch((err) => err);

    GetServiceTypeDropdown()
      .then((res) => {
        if (res.data.statusCode === 200) {
          setEnquiryServiceOptions(
            res.data.data.map((item) => ({ label: item, value: item })),
          );
        }
      })
      .catch((err) => err);

    populateTable();
  }, []);

  const filterFields = (
    <>
      <DropdownField
        control={control}
        name="enquiryType"
        dataArray={enquiryTypeOptions}
        placeholder="Enquiry By Type"
        isClearable={true}
      />
      <DropdownField
        control={control}
        name="serviceType"
        dataArray={enquiryServiceOptions}
        placeholder="Service Type"
        isClearable={true}
      />
      <DatePickerField
        control={control}
        name="enquiryDate"
        label="Enquiry Date"
        disableFuture={true}
        disablePast={false}
        inputFormat="dd-MM-yyyy"
        
      />
      <div className="flex gap-2">
        <CommonButton
          type="button"
          searchIcon={true}
          className="flex-1 border border-[#1E5151] text-[#1E5151] hover:bg-emerald-100"
          onClick={() => {
            populateTable();
            setFilterDrawerOpen(false);
          }}
        />
        <CommonButton
          type="button"
          label="Reset"
          className="flex-1 border border-red-500 text-red-500 bg-red-50"
          onClick={() => {
            reset();
            setFilterDrawerOpen(false);
          }}
        />
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full overflow-hidden pt-1 px-2"
    >
      <header className="flex-shrink-0 border-b border-[#eef0ea] shadow-sm z-20">
        <div className="px-3 py-2 flex items-center justify-between gap-2">
          <h1 className="text-lg sm:text-xl font-semibold text-[#1E5151] tracking-tight leading-none py-1">
            Enquiries
          </h1>
          <button
            className="sm:hidden flex items-center gap-1 px-2 py-1.5 rounded-md border border-[#1E5151] text-[#1E5151] text-xs font-semibold"
            onClick={() => setFilterDrawerOpen(true)}
          >
            <FilterListIcon sx={{ fontSize: 16 }} />
            Filters
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <SearchDropdown
              control={control}
              name="searchEnquiry"
              placeholder="Search Enquiries"
              searchIcon={true}
              isClearable={true}
              dataArray={enquiryOptions}
              handleInputChange={handleSearchEnquires}
            />
          </div>
          <div className="flex-1 min-w-0">
            <DropdownField
              control={control}
              name="enquiryType"
              dataArray={enquiryTypeOptions}
              placeholder="Enquiry By Type"
              isClearable={true}
            />
          </div>
          <div className="flex-1 min-w-0">
            <DropdownField
              control={control}
              name="serviceType"
              dataArray={enquiryServiceOptions}
              placeholder="Service Type"
              isClearable={true}
            />
          </div>
          <div className="flex-1 min-w-0">
            <DatePickerField
              control={control}
              name="enquiryDate"
              label="Enquiry Date"
              disableFuture={true}
              disablePast={false}
              inputFormat="dd-MM-yyyy"
            />
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <CommonButton
              type="button"
              searchIcon={true}
              className="border border-[#1E5151] text-[#1E5151] hover:bg-emerald-100"
              onClick={populateTable}
            />
            <CommonButton
              type="button"
              label="Reset"
              className="border border-red-500 text-red-500 bg-red-50"
              onClick={reset}
            />
            {/* <CommonButton
              type="button"
              icon={<FileDownloadIcon />}
              label="Export"
              className="border border-[#1E5151] text-[#1E5151] whitespace-nowrap"
            /> */}
          </div>
        </div>

      </header>

      <FilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
      >
        {filterFields}
      </FilterDrawer>

      <main className="flex-1 overflow-y-auto flex flex-col lg:flex-row  my-2 gap-3 no-scrollbar">
        {loadingSpinner && (
          <div className="my-40 flex justify-center text-center flex-1">
            <LoadingSpinner />
          </div>
        )}

        {enquiryList?.length > 0 ? (
          <div className="flex-1 min-w-0">
            <CommonPaginationTable
              dataResult={enquiryList}
              page={page}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              count={count}
              setCount={setCount}
              setRowsPerPage={setRowsPerPage}
              tableClass="h-[420px] border cursor-pointer"
              setDataResult={setEnquiryList}
              populateTable={populateTable}
              handleSelectedRow={(row) => setSelectedEnquiry(row)}
              customRowBgColor="#cde8b8"
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

        <MobileDetailSheet
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
        />

        {selectedEnquiry ? (
          <aside className="hidden lg:flex w-full lg:w-[240px] xl:w-[290px] h-[425px] flex-shrink-0 bg-white rounded-xl border border-green-200">
            <DetailPanel
              enquiry={selectedEnquiry}
              onClose={() => setSelectedEnquiry(null)}
            />
          </aside>
        ) : (
          <aside className="hidden lg:flex w-full lg:w-[240px] xl:w-[290px] h-[425px] flex-shrink-0 bg-white rounded-xl border border-green-200 items-center justify-center">
            <p className="text-sm text-gray-400 font-medium">
              Select an enquiry
            </p>
          </aside>
        )}
      </main>
    </motion.div>
  );
};

export default EnquiryDashboard;
