import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import regularYogaImg from "../../../../assets/images/yoga/regular_yoga_mountain.webp";
import therapeuticYogaImg from "../../../../assets/images/yoga/therapeutic_yoga.jpg";
import pranayamaImg from "../../../../assets/images/yoga/pranayama.jpg";
import meditationImg from "../../../../assets/images/yoga/meditation.jpg";
import heroImg from "../../../../assets/images/yoga/hero_ashram.jpg";
import { GetTherapyNameByServiceCategory } from "../../../../services/healingServices/detoxTherapyServices/DetoxTherapyServices";
import NatureTherapyBookingModal from "../natureTherapy/NatureTherapyBookingModal";

const THEMES = [
  { badge: "bg-lime-100 text-lime-800", ring: "ring-lime-600/30", btn: "from-lime-700 to-green-800", dot: "bg-lime-600", soft: "bg-lime-50/60" },
  { badge: "bg-amber-100 text-amber-900", ring: "ring-amber-700/30", btn: "from-amber-700 to-yellow-800", dot: "bg-amber-700", soft: "bg-amber-50/60" },
  { badge: "bg-emerald-100 text-emerald-800", ring: "ring-emerald-700/30", btn: "from-emerald-700 to-green-800", dot: "bg-emerald-700", soft: "bg-emerald-50/60" },
  { badge: "bg-orange-100 text-orange-900", ring: "ring-orange-700/30", btn: "from-orange-700 to-amber-800", dot: "bg-orange-700", soft: "bg-orange-50/60" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function pickImage(name = "", index = 0) {
  const n = name.toLowerCase();
  if (/(pranayam|breath|breathing|kapal|anulom)/.test(n)) return pranayamaImg;
  if (/(meditat|dhyana|mindful|silence)/.test(n)) return meditationImg;
  if (/(therap|heal|restor|chronic|pain|injury|rehab|stress|anxiety)/.test(n)) return therapeuticYogaImg;
  if (/(hatha|asana|regular|classical|daily|morning|surya|vinyasa)/.test(n)) return meditationImg;
  const pool = [regularYogaImg, therapeuticYogaImg, pranayamaImg, meditationImg];
  return pool[index % pool.length];
}

function TherapyCard({ therapy, index, onBookSession }) {
  const theme = THEMES[index % THEMES.length];

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-white ring-1 ring-stone-200/70 shadow-sm hover:shadow-2xl hover:ring-2 transition-all duration-500"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-stone-100">
        <motion.img
          src={therapy.image}
          alt={therapy.name}
          loading="lazy"
          initial={{ scale: 1.05 }}
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent" />

        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md ${theme.badge}`}>
            {therapy.subtitle}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          {therapy.sanskrit && (
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white drop-shadow-md">
              {therapy.sanskrit}
            </h3>
          )}
          <p className="mt-0.5 text-sm font-medium text-white/90">{therapy.name}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        {therapy.description && (
          <p className="font-serif text-[13px] leading-relaxed text-stone-700 line-clamp-4">
            {therapy.description}
          </p>
        )}

        {therapy.benefits?.length > 0 && (
          <div className={`rounded ring-1 ${theme.ring}  p-3 ${theme.soft} space-y-2`}>
            {therapy.benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${theme.dot}`} />
                <span className="font-serif text-xs leading-relaxed text-stone-700">{b}</span>
              </div>
            ))}
          </div>
        )}

        <div className={`overflow-hidden rounded ring-1 ${theme.ring}`}>
          {therapy.pricing.map((p, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-3.5 py-2 text-xs ${
                i % 2 === 0 ? "bg-white" : theme.soft
              } ${i !== 0 ? "border-t border-stone-200/60" : ""}`}
            >
              <span className="font-semibold text-stone-700">{p.label}</span>
              <span className="font-bold text-stone-900">{p.price}</span>
            </div>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onBookSession(therapy)}
          className={`mt-auto w-full rounded bg-gradient-to-r ${theme.btn} py-3 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-md transition-all duration-300 hover:shadow-xl`}
        >
          Book Session
        </motion.button>
      </div>
    </motion.article>
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
          if (page === 1) setServices(newServices);
          else setServices((prev) => [...prev, ...newServices]);
          setCount(responseData.totalRecords || 0);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-lime-50/40 via-stone-50 to-amber-50/40 pb-16">
      <section className="relative h-[60vh] min-h-[380px] w-full overflow-hidden sm:h-[70vh] lg:h-[560px]">
        <motion.img
          src={heroImg}
          alt="Himalayan Mountain Yoga Ashram"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-900/30 to-stone-950/85" />

        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-5 text-center sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mb-3 font-serif text-[11px] font-semibold text-lime-300 sm:text-xs"
          >
            योगचिकित्सा · Yoga  Therapy
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif text-3xl font-black leading-tight text-white drop-shadow-xl sm:text-5xl lg:text-6xl"
          >
            Reset the Mind.
            <br />
            <span className="text-lime-300">Equalize Body–Mind–Soul.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-4 max-w-xl font-serif text-sm italic text-white/85 sm:mt-6 sm:text-base"
          >
            Ancient Gurukul yoga traditions practised in the Himalayan mountains
            for over two centuries — now offered to you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="mt-5 flex flex-wrap justify-center gap-2 sm:mt-7"
          >
            {["200+ Year Heritage", "Himalayan Gurukul Methods", "Certified Yogacharya"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-lime-300/40 bg-white/10 px-3 py-1.5 font-serif text-[10px] font-semibold text-lime-100 backdrop-blur-md sm:text-xs"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mb-10 text-center sm:mb-14"
        >
          <p className="mb-2 font-serif text-[10px] font-semibold uppercase tracking-[0.35em] text-lime-700 sm:text-xs">
            ॥ प्राचीन परम्परा ॥
          </p>
          <h2 className="font-serif text-2xl font-black text-stone-800 sm:text-4xl">
            Yoga Therapy Services
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-16 bg-gradient-to-r from-transparent via-lime-500 to-transparent" />
          <p className="mx-auto mt-4 max-w-xl font-serif text-sm italic text-stone-600 sm:text-base">
            Classical disciplines preserved from two centuries of Himalayan
            Gurukul tradition, taught by Indian yogacharyas the ancient way.
          </p>
        </motion.div>

        {isLoading && services.length === 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200">
                <div className="aspect-[4/3] w-full bg-stone-200" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-3/4 rounded bg-stone-200" />
                  <div className="h-3 w-full rounded bg-stone-200" />
                  <div className="h-10 w-full rounded bg-stone-200" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="therapies"
              variants={stagger}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
            >
              {services.map((service, i) => {
                const nameParts = (service.serviceName || "")
                  .trim()
                  .split(/(?=[\u0900-\u097F])/);
                const englishName = nameParts[0]?.trim() || service.serviceName;
                const hindiName = nameParts.slice(1).join("").trim() || "";

                const mappedTherapy = {
                  id: service.serviceId,
                  name: englishName,
                  sanskrit: hindiName,
                  subtitle: `${service.duration || "30"} Min Session`,
                  description: service.description || "",
                  benefits: service.uses ? [service.uses] : [],
                  image: service.serviceImage || pickImage(service.serviceName, i),
                  pricing: [
                    { label: "Single", price: "₹1000/1" },
                    { label: "2–5 People", price: "₹750/2-5" },
                    { label: "5 or More", price: "₹500/5 or More" },
                  ],
                  ...service,
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
          </AnimatePresence>
        )}
      </section>

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
