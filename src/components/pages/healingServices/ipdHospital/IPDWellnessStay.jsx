// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useForm } from "react-hook-form";
// import {
//   CalendarMonth,
//   PeopleAlt,
//   ArrowBackIos,
//   ArrowForwardIos,
//   Remove,
//   Add,
//   KeyboardArrowDown,
//   Bed as BedIcon,
// } from "@mui/icons-material";
// import {
//   Popover,
//   MenuItem,
//   Select,
//   FormControl,
//   TextField,
//   Switch,
// } from "@mui/material";
// import {
//   format,
//   addMonths,
//   subMonths,
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   endOfWeek,
//   isSameMonth,
//   isSameDay,
//   addDays,
//   isWithinInterval,
//   isBefore,
// } from "date-fns";
// import InputField from "../../../common/formFields/InputField";
// import DropdownField from "../../../common/formFields/DropdownField";
// import CommonButton from "../../../common/button/CommonButton";
// import ipdDoubleImg from "../../../assets/healingServices/ipd/ipdDouble.jpg";
// import OutdoorLeavingImg from "../../../assets/healingServices/ipd/OutdoorLeaving.jpg";
// import SingleStayImg from "../../../assets/healingServices/ipd/Single Stay.png";

// const IPDWellnessStay = () => {
//   const wellnessServices = [
//     {
//       serviceName: "Outdoor Living",
//       hindiName: "स्वबहिस्वसतिचर्या",
//       person: "Single Person",
//       checkIn: "11:15 AM",
//       checkOut: "02:15 PM",
//       description:
//         "Outdoor stay in natural surroundings at Swagrama with Herbal Gud Tea & 2 wholesome meals.",
//       benefits:
//         "Immersion in nature, relaxation, fresh air, mental rejuvenation.",
//       price: 3000,
//       rooms: [],
//       image: OutdoorLeavingImg,
//       badge: "Nature Retreat",
//       subTitle: "Embrace the Nature",
//     },
//     {
//       serviceName: "Single Stay",
//       hindiName: "स्वएकनिवास",
//       person: "Single Person",
//       checkIn: "11:15 AM",
//       checkOut: "02:15 PM",
//       description:
//         "Single occupancy room with Herbal Gud Tea & 2 wholesome meals.",
//       benefits: "Private peaceful stay with modern comforts.",
//       price: 3750,
//       rooms: [
//         "स्वअमृतकक्ष | Eternity Room",
//         "स्वनित्यकक्ष | Eternal Room",
//         "स्वशाश्वतकक्ष | Perpetual Room",
//         "स्वनैष्ठिककक्ष | Firmness Room",
//         "स्वअनन्तकक्ष | Infinite Room",
//       ],
//       image: SingleStayImg,
//       badge: "Premium Choice",
//       subTitle: "Personal Sanctuary",
//     },
//     {
//       serviceName: "Double Stay",
//       hindiName: "स्वद्वयनिवास",
//       person: "Two Persons",
//       checkIn: "11:15 AM",
//       checkOut: "02:15 PM",
//       description:
//         "Double occupancy room with Herbal Gud Tea & 2 wholesome meals.",
//       benefits: "Shared stay with comfort, suitable for couples or companions.",
//       price: 6000,
//       rooms: [
//         "स्वअमृतकक्ष | Eternity Room",
//         "स्वनित्यकक्ष | Eternal Room",
//         "स्वशाश्वतकक्ष | Perpetual Room",
//         "स्वनैष्ठिककक्ष | Firmness Room",
//         "स्वअनन्तकक्ष | Infinite Room",
//       ],
//       image: ipdDoubleImg,
//       badge: "Couple's Choice",
//       subTitle: "Shared Serenity",
//     },
//     {
//       serviceName: "Well House Single",
//       hindiName: "स्वस्थकूपगृहएक",
//       person: "Single Person",
//       checkIn: "11:15 AM",
//       checkOut: "02:15 PM",
//       description:
//         "Well House Single occupancy with Herbal Gud Tea & 2 wholesome meals.",
//       benefits:
//         "Full wellness experience with facilities for relaxation and care.",
//       price: 4250,
//       rooms: [],
//       image: SingleStayImg,
//       badge: "Luxury Wellness",
//       subTitle: "Elite Rejuvenation",
//     },
//     {
//       serviceName: "Well House Double",
//       hindiName: "स्वस्थकूपगृहद्वय",
//       person: "Two Persons",
//       checkIn: "11:15 AM",
//       checkOut: "02:15 PM",
//       description:
//         "Well House Double occupancy with Herbal Gud Tea & 2 wholesome meals.",
//       benefits: "Shared wellness experience for friends or family.",
//       price: 7000,
//       rooms: [],
//       image: ipdDoubleImg,
//       badge: "Elite Experience",
//       subTitle: "Grand Rejuvenation",
//     },
//   ];

//   const [selectedService, setSelectedService] = useState(null);

//   const { control, watch, setValue } = useForm({
//     defaultValues: {
//       fullName: "",
//       email: "",
//       mobile: "",
//       city: "",
//       bringingPet: false,
//       twinSharing: true,
//       mealPreference: {
//         label: "Organic Full Board (Included)",
//         value: "Organic Full Board (Included)",
//       },
//     },
//   });

//   const formValues = watch();

//   const calculateTotal = () => {
//     if (!selectedService) return { stay: 0, wellness: 0, taxes: 0, total: 0 };
//     const base = selectedService.price;
//     const wellness = 10000;
//     const taxes = (base + wellness) * 0.18;
//     return {
//       stay: base,
//       wellness: wellness,
//       taxes: taxes,
//       total: base + wellness + taxes,
//     };
//   };

//   const costs = calculateTotal();

