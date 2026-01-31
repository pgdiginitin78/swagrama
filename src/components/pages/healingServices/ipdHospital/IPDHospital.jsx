import { motion } from "framer-motion";
import {
  Clock,
  Home,
  Leaf,
  Sparkles,
  Star,
  Sun,
  Trees,
  Users,
} from "lucide-react";
import { useState } from "react";
import BookEventForm from "../../bookEventForm/BookEventForm";

export const wellnessServices = [
  {
    serviceName: "स्वबहिस्वसतिचर्या Outdoor Living ",
    person: "Single Person",
    checkIn: "11:15",
    checkOut: "14:15",
    description:
      "Outdoor stay in natural surroundings at Swagrama with Herbal Gud Tea & 2 wholesome meal.",
    benefits:
      "Immersion in nature, relaxation, fresh air, mental rejuvenation.",
    price: 3000,
    rooms: [],
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80",
    badge: "Nature Retreat",
  },
  {
    serviceName: "स्वएकनिवास Single Stay",
    person: "Single Person",
    checkIn: "11:15",
    checkOut: "14:15",
    description:
      "Single occupancy room with Herbal Gud Tea & 2 wholesome meal.",
    benefits: "Shared stay with comfort, suitable for couples or companions.",
    price: 3750,
    rooms: [
      "स्वअमृतकक्ष | Eternity Room",
      "स्वनित्यकक्ष | Eternal Room",
      "स्वशाश्वतकक्ष | Perpetual Room",
      "स्वनैष्ठिककक्ष | Firmness Room",
      "स्वअनन्तकक्ष | Infinite Room",
    ],
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    badge: "Premium Stay",
  },
  {
    serviceName: "स्वद्वयनिवास Double Stay",
    person: "Two Person",
    checkIn: "11:15",
    checkOut: "14:15",
    description:
      "Double occupancy room with Herbal Gud Tea & 2 wholesome meal.",
    benefits: "Shared stay with comfort, suitable for couples or companions.",
    price: 6000,
    rooms: [
      "स्वअमृतकक्ष | Eternity Room",
      "स्वनित्यकक्ष | Eternal Room",
      "स्वशाश्वतकक्ष | Perpetual Room",
      "स्वनैष्ठिककक्ष | Firmness Room",
      "स्वअनन्तकक्ष | Infinite Room",
    ],
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    badge: "Couple's Choice",
  },
  {
    serviceName: "स्वस्थकूपगृहएक Well House Single",
    person: "Single Person",
    checkIn: "11:15",
    checkOut: "14:15",
    description:
      "Well House Single occupancy with Herbal Gud Tea & 2 wholesome meal.",
    benefits:
      "Full wellness experience with facilities for relaxation and care.",
    price: 4250,
    rooms: [],
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    badge: "Luxury Wellness",
  },
  {
    serviceName: "स्वस्थकूपगृहद्वय Well House Double",
    person: "Two Person",
    checkIn: "11:15",
    checkOut: "14:15",
    description:
      "Well House Double occupancy with Herbal Gud Tea & 2 wholesome meal.",
    benefits:
      "Full wellness experience with facilities for relaxation and care.",
    price: 7000,
    rooms: [],
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80",
    badge: "Elite Experience",
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.08,
      ease: "easeOut",
    },
  }),
};

