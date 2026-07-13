import React from "react";
import { motion } from "framer-motion";
import { History as HistoryIcon } from "@mui/icons-material";
import ActivityCard from "./ActivityCard";

const GenericSection = ({ title, icon, data, setSelectedItem }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-5"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2.5 bg-[#f0fdf4] text-[#4a7c2c] rounded-xl shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight truncate">
              {title}
            </h2>
            <p className="text-[11px] text-gray-400 font-medium">
              {data.length} records
            </p>
          </div>
        </div>
    
      </div>
      <div className="max-h-[650px] overflow-y-auto pr-1 group custom-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 pb-6">
          {data.map((item, i) => (
            <ActivityCard 
              key={i} 
              data={item} 
              onClick={setSelectedItem}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GenericSection;