//   const [checkIn, setCheckIn] = useState(null);
//   const [checkOut, setCheckOut] = useState(null);
//   const [guests, setGuests] = useState({
//     rooms: 1,
//     adults: 2,
//     children: 0,
//     childrenAges: [],
//   });
//   const [guestsConfirmed, setGuestsConfirmed] = useState(false);
//   const [activeTab, setActiveTab] = useState("calendar");
//   const [flexibleDuration, setFlexibleDuration] = useState("1 week");
//   const [selectedFlexibleMonth, setSelectedFlexibleMonth] = useState(null);

//   const carouselRef = useRef(null);
//   const scrollCarousel = (direction) => {
//     if (carouselRef.current) {
//       const scrollAmount = direction === "next" ? 200 : -200;
//       carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   const [calendarAnchorEl, setCalendarAnchorEl] = useState(null);
//   const [guestsAnchorEl, setGuestsAnchorEl] = useState(null);
//   const [calendarViewDate, setCalendarViewDate] = useState(new Date());
//   const [hoveredDate, setHoveredDate] = useState(null);

//   const guestInputRef = useRef(null);

//   const handleDateClick = (date) => {
//     if (!checkIn || (checkIn && checkOut)) {
//       setCheckIn(date);
//       setCheckOut(null);
//     } else if (checkIn && !checkOut) {
//       if (isBefore(date, checkIn)) {
//         setCheckIn(date);
//         setCheckOut(null);
//       } else {
//         setCheckOut(date);
//         setCalendarAnchorEl(null);
//         setHoveredDate(null);
//         setTimeout(() => {
//           if (guestInputRef.current) {
//             setGuestsAnchorEl(guestInputRef.current);
//           }
//         }, 300);
//       }
//     }
//   };

//   const isDateSelected = (date) =>
//     (checkIn && isSameDay(date, checkIn)) ||
//     (checkOut && isSameDay(date, checkOut));

//   const isDateInRange = (date) => {
//     if (checkIn && checkOut) {
//       return isWithinInterval(date, { start: checkIn, end: checkOut });
//     }
//     if (checkIn && hoveredDate && !checkOut) {
//       if (isBefore(hoveredDate, checkIn)) return false;
//       return isWithinInterval(date, { start: checkIn, end: hoveredDate });
//     }
//     return false;
//   };

//   const renderCalendar = (monthDate) => {
//     const monthStart = startOfMonth(monthDate);
//     const monthEnd = endOfMonth(monthStart);
//     const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
//     const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

//     const rows = [];
//     let days = [];
//     let day = startDate;

//     while (day <= endDate) {
//       for (let i = 0; i < 7; i++) {
//         const currentDay = day;
//         const isCurrentMonth = isSameMonth(currentDay, monthStart);
//         const selected = isDateSelected(currentDay);
//         const inRange = isDateInRange(currentDay);
//         const isStart = checkIn && isSameDay(currentDay, checkIn);
//         const isEnd = checkOut && isSameDay(currentDay, checkOut);

//         days.push(
//           <div
//             key={currentDay.toString()}
//             onMouseEnter={() => isCurrentMonth && setHoveredDate(currentDay)}
//             onMouseLeave={() => setHoveredDate(null)}
//             onClick={() => isCurrentMonth && handleDateClick(currentDay)}
//             className={`relative flex items-center justify-center h-8 w-8 md:h-9 md:w-9 cursor-pointer text-[13px] font-medium transition-all
//               ${!isCurrentMonth ? "text-transparent pointer-events-none" : "text-gray-700"}
//               ${inRange && isCurrentMonth ? "bg-amber-50" : ""}
//               ${isStart && isCurrentMonth ? "rounded-l-full" : ""}
//               ${isEnd && isCurrentMonth ? "rounded-r-full" : ""}
//               ${checkIn && !checkOut && isSameDay(currentDay, hoveredDate) && isCurrentMonth ? "rounded-r-full" : ""}
//             `}
//           >
//             {inRange && isCurrentMonth && (
//               <div className="absolute inset-0 bg-amber-50 z-0"></div>
//             )}
//             <div
//               className={`relative z-10 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full transition-all
//               ${selected && isCurrentMonth ? "bg-amber-600 text-white shadow-sm scale-110" : "hover:bg-gray-100"}
//             `}
//             >
//               {format(currentDay, "d")}
//             </div>
//           </div>,
//         );
//         day = addDays(day, 1);
//       }
//       rows.push(
//         <div className="flex" key={day.toString()}>
//           {days}
//         </div>,
//       );
//       days = [];
//     }

//     return (
//       <div className="w-full">
//         <div className="text-center font-bold text-gray-800 mb-2 text-sm">
//           {format(monthDate, "MMMM yyyy")}
//         </div>
//         <div className="flex mb-1">
//           {["M", "T", "W", "T", "F", "S", "S"].map((d, index) => (
//             <div
//               key={index}
//               className="w-8 md:w-9 text-[9px] font-bold text-gray-400 text-center uppercase"
//             >
//               {d}
//             </div>
//           ))}
//         </div>
//         <div className="space-y-px">{rows}</div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#FFFBF5] p-4 md:p-6 font-sans selection:bg-amber-100 selection:text-amber-900">
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full mx-auto space-y-6"
//       >
//         <div className="space-y-1">
//           <motion.h1
//             initial={{ opacity: 0, x: -15 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="text-2xl md:text-3xl font-semibold text-[#92400E] tracking-tight"
//           >
//             Book Your Stay
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, x: -15 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-amber-600 max-w-lg text-sm font-medium leading-snug"
//           >
//             Experience rest, healing, and comfort at Swagram Wellness Centre. A
//             sanctuary designed for the soul's rejuvenation.
//           </motion.p>
//         </div>

