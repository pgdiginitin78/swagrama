import {
  Air,
  ArrowForward,
  AutoAwesome,
  Bathtub,
  Bloodtype,
  CheckCircle,
  Favorite,
  Female,
  FilterVintage,
  Healing,
  HealthAndSafety,
  Hearing,
  LocalFireDepartment,
  LocalFlorist,
  LocalPharmacy,
  Masks,
  MedicalServices,
  MedicationLiquid,
  Opacity,
  Psychology,
  Science,
  Spa,
  WaterDrop,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Modal } from "@mui/material";
import { motion } from "framer-motion";

import {
  CircleDot,
  Droplets,
  Ear,
  Filter,
  Flame,
  Flower2,
  Footprints,
  Hand,
  HeartPulse,
  Leaf,
  Shield,
  ShieldPlus,
  ShowerHead,
  Smile,
  Soup,
  Sparkles,
  Syringe,
  Volume2,
  Waves,
  Wind,
} from "lucide-react";
import { useRef, useState } from "react";
import { MdEco } from "react-icons/md";
import BathingSweaterTherapyImg from "../../../assets/healingServices/detoxTherapy/BathingSweaterTherapyImg.png";
import BodyAnointingImg from "../../../assets/healingServices/detoxTherapy/BodyAnointing.png";
import BodyUnguentImg from "../../../assets/healingServices/detoxTherapy/BodyUnguent.png";
import ContinuousPouringImg from "../../../assets/healingServices/detoxTherapy/ContinuousPouring.png";
import DailyUnguentImg from "../../../assets/healingServices/detoxTherapy/DailyUnguent.png";
import footMassageImg from "../../../assets/healingServices/detoxTherapy/footMassage.png";
import bodyMassageImg from "../../../assets/healingServices/detoxTherapy/FullBodyMassage.png";
import fullBodyMassageTherapy from "../../../assets/healingServices/detoxTherapy/fullBodySteam.png";
import HerbalVaporInhalationImg from "../../../assets/healingServices/detoxTherapy/HerbalVaporInhalation.png";
import IncensingImg from "../../../assets/healingServices/detoxTherapy/Incensing.png";
import InstantHoneyOilEnema from "../../../assets/healingServices/detoxTherapy/InstantHoneyOilEnema.png";
import InstantPurgingImg from "../../../assets/healingServices/detoxTherapy/InstantPurging.png";
import InstantWealthEnema from "../../../assets/healingServices/detoxTherapy/InstantWealthEnema.png";
import LocalizedDFluidImg from "../../../assets/healingServices/detoxTherapy/LocalizedFluid.png";
import MixedFomentationImg from "../../../assets/healingServices/detoxTherapy/MixedFomentation.png";
import NectorVaporInhalationImg from "../../../assets/healingServices/detoxTherapy/NectorVaporInhalation.png";
import BodyOilPowderMassageImg from "../../../assets/healingServices/detoxTherapy/oil&PowderMassage.png";
import BodyPowderMasaageImg from "../../../assets/healingServices/detoxTherapy/powderMassage.png";
import SteamTherapyImg from "../../../assets/healingServices/detoxTherapy/targetAllBodySteam.png";
import traditionalMethodsImg from "../../../assets/healingServices/detoxTherapy/warmHerbal.png";
import WealthEnemaImg from "../../../assets/healingServices/detoxTherapy/WealthEnema.png";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import AutoTypingText from "../../../common/hooks/AutoTypeHook";
import BookEventForm from "../../bookEventForm/BookEventForm";

const getServiceIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes("abhyang") || n.includes("massage") || n.includes("उद्वर्तन"))
    return Spa;
  if (
    n.includes("steam") ||
    n.includes("स्वेदन") ||
    n.includes("बाष्प") ||
    n.includes("vapor")
  )
    return Opacity;
  if (n.includes("pizhichil") || n.includes("सेक") || n.includes("pouring"))
    return WaterDrop;
  if (n.includes("basti") || n.includes("enema")) return MedicationLiquid;
  if (n.includes("agnikarma")) return LocalFireDepartment;
  if (n.includes("blood") || n.includes("रक्त") || n.includes("bloodletting"))
    return Bloodtype;
  if (n.includes("female") || n.includes("स्त्री")) return Female;
  if (n.includes("detox") || n.includes("कर्म")) return LocalPharmacy;
  if (n.includes("wound") || n.includes("व्रण")) return Healing;
  if (n.includes("incense") || n.includes("धूपन")) return Air;
  if (n.includes("bath") || n.includes("अवगाह")) return Bathtub;
  if (n.includes("cupping")) return Science;
  if (n.includes("leech") || n.includes("जलौका")) return Psychology;
  return HealthAndSafety;
};

