// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import { motion } from "framer-motion";
// import { BookOpen, Droplets, Heart, Leaf, Sprout, Sun } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import {
//   FaArrowRight,
//   FaCalendarAlt,
//   FaCheckCircle,
//   FaLeaf,
//   FaMapMarkerAlt,
//   FaMoon,
//   FaSun,
//   FaUsers,
//   FaUtensils,
// } from "react-icons/fa";
// import { GiHerbsBundle, GiMeditation } from "react-icons/gi";
// import { MdEventAvailable } from "react-icons/md";
// import OPDBookingModal from "../../healingServices/opdClinic/OPDBookingModal";

// const eventsData = [
//   {
//     id: 1,
//     serviceName: "स्वागतदर्शन Morning Vision",
//     subtitle: "Community Morning Visits Without Meal",
//     description:
//       "स्वग्रामCommunity Morning Visits Without Meal: 09.15 AM to 11.30 AM. This is simple activity to introduce स्वग्राम Community & गाईत्वग्राम CowVillage with Wholesome Bite. This is a small introductory tour with an expert guide to explore ideas of our village. ",
//     dateRange: "Apr 22, 2025 To Nov 28, 2025",
//     time: "09:15 To 13:30",
//     price: 750,
//     schedule: [
//       {
//         time: "9:15 AM - 11:15 AM",
//         activity: "Morning Visit : प्रातःदर्शन Morning Vision",
//         icon: <FaSun />,
//       },
//       {
//         time: "9:00 AM - 9:15 AM",
//         activity: "आगमन Check In",
//         icon: <FaCheckCircle />,
//       },
//       {
//         time: "11:15 AM - 11:30 AM",
//         activity: "निर्गम Check Out",
//         icon: <FaCheckCircle />,
//       },
//     ],
//     type: "morning",
//   },
//   {
//     id: 2,
//     serviceName: "स्वागतदर्शन Evening Vision",
//     subtitle: "Sunset ritual overview (Agnihotra Demo)",
//     description:
//       "Sunset ritual overview (Agnihotra Demo) Natural landscape walk through herbal forest, sacred fire space, and healing circle Visit to Gurukul, Yoga corners, and community farms Betel Chewing (with local herbs) and Seasonal knowledge sharing.",
//     dateRange: "Apr 22, 2025 To Dec 31, 2025",
//     time: "14:15 To 17:30",
//     price: 750,
//     schedule: [
//       {
//         time: "3:15 PM - 3:30 PM",
//         activity: "आगमन CheckIn",
//         icon: <FaCheckCircle />,
//       },
//       {
//         time: "3:30 PM - 5:00 PM",
//         activity: "Evening Visit : स्वागतदर्शन Evening Vision",
//         icon: <FaMoon />,
//       },
//       {
//         time: "5:00 PM - 5:15 PM",
//         activity: "Evening Rituals : स्वसम्पन्निति Evening Rituals",
//         icon: <GiMeditation />,
//       },
//       {
//         time: "5:15 PM - 5:30 PM",
//         activity: "निर्गम CheckOut",
//         icon: <FaCheckCircle />,
//       },
//     ],
//     type: "evening",
//   },
//   {
//     id: 3,
//     serviceName: "स्वागतदर्शन पूर्णाहार Morning Vision Whole Meal",
//     subtitle: "Sunrise welcome & spiritual chanting",
//     description:
//       "Sunrise welcome & spiritual chanting Herbal tea followed by Ayurvedic breakfast (सात्म्यग्रास) Full facility tour including IPD/OPD, Vaidya consultation rooms, Panchakarma unit Herbal medicine garden exploration and seed saving demo Rituals.",
//     dateRange: "Apr 22, 2025 To Jan 1, 2026",
//     time: "06:45 To 11:30",
//     price: 1000,
//     schedule: [
//       {
//         time: "6:45 AM - 7:00 AM",
//         activity: "आगमन Check In",
//         icon: <FaCheckCircle />,
//       },
//       {
//         time: "7:00 AM - 7:45 AM",
//         activity: "Morning Rituals : स्वस्तिश्री Morning Rituals",
//         icon: <GiMeditation />,
//       },
//       {
//         time: "7:45 AM - 9:00 AM",
//         activity: "स्वागतपूर्णाहार Morning Whole Meal",
//         icon: <FaUtensils />,
//       },
//       {
//         time: "9:00 AM - 9:30 AM",
//         activity: "Post meal Do & Don'ts",
//         icon: <GiHerbsBundle />,
//       },
//     ],
//     type: "morning",
//   },
//   {
//     id: 4,
//     serviceName: "स्वागतदर्शन पूर्णाहार Evening Vision Whole Meal",
//     subtitle: "Welcome with Ayurvedic Drink Evening farming rituals",
//     description:
//       "Welcome with Ayurvedic Drink Evening farming rituals, organic harvesting  Gau Raksha : Cow milking and Panchagavya demo WholeMeal dinner experience (Wholesome Bites) Agnihotra & Betel Leaf offering Guided moonlight reflection walk Community prices interaction session.",
//     dateRange: "Apr 22, 2025 To Dec 31, 2025",
//     time: "15:15 To 19:30",
//     price: 1000,
//     schedule: [
//       {
//         time: "3:15 PM - 3:30 PM",
//         activity: "आगमन Check In",
//         icon: <FaCheckCircle />,
//       },
//       {
//         time: "3:30 PM - 5:00 PM",
//         activity: "Evening Visit : स्वागतदर्शन Evening Vision",
//         icon: <FaMoon />,
//       },
//       {
//         time: "5:00 PM - 5:15 PM",
//         activity: "Evening Rituals : स्वसम्पन्निति Evening Rituals",
//         icon: <GiMeditation />,
//       },
//       {
//         time: "5:15 PM - 6:30 PM",
//         activity: "स्वसम्पूर्णाहार Evening Whole Meal",
//         icon: <FaUtensils />,
//       },
//     ],
//     type: "evening",
//   },
// ];

