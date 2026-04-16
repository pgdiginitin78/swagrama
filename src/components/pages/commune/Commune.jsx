import {
  Calendar,
  ChevronDown,
  Droplets,
  GraduationCap,
  IndianRupee,
  Leaf,
  Snowflake,
  Sun,
  Timer,
} from "lucide-react";
import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import RainyImg from "../../assets/commune/Rainy Academy.webp";
import SummerImg from "../../assets/commune/Summer Academy.webp";
import WinterImg from "../../assets/commune/Winter Academy.webp";
import MembershipRegistrationModal from "../membership/communityMembership/MembershipRegistrationModal";
import OldVilageImge from "../../assets/commune/OldVilage.webp";
import SugarcaneImg from "../../assets/community-activities/Sugarcane.webp";
import SustainableFields from "../../assets/commune/Sustainable Fields.webp";
import LivingSwagramaImg from "../../assets/commune/living swagrama.webp";
import indoorInterior from "../../assets/commune/indoorInterior.webp";
import PassageImg from "../../assets/commune/Passage.webp";
import mission1 from "../../assets/commune/missionSlider/mission-1.webp";
import mission2 from "../../assets/commune/missionSlider/mission-2.webp";
import mission3 from "../../assets/commune/missionSlider/mission-3.webp";
import mission4 from "../../assets/commune/missionSlider/mission-4.webp";
import mission5 from "../../assets/commune/missionSlider/mission-5.webp";
import mission6 from "../../assets/commune/missionSlider/mission-6.webp";
import mission7 from "../../assets/commune/missionSlider/mission-7.webp";
import mission8 from "../../assets/commune/missionSlider/mission-8.webp";
import mission9 from "../../assets/commune/missionSlider/mission-9.webp";
import mission10 from "../../assets/commune/missionSlider/mission-10.webp";
import mission11 from "../../assets/commune/missionSlider/mission-11.webp";

if (typeof document !== "undefined") {
  const link = document.createElement("link");

  link.rel = "stylesheet";

  document.head.appendChild(link);
}

export const academyData = [
  {
    season: "उन्हाळा / Summer",
    dates: "16/02/2026 – 21/06/2026",
    serviceName: "स्वग्रीष्मजाविहार / Summer Academy",
    duration: "Summery 120+ Days",
    price: "1,26,000",
    Icon: Sun,
    img: SummerImg,
    accent: "#d97706",
    tag: "Summer",
    tagBg: "bg-amber-100 text-amber-800",
  },
  {
    season: "पावसाळा / Rainy",
    dates: "18/06/2026 – 23/10/2026",
    serviceName: "स्ववर्ष्यजाविहार / Rainy Academy",
    duration: "Rainy 120+ Days",
    price: "1,26,000",
    Icon: Droplets,
    img: RainyImg,
    accent: "#059669",
    tag: "Monsoon",
    tagBg: "bg-emerald-100 text-emerald-800",
  },
  {
    season: "हिवाळा / Winter",
    dates: "23/10/2026 – 21/02/2027",
    serviceName: "स्वहैमन्तजाविहार / Winter Academy",
    duration: "Wintry 120+ Days",
    price: "1,26,000",
    Icon: Snowflake,
    img: WinterImg,
    accent: "#882E2E",
    tag: "Winter",
    tagBg: "bg-amber-100 text-amber-800",
  },
];

const academyProgrammes = [
  {
    programmeId: 1,
    serviceName: "Innocence Academy",
    programmeNameHindi: "स्वमुग्धविहार",
    durationRange: "0 to N days",
    eligibilityCriteria: "Gurukul Students",
    pricePerDay: 2000,
    tagline:
      "Customized short-term stays for those who have completed 3S स्वऋतुविहार / Seasonal Academy and wish to extend their experience",
    info: [
      { title: "शिष्य / Disciple", desc: "Deepen learning and expertise." },
      {
        title: "शिक्षु / Apprentice",
        desc: "Extra practice and skill refinement.",
      },
      {
        title: "प्रशिक्षु / Trainee",
        desc: "Additional training and guidance.",
      },
      {
        title: "स्वयंसेवक / Volunteer",
        desc: "Contribute as a volunteer while staying.",
      },
    ],
    accent: "#4d7c0f",
    bannerImg:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
  },
  {
    programmeId: 2,
    serviceName: "Liberated Academy",
    programmeNameHindi: "निर्मुक्तविहार",
    durationRange: "0 to N days",
    eligibilityCriteria: "Anyone",
    pricePerDay: 2500,
    info: [
      "No projects or courses.",
      "Experience lifestyle freely, 365 days a year.",
      "Ideal for those seeking solitude, self-study, or work-from-home experience.",
      "Focus on calm, quiet living and personal growth through स्वग्राम.",
    ],
    accent: "#882E2E",
    bannerImg: PassageImg,
  },
];

