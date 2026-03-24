import ArrowForward from "@mui/icons-material/ArrowForward";
import AutoAwesome from "@mui/icons-material/AutoAwesome";
import Bloodtype from "@mui/icons-material/Bloodtype";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Favorite from "@mui/icons-material/Favorite";
import Female from "@mui/icons-material/Female";
import FilterVintage from "@mui/icons-material/FilterVintage";
import Healing from "@mui/icons-material/Healing";
import Hearing from "@mui/icons-material/Hearing";
import LocalFlorist from "@mui/icons-material/LocalFlorist";
import LocalPharmacy from "@mui/icons-material/LocalPharmacy";
import Masks from "@mui/icons-material/Masks";
import MedicalServices from "@mui/icons-material/MedicalServices";
import Opacity from "@mui/icons-material/Opacity";
import Spa from "@mui/icons-material/Spa";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Modal } from "@mui/material";
import { motion } from "framer-motion";
import {
  Filter,
  Leaf,
  Shield,
  Sparkles
} from "lucide-react";
import { useRef, useState } from "react";
import { MdEco } from "react-icons/md";
import BathingSweaterTherapyImg from "../../../assets/healingServices/detoxTherapy/BathingSweaterTherapyImg.png";
import BodyAnointingImg from "../../../assets/healingServices/detoxTherapy/BodyAnointing.png";
import BodyUnguentImg from "../../../assets/healingServices/detoxTherapy/BodyUnguent.png";
import ContinuousPouringImg from "../../../assets/healingServices/detoxTherapy/ContinuousPouring.png";
import CuppingTherapy from "../../../assets/healingServices/detoxTherapy/Cupping Therapy.png";
import DailyUnguentImg from "../../../assets/healingServices/detoxTherapy/DailyUnguent.png";
import DeepTissueFootMassageImg from "../../../assets/healingServices/detoxTherapy/Deep Tissue Foot Massage.png";
import DryBrushingImg from "../../../assets/healingServices/detoxTherapy/Dry Brushing.jpg";
import FemaleGenitalCareImg from "../../../assets/healingServices/detoxTherapy/Female Genital Cleansing.png";
import footMassageImg from "../../../assets/healingServices/detoxTherapy/footMassage.png";
import bodyMassageImg from "../../../assets/healingServices/detoxTherapy/FullBodyMassage.png";
import HerbalBolusFomentation from "../../../assets/healingServices/detoxTherapy/Herbal Bolus Fomentation.png";
import HerbalVaporInhalationImg from "../../../assets/healingServices/detoxTherapy/HerbalVaporInhalation.png";
import InstantHoneyOilEnemaImg from "../../../assets/healingServices/detoxTherapy/Instant Honey Oil Enema.png";
import InstantWealthEnemaImg from "../../../assets/healingServices/detoxTherapy/Instant Wealth Enema.png";
import LocalVeinBloodLetting from "../../../assets/healingServices/detoxTherapy/Local Vein Blood Letting.png";
import SernutatoryNasalTherapy from "../../../assets/healingServices/detoxTherapy/Sernutatory Nasal Therapy.png";
import MainBloodlettingImg from "../../../assets/healingServices/detoxTherapy/SystemicBloodlettingTherapy.png";
import TubeSteamFomentation from "../../../assets/healingServices/detoxTherapy/Tube Steam Fomentation.png";
import WashGentleCleansingImg from "../../../assets/healingServices/detoxTherapy/Wash Gentle cleansing.png";
import अक्षिघृततर्पणEyeGheeSatiating from "../../../assets/healingServices/detoxTherapy/अक्षिघृततर्पण Eye Ghee Satiating.png";
import UnguentImg from "../../../assets/healingServices/detoxTherapy/अभ्यङ्ग Unguent.png";
import अलाबुविधिCuppingwithFlaskBloodLetting from "../../../assets/healingServices/detoxTherapy/अलाबुविधि Cupping with Flask Blood Letting.png";
import BathingSweaterTherapy from "../../../assets/healingServices/detoxTherapy/अवगाहस्वेदक Bathing Sweater Therapy.png";
import आर्द्रवस्त्रस्वेदनWetClothFomentationImg from "../../../assets/healingServices/detoxTherapy/आर्द्रवस्त्रस्वेदन Wet Cloth Fomentation.png";
import आश्योतनSprinkling from "../../../assets/healingServices/detoxTherapy/आश्योतन Sprinkling.png";
import उत्सादनOilPowderMassageImg from "../../../assets/healingServices/detoxTherapy/उत्सादन Oil Powder Massage.png";
import उद्वर्तनPowderMassage from "../../../assets/healingServices/detoxTherapy/उद्वर्तन Powder Massage.png";
import WetClothFomentation from "../../../assets/healingServices/detoxTherapy/उपनाहस्वेद Wet Cloth Fomentation.png";
import ऊन्मर्दनFragranceMassageImg from "../../../assets/healingServices/detoxTherapy/ऊन्मर्दन Fragrance Massage.png";
import SingleOrganAnointingImg from "../../../assets/healingServices/detoxTherapy/एकांगलेपण Single Organ Anointing.png";
import एकांगव्रणकर्मSingleWoundTreatment from "../../../assets/healingServices/detoxTherapy/एकांगव्रणकर्म Single Wound Treatment.png";
import कदराग्निकर्मCornCauterization from "../../../assets/healingServices/detoxTherapy/कदराग्निकर्म Corn Cauterization.png";
import कर्णतर्पणEarSatiating from "../../../assets/healingServices/detoxTherapy/कर्णतर्पण Ear Satiating.png";
import कर्णपूरणEarFulfilling from "../../../assets/healingServices/detoxTherapy/कर्णपूरण Ear Fulfilling.png";
import कर्णमलEarWaxDescription from "../../../assets/healingServices/detoxTherapy/कर्णमल Ear Wax Description.png";
import कर्णशूलEarache from "../../../assets/healingServices/detoxTherapy/कर्णशूल Earache.png";
import कर्णस्त्रावEarDischarge from "../../../assets/healingServices/detoxTherapy/कर्णस्त्राव Ear Discharge.png";
import कवलKavalaHerbalMouthRinse from "../../../assets/healingServices/detoxTherapy/कवल Kavala Herbal Mouth Rinse.png";
import क्षीरधूमपानMilkSmokeInhalationtherapy from "../../../assets/healingServices/detoxTherapy/क्षीरधूमपान Milk Smoke Inhalation therapy.png";
import गण्डुषGandushaOilPulling from "../../../assets/healingServices/detoxTherapy/गण्डुष Gandusha Oil Pulling.png";
import जलौकाLeechBloodLetting from "../../../assets/healingServices/detoxTherapy/जलौका Leech Blood Letting.png";
import SatiatingImg from "../../../assets/healingServices/detoxTherapy/तर्पण Satiating.png";
import ताम्राग्निकर्मCopperCauterization from "../../../assets/healingServices/detoxTherapy/ताम्राग्निकर्म Copper Cauterization.png";
import दन्तDantaDentalCare from "../../../assets/healingServices/detoxTherapy/दन्त Danta Dental Care.png";
import दुष्टव्रणकर्मChronicWoundTreatment from "../../../assets/healingServices/detoxTherapy/दुष्टव्रणकर्म Chronic Wound Treatment.png";
import धाराOilStreamTherapy from "../../../assets/healingServices/detoxTherapy/धारा Oil Stream Therapy.png";
import धूपनIncensingTherepy from "../../../assets/healingServices/detoxTherapy/धूपन Incensing therepy.png";
import नासाधावनNasalWash from "../../../assets/healingServices/detoxTherapy/नासाधावन Nasal Wash.png";
import नेत्रतैलतर्पणEyeOilSatiating from "../../../assets/healingServices/detoxTherapy/नेत्रतैलतर्पण Eye Oil Satiating.png";
import नेत्रधाराNetraDharatherapy from "../../../assets/healingServices/detoxTherapy/नेत्रधारा NetraDhara therapy.png";
import नेत्रधावनNetraDhavan from "../../../assets/healingServices/detoxTherapy/नेत्रधावन NetraDhavan.png";
import नेत्रपिचुNetraPichu from "../../../assets/healingServices/detoxTherapy/नेत्रपिचु NetraPichu.png";
import नेत्रबस्तिNetraBasti from "../../../assets/healingServices/detoxTherapy/नेत्रबस्ति NetraBasti.png";
import नेत्रांजनNetraAnjana from "../../../assets/healingServices/detoxTherapy/नेत्रांजन NetraAnjana.png";
import नेत्राभ्यङ्गHeadUnguent from "../../../assets/healingServices/detoxTherapy/नेत्राभ्यङ्ग HeadUnguent.png";
import परिषेकस्वेदनContinuousPouring from "../../../assets/healingServices/detoxTherapy/परिषेकस्वेदन Continuous Pouring.png";
import पार्ष्णिग्निकर्मHeelCauterization from "../../../assets/healingServices/detoxTherapy/पार्ष्णिग्निकर्म Heel Cauterization.png";
import पिचुOilCottonApplication from "../../../assets/healingServices/detoxTherapy/पिचु Oil Cotton Application.png";
import पिझिच्चिलPouringTherapy from "../../../assets/healingServices/detoxTherapy/पिझिच्चिल Pouring Therapy.png";
import पुटपाकPutapak from "../../../assets/healingServices/detoxTherapy/पुटपाक Putapak.png";
import प्रच्छानScarificationBloodLetting from "../../../assets/healingServices/detoxTherapy/प्रच्छान Scarification Blood Letting.png";
import MainEnemaDetoxImg from "../../../assets/healingServices/detoxTherapy/प्रधानबस्तिकर्म Main Enema Detox.png";
import SystemicBloodletting5MinImg from "../../../assets/healingServices/detoxTherapy/प्रधानरक्तमोक्षण Systemic Bloodletting 5min.png";
import MainEmeticDetoxImg from "../../../assets/healingServices/detoxTherapy/प्रधानवमनकर्म Main Emetic Detox.png";
import प्रधानविरेचनकर्मMainLaxativeDetoxImg from "../../../assets/healingServices/detoxTherapy/प्रधानविरेचकर्मMainLaxativeDetox.png";
import MainLaxativeDetoxImg from "../../../assets/healingServices/detoxTherapy/प्रधानविरेचनकर्म Main Laxative Detox.png";
import MainLaxativeDetox5MinImg from "../../../assets/healingServices/detoxTherapy/प्रधानशिरोविरेचननस्य Main Nasal Detox 5min.png";
import MainNasalDetoxImg from "../../../assets/healingServices/detoxTherapy/प्रधानशिरोविरेचननस्य Main Nasal Detox.png";
import बस्तिOilPoolTherapyImg from "../../../assets/healingServices/detoxTherapy/बस्ति Oil Pool Therapy.png";
import बिडालकBidalak from "../../../assets/healingServices/detoxTherapy/बिडालक Bidalak.png";
import बृंहणतर्पणनस्यNourishingNasalTherapy from "../../../assets/healingServices/detoxTherapy/बृंहणतर्पणनस्य Nourishing Nasal Therapy.png";
import MardanMassageImg from "../../../assets/healingServices/detoxTherapy/मर्दन Massage.png";
import MukhaTarpanaMouthTherapy from "../../../assets/healingServices/detoxTherapy/मुखतर्पण MukhaTarpana, Mouth Therapy.png";
import मृत्तिकाग्निकर्मEarthCauterization from "../../../assets/healingServices/detoxTherapy/मृत्तिकाग्निकर्म Earth Cauterization.png";
import रुक्षवस्त्रस्वेदनDryClothFomentationImg from "../../../assets/healingServices/detoxTherapy/रुक्षवस्त्रस्वेदन Dry Cloth Fomentation.png";
import रौप्याग्निकर्मSilverCauterization from "../../../assets/healingServices/detoxTherapy/रौप्याग्निकर्म Silver Cauterization.png";
import लेपनHerbalAnointingImg from "../../../assets/healingServices/detoxTherapy/लेपन Herbal Anointing.png";
import लोहाग्निकर्मIronCauterization from "../../../assets/healingServices/detoxTherapy/लोहाग्निकर्म Iron Cauterization.png";
import HerbalSmokeInhalation from "../../../assets/healingServices/detoxTherapy/वनोषधि धूमपान Herbal Smoke Inhalation.png";
import विद्धवेधनकर्मPiercingTherapy from "../../../assets/healingServices/detoxTherapy/विद्ध - वेधन कर्म Piercing Therapy.png";
import विद्धाग्निकर्मPiercingCauterizationTherapy from "../../../assets/healingServices/detoxTherapy/विद्धाग्निकर्म Piercing Cauterization Therapy.png";
import विद्युतोषधिपोट्टलीस्वेदElectricHerbsFomenting from "../../../assets/healingServices/detoxTherapy/विद्युतोषधिपोट्टलीस्वेद Electric Herbs Fomenting.png";
import शमनतर्पणनस्यAlleviationSatiating from "../../../assets/healingServices/detoxTherapy/शमनतर्पणनस्य Alleviation Satiating.png";
import श्रृंगावचारणHornBloodLetting from "../../../assets/healingServices/detoxTherapy/श्रृंगावचारण Horn Blood Letting.png";
import संपूर्णनेत्रक्षाTotalEyeCaretherapy from "../../../assets/healingServices/detoxTherapy/संपूर्ण नेत्रक्षा Total Eye Care therapy .png";
import ConductionMassageImg from "../../../assets/healingServices/detoxTherapy/संवाहन Conduction Massage.png";
import सद्यअनुलोमनInstantPurging from "../../../assets/healingServices/detoxTherapy/सद्यअनुलोमन - InstantPurging.png";
import सद्योव्रणकर्मImmediateWoundTreatment from "../../../assets/healingServices/detoxTherapy/सद्योव्रणकर्म Immediate Wound Treatment.png";
import FullBodyOilPowderMassageImg from "../../../assets/healingServices/detoxTherapy/सर्वांगउत्सादन Full Body Oil Powder Massage.png";
import FullBodyPowderMassageImg from "../../../assets/healingServices/detoxTherapy/सर्वांगउद्वर्तन Full Body Powder Massage.png";
import FullBodyMassageImg from "../../../assets/healingServices/detoxTherapy/सर्वांगमर्दनFullBddyMassage.png";
import FullBodyAnointingImg from "../../../assets/healingServices/detoxTherapy/सर्वांगलेपन Full Body Anointing.png";
import सुवर्णाग्निकर्मGoldCauterization from "../../../assets/healingServices/detoxTherapy/सुवर्णाग्निकर्म Gold Cauterization.png";
import FemaleGenitalEnemaDetoxImg from "../../../assets/healingServices/detoxTherapy/स्त्रीउत्तरबस्ति - Female Genital Enema Detox.jpg";
import स्नैहिकधूमपानUnctuousSmokeInhalation from "../../../assets/healingServices/detoxTherapy/स्नैहिकधूमपान Unctuous Smoke Inhalation.png";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import AutoTypingText from "../../../common/hooks/AutoTypeHook";
import BookEventForm from "./DetoxBookingModal";

