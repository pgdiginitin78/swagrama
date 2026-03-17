import {
  Event,
  Healing,
  LocalFlorist,
  LocalHospital,
  MedicalServices,
  Nature,
  Person,
  Spa,
  WbSunny,
} from "@mui/icons-material";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ParkIcon from "@mui/icons-material/Park";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import SchoolIcon from "@mui/icons-material/School";
import ScienceIcon from "@mui/icons-material/Science";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import SpaIcon from "@mui/icons-material/Spa";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Container,
  Divider,
  Modal,
  Typography
} from "@mui/material";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AgroWellness from "../assets/landing-page/ayurvedaservices/Agro_wellness.png";
import Ayurveda from "../assets/landing-page/ayurvedaservices/Ayurveda.png";
import NaturalFarming from "../assets/landing-page/ayurvedaservices/Natural_farming.png";
import NaturalHabitat from "../assets/landing-page/ayurvedaservices/Natural_habitat.png";
import Swagurukul from "../assets/landing-page/ayurvedaservices/Swagurukul.png";
import landigPageS1 from "../assets/landing-page/landigPageS1.mp4";
import ManishaSuryawanshi from "../assets/landing-page/ourexperts/ManishaSuryavanshi.jpg";
import PradipTaware from "../assets/landing-page/ourexperts/PradipTaware.jpg";
import SandipMehetre from "../assets/landing-page/ourexperts/SandipMahetre.jpg";
import SantoshSuryavanshi from "../assets/landing-page/ourexperts/SantoshSuryawanshi.jpg";
import SmitaMehetre from "../assets/landing-page/ourexperts/SmitaMahetre.jpg";
import VaishaliHolmukhe from "../assets/landing-page/ourexperts/VaishaliHolmukhe.jpg";
import SwagarmaMainImg from "../assets/landing-page/swagramaMain.png";
import StoryImg from "../assets/landing-page/topStories/Self-Dependence Village.png";
import CancelButtonModal from "../common/button/CancelButtonModal";
import { errorAlert } from "../common/toast/CustomToast";
import BookEventForm from "../pages/bookEventForm/BookEventForm";
import { eventsData2026 } from "../pages/eventsCalander/EventCalander";
import OPDBookingModal from "../pages/opdBooking/OPDBookingModal";

const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "90%", md: "760px", lg: "900px" },
  maxHeight: { xs: "92dvh", sm: "90vh" },
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  outline: "none",
};

const healers = [
  {
    id: 1,
    name: "Vaidya Santosh Suryawanshi",
    qualification: "MD Ayurveda",
    specialty: "Ayurveda",
    image: SantoshSuryavanshi,
    color: "#10b981",
  },
  {
    id: 2,
    name: "Vaidya Avanti Nitsure",
    qualification: "MD Ayurveda",
    specialty: "Ayurveda",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    color: "#10b981",
  },
  {
    id: 3,
    name: "Vaidya Smita Mehetre",
    qualification: "MD Ayurveda",
    specialty: "Ayurveda",
    image: SmitaMehetre,
    color: "#10b981",
  },
  {
    id: 4,
    name: "Vaidya Pradip Taware",
    qualification: "MD Ayurveda",
    specialty: "Ayurveda",
    image: PradipTaware,
    color: "#10b981",
  },
  {
    id: 5,
    name: "Vaidya Sandip Mehetre",
    qualification: "Ayurvedacharya",
    specialty: "Ayurveda",
    image: SandipMehetre,
    color: "#10b981",
  },
  {
    id: 6,
    name: "Dr. Manisha Suryawanshi",
    qualification: "MBBS, D.Y.ed",
    specialty: "Yoga Therapist",
    image: ManishaSuryawanshi,
    color: "#8b5cf6",
  },
  {
    id: 7,
    name: "Dr. Vaishali Holmukhe",
    qualification: "MD Homoeopath",
    specialty: "Homoeopathy",
    image: VaishaliHolmukhe,
    color: "#3b82f6",
  },
];

