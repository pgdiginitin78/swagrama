import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CommonButton from "../../common/button/CommonButton";
import { useForm } from "react-hook-form";
import SearchDropdown from "../../common/formFields/SearchDropdown";
import DropdownField from "../../common/formFields/DropdownField";
import DatePickerField from "../../common/formFields/DatePickerField";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  GetEnquiryByTypeDropdown,
  GetEnquiryList,
  GetServiceTypeDropdown,
  SearchEnquiry,
} from "../../../services/adminDashboard/AdminDashboardServices";
import CommonPaginationTable from "../../common/table/CommonPaginationTable";
import LoadingSpinner from "../../common/table/LoadingSpinner";
import { format } from "date-fns";

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
    <div className="flex flex-col h-full w-full bg-white animate-in slide-in-from-right duration-300">
      <div className="flex-shrink-0 p-2 border-b border-[#eef0ea]">
        <p className="text-[6px] font-bold text-[#b0bba5] uppercase tracking-widest mb-0.5">
          Enquiry Detail
        </p>
        <div className="flex items-center justify-between">
          <h3 className="text-[13px] font-bold text-[#1a2a0f] leading-none">
            #{enquiry.id}
          </h3>
          <button
            onClick={onClose}
            className="w-4 h-4 rounded border border-[#e5ebe0] bg-white flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors lg:hidden"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="12" y1="4" x2="4" y2="12" />
              <line x1="4" y1="4" x2="12" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2 no-scrollbar">
        <section>
          <p className="text-[6px] font-bold text-[#b0bba5] uppercase tracking-widest mb-1">
            Applicant Info
          </p>
          <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-[#f4f9f1] border border-[#e0ead6]">
            <Avatar name={enquiry.applicant} size={28} />
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
          <div className="rounded-lg p-1.5 bg-[#f4f9f1] border border-[#e0ead6]">
            <p className="text-[7px] font-bold text-[#9aa090] uppercase tracking-wider mb-1">
              Status
            </p>
            <StatusBadge status={enquiry?.status} />
          </div>
          <div className="rounded-md p-1.5 bg-[#f4f9f1] border border-[#e0ead6]">
            <p className="text-[6px] font-bold text-[#b0bba5] uppercase tracking-wider mb-1">
              Follow-Up
            </p>
            <p className="text-[8px] font-bold text-[#1a2a0f] leading-tight">
              {enquiry?.nextFollowUp || "—"}
            </p>
          </div>
        </section>
      </div>
      <div className="flex-shrink-0 p-3 border-t border-[#eef0ea] flex flex-col gap-1.5 bg-[#fcfdfa]">
        <button className="w-full h-8 flex items-center justify-center gap-2 rounded-lg font-bold text-[10px] bg-[#d4edc9] text-[#1e5c0a] hover:bg-[#bfe0b4] transition-colors">
          <svg
            width="10"
            height="10"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M18.3 13.35v2.59a1.73 1.73 0 01-1.89 1.73A17.1 17.1 0 017.6 15a16.86 16.86 0 01-4.72-4.72A17.14 17.14 0 01.23 3.59 1.73 1.73 0 011.95 1.7h2.59a1.73 1.73 0 011.73 1.49c.11.83.31 1.64.6 2.42a1.73 1.73 0 01-.39 1.82L5.38 8.53a13.82 13.82 0 005.18 5.18l1.1-1.1a1.73 1.73 0 011.82-.39c.78.3 1.59.5 2.42.6a1.73 1.73 0 011.4 1.53z" />
          </svg>
          Call Now
        </button>
        <div className="grid grid-cols-2 gap-1.5">
          <button className="flex items-center justify-center gap-1.5 h-8 rounded-lg font-bold text-[10px] bg-white border border-[#e0ead6] text-[#3a4a30] hover:bg-[#f4f9f1] transition-colors">
            <svg
              width="10"
              height="10"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M17.5 8.75a7.5 7.5 0 01-10.6 6.84l-3.9.98.98-3.9A7.5 7.5 0 1117.5 8.75z" />
            </svg>
            WhatsApp
          </button>
          <button className="flex items-center justify-center h-8 rounded-lg font-bold text-[10px] bg-[#2d5a1a] text-white hover:bg-[#1e3d0f] transition-colors">
            Convert
          </button>
        </div>
      </div>
    </div>
  );
};

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

  const { control, watch, reset } = useForm({
    defaultValues: {
      searchEnquiry: null,
      enquiryType: null,
      serviceType: null,
      date: null,
      status: null,
    },
    mode: "onChange",
  });

  const searchEnquiry = watch("searchEnquiry");
  const enquiryType = watch("enquiryType");
  const serviceType = watch("serviceType");
  const date = watch("date");
  const status = watch("status");

  const populateTable = (forPagination) => {
    let obj = {
      page: !forPagination ? 0 : page,
      size: rowsPerPage,
      EnquiryName: searchEnquiry !== null ? searchEnquiry?.label : null,
      EnquiryByType: enquiryType !== null ? enquiryType?.label : null,
      ServiceType: serviceType !== null ? serviceType?.label : null,
      EnquiryDate: date !== null ? format(new Date(date), "yyyy-MM-dd") : null,
      EnquiryStatus: status !== null ? status?.value : null,
    };
    setLoadingSpinner(true);
    GetEnquiryList(obj)
      .then((res) => {
        if (forPagination) {
          setEnquiryList((prevData) => [...prevData, ...res.data.data.data]);
        } else {
          setEnquiryList(res.data.data.data);
        }
        setCount(res.data.data.totalRecords);
        setLoadingSpinner(false);
      })
      .catch((error) => {
        setLoadingSpinner(false);
      });
  };

  const handleSearchEnquires = (searchString) => {
    if (searchString !== "") {
      SearchEnquiry(searchString)
        .then((res) => {
          if (res.data.data?.length > 0) {
            const filteredData = res?.data?.data?.map((item) => {
              return {
                ...item,
                value: item.enquiryName,
                label: item.enquiryName,
              };
            });
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
          const modifiedArr = res.data.data.map((item) => {
            return {
              label: item,
              value: item,
            };
          });
          setEnquiryTypeOptions(modifiedArr);
        }
      })
      .catch((err) => err);
    GetServiceTypeDropdown()
      .then((res) => {
        if (res.data.statusCode === 200) {
          const modifiedArr = res.data.data.map((item) => {
            return {
              label: item,
              value: item,
            };
          });
          setEnquiryServiceOptions(modifiedArr);
        }
      })
      .catch((err) => err);
    populateTable();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full overflow-hidden pt-3"
    >
      <header className="flex-shrink-0  border-b border-[#eef0ea] shadow-sm z-20">
        <div className="px-3 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h1 className="text-xl  font-semibold text-[#1E5151] tracking-tight leading-none py-1">
              Enquiries
            </h1>
            <p className="text-[12px]  text-[#b0bba5] mt-0.5  tracking-wider">
              Track and manage all incoming website enquiries
            </p>
          </div>

          <div className="flex items-center gap-2 ">
            <div className="flex items-center gap-1.5  px-2 py-1 rounded-md min-w-[250px]">
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
            <CommonButton
              type="button"
              icon={<FileDownloadIcon />}
              label="Export"
              className="border border-[#1E5151] text-[#1E5151]"
            />
            <CommonButton
              type="button"
              label="+ Add Enquiry"
              className="bg-[#1E5151] text-white"
            />
          </div>
        </div>

        <div className="px-4 pb-2  gap-2  grid grid-cols-5">
          <div>
            <DropdownField
              control={control}
              name="enquiryType"
              dataArray={enquiryTypeOptions}
              placeholder="Enquiry By Type"
              isClearable={true}
            />
          </div>
          <div>
            <DropdownField
              control={control}
              name="serviceType"
              dataArray={enquiryServiceOptions}
              placeholder="Service Type"
              isClearable={true}
            />
          </div>
          <div>
            <DatePickerField
              control={control}
              name="enquiryDate"
              label="Enquiry Date"
              disablePast={true}
              inputFormat={"dd-MM-yyyy"}
            />
          </div>

          <div>
            <DropdownField
              control={control}
              name="status"
              // options={enquiryTypeOptions}
              placeholder="Status"
              isClearable={true}
            />
          </div>
          <div className="flex space-x-2">
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
          </div>
        </div>
      </header>

      {loadingSpinner && (
        <div className="my-40 text-center flex-1">
          <LoadingSpinner />
        </div>
      )}
      <main className="flex-1 overflow-y-auto flex flex-col lg:flex-row p-2 md:p-3 gap-3 no-scrollbar">
        {enquiryList?.length > 0 ? (
          <div className="flex-1">
            <CommonPaginationTable
              dataResult={enquiryList}
              page={page}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              count={count}
              setCount={setCount}
              setRowsPerPage={setRowsPerPage}
              tableClass={"h-[370px] border cursor-pointer"}
              setDataResult={setEnquiryList}
              populateTable={populateTable}
              handleSelectedRow={(row) => setSelectedEnquiry(row)}
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

        {selectedEnquiry ? (
          <aside className="w-full lg:w-[240px] xl:w-[290px] h-[425px] flex-shrink-0 animate-in slide-in-from-right duration-300 bg-white rounded-xl border border-green-200">
            <DetailPanel
              enquiry={selectedEnquiry}
              onClose={() => setSelectedEnquiry(null)}
            />
          </aside>
        ) : (
          <aside className="w-full lg:w-[240px] xl:w-[290px] h-[425px] flex-shrink-0 animate-in slide-in-from-right duration-300 bg-white rounded-xl border border-green-200">
            <div className="p-4 my-40 text-center">
              <p className="text-sm text-gray-600">No enquiry selected</p>
            </div>
          </aside>
        )}
      </main>
    </motion.div>
  );
};

export default EnquiryDashboard;