// const EventCard = ({
//   event,
//   index,
//   setSelectedService,
//   setOpenAppointmentBookModal,
// }) => {
//   const cardRef = useRef(null);

//   useEffect(() => {
//     const card = cardRef.current;
//     if (!card) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.style.opacity = "1";
//             entry.target.style.transform = "translateY(0)";
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     observer.observe(card);
//     return () => observer.disconnect();
//   }, []);

//   const isMorning = event.type === "morning";

//   return (
//     <div
//       ref={cardRef}
//       className="relative group opacity-0 translate-y-8 transition-all duration-700 ease-out flex flex-col h-full"
//       style={{
//         transitionDelay: `${index * 100}ms`,
//         willChange: "transform, opacity",
//       }}
//     >
//       <div className="absolute -top-2 -left-2 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500"></div>
//       <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-500"></div>

//       <div className="relative bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
//         <div
//           className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 ${
//             isMorning
//               ? "bg-gradient-to-br from-emerald-400 via-lime-400 to-teal-400"
//               : "bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600"
//           }`}
//         ></div>

//         <div className="relative">
//           <div
//             className={`${
//               isMorning
//                 ? "bg-gradient-to-r from-emerald-600 via-lime-600 to-teal-600"
//                 : "bg-gradient-to-r from-yellow-600 to-amber-700"
//             } p-3 relative`}
//           >
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute top-0 left-0 w-16 h-16 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
//               <div className="absolute bottom-0 right-0 w-20 h-20 border-2 border-white rounded-full translate-x-1/3 translate-y-1/3"></div>
//             </div>

//             <div className="relative flex items-start justify-between gap-3">
//               <div className="flex items-start gap-2 flex-1">
//                 <div className="text-2xl text-white/90 mt-0.5">
//                   {isMorning ? <FaSun /> : <FaMoon />}
//                 </div>
//                 <div className="flex-1">
//                   <h2 className="text-sm font-bold text-white mb-0.5 leading-tight">
//                     {event.serviceName}
//                   </h2>
//                   <p className="text-white/90 text-xs">{event.subtitle}</p>
//                 </div>
//               </div>

//               <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/30 shadow-lg shrink-0">
//                 <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
//                 <div className="relative text-center">
//                   <p className="text-lg font-bold text-white leading-none">
//                     ₹{event.price}
//                   </p>
//                   <p className="text-[9px] text-white/80">per person</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-3 relative flex-1 flex flex-col">
//           <div className="grid grid-cols-2 gap-2 mb-3">
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
//               <div className="relative flex items-center gap-2 p-2 rounded-lg border border-green-200 bg-white">
//                 <div className="text-lg text-ayuMysticBlue shrink-0">
//                   <FaCalendarAlt />
//                 </div>
//                 <div className="min-w-0">
//                   <p className="text-[9px] text-gray-500 font-medium">
//                     Date Range
//                   </p>
//                   <p className="text-[11px] font-bold text-gray-800 truncate">
//                     {event.dateRange}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
//               <div className="relative flex items-center gap-2 p-2 rounded-lg border border-blue-200 bg-white">
//                 <div className="text-lg text-ayuSaffron shrink-0">
//                   <AccessTimeIcon />
//                 </div>
//                 <div className="min-w-0">
//                   <p className="text-[9px] text-gray-500 font-medium">
//                     Duration
//                   </p>
//                   <p className="text-[11px] font-bold text-gray-800 truncate">
//                     {event.time}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mb-3 p-2.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-l-4 border border-orange-400">
//             <p className="text-[11px] text-gray-700 leading-relaxed line-clamp-2">
//               {event.description}
//             </p>
//           </div>

