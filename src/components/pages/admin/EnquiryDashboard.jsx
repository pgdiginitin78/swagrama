import { useState } from "react";
import { motion } from "framer-motion";
import CommonButton from "../../common/button/CommonButton";
import { useForm } from "react-hook-form";
import SearchDropdown from "../../common/formFields/SearchDropdown";
import DropdownField from "../../common/formFields/DropdownField";
import DatePickerField from "../../common/formFields/DatePickerField";
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const enquiriesData = [
  {
    id: "ENQ-1024",
    date: "Oct 24, 2023",
    time: "02:45 PM",
    enquiryType: "Membership",
    enquirySubType: "Premium Gold",
    name: "Arjun Malhotra",
    city: "Mumbai",
    phone: "+91 98765 43210",
    status: "INTERESTED",
    nextFollowUp: "Oct 26, 2023",
    latestNote:
      "Interested in dual-city access. Needs a follow-up call regarding the meditation retreat inclusive package by tomorrow.",
    noteBy: "SIDDHARTH",
    noteAgo: "2H AGO",
  },
  {
    id: "ENQ-1023",
    date: "Oct 24, 2023",
    time: "11:20 AM",
    enquiryType: "Community",
    enquirySubType: "Yoga Retreat",
    name: "Priya Sharma",
    city: "Pune",
    phone: "+91 97654 32100",
    status: "NEW",
    nextFollowUp: "Oct 25, 2023",
    latestNote:
      "Interested in group yoga sessions. Wants details on weekend packages.",
    noteBy: "RAHUL",
    noteAgo: "5H AGO",
  },
  {
    id: "ENQ-1022",
    date: "Oct 23, 2023",
    time: "05:15 PM",
    enquiryType: "Community",
    enquirySubType: "Farm Stay",
    name: "Vikram Singh",
    city: "Bengaluru",
    phone: "+91 96543 21000",
    status: "PENDING",
    nextFollowUp: null,
    latestNote: "Looking for a weekend farm stay for family. Budget: ₹15,000.",
    noteBy: "ANANYA",
    noteAgo: "1D AGO",
  },
];