//         <div className="relative group/searchbar">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.99 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white rounded-[9px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-1.5 md:p-2 flex flex-col md:flex-row items-stretch md:items-center border border-gray-100/60 group-hover/searchbar:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-500"
//           >
//             <div
//               onClick={(e) => setCalendarAnchorEl(e.currentTarget)}
//               className="flex-1 px-5 py-2.5 cursor-pointer hover:bg-gray-50 rounded-[9px] transition-all border-b md:border-b-0 md:border-r border-gray-50 group/item text-center md:text-left"
//             >
//               <p className="text-[8px] font-semibold text-amber-600 uppercase tracking-widest mb-0.5 group-hover/item:text-amber-500 transition-colors">
//                 Check-in
//               </p>
//               <div className="flex items-center gap-2">
//                 <CalendarMonth
//                   className="text-amber-600 group-hover/item:text-amber-400 transition-colors"
//                   sx={{ fontSize: 16 }}
//                 />
//                 <span className="text-gray-800 font-semibold text-sm tracking-tight whitespace-nowrap">
//                   {checkIn ? format(checkIn, "MMM dd, yyyy") : "Add date"}
//                 </span>
//                 <KeyboardArrowDown
//                   sx={{ fontSize: 12 }}
//                   className="text-gray-300 ml-auto"
//                 />
//               </div>
//             </div>

//             <div
//               onClick={(e) => setCalendarAnchorEl(e.currentTarget)}
//               className="flex-1 px-5 py-2.5 cursor-pointer hover:bg-gray-50 rounded-[9px] transition-all border-b md:border-b-0 md:border-r border-gray-50 group/item text-center md:text-left"
//             >
//               <p className="text-[8px] font-semibold text-amber-600 uppercase tracking-widest mb-0.5 group-hover/item:text-amber-500 transition-colors">
//                 Check-out
//               </p>
//               <div className="flex items-center gap-2">
//                 <CalendarMonth
//                   className="text-amber-600 group-hover/item:text-amber-400 transition-colors"
//                   sx={{ fontSize: 16 }}
//                 />
//                 <span className="text-gray-800 font-semibold text-sm tracking-tight whitespace-nowrap">
//                   {checkOut ? format(checkOut, "MMM dd, yyyy") : "Add date"}
//                 </span>
//                 <KeyboardArrowDown
//                   sx={{ fontSize: 12 }}
//                   className="text-gray-300 ml-auto"
//                 />
//               </div>
//             </div>

//             <div
//               ref={guestInputRef}
//               onClick={(e) => setGuestsAnchorEl(e.currentTarget)}
//               className="flex-1 px-5 py-2.5 cursor-pointer hover:bg-gray-50 rounded-[9px] transition-all relative group/item"
//             >
//               <div className="flex items-center gap-2 h-full">
//                 <PeopleAlt
//                   className="text-amber-600 group-hover/item:text-amber-400 transition-colors"
//                   sx={{ fontSize: 16 }}
//                 />
//                 {!guestsConfirmed ? (
//                   <span className="text-amber-600 font-semibold text-xs tracking-tight">
//                     Add guests
//                   </span>
//                 ) : (
//                   <div className="flex flex-col -space-y-0.5 justify-center">
//                     <span className="text-gray-800 font-semibold text-[11px] tracking-tight">
//                       {guests.adults} adults
//                       {guests.children > 0
//                         ? `, ${guests.children} children`
//                         : ""}
//                     </span>
//                     <span className="text-amber-600 font-medium text-[9px]">
//                       {guests.rooms} {guests.rooms > 1 ? "rooms" : "room"}
//                     </span>
//                   </div>
//                 )}
//                 <div className="ml-auto">
//                   <KeyboardArrowDown
//                     sx={{ fontSize: 16 }}
//                     className={`text-gray-300 transition-transform duration-300 ${guestsAnchorEl ? "rotate-180" : ""}`}
//                   />
//                 </div>
//               </div>
//             </div>

//             <button className="md:ml-2 px-8 py-3 bg-[#92400E] text-white font-semibold rounded-[9px] hover:bg-[#78350F] transition-colors shadow-lg shadow-amber-900/10 active:scale-95 whitespace-nowrap">
//               Search Availability
//             </button>
//           </motion.div>

//           <Popover
//             open={Boolean(calendarAnchorEl)}
//             anchorEl={calendarAnchorEl}
//             onClose={() => setCalendarAnchorEl(null)}
//             anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//             transformOrigin={{ vertical: "top", horizontal: "center" }}
//             PaperProps={{
//               sx: {
//                 borderRadius: "9px",
//                 mt: 1,
//                 boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
//                 border: "1px solid rgba(0,0,0,0.01)",
//                 overflow: "hidden",
//                 width: { xs: "340px", md: "680px" },
//               },
//             }}
//           >
//             <div className="bg-white flex flex-col h-[350px]">
//               <div className="flex items-center justify-center gap-6 py-3 border-b border-gray-50 flex-shrink-0">
//                 <button
//                   onClick={() => setActiveTab("calendar")}
//                   className={`pb-1 px-3 font-semibold text-xs transition-all relative ${activeTab === "calendar" ? "text-amber-600" : "text-amber-600 hover:text-gray-500"}`}
//                 >
//                   Calendar
//                   {activeTab === "calendar" && (
//                     <motion.div
//                       layoutId="activeTab"
//                       className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-t-full"
//                     />
//                   )}
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("flexible")}
//                   className={`pb-1 px-3 font-semibold text-xs transition-all relative ${activeTab === "flexible" ? "text-amber-600" : "text-amber-600 hover:text-gray-500"}`}
//                 >
//                   I'm flexible
//                   {activeTab === "flexible" && (
//                     <motion.div
//                       layoutId="activeTab"
//                       className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-t-full"
//                     />
//                   )}
//                 </button>
//               </div>
//               <div className="flex-1 overflow-hidden px-6 py-4">
//                 {activeTab === "calendar" && (
//                   <div className="relative animate-in fade-in duration-300">
//                     <div className="absolute top-0 left-0 right-0 flex justify-between items-center z-20 pointer-events-none">
//                       <button
//                         onClick={() =>
//                           setCalendarViewDate(subMonths(calendarViewDate, 1))
//                         }
//                         className="pointer-events-auto p-1.5 hover:bg-gray-50 rounded-full transition-all text-gray-300 hover:text-gray-600"
//                       >
//                         <ArrowBackIos sx={{ fontSize: 12 }} className="ml-1" />
//                       </button>
//                       <button
//                         onClick={() =>
//                           setCalendarViewDate(addMonths(calendarViewDate, 1))
//                         }
//                         className="pointer-events-auto p-1.5 hover:bg-gray-50 rounded-full transition-all text-gray-300 hover:text-gray-600"
//                       >
//                         <ArrowForwardIos sx={{ fontSize: 12 }} />
//                       </button>
//                     </div>

