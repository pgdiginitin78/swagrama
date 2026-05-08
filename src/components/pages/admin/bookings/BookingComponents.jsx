import {
  Laptop as AdminIcon,
  Smartphone as MobileIcon,
  Language as WebIcon,
} from "@mui/icons-material";

export const StatusBadge = ({ status }) => {
  const styles = {
    CONFIRMED: "bg-[#e7f5ed] text-[#3e9d6d]",
    "CHECKED-IN": "bg-[#3b4b3e] text-[#e7f5ed]",
    RESCHEDULED: "bg-[#e2e8f0] text-[#718096]",
  };

  return (
    <span
      className={`px-2.5 sm:px-3 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold tracking-tight ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};

export const PaymentStatusBadge = ({ status }) => {
  const styles = {
    PAID: "bg-[#e7f5ed] text-[#3e9d6d]",
    "PARTIALLY PAID": "bg-[#f4f7d4] text-[#8ea62a]",
    UNPAID: "bg-[#feeded] text-[#e53e3e]",
  };

  return (
    <span
      className={`px-2.5 sm:px-3 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold tracking-tight ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};

export const OriginBadge = ({ origin }) => {
  const icons = {
    WEBSITE: <WebIcon className="!text-[10px]" />,
    MOBILE: <MobileIcon className="!text-[10px]" />,
    ADMIN: <AdminIcon className="!text-[10px]" />,
  };

  return (
    <div className="flex items-center gap-1 text-[8px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-wider">
      {icons[origin]}
      <span>{origin}</span>
    </div>
  );
};
export const EmptyDetailView = () => (
  <div className="flex flex-col items-center justify-center w-full h-[500px] p-4 sm:p-6 text-center bg-[#fcfcf9] border rounded-lg">
    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white flex items-center justify-center mb-3 sm:mb-4 shadow-sm border border-gray-100">
      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-dashed border-gray-100" />
    </div>
    <p className="text-[8px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
      Active Selection
    </p>
    <h3 className="text-[16px] sm:text-[18px] font-bold text-[#002a24]">
      Booking Details
    </h3>
    <p className="text-[10px] text-gray-400 mt-2">
      Select a row from the table to view full details.
    </p>
  </div>
);
