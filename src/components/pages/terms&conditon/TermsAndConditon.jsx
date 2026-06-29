import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { ShieldCheck, PenLine, Landmark, Undo2, Zap, ShieldOff, Scale, Lock, Globe, BadgeCheck, ArrowRight, CheckCircle2 } from "lucide-react";

const TERMS = [
  { id: "01", Icon: ShieldCheck, title: "Secure Payment Processing", body: "All payments are processed securely through SabPaisa Payment Gateway on behalf of SWAGRAMA AYURVEDA YOGA NISARGA AGRO TOURISM LLP." },
  { id: "02", Icon: PenLine, title: "Accurate Payment Details", body: "Customers must provide accurate payment details and use authorised payment methods only." },
  { id: "03", Icon: Landmark, title: "Payment Authorization", body: "Payment confirmation is subject to successful authorization by the respective bank or payment network." },
  { id: "04", Icon: Undo2, title: "Refunds & Cancellations", body: "Refunds and cancellations are governed by the refund policy of SWAGRAMA AYURVEDA YOGA NISARGA AGRO TOURISM LLP. SabPaisa acts only as a payment facilitator." },
  { id: "05", Icon: Zap, title: "Failed Transactions", body: "In case of failed transactions where money is debited, the amount will be automatically reversed as per bank processing timelines." },
  { id: "06", Icon: ShieldOff, title: "Liability Limitation", body: "The company shall not be liable for payment failures caused by banking, technical, or network issues beyond its control." },
  { id: "07", Icon: Scale, title: "Legal Acceptance", body: "By proceeding with payment, you accept these terms and applicable Indian laws." },
];