//           <div className="mb-3 flex-1">
//             <div className="flex items-center gap-2 mb-2">
//               <MdEventAvailable className="text-base text-ayuMysticBlue" />
//               <h3 className="text-xs font-bold text-gray-800">
//                 Event Schedule
//               </h3>
//             </div>

//             <div className="relative pl-3">
//               <div
//                 className={`absolute left-0.5 top-0 bottom-0 w-0.5 ${
//                   isMorning
//                     ? "bg-gradient-to-b from-orange-400 to-amber-400"
//                     : "bg-gradient-to-b from-indigo-400 to-purple-400"
//                 }`}
//               ></div>

//               {event.schedule.map((item, idx) => (
//                 <div key={idx} className="relative mb-2 last:mb-0">
//                   <div
//                     className={`absolute -left-[14px] top-5 w-2.5 h-2.5 rounded-full ${
//                       isMorning ? "bg-orange-500" : "bg-indigo-600"
//                     } border-2 border-white shadow-sm`}
//                   ></div>

//                   <div
//                     className={`bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-all duration-300 border ${
//                       isMorning ? "border-orange-200" : "border-blue-200"
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       <div
//                         className={`text-sm shrink-0 ${
//                           isMorning ? "text-orange-600" : "text-indigo-600"
//                         }`}
//                       >
//                         {item.icon}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-[10px] font-bold text-gray-800">
//                           {item.time}
//                         </p>
//                         <p className="text-[11px] text-gray-600 truncate">
//                           {item.activity}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="mb-3 p-2.5 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-lg border border-green-200">
//             <p className="text-[9px] font-bold text-green-800 mb-1.5 flex items-center gap-1">
//               <GiHerbsBundle className="text-xs" />
//               WHAT'S INCLUDED
//             </p>
//             <div className="flex flex-wrap gap-1.5">
//               {[
//                 { icon: <FaUtensils />, text: "Food", color: "orange" },
//                 { icon: <FaMapMarkerAlt />, text: "Stay", color: "red" },
//                 { icon: <FaUsers />, text: "Training", color: "blue" },
//                 { icon: <GiHerbsBundle />, text: "Insurance", color: "green" },
//               ].map((item, idx) => (
//                 <div
//                   key={idx}
//                   className={`flex items-center gap-1 bg-white px-2 py-1 rounded-full text-[10px] font-medium text-gray-700 shadow-sm hover:shadow transition-all duration-300 border border-${item.color}-200`}
//                 >
//                   <span className={`text-${item.color}-600 text-xs`}>
//                     {item.icon}
//                   </span>
//                   {item.text}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <button
//             type="button"
//             onClick={() => {
//               setSelectedService(event);
//               setOpenAppointmentBookModal(true);
//             }}
//             className="relative w-full group/btn overflow-hidden rounded-lg mt-auto"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 transition-all duration-500"></div>
//             <div className="relative flex items-center justify-center gap-2 py-2.5 px-4 text-white font-bold text-xs">
//               <FaLeaf className="group-hover/btn:rotate-12 transition-transform duration-300" />
//               <span>Book This Experience</span>
//               <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
//             </div>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const VisionContent = () => {
//   const [openAppointmentBookModal, setOpenAppointmentBookModal] =
//     useState(false);
//   const [selectedService, setSelectedService] = useState(null);

//   return (
//     <div className=" relative overflow-hidden bg-gradient-to-b from-green-50/30 to-amber-50/30">
//       <div className="relative min-h-screen overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-amber-700 to-orange-800">
//             <motion.div
//               animate={{
//                 scale: [1, 1.05, 1],
//                 opacity: [0.8, 1, 0.8],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//               }}
//               className="absolute top-12 right-12 w-24 h-24 bg-yellow-300 rounded-full blur-lg opacity-80"
//             />
//             <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-amber-950/70 to-transparent">
//               <svg
//                 viewBox="0 0 400 160"
//                 className="w-full h-full opacity-70"
//                 preserveAspectRatio="none"
//               >
//                 <path d="M 60 120 L 90 95 L 120 120 Z" fill="#2d1810" />
//                 <rect x="65" y="120" width="50" height="40" fill="#2d1810" />

//                 <path d="M 170 110 L 210 85 L 250 110 Z" fill="#2d1810" />
//                 <rect x="180" y="110" width="60" height="50" fill="#2d1810" />

//                 <path d="M 300 125 L 330 105 L 360 125 Z" fill="#2d1810" />
//                 <rect x="305" y="125" width="50" height="35" fill="#2d1810" />

