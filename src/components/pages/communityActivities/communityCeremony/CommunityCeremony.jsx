import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Heart, IndianRupee, Leaf } from "lucide-react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useRef, useState } from "react";
import VisitorsFormModal from "../vision/VisitorsFormModal";
import { eventsData2026 } from "../../eventsCalander/EventCalander";
import bannerImage from "../../../../assets/annual_events_perfect_banner.webp";

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

const today = new Date();
today.setHours(0, 0, 0, 0);

function parseEventDate(dateStr) {
  if (!dateStr) return null;
  const part = dateStr.split(" To ")[0].trim();
  const [d, m, y] = part.split("/");
  if (!d || !m || !y) return null;
  const dt = new Date(Number(y), Number(m) - 1, Number(d));
  dt.setHours(0, 0, 0, 0);
  return dt;
}

function isEventPast(event) {
  const dateStr = event.date || "";
  if (dateStr.includes(" To ")) {
    const [, end] = dateStr.split(" To ");
    const [d, m, y] = end.trim().split("/");
    const endDate = new Date(Number(y), Number(m) - 1, Number(d));
    endDate.setHours(0, 0, 0, 0);
    return endDate < today;
  }
  const dt = parseEventDate(event.date);
  return dt ? dt < today : false;
}

function isEventToday(event) {
  const dateStr = event.date || "";
  if (dateStr.includes(" To ")) {
    const [start, end] = dateStr.split(" To ");
    const [sd, sm, sy] = start.trim().split("/");
    const [ed, em, ey] = end.trim().split("/");
    const startDate = new Date(Number(sy), Number(sm) - 1, Number(sd));
    const endDate = new Date(Number(ey), Number(em) - 1, Number(ed));
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    return today >= startDate && today <= endDate;
  }
  const dt = parseEventDate(event.date);
  return dt ? dt.getTime() === today.getTime() : false;
}

