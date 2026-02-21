import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../../common/button/CommonButton";
import { DownloadIcon, PrintIcon } from "../../../common/assets/CommonAssets";

function ViewInvoices() {
  const navigate = useNavigate();

  return (
    <div className="px-4">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="py-2 flex items-center space-x-3 text-[#4D4FEC]"
      >
        <span
          onClick={() => navigate(-1)}
          className="border border-[#4D4FEC] rounded-full p-1 cursor-pointer"
        >
          <ArrowBackIosNewIcon />
        </span>
        <h1 className="font-semibold text-[22px]">View Invoice</h1>
      </motion.div>
      <div className="flex items-center justify-between border rounded-[9px] px-2 py-2 shadow bg-white mb-3">
        <CommonButton
          type="button"
          label="Unpaid"
          className="border rounded-2xl border-[#FF5E5E] text-[#FF5E5E]"
        />
        <div className="flex justify-end items-center space-x-2">
          <CommonButton
            type="button"
            label={
              <div className="flex space-x-2 items-center">
                <PrintIcon />
                <span>Print</span>
              </div>
            }
            className="bg-[#4D4FEC] text-white"
          />
          <CommonButton
            type="button"
            label={
              <div className="flex space-x-2 items-center">
                <div>
                  <DownloadIcon />
                </div>
                <span>Download</span>
              </div>
            }
            className="bg-[#4D4FEC] text-white"
          />
        </div>
      </div>

      <div className="border rounded-[9px] shadow p-5 bg-white mb-5 ">
        <div>

        </div>

      </div>
    </div>
  );
}

export default ViewInvoices;