const FILTER = {
  ALL: "All Services",
  BATHING: "Bathing Sweater Room",
  MASSAGE: "Massage & Anointing",
  STEAM: "Steam & Incensing Therapy",
  MAIN_DETOX: "5 Main Detox Therapy",
  FEMALE: "Female Care",
  ABDOMINAL: "Abdominal Purification",
  ORGAN: "Organ Care",
  EYE: "Eye Care",
  EAR: "Ear Care",
  NASAL: "Nasal Care",
  MOUTH: "Mouth Care",
  WOUND: "Cauterization Blood Letting Piercing & Wound Therapy",
};

const detoxServicesData = [
  {
    filterName: FILTER.BATHING,
    serviceName: "सर्वगात्रपरिषेकस्वेदन Full Body Sprinkling Fomentation",
    description: "Continuous pouring of warm herbal decoction over the body.",
    benefits:
      "Deep relaxation, pain relief, detoxification, and skin nourishment.",
    price: 1500,
    image: BodyAnointingImg,
  },
  {
    filterName: FILTER.BATHING,
    serviceName: "एकांगपरिषेकस्वेदन Single Organ Sprinkling Fomentation",
    description: "Continuous pouring of warm herbal decoction over the body.",
    benefits:
      "Deep relaxation, pain relief, detoxification, and skin nourishment.",
    price: 500,
    image: BodyUnguentImg,
  },
  {
    filterName: FILTER.BATHING,
    serviceName: "सर्वगात्रअवगाहस्वेदन Bathing Sweater Therapy",
    description: "Immersion or herbal bath therapy.",
    benefits:
      "Detoxifies, relieves fatigue, hydrates skin, and relaxes muscles.",
    price: 1500,
    image: BathingSweaterTherapyImg,
  },
  {
    filterName: FILTER.BATHING,
    serviceName: "जेलवाकुट्टिवेद Dry Hot Hut Fire Fomentation",
    description: "Specific herbal steam therapy using traditional methods.",
    benefits:
      "Detoxifies, relieves joint and muscle stiffness, rejuvenates tissues.",
    price: "500/Per",
    image: HerbalVaporInhalationImg,
  },
  {
    filterName: FILTER.MASSAGE,
    serviceName: "सर्वगात्रअभ्यङ्ग Full Body Unguent",
    description:
      "Gentle, rhythmic oil massage over the whole body; head and face are treated separately.",
    benefits:
      "Improves circulation, nourishes skin, relaxes muscles, balances Doshas, and enhances overall body vitality.",
    price: 1500,
    image: bodyMassageImg,
  },
  {
    filterName: FILTER.MASSAGE,
    serviceName: "एकांगअभ्यङ्ग Single Organ Unguent",
    description: "Gentle, rhythmic oil massage over the single organ.",
    benefits:
      "Improves circulation, nourishes skin, relaxes muscles, balances Doshas, and enhances overall body vitality.",
    price: 500,
    image: ContinuousPouringImg,
  },
  {
    filterName: FILTER.MASSAGE,
    serviceName: "नित्यम्भ्यङ्ग Daily Unguent",
    description: "Daily oil application for regular nourishment.",
    benefits:
      "Maintains skin suppleness, prevents dryness, and supports joint and muscular health.",
    price: 1200,
    image: DailyUnguentImg,
  },
  {
    filterName: FILTER.MASSAGE,
    serviceName: "कांस्यथालिपादाभ्यङ्ग Bronze Plate Foot Unguent",
    description: "Foot massage using bronze plate technique.",
    benefits:
      "Improves foot circulation, relieves fatigue, strengthens lower limbs, and stimulates reflex points.",
    price: 200,
    image: footMassageImg,
  },
  {
    filterName: FILTER.MASSAGE,
    serviceName: "सर्वांगमर्दन Full Body Massage",
    description: "Deep tissue full-body massage.",
    benefits:
      "Reduces muscular tension, improves circulation, detoxifies tissues, and enhances flexibility.",
    price: 1500,
    image: FullBodyMassageImg,
  },
  {
    filterName: FILTER.MASSAGE,
    serviceName: "सर्वांगउद्वर्तन Full Body Powder Massage",
    description: "Massage using therapeutic powders.",
    benefits:
      "Exfoliates skin, improves blood circulation, detoxifies, and revitalizes the body.",
    price: 1500,
    image: FullBodyPowderMassageImg,
  },
  {
    filterName: FILTER.MASSAGE,
    serviceName: "सर्वांगउत्सादन Full Body Oil Powder Massage",
    description: "Combination of oil and powder massage.",
    benefits:
      "Deeply nourishes skin, relaxes muscles, detoxifies, and restores vitality.",
    price: 1500,
    image: FullBodyOilPowderMassageImg,
  },
  {
    filterName: FILTER.MASSAGE,
    serviceName: "सर्वांगलेपन Full Body Anointing",
    description:
      "Application of powders, food-based pastes, or medicinal pastes on body.",
    benefits:
      "Nourishes skin, detoxifies, enhances healing, and improves skin texture.",
    price: 1500,
    image: FullBodyAnointingImg,
  },
  {
    filterName: FILTER.MASSAGE,
    serviceName: "एकांगलेपण Single Organ Anointing",
    description:
      "Application of powders, food-based pastes, or medicinal pastes on single organ.",
    benefits:
      "Nourishes skin, detoxifies, enhances healing, and improves skin texture.",
    price: 500,
    image: SingleOrganAnointingImg,
  },
  {
    filterName: FILTER.STEAM,
    serviceName: "प्रधानवमनकर्म Main Emetic Detox",
    description:
      "Therapeutic vomiting under physician supervision using ghee and medicine. (10-day program includes preparatory therapies: digestive medicines, internal oleation, 3 sessions of external oleation, steam fomentation; main therapy; post-therapy & extra hospital stay/meal charges)",
    benefits:
      "Eliminates excess Kapha, cleanses stomach, enhances digestion, strengthens metabolism, and prepares body for detoxification.",
    price: "7 days - ₹13,000 Package",
    image: MainEmeticDetoxImg,
  },
  {
    filterName: FILTER.STEAM,
    serviceName: "प्रधानविरेचनकर्म Main Laxative Detox",
    description:
      "Therapeutic purgation under physician supervision using ghee and medicine. (10-day program includes preparatory therapies: digestive medicines, internal oleation, 3 sessions of external oleation, steam fomentation; main therapy; post-therapy & extra hospital stay/meal charges)",
    benefits:
      "Cleanses intestines, removes Pitta-related toxins, improves bowel function, balances digestive fire, and detoxifies the body.",
    price: "7 days - ₹13,000 Package",
    image: MainLaxativeDetoxImg,
  },
  {
    filterName: FILTER.STEAM,
    serviceName: "प्रधानबस्तिकर्म Main Enema Detox",
    description:
      "Under physician supervision, a sequence of medicated enemas is administered for several days as part of a 7-day detox program. Includes Deepan-Pachan (digestive preparation), Snehana (oleation), Swedana (steam therapy), followed by main Basti course and post-care phase. (Additional inpatients stay and food charges apply.)",
    benefits:
      "Deeply cleanses the colon, pacifies Vata Dosha, improves digestion, strengthens the lower back, and nourishes the body tissues.",
    price: "7 days - ₹14,000 Package",
    image: MainEnemaDetoxImg,
  },
  {
    filterName: FILTER.STEAM,
    serviceName: "प्रधानशिरोविरेचननस्य Main Nasal Detox",
    description:
      "Guided nasal cleansing using medicated oils or decoctions under supervision.",
    benefits:
      "Clears nasal passages, reduces sinus congestion, improves smell and respiratory health.",
    price: "7 days - ₹12,000",
    image: MainNasalDetoxImg,
  },
  {
    filterName: FILTER.STEAM,
    serviceName: "प्रधानरक्तमोक्षण Systemic Bloodletting",
    description:
      "Whole-body bloodletting therapy under physician supervision to remove impure blood and balance Doshas. (Package includes preparatory therapies, main procedure, and post-care; additional stay and food charges apply)",
    benefits:
      "Detoxifies blood, improves circulation, balances Doshas, reduces inflammation, and promotes overall vitality.",
    price: "7 days - ₹12,000 Package",
    image: MainBloodlettingImg,
  },
  {
    filterName: FILTER.MAIN_DETOX,
    serviceName: "प्रधानविरेचकर्म Main Laxative Detox",
    description:
      "Therapeutic purgation under physician supervision using ghee and medicine. (10-day program includes preparatory therapies: digestive medicines, internal oleation, 3 sessions of external oleation, steam fomentation; main therapy; post-therapy & extra hospital stay/meal charges)",
    benefits:
      "Cleanses intestines, removes Pitta-related toxins, improves bowel function, balances digestive fire, and detoxifies the body.",
    price: "7 days - ₹13,000 Package",
    image: प्रधानविरेचनकर्मMainLaxativeDetoxImg,
  },
  {
    filterName: FILTER.MAIN_DETOX,
    serviceName: "प्रधानशिरोविरेचननस्य Main Nasal Detox (5 min)",
    description:
      "Guided nasal cleansing using medicated oils or decoctions under supervision.",
    benefits:
      "Clears nasal passages, reduces sinus congestion, improves smell and respiratory health.",
    price: "7 days - ₹12,000",
    image: MainLaxativeDetox5MinImg,
  },
  {
    filterName: FILTER.MAIN_DETOX,
    serviceName: "प्रधानरक्तमोक्षण Systemic Bloodletting (5 min)",
    description:
      "Whole-body bloodletting therapy under physician supervision to remove impure blood and balance Doshas. (Package includes preparatory therapies, main procedure, and post-care; additional stay and food charges apply)",
    benefits:
      "Detoxifies blood, improves circulation, balances Doshas, reduces inflammation, and promotes overall vitality.",
    price: "7 days - ₹12,000 Package",
    image: SystemicBloodletting5MinImg,
  },
  {
    filterName: FILTER.FEMALE,
    serviceName: "स्त्रीउत्तरबस्ति Female Genital Enema Detox",
    description:
      "Specialized Ayurvedic detox procedure for female reproductive system. Includes internal oleation, external oil massage, medicated enema, and localized therapies as per physician's guidance. (Package with full procedure and follow-up; additional stay and food charges apply)",
    benefits:
      "Enhances reproductive health, improves fertility, balances hormones, supports uterine health, and detoxifies the genito-urinary system.",
    price: "₹14,000 Package",
    image: FemaleGenitalEnemaDetoxImg,
  },
  {
    filterName: FILTER.FEMALE,
    serviceName:
      "स्त्रीङ्गरक्षा Female Genital Care (योनिधावन Cleansing · योनिधूपन Fumigation · योनिपिचु Oil Application · योनिपूरण Filling Therapy)",
    description:
      "External cleansing of female genital area using herbal decoctions and medicated oils. Fumigation therapy with herbal vapors and medicated ghee for female genital area. Application of warm medicated oil-soaked cotton swab over the genital region. Gentle instillation of herbal oils or medicated ghee under supervision.",
    benefits:
      "Maintains hygiene, prevents infections, promotes local circulation, and supports overall reproductive wellness. Reduces infection risk, enhances healing, balances Doshas, and promotes rejuvenation. Nourishes tissues, strengthens local organs, and supports fertility. Lubricates channels, strengthens reproductive tissues, and balances local energy.",
    price: "₹1,900",
    image: FemaleGenitalCareImg,
  },
  {
    filterName: FILTER.ABDOMINAL,
    serviceName: "सद्यअनुलोमन Instant Purging",
    description:
      "Single-day mild purgation using small doses of medicine to relieve constipation or minor bowel obstruction.",
    benefits:
      "Quick relief from constipation, clears bowel obstruction, balances Pitta and Vata, improves elimination, and restores digestive harmony.",
    price: "₹1,000",
    image: सद्यअनुलोमनInstantPurging,
  },
  {
    filterName: FILTER.ABDOMINAL,
    serviceName: "सद्यमात्राबस्ति Instant Wealth Enema",
    description:
      "Single-day mild enema for constipation relief and light detox.",
    benefits: "Gives instant bowel clearance and comfort.",
    price: "₹1,500",
    image: InstantWealthEnemaImg,
  },
  {
    filterName: FILTER.ABDOMINAL,
    serviceName: "सद्यमाधुतैलीकबस्ति Instant Honey Oil Enema",
    description: "One-day honey-oil enema for mild detox and nourishment.",
    benefits: "Quick cleansing and lubrication of colon.",
    price: "₹1,700",
    image: InstantHoneyOilEnemaImg,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "तर्पण Satiating",
    description: "Medicated oil retention.",
    benefits:
      "Nourishes tissues, improves functions and health of organ, relaxes muscles.",
    price: "₹1,500",
    image: SatiatingImg,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "धावन Wash",
    description: "Gentle cleansing.",
    benefits: "Detoxifies, prepares for main therapy, refreshes skin.",
    price: "₹500",
    image: WashGentleCleansingImg,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "अभ्यङ्ग Unguent",
    description: "Rhythmic oil massage.",
    benefits: "Improves circulation, eases stiffness, relieves tension.",
    price: "₹300",
    image: UnguentImg,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "संवाहन Conduction Massage",
    description: "Perfect conduction massage.",
    benefits: "Stimulates energy channels, improves blood flow.",
    price: "₹300",
    image: ConductionMassageImg,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "मर्दन Massage",
    description: "Deep tissue massage.",
    benefits: "Relieves muscular tension, improves mobility.",
    price: "₹300",
    image: MardanMassageImg,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "पादाघात Deep Tissue Foot Massage",
    description: "Deep tissue foot massage.",
    benefits: "Improves circulation, relaxes muscles, reduces fatigue.",
    price: "₹300",
    image: DeepTissueFootMassageImg,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "उद्वर्तन Powder Massage",
    description: "Powder massage.",
    benefits: "Refreshes skin, relieves tension, enhances energy flow.",
    price: "₹300",
    image: उद्वर्तनPowderMassage,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "उत्सादन Oil Powder Massage",
    description: "Combined oil & powder massage.",
    benefits: "Nourishes tissues, eases stiffness, improves flexibility.",
    price: "₹300",
    image: उत्सादनOilPowderMassageImg,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "ऊन्मर्दन Fragrance Massage",
    description: "Aromatic massage.",
    benefits: "Reduces stress, relaxes muscles, enhances well-being.",
    price: "₹300",
    image: ऊन्मर्दनFragranceMassageImg,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "उद्घर्षण Dry Brushing",
    description: "Dry brushing.",
    benefits: "Exfoliates skin, stimulates circulation, relaxes muscles.",
    price: "₹300",
    image: DryBrushingImg,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "नाडीबाष्पस्वेदन Tube Steam Fomentation",
    description: "Tube steam fomentation.",
    benefits: "Detoxifies tissues, opens energy pathways, reduces stiffness.",
    price: "₹500",
    image: TubeSteamFomentation,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "पिंडस्वेद Herbal Bolus Fomentation",
    description: "Herbal bolus massage/fomentation.",
    benefits:
      "Relieves deep fatigue, reduces muscular pain, improves flexibility.",
    price: "₹750",
    image: HerbalBolusFomentation,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "सेक:पिझिच्चिल Pouring Therapy",
    description: "Pouring medicated liquids.",
    benefits: "Soothes muscles, relieves stiffness, improves circulation.",
    price: "₹750",
    image: पिझिच्चिलPouringTherapy,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "परिषेकस्वेदन Continuous Pouring",
    description: "Continuous pouring of medicated liquids.",
    benefits: "Deep relaxation, nourishes tissues, improves energy flow.",
    price: "₹500",
    image: परिषेकस्वेदनContinuousPouring,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "अवगाहस्वेदक Bathing Sweater Therapy",
    description: "Warm medicated fomentation.",
    benefits: "Detoxifies, relaxes muscles, improves circulation.",
    price: "₹750",
    image: BathingSweaterTherapy,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "उपनाहस्वेद Wet Cloth Fomentation",
    description: "Wet cloth fomentation.",
    benefits: "Reduces inflammation, soothes muscles.",
    price: "₹500",
    image: WetClothFomentation,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "धारा Oil Stream Therapy",
    description: "Steady stream of medicated oil.",
    benefits: "Nourishes tissues, relieves pain, and improves flexibility.",
    price: "₹500",
    image: धाराOilStreamTherapy,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "पिचु Oil Cotton Application",
    description: "Cotton soaked in medicated oil.",
    benefits: "Localized relief alleviates tension and stiffness.",
    price: "₹500",
    image: पिचुOilCottonApplication,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "बस्ति Oil Pool Therapy",
    description: "Oil pooling therapy.",
    benefits: "Deep tissue nourishment, relieves stiffness.",
    price: "₹750",
    image: बस्तिOilPoolTherapyImg,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "लेपन Herbal Anointing",
    description: "Herbal paste or medicated application.",
    benefits: "Improves tissue health, alleviating soreness.",
    price: "₹500",
    image: लेपनHerbalAnointingImg,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "आर्द्रवस्त्रस्वेदन Wet Cloth Fomentation",
    description: "Wet cloth fomentation.",
    benefits: "Reduces inflammation, eases stiffness.",
    price: "₹300",
    image: आर्द्रवस्त्रस्वेदनWetClothFomentationImg,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "रुक्षवस्त्रस्वेदन Dry Cloth Fomentation",
    description: "Dry cloth fomentation.",
    benefits: "Stimulates circulation, relaxes muscles.",
    price: "₹300",
    image: रुक्षवस्त्रस्वेदनDryClothFomentationImg,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "विद्युतोषधिपोट्टलीस्वेद Electric Herbs Fomenting",
    description: "Herbal bolus with mild electric heat.",
    benefits: "Deep relaxation, pain relief, improves circulation.",
    price: "₹300",
    image: विद्युतोषधिपोट्टलीस्वेदElectricHerbsFomenting,
  },
  {
    filterName: FILTER.ORGAN,
    serviceName: "धूपन Incensing",
    description: "Herbal smoke therapy.",
    benefits: "Refreshes mind and body, relieves tension.",
    price: "₹300",
    image: धूपनIncensingTherepy,
  },
  {
    filterName: FILTER.EYE,
    serviceName: "संपूर्णनेत्रक्षा Total Eye Care",
    description:
      "Complete eye care therapy combining multiple Ayurvedic eye treatments.",
    benefits:
      "Comprehensive nourishment and care for the eyes, improving vision and overall eye health.",
    price: "₹1,500",
    image: संपूर्णनेत्रक्षाTotalEyeCaretherapy,
  },
  {
    filterName: FILTER.EYE,
    serviceName: "अक्षिघृततर्पण Eye Ghee Satiating",
    description: "Medicated ghee poured over the eyes.",
    benefits:
      "Nourishes eyes, improves vision clarity, reduces eye strain and dryness.",
    price: "₹500",
    image: अक्षिघृततर्पणEyeGheeSatiating,
  },
  {
    filterName: FILTER.EYE,
    serviceName: "नेत्रतैलतर्पण Eye Oil Satiating",
    description: "Eye nourishment therapy using medicated oils.",
    benefits: "Strengthens ocular tissues, improves eyesight, reduces fatigue.",
    price: "₹300",
    image: नेत्रतैलतर्पणEyeOilSatiating,
  },
  {
    filterName: FILTER.EYE,
    serviceName: "नेत्राभ्यङ्ग Eye Head Unguent",
    description: "Gentle massage around eyes and forehead with medicated oils.",
    benefits: "Relieves tension, improves circulation, reduces eye strain.",
    price: "₹300",
    image: नेत्राभ्यङ्गHeadUnguent,
  },
  {
    filterName: FILTER.EYE,
    serviceName: "नेत्रधारा NetraDhara",
    description: "Continuous flow of medicated liquid over eyes.",
    benefits: "Improves tear secretion, relieves dryness, and reduces redness.",
    price: "₹300",
    image: नेत्रधाराNetraDharatherapy,
  },
  {
    filterName: FILTER.EYE,
    serviceName: "नेत्रपिचु NetraPichu",
    description: "Medicated cotton placed on eyes.",
    benefits:
      "Reduces inflammation, soothes irritation, and improves eye health.",
    price: "₹300",
    image: नेत्रपिचुNetraPichu,
  },
  {
    filterName: FILTER.EYE,
    serviceName: "नेत्रबस्ति NetraBasti",
    description:
      "Medicated liquid retained around eyes in a well-made boundary.",
    benefits:
      "Nourishes cornea, relieves chronic eye conditions, improves vision.",
    price: "₹300",
    image: नेत्रबस्तिNetraBasti,
  },
  {
    filterName: FILTER.EYE,
    serviceName: "नेत्रधावन NetraDhavan",
    description: "Eye washing with herbal decoctions.",
    benefits: "Cleanses eyes, reduces infections, refreshes eyes.",
    price: "₹300",
    image: नेत्रधावनNetraDhavan,
  },
  {
    filterName: FILTER.EYE,
    serviceName: "नेत्रांजन NetraAnjana",
    description: "Herbal collyrium applied to eyes.",
    benefits: "Strengthens eyesight, reduces eye strain, prevents infections.",
    price: "₹300",
    image: नेत्रांजनNetraAnjana,
  },
  {
    filterName: FILTER.EYE,
    serviceName: "आश्योतन Sprinkling",
    description: "Herbal water sprinkled over eyes.",
    benefits: "Refreshes eyes, relieves fatigue, promotes ocular health.",
    price: "₹300",
    image: आश्योतनSprinkling,
  },
  {
    filterName: FILTER.EYE,
    serviceName: "बिडालक Bidalak",
    description: "Specialized herbal eye treatment.",
    benefits: "Reduces redness, eye irritation, improves vision.",
    price: "₹300",
    image: बिडालकBidalak,
  },
  {
    filterName: FILTER.EYE,
    serviceName: "पुटपाक Putapak",
    description: "Warm herbal compress over eyes.",
    benefits:
      "Relieves eye strain, improves blood circulation, reduces puffiness.",
    price: "₹300",
    image: पुटपाकPutapak,
  },
  {
    filterName: FILTER.EAR,
    serviceName: "कर्णतर्पण Ear Satiating",
    description: "Medicated oil retention over the ears.",
    benefits:
      "Nourishes ear tissues, reduces earache, improves hearing and ear health.",
    price: "₹750",
    image: कर्णतर्पणEarSatiating,
  },
  {
    filterName: FILTER.EAR,
    serviceName: "कर्णपूरण Ear Fulfilling",
    description: "Filling ears with medicated oils or herbal preparations.",
    benefits:
      "Treats ear dryness, prevents infections, strengthens auditory function.",
    price: "₹300",
    image: कर्णपूरणEarFulfilling,
  },
  {
    filterName: FILTER.EAR,
    serviceName: "कर्णशूल Earache Treatment",
    description: "Therapeutic treatment for ear pain.",
    benefits: "Relieves earache, reduces inflammation, soothes ear discomfort.",
    price: "₹300",
    image: कर्णशूलEarache,
  },
  {
    filterName: FILTER.EAR,
    serviceName: "कर्णस्त्राव Ear Discharge Treatment",
    description: "Treatment for ear discharge.",
    benefits:
      "Reduces excessive discharge, treats infections, maintains ear hygiene.",
    price: "₹300",
    image: कर्णस्त्रावEarDischarge,
  },
  {
    filterName: FILTER.EAR,
    serviceName: "कर्णमल Ear Wax Removal",
    description: "Ear cleansing and detoxifying procedure.",
    benefits:
      "Removes wax, prevents blockages, improves ear hygiene and comfort.",
    price: "₹300",
    image: कर्णमलEarWaxDescription,
  },
  {
    filterName: FILTER.NASAL,
    serviceName: "बृंहणतर्पणनस्य Nourishing Nasal Therapy",
    description: "Nourishing nasal therapy with medicated oils.",
    benefits:
      "Strengthens nasal tissues, reduces dryness, enhances olfactory function.",
    price: "₹500",
    image: बृंहणतर्पणनस्यNourishingNasalTherapy,
  },
  {
    filterName: FILTER.NASAL,
    serviceName: "शमनतर्पणनस्य Alleviation Satiating",
    description: "Soothing nasal therapy using herbal oils.",
    benefits:
      "Reduces inflammation, eases nasal irritation, supports respiratory wellness.",
    price: "₹500",
    image: शमनतर्पणनस्यAlleviationSatiating,
  },
  {
    filterName: FILTER.NASAL,
    serviceName:
      "मर्श / प्रतिमर्श / नावन / अवपीड़ / प्रधमन / नस्य Sernutatory Nasal Therapy",
    description:
      "Herbal nasal application and cleansing. Gentle repeat nasal application.",
    benefits:
      "Maintains nasal hygiene, prevents recurrent congestion, supports overall nasal health. Reduces sinus pressure, enhances nasal circulation, relieves headache. Relieves sinus pressure, detoxifies nasal passages, improves airflow. Thorough detoxification, clears mucus accumulation, supports respiratory immunity.",
    price: "₹500",
    image: SernutatoryNasalTherapy,
  },
  {
    filterName: FILTER.NASAL,
    serviceName: "स्नैहिकधूमपान Unctuous Smoke Inhalation",
    description: "Medicated herbal smoke inhalation.",
    benefits:
      "Relieves nasal dryness, strengthens sinus mucosa, detoxifies nasal passages.",
    price: "₹300",
    image: स्नैहिकधूमपानUnctuousSmokeInhalation,
  },
  {
    filterName: FILTER.NASAL,
    serviceName: "क्षीरधूमपान Milk Smoke Inhalation",
    description: "Milk-based medicated smoke inhalation.",
    benefits:
      "Soothes irritation, nourishes nasal tissues, enhances breathing.",
    price: "₹300",
    image: क्षीरधूमपानMilkSmokeInhalationtherapy,
  },
  {
    filterName: FILTER.NASAL,
    serviceName: "वनोषधि धूमपान Herbal Smoke Inhalation",
    description: "Herbal smoke inhalation for nasal wellness.",
    benefits:
      "Detoxifies, relieves sinus congestion, improves respiratory function.",
    price: "₹300",
    image: HerbalSmokeInhalation,
  },
  {
    filterName: FILTER.NASAL,
    serviceName: "नासाधावन Nasal Wash",
    description: "Herbal nasal wash.",
    benefits:
      "Cleanses nasal cavity, reduces infection risk, refreshes nasal mucosa.",
    price: "₹300",
    image: नासाधावनNasalWash,
  },
  {
    filterName: FILTER.MOUTH,
    serviceName: "मुखतर्पण MukhaTarpana / Mouth Therapy",
    description:
      "Retention of medicated ghee or herbal oils in the oral cavity.",
    benefits:
      "Strengthens oral tissues, improves dental and gum health, soothes mouth discomfort.",
    price: "₹750",
    image: MukhaTarpanaMouthTherapy,
  },
  {
    filterName: FILTER.MOUTH,
    serviceName: "गण्डुष Gandusha / Oil Pulling",
    description: "Gargling and holding medicated oils in the mouth.",
    benefits:
      "Detoxifies oral cavity, improves gum health, reduces dental issues.",
    price: "₹300",
    image: गण्डुषGandushaOilPulling,
  },
  {
    filterName: FILTER.MOUTH,
    serviceName: "कवल Kavala / Herbal Mouth Rinse",
    description: "Rinsing mouth with herbal decoctions.",
    benefits: "Maintains oral hygiene, reduces bad breath, strengthens gums.",
    price: "₹300",
    image: कवलKavalaHerbalMouthRinse,
  },
  {
    filterName: FILTER.MOUTH,
    serviceName: "दन्त Danta / Dental Care",
    description: "Ayurvedic dental procedures.",
    benefits: "Cleans teeth, prevents decay, strengthens enamel and gums.",
    price: "₹300",
    image: दन्तDantaDentalCare,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "सुवर्णाग्निकर्म Gold Cauterization",
    description: "Thermal therapy using gold for localized application.",
    benefits:
      "Promotes tissue healing, relieves chronic pain, enhances energy flow, and reduces inflammation.",
    price: "₹250/Per",
    image: सुवर्णाग्निकर्मGoldCauterization,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "रौप्याग्निकर्म Silver Cauterization",
    description: "Thermal therapy using silver.",
    benefits:
      "Anti-inflammatory, improves circulation, detoxifies locally, and supports wound healing.",
    price: "₹200/Per",
    image: रौप्याग्निकर्मSilverCauterization,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "ताम्राग्निकर्म Copper Cauterization",
    description: "Thermal therapy using copper.",
    benefits:
      "Relieves joint pain, improves circulation, and detoxifies locally.",
    price: "₹200/Per",
    image: ताम्राग्निकर्मCopperCauterization,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "लोहाग्निकर्म Iron Cauterization",
    description: "Thermal therapy using iron.",
    benefits:
      "Supports bone and muscle strength, relieves pain, and improves tissue metabolism.",
    price: "₹200/Per",
    image: लोहाग्निकर्मIronCauterization,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "मृत्तिकाग्निकर्म Earth Cauterization",
    description: "Thermal therapy using clay.",
    benefits:
      "Relieves local inflammation, reduces stiffness, and detoxifies tissues.",
    price: "₹200/Per",
    image: मृत्तिकाग्निकर्मEarthCauterization,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "पार्ष्णिग्निकर्म Heel Cauterization",
    description: "Heel-focused thermal therapy.",
    benefits: "Relieves heel pain, plantar fasciitis, and local stiffness.",
    price: "₹200/Per",
    image: पार्ष्णिग्निकर्मHeelCauterization,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "कदराग्निकर्म Corn Cauterization",
    description: "Thermal therapy for corns.",
    benefits:
      "Softens and removes corns, relieves pain, and prevents recurrence.",
    price: "₹200/Per",
    image: कदराग्निकर्मCornCauterization,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "स्थानिक सिरावेध रक्तमोक्षण Local Vein Blood Letting",
    description:
      "Targeted bloodletting on specific body areas using traditional methods.",
    benefits:
      "Reduces local inflammation, relieves pain, improves circulation, and detoxifies specific regions.",
    price: "₹1,000",
    image: LocalVeinBloodLetting,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "प्रच्छान Scarification Blood Letting",
    description: "Minor skin pricking to release stagnant blood and toxins.",
    benefits:
      "Relieves localized congestion, improves blood flow, and promotes healing.",
    price: "₹1,000",
    image: प्रच्छानScarificationBloodLetting,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "श्रृंगावचारण Horn Blood Letting",
    description:
      "Application of specialized horn instrument for controlled bloodletting.",
    benefits:
      "Enhances local detox, reduces inflammation, and stimulates tissue healing.",
    price: "₹1,000",
    image: श्रृंगावचारणHornBloodLetting,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "अलाबुविधि Cupping with Flask Blood Letting",
    description:
      "Traditional flask therapy for bloodletting using vacuum suction.",
    benefits:
      "Stimulates circulation, reduces stagnation, and helps in musculoskeletal and skin issues.",
    price: "₹1,000",
    image: अलाबुविधिCuppingwithFlaskBloodLetting,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "जलौका Leech Blood Letting",
    description: "Application of medicinal leeches to affected areas.",
    benefits:
      "Removes impure blood, reduces swelling, alleviates pain, and improves circulation.",
    price: "₹250/Per leech",
    image: जलौकाLeechBloodLetting,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "Cupping Therapy",
    description:
      "Application of glass or bamboo cups with suction on affected areas.",
    benefits:
      "Relieves muscle tension, improves blood flow, detoxifies, and promotes relaxation.",
    price: "₹250/Per",
    image: CuppingTherapy,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "विद्ध वेधन कर्म Piercing Therapy",
    description:
      "Small puncture therapy to release impure blood from localized areas.",
    benefits:
      "Helps in pain relief, detoxification, and faster healing of minor disorders.",
    price: "₹250/Per",
    image: विद्धवेधनकर्मPiercingTherapy,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "विद्धाग्निकर्म Piercing Cauterization Therapy",
    description: "Puncture-based thermal therapy.",
    benefits: "Effective for abscesses, localized swelling, and chronic pain.",
    price: "₹200/Per",
    image: विद्धाग्निकर्मPiercingCauterizationTherapy,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "एकांगव्रणकर्म Single Wound Treatment",
    description: "Localized wound care for a single wound.",
    benefits: "Promotes healing, prevents infection, aids tissue repair.",
    price: "₹250/Per",
    image: एकांगव्रणकर्मSingleWoundTreatment,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "सद्योव्रणकर्म Immediate Wound Treatment",
    description: "Immediate care for fresh wounds.",
    benefits: "Stops bleeding, prevents infection, supports fast healing.",
    price: "₹250/Per",
    image: सद्योव्रणकर्मImmediateWoundTreatment,
  },
  {
    filterName: FILTER.WOUND,
    serviceName: "दुष्टव्रणकर्म Chronic Wound Treatment",
    description: "Care for chronic, non-healing wounds.",
    benefits: "Helps debridement, promotes healing of difficult wounds.",
    price: "₹1,500/Per",
    image: दुष्टव्रणकर्मChronicWoundTreatment,
  },
];

