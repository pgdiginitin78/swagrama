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
import { motion } from "framer-motion";
import { useState } from "react";
import EveningVisionWholeMealImg from "../../../assets/community-activities/Evening Vision Whole Meal.png";
import EveningSwagramaImg from "../../../assets/community-activities/EveningSwagrama.png";
import MorningVisionWholeMealImg from "../../../assets/community-activities/Morning Vision Whole Meal.png";
import MorningVisionImg from "../../../assets/community-activities/MorningVision.png";
import DailyBarterImg from "../../../assets/healingServices/vision/DailyBarter.jpg";
import eveningMealImg from "../../../assets/healingServices/vision/eveningMeal.png";
import MorningMealImg from "../../../assets/healingServices/vision/morningMeal.png";
import PatientCampImg from "../../../assets/healingServices/vision/PatientCamp.png";
import weaklyBarterImg from "../../../assets/healingServices/vision/weaklyBarter.png";
import VisitorsFormModal from "./VisitorsFormModal";
import MainPageImg from "../../../assets/community-activities/mainPage.png"




const walkInServices = [
  {
    nameHindi: "प्रातःपूर्णाहार",
    serviceName: "Morning Whole Meal",
    checkIn: "06:45",
    checkOut: "09:15",
    description:
      "Morning wholesome meal provided at Swagrama.",
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
    description:
      "Evening wholesome meal provided at Swagrama.",
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
    icon: <SpaIcon />,
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
    icon: <SpaIcon />,
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
    icon: <RestaurantIcon />,
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
    icon: <RestaurantIcon />,
  },
];

