import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BuildIcon from "@mui/icons-material/Build";
import GroupsIcon from "@mui/icons-material/Groups";
import HealingIcon from "@mui/icons-material/Healing";
import HomeIcon from "@mui/icons-material/Home";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import NatureIcon from "@mui/icons-material/Nature";
import PetsIcon from "@mui/icons-material/Pets";
import PublicIcon from "@mui/icons-material/Public";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SchoolIcon from "@mui/icons-material/School";
import SpaIcon from "@mui/icons-material/Spa";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { AnimatePresence, motion } from "framer-motion";
import { useState, isValidElement } from "react";
import EveningVisionWholeMealImg from "../../../assets/community-activities/Evening Vision Whole Meal.webp";
import EveningSwagramaImg from "../../../assets/community-activities/EveningSwagrama.webp";
import MorningVisionWholeMealImg from "../../../assets/community-activities/Morning Vision Whole Meal.webp";
import MorningVisionImg from "../../../assets/community-activities/MorningVision.webp";
import DailyBarterImg from "../../../assets/healingServices/vision/DailyBarter.webp";
import eveningMealImg from "../../../assets/healingServices/vision/eveningMeal.webp";
import MorningMealImg from "../../../assets/healingServices/vision/morningMeal.webp";
import PatientCampImg from "../../../assets/healingServices/vision/PatientCamp.webp";
import weaklyBarterImg from "../../../assets/healingServices/vision/weaklyBarter.webp";
import VisitorsFormModal from "./VisitorsFormModal";
import MainPageImg from "../../../assets/community-activities/mainPage.webp";
import MembershipRegistrationModal from "../../membership/communityMembership/MembershipRegistrationModal";

import img1 from "../../../assets/community-activities/visionImages/20231111_111902.webp";
import img2 from "../../../assets/community-activities/visionImages/20231111_112006.webp";
import img3 from "../../../assets/community-activities/visionImages/20231225_224343.webp";
import img4 from "../../../assets/community-activities/visionImages/20240410_082533.webp";
import img5 from "../../../assets/community-activities/visionImages/IMG_20180106_110559.webp";
import img6 from "../../../assets/community-activities/visionImages/IMG_20180106_122141.webp";
import img7 from "../../../assets/community-activities/visionImages/IMG_20220103_115609.webp";
import img8 from "../../../assets/community-activities/visionImages/IMG_20220103_123219~2.webp";
import img9 from "../../../assets/community-activities/visionImages/IMG_20220107_085632.webp";
import img10 from "../../../assets/community-activities/visionImages/IMG_20220121_165741~2.webp";
import img11 from "../../../assets/community-activities/visionImages/IMG_20220713_100044~2.webp";
import img12 from "../../../assets/community-activities/visionImages/IMG_20220713_105048~2.webp";
import img13 from "../../../assets/community-activities/visionImages/IMG_20230923_094519.webp";
import img14 from "../../../assets/community-activities/visionImages/DSC_0310-1.webp";

const carouselImages = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
];

const walkInServices = [
  {
    nameHindi: "प्रातःपूर्णाहार",
    serviceName: "Morning Whole Meal",
    checkIn: "06:45",
    checkOut: "09:15",
    description: "Morning wholesome meal provided at Swagrama.",
    benefits: "Nutritious start to the day, energizes body and mind.",
    price: "₹500",
    image: MorningMealImg,
    icon: RestaurantIcon,
  },
  {
    nameHindi: "सायम्पूर्णाहार",
    serviceName: "Evening Whole Meal",
    checkIn: "16:00",
    checkOut: "18:00",
    description: "Evening wholesome meal provided at Swagrama.",
    benefits:
      "Balanced nutrition to relax and rejuvenate after day's activities.",
    price: "₹500",
    image: eveningMealImg,
    icon: RestaurantIcon,
  },
  {
    nameHindi: "दैनिक विनिमय",
    serviceName: "Daily Barter",
    checkIn: "10:00",
    checkOut: "05:00",
    description: "Daily barter or Buy / Sale / exchange program for guests.",
    benefits: "Encourages participation, sharing, and community bonding.",
    price: "Free",
    image: DailyBarterImg,
    icon: SwapHorizIcon,
  },
  {
    nameHindi: "साप्ताहिक विनिमय",
    serviceName: "Weekly Barter",
    checkIn: "10:00",
    checkOut: "05:00",
    description: "Weekly barter or Buy / Sale / exchange program for guests.",
    benefits: "Encourages participation, sharing, and community bonding.",
    price: "Free",
    image: weaklyBarterImg,
    icon: SwapHorizIcon,
  },
  {
    nameHindi: "रुग्णशिबिर",
    serviceName: "Patient Camp",
    checkIn: "10:00",
    checkOut: "05:00",
    description: "Patient camp for wellness checkups and consultations.",
    benefits: "Health evaluation, awareness, and early intervention.",
    price: "Free",
    image: PatientCampImg,
    icon: LocalHospitalIcon,
  },
];

