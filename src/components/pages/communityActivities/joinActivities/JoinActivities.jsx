import AttachMoney from "@mui/icons-material/AttachMoney";
import Cancel from "@mui/icons-material/Cancel";
import Celebration from "@mui/icons-material/Celebration";
import CheckCircle from "@mui/icons-material/CheckCircle";
import ChevronRight from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import Event from "@mui/icons-material/Event";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Favorite from "@mui/icons-material/Favorite";
import Info from "@mui/icons-material/Info";
import LocalFlorist from "@mui/icons-material/LocalFlorist";
import LocationOn from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import Note from "@mui/icons-material/Note";
import Restaurant from "@mui/icons-material/Restaurant";
import Rule from "@mui/icons-material/Rule";
import Spa from "@mui/icons-material/Spa";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MdEco } from "react-icons/md";
import samaskarasImg from "../../../assets/samaskaras.webp";
import swagramaFoodImg from "../../../assets/swagramaFoodMenu.webp";
import swagramaMainImg from "../../../assets/landing-page/swagramaMain.webp";
import swagramaPricingImg from "../../../assets/swagramaPricing.webp";
import swagramaServicesImg from "../../../assets/swagramaServices.webp";
import termsconditionsImg from "../../../assets/terms&conditions.webp";
import weddingCultureImg from "../../../assets/weddingCulture.webp";
import tranditionalWeddingImg from "../../../assets/tranditionalWedding.webp";

import BusinessIcon from "@mui/icons-material/Business";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FamilyIcon from "@mui/icons-material/FamilyRestroom";
import FloristIcon from "@mui/icons-material/LocalFlorist";
import GroupIcon from "@mui/icons-material/Group";
import HealthIcon from "@mui/icons-material/HealthAndSafety";
import IdeaIcon from "@mui/icons-material/EmojiObjects";
import PaletteIcon from "@mui/icons-material/Palette";
import ShineIcon from "@mui/icons-material/AutoAwesome";
import StarIcon from "@mui/icons-material/Star";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CelebrationIcon from "@mui/icons-material/Celebration";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import SpaIcon from "@mui/icons-material/Spa";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import MembershipRegistrationModal from "../../membership/communityMembership/MembershipRegistrationModal";

const getServiceIcon = (service) => {
  if (service.includes("Ayurvedic")) return <SpaIcon />;
  if (service.includes("Shoot")) return <CameraAltIcon />;
  if (service.includes("Bailgada")) return <CelebrationIcon />;
  if (service.includes("Decoration")) return <LocalFloristIcon />;
  return <MonetizationOnIcon />;
};

