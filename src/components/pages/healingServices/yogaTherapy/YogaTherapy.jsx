import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import regularYogaImg from "../../../../assets/images/yoga/regular_yoga_mountain.png";
import therapeuticYogaImg from "../../../../assets/images/yoga/therapeutic_yoga_mountain.png";
import heroImg from "../../../../assets/images/yoga/yoga_ashram_banner.png";
import {
    GetTherapyNameByServiceCategory
} from "../../../../services/healingServices/detoxTherapyServices/DetoxTherapyServices";
import NatureTherapyBookingModal from "../natureTherapy/NatureTherapyBookingModal";

const VINTAGE_FILTER =
  "sepia(0.75) contrast(1.15) brightness(0.88) saturate(0.7)";



const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

function TherapyCard({ therapy, index, onBookSession }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden bg-white group"
      style={{
        boxShadow: hovered
          ? `0 28px 64px ${therapy.accent}35`
          : "0 4px 24px rgba(0,0,0,0.10)",
        transition: "box-shadow 0.35s ease",
        border: `1px solid ${therapy.accent}25`,
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.35 }}
    >
      <div className="relative w-full h-52 sm:h-60 overflow-hidden">
        <motion.img
          src={therapy.image}
          alt={therapy.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.55 }}
          style={{ filter: VINTAGE_FILTER }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(20,12,5,0.85) 0%, rgba(20,12,5,0.15) 55%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
            mixBlendMode: "multiply",
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-amber-200/80 text-[10px] font-medium mb-0.5 italic">
            {therapy.subtitle}
          </p>
          <h3
            className="text-amber-100 font-black text-base leading-tight drop-shadow-lg"
            style={{ fontFamily: "serif" }}
          >
            {therapy.sanskrit}
          </h3>
          <p className="text-amber-200/90 text-xs font-semibold">
            {therapy.name}
          </p>
        </div>
      </div>

      <div
        className="p-4 space-y-3"
        style={{
          background: therapy.light,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(0,0,0,0.03) 25px)",
        }}
      >
        <p
          className="text-gray-700 text-xs leading-relaxed"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {therapy.description}
        </p>

        <div>
          {therapy.benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <span
                className="text-sm leading-none mt-0.5 flex-shrink-0"
                style={{ color: therapy.accent }}
              >
                ✦
              </span>
              <span
                className="text-xs text-gray-600 leading-relaxed"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {b}
              </span>
            </div>
          ))}
        </div>

        <div
          className="rounded-xl overflow-hidden border"
          style={{ borderColor: `${therapy.accent}35` }}
        >
          {therapy.pricing.map((p, i) => (
            <div
              key={i}
              className={`flex justify-between items-center px-3 py-2 text-xs ${
                i !== 0 ? "border-t" : ""
              }`}
              style={{
                borderColor: `${therapy.accent}20`,
                background: i % 2 === 0 ? "white" : therapy.light,
              }}
            >
              <span className="font-semibold text-gray-700">{p.label}</span>
              <span className="font-bold" style={{ color: therapy.accent }}>
                {p.price}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => onBookSession(therapy)}
          className="w-full py-2.5 rounded-xl text-white text-xs font-bold tracking-wide transition-all duration-300 hover:opacity-90 hover:shadow-lg active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${therapy.accent}, ${therapy.accent}bb)`,
            fontFamily: "Georgia, serif",
            letterSpacing: "0.05em",
          }}
        >
          Book Session
        </button>
      </div>
    </motion.div>
  );
}