//                     <div className="flex flex-col md:flex-row gap-8">
//                       <div className="flex-1">
//                         {renderCalendar(calendarViewDate)}
//                       </div>
//                       <div className="flex-1 hidden md:block">
//                         {renderCalendar(addMonths(calendarViewDate, 1))}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === "flexible" && (
//                   <div className="space-y-5 animate-in fade-in duration-300 max-w-2xl mx-auto w-full">
//                     <div className="space-y-3">
//                       <p className="text-gray-800 font-semibold text-sm tracking-tight text-center md:text-left">
//                         How long do you want to stay?
//                       </p>
//                       <div className="flex flex-wrap gap-3 justify-center md:justify-start">
//                         {["3 nights", "1 week", "1 month"].map((duration) => (
//                           <button
//                             key={duration}
//                             onClick={() => setFlexibleDuration(duration)}
//                             className={`px-5 py-2 rounded-full border-2 font-semibold text-[11px] transition-all duration-300
//                               ${
//                                 flexibleDuration === duration
//                                   ? "bg-amber-50 border-amber-600 text-amber-600 shadow-sm"
//                                   : "border-gray-100 text-amber-600 hover:border-gray-200"
//                               }
//                             `}
//                           >
//                             {duration}
//                           </button>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <div className="space-y-0.5 text-center md:text-left">
//                         <p className="text-gray-800 font-semibold text-sm tracking-tight">
//                           When do you want to Stay?
//                         </p>
//                         <p className="text-[11px] text-amber-600 font-medium">
//                           Select your preferred month
//                         </p>
//                       </div>

//                       <div className="relative group/carousel px-4">
//                         <div
//                           ref={carouselRef}
//                           style={{
//                             scrollbarWidth: "none",
//                             msOverflowStyle: "none",
//                           }}
//                           className="flex gap-3 overflow-x-auto pb-1 pt-1 scroll-smooth [&::-webkit-scrollbar]:hidden"
//                         >
//                           {Array.from({ length: 12 }).map((_, i) => {
//                             const monthDate = addMonths(new Date(), i);
//                             const monthLabel = format(monthDate, "MMMM");
//                             const yearLabel = format(monthDate, "yyyy");
//                             const isSelected =
//                               selectedFlexibleMonth &&
//                               isSameMonth(monthDate, selectedFlexibleMonth);

//                             return (
//                               <button
//                                 key={i}
//                                 onClick={() =>
//                                   setSelectedFlexibleMonth(
//                                     startOfMonth(monthDate),
//                                   )
//                                 }
//                                 className={`flex-shrink-0 w-24 py-3 rounded-[9px] border-2 flex flex-col items-center justify-center gap-1 transition-all duration-300
//                                   ${
//                                     isSelected
//                                       ? "bg-amber-50 border-amber-600 shadow-sm"
//                                       : "bg-white border-gray-100 hover:border-gray-200"
//                                   }
//                                 `}
//                               >
//                                 <CalendarMonth
//                                   sx={{ fontSize: 16 }}
//                                   className={
//                                     isSelected
//                                       ? "text-amber-600"
//                                       : "text-amber-600"
//                                   }
//                                 />
//                                 <div className="text-center leading-none">
//                                   <p
//                                     className={`text-[10px] pt-1 font-semibold uppercase tracking-tighter ${isSelected ? "text-amber-600" : "text-gray-800"}`}
//                                   >
//                                     {monthLabel}
//                                   </p>
//                                   <p className="text-[8px] font-semibold text-amber-600 mt-1">
//                                     {yearLabel}
//                                   </p>
//                                 </div>
//                               </button>
//                             );
//                           })}
//                         </div>

//                         <button
//                           onClick={() => scrollCarousel("prev")}
//                           className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-auto bg-white shadow-md rounded-full p-1.5 border border-gray-50 flex items-center justify-center hover:bg-gray-50 active:scale-90 z-10 transition-colors"
//                         >
//                           <ArrowBackIos
//                             sx={{ fontSize: 10 }}
//                             className="text-gray-600 ml-1"
//                           />
//                         </button>
//                         <button
//                           onClick={() => scrollCarousel("next")}
//                           className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-auto bg-white shadow-md rounded-full p-1.5 border border-gray-50 flex items-center justify-center hover:bg-gray-50 active:scale-90 z-10 transition-colors"
//                         >
//                           <ArrowForwardIos
//                             sx={{ fontSize: 10 }}
//                             className="text-gray-600"
//                           />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="mt-auto px-6 py-4 border-t border-gray-100 bg-gray-50/20 flex-shrink-0">
//                 <div className="flex items-center justify-between gap-4">
//                   <button
//                     onClick={() => {
//                       setCheckIn(null);
//                       setCheckOut(null);
//                       setHoveredDate(null);
//                       setFlexibleDuration("1 week");
//                       setSelectedFlexibleMonth(null);
//                     }}
//                     className="text-amber-600 font-semibold hover:text-gray-700 transition-all text-[11px] tracking-widest uppercase"
//                   >
//                     Clear all
//                   </button>
//                   <div className="flex gap-4">
//                     <button
//                       onClick={() => setCalendarAnchorEl(null)}
//                       className="px-6 py-2 bg-white border border-gray-100 text-amber-600 font-semibold rounded-[9px] hover:bg-gray-50 transition-all text-xs"
//                     >
//                       Cancel
//                     </button>
//                     <CommonButton
//                       type="button"
//                       label="Select"
//                       onClick={() => {
//                         if (activeTab === "flexible" && selectedFlexibleMonth) {
//                           const start = startOfMonth(selectedFlexibleMonth);
//                           let end;
//                           if (flexibleDuration === "3 nights")
//                             end = addDays(start, 3);
//                           else if (flexibleDuration === "1 week")
//                             end = addDays(start, 7);
//                           else end = addMonths(start, 1);

