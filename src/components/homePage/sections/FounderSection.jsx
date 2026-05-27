import React, { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SantoshSuryavanshi from "../../assets/landing-page/ourexperts/Vaidya Santosh Suryawanshi.png";

const fly = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const credentials = [
  { role: "CEO & Promotor", org: "JnanaYogAyu Pvt. Ltd." },
  { role: "Partner", org: "SwaGrama Ayurveda Yoga Nisarga Agro Tourism LLP" },
  { role: "Proprietor", org: "Ayurvijnana Chikitsalaya" },
  { role: "Partner", org: "Smart Unity Healthcare LLP" },
];

const FounderSection = ({ foundersRef, isFoundersInView }) => {
  const internalRef = useRef(null);
  const ref = foundersRef || internalRef;
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const show = isFoundersInView !== undefined ? isFoundersInView : inView;

  return (
    <section ref={ref} className="relative py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fly(0)}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="w-6 h-px" style={{ background: "#991b1b" }} />
          <span
            className="text-[9px] tracking-[0.4em] uppercase font-black"
            style={{ color: "#991b1b" }}
          >
            Mentor & Founder
          </span>
          <div className="w-6 h-px" style={{ background: "#991b1b" }} />
        </motion.div>
        <div className="grid grid-cols-12 grid-rows-[auto] gap-3">
          <motion.div
            variants={fly(0.1)}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            className="col-span-12 sm:col-span-5 lg:col-span-4 row-span-2 relative rounded-2xl overflow-hidden"
            style={{ minHeight: 400, background: "#e8f5e0" }}
          >
            <img
              src={SantoshSuryavanshi}
              alt="Vaidya Santosh Suryawanshi"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,40,15,0.72) 0%, transparent 50%)",
              }}
            />
            <div className="absolute bottom-4 left-[30%]">
              <span
                className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-lg text-white"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                MD Ayurveda
              </span>
            </div>
            <div
              className="absolute top-0 right-0 w-1 h-full"
              style={{
                background:
                  "linear-gradient(to bottom, #a3e635, #15803d, #991b1b)",
              }}
            />
          </motion.div>
          <motion.div
            variants={fly(0.15)}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            className="col-span-12 sm:col-span-7 lg:col-span-8 rounded-2xl px-6 py-5 flex flex-col justify-between"
            style={{
              background: "linear-gradient(135deg,#fff 60%,#f0fce8)",
              border: "1px solid #d1fae5",
              boxShadow: "0 4px 20px rgba(21,128,61,0.07)",
            }}
          >
            <div>
              <p
                className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-2"
                style={{ color: "#991b1b" }}
              >
                Guiding Force
              </p>
              <h2
                className="text-3xl sm:text-4xl font-black leading-[1.1] tracking-tight"
                style={{ fontFamily: "'Georgia',serif", color: "#14532d" }}
              >
                Vaidya Santosh &nbsp;
                <span >
                  Suryawanshi
                </span>
              </h2>
            </div>
          </motion.div>

          <motion.div
            variants={fly(0.22)}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            className="col-span-12 sm:col-span-7 lg:col-span-8 rounded-2xl px-6 py-5"
            style={{
              background: "#fff",
              border: "1px solid #d1fae5",
              boxShadow: "0 4px 20px rgba(21,128,61,0.07)",
            }}
          >
            <p
              className="text-[9px] tracking-[0.35em] uppercase font-bold mb-4"
              style={{ color: "#6b7280" }}
            >
              Roles & Affiliations
            </p>
            <div className="space-y-3">
              {credentials.map(({ role, org }, i) => (
                <motion.div
                  key={i}
                  variants={fly(0.28 + i * 0.07)}
                  initial="hidden"
                  animate={show ? "visible" : "hidden"}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-[5px] flex-shrink-0 w-[6px] h-[6px] rounded-full"
                    style={{ background: i % 2 === 0 ? "#16a34a" : "#991b1b" }}
                  />
                  <div className="leading-snug">
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider mr-2"
                      style={{ color: "#991b1b" }}
                    >
                      {role}
                    </span>
                    <span className="text-sm" style={{ color: "#374151" }}>
                      {org}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(FounderSection);