const detoxServicesData = [
  {
    filterName: "Bathing Sweater Room",
    serviceName: "सर्वगात्रपरिषेकस्वेदन Full Body Sprinkling Fomentation",
    description: "Continuous pouring of warm herbal decoction over the body.",
    benefits:
      "Deep relaxation, pain relief, detoxification, and skin nourishment.",
    price: 1500,
    icon: Droplets,
    image:BodyAnointingImg,
  },
  {
    filterName: "Bathing Sweater Room",
    serviceName: "एकांगपरिषेकस्वेदन Single Organ Sprinkling Fomentation",
    description: "Continuous pouring of warm herbal decoction over the body.",
    benefits:
      "Deep relaxation, pain relief, detoxification, and skin nourishment.",
    price: 500,
    icon: Sparkles,
    image:BodyUnguentImg,
  },
  {
    filterName: "Bathing Sweater Room",
    serviceName: "सर्वगात्रअवगाहस्वेदन Bathing Sweater Therapy",
    description: "Immersion or herbal bath therapy.",
    benefits:
      "Detoxifies, relieves fatigue, hydrates skin, and relaxes muscles.",
    price: 1500,
    icon: ShowerHead,
    image:BathingSweaterTherapyImg,
  },
  //

  {
    filterName: "Dry Hot Hut Fire Fomentation Room",
    serviceName: "जेलवाकुट्टिवेद Dry Hot Hut Fire Fomentation",
    description: "Specific herbal steam therapy using traditional methods.",
    benefits:
      "Detoxifies, relieves joint and muscle stiffness, rejuvenates tissues.",
    price: {
      perSession: "500/Per",
      pack3: "1000/3",
      pack5: "1500/5",
    },
    icon: Wind,
    image:
      "https://www.freepik.com/search?format=search&query=herbal%20steam%20therapy%20ayurveda",
  },
  //
  {
    filterName: "Massage & Anointing",
    serviceName: "सर्वगात्रअभ्यङ्ग Full Body Unguent",
    description:
      "Gentle, rhythmic oil massage over the whole body; head and face are treated separately.",
    benefits:
      "Improves circulation, nourishes skin, relaxes muscles, balances Doshas, and enhances overall body vitality.",
    price: 1500,
    icon: Hand,
    image:
      "https://www.freepik.com/search?format=search&query=ayurvedic%20full%20body%20oil%20massage",
  },
  {
    filterName: "Massage & Anointing",
    serviceName: "एकांगअभ्यङ्ग Single Organ Unguent",
    description: "Gentle, rhythmic oil massage over the single organ;",
    benefits:
      "Improves circulation, nourishes skin, relaxes muscles, balances Doshas, and enhances overall body vitality.",
    price: 500,
    icon: Droplets,
    image:
      "https://www.freepik.com/search?format=search&query=oil%20massage%20therapy%20ayurveda",
  },
  {
    filterName: "Massage & Anointing",
    serviceName: "नित्यअभ्यङ्ग DailyUnguent",
    description: "Daily oil application for regular nourishment.",
    benefits:
      "Maintains skin suppleness, prevents dryness, and supports joint and muscular health.",
    price: 1200,
    icon: Sparkles,
    image:
      "https://www.freepik.com/search?format=search&query=daily%20body%20oil%20massage%20ayurveda",
  },
  {
    filterName: "Massage & Anointing",
    serviceName: "कांस्यतालीपादाभ्यङ्ग Bronze Plate Foot Unguent",
    description: "Foot massage using bronze plate technique.",
    benefits:
      "Improves foot circulation, relieves fatigue, strengthens lower limbs, and stimulates reflex points.",
    price: 200,
    icon: Footprints,
    image:
      "https://www.freepik.com/search?format=search&query=foot%20massage%20therapy%20spa",
  },
  {
    filterName: "Massage & Anointing",
    serviceName: "सर्वगात्रमर्दन Full Body Massage",
    description: "Deep tissue full-body massage.",
    benefits:
      "Reduces muscular tension, improves circulation, detoxifies tissues, and enhances flexibility.",
    price: 1500,
    icon: Hand,
    image:
      "https://www.freepik.com/search?format=search&query=deep%20tissue%20massage%20full%20body",
  },
  {
    filterName: "Massage & Anointing",
    serviceName: "सर्वगात्रउद्वर्तन Full Body Powder Massage",
    description: "Massage using therapeutic powders.",
    benefits:
      "Exfoliates skin, improves blood circulation, detoxifies, and revitalizes the body.",
    price: 1500,
    icon: Leaf,
    image:
      "https://www.freepik.com/search?format=search&query=ayurvedic%20powder%20massage%20udvartana",
  },
  {
    filterName: "Massage & Anointing",
    serviceName: "सर्वगात्रउत्सादन Full Body Oil Powder Massage",
    description: "Combination of oil and powder massage.",
    benefits:
      "Deeply nourishes skin, relaxes muscles, detoxifies, and restores vitality.",
    price: 1500,
    icon: Droplets,
    image:
      "https://www.freepik.com/search?format=search&query=oil%20powder%20massage%20ayurveda",
  },
  {
    filterName: "Massage & Anointing",
    serviceName: "सर्वगात्रलेपण Full Body Anointing",
    description:
      "Application of powders, food-based pastes, or medicinal pastes on body.",
    benefits:
      "Nourishes skin, detoxifies, enhances healing, and improves skin texture.",
    price: 1500,
    icon: Sparkles,
    image:
      "https://www.freepik.com/search?format=search&query=herbal%20body%20paste%20ayurveda%20therapy",
  },
  {
    filterName: "Massage & Anointing",
    serviceName: "एकांगलेपण Single Organ Anointing",
    description:
      "Application of powders, food-based pastes, or medicinal pastes on single organ.",
    benefits:
      "Nourishes skin, detoxifies, enhances healing, and improves skin texture.",
    price: 500,
    icon: Sparkles,
    image:
      "https://www.freepik.com/search?format=search&query=herbal%20paste%20application%20therapy",
  },
  //
  {
    filterName: "Steam & Incensing Therapy",
    serviceName: "प्रधानवमनकर्म Main Emetic Detox",
    description:
      "Therapeutic vomiting under physician supervision using ghee and medicine. (10-day program includes preparatory therapies: digestive medicines, internal oleation, 3 sessions of external oleation, steam fomentation; main therapy; post-therapy & extra hospital stay/meal charges)",
    benefits:
      "Eliminates excess Kapha, cleanses stomach, enhances digestion, strengthens metabolism, and prepares body for detoxification.",
    price: "7 days - ₹13,000 Package",
    icon: Droplets,
    image:
      "https://www.freepik.com/search?format=search&query=ayurveda%20detox%20therapy%20clinic",
  },
  {
    filterName: "Steam & Incensing Therapy",
    serviceName: "प्रधानविरेचकर्म Main Laxative Detox",
    description:
      "Therapeutic purgation under physician supervision using ghee and medicine. (10-day program includes preparatory therapies: digestive medicines, internal oleation, 3 sessions of external oleation, steam fomentation; main therapy; post-therapy & extra hospital stay/meal charges)",
    benefits:
      "Cleanses intestines, removes Pitta-related toxins, improves bowel function, balances digestive fire, and detoxifies the body.",
    price: "7 days - ₹13,000 Package",
    icon: Sparkles,
    image:
      "https://www.freepik.com/search?format=search&query=ayurvedic%20digestive%20detox%20treatment",
  },
  {
    filterName: "Steam & Incensing Therapy",
    serviceName: "प्रधानवस्तिकर्म Main Enema Detox",
    description:
      "Under physician supervision, a sequence of medicated enemas is administered for several days as part of a 7-day detox program. Includes Deepan-Pachan (digestive preparation), Snehana (oleation), Swedana (steam therapy), followed by main Basti course and post-care phase. (Additional inpatients stay and food charges apply.)",
    benefits:
      "Deeply cleanses the colon, pacifies Vata Dosha, improves digestion, strengthens the lower back, and nourishes the body tissues.",
    price: "7 days - ₹14,000 Package",
    icon: ShieldPlus,
    image:
      "https://www.freepik.com/search?format=search&query=ayurveda%20therapy%20treatment%20wellness%20center",
  },
  {
    filterName: "Steam & Incensing Therapy",
    serviceName: "प्रधाननस्यचिकित्सणालय Main Nasal Detox",
    description:
      "Guided nasal cleansing using medicated oils or decoctions under supervision.",
    benefits:
      "Clears nasal passages, reduces sinus congestion, improves smell and respiratory health.",
    price: "7 days - ₹12,000",
    icon: Wind,
    image:
      "https://www.freepik.com/search?format=search&query=nasal%20therapy%20ayurveda%20treatment",
  },
  {
    filterName: "Steam & Incensing Therapy",
    serviceName: "प्रणातकस्त्राविणम् Systemic Bloodletting",
    description:
      "Whole-body bloodletting therapy under physician supervision to remove impure blood and balance Doshas. (Package includes preparatory therapies, main procedure, and post-care; additional stay and food charges apply)",
    benefits:
      "Detoxifies blood, improves circulation, balances Doshas, reduces inflammation, and promotes overall vitality.",
    price: "7 days - ₹12,000 Package",
    icon: HeartPulse,
    image:
      "https://www.freepik.com/search?format=search&query=holistic%20health%20therapy%20clinic%20wellness",
  },
  //
  {
    filterName: "5 Main Detox Therapy",
    serviceName: "प्रधानवमनकर्म Main Emetic Detox",
    description:
      "Therapeutic vomiting under physician supervision using ghee and medicine. (10-day program includes preparatory therapies: digestive medicines, internal oleation, 3 sessions of external oleation, steam fomentation; main therapy; post-therapy & extra hospital stay/meal charges)",
    benefits:
      "Eliminates excess Kapha, cleanses stomach, enhances digestion, strengthens metabolism, and prepares body for detoxification.",
    price: "7 days - ₹13,000 Package",
    icon: Droplets,
    image:
      "https://www.freepik.com/search?format=search&query=ayurveda%20detox%20therapy%20clinic",
  },
  {
    filterName: "5 Main Detox Therapy",
    serviceName: "प्रधानविरेचकर्म Main Laxative Detox",
    description:
      "Therapeutic purgation under physician supervision using ghee and medicine. (10-day program includes preparatory therapies: digestive medicines, internal oleation, 3 sessions of external oleation, steam fomentation; main therapy; post-therapy & extra hospital stay/meal charges)",
    benefits:
      "Cleanses intestines, removes Pitta-related toxins, improves bowel function, balances digestive fire, and detoxifies the body.",
    price: "7 days - ₹13,000 Package",
    icon: Flame,
    image:
      "https://www.freepik.com/search?format=search&query=ayurvedic%20digestive%20detox%20treatment",
  },
  {
    filterName: "5 Main Detox Therapy",
    serviceName: "प्रधानवस्तिकर्म Main Enema Detox",
    description:
      "Under physician supervision, a sequence of medicated enemas is administered for several days as part of a 7-day detox program. Includes Deepan-Pachan (digestive preparation), Snehana (oleation), Swedana (steam therapy), followed by main Basti course and post-care phase. (Additional inpatients stay and food charges apply.)",
    benefits:
      "Deeply cleanses the colon, pacifies Vata Dosha, improves digestion, strengthens the lower back, and nourishes the body tissues.",
    price: "7 days - ₹14,000 Package",
    icon: Syringe,
    image:
      "https://www.freepik.com/search?format=search&query=ayurveda%20basti%20therapy%20enema%20treatment",
  },
  {
    filterName: "5 Main Detox Therapy",
    serviceName: "प्रधाननस्यचिकित्सणालय Main Nasal Detox",
    description:
      "Guided nasal cleansing using medicated oils or decoctions under supervision.",
    benefits:
      "Clears nasal passages, reduces sinus congestion, improves smell and respiratory health.",
    price: "7 days - ₹12,000",
    icon: Wind,
    image:
      "https://www.freepik.com/search?format=search&query=ayurvedic%20nasal%20therapy%20treatment",
  },
  {
    filterName: "5 Main Detox Therapy",
    serviceName: "प्रणातकस्त्राविणम् Systemic Bloodletting",
    description:
      "Whole-body bloodletting therapy under physician supervision to remove impure blood and balance Doshas. (Package includes preparatory therapies, main procedure, and post-care; additional stay and food charges apply)",
    benefits:
      "Detoxifies blood, improves circulation, balances Doshas, reduces inflammation, and promotes overall vitality.",
    price: "7 days - ₹12,000 Package",
    icon: HeartPulse,
    image:
      "https://www.freepik.com/search?format=search&query=ayurvedic%20bloodletting%20therapy",
  },
  //
  {
    filterName: "Female Care",
    serviceName: "स्त्रीउत्तरवस्ति - Female Genital Enema Detox",
    description:
      "Specialized Ayurvedic detox procedure for female reproductive system. Includes internal oleation, external oil massage, medicated enema, and localized therapies as per physician's guidance. (Package with full procedure and follow-up; additional stay and food charges apply)",
    benefits:
      "Enhances reproductive health, improves fertility, balances hormones, supports uterine health, and detoxifies the genito-urinary system.",
    price: "14,000 Package",
    icon: "",
    image: "",
  },
  {
    filterName: "Female Care",
    serviceName:
      "स्त्रीगुप्तक्षा - Female Genital Care (योनिधावन - Female Genital Cleansing, योनिधूपन - Female Genital Fumigation, योनिपिचु - Female Genital Oil Application, योनिपूरण - Female Genital Filling Therapy)",
    description:
      "External cleansing of female genital area using herbal decoctions and medicated oils. Fumigation therapy with herbal vapors and medicated ghee for female genital area. Application of warm medicated oil-soaked cotton swab over the genital region. Gentle instillation of herbal oils or medicated ghee under supervision.",
    benefits:
      "Maintains hygiene, prevents infections, promotes local circulation, and supports overall reproductive wellness. Reduces infection risk, enhances healing, balances Doshas, and promotes rejuvenation. Nourishes tissues, strengthens local organs, and supports fertility. Lubricates channels, strengthens reproductive tissues, and balances local energy.",
    price: "1900",
    icon: "",
    image: "",
  },
  //
  {
    filterName: "Abdominal Purification",
    serviceName: "सद्यअनुलोमन - InstantPurging",
    description:
      "Single-day mild purgation using small doses of medicine to relieve constipation or minor bowel obstruction.",
    benefits:
      "Quick relief from constipation, clears bowel obstruction, balances Pitta and Vata, improves elimination, and restores digestive harmony.",
    price: "1000",
    icon: "",
    image: "",
  },
  {
    filterName: "Abdominal Purification",
    serviceName: "सद्यात्रावस्ति - Instant Wealth Enema",
    description:
      "Single-day mild enema for constipation relief and light detox.",
    benefits: "Gives instant bowel clearance and comfort.",
    price: "1500",
    icon: "",
    image: "",
  },
  {
    filterName: "Abdominal Purification",
    serviceName: "सद्यामधुतैलीकवस्ति - Instant Honey Oil Enema",
    description: "One-day honey-oil enema for mild detox and nourishment.",
    benefits: "Quick cleansing and lubrication of colon.",
    price: "1700",
    icon: "",
    image: "",
  },
  //
  {
    filterName: "Organ Care",
    serviceName: "तर्पण Satiating",
    description: "Medicated oil retention",
    benefits:
      "Nourishes tissues, improves functions and health of organ, relaxes muscles.",
    price: "1500",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/spa-oil-massage-therapy_23-2149330906.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "धावन Wash",
    description: "Gentle cleansing",
    benefits: "Detoxifies, prepares for main therapy, refreshes skin.",
    price: "500",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/woman-getting-spa-treatment_23-2149330862.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "अभ्यङ्ग Unguent",
    description: "Rhythmic oil massage",
    benefits: "Improves circulation, eases stiffness, relieves tension.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/spa-therapist-doing-massage-treatment_23-2149330894.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "संवाहन Conduction Massage",
    description: "Perfect Conduction massage",
    benefits: "Stimulates energy channels, improves blood flow.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/massage-therapy-relaxation-spa-treatment_23-2149330872.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "मर्दन Massage",
    description: "Deep tissue massage",
    benefits: "Relieves muscular tension, improves mobility.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/deep-tissue-massage-therapy_23-2149330888.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "पादाघात Deep Tissue Foot Massage",
    description: "Deep tissue foot massage.",
    benefits: "Improves circulation, relaxes muscles, reduces fatigue.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/foot-massage-spa-treatment_23-2149330878.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "उद्वर्तन Powder Massage",
    description: "Powder massage",
    benefits: "Refreshes skin, relieves tension, enhances energy flow.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/herbal-powder-massage-treatment_23-2149330884.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "उत्सादन Oil Powder Massage",
    description: "Combined oil & powder massage.",
    benefits: "Nourishes tissues, eases stiffness, improves flexibility.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/oil-powder-massage-therapy_23-2149330890.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "ऊन्मर्दन Fragrance Massage",
    description: "Aromatic massage",
    benefits: "Reduces stress, relaxes muscles, enhances well-being.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/aromatherapy-massage-spa-treatment_23-2149330896.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "उद्गर्षण Dry Brushing",
    description: "Dry brushing",
    benefits: "Exfoliates skin, stimulates circulation, relaxes muscles.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/dry-brushing-spa-treatment_23-2149330876.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "नाडीस्वप्तोस्वेदन Tube Steam Fomentation",
    description: "Tube Steam Fomentation",
    benefits: "Detoxifies tissues, opens energy pathways, reduces stiffness.",
    price: "500",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/steam-therapy-spa-treatment_23-2149330892.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "पिण्डस्वेद Herbal Bolus Fomentation",
    description: "Herbal bolus massage/fomentation",
    benefits:
      "Relieves deep fatigue, reduces muscular pain, improves flexibility.",
    price: "750",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/herbal-bolus-massage-therapy_23-2149330886.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "सेक: पात्रोच्चल Pouring Therapy",
    description: "Pouring medicated liquids",
    benefits: "Soothes muscles, relieves stiffness, improves circulation.",
    price: "750",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/pouring-oil-therapy-treatment_23-2149330898.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "परिषेकस्वेदन Continuous Pouring",
    description: "Continuous pouring of medicated liquids",
    benefits: "Deep relaxation, nourishes tissues, improves energy flow.",
    price: "500",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/continuous-pouring-therapy-spa_23-2149330900.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "अवगाहस्वेदक Bathing Sweater Therapy",
    description: "Warm medicated fomentation",
    benefits: "Detoxifies, relaxes muscles, improves circulation.",
    price: "750",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/warm-bath-therapy-treatment_23-2149330874.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "उष्माहुदस्वेद Wet Cloth Fomentation",
    description: "Wet cloth fomentation",
    benefits: "Reduces inflammation, soothes muscles.",
    price: "500",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/wet-cloth-compress-therapy_23-2149330880.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "धारा Oil Stream Therapy",
    description: "Steady stream of medicated oil.",
    benefits: "Nourishes tissues, relieves pain, and improves flexibility.",
    price: "500",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/oil-stream-therapy-treatment_23-2149330902.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "पिचु Oil Cotton Application",
    description: "Cotton soaked in medicated oil.",
    benefits: "Localized relief alleviates tension and stiffness.",
    price: "500",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/cotton-oil-application-therapy_23-2149330882.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "बस्ति Oil Pool Therapy",
    description: "Oil pooling therapy.",
    benefits: "Deep tissue nourishment, relieves stiffness.",
    price: "750",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/oil-pooling-therapy-treatment_23-2149330904.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "लेपन Herbal Anointing",
    description: "Herbal paste or medicated application.",
    benefits: "Improves tissue health, alleviating soreness.",
    price: "500",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/herbal-paste-application-spa_23-2149330870.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "आर्द्रवटस्वेदन Wet Cloth Fomentation",
    description: "Wet cloth fomentation.",
    benefits: "Reduces inflammation, eases stiffness.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/wet-fomentation-therapy_23-2149330868.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "रूक्षवटस्वेदन Dry Cloth Fomentation",
    description: "Dry cloth fomentation.",
    benefits: "Stimulates circulation, relaxes muscles.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/dry-fomentation-therapy_23-2149330866.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "विद्युतोऊष्मौषधिस्वेद Electric Herbs Fomenting",
    description: "Herbal bolus with mild electric heat.",
    benefits: "Deep relaxation, pain relief, improves circulation.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/electric-heat-therapy-treatment_23-2149330864.jpg",
  },
  {
    filterName: "Organ Care",
    serviceName: "धूपन Incensing",
    description: "Herbal smoke therapy.",
    benefits: "Refreshes mind and body, relieves tension.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/herbal-smoke-therapy-incense_23-2149330908.jpg",
  },
  //
  {
    filterName: "Eye Care",
    serviceName: "संपूर्णनेत्रक्षा Total Eye Care",
    description: "",
    benefits: "",
    price: "1500",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/eye-care-treatment-spa_23-2149330910.jpg",
  },
  {
    filterName: "Eye Care",
    serviceName: "अक्षिघृततर्पण Eye Ghee Satiating",
    description: "Medicated ghee poured over the eyes.",
    benefits:
      "Nourishes eyes, improves vision clarity, reduces eye strain and dryness.",
    price: "500",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/ayurvedic-eye-treatment-ghee_23-2149330912.jpg",
  },
  {
    filterName: "Eye Care",
    serviceName: "नेत्रतैलतर्पण Eye Oil Satiating",
    description: "Eye nourishment therapy using medicated oils.",
    benefits: "Strengthens ocular tissues, improves eyesight, reduces fatigue.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/eye-oil-treatment-therapy_23-2149330914.jpg",
  },
  {
    filterName: "Eye Care",
    serviceName: "नेत्राभ्यङ्ग HeadUnguent",
    description: "Gentle massage around eyes and forehead with medicated oils.",
    benefits: "Relieves tension, improves circulation, reduces eye strain.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/head-massage-eye-area_23-2149330916.jpg",
  },
  {
    filterName: "Eye Care",
    serviceName: "नेत्रधारा NetraDhara",
    description: "Continuous flow of medicated liquid over eyes.",
    benefits: "Improves tear secretion, relieves dryness, and reduces redness.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/eye-treatment-liquid-flow_23-2149330918.jpg",
  },
  {
    filterName: "Eye Care",
    serviceName: "नेत्रपिचु NetraPichu",
    description: "Medicated cotton placed on eyes.",
    benefits:
      "Reduces inflammation, soothes irritation, and improves eye health.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/cotton-compress-eye-treatment_23-2149330920.jpg",
  },
  {
    filterName: "Eye Care",
    serviceName: "नेत्रबस्ति NetraBasti",
    description:
      "Medicated liquid retained around eyes in a well-made boundary.",
    benefits:
      "Nourishes cornea, relieves chronic eye conditions, improves vision.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/netra-basti-eye-treatment_23-2149330922.jpg",
  },
  {
    filterName: "Eye Care",
    serviceName: "नेत्रधावन NetraDhavan",
    description: "Eye washing with herbal decoctions.",
    benefits: "Cleanses eyes, reduces infections, refreshes eyes.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/eye-washing-herbal-treatment_23-2149330924.jpg",
  },
  {
    filterName: "Eye Care",
    serviceName: "नेत्रांजन NetraAnjana",
    description: "Herbal collyrium applied to eyes.",
    benefits: "Strengthens eyesight, reduces eye strain, prevents infections.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/herbal-collyrium-eye-application_23-2149330926.jpg",
  },
  {
    filterName: "Eye Care",
    serviceName: "आश्योतन Sprinkling",
    description: "Herbal water sprinkled over eyes.",
    benefits: "Refreshes eyes, relieves fatigue, promotes ocular health.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/herbal-water-eye-splash_23-2149330928.jpg",
  },
  {
    filterName: "Eye Care",
    serviceName: "बिडालक Bidalak",
    description: "Specialized herbal eye treatment.",
    benefits: "Reduces redness, eye irritation, improves vision.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/specialized-eye-treatment-therapy_23-2149330930.jpg",
  },
  {
    filterName: "Eye Care",
    serviceName: "पुटपाक Putapak",
    description: "Warm herbal compress over eyes.",
    benefits:
      "Relieves eye strain, improves blood circulation, reduces puffiness.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/warm-compress-eye-treatment_23-2149330932.jpg",
  },
  //
  {
    filterName: "Ear Care",
    serviceName: "कर्णतर्पण Ear Satiating",
    description: "Medicated oil retention over the ears.",
    benefits:
      "Nourishes ear tissues, reduces earache, improves hearing and ear health.",
    price: "750",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/ear-oil-treatment-therapy_23-2149330934.jpg",
  },
  {
    filterName: "Ear Care",
    serviceName: "कर्णपूरण Ear Fulfilling",
    description: "Filling ears with medicated oils or herbal preparations.",
    benefits:
      "Treats ear dryness, prevents infections, strengthens auditory function.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/ear-filling-oil-treatment_23-2149330936.jpg",
  },
  {
    filterName: "Ear Care",
    serviceName: "कर्णशूल Earache",
    description: "Therapeutic treatment for ear pain.",
    benefits: "Relieves earache, reduces inflammation, soothes ear discomfort.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/ear-pain-relief-treatment_23-2149330938.jpg",
  },
  {
    filterName: "Ear Care",
    serviceName: "कर्णस्त्राव Ear Discharge",
    description: "Treatment for ear discharge.",
    benefits:
      "Reduces excessive discharge, treats infections, maintains ear hygiene.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/ear-discharge-treatment-therapy_23-2149330940.jpg",
  },
  {
    filterName: "Ear Care",
    serviceName: "कर्णमल Ear Wax",
    description: "Ear cleansing and detoxifying procedure.",
    benefits:
      "Removes wax, prevents blockages, improves ear hygiene and comfort.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/ear-wax-cleaning-procedure_23-2149330942.jpg",
  },
  //
  {
    filterName: "Nasal Care",
    serviceName: "वृंहणतर्पणनस्य Nourishing Nasal Therapy",
    description: "Nourishing nasal therapy with medicated oils.",
    benefits:
      "Strengthens nasal tissues, reduces dryness, enhances olfactory function.",
    price: "500",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/nasal-oil-therapy-treatment_23-2149330944.jpg",
  },
  {
    filterName: "Nasal Care",
    serviceName: "शमनतर्पणनस्य Alleviation Satiating",
    description: "Soothing nasal therapy using herbal oils.",
    benefits:
      "Reduces inflammation, eases nasal irritation, supports respiratory wellness.",
    price: "500",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/soothing-nasal-therapy-oil_23-2149330946.jpg",
  },
  {
    filterName: "Nasal Care",
    serviceName:
      "मर्श / प्रतिमर्श / नावन / अवपीड़ / प्रधमन / नस्य Sernutatory Nasal Therapy",
    description:
      "Herbal nasal application and cleansing. Gentle repeat nasal application.",
    benefits:
      "Maintains nasal hygiene, prevents recurrent congestion, supports overall nasal health. Reduces sinus pressure, enhances nasal circulation, relieves headache. Relieves sinus pressure, detoxifies nasal passages, improves airflow. Thorough detoxification, clears mucus accumulation, supports respiratory immunity.",
    price: "500",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/nasal-cleansing-therapy-treatment_23-2149330948.jpg",
  },
  {
    filterName: "Nasal Care",
    serviceName: "ऊष्माद्धूमपान Unctuous Smoke Inhalation",
    description: "Medicated herbal smoke inhalation.",
    benefits:
      "Relieves nasal dryness, strengthens sinus mucosa, detoxifies nasal passages.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/herbal-smoke-inhalation-therapy_23-2149330950.jpg",
  },
  {
    filterName: "Nasal Care",
    serviceName: "क्षीरद्धूमपान Milk Smoke Inhalation",
    description: "Milk-based medicated smoke inhalation.",
    benefits:
      "Soothes irritation, nourishes nasal tissues, enhances breathing.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/milk-smoke-therapy-inhalation_23-2149330952.jpg",
  },
  {
    filterName: "Nasal Care",
    serviceName: "औषधि धूमपान Herbal Smoke Inhalation",
    description: "Herbal smoke inhalation for nasal wellness.",
    benefits:
      "Detoxifies, relieves sinus congestion, improves respiratory function.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/herbal-smoke-wellness-therapy_23-2149330954.jpg",
  },
  {
    filterName: "Nasal Care",
    serviceName: "नासाधावन Nasal Wash",
    description: "Herbal nasal wash.",
    benefits:
      "Cleanses nasal cavity, reduces infection risk, refreshes nasal mucosa.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/nasal-wash-cleansing-procedure_23-2149330956.jpg",
  },
  //
  {
    filterName: "Mouth Care",
    serviceName: "मुखतर्पण MukhaTarpana / Mouth Therapy",
    description:
      "Retention of medicated ghee or herbal oils in the oral cavity.",
    benefits:
      "Strengthens oral tissues, improves dental and gum health, soothes mouth discomfort.",
    price: "750",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/ayurvedic-mouth-oil-therapy_23-2149330958.jpg",
  },
  {
    filterName: "Mouth Care",
    serviceName: "गण्डुष Gandusha / Oil Pulling",
    description: "Gargling and holding medicated oils in the mouth.",
    benefits:
      "Detoxifies oral cavity, improves gum health, reduces dental issues.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/oil-pulling-mouth-therapy_23-2149330960.jpg",
  },
  {
    filterName: "Mouth Care",
    serviceName: "कवल Kavala / Herbal Mouth Rinse",
    description: "Rinsing mouth with herbal decoctions.",
    benefits: "Maintains oral hygiene, reduces bad breath, strengthens gums.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/herbal-mouth-rinse-treatment_23-2149330962.jpg",
  },
  {
    filterName: "Mouth Care",
    serviceName: "दन्त Danta / Dental Care",
    description: "Ayurvedic dental procedures.",
    benefits: "Cleans teeth, prevents decay, strengthens enamel and gums.",
    price: "300",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/ayurvedic-dental-care-treatment_23-2149330964.jpg",
  },
  //
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "सुवर्णाग्निकर्म Gold Cauterization",
    description: "Thermal therapy using gold for localized application.",
    benefits:
      "Promotes tissue healing, relieves chronic pain, enhances energy flow, and reduces inflammation.",
    price: "250/Per",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/gold-cauterization-thermal-therapy_23-2149330966.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "रौप्याग्निकर्म Silver Cauterization",
    description: "Thermal therapy using silver.",
    benefits:
      "Anti-inflammatory, improves circulation, detoxifies locally, and supports wound healing.",
    price: "200/Per",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/silver-cauterization-therapy_23-2149330968.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "ताम्राग्निकर्म Copper Cauterization",
    description: "Thermal therapy using copper.",
    benefits:
      "Relieves joint pain, improves circulation, and detoxifies locally.",
    price: "200/Per",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/copper-cauterization-treatment_23-2149330970.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "लौहाग्निकर्म Iron Cauterization",
    description: "Thermal therapy using iron.",
    benefits:
      "Supports bone and muscle strength, relieves pain, and improves tissue metabolism.",
    price: "200/Per",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/iron-cauterization-therapy_23-2149330972.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "मृत्तिकाग्निकर्म Earth Cauterization",
    description: "Thermal therapy using clay.",
    benefits:
      "Relieves local inflammation, reduces stiffness, and detoxifies tissues.",
    price: "200/Per",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/clay-thermal-therapy-treatment_23-2149330974.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "पाणिाग्निकर्म Heel Cauterization",
    description: "Heel-focused thermal therapy.",
    benefits: "Relieves heel pain, plantar fasciitis, and local stiffness.",
    price: "200/Per",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/heel-thermal-therapy_23-2149330976.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "कद्राग्निकर्म Corn Cauterization",
    description: "Thermal therapy for corns.",
    benefits:
      "Softens and removes corns, relieves pain, and prevents recurrence.",
    price: "200/Per",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/corn-removal-therapy_23-2149330978.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "स्थानिक शिराश्रुत रक्तमोक्षण Local Vein Blood Letting",
    description:
      "Targeted bloodletting on specific body areas using traditional methods.",
    benefits:
      "Reduces local inflammation, relieves pain, improves circulation, and detoxifies specific regions.",
    price: "1000",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/bloodletting-therapy-treatment_23-2149330980.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "प्रच्छान Scarification Blood Letting",
    description: "Minor skin pricking to release stagnant blood and toxins.",
    benefits:
      "Relieves localized congestion, improves blood flow, and promotes healing.",
    price: "1000",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/scarification-therapy-treatment_23-2149330982.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "श्रृंगावचारण Horn Blood Letting",
    description:
      "Application of specialized horn instrument for controlled bloodletting.",
    benefits:
      "Enhances local detox, reduces inflammation, and stimulates tissue healing.",
    price: "1000",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/horn-bloodletting-therapy_23-2149330984.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "अलाबुविधि Cupping with Flask Blood Letting",
    description:
      "Traditional flask therapy for bloodletting using vacuum suction.",
    benefits:
      "Stimulates circulation, reduces stagnation, and helps in musculoskeletal and skin issues.",
    price: "1000",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/cupping-flask-therapy_23-2149330986.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "जलौका Leech Blood Letting",
    description: "Application of medicinal leeches to affected areas.",
    benefits:
      "Removes impure blood, reduces swelling, alleviates pain, and improves circulation.",
    price: "250/Per l",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/leech-therapy-treatment_23-2149330988.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "Cupping Therapy",
    description:
      "Application of glass or bamboo cups with suction on affected areas.",
    benefits:
      "Relieves muscle tension, improves blood flow, detoxifies, and promotes relaxation.",
    price: "250/Perl",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/cupping-therapy-treatment_23-2149330990.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "विद्ध - वेधन कर्म Piercing Therapy",
    description:
      "Small puncture therapy to release impure blood from localized areas.",
    benefits:
      "Helps in pain relief, detoxification, and faster healing of minor disorders.",
    price: "250/Per",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/piercing-therapy-treatment_23-2149330992.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "विद्धाग्निकर्म Piercing Cauterization Therapy",
    description: "Puncture-based thermal therapy.",
    benefits: "Effective for abscesses, localized swelling, and chronic pain.",
    price: "200/Per",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/piercing-cauterization-treatment_23-2149330994.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "एकांगव्रणकर्म Single Wound Treatment",
    description: "Localized wound care for a single wound.",
    benefits: "Promotes healing, prevents infection, aids tissue repair.",
    price: "250/Per",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/single-wound-care-treatment_23-2149330996.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "क्षोत्रव्रणकर्म Immediate Wound Treatment",
    description: "Immediate care for fresh wounds.",
    benefits: "Stops bleeding, prevents infection, supports fast healing.",
    price: "250/Per",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/immediate-wound-care_23-2149330998.jpg",
  },
  {
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    serviceName: "दुष्टव्रणकर्म Chronic Wound Treatment",
    description: "Care for chronic, non-healing wounds.",
    benefits: "Helps debridement, promotes healing of difficult wounds.",
    price: "1500/per",
    icon: "",
    image:
      "https://img.freepik.com/free-photo/chronic-wound-treatment-care_23-2149331000.jpg",
  },
];