//                           setCheckIn(start);
//                           setCheckOut(end);
//                         }
//                         setCalendarAnchorEl(null);
//                       }}
//                       className="bg-[#92400E] text-white min-w-[100px]"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Popover>

//           <Popover
//             open={Boolean(guestsAnchorEl)}
//             anchorEl={guestsAnchorEl}
//             onClose={() => setGuestsAnchorEl(null)}
//             anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//             transformOrigin={{ vertical: "top", horizontal: "center" }}
//             PaperProps={{
//               sx: {
//                 borderRadius: "9px",
//                 mt: 1,
//                 p: 2.5,
//                 width: "300px",
//                 boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
//                 border: "1px solid rgba(0,0,0,0.01)",
//               },
//             }}
//           >
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <p className="font-semibold text-gray-800 text-sm">Room</p>
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() =>
//                       setGuests((g) => ({
//                         ...g,
//                         rooms: Math.max(1, g.rooms - 1),
//                       }))
//                     }
//                     className="w-7 h-7 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all text-amber-600"
//                   >
//                     <Remove sx={{ fontSize: 14 }} />
//                   </button>
//                   <span className="w-3 text-center font-semibold text-sm text-gray-800">
//                     {guests.rooms}
//                   </span>
//                   <button
//                     onClick={() =>
//                       setGuests((g) => ({ ...g, rooms: g.rooms + 1 }))
//                     }
//                     className="w-7 h-7 rounded-full border border-amber-600 text-amber-600 flex items-center justify-center hover:bg-amber-50 active:scale-90 transition-all"
//                   >
//                     <Add sx={{ fontSize: 14 }} />
//                   </button>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-semibold text-gray-800 text-sm">Adults</p>
//                   <p className="text-[10px] text-amber-600">Ages 13 or above</p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() =>
//                       setGuests((g) => ({
//                         ...g,
//                         adults: Math.max(1, g.adults - 1),
//                       }))
//                     }
//                     className="w-7 h-7 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all text-amber-600"
//                   >
//                     <Remove sx={{ fontSize: 14 }} />
//                   </button>
//                   <span className="w-3 text-center font-semibold text-sm text-gray-800">
//                     {guests.adults}
//                   </span>
//                   <button
//                     onClick={() =>
//                       setGuests((g) => ({ ...g, adults: g.adults + 1 }))
//                     }
//                     className="w-7 h-7 rounded-full border border-amber-600 text-amber-600 flex items-center justify-center hover:bg-amber-50 active:scale-90 transition-all"
//                   >
//                     <Add sx={{ fontSize: 14 }} />
//                   </button>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-semibold text-gray-800 text-sm">
//                     Children
//                   </p>
//                   <p className="text-[10px] text-amber-600">Ages 0-12</p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => {
//                       setGuests((g) => {
//                         const newCount = Math.max(0, g.children - 1);
//                         return {
//                           ...g,
//                           children: newCount,
//                           childrenAges: g.childrenAges.slice(0, newCount),
//                         };
//                       });
//                     }}
//                     className="w-7 h-7 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-90 transition-all text-amber-600"
//                   >
//                     <Remove sx={{ fontSize: 14 }} />
//                   </button>
//                   <span className="w-3 text-center font-semibold text-sm text-gray-800">
//                     {guests.children}
//                   </span>
//                   <button
//                     onClick={() => {
//                       setGuests((g) => {
//                         const newCount = g.children + 1;
//                         return {
//                           ...g,
//                           children: newCount,
//                           childrenAges: [...g.childrenAges, ""],
//                         };
//                       });
//                     }}
//                     className="w-7 h-7 rounded-full border border-amber-600 text-amber-600 flex items-center justify-center hover:bg-amber-50 active:scale-90 transition-all"
//                   >
//                     <Add sx={{ fontSize: 14 }} />
//                   </button>
//                 </div>
//               </div>

