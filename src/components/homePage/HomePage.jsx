import {
  Cancel,
  Event,
  Healing,
  LocalFlorist,
  LocalHospital,
  MedicalServices,
  Nature,
  Person,
  Schedule,
  Spa,
  WbSunny,
} from "@mui/icons-material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { Avatar, Card, Container } from "@mui/material";
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
import selfWila from "../assets/landing-page/self-wila.png";
import SwagarmaMainImg from "../assets/landing-page/swagramaMain.jpg";

import Connecting from "../assets/landing-page/topStories/Connecting.svg";
import Empowering from "../assets/landing-page/topStories/Empowering.svg";
import StoryImg from "../assets/landing-page/topStories/Story-2.png";
import { errorAlert } from "../common/toast/CustomToast";
import BookEventForm from "../pages/bookEventForm/BookEventForm";
import { eventsData2026 } from "../pages/eventsCalander/EventCalander";
import OPDBookingModal from "../pages/opdBooking/OPDBookingModal";

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

const eventsArray = [
  {
    img: Empowering,
    title: "Empowering Wellness",
    text: "Begin your journey to holistic healing with personalized Ayurvedic treatments. Book your consultation and restore balance naturally.",
    btn: "Book An Appointment",
    icon: <Schedule />,
  },
  {
    img: Connecting,
    title: "Connecting Experts Across The Globe",
    text: "Gain insights from top wellness and Ayurveda experts worldwide. Join hands with specialists and explore transformative healing solutions.",
    btn: "Sign Up",
    icon: <Person />,
  },
  {
    img: null,
    title: "Coming Soon",
    text: "Stay tuned for exciting new events and workshops...",
    btn: null,
    icon: <Event />,
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

export default function AyurvedaLanding() {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [openEventRegisterModal, setOpenRegisterModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState(null);
  const [openAppointementModal, setOpenAppointmentModal] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const userData = JSON.parse(localStorage.getItem("user"));

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
      .slice(0, 2);
  };

  const upcommingEvent = useMemo(
    () => getNextTwoEvents(eventsData2026),
    [getNextTwoEvents],
  );

  const eventsDataUpdated = useMemo(() => {
    if (upcommingEvent.length > 0) {
      return [...eventsArray.slice(0, 2), ...upcommingEvent];
    }
    return eventsArray;
  }, [upcommingEvent]);

  console.log("userData", new Date());

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
              Experience the transformative power of Ayurveda and natural
              healing at Swagrama Wellness Center
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
                if (userData !== null) {
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
            Traditional Ayurvedic treatments for modern wellness
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
                title: "स्वग्राम Community Self-Dependence Village Intro",
                text: "स्वग्राम Community is Ayurveda, Yoga, Nature, Agro, Tourism, Natural Lifestyle & Biodiversity hub. Ayurveda & Yoga Natural agriculture...",
                action: () => setModal1(true),
              },
              {
                img: StoryImg,
                title: "स्वग्राम Community Self-Dependence Village Pillars",
                text: "स्वग्राम Community is status of a complete science of life with solid philosophy & research-backed methodology...",
                action: () => setModal2(true),
              },
            ].map((story, idx) => (
              <motion.div
                key={idx}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-green-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <motion.img
                    src={story.img}
                    className="w-full h-full object-center bg-top"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    alt={story.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
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

          <div
            className={
              eventsDataUpdated?.length > 3
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4"
            }
          >
            {eventsDataUpdated.map((event, i) => (
              <motion.div
                key={i}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                  !event.img
                    ? "flex items-center justify-center min-h-[300px] sm:min-h-[250px]"
                    : ""
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                {event.img ? (
                  <>
                    <div className="flex justify-center items-center py-6 bg-gradient-to-br from-lime-100 to-green-100">
                      <div className="relative">
                        <motion.img
                          src={event.img}
                          className="h-20 sm:h-24 w-20 sm:w-24 rounded-full object-cover shadow-lg ring-4 ring-white"
                          alt={event.title}
                          // whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-2 rounded-full">
                          {event.icon}
                        </div>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h5 className="font-semibold text-green-900 text-center mb-3 text-sm sm:text-base">
                        {event.title}
                      </h5>
                      <p className="text-xs  text-gray-600 text-start leading-relaxed mb-5">
                        {event.text}
                      </p>
                      {event.btn && (
                        <div className="flex justify-center">
                          <motion.button
                            className="bg-gradient-to-r from-green-700 to-lime-600 text-white px-4 sm:px-5 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              if (event.title === "Empowering Wellness") {
                                setOpenAppointmentModal(true);
                              }
                            }}
                          >
                            {event.btn}
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="bg-white/80 backdrop-blur-sm rounded-t-2xl  h-full w-full  overflow-y-auto">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-2"
                      >
                        <div className="relative w-full h-[145px] bg-gradient-to-br from-lime-100 via-green-100 to-lime-50 rounded-t-xl  border border-lime-200">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                              className="w-14 h-14 text-lime-600/30"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                            </svg>
                          </div>
                          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
                            <span className="text-[12px] font-bold text-lime-700">
                              {event.date}
                            </span>
                          </div>
                          <div className="absolute top-2 right-2 bg-gradient-to-r from-lime-600 flex justify-center items-center to-green-700 px-2 text-center rounded-full">
                            <span className="text-[10px] font-bold text-white py-1">
                              {event?.month}
                            </span>
                          </div>
                        </div>

                        <div key={i} className="grid gap-y-3 px-2 py-5 w-full">
                          <div className="flex items-start gap-1.5 mb-1.5">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-lime-600 to-green-700 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-[10px] font-bold">
                                {i - 2 + 1}
                              </span>
                            </div>
                            <h3 className="text-[12px] md:text-xs font-bold text-stone-800 leading-tight flex-1">
                              {event.serviceName}
                            </h3>
                          </div>

                          <div className="flex items-start gap-1 mb-1.5 ">
                            <svg
                              className="w-5 h-5 text-green-600  flex-shrink-0"
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
                          <div className="flex items-start gap-1 mb-1.5 ">
                            <svg
                              className="w-5 h-5 text-green-700  flex-shrink-0"
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
                              <span className="font-bold">
                                Benefits :&nbsp;
                              </span>
                              {event.benefits}
                            </p>
                          </div>

                          <div className="flex justify-between items-center w-full">
                            <div>
                              <motion.button
                                className="border border-lime-600 flex items-center space-x-2 text-lime-600 px-4 sm:px-5 py-1.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  navigate("/calendar", { state: event });
                                }}
                              >
                                <ReadMoreIcon /> <span>Events</span>
                              </motion.button>
                            </div>
                            <div
                              onClick={() => {
                                setOpenRegisterModal(true);
                                setSelectedEvents(event);
                              }}
                            >
                              <motion.button
                                className="bg-gradient-to-r from-green-700 to-lime-600 text-white px-4 sm:px-5 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Book Event
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
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

                      {/* Qualification Badge - Top Right */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-3 right-3 z-10"
                      >
                        <div
                          className="px-3 py-1.5 rounded-full text-xs font-semibold text-white backdrop-blur-sm shadow-lg"
                          style={{
                            backgroundColor: `${healer.color}dd`,
                            border: `1px solid ${healer.color}`,
                          }}
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

      <AnimatePresence>
        {modal1 && (
          <motion.div
            className="
        fixed inset-0 z-50 flex items-center justify-center
        px-3 sm:px-4
        bg-black/60 backdrop-blur-sm
      "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal1(false)}
          >
            <motion.div
              className="
          bg-white rounded-2xl w-full
          max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl
          max-h-[92dvh] sm:max-h-[90vh]
          overflow-y-auto shadow-2xl
        "
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="
          bg-gradient-to-r from-green-700 to-lime-600
          px-4 sm:px-6 py-4 sm:py-5
          text-white relative sticky top-0 z-10
        "
              >
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                  स्वग्राम Community
                </h2>
                <p className="text-xs sm:text-sm opacity-90 mt-1">
                  Natural Lifestyle & Self-Dependent Village
                </p>
                <motion.button
                  onClick={() => setModal1(false)}
                  className="
              absolute right-3 top-3 sm:right-4 sm:top-4
              bg-red-500 text-white
              w-9 h-9 sm:w-8 sm:h-8
              flex items-center justify-center
              rounded-full hover:bg-red-600 transition-all
            "
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Cancel fontSize="small" />
                </motion.button>
              </div>

              <div
                className="
          p-4 sm:p-6 sm:p-8
          space-y-5
          text-gray-700
          leading-relaxed
        "
              >
                <p className="text-sm sm:text-base font-medium text-green-900">
                  "स्वग्राम Community is Ayurveda, Yoga, Nature, Agro, Tourism,
                  Natural Lifestyle & Biodiversity hub." Ayurveda, Yoga &
                  Natural Agriculture is the first Natural Lifestyle practically
                  applied knowledge in the world to live 100 years includes
                  natural medical system to diseased one along with
                  environmental balance. Working continuously with changes for
                  more than 5000 years ago. It is a knowledge of life contains
                  applied Science & Technology which is regularly used in daily
                  work-Activity.
                </p>

                <p className="text-sm sm:text-base">
                  Ultimately it Played in the Artistic way to Celebrate each &
                  every moment of life.
                </p>

                <div
                  className="
            border-l-4 border-green-700
            bg-lime-50 rounded-xl
            px-4 sm:px-5 py-4
            italic text-sm sm:text-base
          "
                >
                  "Ayurveda, Yoga & Natural Agriculture is an Evolution of
                  ज्ञानKnowledge, शास्त्रScience, तंत्रTechnology,
                  कर्मActivity-Work, क्रीडाPlay, कलाArt, उत्सवCeremony.
                  Evolution of 7 Steps or ways of Life means सप्तपदी7Steps. All
                  natives have such 7 steps to complete way of Life. It's a
                  systematic working methodology called as
                  सुविनिमयBarterSystem."
                </div>

                <p className="text-sm sm:text-base">
                  This is a pure trading system stand on strong pillar of
                  वर्षिष्ठकृषिसंस्कृतिUppermostAgriCulture means Natural
                  Agriculture is not a business or job. It's purely inequality
                  less huge diversity of living organism strongly stand on
                  equality, brotherhood & independence. Barter System depends on
                  12बलुतेदारDisciplinary which is nothing but a द्रव्यGoods,
                  यंत्रInstruments & सेवाService Providers. All these come
                  together to build complete & Self-dependent Commune called
                  स्वग्रामCommunity_Self-Dependent Village. Simply It's a
                  journey of life creates पर्यटनTourism of
                  नैसर्गविधानNaturalLifestyle.
                </p>

                <p className="text-sm sm:text-base">
                  "Our शरीरमनात्मBodyMindSoul is naturally evolved with natural
                  habituate. Our Natural Lifestyle means grow & eat food in
                  natural style. Stay, activity & work in natural places with
                  natural style. Treat ourselves with natural ways. Always
                  behave naturally."
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {[
                    "Certified Therapists",
                    "In-depth Consultations",
                    "24/7 Assistance",
                    "Customized Solutions",
                  ].map((t, i) => (
                    <motion.div
                      key={i}
                      className="
                  flex items-center gap-3
                  p-3 border rounded-xl
                  shadow-sm bg-white
                  text-sm sm:text-base
                "
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span>⭐</span>
                      <span>{t}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modal2 && (
          <motion.div
            className="
        fixed inset-0 z-50 flex items-center justify-center
        px-3 sm:px-4
        bg-black/60 backdrop-blur-sm
      "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal2(false)}
          >
            <motion.div
              className="
          bg-white rounded-2xl w-full
          max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl
          max-h-[92dvh] sm:max-h-[90vh]
          overflow-y-auto shadow-2xl
        "
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="
          bg-gradient-to-r from-green-700 to-lime-600
          px-4 sm:px-6 py-4 sm:py-5
          text-white relative sticky top-0 z-10
        "
              >
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                  स्वग्राम Community
                </h2>
                <p className="text-xs sm:text-sm opacity-90 mt-1">
                  Natural Lifestyle & Self-Dependent Pillars
                </p>
                <motion.button
                  onClick={() => setModal2(false)}
                  className="
              absolute right-3 top-3 sm:right-4 sm:top-4
              bg-red-500 text-white
              w-9 h-9 sm:w-8 sm:h-8
              flex items-center justify-center
              rounded-full hover:bg-red-600 transition-all
            "
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Cancel fontSize="small" />
                </motion.button>
              </div>

              <div
                className="
          p-4 sm:p-6 md:p-8
          space-y-5
          leading-relaxed
          text-gray-700
          text-sm sm:text-base
        "
              >
                <section>
                  <p className="font-medium text-green-900">
                    स्वग्राम Community is status of a complete science of life.
                    It has strong philosophical foundations, unquestionable
                    scientific veracity, everlasting practical methodology and
                    eternally vibrant innovativeness for modifications into
                    allied health care systems. All these proven track record of
                    success through the ages.
                  </p>
                  <p className="mt-3">
                    Destination of स्वग्राम Community is to prevent – to care –
                    to cure. To maintain well being of whole society includes
                    biodiversity.
                  </p>
                </section>

                <section
                  className="
            border-l-4 border-green-700
            bg-lime-50 p-4
            font-semibold rounded-xl
            text-sm sm:text-base
          "
                >
                  स्वगुरुकुल Commune_InnocenceOfLife: "स्वस्थस्य स्वास्थ्य
                  रक्षणम्" Protect, preserve, enhance strengthen & improve
                  health of healthy one with सुसंस्कृतिजीवनविधान Well Consecrate
                  Life Style
                </section>

                <section>
                  <ul className="list-disc space-y-2 ml-4 text-sm sm:text-base">
                    <li>
                      is वर्षिष्ठकृषिसंस्कृति Uppermost AgriCulture + सुविनिमय
                      Barter System + नैसर्गविधान Natural LifeStyle.
                    </li>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:gap-1">
                      <li className="">
                        <span className="font-semibold whitespace-nowrap">
                          स्वआतुरालय Hospital IPD :
                        </span>
                      </li>
                      <span>
                        Treat, Cure, Care diseases through आयुर्वेद Ayurveda +
                        योग Yoga + नैसर्ग Nature + कृषि Agro + पर्यटन Tourism +
                        जैवविविधता Biodiversity. As required, Allopathy &
                        Homoeopathy considered.
                      </span>
                    </div>
                  </ul>
                </section>

                <section className="text-sm sm:text-base">
                  <ul
                    className="
              grid gap-3 mt-2
              list-disc ml-4
              grid-cols-1 sm:grid-cols-2
            "
                  >
                    {[
                      "It is our privilege and duty to safeguard, nurture and propagate this unique scientific tradition and put into the maximum use for the benefit of the entire world.",
                      "Current global resurgence of interest in traditional healthcare has brought Ayurveda, Yoga, Natural Agriculture & Tourism into limelight.",
                      "To compete globally, Government of India established the AYUSH Ministry and cluster-based approaches to enhance micro and small enterprises.",
                      "Cluster approach enables collaboration while competing, building sustainability and social capital for collective initiatives.",
                      "SwaGrama is developing protocols for such clusters, industries and enterprises.",
                      "India is labelled as 'HERBAL, SPICE & LOCAL VARIETY FOOD GARDEN OF THE WORLD'. It is one of the top biodiversity hotspots with unique medicinal heritage.",
                      "Indian applied lifestyle philosophy is the future of world health. Ayurveda, Yoga and Agriculture together offer unmatched research and leadership.",
                      "Sanskrit is a scientific code language. Each sutra itself is a scientific statement.",
                    ].map((text, i) => (
                      <motion.li
                        key={i}
                        className="border p-3 bg-white shadow rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {text}
                      </motion.li>
                    ))}
                  </ul>
                </section>

                <section
                  className="
            border-l-4 border-green-700 rounded-xl
            bg-gradient-to-r from-lime-50 to-green-50
            p-4 font-semibold text-green-900
            text-sm sm:text-base
          "
                >
                  "योगेन चित्तस्य पदेन वाचां, मलं शरीरस्य च वैद्यकेन। योऽपाकरोत्
                  तं प्रवरं मुनीनां, पतंजलि प्रांजलिरानतोऽस्मि।।"
                  <p className="mt-2 font-normal">
                    Yoga – Mind Purification · Sanskrit – Speech Purification ·
                    Ayurveda – Body Purification.
                  </p>
                </section>

                <section>
                  <h3 className="text-base sm:text-lg font-semibold text-green-900 mb-4">
                    Objectives & Scope
                  </h3>
                  <ul
                    className="
              grid gap-3 mt-2
              list-disc ml-4
              text-sm sm:text-base
              grid-cols-1 sm:grid-cols-2
            "
                  >
                    {[
                      /* unchanged list */
                    ].map((text, i) => (
                      <motion.li
                        key={i}
                        className="border p-3 bg-white shadow rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        {text}
                      </motion.li>
                    ))}
                    <motion.li
                      className="border p-3 bg-white shadow rounded-lg col-span-1 sm:col-span-2"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Insurance, finance, real estate and legal services for
                      communities.
                    </motion.li>
                  </ul>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
