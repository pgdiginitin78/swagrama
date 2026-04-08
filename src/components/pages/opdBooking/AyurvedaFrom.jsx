import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import NatureIcon from "@mui/icons-material/Nature";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import YardIcon from "@mui/icons-material/Yard";
import { Dialog, DialogContent, Divider, Fade } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState, useRef } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import CompostIcon from "@mui/icons-material/Compost";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import HealingIcon from "@mui/icons-material/Healing";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isBefore,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { Clock, Stethoscope } from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import abhyangaImg from "../../../assets/images/ayurveda/ayurveda_abhyanga.png";
import herbsImg from "../../../assets/images/ayurveda/ayurveda_herbs.png";
import kizhiImg from "../../../assets/images/ayurveda/ayurveda_kizhi.png";
import nasyaImg from "../../../assets/images/ayurveda/ayurveda_nasya.png";
import panchakarmaImg from "../../../assets/images/ayurveda/ayurveda_panchakarma.png";
import shirodharaImg from "../../../assets/images/ayurveda/ayurveda_shirodhara.png";
import panchakarmaAsset from "../../../assets/images/ayurveda/panchakarma.png";
import shirodharaAsset from "../../../assets/images/ayurveda/shirodhara.png";
import homeopathyBottlesImg from "../../../assets/images/homeopathy/homeopathy_bottles_pills.png";
import homeopathyConsultationImg from "../../../assets/images/homeopathy/homeopathy_consultation.png";
import homeopathyHerbsImg from "../../../assets/images/homeopathy/homeopathy_herbs.png";
import yogaBreathImg from "../../../assets/images/yoga/yoga_breath_meditation.png";
import yogaBridgeImg from "../../../assets/images/yoga/yoga_bridge_pose.png";
import yogaLotusImg from "../../../assets/images/yoga/yoga_lotus_meditation.png";
import yogaTreeImg from "../../../assets/images/yoga/yoga_tree_pose.png";
import yogaWarriorImg from "../../../assets/images/yoga/yoga_warrior_group.png";
import { useAuth } from "../../../context/AuthContext";
import {
  bookAppointment,
  getDoctorAvailableSlots,
  getPatientDataByMobileNo,
  getServicesByClinicId,
  InitiatePayment,
} from "../../../services/bookAppointment/BookAppointmentServices";
import AvantiNitsureImg from "../../assets/landing-page/ourexperts/AvantiNitsure.jpg";
import DhananjayAnvikarImg from "../../assets/landing-page/ourexperts/DhananjayAnvikar.jpg";
import ManishaSuryawanshiImg from "../../assets/landing-page/ourexperts/ManishaSuryavanshi.jpg";
import PradipTawareImg from "../../assets/landing-page/ourexperts/PradipTaware.jpg";
import SandipMehetreImg from "../../assets/landing-page/ourexperts/SandipMahetre.jpg";
import SantoshSuryawanshiImg from "../../assets/landing-page/ourexperts/SantoshSuryawanshi.jpg";
import SmitaMehetreImg from "../../assets/landing-page/ourexperts/SmitaMahetre.jpg";
import VaishaliHolmukheImg from "../../assets/landing-page/ourexperts/VaishaliHolmukhe.jpg";
import CancelButtonModal from "../../common/button/CancelButtonModal";
import DatePickerField from "../../common/formFields/DatePickerField";
import DropdownField from "../../common/formFields/DropdownField";
import InputArea from "../../common/formFields/InputArea";
import InputField from "../../common/formFields/InputField";
import AddPatientModal from "./AddPatientModal";
import ConfirmationModal from "../../common/ConfirmationModal";
import { RedirectToSabPaisa } from "./RedirectToSabPaisa";
import { errorAlert, successAlert } from "../../common/toast/CustomToast";

const ayurvedaCarouselImages = [
  { id: 1, src: herbsImg, alt: "Ayurveda Herbal Preparations" },
  { id: 2, src: abhyangaImg, alt: "Abhyanga Oil Massage" },
  { id: 3, src: shirodharaImg, alt: "Shirodhara Therapy" },
  { id: 4, src: panchakarmaImg, alt: "Panchakarma Detox" },
  { id: 5, src: nasyaImg, alt: "Nasya Nasal Therapy" },
  { id: 6, src: kizhiImg, alt: "Kizhi Herbal Pouch" },
  { id: 7, src: panchakarmaAsset, alt: "Panchakarma Treatment" },
  { id: 8, src: shirodharaAsset, alt: "Shirodhara Session" },
];

const yogaCarouselImages = [
  { id: 1, src: yogaLotusImg, alt: "Lotus Meditation" },
  { id: 2, src: yogaTreeImg, alt: "Tree Pose" },
  { id: 3, src: yogaWarriorImg, alt: "Warrior Group Pose" },
  { id: 4, src: yogaBridgeImg, alt: "Bridge Pose" },
  { id: 5, src: yogaBreathImg, alt: "Breathing Exercise" },
];

const homeopathyCarouselImages = [
  { id: 1, src: homeopathyBottlesImg, alt: "Homeopathic Remedies" },
  { id: 2, src: homeopathyHerbsImg, alt: "Natural Extracts" },
  { id: 3, src: homeopathyConsultationImg, alt: "Expert Consultation" },
];

