import {
    CalendarMonthOutlined as CalendarMonthOutlinedIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
    ChildCareOutlined as ChildCareOutlinedIcon,
    CollectionsBookmarkOutlined as CollectionsBookmarkOutlinedIcon,
    CookieOutlined as CookieOutlinedIcon,
    EditNoteOutlined as EditNoteOutlinedIcon,
    EmailOutlined as EmailOutlinedIcon,
    GppGoodOutlined as GppGoodOutlinedIcon,
    InfoOutlined as InfoOutlinedIcon,
    LinkOutlined as LinkOutlinedIcon,
    LocalFloristOutlined as LocalFloristOutlinedIcon,
    LocationOnOutlined as LocationOnOutlinedIcon,
    MarkEmailUnreadOutlined as MarkEmailUnreadOutlinedIcon,
    ScheduleOutlined as ScheduleOutlinedIcon,
    ShareOutlined as ShareOutlinedIcon,
    Spa as SpaIcon,
    StorefrontOutlined as StorefrontOutlinedIcon,
    TuneOutlined as TuneOutlinedIcon,
    VerifiedUserOutlined as VerifiedUserOutlinedIcon
} from "@mui/icons-material";
import {
    motion,
    useScroll,
    useTransform
} from "framer-motion";
import { MdEco } from "react-icons/md";

import heroImg from "../../../assets/images/ayurveda_hero_bg.png";
import pathImg from "../../../assets/images/ayurveda_nature_path.png";
import securityImg from "../../../assets/images/ayurveda_security.png";

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
    MuiIcon: InfoOutlinedIcon,
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
    MuiIcon: CollectionsBookmarkOutlinedIcon,
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
    MuiIcon: TuneOutlinedIcon,
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
    MuiIcon: CookieOutlinedIcon,
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
    MuiIcon: ShareOutlinedIcon,
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
    MuiIcon: VerifiedUserOutlinedIcon,
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
    MuiIcon: GppGoodOutlinedIcon,
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
    MuiIcon: CalendarMonthOutlinedIcon,
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
    MuiIcon: LinkOutlinedIcon,
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
    MuiIcon: ChildCareOutlinedIcon,
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
    MuiIcon: EditNoteOutlinedIcon,
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
    MuiIcon: MarkEmailUnreadOutlinedIcon,
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

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};


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
      <img
        src={src}
        alt={alt}
        className="w-full h-[400px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-[20s] ease-linear"
      />
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 flex items-center gap-2">
        <MdEco className="text-white text-2xl drop-shadow-md" />
        <span className="text-white font-['Cormorant_Garamond'] text-lg md:text-xl font-medium tracking-wide drop-shadow-md">
          Swagrama Wellness
        </span>
      </div>
    </motion.div>
  );
}

function SectionContent({ section, index }) {
  const Icon = section.MuiIcon || section.IconComponent;
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
        <motion.div
          variants={fadeInUp}
          className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
          style={{ background: hexToRgba(section.accent, 0.1) }}
        >
          <Icon style={{ fontSize: 32, color: section.accent }} />
        </motion.div>
        <div>
          <motion.h2
            variants={fadeInUp}
            className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-3"
            style={{ color: p.td }}
          >
            {section.title}
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-3"
          >
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{
                background: hexToRgba(section.accent, 0.1),
                color: section.accent,
              }}
            >
              {section.number}
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: p.border }}
            />
            <span
              className="font-['Cormorant_Garamond'] text-xl italic opacity-90"
              style={{ color: p.tl }}
            >
              {section.tagline}
            </span>
          </motion.div>
        </div>
      </div>

      <div className="space-y-6">
        {section.content.map((block, i) => {
          if (block.type === "para") {
            return (
              <motion.p
                key={i}
                variants={fadeInUp}
                className="font-['Cormorant_Garamond'] text-xl leading-relaxed"
                style={{ color: p.tm }}
              >
                {block.text}
              </motion.p>
            );
          }
          if (block.type === "subtitle") {
            return (
              <motion.h3
                key={i}
                variants={fadeInUp}
                className="font-['Playfair_Display'] flex items-center gap-2 text-2xl font-semibold mt-10 mb-4"
                style={{ color: section.accent }}
              >
                <LocalFloristOutlinedIcon fontSize="inherit" />
                {block.text}
              </motion.h3>
            );
          }
          if (block.type === "list") {
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="pl-2 space-y-4"
              >
                {block.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CheckCircleOutlineIcon
                      style={{
                        fontSize: 22,
                        color: section.accent,
                        marginTop: "2px",
                      }}
                      className="shrink-0"
                    />
                    <span
                      className="font-['Cormorant_Garamond'] text-xl leading-relaxed"
                      style={{ color: p.tm }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </motion.div>
            );
          }
          if (block.type === "contact") {
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
              >
                {block.items.map((item, j) => {
                  const CIcon = item.ContactIcon;
                  return (
                    <div
                      key={j}
                      className="p-6 rounded-[24px] border border-opacity-30 flex items-center gap-4 bg-white/50 backdrop-blur-sm"
                      style={{ borderColor: p.border }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: hexToRgba(section.accent, 0.1) }}
                      >
                        <CIcon style={{ color: section.accent }} />
                      </div>
                      <div>
                        <div
                          className="text-xs font-bold tracking-widest uppercase mb-1"
                          style={{ color: section.accent }}
                        >
                          {item.label}
                        </div>
                        <div
                          className="font-['Cormorant_Garamond'] text-lg md:text-xl"
                          style={{ color: p.td }}
                        >
                          {item.value}
                        </div>
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
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 z-[2000] origin-left"
        initial={{ backgroundColor: p.sage }}
        animate={{ backgroundColor: p.sage }}
      />

      <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={heroImg}
            alt="Ayurveda Wellness"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto "
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-white/60" />
              <MdEco className="text-white/90 text-2xl" />
              <span className="text-white/90 text-sm tracking-[0.3em] uppercase font-semibold">
                Swagrama Community
              </span>
              <span className="w-12 h-[1px] bg-white/60" />
            </div>
            <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
              Privacy & Trust
            </h1>
            <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              Rooted in transparency and the healing{" "}
              <br className="hidden md:block" /> traditions of Ayurveda.
            </p>
          </motion.div>
        </motion.div>

     
      </div>


      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-30">
        <div className="flex flex-col lg:flex-row gap-16">

          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 space-y-4">
              <div className="flex items-center gap-2 mb-8">
                <SpaIcon style={{ color: p.sage }} />
                <span
                  className="font-['Playfair_Display'] text-xl font-bold"
                  style={{ color: p.td }}
                >
                  Contents
                </span>
              </div>
              {sections.map((s) => (
                <div key={s.id} className="group flex items-center gap-3 mb-2">
                  <div
                    className="w-6 h-px transition-all duration-300 group-hover:w-10 group-hover:bg-opacity-100"
                    style={{ background: p.sage, opacity: 0.3 }}
                  />
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => scrollTo(e, s.id)}
                    className="font-['Cormorant_Garamond'] text-xl transition-all duration-300 hover:font-bold"
                    style={{ color: p.tm }}
                  >
                    {s.title}
                  </a>
                </div>
              ))}
            </div>
          </div>

       
          <div className="flex-1 max-w-5xl">
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
