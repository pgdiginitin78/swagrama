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

const FILTERS = [
  { key: "all", label: "All Rooms" },
  { key: "available", label: "Available" },
  { key: "solo", label: "Solo" },
  { key: "group", label: "Group" },
];

const IPDWellnessStay = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [roomList, setRoomList] = useState([]);

  const dynamicWellnessServices = roomList.map((room) => {
    const lowerName = room.roomName?.toLowerCase() || "";
    let image = SingleStayImg;
    if (lowerName.includes("out door") || lowerName.includes("outdoor")) {
      image = OutdoorLeavingImg;
    } else if (
      lowerName.includes("well house") ||
      (room.maxOccupancy ?? 0) > 1
    ) {
      image = ipdDoubleImg;
    }

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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="flex flex-col gap-5 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full bg-green-100 border border-green-200"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-green-700">
                Swagrama Wellness Retreat
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-stone-800 leading-[1.05] tracking-tight"
            >
              Find Your
              <span className="block text-green-700 font-light italic">
                Sacred Space
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-stone-500 text-base leading-relaxed max-w-md"
            >
              Immerse yourself in premium therapeutic sanctuaries crafted for
              deep healing, rest, and absolute comfort.
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
                    {service.isActive ? (
                      <>
                        Check Availbility 
                      </>
                    ) : (
                      "Unavailable"
                    )}
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