const OurVision = () => {
  const [openEventBookModal, setOpenEventBookModal] = useState(false);
  const [selectedEventDeatils, setSelectedEventDetails] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${MainPageImg})` }}
        className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[85vh] lg:min-h-screen bg-no-repeat bg-center bg-cover flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2b18]/60 via-transparent to-[#0d2b18]/40" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 md:px-12 py-10 sm:py-14 md:py-20 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="font-playfair text-center mb-5 sm:mb-6 md:mb-8"
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.9)" }}
          >
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#f0ede4] leading-tight tracking-wide">
              स्वग्रामदर्शन
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90 mt-1 tracking-widest uppercase">
              Community Vision
            </span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-[#8bc34a] to-transparent mb-6 sm:mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 text-center max-w-3xl mx-auto leading-relaxed sm:leading-loose mb-8 sm:mb-10 md:mb-14 px-2"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
          >
            <strong className="text-[#a8d96c] font-semibold">स्वग्रामदर्शन</strong> is a holistic journey through the essence of community living
            in harmony with nature. Visitors are welcomed into a world where knowledge, culture,
            sustainability, and spirituality converge. Each element of the community embodies a
            conscious lifestyle rooted in natural regulation{" "}
            <span className="text-[#c8e89a]">(ऋत)</span> and traditional wisdom.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button
              className="group relative bg-gradient-to-br from-[#8bc34a] to-[#5d9e28] text-[#0f2415] font-bold rounded-full text-sm sm:text-base md:text-lg px-8 sm:px-10 md:px-14 py-3 sm:py-3.5 md:py-4 w-full sm:w-auto min-w-[200px] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(139,195,74,0.55)] active:scale-95"
              style={{ boxShadow: "0 8px 32px rgba(139, 195, 74, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)" }}
            >
              <span className="relative z-10 tracking-wide">Begin Your Journey</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9ccc65] to-[#7cb342] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>


          </motion.div>

        </div>


      </div>

      <div className="py-6 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-b from-[#e8f5e9] to-[#c8e6c9]">
        <div className="max-w-screen-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl  font-bold text-[#1a3a25] text-center mb-3 sm:mb-4">
              The Journey Includes
            </h2>
            <div className="w-40 sm:w-48 md:w-56 h-1 bg-gradient-to-r from-[#8bc34a] to-[#689f38] mx-auto mb-6 sm:mb-8 md:mb-12 rounded-full" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
              {journeyItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="h-full"
                >
                  <div
                    className="h-full bg-gradient-to-br from-white to-[#f7f5f0] rounded-2xl sm:rounded-3xl overflow-hidden relative transition-all duration-400 hover:shadow-2xl border border-[#8bc34a]/20 hover:border-[#8bc34a]/40 flex flex-col"
                    style={{ boxShadow: "0 10px 40px rgba(26, 58, 37, 0.1)" }}
                  >
                    <div className="h-1.5 bg-gradient-to-r from-[#8bc34a] via-[#689f38] to-[#5d4037]" />
                    <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#2d5a3d] to-[#1a3a25] flex items-center justify-center flex-shrink-0"
                          style={{
                            boxShadow: "0 8px 24px rgba(26, 58, 37, 0.3)",
                          }}
                        >
                          <item.icon className="text-2xl sm:text-3xl md:text-4xl text-[#8bc34a]" />
                        </div>
                        <p className="text-[#1a3a25] font-semibold text-sm sm:text-base md:text-lg line-clamp-2">
                          {item.title}
                        </p>
                      </div>

                      <p className="text-[#5d4037] leading-relaxed text-xs sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#2d5a3d] to-[#1a3a25] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#f7f5f0]/95 text-sm sm:text-base md:text-lg lg:text-xl text-center leading-relaxed sm:leading-loose max-w-5xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4">
              This comprehensive vision of
              <strong className="text-[#8bc34a]"> स्वग्राम</strong> allows
              visitors to&nbsp;
              <strong className="text-[#8bc34a]">
                immerse fully in the philosophy of One Universe, One Earth, One
                Community
              </strong>
              . Each step is a learning and healing experience — teaching&nbsp;
              <strong className="text-[#8bc34a]">
                responsibility, sustainability, compassion, and mindfulness
              </strong>
              — ultimately guiding participants to&nbsp;
              <strong className="text-[#8bc34a]">
                live in harmony with nature, themselves, and the community
              </strong>
              .
            </p>
          </motion.div>

          <div className="flex justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 flex-wrap mb-8 sm:mb-12 md:mb-16">
            {[
              { icon: PublicIcon, text: "One Universe" },
              { icon: NatureIcon, text: "One Earth" },
              { icon: GroupsIcon, text: "One Community" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20  rounded-full bg-gradient-to-br from-[#8bc34a] to-[#689f38] flex items-center justify-center"
                    style={{ boxShadow: "0 0 30px rgba(139, 195, 74, 0.4)" }}
                  >
                    <item.icon className="text-3xl sm:text-4xl md:text-5xl text-[#1a3a25]" />
                  </div>
                  <p className="text-[#f7f5f0] font-playfair text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <button
              className="bg-gradient-to-br from-[#8bc34a] to-[#689f38] hover:from-[#9ccc65] hover:to-[#7cb342] text-[#1a3a25] font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-4 rounded-full hover:-translate-y-1 transition-all duration-300"
              style={{ boxShadow: "0 8px 32px rgba(139, 195, 74, 0.4)" }}
            >
              Join Our Community
            </button>
          </motion.div>
        </div>
      </div>

      <div className="py-6 sm:py-8 md:py-7 lg:py-6 bg-gradient-to-b from-[#e8f5e9] to-[#c8e6c9]">
        <div className="w-full mx-auto px-4">
          <div className="pb-6 sm:pb-8 md:pb-12">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-6 sm:mb-8 md:mb-10"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl  text-[#1a3a25] font-semibold mb-3 sm:mb-4">
                Visitor Services
              </h3>
              <div className="w-48 sm:w-56 md:w-60 h-1 bg-gradient-to-r from-[#8bc34a] to-[#689f38] mx-auto mb-3 sm:mb-4 rounded-full" />
              <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
                Experience holistic wellness through our curated programs
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
            >
              {visitorServices.map((service, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group"
                >
                  <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-green-100">
                    <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.serviceName}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      <div className="absolute top-2 right-2 bg-lime-50/60 backdrop-blur-md p-1.5 sm:p-2 rounded-full shadow-lg">
                        <div className="text-green-600 text-lg sm:text-xl">
                          {service.icon}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4">
                      <div className="mb-2 sm:mb-3">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                          {service.serviceName}
                        </h3>
                        <p className="text-xs sm:text-sm text-green-600 font-medium truncate">
                          {service.nameHindi}
                        </p>
                      </div>

                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                        {service.description}
                        {service.mealNote && (
                          <span className="text-amber-600 font-medium">
                            {service.mealNote}
                          </span>
                        )}
                      </p>

                      <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 bg-lime-100 rounded-lg p-1.5 sm:p-2">
                          <AccessTimeIcon className="text-green-600 text-sm sm:text-base" />
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                              Check-In
                            </p>
                            <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                              {service.checkIn}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 bg-green-100 rounded-lg p-1.5 sm:p-2">
                          <AccessTimeIcon className="text-lime-600 text-sm sm:text-base" />
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                              Check-Out
                            </p>
                            <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                              {service.checkOut}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 sm:mb-5">
                        <div className="flex items-start gap-1.5 sm:gap-2">
                          <div className="bg-gradient-to-br from-lime-100 to-green-100 p-1 sm:p-1.5 rounded-lg mt-0.5 flex-shrink-0">
                            <SpaIcon className="text-green-600 text-xs sm:text-sm" />
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                            {service.benefits}
                          </p>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedEventDetails(service);
                          setOpenEventBookModal(true);
                        }}
                        className="w-full bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white font-semibold py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group text-xs sm:text-sm md:text-base"
                      >
                        <span>Book Now</span>
                        <ArrowForwardIcon className="text-sm sm:text-base group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-6 sm:py-8 md:py-7 lg:py-5 bg-gradient-to-b from-[#e8f5e9] to-[#c8e6c9]">
        <div className="w-full mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="py-6 sm:py-5">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <div className="text-center mb-6 sm:mb-8 md:mb-10">
                  <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-xl sm:text-2xl md:text-3xl  font-bold text-green-900 mb-3 sm:mb-4"
                  >
                    Walk-In Services
                  </motion.h1>
                  <div className="w-52 sm:w-60 md:w-64 h-1 bg-gradient-to-r from-[#8bc34a] to-[#5d4037] mx-auto mb-2 sm:mb-3 rounded-full" />
                  <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xs sm:text-sm text-green-700"
                  >
                    Discover our premium wellness and community services
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                  {walkInServices.map((service, index) => {
                    const IconComponent = service.icon;
                    return (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group"
                      >
                        <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-lime-200 hover:border-lime-400 h-full flex flex-col">
                          <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent z-10" />
                            <img
                              src={service.image}
                              alt={service.serviceName}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 z-20">
                              <div className="bg-green-100/60 backdrop-blur-md p-1.5 sm:p-2 rounded-full shadow-lg">
                                <IconComponent className="text-green-600 text-xl sm:text-2xl" />
                              </div>
                            </div>
                          </div>

                          <div className="p-3 sm:p-4 flex-1 flex flex-col">
                            <div className="mb-2 sm:mb-3">
                              <h3 className="text-base sm:text-lg md:text-xl font-bold text-green-900 mb-1 line-clamp-1">
                                {service.serviceName}
                              </h3>
                              <p className="text-xs sm:text-sm text-green-700 font-medium truncate">
                                {service.nameHindi}
                              </p>
                            </div>

                            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                              {service.description}
                            </p>

                            <div className="flex mb-3 sm:mb-4 gap-2 sm:gap-3 w-full">
                              <div className="flex items-center gap-1 sm:gap-1.5 bg-lime-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg w-full">
                                <AccessTimeIcon className="text-lime-600 text-xs sm:text-sm flex-shrink-0" />
                                <span className="text-[10px] sm:text-xs font-semibold text-green-800 truncate">
                                  In: {service.checkIn}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 sm:gap-1.5 bg-green-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg w-full">
                                <AccessTimeIcon className="text-green-600 text-xs sm:text-sm flex-shrink-0" />
                                <span className="text-[10px] sm:text-xs font-semibold text-green-800 truncate">
                                  Out: {service.checkOut}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-start gap-1.5 sm:gap-2 mb-3 sm:mb-4 bg-gradient-to-r from-lime-50 to-green-50 p-2 sm:p-3 rounded-lg">
                              <VolunteerActivismIcon className="text-lime-600 text-base sm:text-lg mt-0.5 flex-shrink-0" />
                              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-2">
                                {service.benefits}
                              </p>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setOpenEventBookModal(true);
                                setSelectedEventDetails(service);
                              }}
                              className={`${service.price === "Free"
                                ? "bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600"
                                : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                                } text-white font-semibold py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl w-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 mt-auto text-xs sm:text-sm md:text-base`}
                            >
                              {service.price === "Free"
                                ? "Join Now"
                                : "Book Now"}
                              <ArrowForwardIcon className="text-base sm:text-lg" />
                            </motion.button>
                          </div>

                          <div className="h-1 bg-gradient-to-r from-lime-400 via-green-500 to-emerald-500" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {openEventBookModal && (
        <VisitorsFormModal
          open={openEventBookModal}
          handleClose={() => {
            setSelectedEventDetails(null);
            setOpenEventBookModal(false);
          }}
          serviceDetails={selectedEventDeatils}
        />
      )}
    </div>
  );
};

export default OurVision;