//                 <ellipse cx="50" cy="130" rx="12" ry="20" fill="#1a3d0f" />
//                 <ellipse cx="150" cy="120" rx="15" ry="24" fill="#1a3d0f" />
//                 <ellipse cx="270" cy="125" rx="14" ry="22" fill="#1a3d0f" />
//                 <ellipse cx="380" cy="135" rx="18" ry="26" fill="#1a3d0f" />
//               </svg>
//             </div>
//           </div>
//           <div className="absolute inset-0 bg-black/30" />
//         </div>
//         <div className="absolute inset-0 opacity-5">
//           <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <pattern
//                 id="pattern"
//                 x="0"
//                 y="0"
//                 width="80"
//                 height="80"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <circle cx="40" cy="40" r="2" fill="#d97706" />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#pattern)" />
//           </svg>
//         </div>
//         {[...Array(4)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute text-amber-400/20 z-10"
//             initial={{ x: Math.random() * 100 + "%", y: -50 }}
//             animate={{ y: "110vh", rotate: 360 }}
//             transition={{
//               duration: 20 + i * 5,
//               repeat: Infinity,
//               delay: i * 3,
//               ease: "linear",
//             }}
//           >
//             <Leaf size={20} />
//           </motion.div>
//         ))}
//         <div className="relative z-20 min-h-screen flex items-center justify-center px-6 py-12">
//           <div className="max-w-4xl w-full">
//             <motion.div
//               className="space-y-8"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <motion.div
//                 className="text-center space-y-4"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
//                   स्वग्रामदर्शन
//                 </h1>
//                 <h2 className="text-3xl lg:text-4xl font-semibold text-amber-200 italic">
//                   Community Vision
//                 </h2>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//                 className="bg-white/90 backdrop-blur-md rounded-2xl p-8 border-2 border-amber-300/50 shadow-2xl"
//               >
//                 <p className="text-xs lg:text-sm text-amber-900 leading-relaxed text-center">
//                   स्वग्रामदर्शन is a holistic journey through the essence of
//                   community living in harmony with nature. Visitors are welcomed
//                   into a world where knowledge, culture, sustainability, and
//                   spirituality converge. Each element of the community embodies
//                   a conscious lifestyle rooted in natural regulation
//                   <span className="font-semibold">
//                     &nbsp;(नैसर्गनियमन)&nbsp;
//                   </span>
//                   and traditional wisdom.
//                 </p>
//               </motion.div>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6 }}
//                 className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
//               >
//                 {[
//                   { icon: BookOpen, label: "Learning" },
//                   { icon: Heart, label: "Wellness" },
//                   { icon: Sprout, label: "Agriculture" },
//                   { icon: Droplets, label: "Resources" },
//                   { icon: Sun, label: "Spiritual" },
//                   { icon: Leaf, label: "Natural" },
//                 ].map((item, i) => (
//                   <motion.div
//                     key={i}
//                     whileHover={{ scale: 1.05, y: -5 }}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.7 + i * 0.1 }}
//                     className="flex flex-col items-center gap-3 p-6 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-amber-300 hover:border-amber-500 hover:bg-white/90 transition-all cursor-pointer shadow-lg"
//                   >
//                     <item.icon className="w-8 h-8 text-amber-700" />
//                     <span className="text-sm font-semibold text-amber-900">
//                       {item.label}
//                     </span>
//                   </motion.div>
//                 ))}
//               </motion.div>
//               <div className="relative">
//                 <div className="absolute -top-40 -left-4 w-12 h-12 border-l-4 border-t-4 border-amber-400 rounded-tl-xl opacity-60" />
//                 <div className="absolute bottom-5 -right-4 w-12 h-12 border-r-4 border-b-4 border-amber-400 rounded-br-xl opacity-60" />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//       {/* <div className="relative z-10 pt-6 pb-4">
//         <div className="flex items-center justify-center gap-2">
//           <Spa className="text-amber-700 animate-pulse" sx={{ fontSize: 30 }} />
//           <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-rose-700 bg-clip-text text-transparent">
//             Vision
//           </h1>
//           <Spa className="text-amber-700 animate-pulse" sx={{ fontSize: 30 }} />
//         </div>
//       </div> */}

//       {/* Events Grid */}
//       <div className="relative z-10  px-4 pb-8 pt-5">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 md:gap-6">
//           {eventsData.map((event, index) => (
//             <EventCard
//               key={event.id}
//               event={event}
//               index={index}
//               setSelectedService={setSelectedService}
//               setOpenAppointmentBookModal={setOpenAppointmentBookModal}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Booking Modal */}
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
// };

// export default VisionContent;

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import BuildIcon from "@mui/icons-material/Build";
import GroupsIcon from "@mui/icons-material/Groups";
import HealingIcon from "@mui/icons-material/Healing";
import HomeIcon from "@mui/icons-material/Home";
import NatureIcon from "@mui/icons-material/Nature";
import PetsIcon from "@mui/icons-material/Pets";
import PublicIcon from "@mui/icons-material/Public";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SchoolIcon from "@mui/icons-material/School";
import SpaIcon from "@mui/icons-material/Spa";
import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useState } from "react";
import DailyBarterImg from "../../../assets/healingServices/vision/DailyBarter.jpg";
import eveningMealImg from "../../../assets/healingServices/vision/eveningMeal.png";
import EveningVisionMealImg from "../../../assets/healingServices/vision/EveningVisionMeal.png";
import MorningMealImg from "../../../assets/healingServices/vision/morningMeal.png";
import PatientCampImg from "../../../assets/healingServices/vision/PatientCamp.png";
import weaklyBarterImg from "../../../assets/healingServices/vision/weaklyBarter.png";
import BookEventForm from "../../bookEventForm/BookEventForm";