const EventCard = ({
  event,
  index,
  setOpenEventBookModal,
  setSelectedEvent,
}) => {
  const isPremium = event.value && event.value >= 9000;
  const past = isEventPast(event);
  const isToday = isEventToday(event);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="h-full flex flex-col py-2"
    >
      <div
        className={`relative flex-1 flex flex-col rounded-[9px] border group transition-all duration-300 
       ${
         past
           ? "bg-gray-100 border-gray-200 opacity-50 grayscale cursor-not-allowed"
           : isToday
             ? "bg-card border-lime ring-2 ring-green-600/80 shadow-lg cursor-pointer hover:-translate-y-1 hover:scale-[1.02]"
             : "bg-card border-lime cursor-pointer hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
       }`}
      >
        <div className="relative h-44 2xl:h-60 overflow-hidden rounded-t-[9px]">
          <img
            src={event.image}
            alt={event.serviceName}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 to-transparent" />
          <div className="absolute bottom-1 right-1">
            <div className="flex items-center gap-2 px-3 py-2 bg-forest/40 backdrop-blur-md border border-white/20 rounded-[5px] shadow-lg">
              <Calendar className="w-4 h-4 text-lime" />
              <span className="text-xs font-semibold text-cream">
                {event.date}
              </span>
            </div>
          </div>
          {past && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="text-white text-xs font-bold bg-black/50 px-3 py-1 rounded-full">
                Past Event
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col p-3">
          <h3 className="font-display text-sm py-1 font-bold text-foreground leading-tight line-clamp-2 group-hover:text-forest transition-colors">
            {event.serviceName}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 flex-grow">
            {event.description}
          </p>

          <div className="flex items-start gap-2 my-1 p-2 bg-lime/10 rounded-xl border border-lime-200">
            <Heart className="w-4 h-4 text-earth mt-1 flex-shrink-0" />
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
                  className={`font-display text-xl font-bold ${isPremium ? "text-earth" : "text-forest"}`}
                >
                  {event.value.toLocaleString()}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-lime/20 rounded-[9px]">
                <Leaf className="w-4 h-4 text-forest" />
                <span className="text-sm font-semibold text-forest">Free</span>
              </div>
            )}

            <button
              disabled={past}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-[9px] font-semibold text-sm transition-all ${
                past
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : isPremium
                    ? "bg-gradient-earth text-cream shadow-earth hover:scale-105 active:scale-95"
                    : "bg-gradient-forest text-cream shadow-nature hover:scale-105 active:scale-95"
              }`}
              onClick={() => {
                if (!past) {
                  setOpenEventBookModal(true);
                  setSelectedEvent(event);
                }
              }}
            >
              <span>{past ? "Ended" : "Book Event"}</span>
              {!past && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

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

const MonthSection = ({
  month,
  events,
  setOpenEventBookModal,
  setSelectedEvent,
  isCurrentMonth,
}) => {
  return (
    <section className="mb-16" id={`month-${month}`}>
      <div className="w-full flex items-center justify-between mb-8">
        <div className="flex items-center gap-5">
          <div
            className={`relative w-16 h-16 rounded-[9px] bg-gradient-to-br ${monthColors[month]} flex items-center justify-center shadow-nature`}
          >
            <span className="font-display text-2xl font-bold text-cream">
              {month.slice(0, 3)}
            </span>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 z-10 rounded-full bg-lime flex items-center justify-center text-sm font-bold text-forest shadow-lg">
              {events.length}
            </div>
          </div>
          <div className="text-left">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
              {month} <span className="text-lime">2026</span>
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {events.length} events • {events.filter((e) => e.value).length}{" "}
              bookable
            </p>
          </div>
        </div>
      </div>

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
    </section>
  );
};
const CommunityCeremony = () => {
  const [openEventBookModal, setOpenEventBookModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const hasScrolled = useRef(false);

  const currentMonthName = months[today.getMonth()];
  const [activeMonth, setActiveMonth] = useState(currentMonthName);

  const eventsByMonth = months.reduce((acc, month) => {
    acc[month] = eventsData2026.filter((event) => event.month === month);
    return acc;
  }, {});

  const todayEvents = eventsData2026.filter(event => isEventToday(event));


  useEffect(() => {
    setActiveMonth(currentMonthName);
  }, [currentMonthName]);

  const scrollMonths = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Mouse Drag to Scroll Logic
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    scrollRef.current.classList.add('active');
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    scrollRef.current.classList.remove('active');
  };

  const handleMouseUp = () => {
    isDown.current = false;
    scrollRef.current.classList.remove('active');
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; 
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-background"
      ref={containerRef}
    >
      <header className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-forest">
        {/* Modern Background with Parallax */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={bannerImage} 
            alt="Annual Events Banner" 
            className="w-full h-full object-cover"
          />
          {/* Subtle Dark Overlay (No white fade) */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            {/* Glassmorphism Panel */}
            <div className="relative group overflow-hidden rounded-[32px] p-8 md:p-12 border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-center">
              {/* Animated Accent Light */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-lime/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-forest/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full mb-8 border border-white/30"
              >
                <Leaf className="w-5 h-5 text-lime" />
                <span className="font-semibold text-lime uppercase tracking-wider text-sm">
                   स्वग्राम कार्यक्रम 2026
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="font-display text-4xl md:text-6xl font-bold mb-8 leading-[1.1] text-white tracking-tight"
              >
                Annual Events & <br />
                <span className="text-lime">Calendar 2026</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-lg md:text-xl text-cream/90 max-w-3xl mx-auto leading-relaxed font-medium mb-10"
              >
                Discover our curated collection of cultural festivals, wellness
                communes, and spiritual ceremonies throughout the year.
              </motion.p>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime/20 border border-lime/40 rounded-full text-lime text-sm font-semibold">
                <span className="inline-block w-2 h-2 rounded-full bg-lime animate-pulse" />
                Viewing {currentMonthName} 2026 ·{" "}
                {today.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="w-full mx-auto px-4 py-3">
        {todayEvents.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <div className="relative overflow-hidden rounded-[18px] bg-gradient-to-br from-forest to-forest-light shadow-2xl border border-white/10">
              <div className="absolute top-0 right-0 p-4">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-lime/20 backdrop-blur-md rounded-full border border-lime/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-ping" />
                  <span className="text-[10px] font-bold text-lime uppercase tracking-wider">Today's Event</span>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                  <img 
                    src={todayEvents[0].image} 
                    alt={todayEvents[0].serviceName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                  <h2 className="text-xl md:text-2xl font-bold text-cream mb-2 leading-tight">
                    {todayEvents[0].serviceName}
                  </h2>
                  <div className="space-y-4 mb-8">
                    <p className="text-cream text-sm leading-relaxed italic opacity-90">
                      {todayEvents[0].description}
                    </p>
                    <div className="flex items-start gap-2 pt-2 border-t border-white/10">
                      <Heart className="w-4 h-4 text-lime flex-shrink-0 mt-0.5" />
                      <p className="text-cream/80 text-xs font-medium">
                        <span className="text-lime uppercase tracking-wider font-bold mr-2">Benefits:</span>
                        {todayEvents[0].benefits}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-lime" />
                        <span className="text-sm font-semibold text-cream">{todayEvents[0].date}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setOpenEventBookModal(true);
                        setSelectedEvent(todayEvents[0]);
                      }}
                      className="px-6 py-2.5 bg-lime text-forest font-bold rounded-full text-sm hover:scale-105 transition-transform shadow-lg shadow-forest/20 flex items-center gap-2"
                    >
                      <span>Join Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-lime/10 rounded-full blur-3xl" />
            </div>
          </motion.div>
        )}

        {/* Month Selector Carousel */}
        <div className="mb-10 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Select Month</h2>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveMonth(currentMonthName)}
                className="text-xs font-bold text-forest hover:text-earth transition-colors flex items-center gap-1 mr-2"
              >
                <Calendar className="w-3 h-3" />
                Today
              </button>
              <div className="flex items-center gap-1 border-l border-lime/20 pl-3">
                <button 
                  onClick={() => scrollMonths('left')}
                  className="w-8 h-8 rounded-full bg-white border border-lime/20 flex items-center justify-center text-forest hover:bg-lime/10 transition-colors shadow-sm"
                  title="Previous"
                >
                  <ChevronLeftIcon fontSize="small" />
                </button>
                <button 
                  onClick={() => scrollMonths('right')}
                  className="w-8 h-8 rounded-full bg-white border border-lime/20 flex items-center justify-center text-forest hover:bg-lime/10 transition-colors shadow-sm"
                  title="Next"
                >
                  <ChevronRightIcon fontSize="small" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="relative group/carousel">
            <div 
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2 scroll-smooth cursor-grab active:cursor-grabbing select-none"
              style={{
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              <style>{`
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {months.map((month) => {
                const isActive = activeMonth === month;
                const hasEvents = (eventsByMonth[month]?.length || 0) > 0;
                const isCurrentMonth = month === currentMonthName;
                
                return (
                  <button
                    key={month}
                    onClick={() => setActiveMonth(month)}
                    className={`flex-shrink-0 relative px-6 py-3 rounded-[9px] font-semibold text-sm transition-all duration-300 pointer-events-auto
                      ${isActive 
                        ? "bg-forest text-cream shadow-nature" 
                        : "bg-white border border-lime/30 text-muted-foreground hover:border-lime hover:bg-lime/5"}
                      ${!hasEvents && "opacity-50 grayscale"}
                    `}
                  >
                    <span className="relative z-10">{month}</span>

                    {isActive && (
                      <motion.div
                        layoutId="activeMonth"
                        className="absolute inset-0 bg-forest rounded-[9px]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Display Active Month Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMonth}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {eventsByMonth[activeMonth] && eventsByMonth[activeMonth].length > 0 ? (
              <MonthSection
                month={activeMonth}
                events={eventsByMonth[activeMonth]}
                setOpenEventBookModal={setOpenEventBookModal}
                setSelectedEvent={setSelectedEvent}
                isCurrentMonth={activeMonth === currentMonthName}
              />
            ) : (
              <div className="py-20 text-center bg-white/50 rounded-2xl border border-dashed border-lime/40">
                <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground/40">No Events Scheduled</h3>
                <p className="text-muted-foreground/60 text-sm">There are no annual events for {activeMonth} 2026 yet.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {openEventBookModal && (
        <VisitorsFormModal
          open={openEventBookModal}
          handleClose={() => {
            setOpenEventBookModal(false);
            setSelectedEvent(null);
          }}
          serviceDetails={{
            ...selectedEvent,
            price: selectedEvent.value ? `₹${selectedEvent.value}` : "Free",
            checkIn: "",
            checkOut: "",
            nameHindi: selectedEvent.serviceName,
          }}
        />
      )}
    </motion.div>
  );
};

export default CommunityCeremony;