const visitorServices = [
  {
    nameHindi: "स्वप्रातःदर्शन",
    serviceName: "Morning Swagrama",
    checkIn: "08:45",
    checkOut: "11:15",
    description:
      "Morning Swagrama informative visit / guided session with Herbal Gud Tea.",
    mealNote: "(without meal)",
    benefits:
      "Provides knowledge about therapies, Panchakarma, wellness practices, and site orientation.",
    price: "₹750",
    icon: SpaIcon,
    image: MorningVisionImg,
  },
  {
    nameHindi: "स्वसायम्दर्शन",
    serviceName: "Evening Swagrama",
    checkIn: "14:45",
    checkOut: "17:15",
    description:
      "Evening Swagrama informative visit / guided session with Herbal Gud Tea.",
    mealNote: "(without meal)",
    benefits:
      "Offers overview of holistic treatments, Q&A, and insight into wellness practices.",
    price: "₹750",
    image: EveningSwagramaImg,
    icon: SpaIcon,
  },
  {
    nameHindi: "स्वप्रातःदर्शनपूर्णाहार",
    serviceName: "Morning Vision Whole Meal",
    checkIn: "06:45",
    checkOut: "11:15",
    description:
      "Morning informative visit with Herbal Gud Tea & wholesome meal.",
    mealNote: "",
    benefits:
      "Combines experiential learning with nutritious meal for holistic experience.",
    price: "₹1000",
    image: MorningVisionWholeMealImg,
    icon: RestaurantIcon,
  },
  {
    nameHindi: "स्वसायम्दर्शनपूर्णाहार",
    serviceName: "Evening Vision Whole Meal",
    checkIn: "14:45",
    checkOut: "19:15",
    description:
      "Evening informative visit with Herbal Gud Tea & wholesome meal.",
    mealNote: "",
    benefits:
      "Knowledge sharing + nourishing meal for comprehensive understanding.",
    price: "₹1000",
    image: EveningVisionWholeMealImg,
    icon: RestaurantIcon,
  },
];

const journeyItems = [
  {
    icon: SchoolIcon,
    title: "स्वगुरुकुल",
    description:
      "Experience a traditional environment of learning where knowledge of life, nature, and wellness is imparted through practice, observation, and mentorship. Here, education goes beyond academics to include yogic sciences, Ayurveda, and natural living skills.",
  },
  {
    icon: PetsIcon,
    title: "स्वगौशाला ",
    description:
      "A sacred space where the cow is revered not only as a source of nourishment but as a symbol of sustainable agriculture, health, and harmony. Visitors can participate in daily care, feeding, and understanding Panchagavya practices, connecting deeply with vital ecological cycles.",
  },
  {
    icon: HealingIcon,
    title: "स्वचिकित्सालय",
    description:
      "Guided exposure to preventive, curative, and rejuvenative therapies rooted in Ayurveda and natural medicine. The center emphasizes holistic wellness for body, mind, and spirit, aligned with the rhythms of nature.",
  },
  {
    icon: RestaurantIcon,
    title: "स्वसंस्कारपाकशाला",
    description:
      "Learn the art of preparing seasonal, wholesome, and sattvic meals. This facility integrates culinary practice with cultural rituals, emphasizing the medicinal and spiritual aspects of food.",
  },
  {
    icon: BuildIcon,
    title: "स्वनिर्माणप्रक्रिया",
    description:
      "Explore sustainable building techniques, organic materials, and handcrafted innovations. This space encourages hands-on creation, blending traditional craftsmanship with ecological responsibility.",
  },
  {
    icon: WaterDropIcon,
    title: "स्वसुपीवनकुप",
    description:
      "Witness and participate in rainwater harvesting, solar energy applications, and natural irrigation. The systems reflect eco-conscious design and offer a practical understanding of living in harmony with resources.",
  },
  {
    icon: AgricultureIcon,
    title: "स्वबीजलिंगपिंडकृषि",
    description:
      "Engage with seed-to-harvest practices, soil health, and biodiversity preservation. Visitors gain insight into eco-friendly farming and regenerative agriculture that supports community nutrition and environmental sustainability.",
  },
  {
    icon: HomeIcon,
    title: "स्वातुरालय",
    description:
      "Experience living in harmony with sunlight, wind, rain, and seasonal changes. The habitations are designed to promote mindful presence, quietude, and a direct connection with the environment.",
  },
  {
    icon: SpaIcon,
    title: "नैसर्गचिकित्सा",
    description:
      "Explore forest bathing, seasonal rejuvenation, and natural mindfulness practices that restore physical and mental health, emphasizing a holistic approach to daily well-being.",
  },
  {
    icon: TempleBuddhistIcon,
    title: "स्वत्रिदेवायतन",
    description:
      "Engage with rituals, meditation spaces, and sacred groves that nurture inner reflection, spiritual growth, and community cohesion.",
  },
];

