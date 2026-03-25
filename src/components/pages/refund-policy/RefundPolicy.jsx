import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BlockIcon from "@mui/icons-material/Block";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SpaIcon from "@mui/icons-material/Spa";

const policies = [
  {
    icon: <BlockIcon sx={{ fontSize: 28 }} />,
    title: "Non-Refundable Bookings",
    desc: "All payments made for confirmed appointments are non-refundable once your booking is secured.",
    accent: "#7a5c3a",
    bg: "#f5f0e8",
    border: "#7a5c3a30",
  },
  {
    icon: <EventRepeatIcon sx={{ fontSize: 28 }} />,
    title: "User Cancellation",
    desc: "If you cancel your appointment, the amount will not be refunded. However, rescheduling may be allowed subject to availability.",
    accent: "#4a7c3f",
    bg: "#edf5eb",
    border: "#4a7c3f30",
  },
  {
    icon: <CancelScheduleSendIcon sx={{ fontSize: 28 }} />,
    title: "Swagrama Cancellation",
    desc: "If we cancel due to unavoidable circumstances, you will be offered a full reschedule or a complete refund, as applicable.",
    accent: "#6aaa10",
    bg: "#f0f9e0",
    border: "#7aad1e40",
  },
  {
    icon: <AccountBalanceWalletIcon sx={{ fontSize: 28 }} />,
    title: "Refund Processing",
    desc: "Any approved refund will be processed within 5–7 business days to your original payment method.",
    accent: "#7a5c3a",
    bg: "#f5f0e8",
    border: "#7a5c3a30",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] },
  }),
};

function PolicyCard({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group relative"
    >
      <div
        className="relative overflow-hidden rounded-2xl border-2 p-6 sm:p-8 h-full transition-all duration-500 hover:-translate-y-1"
        style={{
          borderColor: item.border,
          backgroundColor: item.bg,
          boxShadow: `0 2px 24px ${item.accent}12`,
        }}
      >
        <div
          className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${item.accent} 0%, transparent 70%)` }}
        />
        <div
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
          style={{ background: `${item.accent}18`, color: item.accent }}
        >
          {item.icon}
        </div>
        <h3
          className="text-lg sm:text-xl font-semibold mb-3 tracking-tight font-['Playfair_Display']"
          style={{ color: item.accent }}
        >
          {item.title}
        </h3>
        <p className="text-[#5a4a3a] text-sm sm:text-[15px] leading-relaxed font-['DM_Sans']">
          {item.desc}
        </p>
        <div
          className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-700 rounded-b-xl"
          style={{ background: `linear-gradient(to right, ${item.accent}, ${item.accent}50)` }}
        />
      </div>
    </motion.div>
  );
}

function LeafDivider({ light = false }) {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${light ? "to-[#a8d84880]" : "to-[#7aad1e50]"}`} />
      <SpaIcon sx={{ fontSize: 18, color: light ? "#a8d848" : "#7aad1e" }} />
      <div className={`h-px flex-1 bg-gradient-to-l from-transparent ${light ? "to-[#a8d84880]" : "to-[#7aad1e50]"}`} />
    </div>
  );
}

