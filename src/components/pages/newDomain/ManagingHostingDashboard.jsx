import {
  ArrowBackIos as BackIcon,
  Circle as CircleIcon,
  Web as WebIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  CDNIcon,
  ChangePasswordIcon,
  DowngradeIcon,
  LogInIcon,
  RenewDomainIcon,
  UpgradeDomainIcon,
  ChangeDomainIcon,
  DeleteIcon,
  EditIcon,
  EmailAccountIcon,
  ForwardersIcon,
  AutorespondersIcon,
  FileManagerIcon,
  BackupIcon,
  CronJobsIcon,
  MySqlDataBaseIcon,
  PhpMyAdminIcon,
  AwstatsIcon,
  ContentCopyIcon,
  DomainNameIcon,
  PortIcon,
  SpeedOutlinedIcon,
  MemoryOutlinedIcon,
  StorageOutlinedIcon,
  Imunify360ProtectIcon,
  TechnologiesCDNIcon,
  SharedHostingIcon,
} from "../../common/assets/CommonAssets";

import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Divider } from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import SecurityIcon from "@mui/icons-material/Security";
import BoltIcon from "@mui/icons-material/Bolt";
import StorageIcon from "@mui/icons-material/Storage";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import SpeedIcon from "@mui/icons-material/Speed";
import MemoryIcon from "@mui/icons-material/Memory";
import DnsIcon from "@mui/icons-material/Dns";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

const shortcuts = [
  { icon: <EmailAccountIcon />, label: "Email\nAccounts" },
  { icon: <ForwardersIcon />, label: "Forwarders" },
  { icon: <AutorespondersIcon />, label: "Autoresponders" },
  { icon: <FileManagerIcon />, label: "File Manager" },
  { icon: <BackupIcon />, label: "Backup" },
  { icon: <CronJobsIcon />, label: "Cron Jobs" },
  { icon: <MySqlDataBaseIcon />, label: "MySQL®\nDatabases" },
  { icon: <PhpMyAdminIcon />, label: "php\nMyAdmin" },
  { icon: <AwstatsIcon />, label: "Awstats" },
];

const initialEmails = ["aakash@nowlooksok3.com", "ankit@nowlooksok3.com"];

const nameservers = ["ans1.quickened.online ()", "ns2.quickened.online ()"];

const COLORS_DISK = ["#3b3bf5", "#dde0ff"];
const COLORS_BW = ["#3b3bf5", "#dde0ff"];

const diskData = [
  { name: "Used", value: 450 },
  { name: "Free", value: 30720 - 450 },
];

const bwData = [
  { name: "Used", value: 450 },
  { name: "Free", value: 30720 - 450 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.4, ease: "easeOut" },
  }),
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const btnVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.2 } },
  tap: { scale: 0.97 },
};