const generalService = {
  serviceName: "General Visit Inquiry",
  nameHindi: "सामान्य दर्शन पूछताछ",
  checkIn: "08:00",
  checkOut: "18:00",
  price: "Price varies",
};

const OurVision = () => {
  const [openEnquiryModal, setOpenEnquiryModal] = useState(false);
  const [selectedEnquiryDetails, setSelectedEnquiryDetails] = useState(null);
  const [openWalkInServiceBookingModal, setOpenWalkInServiceBookingModal] =
    useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <div
        style={{ backgroundImage: `url(${MainPageImg})` }}
        className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] bg-no-repeat bg-center bg-cover flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2b18]/60 via-transparent to-[#0d2b18]/40" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 py-10 flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-playfair mb-4 sm:mb-6"
            style={{
              textShadow:
                "0 4px 24px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.9)",
            }}
          >
            <span className="block text-4xl sm:text-5xl md:text-6xl font-bold text-[#f0ede4] leading-tight tracking-wide">
              स्वग्रामदर्शन
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl font-semibold text-white/90 mt-2 tracking-widest uppercase">
              Community Vision
            </span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#8bc34a] to-transparent mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-white/90 max-w-3xl leading-relaxed mb-8 px-4"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
          >
            <strong className="text-[#a8d96c] font-semibold">
              स्वग्रामदर्शन
            </strong>{" "}
            is a holistic journey through the essence of community living in
            harmony with nature. Visitors are welcomed into a world where
            knowledge, culture, sustainability, and spirituality converge.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedEnquiryDetails(generalService);
              setOpenWalkInServiceBookingModal(true);
            }}
            className="group relative bg-gradient-to-br from-[#8bc34a] to-[#5d9e28] text-[#0f2415] font-bold rounded-full text-sm sm:text-base px-8 py-3 transition-all duration-300 shadow-[0_8px_32px_rgba(139,195,74,0.4)] hover:shadow-[0_0_40px_rgba(139,195,74,0.6)]"
          >
            Begin Your Journey
          </motion.button>
        </div>
      </div>

      {/* 2. AUTO-SLIDER CAROUSEL */}
      <div className="w-full py-6 md:py-8 bg-gradient-to-b from-[#e8f5e9] to-[#c8e6c9] overflow-hidden border-b border-[#8bc34a]/20">
        <motion.div
          className="flex gap-4 sm:gap-6 w-max px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 50, repeat: Infinity }}
        >
          {[...carouselImages, ...carouselImages].map((img, index) => (
            <div
              key={index}
              className="w-48 sm:w-64 md:w-80 h-32 sm:h-44 md:h-56 flex-shrink-0 rounded-xl overflow-hidden shadow-md border border-[#8bc34a]/30 relative group"
            >
              <img
                src={img}
                alt={`Vision Slider ${index}`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* 3. THE JOURNEY INCLUDES */}
      <div className="py-10 px-2 md:px-12 sm:py-16 bg-gradient-to-b from-[#c8e6c9] to-[#e8f5e9]">
        <div className="w-full mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#1a3a25] mb-3">
              The Journey Includes
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#8bc34a] to-[#689f38] mx-auto rounded-full" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5"
          >
            {journeyItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <div className="h-full bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(26,58,37,0.06)] border border-white hover:border-[#8bc34a]/40 hover:shadow-lg transition-all duration-300 flex flex-col">
                  <div className="h-1 bg-gradient-to-r from-[#8bc34a] via-[#689f38] to-[#2d5a3d]" />
                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a3a25] to-[#2d5a3d] flex items-center justify-center flex-shrink-0 shadow-md">
                        <item.icon className="text-xl sm:text-2xl text-[#8bc34a]" />
                      </div>
                      <p className="text-[#1a3a25] font-bold text-sm sm:text-base leading-tight">
                        {item.title}
                      </p>
                    </div>
                    <p className="text-[#1a3a25]/80 text-xs sm:text-sm leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 4. ONE UNIVERSE SECTION */}
      <div className="py-12 sm:py-16 bg-gradient-to-br from-[#2d5a3d] to-[#1a3a25] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#f7f5f0]/95 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-4xl mx-auto mb-10"
          >
            This comprehensive vision of
            <strong className="text-[#8bc34a] font-semibold">
              {" "}
              स्वग्राम{" "}
            </strong>{" "}
            allows visitors to
            <strong className="text-[#8bc34a] font-semibold">
              {" "}
              immerse fully in the philosophy of One Universe, One Earth, One
              Community
            </strong>
            . Each step is a learning and healing experience — teaching
            <strong className="text-[#8bc34a] font-semibold">
              {" "}
              responsibility, sustainability, compassion, and mindfulness
            </strong>
            .
          </motion.p>

          <div className="flex justify-center gap-6 sm:gap-10 md:gap-14 flex-wrap mb-10">
            {[
              { icon: PublicIcon, text: "One Universe" },
              { icon: NatureIcon, text: "One Earth" },
              { icon: GroupsIcon, text: "One Community" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#8bc34a] to-[#689f38] flex items-center justify-center shadow-[0_0_20px_rgba(139,195,74,0.3)]">
                    <item.icon className="text-3xl sm:text-4xl text-[#1a3a25]" />
                  </div>
                  <p className="text-[#f0ede4] font-playfair sm:text-lg font-semibold tracking-wide">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedEnquiryDetails(generalService);
              setOpenWalkInServiceBookingModal(true);
            }}
            className="bg-transparent border-2 border-[#8bc34a] text-[#8bc34a] hover:bg-[#8bc34a] hover:text-[#1a3a25] font-bold text-sm sm:text-base px-8 py-3 rounded-full transition-all duration-300"
          >
            Join Our Community
          </motion.button>
        </div>
      </div>

      {/* 5. VISITOR AND WALK-IN SERVICES */}
      <div className="py-8 sm:py-12 bg-gradient-to-b from-[#e8f5e9] to-[#c8e6c9]">
        <div className="max-w-screen-2xl mx-auto px-4">
          {/* VISITOR SERVICES */}
          <div className="mb-14 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1a3a25] mb-2">
                Visitor Services
              </h3>
              <div className="w-32 h-1 bg-gradient-to-r from-[#8bc34a] to-[#689f38] mx-auto mb-3 rounded-full" />
              <p className="text-sm text-green-800">
                Experience holistic wellness through our curated programs
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 px-2 md:px-12 "
            >
              {visitorServices.map((service, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md border border-white hover:border-[#8bc34a]/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.serviceName}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow-sm">
                        {service.price}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <div className="mb-2">
                        <h3 className="text-lg font-bold text-green-900 line-clamp-1">
                          {service.serviceName}
                        </h3>
                        <p className="text-xs font-semibold text-green-600">
                          {service.nameHindi}
                        </p>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {service.description}{" "}
                        <span className="text-amber-600">
                          {service.mealNote}
                        </span>
                      </p>

                      <div className="flex gap-2 mb-4 mt-auto">
                        <div className="flex items-center gap-1.5 bg-green-50 px-2 py-1.5 rounded-lg flex-1 border border-green-100">
                          <AccessTimeIcon className="text-green-600 text-[14px]" />
                          <div>
                            <p className="text-[9px] text-gray-500 uppercase font-bold">
                              In
                            </p>
                            <p className="text-xs font-bold text-green-900">
                              {service.checkIn}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-green-50 px-2 py-1.5 rounded-lg flex-1 border border-green-100">
                          <AccessTimeIcon className="text-green-600 text-[14px]" />
                          <div>
                            <p className="text-[9px] text-gray-500 uppercase font-bold">
                              Out
                            </p>
                            <p className="text-xs font-bold text-green-900">
                              {service.checkOut}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 mb-4">
                        <div className="bg-gradient-to-br from-lime-100 to-green-100 p-1.5 rounded-md shrink-0">
                          {service.icon ? (
                            isValidElement(service.icon) ? (
                              service.icon
                            ) : (
                              <service.icon className="text-green-600 text-[16px]" />
                            )
                          ) : (
                            <SpaIcon className="text-green-600 text-[16px]" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">
                          {service.benefits}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedEnquiryDetails(service);
                          setOpenEnquiryModal(true);
                        }}
                        className="w-full bg-gradient-to-r from-lime-500 to-green-600 text-white font-semibold py-2.5 rounded-xl hover:from-lime-600 hover:to-green-700 transition-all text-sm shadow-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* WALK-IN SERVICES */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1a3a25] mb-2">
                Walk-In Services
              </h3>
              <div className="w-32 h-1 bg-gradient-to-r from-[#8bc34a] to-[#689f38] mx-auto mb-3 rounded-full" />
              <p className="text-sm text-green-800">
                Discover our premium wellness and community services
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6"
            >
              {walkInServices.map((service, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="group h-full"
                >
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md border border-white hover:border-[#8bc34a]/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                    <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold text-green-700 shadow-sm">
                      {service.price}
                    </div>
                    <div className="relative h-36 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent z-10" />
                      <img
                        src={service.image}
                        alt={service.serviceName}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <div className="mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-green-900 line-clamp-1">
                          {service.serviceName}
                        </h3>
                        <p className="text-xs font-semibold text-green-600">
                          {service.nameHindi}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                        {service.description}
                      </p>

                      <div className="flex gap-2 mb-3 mt-auto">
                        <div className="flex items-center gap-1 bg-lime-50 px-2 py-1.5 rounded-lg flex-1 border border-lime-100">
                          <AccessTimeIcon className="text-lime-600 text-[14px] shrink-0" />
                          <span className="text-[10px] sm:text-xs font-bold text-green-800 truncate">
                            In: {service.checkIn}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 bg-green-50 px-2 py-1.5 rounded-lg flex-1 border border-green-100">
                          <AccessTimeIcon className="text-green-600 text-[14px] shrink-0" />
                          <span className="text-[10px] sm:text-xs font-bold text-green-800 truncate">
                            Out: {service.checkOut}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 mb-4 bg-gradient-to-r from-lime-50 to-green-50 p-2 rounded-lg border border-lime-100/50">
                        <VolunteerActivismIcon className="text-lime-600 text-[16px] shrink-0" />
                        <p className="text-[11px] sm:text-xs text-gray-700 line-clamp-2 mt-0.5">
                          {service.benefits}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedEnquiryDetails(service);
                          setOpenWalkInServiceBookingModal(true);
                        }}
                        className={`w-full text-white font-semibold py-2.5 rounded-xl transition-all shadow-sm text-xs sm:text-sm ${
                          service.price === "Free"
                            ? "bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600"
                            : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        }`}
                      >
                        Enquire Now
                      </button>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-lime-400 via-green-500 to-emerald-500" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      {openEnquiryModal && (
        <VisitorsFormModal
          open={openEnquiryModal}
          handleClose={() => {
            setSelectedEnquiryDetails(null);
            setOpenEnquiryModal(false);
          }}
          serviceDetails={selectedEnquiryDetails}
          origin="CommunityVision"
        />
      )}

      {openWalkInServiceBookingModal && (
        <AnimatePresence>
          <MembershipRegistrationModal
            open={openWalkInServiceBookingModal}
            handleClose={() => setOpenWalkInServiceBookingModal(false)}
            membershipDetails={selectedEnquiryDetails}
            origin="Swagrama Visit"
          />
        </AnimatePresence>
      )}
    </div>
  );
};

export default OurVision;