const JoinActivities = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openEnquiryModal, setOpenEnquiryModal] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800,
  );

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 80);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const BTN_HEIGHT = 44;
  const btnYValue = hasScrolled
    ? windowHeight / 2 - BTN_HEIGHT / 2
    : windowHeight - 24 - BTN_HEIGHT;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const categories = [
    { id: 0, label: "Philosophy", icon: <Favorite fontSize="small" /> },
    { id: 1, label: "Concept", icon: <Spa fontSize="small" /> },
    { id: 2, label: "Samskaras", icon: <LocalFlorist fontSize="small" /> },
    { id: 3, label: "Food Menu", icon: <Restaurant fontSize="small" /> },
    { id: 4, label: "Services", icon: <Celebration fontSize="small" /> },
    { id: 5, label: "Rules", icon: <Rule fontSize="small" /> },
    { id: 6, label: "Community Programs", icon: <Event fontSize="small" /> },
    { id: 7, label: "Pricing", icon: <CurrencyRupeeIcon fontSize="small" /> },
  ];

  const tabImages = {
    0: tranditionalWeddingImg,
    1: swagramaMainImg,
    2: samaskarasImg,
    3: swagramaFoodImg,
    4: swagramaServicesImg,
    5: termsconditionsImg,
    6: weddingCultureImg,
    7: swagramaPricingImg,
  };

  const PhilosophySection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative h-[400px] 2xl:h-[600px] rounded-2xl overflow-hidden shadow-2xl group"
      >
        <img
          src={tabImages[0]}
          alt="Wedding"
          className="w-full h-full object-cover transition-transform duration-700"
        />

        <div className="absolute inset-0 flex items-end p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-green-400 to-lime-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {swagramWeddingData.philosophy.question}
            </h2>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-lime-400/30 to-transparent rounded-bl-full" />
      </motion.div>
      <div>
        <motion.div
          whileHover={{ y: -2 }}
          className="relative overflow-hidden rounded-2xl border border-green-200/60 bg-gradient-to-br from-green-50/80 via-white to-emerald-50/60 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/10 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-2xl" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500" />

          <div className="relative p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30">
                <MdEco className="text-white text-xl" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-green-900 tracking-tight leading-tight">
                  {swagramWeddingData.basicInfo.type}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="h-1 w-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
                  <div className="h-1 w-4 rounded-full bg-green-300" />
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed pl-14">
              {swagramWeddingData.basicInfo.description}
            </p>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <motion.div
            whileHover={{
              y: -4,
              boxShadow: "0 12px 24px rgba(34, 197, 94, 0.15)",
            }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl border border-green-200/60 bg-gradient-to-br from-green-50/90 to-emerald-50/80 backdrop-blur-xl shadow-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-lime-500/5 pointer-events-none" />
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-green-500 via-green-600 to-lime-500 shadow-[2px_0_8px_rgba(34,197,94,0.3)]" />

            <div className="relative p-4">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30">
                  <CheckCircle className="text-white" size={18} />
                </div>
                <h3 className="text-base font-bold text-green-900 tracking-tight">
                  {swagramWeddingData.coreValues.sayYesTo.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {swagramWeddingData.coreValues.sayYesTo.values.map(
                  (val, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200/50 px-3 py-1.5 shadow-sm hover:shadow-md hover:border-green-300/60 transition-all duration-200 cursor-default"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
                        <span className="text-xs font-semibold text-green-900 leading-tight">
                          {val.marathi}
                        </span>{" "}
                        |
                        <span className="text-[10px] sm:text-xs text-green-600/70 leading-tight">
                          {val.english}
                        </span>
                      </div>
                    </motion.div>
                  ),
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{
              y: -4,
              boxShadow: "0 12px 24px rgba(239, 68, 68, 0.15)",
            }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl  border border-red-200/60 bg-gradient-to-br from-red-50/90 to-orange-50/80 backdrop-blur-xl shadow-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 pointer-events-none" />
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-red-500 via-red-600 to-orange-500 shadow-[2px_0_8px_rgba(239,68,68,0.3)]" />
            <div className="relative p-4">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30">
                  <Cancel className="text-white" size={18} />
                </div>
                <h3 className="text-base font-bold text-red-900 tracking-tight">
                  {swagramWeddingData.coreValues.sayNoTo.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {swagramWeddingData.coreValues.sayNoTo.values.map(
                  (val, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-red-100 to-orange-100 border border-red-200/50 px-3 py-1.5 shadow-sm hover:shadow-md hover:border-red-300/60 transition-all duration-200 cursor-default"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
                        <span className="text-xs font-semibold text-red-900 leading-tight">
                          {val.marathi} |
                        </span>
                        <span className="text-[10px] sm:text-xs text-red-600/70 leading-tight">
                          {val.english}
                        </span>
                      </div>
                    </motion.div>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-green-600 p-4 rounded-lg text-center mt-5"
        >
          <p className="text-sm text-white leading-relaxed">
            {swagramWeddingData.coreValues.message}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl border border-green-200/60 bg-gradient-to-br from-green-50 via-white to-lime-50/50 p-6 shadow-lg"
      >
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-lime-500 to-green-600" />
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-500/10 to-transparent rounded-full blur-2xl" />

        <div className="relative space-y-3">
          <p className="text-lg font-bold text-lime-700 leading-snug">
            {swagramWeddingData.philosophy.tagline}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {swagramWeddingData.philosophy.introduction}
          </p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          whileHover={{ y: -4 }}
          className="relative overflow-hidden rounded-2xl border border-red-200/60 bg-gradient-to-br from-red-50 via-white to-orange-50/50 p-5 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-red-500/10 to-transparent rounded-full blur-xl" />

          <div className="relative space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/30">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-red-800">Problem</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed pl-13">
              {swagramWeddingData.philosophy.problem}
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="relative overflow-hidden rounded-2xl border border-green-200/60 bg-gradient-to-br from-green-50 via-white to-emerald-50/50 p-5 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-green-500/10 to-transparent rounded-full blur-xl" />

          <div className="relative space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/30">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-green-800">Solution</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed pl-13">
              {swagramWeddingData.philosophy.solution}
            </p>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        whileHover={{ y: -2 }}
        className="relative overflow-hidden rounded-2xl border border-lime-200/60 bg-gradient-to-br from-lime-50 via-white to-green-50/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-lime-500/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/10 to-transparent rounded-full blur-2xl" />

        <div className="relative space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-lime-500 to-green-600 shadow-lg shadow-lime-500/30 flex-shrink-0">
              <MdEco className="text-white text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-lime-800 mb-1">
                {swagramWeddingData.philosophy.nature_wedding_concept.title}
              </h3>
              <div className="flex items-center gap-1.5">
                <div className="h-1 w-10 rounded-full bg-gradient-to-r from-lime-500 to-green-500" />
                <div className="h-1 w-5 rounded-full bg-lime-300" />
              </div>
            </div>
          </div>

          <div className="space-y-2.5 lg:pl-14">
            <p className="text-sm text-gray-700 leading-relaxed">
              {swagramWeddingData.philosophy.nature_wedding_concept.description}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed italic">
              {swagramWeddingData.philosophy.nature_wedding_concept.conclusion}
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ y: -2 }}
        className="relative overflow-hidden rounded-2xl border border-orange-200/60 bg-gradient-to-br from-orange-50 via-white to-amber-50/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500" />
        <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-orange-500/10 to-transparent rounded-full blur-2xl" />

        <div className="relative space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg shadow-orange-500/30">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-orange-800">
                {swagramWeddingData.philosophy.modern_reality.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="h-1 w-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
                <div className="h-1 w-4 rounded-full bg-orange-300" />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed pl-14">
            {swagramWeddingData.philosophy.modern_reality.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );

  const ConceptSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative rounded-2xl overflow-hidden shadow-2xl group"
      >
        <img src={tabImages[1]} alt="Wedding" className="w-full h-auto block" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/25 to-transparent" />

        <div className="absolute inset-0 flex items-end p-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-lime-400 to-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {swagramWeddingData.swagramConcept.title}
            </h2>
            <p className="text-base text-lime-300 font-medium">
              {swagramWeddingData.swagramConcept.subtitle}
            </p>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-lime-400/30 to-transparent rounded-bl-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl border border-green-200/60 bg-gradient-to-br from-green-50 via-white to-emerald-50/50 p-6 shadow-lg"
      >
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-green-500 to-emerald-600" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/10 to-transparent rounded-full blur-2xl" />

        <p className="relative text-sm text-gray-700 leading-relaxed">
          {swagramWeddingData.swagramConcept.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative overflow-hidden rounded-2xl border border-green-200/60 bg-gradient-to-br from-white via-green-50/30 to-white p-6 shadow-lg"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500" />

        <div className="relative space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-800">
                {swagramWeddingData.swagramConcept.specialFeatures.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
                <div className="h-1 w-6 rounded-full bg-green-300" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {swagramWeddingData.swagramConcept.specialFeatures.features.map(
              (feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.05 }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 8px 16px rgba(34, 197, 94, 0.1)",
                  }}
                  className="relative overflow-hidden rounded-xl border border-green-200/50 bg-gradient-to-br from-green-50/80 to-white p-4 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-transparent" />

                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-md shadow-green-500/20 flex-shrink-0">
                      <CheckCircle className="text-white text-sm" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <h4 className="text-sm font-bold text-green-800 leading-tight">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ),
            )}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden rounded-xl border border-lime-200/60 bg-gradient-to-r from-lime-50 to-green-50 p-4 mt-4"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-lime-500/10 to-transparent rounded-full blur-xl" />
            <p className="relative text-sm text-gray-700 leading-relaxed font-medium">
              {swagramWeddingData.swagramConcept.specialFeatures.conclusion}
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="relative overflow-hidden rounded-2xl shadow-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30" />

        <div className="relative p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">
                {swagramWeddingData.swagramConcept.fiveDayWedding.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="h-1 w-12 rounded-full bg-white/40" />
                <div className="h-1 w-6 rounded-full bg-white/20" />
              </div>
            </div>
          </div>

          <p className="text-sm text-white/95 leading-relaxed">
            {swagramWeddingData.swagramConcept.fiveDayWedding.description}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
            {swagramWeddingData.swagramConcept.fiveDayWedding.services.map(
              (service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 hover:bg-white/15 transition-colors"
                >
                  <div className="flex items-center justify-center h-6 w-6 rounded-md bg-lime-400/90 flex-shrink-0">
                    <ChevronRight className="text-green-800 text-sm" />
                  </div>
                  <p className="text-sm text-white font-medium">{service}</p>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-green-800">
              {swagramWeddingData.whyChooseSwagram.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
              <div className="h-1 w-6 rounded-full bg-green-300" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {swagramWeddingData.whyChooseSwagram.reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + idx * 0.05 }}
              whileHover={{
                x: 6,
                boxShadow: "0 4px 12px rgba(34, 197, 94, 0.1)",
              }}
              className="relative overflow-hidden rounded-xl border border-green-200/60 bg-gradient-to-br from-white to-green-50/30 p-4 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-emerald-500 group-hover:w-1.5 transition-all duration-300" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-500/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative space-y-1.5 pl-3">
                <h4 className="text-sm font-bold text-green-800 leading-tight">
                  {reason.point}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {reason.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className="relative overflow-hidden rounded-2xl shadow-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-400/20 rounded-full blur-3xl" />

        <div className="relative p-6 space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg flex-shrink-0">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-white leading-tight mb-2">
                {swagramWeddingData.whyChooseSwagram.callToAction}
              </p>
              <p className="text-sm text-white/95 leading-relaxed">
                {swagramWeddingData.whyChooseSwagram.promise}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const PricingSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group"
      >
        <img
          src={tabImages[7]}
          alt="Pricing"
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-transparent" />

        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-lime-400/30 to-transparent rounded-bl-full" />

        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-transparent via-lime-400 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Pricing & Packages
            </h2>
            <p className="text-lime-300 text-base font-medium">
              Transparent & Competitive Rates
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl border border-green-200/60 bg-gradient-to-br from-green-50 via-white to-emerald-50/50 p-6 shadow-lg"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/10 to-transparent rounded-full blur-2xl" />

        <div className="relative space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-800">
                {swagramWeddingData.pricing.venueCharges.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
                <div className="h-1 w-6 rounded-full bg-green-300" />
              </div>
            </div>
          </div>

          {/* Package Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {swagramWeddingData.pricing.venueCharges.packages.map(
              (pkg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + idx * 0.05 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="relative overflow-hidden rounded-xl border border-green-200/50 bg-gradient-to-r from-white to-green-50/30 p-4 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-emerald-500 group-hover:w-1.5 transition-all duration-300" />

                  <div className="relative flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-green-800">
                        {pkg.duration}
                      </p>
                      <p className="text-xs text-gray-600 flex items-center gap-1.5">
                        <svg
                          className="w-3 h-3 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {pkg.timing}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-lg font-bold text-lime-700">
                          {pkg.cost}
                        </p>
                      </div>
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-lime-100 to-green-100 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl border border-lime-200/60 bg-gradient-to-br from-lime-50 via-white to-green-50/50 p-6 shadow-lg"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-lime-500/10 to-transparent rounded-full blur-2xl" />

        <div className="relative space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-lime-500 to-green-600 shadow-lg shadow-lime-500/30">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-lime-800">
                {swagramWeddingData.pricing.accommodation.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-lime-500 to-green-500" />
                <div className="h-1 w-6 rounded-full bg-lime-300" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-lime-100/60 rounded-lg px-3 py-2">
            <svg
              className="w-4 h-4 text-lime-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-sm text-lime-800 font-medium">
              {swagramWeddingData.pricing.accommodation.capacity}
            </p>
          </div>

          {/* Rates */}
          <div className="grid md:grid-cols-2 gap-4">
            {swagramWeddingData.pricing.accommodation.rates.map((rate, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + idx * 0.05 }}
                className="relative overflow-hidden rounded-xl border border-lime-200/50 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm font-bold text-gray-800">
                    {rate.duration}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-bold text-green-700">
                      {rate.cost}
                    </p>
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Value Added Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden rounded-2xl border border-green-200/60 bg-gradient-to-br from-white via-green-50/30 to-white p-6 shadow-lg"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500" />

        <div className="relative space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-800">
                {swagramWeddingData.valueAddedServices.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500" />
                <div className="h-1 w-6 rounded-full bg-green-300" />
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {swagramWeddingData.valueAddedServices.services.map((svc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + idx * 0.05 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-900/95 to-emerald-900/95 backdrop-blur-xl border border-green-400/30 shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 group"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiLz48L2c+PC9zdmc+')] opacity-40" />

                {/* Icon Badge */}
                <div className="absolute top-3 right-3 bg-green-500/20 backdrop-blur-md text-green-100 p-2.5 rounded-xl border border-green-400/30 group-hover:bg-green-500/30 transition-colors">
                  {getServiceIcon(svc.service)}
                </div>

                <div className="relative p-5 ">
                  <h4 className="text-base font-bold text-green-50 pr-12 leading-tight">
                    {svc.service}
                  </h4>

                  <div className="flex items-center gap-2 bg-lime-400/10 backdrop-blur-sm rounded-lg px-3 py-2 mt-8 border border-lime-400/20">
                    <div className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
                    <p className="text-sm text-lime-200 font-bold">
                      {svc.cost}
                    </p>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-400/60 via-lime-400/80 to-green-400/60 group-hover:h-1.5 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Available Locations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative overflow-hidden rounded-2xl shadow-xl"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30" />

        <div className="relative p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg">
              <LocationOn className="text-white text-2xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">
                {swagramWeddingData.availableLocations.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="h-1 w-12 rounded-full bg-white/40" />
                <div className="h-1 w-6 rounded-full bg-white/20" />
              </div>
            </div>
          </div>

          {/* Locations Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {swagramWeddingData.availableLocations.locations.map((loc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 + idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="relative overflow-hidden rounded-xl bg-white/15 backdrop-blur-md border border-white/20 p-4 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-lime-400 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-lime-400/90 shadow-md">
                      <LocationOn className="text-green-800 text-base" />
                    </div>
                    <p className="text-sm font-bold text-white leading-tight flex-1">
                      {loc.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-2 py-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-lime-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <p className="text-xs text-white/90 font-medium">
                      {loc.capacity}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const FoodMenuSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative  overflow-hidden shadow-2xl group"
      >
        <img
          src={tabImages[3]}
          alt="Wedding"
          className="w-full h-[450px] block bg-black"
        />
      </motion.div>

      <div className="inset-0 flex items-end">
        <div className="w-full bg-white/10 backdrop-blur-xl border rounded  shadow-xl px-5 py-4 flex items-center gap-4">
          <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-xl shadow-orange-500/30 flex-shrink-0">
            <Restaurant className="text-white text-3xl" />
          </div>

          <div className="flex-1">
            <h2 className="text-lg md:text-2xl font-bold text-green-600 leading-tight">
              {swagramWeddingData.foodMenu.title}
            </h2>
            <div className="h-1 w-40 rounded-full bg-gradient-to-r from-orange-400 to-red-400" />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl border border-green-200/60 bg-gradient-to-br from-green-50 via-white to-lime-50/50 p-6 shadow-lg"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-lime-500 to-green-500" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-lime-500/10 to-transparent rounded-full blur-2xl" />

        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 bg-lime-100 border border-lime-200 rounded-full px-4 py-2">
            <svg
              className="w-4 h-4 text-lime-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-sm font-bold text-lime-700">
              {swagramWeddingData.foodMenu.venue}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-green-800 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              Special Features
            </h3>

            <div className="grid sm:grid-cols-2 gap-2.5">
              {swagramWeddingData.foodMenu.specialFeatures.map(
                (feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.05 }}
                    className="flex items-center gap-2.5 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-green-100"
                  >
                    <div className="flex items-center justify-center h-6 w-6 rounded-md bg-gradient-to-br from-green-500 to-emerald-600 flex-shrink-0">
                      <CheckCircle className="text-white text-xs" />
                    </div>
                    <p className="text-sm text-gray-700 font-medium leading-tight">
                      {feature}
                    </p>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/30">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">Menu Categories</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
              <div className="h-1 w-6 rounded-full bg-orange-300" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {swagramWeddingData.foodMenu.menuItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              whileHover={{
                y: -4,
                boxShadow: "0 8px 16px rgba(251, 146, 60, 0.15)",
              }}
              className="relative overflow-hidden rounded-xl border border-orange-200/60 bg-gradient-to-br from-white to-orange-50/30 p-4 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500" />
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-orange-500/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative space-y-3">
                <div className="flex justify-between items-start gap-3">
                  <h4 className="text-base font-bold text-orange-800 leading-tight flex-1">
                    {item.category}
                  </h4>
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-green-100 to-lime-100 border border-green-200 rounded-full px-3 py-1.5 flex-shrink-0">
                    <span className="text-xs font-bold text-green-700">₹</span>
                    <span className="text-sm font-bold text-green-700">
                      {item.costPerPerson}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden rounded-2xl border border-orange-200/60 bg-gradient-to-br from-orange-50 via-white to-amber-50/50 p-6 shadow-lg"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-2xl" />

        <div className="relative space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg shadow-orange-500/30">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-orange-800">
                Important Notes
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
                <div className="h-1 w-6 rounded-full bg-orange-300" />
              </div>
            </div>
          </div>

          <div className="space-y-2.5  lg:pl-14">
            {swagramWeddingData.foodMenu.importantNotes.map((note, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + idx * 0.05 }}
                className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-orange-100"
              >
                <div className="flex items-center justify-center h-6 w-6 rounded-md bg-gradient-to-br from-orange-500 to-amber-600 flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-lime-200/60 bg-gradient-to-br from-lime-50 via-white to-green-50/50 p-6 shadow-lg"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-500 via-green-500 to-emerald-500" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-lime-500/10 to-transparent rounded-full blur-2xl" />

        <div className="relative space-y-5">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-lime-500 to-green-600 shadow-lg shadow-lime-500/30">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-lime-800">
                  {swagramWeddingData.foodMenu.smallEventPackages.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-lime-500 to-green-500" />
                  <div className="h-1 w-6 rounded-full bg-lime-300" />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed pl-15">
              {swagramWeddingData.foodMenu.smallEventPackages.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
              className="relative overflow-hidden rounded-xl border border-green-200/50 bg-white p-5 shadow-sm"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-lime-500" />

              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-md shadow-green-500/20">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-green-800">
                  {swagramWeddingData.foodMenu.smallEventPackages.halfDay.title}
                </h4>
              </div>

              <div className="space-y-2">
                {swagramWeddingData.foodMenu.smallEventPackages.halfDay.packages.map(
                  (pkg, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-3 px-3 bg-green-50/50 rounded-lg hover:bg-green-50 transition-colors border-b border-green-100 last:border-b-0"
                    >
                      <p className="text-sm text-gray-700 font-medium">
                        {pkg.description}
                      </p>
                      <div className="flex items-center gap-1.5 bg-green-100 rounded-full px-3 py-1">
                        <span className="text-xs font-bold text-green-700">
                          ₹
                        </span>
                        <p className="text-sm font-bold text-green-700">
                          {pkg.cost}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative overflow-hidden rounded-xl border border-lime-200/50 bg-white p-5 shadow-sm"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-lime-500 to-green-500" />

              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br from-lime-500 to-green-600 shadow-md shadow-lime-500/20">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-lime-800">
                  {swagramWeddingData.foodMenu.smallEventPackages.fullDay.title}
                </h4>
              </div>

              <div className="space-y-2">
                {swagramWeddingData.foodMenu.smallEventPackages.fullDay.packages.map(
                  (pkg, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-3 px-3 bg-lime-50/50 rounded-lg hover:bg-lime-50 transition-colors border-b border-lime-100 last:border-b-0"
                    >
                      <p className="text-sm text-gray-700 font-medium">
                        {pkg.description}
                      </p>
                      <div className="flex items-center gap-1.5 bg-lime-100 rounded-full px-3 py-1">
                        <span className="text-xs font-bold text-lime-700">
                          ₹
                        </span>
                        <p className="text-sm font-bold text-lime-700">
                          {pkg.cost}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const ServicesSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div
        className="relative w-full max-h-[400px] rounded-lg overflow-hidden
             backdrop-blur-xl
             bg-gray-500/25
             border border-black/30
             shadow-lg"
      >
        <img
          src={tabImages[4]}
          alt="Services"
          className="w-full h-auto block"
        />
      </div>

      <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-green-800 mb-3">
          {swagramWeddingData.valueAddedServices.title}
        </h2>
        <p className="text-sm text-gray-700 mb-3">
          We offer comprehensive value-added services to make your celebration
          memorable and complete.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {swagramWeddingData.valueAddedServices.services.map((svc, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 18,
              delay: idx * 0.06,
            }}
            whileHover={{ scale: 1.03 }}
            className="relative group rounded-2xl overflow-hidden
                 bg-gradient-to-br 
                 from-green-950/70 via-green-900/60 to-green-950/70
                 backdrop-blur-2xl"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                   bg-[radial-gradient(circle_at_top_left,rgba(163,230,53,0.35),transparent_60%)]"
            />
            <div
              className="absolute top-4 right-4 z-10
                   bg-lime-400/20 backdrop-blur-lg
                   p-2.5 rounded-xl text-lime-200"
            >
              {getServiceIcon(svc.service)}
            </div>

            <div className="relative z-10 p-6">
              <h3 className="text-sm font-semibold text-green-50 pr-14">
                {svc.service}
              </h3>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-lime-400" />
                <p className="text-sm text-lime-200 font-medium">{svc.cost}</p>
              </div>
            </div>
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-16
                   bg-gradient-to-b from-white/10 to-transparent"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const RulesSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative h-[400px]  overflow-hidden shadow-2xl group"
      >
        <img
          src={tabImages[5]}
          alt="Rules"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="bg-gradient-to-r from-green-600/95 to-emerald-600/95 backdrop-blur-xl  px-6 py-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg flex-shrink-0">
                <Rule className="text-white text-2xl" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white leading-tight">
                  {swagramWeddingData.rulesAndRegulations.title}
                </h2>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="h-1 w-16 rounded-full bg-white/40" />
                  <div className="h-1 w-8 rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl border border-green-200/60 bg-gradient-to-br from-green-50 via-white to-lime-50/50 p-6 shadow-lg"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-lime-500 to-green-500" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/10 to-transparent rounded-full blur-2xl" />

        <div className="relative space-y-3">
          <div className="inline-flex items-center gap-2 bg-lime-100 border border-lime-200 rounded-full px-4 py-2">
            <svg
              className="w-4 h-4 text-lime-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm font-bold text-lime-700">
              {swagramWeddingData.rulesAndRegulations.subtitle}
            </p>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {swagramWeddingData.rulesAndRegulations.introduction}
          </p>
        </div>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          whileHover={{ y: -4 }}
          className="relative overflow-hidden rounded-2xl border border-green-200/60 bg-gradient-to-br from-lime-50 via-white to-green-50/50 p-5 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-lime-500" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-green-500/10 to-transparent rounded-full blur-xl" />

          <div className="relative space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/30">
                <CheckCircle className="text-white text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-green-800">
                  {swagramWeddingData.rulesAndRegulations.inclusions.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-green-500 to-lime-500" />
                  <div className="h-1 w-5 rounded-full bg-green-300" />
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {swagramWeddingData.rulesAndRegulations.inclusions.items.map(
                (item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className="flex items-start gap-2.5 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-green-100"
                  >
                    <div className="flex items-center justify-center h-6 w-6 rounded-md bg-gradient-to-br from-green-500 to-emerald-600 flex-shrink-0 mt-0.5">
                      <CheckCircle className="text-white text-xs" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {item}
                    </p>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="relative overflow-hidden rounded-2xl border border-orange-200/60 bg-gradient-to-br from-orange-50 via-white to-red-50/50 p-5 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-orange-500/10 to-transparent rounded-full blur-xl" />

          <div className="relative space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/30">
                <Cancel className="text-white text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-orange-800">
                  {swagramWeddingData.rulesAndRegulations.exclusions.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="h-1 w-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
                  <div className="h-1 w-5 rounded-full bg-orange-300" />
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {swagramWeddingData.rulesAndRegulations.exclusions.items.map(
                (item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + idx * 0.05 }}
                    className="flex items-start gap-2.5 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-orange-100"
                  >
                    <div className="flex items-center justify-center h-6 w-6 rounded-md bg-gradient-to-br from-orange-500 to-red-600 flex-shrink-0 mt-0.5">
                      <Cancel className="text-white text-xs" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {item}
                    </p>
                  </motion.div>
                ),
              )}
            </div>

            <div className="bg-orange-100/60 border border-orange-200 rounded-lg p-3 mt-3">
              <p className="text-xs text-orange-800 leading-relaxed italic flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {swagramWeddingData.rulesAndRegulations.exclusions.note}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">
              Detailed Guidelines
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
              <div className="h-1 w-6 rounded-full bg-blue-300" />
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          {swagramWeddingData.rulesAndRegulations.sections.map(
            (section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className=""
              >
                <Accordion
                  className="rounded-xl border border-green-200/60 bg-gradient-to-br from-white to-green-50/30 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  sx={{
                    "&:before": { display: "none" },
                    boxShadow: "none",
                    borderRadius: "12px",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                        <ExpandMore className="text-green-600" />
                      </div>
                    }
                    sx={{
                      "&:hover": { backgroundColor: "rgba(34, 197, 94, 0.03)" },
                      borderRadius: "12px",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-green-600 to-emerald-700 shadow-lg shadow-green-500/20">
                        <span className="text-white text-sm font-bold">
                          {section.number}
                        </span>
                      </div>
                      <p className="text-base font-bold text-green-800">
                        {section.title}
                      </p>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails sx={{ paddingTop: 0 }}>
                    <div className="space-y-2 pt-2 pb-2">
                      {section.rules.map((rule, rIdx) => (
                        <div
                          key={rIdx}
                          className="flex items-start gap-3 bg-green-50/50 rounded-lg p-3 border border-green-100/50"
                        >
                          <div className="flex items-center justify-center h-6 w-6 rounded-md bg-gradient-to-br from-lime-500 to-green-600 flex-shrink-0 mt-0.5">
                            <ChevronRight className="text-white text-sm" />
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {rule}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ),
          )}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.01 }}
        className="relative overflow-hidden rounded-2xl shadow-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-400/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiLz48L2c+PC9zdmc+')] opacity-30" />

        <div className="relative p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg flex-shrink-0">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-base font-bold text-white leading-relaxed">
                {swagramWeddingData.rulesAndRegulations.conclusion}
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="text-sm text-white/95 leading-relaxed italic flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-lime-300 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {swagramWeddingData.rulesAndRegulations.finalNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const CommunitySection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative h-[400px]  overflow-hidden shadow-2xl group"
      >
        <img
          src={tabImages[6]}
          alt="Community"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="bg-gradient-to-r from-green-600/95 to-lime-600/95 backdrop-blur-xl border-t border-white/20 px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg flex-shrink-0">
                <Event className="text-white text-3xl" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white leading-tight">
                  {swagramWeddingData.communityCeremonyPlanning.title}
                </h2>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="h-1 w-16 rounded-full bg-white/40" />
                  <div className="h-1 w-8 rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ y: -2 }}
        className="relative overflow-hidden rounded-2xl border border-green-200/60 bg-gradient-to-br from-white via-green-50/30 to-lime-50/20 p-6 shadow-lg"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-lime-500 to-green-500" />
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-3 right-3 opacity-10"
        >
          <svg
            className="w-20 h-20 text-lime-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </motion.div>

        <div className="relative space-y-3">
          <div className="flex items-center gap-2.5 bg-lime-100/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-lime-200/50 w-fit">
            <InfoOutlinedIcon fontSize="small" className="text-lime-700" />
            <p className="text-sm font-semibold text-lime-700">
              {swagramWeddingData.communityCeremonyPlanning.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-green-100/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-green-200/50 w-fit">
            <PaletteOutlinedIcon fontSize="small" className="text-green-700" />
            <p className="text-sm font-medium text-green-700">
              {swagramWeddingData.communityCeremonyPlanning.theme}
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-gradient-to-r from-green-100 to-lime-100 backdrop-blur-sm rounded-lg px-4 py-2.5 border border-green-200 w-fit">
            <EventOutlinedIcon fontSize="small" className="text-green-800" />
            <p className="text-sm font-bold text-green-800">
              {swagramWeddingData.communityCeremonyPlanning.type}
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative overflow-hidden rounded-2xl border border-green-200/60 bg-gradient-to-br from-green-50 via-white to-emerald-50/50 p-6 shadow-lg"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-lime-500/10 to-transparent rounded-full blur-2xl" />
        <motion.div className="absolute top-4 right-4 opacity-10">
          <FloristIcon className="text-6xl text-lime-900 animate-bounce" />
        </motion.div>

        <div className="relative space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-lime-500 to-green-600 shadow-lg shadow-lime-500/30">
              <FloristIcon className="text-2xl text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-lime-800">
                {swagramWeddingData.communityCeremonyPlanning.features.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-lime-500 to-green-500" />
                <div className="h-1 w-6 rounded-full bg-lime-300" />
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            {swagramWeddingData.communityCeremonyPlanning.features.description}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed italic">
            {swagramWeddingData.communityCeremonyPlanning.features.vision}
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants}>
          <Accordion
            elevation={0}
            className="rounded-xl overflow-hidden border border-green-200/60 bg-gradient-to-br from-white to-green-50/30"
            sx={{
              "&:before": { display: "none" },
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(34, 197, 94, 0.1)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <div className="h-7 w-7 rounded-lg bg-green-100 flex items-center justify-center hover:bg-green-200 transition-colors">
                  <ExpandMoreIcon className="text-green-700" />
                </div>
              }
              sx={{
                background: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                },
                borderRadius: "12px",
                padding: "0px 12px",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20">
                  <SpaIcon className="text-2xl text-white" />
                </div>
                <h3 className="text-base font-bold text-green-800">
                  {
                    swagramWeddingData.communityCeremonyPlanning
                      .ayurvedicPrograms.title
                  }
                </h3>
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: "#f9fafb", padding: "20px" }}
            >
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {
                  swagramWeddingData.communityCeremonyPlanning.ayurvedicPrograms
                    .note
                }
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {swagramWeddingData.communityCeremonyPlanning.ayurvedicPrograms.programs.map(
                  (prog, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -2 }}
                      className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-xl shadow-sm hover:shadow-md transition-all"
                    >
                      <h4 className="text-sm font-bold text-green-800 mb-1.5">
                        {prog.name}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {prog.description}
                      </p>
                    </motion.div>
                  ),
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Accordion
            elevation={0}
            className="rounded-xl overflow-hidden border border-lime-200/60 bg-gradient-to-br from-lime-50 to-yellow-50/30"
            sx={{
              "&:before": { display: "none" },
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(132, 204, 22, 0.1)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <div className="h-9 w-9 rounded-lg bg-lime-100 flex items-center justify-center hover:bg-lime-200 transition-colors">
                  <ExpandMoreIcon className="text-lime-700" />
                </div>
              }
              sx={{
                background: "linear-gradient(135deg, #fefce8 0%, #ecfccb 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #ecfccb 0%, #d9f99d 100%)",
                },
                borderRadius: "12px",
                padding: "0px 12px",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-lime-500 to-yellow-600 shadow-lg shadow-lime-500/20">
                  <CelebrationIcon className="text-2xl text-white" />
                </div>
                <h3 className="text-base font-bold text-lime-800">
                  {swagramWeddingData.communityCeremonyPlanning.festivals.title}
                </h3>
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: "#fefce8", padding: "20px" }}
            >
              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-bold text-green-800 mb-3 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-lime-500" />
                    {
                      swagramWeddingData.communityCeremonyPlanning.festivals
                        .maharashtrianFestivals.title
                    }
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {swagramWeddingData.communityCeremonyPlanning.festivals.maharashtrianFestivals.festivals.map(
                      (fest, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="p-3 bg-white border border-lime-200/50 rounded-lg shadow-sm hover:shadow-md transition-all"
                        >
                          <p className="text-sm font-bold text-lime-700 mb-1">
                            {fest.name}
                          </p>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {fest.activities}
                          </p>
                        </motion.div>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-green-800 mb-3 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-lime-500" />
                    {
                      swagramWeddingData.communityCeremonyPlanning.festivals
                        .otherFestivals.title
                    }
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {swagramWeddingData.communityCeremonyPlanning.festivals.otherFestivals.festivals.map(
                      (fest, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white border border-lime-200/50 rounded-lg shadow-sm"
                        >
                          <p className="text-sm font-bold text-lime-700 mb-1">
                            {fest.name}
                          </p>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {fest.activities}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-green-800 mb-2 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-lime-500" />
                    {
                      swagramWeddingData.communityCeremonyPlanning.festivals
                        .traditionalSamskaras.title
                    }
                  </h4>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {
                      swagramWeddingData.communityCeremonyPlanning.festivals
                        .traditionalSamskaras.description
                    }
                  </p>
                  <div className="space-y-2">
                    {swagramWeddingData.communityCeremonyPlanning.festivals.traditionalSamskaras.ceremonies.map(
                      (cer, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white border border-lime-200/50 rounded-lg shadow-sm"
                        >
                          <p className="text-sm font-bold text-lime-700 mb-1">
                            {cer.name}
                          </p>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {cer.description}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Accordion
            elevation={0}
            className="rounded-xl overflow-hidden border border-green-200/60 bg-gradient-to-br from-white to-green-50/30"
            sx={{
              "&:before": { display: "none" },
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(34, 197, 94, 0.1)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <div className="h-9 w-9 rounded-lg bg-green-100 flex items-center justify-center hover:bg-green-200 transition-colors">
                  <ExpandMoreIcon className="text-green-700" />
                </div>
              }
              sx={{
                background: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                },
                borderRadius: "12px",
                padding: "0px 12px",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20">
                  <FamilyIcon className="text-2xl text-white" />
                </div>
                <h3 className="text-base font-bold text-green-800">
                  {
                    swagramWeddingData?.communityCeremonyPlanning
                      ?.familyAndSocialGatherings?.title
                  }
                </h3>
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: "#f9fafb", padding: "20px" }}
            >
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {
                  swagramWeddingData?.communityCeremonyPlanning
                    ?.familyAndSocialGatherings?.description
                }
              </p>
              <div className="space-y-2">
                {swagramWeddingData?.communityCeremonyPlanning?.familyAndSocialGatherings?.events?.map(
                  (prog, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-lg shadow-sm"
                    >
                      <p className="text-sm font-bold text-green-800 mb-1">
                        {prog.name}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {prog.description}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Accordion
            elevation={0}
            className="rounded-xl overflow-hidden border border-lime-200/60 bg-gradient-to-br from-lime-50 to-yellow-50/30"
            sx={{
              "&:before": { display: "none" },
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(132, 204, 22, 0.1)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <div className="h-9 w-9 rounded-lg bg-lime-100 flex items-center justify-center hover:bg-lime-200 transition-colors">
                  <ExpandMoreIcon className="text-lime-700" />
                </div>
              }
              sx={{
                background: "linear-gradient(135deg, #fefce8 0%, #ecfccb 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #ecfccb 0%, #d9f99d 100%)",
                },
                borderRadius: "12px",
                padding: "0px 12px",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-lime-500 to-yellow-600 shadow-lg shadow-lime-500/20">
                  <PaletteIcon className="text-2xl text-white" />
                </div>
                <h3 className="text-base font-bold text-lime-800">
                  {
                    swagramWeddingData.communityCeremonyPlanning
                      .artCultureEducation.title
                  }
                </h3>
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: "#fefce8", padding: "20px" }}
            >
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {
                  swagramWeddingData.communityCeremonyPlanning
                    .artCultureEducation.description
                }
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {swagramWeddingData?.communityCeremonyPlanning?.artCultureEducation?.artAndCraft?.activities.map(
                  (act, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white border border-lime-200/50 rounded-lg shadow-sm"
                    >
                      <p className="text-sm font-bold text-lime-700 mb-1">
                        {act.name}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Accordion
            elevation={0}
            className="rounded-xl overflow-hidden border border-green-200/60 bg-gradient-to-br from-green-50 to-emerald-50/30"
            sx={{
              "&:before": { display: "none" },
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(34, 197, 94, 0.1)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <div className="h-9 w-9 rounded-lg bg-green-100 flex items-center justify-center hover:bg-green-200 transition-colors">
                  <ExpandMoreIcon className="text-green-700" />
                </div>
              }
              sx={{
                background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                },
                borderRadius: "12px",
                padding: "0px 12px",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20">
                  <HealthIcon className="text-2xl text-white" />
                </div>
                <h3 className="text-base font-bold text-green-800">
                  {
                    swagramWeddingData.communityCeremonyPlanning
                      .healthAndRetirement.title
                  }
                </h3>
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: "#f0fdf4", padding: "20px" }}
            >
              <div className="space-y-2">
                {swagramWeddingData.communityCeremonyPlanning.healthAndRetirement.programs.map(
                  (prog, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white border border-green-200/50 rounded-lg shadow-sm"
                    >
                      <p className="text-sm font-bold text-green-700 mb-1">
                        {prog.name}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {prog.description}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Accordion
            elevation={0}
            className="rounded-xl overflow-hidden border border-green-200/60 bg-gradient-to-br from-white to-green-50/30"
            sx={{
              "&:before": { display: "none" },
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(34, 197, 94, 0.1)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <div className="h-9 w-9 rounded-lg bg-green-100 flex items-center justify-center hover:bg-green-200 transition-colors">
                  <ExpandMoreIcon className="text-green-700" />
                </div>
              }
              sx={{
                background: "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                },
                borderRadius: "12px",
                padding: "0px 12px",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20">
                  <BusinessIcon className="text-2xl text-white" />
                </div>
                <h3 className="text-base font-bold text-green-800">
                  {
                    swagramWeddingData.communityCeremonyPlanning
                      .corporatePrograms.title
                  }
                </h3>
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: "#f9fafb", padding: "20px" }}
            >
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {
                  swagramWeddingData.communityCeremonyPlanning.corporatePrograms
                    .description
                }
              </p>
              <div className="space-y-2">
                {swagramWeddingData.communityCeremonyPlanning.corporatePrograms.programs.map(
                  (prog, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-lg shadow-sm"
                    >
                      <p className="text-sm font-bold text-green-700 mb-1">
                        {prog.name}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {prog.description}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Accordion
            elevation={0}
            className="rounded-xl overflow-hidden border border-lime-200/60 bg-gradient-to-br from-lime-50 to-yellow-50/30"
            sx={{
              "&:before": { display: "none" },
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(132, 204, 22, 0.1)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <div className="h-9 w-9 rounded-lg bg-lime-100 flex items-center justify-center hover:bg-lime-200 transition-colors">
                  <ExpandMoreIcon className="text-lime-700" />
                </div>
              }
              sx={{
                background: "linear-gradient(135deg, #fefce8 0%, #ecfccb 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #ecfccb 0%, #d9f99d 100%)",
                },
                borderRadius: "12px",
                padding: "0px 12px",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-lime-500 to-yellow-600 shadow-lg shadow-lime-500/20">
                  <StarIcon className="text-2xl text-white" />
                </div>
                <h3 className="text-base font-bold text-lime-800">
                  {
                    swagramWeddingData.communityCeremonyPlanning.specialPrograms
                      .title
                  }
                </h3>
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: "#fefce8", padding: "20px" }}
            >
              <div className="space-y-2">
                {swagramWeddingData.communityCeremonyPlanning.specialPrograms.programs.map(
                  (prog, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white border border-lime-200/50 rounded-lg shadow-sm"
                    >
                      <p className="text-sm font-bold text-lime-700 mb-1">
                        {prog.name}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {prog.description}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Accordion
            elevation={0}
            className="rounded-xl overflow-hidden border border-green-200/60 bg-gradient-to-br from-green-50 to-emerald-50/30"
            sx={{
              "&:before": { display: "none" },
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(34, 197, 94, 0.1)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <div className="h-9 w-9 rounded-lg bg-green-100 flex items-center justify-center hover:bg-green-200 transition-colors">
                  <ExpandMoreIcon className="text-green-700" />
                </div>
              }
              sx={{
                background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                },
                borderRadius: "12px",
                padding: "0px 12px",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20">
                  <IdeaIcon className="text-2xl text-white" />
                </div>
                <h3 className="text-base font-bold text-green-800">
                  {
                    swagramWeddingData.communityCeremonyPlanning
                      .guidelinPrinciples.title
                  }
                </h3>
              </div>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: "#f0fdf4", padding: "20px" }}
            >
              <div className="space-y-3">
                {swagramWeddingData.communityCeremonyPlanning.guidelinPrinciples.principles.map(
                  (principle, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white border border-green-200/50 rounded-lg shadow-sm"
                    >
                      <p className="text-sm font-bold text-green-800 mb-1.5">
                        {principle.title}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        </motion.div>
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01, y: -2 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-2xl shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-lime-600" />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-400/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDMiLz48L2c+PC9zdmc+')] opacity-30" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-5 -right-5"
          >
            <GroupIcon className="text-[120px] text-white/20" />
          </motion.div>

          <div className="relative z-10 p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg flex-shrink-0">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div className="flex-1 space-y-3">
                <h3 className="text-xl font-bold text-white">
                  {swagramWeddingData.communityCeremonyPlanning.vision.title}
                </h3>
                <div className="space-y-2.5">
                  <p className="text-sm text-white/95 leading-relaxed">
                    {
                      swagramWeddingData.communityCeremonyPlanning.vision
                        .description
                    }
                  </p>
                  <p className="text-sm text-white/95 leading-relaxed">
                    {
                      swagramWeddingData.communityCeremonyPlanning.vision
                        .mission
                    }
                  </p>
                  <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <p className="text-base font-bold text-white mb-2">
                      {
                        swagramWeddingData.communityCeremonyPlanning.vision
                          .tagline
                      }
                    </p>
                    <p className="text-sm text-white/90 leading-relaxed italic">
                      {
                        swagramWeddingData.communityCeremonyPlanning.vision
                          .conclusion
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const SamskarasSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div
        className="relative h-[400px] rounded-lg overflow-hidden 
                   backdrop-blur-xl
                   bg-green-500/25
                  border border-black/30           
                  shadow-lg"
      >
        <img
          src={tabImages[2]}
          alt="Samskaras"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <h2
            className="text-lg font-bold text-white flex-1 px-5 py-2  backdrop-blur-xl
                   bg-green-500/25 flex space-x-3 items-center"
          >
            <span>
              <LocalFlorist className="text-white text-3xl" />
            </span>
            <span> {swagramWeddingData.twentyTwoSamskaras.title}</span>
          </h2>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        whileHover={{ scale: 1.01 }}
        className="relative overflow-hidden bg-white/70 backdrop-blur border border-green-200 rounded-lg p-4"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-2 right-2 opacity-20"
        >
          <ShineIcon className="text-6xl text-lime-700" />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-60" />

        <div className="relative space-y-1.5">
          <div className="flex items-center gap-2">
            <Info fontSize="small" className="text-green-700" />
            <p className="text-sm text-gray-700">
              {swagramWeddingData.twentyTwoSamskaras.introduction}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Note fontSize="small" className="text-green-800" />
            <p className="text-sm font-semibold text-green-800">
              {swagramWeddingData.twentyTwoSamskaras.note}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-4">
        {swagramWeddingData.twentyTwoSamskaras.samskaras.map(
          (samskara, idx) => (
            <Accordion
              key={idx}
              className="shadow-md hover:shadow-xl transition-all duration-300 border-0 overflow-hidden"
              sx={{
                borderRadius: "12px !important",
                "&:before": { display: "none" },
                background: "linear-gradient(135deg, #ffffff 0%, #f8fdf8 100%)",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="bg-lime-100 rounded-full p-1">
                    <ExpandMore className="text-lime-700" />
                  </div>
                }
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(132, 204, 22, 0.04)",
                  },
                }}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="relative">
                    <div className="absolute inset-0 bg-lime-600 blur-sm opacity-30 rounded-full"></div>
                    <span className="relative bg-gradient-to-br from-lime-500 to-lime-700 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      {samskara.number}
                    </span>
                  </div>

                  <div className="flex-1">
                    <p className="text-base font-semibold text-green-900 mb-1 tracking-tight">
                      {samskara.marathi}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                      {samskara.english}
                    </p>
                  </div>
                </div>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  padding: "20px 24px 24px",
                  borderTop: "1px solid rgba(132, 204, 22, 0.1)",
                }}
              >
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border-l-4 border-amber-400">
                    <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                      Sanskrit
                    </p>
                    <p className="text-base text-gray-800 font-serif italic">
                      {samskara.sanskrit}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-lime-50 to-green-50 p-4 rounded-lg border-l-4 border-lime-500">
                    <p className="text-xs font-bold text-lime-800 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-lime-600 rounded-full"></span>
                      Purpose
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {samskara.purpose}
                    </p>
                  </div>

                  {samskara.when && (
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-blue-400">
                      <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        When
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {samskara.when}
                      </p>
                    </div>
                  )}

                  {samskara.rituals && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-400">
                      <p className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                        Rituals
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {samskara.rituals}
                      </p>
                    </div>
                  )}

                  {samskara.modernContext && (
                    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-5 rounded-xl border-2 border-green-200 shadow-inner">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="bg-green-600 p-1.5 rounded-lg">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          </div>
                          <p className="text-xs font-bold text-green-800 uppercase tracking-wider">
                            Modern Context
                          </p>
                        </div>
                        <p className="text-sm text-gray-800 leading-relaxed font-medium">
                          {samskara.modernContext}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          ),
        )}
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <PhilosophySection />;
      case 1:
        return <ConceptSection />;
      case 2:
        return <SamskarasSection />;
      case 3:
        return <FoodMenuSection />;
      case 4:
        return <ServicesSection />;
      case 5:
        return <RulesSection />;
      case 6:
        return <CommunitySection />;
      case 7:
        return <PricingSection />;
      default:
        return <PhilosophySection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border-b border-green-200 sticky top-0  shadow-sm"
      >
        <div className="w-full mx-auto px-3 py-2">
          <div className="flex items-center justify-between mb-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="bg-green-600 p-1.5 rounded-lg">
                <Spa className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-base font-semibold text-green-800">
                  Swagram
                </h1>
                <p className="text-xs text-lime-600">Weddings Ceremony</p>
              </div>
            </motion.div>

            <button
              className="lg:hidden p-1.5 bg-green-50 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <CloseIcon fontSize="small" />
              ) : (
                <MenuIcon fontSize="small" />
              )}
            </button>
          </div>
          <Box className="hidden lg:block">
            <Tabs
              value={activeTab}
              onChange={(e, v) => setActiveTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "transparent",
                },
              }}
              sx={{
                minHeight: 40,
                "& .MuiTabs-scrollButtons": {
                  color: "#64748b",
                  width: 32,
                  "&.Mui-disabled": { opacity: 0.3 },
                },
              }}
            >
              {categories.map((cat) => (
                <Tab
                  key={cat.id}
                  icon={cat.icon}
                  label={cat.label}
                  iconPosition="start"
                  sx={{
                    minHeight: 40,
                    px: 2,
                    py: 0.75,
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    textTransform: "none",
                    color: "#64748b",
                    borderRadius: "8px",
                    margin: "2px 4px",
                    transition: "all 0.2s ease",

                    "&:hover": {
                      color: "#15803d",
                      backgroundColor: "rgba(101, 163, 13, 0.06)",
                    },

                    "&.Mui-selected": {
                      color: "#fff",
                      background:
                        "linear-gradient(135deg, #65a30d 0%, #15803d 100%)",
                      boxShadow: "0 2px 8px rgba(101, 163, 13, 0.2)",
                    },

                    "& .MuiTab-iconWrapper": {
                      marginRight: 1,
                      fontSize: "1rem",
                    },
                  }}
                />
              ))}
            </Tabs>
          </Box>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden mt-2 space-y-1 overflow-hidden"
              >
                {categories.map((cat) => (
                  <motion.button
                    key={cat.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setActiveTab(cat.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                      activeTab === cat.id
                        ? "bg-green-500 text-white"
                        : "text-gray-700 hover:bg-green-50"
                    }`}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-3 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {createPortal(
        <motion.button
          onClick={() => setOpenEnquiryModal(true)}
          title="Enquiry Now"
          animate={{ y: btnYValue }}
          initial={{ y: windowHeight - 24 - BTN_HEIGHT }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.5,
          }}
          whileHover={{ scale: 1.06, x: -3 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: "fixed",
            right: 0,
            top: 0,
            zIndex: 9999,
            background: "linear-gradient(135deg, #15803d 0%, #65a30d 100%)",
            boxShadow: "-4px 0 20px rgba(21,128,61,0.4)",
            borderRadius: "12px 0 0 12px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            cursor: "pointer",
            border: "none",
            outline: "none",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18" height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg> */}

          <lord-icon
            src="https://cdn.lordicon.com/wtywrnoz.json"
            trigger="loop"
            colors="primary:#ffffff"
            style={{ width: "24px", height: "24px" }}
          ></lord-icon>
          <span
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.04em",
            }}
          >
            Enquiry Now
          </span>

        </motion.button>,
        document.body,
      )}

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-green-800 text-white py-4 mt-4"
      >
        <div className="max-w-6xl mx-auto px-3 text-center">
          <p className="text-xs text-green-200">
            Climate Positive • Ayurvedic • Natural Lifestyle
          </p>
        </div>
      </motion.footer>

      {openEnquiryModal && (
        <MembershipRegistrationModal
          open={openEnquiryModal}
          handleClose={() => setOpenEnquiryModal(false)}
          origin="WeddingCeremony"
          membershipDetails={{ serviceName: "Wedding Ceremony", duration: "" }}
        />
      )}
    </div>
  );
};

export default JoinActivities;

const swagramWeddingData = {
  basicInfo: {
    title_marathi: "स्वग्राम सांस्कृतिक संस्कार उत्सव समारम्भ",
    title_english: "Community Cultural Values Ceremony Celebration",
    subtitle_marathi: "आयुर्वेद नैसर्ग अग्रस्थान उत्सव",
    subtitle_english: "Ayurveda Natural Destination Ceremony",
    theme_marathi: "वायुमण्डल उद्भूत उत्सव",
    theme_english: "Climate Positive Ceremony",
    type: "स्वविवाह Community Wedding",
    description:
      "शुद्ध पारंपारिक, भारतीय, कृषि, स्वास्थ्य, ग्रामीण संस्कृतीसोबतच कार्बन फुटप्रिंट ऐवजी कार्बन क्रेडिट करून निसर्गसंवर्धनास चालना देणारे एकमेव आयुर्वेदिक, शाकाहारी विवाहस्थळ!",
  },

  // Philosophy Section
  philosophy: {
    question: "लग्न म्हणजे काय ",
    tagline:
      "आरोग्यपूर्ण, निसर्गस्नेही आणि मनाला भिडणारा---स्वग्राम लग्नसंस्कार ✨",
    introduction:
      "लग्न... हा शब्द उच्चारला तरी घरात आनंदाच्या लहरी उमटतात. लग्न म्हणजे दोन जिवांचे मिलन, दोन कुटुंबांची सांगड आणि आयुष्यभरासाठी घडवलेली सुंदर आठवण. नावनोंदणीपासून सुरु झालेला हा प्रवास कार्यालय, खरेदी, मानपान आणि हनिमूनपर्यंत येऊन थांबतो. आजकाल स्वभाव जुळवणे, कुंडली पाहणे यासोबतच 'इव्हेंट' कसा मोठा होईल, याकडेच जास्त कल असतो. पण, या सर्व धावपळीत आणि दिखाव्यात ज्या दोन जीवांचे मीलन होणार असते, त्यांच्या 'आरोग्याकडे' मात्र सोयीस्कर दुर्लक्ष होते.",

    problem:
      "लग्नाच्या ताणतणावातून भविष्यात शारीरिक समस्या, मानसिक थकवा आणि अक्षरशः 'इनफर्टिलिटी' (वंध्यत्व) सारख्या गंभीर प्रश्नांना सामोरे जावे लागते. लग्न होणे जसे अवघड झाले आहे, त्यापेक्षा लग्नानंतर निरोगी संतती होणे आज अधिक कठीण झाले आहे. यावर उपाय काय?",

    solution:
      "यावर एकमेव शाश्वत उपाय म्हणजे आपल्या संस्कृतीने दिलेले \"पाच दिवसांचे लग्न!\" आणि हीच मूळ संकल्पना घेऊन येत आहे 'स्वग्राम'. हे पाच दिवसांचे लग्न आपण आपल्या सोईप्रमाणे कोणताही संस्कार न सोडता कमी दिवसांत टप्प्याटप्प्याने करू शकतो. जिथे खुद्द धन्वंतरि वैद्य आपल्या लग्नकार्यात सहभागी होऊन तुम्हाला आरोग्यपूर्ण वैवाहिक जीवनाची अनमोल भेट देणार आहेत.",

    nature_wedding_concept: {
      title: "निसर्गाचा लग्नसोहळा : एक आदर्श लग्नसंकल्पनेबद्दल जाणून घेऊ...",
      description:
        "आपण ज्या निसर्गाचा भाग आहोत, तो निसर्ग किती सुंदर रीतीने आपला वंशवेल वाढवतो, हे पाहण्यासारखे आहे. संपूर्ण जीवसृष्टीची निर्मिती आणि पोषण करण्यासाठी स्वतः वनस्पति फुलांनी बहरतात. शृंगार करुन मोहोरलेल्या फुलांमध्ये एका स्त्रीकेशराभोवती असंख्य पुरुषकेशरांची निर्मिती होऊन परागीकरण म्हणजे स्त्री-पुंकेशरांचे लग्न लावून मधुचंद्र साजरा होतो. वृक्षवेली जेव्हा फुलांनी बहरतात, तेव्हा स्त्रीकेशर आणि पुंकेशरांचा अतिशय देखणा मिलाप घडतो---परागीकरण होते. फुलपाखरे, मधमाश्या, भ्रमर या सगळ्यांची लग्नघरातील वऱ्हाड्यासारखी वर्दळ; आकाशातील शब्द, वाऱ्याचा स्पर्श, तेजाचे रूप, जलाचा रस आणि पृथ्वीचा गंध---पंचतत्त्वांनी सजलेला मधुचंद्र निर्माण होतो.",
      conclusion:
        "निसर्गातली ही समरसता, ही पवित्रता आणि ही आरोग्याची शाश्वत शपथच स्वग्राम आपल्या लग्नात उतरवते. या नैसर्गिक लग्नकार्यासाठी असंख्य पाहुणे म्हणजे अगणित सूक्ष्म कीटक, मधमाश्या, फुलपाखरे, भ्रमर असे वऱ्हाडी दुरवरून हजेरी लावतात त्यावेळी पाहुण्यांना मधाची मेजवानी दिली जाते. पुंकेशर म्हणजे पुरुषबीज म्हणजेच नवरदेव-प्रियकराला स्त्रीकेशर म्हणजे नवरी-प्रियसिकडे घेऊन जाण्यासाठी आलेल्या पाहुण्यांच्या भोजनाची तजवीज म्हणजेच मध. निसर्गाच्या ब्युटीपार्लरमध्ये तयार होऊन, फुलांची वस्त्रे लेवून वृक्षवेली सज्ज होतात. निरभ्र आकाशाखाली, हवेच्या मंद झुळुकीसोबत आणि पक्ष्यांच्या किलबिलाटात हा गंधर्वनगरीतल्या सारखा सोहळा पार पडतो. येथे ना कोणाचा मानपान दुखावला जातो, ना पैशाचा अपव्यय होतो, आणि ना प्रदूषणाचा लवलेश असतो. फक्त आणि फक्त 'जीवसंवर्धन'! अब्जावधी वर्षांपासून हे पवित्र कार्य निसर्ग अविरत करत आला आहे.",
    },

    modern_reality: {
      title: "आजची वास्तविकता : आनंदाचा उत्सव की तणावाचे ओझे?",
      description:
        "माणसाने निसर्गाकडून 'लग्न' ही संकल्पना घेतली खरी, पण आज आपण त्याचे काय केले आहे? आज लग्नसोहळा म्हणजे प्रदूषणाचा आणि तणावाचा अड्डा बनला आहे. मध्यवयापर्यंत करिअरसाठी केलेली कसरत आणि त्यात लग्न ठरवताना होणारी दमछाक जीवघेणी ठरते. साखरपुडा एका ठिकाणी, हळद दुसरीकडे, संगीत तिसरीकडे, विधि चौथीकडे आणि रिसेप्शन भलतीकडेच! प्रत्येक वेळी वेगळी थीम, वेगळा पेहराव आणि मेकअप. या धावपळीत नवरा-नवरी अक्षरशः कोमेजून जातात. ज्या वेळी शरीर आणि मनाला विश्रांतीची गरज असते, त्याच वेळी हे जोडपे थकलेले असताना दूरवर कुठेतरी अनोळखी ठिकाणी 'हनिमून'साठी जाते. अनेकदा तिथून परतताना गोड आठवणींऐवजी आजारपण सोबत येते. खरेतर लग्नाची आणि मधुचंद्राची आठवण आयुष्यभर जिवंत राहण्यासाठी ते राहत्या घरी करावे असे शास्त्र सांगते. लग्न म्हणजे नुसते तांदूळ टाकणे नव्हे. त्यामुळे लग्न ठरविण्यापासून ते हनिमूनपर्यंत आणि तेथून अपत्यप्राप्तीपर्यंतचा एकूण सर्वच प्रवास म्हणजेच लग्नसंस्कार होय. या सर्व समस्यांवर मात करण्यासाठी आणि आपल्या भावी पिढीला निरोगी आयुष्य देण्यासाठी 'स्वग्राम' घेऊन आले आहे नैसर्गिक आणि आरोग्यपूर्ण विवाह संकल्पना.",
    },
  },

  // Swagram Concept
  swagramConcept: {
    title: "स्वग्राम: आरोग्य, परंपरा आणि निसर्गाचा साज",
    subtitle: "जिथे लग्न एक 'सोपस्कार' नाही, तर 'संस्कार' आहे!",
    description:
      "स्वग्राम हे फक्त वेडिंग वेन्यू नाही; हा संपूर्ण लग्नसंस्कार आहे---निसर्गाच्या कुशीत, वैदिक विधींनी आणि आयुर्वेदीय आधाराने घडणारा, एकाच मंगल ठिकाणी पूर्ण होणारा. लग्नाचा अर्थ केवळ तांदूळ (अक्षदा) टाकणे नव्हे. जन्मापासून लग्नापर्यंतचे १४ संस्कार आणि तिथून पुढे अपत्यप्राप्तीपर्यंतचा प्रवास म्हणजे खरा विवाह संस्कार!",

    specialFeatures: {
      title:
        "स्वग्राममधील लग्नाची वैशिष्ट्ये म्हणजे शुद्ध वैदिक आयुर्वेदिक, पारंपरिक महाराष्ट्रीय, भारतीय नैसर्गिक जीवनशैली पूरक विवाहसोहळा:",
      features: [
        {
          title: "वन-स्टॉप सोल्यूशन",
          description:
            "विवाहपूर्व संस्कार (Pre-wedding), पाहणे, पसंत करणे, साखरपुडा, हळद, मुख्य लग्नसोहळा आणि मधुचंद्र... सर्व काही एकाच मंगल आणि निसर्गरम्य ठिकाणी!",
        },
        {
          title: "आरोग्याची हमी",
          description:
            "आयुर्वेद सल्ला, नाडी परीक्षण, उपचार, पंचकर्म इत्यादि सोईंनी युक्त अशा नैसर्गिक वातावरणामध्ये पशू-पक्षी, फुलपाखरे आणि वनस्पतींच्या सान्निध्यात विवाह झाल्याने शारीरिक व मानसिक आरोग्य सुधारते.",
        },
        {
          title: "तणावमुक्त वातावरण",
          description:
            "इथे धावपळ नाही, तर शांतता आहे. इथे वैद्यकीय मार्गदर्शनाखाली (Vedic & Ayurvedic lifestyle) जोडप्याची शारीरिक आणि मानसिक तयारी करून घेतली जाते.",
        },
        {
          title: "पंचमहाभूतांची साक्ष",
          description:
            "अवकाशाचा शब्द, वायूचा स्पर्श, तेजाचे रूप, जलाचा रस आणि पृथ्वीचा गंध... या पाच तत्त्वांच्या साक्षीने आणि आमच्या हजारो वर्षांच्या शेकडो पिढ्यांच्या जाणत्या बुजुर्गांनी तयार केलेल्या संस्कारांनी हा सोहळा पार पडतो.",
        },
        {
          title: "आयुर्वेदिक उपचार",
          description:
            "आयुर्वेदिक सिद्ध तेल -- तुपाने सर्वांग अभ्यंग, शिरोधारा, पादाभ्यंग आणि विष-भेसळमुक्त उद्वर्तन हळदी लेपानंतर केलेला स्नान-संस्कार शरीराला डिटॉक्स करून स्किनचा पीएच बॅलन्स करवून स्ट्रेस-हार्मोन लेव्हल डाऊन करतो.",
        },
        {
          title: "जोडीने योगाभ्यास",
          description:
            "जोडीने अग्निहोत्र, वैदिक हवन, सूर्यनमस्कार, कपल योग यामुळे व्हिटॅमिन D, स्पर्म-ओव्हा क्वालिटी, लंग-कॅपॅसिटी वाढून वैयक्तिक आयुष्यात आनंद भरला जातो. बेडरूम स्टॅमिना ↑",
        },
        {
          title: "मधुचंद्र आहार",
          description:
            "चांदण्या रात्रीत विशेष 'मधुचंद्र आहार' दिला गेल्याने ऑक्सिटोसिन, बाँडिंग हार्मोन वाढल्याने उभयतामधील नाजुक बंध आयुष्यभरचे टिकाऊ मजबूत बनतात.",
        },
      ],
      conclusion:
        "आयुष्य म्हणजे सुंदर आठवणींचे भांडार आहे. लग्नाच्या आणि मधुचंद्राच्या आठवणी आयुष्यभर ताज्या राहाव्यात, यासाठी त्या हक्काच्या आणि नैसर्गिक ठिकाणीच निर्माण व्हायला हव्यात. ज्या ठिकाणी आपण दरवर्षी प्रत्येक लग्न वाढदिवसाला जाऊन द्विगुणित करून आपली क्षमता वाढवू शकतो.",
    },

    fiveDayWedding: {
      title: "पाच दिवस---पाच तत्त्व---पाच संस्कार",
      description:
        "धन्वंतरी वैद्यांच्या सांगण्यावरून 'स्वग्राम'ने तयार केला 'पाच दिवसांचा लग्न-संस्कार'. कोणत्याही 'रनिंग अराउंड'ची गरज नाही. सर्व विधी एकाच हिरवळीत, एकाच वेळी, एकाच वैद्याच्या देखरेखीखाली की जिथे आमचे वैद्य लग्नाच्या प्रत्येक टप्प्यावर आरोग्याचे मार्गदर्शन करतात:",
      services: [
        "लग्नपूर्व आरोग्य तपासणी",
        "फर्टिलिटी काउन्सलिंग",
        "स्ट्रेस मॅनेजमेंट",
        "नैसर्गिक जीवनशैलीचे मार्गदर्शन",
        "अपत्यप्राप्तीसाठी आयुर्वेदिक सल्ला",
      ],
    },
  },

  // Why Choose Swagram
  whyChooseSwagram: {
    title: "स्वग्राम का निवडावे?",
    reasons: [
      {
        point: "नैसर्गिक, हृदयस्पर्शी आणि व्यावसायिक",
        detail: "नियोजन, समन्वय, अंमलबजावणी---सगळं सुसूत्रपणे.",
      },
      {
        point: "आरोग्य हा प्रथम दृष्टीकोन",
        detail: "लग्न हा संस्कार---नुसताच सोहळा नाही.",
      },
      {
        point: "खर्चावर नियंत्रण",
        detail: "एकाच स्थळी सर्व कार्यक्रम---वेळ, उर्जा आणि पैशांची बचत.",
      },
      {
        point: "पर्यावरणपूरक",
        detail: "निसर्गाला न दुखावता निसर्गाचा साज.",
      },
      {
        point: "पुढच्या पिढ्यांचा विचार",
        detail: "शारीरिक, मानसिक आणि सामाजिक समतोलाची बीजं आजच पेरूया.",
      },
    ],
    callToAction:
      "आरोग्यपूर्ण, आनंददायी आणि सात्विक विवाह सोहळ्यासाठी आजच 'स्वग्राम' परिवारात सहभागी व्हा!",
    promise:
      'स्वग्राममध्ये तुमचा प्रत्येक क्षण "अर्थपूर्ण" बनवणे हीच आमची जबाबदारी. लग्न ठरल्यापासून मधुचंद्रापर्यंत---आणि त्या पुढील आनंदी सहजीवनापर्यंत---आरोग्य, समरसता आणि प्रेम यांची शपथ आम्ही तुमच्या हातात ठेवतो. लग्न म्हणजे नुसते तांदूळ टाकणे नव्हे; ते दोन जीवांचे, दोन कुटुंबांचे आणि दोन संस्कारांचे सुंदर एकत्रीकरण आहे.',
  },

  // Core Values
  coreValues: {
    sayYesTo: {
      title: "Say yes to",
      values: [
        { marathi: "नैसर्गविधान", english: "Natural Lifestyle" },
        { marathi: "शाकहारय", english: "Vegetarians" },
      ],
    },
    sayNoTo: {
      title: "Say no to",
      values: [
        { marathi: "मांसाहारय", english: "Non Vegetarians" },
        { marathi: "मद्य", english: "Alcohol" },
        { marathi: "मादकद्रव्य", english: "Narcotic Drugs" },
        { marathi: "व्यसन", english: "Addiction" },
        { marathi: "धूम्रपान", english: "Smoking" },
        { marathi: "निष्ठीवन", english: "Spitting" },
        { marathi: "कृतक", english: "Plastic" },
        { marathi: "रासायनिक", english: "Chemical" },
        { marathi: "रसायने", english: "Chemical Fertilizer" },
        { marathi: "कीटनाशक", english: "Pesticide" },
        { marathi: "तृणनाशक", english: "Herbi Weedicide" },
      ],
    },
    stronglyNoTo: {
      title: "Say strongly no to",
      values: [{ marathi: "वर-वधूदक्षिणा", english: "Dowry" }],
    },
    stronglyYesTo: {
      title: "Say strongly yes to",
      values: [{ marathi: "स्त्रीसमानता", english: "Women Equality" }],
    },
    message:
      "व्यर्थ समय, श्रम & धन असणाऱ्या भयंकर लग्नपद्धतीला फाटा देऊन विशाल विचारांनी प्रेरीत झालेल्या सर्व आदरणीय मंडळींना असा लग्न सोहळा करण्यासाठीचे आग्रहाचे निमंत्रण!",
  },

  // Pricing Structure
  pricing: {
    venueCharges: {
      title: "स्वग्राम सेवा शुल्क",
      packages: [
        {
          duration: "32 hours",
          timing: "7 am to 3 pm (next day)",
          cost: "Rs 3,50,000 /-",
        },
        {
          duration: "21 hours",
          timing: "6 pm to 3 pm (next day)",
          cost: "Rs 2,50,000 /-",
        },
        {
          duration: "10 hours",
          timing: "7 am to 4 pm (or) 10 am to 8 pm (same day)",
          cost: "Rs 1,50,000 /-",
        },
        {
          duration: "5 hours",
          timing: "9 am to 2 pm (or) 3 pm to 8 pm",
          cost: "Rs 90,000 /-",
        },
        {
          duration: "Extra hour",
          timing: "Per hour",
          cost: "Rs 15,000 /-",
        },
        {
          duration: "Deposit",
          timing: "Refundable",
          cost: "Rs 25,000 /-",
        },
      ],
    },

    accommodation: {
      title: "उपलब्ध निवास",
      capacity:
        "18 Indoor room Living + 20 Outdoor Living लोकांची निवास व्यवस्था उपलब्ध आहे",
      rates: [
        {
          duration: "32 hours",
          cost: "Rs 2000 /- per person",
        },
        {
          duration: "21 hours",
          cost: "Rs 1500 /- per person",
        },
        {
          duration: "10 hrs",
          cost: "Rs 3000/- per room",
        },
        {
          duration: "5 hrs",
          cost: "Rs 2000 /- Per room",
        },
      ],
    },
  },

  // Food Menu
  foodMenu: {
    title: "जेवण: प्रीतिभोजनम्: Food Celebration",
    venue: "भोजनालय Dining Hall",
    specialFeatures: [
      "विहीरीचे पाणी कांस्य किंवा स्टील ग्लास",
      "चुलीवर स्वयंपाक",
      "केळी पान / पत्रावळ / सुपारी थाली / कांस्य थाली (मर्यादित)",
    ],

    menuItems: [
      {
        category: "स्वागतपान / पेय",
        description:
          "स्वग्राम विशेष गुड हरिचाया Jaggery Green Tea / गुडजल / कोकम सरबत / लिंबू सरबत / ताक (साधं / जिरा) / पन्हं (ऋतुनुसार)",
        costPerPerson: "Free",
      },
      {
        category: "न्याहारी / अल्पोपाहार / सात्म्याहार",
        description:
          "स्वग्राम विशेष खपली गहू लापशी / उपमा / मसाले भात / मेतकूट भात / पेज / खिचडी / भाताची खीर / शेवया खीर / शेवया उपमा",
        costPerPerson: "200",
      },
      {
        category: "स्वग्राम पूर्णाहार",
        description:
          "वरण भात तूप / मुगाची खिचडी तूप, एक भाजी, आरोग्यपूर्ण गोड पदार्थ, गव्हाची पोळी / भाकरी, भाजलेला पापड, कोशिंबीर / सॅलड, सैंधव मीठ + लिंबू + चटणी + लोणचे",
        costPerPerson: "700",
      },
      {
        category: "सुग्रास प्रीतिभोजनम्",
        description:
          "वरण भात तूप / मुगाची खिचडी तूप, एक पातळ भाजी, एक सुकी भाजी, एक गोड पदार्थ, मसाले भात, गव्हाची पोळी, तळण, पापड, कोशिंबीर / सॅलड, सैंधव मीठ + लिंबू + चटणी + लोणचे",
        costPerPerson: "900",
      },
      {
        category: "पुरणपोळी",
        description:
          "पुरण पोळी, कटाची आमटी, एक सुकी भाजी, गुळवणी, इंद्रायणी भात, कुरडई, भजी, कोशिंबीर, तूप",
        costPerPerson: "1000",
      },
    ],

    importantNotes: [
      "गोडाचे दोन पदार्थ ठेवल्यास प्रति ₹100/- अतिरिक्त आकारले जातील.",
      "तळणाचे सुद्धा अतिरिक्त पदार्थ वाढल्यास जसे की पुरी (चपाती -- पोळी असताना सुद्धा) प्रति ₹100/- अतिरिक्त आकारले जातील.",
      "वरील ठरलेल्या स्वागतपान -- पेय / न्याहारी -- अल्पोपाहार -- सात्म्याहार / स्वग्राम पूर्णाहार / सुग्रास प्रीतिभोजनम् / पुरणपोळी यामध्ये बदल करता येणार नाहीत. यामध्ये काही कमी केल्यास सेवाशुल्क कमी होणार नाही परंतु वाढविल्यास मात्र सेवा शुल्कही वाढेल.",
      "स्वग्राममध्ये आरोग्यपूर्ण पंगतीने सामूहिक उत्सव साजरे होण्यासाठी लोक येत असतात त्यामुळे याव्यतिरिक्त चायनीज, इटालियन, पंजाबी, गुजराती, राजस्थानी, कॉन्टिनेन्टल इत्यादि मेनू आणि इतर फास्टफूडची मागणी करूच नये. बुफेची मागणी करू नये. जमीनीवर बसून पाटावर ताट ठेऊन जेवण करण्याने आरोग्यप्राप्ती सोबतच सौख्य वाढणार आहे. ज्यांना बसता येत नाही त्यांचेसाठी विशेष सोय केली जाईल.",
    ],

    smallEventPackages: {
      title: "इतर लहान समारंभांसाठी दर (कमाल ७५ व्यक्तींपर्यंत)",
      subtitle: "प्रति व्यक्तीसाठी :",
      halfDay: {
        title:
          "अर्धा दिवस : फक्त सकाळी (06.45 Am to 01.45 Pm) किंवा सायंकाळी (02.15 Pm to 07.15 Pm)",
        packages: [
          {
            description: "स्वग्राम पूर्णाहार + स्वागतपान",
            cost: "1400/-",
          },
          {
            description: "सुग्रास प्रीतिभोजनम् + स्वागतपान",
            cost: "1500/-",
          },
          {
            description: "पुरणपोळी भोजन + स्वागतपान",
            cost: "1600/-",
          },
        ],
      },
      fullDay: {
        title: "पूर्ण दिवस : (06.45 Am to 07.15 Pm)",
        packages: [
          {
            description: "स्वग्राम पूर्णाहार + स्वग्राम पूर्णाहार + स्वागतपान",
            cost: "2800/-",
          },
          {
            description:
              "सुग्रास प्रीतिभोजनम् + स्वग्राम पूर्णाहार + स्वागतपान",
            cost: "3000/-",
          },
          {
            description: "पुरणपोळी भोजन + स्वग्राम पूर्णाहार + स्वागतपान",
            cost: "3200/-",
          },
        ],
      },
    },
  },

  // Value Added Services
  valueAddedServices: {
    title: "Value added Services",
    services: [
      {
        service: "Ayurvedic therapy (pre and post wedding)",
        cost: "Based on consultation with experts",
      },
      {
        service: "Pre-wedding Shoot",
        cost: "Hourly basis: Customized",
      },
      {
        service: "Bailgada Varat + Vajantri (from Main gate to Swagram)",
        cost: "20,000/- (45 minutes)",
      },
      {
        service: "Decoration (Only natural Flowers / plants / Leaf)",
        cost: "Based on Quotation (Decorators available)",
      },
      {
        service: "Photography + Videography",
        cost: "Based on Quotation (Photographers available)",
      },
    ],
  },

  // Available Locations
  availableLocations: {
    title: "Available Locations for Functions",
    locations: [
      {
        name: "Swagram Vedika",
        capacity: "100-150",
      },
      {
        name: "Swagram Sabhagruh",
        capacity: "250-300",
      },
      {
        name: "Swagram Amarai",
        capacity: "200-250",
      },
      {
        name: "Swagram Mukhya Chouk",
        capacity: "150-200",
      },
      {
        name: "Swagrama Vihir parisar",
        capacity: "50-100",
      },
      {
        name: "Swagram wellness center area",
        capacity: "100-150",
      },
      {
        name: "Swagram Mukhya Ghar",
        capacity: "25-75",
      },
    ],
  },

  // Rules and Regulations
  rulesAndRegulations: {
    title: "स्वग्राम Community - विवाह सोहळ्यासाठी नियमावली",
    subtitle:
      "स्वग्राम Community जैवविविधता आणि नैसर्गिक जीवनशैली पूरक आयुर्वेद योग निसर्ग कृषि ग्रामीण स्वास्थ्य पर्यटन ग्राम.",
    introduction:
      "स्वग्राम Community हे हॉटेल किंवा रिसॉर्ट नाही तर स्वास्थ्यवर्धक ग्राम आहे. आम्ही विवाहपूर्व आणि विवाहोत्तर वर-वधूसाठी आयुर्वेद थेरपी घेण्याचा आग्रह करतो. ज्यामुळे नवविवाहित दाम्पत्याला एक आरोग्यदायी आणि सकारात्मक ऊर्जा मिळण्याचा अनुभव घेता येईल आणि त्यांचे वैवाहिक जीवन आनंददायी सुरुवात होईल. आपल्या लग्नसंस्कारामध्ये याचा अंतर्भाव करण्याची आम्ही विनंती करतो. आपणांस विशेष सवलतीच्या दरात ही सुविधा पुरविली जाईल.✨",

    inclusions: {
      title: "समाविष्ट सेवा (Inclusions)",
      items: [
        "250-300 खुर्च्यांची व्यवस्था",
        "पंगत व्यवस्था (पारंपरिक जेवण मांडणी पद्धत)",
        "पाट-चौरंग (विवाह विधींसाठी पारंपरिक आसन व्यवस्था)",
        "होमकुंड (विवाह हवन व धार्मिक विधींसाठी अग्निकुंड)",
        "माइक आणि साऊंड सिस्टीम",
      ],
    },

    exclusions: {
      title: "पाहुण्यांनी स्वतः करण्याच्या गोष्टी (Exclusions)",
      items: [
        "पूजा साहित्य व विधींसाठी लागणाऱ्या वस्तू",
        "गुरुजी (पुजारी) व धार्मिक विधींसाठी व्यक्तींची व्यवस्था",
        "वरमाला/हार व फुलांची व्यवस्था",
        "साखरपुड्याचे पदार्थ",
        "संपूर्ण डेकोरेशनसाठी विशेष सामग्री आणि पूर्णतः नियोजन. आमच्यासोबत चर्चा करून तसे डेकोरेशन करावे.",
      ],
      note: "(वरील सर्व गोष्टींची व्यवस्था स्वग्रामतर्फे करायची असल्यास, त्यासाठी वेगळा आकार लागू होईल.)",
    },

    sections: [
      {
        number: 1,
        title: "बुकिंग व पेमेंट (देयक प्रक्रिया)",
        rules: [
          "विवाह सोहळ्यासाठी आगाऊ बुकिंग करणे आवश्यक आहे.",
          "बुकिंगच्या वेळी 50% अमाउंट (नॉन-रिफंडेबल ठेव) भरावी लागेल.",
          "संपूर्ण भाडे रक्कम आणि Deposit 15 दिवस आधी भरावी लागेल.",
          "अतिरिक्त खर्च (वेळ वाढवणे, नुकसान भरपाई, इतर सेवा) डिपॉझिट मधून कापले जाईल",
          "कार्यक्रमानंतर 48 तासांत डिपॉझिट परत मिळेल",
        ],
      },
      {
        number: 2,
        title: "स्थळाचा वापर व वेळेचे नियम",
        rules: [
          "वेळेत वाढ झाल्यास अतिरिक्त प्रति तास शुल्क लागू होईल.",
          "मोठ्या आवाजातील DJ, संगीत किंवा ध्वनी याठिकाणी चालणार नाहीत.",
          "गरजेनुसार संगीत आणि ध्वनिप्रक्षेपकांची सोय इथे केली जाते. स्थानिक नियमांनुसार याची मुभा देण्यात येते.",
        ],
      },
      {
        number: 3,
        title: "पारंपरिक मराठमोळ्या निसर्गप्रेमी सजावटीचे नियम",
        rules: [
          "फक्त नैसर्गिक आणि पर्यावरणपूरक सजावट करण्यास परवानगी आहे (फुलांचे तोरण, रांगोळी, दिवे).",
          "थर्माकोल, प्लास्टिक, कृत्रिम फुले, आणि इतर निसर्गबाह्य साहित्य वापरण्यास सक्त मनाई आहे.",
          "कोणत्याही प्रकारच्या फटाक्यांच्या वापरास परवानगी नाही.",
          "सजावट वेळेत पूर्ण करावी लागेल आणि लग्नसोहळा संपल्यानंतर ते वेळेत काढून घेऊन जावे लागेल.",
        ],
      },
      {
        number: 4,
        title: "भोजन व केटरिंग नियम",
        rules: [
          "फक्त पारंपरिक शुद्ध शाकाहारी, सेंद्रिय मराठी भोजन दिले जाईल.",
          "बाहेरील केटरिंग सेवा, स्टॉल किंवा खानपान सेवा करता येणार नाही.",
          "अन्नाची नासाडी टाळावी व स्वच्छतेचे नियम पाळावेत.",
        ],
      },
      {
        number: 5,
        title: "पाहुण्यांची संख्या व निवास व्यवस्था",
        rules: [
          "लोकांची निवास व्यवस्था उपलब्ध आहे.",
          "खोल्या आणि बाह्य निवास फक्त आगाऊ बुकिंगनुसार दिले जातील. अचानक व्यवस्था होणार नाही.",
          "अगदीच करावी लागल्यास अतिरिक्त पाहुण्यांसाठी वेगळे शुल्क लागू होईल.",
        ],
      },
      {
        number: 6,
        title: "मद्यपान, धूम्रपान आणि तंबाखू उत्पादने (संपूर्णतः बंदी)",
        rules: [
          "स्वग्राम Community मध्ये मद्यपान, धूम्रपान, तंबाखू, गुटखा, पानमसाला, अमली पदार्थ यांचे सेवन पूर्णतः प्रतिबंधित आहे.",
          "नियम मोडल्यास दंड लागू होईल व बुकिंग रद्द केली जाईल.",
        ],
      },
      {
        number: 7,
        title: "पार्किंग व वाहतूक व्यवस्था",
        rules: [
          "५०-60 चारचाकी वाहनांसाठी पार्किंगची सोय उपलब्ध आहे.",
          "जेसीबी / क्रेनला परवानगी नाही.",
          "सामान उतरवल्यानंतर सर्व वाहने बाहेरच पार्क करावी लागतील.",
          "आम्ही पर्यावरणपूरक वाहतूक पर्यायांना अधिक प्रोत्साहन देतो. वाहने कमीत कमी आणवित.",
          "आपल्या जबाबदारीवर पार्क करावीत.",
        ],
      },
      {
        number: 8,
        title: "पारंपरिक मराठी संस्कृती व पेहराव",
        rules: [
          "आपल्या लग्नाच्या थीममध्ये पाहुण्यांनी पारंपरिक मराठी पोशाख परिधान करावा असे अपेक्षित आहे.",
          "मराठी संगीत, सनई, शास्त्रीय संगीत, यांना अधिक प्रोत्साहन दिले जावे.",
        ],
      },
      {
        number: 9,
        title: "स्वच्छता व कचरा व्यवस्थापन",
        rules: [
          "शून्य कचरा धोरण (Zero Waste Policy) अवलंबले जाईल.",
          "प्लास्टिक वस्तू, डिस्पोजेबल प्लेट्स/कप यांना परवानगी नाही.",
          "Swagram staff not responsible for post-handover cleaning/clearance.",
          "Guest/vendors responsible for complete site clearance (Within 12 hours)",
          "Venue to be returned in original condition",
        ],
      },
      {
        number: 10,
        title: "वीजपुरवठा (Power Supply)",
        rules: [
          "फक्त कायमस्वरूपी लाईट्ससाठी जनरेटर बॅकअप उपलब्ध आहे.",
          "कार्यक्रमासाठी आवश्यक असलेल्या विशेष लाईटिंगसाठी जनरेटरची व्यवस्था पाहुणे / डेकोरेटर यांनी स्वतः करावी.",
          "नियमित सॉकेट्सवर जास्त वीजभाराची (हाय-लोड) उपकरणे वापरण्यास मनाई आहे.",
        ],
      },
      {
        number: 11,
        title: "पाहुणे व विक्रेते (Guest & Vendor) भेटी -- नियम",
        rules: [
          "बुकिंगनंतर पाहुणे किंवा विक्रेत्यांनी साइटला भेट देण्यापूर्वी Swagrama टीमला पूर्वसूचना देणे आवश्यक आहे.",
          "यामध्ये नियोजन बैठक, मोजमाप (measurement) किंवा तयारीसाठीच्या भेटींचा समावेश आहे.",
          "पूर्वसूचना न दिलेल्या भेटींना परवानगी दिली जाणार नाही, कारण सुरक्षितता व दैनंदिन व्यवस्थापन अबाधित ठेवणे आवश्यक आहे.",
        ],
      },
      {
        number: 12,
        title: "रद्द करण्याचे धोरण (Cancellation Policy)",
        rules: [
          "बुकिंगनंतर १ महिन्याच्या आत किंवा कार्यक्रमाच्या ३ महिने आधी रद्द केल्यास २५% रक्कम रद्द शुल्क म्हणून आकारली जाईल.",
          "वरील कालावधीनंतर रद्द केल्यास एकूण भाड्याच्या ५०% रक्कम Swagrama कडे राखून ठेवली जाईल.",
          "कार्यक्रमाच्या ३० दिवसांच्या आत रद्द केल्यास पूर्ण रक्कम Swagrama कडे राखून ठेवली जाईल.",
        ],
        note: "नैसर्गिक आपत्तीमुळे कार्यक्रम रद्द झाल्यास त्याची जबाबदारी Swagrama स्वीकारणार नाही. अशा परिस्थितीतही वरील रद्द करण्याचे धोरण लागू राहील.",
      },
    ],
    conclusion:
      "ही नियमावली स्वग्राम Community मध्ये शुद्ध, संस्कारशील आणि पर्यावरणपूरक आयुर्वेदिक पारंपरिक मराठमोळ्या विवाह संस्कृतीचे संरक्षण करेल.",
    finalNote:
      "आम्ही विवाह अत्यंत सहृदयतेने निश्चित यशस्वी करू याची आम्ही ग्वाही देत आहोत. त्याबद्दल आम्ही निश्चिंत राहावे. आपला व्यवहार मात्र वेळेत पूर्ण करावा ही कळकळीची विनंती.",
  },

  // Community Ceremony Planning
  communityCeremonyPlanning: {
    title:
      "स्वग्राम सांस्कृतिक संस्कार उत्सव समारम्भ - Community Cultural Values Ceremony Celebration",
    subtitle:
      "आयुर्वेद नैसर्गिक अग्रस्थान उत्सव - Ayurveda Natural Destination Ceremony",
    theme: "वायुमंडल उद्भूत उत्सव - Climate Positive Ceremony",
    type: "स्वउत्सव Community Ceremony",

    features: {
      title: "स्वग्राम - आमचे वैशिष्ट्य",
      description:
        "स्वग्राम हे शुद्ध पारंपारिक, भारतीय, कृषि, स्वास्थ्य आणि ग्रामीण संस्कृतीसोबतच कार्बन फुटप्रिंट ऐवजी कार्बन क्रेडिट करून निसर्गसंवर्धनास चालना देणारे एकमेव आयुर्वेदिक, शाकाहारी उत्सवस्थळ आहे!",
      vision:
        "हे नाव गावाकडील प्रसन्न आणि आपलेपणाच्या वातावरणाची जाणीव करून देते. विविध सांस्कृतिक कार्यक्रम आयोजित करून भारतीयत्व सिद्ध करत वसुधैव कुटुंबकम् कडे वाटचाल करणे आमचे उद्दिष्ट आहे.",
    },

    ayurvedicPrograms: {
      title:
        "स्वग्रामात साजरे करता येणारे आयुर्वेदिक व निसर्गसंवर्धक कार्यक्रम",
      note: "लग्न -- विवाह हा 16 ते 22 संस्कारांमध्ये सर्वात महत्वाचा संस्कार की जो सर्व जाती-धर्म-संप्रदाय म्हणजेच अखंड विश्वात केलाच जातो. याबद्दल आपण वरती संपूर्ण माहितीपत्रक असणारे कोटेशन तयार केलेले आहे. या व्यतिरिक्त स्वग्रामात साजरे करता येणारे शुद्ध शाकाहारी कार्यक्रम पुढील प्रमाणे:",
      programs: [
        {
          name: "लग्नसोहळ्यापूर्वीचे कार्यक्रम",
          description:
            "संगीत, मेहंदी, हल्दी - सर्व आयुर्वेदिक नैसर्गिक पद्धतीने",
        },
        {
          name: "नामकरण समारंभ",
          description: "पारंपारिक आयुर्वेदिक पोषणासह",
        },
        {
          name: "मुंज (उपनयन संस्कार)",
          description: "वैदिक परंपरेतील शुद्ध शाकाहारी आहार",
        },
        {
          name: "अभिष्टचिंतन सोहळा",
          description: "निसर्गसंवर्धन थीमसह",
        },
        {
          name: "पारिवारिक जमावेळ / नातेवाईकांचे भेटसमारंभ",
          description: "कृषि अनुभव समावेशासह",
        },
        {
          name: "निवृत्ती उत्सव / वाढदिवस समारंभ",
          description: "आयुष्यभर स्वस्थ राहण्याच्या सूत्रांसह",
        },
        {
          name: "मंगळगौरी उत्सव - हल्दी कुंकू",
          description: "नैसर्गिक हर्बल रंगांसह",
        },
        {
          name: "संगीत संध्या",
          description: "वायुमंडल शुद्धीकरणासाठी वैदिक संगीत",
        },
        {
          name: "कला, हस्तकला किंवा सांस्कृतिक कार्यशाळा",
          description: "नैसर्गिक रंग आणि माध्यमांचा वापर",
        },
        {
          name: "कॉर्पोरेट रिट्रीट / टीम बिल्डिंग",
          description: "कार्बन न्यूट्रल कार्यक्रम",
        },
        {
          name: "योग ध्यान आणि आजारानुसार रुग्ण शिबिरे",
          description:
            "आयुर्वेदिक जीवनशैलीसह निसर्ग ग्रामीण कृषि स्वास्थ्य पर्यटन संबंधित कार्यक्रम, वनस्पति दर्शन, औषधिकरण, ग्रंथवाचन अभ्यासवर्ग, शिबिरे, कॉन्फ्रेंस इत्यादि",
        },
      ],
    },

    festivals: {
      title: "भारतीय व महाराष्ट्रीय सण-उत्सव - आयुर्वेदिक पद्धतीने",
      description:
        "हे कार्यक्रम स्वग्रामच्या शुद्ध शाकाहारी आणि निसर्गसंवर्धक वातावरणात अधिक आपलेपणाने साजरे होतील.",

      maharashtrianFestivals: {
        title: "महाराष्ट्रातील प्रमुख सण (कार्बन क्रेडिट जनरेटिंग)",
        festivals: [
          {
            name: "दिवाळी",
            activities:
              "अभ्यंगस्नान (आयुर्वेदिक तेल), लक्ष्मीपूजन, नैसर्गिक फराळ कार्यशाळा, मातीचे दिवे निर्मिती",
          },
          {
            name: "होळी / शिमगा",
            activities:
              "नैसर्गिक रंग निर्मिती, होलिका दहन (फक्त नैसर्गिक सामग्री), पारंपरिक खेळ",
          },
          {
            name: "गुढीपाडवा",
            activities:
              "बांबू गुढी (स्थानिक उत्पादन), नैसर्गिक नववर्ष स्वागत, आयुर्वेदिक नीमपाकळी प्रसाद",
          },
          {
            name: "गणेशोत्सव",
            activities:
              "इको-फ्रेंडली गणेश मूर्ती बनवणे (शुद्ध मातीची), जैविक प्रसाद तयारी, कृत्रिम तलावात विसर्जन",
          },
          {
            name: "दसरा / विजयादशमी",
            activities:
              "शमी पूजन (वृक्षारोपणासह), आयुर्वेदिक औषधी वनस्पतींचे रोपण",
          },
          {
            name: "मकरसंक्रांत",
            activities:
              "जैविक तीळ-गूळ वाटप, सौर ऊर्जेचा वापर, पारंपरिक पतंग (नैसर्गिक कागदाची)",
          },
        ],
      },

      otherFestivals: {
        title: "इतर महत्त्वाचे सण (वायुमंडल उद्भूत पद्धतीने)",
        festivals: [
          {
            name: "नागपंचमी",
            activities:
              "नागाची पूजा (निसर्ग संवर्धनाच्या संदेशासह), आयुर्वेदिक दूध प्रसाद",
          },
          {
            name: "कृष्ण जन्माष्टमी",
            activities: "इको-फ्रेंडली दहीहंडी, जैविक दूध उत्पादनांचा प्रसाद",
          },
          {
            name: "हनुमान जयंती",
            activities: "हनुमान चालीसा पठण, औषधी वनस्पती पूजन",
          },
          {
            name: "आषाढी/कार्तिकी एकादशी",
            activities: "विठ्ठल पूजा, वारकरी अनुभव (शाकाहारी भोजन परंपरा)",
          },
          {
            name: "जिवती / हलषष्ठी",
            activities:
              "स्त्रियांचा पारंपरिक सण (आयुर्वेदिक स्वास्थ्य चर्चासह)",
          },
          {
            name: "नारळी पौर्णिमा / रक्षाबंधन",
            activities: "नैसर्गिक नारळ अर्पण, हस्तनिर्मित राखी",
          },
        ],
      },

      traditionalSamskaras: {
        title: "पारंपरिक संस्कार विधी - आयुर्वेदिक पद्धतीने",
        description:
          "हे कार्यक्रम स्वग्रामच्या शांत आणि पवित्र वातावरणात आयुर्वेदिक जीवनशैलीसह पार पडू शकतील.",
        ceremonies: [
          {
            name: "अन्नप्राशन",
            description:
              "बाळाला प्रथम जैविक अन्न भरवणे (आयुर्वेदिक पोषण मार्गदर्शनासह)",
          },
          {
            name: "गृहप्रवेश",
            description: "नवीन घरात प्रवेश (वास्तुशास्त्र आणि आयुर्वेदानुसार)",
          },
          {
            name: "वास्तुशांत",
            description:
              "घराच्या बांधकामातील वास्तुशांती विधी (पंचमहाभूत संतुलनासह)",
          },
        ],
      },
    },

    familyAndSocialGatherings: {
      title: "कौटुंबिक आणि सामाजिक मेळावे - निसर्गसंवर्धक पद्धतीने",
      description:
        "स्वग्राम लोकांना एकत्र येण्यासाठी एक स्वच्छ, हरित जागा ठरू शकते.",

      familyGatherings: {
        title: "कुटुंब एकत्र येणे (कार्बन न्यूट्रल)",
        events: [
          {
            name: "पारिवारिक स्नेह संमेलन",
            description:
              "अनेक वर्षांनी एकत्र येणारे कुटुंब (जैविक स्थानिक भोजनासह)",
          },
          {
            name: "वंश परिचय मेळावा",
            description:
              "एकाच वंशातील सर्व सदस्यांचा मेळावा (वंशवेलीच्या आयुर्वेदिक इतिहासासह)",
          },
        ],
      },

      socialCeremonies: {
        title: "सामाजिक समारंभ (Climate Positive)",
        events: [
          {
            name: "सत्कार समारंभ",
            description:
              "विशेष कार्य करणाऱ्या व्यक्तींचा सन्मान (नैसर्गिक भेटवस्तूंसह)",
          },
          {
            name: "महिला मंडळ / बचत गट मेळावे",
            description:
              "जिथे महिला एकत्र येऊन आयुर्वेदिक कार्यक्रमांचे आयोजन करू शकतील",
          },
        ],
      },
    },

    artCultureEducation: {
      title: "कला, संस्कृती आणि शिक्षण - आयुर्वेद आधारित",
      description:
        "स्वग्राम एक शिकण्याचे आणि कला सादर करण्याचे आयुर्वेदिक व्यासपीठ बनू शकते.",

      artAndCraft: {
        title: "कला आणि हस्तकला (नैसर्गिक माध्यमांसह)",
        activities: [
          {
            name: "भजन संध्या",
            description: "आध्यात्मिक संगीत सादरीकरण (चक्र संतुलनाच्या रागांसह)",
          },
          {
            name: "कला प्रदर्शन / गॅलरी",
            description:
              "स्थानिक कलाकारांना प्रोत्साहन (नैसर्गिक रंगांच्या कलाकृतीसाठी)",
          },
          {
            name: "वारली चित्रकला कार्यशाळा",
            description: "महाराष्ट्राची पारंपरिक कला (नैसर्गिक रंगांसह)",
          },
          {
            name: "मातीची भांडी बनवणे",
            description: "हस्तकला प्रशिक्षण (स्थानिक मातीचा वापर)",
          },
          {
            name: "लाकडी कोरीव काम",
            description: "पारंपरिक शिल्पकला (टिकाऊ लाकूड वापर)",
          },
          {
            name: "सांस्कृतिक नृत्य / नाट्य कार्यशाळा",
            description: "पारंपरिक नृत्य प्रकार (योगाधारित हालचाली)",
          },
        ],
      },

      educationalPrograms: {
        title: "शैक्षणिक आणि कौशल्य विकास (आयुर्वेदिक ज्ञान)",
        programs: [
          {
            name: "लेखन कार्यशाळा",
            description: "कविता, कथा लेखन (निसर्ग आणि आयुर्वेद विषयांवर)",
          },
          {
            name: "कौशल्य विकास शिबिरे",
            description: "आयुर्वेदिक कृषी, नैसर्गिक उत्पादन तंत्रे",
          },
          {
            name: "इतिहास/परंपरा चर्चा सत्र",
            description: "महाराष्ट्राच्या आयुर्वेदिक वारशाबद्दल चर्चा",
          },
        ],
      },
    },

    healthAndRetirement: {
      title: "आरोग्य आणि निवृत्ती - आयुर्वेद नैसर्गिक अग्रस्थान",
      programs: [
        {
          name: "नैसर्गिक उपचार कार्यशाळा",
          description: "शुद्ध आयुर्वेदिक औषधांची ओळख आणि तयारी",
        },
        {
          name: "पंचकर्म अनुभव",
          description: "आयुर्वेदिक शुद्धीकरण प्रक्रिया",
        },
        {
          name: "ध्यान साधनेचे वर्ग",
          description: "तणावमुक्तीसाठी (प्राणायामासह)",
        },
        {
          name: "सुवर्ण महोत्सव / अमृत महोत्सव",
          description: "दीर्घायुष्याची आयुर्वेदिक गुरुकिल्ली",
        },
      ],
    },

    corporatePrograms: {
      title: "कॉर्पोरेट आणि व्यावसायिक कार्यक्रम - कार्बन क्रेडिट जनरेटिंग",
      description:
        "स्वग्राम शहरी धकाधकीतून दूर, निसर्गरम्य आणि कार्बन न्यूट्रल वातावरणात कार्यक्रम आयोजित करण्याची संधी देते.",
      programs: [
        {
          name: "कार्यशाळा / प्रशिक्षण सत्र",
          description: "शुद्ध हवेत अधिक लक्ष केंद्रित करता येईल",
        },
        {
          name: "उत्पादन लाँच / सादरीकरण",
          description: "इको-फ्रेंडली आणि आकर्षक वातावरणात",
        },
        {
          name: "वरिष्ठ व्यवस्थापन बैठका",
          description: "धोरणात्मक चर्चेसाठी उपयुक्त (निसर्गाच्या शांततेत)",
        },
      ],
    },

    specialPrograms: {
      title: "विशेष आणि सानुकूलित कार्यक्रम - स्वउत्सव Community Ceremony",
      programs: [
        {
          name: "गावाकडची अनुभव शिबिरे",
          description:
            "मुलांना खऱ्या आयुर्वेदिक गावकडील जीवनशैलीचा अनुभव (जैविक शेती, गोधन, पारंपरिक खेळ)",
        },
        {
          name: "खाद्यसंस्कृती महोत्सव",
          description:
            "महाराष्ट्रीय पारंपारिक शुद्ध शाकाहारी खाद्यपदार्थांची ओळख",
        },
        {
          name: "कवी संमेलन / साहित्य सोहळा",
          description: "निसर्ग आणि आयुर्वेद विषयक साहित्यिकांना एकत्र आणणे",
        },
        {
          name: "चित्रपट महोत्सव / पुस्तक प्रकाशन",
          description: "आयुर्वेदिक जीवनशैली आणि निसर्गसंवर्धन विषयक",
        },
      ],
    },

    guidelinPrinciples: {
      title: "स्वग्राम साठी विशेष मार्गदर्शक तत्त्वे",
      principles: [
        {
          title: "आयुर्वेदिक संस्कृतीचा अनुभव",
          description:
            "सर्व कार्यक्रमांमध्ये आयुर्वेदिक जीवनशैली, शुद्ध शाकाहारी भोजन आणि नैसर्गिक उत्पादनांचा समावेश.",
        },
        {
          title: "निसर्गसंवर्धक सजावट",
          description:
            "कार्यक्रमाच्या ठिकाणी फक्त नैसर्गिक, बायोडिग्रेडेबल सामग्रीची सजावट.",
        },
        {
          title: "इको-फ्रेंडली पॅकेज डील्स",
          description:
            "सर्व कार्यक्रमांसाठी कार्बन न्यूट्रल पॅकेज (जैविक निवास, शुद्ध शाकाहारी भोजन, आयुर्वेदिक सेवा).",
        },
        {
          title: "डिजिटल प्रसार - कागदमुक्त",
          description:
            "सर्व माहिती डिजिटल माध्यमांतून प्रसारित करून कागदाचा वापर टाळणे.",
        },
        {
          title: "स्थानिक आयुर्वेदिक तज्ञांशी संपर्क",
          description:
            "कार्यक्रमांसाठी स्थानिक वैद्य, कृषी तज्ञ आणि निसर्गप्रेमींची मदत घेणे.",
        },
        {
          title: "कार्बन क्रेडिट जनरेशन",
          description:
            "प्रत्येक कार्यक्रमातून वृक्षारोपण, जैविक कचरा व्यवस्थापन आणि नवीकरणीय ऊर्जेचा वापर करून कार्बन क्रेडिट निर्माण करणे.",
        },
      ],
    },

    vision: {
      title: "स्वग्राम - आमचे वचन",
      description:
        '"स्वग्राम" - जिथे शुद्ध भारतीय परंपरा, आयुर्वेदिक जीवनशैली आणि आधुनिक पर्यावरणीय चेतना एकत्र येतात. प्रत्येक कार्यक्रम एक अविस्मरणीय, आरोग्यदायक आणि निसर्गसंवर्धक अनुभव बनतो!',
      mission:
        '"कार्बन फुटप्रिंट ऐवजी कार्बन क्रेडिट" - हे आमचे ध्येय आहे. आम्ही प्रत्येक कार्यक्रमाद्वारे निसर्गाला काहीतरी परत देण्याचा प्रयत्न करतो.',
      tagline:
        "स्वग्राम - एकमेव आयुर्वेदिक, शाकाहारी उत्सवस्थळ जे तुमच्या आत्म्याला, शरीराला आणि निसर्गाला एकसाथ पोषण देते!",
      conclusion:
        "आयुर्वेद नैसर्गिक अग्रस्थान उत्सव आणि वायुमंडल उद्भूत उत्सव या संकल्पनांसह, स्वग्राम भारतातील पहिले Climate Positive सांस्कृतिक केंद्र बनण्याचा मार्ग दाखवत आहे!",
    },
  },

  // 22 Samskaras (Complete Detailed Section)
  twentyTwoSamskaras: {
    title:
      "आपण विसरून गेलेल्या षोडस संस्कार आणि इतर संस्कारांची आठवण ठेऊन ते पुनर्जीवित करण्यासाठी स्वग्रामसोबत उभे राहावे..",
    introduction: "२२ संस्कारांचे सविस्तर वर्णन (परंपरागत + स्थानिक/पर्यायी)",
    note: 'पारंपरिक "षोडश संस्कार" (१६) सर्वाधिक मान्य आहेत. खालील यादीत त्यातील बहुतेक आणि काही स्थानिक/पर्यायी संस्कार (जसे गृहप्रवेश, श्राद्ध, संन्यास, उपवास-व्रत) समाविष्ट आहेत. स्थान, परंपरा, गुरु/पंडितांची शाळा, आणि कुटुंबीय प्रथा यानुसार विधी/वेळ बदलू शकतो.',

    samskaras: [
      {
        number: 1,
        marathi: "गर्भाधान",
        sanskrit: "गर्भाधान (Garbhādhāna)",
        hindi: "गर्भाधान (संतान प्राप्ति की शुरुआत)",
        english: "Garbhadhana (Rite of Conception)",
        purpose:
          "विवाहानंतर संतानोत्पत्तीपूर्वी शुद्ध संकल्प करून, धर्मानुसार संतती प्राप्तीची प्रार्थना करणे.",
        when: "विवाहोत्तर योग्य मुहूर्तास, ऋतुकालात.",
        rituals:
          "संकल्प, देवपूजन, गृहदेवतेचे स्मरण, मंत्रोच्चार (प्रजोत्पत्ती, कल्याणासाठी), आशीर्वाद.",
        modernContext:
          "आजच्या संदर्भात: आरोग्य-जागरूकता, कुटुंब नियोजन, वैद्यकीय सल्ल्यांसह हा संस्कार साध्या स्वरूपात केला जातो.",
      },
      {
        number: 2,
        marathi: "पुंसवन (गर्भ-आरोग्य)",
        sanskrit: "पुंसवन् (Puṃsavana)",
        hindi: "पुंसवन (गर्भ-स्वास्थ्य हेतु)",
        english: "Pumsavana (Foetal Rite)",
        purpose: "गर्भावस्थेतील बालकाच्या आरोग्य आणि कल्याणासाठी प्रार्थना.",
        when: "सामान्यतः गर्भावस्थेच्या 2-3ऱ्या महिन्यात.",
        rituals:
          "गर्भरक्षण मंत्र, मातृदेवता/आरोग्य-देवतेची पूजा; काही परंपरांत औषधी-घृताचा सुगंध/आचमन.",
        note: "आधुनिक काळात लिंग-निवडीशी कोणताही संबंध नाही; हे केवळ आरोग्य-कल्याणासाठीचा संस्कार आहे.",
      },
      {
        number: 3,
        marathi: "सीमन्तोन्नयन/सीमन्त (गर्भवती स्त्रीचा सन्मान)",
        sanskrit: "सीमन्तोन्नयन (Sīmanto-nnayana)",
        hindi: "सीमन्तोन्नयन/सीमन्त (गर्भवती का सम्मान)",
        english: "Simantonnayana/Seemantha (Parting of Hair)",
        purpose:
          "गरोदर मातेला मानसिक आधार, आरोग्यरक्षण, गर्भाच्या कल्याणासाठी मंगलविधी.",
        when: "4था, 6वा किंवा 8वा महिना (परंपरेनुसार).",
        rituals:
          "केश-पारणी (मागील भागापर्यंत कुंकवाने वाटी काढणे), मंगळगाणे, देवी-पूजन, नवमातृका पूजा, आशीर्वाद, फल-भोजन.",
        modernContext:
          "आजच्या संदर्भात: बेबी-शॉवरसारख्या उत्सवांबरोबर पारंपरिक मंत्र-पूजा.",
      },
      {
        number: 4,
        marathi: "गर्भसंरक्षण/प्राणायाम (पर्यायी/स्थानिक - गर्भ-सुरक्षा)",
        sanskrit: "प्राणायाम (Prāṇāyāma)",
        hindi: "गर्भसंरक्षण (गर्भ की सुरक्षा)",
        english: "Foetal Protection/Pranayama (Optional/Local)",
        nature:
          'शास्त्रीय "षोडश संस्कारां"मध्ये मानक नसले तरी काही कुटुंबांमध्ये गर्भरक्षण स्तोत्र, संकल्प, प्राणायाम/जप इ. केले जातात.',
        purpose: "आई-बाळाच्या आरोग्यासाठी प्रार्थना, मन:शांती.",
        rituals:
          "गर्भरक्षा स्तोत्र, आरोग्य-देवतेची पूजा, साधे श्वसन-ध्यान, परिवाराचे आशीर्वाद.",
      },
      {
        number: 5,
        marathi: "जातकर्म (नवजात शिशु स्वागत)",
        sanskrit: "जातकर्म (Jātakarma)",
        hindi: "जातकर्म (नवजात शिशु का स्वागत)",
        english: "Jatakarma (Newborn Rite)",
        purpose: "बाळाच्या जन्माचे स्वागत, आयुरारोग्याची प्रार्थना.",
        when: "जन्मानंतर लवकर (परिस्थितीनुसार पुढे ढकलतात).",
        rituals:
          "देवपूजन, बालकाच्या उजव्या कानाशी मंगल मंत्र, कुटुंब-देवतेचे स्मरण; परंपरेत मध-घृताचे स्पर्श/आचमन उल्लेखिले असले तरी आज वैद्यकीय दृष्ट्या हे प्रतीकात्मक केले जाते.",
        modernPractice: "स्वच्छता/सुरक्षा प्राधान्याने, प्रतीकात्मक मंत्र जप.",
      },
      {
        number: 6,
        marathi: "नामकरण (बालकाला नाव देणे)",
        sanskrit: "नामकरण (Nāmakaraṇa)",
        hindi: "नामकरण (बालक का नामकरण)",
        english: "Namakarana (Naming Ceremony)",
        purpose: "बालकाला नाव देणे (नक्षत्र/गोत्र/कुलाचारानुसार).",
        when: "11वा/12वा दिवस, किंवा निश्चित मुहूर्त.",
        rituals:
          "देवपूजन, कुलदेवता-पूजन, बालकाच्या कानाशी नाव उच्चारण, पत्रिकेनुसार नावाचे अक्षर निवडणे, आशीर्वाद.",
      },
      {
        number: 7,
        marathi: "निष्क्रमण (प्रथम घराबाहेर)",
        sanskrit: "निष्क्रमण (Niṣkramana)",
        hindi: "निष्क्रमण (प्रथम बार घर से बाहर)",
        english: "Nishkramana (First Outing)",
        purpose:
          "बाळाला प्रथमच घराबाहेर नेऊन देवदर्शन/सूर्यदर्शनाने जगाशी ओळख.",
        when: "सामान्यतः 4था महिना (परंपरेनुसार बदलू शकते).",
        rituals: "देवदर्शन, सूर्यनमस्कार/सूर्योपासना, आशीर्वाद, छोटेखानी पूजन.",
      },
      {
        number: 8,
        marathi: "अन्नप्राशन (प्रथम घन अन्न)",
        sanskrit: "अन्नप्राशन (Annaprāśana)",
        hindi: "अन्नप्राशन (प्रथम ठोस आहार)",
        english: "Annaprashana (First Solid Food)",
        purpose:
          "पहिल्यांदाच घन अन्न (धान्य) देणे; आरोग्य, आयुष्य, बुद्धीसाठी प्रार्थना.",
        when: "6वा महिना (काही ठिकाणी मुलगा 6वा, मुलगी 5वा).",
        rituals:
          'देवपूजन, बालकाला पायस/खीर/भाताचा पहिला घास, कुटुंबाचा आशीर्वाद; काही ठिकाणी "वस्तू-निवड" खेळ (भविष्यातील आवडीचे प्रतीक).',
      },
      {
        number: 9,
        marathi: "चूडाकरण/मुंडन (प्रथम केस कापणे)",
        sanskrit: "चूडाकरण / मुंडन (Cūḍākaraṇa / Muṇḍana)",
        hindi: "चूड़ाकरण/मुंडन (प्रथम बार बाल कतरना)",
        english: "Chudakarana/Mundan (Tonsure)",
        purpose: "अपवित्रता/जन्मकेश त्यागून शुद्धता, आरोग्य, दीर्घायुष्य.",
        when: "सामान्यतः 1ले/3रे/5वे वर्ष (परंपरेनुसार).",
        rituals: "देवपूजन, तीर्थ/मंदिरात किंवा घरी मुंडन, दान, आशीर्वाद.",
      },
      {
        number: 10,
        marathi: "कर्णवेध (कान टोचणे)",
        sanskrit: "कर्णवेध (Karṇavedha)",
        hindi: "कर्णवेध (कान छेदना)",
        english: "Karnavedha (Ear Piercing)",
        purpose: "कर्णभेदन करून आरोग्य/श्रवण कल्याण, अलंकरण.",
        when: "बाल्यावस्थेत शुभमुहूर्ताने.",
        rituals: "पूजा, निर्जंतुकीकरण करून कान छिद्र, औषधी लेप, आशीर्वाद.",
        note: "आज आरोग्यदृष्ट्या डॉक्टर/प्रोफेशनलकडून, स्वच्छतेची पूर्ण खबरदारी.",
      },
      {
        number: 11,
        marathi: "विद्यारंभ/वेदारंभ (शिक्षणाची सुरुवात)",
        sanskrit: "विद्यारम्भ / वेदारम्भ (Vidyārambha / Vedārambha)",
        hindi: "विद्यारम्भ/वेदारम्भ (शिक्षा की शुरुआत)",
        english: "Vidyarambha/Vedarambha (Education Initiation)",
        purpose:
          "शिक्षणाची औपचारिक सुरुवात (अक्षरारंभ), कधी कधी वेदाध्ययन प्रारंभ.",
        when: "विजयादशमी/आक्षय तृतिया/शुभ दिवस.",
        rituals:
          "सरस्वतीपूजन, गुरु-पूजन, मुलाच्या बोटाला अक्षर लिहिणे (तांदुळाच्या पाटीवर/फळ्यावर), आशीर्वाद.",
      },
      {
        number: 12,
        marathi: "उपनयन/यज्ञोपवीत (ब्रह्मचर्याश्रम प्रवेश)",
        sanskrit: "उपनयन (Upanayana)",
        hindi: "उपनयन/यज्ञोपवीत (ब्रह्मचर्य आश्रम प्रवेश)",
        english: "Upanayana/Yajñopavita (Sacred Thread Ceremony)",
        purpose:
          "ब्रह्मचर्याश्रम प्रवेश; अध्ययनाची दीक्षा; गायत्री-मंत्रोपदेश.",
        when: "पारंपरिक वयोगट---ब्राह्मण 8, क्षत्रिय 11, वैश्य 12 (आजकाल लवचिक).",
        rituals:
          "यज्ञोपवीत धारण, आचार्यसमोर दीक्षा, गायत्री-मंत्र, संध्यावंदनाचा आरंभ, भिक्षावृत्ती प्रतीकात्मक.",
        modernContext:
          "वैयक्तिक/कुलाचारानुसार; मुलींसाठी विद्यारंभ/दीक्षा समारंभ काही ठिकाणी स्वतंत्ररीत्या होतो.",
      },
      {
        number: 13,
        marathi: "गृहप्रवेश (नवीन घरात प्रवेश)",
        sanskrit: "गृहप्रवेश (Gṛhapraveśa)",
        hindi: "गृह प्रवेश (नए घर में प्रवेश)",
        english: "Griha Pravesha (Housewarming)",
        purpose: "नवीन घरात प्रवेशापूर्वी गृहशांती, समृद्धी, वैभवाची कामना.",
        when: "घर पूर्ण झाल्यावर/खरेदी नंतर शुभ मुहूर्त.",
        rituals:
          "वास्तु-पूजन, गणपती-हवन/होमर, कलश-स्थापना, दूध उकळणे, द्वार-लाक्षण, गो-पूजन (काही ठिकाणी), दान.",
        note: '"षोडश संस्कार" यादीत मानक नसले तरी स्थानिक परंपरेत महत्त्वपूर्ण गृहसंस्कार.',
      },
      {
        number: 14,
        marathi: "समवर्तन/स्नान (शिक्षण-समाप्ती)",
        sanskrit: "समवर्तन (Samāvartana)",
        hindi: "समवर्तन/स्नान (शिक्षा समाप्ति)",
        english: "Samavartana (Completion of Studies)",
        purpose:
          "गुरुकुल/शिक्षण-अवस्थेचा समारोप; गृहस्थाश्रमात प्रवेशाची तयारी.",
        when: "अध्ययन पूर्ण झाल्यावर.",
        rituals:
          "समावर्तन-स्नान, आचार्य/गुरूंची परिक्रमा, गुरुदक्षिणा, आशीर्वाद; नूतन जीवन-आचारांचे संकल्प.",
      },
      {
        number: 15,
        marathi: "विवाह (गृहस्थाश्रम आरंभ)",
        sanskrit: "विवाह (Vivāha)",
        hindi: "विवाह (गृहस्थ आश्रम का आरंभ)",
        english: "Vivaha (Marriage)",
        purpose:
          "गृहस्थाश्रम प्रारंभ; धर्म, अर्थ, काम यांच्या संतुलित पूर्ततेचा संकल्प.",
        when: "जुळणी, मुहूर्तशुद्धी नंतर.",
        rituals:
          "गणेशपूजन, कौलं/वरात, काशीयात्रा (काही ठिकाणी), कन्यादान, मंगळाष्टक/मंत्र, सaptapadi/फेरे, लग्नसूत्र/कुंकवाची ओटी, आशीर्वाद.",
        variations:
          "प्रादेशिक पद्धतीनुसार बदल (महाराष्ट्रीय, दक्षिण भारतीय, उत्तर भारतीय इ.).",
      },
      {
        number: 16,
        marathi: "गृहप्रवेश (दुबार उल्लेख - गृहशांती)",
        sanskrit: "गृहप्रवेश (Gṛhapraveśa)",
        hindi: "गृह प्रवेश (गृह शांति)",
        english: "Griha Pravesha (Housewarming)",
        note: "हा 13 क्रमांकाचा संस्कारच; तक्त्यात दुबार आला होता.",
        additionalDetails:
          "गृहशांती-हवन, नवग्रह-पूजा, मुख्य द्वाराला तोरण/नीम-मोऱ्या, अन्नदान/सत्कार; वास्तुदोष शमनासाठी विशेष शांती-कर्म.",
      },
      {
        number: 17,
        marathi: "गृहस्थाश्रम संस्कार (दैनंदिन/नित्यकर्म)",
        sanskrit: "गृहस्थाश्रम संस्कार (Gṛhastha-saṃskāra)",
        hindi: "गृहस्थ संस्कार (दैनिक कर्म)",
        english: "Grihastha Rites (Daily Duties)",
        nature: 'हा स्वतंत्र "षोडश संस्कार" नसून गृहस्थाश्रमींचे नित्य-कर्म.',
        components:
          "पंच-महायज्ञ (देव, ऋषि, पितृ, भूत, मानव यज्ञ), अग्निहोत्र (असेल तर), व्रत-उपवास, दानधर्म, अतिथी-सत्कार.",
        purpose: "कुटुंब, समाज, निसर्ग यांच्याशी ऋणानुबंध जपत संतुलित जीवन.",
      },
      {
        number: 18,
        marathi: "उपवास/व्रत (धार्मिक नियम पालन)",
        sanskrit: "उपवास / व्रत (Upavāsa / Vrata)",
        hindi: "व्रत/उपवास (धार्मिक नियमों का पालन)",
        english: "Vrata/Upavasa (Religious Vow/Fast)",
        nature: "परंपरागत शिस्तीचे पालन; नित्य/नैमित्तिक व्रत.",
        examples:
          "एकादशी, प्रदोष, संकष्टि, नवरात्री उपवास, सोमवार-शुक्रवार व्रत इ.",
        purpose: "इंद्रियनिग्रह, शारीर-मानसिक शुद्धी, ईश्वराभक्ति.",
        note: 'शास्त्रीय "संस्कार" यादीत मानक नसले तरी बहुतांश घरी महत्त्वाची परंपरा.',
      },
      {
        number: 19,
        marathi: "अंत्येष्टि (अंत्यसंस्कार)",
        sanskrit: "अन्त्येष्टि (Antyeṣṭi)",
        hindi: "अन्त्येष्टि (अंतिम संस्कार)",
        english: "Antyeshti (Funeral Rites)",
        purpose:
          "देहत्यागानंतर शास्त्रोक्त रीतीने अंतिम संस्कार; आत्माच्या शांतीसाठी प्रार्थना.",
        when: "मृत्यूनंतर तत्काळ/योग्य वेळी.",
        rituals:
          "शुद्धि-प्रक्रिया, मुखाग्नि/दाहसंस्कार, अस्थि-संग्रह व विसर्जन, त्र्यॊदशी/एकोणीसावी इ. कर्म.",
        note: "पर्यावरण/कायदे पाहून दाह/विद्युत-चिता/दफन इ. पद्धती; कुटुंब, संप्रदायानुसार फरक.",
      },
      {
        number: 20,
        marathi: "श्राद्ध/पितृकर्म (पितृ-तर्पण)",
        sanskrit: "श्राद्ध (Śrāddha)",
        hindi: "श्राद्ध/पितृकार्य (पितरों का तर्पण)",
        english: "Shraddha (Rites for Ancestors)",
        purpose: "पितृऋण पूर्तता, पितृदेवतेस तृप्ती; वार्षिक/नियतकालीन कर्म.",
        when: "मृत्यु-तिथी, पितृपक्ष, अमावस्या इ.",
        rituals: "तर्पण, पिण्डदान, ब्राह्मण-भोजन/दान, देव-ऋषि- पितृ स्मरण.",
        note: "अंत्येष्टीनंतरच्या क्रियांचा हा विस्तार; काही परंपरांत विशेष गृहशांतीसह.",
      },
      {
        number: 21,
        marathi: "संन्यास-प्रवेश (त्याग/मोक्ष मार्ग)",
        sanskrit: "संन्यास (Saṃnyāsa)",
        hindi: "संन्यास प्रवेश (त्याग का मार्ग)",
        english: "Sannyasa Initiation (Renunciation)",
        nature: "गृहस्थाश्रमानंतर वानप्रस्थ/संन्यास---त्यागमय जीवनाचा आरंभ.",
        purpose: "मोक्षोपासना, वैराग्य, अखंड साधना.",
        rituals:
          "विरजा-होम, दण्ड-स्वीकार, काषाय-वस्त्र, गुरुदीक्षा; संप्रदायानुसार विशिष्ट विधी.",
        note: "सामान्य गृहस्थांसाठी बंधनकारक नसून निवडक मार्ग.",
      },
      {
        number: 22,
        marathi: "इतर स्थानिक/क्षेत्रीय संस्कार (विशिष्ट परंपरा)",
        sanskrit: "विविध संस्कार (Vividha Saṃskāra)",
        hindi: "स्थानीय संस्कार (विशेष परंपराएं)",
        english: "Other Regional/Local Samskaras (Specific traditions)",
        nature: "मुलीच्या तारुण्यप्राप्तीचा संस्कार, देवी-पूजन, आशीर्वाद.",
        purpose:
          'तारुण्यप्राप्तीनंतर पहिल्यांदा मिशी/केस कापणे (काही शाळांमध्ये हा "षोडश"मध्ये असतो).',
        rituals:
          "गृहशांती, नूतन-वाहन/व्यवसाय-प्रवेश, क्षेत्र-प्रवेश, नूलुक्केट्टू (केरळ) इ.",
        note: "कुटुंब-परंपरा, प्रदेश, संप्रदाय, गुरुमत यानुसार भिन्न; उद्देश---नव्या टप्प्याचा मंगल आरंभ.",
        examples: [
          {
            name: "ऋतूशुद्धि/रजस्वला-समारंभ",
            description:
              "मुलीच्या तारुण्यप्राप्तीचा संस्कार, देवी-पूजन, आशीर्वाद.",
          },
          {
            name: "केशांत/गोदाना",
            description:
              'तारुण्यप्राप्तीनंतर पहिल्यांदा मिशी/केस कापणे (काही शाळांमध्ये हा "षोडश"मध्ये असतो).',
          },
          {
            name: "गृहशांती, नूतन-वाहन/व्यवसाय-प्रवेश, क्षेत्र-प्रवेश, नूलुक्केट्टू (केरळ) इ.",
            description:
              "कुटुंब-परंपरा, प्रदेश, संप्रदाय, गुरुमत यानुसार भिन्न; उद्देश---नव्या टप्प्याचा मंगल आरंभ.",
          },
        ],
      },
    ],
  },

  // Contact Information
  contactInfo: {
    phone: "8888839950",
    email: "Swagrama.lavale@gmail.com",
    website: "www.swagramacommunity.com",
    thankYouNote: "धन्यवाद!",
  },
};