const partnersData = [
  {
    name: "Vaidya Pradip Taware",
    title: "MD Ayurveda",
    specialty: "Ayurveda",
    image: PradipTaware,
    roles: [
      "Partner, SwaGrama Ayurveda Yoga Nisarga Agro Tourism LLP",
      "Proprietor : Navjeevan Clinic",
      "Partner : Sparsh Speciality Hospital",
      "Partner : Gran Asia Life Sciences LLP",
      "Partner : Smart Unity Healthcare LLP",
    ],
  },
  {
    name: "Vaidya Sandip Mehetre",
    title: "BAMS",
    specialty: "Ayurveda",
    image: SandipMehetre,
    roles: [
      "Partner, SwaGrama Ayurveda Yoga Nisarga Agro Tourism LLP",
      "Proprietor : Mamata Clinic & Vishwai Chikitsalaya",
      "Partner : Gran Asia Life Sciences LLP",
      "Partner : Smart Unity Healthcare LLP",
    ],
  },
  {
    name: "Dr. Manisha Suryawanshi",
    title: "MBBS, D.Y ed. Yoga Therapiest",
    specialty: "Yoga Therapy",
    image: ManishaSuryawanshi,
    roles: [
      "Director: JnanaYogAyu Pvt. Ltd.",
      "Partner, SwaGrama Ayurveda Yoga Nisarga Agro Tourism LLP",
      "Proprietor : Mamata Clinic & Vishwai Chikitsalaya",
      "Partner : Smart Unity Healthcare LLP",
    ],
  },
];