const categories = [
  {
    id: "massage",
    label: "Massage & Anointing",
    name: "अभ्यंग एवं लेपन Massage & Anointing",
    filterName: "Massage & Anointing",
    icon: Spa,
  },
  {
    id: "steam",
    label: "Steam & Incensing Therapy",
    name: "स्वेदन एवं धूपन चिकित्सा Steam & Incensing Therapy",
    filterName: "Steam & Incensing Therapy",
    icon: Opacity,
  },
  {
    id: "detox",
    label: "Detox Therapy",
    name: "शोधन चिकित्सा Detox Therapy",
    filterName: "Bathing Sweater Room",
    icon: LocalPharmacy,
  },
  {
    id: "mainDetox",
    label: "5 Main Detox Therapy",
    name: "पंचप्रधान शोधन चिकित्साकर्म 5 Main Detox Therapy",
    filterName: "5 Main Detox Therapy",
    icon: LocalPharmacy,
  },
  {
    id: "female",
    label: "Female Care",
    name: "स्त्रीरक्षा Female Care",
    filterName: "Female Care",
    icon: Female,
  },
  {
    id: "abdominal",
    label: "Abdominal Purification",
    name: "उदरशुद्धी Abdominal Purification",
    filterName: "Abdominal Purification",
    icon: Healing,
  },
  {
    id: "organ",
    label: "Organ Care",
    name: "इन्द्रियावयवरक्षा Organ Care",
    filterName: "Organ Care",
    icon: LocalPharmacy,
  },
  {
    id: "ear",
    label: "Ear Care",
    name: "कर्णरक्षा Ear Care",
    filterName: "Ear Care",
    icon: Hearing,
  },
  {
    id: "nasal",
    label: "Nasal Care",
    name: "नासारक्षा Nasal Care",
    filterName: "Nasal Care",
    icon: Masks,
  },
  {
    id: "mouth",
    label: "Mouth Care",
    name: "मुखरक्षा Mouth Care",
    filterName: "Mouth Care",
    icon: MedicalServices,
  },
  {
    id: "bloodWound",
    label: "Cauterization Blood Letting Piercing & Wound Therapy",
    name: "अग्निे, रक्तमोक्षण, विद्ध, विद्धाग्निे एवं व्रणकर्म Cauterization Blood Letting Piercing & Wound Therapy",
    filterName: "Cauterization Blood Letting Piercing & Wound Therapy",
    icon: Bloodtype,
  },
  {
    id: "all",
    label: "All Services",
    name: "All Services",
    filterName: "All Services",
    icon: AutoAwesome,
  },
];