const walkInServices = [
  {
    nameHindi: "प्रातःपूर्णाहार",
    serviceName: "Morning Whole Meal",
    checkIn: "06:45",
    checkOut: "09:15",
    description:
      "Morning wholesome meal provided at Swagrama.",
    benefits: "Nutritious start to the day, energizes body and mind.",
    price: "₹500",
    image: MorningMealImg,
    icon: RestaurantIcon,
  },
  {
    nameHindi: "सायम्पूर्णाहार",
    serviceName: "Evening Whole Meal",
    checkIn: "16:00",
    checkOut: "18:00",
    description:
      "Evening wholesome meal provided at Swagrama.",
    benefits:
      "Balanced nutrition to relax and rejuvenate after day's activities.",
    price: "₹500",
    image: eveningMealImg,
    icon: RestaurantIcon,
  },
  {
    nameHindi: "दैनिक विनिमय",
    serviceName: "Daily Barter",
    checkIn: "10:00",
    checkOut: "05:00",
    description: "Daily barter or Buy / Sale / exchange program for guests.",
    benefits: "Encourages participation, sharing, and community bonding.",
    price: "Free",
    image: DailyBarterImg,
    icon: SwapHorizIcon,
  },
  {
    nameHindi: "साप्ताहिक विनिमय",
    serviceName: "Weekly Barter",
    checkIn: "10:00",
    checkOut: "05:00",
    description: "Weekly barter or Buy / Sale / exchange program for guests.",
    benefits: "Encourages participation, sharing, and community bonding.",
    price: "Free",
    image: weaklyBarterImg,
    icon: SwapHorizIcon,
  },
  {
    nameHindi: "रुग्णशिबिर",
    serviceName: "Patient Camp",
    checkIn: "10:00",
    checkOut: "05:00",
    description: "Patient camp for wellness checkups and consultations.",
    benefits: "Health evaluation, awareness, and early intervention.",
    price: "Free",
    image: PatientCampImg,
    icon: LocalHospitalIcon,
  },
];

const journeyItems = [
  {
    icon: SchoolIcon,
    title: "स्वगुरुकुल",
    description:
      "Experience a traditional environment of learning where knowledge of life, nature, and wellness is imparted through practice, observation, and mentorship. Here, education goes beyond academics to include yogic sciences, Ayurveda, and natural living skills.",
  },
  {
    icon: PetsIcon,
    title: "स्वगौशाला ",
    description:
      "A sacred space where the cow is revered not only as a source of nourishment but as a symbol of sustainable agriculture, health, and harmony. Visitors can participate in daily care, feeding, and understanding Panchagavya practices, connecting deeply with vital ecological cycles.",
  },
  {
    icon: HealingIcon,
    title: "स्वचिकित्सालय",
    description:
      "Guided exposure to preventive, curative, and rejuvenative therapies rooted in Ayurveda and natural medicine. The center emphasizes holistic wellness for body, mind, and spirit, aligned with the rhythms of nature.",
  },
  {
    icon: RestaurantIcon,
    title: "स्वसंस्कारपाकशाला",
    description:
      "Learn the art of preparing seasonal, wholesome, and sattvic meals. This facility integrates culinary practice with cultural rituals, emphasizing the medicinal and spiritual aspects of food.",
  },
  {
    icon: BuildIcon,
    title: "स्वनिर्माणप्रक्रिया",
    description:
      "Explore sustainable building techniques, organic materials, and handcrafted innovations. This space encourages hands-on creation, blending traditional craftsmanship with ecological responsibility.",
  },
  {
    icon: WaterDropIcon,
    title: "स्वसुपीवनकुप",
    description:
      "Witness and participate in rainwater harvesting, solar energy applications, and natural irrigation. The systems reflect eco-conscious design and offer a practical understanding of living in harmony with resources.",
  },
  {
    icon: AgricultureIcon,
    title: "स्वबीजलिंगपिंडकृषि",
    description:
      "Engage with seed-to-harvest practices, soil health, and biodiversity preservation. Visitors gain insight into eco-friendly farming and regenerative agriculture that supports community nutrition and environmental sustainability.",
  },
  {
    icon: HomeIcon,
    title: "स्वातुरालय",
    description:
      "Experience living in harmony with sunlight, wind, rain, and seasonal changes. The habitations are designed to promote mindful presence, quietude, and a direct connection with the environment.",
  },
  {
    icon: SpaIcon,
    title: "नैसर्गचिकित्सा",
    description:
      "Explore forest bathing, seasonal rejuvenation, and natural mindfulness practices that restore physical and mental health, emphasizing a holistic approach to daily well-being.",
  },
  {
    icon: TempleBuddhistIcon,
    title: "स्वत्रिदेवायतन",
    description:
      "Engage with rituals, meditation spaces, and sacred groves that nurture inner reflection, spiritual growth, and community cohesion.",
  },
];

