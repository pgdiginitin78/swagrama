import React from "react";
import { Drawer, IconButton } from "@mui/material";
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

const MembershipUpgradeDrawer = ({ tier, open, onClose, currentRank }) => {
  if (!tier) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: "100%", maxWidth: 400 } }}
    >
      <div className="flex flex-col h-full bg-white">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <p className="text-sm font-black text-gray-900">Upgrade Plan</p>
          <IconButton onClick={onClose} size="small">
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          <div
            className={`bg-gradient-to-br ${tier.color} rounded-2xl p-6 text-white`}
          >
            <div className="flex items-center gap-2 mb-2">
              {tier.icon}
              <p className="text-sm font-black">{tier.name}</p>
            </div>
            <p className="text-3xl font-black">{tier.price}</p>
            <p className="text-xs opacity-70 mt-1">
              per year · cancel anytime
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 sm:p-5">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">
              All Benefits Included
            </p>
            <div className="space-y-3">
              {tier.perks.map((p, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircleIcon
                    sx={{
                      color: "#4a7c2c",
                      fontSize: 15,
                      marginTop: "1px",
                      flexShrink: 0,
                    }}
                  />
                  <span className="text-xs font-semibold text-gray-700">
                    {p}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
            <p className="text-[10px] font-black text-amber-700">
              Upgrading from {currentRank}
            </p>
            <p className="text-[11px] text-amber-600 font-medium mt-1">
              You'll keep all existing benefits and gain everything listed
              above.
            </p>
          </div>
        </div>
        <div className="p-4 sm:p-5 border-t border-gray-100 space-y-3 shrink-0">
          <button className="w-full py-3 bg-[#0f1f0f] text-white font-bold text-xs rounded-xl hover:bg-[#1a3a1a] active:scale-95 transition-all">
            Confirm Upgrade to {tier.name}
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 text-gray-500 font-bold text-xs rounded-xl hover:bg-gray-50 transition-all"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default MembershipUpgradeDrawer;
