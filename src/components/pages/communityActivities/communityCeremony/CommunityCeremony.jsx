// import { useState, useRef, useEffect } from "react";
// import gsap from "gsap";
// import {
//   CalendarMonth,
//   AccessTime,
//   CurrencyRupee,
//   Agriculture,
//   Spa,
//   Festival,
//   EmojiNature,
//   Grass,
//   LocalFlorist,
//   NavigateBefore,
//   NavigateNext,
//   Restaurant,
//   Hotel,
//   School,
//   Explore,
//   LocalHospital,
//   Cookie,
//   Inventory,
//   MenuBook,
//   TheaterComedy,
//   EmojiPeople,
// } from "@mui/icons-material";
// import { FaLeaf } from "react-icons/fa6";
// import { GiHerbsBundle } from "react-icons/gi";
// import OPDBookingModal from "../../healingServices/opdClinic/OPDBookingModal";

// const events = [
//   {
//     serviceName: "स्वसह्यकृषि",
//     titleEng: "Community Farming",
//     day: "Thursday",
//     time: "06:45 To 19:15",
//     price: 2000,
//     color: "from-emerald-600 to-teal-700",
//     icon: <Agriculture fontSize="large" className="text-white" />,
//     desc: "सेंद्रिय शेतीचा प्रत्यक्ष अनुभव. बैलशेती पद्धती, बियाणे स्वच्छता, कंपोस्ट खत व पावसाळी पेरणीचे मार्गदर्शन.",
//     includes: ["Food", "Accommodation", "Training", "Guidance", "Insurance"],
//   },
//   {
//     serviceName: "स्वसह्यमूलवस्तुनिर्माण",
//     titleEng: "Ayurveda Product & Tools Workshop",
//     day: "Friday",
//     time: "06:45 To 19:15",
//     price: 2200,
//     color: "from-yellow-600 to-amber-700",
//     icon: <Spa fontSize="large" className="text-white" />,
//     desc: "आयुर्वेदिक तेल/तूप/उटणे/गोमूत्र अर्क निर्मिती, गावठी साधने तयार करणे व स्वावलंबी जीवनशैली शिकणे.",
//     includes: ["Food", "Accommodation", "Training", "Guidance", "Insurance"],
//   },
//   {
//     serviceName: "दीपोत्सव",
//     titleEng: "Deepotsav Celebration",
//     day: "Saturday",
//     time: "17:00 To 22:00",
//     price: 1500,
//     color: "from-amber-600 to-orange-700",
//     icon: <Festival fontSize="large" className="text-white" />,
//     desc: "दीपप्रज्वलन, सामूहिक भजन, कंदील बनविणे, रांगोळी स्पर्धा, सणावारी भोजन व संस्कृती कथन.",
//     includes: ["Food", "Guidance", "Insurance"],
//   },
//   {
//     serviceName: "कृषी-अनुभव",
//     titleEng: "Agro Learning Camp",
//     day: "Sunday",
//     time: "08:00 To 18:00",
//     price: 1400,
//     color: "from-lime-600 to-green-700",
//     icon: <EmojiNature fontSize="large" className="text-white" />,
//     desc: "माती परीक्षण, पिक नियोजन, देसी बीज संरक्षण, मल्चिंग, सेंद्रिय फवारणी व बीजोत्पादन प्रशिक्षण.",
//     includes: ["Food", "Training", "Insurance"],
//   },
//   {
//     serviceName: "औषधवनस्पति अध्ययनम्",
//     titleEng: "Medicinal Plant Study",
//     day: "Monday",
//     time: "09:00 To 17:00",
//     price: 1800,
//     color: "from-amber-600 to-orange-700",
//     icon: <LocalFlorist fontSize="large" className="text-white" />,
//     desc: "औषधी वनस्पतींची ओळख, काढा/लेप/घासे तयार करणे, त्रिदोष व आयुर्वेदीय उपचार मूलतत्त्वे.",
//     includes: ["Food", "Accommodation", "Training", "Guidance"],
//   },
//   {
//     serviceName: "प्रकृतिसाहचर्य भ्रमण",
//     titleEng: "Nature Harmony Walk",
//     day: "Wednesday",
//     time: "06:00 To 12:00",
//     price: 950,
//     color: "from-emerald-600 to-teal-700",
//     icon: <Grass fontSize="large" className="text-white" />,
//     desc: "वनभ्रमंण, पक्षीनिरीक्षण, जलशुद्धीकरण, ध्यान, स्वच्छ वायू श्वसन साधना व निसर्गाशी जोडणी.",
//     includes: ["Food", "Guidance"],
//   },
//   {
//     serviceName: "भोंडला महिला-स्नेहमेळावा",
//     titleEng: "Traditional Bhondla Dance",
//     day: "Tuesday",
//     time: "16:00 To 21:00",
//     price: 1300,
//     color: "from-amber-600 to-orange-700",
//     icon: <Festival fontSize="large" className="text-white" />,
//     desc: "गाणी-नृत्य, फेर धरून खेळ, स्त्रियांचा स्नेहमेळावा, सामूहिक फुले व प्रसाद.",
//     includes: ["Snacks", "Guidance", "Cultural Activities"],
//   },
//   {
//     serviceName: "योगसाधना सप्ताह",
//     titleEng: "Yoga & Mindfulness",
//     day: "Daily Morning",
//     time: "06:30 To 08:30",
//     price: 800,
//     color: "from-emerald-600 to-teal-700",
//     icon: <Spa fontSize="large" className="text-white" />,
//     desc: "प्राणायाम, सूर्यनमस्कार, ध्यान, तणावमुक्ती, मानसिक स्थैर्य व शरीर संतुलन अभ्यास.",
//     includes: ["Guidance", "Practice Materials"],
//   },
//   {
//     serviceName: "लोककला शिल्पशाळा",
//     titleEng: "Folk Art Workshop",
//     day: "Weekend",
//     time: "10:00 To 17:00",
//     price: 1600,
//     color: "from-lime-600 to-green-700",
//     icon: <Festival fontSize="large" className="text-white" />,
//     desc: "वारली चित्रकला, बांस-क्राफ्ट, कपडा-डिझाईन, रंग-फुलांची नक्षी व हातकला अनुभव.",
//     includes: ["Materials", "Training", "Snacks"],
//   },
//   {
//     serviceName: "रसप्राशन आम्रउत्सव",
//     titleEng: "Mango Feast Festival",
//     day: "Summer",
//     time: "10:00 To 16:00",
//     price: 1750,
//     color: "from-amber-600 to-orange-700",
//     icon: <EmojiNature fontSize="large" className="text-white" />,
//     desc: "हापूस/दशहरी आंबा चाखणे, आंबा रस, पन्हे, ग्रामीण खेळ व शेतभेट.",
//     includes: ["Food", "Farm Experience"],
//   },
// ];