const ServiceCard = ({ service, index, setOpenModal, setSelectedService }) => {
  const getServiceIcon = () => {
    if (service.serviceName.includes("Outdoor")) return Trees;
    if (service.serviceName.includes("Well House")) return Home;
    return Sparkles;
  };

  const ServiceIcon = getServiceIcon();

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="group relative bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-emerald-900/10 hover:-translate-y-2 transition-transform duration-300 will-change-transform"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-900/20 via-lime-800/10 to-amber-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative h-40 overflow-hidden">
        <img
          src={service.image}
          alt={service.serviceName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        <div className="absolute top-1 right-2 bg-emerald-900/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-lg border border-lime-400/20">
          <div className="flex items-center gap-1">
            <Users size={12} className="text-lime-300" />
            <span className="text-xs font-bold text-white">
              {service.person}
            </span>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 group/icon">
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 backdrop-blur-md p-2 rounded-xl shadow-lg border-2 border-lime-400/30 group-hover/icon:scale-110 group-hover/icon:rotate-6 transition-transform duration-300">
            <ServiceIcon className="text-lime-300" size={20} />
          </div>
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>

      <div className="relative p-4">
        <h3 className="font-bold text-gray-900 leading-tight mb-3 text-base">
          {service.serviceName}
        </h3>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-3 bg-gradient-to-r from-emerald-900/20 to-lime-900/20 backdrop-blur-md rounded-lg border border-emerald-800/30 shadow-sm hover:scale-105 transition-transform duration-200">
          <Clock size={14} className="text-emerald-800" />
          <span className="text-sm font-bold text-gray-900">
            {service.checkIn} - {service.checkOut}
          </span>
        </div>

        <div className="space-y-2 mb-3">
          <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-xl border border-amber-800/10 shadow-sm hover:scale-[1.01] transition-transform duration-200">
            <div className="flex gap-2">
              <div className="flex-shrink-0 mt-0.5">
                <div className="p-1.5 bg-gradient-to-br from-amber-800/20 to-amber-700/20 backdrop-blur-sm rounded-lg group/sun hover:rotate-180 transition-transform duration-500">
                  <Sun size={14} className="text-amber-800" />
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-snug font-medium">
                {service.description}
              </p>
            </div>
          </div>

          <div className="p-2.5 bg-white/70 backdrop-blur-md rounded-xl border border-emerald-800/10 shadow-sm hover:scale-[1.01] transition-transform duration-200">
            <div className="flex gap-2">
              <div className="flex-shrink-0 mt-0.5">
                <div className="p-1.5 bg-gradient-to-br from-emerald-800/20 to-lime-800/20 backdrop-blur-sm rounded-lg group/leaf hover:-rotate-180 transition-transform duration-500">
                  <Leaf size={14} className="text-emerald-800" />
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-snug font-medium">
                {service.benefits}
              </p>
            </div>
          </div>
        </div>
        {service.rooms.length > 0 && (
          <div className="mb-3 p-3 bg-gradient-to-br from-emerald-900/10 to-lime-900/10 backdrop-blur-md rounded-xl border border-emerald-800/20 shadow-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <Home size={14} className="text-emerald-900" />
              <p className="text-sm font-bold text-emerald-900">
                Available Rooms
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {service.rooms.map((room, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2.5 py-1 bg-white/80 backdrop-blur-sm text-gray-800 text-xs font-bold rounded-lg border border-emerald-800/20 shadow-sm hover:scale-105 hover:-translate-y-0.5 transition-transform duration-200"
                >
                  {room}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-end pt-3 border-t border-emerald-900/10">
          <button
            type="button"
            onClick={() => {
              setOpenModal(true);
              setSelectedService(service);
            }}
            className="relative px-5 py-2 bg-gradient-to-r from-emerald-900 via-emerald-800 to-lime-900 backdrop-blur-md text-white font-bold rounded-xl shadow-lg overflow-hidden border border-lime-400/30 hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <span className="relative z-10 flex items-center gap-1.5 text-sm">
              Book Now
              <Sparkles size={14} />
            </span>
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-lime-400/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

const FilterBar = ({ selectedRoom, setSelectedRoom, roomOptions }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {roomOptions.map((room) => (
        <button
          key={room}
          onClick={() => setSelectedRoom(room)}
          className={`relative px-4 py-2 font-bold rounded-xl transition-all duration-200 overflow-hidden text-sm ${
            selectedRoom === room
              ? "bg-gradient-to-r from-emerald-900 via-emerald-800 to-lime-900 text-lime-100 shadow-lg border border-lime-400/30 scale-105"
              : "bg-white/70 backdrop-blur-md text-gray-800 border border-emerald-900/20 hover:border-emerald-900/40 shadow-sm hover:scale-105"
          }`}
        >
          <span className="relative z-10">{room}</span>
        </button>
      ))}
    </div>
  );
};

const WellnessSection = () => {
  const [selectedRoom, setSelectedRoom] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const filteredData =
    selectedRoom === "All"
      ? wellnessServices
      : wellnessServices.filter((s) => {
          const matchInRooms = s.rooms?.some((r) =>
            r.toLowerCase().includes(selectedRoom.toLowerCase())
          );

          const matchInServiceName = s.serviceName
            .toLowerCase()
            .includes(selectedRoom.toLowerCase());

          return matchInRooms || matchInServiceName;
        });

  const roomOptions = [
    "Eternity Room",
    "Eternal Room",
    "Perpetual Room",
    "Firmness Room",
    "Infinite Room",
    "Well House",
    "Outdoor Living",
    "All",
  ];

  return (
    <div className="min-h-screen py-6 px-3 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-lime-50/50 to-amber-50/30"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold py-2 bg-gradient-to-r from-emerald-900 via-lime-800 to-amber-800 bg-clip-text text-transparent">
            स्वास्थ्य निवास Wellness Stay
          </h1>

          <p
            className="text-sm bg-gradient-to-r from-emerald-500 via-lime-600 to-amber-700
                        bg-clip-text text-transparent
                        drop-shadow-[0_1px_2px_rgba(180,130,20,0.5)]
                        mx-auto mb-3 font-medium"
          >
            Experience authentic Ayurvedic healing in the embrace of nature's
            tranquility
          </p>
        </motion.div>
        <FilterBar
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          roomOptions={roomOptions}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredData.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              setOpenModal={setOpenModal}
              setSelectedService={setSelectedService}
            />
          ))}
        </div>
        {filteredData.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-gradient-to-br from-emerald-900/10 to-lime-900/10 backdrop-blur-md rounded-full border border-emerald-900/20">
              <Leaf className="text-emerald-800" size={36} />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">
              No packages available
            </h3>
            <p className="text-sm text-gray-700">
              Please select a different room type to view available packages
            </p>
          </div>
        )}
      </div>
      {openModal && (
        <BookEventForm
          open={openModal}
          handleClose={() => {
            setOpenModal(false);
            setSelectedService(null);
          }}
          eventDetails={selectedService}
        />
      )}
    </div>
  );
};

export default WellnessSection;