function OutlineButton({ icon: Icon, label, color = "#3b3bf5" }) {
  return (
    <motion.button
      variants={btnVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors"
      style={{ borderColor: color, color: color, background: "white" }}
    >
      <Icon style={{ fontSize: 18 }} className="animate-spin" />
      {label}
    </motion.button>
  );
}

function ActionButton({ icon: Icon, label }) {
  return (
    <motion.button
      variants={btnVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#c5c8f0] text-[#3b3bf5] text-sm font-medium bg-white flex-1 justify-center min-w-[120px]"
    >
      <Icon style={{ fontSize: 18 }} />
      <span className="whitespace-nowrap">{label}</span>
    </motion.button>
  );
}

function UsageCard({
  title,
  percent,
  usedLabel,
  totalLabel,
  data,
  colors,
  lastUpdated,
}) {
  const CustomLabel = ({ cx, cy }) => (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
      <tspan
        x={cx}
        dy="-0.3em"
        style={{ fontSize: 22, fontWeight: 700, fill: "#3b3bf5" }}
      >
        {percent}%
      </tspan>
      <tspan x={cx} dy="1.5em" style={{ fontSize: 12, fill: "#888" }}>
        Used
      </tspan>
    </text>
  );

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl border border-[#e8eaff] p-5 flex-1 min-w-0"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-5">
        <span className="text-base font-bold text-gray-800">{title}</span>
        <span className="text-xs text-gray-400">{lastUpdated}</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-36 h-36 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={66}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                labelLine={false}
                label={<CustomLabel />}
                strokeWidth={0}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={colors[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${(v / 1024).toFixed(1)} GB`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-3">
            <span
              className="w-4 h-4 rounded-sm flex-shrink-0"
              style={{ background: colors[0] }}
            />
            <span className="text-sm text-gray-600">Used Storage</span>
            <div className="ml-auto text-right">
              <div className="text-[#3b3bf5] font-bold text-sm">
                {usedLabel}
              </div>
              <div className="text-xs text-gray-400">Used</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="w-4 h-4 rounded-sm flex-shrink-0"
              style={{ background: colors[1] }}
            />
            <span className="text-sm text-gray-600">Free Storage</span>
            <div className="ml-auto text-right">
              <div className="text-[#3b3bf5] font-bold text-sm">
                {totalLabel}
              </div>
              <div className="text-xs text-gray-400">Available</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ManagingHostingDashboard() {
  const [copied, setCopied] = useState(null);
  const navigate = useNavigate();

  const handleCopy = (text, i) => {
    navigator.clipboard.writeText(text);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };
  return (
    <div className=" bg-[#f4f5ff] p-4 sm:p-6 lg:p-8 ">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-full border border-[#c5c8f0] flex items-center justify-center bg-white pl-1"
            onClick={() => {
              navigate(-1);
            }}
          >
            <BackIcon style={{ fontSize: 14, color: "#3b3bf5" }} />
          </motion.button>
          <h1 className="text-xl sm:text-2xl font-bold text-[#3b3bf5]">
            Managing Ultimate
          </h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl border border-[#e8eaff] p-5 sm:p-6 mb-5"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-10 h-10 rounded-full border border-[#4D4FEC] bg-[#DEF3FF] flex items-center justify-center">
                <SharedHostingIcon style={{ fontSize: 20, color: "#3b3bf5" }} />
              </div>
              <span className="text-base sm:text-lg font-semibold text-gray-800">
                Shared Hosting - Ultimate (nowlooksok3.com)
              </span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="flex items-center gap-1 px-3 py-1 rounded-full border border-green-300 text-green-600 text-xs font-semibold bg-green-50"
              >
                <CircleIcon
                  style={{ fontSize: 8, color: "#22c55e" }}
                  className="animate-bounce"
                />
                Active
              </motion.span>
            </div>
            <div className="flex flex-wrap gap-2">
              <OutlineButton icon={RenewDomainIcon} label="Renew" />
              <OutlineButton icon={UpgradeDomainIcon} label="Upgrade" />
              <OutlineButton icon={ChangeDomainIcon} label="Change Domain" />
              <OutlineButton icon={RenewDomainIcon} label="Reset C Pannal" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Registration Date", value: "Monday, August 4th, 2025" },
              { label: "Next Due Date", value: "Monday, April 27th, 2026" },
              { label: "First Payment Amount", value: "Rs.1069.00" },
              { label: "Recurring Amount", value: "Rs.1069.00 Every 1 Year/s" },
              { label: "Payment Method", value: "UPI, Card, Net Banking" },
              { label: "Billing Cycle", value: "Monthly" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-xs text-gray-400">{label}</span>
                <span className="text-sm font-semibold text-gray-800">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-5 mb-5">
          <UsageCard
            title="Disk Usage"
            percent={75}
            usedLabel="450 MB"
            totalLabel="30 GB"
            data={diskData}
            colors={COLORS_DISK}
            lastUpdated="Last Updated Wednesday, October 22nd, 2025 (00:12)"
          />
          <UsageCard
            title="Bandwidth Usage"
            percent={25}
            usedLabel="450 MB"
            totalLabel="30 GB"
            data={bwData}
            colors={COLORS_BW}
            lastUpdated="Last Updated Wednesday, October 22nd, 2025 (00:12)"
          />
        </div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
          <ActionButton icon={LogInIcon} label="Ai sitejet builder" />
          <ActionButton icon={LogInIcon} label="Log in to cPanel" />
          <ActionButton icon={LogInIcon} label="Log in to Webmail" />
          <ActionButton icon={ChangePasswordIcon} label="Change Password" />
          <ActionButton icon={DowngradeIcon} label="Downgrade" />
          <ActionButton icon={CDNIcon} label="CDN" />
        </motion.div>
      </motion.div>

      <div className=" py-3  font-sans">
        <motion.div
          className="bg-[#F6F6F9] border rounded-2xl p-6 mb-6 shadow-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-lg font-bold text-gray-800 mb-6">
            Quick Shortcuts
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-4">
            {shortcuts.map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-2 cursor-pointer group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-14 h-14 rounded-full bg-[#E4E4FF] flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                  {item.icon}
                </div>
                <span className="text-xs text-gray-600 text-center leading-tight whitespace-pre-line">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            className="bg-white rounded-2xl p-4 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Quick Create Email Account
            </h2>
            <Divider
              sx={{ borderColor: "#EAEFF4", mt: 1, borderBottomWidth: 2 }}
            />
            <div className="flex flex-col sm:flex-row gap-2 mb-5 mt-4">
              <div className="flex flex-1 border border-gray-200 rounded-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="Your Name"
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                  className="flex-1 px-3 py-2.5 text-sm outline-none text-gray-700 placeholder-gray-400 min-w-0"
                />
                <span className="bg-gray-50 flex items-center px-3 text-gray-400 text-sm border-l border-gray-200 whitespace-nowrap">
                  .@nowlooksok3.com
                </span>
              </div>
              <input
                type="password"
                placeholder="Password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none text-gray-700 placeholder-gray-400 w-full sm:w-36"
              />
              <motion.button
                // onClick={handleCreate}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
              >
                <AddIcon fontSize="small" />
                Create
              </motion.button>
            </div>

            <div className="flex flex-col gap-3">
              {initialEmails.map((email, i) => (
                <motion.div
                  key={email + i}
                  className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <span className="text-sm text-gray-700">{email}</span>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      // onClick={() => handleDelete(i)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <DeleteIcon fontSize="small" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-indigo-300 hover:text-indigo-500 transition-colors"
                    >
                      <EditIcon fontSize="small" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-4 shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Server Information
            </h2>
            <Divider
              sx={{ borderColor: "#EAEFF4", mt: 1, borderBottomWidth: 2 }}
            />
            <p className="text-sm text-gray-600 my-4">Our Nameservers</p>
            <div className="flex flex-col gap-3">
              {nameservers.map((ns, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between bg-blue-50 rounded-xl px-4 py-3"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <span className="text-sm text-gray-700">{ns}</span>
                  <div className="relative flex items-center">
                    {copied === i && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -top-7 right-0 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-md whitespace-nowrap"
                      >
                        Copied!
                      </motion.span>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCopy(ns, i)}
                      className={`transition-colors ${copied === i ? "text-indigo-500" : "text-gray-400 hover:text-indigo-500"}`}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pb-4 font-sans">
        <h2 className="text-lg font-bold text-gray-800 mb-5">
          Your Server Performance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div
            className="bg-white rounded-2xl py-5 px-5 shadow-sm flex flex-col gap-2"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LocationOnIcon className="text-indigo-600" />
                <span className="text-base font-bold text-gray-800">
                  Finland
                </span>
              </div>
              <span className="border border-green-500 text-green-600 text-xs font-semibold px-3 py-1.5 rounded-xl">
                Online
              </span>
            </div>
            <Divider sx={{ borderColor: "#EAEFF4", borderBottomWidth: 2 }} />
            <div className=" border-gray-100 pt-1 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <PortIcon fontSize="small" className="text-indigo-400" />
                  <span>12.35.555.115</span>
                </div>
                <div className="relative">
                  {copied === "ip" && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-7 right-0 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-md whitespace-nowrap"
                    >
                      Copied!
                    </motion.span>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleCopy("12.35.555.115", "ip")}
                    className={`transition-colors ${copied === "ip" ? "text-indigo-500" : "text-gray-400 hover:text-indigo-500"}`}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <DomainNameIcon
                    fontSize="small"
                    className="text-indigo-400"
                  />
                  <span>ankit@nowlooksok3.com</span>
                </div>
                <div className="relative">
                  {copied === "email" && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-7 right-0 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-md whitespace-nowrap"
                    >
                      Copied!
                    </motion.span>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleCopy("ankit@nowlooksok3.com", "email")}
                    className={`transition-colors ${copied === "email" ? "text-indigo-500" : "text-gray-400 hover:text-indigo-500"}`}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </motion.button>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1.5 bg-[#EBF3FE] w-full rounded-2xl px-3 py-1.5 text-sm text-gray-600">
                  <SpeedOutlinedIcon
                    fontSize="small"
                    className="text-indigo-400"
                  />
                  <span>36 ms</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#EBF3FE] w-full rounded-2xl px-3 py-1.5 text-sm text-gray-600">
                  <MemoryOutlinedIcon
                    fontSize="small"
                    className="text-indigo-400"
                  />
                  <span>0 %</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#EBF3FE] w-full rounded-2xl px-3 py-1.5 text-sm text-gray-600">
                  <StorageOutlinedIcon
                    fontSize="small"
                    className="text-indigo-400"
                  />
                  <span>0 %</span>
                </div>
              </div>
            </div>

            <motion.a
              href="#"
              whileHover={{ x: 3 }}
              className="flex items-center gap-1 text-indigo-600 font-semibold text-sm mt-auto"
            >
              Check Server Uptime <ArrowForwardIcon fontSize="small" />
            </motion.a>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl py-5 px-5 shadow-sm flex flex-col gap-2"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="flex items-center gap-3  ">
              <Imunify360ProtectIcon className="text-indigo-600" />
              <span className="text-base font-bold text-gray-800">
                Imunify360 Protect
              </span>
            </div>
            <Divider sx={{ borderColor: "#EAEFF4", borderBottomWidth: 2 }} />
            <motion.div
              className="flex flex-col gap-3 flex-1 list-none p-0 m-0"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                "Malware Scan & Removal Enabled",
                "Daily Server Backup Active",
                "Server Security SSL Enabled",
                "DDos / DoS Protected",
              ].map((item) => (
                <motion.p
                  key={item}
                  variants={itemVariants}
                  className="flex items-center gap-2 text-sm text-gray-700 list-none"
                >
                  <CheckCircleOutlineIcon
                    fontSize="small"
                    className="text-green-500 shrink-0"
                  />
                  {item}
                </motion.p>
              ))}
            </motion.div>

            <motion.a
              href="#"
              whileHover={{ x: 3 }}
              className="flex items-center gap-1 text-indigo-600 font-semibold text-sm mt-auto"
            >
              Manage Hosting Security <ArrowForwardIcon fontSize="small" />
            </motion.a>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl py-5 px-5 shadow-sm flex flex-col gap-2"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="flex items-center gap-3 ">
              <TechnologiesCDNIcon />
              <span className="text-base font-bold text-gray-800">
                CSA Smart Pay Technologies CDN
              </span>
            </div>
            <Divider sx={{ borderColor: "#EAEFF4", borderBottomWidth: 2 }} />
            <motion.div
              className="flex flex-col gap-3 flex-1"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                "Dynamic Cache Enabled",
                "Redis Cache Enabled",
                "Image Optimization Enabled",
                "CDN Optimization is Working",
              ].map((item) => (
                <motion.p
                  key={item}
                  variants={itemVariants}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <CheckCircleOutlineIcon
                    fontSize="small"
                    className="text-green-500 shrink-0"
                  />
                  {item}
                </motion.p>
              ))}
            </motion.div>

            <motion.a
              href="#"
              whileHover={{ x: 3 }}
              className="flex items-center gap-1 text-indigo-600 font-semibold text-sm mt-auto"
            >
              Analyze and Improve Speed <ArrowForwardIcon fontSize="small" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