// const includeIcons = {
//   Food: <Restaurant fontSize="small" className="text-green-600" />,
//   Accommodation: <Hotel fontSize="small" className="text-blue-600" />,
//   Training: <School fontSize="small" className="text-purple-600" />,
//   Guidance: <Explore fontSize="small" className="text-amber-600" />,
//   Insurance: <LocalHospital fontSize="small" className="text-red-600" />,
//   Snacks: <Cookie fontSize="small" className="text-orange-600" />,
//   Materials: <Inventory fontSize="small" className="text-indigo-600" />,
//   "Practice Materials": <MenuBook fontSize="small" className="text-teal-600" />,
//   "Cultural Activities": (
//     <TheaterComedy fontSize="small" className="text-pink-600" />
//   ),
//   "Farm Experience": <FaLeaf className="text-lime-600" />,
// };

// export default function BeautifulAyurvedaCarousel() {
//   const [index, setIndex] = useState(0);
//   const [openAppointmentBookModal, setOpenAppointmentBookModal] =
//     useState(false);
//   const [selectedService, setSelectedService] = useState(null);
//   const bodyRef = useRef(null);
//   const waveRefs = useRef([]);

//   const slides = [events[index], events[(index + 1) % events.length]];

//   const animate = (dir = 1) => {
//     const cards = document.querySelectorAll(".eventCard");
//     gsap.fromTo(
//       cards,
//       {
//         x: 100 * dir,
//         opacity: 0,
//         scale: 0.9,
//         rotateY: 15 * dir,
//       },
//       {
//         x: 0,
//         opacity: 1,
//         scale: 1,
//         rotateY: 0,
//         duration: 0.9,
//         stagger: 0.2,
//         ease: "power4.out",
//       }
//     );
//   };

//   useEffect(() => {
//     animate(1);
//   }, [index]);

//   useEffect(() => {
//     const run = setInterval(() => next(), 8000);
//     return () => clearInterval(run);
//   }, [index]);

//   const next = () => {
//     setIndex((i) => (i + 2) % events.length);
//   };