const enquiryTypeOptions = [
  "All Types",
  "Membership",
  "Community",
  "OPD",
  "Wellness",
  "Stay",
];


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
      {/* Detail Header */}
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

      {/* Detail Content */}
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
        <section>
          <p className="text-[6px] font-bold text-[#b0bba5] uppercase tracking-widest mb-1">
            Applicant Info
          </p>
          <div className="flex items-center gap-1.5 p-1.5 rounded-md bg-[#f4f9f1] border border-[#e0ead6]">
            <Avatar name={enquiry.name} size={28} />
            <div className="min-w-0">
              <div className="text-[10px] font-bold text-[#1a2a0f] leading-tight truncate">
                {enquiry.name}
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
              className={`inline-block text-[9px] font-black px-2 py-0.5 rounded ${styles[enquiry.enquiryType] || "bg-gray-100 text-gray-700"}`}
            >
              {enquiry.enquiryType}
            </span>
          </div>
          <div className="rounded-xl p-2 bg-[#f4f9f1] border border-[#e0ead6]">
            <p className="text-[7px] font-bold text-[#9aa090] uppercase tracking-wider mb-1">
              Service
            </p>
            <p className="text-[10px] font-extrabold text-[#1a2a0f] leading-tight">
              {enquiry.enquirySubType}
            </p>
          </div>
        </section>

        <section>
          <p className="text-[6px] font-bold text-[#b0bba5] uppercase tracking-widest mb-1">
            Latest Note
          </p>
          <div className="rounded-md p-2 bg-[#f0f9eb] border border-[#cde8b8]">
            <p className="text-[9px] text-[#3a4a30] italic leading-tight">
              "{enquiry.latestNote}"
            </p>
            <p className="mt-1 text-[6px] font-semibold text-[#b0bba5] uppercase tracking-wider">
              Added by {enquiry.noteBy} · {enquiry.noteAgo}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-2">
          <div className="rounded-lg p-1.5 bg-[#f4f9f1] border border-[#e0ead6]">
            <p className="text-[7px] font-bold text-[#9aa090] uppercase tracking-wider mb-1">
              Status
            </p>
            <StatusBadge status={enquiry.status} />
          </div>
          <div className="rounded-md p-1.5 bg-[#f4f9f1] border border-[#e0ead6]">
            <p className="text-[6px] font-bold text-[#b0bba5] uppercase tracking-wider mb-1">
              Follow-Up
            </p>
            <p className="text-[8px] font-bold text-[#1a2a0f] leading-tight">
              {enquiry.nextFollowUp || "—"}
            </p>
          </div>
        </section>
      </div>

      {/* Detail Actions */}
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
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All Types");
  const [filterService, setFilterService] = useState("All Services");
  const [filterStatus, setFilterStatus] = useState("All Statuses");
  const [filterDate, setFilterDate] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState(enquiriesData[0]);

  const { control, reset, watch } = useForm({
    defaultValues: {
      fullName: "",
    },
    mode: "onChange",
  });

  const filtered = enquiriesData.filter((e) => {
    const q = search.toLowerCase();
    if (
      q &&
      !e.name.toLowerCase().includes(q) &&
      !e.id.toLowerCase().includes(q)
    )
      return false;
    if (filterType !== "All Types" && e.enquiryType !== filterType)
      return false;
    if (filterService !== "All Services" && e.enquirySubType !== filterService)
      return false;
    if (filterStatus !== "All Statuses" && e.status !== filterStatus)
      return false;
    return true;
  });

  const resetFilters = () => {
    setFilterType("All Types");
    setFilterService("All Services");
    setFilterStatus("All Statuses");
    setFilterDate("");
    setSearch("");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className="flex flex-col h-screen  overflow-hidden pt-3"
    >
      <header className="flex-shrink-0  border-b border-[#eef0ea] shadow-sm z-20">
        <div className="px-3 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h1 className="text-xl  font-semibold text-[#1E5151] tracking-tight leading-none py-1">
              ENQUIRIES
            </h1>
            <p className="text-[12px]  text-[#b0bba5] mt-0.5  tracking-wider">
              Track and manage all incoming website enquiries
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1.5  px-2 py-1 rounded-md min-w-[250px]">
              <SearchDropdown
                control={control}
                name="searchEnquiry"
                placeholder="Search Enquiries"
                searchIcon={true}
              />
            </div>
            <CommonButton
              type="button"
              icon={<FileDownloadIcon/>}
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

        {/* --- FILTERS --- */}
        <div className="px-4 pb-2  gap-2  grid grid-cols-5">
          <div>
            <DropdownField
              control={control}
              name="enquiryType"
              options={enquiryTypeOptions}
              placeholder="Enquiry by Type"
            />
          </div>
          <div>
            <DropdownField
              control={control}
              name="serviceType"
              options={enquiryTypeOptions}
              placeholder="Service Type"
            />
          </div>
          <div>
            <DatePickerField
              control={control}
              name="enquiryDate"
              label="Enquiry Date"
            />
          </div>

          <div>
            <DropdownField
              control={control}
              name="status"
              options={enquiryTypeOptions}
              placeholder="Status"
            />
          </div>
          <div className="flex space-x-2">
            <CommonButton
              type="button"
              label="Reset"
              className="border border-[#1E5151] text-[#1E5151]"
              onClick={resetFilters}
            />
            <CommonButton
              type="button"
            icon={<RefreshIcon/>}
              className="border border-[#1E5151] text-[#1E5151]"
              onClick={resetFilters}
            />
          </div>
        </div>
      </header>

      {/* --- BODY --- */}
      <main className="flex-1 overflow-hidden flex flex-col lg:flex-row p-2 md:p-3 gap-3">
        {/* Table Container */}
        <section className="flex-1 bg-white rounded-lg border border-[#eef0ea] overflow-hidden flex flex-col shadow-sm">
          <div className="flex-1 overflow-auto scrollbar-hide">
            <table className="w-full border-collapse min-w-[500px]">
              <thead className="sticky top-0 bg-[#fbfcfb] z-10 border-b border-[#eef0ea]">
                <tr>
                  {["ID", "SERVICE", "APPLICANT", "STATUS", ""].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left text-[8px] font-bold text-[#b0bba5] uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f2ec]">
                {filtered.map((enq) => {
                  const isSel = selectedEnquiry?.id === enq.id;
                  return (
                    <tr
                      key={enq.id}
                      onClick={() => setSelectedEnquiry(enq)}
                      className={`group cursor-pointer transition-colors ${
                        isSel ? "bg-[#f4f9f1]" : "hover:bg-[#fbfcfb]"
                      }`}
                    >
                      <td className="px-3 py-2">
                        <div className="text-[10px] font-bold text-[#2d5a1a]">
                          #{enq.id}
                        </div>
                        <div className="text-[8px] font-bold text-[#b0bba5] mt-0.5 uppercase">
                          {enq.date}
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <TypeBadge type={enq.enquiryType} />
                        <div className="text-[9px] font-bold text-[#5a6652] mt-0.5 leading-tight">
                          {enq.enquirySubType}
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-1.5">
                          <Avatar name={enq.name} size={24} />
                          <div>
                            <div className="text-[10px] font-bold text-[#1a2a0f]">
                              {enq.name}
                            </div>
                            <div className="flex items-center gap-1 text-[8px] font-bold text-[#b0bba5] mt-0.5 uppercase tracking-tight">
                              {enq.city}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <StatusBadge status={enq.status} />
                        {enq.nextFollowUp && (
                          <div className="text-[8px] font-bold text-[#3d6b1f] mt-1 bg-[#d4edc9]/30 px-1 py-0.5 rounded w-fit">
                            {enq.nextFollowUp}
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEnquiry(enq);
                          }}
                          className="w-6 h-6 flex items-center justify-center rounded border border-[#e0ead6] bg-white text-[#b0bba5] hover:text-[#2d5a1a] hover:bg-[#f1f5ef] transition-all"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <circle cx="12" cy="12" r="1.5" />
                            <circle cx="18" cy="12" r="1.5" />
                            <circle cx="6" cy="12" r="1.5" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-[#f1f5ef] flex items-center justify-center mb-4">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="#b0bba5"
                    strokeWidth="2.5"
                  >
                    <circle cx="9" cy="9" r="6" />
                    <line
                      x1="17"
                      y1="17"
                      x2="13.5"
                      y2="13.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="text-base font-black text-[#1a2a0f]">
                  No Enquiries Found
                </p>
                <p className="text-[11px] font-bold text-[#9aa090] mt-1.5 uppercase tracking-wider">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <footer className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 border-t border-[#eef0ea] bg-[#fbfcfb]">
            <p className="text-[10px] font-black text-[#b0bba5] uppercase tracking-wider">
              1–10 of 3 entries
            </p>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 flex items-center justify-center rounded border border-[#e0ead6] text-[#b0bba5] hover:bg-white transition-colors">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="13 16 7 10 13 4" />
                </svg>
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded bg-[#2d5a1a] text-white text-[10px] font-black">
                1
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-[#e0ead6] text-[#b0bba5] hover:bg-white transition-colors text-[10px] font-black">
                2
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-[#e0ead6] text-[#b0bba5] hover:bg-white transition-colors">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="7 4 13 10 7 16" />
                </svg>
              </button>
            </div>
          </footer>
        </section>

        {/* --- DETAIL PANEL --- */}
        {selectedEnquiry && (
          <aside className="w-full lg:w-[240px] xl:w-[260px] h-full flex-shrink-0 animate-in slide-in-from-right duration-300">
            <div className="bg-white h-full rounded-lg border border-[#eef0ea] shadow-md overflow-hidden">
              <DetailPanel
                enquiry={selectedEnquiry}
                onClose={() => setSelectedEnquiry(null)}
              />
            </div>
          </aside>
        )}
      </main>
    </motion.div>
  );
};

export default EnquiryDashboard;