//               {guests.children > 0 && (
//                 <div className="pt-3 border-t border-gray-50 space-y-3">
//                   <p className="text-[10px] text-amber-600 leading-tight">
//                     For accurate room pricing, make sure to enter your
//                     children's correct ages.
//                   </p>
//                   <div className="space-y-2">
//                     {Array.from({ length: guests.children }).map((_, i) => (
//                       <FormControl key={i} fullWidth size="small">
//                         <Select
//                           value={guests.childrenAges[i] || ""}
//                           onChange={(e) => {
//                             const newAges = [...guests.childrenAges];
//                             newAges[i] = e.target.value;
//                             setGuests((g) => ({ ...g, childrenAges: newAges }));
//                           }}
//                           displayEmpty
//                           variant="outlined"
//                           sx={{
//                             borderRadius: "9px",
//                             fontSize: "11px",
//                             ".MuiSelect-select": { py: 1 },
//                           }}
//                           IconComponent={KeyboardArrowDown}
//                         >
//                           <MenuItem
//                             value=""
//                             disabled
//                             sx={{
//                               "&::before": { display: "none !important" },
//                               fontSize: "11px",
//                             }}
//                           >
//                             Age of Child {i + 1}
//                           </MenuItem>
//                           {Array.from({ length: 13 }).map((_, age) => (
//                             <MenuItem
//                               key={age}
//                               value={age}
//                               sx={{
//                                 fontSize: "11px",
//                                 "&::before": { display: "none !important" },
//                               }}
//                             >
//                               {age} years old
//                             </MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div className="pt-3 flex justify-end gap-2 border-t border-gray-50">
//                 <button
//                   onClick={() => setGuestsAnchorEl(null)}
//                   className="px-4 py-1.5 text-[11px] font-semibold text-amber-600 hover:text-gray-600 transition-all"
//                 >
//                   Cancel
//                 </button>
//                 <CommonButton
//                   type="button"
//                   onClick={() => {
//                     setGuestsConfirmed(true);
//                     setGuestsAnchorEl(null);
//                   }}
//                   className="bg-[#92400E] text-white"
//                   label="Apply"
//                 />
//               </div>
//             </div>
//           </Popover>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 h-full">
//           <div className="lg:col-span-2 space-y-6 max-h-[900px] h-full overflow-y-auto pr-3 pb-20 custom-scrollbar-wellness-stay">
//             {wellnessServices.map((service, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="bg-white rounded-[9px] overflow-hidden border border-gray-100/60 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 group flex flex-col md:flex-row h-auto min-h-fit"
//               >
//                 <div className="relative w-full md:w-[280px] lg:w-[320px] flex-shrink-0 overflow-hidden bg-gray-50 h-64 md:h-auto min-h-[220px]">
//                   <img
//                     src={service.image}
//                     alt={service.serviceName}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   <div className="absolute top-4 left-4">
//                     <span className="bg-white/95 backdrop-blur-md text-[#92400E] px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wider shadow-sm border border-amber-100 uppercase">
//                       {service.badge}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
//                   <div>
//                     <div className="flex justify-between items-start mb-2">
//                       <div className="space-y-0.5">
//                         <h3 className="text-xl md:text-2xl font-serif text-gray-800 leading-tight">
//                           {service.serviceName}
//                         </h3>
//                         <p className="text-xs text-amber-600 font-semibold tracking-wide">
//                           {service.subTitle}
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-xl md:text-2xl font-serif text-[#92400E]">
//                           ₹{service.price.toLocaleString()}
//                         </p>
//                         <p className="text-[9px] text-amber-600 font-semibold uppercase tracking-tighter leading-none opacity-80">
//                           PER PERSON / EXC. TAXES
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-4 py-3 border-t border-gray-50 mt-3">
//                       <div className="flex items-center gap-1.5">
//                         <PeopleAlt
//                           sx={{ fontSize: 14 }}
//                           className="text-amber-600"
//                         />
//                         <span className="text-[11px] font-semibold text-gray-600">
//                           {service.person}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-1.5">
//                         <CalendarMonth
//                           sx={{ fontSize: 14 }}
//                           className="text-amber-600"
//                         />
//                         <span className="text-[11px] font-semibold text-gray-600">
//                           Check-in: {service.checkIn}
//                         </span>
//                       </div>
//                     </div>

//                     <p className="text-[13px] text-gray-500 font-medium leading-snug mt-2 line-clamp-2">
//                       {service.description}
//                     </p>

//                     <div className="mt-3 space-y-2">
//                       <div className="flex items-start gap-2">
//                         <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
//                         <p className="text-[11px] text-gray-500 font-semibold italic leading-tight">
//                           Benefits: {service.benefits}
//                         </p>
//                       </div>

//                       {service.rooms.length > 0 && (
//                         <div className="flex flex-wrap gap-1.5 mt-2">
//                           {service.rooms.map((room, roomIdx) => (
//                             <span
//                               key={roomIdx}
//                               className="bg-gray-50 text-amber-600 text-[10px] px-2 py-0.5 rounded-[9px] border border-gray-100 font-semibold"
//                             >
//                               {room.split("|")[1] || room}
//                             </span>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 mt-4">
//                     <button
//                       onClick={() => setSelectedService(service)}
//                       className={`flex-1 py-3 font-semibold rounded-[9px] transition-all shadow-lg active:scale-[0.98] text-sm ${selectedService?.serviceName === service.serviceName ? "bg-amber-700 text-white shadow-amber-900/20" : "bg-[#92400E] text-white shadow-amber-900/10 hover:bg-[#78350F]"}`}
//                     >
//                       {selectedService?.serviceName === service.serviceName
//                         ? "Selected"
//                         : "View Details"}
//                     </button>
//                     <button className="px-5 py-3 border border-gray-100 rounded-[9px] hover:bg-gray-50 transition-all font-semibold text-amber-600 text-sm hover:text-gray-600 active:scale-[0.98]">
//                       T&C
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <div className="lg:col-span-1">
//             <motion.div
//               layout
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-white rounded-[9px] p-3 md:p-6 border border-amber-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] sticky top-24 space-y-2"
//             >
//               <h2 className="text-xl font-serif text-amber-800 border-b border-amber-50 pb-1">
//                 Reservation Summary
//               </h2>

//               <div className="bg-amber-50 p-2 rounded-[9px] flex items-center gap-3 border border-gray-100/50">
//                 <BedIcon className="text-amber-600" sx={{ fontSize: 18 }} />
//                 <span className="text-amber-600 font-semibold text-[13px] tracking-tight">
//                   {selectedService
//                     ? selectedService.serviceName.split("|")[1] ||
//                       selectedService.serviceName
//                     : "Select your stay"}
//                 </span>
//               </div>