//   const prev = () => {
//     setIndex((i) => (i - 2 + events.length) % events.length);
//   };

//   useEffect(() => {
//     waveRefs.current.forEach((wave) => {
//       if (wave) {
//         gsap.to(wave, {
//           duration: 4,
//           repeat: -1,
//           ease: "sine.inOut",
//           yoyo: true,
//           attr: {
//             d: "M0,260 C360,300 720,340 1080,260 C1320,240 1440,280 1440,280 V320 H0 Z",
//           },
//         });
//       }
//     });
//   }, [index]);

//   return (
//     <div className="md:max-w-7xl mx-auto py-10 md:px-3 relative select-none">
//       <div className="text-center relative pb-2">
//         <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 via-amber-600 to-red-600 bg-clip-text py-1 text-transparent">
//           🌿 स्वसहभावउत्सव संस्कृती अनुभूती 🌿
//         </h1>
//       </div>

//       <div className="flex justify-end gap-3 mb-2">
//         <button
//           onClick={prev}
//           className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
//         >
//           <NavigateBefore />
//         </button>
//         <button
//           onClick={next}
//           className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
//         >
//           <NavigateNext />
//         </button>
//       </div>

//       <div ref={bodyRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
//         {slides.map((ev, i) => {
//           return (
//             <div
//               key={`${index}-${i}`}
//               className="eventCard relative overflow-hidden rounded-3xl shadow-2xl border border-gray-200 bg-white hover:shadow-3xl transition-shadow duration-300"
//             >
//               <div
//                 className={`relative p-3 md:p-6 text-white bg-gradient-to-br ${ev.color} overflow-hidden`}
//               >
//                 <div className="md:flex  space-x-2 items-center justify-between whitespace-nowrap relative z-10">
//                   <div className="flex space-x-2 items-center relative z-10">
//                     <div className="rounded-full bg-white/25 backdrop-blur-sm p-2 shadow-lg">
//                       {ev.icon}
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-lg font-bold mb-1">{ev.serviceName}</p>
//                       <p className="text-sm opacity-95 font-medium">
//                         {ev.titleEng}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2 text-sm  relative z-10 mt-2 md:mt-0">
//                     <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
//                       <CalendarMonth fontSize="small" />
//                       <span className="font-medium">{ev.day}</span>
//                     </div>
//                     <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
//                       <AccessTime fontSize="small" />
//                       <span className="font-medium">{ev.time}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <svg
//                   className="absolute bottom-[-1px] left-0 w-full pointer-events-none"
//                   viewBox="0 0 1440 320"
//                 >
//                   <path
//                     ref={(el) => (waveRefs.current[i] = el)}
//                     fill="#fff"
//                     d="M0,270 C360,330 720,200 1080,280 C1320,310 1440,250 1440,250 V320 H0 Z"
//                   />
//                 </svg>
//               </div>

//               <div className="p-4">
//                 <p className="text-gray-700 text-sm leading-relaxed mb-3">
//                   {ev.desc}
//                 </p>