const missionImages = [
  mission1,
  mission2,
  mission3,
  mission4,
  mission5,
  mission6,
  mission7,
  mission8,
  mission9,
  mission10,
  mission11,
  OldVilageImge,
  SustainableFields,
  SugarcaneImg,
  PassageImg,
];

const AutoVerticalSlider = ({ images }) => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-stone-100/50">
      <motion.div
        animate={{
          y: ["0%", "-50%"],
        }}
        transition={{
          duration: 70, 
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ willChange: "transform" }}
        className="flex flex-col gap-4 p-4"
      >
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-md border-[6px] border-white"
          >
            <img
              src={img}
              alt={`Mission ${i}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-stone-900/10 via-transparent to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent pointer-events-none z-10" />
    </div>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

function AnimSection({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SeasonCard({ item, index, onBook }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const IconComp = item.Icon;

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={scaleIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative flex flex-col rounded-[9px] overflow-hidden shadow-lg bg-white border border-stone-100"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="relative h-52 sm:h-60 overflow-hidden">
        <motion.img
          src={item.img}
          alt={item.serviceName}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${item.tagBg}`}
          >
            <IconComp className="w-3 h-3" />
            {item.tag}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <p
            className="text-white text-sm font-medium opacity-90"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {item.season}
          </p>
          <h3 className="text-white font-bold text-base leading-tight">
            {item.serviceName}
          </h3>
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-100">
            <div className="flex items-center gap-1 mb-1">
              <Calendar className="w-3 h-3 text-stone-400" />
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                Dates
              </span>
            </div>
            <p className="text-xs font-semibold text-stone-700 leading-snug">
              {item.dates}
            </p>
          </div>
          <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-100">
            <div className="flex items-center gap-1 mb-1">
              <Timer className="w-3 h-3 text-stone-400" />
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                Duration
              </span>
            </div>
            <p className="text-xs font-semibold text-stone-700">
              {item.duration}
            </p>
          </div>
        </div>

        {/* <div
          className="flex items-center justify-between rounded-xl px-4 py-3"
          style={{
            backgroundColor: `${item.accent}12`,
            border: `1px solid ${item.accent}30`,
          }}
        >
          <span className="text-xs font-semibold text-stone-500">
            Total Investment
          </span>
          <span className="text-lg font-bold" style={{ color: item.accent }}>
            ₹{item.price}
          </span>
        </div> */}

        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onBook(item)}
          className="mt-auto w-full py-3 rounded-[5px] text-white text-sm font-bold tracking-wide shadow-md transition-all duration-300"
          style={{ backgroundColor: item.accent }}
        >
          Book Now →
        </motion.button>
      </div>
    </motion.div>
  );
}