export default function YogaTherapy() {
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const handleBookSession = (therapy) => {
    setSelectedTherapy(therapy);
    setOpenBookingModal(true);
  };

  useEffect(() => {
    setIsLoading(true);
    GetTherapyNameByServiceCategory(5, 0, "Yoga Therapy", page, 10)
      .then((res) => {
        const responseData = res?.data?.data;
        if (responseData) {
          const newServices = responseData.data || [];
          if (page === 1) {
            setServices(newServices);
          } else {
            setServices((prev) => [...prev, ...newServices]);
          }
          setCount(responseData.totalRecords || 0);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div
      className="overflow-x-hidden pb-10"
      style={{
        background:
          "linear-gradient(160deg, #fdf4e3 0%, #f5ead2 40%, #ece8dc 100%)",
      }}
    >
      <div className="relative h-72 md:h-80 lg:h-[420px] 2xl:h-[560px] overflow-hidden">
        <motion.img
          src={heroImg}
          alt="Himalayan Mountain Yoga"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          style={{
            filter: "sepia(0.5) contrast(1.1) brightness(0.85) saturate(0.75)",
          }}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=90&fit=crop";
            e.target.style.filter =
              "sepia(0.55) contrast(1.1) brightness(0.85)";
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,6,2,0.5) 0%, rgba(10,6,2,0.25) 40%, rgba(10,6,2,0.78) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
            mixBlendMode: "multiply",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-amber-300 text-[10px] sm:text-xs font-semibold mb-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            योगचिकित्सा · Yoga Therapy
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white font-black text-2xl sm:text-4xl md:text-5xl leading-tight drop-shadow-2xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Reset the Mind.
            <br />
            <span className="text-amber-300">Equalize Body–Mind–Soul.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-white/80 text-xs sm:text-sm mt-3 max-w-lg font-medium italic"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Ancient Gurukul yoga traditions practised in the Himalayan mountains
            for over two centuries — now offered to you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap justify-center gap-2 mt-4"
          >
            {[
              "200+ Year Heritage",
              "Himalayan Gurukul Methods",
              "Certified Yogacharya",
            ].map((tag) => (
              <span
                key={tag}
                className="bg-amber-900/30 backdrop-blur-sm border border-amber-400/40 text-amber-200 text-[10px] sm:text-xs px-3 py-1 rounded-full font-semibold"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-8"
        >
          <p
            className="text-amber-700 text-[10px] font-semibold tracking-[0.3em] uppercase mb-1"
            style={{ fontFamily: "Georgia, serif" }}
          >
            ॥ प्राचीन परम्परा ॥
          </p>
          <h2
            className="text-2xl sm:text-3xl font-black text-gray-800"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Yoga Therapy Services
          </h2>
          <p
            className="text-gray-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto italic"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Classical disciplines preserved from two centuries of Himalayan
            Gurukul tradition, taught by Indian yogacharyas the ancient way.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key="therapies"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="contents"
            >
              {services.map((service, i) => {
                // Split Hindi and English name parts
                const nameParts = (service.serviceName || "").trim().split(/(?=[\u0900-\u097F])/);
                const englishName = nameParts[0]?.trim() || service.serviceName;
                const hindiName = nameParts.slice(1).join("").trim() || "";

                const mappedTherapy = {
                  id: service.serviceId,
                  name: englishName,
                  sanskrit: hindiName,
                  subtitle: `${service.duration || "30"} Min Session`,
                  description: service.description || "",
                  benefits: service.uses ? [service.uses] : [],
                  image: service.serviceImage || (i % 2 === 0 ? regularYogaImg : therapeuticYogaImg),
                  pricing: [
                    { label: "Single", price: "₹1000/1" },
                    { label: "2–5 People", price: "₹750/2-5" },
                    { label: "5 or More", price: "₹500/5 or More" },
                  ],
                  accent: i % 2 === 0 ? "#537c3a" : "#7b5e2a",
                  light: i % 2 === 0 ? "#f0f7ea" : "#fdf6ec",
                  ...service
                };

                return (
                  <TherapyCard
                    key={service.serviceId}
                    therapy={mappedTherapy}
                    index={i}
                    onBookSession={handleBookSession}
                  />
                );
              })}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {openBookingModal && selectedTherapy && (
        <NatureTherapyBookingModal
          open={openBookingModal}
          handleClose={() => {
            setOpenBookingModal(false);
            setSelectedTherapy(null);
          }}
          therapy={{
            ...selectedTherapy,
            serviceName: selectedTherapy.name,
            serviceId: selectedTherapy.id,
            nameEnglish: selectedTherapy.name,
          }}
          origin="Yoga Therapy"
        />
      )}
    </div>
  );
}