//               <div className="space-y-3">
//                 <p className="text-[9px] font-semibold text-amber-600 uppercase tracking-widest leading-none">
//                   Guest Information
//                 </p>
//                 <div className="space-y-3">
//                   <InputField
//                     control={control}
//                     name="fullName"
//                     label="Full Name"
//                     variant="outlined"
//                     sx={{ "& .MuiOutlinedInput-root": { borderRadius: "9px" } }}
//                   />
//                   <InputField
//                     control={control}
//                     name="email"
//                     label="Email Address"
//                     variant="outlined"
//                     sx={{ "& .MuiOutlinedInput-root": { borderRadius: "9px" } }}
//                   />
//                   <div className="flex gap-2">
//                     <InputField
//                       control={control}
//                       name="mobile"
//                       label="Mobile"
//                       variant="outlined"
//                       sx={{
//                         "& .MuiOutlinedInput-root": { borderRadius: "9px" },
//                       }}
//                     />
//                     <InputField
//                       control={control}
//                       name="city"
//                       label="City"
//                       variant="outlined"
//                       sx={{
//                         "& .MuiOutlinedInput-root": { borderRadius: "9px" },
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-3 pt-3">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <PeopleAlt
//                       className="text-amber-600 opacity-40"
//                       sx={{ fontSize: 18 }}
//                     />
//                     <div className="space-y-0.5">
//                       <p className="font-semibold text-gray-700 text-[14px]">
//                         Bringing a Pet?
//                       </p>
//                       <p className="text-[9px] text-amber-600">
//                         Pre-approval required
//                       </p>
//                     </div>
//                   </div>
//                   <Switch
//                     size="small"
//                     checked={formValues.bringingPet}
//                     onChange={(e) => setValue("bringingPet", e.target.checked)}
//                     sx={{
//                       "& .MuiSwitch-switchBase.Mui-checked": {
//                         color: "#92400E",
//                       },
//                       "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
//                         { backgroundColor: "#92400E" },
//                     }}
//                   />
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <PeopleAlt
//                       className="text-amber-600 opacity-40"
//                       sx={{ fontSize: 18 }}
//                     />
//                     <div className="space-y-0.5">
//                       <p className="font-semibold text-gray-700 text-[14px]">
//                         Twin Sharing?
//                       </p>
//                       <p className="text-[8px] text-red-500 font-semibold">
//                         *Same-gender rules apply
//                       </p>
//                     </div>
//                   </div>
//                   <Switch
//                     size="small"
//                     checked={formValues.twinSharing}
//                     onChange={(e) => setValue("twinSharing", e.target.checked)}
//                     sx={{
//                       "& .MuiSwitch-switchBase.Mui-checked": {
//                         color: "#92400E",
//                       },
//                       "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
//                         { backgroundColor: "#92400E" },
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2 py-2">
//                 <p className="text-[9px] font-semibold text-amber-600 uppercase tracking-widest leading-none pb-1">
//                   Meal Preference
//                 </p>
//                 <DropdownField
//                   control={control}
//                   name="mealPreference"
//                   placeholder="Selected Meal Plan"
//                   dataArray={[
//                     {
//                       label: "Organic Full Board (Included)",
//                       value: "Organic Full Board (Included)",
//                     },
//                     {
//                       label: "Custom Diet (Requires Consult)",
//                       value: "Custom Diet (Requires Consult)",
//                     },
//                   ]}
//                 />
//               </div>

//               <div className="pt-1 border-t border-gray-50 space-y-2">
//                 <div className="flex justify-between items-center text-xs">
//                   <span className="text-amber-600 font-semibold">Stay</span>
//                   <span className="text-gray-700 font-semibold">
//                     ₹{costs.stay.toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center text-xs">
//                   <span className="text-amber-600 font-semibold">
//                     Wellness Access Fee
//                   </span>
//                   <span className="text-gray-700 font-semibold">
//                     ₹{costs.wellness.toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center text-xs">
//                   <span className="text-amber-600 font-semibold">
//                     Taxes & Service
//                   </span>
//                   <span className="text-gray-700 font-semibold">
//                     ₹{Math.round(costs.taxes).toLocaleString()}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center justify-between mt-4">
//                 <h3 className="text-lg font-serif text-gray-800">
//                   Total Amount
//                 </h3>
//                 <div className="text-right">
//                   <span className="text-xl md:text-2xl font-serif text-[#92400E]">
//                     ₹{Math.round(costs.total).toLocaleString()}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 disabled={!selectedService}
//                 onClick={() => alert("Proceeding to payment...")}
//                 className={`w-full py-2 rounded-[9px] font-semibold text-base transition-all active:scale-[0.98] ${selectedService ? "bg-[#92400E] text-white hover:bg-[#78350F] shadow-lg shadow-amber-900/10" : "bg-gray-100 text-gray-300 cursor-not-allowed"}`}
//               >
//                 Complete Booking
//               </button>
//             </motion.div>

//             <div className="mt-6 grid grid-cols-3 gap-2">
//               {[
//                 {
//                   icon: <PeopleAlt sx={{ fontSize: 16 }} />,
//                   label: "Twin Sharing",
//                 },
//                 {
//                   icon: <PeopleAlt sx={{ fontSize: 16 }} />,
//                   label: "Pet Pre-Approved",
//                 },
//                 {
//                   icon: <CalendarMonth sx={{ fontSize: 16 }} />,
//                   label: "72H Cancel",
//                 },
//               ].map((badge, i) => (
//                 <div
//                   key={i}
//                   className="bg-amber-100 py-3 rounded-[9px] flex flex-col items-center justify-center text-center gap-1.5 border border-amber-200"
//                 >
//                   <div className="text-amber-700 opacity-60">{badge.icon}</div>
//                   <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-tighter leading-tight">
//                     {badge.label}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default IPDWellnessStay;

import {
  PeopleAlt,
  ArrowForward,
  SelfImprovement,
  Spa,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getRoomList } from "../../../../services/healingServices/wellnessStay/WellnessStayServices";
