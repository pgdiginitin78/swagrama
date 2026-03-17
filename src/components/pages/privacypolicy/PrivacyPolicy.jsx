import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Typography,
  Container,
  Box,
  Chip,
  Divider,
  useMediaQuery,
  LinearProgress,
  Tooltip,
  IconButton,
  Collapse,
  Paper,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import SpaIcon from "@mui/icons-material/Spa";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import CookieOutlinedIcon from "@mui/icons-material/Cookie";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import LocalFloristOutlinedIcon from "@mui/icons-material/LocalFloristOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { MdEco } from "react-icons/md";

const theme = createTheme({
  palette: {
    primary: { main: "#4a7c59" },
    secondary: { main: "#8b6914" },
    background: { default: "#faf8f3" },
  },
  typography: { fontFamily: "'Cormorant Garamond', Georgia, serif" },
});

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

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  useEffect(
    () => scrollYProgress.on("change", (v) => setProgress(Math.round(v * 100))),
    [scrollYProgress],
  );
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        height: 3,
      }}
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 3,
          backgroundColor: "transparent",
          "& .MuiLinearProgress-bar": {
            background: `linear-gradient(90deg, ${p.sage}, ${p.lime}, ${p.gold})`,
            borderRadius: 0,
          },
        }}
      />
    </Box>
  );
}

function FloatingLeaf({ style }) {
  return (
    <motion.div
      style={{ position: "absolute", pointerEvents: "none", ...style }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -6, 0],
        opacity: [0.15, 0.28, 0.15],
      }}
      transition={{
        duration: 8 + Math.random() * 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <MdEco
        sx={{ fontSize: style.fontSize || 40, color: "rgba(255,255,255,0.7)" }}
      />
    </motion.div>
  );
}

