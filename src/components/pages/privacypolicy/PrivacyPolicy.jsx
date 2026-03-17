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
import * as THREE from "three";
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

function ThreeBackground({ scrollYProgress }) {
  const ref = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    ref.current.appendChild(renderer.domElement);

    const mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.5, 1),
      new THREE.MeshPhysicalMaterial({
        color: "#7aad35",
        transparent: true,
        opacity: 0.25,
        metalness: 0.5,
        roughness: 0.2,
      }),
    );
    scene.add(mesh);

    const light = new THREE.PointLight("#ffffff", 2);
    light.position.set(5, 5, 5);
    scene.add(light);

    let scroll = 0;
    const unsub = scrollYProgress.on("change", (v) => (scroll = v));

    const animate = () => {
      mesh.rotation.x += 0.002 + scroll * 0.02;
      mesh.rotation.y += 0.003 + scroll * 0.02;
      mesh.position.y = Math.sin(scroll * Math.PI) * 1.2;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      unsub();
      ref.current.removeChild(renderer.domElement);
    };
  }, [scrollYProgress]);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.35,
        filter: "blur(2px)",
      }}
    />
  );
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  useEffect(
    () => scrollYProgress.on("change", (v) => setProgress(Math.round(v * 100))),
    [scrollYProgress],
  );
  return (
    <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1300 }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}

function SectionCard({ section }) {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(true);
  const Icon = section.MuiIcon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="mb-6"
    >
      <Paper elevation={0}>
        <Box onClick={() => setExpanded(!expanded)}>
          <Typography>{section.title}</Typography>
        </Box>
        <Collapse in={expanded}>
          <Box>
            {section.content.map((block, i) => {
              if (block.type === "para")
                return <Typography key={i}>{block.text}</Typography>;
              if (block.type === "list")
                return block.items.map((item, j) => (
                  <Typography key={j}>{item}</Typography>
                ));
              return null;
            })}
          </Box>
        </Collapse>
      </Paper>
    </motion.div>
  );
}

export default function SwagramaPrivacyPolicy() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, -55]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.45]);

  return (
    <ThemeProvider theme={theme}>
      <ThreeBackground scrollYProgress={scrollYProgress} />
      <ReadingProgress />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <Box>
            <Typography variant="h2">Privacy Policy</Typography>
          </Box>
        </motion.div>

        <Container>
          {sections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