const visitorServices = [
  {
    nameHindi: "स्वप्रातःदर्शन",
    serviceName: "Morning Swagrama",
    checkIn: "08:45",
    checkOut: "11:15",
    description:
      "Morning Swagrama informative visit / guided session with Herbal Gud Tea.",
    mealNote: "(without meal)",
    benefits:
      "Provides knowledge about therapies, Panchakarma, wellness practices, and site orientation.",
    price: "₹750",
    icon: <SpaIcon />,
    image:
      "https://img.freepik.com/free-photo/wellness-practices-self-care-world-health-day_23-2151256685.jpg?t=st=1769149322~exp=1769152922~hmac=0cce31d209f17fb2fdd57aed32936c728bdf2cad8b7606511695f4cab15b97d6&w=1480",
  },
  {
    nameHindi: "स्वसायम्दर्शन",
    serviceName: "Evening Swagrama",
    checkIn: "14:45",
    checkOut: "17:15",
    description:
      "Evening Swagrama informative visit / guided session with Herbal Gud Tea.",
    mealNote: "(without meal)",
    benefits:
      "Offers overview of holistic treatments, Q&A, and insight into wellness practices.",
    price: "₹750",
    image:
      "https://img.freepik.com/free-photo/full-shot-woman-posing-sunset_23-2150343144.jpg?t=st=1769149415~exp=1769153015~hmac=07de8e0bad60137401eab4748ba4b7b82e029c43d5fa8957b48cf7803e83c1fd&w=1480",
    icon: <SpaIcon />,
  },
  {
    nameHindi: "स्वप्रातःदर्शनपूर्णाहार",
    serviceName: "Morning Vision Whole Meal",
    checkIn: "06:45",
    checkOut: "11:15",
    description:
      "Morning informative visit with Herbal Gud Tea & wholesome meal.",
    mealNote: "",
    benefits:
      "Combines experiential learning with nutritious meal for holistic experience.",
    price: "₹1000",
    image:
      "https://i.herbalreality.com/wp-content/uploads/2021/10/04133553/Seasonal-eating-and-fasting-with-Ayurveda.jpg",
    icon: <RestaurantIcon />,
  },
  {
    nameHindi: "स्वसायम्दर्शनपूर्णाहार",
    serviceName: "Evening Vision Whole Meal",
    checkIn: "14:45",
    checkOut: "19:15",
    description:
      "Evening informative visit with Herbal Gud Tea & wholesome meal.",
    mealNote: "",
    benefits:
      "Knowledge sharing + nourishing meal for comprehensive understanding.",
    price: "₹1000",
    image: EveningVisionMealImg,
    icon: <RestaurantIcon />,
  },
];