function SectionCard({ section }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(true);
  const Icon = section.MuiIcon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 52, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mb-6"
    >
      <Paper
        elevation={0}
        sx={{
          background: section.color,
          borderRadius: "24px",
          border: `1.5px solid ${section.accent}28`,
          overflow: "hidden",
          transition: "box-shadow 0.35s ease, transform 0.25s ease",
          "&:hover": {
            boxShadow: `0 12px 48px ${section.accent}22`,
            transform: "translateY(-2px)",
          },
        }}
      >
        <Box
          onClick={() => setExpanded(!expanded)}
          sx={{
            background: `linear-gradient(135deg, ${section.accent}14 0%, ${alpha(section.accent, 0.03)} 100%)`,
            px: { xs: 3, md: 5 },
            pt: { xs: 3, md: 4 },
            pb: { xs: 2.5, md: 3 },
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <Box className="flex items-center justify-between gap-4">
            <Box className="flex items-center gap-4 flex-1 min-w-0">
              <motion.div
                whileHover={{ rotate: [0, -12, 12, 0], scale: 1.08 }}
                transition={{ duration: 0.4 }}
              >
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "16px",
                    background: `linear-gradient(135deg, ${section.accent}28, ${section.accent}12)`,
                    border: `1.5px solid ${section.accent}40`,
                    boxShadow: `0 4px 18px ${section.accent}22`,
                    flexShrink: 0,
                  }}
                >
                  <Icon sx={{ fontSize: 26, color: section.accent }} />
                </Avatar>
              </motion.div>
              <Box className="flex-1 min-w-0">
                <Box className="flex items-center gap-2 flex-wrap mb-0.5">
                  <Chip
                    label={section.number}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      background: `${section.accent}20`,
                      color: section.accent,
                      border: `1px solid ${section.accent}38`,
                      fontFamily: "monospace",
                    }}
                  />
                  <Chip
                    label={section.tagline}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: "0.68rem",
                      background: "rgba(255,255,255,0.65)",
                      color: p.tl,
                      border: `1px solid ${p.border}`,
                      fontFamily: "'Cormorant Garamond', serif",
                      display: { xs: "none", sm: "flex" },
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                    fontWeight: 700,
                    color: p.td,
                    lineHeight: 1.2,
                  }}
                >
                  {section.title}
                </Typography>
              </Box>
            </Box>
            <Tooltip title={expanded ? "Collapse" : "Expand"} placement="left">
              <IconButton
                size="small"
                sx={{
                  background: `${section.accent}14`,
                  border: `1px solid ${section.accent}28`,
                  color: section.accent,
                  flexShrink: 0,
                  "&:hover": { background: `${section.accent}24` },
                }}
              >
                <motion.div
                  animate={{ rotate: expanded ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <KeyboardArrowUpIcon fontSize="small" />
                </motion.div>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Collapse in={expanded} timeout={300}>
          <Divider
            sx={{ borderColor: `${section.accent}18`, mx: { xs: 3, md: 5 } }}
          />
          <Box sx={{ px: { xs: 3, md: 5 }, py: { xs: 3, md: 4 } }}>
            {section.content.map((block, i) => {
              if (block.type === "para")
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.07 }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: { xs: "1rem", md: "1.08rem" },
                        lineHeight: 1.9,
                        color: p.tm,
                        mb: 2,
                      }}
                    >
                      {block.text}
                    </Typography>
                  </motion.div>
                );
              if (block.type === "subtitle")
                return (
                  <Box key={i} className="flex items-center gap-2 mt-3 mb-1.5">
                    <LocalFloristOutlinedIcon
                      sx={{
                        fontSize: 14,
                        color: section.accent,
                        opacity: 0.85,
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: { xs: "0.95rem", md: "1.05rem" },
                        fontWeight: 600,
                        color: section.accent,
                      }}
                    >
                      {block.text}
                    </Typography>
                  </Box>
                );
              if (block.type === "list")
                return (
                  <Box key={i} sx={{ mb: 2 }}>
                    {block.items.map((item, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -18 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.18 + j * 0.07 }}
                      >
                        <Box
                          className="flex items-start gap-3"
                          sx={{
                            py: 1,
                            px: 2,
                            mb: 1,
                            borderRadius: "10px",
                            background: "rgba(255,255,255,0.48)",
                            border: `1px solid ${section.accent}12`,
                            transition: "all 0.2s",
                            "&:hover": {
                              background: "rgba(255,255,255,0.72)",
                              transform: "translateX(4px)",
                            },
                          }}
                        >
                          <CheckCircleOutlineIcon
                            sx={{
                              fontSize: 16,
                              color: section.accent,
                              mt: "3px",
                              flexShrink: 0,
                              opacity: 0.85,
                            }}
                          />
                          <Typography
                            sx={{
                              fontFamily:
                                "'Cormorant Garamond', Georgia, serif",
                              fontSize: { xs: "0.95rem", md: "1.03rem" },
                              lineHeight: 1.75,
                              color: p.tm,
                            }}
                          >
                            {item}
                          </Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                );
              if (block.type === "contact")
                return (
                  <Box
                    key={i}
                    sx={{
                      borderRadius: "16px",
                      border: `1.5px solid ${section.accent}28`,
                      overflow: "hidden",
                      mb: 2,
                      background: "rgba(255,255,255,0.55)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {block.items.map((item, j) => {
                      const CIcon = item.ContactIcon;
                      return (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, y: 8 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 0.12 + j * 0.09 }}
                        >
                          <Box
                            className="flex items-center gap-3"
                            sx={{
                              px: { xs: 2.5, md: 3 },
                              py: 1.5,
                              borderBottom:
                                j < block.items.length - 1
                                  ? `1px solid ${p.border}55`
                                  : "none",
                              transition: "background 0.2s",
                              "&:hover": { background: `${section.accent}08` },
                            }}
                          >
                            <Box
                              sx={{
                                width: 34,
                                height: 34,
                                borderRadius: "9px",
                                background: `${section.accent}18`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <CIcon
                                sx={{ fontSize: 17, color: section.accent }}
                              />
                            </Box>
                            <Typography
                              sx={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                color: section.accent,
                                minWidth: 112,
                                flexShrink: 0,
                              }}
                            >
                              {item.label}
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "1rem",
                                color: p.tm,
                              }}
                            >
                              {item.value}
                            </Typography>
                          </Box>
                        </motion.div>
                      );
                    })}
                  </Box>
                );
              return null;
            })}
          </Box>
        </Collapse>
      </Paper>
    </motion.div>
  );
}