function TermCard({ term, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [hov, setHov] = useState(false);
  const isEven = index % 2 === 0;
  const accent = isEven ? "#65a30d" : "#92400e";
  const accentBg = isEven ? "rgba(132,204,22,0.09)" : "rgba(146,64,14,0.07)";
  const accentBorder = isEven ? "rgba(132,204,22,0.24)" : "rgba(146,64,14,0.18)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.52, delay: index * 0.065, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", gap: "clamp(12px,2vw,20px)", alignItems: "flex-start",
        padding: "clamp(16px,2.2vw,24px) clamp(16px,2.2vw,26px)",
        borderRadius: 14,
        background: hov ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.68)",
        border: `1.5px solid ${hov ? (isEven ? "rgba(132,204,22,0.38)" : "rgba(146,64,14,0.32)") : "rgba(200,180,140,0.2)"}`,
        boxShadow: hov
          ? `0 10px 36px ${isEven ? "rgba(132,204,22,0.09)" : "rgba(146,64,14,0.09)"}, 0 2px 10px rgba(0,0,0,0.05)`
          : "0 1px 8px rgba(0,0,0,0.04)",
        transition: "all 0.28s ease",
        cursor: "default", position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", left: 0, top: "15%", bottom: "15%", width: 3,
        background: hov ? accent : "transparent",
        borderRadius: "0 3px 3px 0",
        transition: "background 0.28s ease",
      }} />

      <div style={{
        flexShrink: 0, width: 44, height: 44, borderRadius: 11,
        background: accentBg, border: `1.5px solid ${accentBorder}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "transform 0.28s ease",
        transform: hov ? "scale(1.1)" : "scale(1)",
      }}>
        <term.Icon size={19} color={accent} strokeWidth={1.7} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 5 }}>
          <span style={{
            fontFamily: "Inter, sans-serif", fontSize: 9, fontWeight: 700,
            letterSpacing: "0.2em", color: accent, textTransform: "uppercase",
          }}>§ {term.id}</span>
          <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.06)" }} />
        </div>
        <h3 style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(13.5px,1.45vw,15px)", fontWeight: 700,
          color: "#1c0a00", margin: "0 0 6px", lineHeight: 1.3,
        }}>{term.title}</h3>
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(12.5px,1.25vw,13.5px)",
          lineHeight: 1.72, color: "#7a4e18", margin: 0,
        }}>{term.body}</p>
      </div>

      <div style={{
        flexShrink: 0, color: accent,
        opacity: hov ? 1 : 0,
        transform: hov ? "translateX(0)" : "translateX(-8px)",
        transition: "all 0.28s ease",
      }}>
        <ArrowRight size={15} strokeWidth={2.2} />
      </div>
    </motion.div>
  );
}

export default function TermsAndCondition() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const [counts, setCounts] = useState([0, 0, 0]);

  useEffect(() => {
    if (!statsInView) return;
    [7, 100, 2025].forEach((to, idx) => {
      let cur = 0;
      const step = to / (2 * 60);
      const iv = setInterval(() => {
        cur += step;
        if (cur >= to) {
          setCounts(p => { const n = [...p]; n[idx] = to; return n; });
          clearInterval(iv);
        } else {
          setCounts(p => { const n = [...p]; n[idx] = Math.floor(cur); return n; });
        }
      }, 1000 / 60);
    });
  }, [statsInView]);

  return (
    <div style={{ minHeight: "100vh", background: "#f9f6ef" }}>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{margin:0;background:#f9f6ef;}
        ::selection{background:rgba(132,204,22,0.22);}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#f9f6ef;}
        ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#84cc16,#92400e);border-radius:4px;}
        @media(max-width:900px){
          .layout-row{flex-direction:column!important;}
          .sidebar{position:static!important;flex:none!important;width:100%!important;}
        }
        @media(max-width:600px){
          .hero-wrap{padding:48px 18px 40px!important;}
          .hero-h1{font-size:clamp(40px,11vw,64px)!important;}
          .stats-row{gap:28px!important;}
          .main-section{padding:36px 18px!important;}
          .footer-inner{padding:32px 18px!important;}
        }
      `}</style>

      <motion.div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 200,
        background: "linear-gradient(90deg,#84cc16,#65a30d,#92400e,#b45309,#84cc16)",
        backgroundSize: "200% 100%", transformOrigin: "left", scaleX,
      }} />



      <header
        ref={heroRef}
        className="hero-wrap min-h-screen"
        style={{
          background: "linear-gradient(160deg,#1c0a00 0%,#2d1200 55%,#1a2e05 100%)",
          padding: "clamp(56px,8vw,100px) clamp(18px,4vw,48px) clamp(52px,7vw,80px)",
        }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(36px,5vw,64px)", alignItems: "center" }}>
            <div style={{ flex: "1 1 320px" }}>
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "5px 13px", borderRadius: 100,
                  background: "rgba(132,204,22,0.12)",
                  border: "1px solid rgba(132,204,22,0.28)",
                  marginBottom: 22,
                }}
              >
                <BadgeCheck size={11} color="#84cc16" strokeWidth={2.5} />
                <span style={{
                  fontSize: 10, fontWeight: 600, color: "#84cc16",
                  letterSpacing: "0.1em", fontFamily: "Inter, sans-serif",
                }}>OFFICIAL PAYMENT TERMS</span>
              </motion.div>

              <motion.h1
                className="hero-h1"
                initial={{ opacity: 0, y: 22 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(46px,6.5vw,82px)",
                  fontWeight: 900, lineHeight: 1.0,
                  color: "#fff", margin: "0 0 6px",
                  letterSpacing: "-0.03em",
                }}
              >
                Terms &
                <span style={{
                  background: "linear-gradient(135deg,#84cc16 0%,#a3e635 60%,#65a30d 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>Conditions</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.58, delay: 0.2 }}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(13.5px,1.5vw,15.5px)", color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.78, margin: "18px 0 0", maxWidth: 460,
                }}
              >
                By proceeding with any payment, you agree to the following terms governing your transaction with<br/>
                <strong style={{ color: "rgba(163,230,53,0.85)", fontWeight: 600 }} className="">
                  SWAGRAMA AYURVEDA YOGA NISARGA AGRO TOURISM LLP
                </strong>.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.93 }} animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.25 }}
              style={{
                flex: "0 1 300px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(132,204,22,0.18)",
                borderRadius: 18, padding: "clamp(20px,3vw,30px)",
              }}
            >
              <div style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10, fontWeight: 600, color: "#84cc16",
                letterSpacing: "0.14em", marginBottom: 14,
              }}>DOCUMENT DETAILS</div>
              {[
                { l: "Jurisdiction", v: "Republic of India" },
                { l: "Payment Gateway", v: "SabPaisa" },
                { l: "Effective Date", v: "March 2025" },
                { l: "Total Clauses", v: "7 Sections" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }} animate={heroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.32 + i * 0.07 }}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 0",
                    borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.38)" }}>
                    {item.l}
                  </span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "#fff", fontWeight: 600 }}>
                    {item.v}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </header>
      <main
        className="main-section"
        style={{
          maxWidth: 1080, margin: "0 auto",
          padding: "clamp(44px,5.5vw,72px) clamp(18px,4vw,48px)",
        }}
      >
        <div
          className="layout-row"
          style={{ display: "flex", gap: "clamp(28px,4vw,48px)", alignItems: "flex-start" }}
        >
          <div style={{ flex: "1 1 480px", minWidth: 0 }}>
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}
            >
              <div style={{
                width: 4, height: 26, borderRadius: 2,
                background: "linear-gradient(180deg,#84cc16,#65a30d)",
              }} />
              <h2 style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(17px,2.1vw,21px)", fontWeight: 700,
                color: "#1c0a00", margin: 0,
              }}>Payment Terms</h2>
              <div style={{
                padding: "3px 10px", borderRadius: 100,
                background: "rgba(132,204,22,0.1)",
                border: "1px solid rgba(132,204,22,0.25)",
                fontFamily: "Inter, sans-serif",
                fontSize: 11, fontWeight: 600, color: "#65a30d",
              }}>7 clauses</div>
            </motion.div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {TERMS.map((term, i) => (
                <TermCard key={term.id} term={term} index={i} />
              ))}
            </div>
          </div>

          <div
            className="sidebar"
            style={{
              flex: "0 1 268px", minWidth: 220,
              position: "sticky", top: 80,
              display: "flex", flexDirection: "column", gap: 14,
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.08 }}
              style={{
                borderRadius: 16, overflow: "hidden",
                border: "1.5px solid rgba(132,204,22,0.18)",
                background: "rgba(255,255,255,0.72)", backdropFilter: "blur(12px)",
              }}
            >
              <div style={{
                background: "linear-gradient(135deg,#84cc16,#65a30d)",
                padding: "15px 18px",
              }}>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>
                  Quick Summary
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>
                  Key points to remember
                </div>
              </div>
              <div style={{ padding: "15px 18px", display: "flex", flexDirection: "column", gap: 9 }}>
                {[
                  "Payments via SabPaisa Gateway",
                  "Provide accurate payment info",
                  "Bank authorization required",
                  "Refund policy applies",
                  "Failed txn auto-reversed",
                  "Not liable for network issues",
                  "Indian laws govern this",
                ].map((pt, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <CheckCircle2 size={13} color="#84cc16" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12.5, color: "#5c3a10", lineHeight: 1.48,
                    }}>{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.16 }}
              style={{
                borderRadius: 16, padding: "18px",
                background: "linear-gradient(135deg,#1c0a00,#2d1200 70%,#1a2e05)",
                border: "1px solid rgba(132,204,22,0.14)",
              }}
            >
              <Lock size={18} color="#84cc16" strokeWidth={1.9} />
              <div style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13.5, fontWeight: 700, color: "#fff", margin: "9px 0 5px",
              }}>Secured by SabPaisa</div>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: "0 0 12px",
              }}>
                All transactions processed through RBI-compliant infrastructure.
              </p>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {["PCI DSS", "SSL", "256-bit"].map((tag, i) => (
                  <span key={i} style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 10, fontWeight: 600, color: "#84cc16",
                    padding: "3px 9px", borderRadius: 100,
                    background: "rgba(132,204,22,0.1)",
                    border: "1px solid rgba(132,204,22,0.22)",
                    letterSpacing: "0.05em",
                  }}>{tag}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.24 }}
              style={{
                borderRadius: 16, padding: "18px",
                background: "rgba(255,255,255,0.62)",
                border: "1.5px solid rgba(146,64,14,0.14)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Globe size={17} color="#92400e" strokeWidth={1.9} />
              <div style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13.5, fontWeight: 700, color: "#1c0a00", margin: "9px 0 5px",
              }}>Governing Law</div>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12, color: "#78450f", lineHeight: 1.6, margin: 0,
              }}>
                Subject to laws of the <strong>Republic of India</strong> and jurisdiction of relevant courts.
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