function ServiceModal({ open, onClose, item }) {
  const backdropRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const hasSubServices = item?.subServices && item.subServices.length > 0;
  const benefitText = item?.benefits || item?.benefit || item?.benift || "";
  const descriptionText = Array.isArray(item?.description)
    ? item.description[0]
    : item?.description;
  if (!open) return null;

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
          ref={backdropRef}
          className="w-[70%] max-h-[90%] overflow-y-auto rounded-xl"
        >
          <div>
            <CancelButtonModal onClick={onClose} />

            <div className="flex space-x-2 items-center bg-lime-200/70 rounded-xl px-3 py-2 mb-2 shadow-inner">
              <div className=" ">
                <h2 className="text-xl font-semibold text-green-900 leading-tight">
                  Service Name :
                </h2>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-green-900 leading-tight">
                  {item?.serviceName}
                </h2>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 mb-2 border border-green-200/70 shadow-inner">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center">
                  <MdEco className="text-white" style={{ fontSize: 18 }} />
                </div>
                <h3 className="text-lg font-bold text-green-900">
                  Description
                </h3>
              </div>
              <p className="text-gray-800 leading-relaxed">{descriptionText}</p>
            </div>

            {hasSubServices && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center">
                    <FilterVintage
                      className="text-white"
                      style={{ fontSize: 18 }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-green-900">
                    Specialized Treatments
                  </h3>
                </div>
                <div className="grid gap-4">
                  {item.subServices.map((subService, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-r from-lime-50 via-white to-green-50 rounded-2xl p-5 border-l-4 border-lime-500 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                        <LocalFlorist
                          className="text-lime-600"
                          style={{ fontSize: 20 }}
                        />
                        {subService}
                      </h4>
                      {Array.isArray(item.description) &&
                        item.description[idx] && (
                          <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                            {item.description[idx]}
                          </p>
                        )}
                      {Array.isArray(item.benefits) && item.benefits[idx] && (
                        <div className="bg-green-100/70 rounded-xl p-3">
                          <p className="text-green-900 text-sm font-medium flex items-start gap-2">
                            <CheckCircle
                              className="text-green-600 flex-shrink-0 mt-0.5"
                              style={{ fontSize: 18 }}
                            />
                            <span>{item.benefits[idx]}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {benefitText && !hasSubServices && (
              <div className="bg-gradient-to-br from-lime-100/80 via-white to-green-100/80 rounded-2xl p-3 mb-2 border-l-4 border-green-600 shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center">
                    <Favorite className="text-white" style={{ fontSize: 18 }} />
                  </div>
                  <h3 className="text-lg font-bold text-green-900">Benefits</h3>
                </div>
                <p className="text-green-900 leading-relaxed">{benefitText}</p>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <CommonButton
                type="button"
                label="Book Appointment"
                className=" font-bold rounded-xl text-white bg-gradient-to-r from-green-600 via-lime-600 to-green-700 hover:from-green-700 hover:via-lime-700 hover:to-green-800 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                onClick={() => {
                  setOpenModal(true);
                  setSelectedService(item);
                }}
              />
            </div>
          </div>
        </Box>
      </Modal>

      {openModal && (
        <BookEventForm
          open={openModal}
          handleClose={() => {
            setOpenModal(false);
            setSelectedService(false);
          }}
          eventDetails={selectedService}
        />
      )}
    </>
  );
}

function ServiceCard({ item, index }) {
  const [modalOpen, setModalOpen] = useState(false);
  const Icon = item.icon || getServiceIcon(item.serviceName);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Lora:wght@400;500;600&display=swap');
        
        .luxury-card {
          font-family: 'Poppins', sans-serif;
        }
        
        .luxury-title {
          font-family: 'Lora', serif;
          letter-spacing: 0.01em;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
        
        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .icon-float:hover {
          animation: float 2.5s ease-in-out infinite;
        }
      `}</style>

      <div className="luxury-card h-full">
        <div className="group relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-green-100">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-lime-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400/10 via-lime-400/10 to-green-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"></div>
          <div className="relative h-full flex flex-col">
            <div className="w-full mb-4">
              {item?.image ? (
                <div className="w-full h-44 overflow-hidden relative rounded-t-2xl">
                  <img
                    src={item.image}
                    alt={item.serviceName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent"></div>
                </div>
              ) : (
                <div className="w-full h-44 flex items-center justify-center bg-gradient-to-br from-[#2a5f46] via-[#4f8f73] relative rounded-t-2xl">
                  <Icon
                    className="icon-float text-white drop-shadow-lg"
                    style={{ fontSize: 56 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 via-transparent to-transparent"></div>
                </div>
              )}
            </div>

            <div className="px-5 pb-2 flex flex-col flex-grow">
              <h3 className="luxury-title text-base font-semibold text-green-800 mb-2 group-hover:text-green-700 transition-colors duration-300">
                {item.serviceName}
              </h3>

              <p className="text-gray-600 text-xs leading-relaxed mb-2 flex-grow line-clamp-3">
                {Array.isArray(item.description)
                  ? item.description[0]
                  : item.description}
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-green-200 to-transparent mb-4"></div>
              <div className="flex justify-end">
                <button
                  onClick={() => setModalOpen(true)}
                  className="group/btn relative px-6 py-2.5 text-sm font-medium text-white bg-[#4f8f73] rounded-lg overflow-hidden transition-all duration-300  hover:from-[#2a5f46] hover:to-[#4f8f73] hover:shadow-lg hover:shadow-green-500/30"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Details
                    <ArrowForward
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                      style={{ fontSize: 16 }}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <ServiceModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          item={item}
        />
      )}
    </>
  );
}

export default function DetoxHouse() {
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    id: "all",
    label: "All Services",
    name: "All Services शोवटी टाकू",
    filterName: "All Services",
    icon: AutoAwesome,
  });

  const filteredServices = detoxServicesData.filter((service) => {
    if (selectedCategory.filterName === "All Services") return true;
    return service.filterName === selectedCategory.filterName;
  });

  const visibleServices = filteredServices.slice(0, visibleCount);
  const hasMore = visibleCount < filteredServices.length;

  const shortText = (text, max = 20) => {
    if (!text) return "";
    return text.length > max ? text.slice(0, max) + "..." : text;
  };

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 8, filteredServices.length));
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen pb-5 relative">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2a5f46] via-[#4f8f73] to-forest py-10">
        <div className="absolute inset-0 bg-pattern-subtle opacity-5" />
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] text-[#e5c76a]/20"
        >
          <Leaf className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 right-[15%] text-[#e5c76a]/15"
        >
          <Sparkles className="w-20 h-20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/3 right-[8%] text-[#5f806a]/20"
        >
          <Shield className="w-16 h-16" />
        </motion.div>

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#c9a441] font-serif text-2xl md:text-3xl  mb-4"
          >
            पंचकर्म शोधन चिकित्सा सेवा
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl font-bold text-[#e5c76a] mb-6"
          >
            Panchakarma Detox
            <span className="block mt-2 text-[#e5c76a]">Therapy Services</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-4 my-8"
          >
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#c9a441]" />

            <Leaf className="w-6 h-6 text-[#c9a441]" />

            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#c9a441]" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            <AutoTypingText
              text="Experience the ancient wisdom of Ayurveda through our authentic
            Panchakarma treatments, designed to purify, rejuvenate, and restore
            balance to your body and mind."
            />
          </motion.p>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto p-5"
      >
        <div className="bg-[#ffffff]/80 backdrop-blur-xl rounded-2xl shadow-card border border-[#567865]/30 p-4 sticky top-20 z-30 ">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Filter className="w-4 h-4 text-[#1f4f3a]" />
            </div>

            <span className="font-semibold text-[#1f4f3a]">
              Filter by Category
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              const isActive = selectedCategory.name === cat.name;

              return (
                <motion.button
                  key={cat.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
    flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
    transition-all duration-300
    ${
      isActive
        ? "bg-gradient-to-r from-[#1f4f3a] to-[#4b8b6a] text-[#ffffff] shadow-soft"
        : "bg-[#e8f4f0] text-[#1f4f3a] hover:bg-[#d4ebe3] border border-[#1f4f3a]/50"
    }
  `}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#e5c76a]" : "text-[#1f4f3a]"
                    }`}
                  />
                  <span className="whitespace-nowrap">
                    {shortText(cat.name, 20)}
                  </span>
                  {cat.subtitle && (
                    <span
                      className={`hidden sm:inline text-xs ${
                        isActive ? "text-white/70" : "text-[#5c6f67]"
                      }`}
                    >
                      {cat.subtitle}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 w-full px-6 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          {visibleServices.map((item, i) => (
            <ServiceCard key={i} item={item} index={i} />
          ))}
        </div>

        {hasMore && (
          <div className="text-center">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="
                group relative mx-auto flex items-center gap-3
                px-6 py-2
                rounded-2xl
                text-sm font-bold tracking-wide
                text-white
                bg-gradient-to-r from-[#1f4f3a] via-[#4b8b6a] to-[#1f4f3a]
                shadow-[0_12px_30px_-10px_rgba(31,79,58,0.8)]
                hover:shadow-[0_18px_40px_-12px_rgba(201,164,65,0.9)]
                transition-all duration-500
                hover:scale-[1.06]
                disabled:opacity-50
                overflow-hidden"
            >
              <span
                className="
                  absolute inset-0
                  bg-gradient-to-r from-transparent via-white/30 to-transparent
                  -translate-x-full
                  group-hover:translate-x-full
                  transition-transform duration-1000"
              />

              {isLoading ? (
                <>
                  <span className="relative w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                  <span className="relative">Loading</span>
                </>
              ) : (
                <>
                  <span className="relative">Load More</span>
                  <ExpandMoreIcon
                    className="relative transition-transform duration-500 group-hover:translate-y-1"
                    style={{ fontSize: 22 }}
                  />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-12 pt-6 border-t-2 border-green-200/50 text-center">
        <p className="text-gray-800 font-bold flex items-center justify-center gap-2">
          <MdEco className="text-green-700" style={{ fontSize: 20 }} />
          Authentic Ayurvedic treatments by experienced practitioners
        </p>
      </div>
    </div>
  );
}