const OurVision = () => {
  const [openEventBookModal, setOpenEventBookModal] = useState(false);
  const [selectedEventDeatils, setSelectedEventDetails] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div>
      <div className="md:min-h-screen 2xl:h-auto bg-gradient-to-br from-[#1a3a25] via-[#2d5a3d] to-[#3d6b4f] relative flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #8bc34a 1px, transparent 1px),
                          radial-gradient(circle at 80% 20%, #c8e6c9 1px, transparent 1px),
                          radial-gradient(circle at 40% 80%, #8bc34a 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-4 sm:py-6 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1
              className="font-playfair text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#f7f5f0] text-center mb-4 sm:mb-6 md:mb-8"
              style={{ textShadow: "2px 4px 8px rgba(0,0,0,0.3)" }}
            >
              स्वग्रामदर्शन <br /> Community Vision
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#f7f5f0]/90 text-center max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-12 px-4">
              <strong className="text-[#8bc34a]">स्वग्रामदर्शन </strong> is a
              holistic journey through the essence of community living in
              harmony with nature. Visitors are welcomed into a world where
              knowledge, culture, sustainability, and spirituality converge.
              Each element of the community embodies a conscious lifestyle
              rooted in natural regulation (ऋत) and traditional wisdom.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center px-4"
          >
            <button
              className="bg-gradient-to-br from-[#8bc34a] to-[#689f38] hover:from-[#9ccc65] hover:to-[#7cb342] text-[#1a3a25] font-bold rounded-full text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-4 w-full sm:w-auto max-w-sm hover:-translate-y-1 transition-all duration-300"
              style={{ boxShadow: "0 8px 32px rgba(139, 195, 74, 0.4)" }}
            >
              Begin Your Journey
            </button>
          </motion.div>
        </div>
      </div>

      <div className="py-6 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-b from-[#e8f5e9] to-[#c8e6c9]">
        <div className="max-w-screen-xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl  font-bold text-[#1a3a25] text-center mb-3 sm:mb-4">
              The Journey Includes
            </h2>
            <div className="w-40 sm:w-48 md:w-56 h-1 bg-gradient-to-r from-[#8bc34a] to-[#689f38] mx-auto mb-6 sm:mb-8 md:mb-12 rounded-full" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {journeyItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="h-full"
                >
                  <div
                    className="h-full bg-gradient-to-br from-white to-[#f7f5f0] rounded-2xl sm:rounded-3xl overflow-hidden relative transition-all duration-400 hover:shadow-2xl border border-[#8bc34a]/20 hover:border-[#8bc34a]/40 flex flex-col"
                    style={{ boxShadow: "0 10px 40px rgba(26, 58, 37, 0.1)" }}
                  >
                    <div className="h-1.5 bg-gradient-to-r from-[#8bc34a] via-[#689f38] to-[#5d4037]" />
                    <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#2d5a3d] to-[#1a3a25] flex items-center justify-center flex-shrink-0"
                          style={{
                            boxShadow: "0 8px 24px rgba(26, 58, 37, 0.3)",
                          }}
                        >
                          <item.icon className="text-2xl sm:text-3xl md:text-4xl text-[#8bc34a]" />
                        </div>
                        <p className="text-[#1a3a25] font-semibold text-sm sm:text-base md:text-lg line-clamp-2">
                          {item.title}
                        </p>
                      </div>

                      <p className="text-[#5d4037] leading-relaxed text-xs sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#2d5a3d] to-[#1a3a25] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%238bc34a' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#f7f5f0]/95 text-sm sm:text-base md:text-lg lg:text-xl text-center leading-relaxed sm:leading-loose max-w-5xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4">
              This comprehensive vision of
              <strong className="text-[#8bc34a]"> स्वग्राम</strong> allows
              visitors to&nbsp;
              <strong className="text-[#8bc34a]">
                immerse fully in the philosophy of One Universe, One Earth, One
                Community
              </strong>
              . Each step is a learning and healing experience — teaching&nbsp;
              <strong className="text-[#8bc34a]">
                responsibility, sustainability, compassion, and mindfulness
              </strong>
              — ultimately guiding participants to&nbsp;
              <strong className="text-[#8bc34a]">
                live in harmony with nature, themselves, and the community
              </strong>
              .
            </p>
          </motion.div>

          <div className="flex justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 flex-wrap mb-8 sm:mb-12 md:mb-16">
            {[
              { icon: PublicIcon, text: "One Universe" },
              { icon: NatureIcon, text: "One Earth" },
              { icon: GroupsIcon, text: "One Community" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20  rounded-full bg-gradient-to-br from-[#8bc34a] to-[#689f38] flex items-center justify-center"
                    style={{ boxShadow: "0 0 30px rgba(139, 195, 74, 0.4)" }}
                  >
                    <item.icon className="text-3xl sm:text-4xl md:text-5xl text-[#1a3a25]" />
                  </div>
                  <p className="text-[#f7f5f0] font-playfair text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <button
              className="bg-gradient-to-br from-[#8bc34a] to-[#689f38] hover:from-[#9ccc65] hover:to-[#7cb342] text-[#1a3a25] font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-4 rounded-full hover:-translate-y-1 transition-all duration-300"
              style={{ boxShadow: "0 8px 32px rgba(139, 195, 74, 0.4)" }}
            >
              Join Our Community
            </button>
          </motion.div>
        </div>
      </div>

      <div className="py-6 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-b from-[#e8f5e9] to-[#c8e6c9]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="pb-6 sm:pb-8 md:pb-12">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-6 sm:mb-8 md:mb-10"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl  text-[#1a3a25] font-semibold mb-3 sm:mb-4">
                Visitor Services
              </h3>
              <div className="w-48 sm:w-56 md:w-60 h-1 bg-gradient-to-r from-[#8bc34a] to-[#689f38] mx-auto mb-3 sm:mb-4 rounded-full" />
              <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
                Experience holistic wellness through our curated programs
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
            >
              {visitorServices.map((service, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group"
                >
                  <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-green-100">
                    <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.serviceName}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      <div className="absolute top-2 right-2 bg-lime-50/60 backdrop-blur-md p-1.5 sm:p-2 rounded-full shadow-lg">
                        <div className="text-green-600 text-lg sm:text-xl">
                          {service.icon}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 sm:p-4">
                      <div className="mb-2 sm:mb-3">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                          {service.serviceName}
                        </h3>
                        <p className="text-xs sm:text-sm text-green-600 font-medium truncate">
                          {service.nameHindi}
                        </p>
                      </div>

                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                        {service.description}
                        {service.mealNote && (
                          <span className="text-amber-600 font-medium">
                            {service.mealNote}
                          </span>
                        )}
                      </p>

                      <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 bg-lime-100 rounded-lg p-1.5 sm:p-2">
                          <AccessTimeIcon className="text-green-600 text-sm sm:text-base" />
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                              Check-In
                            </p>
                            <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                              {service.checkIn}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 bg-green-100 rounded-lg p-1.5 sm:p-2">
                          <AccessTimeIcon className="text-lime-600 text-sm sm:text-base" />
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                              Check-Out
                            </p>
                            <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                              {service.checkOut}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 sm:mb-5">
                        <div className="flex items-start gap-1.5 sm:gap-2">
                          <div className="bg-gradient-to-br from-lime-100 to-green-100 p-1 sm:p-1.5 rounded-lg mt-0.5 flex-shrink-0">
                            <SpaIcon className="text-green-600 text-xs sm:text-sm" />
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                            {service.benefits}
                          </p>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedEventDetails(service);
                          setOpenEventBookModal(true);
                        }}
                        className="w-full bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white font-semibold py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group text-xs sm:text-sm md:text-base"
                      >
                        <span>Book Now</span>
                        <ArrowForwardIcon className="text-sm sm:text-base group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-6 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-b from-[#e8f5e9] to-[#c8e6c9]">
        <div className="w-full mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="py-6 sm:py-8 md:py-10">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <div className="text-center mb-6 sm:mb-8 md:mb-10">
                  <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-xl sm:text-2xl md:text-3xl  font-bold text-green-900 mb-3 sm:mb-4"
                  >
                    Walk-In Services
                  </motion.h1>
                  <div className="w-52 sm:w-60 md:w-64 h-1 bg-gradient-to-r from-[#8bc34a] to-[#5d4037] mx-auto mb-2 sm:mb-3 rounded-full" />
                  <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xs sm:text-sm text-green-700"
                  >
                    Discover our premium wellness and community services
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {walkInServices.map((service, index) => {
                    const IconComponent = service.icon;
                    return (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group"
                      >
                        <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-lime-200 hover:border-lime-400 h-full flex flex-col">
                          <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent z-10" />
                            <img
                              src={service.image}
                              alt={service.serviceName}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-2 right-2 z-20">
                              <div className="bg-green-100/60 backdrop-blur-md p-1.5 sm:p-2 rounded-full shadow-lg">
                                <IconComponent className="text-green-600 text-xl sm:text-2xl" />
                              </div>
                            </div>
                          </div>

                          <div className="p-3 sm:p-4 flex-1 flex flex-col">
                            <div className="mb-2 sm:mb-3">
                              <h3 className="text-base sm:text-lg md:text-xl font-bold text-green-900 mb-1 line-clamp-1">
                                {service.serviceName}
                              </h3>
                                <p className="text-xs sm:text-sm text-green-700 font-medium truncate">
                                  {service.nameHindi}
                                </p>
                            </div>

                            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                              {service.description}
                            </p>

                            <div className="flex mb-3 sm:mb-4 gap-2 sm:gap-3 w-full">
                              <div className="flex items-center gap-1 sm:gap-1.5 bg-lime-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg w-full">
                                <AccessTimeIcon className="text-lime-600 text-xs sm:text-sm flex-shrink-0" />
                                <span className="text-[10px] sm:text-xs font-semibold text-green-800 truncate">
                                  In: {service.checkIn}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 sm:gap-1.5 bg-green-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg w-full">
                                <AccessTimeIcon className="text-green-600 text-xs sm:text-sm flex-shrink-0" />
                                <span className="text-[10px] sm:text-xs font-semibold text-green-800 truncate">
                                  Out: {service.checkOut}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-start gap-1.5 sm:gap-2 mb-3 sm:mb-4 bg-gradient-to-r from-lime-50 to-green-50 p-2 sm:p-3 rounded-lg">
                              <VolunteerActivismIcon className="text-lime-600 text-base sm:text-lg mt-0.5 flex-shrink-0" />
                              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-2">
                                {service.benefits}
                              </p>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setOpenEventBookModal(true);
                                setSelectedEventDetails(service);
                              }}
                              className={`${
                                service.price === "Free"
                                  ? "bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600"
                                  : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                              } text-white font-semibold py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl w-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 mt-auto text-xs sm:text-sm md:text-base`}
                            >
                              {service.price === "Free"
                                ? "Join Now"
                                : "Book Now"}
                              <ArrowForwardIcon className="text-base sm:text-lg" />
                            </motion.button>
                          </div>

                          <div className="h-1 bg-gradient-to-r from-lime-400 via-green-500 to-emerald-500" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {openEventBookModal && (
        <BookEventForm
          open={openEventBookModal}
          handleClose={() => {
            setSelectedEventDetails(null);
            setOpenEventBookModal(false);
          }}
          eventDetails={selectedEventDeatils}
        />
      )}
    </div>
  );
};

export default OurVision;
