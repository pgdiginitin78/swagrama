import {
  Healing,
  LocalFlorist,
  LocalHospital,
  MedicalServices,
  Nature,
  Person,
  Spa,
  WbSunny,
} from "@mui/icons-material";
import AgroWellness from "../assets/landing-page/ayurvedaservices/Agro_wellness.webp";
import Ayurveda from "../assets/landing-page/ayurvedaservices/Ayurveda.webp";
import NaturalFarming from "../assets/landing-page/ayurvedaservices/Natural_farming.webp";
import NaturalHabitat from "../assets/landing-page/ayurvedaservices/Natural_habitat.webp";
import Swagurukul from "../assets/landing-page/ayurvedaservices/Swagurukul.webp";
import ManishaSuryawanshi from "../assets/landing-page/ourexperts/ManishaSuryavanshi.png";
import PradipTaware from "../assets/landing-page/ourexperts/Pradip Taware.png";
import SandipMehetre from "../assets/landing-page/ourexperts/Sandip Mehetre.png";
import SantoshSuryavanshi from "../assets/landing-page/ourexperts/Vaidya Santosh Suryawanshi.png";
import SmitaMehetre from "../assets/landing-page/ourexperts/Vd Smita mehetre.png";
import VaishaliHolmukhe from "../assets/landing-page/ourexperts/Vaishali Holmukhe.png";
import AvantiNitsure from "../assets/landing-page/ourexperts/Avanti Nitsure.png";

export const healers = [
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
    image: AvantiNitsure,
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
    specialty: "Yoga",
    image: ManishaSuryawanshi,
    color: "#8b5cf6",
  },
  {
    id: 7,
    name: "Dr. Vaishali Holmukhe",
    qualification: "MD Homoeopath",
    specialty: "Homeopathy",
    image: VaishaliHolmukhe,
    color: "#3b82f6",
  },
];

export const partnersData = [
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
      "Proprietor : Ayurvijnana Yoga Chikitsalaya",
      "Partner : Smart Unity Healthcare LLP",
    ],
  },
];

export const services = [
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

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    y: -15,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const getIcon = (specialty) => {
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

export const parseDDMMYYYY = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

export const getEventStartDate = (event) => {
  const dates = event.date.split("To").map((d) => d.trim());
  return parseDDMMYYYY(dates[0]);
};

export const getNextTwoEvents = (events) => {
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