//                 <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-3 mb-3">
//                   <p className="font-bold text-green-800 mb-2 flex items-center gap-2 text-sm">
//                     <Inventory fontSize="small" />
//                     What's Included :
//                   </p>
//                   <div className="grid grid-cols-2 gap-2">
//                     {ev.includes.map((item) => (
//                       <div
//                         key={item}
//                         className="flex items-center gap-2 bg-white rounded-lg px-2 py-1.5 shadow-sm border border-green-100"
//                       >
//                         {includeIcons[item]}
//                         <span className="text-xs font-medium text-gray-700">
//                           {item}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 border border-amber-200 mb-3">
//                   <h4 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-2">
//                     <School className="text-green-600" fontSize="small" />
//                     Event Details
//                   </h4>
//                   <div className="space-y-2">
//                     <div className="flex items-center space-x-2">
//                       <CalendarMonth
//                         className="text-amber-600"
//                         fontSize="small"
//                       />
//                       <span className="font-semibold text-gray-700 text-xs">
//                         Day :
//                       </span>
//                       <span className="text-gray-600 text-xs">{ev.day}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <AccessTime className="text-amber-600" fontSize="small" />
//                       <span className="font-semibold text-gray-700 text-xs">
//                         Timing :
//                       </span>
//                       <span className="text-gray-600 text-xs">{ev.time}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <CurrencyRupee
//                         className="text-amber-600"
//                         fontSize="small"
//                       />
//                       <span className="font-semibold text-gray-700 text-xs whitespace-nowrap">
//                         Investment :
//                       </span>
//                       <span className="text-gray-600 text-xs">
//                         ₹{ev.price} per person (All inclusive)
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl border border-green-200 p-3 mb-3">
//                   <p className="text-xs font-bold text-green-800 mb-2 flex items-center gap-1">
//                     <GiHerbsBundle className="text-sm" />
//                     WHAT'S INCLUDED
//                   </p>
//                   <div className="flex items-center justify-center gap-2 flex-wrap">
//                     <div className="flex items-center gap-1 text-gray-600">
//                       <Restaurant
//                         sx={{ fontSize: 16 }}
//                         className="text-amber-600"
//                       />
//                       <span className="text-xs">Food</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-gray-600">
//                       <Hotel sx={{ fontSize: 16 }} className="text-green-600" />
//                       <span className="text-xs">Accommodation</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-gray-600">
//                       <School sx={{ fontSize: 16 }} className="text-red-600" />
//                       <span className="text-xs">Training</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-gray-600">
//                       <EmojiPeople
//                         sx={{ fontSize: 16 }}
//                         className="text-purple-600"
//                       />
//                       <span className="text-xs">Guidance</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-gray-600">
//                       <LocalHospital
//                         sx={{ fontSize: 16 }}
//                         className="text-indigo-600"
//                       />
//                       <span className="text-xs">Insurance</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setOpenAppointmentBookModal(true);
//                       setSelectedService(ev);
//                     }}
//                     className={`flex-1  text-white bg-gradient-to-r ${ev.color} px-3 py-2 rounded-full hover:scale-[1.02]  font-bold text-sm`}
//                   >
//                     Book Now - Secure Your Spot
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <div className="flex justify-center mt-6 gap-2">
//         {[...Array(Math.ceil(events.length / 2))].map((_, i) => (
//           <div
//             key={i}
//             onClick={() => setIndex(i * 2)}
//             className={`h-3 rounded-full cursor-pointer transition-all duration-300
//             ${
//               i === Math.floor(index / 2)
//                 ? "bg-amber-600 w-10 scale-110"
//                 : "bg-gray-400 w-3 hover:bg-gray-500"
//             }`}
//           ></div>
//         ))}
//       </div>
//       {openAppointmentBookModal && (
//         <OPDBookingModal
//           open={openAppointmentBookModal}
//           handleClose={() => {
//             setOpenAppointmentBookModal(false);
//             setSelectedService(null);
//           }}
//           selectedService={selectedService}
//         />
//       )}
//     </div>
//   );
// }

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Heart,
  IndianRupee,
  Leaf
} from "lucide-react";
import { useState } from "react";
import BookEventForm from "../../bookEventForm/BookEventForm";
import { eventsData2026 } from "../../eventsCalander/EventCalander";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const EventCard = ({
  event,
  index,
  setOpenEventBookModal,
  setSelectedEvent,
}) => {
  const isPremium = event.value && event.value >= 9000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
      className="h-full"
    >
      <motion.div
        className="relative h-full flex flex-col overflow-hidden rounded-3xl bg-card border border-lime group cursor-pointer"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative h-44 2xl:h-60 overflow-hidden">
          <motion.img
            src={event.image}
            alt={event.serviceName}
            className="w-full h-full object-cover object-top"
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 to-transparent" />

          <div className="absolute bottom-1 right-1">
            <div
              className="
              flex items-center gap-2 px-3 py-2
              bg-forest/40
              backdrop-blur-md
              border border-white/20
              rounded-xl
              shadow-lg
            "
            >
              <Calendar className="w-4 h-4 text-lime" />
              <span className="text-xs font-semibold text-cream">
                {event.date}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-3">
          <h3 className="font-display text-sm py-1 font-bold text-foreground leading-tight  line-clamp-2 group-hover:text-forest transition-colors">
            {event.serviceName}
          </h3>
        
          <p className="text-xs text-muted-foreground  line-clamp-2 flex-grow">
            {event.description}
          </p>

          <div className="flex items-start gap-2 my-1 p-2 bg-lime/10 rounded-xl border border-lime-200">
            <Heart className="w-4 h-4 text-earth mt-1 flex-shrink-0 " />
            <div>
              <span className="text-xs font-semibold text-earth uppercase tracking-wide">
                Benefits
              </span>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                {event.benefits}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 mt-auto">
            {event.value ? (
              <div className="flex items-center gap-1">
                <IndianRupee className="w-5 h-5 text-forest" />
                <span
                  className={`font-display text-xl font-bold ${
                    isPremium ? "text-earth" : "text-forest"
                  }`}
                >
                  {event.value.toLocaleString()}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-lime/20 rounded-lg">
                <Leaf className="w-4 h-4 text-forest" />
                <span className="text-sm font-semibold text-forest">Free</span>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05, x: 3 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                isPremium
                  ? "bg-gradient-earth text-cream shadow-earth"
                  : "bg-gradient-forest text-cream shadow-nature"
              }`}
              onClick={() => {
                setOpenEventBookModal(true);
                setSelectedEvent(event);
              }}
            >
              <span>Book Event</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MonthSection = ({
  month,
  events,
  setOpenEventBookModal,
  setSelectedEvent,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const monthColors = {
    January: "from-forest to-forest-light",
    February: "from-earth to-earth-light",
    March: "from-lime to-lime-light",
    April: "from-forest to-lime",
    May: "from-earth to-forest",
    June: "from-lime to-forest",
    July: "from-forest-light to-lime",
    August: "from-earth-light to-earth",
    September: "from-forest to-earth",
    October: "from-lime to-earth",
    November: "from-earth to-lime-light",
    December: "from-forest to-earth-light",
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between mb-4 group cursor-pointer"
        whileHover={{ x: 6 }}
      >
        <div className="flex items-center gap-5">
          <div
            className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${monthColors[month]} flex items-center justify-center shadow-nature overflow-hidden`}
          >
            <span className="font-display text-2xl font-bold text-cream">
              {month.slice(0, 3)}
            </span>
            <motion.div
              className="absolute -bottom-2 -right-2 w-8 h-8 z-10 rounded-full bg-lime flex items-center justify-center text-sm font-bold text-forest shadow-lg"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              {events.length}
            </motion.div>
          </div>
          <div className="text-left">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              {month} <span className="text-lime">2026</span>
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {events.length} events • {events.filter((e) => e.value).length}{" "}
              bookable
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-12 h-12 rounded-full bg-lime/20 flex items-center justify-center border-2 border-lime/30 group-hover:bg-lime/30 transition-colors"
        >
          <svg
            className="w-5 h-5 text-forest"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {events.map((event, index) => (
                <EventCard
                  key={`${event.date}-${event.serviceName}-${index}`}
                  event={event}
                  index={index}
                  setOpenEventBookModal={setOpenEventBookModal}
                  setSelectedEvent={setSelectedEvent}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

const CommunityCeremony = () => {
  const [openEventBookModal, setOpenEventBookModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventsByMonth = months.reduce((acc, month) => {
    acc[month] = eventsData2026.filter((event) => event.month === month);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden bg-gradient-forest py-10 md:py-12"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[10%] w-40 h-40 rounded-full bg-lime/20 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-[15%] w-60 h-60 rounded-full bg-earth/20 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-lime-light/10 blur-3xl"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-lime/20 backdrop-blur-sm rounded-full mb-8 border border-lime/30"
            >
              <Leaf className="w-5 h-5 text-lime" />
              <span className="font-semibold text-lime">
                स्वग्राम कार्यक्रम 2026
              </span>
            </motion.div>

            <h1 className="font-display text-2xl md:text-3xl font-bold mb-8 leading-[1.1]">
              <span className="text-cream">Annual Events</span>
              <br />
              <span className="text-lime">Calendar 2026</span>
            </h1>

            <p className="text-xl md:text-2xl text-cream/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover our curated collection of cultural festivals, wellness
              communes, and spiritual ceremonies throughout the year.
            </p>
          </motion.div>
        </div>
      </motion.header>

      <main className="w-full mx-auto px-4 py-3">
        {months.map((month) => {
          const monthEvents = eventsByMonth[month];
          if (monthEvents.length === 0) return null;
          return (
            <MonthSection
              key={month}
              month={month}
              events={monthEvents}
              setOpenEventBookModal={setOpenEventBookModal}
              setSelectedEvent={setSelectedEvent}
            />
          );
        })}
      </main>

      {openEventBookModal && (
        <BookEventForm
          open={openEventBookModal}
          handleClose={() => {
            setOpenEventBookModal(false);
            setSelectedEvent(null);
          }}
          eventDetails={selectedEvent}
        />
      )}
    </div>
  );
};

export default CommunityCeremony;
