import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Award, Briefcase, User } from "lucide-react";
import { useRef, useState } from "react";
import heroImage from "../../assets/landing-page/aboutUs/hero-swagrama.jpg";
import farmImage from "../../assets/landing-page/aboutUs/organic-farm.jpg";
import wellnessImage from "../../assets/landing-page/aboutUs/wellness-center.jpg";
import SantoshSuryavanshi from "../../assets/landing-page/ourexperts/SantoshSuryawanshi.jpg";
import PradipTaware from "../../assets/landing-page/ourexperts/PradipTaware.jpg";
import SandipMehetre from "../../assets/landing-page/ourexperts/SandipMahetre.jpg";
import ManishaSuryawanshi from "../../assets/landing-page/ourexperts/ManishaSuryavanshi.jpg";
import VaishaliHolmukhe from "../../assets/landing-page/ourexperts/VaishaliHolmukhe.jpg";
import SmitaMehetre from "../../assets/landing-page/ourexperts/SmitaMahetre.jpg";
import {
  Hospital,
  BookOpen,
  Users,
  Leaf,
  Sparkles,
  Sprout,
} from "lucide-react";

import {
  Card,
  CardContent,
  Avatar,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import {
  LocalHospital,
  Spa,
  Healing,
  MedicalServices,
} from "@mui/icons-material";

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

const services = [
  {
    title: "SwaChikitsalaya & SwaNaturaliya",
    desc: "Healing Centre OPD & IPD - Consulting, Counselling, Diagnosis, Treatment & Therapy",
    icon: Hospital,
  },
  {
    title: "SwaGurukul",
    desc: "Guru Shishya Parampara Training for Farmers, Vaidyas, Architects, Nature Lovers & Doctors",
    icon: BookOpen,
  },
  {
    title: "Community Programme",
    desc: "Natural Farming, Native Celebrations, Food Festivals, Ayurveda, Yoga & Agro Tourism",
    icon: Users,
  },
  {
    title: "SwaProducts",
    desc: "Dispensing of Supplementary, 5CowProduct, Herbal Products & Research Development",
    icon: Leaf,
  },
  {
    title: "365 Days Natural Lifestyle",
    desc: "Intubation Vasti Programme for all types of visitors with complete wellness experience",
    icon: Sparkles,
  },
  {
    title: "Innovation & Research Farming",
    desc: "Cultivation, Harvesting, Manufacturing & Supply of Food & Herbal Products",
    icon: Sprout,
  },
];

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

const AboutUs = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const foundersRef = useRef(null);
  const healersRef = useRef(null);
  const servicesRef = useRef(null);
  const locationRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  const isMissionInView = useInView(missionRef, {
    once: true,
    margin: "-100px",
  });

  const isVisionInView = useInView(visionRef, { once: true, margin: "-100px" });

  const isFoundersInView = useInView(foundersRef, {
    once: true,
    margin: "-100px",
  });

  const isHealersInView = useInView(healersRef, {
    once: true,
    margin: "-100px",
  });

  const isServicesInView = useInView(servicesRef, {
    once: true,
    margin: "-100px",
  });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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

  const slideFromLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

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

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background overflow-x-hidden"
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-forest/5 blur-3xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-96 h-96 rounded-full bg-[#C65A3A]/5 blur-3xl"
          animate={{ y: [0, -40, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-gold/5 blur-3xl"
          animate={{ x: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY, scale: heroScale }}
        >
          <img
            src={heroImage}
            alt="स्वग्राम Community - Sahyadri Mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1F2937]/30 via-[#1F2937]/20 to-[#1F2937]/70" />
        </motion.div>

        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <motion.p
              className="text-[#F6E27F] text-lg md:text-xl tracking-[0.3em] uppercase mb-6 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Ayurveda • Yoga • Nisarga • Agro • Tourism
            </motion.p>
            <motion.h1
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#FFF7E6] font-semibold leading-tight mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              स्वग्राम
              <span className="block text-3xl md:text-5xl lg:text-6xl mt-4 font-light text-[#FFF7E6]/90">
                Community
              </span>
            </motion.h1>
            <motion.p
              className="text-[#FFF7E6]/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              A self-sufficient village connected to cultural roots, embracing
              the traditional Indian science of health
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[#FFF7E6]/60 text-sm tracking-widest uppercase">
                Discover
              </span>
              <div className="w-px h-16 bg-gradient-to-b from-[#FFF7E6]/60 to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section ref={missionRef} className="relative px-4 md:px-12 py-12  bg-background">
        <div className="w-full mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isMissionInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={slideFromLeft} className="order-2 md:order-1">
              <span className="text-[#C65A3A] tracking-[0.2em] uppercase text-sm font-medium">
                Our Mission
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#111827] mt-4 mb-8 leading-tight">
                India's Herbal Garden
                <span className="block text-forest">of the World</span>
              </h2>
              <p className="text-[#6B7280] leading-relaxed text-lg mb-6">
                India is labelled as the "Herbal, Spice & Local Variety Food
                Garden of the World" with its rich heritage of indigenous
                medicinal plants, spices, grains, vegetables, and fruits. India
                is the 8th Biodiversity Hotspot on this planet with its own
                unique identity.
              </p>
              <p className="text-[#6B7280] leading-relaxed text-lg">
                Indian applied lifestyle philosophy is the future for world
                health. There is no other traditional healthcare system with
                such extensive research on plant medicine, natural diet &
                natural activity as found in Ayurveda, Yoga and Agriculture.
              </p>
            </motion.div>
            <motion.div
              variants={slideFromRight}
              className="order-1 md:order-2"
            >
              <div className="relative">
                <motion.div
                  className="absolute -top-4 -right-4 w-full h-full rounded-2xl bg-[#1F3D2B]/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                <img
                  src={farmImage}
                  alt="Organic Farming"
                  className="relative rounded-2xl shadow-elevated w-full h-[400px] object-cover"
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-[#EFECE6]/60   backdrop-blur-xl  border-[#EFECE6]/40 p-6 rounded-xl shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <p className="font-serif text-3xl text-forest font-semibold">
                    8th
                  </p>
                  <p className="text-[#6B7280] text-sm">Biodiversity Hotspot</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={visionRef} className="relative  py-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={wellnessImage}
            alt="Wellness Center"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#111827]/80" />
        </div>
        <div className="relative z-10 w-full mx-auto px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isVisionInView ? "visible" : "hidden"}
          >
            <motion.span
              variants={fadeInUp}
              className="text-gold tracking-[0.2em] uppercase text-sm font-medium"
            >
              Our Vision
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-6xl text-[#FFF7E6] mt-4 mb-10 leading-tight"
            >
              Where Ancient Wisdom Meets Modern Healing
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-[#FFF7E6]/80 text-lg  leading-relaxed max-w-3xl mx-auto"
            >
              स्वग्राम Community is a self-sufficient village connected to
              cultural roots, producer of natural organic crops, vegetables,
              fruits, flowers, medicinal plants and essentially a hub for
              natural lifestyle guidance, learning centre & offering experience
              of traditional Indian science of health — Ayurveda & Yoga.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-wrap justify-center gap-8"
            >
              {["Ayurveda", "Yoga", "Nature", "Agro", "Tourism"].map(
                (item, i) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-cream/10 backdrop-blur-sm border border-cream/20 px-8 py-4 rounded-full"
                  >
                    <span className="text-white font-medium">{item}</span>
                  </motion.div>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 md:px-12  ">
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
              className="font-serif text-2xl md:text-3xl text-[#111827] mt-4 mb-6"
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
                      className="absolute -bottom-4 right-10
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

      <section ref={healersRef} className="pb-5 px-4 md:px-12 xl:px-20 bg-white">
        <div className="w-full mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isHealersInView ? "visible" : "hidden"}
            className="text-center mb-5 pt-5"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-2xl md:text-3xl text-[#C65A3A] mt-2"
            >
              Pillars of SwaGrama
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {partnersData.map((healer, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-[#1E8E7A]"
              >
                <div className="relative h-56 overflow-hidden  bg-gradient-to-tr from-emerald-100 via-green-100 to-emerald-200">
                  <img
                    src={healer.image}
                    alt={healer.name}
                    className="w-full h-full object-contain object-center shadow-elevated "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full"
                  >
                    <span className="text-xs font-semibold text-[#1E8E7A] flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {healer.specialty}
                    </span>
                  </motion.div>
                </div>

                <div className="p-3">
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#1E8E7A]" />
                      {healer.name}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2 ml-7">
                      <Briefcase className="w-4 h-4 text-[#1E8E7A]" />
                      {healer.title}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <motion.div
                      initial={false}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
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
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <Container maxWidth="lg">
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
                    <div className="relative h-56 ">
                      <motion.img
                        src={healer.image}
                        alt={healer.name}
                        className="w-full h-full object-cover object-top "
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

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

                    <CardContent className="mt-5 pb-6 px-6 text-center">
                      <Typography
                        variant="h6"
                        component="h3"
                        className="font-bold text-gray-800 mb-2"
                        sx={{ fontSize: "1rem", fontWeight: 700 }}
                      >
                        {healer.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        className="text-gray-600 font-medium"
                        sx={{ fontSize: "0.9rem" }}
                      >
                        {healer.qualification}
                      </Typography>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: hoveredId === healer.id ? "60px" : "40px",
                        }}
                        transition={{ duration: 0.3 }}
                        className="mx-auto mt-4 h-1 rounded-full"
                        style={{ backgroundColor: healer.color }}
                      />
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </div>

      <section className="relative w-full  bg-[#1E8E7A] overflow-hidden flex items-center justify-center px-4 sm:px-10 py-10">
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full border blur-sm"></div>
        <div className="absolute -bottom-52 -left-52 w-[520px] h-[520px] rounded-full border  blur-sm"></div>
        <div className="w-full mx-auto">
          <motion.div initial="hidden" className="text-center mb-8">
            <motion.span className="text-gold tracking-[0.2em] uppercase text-sm font-medium">
              What We Offer
            </motion.span>
            <motion.h2 className="font-serif text-2xl md:text-3xl mt-4 text-cream">
              Services for Local to Global
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isServicesInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  whileHover={{ scale: 1.02 }}
                  className="
                          bg-[#E8F2EA]/60
                          backdrop-blur-xl
                          border border-[#CFE5D6]/40
                          rounded-2xl
                          p-4
                          hover:bg-[#E8F2EA]/70
                          transition-all
                          duration-500
                          "
                >
                  <div className="flex space-x-2  items-center" s>
                    <span
                      className="
                      text-3xl mb-4 block 
                      w-[52px] h-[52px] 
                      flex items-center justify-center
                      rounded-2xl
                      text-[#2F6B4F]
                      bg-white/30
                      backdrop-blur-md
                      border border-white/40
                      shadow-lg
                    "
                    >
                      <Icon className="w-7 h-7 text-[#1E8E7A]" />
                    </span>

                    <h3 className="font-serif text-xl text-[#2B2621] mb-3 ">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-[#2B2621]/70 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 md:px-12  bg-background">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#C65A3A] tracking-[0.2em] uppercase text-sm font-medium">
              Who Can Join
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#111827] mt-4 mb-6">
              Our Participants
            </h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              {
                text: "Dedicated in Uppermost Agri Culture & Natural Lifestyle",
                icon: "🌿",
              },
              {
                text: "Working in Ayurveda, Yoga, Nature, Agro & Tourism",
                icon: "🧘",
              },
              {
                text: "Vaidya, Doctors, Hakim & Healers from around the world",
                icon: "⚕️",
              },
              {
                text: "Nature, Biodiversity & Seed Conservators",
                icon: "🌱",
              },
              { text: "Plant & Plant Nursery Cultivators", icon: "🌳" },
              {
                text: "Product Manufacturers, Traders & Suppliers",
                icon: "📦",
              },
              { text: "Colleges, Institutes & Organizations", icon: "🎓" },
              { text: "Those interested in wellbeing of life", icon: "💚" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className="
                    bg-[#E8F4EA]/60
                    backdrop-blur-xl
                    border border-[#CDE7D6]/40
                    rounded-2xl
                    p-6
                    shadow-soft
                    hover:shadow-elevated
                    transition-all
                    duration-300
                    "
              >
                <span className="text-3xl mb-3 block text-[#2F6B4F]">
                  {item.icon}
                </span>

                <p className="text-[#2F6B4F]/75 text-sm leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