import ipdDoubleImg from "../../../assets/healingServices/ipd/ipdDouble.jpg";
import OutdoorLeavingImg from "../../../assets/healingServices/ipd/OutdoorLeaving.jpg";
import SingleStayImg from "../../../assets/healingServices/ipd/Single Stay.png";
import StayBookingModal from "./StayBookingModal";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const IPDWellnessStay = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [roomList, setRoomList] = useState([]);

  // const dynamicWellnessServices = roomList.map((room) => {
  //   const lowerName = room.roomName?.toLowerCase() || "";
  //   let image = SingleStayImg;
  //   if (lowerName.includes("out door") || lowerName.includes("outdoor")) {
  //     image = OutdoorLeavingImg;
  //   } else if (
  //     lowerName.includes("well house") ||
  //     (room.maxOccupancy ?? 0) > 1
  //   ) {
  //     image = ipdDoubleImg;
  //   }

  //   const occ = room.maxOccupancy ?? 0;
  //   let occupancyLabel = "Flexible";
  //   if (occ === 1) occupancyLabel = "Solo Retreat";
  //   else if (occ === 2) occupancyLabel = "Dual Sanctuary";
  //   else if (occ > 2) occupancyLabel = `Up to ${occ} Guests`;

  //   return {
  //     serviceName: room.roomName ?? "",
  //     price: room.basePrice ?? 0,
  //     image,
  //     occupancyLabel,
  //     maxOcc: occ,
  //     isActive: room.isActive ?? false,
  //     benefits: room.benefits ?? null,
  //     description: room.description ?? null,
  //     roomTypeId: room.roomTypeId ?? null,
  //   };
  // });

  const roomImageMap = {
    1: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=60", // Standard hotel room
    2: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=60", // Modern hotel room
    3: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=60", // Luxury suite
    4:  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=60", // Resort room
    5: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=800&q=60", // Deluxe room
    8: OutdoorLeavingImg, // Premium room
    9: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=60", // King bedroom
  };

  const dynamicWellnessServices = roomList.map((room) => {
    const image =
      roomImageMap[room.roomTypeId] ||
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=60";

    const occ = room.maxOccupancy ?? 0;

    let occupancyLabel = "Flexible";

    if (occ === 1) occupancyLabel = "Solo Retreat";
    else if (occ === 2) occupancyLabel = "Dual Sanctuary";
    else if (occ > 2) occupancyLabel = `Up to ${occ} Guests`;

    return {
      serviceName: room.roomName ?? "",
      price: room.basePrice ?? 0,
      image,
      occupancyLabel,
      maxOcc: occ,
      isActive: room.isActive ?? false,
      benefits: room.benefits ?? null,
      description: room.description ?? null,
      roomTypeId: room.roomTypeId ?? null,
      meal:room?.meal
    };
  });

  const handleGetRoomList = () => {
    getRoomList()
      .then((res) => {
        if (res?.status === 200) setRoomList(res.data?.data ?? []);
        else setRoomList([]);
      })
      .catch(() => setRoomList([]));
  };

  useEffect(() => {
    handleGetRoomList();
  }, []);

  const handleBook = (service) => {
    if (!service.isActive) return;
    setSelectedService(service);
    setOpenBookingModal(true);
  };

  const handleClose = () => {
    setOpenBookingModal(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-stone-50 to-amber-50 selection:bg-green-200 selection:text-green-900 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-green-100 opacity-50 blur-3xl pointer-events-none" />
      <div className="absolute top-48 -left-20 w-72 h-72 rounded-full bg-amber-100 opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-emerald-50 opacity-60 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col gap-5 max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-2xl md:text-4xl font-bold text-stone-800 leading-[1.05] tracking-tight"
            >
              Book Your Stay
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-stone-500 text-sm leading-relaxed max-w-md"
            >
              Experience rest, healing, and comfort at Swagram Wellness Centre.
              A sanctuary designed for the soul's rejuvenation.
            </motion.p>
          </div>
        </div>

        <div className="mt-5 h-px bg-gradient-to-r from-green-300 via-amber-200 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {dynamicWellnessServices.map((service, idx) => (
            <motion.div
              key={`${service.serviceName}-${idx}`}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="bg-white rounded-xl overflow-hidden border border-stone-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-green-200 transition-all duration-300 transform hover:-translate-y-2 flex flex-col group will-change-transform"
            >
              <div className="relative h-52 overflow-hidden flex-shrink-0 bg-stone-100">
                <img
                  src={service.image}
                  alt={service.serviceName}
                  className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 ${!service.isActive ? "grayscale brightness-90" : ""}`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {!service.isActive && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                    <span className="bg-white/90 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-stone-500 border border-stone-200 shadow-sm">
                      Fully Booked
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1 gap-4">
                <div>
                  <div className="flex justify-between items-start mb-1.5">
                    <h3 className="text-lg font-bold text-stone-800 leading-snug">
                      {service.serviceName}
                    </h3>
                  </div>
                  <div className="w-8 h-0.5 rounded-full bg-green-400" />
                </div>

                <div className="bg-gradient-to-br from-green-50 to-amber-50 rounded-xl px-4 py-3.5 border border-green-100 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-green-700 mb-0.5">
                      Per Person / Night
                    </p>
                    <p className="text-2xl font-bold text-stone-800 leading-none">
                      ₹{(service.price || 0).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {service.description && (
                  <p className="text-stone-500 text-[13px] leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                )}
                {service.meal && (
                  <p className="text-stone-500 text-[13px] leading-relaxed line-clamp-2">
                    {service.meal}
                  </p>
                )}

                {service.benefits && (
                  <div className="flex bg-stone-50 rounded-lg p-2.5 items-start gap-2 border border-stone-100">
                    <Spa
                      className="text-green-600 mt-0.5"
                      sx={{ fontSize: 16 }}
                    />
                    <p className="text-stone-600 text-xs font-medium leading-snug line-clamp-2">
                      {service.benefits}
                    </p>
                  </div>
                )}

                <div className="flex-1" />

                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    disabled={!service.isActive}
                    onClick={() => handleBook(service)}
                    className={`flex-1 py-2 rounded-[5px] text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all duration-300 ${
                      !service.isActive
                        ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                        : "bg-green-700 text-white hover:bg-green-800 shadow-md shadow-green-200 hover:shadow-lg hover:shadow-green-300"
                    }`}
                  >
                    {service.isActive ? <>View Details</> : "Unavailable"}
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 rounded-[5px] border border-stone-200 text-stone-500 text-xs font-semibold uppercase tracking-wide hover:border-green-400 hover:text-green-700 hover:bg-green-50 transition-all duration-300"
                  >
                    T & C
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-3 mt-14"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-300" />
          <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-stone-400">
            Swagrama · Wellness Centre
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-green-300" />
        </motion.div>
      </div>

      <AnimatePresence>
        {openBookingModal && (
          <StayBookingModal
            open={openBookingModal}
            handleClose={handleClose}
            selectedService={selectedService}
            handleGetRoomList={handleGetRoomList}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default IPDWellnessStay;
