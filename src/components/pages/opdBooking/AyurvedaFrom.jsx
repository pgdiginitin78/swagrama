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
import {
  Box,
  Divider,
  Modal
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import CompostIcon from "@mui/icons-material/Compost";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import HealingIcon from "@mui/icons-material/Healing";
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
import bookAppointmentIcon from "../../../assets/bookAppointment.svg";
import HolisticHealing from "../../../assets/HolisticHealing.svg";
import abhyangaImg from "../../../assets/images/ayurveda/ayurveda_abhyanga.webp";
import herbsImg from "../../../assets/images/ayurveda/ayurveda_herbs.webp";
import kizhiImg from "../../../assets/images/ayurveda/ayurveda_kizhi.webp";
import nasyaImg from "../../../assets/images/ayurveda/ayurveda_nasya.webp";
import panchakarmaImg from "../../../assets/images/ayurveda/ayurveda_panchakarma.webp";
import shirodharaImg from "../../../assets/images/ayurveda/ayurveda_shirodhara.webp";
import panchakarmaAsset from "../../../assets/images/ayurveda/panchakarma.webp";
import shirodharaAsset from "../../../assets/images/ayurveda/shirodhara.webp";
import homeopathyBottlesImg from "../../../assets/images/homeopathy/homeopathy_bottles_pills.webp";
import homeopathyConsultationImg from "../../../assets/images/homeopathy/homeopathy_consultation.webp";
import homeopathyHerbsImg from "../../../assets/images/homeopathy/homeopathy_herbs.webp";
import yogaBreathImg from "../../../assets/images/yoga/yoga_breath_meditation.webp";
import yogaBridgeImg from "../../../assets/images/yoga/yoga_bridge_pose.webp";
import yogaLotusImg from "../../../assets/images/yoga/yoga_lotus_meditation.webp";
import yogaTreeImg from "../../../assets/images/yoga/yoga_tree_pose.webp";
import yogaWarriorImg from "../../../assets/images/yoga/yoga_warrior_group.webp";
import { useAuth } from "../../../context/AuthContext";
import {
  bookAppointment,
  getDoctorAvailableSlots,
  getPatientDataByMobileNo,
  getServicesByClinicId,
  InitiatePayment,
} from "../../../services/bookAppointment/BookAppointmentServices";
import AvantiNitsureImg from "../../assets/landing-page/ourexperts/Avanti Nitsure.png";
import DhananjayAnvikarImg from "../../assets/landing-page/ourexperts/DhananjayAnvikar.webp";
import ManishaSuryawanshiImg from "../../assets/landing-page/ourexperts/ManishaSuryavanshi.png";
import PradipTawareImg from "../../assets/landing-page/ourexperts/Pradip Taware.png";
import SandipMehetreImg from "../../assets/landing-page/ourexperts/Sandip Mehetre.png";
import SantoshSuryawanshiImg from "../../assets/landing-page/ourexperts/Vaidya Santosh Suryawanshi.png";
import VaishaliHolmukheImg from "../../assets/landing-page/ourexperts/Vaishali Holmukhe.png";
import SmitaMehetreImg from "../../assets/landing-page/ourexperts/Vd Smita mehetre.png";
import CancelButtonModal from "../../common/button/CancelButtonModal";
import CommonButton from "../../common/button/CommonButton";
import { useLoader } from "../../common/commonLoader/LoaderContext";
import ConfirmationModal from "../../common/ConfirmationModal";
import DatePickerField from "../../common/formFields/DatePickerField";
import DropdownField from "../../common/formFields/DropdownField";
import InputArea from "../../common/formFields/InputArea";
import InputField from "../../common/formFields/InputField";
import { ModalStyle } from "../../common/modalStyle/ModalStyle";
import { errorAlert, successAlert } from "../../common/toast/CustomToast";
import AddPatientModal from "./AddPatientModal";
import { RedirectToSabPaisa } from "./RedirectToSabPaisa";
import AppointmentRescheduleIcon from "../../assets/AppointmentScheduleIcon.svg"

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
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      type="button"
      onClick={onSelect}
      disabled={!slot.slotStartTime || slot?.count === 0}
      className={`
    relative w-full px-2 py-1.5 rounded-lg text-[10px] font-medium
    flex items-center justify-between gap-2 border
    transition-all duration-150
    ${
      isSelected
        ? "bg-emerald-500 border-emerald-500 text-white"
        : slot?.count === 0
          ? "bg-slate-100 border-slate-200 text-slate-400"
          : slot?.count <= 3
            ? "bg-amber-100 border-amber-300 text-amber-900"
            : "bg-white border-slate-300 text-slate-800 hover:border-emerald-400"
    }
    disabled:opacity-60 disabled:cursor-not-allowed
  `}
    >
      <span className="whitespace-normal leading-tight text-left">
        {slot?.slotStartTime} - {slot?.slotEndTime}
      </span>

      <span
        className={`
      flex-shrink-0 flex items-center justify-center min-w-[20px] h-5 px-1.5
      rounded-md text-[9px] font-bold
      ${
        isSelected
          ? "bg-white/20 text-white"
          : slot?.count === 0
            ? "bg-red-100 text-red-600"
            : slot?.count <= 3
              ? "bg-amber-200 text-amber-900"
              : "bg-emerald-100 text-emerald-700"
      }
    `}
      >
        {slot?.count}
      </span>
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
          isSelected
            ? "bg-gradient-to-br from-emerald-600 to-teal-700 border-emerald-500 text-white shadow-md shadow-emerald-200/40"
            : isToday
              ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm"
              : disabled
                ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-white border-slate-100 text-slate-600 hover:border-emerald-200 hover:shadow-sm"
        }
      `}
    >
      <span
        className={`text-[9px] font-bold uppercase tracking-tight ${isSelected ? "text-emerald-100" : isToday ? "text-emerald-600" : disabled ? "text-gray-200" : "text-slate-400"}`}
      >
        {dayName}
      </span>
      <span className="text-sm md:text-base font-black leading-none my-0.5">
        {dayNum}
      </span>
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


});

const ayurvedaSideContent = [
  {
    icon: (
      <img src={HolisticHealing} alt="Holistic Healing" className="h-5 w-5" />
    ),
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
  return (
    <Modal open={open}>
      <Box
        sx={ModalStyle}
        className="w-[95%] h-[95%] lg:w-[60%] lg:h-[70%] rounded-xl"
      >
        <div className="bg-gradient-to-br from-emerald-700 via-teal-700 to-green-800 px-5 pt-5 pb-6 relative rounded-t-xl">
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

        <Box sx={{ p: 0 }}>
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
                  selectedDoctorId
                    ? `${selectedDoctorId.firstName} ${selectedDoctorId.lName}`
                    : "—"
                }
              />
              <PreviewRow
                label="Date & Time"
                value={
                  (data.appointmentDate &&
                  !isNaN(new Date(data.appointmentDate).getTime())
                    ? format(new Date(data.appointmentDate), "dd MMM yyyy")
                    : format(new Date(), "dd MMM yyyy")) +
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

          <div className="px-5 pb-5 flex flex-row gap-3 justify-end">
            <CommonButton
              type="button"
              label="Cancel"
              onClick={onClose}
              className="bg-red-50 border border-red-600 text-red-600"
            />
            <CommonButton
              type="button"
              label="Proceed to Book"
              onClick={onProceed}
              className=" bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/30 hover:from-emerald-700 hover:to-teal-700 hover:shadow-emerald-500/40 transition-all duration-200"
            />
          </div>
        </Box>
      </Box>
    </Modal>
  );
}

function AyurvedaForm({
  doctorList = [],
  loadingDoctors = false,
  selectedDoctorId = null,
  setSelectedDoctorId,
  activeGradient = "from-emerald-600 to-green-500",
  activeDept = "Ayurveda",
}) {
  const activeDeptStr = typeof activeDept === "string" ? activeDept : "";
  const isYoga = activeDeptStr.toLowerCase() === "yoga";
  const isHomeopathy = activeDeptStr.toLowerCase() === "homeopathy";

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
  const [slotData, setSlotData] = useState({
    slots: [],
    loading: false,
    error: "",
  });
  const [patientOptions, setPatientOptions] = useState([]);
  const [openAddPatientModal, setOpenAddPatientModal] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);
  const [finalObj, setFinalObj] = useState(null);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const scrollRef = useRef(null);
  const cancelPaymentRef = useRef(null);

  const { user } = useAuth();
  const { setIsLoading } = useLoader();

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

  useEffect(() => {
    if (scrollRef.current && appointmentDate) {
      const selectedEl = scrollRef.current.querySelector(
        '[data-selected="true"]',
      );
      if (selectedEl) {
        const container = scrollRef.current;
        const scrollLeft =
          selectedEl.offsetLeft -
          container.offsetWidth / 2 +
          selectedEl.offsetWidth / 2;
        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [appointmentDate]);

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

  const handleGetPatientData = () => {
    getPatientDataByMobileNo(user?.mobileNo, user.userId, "OPD", 5)
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
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (patientFid !== null) {
      getServicesByClinicId(5, patientFid?.userId,selectedDoctorId?.userId)
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
          }else{
            setServicesOptions([])
          }
        })
        .catch((error) => setServicesOptions([]));
    }
  }, [patientFid,selectedDoctorId]);

useEffect(() => {
  if (selectedDoctorId !== null) {
    setSelectedTimeSlot(null);
    setSlotData((prev) => ({ ...prev, loading: true, error: "" }));

    getDoctorAvailableSlots(
      selectedDoctorId?.userId,
      appointmentDate && !isNaN(new Date(appointmentDate).getTime())
        ? format(new Date(appointmentDate), "yyyy-MM-dd")
        : "",
      5,
    )
      .then((res) => {
        const data = res?.data;

        if (data?.status === 200) {
          const fetchedSlots = data?.data || [];
          setSlotData({
            slots: fetchedSlots,
            loading: false,
            error: fetchedSlots.length === 0 ? "No slots available" : "",
          });
        } else {
          setSlotData({
            slots: [],
            loading: false,
            error: data?.message || "Something went wrong",
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching slots:", err);
        setSlotData({
          slots: [],
          loading: false,
          error: err?.response?.data?.message || "Failed to fetch slots",
        });
      });
  }
}, [selectedDoctorId, appointmentDate]);
console.log("selectedPatient",patientFid)

  const handleConfirmBooking = handleSubmit(
    (data) => {
      if (user === null) {
        errorAlert("login first");
      } else if (selectedDoctorId === null) {
        errorAlert("Please select a doctor to continue");
        return;
      } else if (selectedTimeSlot === null) {
        setSlotData((prev) => ({
          ...prev,
          error: "Please select a time slot to continue.",
        }));
        errorAlert("Please select a time slot to continue.");
        return;
      }

      const saveObj = {
        macId: "",
        macIp: ipAddress || "",
        clinicFid: selectedDoctorId?.clinicId,
        patientFid: data.patientFid?.id,
        doctorFid: selectedDoctorId?.userId,
        serviceFid: data.serviceFid?.id ? String(data.serviceFid.id) : "",
        appoinmentDate:
          data.appointmentDate &&
          !isNaN(new Date(data.appointmentDate).getTime())
            ? format(new Date(data.appointmentDate), "yyyy-MM-dd")
            : "",
        Status: "Booked",
        SloteEndTime: selectedTimeSlot?.slotEndTime,
        SloteStartTime: selectedTimeSlot?.slotStartTime,
        ServiceDetails: data.ServiceDetails,
        taxDeatils: data.taxDetails,
        EncounterStatus: data?.EncounterStatus,
        reason: data.reasonForVisit,
        bookingSource: "web",
        createdBy:patientFid?.userId
      };
      setFinalObj(saveObj);
      setPreviewData({ ...data, selectedTimeSlot });
      setPreviewOpen(true);
    },
    (errors) => {
      if (errors.serviceFid) {
        errorAlert("Please select a service");
      } else if (errors.patientFid) {
        errorAlert("Please select a patient");
      } else if (errors.appointmentDate) {
        errorAlert("Please select an appointment date");
      }
    },
  );

  const initiatePayment = async () => {
    if (isPaymentPending) return;
    try {
      const userId = user?.userId;
      const tempObj = {
        amount: previewData?.serviceFid?.charges || 0,
        SloteEndTime: selectedTimeSlot?.slotEndTime,
        SloteStartTime: selectedTimeSlot?.slotStartTime,
        appointmentDate:
          previewData.appointmentDate &&
          !isNaN(new Date(previewData.appointmentDate).getTime())
            ? format(new Date(previewData.appointmentDate), "yyyy-MM-dd")
            : "",
        userId: patientFid !== null ? patientFid?.id : userId,
        paymentFor: "OPD",
      };

      const res = await InitiatePayment(5, patientFid?.userId, tempObj);
      const data = res?.data;

      if (data?.status === 200) {
        setIsPaymentPending(true);

        cancelPaymentRef.current = RedirectToSabPaisa(
          data,
          selectedDoctorId?.clinicId,
          data.clientTxnId,
          async () => {
            const res = await bookAppointment(
              finalObj,
              patientFid !== null ? patientFid?.id : userId,
            );

            if (res.data.status === 200) {
              successAlert(
                res.data.message || "Appointment booked successfully!",
              );
              setIsPaymentPending(false);
              reset();
              setValue("appointmentDate", new Date());
              setSelectedTimeSlot(null);
              setSelectedDoctorId(null);
              setFinalObj(null);
              setPreviewOpen(false);
              setPreviewData(null);
              setSlotData({
                slots: [],
                loading: false,
                error: "",
              });
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

  const bookAppointmentDirectly = async () => {
    try {
      setIsLoading(true);
      const userId = user?.userId;
      const res = await bookAppointment(
        finalObj,
        patientFid !== null ? patientFid?.id : userId,
      );

      if (res?.data?.status === 200) {
        successAlert(res.data.message || "Appointment booked successfully!");
        reset();
        setValue("appointmentDate", new Date());
        setSelectedTimeSlot(null);
        setSelectedDoctorId(null);
        setFinalObj(null);
        setPreviewOpen(false);
        setPreviewData(null);
        setSlotData({ slots: [], loading: false, error: "" });
      } else {
        errorAlert(res?.data?.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      errorAlert("An error occurred while booking the appointment.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = () => {
    setPreviewOpen(false);
    if (previewData?.serviceFid?.label === "Follow-up ") {
      bookAppointmentDirectly();
    } else {
      initiatePayment();
    }
  };

  useEffect(() => {
    if (patientFid) {
      setValue("fullName", patientFid.label || "");
      setValue("mobileNumber", patientFid.mobileNo || "");
      setValue("age", patientFid?.age || "");
      const bloodGroupFilter = bloodGroupOptions.find(
        (list) => list.label === patientFid.bloodGroup,
      );
      const filterGender = genderOptions.find(
        (list) =>
          list.label?.toLowerCase() === patientFid.gender?.toLowerCase(),
      );

      setValue("bloodGroup", bloodGroupFilter);
      setValue("gender", filterGender);
      setValue("city", patientFid.city || "");
      setValue("emailAddress", patientFid.emailId || "");
    }
  }, [patientFid, setValue]);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIpAddress(data.ip))
      .catch((error) => console.error("Error:", error));
    if (user !== null) {
      handleGetPatientData();
    }
  }, [user]);

  console.log(slotData, "slotData");

  return (
    <>
      <style>{`
        .ayur-scroll::-webkit-scrollbar { width: 4px; }
        .ayur-scroll::-webkit-scrollbar-track { background: #d1fae5; border-radius: 10px; }
        .ayur-scroll::-webkit-scrollbar-thumb { background: #059669; border-radius: 10px; }
        .ayur-scroll::-webkit-scrollbar-thumb:hover { background: #047857; }
        .ayur-scroll { scrollbar-width: thin; scrollbar-color: #059669 #d1fae5; }
      `}</style>

      <div className="px-1 py-4 space-y-5 sm:py-5 md:px-5 ">
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-4">
          <div className="flex flex-col gap-4 lg:col-span-3">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-emerald-800 flex items-center gap-1.5 sm:text-base md:text-lg">
                    <span className="text-lg sm:text-xl">
                      {isYoga ? (
                        <SelfImprovementIcon />
                      ) : isHomeopathy ? (
                        <HealingIcon />
                      ) : (
                        <CompostIcon />
                      )}
                    </span>
                    Our {activeDept || "Ayurveda"}
                    {activeDept === "Homeopathy" ? " Remedies" : " Treatments"}
                  </h2>
                  <p className="text-[10px] text-gray-400 mt-0.5 pl-6 sm:text-xs">
                    {isYoga
                      ? "Find balance through guided practice"
                      : isHomeopathy
                        ? "Natural healing for root causes"
                        : "Ancient therapies for modern well-being"}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous"
                    className="w-8 h-8 rounded-full border border-emerald-300 bg-white text-emerald-700 flex items-center justify-center shadow-sm hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-200 sm:w-9 sm:h-9"
                  >
                    <NavigateBeforeRoundedIcon fontSize="small" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next"
                    className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md hover:bg-emerald-700 transition-all duration-200 sm:w-9 sm:h-9"
                  >
                    <NavigateNextRoundedIcon fontSize="small" />
                  </button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 border border-emerald-100 shadow-inner p-2 sm:p-3">
                <div className="flex gap-2 sm:gap-3">
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
                        <div className="relative overflow-hidden rounded-xl aspect-[4/3] group shadow-md sm:aspect-[3/2]">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl" />
                          <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2">
                            <span className="text-white text-[9px] font-semibold bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full sm:text-[10px]">
                              {img.alt}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="flex justify-center gap-1.5 mt-2.5 sm:mt-3">
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
              <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
                  <h3 className="text-xs font-bold text-emerald-900 flex items-center gap-1 sm:text-sm">
                    <PersonSearchIcon
                      fontSize="small"
                      className="text-emerald-600"
                    />
                   Community Healers (By Appointment only) 
                  </h3>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                {doctorList.length > 0 && (
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-semibold sm:text-xs">
                    {doctorList.length} available
                  </span>
                )}
              </div>

              {loadingDoctors ? (
                <div className="flex flex-col items-center justify-center py-8 gap-3 sm:py-10">
                  <div className="w-9 h-9 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin sm:w-10 sm:h-10" />
                  <p className="text-xs text-gray-400 animate-pulse">
                    Finding expert Vaidyas…
                  </p>
                </div>
              ) : doctorList?.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-center rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 gap-2 sm:py-10">
                  <AccountCircleIcon sx={{ fontSize: 40, color: "#6ee7b7" }} />
                  <p className="text-sm font-semibold text-gray-400">
                    No doctors available
                  </p>
                  <p className="text-xs text-gray-300">
                    Please try another department
                  </p>
                </div>
              ) : (
                <div
                  className="ayur-scroll overflow-y-auto no-scrollbar space-y-2 pr-1 py-1.5 sm:space-y-2.5 sm:py-2"
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
                        className={`cursor-pointer rounded-lg border transition-all duration-200 ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-50 shadow-md"
                            : "border-gray-200 bg-white active:border-emerald-400"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 p-2.5 sm:gap-3 sm:p-3 md:gap-4 md:p-4">
                          <div className="relative shrink-0">
                            {getDoctorImage(doctorName) ||
                            doctor.profilePhoto ? (
                              <img
                                src={
                                  getDoctorImage(doctorName) ||
                                  doctor.profilePhoto
                                }
                                alt={doctorName}
                                className={`w-11 h-11 rounded-full object-cover border ${
                                  isSelected
                                    ? "border-emerald-400"
                                    : "border-gray-200"
                                } sm:w-13 sm:h-13 md:w-14 md:h-14 lg:w-16 lg:h-16`}
                              />
                            ) : (
                              <div
                                className={`w-11 h-11 rounded-full bg-gradient-to-br ${activeGradient} flex items-center justify-center sm:w-13 sm:h-13 md:w-14 md:h-14 lg:w-16 lg:h-16`}
                              >
                                <span className="text-white font-bold text-xs sm:text-sm">
                                  {initials || "?"}
                                </span>
                              </div>
                            )}

                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center border border-white sm:w-5 sm:h-5"
                              >
                                <CheckCircleIcon
                                  style={{ fontSize: 10 }}
                                  className="text-white sm:text-[12px]"
                                />
                              </motion.div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p
                                className={`font-semibold text-xs truncate sm:text-sm ${
                                  isSelected
                                    ? "text-emerald-800"
                                    : "text-gray-800"
                                }`}
                              >
                                {doctorName}
                              </p>
                              <span
                                className={`shrink-0 flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full sm:text-[10px] sm:px-2 ${
                                  isSelected
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                <Clock
                                  size={8}
                                  className="sm:w-[9px] sm:h-[9px]"
                                />
                                {doctor?.sessions?.[idx]?.timeSlot || ""} min
                              </span>
                            </div>

                            {doctor.degree?.trim() && (
                              <p className="text-[10px] text-gray-500 truncate mt-0.5 sm:text-xs">
                                {doctor?.degree?.trim()}
                              </p>
                            )}

                            <p className="text-[10px] text-ayuBrown truncate sm:text-xs">
                              {doctor?.clinicName}
                            </p>

                            {/* Unified Days Row */}
                            {(() => {
                              const allUniqueDays = Array.from(
                                new Set(
                                  doctor?.sessions?.flatMap(
                                    (s) =>
                                      s.weekDays
                                        ?.split(",")
                                        .map((d) => d.trim().substring(0, 3))
                                        .filter(Boolean) || [],
                                  ),
                                ),
                              );

                              if (allUniqueDays.length === 0) return null;

                              return (
                                <div className="flex items-center gap-1 flex-wrap mt-1">
                                  <CalendarMonthIcon
                                    style={{ fontSize: 13 }}
                                    className="text-gray-400"
                                  />
                                  {allUniqueDays.map((day, di) => (
                                    <span
                                      key={di}
                                      className={`text-[9px] px-1.5 py-0.5 rounded font-semibold sm:text-[10px] sm:px-2 ${
                                        isSelected
                                          ? "bg-emerald-100 text-emerald-700"
                                          : "bg-gray-100 text-gray-600"
                                      }`}
                                    >
                                      {day}
                                    </span>
                                  ))}
                                </div>
                              );
                            })()}

                            {/* Combined Times Section */}
                            <div className="mt-1 space-y-1">
                              {doctor?.sessions?.map((session, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="flex flex-wrap items-center gap-1"
                                >
                                  <EventAvailableIcon
                                    style={{ fontSize: 13 }}
                                    className="text-gray-400"
                                  />
                                  {session.morning && (
                                    <p className="text-[9px] text-gray-500 font-medium bg-gray-100 px-1.5 py-0.5 rounded sm:text-[10px] sm:px-2">
                                      {session.morning}
                                    </p>
                                  )}
                                  {session.morning && session.evening && (
                                    <span className="text-[9px] text-gray-400">
                                      -
                                    </span>
                                  )}
                                  {session.evening && (
                                    <p className="text-[9px] text-gray-500 font-medium bg-gray-100 px-1.5 py-0.5 rounded sm:text-[10px] sm:px-2">
                                      {session.evening}
                                    </p>
                                  )}
                                  {!session.morning && !session.evening && (
                                    <p className="text-[9px] text-gray-500 font-medium bg-gray-100 px-1.5 py-0.5 rounded sm:text-[10px] sm:px-2">
                                      —
                                    </p>
                                  )}
                                  {doctor.sessions.length > 1 && (
                                    <span className="text-[8px] text-gray-400 italic ml-1">
                                      (
                                      {session.weekDays
                                        ?.split(",")
                                        .map((d) => d.trim().substring(0, 3))
                                        .join(", ")}
                                      )
                                    </span>
                                  )}
                                </div>
                              ))}
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

          <div className="flex flex-col lg:col-span-1">
            <div className="mb-2.5 sm:mb-3">
              <h2 className="text-sm font-bold text-emerald-800 flex items-center gap-1.5 sm:text-base md:text-lg">
                <span className="text-lg sm:text-xl">
                  {isYoga ? (
                    <SelfImprovementIcon />
                  ) : isHomeopathy ? (
                    <HealingIcon />
                  ) : (
                    <FilterVintageIcon />
                  )}
                </span>
                Why {activeDept || "Ayurveda"}?
              </h2>
              <p className="text-[10px] text-gray-400 mt-0.5 pl-6 sm:text-xs">
                {isYoga
                  ? "Path to inner peace"
                  : isHomeopathy
                    ? "Gentle and effective healing"
                    : "Discover the science of life"}
              </p>
            </div>

            <div
              className="ayur-scroll overflow-y-auto no-scrollbar grid grid-cols-1 gap-2 pr-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-1"
              style={{ maxHeight: "620px" }}
            >
              {currentSideContent.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07, duration: 0.3 }}
                  className={`flex items-start gap-2 p-2.5 rounded-xl ${item.bg} border ${item.border} hover:shadow-md transition-shadow duration-200`}
                >
                  <div
                    className={`shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-sm sm:w-8 sm:h-8`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-[11px] sm:text-xs">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed sm:text-xs">
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
          className="rounded-xl border border-emerald-100 shadow-xl overflow-hidden bg-white"
        >
          <div className="bg-emerald-900 px-3 py-2.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between md:px-4 sm:gap-3">
            <div className="flex items-center gap-2">
              <img
                src={bookAppointmentIcon}
                alt="Book Appointment"
                className="h-5 w-5"
              />
              <h2 className="text-xs font-bold text-white uppercase tracking-wider sm:text-sm">
                Schedule Appointment
              </h2>
            </div>
          </div>

          <div className="p-3 space-y-4 sm:p-4 sm:space-y-5">
            <div className="space-y-2">
              <div className="md:flex items-center md:justify-between px-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {appointmentDate &&
                  !isNaN(new Date(appointmentDate).getTime())
                    ? format(new Date(appointmentDate), "MMMM yyyy")
                    : format(new Date(), "MMMM yyyy")}
                </span>
                <div className="md:scale-75 md:origin-right mt-2 md:mt-0">
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

              <div
                ref={scrollRef}
                className="flex gap-1.5 overflow-x-auto pb-2 ayur-scroll sm:gap-2"
              >
                {(() => {
                  const today = startOfDay(new Date());
                  const baseDate =
                    appointmentDate &&
                    !isNaN(new Date(appointmentDate).getTime())
                      ? new Date(appointmentDate)
                      : new Date();
                  const monthDays = eachDayOfInterval({
                    start: startOfMonth(baseDate),
                    end: endOfMonth(baseDate),
                  });
                  return monthDays.map((d, i) => {
                    const isSelected =
                      appointmentDate &&
                      !isNaN(new Date(appointmentDate).getTime()) &&
                      format(new Date(appointmentDate), "yyyy-MM-dd") ===
                        format(d, "yyyy-MM-dd");
                    return (
                      <div key={i} data-selected={isSelected}>
                        <DateCard
                          date={d}
                          disabled={isBefore(startOfDay(d), today)}
                          isSelected={isSelected}
                          onClick={() => setValue("appointmentDate", d)}
                        />
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2 px-1">
                <div className="w-1 h-1 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Available Slots
                </span>
              </div>

              <div className="bg-slate-50/50 rounded-xl p-2.5 border border-slate-100 min-h-[120px] sm:p-3 sm:min-h-[140px]">
                {selectedDoctorId === null ? (
                  <div className="flex flex-col items-center justify-center py-5 text-center sm:py-6">
                    <Stethoscope className="w-7 h-7 text-slate-300 mb-2 sm:w-8 sm:h-8" />
                    <p className="text-slate-500 font-bold text-[11px]">
                      Select a Consultant
                    </p>
                  </div>
                ) : slotData?.loading ? (
                  <div className="flex flex-col items-center justify-center py-5 sm:py-6">
                    <div className="w-7 h-7 border-2 border-emerald-100 border-t-emerald-500 rounded-full animate-spin sm:w-8 sm:h-8" />
                    <p className="text-slate-400 text-[10px] font-bold mt-2">
                      Checking slots...
                    </p>
                  </div>
                ) : slotData?.slots?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-5 text-center sm:py-6">
                    <Clock className="w-7 h-7 text-slate-300 mb-2 sm:w-8 sm:h-8" />
                    <p className="text-slate-400 font-bold text-[11px]">
                      {slotData.error || "No slots this day"}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1.5  sm:gap-2 md:grid-cols-6 lg:grid-cols-8">
                    {slotData.slots.map((slot, index) => (
                      <TimeSlotChip
                        key={index}
                        slot={slot}
                        isSelected={
                          selectedTimeSlot?.slotStartTime === slot.slotStartTime
                        }
                        onSelect={() => {
                          setSelectedTimeSlot(slot);
                          setSlotData((prev) => ({ ...prev, error: "" }));
                        }}
                      />
                    ))}
                  </div>
                )}

            
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="rounded-xl border border-emerald-100 shadow-md overflow-hidden bg-white"
        >
          <div className="bg-gradient-to-r from-teal-700 to-green-700 px-3 py-2.5 flex items-center justify-between gap-2 sm:px-4 sm:py-3 sm:gap-3">
            <div className="flex items-center gap-2">
              <div className="py-1 px-1.5 bg-white/15 rounded-lg sm:py-1.5 sm:px-2 sm:rounded-[9px]">
                <PersonSearchIcon sx={{ color: "#fff", fontSize: 18 }} />
              </div>
              <h2 className="text-sm font-bold text-white sm:text-base md:text-lg">
                Patient Information
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpenAddPatientModal(true)}
              className="flex items-center gap-1 text-[10px] font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/20 px-2.5 py-1.5 rounded transition-all duration-200 sm:text-xs sm:px-3 "
            >
              + Add Patient
            </button>
          </div>

          <div className="p-3 sm:p-4 md:p-5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 mb-4">
              <div className="">
                <DropdownField
                  control={control}
                  name="patientFid"
                  placeholder="Select Patient *"
                  dataArray={patientOptions}
                  error={errors.patientFid}
                />
              </div>
              <div className="w-full ">
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
            <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              <div className="col-span-1 xs:col-span-2">
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

              <div className="col-span-1 xs:col-span-2 lg:col-span-4">
                <InputArea
                  control={control}
                  name="reasonForVisit"
                  label="Reason For Visit"
                  minRows={3}
                  maxRows={5}
                />
          
              </div>

              <div className="col-span-1 xs:col-span-2 lg:col-span-4 flex flex-col gap-2.5 pt-2 sm:flex-row sm:justify-end sm:gap-3">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="w-full h-10 px-4 rounded-[5px] border-2 border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 hover:border-red-400 active:scale-95 transition-all duration-200 md:w-auto md:px-5 "
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="w-full h-10 px-4 rounded-[5px] bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 hover:from-emerald-700 hover:to-teal-700 hover:shadow-emerald-500/40 active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5 md:w-auto md:px-6 sm:gap-2 "
                >
                  {/* <EventAvailableIcon sx={{ fontSize: 16 }} /> */}
                  Confirm Booking
                  <img src={AppointmentRescheduleIcon} alt="" className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {openAddPatientModal && (
        <AddPatientModal
          open={openAddPatientModal}
          handleClose={() => {
            setOpenAddPatientModal(false);
            handleGetPatientData();
          }}
          type={"OPD"}
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
        disabled={isPaymentPending}
      />
    </>
  );
}

export default AyurvedaForm;