const categories = [
  {
    id: "massage",
    label: "Massage & Anointing",
    name: "अभ्यंग मर्दन एवं लेपन  Massage & Anointing",
    filterName: FILTER.MASSAGE,
    icon: Spa,
  },
  {
    id: "steam",
    label: "Steam & Incensing Therapy",
    name: "स्वेदन एवं धूपन चिकित्सा Steam & Incensing Therapy",
    filterName: FILTER.STEAM,
    icon: Opacity,
  },
  {
    id: "detox",
    label: "Detox Therapy",
    name: "शोधन चिकित्सा Detox Therapy",
    filterName: FILTER.BATHING,
    icon: LocalPharmacy,
  },
  {
    id: "mainDetox",
    label: "5 Main Detox Therapy",
    name: "पंचप्रधान शोधन चिकित्साकर्म 5 Main Detox Therapy",
    filterName: FILTER.MAIN_DETOX,
    icon: LocalPharmacy,
  },
  {
    id: "female",
    label: "Female Care",
    name: "स्त्रीरक्षा Female Care",
    filterName: FILTER.FEMALE,
    icon: Female,
  },
  {
    id: "abdominal",
    label: "Abdominal Purification",
    name: "उदरशुद्धी Abdominal Purification",
    filterName: FILTER.ABDOMINAL,
    icon: Healing,
  },
  {
    id: "organ",
    label: "Organ Care",
    name: "इन्द्रियावयवरक्षा Organ Care",
    filterName: FILTER.ORGAN,
    icon: LocalPharmacy,
  },
  {
    id: "ear",
    label: "Ear Care",
    name: "कर्णरक्षा Ear Care",
    filterName: FILTER.EAR,
    icon: Hearing,
  },
  {
    id: "nasal",
    label: "Nasal Care",
    name: "नासारक्षा Nasal Care",
    filterName: FILTER.NASAL,
    icon: Masks,
  },
  {
    id: "mouth",
    label: "Mouth Care",
    name: "मुखरक्षा Mouth Care",
    filterName: FILTER.MOUTH,
    icon: MedicalServices,
  },
  {
    id: "bloodWound",
    label: "Cauterization Blood Letting Piercing & Wound Therapy",
    name: "अग्निे, रक्तमोक्षण, विद्ध, विद्धाग्निे एवं व्रणकर्म Cauterization Blood Letting Piercing & Wound Therapy",
    filterName: FILTER.BLOOD_WOUND,
    icon: Bloodtype,
  },
  {
    id: "all",
    label: "All Services",
    name: "All Services",
    filterName: FILTER.ALL,
    icon: AutoAwesome,
  },
];

