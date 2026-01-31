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

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Calendar,
  Heart,
  IndianRupee,
  Leaf,
  Sparkles,
  ArrowRight,
  Clock1,
} from "lucide-react";

// Import event images
import diwaliImg from "../../../assets/calendarEvent/festival-diwali.jpg";
import yogaImg from "../../../assets/calendarEvent/yoga-meditation.jpg";
import holiImg from "../../../assets/calendarEvent/festival-holi.jpg";
import coupleImg from "../../../assets/calendarEvent/couple-union.jpg";
import ayurvedaImg from "../../../assets/calendarEvent/ayurveda-healing.jpg";
import farmImg from "../../../assets/calendarEvent/farm-agriculture.jpg";
import familyImg from "../../../assets/calendarEvent/family-camp.jpg";
import saraswatiImg from "../../../assets/calendarEvent/saraswati-education.jpg";
import ganeshImg from "../../../assets/calendarEvent/ganesh-festival.jpg";
import cowImg from "../../../assets/calendarEvent/cow-ceremony.jpg";
import nationalImg from "../../../assets/calendarEvent/national-day.jpg";
import newYearImg from "../../../assets/calendarEvent/new-year.jpg";
import sankrantiImg from "../../../assets/calendarEvent/sankranti.jpg";
import shivaImg from "../../../assets/calendarEvent/shiva-puja.jpg";
import dietImg from "../../../assets/calendarEvent/wholesome-diet.jpg";
import architectureImg from "../../../assets/calendarEvent/architecture.jpg";
import navratriImg from "../../../assets/calendarEvent//navratri.jpg";
import rakshaImg from "../../../assets/calendarEvent/raksha-bandhan.jpg";
import krishnaImg from "../../../assets/calendarEvent/krishna-janmashtami.jpg";
import guruImg from "../../../assets/calendarEvent/guru-purnima.jpg";
import BookEventForm from "../../bookEventForm/BookEventForm";