export default function SwagramaRefundPolicy() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-60px" });
  const agreementRef = useRef(null);
  const agreementInView = useInView(agreementRef, { once: true, margin: "-60px" });



  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#f4f8ee" }}>

      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 70% 50% at 5% 15%, #c8e6a028 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 95% 85%, #d4b89622 0%, transparent 55%),
            radial-gradient(ellipse 40% 30% at 50% 55%, #b8dd6015 0%, transparent 60%)
          `,
        }}
      />



      <section ref={heroRef} className="relative z-10 pt-16  pb-5 sm:pb-24 px-6 sm:px-10 lg:px-16 text-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-[0.18em] uppercase font-['DM_Sans'] font-medium mb-8 border"
            style={{ color: "#4a7c3f", borderColor: "#7aad1e50", backgroundColor: "#eef8e0" }}
          >
            <EventAvailableIcon sx={{ fontSize: 14 }} />
            Community Standards
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight font-['Playfair_Display'] mb-1"
              style={{ color: "#3a2e1e" }}
            >
              Refund
            </h1>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold italic leading-none tracking-tight font-['Playfair_Display'] pb-6 mb-3"
              style={{
                background: "linear-gradient(130deg, #8abf22 0%, #4a7c3f 55%, #7a5c3a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Policy
            </h1>
          </motion.div>

          <LeafDivider />

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="max-w-xl mx-auto text-base sm:text-lg leading-relaxed font-['DM_Sans'] font-light mt-6"
            style={{ color: "#7a6a58" }}
          >
            At Swagrama, all appointments are confirmed only after successful payment.
            Payment is mandatory to secure your booking.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
          >
            {[
              { label: "Secure Booking", c: "#4a7c3f", bc: "#7aad1e50", bg: "#eef8e0" },
              { label: "Clear Terms", c: "#7a5c3a", bc: "#7a5c3a40", bg: "#f5f0e8" },
              { label: "Fair Policy", c: "#4a7c3f", bc: "#7aad1e50", bg: "#eef8e0" },
            ].map((tag, i) => (
              <span
                key={i}
                className="text-xs font-['DM_Sans'] font-medium px-4 py-1.5 rounded-full border"
                style={{ color: tag.c, borderColor: tag.bc, backgroundColor: tag.bg }}
              >
                {tag.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="relative z-10 px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-6 h-px" style={{ backgroundColor: "#7aad1e" }} />
          <span
            className="text-xs tracking-[0.25em] uppercase font-['DM_Sans'] font-semibold"
            style={{ color: "#7aad1e" }}
          >
            Our Policies
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {policies.map((item, i) => (
            <PolicyCard key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      <section className="relative z-10 px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24 max-w-6xl mx-auto">
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0, y: 30 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border-2 p-7 sm:p-10"
          style={{
            borderColor: "#7aad1e40",
            background: "linear-gradient(135deg, #edf8d8 0%, #f5efe4 100%)",
            boxShadow: "0 4px 30px #4a7c3f10",
          }}
        >
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, #7aad1e18 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7 relative z-10">
            <div
              className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border-2"
              style={{ backgroundColor: "#eef8e0", borderColor: "#7aad1e50", color: "#4a7c3f" }}
            >
              <AccessTimeIcon sx={{ fontSize: 28 }} />
            </div>
            <div>
              <h3
                className="text-xl sm:text-2xl font-semibold font-['Playfair_Display'] mb-1.5"
                style={{ color: "#3a2e1e" }}
              >
                5–7 Business Days
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed font-['DM_Sans']" style={{ color: "#7a6a58" }}>
                Approved refunds are processed within this window directly to your original payment method.
              </p>
            </div>
          </div>

          <div className="mt-7 pt-6 border-t border-[#7aad1e25] grid grid-cols-3 gap-4">
            {[
              { label: "Request", step: "01", color: "#7aad1e" },
              { label: "Review", step: "02", color: "#4a7c3f" },
              { label: "Processed", step: "03", color: "#7a5c3a" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-2xl font-bold font-['Playfair_Display'] mb-1"
                  style={{ color: s.color }}
                >
                  {s.step}
                </div>
                <div
                  className="text-xs font-['DM_Sans'] font-medium uppercase tracking-wider"
                  style={{ color: "#7a6a58" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 px-6 sm:px-10 lg:px-16 pb-12 max-w-6xl mx-auto">
        <motion.div
          ref={agreementRef}
          initial={{ opacity: 0, y: 40 }}
          animate={agreementInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden border-2 text-center px-7 sm:px-12 py-12 sm:py-16"
          style={{
            borderColor: "#4a7c3f60",
            background: "linear-gradient(160deg, #1e3d14 0%, #193310 40%, #3d2a14 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 60% 50% at 25% 40%, #7aad1e20 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 80% 70%, #d4b89618 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={agreementInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5 border-2"
              style={{ backgroundColor: "#7aad1e22", borderColor: "#7aad1e60" }}
            >
              <VerifiedUserIcon sx={{ fontSize: 34, color: "#a8d848" }} />
            </motion.div>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-light font-['Playfair_Display'] mb-4 leading-snug"
              style={{ color: "#e0f0c8" }}
            >
              Your Agreement
            </h2>

            <LeafDivider light />

            <p
              className="max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-['DM_Sans'] font-light mt-5"
              style={{ color: "#8aaa78" }}
            >
              By making a payment and confirming an appointment, you acknowledge and agree to the
              terms outlined in this refund policy.
            </p>

            <div
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-['DM_Sans'] font-medium text-sm border"
              style={{
                backgroundColor: "#7aad1e22",
                borderColor: "#7aad1e70",
                color: "#b8e060",
              }}
            >
              <SpaIcon sx={{ fontSize: 16 }} />
              Swagrama Community
            </div>
          </div>
        </motion.div>
      </section>


    </div>
  );
}