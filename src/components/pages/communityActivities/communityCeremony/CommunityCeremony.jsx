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
        className="relative h-full flex flex-col overflow-hidden rounded-[9px] bg-card border border-lime group cursor-pointer"
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
              rounded-[5px]
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
            className={`relative w-16 h-16 rounded-[9px] bg-gradient-to-br ${monthColors[month]} flex items-center justify-center shadow-nature overflow-hidden`}
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