const getEventImage = (serviceName) => {
  const name = serviceName.toLowerCase();

  if (
    name.includes("दीपावली") ||
    name.includes("diwali") ||
    name.includes("लक्ष्मी") ||
    name.includes("धनोत्रयोदशी")
  )
    return diwaliImg;
  if (name.includes("योग") || name.includes("yoga") || name.includes("नादयोग"))
    return yogaImg;
  if (name.includes("होल") || name.includes("holi") || name.includes("धूलि"))
    return holiImg;
  if (
    name.includes("युग्म") ||
    name.includes("couple") ||
    name.includes("विवाह") ||
    name.includes("valentine")
  )
    return coupleImg;
  if (
    name.includes("वैद्य") ||
    name.includes("healer") ||
    name.includes("आयुर्वेद") ||
    name.includes("चिकित्स")
  )
    return ayurvedaImg;
  if (name.includes("कृषक") || name.includes("farm") || name.includes("कृषि"))
    return farmImg;
  if (
    name.includes("कुटुम्ब") ||
    name.includes("family") ||
    name.includes("बालक") ||
    name.includes("youth") ||
    name.includes("बाल दिवस")
  )
    return familyImg;
  if (
    name.includes("सरस्वती") ||
    name.includes("saraswati") ||
    name.includes("विद्या") ||
    name.includes("शिक्षक")
  )
    return saraswatiImg;
  if (
    name.includes("गणेश") ||
    name.includes("ganesh") ||
    name.includes("गणपती")
  )
    return ganeshImg;
  if (
    name.includes("गौ") ||
    name.includes("cow") ||
    name.includes("वत्स") ||
    name.includes("गोवर्धन")
  )
    return cowImg;
  if (
    name.includes("गणतंत्र") ||
    name.includes("republic") ||
    name.includes("स्वतंत्रता") ||
    name.includes("independence") ||
    name.includes("गांधी") ||
    name.includes("शिवाजी") ||
    name.includes("शहीद")
  )
    return nationalImg;
  if (
    name.includes("नवीन वर्ष") ||
    name.includes("new year") ||
    name.includes("year end") ||
    name.includes("नववर्ष")
  )
    return newYearImg;
  if (
    name.includes("संक्रांत") ||
    name.includes("sankranti") ||
    name.includes("लोहड") ||
    name.includes("lohri") ||
    name.includes("पोंगल") ||
    name.includes("बैसाखी")
  )
    return sankrantiImg;
  if (
    name.includes("शिव") ||
    name.includes("shiva") ||
    name.includes("महाशिवरात्रि")
  )
    return shivaImg;
  if (
    name.includes("आहार") ||
    name.includes("diet") ||
    name.includes("पाकशाला") ||
    name.includes("kitchen")
  )
    return dietImg;
  if (name.includes("स्थापत्य") || name.includes("architect"))
    return architectureImg;
  if (
    name.includes("नवरात्र") ||
    name.includes("navratri") ||
    name.includes("दुर्गा") ||
    name.includes("durga") ||
    name.includes("गौरी")
  )
    return navratriImg;
  if (
    name.includes("रक्षा") ||
    name.includes("raksha") ||
    name.includes("भाऊबीज") ||
    name.includes("bhau")
  )
    return rakshaImg;
  if (
    name.includes("कृष्ण") ||
    name.includes("krishna") ||
    name.includes("जन्माष्टमी") ||
    name.includes("गोपाल") ||
    name.includes("दही हंडी")
  )
    return krishnaImg;
  if (
    name.includes("गुरु") ||
    name.includes("guru") ||
    name.includes("पोर्णिमा") ||
    name.includes("purnima") ||
    name.includes("विवेकानंद") ||
    name.includes("दयानंद")
  )
    return guruImg;
  if (
    name.includes("राम") ||
    name.includes("ram") ||
    name.includes("हनुमान") ||
    name.includes("hanuman") ||
    name.includes("सीता")
  )
    return guruImg;
  if (
    name.includes("सुकृत") ||
    name.includes("skill") ||
    name.includes("worker")
  )
    return farmImg;
  if (name.includes("सेवा") || name.includes("service")) return familyImg;
  if (
    name.includes("सुगति") ||
    name.includes("tour") ||
    name.includes("wellness")
  )
    return yogaImg;
  if (
    name.includes("project") ||
    name.includes("प्रकल्प") ||
    name.includes("exhibition") ||
    name.includes("conference") ||
    name.includes("सम्मेलन")
  )
    return familyImg;
  if (
    name.includes("cancer") ||
    name.includes("aids") ||
    name.includes("health") ||
    name.includes("tobacco")
  )
    return ayurvedaImg;
  if (
    name.includes("earth") ||
    name.includes("पर्यावरण") ||
    name.includes("environment")
  )
    return farmImg;
  if (
    name.includes("तुलसी") ||
    name.includes("tulasi") ||
    name.includes("tulsi")
  )
    return yogaImg;
  if (name.includes("christmas") || name.includes("नाताळ")) return newYearImg;
  if (
    name.includes("ईद") ||
    name.includes("eid") ||
    name.includes("मुहर्रम") ||
    name.includes("इस्लामी")
  )
    return guruImg;
  if (name.includes("ओणम") || name.includes("onam")) return familyImg;
  if (name.includes("नाग") || name.includes("nag")) return shivaImg;
  if (name.includes("पितृ") || name.includes("ancestor")) return guruImg;
  if (name.includes("रथ") || name.includes("rath") || name.includes("जगन्नाथ"))
    return ganeshImg;
  if (name.includes("करवा") || name.includes("karva")) return coupleImg;
  if (name.includes("दुर्ग") || name.includes("fort")) return nationalImg;
  if (
    name.includes("banking") ||
    name.includes("detox") ||
    name.includes("आर्थिक")
  )
    return ayurvedaImg;
  if (name.includes("गर्भ") || name.includes("consecration")) return coupleImg;
  if (
    name.includes("अक्षय") ||
    name.includes("eternal") ||
    name.includes("mission")
  )
    return guruImg;
  if (
    name.includes("गीता") ||
    name.includes("gita") ||
    name.includes("मोक्ष") ||
    name.includes("दत्तात्रय")
  )
    return guruImg;
  if (
    name.includes("मध्व") ||
    name.includes("शंकराचार्य") ||
    name.includes("वाल्मीकी") ||
    name.includes("मीराबाई") ||
    name.includes("सूरदास") ||
    name.includes("कबीर") ||
    name.includes("तुलसीदास")
  )
    return guruImg;
  if (
    name.includes("मैत्र") ||
    name.includes("friend") ||
    name.includes("benevolent")
  )
    return familyImg;
  if (name.includes("विजय") || name.includes("दसरा") || name.includes("dasara"))
    return navratriImg;
  if (name.includes("कोजागिरी") || name.includes("शरद")) return diwaliImg;
  if (name.includes("अनंत") || name.includes("anant")) return ganeshImg;
  if (name.includes("सूर्य") || name.includes("sun") || name.includes("solar"))
    return sankrantiImg;
  if (name.includes("वट") || name.includes("vat")) return yogaImg;
  if (
    name.includes("बुद्ध") ||
    name.includes("buddha") ||
    name.includes("आंबेडकर")
  )
    return guruImg;
  if (
    name.includes("बेंदूर") ||
    name.includes("बैल") ||
    name.includes("bull") ||
    name.includes("पोळा")
  )
    return cowImg;
  if (
    name.includes("हिन्दी") ||
    name.includes("अभियंता") ||
    name.includes("engineer")
  )
    return nationalImg;
  if (name.includes("ऋषि") || name.includes("rishi")) return guruImg;
  return ayurvedaImg;
};