const services = [
  {
    img: AgroWellness,
    title: "Agro & Wellness Tourism",
    text: "Rejuvenate in nature, embrace sustainable living.",
    icon: <Nature />,
  },
  {
    img: Ayurveda,
    title: "Ayurveda Services",
    text: "Ancient healing therapies for vitality.",
    icon: <Spa />,
  },
  {
    img: NaturalFarming,
    title: "Natural Farming",
    text: "Grow chemical-free sustainable crops.",
    icon: <LocalFlorist />,
  },
  {
    img: NaturalHabitat,
    title: "Natural Habitat",
    text: "Eco-friendly lifestyle for mind & soul.",
    icon: <WbSunny />,
  },
  {
    img: Swagurukul,
    title: "Swagurukul",
    text: "Learn timeless wisdom for conscious living.",
    icon: <Person />,
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const getIcon = (specialty) => {
  switch (specialty) {
    case "Ayurveda":
      return <Spa />;
    case "Yoga Therapist":
      return <Healing />;
    case "Homoeopathy":
      return <LocalHospital />;
    default:
      return <MedicalServices />;
  }
};

export default function AyurvedaLanding({ userData }) {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [openEventRegisterModal, setOpenRegisterModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState(null);
  const [openAppointementModal, setOpenAppointmentModal] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const navigate = useNavigate();
  const foundersRef = useRef(null);
  const healersRef = useRef(null);

  const isFoundersInView = useInView(foundersRef, {
    once: true,
    margin: "-100px",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const isHealersInView = useInView(healersRef, {
    once: true,
    margin: "-100px",
  });

  const parseDDMMYYYY = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return new Date(year, month - 1, day);
  };

  const getEventStartDate = (event) => {
    const dates = event.date.split("To").map((d) => d.trim());
    return parseDDMMYYYY(dates[0]);
  };

  const getNextTwoEvents = (events) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events
      .map((event) => ({
        ...event,
        startDate: getEventStartDate(event),
      }))
      .filter((event) => event.startDate >= today)
      .sort((a, b) => a.startDate - b.startDate)
      .slice(0, 4);
  };

  const upcommingEvent = useMemo(
    () => getNextTwoEvents(eventsData2026),
    [getNextTwoEvents],
  );

  const eventsDataUpdated = useMemo(() => {
    if (upcommingEvent.length > 0) {
      return [...upcommingEvent];
    }
    return upcommingEvent;
  }, [upcommingEvent]);

  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-br from-lime-50 via-green-50 to-amber-50">
      <motion.section
        className="relative min-h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={landigPageS1} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-green-900/70" />

        <div className="relative z-10 min-h-screen flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <motion.div
            className="flex-1 flex flex-col items-center justify-center text-center space-y-5 sm:space-y-8 max-w-5xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-amber-900/20 backdrop-blur-md border border-amber-700/30 rounded-full text-white font-medium text-xs sm:text-sm md:text-base shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Spa className="text-white" />
              Ancient Wisdom • Modern Healing
            </motion.div>

            <motion.h1
              className="text-2xl sm:text-3xl md:text-5xl  font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-200 via-green-300 to-emerald-200 leading-tight px-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Journey to Holistic Wellness
            </motion.h1>

            <motion.p
              className="text-sm sm:text-base md:text-xl lg:text-2xl text-white font-light max-w-3xl px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Experience the transformative power of Ayurveda and Natural
              Healing at Swagrama Wellness Center
            </motion.p>
          </motion.div>

          <motion.div
            className="pb-6 sm:pb-10 lg:pb-16 flex justify-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <motion.button
              className="px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base md:text-lg font-semibold text-white backdrop-blur-xl bg-gradient-to-r from-green-400/25 to-lime-400/25 border border-white/30 shadow-[0_8px_30px_rgba(34,197,94,0.35)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.55)] hover:from-green-400/35 hover:to-lime-400/35 transition-all duration-300"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (userData && userData !== null) {
                  setOpenAppointmentModal(true);
                } else {
                  errorAlert("Please login to proceed.");
                }
              }}
            >
              <Event className="inline mr-2" />
              Book Appointment
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <section className="py-12 sm:py-10  px-4 sm:px-6 lg:px-12 ">
        <motion.div
          className="max-w-7xl mx-auto text-center space-y-6 sm:space-y-5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl  font-bold text-green-900"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Healing Services
          </motion.h2>
          <p className="text-base sm:text-lg text-green-700 max-w-2xl mx-auto px-4">
            Traditional Ayurvedic Treatments For Modern Wellness
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mt-8">
            {services.map((item, i) => (
              <motion.div
                key={i}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="relative h-32 sm:h-40 bg-gradient-to-br from-green-100 to-lime-100 flex items-center justify-center overflow-hidden">
                  <motion.img
                    src={item.img}
                    className="h-24 sm:h-28 object-contain transition-transform duration-500"
                    alt={item.title}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                  <div className="absolute inset-0 bg-green-900/10 group-hover:bg-green-900/5 transition-all" />
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="text-base  font-semibold text-green-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs  text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-12 sm:py-10 px-4 sm:px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-lime-500 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="max-w-7xl mx-auto relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-green-900 mb-8 sm:mb-12"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Top Stories
            <motion.span
              className="block h-1 w-24 sm:w-32 bg-gradient-to-r from-green-600 to-lime-500 mt-2 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "12rem" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                img: SwagarmaMainImg,
                title: "स्वग्राम Community Self-Dependent Village Intro",
                text: "स्वग्राम Community is Ayurveda, Yoga, Nature, Agro, Tourism, Natural Lifestyle & Biodiversity hub. Ayurveda & Yoga Natural agriculture...",
                action: () => setModal1(true),
              },
              {
                img: StoryImg,
                title: "स्वग्राम Community Self-Dependent Village Pillars",
                text: "स्वग्राम Community is status of a complete science of life with solid philosophy & research-backed methodology...",
                action: () => setModal2(true),
              },
            ].map((story, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-green-100"
              >
                <div className="w-full h-[260px] overflow-hidden rounded-t-3xl">
                  <img
                    src={story.img}
                    alt={story.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <h4 className="text-lg sm:text-xl font-semibold text-green-900 mb-3">
                    {story.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-5">
                    {story.text}
                  </p>
                  <div className="flex justify-end">
                    <motion.button
                      onClick={story.action}
                      className="bg-gradient-to-r from-green-700 to-lime-600 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue Reading →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-12 sm:py-10 px-4 sm:px-6 lg:px-12 ">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-green-900 mb-8 sm:mb-12"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Upcoming Events
            <motion.span
              className="block h-1 w-24 sm:w-32 bg-gradient-to-r from-green-600 to-lime-500 mt-2 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "19rem" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4">
            {eventsDataUpdated.map((event, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-t-2xl border flex flex-col h-full w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex flex-col flex-1"
                    >
                      <div className="relative w-full h-[145px] bg-gradient-to-br from-lime-100 via-green-100 to-lime-50 rounded-t-xl border border-lime-200 flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.img
                            src={event.image}
                            className="h-36 w-full object-cover"
                            alt={event.title}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-lime-600 flex justify-center items-center to-green-700 px-2 text-center rounded-full">
                          <span className="text-[10px] font-bold text-white py-1">
                            {event?.month}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 px-2 pt-1 pb-3 gap-y-2">
                        <div className="bg-white/90 backdrop-blur-sm py-0.5 rounded-full flex justify-end">
                          <span className="text-[12px] font-bold text-lime-700">
                            Date : {event.date}
                          </span>
                        </div>

                        <div className="flex items-start gap-1.5">
                          <h3 className="text-[12px] md:text-xs font-bold text-stone-800 leading-tight flex-1">
                            {event.serviceName}
                          </h3>
                        </div>

                        <div className="flex items-start gap-1">
                          <svg
                            className="w-5 h-5 text-green-600 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-stone-600 text-[12px] leading-snug">
                            {event.description}
                          </p>
                        </div>

                        <div className="flex items-start gap-1">
                          <svg
                            className="w-5 h-5 text-green-700 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <p className="text-[12px] text-stone-600 leading-snug">
                            <span className="font-bold">Benefits :&nbsp;</span>
                            {event.benefits}
                          </p>
                        </div>

                        <div className="flex justify-between items-center w-full mt-auto pt-2">
                          <motion.button
                            className="border border-lime-600 flex items-center space-x-2 text-lime-600 px-4 sm:px-5 py-1.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              navigate("/calendar", { state: event })
                            }
                          >
                            <ReadMoreIcon /> <span>Events</span>
                          </motion.button>

                          <motion.button
                            className="bg-gradient-to-r from-green-700 to-lime-600 text-white px-4 sm:px-5 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setOpenRegisterModal(true);
                              setSelectedEvents(event);
                            }}
                          >
                            Book Event
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-5 px-12  ">
        <div className="w-full mx-auto">
          <motion.div
            ref={foundersRef}
            variants={staggerContainer}
            initial="hidden"
            animate={isFoundersInView ? "visible" : "hidden"}
            className="text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="text-[#C65A3A] tracking-[0.2em] uppercase text-sm font-medium"
            >
              Our Mentor & Founder
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl text-[#111827] mt-4 mb-6"
            >
              Leading with Wisdom
            </motion.h2>
            <motion.div
              variants={scaleIn}
              className="grid justify-center mx-auto mt-12"
            >
              <div className="relative bg-gradient-to-tr from-green-100 via-lime-100 to-emerald-100 rounded-3xl p-8 md:p-12 shadow-elevated overflow-hidden border">
                <div className="absolute top-0 right-0 w-64 h-64 bg-forest/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative flex flex-col md:flex-row items-center gap-8">
                  <motion.div whileHover={{ scale: 1.05 }} className="relative">
                    <img
                      src={SantoshSuryavanshi}
                      alt="Vaidya Santosh Suryawanshi"
                      className="w-48 h-48 rounded-2xl object-cover object-top shadow-soft"
                    />
                    <div
                      className="  absolute -bottom-4 right-10
                        px-4 py-2 rounded-lg
                        text-sm  text-ayuMid font-semibold
                        backdrop-blur-xl
                        bg-gradient-to-r from-green-400/25 to-lime-400/25
                        border border-white/30
                        shadow-[0_6px_20px_rgba(34,197,94,0.45)]"
                    >
                      MD Ayurveda
                    </div>
                  </motion.div>
                  <div className="text-center md:text-left flex-1">
                    <h3 className="font-serif text-2xl text-[#111827] mb-2">
                      Vaidya Santosh Suryawanshi
                    </h3>
                    <p className="text-[#C65A3A] font-medium mb-4">
                      Mentor & Guiding Force
                    </p>
                    <div className="space-y-2 text-[#6B7280]">
                      <div className="flex items-start gap-2">
                        <span className="mt-2 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0"></span>
                        <span>CEO & Promotor : JnanaYogAyu Pvt. Ltd.</span>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="mt-2 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0"></span>
                        <span>
                          Partner: SwaGrama Ayurveda Yoga Nisarga Agro Tourism
                          LLP
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <span className="mt-2 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0"></span>
                        <span>Proprietor : Ayurvijnana Chikitsalaya</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-2 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0"></span>
                        <span>Partner : Smart Unity Healthcare LLP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={healersRef} className="pb-5 px-4 md:px-12 xl:px-20 ">
        <div className="w-full mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isHealersInView ? "visible" : "hidden"}
            className="text-center mb-5 pt-5"
          >
            <motion.span
              variants={fadeInUp}
              className="text-[#C65A3A] tracking-[0.2em] uppercase text-sm font-medium"
            >
              Our Founders &
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl text-[#111827] mt-4 mb-6"
            >
              Pillars of SwaGrama
            </motion.h2>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-7xl mx-auto"
          >
            {partnersData.map((healer, index) => (
              <motion.div
                variants={scaleIn}
                className="grid justify-center mx-auto mt-4"
              >
                <div className="relative bg-gradient-to-tr from-green-100 via-lime-100 to-emerald-100 rounded-3xl p-2 md:p-4 shadow-elevated overflow-hidden border">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-forest/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative flex flex-col  items-center gap-2">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      <img
                        src={healer.image}
                        alt="Vaidya Santosh Suryawanshi"
                        className="w-40 h-40 rounded-2xl object-cover object-top shadow-soft"
                      />
                      <div
                        className="whitespace-nowrap absolute -bottom-4 left-1/2 -translate-x-1/2
                                  px-4 py-2 rounded-lg
                                  text-sm text-ayuMid font-semibold
                                  backdrop-blur-xl
                                  bg-gradient-to-r from-green-400/25 to-lime-400/25
                                  border border-white/30
                                  shadow-[0_6px_20px_rgba(34,197,94,0.45)]"
                      >
                        {healer.specialty}
                      </div>
                    </motion.div>
                    <h3 className="font-serif text-2xl text-[#111827] mt-2">
                      {healer.name}
                    </h3>
                    <div className="text-center md:text-left flex-1">
                      <div className="space-y-2 pt-2">
                        {healer.roles.map((role, roleIndex) => (
                          <motion.div
                            key={roleIndex}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{
                              x: 0,
                              opacity: 1,
                            }}
                            transition={{ delay: roleIndex * 0.1 }}
                            className="flex items-start gap-2 text-xs text-gray-600 bg-green-50 p-2 rounded-lg"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#1E8E7A] mt-1.5 flex-shrink-0" />
                            <span className="leading-relaxed">{role}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="min-h-screen py-5 px-4 sm:px-6 lg:px-8">
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-4"
            >
              <MedicalServices className="text-white" sx={{ fontSize: 32 }} />
            </motion.div>

            <h1 className="font-bold text-gray-800 text-3xl">
              Our Community Healers
            </h1>

            <p className="text-[#6B7280] mt-2 max-w-2xl mx-auto text-base text-center">
              Dedicated practitioners bringing together Ayurveda, Yoga,
              Homoeopathy & Modern Medicine
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {healers.map((healer) => (
              <motion.div
                key={healer.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                onHoverStart={() => setHoveredId(healer.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <Card
                  className="h-full overflow-hidden border"
                  sx={{
                    borderRadius: 3,
                    boxShadow:
                      hoveredId === healer.id
                        ? "0 20px 40px rgba(0,0,0,0.15)"
                        : "0 4px 12px rgba(0,0,0,0.08)",
                    transition: "box-shadow 0.3s ease",
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                    border: "1px solid brown",
                  }}
                >
                  <div className="relative">
                    <div className="relative h-56 2xl:h-72">
                      <motion.img
                        src={healer.image}
                        alt={healer.name}
                        className="w-full h-full object-cover object-top"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-1 right-1 z-10"
                      >
                        <div
                          className="bg-gradient-to-br from-green-500/40 to-lime-400/20 backdrop-blur-lg border border-white/20 rounded-3xl
                        text-xs  px-2 py-1 text-ayuDark font-semibold
                        shadow-2xl"
                        >
                          {healer.qualification}
                        </div>
                      </motion.div>

                      <div className="relative w-full">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4, type: "spring" }}
                          className="absolute -bottom-8 left-0 right-0 z-10 flex justify-center"
                        >
                          <Avatar
                            sx={{
                              width: 64,
                              height: 64,
                              border: "4px solid white",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                              background: `linear-gradient(135deg, ${healer.color} 0%, ${healer.color}dd 100%)`,
                            }}
                          >
                            {getIcon(healer.specialty)}
                          </Avatar>
                        </motion.div>
                      </div>
                    </div>

                    <div className="mt-10 pb-6 px-6 text-center">
                      <p
                        variant="h6"
                        component="h3"
                        className="font-bold text-gray-800 mb-2 whitespace-nowrap"
                        sx={{ fontSize: "1rem", fontWeight: 700 }}
                      >
                        {healer.name}
                      </p>

                      <p
                        variant="body2"
                        className="text-gray-600 font-medium"
                        sx={{ fontSize: "0.9rem" }}
                      >
                        {healer.specialty}
                      </p>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: hoveredId === healer.id ? "60px" : "40px",
                        }}
                        transition={{ duration: 0.3 }}
                        className="mx-auto mt-4 h-1 rounded-full"
                        style={{ backgroundColor: healer.color }}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </div>

      {modal1 && (
        <AnimatePresence>
          <Modal
            open={modal1}
            slotProps={{
              backdrop: {
                sx: {
                  backgroundColor: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(4px)",
                },
              },
            }}
          >
            <Box sx={modalBoxStyle}>
              <Box
                sx={{
                  background: "linear-gradient(to right, #15803d, #65a30d)",
                  px: { xs: 2 },
                  py: { xs: 2 },
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex items-center gap-2 ">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="white"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    }}
                  >
                    स्वग्राम Community Self-Dependent Village Intro
                  </Typography>
                  <CancelButtonModal onClick={() => setModal1(false)} />
                </div>
              </Box>
              <Box
                sx={{
                  px: { xs: 2, sm: 3, md: 4 },
                  py: { xs: 2.5, sm: 3 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                  color: "text.secondary",
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={500}
                  sx={{
                    color: "#14532d",
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                    lineHeight: 1.75,
                  }}
                >
                  <strong>Swagram Community</strong> is a hub dedicated to&nbsp;
                  <strong>
                    Ayurveda, Yoga, Nature, Agro-tourism, Natural Living, and
                    Biodiversity.
                  </strong>
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                    lineHeight: 1.75,
                  }}
                >
                  Rooted in ancient wisdom, Ayurveda, Yoga, and Natural
                  Agriculture together represent one of the world’s earliest and
                  most holistic approaches to a natural lifestyle. This
                  integrated knowledge system promotes healthy living,
                  environmental balance, and the potential for a long and
                  fulfilling life.
                </Typography>
                <Box
                  sx={{
                    borderLeft: "4px solid #15803d",
                    bgcolor: "#f7fee7",
                    borderRadius: 2,
                    px: { xs: 2, sm: 2.5 },
                    py: 2,
                    fontStyle: "italic",
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                    lineHeight: 1.75,
                    color: "text.primary",
                  }}
                >
                  Developed and refined over more than{" "}
                  <strong>5,000 years</strong>, it combines traditional wisdom
                  with applied science and practical techniques that can be
                  integrated into everyday life. It also includes natural
                  healing practices that support well-being while maintaining
                  harmony with nature.
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                    lineHeight: 1.75,
                  }}
                >
                  Swagram seeks to preserve and promote this timeless knowledge
                  by making it accessible, practical, and relevant for modern
                  living.
                </Typography>
              </Box>
            </Box>
          </Modal>
        </AnimatePresence>
      )}

      {modal2 && (
        <AnimatePresence>
          <Modal
            open={modal2}
            slotProps={{
              backdrop: {
                sx: {
                  backgroundColor: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(4px)",
                },
              },
            }}
          >
            <Box sx={modalBoxStyle}>
              <Box
                sx={{
                  background: "linear-gradient(to right, #15803d, #65a30d)",
                  px: { xs: 2 },
                  py: { xs: 2 },
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div className="flex items-center gap-2 ">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="white"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    }}
                  >
                    स्वग्राम — Community Self-Dependent Village Pillars
                  </Typography>
                  <CancelButtonModal onClick={() => setModal2(false)} />
                </div>
              </Box>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 40 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="overflow-y-auto flex-1 px-3 sm:px-5 py-4 flex flex-col gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="bg-gradient-to-r from-green-50 to-lime-50 border border-green-200 rounded-xl px-4 py-3"
                  >
                    <Typography
                      variant="body2"
                      className="!text-green-900 !text-xs sm:!text-sm !leading-relaxed"
                    >
                      <span className="font-bold">Swagram Community</span>{" "}
                      represents an integrated{" "}
                      <span className="font-bold">science of life</span>,
                      combining traditional wisdom with practical systems to
                      create a sustainable and self-reliant village ecosystem.
                      Its vision is to{" "}
                      <span className="font-bold">prevent</span>,{" "}
                      <span className="font-bold">care</span>, and{" "}
                      <span className="font-bold">cure</span>, while preserving
                      biodiversity and ensuring the well-being of society.
                    </Typography>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.38,
                      delay: 0.1,
                      ease: "easeOut",
                    }}
                    className="rounded-xl border border-emerald-200 bg-emerald-50 overflow-hidden"
                  >
                    <div className="flex flex-row">
                      <div className="bg-gradient-to-b from-emerald-600 to-green-500 flex flex-col items-center justify-center gap-2 px-3 py-4 min-w-[56px] sm:min-w-[68px]">
                        <SchoolIcon className="!text-white !text-xl sm:!text-2xl" />
                        <span className="text-white font-black text-[10px] sm:text-xs tracking-widest opacity-80 font-mono">
                          01
                        </span>
                      </div>
                      <div className="flex-1 px-3 sm:px-4 py-3">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <Typography
                            variant="subtitle2"
                            className="!text-green-900 !font-bold !text-xs sm:!text-sm !leading-tight"
                          >
                            Swagurukul Commune
                          </Typography>
                          <Chip
                            label="Holistic Living & Knowledge"
                            size="small"
                            className="!text-[10px] sm:!text-xs !h-5 !font-medium !bg-emerald-100 !text-emerald-800 !border-0"
                          />
                        </div>
                        <div className="mb-2 bg-white/70 border border-emerald-200 rounded-lg px-3 py-2">
                          <Typography
                            variant="caption"
                            className="!text-emerald-800 !font-semibold !italic !block !text-xs sm:!text-sm"
                          >
                            "स्वस्थस्य स्वास्थ्य रक्षणम् — रक्षणम्"
                          </Typography>
                          <Typography
                            variant="caption"
                            className="!text-emerald-700 !text-[10px] sm:!text-xs !mt-0.5 !block"
                          >
                            Protecting and strengthening the health of the
                            healthy.
                          </Typography>
                        </div>
                        <Typography
                          variant="body2"
                          className="!text-green-800 !text-xs sm:!text-sm !leading-relaxed"
                        >
                          This pillar promotes a well-consecrated lifestyle{" "}
                          <span className="font-semibold">
                            (सुसंस्कृतिजीवनविधान)
                          </span>{" "}
                          through traditional knowledge, ethical living, and
                          natural lifestyle practices that nurture balanced and
                          conscious communities.
                        </Typography>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.38,
                      delay: 0.17,
                      ease: "easeOut",
                    }}
                    className="rounded-xl border border-lime-200 bg-lime-50 overflow-hidden"
                  >
                    <div className="flex flex-row">
                      <div className="bg-gradient-to-b from-lime-600 to-green-500 flex flex-col items-center justify-center gap-2 px-3 py-4 min-w-[56px] sm:min-w-[68px]">
                        <AgricultureIcon className="!text-white !text-xl sm:!text-2xl" />
                        <span className="text-white font-black text-[10px] sm:text-xs tracking-widest opacity-80 font-mono">
                          02
                        </span>
                      </div>
                      <div className="flex-1 px-3 sm:px-4 py-3">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <Typography
                            variant="subtitle2"
                            className="!text-green-900 !font-bold !text-xs sm:!text-sm !leading-tight"
                          >
                            Natural Agriculture & Local Economy
                          </Typography>
                          <Chip
                            label="Biodiversity & Self-Reliance"
                            size="small"
                            className="!text-[10px] sm:!text-xs !h-5 !font-medium !bg-lime-100 !text-lime-800 !border-0"
                          />
                        </div>
                        <Typography
                          variant="body2"
                          className="!text-green-800 !text-xs sm:!text-sm !leading-relaxed"
                        >
                          Swagram promotes natural farming and
                          biodiversity-based agriculture as the foundation of
                          self-reliance. This includes indigenous crops, herbal
                          cultivation, and community exchange systems such as
                          barter{" "}
                          <span className="font-semibold">(सुविनिमय)</span> to
                          support local livelihoods and sustainable food
                          systems.
                        </Typography>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.38,
                      delay: 0.24,
                      ease: "easeOut",
                    }}
                    className="rounded-xl border border-teal-200 bg-teal-50 overflow-hidden"
                  >
                    <div className="flex flex-row">
                      <div className="bg-gradient-to-b from-teal-600 to-emerald-500 flex flex-col items-center justify-center gap-2 px-3 py-4 min-w-[56px] sm:min-w-[68px]">
                        <LocalHospitalIcon className="!text-white !text-xl sm:!text-2xl" />
                        <span className="text-white font-black text-[10px] sm:text-xs tracking-widest opacity-80 font-mono">
                          03
                        </span>
                      </div>
                      <div className="flex-1 px-3 sm:px-4 py-3">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <Typography
                            variant="subtitle2"
                            className="!text-green-900 !font-bold !text-xs sm:!text-sm !leading-tight"
                          >
                            Integrated Natural Healthcare
                          </Typography>
                          <Chip
                            label="Swa Aturalaya System"
                            size="small"
                            className="!text-[10px] sm:!text-xs !h-5 !font-medium !bg-teal-100 !text-teal-800 !border-0"
                          />
                        </div>
                        <Typography
                          variant="body2"
                          className="!text-green-800 !text-xs sm:!text-sm !leading-relaxed mb-2"
                        >
                          The Swa Aturalaya healthcare system focuses on
                          preventive and holistic healing through:
                        </Typography>
                        <div className="flex flex-col gap-1 mb-2 pl-1">
                          {["Ayurveda", "Yoga", "Nature-based therapies"].map(
                            (item) => (
                              <div
                                key={item}
                                className="flex items-center gap-2"
                              >
                                <FiberManualRecordIcon className="!text-teal-600 !text-[8px]" />
                                <Typography
                                  variant="body2"
                                  className="!text-green-800 !text-xs sm:!text-sm !font-medium"
                                >
                                  {item}
                                </Typography>
                              </div>
                            ),
                          )}
                        </div>
                        <Typography
                          variant="body2"
                          className="!text-green-800 !text-xs sm:!text-sm !leading-relaxed"
                        >
                          When required, Allopathy and Homoeopathy are also
                          integrated for comprehensive care.
                        </Typography>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {[
                            "Ayurveda",
                            "Yoga",
                            "Nature Therapy",
                            "Allopathy",
                            "Homoeopathy",
                          ].map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              className="!text-[10px] !h-5 !font-medium !bg-teal-100 !text-teal-800 !border-0"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.38,
                      delay: 0.31,
                      ease: "easeOut",
                    }}
                    className="rounded-xl border border-green-200 bg-green-50 overflow-hidden"
                  >
                    <div className="flex flex-row">
                      <div className="bg-gradient-to-b from-green-700 to-teal-500 flex flex-col items-center justify-center gap-2 px-3 py-4 min-w-[56px] sm:min-w-[68px]">
                        <ParkIcon className="!text-white !text-xl sm:!text-2xl" />
                        <span className="text-white font-black text-[10px] sm:text-xs tracking-widest opacity-80 font-mono">
                          04
                        </span>
                      </div>
                      <div className="flex-1 px-3 sm:px-4 py-3">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <Typography
                            variant="subtitle2"
                            className="!text-green-900 !font-bold !text-xs sm:!text-sm !leading-tight"
                          >
                            Biodiversity & Environmental Balance
                          </Typography>
                          <Chip
                            label="Ecosystem & Heritage Protection"
                            size="small"
                            className="!text-[10px] sm:!text-xs !h-5 !font-medium !bg-green-100 !text-green-800 !border-0"
                          />
                        </div>
                        <Typography
                          variant="body2"
                          className="!text-green-800 !text-xs sm:!text-sm !leading-relaxed"
                        >
                          Swagram works to protect medicinal plants, local
                          crops, and natural ecosystems, supporting India's rich
                          biodiversity and promoting sustainable agro-tourism
                          and herbal heritage.
                        </Typography>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.38,
                      delay: 0.38,
                      ease: "easeOut",
                    }}
                    className="rounded-xl border border-lime-200 bg-lime-50 overflow-hidden"
                  >
                    <div className="flex flex-row">
                      <div className="bg-gradient-to-b from-lime-700 to-emerald-500 flex flex-col items-center justify-center gap-2 px-3 py-4 min-w-[56px] sm:min-w-[68px]">
                        <ScienceIcon className="!text-white !text-xl sm:!text-2xl" />
                        <span className="text-white font-black text-[10px] sm:text-xs tracking-widest opacity-80 font-mono">
                          05
                        </span>
                      </div>
                      <div className="flex-1 px-3 sm:px-4 py-3">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <Typography
                            variant="subtitle2"
                            className="!text-green-900 !font-bold !text-xs sm:!text-sm !leading-tight"
                          >
                            Research, Innovation & Community Development
                          </Typography>
                          <Chip
                            label="Knowledge Exchange & Enterprise"
                            size="small"
                            className="!text-[10px] sm:!text-xs !h-5 !font-medium !bg-lime-100 !text-lime-800 !border-0"
                          />
                        </div>
                        <Typography
                          variant="body2"
                          className="!text-green-800 !text-xs sm:!text-sm !leading-relaxed"
                        >
                          Swagram encourages research, knowledge exchange, and
                          community-based enterprise to strengthen traditional
                          systems like Ayurveda, Yoga, and Natural Agriculture
                          for global health and sustainability.
                        </Typography>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="bg-gradient-to-r from-green-800 to-lime-700 rounded-xl px-4 py-4"
                  >
                    <Typography
                      variant="overline"
                      className="!text-white/80 !font-bold !text-[10px] sm:!text-xs !tracking-widest !block !text-center !mb-3"
                    >
                      Foundational Philosophy
                    </Typography>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
                      {[
                        {
                          icon: (
                            <SelfImprovementIcon className="!text-white !text-xl sm:!text-2xl" />
                          ),
                          label: "Yoga",
                          desc: "Purifies the mind",
                        },
                        {
                          icon: (
                            <MenuBookIcon className="!text-white !text-xl sm:!text-2xl" />
                          ),
                          label: "Sanskrit",
                          desc: "Refines knowledge and expression",
                        },
                        {
                          icon: (
                            <SpaIcon className="!text-white !text-xl sm:!text-2xl" />
                          ),
                          label: "Ayurveda",
                          desc: "Heals and balances the body",
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, scale: 0.88 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.6 + i * 0.07,
                          }}
                          className="bg-white/15 border border-white/20 rounded-lg px-2 py-3 flex flex-col items-center gap-1 text-center"
                        >
                          {item.icon}
                          <Typography
                            variant="caption"
                            className="!text-white !font-bold !text-[11px] sm:!text-xs !leading-tight"
                          >
                            {item.label}
                          </Typography>
                          <Typography
                            variant="caption"
                            className="!text-green-100 !text-[9px] sm:!text-[10px] !leading-snug"
                          >
                            {item.desc}
                          </Typography>
                        </motion.div>
                      ))}
                    </div>

                    <Divider className="!border-white/20 !mb-3" />

                    <Typography
                      variant="caption"
                      className="!text-green-100 !text-[10px] sm:!text-xs !text-center !block !italic !leading-relaxed"
                    >
                      Together, they guide a natural, balanced, and sustainable
                      way of life.
                    </Typography>
                  </motion.div>
                </div>
              </motion.div>
            </Box>
          </Modal>
        </AnimatePresence>
      )}

      {openEventRegisterModal && (
        <BookEventForm
          open={openEventRegisterModal}
          handleClose={() => setOpenRegisterModal(false)}
          selectedEvents={selectedEvents}
          setSelectedEvents={setSelectedEvents}
        />
      )}
      {openAppointementModal && (
        <OPDBookingModal
          open={openAppointementModal}
          handleClose={() => setOpenAppointmentModal(false)}
        />
      )}
    </div>
  );
}
