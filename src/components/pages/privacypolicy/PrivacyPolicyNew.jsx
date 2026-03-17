import { useState, useRef, useEffect, Suspense } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Environment } from "@react-three/drei";
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
  KeyboardArrowUp as KeyboardArrowUpIcon,
  FormatListBulleted as FormatListBulletedIcon,
  Close as CloseIcon,
  FiberManualRecord as FiberManualRecordIcon,
  LocalFloristOutlined as LocalFloristOutlinedIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  EmailOutlined as EmailOutlinedIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  ScheduleOutlined as ScheduleOutlinedIcon,
  StorefrontOutlined as StorefrontOutlinedIcon,
} from "@mui/icons-material";
import { MdEco } from "react-icons/md";

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

const sections = [
  {
    id: "introduction",
    number: "01",
    title: "Introduction",
    IconComponent: InfoOutlinedIcon,
    color: p.sageMist,
    accent: p.sage,
    tagline: "Who we are & what we stand for",
    content: [
      {
        type: "para",
        text: "Welcome to Swagrama Community — a sanctuary where ancient Ayurvedic wisdom meets conscious eco-living. We offer wellness stays, holistic programmes, nature-based retreats, and seamless online bookings rooted in the healing traditions of India.",
      },
      {
        type: "para",
        text: "This Privacy Policy explains how Swagrama Community ('we', 'us', or 'our') collects, uses, and protects your personal information when you visit our website or use our services. We treat your data with the same care and reverence we bring to every aspect of your wellness journey.",
      },
      {
        type: "para",
        text: "By using our platform, you agree to the practices described in this policy. Please read it thoughtfully.",
      },
    ],
  },
  {
    id: "information-collected",
    number: "02",
    title: "Information We Collect",
    IconComponent: CollectionsBookmarkOutlinedIcon,
    color: p.limeMist,
    accent: p.lime,
    tagline: "What data we gather from you",
    content: [
      { type: "subtitle", text: "Personal Details" },
      {
        type: "list",
        items: [
          "Full name, email address, and phone number",
          "Date of birth and gender (for personalised wellness programmes)",
          "Mailing or billing address",
          "Health preferences and dietary requirements (shared voluntarily)",
        ],
      },
      { type: "subtitle", text: "Booking & Payment Information" },
      {
        type: "list",
        items: [
          "Programme and stay selections, dates, and preferences",
          "Payment details processed securely via trusted gateways (we do not store card numbers)",
          "Transaction history and booking confirmations",
        ],
      },
      { type: "subtitle", text: "Usage & Technical Data" },
      {
        type: "list",
        items: [
          "IP address, browser type, and device information",
          "Pages visited, time spent, and navigation patterns",
          "Referral sources and search queries on our platform",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    number: "03",
    title: "How We Use Your Information",
    IconComponent: TuneOutlinedIcon,
    color: p.goldMist,
    accent: p.gold,
    tagline: "How your data serves your experience",
    content: [
      {
        type: "para",
        text: "Every piece of information we collect serves a clear purpose aligned with your wellness experience:",
      },
      {
        type: "list",
        items: [
          "Account creation and seamless management of your profile",
          "Processing bookings, payments, and reservation confirmations",
          "Sending service updates, booking reminders, and wellness newsletters",
          "Providing personalised programme recommendations based on your preferences",
          "Responding to your queries, feedback, and support requests",
          "Continuously improving our platform, services, and user experience",
          "Complying with applicable Indian laws and regulatory obligations",
        ],
      },
      {
        type: "para",
        text: "We will never use your data for purposes unrelated to your Swagrama experience without your explicit consent.",
      },
    ],
  },
  {
    id: "cookies",
    number: "04",
    title: "Cookies & Tracking",
    IconComponent: CookieOutlinedIcon,
    color: p.brownMist,
    accent: p.brownLight,
    tagline: "Small files, big transparency",
    content: [
      {
        type: "para",
        text: "Like roots that help a tree understand its soil, cookies help us understand how you interact with our platform so we can serve you better.",
      },
      { type: "subtitle", text: "We use:" },
      {
        type: "list",
        items: [
          "Essential Cookies — necessary for core functionality such as login sessions and bookings",
          "Analytics Cookies — tools like Google Analytics to understand traffic and improve content",
          "Preference Cookies — to remember your language, location, and display settings",
          "Marketing Cookies — only with your consent, to show relevant wellness content",
        ],
      },
      {
        type: "para",
        text: "You can manage or disable cookies through your browser settings at any time. Disabling certain cookies may limit some features of the website.",
      },
    ],
  },
  {
    id: "sharing",
    number: "05",
    title: "Sharing of Information",
    IconComponent: ShareOutlinedIcon,
    color: p.sageMist,
    accent: p.sage,
    tagline: "When and with whom we share",
    content: [
      {
        type: "para",
        text: "Your trust is sacred to us. We do not sell or rent your personal information to any third party. We share data only when necessary and with trusted partners:",
      },
      {
        type: "list",
        items: [
          "Payment Gateways (e.g., Razorpay, PayU) — solely to process transactions securely",
          "Analytics Providers — aggregated, anonymised data to improve our services",
          "Email & Communication Tools — to send booking confirmations and wellness updates",
          "Legal Authorities — only when required to comply with applicable Indian law or court orders",
        ],
      },
      {
        type: "para",
        text: "All third-party service providers are bound by confidentiality obligations and are prohibited from using your data for any other purpose.",
      },
    ],
  },
  {
    id: "data-security",
    number: "06",
    title: "Data Security",
    IconComponent: VerifiedUserOutlinedIcon,
    color: p.limeMist,
    accent: p.lime,
    tagline: "How we protect what you share",
    content: [
      {
        type: "para",
        text: "Just as Ayurveda protects the balance of body, mind, and spirit, we are committed to protecting your personal data through robust security measures:",
      },
      {
        type: "list",
        items: [
          "SSL/TLS encryption for all data transmitted on our platform",
          "Secure, access-controlled servers with regular security audits",
          "Strict internal access controls — only authorised personnel may access your data",
          "Regular monitoring for unauthorised access or data breaches",
        ],
      },
      {
        type: "para",
        text: "While we employ industry-standard safeguards, no online system is entirely risk-free. We encourage you to use strong passwords and to log out after each session.",
      },
    ],
  },
  {
    id: "user-rights",
    number: "07",
    title: "Your Rights",
    IconComponent: GppGoodOutlinedIcon,
    color: p.goldMist,
    accent: p.gold,
    tagline: "Control over your personal data",
    content: [
      {
        type: "para",
        text: "You are always in control of your personal information. You have the right to:",
      },
      {
        type: "list",
        items: [
          "Access the personal data we hold about you",
          "Request corrections to inaccurate or incomplete information",
          "Request deletion of your account and associated data",
          "Withdraw consent for marketing and promotional communications at any time",
          "Raise concerns or lodge a complaint regarding how your data is handled",
        ],
      },
      {
        type: "para",
        text: "To exercise any of these rights, please write to us at the contact details provided below. We will respond within 30 days.",
      },
    ],
  },
  {
    id: "data-retention",
    number: "08",
    title: "Data Retention",
    IconComponent: CalendarMonthOutlinedIcon,
    color: p.brownMist,
    accent: p.brown,
    tagline: "How long we keep your information",
    content: [
      {
        type: "para",
        text: "We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy:",
      },
      {
        type: "list",
        items: [
          "Account data is retained for the duration your account remains active",
          "Booking and transaction records are kept for up to 7 years as required under Indian financial regulations",
          "Marketing preferences and communication history are retained until you opt out",
          "Analytics data is stored in anonymised form for up to 24 months",
        ],
      },
      {
        type: "para",
        text: "Upon account deletion, we will remove or anonymise your data within 30 days, except where retention is legally mandated.",
      },
    ],
  },
  {
    id: "third-party-links",
    number: "09",
    title: "Third-Party Links",
    IconComponent: LinkOutlinedIcon,
    color: p.sageMist,
    accent: p.sageLight,
    tagline: "External sites and our responsibility",
    content: [
      {
        type: "para",
        text: "Our website may contain links to external websites, wellness resources, partner organisations, or social media platforms. These links are provided for your convenience and information.",
      },
      {
        type: "para",
        text: "Swagrama Community is not responsible for the privacy practices, content, or data policies of any third-party websites. We encourage you to review the privacy policy of any external site you visit. Clicking on a third-party link does not imply our endorsement of that website.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    number: "10",
    title: "Children's Privacy",
    IconComponent: ChildCareOutlinedIcon,
    color: p.limeMist,
    accent: p.lime,
    tagline: "Protecting younger members of our community",
    content: [
      {
        type: "para",
        text: "Swagrama Community is designed for adults aged 18 and above. We do not knowingly collect personal information from individuals under the age of 18.",
      },
      {
        type: "para",
        text: "If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. We will take prompt steps to delete such information from our records.",
      },
      {
        type: "para",
        text: "Family and youth wellness programmes are managed through a parent or guardian's verified account.",
      },
    ],
  },
  {
    id: "policy-changes",
    number: "11",
    title: "Changes to This Policy",
    IconComponent: EditNoteOutlinedIcon,
    color: p.goldMist,
    accent: p.gold,
    tagline: "How we communicate updates",
    content: [
      {
        type: "para",
        text: "As our community grows and services evolve, this Privacy Policy may be updated from time to time to reflect new practices or legal requirements.",
      },
      {
        type: "para",
        text: "When we make material changes, we will notify you by email (if you have an account) and display a prominent notice on our website. The 'Last Updated' date at the top of this page will always reflect the most recent revision.",
      },
      {
        type: "para",
        text: "We encourage you to review this policy periodically. Continued use of our platform after changes are posted constitutes your acceptance of the updated policy.",
      },
    ],
  },
  {
    id: "contact",
    number: "12",
    title: "Contact Us",
    IconComponent: MarkEmailUnreadOutlinedIcon,
    color: p.brownMist,
    accent: p.brownLight,
    tagline: "Reach out — we're here for you",
    content: [
      {
        type: "para",
        text: "We welcome your questions, concerns, and feedback about this Privacy Policy or how we handle your data. Please reach out to us:",
      },
      {
        type: "contact",
        items: [
          {
            label: "Platform",
            value: "Swagrama Community",
            ContactIcon: StorefrontOutlinedIcon,
          },
          {
            label: "Email",
            value: "swagrama.lavale@gmail.com",
            ContactIcon: EmailOutlinedIcon,
          },
     
          {
            label: "Location",
            value: "India",
            ContactIcon: LocationOnOutlinedIcon,
          },
          {
            label: "Response Time",
            value: "Within 30 business days",
            ContactIcon: ScheduleOutlinedIcon,
          },
        ],
      },
      {
        type: "para",
        text: "We are committed to resolving your concerns transparently and in the spirit of trust that forms the foundation of Swagrama Community.",
      },
    ],
  },
];

// --- 3D Background Objects ---
const BackgroundScene = () => {
  const { scrollYProgress } = useScroll();
  
  // Create a ref to spin the sphere based on scroll
  const sphereRef = useRef(null);
  
  useFrame((state, delta) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x += delta * 0.1;
      sphereRef.current.rotation.y += delta * 0.15;
      
      // Add subtle scroll-based movement
      const scrollVal = scrollYProgress.get();
      sphereRef.current.position.y = Math.sin(scrollVal * Math.PI * 2) * 2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color={p.sageLight} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color={p.gold} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={sphereRef} position={[2, 0, -5]} scale={1.8}>
          <Sphere args={[1, 64, 64]}>
            <MeshDistortMaterial
              color={p.sageMist}
              attach="material"
              distort={0.4}
              speed={1.5}
              roughness={0.2}
              metalness={0.1}
              transparent
              opacity={0.6}
            />
          </Sphere>
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, 2, -10]} scale={1.2}>
          <Sphere args={[1, 32, 32]}>
            <MeshDistortMaterial
              color={p.limeLight}
              attach="material"
              distort={0.3}
              speed={2}
              roughness={0.4}
              transparent
              opacity={0.4}
            />
          </Sphere>
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[4, -3, -8]} scale={0.9}>
          <Sphere args={[1, 32, 32]}>
            <MeshDistortMaterial
              color={p.goldMist}
              attach="material"
              distort={0.5}
              speed={1.2}
              roughness={0.1}
              transparent
              opacity={0.5}
            />
          </Sphere>
        </mesh>
      </Float>
    </>
  );
};

// --- Components ---

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 z-[1300] origin-left bg-gradient-to-r from-[#4a7c59] via-[#7aad35] to-[#c9961a]"
    />
  );
}

function SectionCard({ section }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(true);
  const Icon = section.IconComponent;

  // Add hex opacity helper
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8"
    >
      <div 
        className="rounded-[24px] overflow-hidden transition-all duration-300 hover:-translate-y-1 relative z-10"
        style={{
          background: hexToRgba(section.color, 0.7),
          border: `1.5px solid ${hexToRgba(section.accent, 0.2)}`,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          onClick={() => setExpanded(!expanded)}
          className="px-6 md:px-10 pt-6 md:pt-8 pb-5 md:pb-6 cursor-pointer select-none"
          style={{
            background: `linear-gradient(135deg, ${hexToRgba(section.accent, 0.08)} 0%, ${hexToRgba(section.accent, 0.02)} 100%)`,
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <motion.div
                whileHover={{ rotate: [0, -12, 12, 0], scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${hexToRgba(section.accent, 0.15)}, ${hexToRgba(section.accent, 0.05)})`,
                  border: `1px solid ${hexToRgba(section.accent, 0.25)}`,
                  boxShadow: `0 4px 15px ${hexToRgba(section.accent, 0.15)}`,
                }}
              >
                <Icon style={{ fontSize: 28, color: section.accent }} />
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span 
                    className="px-2 py-0.5 text-xs font-bold rounded-full font-mono"
                    style={{
                      background: hexToRgba(section.accent, 0.12),
                      color: section.accent,
                      border: `1px solid ${hexToRgba(section.accent, 0.2)}`,
                    }}
                  >
                    {section.number}
                  </span>
                  <span 
                    className="hidden sm:flex px-2 py-0.5 text-xs rounded-full font-['Cormorant_Garamond']"
                    style={{
                      background: "rgba(255,255,255,0.6)",
                      color: p.tl,
                      border: `1px solid ${p.border}`,
                    }}
                  >
                    {section.tagline}
                  </span>
                </div>
                <h2 
                  className="font-['Playfair_Display'] text-xl md:text-2xl font-bold leading-tight"
                  style={{ color: p.td }}
                >
                  {section.title}
                </h2>
              </div>
            </div>
            
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors"
              style={{
                background: hexToRgba(section.accent, 0.08),
                border: `1px solid ${hexToRgba(section.accent, 0.2)}`,
                color: section.accent,
              }}
              title={expanded ? "Collapse" : "Expand"}
            >
              <motion.div animate={{ rotate: expanded ? 0 : 180 }} transition={{ duration: 0.3 }}>
                <KeyboardArrowUpIcon fontSize="small" />
              </motion.div>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mx-6 md:mx-10 h-px" style={{ background: hexToRgba(section.accent, 0.1) }} />
              <div className="px-6 md:px-10 py-6 md:py-8">
                {section.content.map((block, i) => {
                  if (block.type === "para")
                    return (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="font-['Cormorant_Garamond'] text-base md:text-lg mb-4 leading-[1.8]"
                        style={{ color: p.tm }}
                      >
                        {block.text}
                      </motion.p>
                    );
                  if (block.type === "subtitle")
                    return (
                      <div key={i} className="flex items-center gap-2 mt-6 mb-2">
                        <LocalFloristOutlinedIcon style={{ fontSize: 16, color: section.accent, opacity: 0.8 }} />
                        <h3 
                          className="font-['Playfair_Display'] text-base md:text-lg font-semibold"
                          style={{ color: section.accent }}
                        >
                          {block.text}
                        </h3>
                      </div>
                    );
                  if (block.type === "list")
                    return (
                      <div key={i} className="mb-4">
                        {block.items.map((item, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + j * 0.05 }}
                            className="flex items-start gap-3 py-2 px-4 mb-2 rounded-xl transition-all duration-200 hover:translate-x-1"
                            style={{
                              background: "rgba(255,255,255,0.4)",
                              border: `1px solid ${hexToRgba(section.accent, 0.08)}`,
                            }}
                          >
                            <CheckCircleOutlineIcon 
                              style={{ fontSize: 18, color: section.accent, marginTop: "2px", opacity: 0.8 }} 
                              className="shrink-0"
                            />
                            <p 
                              className="font-['Cormorant_Garamond'] text-[15px] md:text-base leading-relaxed"
                              style={{ color: p.tm }}
                            >
                              {item}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    );
                  if (block.type === "contact")
                    return (
                      <div
                        key={i}
                        className="rounded-2xl overflow-hidden mb-4 border relative"
                        style={{
                          borderColor: hexToRgba(section.accent, 0.2),
                          background: "rgba(255,255,255,0.45)",
                        }}
                      >
                        {block.items.map((item, j) => {
                          const CIcon = item.ContactIcon;
                          return (
                            <motion.div
                              key={j}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 + j * 0.08 }}
                              className="flex items-center gap-3 px-5 md:px-6 py-3 border-b last:border-b-0 hover:bg-white/20 transition-colors"
                              style={{ borderColor: `${p.border}40` }}
                            >
                              <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                                style={{ background: hexToRgba(section.accent, 0.1) }}
                              >
                                <CIcon style={{ fontSize: 18, color: section.accent }} />
                              </div>
                              <span 
                                className="font-['Playfair_Display'] text-sm font-semibold min-w-[100px] shrink-0"
                                style={{ color: section.accent }}
                              >
                                {item.label}
                              </span>
                              <span 
                                className="font-['Cormorant_Garamond'] text-base flex-1"
                                style={{ color: p.tm }}
                              >
                                {item.value}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    );
                  return null;
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TableOfContents({ activeSection, onSelect }) {
  const [openMobileTOC, setOpenMobileTOC] = useState(false);
  
  // Custom hook replacement for useMediaQuery
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 1024);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  if (isMobile) {
    return (
      <div className="fixed bottom-6 right-5 z-[1200]">
        <AnimatePresence>
          {openMobileTOC && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute bottom-[70px] right-0 rounded-[20px] p-2.5 w-[240px] max-h-[60vh] overflow-y-auto shadow-2xl backdrop-blur-md border border-white/40"
              style={{ background: hexToRgba(p.cream, 0.95) }}
            >
              <div className="px-2 pb-2 mb-1 border-b" style={{ borderColor: p.border }}>
                <span className="font-['Playfair_Display'] text-xs font-bold uppercase tracking-widest" style={{ color: p.tl }}>
                  Contents
                </span>
              </div>
              {sections.map((s) => {
                const Icon = s.IconComponent;
                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      onSelect(s.id);
                      setOpenMobileTOC(false);
                    }}
                    className="flex items-center gap-3 py-2 px-3 rounded-xl cursor-pointer transition-colors"
                    style={{
                      background: activeSection === s.id ? hexToRgba(p.sage, 0.1) : "transparent",
                    }}
                  >
                    <Icon style={{ fontSize: 16, color: activeSection === s.id ? s.accent : p.tl }} />
                    <span 
                      className="font-['Cormorant_Garamond'] text-[15px]"
                      style={{ 
                        color: activeSection === s.id ? s.accent : p.tm,
                        fontWeight: activeSection === s.id ? 600 : 400
                      }}
                    >
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setOpenMobileTOC(!openMobileTOC)}
          className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl focus:outline-none z-50 relative"
          style={{ background: `linear-gradient(135deg, ${p.sage}, ${p.sageLight})` }}
        >
          {openMobileTOC ? <CloseIcon /> : <FormatListBulletedIcon />}
        </motion.button>
      </div>
    );
  }

  return (
    <div className="sticky top-24 z-10 w-full xl:w-[320px]">
      <div 
        className="rounded-[24px] overflow-hidden backdrop-blur-xl border border-white/40 shadow-xl"
        style={{ background: hexToRgba(p.cream, 0.75) }}
      >
        {/* Header */}
        <div 
          className="px-6 py-5 border-b"
          style={{ 
            background: `linear-gradient(135deg, ${hexToRgba(p.sage, 0.08)}, transparent)`,
            borderColor: p.border 
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <SpaIcon style={{ fontSize: 20, color: p.sage }} />
            <h3 className="font-['Playfair_Display'] text-base font-bold" style={{ color: p.td }}>
              Contents
            </h3>
          </div>
          <p className="font-['Cormorant_Garamond'] text-xs uppercase tracking-wide" style={{ color: p.tl }}>
            12 sections · Privacy Policy
          </p>
        </div>

        {/* List */}
        <div className="p-3">
          {sections.map((s) => {
            const Icon = s.IconComponent;
            const active = activeSection === s.id;
            return (
              <motion.div key={s.id} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                <div
                  onClick={() => onSelect(s.id)}
                  className="flex items-center gap-3 py-2 px-3 rounded-xl cursor-pointer transition-all duration-300"
                  style={{
                    background: active ? hexToRgba(s.accent, 0.08) : "transparent",
                  }}
                >
                  {/* Indicator Line */}
                  <div 
                    className="w-1 h-8 rounded-full transition-all duration-300"
                    style={{ 
                      background: active ? s.accent : "transparent",
                      transform: active ? "scaleY(1)" : "scaleY(0.5)"
                    }} 
                  />
                  <Icon style={{ fontSize: 16, color: active ? s.accent : p.tl }} />
                  <span 
                    className="font-['Cormorant_Garamond'] text-[15px] flex-1 truncate"
                    style={{ 
                      color: active ? s.accent : p.tm,
                      fontWeight: active ? 700 : 500
                    }}
                  >
                    {s.title}
                  </span>
                  <span className="text-[10px] font-mono opacity-50" style={{ color: p.tl }}>
                    {s.number}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div 
          className="px-6 py-4 border-t flex items-center justify-between"
          style={{ borderColor: p.border, background: hexToRgba(p.sage, 0.03) }}
        >
          <div className="flex items-center gap-2">
            <FiberManualRecordIcon style={{ fontSize: 8, color: p.sage }} className="animate-pulse" />
            <span className="font-['Cormorant_Garamond'] text-xs font-semibold" style={{ color: p.sage }}>
              Active Version
            </span>
          </div>
          <span className="font-['Cormorant_Garamond'] text-xs opacity-70" style={{ color: p.tl }}>
            Updated: June 2025
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SwagramaPrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(null);
  
  // Parallax effects for the hero section
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      // Adjusted offset for the fixed header height if any
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-15% 0px -65% 0px" }
    );
    
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#faf8f3] text-[#2d2416] selection:bg-[#4a7c59] selection:text-white font-['Cormorant_Garamond']">
      <ReadingProgress />

      {/* Fixed 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <BackgroundScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Main Content Area - Scrollable */}
      <main className="relative z-10 w-full overflow-hidden flex flex-col items-center">
        
        {/* Modern Hero Section */}
        <motion.section 
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative w-[96%] max-w-7xl mx-auto mt-6 md:mt-10 rounded-[40px] overflow-hidden"
        >
          {/* Glassmorphic Background for Hero */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[40px] border border-white/60"></div>
          
          <div className="absolute inset-0 bg-gradient-to-br from-[#4a7c59]/80 via-[#6a9b74]/60 to-[#7aad35]/40 opacity-90 mix-blend-multiply"></div>
          
          {/* Decorative Orbs inside Hero */}
          <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-[#c4e07a] rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-[#c9961a] rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>

          <div className="relative z-10 py-24 md:py-32 px-6 lg:px-12 flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center mb-8 shadow-2xl"
            >
              <SpaIcon style={{ fontSize: 40, color: "white" }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="font-['Playfair_Display'] text-xs md:text-sm tracking-[0.3em] text-white/80 uppercase mb-4 block font-bold">
                Swagrama Community
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.1] tracking-tight mb-8"
              style={{ textShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
            >
              Privacy Policy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="max-w-2xl text-xl md:text-2xl text-white/90 italic font-medium leading-relaxed"
            >
              "Rooted in transparency, nourished by trust — how we honour your personal journey with us."
            </motion.p>
          </div>
        </motion.section>

        {/* Content Section */}
        <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-20">
          
          {/* Desktop Table of Contents Sidebar */}
          <div className="hidden lg:block lg:w-1/4 shrink-0 mt-2">
            <TableOfContents activeSection={activeSection} onSelect={scrollTo} />
          </div>

          {/* Main Content Sections */}
          <div className="w-full lg:w-3/4 flex flex-col gap-2">
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-28">
                <SectionCard section={section} />
              </div>
            ))}

            {/* Footer Trust Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mt-12 rounded-[32px] overflow-hidden p-[2px] bg-gradient-to-br from-[#4a7c59] via-[#7aad35] to-[#c9961a]"
            >
              <div className="bg-[#faf8f3] rounded-[30px] p-8 md:p-14 text-center relative overflow-hidden h-full w-full">
                
                {/* Decorative BG spots */}
                <div className="absolute top-[-20%] left-[-10%] w-60 h-60 bg-[#e8f0e9] rounded-full blur-[60px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-60 h-60 bg-[#f0f8e2] rounded-full blur-[60px]" />

                <div className="relative z-10 relative flex flex-col items-center">
                  <motion.div
                    animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-6 flex justify-center"
                  >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#4a7c59]/20 to-transparent flex items-center justify-center backdrop-blur-sm border border-[#4a7c59]/10">
                      <SpaIcon style={{ fontSize: 44, color: p.sage }} />
                    </div>
                  </motion.div>

                  <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2d2416] mb-4">
                    Your Trust is Our Foundation
                  </h2>
                  
                  <p className="font-['Cormorant_Garamond'] text-lg md:text-xl text-[#5a4a35] max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                    At Swagrama Community, every decision we make — from the
                    programmes we offer to the data we collect — is guided by
                    the Ayurvedic principle of <span className="italic font-bold text-[#4a7c59]">ahimsa</span>: do no harm.
                    Thank you for placing your trust in us.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4">
                    {[
                      { Icon: VerifiedUserOutlinedIcon, label: "Secure & Encrypted" },
                      { Icon: GppGoodOutlinedIcon, label: "Your Rights Protected" },
                      { Icon: MdEco, label: "Ethically Conscious" },
                    ].map(({ Icon, label }) => (
                      <div 
                        key={label}
                        className="flex items-center gap-2 py-2 px-5 rounded-full bg-white border border-[#d8cdb8] shadow-sm transform transition hover:-translate-y-1 hover:shadow-md"
                      >
                        <Icon style={{ fontSize: 18, color: p.sage }} />
                        <span className="font-['Cormorant_Garamond'] text-[15px] md:text-base font-semibold text-[#5a4a35]">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </main>
    </div>
  );
}