const eventsData2026 = [
  // ============= JANUARY 2026 =============
  {
    month: "January",
    date: "01/01/2026",
    serviceName: "नवीन वर्ष",
    description: "New Year celebrations",
    benefits: "Joy, wellness, community bonding",
    value: 2000,
  },
  {
    month: "January",
    date: "09/01/2026 To 12/01/2026",
    serviceName: "स्वामी विवेकानंद जयंती & राष्ट्रीय युवा दिन",
    description:
      "Celebrations of Swami Vivekananda Jayanti & National Youth Day",
    benefits: "Youth empowerment, cultural learning",
    value: 2000,
  },
  {
    month: "January",
    date: "13/01/2026",
    serviceName: "लोहडी Lohri",
    description: "Lohri festival celebration",
    benefits: "Cultural awareness, community bonding",
    value: 2000,
  },
  {
    month: "January",
    date: "14/01/2026",
    serviceName: "मकर संक्रांत Makar Sankranti",
    description: "Harvest festival celebrations",
    benefits: "Cultural learning, seasonal wellness",
    value: 2000,
  },

  {
    month: "January",
    date: "23/01/2026",
    serviceName: "वसन्त पञ्चमी सरस्वती पूजन",
    description: "Vasant Panchami & Saraswati Puja",
    benefits: "Education, cultural learning",
    value: 2000,
  },
  {
    month: "January",
    date: "25/01/2026",
    serviceName: "बालकपालक Youth Guardian Family Camp",
    description: "Family camp + Sun Bath festival",
    benefits: "Wellness, cultural awareness",
    value: 2000,
  },
  {
    month: "January",
    date: "26/01/2026",
    serviceName: "गणतंत्र दिन Republic Day",
    description: "National Republic Day celebrations",
    benefits: "Civic awareness, cultural pride",
    value: 2000,
  },
  {
    month: "January",
    date: "30/01/2026",
    serviceName: "गांधी पुण्यतिथि",
    description: "Mahatma Gandhi remembrance",
    benefits: "Cultural learning, reflection",
    value: 2000,
  },
  // ============= FEBRUARY 2026 =============
  {
    month: "February",
    date: "01/02/2026",
    serviceName: "गुरु रविदास जयंती",
    description: "Celebration of Guru Ravidas Jayanti",
    benefits: "Cultural, Spiritual",
    value: null,
  },

  {
    month: "February",
    date: "04/02/2026",
    serviceName: "Cancer Awareness Day",
    description: "Awareness and health-focused activities",
    benefits: "Educational, Wellness",
    value: 2000,
  },

  {
    month: "February",
    date: "12/02/2026",
    serviceName: "महर्षि दयानंद सरस्वती जयंती",
    description: "Commemoration of Maharshi Dayanand Saraswati",
    benefits: "Cultural",
    value: null,
  },

  {
    month: "February",
    date: "15/02/2026",
    serviceName: "महाशिवरात्रि Mahashivaratri",
    description: "Spiritual celebration of Lord Shiva",
    benefits: "Spiritual",
    value: 2000,
  },
  {
    month: "February",
    date: "19/02/2026",
    serviceName: "शिवाजी महाराज जयंती Shivaji Jayanti",
    description: "Celebration of Shivaji Maharaj Jayanti",
    benefits: "Cultural",
    value: 2000,
  },

  // ============= MARCH 2026 =============
  {
    month: "March",
    date: "03/03/2026",
    serviceName: "होलिका दहन Holika Dahan",
    description: "Celebration of Holika Dahan",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "March",
    date: "04/03/2026",
    serviceName: "स्वधूलिवन्दन Holi Festival",
    description: "Ash worship and Holi rituals",
    benefits: "Cultural, Spiritual",
    value: 2000,
  },
  {
    month: "March",
    date: "06/03/2026",
    serviceName: "छत्रपती शिवाजी महाराज जयंती",
    description: "Traditional healing commune & Shivaji Jayanti ",
    benefits: "Wellness, Cultural",
    value: 2000,
  },

  {
    month: "March",
    date: "08/03/2026",
    serviceName: "स्वरङ्गपञ्चमी Colour Festival/ International Women’s Day ",
    description: "Healing commune with festivals and awareness.",
    benefits: "Wellness, Cultural",
    value: 2000,
  },
  {
    month: "March",
    date: "19/03/2026",
    serviceName: "स्वनववर्ष गुढी पाडवा युगादी",
    description: "New Year celebrations with traditional rituals",
    benefits: "Cultural, Wellness",
    value: 2000,
  },
  {
    month: "March",
    date: "21/03/2026",
    serviceName: "गण गौर Chaitra Gauri Gangauri",
    description: "Traditional festival celebration",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "March",
    date: "26/03/2026",
    serviceName: "स्वएकवचन उत्सव : राम नवमी ",
    description: "Celebration of Ram Navami",
    benefits: "Cultural, Spiritual",
    value: 2000,
  },
  // ============= APRIL 2026 =============
  {
    month: "April",
    date: "01/04/2026",
    serviceName: "Banking Detox आर्थिक वर्ष",
    description: "Financial year start with wellness",
    benefits: "Wellness, Educational",
    value: 2000,
  },
  {
    month: "April",
    date: "02/04/2026",
    serviceName: "सामर्थ्यदिन / Hanuman Jayanti / चैत्र पोर्णिमा",
    description: "Hanuman Jayanti celebrations",
    benefits: "Cultural, Spiritual",
    value: 2000,
  },
  {
    month: "April",
    date: "14/04/2026",
    serviceName: "Solar New Year आंबेडकर जयंती बैसाखी",
    description: "Celebration of Solar New Year and Ambedkar Jayanti ",
    benefits: "Cultural, Educational",
    value: null,
  },

  {
    month: "April",
    date: "21/04/2026",
    serviceName: "शंकराचार्य सूरदास जयंती",
    description: "Commemoration of Shankaracharya and Surdas Jayanti.",
    benefits: "Cultural, Spiritual",
    value: null,
  },
  {
    month: "April",
    date: "22/04/2026",
    serviceName: "Earth Day पृथ्वी दिन",
    description: "Celebration and awareness of Earth Day",
    benefits: "Educational, Wellness",
    value: 2000,
  },
  {
    month: "April",
    date: "25/04/2026",
    serviceName: "सीता नवमी Sita Navami",
    description: "Celebration of Sita Navami",
    benefits: "Cultural, Spiritual",
    value: 2000,
  },
  // ============= MAY 2026 =============
  {
    month: "May",
    date: "01/05/2026",
    serviceName: "वैशाख बुद्ध पोर्णिमा Workers Day",
    description:
      "Observance of Buddha Poornima and International Workers’ Day ",
    benefits: "Cultural, Educational",
    value: 2000,
  },

  {
    month: "May",
    date: "03/05/2026",
    serviceName: "विश्व हास्य दिवस ",
    description: "Healing commune combined with International Humor Day.",
    benefits: "Wellness, Cultural",
    value: 2000,
  },
  {
    month: "May",
    date: "10/05/2026",
    serviceName: "मातृ दिन",
    description:
      "Physician wellness program and life knowledge sessions on Ayurveda with Mother’s Day celebration.",
    benefits: "Wellness, Educational",
    value: 2000,
  },
  {
    month: "May",
    date: "27/05/2026",
    serviceName: "बकरी ईद Eid",
    description: "Celebration of Bakri Eid",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "May",
    date: "31/05/2026",
    serviceName: "विश्व तंबाखू निषेध दिन ",
    description: "World No Tobacco Day observance.",
    benefits: "Wellness, Cultural",
    value: 2000,
  },
  // ============= JUNE 2026 =============
  {
    month: "June",
    date: "05/06/2026",
    serviceName: "विश्व पर्यावरण दिन ",
    description: "Healing commune and World Environment Day",
    benefits: "Wellness, Cultural",
    value: 2000,
  },

  {
    month: "June",
    date: "17/06/2026",
    serviceName: "महाराणा प्रताप जयंती, इस्लामी नव वर्ष अल हिज्रा ",
    description: "Commemorative celebrations.",
    benefits: "Cultural",
    value: null,
  },

  {
    month: "June",
    date: "21/06/2026",
    serviceName: "पितृ दिन / आंतरराष्ट्रीय योग दिन / मोठा दिवस",
    description: "Observance of ancestors and International Yoga Day ",
    benefits: "Wellness, Cultural",
    value: 2000,
  },
  {
    month: "June",
    date: "26/06/2026",
    serviceName: "मुहर्रम",
    description: "Religious observance",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "June",
    date: "29/06/2026",
    serviceName: "वट पोर्णिमा, कबीरदास जयंती ",
    description: "Religious and cultural celebration ",
    benefits: "Cultural",
    value: null,
  },

  // ============= JULY 2026 =============
  {
    month: "July",
    date: "16/07/2026",
    serviceName: "जगन्नाथ रथयात्रा",
    description: "Rath Yatra festival",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "July",
    date: "29/07/2026",
    serviceName: "गुरु पोर्णिमा",
    description: "Guru Purnima observance",
    benefits: "Cultural, Spiritual",
    value: null,
  },
  // ============= AUGUST 2026 =============
  {
    month: "August",
    date: "02/08/2026",
    serviceName: "मैत्रेय दिन",
    description: "Friendship/Compassion Day",
    benefits: "Cultural, Wellness",
    value: null,
  },
  {
    month: "August",
    date: "15/08/2026",
    serviceName: "स्वतंत्रता दिवस/Independence Day",
    description: "National celebration",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "August",
    date: "17/08/2026",
    serviceName: "नागपंचमी",
    description: "Religious festival",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "August",
    date: "19/08/2026",
    serviceName: "तुलसीदास जयंती",
    description: "Birth anniversary celebration",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "August",
    date: "26/08/2026",
    serviceName: "ओणम / ईद ए मिलाद ",
    description: "Religious and cultural celebration",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "August",
    date: "28/08/2026",
    serviceName: "रक्षाबंधन",
    description: "Sibling bonding festival",
    benefits: "Cultural",
    value: null,
  },
  // ============= SEPTEMBER 2026 =============
  {
    month: "September",
    date: "04/09/2026",
    serviceName: "कृष्ण जन्माष्टमी, अगस्त्य अर्ध्य",
    description: "Birth of Lord Krishna celebration",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "September",
    date: "05/09/2026",
    serviceName: "गोपाल काला दही हंडी, शिक्षक दिन",
    description: "Dahi Handi and Teacher’s Day",
    benefits: "Cultural, Educational",
    value: 2000,
  },
  {
    month: "September",
    date: "11/09/2026",
    serviceName: "बेंदूर - बैल पोळा - स्ववृषभोत्सव / BullFestival",
    description: "Traditional bull festival",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "September",
    date: "14/09/2026",
    serviceName: "हरतालिका गौरी, मंगळा, मंगळा गौर, गणेश स्थापना, हिन्दी दिवस ",
    description: "Religious and national celebrations",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "September",
    date: "15/09/2026",
    serviceName: "ऋषि पंचमी, अभियंता दिन, विश्वेश्वरैया जयंती",
    description: "Observances of Rishi Panchami and Engineers’ Day",
    benefits: "Cultural, Educational",
    value: 2000,
  },
  {
    month: "September",
    date: "17/09/2026",
    serviceName: "गौरी आवाहन, राधाष्टमी",
    description: "Religious festival",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "September",
    date: "18/09/2026",
    serviceName: "जेष्ठ गौरी पूजा",
    description: "Religious festival",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "September",
    date: "19/09/2026",
    serviceName: "जेष्ठ गौरी विसर्जन",
    description: "Festival conclusion",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "September",
    date: "20/09/2026",
    serviceName: "स्वग्राम गणेश विसर्जन",
    description: "Ganesh Visarjan",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "September",
    date: "25/09/2026",
    serviceName: "अनंत चतुर्थी गणेश विसर्जन",
    description: "Ganesh festival",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "September",
    date: "27/09/2026",
    serviceName: "पितृ पक्ष प्रारंभ Ancestor Week",
    description: "Ancestor observance",
    benefits: "Cultural",
    value: null,
  },
  // ============= OCTOBER 2026 =============
  {
    month: "October",
    date: "02/10/2026",
    serviceName: "गांधी जयंती Gandhi Jayanti",
    description: "National celebration",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "October",
    date: "10/10/2026",
    serviceName: "सर्वपितृ अमावस्या",
    description: "Ancestor observance",
    benefits: "Cultural",
    value: null,
  },
  {
    month: "October",
    date: "11/10/2026",
    serviceName:
      "नवरात्री प्रारंभ भोंडला / Navratri, घटस्थापना / Ghatsthapana, मृत्तिका पूजन / Mruttika Pujan",
    description: "Navratri festival start",
    benefits: "Cultural, Spiritual",
    value: 2000,
  },
  {
    month: "October",
    date: "16–17/10/2026",
    serviceName: "सरस्वती आवाहन & पूजा",
    description: "Worship of Goddess Saraswati",
    benefits: "Cultural, Educational",
    value: null,
  },
  {
    month: "October",
    date: "19/10/2026",
    serviceName: "दुर्गाष्टमी / महानवमी",
    description: "Navratri festival celebration",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "October",
    date: "20/10/2026",
    serviceName: "विजयादशमी / दसरा / Vijayadashami-Dasara, मध्वाचार्य जयंती",
    description: "Festival and scholar observance",
    benefits: "Cultural, Educational",
    value: 2000,
  },
  {
    month: "October",
    date: "21/10/2026",
    serviceName: "मध्वाचार्य जयंती",
    description: "Scholar observance",
    benefits: "Educational",
    value: 2000,
  },
  {
    month: "October",
    date: "25/10/2026",
    serviceName: "कोजागिरी / Kojagiri Pornima, शरद पोर्णिमा",
    description: "Full moon observance",
    benefits: "Cultural",
    value: 2000,
  },
  {
    month: "October",
    date: "26/10/2026",
    serviceName: "वाल्मीकी मीराबाई जयंती",
    description: "Saints' birth anniversaries",
    benefits: "Cultural, Spiritual",
    value: null,
  },
  {
    month: "October",
    date: "29/10/2026",
    serviceName: "करवा चौथ",
    description: "Couple fasting and rituals",
    benefits: "Cultural, Wellness",
    value: null,
  },
  // ============= NOVEMBER 2026 =============
  {
    month: "November",
    date: "04/11/2026",
    serviceName: "दुर्ग बांधणी Fort Construction",
    description: "Traditional fort construction activity at Swagrama",
    benefits: "Cultural engagement, teamwork, historical learning ",
    value: 2000,
  },
  {
    month: "November",
    date: "05/11/2026",
    serviceName: "गौवत्सद्वादशी Cow Calf Ceremony / वसू बारस VasuBaras ",
    description: "Ritual celebrating cow and calf; auspicious ceremonies ",
    benefits: "Strengthens connection with cows, cultural learning",
    value: 2000,
  },
  {
    month: "November",
    date: "06/11/2026",
    serviceName: "धनोत्रयोदशी Dhanotrayodashi",
    description: "Observance of Dhanteras / festival rituals",
    benefits: "Spiritual benefits, prosperity rituals",
    value: 2000,
  },
  {
    month: "November",
    date: "08/11/2026",
    serviceName: "Dipavali – Lakshmi Pujan नरक चतुर्दशी ",
    description: "Diwali – Lakshmi Puja and rituals ",
    benefits: "Spiritual cleansing, prosperity, wellness ",
    value: 2000,
  },

  {
    month: "November",
    date: "10/11/2026",
    serviceName: "Dipavali Padwa / Balipratipada / Govardhan Puja ",
    description: "Diwali festival rituals and Govardhan celebration ",
    benefits: "Spiritual benefits, prosperity",
    value: 2000,
  },
  {
    month: "November",
    date: "11/11/2026",
    serviceName: "भाऊबीज",
    description: "Festival of brothers and sisters",
    benefits: "Family bonding, cultural tradition",
    value: 2000,
  },

  {
    month: "November",
    date: "14/11/2026",
    serviceName: "बाल दिवस / नेहरू जयंत",
    description: "Children’s Day & Nehru Jayanti celebrations",
    benefits: "Educational, fun, cultural awareness",
    value: 2000,
  },
  {
    month: "November",
    date: "21/11/2026",
    serviceName: "तुलसी विवाह Tulasi Vivah",
    description: "Holy ceremonial marriage of Tulasi plant ",
    benefits: "Spiritual merit, cultural immersion",
    value: 2000,
  },
  {
    month: "November",
    date: "24/11/2026",
    serviceName: "गुरुनानक जयंती GuruNanak Jayanti",
    description: "Celebration of Guru Nanak’s birth anniversary ",
    benefits: "Spiritual inspiration, cultural enrichment ",
    value: 2000,
  },

  // ============= DECEMBER 2026 =============
  {
    month: "December",
    date: "01/12/2026",
    serviceName: "विश्व एड्स दिन ",
    description: "Health & spiritual observances ",
    benefits: "Awareness, wellness, spiritual merit",
    value: 2000,
  },

  {
    month: "December",
    date: "14/12/2026",
    serviceName: "विवाह पंचमी",
    description: "Wedding-related ceremony ",
    benefits: "Spiritual & cultural benefit ",
    value: 2000,
  },

  {
    month: "December",
    date: "20/12/2026",
    serviceName: "गीता जयंती / मोक्षदा एकादशी",
    description: "Health & spiritual observances ",
    benefits: "Awareness, wellness, spiritual merit ",
    value: 2000,
  },

  {
    month: "December",
    date: "23/12/2026",
    serviceName: "दत्तात्रय जयंती ",
    description: "Celebration of Dattatreya Jayanti ",
    benefits: "Spiritual growth, cultural learning ",
    value: 2000,
  },
  // {
  //   month: "December",
  //   date: "25/12/2026",
  //   serviceName: "नाताळ Christmas मेरी क्रिसमस",
  //   description: "Christmas celebrations",
  //   benefits: "Cultural awareness, joy",
  //   value: 2000,
  // },

  // {
  //   month: "December",
  //   date: "31/12/2026",
  //   serviceName: "Year End New Year Eve",
  //   description: "End of year celebrations",
  //   benefits: "Community gathering",
  //   value: 2000,
  // },
];

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
  const eventImage = getEventImage(event.serviceName);

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
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={eventImage}
            alt={event.serviceName}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0  to-transparent" />

          <div className="absolute bottom-3 left-3">
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
          <h3 className="font-display text-base py-1 font-bold text-foreground leading-tight mb-2 line-clamp-2 group-hover:text-forest transition-colors">
            {event.serviceName}
          </h3>
          <div
            className="
                flex items-center gap-2 px-3 py-2
                bg-forest/60
                backdrop-blur-md
                border border-white/50
                rounded-xl
                shadow-lg
              "
          >
            <Clock1 className="w-4 h-4 text-lime" />
            <span className="text-xs font-semibold text-cream">
              06:45am To 07:15pm
            </span>
          </div>
          <p className="text-sm text-muted-foreground my-2 line-clamp-2 flex-grow">
            {event.description}
          </p>

          <div className="flex items-start gap-2 mb-2 p-2 bg-lime/10 rounded-xl">
            <Heart className="w-4 h-4 text-earth mt-0.5 flex-shrink-0" />
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

      <main className="container mx-auto px-4 py-16 md:py-20">
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
            setSelectedEvent(null)
          }}
          eventDetails={selectedEvent}
        />
      )}
    </div>
  );
};

export default CommunityCeremony;