function TimeSlotChip({ slot, isSelected, onSelect }) {
  const isMorning =
    slot.slotStartTime.includes("AM") ||
    parseInt(slot.slotStartTime.split(":")[0]) < 12;

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      onClick={onSelect}
      disabled={!slot.slotStartTime}
      className={`
        relative px-2 py-2 rounded-[5px] font-bold text-[11px] transition-all duration-200 
        flex flex-col items-center justify-center border
        ${
          isSelected
            ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200/50"
            : "bg-emerald-50/50 border-emerald-100 text-slate-700 hover:border-emerald-300 hover:bg-white hover:shadow-sm"
        }
        disabled:opacity-40 disabled:cursor-not-allowed
      `}
    >
      <span
        className={`text-[8px] uppercase tracking-tighter font-black ${isSelected ? "text-emerald-100" : "text-emerald-600/60"}`}
      >
        {isMorning ? "Morning" : "Afternoon"}
      </span>
      <span>{slot.slotStartTime}</span>
    </motion.button>
  );
}

function DateCard({ date, isSelected, onClick, disabled }) {
  const isToday =
    format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
  const dayName = format(date, "EEE");
  const dayNum = format(date, "dd");

  return (
    <motion.button
      whileHover={disabled ? {} : { y: -2 }}
      whileTap={disabled ? {} : { scale: 0.96 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        relative flex flex-col items-center justify-center min-w-[56px] py-1.5 rounded-[5px] border transition-all duration-300
        ${
          isSelected || isToday
            ? "bg-gradient-to-br from-emerald-600 to-teal-700 border-emerald-500 text-white shadow-md shadow-emerald-200/40"
            : disabled
              ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
              : "bg-white border-slate-100 text-slate-600 hover:border-emerald-200 hover:shadow-sm"
        }
      `}
    >
      <span
        className={`text-[9px] font-bold uppercase tracking-tight ${isSelected ? "text-emerald-100" : disabled ? "text-gray-200" : "text-slate-400"}`}
      >
        {dayName}
      </span>
      <span className="text-base font-black leading-none my-0.5">{dayNum}</span>
    </motion.button>
  );
}

const dropdownObjectSchema = yup
  .object()
  .shape({
    id: yup.mixed().required(),
    label: yup.string().required(),
  })
  .nullable()
  .required("This field is required");

const validationSchema = yup.object().shape({
  serviceFid: dropdownObjectSchema.typeError("Service is required"),
  patientFid: dropdownObjectSchema.typeError("Patient is required"),
  appointmentDate: yup
    .date()
    .nullable()
    .required("Appointment date is required")
    .typeError("Appointment date is required"),
  // fullName: yup
  //   .string()
  //   .trim()
  //   .required("Full name is required")
  //   .min(3, "Name must be at least 3 characters"),
  // mobileNumber: yup
  //   .string()
  //   .trim()
  //   .required("Mobile number is required")
  //   .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  // age: yup
  //   .number()
  //   .typeError("Age must be a number")
  //   .required("Age is required")
  //   .min(1, "Age must be at least 1")
  //   .max(120, "Age seems invalid"),
  // bloodGroup: dropdownObjectSchema.typeError("Blood group is required"),
  // gender: dropdownObjectSchema.typeError("Gender is required"),
  // emailAddress: yup
  //   .string()
  //   .trim()
  //   .email("Enter a valid email address")
  //   .required("Email address is required"),
  // city: yup
  //   .string()
  //   .trim()
  //   .required("City is required")
  //   .min(2, "Enter a valid city name"),
  reasonForVisit: yup
    .string()
    .trim()
    .required("Reason for visit is required")
    .min(10, "Please provide at least 10 characters"),
});

const ayurvedaSideContent = [
  {
    icon: <SelfImprovementIcon fontSize="small" />,
    gradient: "from-teal-400 to-emerald-500",
    bg: "bg-teal-50",
    border: "border-teal-100",
    title: "Holistic Healing",
    desc: "5,000-year-old Indian wisdom — balancing the mind, body & spirit through natural therapies.",
  },
  {
    icon: <YardIcon fontSize="small" />,
    gradient: "from-green-400 to-lime-500",
    bg: "bg-green-50",
    border: "border-green-100",
    title: "Natural Remedies",
    desc: "Pure herbs, oils & plant compounds restore vitality without any side effects.",
  },
  {
    icon: <VolunteerActivismIcon fontSize="small" />,
    gradient: "from-rose-400 to-pink-500",
    bg: "bg-rose-50",
    border: "border-rose-100",
    title: "Personalised Care",
    desc: "Treatments tailored to your unique Prakriti — Vata, Pitta, or Kapha.",
  },
  {
    icon: <AutoAwesomeIcon fontSize="small" />,
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
    title: "Panchakarma Detox",
    desc: "Eliminate deep-rooted toxins (Ama) and rejuvenate every tissue of the body.",
  },
  {
    icon: <PsychologyIcon fontSize="small" />,
    gradient: "from-violet-400 to-purple-500",
    bg: "bg-violet-50",
    border: "border-violet-100",
    title: "Mind & Dosha Balance",
    desc: "Align your three bio-energies — Vata (air), Pitta (fire) & Kapha (earth).",
  },
  {
    icon: <WaterDropIcon fontSize="small" />,
    gradient: "from-sky-400 to-blue-500",
    bg: "bg-sky-50",
    border: "border-sky-100",
    title: "Shirodhara Therapy",
    desc: "Warm medicated oil stream on the forehead — calming nerves & melting away stress.",
  },
  {
    icon: <NatureIcon fontSize="small" />,
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    title: "Eco-Conscious Wellness",
    desc: "All preparations sourced from certified organic farms — good for you & the planet.",
  },
  {
    icon: <LocalFloristIcon fontSize="small" />,
    gradient: "from-fuchsia-400 to-pink-500",
    bg: "bg-fuchsia-50",
    border: "border-fuchsia-100",
    title: "Rasayana Rejuvenation",
    desc: "Classical anti-ageing formulas that nourish tissues & restore youthful vitality.",
  },
];

const yogaSideContent = [
  {
    icon: <SelfImprovementIcon fontSize="small" />,
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
    title: "Mindfulness & Meditation",
    desc: "Achieve mental clarity and inner peace through focused meditation practices.",
  },
  {
    icon: <NatureIcon fontSize="small" />,
    gradient: "from-lime-500 to-green-500",
    bg: "bg-lime-50",
    border: "border-lime-100",
    title: "Flexibility & Posture",
    desc: "Improve physical strength, flexibility, and alignment with guided asanas.",
  },
  {
    icon: <VolunteerActivismIcon fontSize="small" />,
    gradient: "from-red-400 to-rose-500",
    bg: "bg-red-50",
    border: "border-red-100",
    title: "Stress Relief",
    desc: "Release tension and reduce anxiety through breathing techniques (Pranayama).",
  },
  {
    icon: <AutoAwesomeIcon fontSize="small" />,
    gradient: "from-yellow-400 to-amber-500",
    bg: "bg-yellow-50",
    border: "border-yellow-100",
    title: "Spiritual Growth",
    desc: "Connect your mind, body, and spirit on a deeper, holistic level.",
  },
];

const homeopathySideContent = [
  {
    icon: <YardIcon fontSize="small" />,
    gradient: "from-green-400 to-emerald-500",
    bg: "bg-green-50",
    border: "border-green-100",
    title: "Gentle Healing",
    desc: "Stimulate the body's natural healing response with highly diluted natural substances.",
  },
  {
    icon: <PsychologyIcon fontSize="small" />,
    gradient: "from-blue-400 to-indigo-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
    title: "Individualized Treatment",
    desc: "Remedies selected based on your specific physical and emotional symptoms.",
  },
  {
    icon: <LocalFloristIcon fontSize="small" />,
    gradient: "from-fuchsia-400 to-pink-500",
    bg: "bg-fuchsia-50",
    border: "border-fuchsia-100",
    title: "Safe & Non-Toxic",
    desc: "No side effects—safe for children, pregnant women, and the elderly.",
  },
  {
    icon: <WaterDropIcon fontSize="small" />,
    gradient: "from-cyan-400 to-blue-500",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
    title: "Root Cause Focus",
    desc: "Addressing the underlying cause of illness rather than just suppressing symptoms.",
  },
];

const bloodGroupOptions = [
  { id: 1, value: "A+", label: "A+" },
  { id: 2, value: "A-", label: "A-" },
  { id: 3, value: "B+", label: "B+" },
  { id: 4, value: "B-", label: "B-" },
  { id: 5, value: "AB+", label: "AB+" },
  { id: 6, value: "AB-", label: "AB-" },
  { id: 7, value: "O+", label: "O+" },
  { id: 8, value: "O-", label: "O-" },
];

const genderOptions = [
  { id: 1, value: "Male", label: "Male" },
  { id: 2, value: "Female", label: "Female" },
  { id: 3, value: "Other", label: "Other" },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 260 : -260, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -260 : 260, opacity: 0 }),
};

function PreviewRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-3 py-2 border-b border-emerald-50 last:border-0">
      <span className="text-xs font-semibold text-emerald-700 sm:w-36 shrink-0">
        {label}
      </span>
      <span className="text-sm text-gray-700 font-medium break-words">
        {value || "—"}
      </span>
    </div>
  );
}

function BookingPreviewModal({
  open,
  onClose,
  onProceed,
  data,
  activeDept,
  selectedDoctorId,
}) {
  console.log("activeDept", data, selectedDoctorId);

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={300}
      PaperProps={{
        sx: {
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(5,150,105,0.18)",
        },
      }}
    >
      <div className="bg-gradient-to-br from-emerald-700 via-teal-700 to-green-800 px-5 pt-5 pb-6 relative">
        <div className="absolute top-3 right-3">
          <CancelButtonModal onClick={onClose} />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
            <EventAvailableIcon sx={{ color: "#fff", fontSize: 24 }} />
          </div>
          <div>
            <h2 className="text-white font-black text-lg leading-tight">
              Booking Preview
            </h2>
            <p className="text-white/70 text-xs mt-0.5">
              Review your details before confirming
            </p>
          </div>
        </div>
      </div>

      <DialogContent sx={{ p: 0 }}>
        <div className="px-5 pt-4 pb-2">
          <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold mb-1">
            Patient Details
          </p>
          <div className="bg-emerald-50/60 rounded-lg px-4 py-1 border border-emerald-100">
            <PreviewRow
              label="Consultation"
              value={activeDept + "  " + "OPD Consultation"}
            />
            <PreviewRow
              label="Doctor"
              value={
                selectedDoctorId?.firstName + " " + selectedDoctorId?.lName
              }
            />
            <PreviewRow
              label="Date & Time"
              value={
                format(new Date(data.appointmentDate), "dd MMM yyyy") +
                " " +
                data?.selectedTimeSlot?.slotStartTime +
                " - " +
                data?.selectedTimeSlot?.slotEndTime
              }
            />
            <PreviewRow label="Visit Type" value={data.serviceFid.label} />
            <PreviewRow label="Patient" value={data?.fullName} />
            <PreviewRow label="Total Fee" value={data?.serviceFid?.charges} />
          </div>
        </div>

        {data?.reasonForVisit && (
          <div className="px-5 pt-3 pb-2">
            <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold mb-1">
              Reason for Visit
            </p>
            <div className="bg-amber-50/60 border border-amber-100 rounded-lg px-4 py-3">
              <p className="text-sm text-gray-700 leading-relaxed">
                {data.reasonForVisit}
              </p>
            </div>
          </div>
        )}

        <Divider sx={{ mx: 2.5, my: 2, borderColor: "#d1fae5" }} />

        <div className="px-5 pb-5 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto h-10 px-6 rounded-lg border-2 border-gray-200 text-gray-600 text-sm font-semibold hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onProceed}
            className="w-full sm:w-auto h-10 px-6 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/30 hover:from-emerald-700 hover:to-teal-700 hover:shadow-emerald-500/40 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <CheckCircleIcon sx={{ fontSize: 17 }} />
            Proceed to Book
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AyurvedaForm({
  doctorList = [],
  loadingDoctors = false,
  selectedDoctorId = null,
  setSelectedDoctorId = () => {},
  activeGradient = "from-emerald-600 to-green-500",
  activeDept = "Ayurveda",
}) {
  const isYoga = activeDept?.toLowerCase() === "yoga";
  const isHomeopathy = activeDept?.toLowerCase() === "homeopathy";

  const currentCarouselImages = isYoga
    ? yogaCarouselImages
    : isHomeopathy
      ? homeopathyCarouselImages
      : ayurvedaCarouselImages;

  const currentSideContent = isYoga
    ? yogaSideContent
    : isHomeopathy
      ? homeopathySideContent
      : ayurvedaSideContent;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [visibleCount, setVisibleCount] = useState(1);
  const [servicesOptions, setServicesOptions] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [slotError, setSlotError] = useState("");
  const [doctorSlots, setDoctorSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [patientOptions, setPatientOptions] = useState([]);
  const [openAddPatientModal, setOpenAddPatientModal] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);
  const [finalObj, setFinalObj] = useState(null);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const cancelPaymentRef = useRef(null);

  const { user } = useAuth();

  console.log("previewOpen", previewOpen, selectedTimeSlot);

  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      clinicFid: null,
      patientFid: null,
      doctorFid: null,
      serviceFid: null,
      appointmentDate: new Date(),
      Status: null,
      ServiceDetails: "",
      taxDetails: "",
      EncounterStatus: "",
      location: null,
      fullName: "",
      mobileNumber: "",
      age: "",
      gender: null,
      emailAddress: "",
      city: "",
      reasonForVisit: "",
      bloodGroup: null,
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const appointmentDate = watch("appointmentDate");
  const patientFid = watch("patientFid");

  console.log("patientFid", patientFid);

  const updateVisibleCount = useCallback(() => {
    const w = window.innerWidth;
    if (w >= 1024) setVisibleCount(3);
    else if (w >= 768) setVisibleCount(2);
    else setVisibleCount(1);
  }, []);

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [updateVisibleCount]);

  const totalSlides = Math.max(
    currentCarouselImages.length - visibleCount + 1,
    1,
  );

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((p) => (p === 0 ? totalSlides - 1 : p - 1));
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((p) => (p === totalSlides - 1 ? 0 : p + 1));
  }, [totalSlides]);

  useEffect(() => {
    const t = setInterval(handleNext, 4500);
    return () => clearInterval(t);
  }, [handleNext]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeDept]);

  const visibleImages = currentCarouselImages.slice(
    currentIndex,
    currentIndex + visibleCount,
  );

  const getDoctorName = (doc) =>
    [doc.firstName?.trim(), doc.lName?.trim()].filter(Boolean).join(" ");

  const expertImages = {
    santosh: SantoshSuryawanshiImg,
    manisha: ManishaSuryawanshiImg,
    pradip: PradipTawareImg,
    sandip: SandipMehetreImg,
    smita: SmitaMehetreImg,
    vaishali: VaishaliHolmukheImg,
    avanti: AvantiNitsureImg,
    dhananjay: DhananjayAnvikarImg,
  };

  const getDoctorImage = (doctorName) => {
    if (!doctorName) return null;
    const nameLowerCase = doctorName.toLowerCase();
    for (const [key, value] of Object.entries(expertImages)) {
      if (nameLowerCase.includes(key)) {
        return value;
      }
    }
    return null;
  };

  useEffect(() => {
    getServicesByClinicId(5)
      .then((res) => {
        const data = res?.data?.data;
        if (data?.length) {
          setServicesOptions(
            data.map((item) => ({
              ...item,
              id: item.serviceFid,
              value: item.serviceFid,
              label: `${item.serviceName}`,
            })),
          );
        }
      })
      .catch((error) => error);

    if (user !== null) {
      getPatientDataByMobileNo(user?.mobileNo, 5)
        .then((res) => {
          const data = res?.data?.data;
          if (data?.length) {
            setPatientOptions(
              data.map((item) => ({
                ...item,
                id: item.userId,
                value: item.userId,
                label: `${item.firstName} ${item.lastName}`,
              })),
            );
          }
        })
        .catch((error) => error);
    }
  }, [user]);

  useEffect(() => {
    if (selectedDoctorId && appointmentDate) {
      setSelectedTimeSlot(null);
      setSlotError("");
      setLoading(true);
      getDoctorAvailableSlots(
        selectedDoctorId?.userId,
        format(new Date(appointmentDate), "yyyy-MM-dd"),
        5,
      )
        .then((res) => {
          const data = res?.data?.data;
          if (data?.length) {
            setDoctorSlots(data);
          } else {
            setDoctorSlots([]);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setDoctorSlots([]);
      setSelectedTimeSlot(null);
    }
  }, [selectedDoctorId, appointmentDate]);

  const handleConfirmBooking = handleSubmit((data) => {
    if (selectedTimeSlot === null) {
      setSlotError("Please select a time slot to continue.");
      return;
    }

    // macId: "",
    // macIp: ipAddress,
    // clinicFid: dataObj.clinicFid.id,
    // patientFid: dataObj.patientFid.id,
    // doctorFid: dataObj?.doctorFid.id,
    // serviceFid: String(dataObj.serviceFid.id),
    // appoinmentDate: format(new Date(dataObj.appointmentDate), "yyyy-MM-dd"),
    // Status: dataObj.Status?.label || "",
    // SloteEndTime: selectedTimeSlot?.slotEndTime,
    // SloteStartTime: selectedTimeSlot?.slotStartTime,
    // ServiceDetails: dataObj.ServiceDetails,
    // taxDeatils: dataObj.taxDetails,
    // EncounterStatus: dataObj?.EncounterStatus,

    const saveObj = {
      macId: "22.22",
      macIp: ipAddress,
      clinicFid: selectedDoctorId?.clinicId,
      doctorFid: selectedDoctorId?.userId,
      serviceFid: data?.serviceFid?.id?.toString(),
      appoinmentDate: format(new Date(data.appointmentDate), "yyyy-MM-dd"),
      Status: "",
      SloteEndTime: selectedTimeSlot?.slotEndTime,
      SloteStartTime: selectedTimeSlot?.slotStartTime,
      ServiceDetails: `${data?.serviceFid?.label}- Rs ${data?.serviceFid?.charges}/-`,
      taxDeatils: "",
      EncounterStatus: "",
      reason: data.reasonForVisit,
    };
    setFinalObj(saveObj);
    setPreviewData({ ...data, selectedTimeSlot });
    setPreviewOpen(true);
  });

  const initiatePayment = async () => {
    try {
      const userId = user?.userId;
      const tempObj = {
        amount: previewData?.serviceFid?.charges || 0,
        SloteEndTime: selectedTimeSlot?.slotEndTime,
        SloteStartTime: selectedTimeSlot?.slotStartTime,
        appointmentDate: format(
          new Date(previewData.appointmentDate),
          "yyyy-MM-dd",
        ),
        userId: userId,
      };

      const res = await InitiatePayment(
        selectedDoctorId?.clinicId,
        userId,
        tempObj,
      );
      const data = res?.data;

      if (data?.status === 200) {
        setIsPaymentPending(true);

        cancelPaymentRef.current = RedirectToSabPaisa(
          data,
          selectedDoctorId?.clinicId,
          data.clientTxnId,
          async () => {
            const res = await bookAppointment(finalObj, userId);
            if (res.data.status === 200) {
              successAlert(
                res.data.message || "Appointment booked successfully!",
              );
              setIsPaymentPending(false);
              reset({
                clinicFid: null,
                patientFid: null,
                doctorFid: null,
                serviceFid: null,
                appointmentDate: null,
                Status: null,
                ServiceDetails: "",
                taxDetails: "",
                EncounterStatus: "",
                location: null,
                fullName: "",
                mobileNumber: "",
                age: "",
                gender: null,
                emailAddress: "",
                city: "",
                reasonForVisit: "",
                bloodGroup: null,
              });
              setSelectedTimeSlot(null);
              setSelectedDoctorId(null);
              setFinalObj(null);
              setPreviewData(null);
            } else {
              errorAlert(res.data.message || "Booking failed after payment.");
              setIsPaymentPending(false);
            }
          },
          (errorStatus) => {
            const msg =
              errorStatus?.message ||
              "Payment failed or cancelled. Please try again.";
            errorAlert(msg);
            setIsPaymentPending(false);
          },
        );
      } else {
        errorAlert(data?.message || "Failed to initiate payment");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      errorAlert("An error occurred while initiating payment.");
    }
  };

  const handleProceed = () => {
    setPreviewOpen(false);
    initiatePayment();
  };

  useEffect(() => {
    if (patientFid !== null) {
      setValue("fullName", patientFid.label);
      setValue("mobileNumber", patientFid.mobileNo);
      setValue("age", patientFid?.age);
      const bloodGroupFilter = bloodGroupOptions.find(
        (list) => list.label === patientFid.bloodGroup,
      );
      const filterGender = genderOptions.find(
        (list) => list.label.toLowerCase() === patientFid.gender,
      );

      setValue("bloodGroup", bloodGroupFilter);
      setValue("gender", filterGender);
      setValue("city", patientFid.city);
      setValue("emailAddress", patientFid.emailId);
    }
  }, [patientFid]);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIpAddress(data.ip))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <>
      <style>{`
        .ayur-scroll::-webkit-scrollbar { width: 4px; }
        .ayur-scroll::-webkit-scrollbar-track { background: #d1fae5; border-radius: 10px; }
        .ayur-scroll::-webkit-scrollbar-thumb { background: #059669; border-radius: 10px; }
        .ayur-scroll::-webkit-scrollbar-thumb:hover { background: #047857; }
        .ayur-scroll { scrollbar-width: thin; scrollbar-color: #059669 #d1fae5; }
      `}</style>

      <div className="p-3 sm:p-4 md:p-5 space-y-4 md:space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 flex flex-col gap-4">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-base md:text-lg font-bold text-emerald-800 flex items-center gap-2">
                    <span className="text-xl">
                      {isYoga ? (
                        <SelfImprovementIcon />
                      ) : isHomeopathy ? (
                        <HealingIcon />
                      ) : (
                        <CompostIcon />
                      )}
                    </span>{" "}
                    Our {activeDept || "Ayurveda"}{" "}
                    {isYoga ? "Sessions" : "Treatments"}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5 pl-7">
                    {isYoga
                      ? "Find balance through guided practice"
                      : isHomeopathy
                        ? "Natural healing for root causes"
                        : "Ancient therapies for modern well-being"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous"
                    className="w-9 h-9 rounded-full border border-emerald-300 bg-white text-emerald-700 flex items-center justify-center shadow-sm hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-200"
                  >
                    <NavigateBeforeRoundedIcon fontSize="small" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next"
                    className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md hover:bg-emerald-700 transition-all duration-200"
                  >
                    <NavigateNextRoundedIcon fontSize="small" />
                  </button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[9px] bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 border border-emerald-100 shadow-inner p-2 md:p-3">
                <div className="flex gap-2 md:gap-3">
                  <AnimatePresence custom={direction} mode="popLayout">
                    {visibleImages.map((img) => (
                      <motion.div
                        key={img.id}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 280, damping: 30 },
                          opacity: { duration: 0.2 },
                        }}
                        className="flex-1 min-w-0"
                      >
                        <div className="relative overflow-hidden rounded-[9px] aspect-[4/3] md:aspect-[3/2] group shadow-md">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl" />
                          <div className="absolute bottom-2 left-2 right-2">
                            <span className="text-white text-[10px] font-semibold bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                              {img.alt}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="flex justify-center gap-1.5 mt-3">
                  {Array.from({ length: totalSlides }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setDirection(i > currentIndex ? 1 : -1);
                        setCurrentIndex(i);
                      }}
                      aria-label={`Slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? "bg-emerald-600 w-6"
                          : "bg-emerald-200 w-2 hover:bg-emerald-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
                  <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-1.5">
                    <PersonSearchIcon
                      fontSize="small"
                      className="text-emerald-600"
                    />
                    Choose Your Vaidya
                  </h3>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                {doctorList.length > 0 && (
                  <span className="text-xs text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                    {doctorList.length} available
                  </span>
                )}
              </div>

              {loadingDoctors ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
                  <p className="text-xs text-gray-400 animate-pulse">
                    Finding expert Vaidyas…
                  </p>
                </div>
              ) : doctorList.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 gap-2">
                  <AccountCircleIcon sx={{ fontSize: 44, color: "#6ee7b7" }} />
                  <p className="text-sm font-semibold text-gray-400">
                    No doctors available
                  </p>
                  <p className="text-xs text-gray-300">
                    Please try another department
                  </p>
                </div>
              ) : (
                <div
                  className="ayur-scroll overflow-y-auto space-y-2.5 pr-1 py-2"
                  style={{ maxHeight: "360px" }}
                >
                  {doctorList.map((doctor, idx) => {
                    const isSelected =
                      selectedDoctorId?.userId === doctor.userId;
                    const doctorName = getDoctorName(doctor);
                    const initials = doctorName
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase();

                    const days =
                      doctor?.sessions[0].weekDays
                        ?.split(",")
                        .filter((d) => d.trim())
                        .map((d) => d.trim().substring(0, 3)) ?? [];

                    return (
                      <motion.div
                        key={doctor.userId ?? idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: idx * 0.06,
                          duration: 0.35,
                          ease: "easeOut",
                        }}
                        onClick={() => setSelectedDoctorId(doctor)}
                        whileTap={{ scale: 0.98 }}
                        className={`cursor-pointer rounded-[9px] border-2 transition-all duration-200 ${
                          isSelected
                            ? "border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-lg shadow-emerald-100"
                            : "border-gray-100 bg-white hover:border-emerald-300 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center gap-3 p-3">
                          <div className="relative shrink-0">
                            {getDoctorImage(doctorName) ||
                            doctor.profilePhoto ? (
                              <img
                                src={
                                  getDoctorImage(doctorName) ||
                                  doctor.profilePhoto
                                }
                                alt={doctorName}
                                className={`w-20 h-20 rounded-full object-cover bg-top shadow-md border-2 ${isSelected ? "border-emerald-400" : "border-gray-100"}`}
                              />
                            ) : (
                              <div
                                className={`w-20 h-20 rounded-full bg-gradient-to-br ${activeGradient} flex items-center justify-center shadow-md`}
                              >
                                <span className="text-white font-black text-lg">
                                  {initials || "?"}
                                </span>
                              </div>
                            )}
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-md border-2 border-white"
                              >
                                <CheckCircleIcon
                                  style={{ fontSize: 14 }}
                                  className="text-white"
                                />
                              </motion.div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p
                                className={`font-black text-sm leading-tight ${isSelected ? "text-emerald-800" : "text-gray-800"}`}
                              >
                                {doctorName}
                              </p>
                              <span
                                className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${isSelected ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                              >
                                <Clock size={10} />
                                {doctor?.sessions[0].timeSlot} min
                              </span>
                            </div>
                            {doctor.degree?.trim() && (
                              <p className="text-xs text-gray-500 mt-0.5 font-medium">
                                {doctor?.degree?.trim()}
                              </p>
                            )}
                            <p className="text-xs text-ayuBrown mt-0.5 font-medium">
                              {doctor?.clinicName}
                            </p>

                            {days.length > 0 && (
                              <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                                <CalendarMonthIcon
                                  style={{ fontSize: 16 }}
                                  className="text-gray-400 shrink-0"
                                />
                                {days.map((d, di) => (
                                  <span
                                    key={di}
                                    className={`text-xs px-3 py-0.5 rounded-[5px] font-semibold ${
                                      isSelected
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                                  >
                                    {d}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex space-x-2 items-center mt-1 ">
                              <EventAvailableIcon
                                style={{ fontSize: 16 }}
                                className="text-gray-400 shrink-0"
                              />
                              <p className="text-xs text-gray-500 mt-0.5 font-medium bg-slate-100 px-2 py-0.5 rounded-[5px]">
                                {doctor?.sessions[0].morning}
                              </p>
                              &nbsp; -
                              <p className="text-xs text-gray-500 mt-0.5 font-medium bg-slate-100 px-2 py-0.5 rounded-[5px]">
                                {doctor?.sessions[0].evening}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-1 flex flex-col">
            <div className="mb-3">
              <h2 className="text-base md:text-lg font-bold text-emerald-800 flex items-center gap-2">
                <span className="text-xl">
                  {isYoga ? (
                    <SelfImprovementIcon />
                  ) : isHomeopathy ? (
                    <HealingIcon />
                  ) : (
                    <FilterVintageIcon />
                  )}
                </span>{" "}
                Why {activeDept || "Ayurveda"}?
              </h2>
              <p className="text-xs text-gray-400 mt-0.5 pl-7">
                {isYoga
                  ? "Path to inner peace"
                  : isHomeopathy
                    ? "Gentle and effective healing"
                    : "Discover the science of life"}
              </p>
            </div>

            <div
              className="ayur-scroll overflow-y-auto space-y-2 pr-1"
              style={{ maxHeight: "620px" }}
            >
              {currentSideContent.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07, duration: 0.3 }}
                  className={`flex items-start gap-2.5 p-2.5 rounded-xl ${item.bg} border ${item.border} hover:shadow-md transition-shadow duration-200`}
                >
                  <div
                    className={`shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-sm`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-xs">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="rounded-[9px] border border-emerald-100 shadow-xl overflow-hidden bg-white"
        >
          <div className="bg-emerald-900 px-4 py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CalendarMonthIcon sx={{ color: "#fff", fontSize: 18 }} />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Schedule Appointment
              </h2>
            </div>
            <div className="flex-1 max-w-[280px]">
              <DropdownField
                control={control}
                name="serviceFid"
                placeholder="Service *"
                dataArray={servicesOptions}
                error={errors.serviceFid}
                className="scale-90"
              />
            </div>
          </div>

          <div className="p-3 sm:p-4 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {appointmentDate
                    ? format(new Date(appointmentDate), "MMMM yyyy")
                    : format(new Date(), "MMMM yyyy")}
                </span>
                <div className="scale-75 origin-right">
                  <DatePickerField
                    control={control}
                    name="appointmentDate"
                    label="Appointment Date"
                    inputFormat="dd-MM-yyyy"
                    disablePast={true}
                    error={errors.appointmentDate}
                  />
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 ayur-scroll">
                {(() => {
                  const today = startOfDay(new Date());
                  const baseDate = appointmentDate
                    ? new Date(appointmentDate)
                    : new Date();
                  const monthDays = eachDayOfInterval({
                    start: startOfMonth(baseDate),
                    end: endOfMonth(baseDate),
                  });
                  return monthDays.map((d, i) => (
                    <DateCard
                      key={i}
                      date={d}
                      disabled={isBefore(startOfDay(d), today)}
                      isSelected={
                        appointmentDate &&
                        format(new Date(appointmentDate), "yyyy-MM-dd") ===
                          format(d, "yyyy-MM-dd")
                      }
                      onClick={() => setValue("appointmentDate", d)}
                    />
                  ));
                })()}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <div className="w-1 h-1 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Available Slots
                </span>
              </div>

              <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100 min-h-[140px]">
                <AnimatePresence mode="wait">
                  {selectedDoctorId === null ? (
                    <motion.div
                      key="no-doctor"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-6 text-center"
                    >
                      <Stethoscope className="w-8 h-8 text-slate-300 mb-2" />
                      <p className="text-slate-500 font-bold text-[11px]">
                        Select a Consultant
                      </p>
                    </motion.div>
                  ) : loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-6"
                    >
                      <div className="w-8 h-8 border-2 border-emerald-100 border-t-emerald-500 rounded-full animate-spin" />
                      <p className="text-slate-400 text-[10px] font-bold mt-2">
                        Checking slots...
                      </p>
                    </motion.div>
                  ) : doctorSlots.length === 0 ? (
                    <motion.div
                      key="no-slots"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-6 text-center"
                    >
                      <Clock className="w-8 h-8 text-slate-300 mb-2" />
                      <p className="text-slate-400 font-bold text-[11px]">
                        No slots this day
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="slots"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2"
                    >
                      {doctorSlots.map((slot, index) => (
                        <TimeSlotChip
                          key={index}
                          slot={slot}
                          isSelected={
                            selectedTimeSlot?.slotStartTime ===
                            slot.slotStartTime
                          }
                          onSelect={() => {
                            setSelectedTimeSlot(slot);
                            setSlotError("");
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                {slotError && (
                  <p className="text-red-500 text-[10px] font-bold mt-3 text-center bg-red-50 py-1.5 rounded-lg">
                    {slotError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="rounded-[9px] border border-emerald-100 shadow-md overflow-hidden bg-white"
        >
          <div className="bg-gradient-to-r from-teal-700 to-green-700 px-4 sm:px-5 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="py-1.5 px-2 bg-white/15 rounded-[9px]">
                <PersonSearchIcon sx={{ color: "#fff", fontSize: 20 }} />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Patient Information
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpenAddPatientModal(true)}
              className="flex items-center gap-1 text-xs font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/20 px-3 py-1.5 rounded-[9px] transition-all duration-200"
            >
              + Add Patient
            </button>
          </div>

          <div className="p-4 sm:p-5">
            <div className="mb-4 max-w-xs">
              <DropdownField
                control={control}
                name="patientFid"
                placeholder="Select Patient *"
                dataArray={patientOptions}
                error={errors.patientFid}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="col-span-2">
                <InputField
                  control={control}
                  name="fullName"
                  label="Full Name"
                  error={errors.fullName}
                  disabled={true}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-[11px] mt-0.5">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <InputField
                  control={control}
                  name="mobileNumber"
                  label="Mobile Number"
                  error={errors.mobileNumber}
                  disabled={true}
                />
                {errors.mobileNumber && (
                  <p className="text-red-500 text-[11px] mt-0.5">
                    {errors.mobileNumber.message}
                  </p>
                )}
              </div>
              <div>
                <InputField
                  control={control}
                  name="age"
                  label="Age"
                  error={errors.age}
                  disabled={true}
                />
                {errors.age && (
                  <p className="text-red-500 text-[11px] mt-0.5">
                    {errors.age.message}
                  </p>
                )}
              </div>
              <div>
                <DropdownField
                  control={control}
                  name="bloodGroup"
                  placeholder="Select Blood Group"
                  dataArray={bloodGroupOptions}
                  error={errors.bloodGroup}
                  isDisabled={true}
                />
                {errors.bloodGroup && (
                  <p className="text-red-500 text-[11px] mt-0.5">
                    {errors.bloodGroup.message}
                  </p>
                )}
              </div>
              <div>
                <DropdownField
                  control={control}
                  name="gender"
                  placeholder="Select Gender"
                  dataArray={genderOptions}
                  error={errors.gender}
                  isDisabled={true}
                />
                {errors.gender && (
                  <p className="text-red-500 text-[11px] mt-0.5">
                    {errors.gender.message}
                  </p>
                )}
              </div>
              <div>
                <InputField
                  control={control}
                  name="emailAddress"
                  label="Email Address"
                  error={errors.emailAddress}
                           disabled={true}
                />
                {errors.emailAddress && (
                  <p className="text-red-500 text-[11px] mt-0.5">
                    {errors.emailAddress.message}
                  </p>
                )}
              </div>
              <div>
                <InputField
                  control={control}
                  name="city"
                  label="City"
                  error={errors.city}
                           disabled={true}
                />
                {errors.city && (
                  <p className="text-red-500 text-[11px] mt-0.5">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div className="col-span-1 sm:col-span-2 lg:col-span-4">
                <InputArea
                  control={control}
                  name="reasonForVisit"
                  label="Reason For Visit *"
                  minRows={3}
                  maxRows={5}
                  error={errors.reasonForVisit}
                />
                {errors.reasonForVisit && (
                  <p className="text-red-500 text-[11px] mt-0.5">
                    {errors.reasonForVisit.message}
                  </p>
                )}
              </div>

              <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col sm:flex-row justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="w-full sm:w-auto h-10 px-6 rounded-[9px] border-2 border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 hover:border-red-400 transition-all duration-200"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="w-full sm:w-auto h-10 px-8 rounded-[9px] bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/25 hover:from-emerald-700 hover:to-teal-700 hover:shadow-emerald-500/40 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <EventAvailableIcon sx={{ fontSize: 17 }} />
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {openAddPatientModal && (
        <AddPatientModal
          open={openAddPatientModal}
          handleClose={() => setOpenAddPatientModal(false)}
        />
      )}

      {previewOpen && (
        <BookingPreviewModal
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          onProceed={handleProceed}
          data={previewData}
          activeDept={activeDept}
          selectedDoctorId={selectedDoctorId}
        />
      )}

      <ConfirmationModal
        confirmationOpen={isPaymentPending}
        confirmationHandleClose={() => {
          if (isPaymentPending) {
            cancelPaymentRef.current?.();
            setIsPaymentPending(false);
          }
        }}
        confirmationSubmitFunc={() => {}}
        confirmationLabel="Payment in Progress"
        confirmationMsg="Please complete the transaction in the new tab to book your appointment. Do not close this window."
        confirmationButtonMsg="Waiting..."
      />
    </>
  );
}

export default AyurvedaForm;