function ServiceModal({ open, onClose, item }) {
  const backdropRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  if (!open || !item) return null;

  const hasSubServices = item?.subServices && item.subServices.length > 0;
  const benefitText = item?.benefits || "";
  const descriptionText = Array.isArray(item?.description)
    ? item.description[0]
    : item?.description;

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: { xs: 2, sm: 3, md: 4 },
          }}
          ref={backdropRef}
          className="w-[95%] sm:w-[85%] md:w-[72%] lg:w-[60%] max-h-[92vh] overflow-y-auto rounded-xl"
        >
          <CancelButtonModal onClick={onClose} />

          <div className="flex flex-wrap gap-1 items-start bg-lime-200/70 rounded-xl px-3 py-2 mb-3 shadow-inner">
            <span className="text-sm sm:text-base font-semibold text-green-900">
              Service:
            </span>
            <span className="text-sm sm:text-base font-semibold text-green-900 leading-snug">
              {item.serviceName}
            </span>
          </div>

          {descriptionText && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 mb-3 border border-green-200 shadow-inner">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center flex-shrink-0">
                  <MdEco className="text-white text-sm" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-green-900">
                  Description
                </h3>
              </div>
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                {descriptionText}
              </p>
            </div>
          )}

          {hasSubServices && (
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center flex-shrink-0">
                  <FilterVintage
                    className="text-white"
                    style={{ fontSize: 16 }}
                  />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-green-900">
                  Specialized Treatments
                </h3>
              </div>
              <div className="grid gap-3">
                {item.subServices.map((subService, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-lime-50 via-white to-green-50 rounded-2xl p-4 border-l-4 border-lime-500 shadow-md"
                  >
                    <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <LocalFlorist
                        className="text-lime-600"
                        style={{ fontSize: 18 }}
                      />
                      {subService}
                    </h4>
                    {Array.isArray(item.description) &&
                      item.description[idx] && (
                        <p className="text-gray-700 text-xs sm:text-sm mb-3 leading-relaxed">
                          {item.description[idx]}
                        </p>
                      )}
                    {Array.isArray(item.benefits) && item.benefits[idx] && (
                      <div className="bg-green-100/70 rounded-xl p-3">
                        <p className="text-green-900 text-xs sm:text-sm font-medium flex items-start gap-2">
                          <CheckCircle
                            className="text-green-600 flex-shrink-0 mt-0.5"
                            style={{ fontSize: 16 }}
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
            <div className="bg-gradient-to-br from-lime-100/80 via-white to-green-100/80 rounded-2xl p-3 mb-3 border-l-4 border-green-600 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center flex-shrink-0">
                  <Favorite className="text-white" style={{ fontSize: 16 }} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-green-900">
                  Benefits
                </h3>
              </div>
              <p className="text-green-900 text-sm sm:text-base leading-relaxed">
                {benefitText}
              </p>
            </div>
          )}

          <div className="flex justify-end mt-4 sm:mt-5">
            <CommonButton
              type="button"
              label="Book Therapy"
              className="text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 text-sm sm:text-base"
              onClick={() => {
                setOpenModal(true);
                setSelectedService(item);
              }}
            />
          </div>
        </Box>
      </Modal>

      {openModal && (
        <BookEventForm
          open={openModal}
          handleClose={() => {
            setOpenModal(false);
            setSelectedService(null);
          }}
          eventDetails={selectedService}
        />
      )}
    </>
  );
}

function ServiceCard({ item }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="h-full">
        <div className="group relative h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-green-100 flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-lime-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

          {item.image ? (
            <div className="w-full h-40 sm:h-44 2xl:h-56 overflow-hidden relative rounded-t-2xl flex-shrink-0">
              <img
                src={item.image}
                alt={item.serviceName}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none" />
            </div>
          ) : (
            <div className="w-full h-40 sm:h-44 flex items-center justify-center bg-gradient-to-br from-[#2a5f46] via-[#4f8f73] relative rounded-t-2xl flex-shrink-0">
              <Leaf className="text-white drop-shadow-lg w-12 h-12" />
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          <div className="px-3 sm:px-4 pb-3 pt-2 flex flex-col flex-grow">
            <h3 className="text-xs sm:text-sm 2xl:text-base font-semibold text-green-800 mb-1.5 group-hover:text-green-700 transition-colors duration-300 leading-snug line-clamp-2">
              {item.serviceName}
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-2 flex-grow line-clamp-2">
              {Array.isArray(item.description)
                ? item.description[0]
                : item.description}
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-green-200 to-transparent mb-2.5" />
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => setModalOpen(true)}
                className="group/btn flex-shrink-0 flex items-center gap-1 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-white bg-[#4f8f73] rounded-lg transition-all duration-300 hover:bg-[#2a5f46] hover:shadow-md active:scale-95"
              >
                View Details
                <ArrowForward
                  className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
                  style={{ fontSize: 13 }}
                />
              </button>
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
  const [selectedCategory, setSelectedCategory] = useState(categories[11]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const filteredServices =
    selectedCategory.filterName === FILTER.ALL
      ? detoxServicesData
      : detoxServicesData.filter(
          (s) => s.filterName === selectedCategory.filterName,
        );

  const visibleServices = filteredServices.slice(0, visibleCount);
  const hasMore = visibleCount < filteredServices.length;

  const handleCategoryChange = (cat) => {
    if (cat.id === selectedCategory.id) return;
    setSelectedCategory(cat);
    setVisibleCount(12);
  };

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 12, filteredServices.length));
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen pb-5 relative">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2a5f46] via-[#4f8f73] to-[#2a5f46] py-8 sm:py-10">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 sm:top-20 left-[5%] sm:left-[10%] text-[#e5c76a]/20 pointer-events-none"
        >
          <Leaf className="w-14 h-14 sm:w-24 sm:h-24" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-10 sm:bottom-20 right-[5%] sm:right-[15%] text-[#e5c76a]/15 pointer-events-none"
        >
          <Sparkles className="w-12 h-12 sm:w-20 sm:h-20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/3 right-[8%] text-[#5f806a]/20 hidden sm:block pointer-events-none"
        >
          <Shield className="w-16 h-16" />
        </motion.div>

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#c9a441] font-serif text-xl sm:text-2xl md:text-3xl mb-3"
          >
            पंचकर्म शोधन चिकित्सा सेवा
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#e5c76a] mb-4"
          >
            Panchakarma Detox
            <span className="block mt-1">Therapy Services</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-3 my-5 sm:my-7"
          >
            <div className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-[#c9a441]" />
            <Leaf className="w-5 h-5 text-[#c9a441]" />
            <div className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-[#c9a441]" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed px-2"
          >
            <AutoTypingText text="Experience the ancient wisdom of Ayurveda through our authentic Panchakarma treatments, designed to purify, rejuvenate, and restore balance to your body and mind." />
          </motion.p>
        </div>
      </section>

      <div className="mx-auto px-3 sm:px-5 pt-4 sm:pt-5">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-md border border-[#567865]/25 p-3 sm:p-4 sticky top-14 sm:top-20 z-30">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-green-100 rounded-lg">
              <Filter className="w-3.5 h-3.5 text-[#1f4f3a]" />
            </div>
            <span className="font-semibold text-[#1f4f3a] text-sm sm:text-base">
              Filter by Category
            </span>
            <span className="ml-auto text-xs text-green-700 font-medium bg-green-100 px-2 py-0.5 rounded-full">
              {filteredServices.length} service
              {filteredServices.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory.id === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "bg-gradient-to-r from-[#1f4f3a] to-[#4b8b6a] text-white shadow-md scale-[1.02]"
                      : "bg-[#e8f4f0] text-[#1f4f3a] hover:bg-[#d4ebe3] border border-[#1f4f3a]/30"
                  }`}
                >
                  <Icon
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 ${isActive ? "text-[#e5c76a]" : "text-[#1f4f3a]"}`}
                  />
                  <span className="whitespace-nowrap">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-10 px-3 sm:px-5 lg:px-6 mt-4 sm:mt-5">
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 text-green-800 text-base font-medium">
            No services found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8">
            {visibleServices.map((item, i) => (
              <ServiceCard key={`${selectedCategory.id}-${i}`} item={item} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="text-center pb-4">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="group relative mx-auto flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#1f4f3a] via-[#4b8b6a] to-[#1f4f3a] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {isLoading ? (
                <>
                  <span className="relative w-3.5 h-3.5 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                  <span className="relative">Loading...</span>
                </>
              ) : (
                <>
                  <span className="relative">
                    Load More ({filteredServices.length - visibleCount}{" "}
                    remaining)
                  </span>
                  <ExpandMoreIcon
                    className="relative transition-transform duration-300 group-hover:translate-y-0.5"
                    style={{ fontSize: 18 }}
                  />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t-2 border-green-200/50 text-center px-4">
        <p className="text-gray-700 font-semibold flex items-center justify-center gap-2 text-xs sm:text-sm">
          <MdEco
            className="text-green-700 flex-shrink-0"
            style={{ fontSize: 16 }}
          />
          Authentic Ayurvedic treatments by experienced practitioners
        </p>
      </div>
    </div>
  );
}