function ProgrammeCard({ programme, index, onBook }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group relative rounded-[9px] overflow-hidden shadow-xl border border-stone-100 bg-white"
    >
      <div className="relative h-60 overflow-hidden">
        <motion.img
          src={programme.bannerImg}
          alt={programme.serviceName}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
          >
            <p
              className="text-white/70 text-sm mb-0.5"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
              }}
            >
              {programme.programmeNameHindi}
            </p>
            <h3 className="text-white text-xl font-bold tracking-tight">
              {programme.serviceName}
            </h3>
          </motion.div>
        </div>
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: programme.accent }}
        />
      </div>

      <div className="p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              icon: Calendar,
              label: "Duration",
              value: programme.durationRange,
            },
            {
              icon: GraduationCap,
              label: "Eligibility",
              value: programme.eligibilityCriteria,
            },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-stone-50 rounded-xl p-3 border border-stone-100"
            >
              <Icon
                className="w-4 h-4 mb-1"
                style={{ color: programme.accent }}
              />
              <p className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                {label}
              </p>
              <p className="text-xs font-bold text-stone-700 mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        {programme.tagline && (
          <div
            className="relative rounded-xl p-3 text-xs leading-relaxed italic text-stone-600"
            style={{
              backgroundColor: `${programme.accent}0d`,
              borderLeft: `3px solid ${programme.accent}`,
            }}
          >
            "{programme.tagline}"
          </div>
        )}

        <div className="space-y-2">
          {Array.isArray(programme.info) &&
          typeof programme.info[0] === "object" ? (
            <div className="grid grid-cols-2 gap-2">
              {programme.info.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="rounded-lg p-2.5 border border-stone-100 bg-stone-50"
                >
                  <p
                    className="text-xs font-bold mb-0.5"
                    style={{ color: programme.accent }}
                  >
                    {item.title}
                  </p>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {programme.info.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i * 0.5}
                  variants={fadeLeft}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="flex items-start gap-2.5 bg-stone-50 rounded-lg p-2.5 border border-stone-100"
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: programme.accent }}
                  />
                  <span className="text-xs text-stone-600 leading-relaxed">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div
          className="flex items-center justify-between rounded-xl px-4 py-3"
          style={{
            backgroundColor: `${programme.accent}10`,
            border: `1.5px solid ${programme.accent}30`,
          }}
        >
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-stone-400">
              Per Day
            </p>
            <p className="text-[10px] text-stone-400">प्रति दिन</p>
          </div>
          <div className="flex items-center gap-1">
            <IndianRupee
              className="w-4 h-4 font-bold"
              style={{ color: programme.accent }}
            />
            <span
              className="text-2xl font-black"
              style={{ color: programme.accent }}
            >
              {programme.pricePerDay.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onBook(programme)}
          className="w-full py-3 rounded-[5px] text-white text-sm font-bold tracking-widest uppercase shadow-lg"
          style={{ backgroundColor: programme.accent }}
        >
          Book Programme Now
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function CommuneTabs() {
  const [selectedService, setSelectedService] = useState(null);
  const [openEnquiryModal, setOpenEnquiryModal] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  function openModal(item) {
    setSelectedService(item);
    setOpenEnquiryModal(true);
  }

  return (
    <div
      className="min-h-screen bg-[#faf9f6]"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img
            src={LivingSwagramaImg}
            alt="Village wisdom"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-[#6e664d]" />
        </motion.div>
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-white/70 text-xs md:text-sm uppercase tracking-[0.25em] mb-4 font-medium"
          >
            Welcome to
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-none mb-2"
          >
            स्वगुरुकुल
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-3xl sm:text-5xl md:text-6xl font-light text-amber-300 tracking-widest mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Commune
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="h-px w-24 bg-amber-400 mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-white/75 text-sm md:text-base max-w-md mx-auto leading-relaxed"
          >
            हर ग्राम स्वग्राम — Reviving India's self-reliant village wisdom
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-8 flex justify-center gap-4"
          >
            <button className="px-6 py-2.5 rounded-full bg-amber-400 text-stone-900 text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors">
              Discover More
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-white/50 text-[10px] uppercase tracking-widest">
            Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            <ChevronDown className="w-5 h-5 text-white/50" />
          </motion.div>
        </motion.div>
      </section>

      <section className="relative py-16 md:py-24 px-4 md:px-12 max-w-6xl mx-auto">
        <div
          className="absolute -top-4 right-0 text-[120px] md:text-[200px] font-black leading-none select-none pointer-events-none opacity-[0.04] text-stone-900"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          स्व
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <AnimSection>
            <motion.div variants={fadeLeft}>
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-600 mb-4">
                <span className="w-8 h-px bg-amber-400 inline-block" />
                Our Mission
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-stone-800 mb-6 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Reviving India's
                <br />
                <em className="text-green-700">Village Wisdom</em>
              </h2>
              <div className="relative rounded-2xl overflow-hidden h-72 md:h-96 shadow-2xl border border-stone-200">
                <AutoVerticalSlider images={missionImages} />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent pointer-events-none z-20" />
                <div className="absolute bottom-6 left-6 right-6 z-30">
                  <p
                    className="text-white text-lg font-bold tracking-tight"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Natural Farming & Toxin-Free Living
                  </p>
                  <p className="text-white/80 text-xs mt-1 font-medium italic">
                    Reviving traditional village wisdom
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimSection>

          <AnimSection>
            <motion.div variants={fadeUp} className="space-y-5 pt-2">
              <motion.div
                variants={fadeUp}
                className="relative bg-white rounded-2xl p-6 border border-stone-100 shadow-sm"
              >
                <div className="absolute -top-3 left-6 w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                  <Leaf className="w-3 h-3 text-white" />
                </div>
                <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                  Today, more people are seeking a healthier and more natural
                  way of living — embracing natural farming, toxin-free food,
                  traditional herbs, and a lifestyle rooted in nature. At the
                  same time, there is a growing desire to reconnect with the
                  wisdom of village life — to revive traditional practices,
                  community living, and a self-sustaining way of life that has
                  defined India for centuries.{" "}
                  <strong className="text-green-700 font-semibold">
                    स्वग्राम Community
                  </strong>
                  .
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="bg-stone-50 rounded-2xl p-6 border border-stone-100"
              >
                <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                  <strong className="text-green-700 font-semibold">
                    स्वग्राम Community{" "}
                  </strong>
                  was created to answer this search. Through the{" "}
                  <strong>स्वगृहकुल Commune</strong>, we empower individuals
                  with the knowledge, training, and guidance to build
                  sustainable village-based ecosystems rooted in Indian
                  traditions. Our vision is to help revive India's strength as a
                  nation of self-reliant villages.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="bg-green-700 rounded-2xl p-5 text-white shadow-xl"
              >
                <p className="text-sm leading-relaxed mb-3">
                  With this purpose, we have launched the{" "}
                </p>
                <div
                  className="inline-block bg-white/15 border border-white/30 rounded-xl px-4 py-2 font-bold text-lg mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  'हर ग्राम स्वग्राम'
                </div>
                <p className="text-sm leading-relaxed text-white/85">
                  campaign. To support this movement and turn the vision into
                  reality, we have established the{" "}
                  <strong className="text-amber-300">Swagram Academy.</strong>
                </p>
              </motion.div>
            </motion.div>
          </AnimSection>
        </div>
      </section>

      <AnimSection className="overflow-hidden py-4 px-4 md:px-12 max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-3 gap-2 md:gap-3 rounded-2xl overflow-hidden"
        >
          {[
            {
              url: SustainableFields,
              label: "Sustainable Fields",
            },
            {
              url: SugarcaneImg,
              label: "Village Life",
            },
            {
              url: OldVilageImge,
              label: "Ancient Wisdom",
            },
          ].map((img, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={scaleIn}
              className="relative group rounded-xl overflow-hidden aspect-[3/2]"
            >
              <img
                src={img.url}
                alt={img.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </AnimSection>

      <section className="py-16 md:py-24 ">
        <AnimSection className="w-full mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-600 mb-3">
              <span className="w-8 h-px bg-amber-400 inline-block" />
              Admissions Open
              <span className="w-8 h-px bg-amber-400 inline-block" />
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-stone-800"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Seasonal Academy
            </h2>
            <p className="text-stone-500 mt-2 text-sm max-w-md mx-auto">
              Immerse yourself in a season of learning, living, and growing
            </p>
            <div className="h-px w-16 bg-amber-400 mx-auto mt-4" />
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden mb-8 shadow-2xl"
          >
            <img
              src={LivingSwagramaImg}
              alt="Seasonal academy"
              className="w-full h-48 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12">
              <p className="text-amber-300 text-xs uppercase tracking-widest mb-2 font-semibold">
                स्वऋतुविहार
              </p>
              <h3
                className="text-white text-2xl md:text-4xl font-bold mb-2 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Live the Season.
                <br className="hidden md:block" />
                Learn the Land.
              </h3>
              <p className="text-white/70 text-xs md:text-sm max-w-xs">
                120+ days of immersive village living, farming & traditional
                wisdom
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-12"
          >
            {academyData.map((item, i) => (
              <SeasonCard key={i} item={item} index={i} onBook={openModal} />
            ))}
          </motion.div>
        </AnimSection>
      </section>

      <div className="relative py-12 overflow-hidden ">
        <div className="absolute inset-0">
          <img
            src={indoorInterior}
            alt="Nature"
            className="w-full h-full object-cover"
          />
        </div>
        <AnimSection className="relative z-10 max-w-2xl mx-auto text-center px-6 py-20">
          <motion.blockquote variants={fadeUp} className="text-white">
            <p
              className="text-2xl md:text-3xl font-light mb-4 leading-relaxed"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
              }}
            >
              "To build a self-reliant nation, we must first build self-reliant
              villages."
            </p>
            <footer className="text-white/60 text-xs uppercase tracking-widest">
              — Swagram Academy Vision
            </footer>
          </motion.blockquote>
        </AnimSection>
      </div>
      <section className="py-16 md:py-24 px-4 md:px-12">
        <AnimSection className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-600 mb-3">
              <span className="w-8 h-px bg-amber-400 inline-block" />
              Specialised Programmes
              <span className="w-8 h-px bg-amber-400 inline-block" />
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold text-stone-800"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Extended Stays &
              <br />
              <em className="text-green-700">Free Living</em>
            </h2>
            <div className="h-px w-16 bg-amber-400 mx-auto mt-4" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {academyProgrammes.map((programme, index) => (
              <ProgrammeCard
                key={programme.programmeId}
                programme={programme}
                index={index}
                onBook={openModal}
              />
            ))}
          </motion.div>
        </AnimSection>
      </section>
      {openEnquiryModal && (
        <MembershipRegistrationModal
          open={openEnquiryModal}
          handleClose={() => {
            setOpenEnquiryModal(false);
            setSelectedService(null);
          }}
          membershipDetails={selectedService}
        />
      )}
    </div>
  );
}

