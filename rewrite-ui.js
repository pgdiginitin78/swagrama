const fs = require("fs");
const file = "src/components/pages/privacypolicy/PrivacyPolicyNew.jsx";

let content = fs.readFileSync(file, "utf8");

const sectionsStart = content.indexOf("const sections = [");
const sectionsEnd = content.indexOf("];\n", sectionsStart) + 2;

if (sectionsStart === -1 || sectionsEnd === -1) {
  console.log("Could not find sections");
  process.exit(1);
}

const sectionsCode = content.substring(sectionsStart, sectionsEnd);

const newHeader = `import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Spa as SpaIcon,
  InfoOutlined as InfoOutlinedIcon,
  CollectionsBookmarkOutlined as CollectionsBookmarkOutlinedIcon,
  TuneOutlined as TuneOutlinedIcon,
  CookieOutlined as CookieOutlinedIcon,
  ShareOutlined as ShareOutlinedIcon,
  VerifiedUserOutlined as VerifiedUserOutlinedIcon,
  GppGoodOutlined as GppGoodOutlinedIcon,
  CalendarMonthOutlined as CalendarMonthOutlinedIcon,
  LinkOutlined as LinkOutlinedIcon,
  ChildCareOutlined as ChildCareOutlinedIcon,
  EditNoteOutlined as EditNoteOutlinedIcon,
  MarkEmailUnreadOutlined as MarkEmailUnreadOutlinedIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  ScheduleOutlined as ScheduleOutlinedIcon,
  StorefrontOutlined as StorefrontOutlinedIcon,
  EmailOutlined as EmailOutlinedIcon,
  LocalFloristOutlined as LocalFloristOutlinedIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from "@mui/icons-material";
import { MdEco } from "react-icons/md";

import heroImg from "../../../../assets/images/ayurveda_hero_bg.png";
import securityImg from "../../../../assets/images/ayurveda_security.png";
import pathImg from "../../../../assets/images/ayurveda_nature_path.png";

const p = {
  sage: "#4a7c59",
  sageLight: "#6a9b74",
  sageMist: "#e8f0e9",
  lime: "#7aad35",
  limeLight: "#c4e07a",
  limeMist: "#f0f8e2",
  brown: "#7c5c2e",
  brownLight: "#b8915a",
  brownMist: "#f5efe6",
  cream: "#faf8f3",
  parchment: "#f0ead8",
  bark: "#5c4a2a",
  td: "#2d2416",
  tm: "#5a4a35",
  tl: "#8a7660",
  border: "#d8cdb8",
  gold: "#c9961a",
  goldMist: "#fdf6e0",
};

`;