function TableOfContents({ activeSection, onSelect }) {
  const isMobile = useMediaQuery("(max-width:1400px)");
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <Box sx={{ position: "fixed", bottom: 24, right: 20, zIndex: 1200 }}>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              style={{
                position: "absolute",
                bottom: 68,
                right: 0,
           
                background: p.cream,
                border: `1.5px solid ${p.border}`,
                borderRadius: 20,
                padding: "10px",
                width: 232,
                boxShadow: "0 16px 48px rgba(74,124,89,0.24)",
                maxHeight: "65vh",
                overflowY: "auto",
              }}
            >
              <Box
                sx={{
                  px: 1,
                  pb: 1,
                  mb: 0.5,
                  borderBottom: `1px solid ${p.border}`,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: p.tl,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Contents
                </Typography>
              </Box>
              {sections.map((s) => {
                const Icon = s.MuiIcon;
                return (
                  <Box
                    key={s.id}
                    onClick={() => {
                      onSelect(s.id);
                      setOpen(false);
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      py: 1,
                      px: 1.5,
                      borderRadius: "10px",
                      cursor: "pointer",
                      background:
                        activeSection === s.id ? `${p.sage}14` : "transparent",
                      "&:hover": { background: `${p.sage}0e` },
                    }}
                  >
                    <Icon
                      sx={{
                        fontSize: 14,
                        color: activeSection === s.id ? s.accent : p.tl,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "0.87rem",
                        color: activeSection === s.id ? s.accent : p.tm,
                        fontWeight: activeSection === s.id ? 600 : 400,
                      }}
                    >
                      {s.title}
                    </Typography>
                  </Box>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          onClick={() => setOpen(!open)}
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${p.sage}, ${p.sageLight})`,
            border: "none",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 6px 24px rgba(74,124,89,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {open ? (
            <CloseIcon sx={{ fontSize: 22 }} />
          ) : (
            <FormatListBulletedIcon sx={{ fontSize: 22 }} />
          )}
        </motion.button>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "sticky", top: 24 }}>
      <Paper
        elevation={0}
        sx={{
          background: p.cream,
          border: `1.5px solid ${p.border}`,
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 6px 28px rgba(90,74,53,0.09)",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2.5,
            background: `linear-gradient(135deg, ${p.sage}12, transparent)`,
            borderBottom: `1px solid ${p.border}`,
          }}
        >
          <Box className="flex items-center gap-2">
            <SpaIcon sx={{ fontSize: 18, color: p.sage }} />
            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "0.95rem",
                fontWeight: 700,
                color: p.td,
              }}
            >
              Contents
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.75rem",
              color: p.tl,
              mt: 0.3,
            }}
          >
            12 sections · Privacy Policy
          </Typography>
        </Box>
        <Box sx={{ p: 1.5 }}>
          {sections.map((s) => {
            const Icon = s.MuiIcon;
            const active = activeSection === s.id;
            return (
              <motion.div
                key={s.id}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 380 }}
              >
                <Box
                  onClick={() => onSelect(s.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    py: 1,
                    px: 1.5,
                    borderRadius: "10px",
                    cursor: "pointer",
                    background: active ? `${s.accent}12` : "transparent",
                    borderLeft: active
                      ? `3px solid ${s.accent}`
                      : "3px solid transparent",
                    transition: "all 0.2s",
                    "&:hover": { background: `${p.sage}08` },
                  }}
                >
                  <Icon
                    sx={{
                      fontSize: 14,
                      color: active ? s.accent : p.tl,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.85rem",
                      color: active ? s.accent : p.tm,
                      fontWeight: active ? 600 : 400,
                      lineHeight: 1.3,
                      flex: 1,
                    }}
                  >
                    {s.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.64rem",
                      color: p.tl,
                      fontFamily: "monospace",
                      flexShrink: 0,
                    }}
                  >
                    {s.number}
                  </Typography>
                </Box>
              </motion.div>
            );
          })}
        </Box>
        <Box
          sx={{
            px: 3,
            py: 2,
            borderTop: `1px solid ${p.border}`,
            background: `${p.sage}06`,
          }}
        >
          <Box className="flex items-center gap-1.5">
            <FiberManualRecordIcon sx={{ fontSize: 8, color: p.lime }} />
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.73rem",
                color: p.tl,
              }}
            >
              Effective June 2025 · India
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default function SwagramaPrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, -55]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.45]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }),
      { threshold: 0.2, rootMargin: "-10% 0px -60% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ReadingProgress />
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(180deg, ${p.parchment} 0%, ${p.cream} 8%, ${p.cream} 92%, ${p.parchment} 100%)`,
        }}
      >
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <Box
            sx={{
              background: `linear-gradient(135deg, #3a6647 0%, ${p.sage} 35%, ${p.sageLight} 68%, ${p.lime}aa 100%)`,
              position: "relative",
              overflow: "hidden",
              pt: { xs: 10, md: 16 },
              pb: { xs: 10, md: 16 },
            }}
          >
            <FloatingLeaf style={{ top: "12%", left: "5%", fontSize: 60 }} />
            <FloatingLeaf style={{ top: "22%", right: "7%", fontSize: 44 }} />
            <FloatingLeaf
              style={{ bottom: "20%", left: "20%", fontSize: 34 }}
            />
            <FloatingLeaf
              style={{ bottom: "14%", right: "15%", fontSize: 50 }}
            />
            <FloatingLeaf style={{ top: "52%", left: "46%", fontSize: 26 }} />

            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "160%",
                height: "160%",
                transform: "translate(-50%,-50%)",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: -120,
                right: -120,
                width: 580,
                height: 580,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.055)",
                pointerEvents: "none",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -90,
                left: -90,
                width: 400,
                height: 400,
                borderRadius: "50%",
                background: `${p.lime}20`,
                pointerEvents: "none",
              }}
            />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
              <Box className="text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{
                    delay: 0.1,
                    duration: 0.7,
                    type: "spring",
                    stiffness: 170,
                  }}
                  style={{ display: "inline-block" }}
                >
                  <Box
                    sx={{
                      width: 88,
                      height: 88,
                      borderRadius: "26px",
                      background: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(14px)",
                      border: "2px solid rgba(255,255,255,0.36)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                      boxShadow: "0 10px 40px rgba(0,0,0,0.14)",
                    }}
                  >
                    <SpaIcon sx={{ fontSize: 44, color: "#fff" }} />
                  </Box>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: { xs: "0.72rem", md: "0.82rem" },
                      letterSpacing: "0.38em",
                      color: "rgba(255,255,255,0.7)",
                      textTransform: "uppercase",
                      mb: 1.5,
                    }}
                  >
                    Swagrama Community
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42, duration: 0.8 }}
                >
                  <Typography
                    component="h1"
                    sx={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: { xs: "3rem", md: "5rem", lg: "6.2rem" },
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1.04,
                      mb: 2,
                      textShadow: "0 4px 28px rgba(0,0,0,0.18)",
                    }}
                  >
                    Privacy Policy
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.62 }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: { xs: "1.1rem", md: "1.3rem" },
                      color: "rgba(255,255,255,0.88)",
                      maxWidth: 560,
                      mx: "auto",
                      lineHeight: 1.82,
                      mb: 5,
                      fontStyle: "italic",
                    }}
                  >
                    "Rooted in transparency, nourished by trust — how we honour
                    your personal journey with us."
                  </Typography>
                </motion.div>

          

          
              </Box>
            </Container>
          </Box>
        </motion.div>



        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
          <Box className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Box className="hidden lg:block lg:col-span-1">
              <TableOfContents
                activeSection={activeSection}
                onSelect={scrollTo}
              />
            </Box>
            <Box className="col-span-1 lg:col-span-3">
              {sections.map((section) => (
                <Box key={section.id} id={section.id}>
                  <SectionCard section={section} />
                </Box>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    background: `linear-gradient(135deg, ${p.sage}14 0%, ${p.lime}0e 50%, ${p.gold}0c 100%)`,
                    borderRadius: "28px",
                    border: `2px solid ${p.sage}26`,
                    p: { xs: 5, md: 7 },
                    textAlign: "center",
                    mt: 2,
                    mb: 2,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -50,
                      right: -50,
                      width: 220,
                      height: 220,
                      borderRadius: "50%",
                      background: `${p.lime}0c`,
                      pointerEvents: "none",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -40,
                      left: -40,
                      width: 180,
                      height: 180,
                      borderRadius: "50%",
                      background: `${p.sage}0a`,
                      pointerEvents: "none",
                    }}
                  />
                  <motion.div
                    animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    style={{ display: "inline-block", marginBottom: 16 }}
                  >
                    <SpaIcon
                      sx={{ fontSize: 52, color: p.sage, opacity: 0.72 }}
                    />
                  </motion.div>
                  <Typography
                    sx={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: { xs: "1.6rem", md: "2.2rem" },
                      fontWeight: 700,
                      color: p.td,
                      mb: 2,
                    }}
                  >
                    Your Trust is Our Foundation
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: { xs: "1.05rem", md: "1.18rem" },
                      color: p.tm,
                      lineHeight: 1.9,
                      maxWidth: 580,
                      mx: "auto",
                      mb: 3.5,
                    }}
                  >
                    At Swagrama Community, every decision we make — from the
                    programmes we offer to the data we collect — is guided by
                    the Ayurvedic principle of <em>ahimsa</em>: do no harm.
                    Thank you for placing your trust in us.
                  </Typography>
                  <Box className="flex flex-wrap justify-center gap-3">
                    {[
                      {
                        Icon: VerifiedUserOutlinedIcon,
                        label: "Secure & Encrypted",
                      },
                      {
                        Icon: GppGoodOutlinedIcon,
                        label: "Your Rights Protected",
                      },
                      { Icon: MdEco, label: "Ethically Conscious" },
                    ].map(({ Icon, label }) => (
                      <Chip
                        key={label}
                        icon={
                          <Icon
                            sx={{
                              fontSize: "15px !important",
                              color: `${p.sage} !important`,
                            }}
                          />
                        }
                        label={label}
                        sx={{
                          background: `${p.sage}10`,
                          color: p.tm,
                          border: `1px solid ${p.sage}24`,
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "0.9rem",
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