const newFooter = `

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return \`rgba(\${r}, \${g}, \${b}, \${alpha})\`;
};

// --- Animations ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

// --- Beautiful Image Card ---
function ImageReveal({ src, alt }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="my-10 rounded-[32px] overflow-hidden shadow-2xl relative"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
      <img src={src} alt={alt} className="w-full h-[400px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-[20s] ease-linear" />
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 flex items-center gap-2">
        <MdEco className="text-white text-2xl drop-shadow-md" />
        <span className="text-white font-['Cormorant_Garamond'] text-lg md:text-xl font-medium tracking-wide drop-shadow-md">Swagrama Wellness</span>
      </div>
    </motion.div>
  );
}

function SectionContent({ section, index }) {
  const Icon = section.IconComponent;
  return (
    <motion.div
      id={section.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="mb-24 scroll-mt-32"
    >
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-8">
        <motion.div variants={fadeInUp} className="w-16 h-16 rounded-full flex items-center justify-center shrink-0" style={{ background: hexToRgba(section.accent, 0.1) }}>
          <Icon style={{ fontSize: 32, color: section.accent }} />
        </motion.div>
        <div>
          <motion.h2 variants={fadeInUp} className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-3" style={{ color: p.td }}>
            {section.title}
          </motion.h2>
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: hexToRgba(section.accent, 0.1), color: section.accent }}>{section.number}</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.border }} />
            <span className="font-['Cormorant_Garamond'] text-xl italic opacity-90" style={{ color: p.tl }}>{section.tagline}</span>
          </motion.div>
        </div>
      </div>

      <div className="space-y-6">
        {section.content.map((block, i) => {
          if (block.type === "para") {
            return (
              <motion.p key={i} variants={fadeInUp} className="font-['Cormorant_Garamond'] text-xl leading-relaxed" style={{ color: p.tm }}>
                {block.text}
              </motion.p>
            );
          }
          if (block.type === "subtitle") {
            return (
              <motion.h3 key={i} variants={fadeInUp} className="font-['Playfair_Display'] flex items-center gap-2 text-2xl font-semibold mt-10 mb-4" style={{ color: section.accent }}>
                <LocalFloristOutlinedIcon fontSize="inherit" />
                {block.text}
              </motion.h3>
            );
          }
          if (block.type === "list") {
            return (
              <motion.div key={i} variants={fadeInUp} className="pl-2 space-y-4">
                {block.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CheckCircleOutlineIcon style={{ fontSize: 22, color: section.accent, marginTop: "2px" }} className="shrink-0" />
                    <span className="font-['Cormorant_Garamond'] text-xl leading-relaxed" style={{ color: p.tm }}>{item}</span>
                  </div>
                ))}
              </motion.div>
            );
          }
          if (block.type === "contact") {
            return (
              <motion.div key={i} variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {block.items.map((item, j) => {
                  const CIcon = item.ContactIcon;
                  return (
                    <div key={j} className="p-6 rounded-[24px] border border-opacity-30 flex items-center gap-4 bg-white/50 backdrop-blur-sm" style={{ borderColor: p.border }}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: hexToRgba(section.accent, 0.1) }}>
                        <CIcon style={{ color: section.accent }} />
                      </div>
                      <div>
                        <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: section.accent }}>{item.label}</div>
                        <div className="font-['Cormorant_Garamond'] text-lg md:text-xl" style={{ color: p.td }}>{item.value}</div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            );
          }
          return null;
        })}
      </div>
    </motion.div>
  );
}

export default function SwagramaPrivacyPolicy() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Handle smooth scroll for anchor links
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen relative" style={{ background: p.cream }}>
      {/* Scroll Progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 z-[2000] origin-left"
        initial={{ backgroundColor: p.sage }}
        animate={{ backgroundColor: p.sage }}
      />

      {/* Hero Section */}
      <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img src={heroImg} alt="Ayurveda Wellness" className="w-full h-full object-cover" />
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-white/60" />
              <MdEco className="text-white/90 text-2xl" />
              <span className="text-white/90 text-sm tracking-[0.3em] uppercase font-semibold">Swagrama Community</span>
              <span className="w-12 h-[1px] bg-white/60" />
            </div>
            <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
              Privacy & Trust
            </h1>
            <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              Rooted in transparency and the healing <br className="hidden md:block"/> traditions of Ayurveda.
            </p>
          </motion.div>
        </motion.div>

        {/* Decorative Wave Transition */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
          <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C52.16,112.92,120.3,121.37,184.4,115.35Z" fill={p.cream}></path>
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-30">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Simple Sticky Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 space-y-4">
              <div className="flex items-center gap-2 mb-8">
                <SpaIcon style={{ color: p.sage }} />
                <span className="font-['Playfair_Display'] text-xl font-bold" style={{ color: p.td }}>Contents</span>
              </div>
              {sections.map(s => (
                <div key={s.id} className="group flex items-center gap-3 mb-2">
                  <div className="w-6 h-px transition-all duration-300 group-hover:w-10 group-hover:bg-opacity-100" style={{ background: p.sage, opacity: 0.3 }} />
                  <a href={\`#\${s.id}\`} onClick={(e) => scrollTo(e, s.id)} className="font-['Cormorant_Garamond'] text-xl transition-all duration-300 hover:font-bold" style={{ color: p.tm }}>
                    {s.title}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          <div className="flex-1 max-w-3xl">
            {sections.map((section, index) => (
              <div key={section.id}>
                <SectionContent section={section} index={index} />
                {index === 1 && (
                  <ImageReveal src={pathImg} alt="Ayurvedic Garden Path" />
                )}
                {index === 5 && (
                  <ImageReveal src={securityImg} alt="Trust and Security" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
`;

const newFileContent = newHeader + sectionsCode + newFooter;
fs.writeFileSync(file, newFileContent, "utf8");
console.log("Successfully completed Rewrite");
