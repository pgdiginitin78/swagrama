import {
  Bathtub,
  Bed as BedIcon,
  Bolt,
  CheckCircleOutline,
  DirectionsWalk,
  Explore,
  FreeBreakfast,
  Landscape,
  LocalFireDepartment,
} from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getRoomList } from "../../../../services/healingServices/wellnessStay/WellnessStayServices";
import OutdoorLeavingImg from "../../../assets/healingServices/ipd/OutdoorLeaving.webp";
import StayBookingModal from "./StayBookingModal";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const IPDWellnessStay = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [roomList, setRoomList] = useState([]);

  const roomImageMap = {
    1: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    2: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    3: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    4: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
    5: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=800&q=80",
    8: OutdoorLeavingImg,
    9: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
  };

  const dynamicWellnessServices = roomList.map((room) => {
    const image =
      roomImageMap[room.roomTypeId] ||
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80";

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
      meal: room?.meal,
    };
  });

  console.log("dynamicWellnessServices", dynamicWellnessServices);

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
    <div  className="min-h-screen bg-gradient-to-br from-cream to-white selection:bg-lime-light selection:text-ayuDark font-sans pb-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-lime-light/20 via-lime-light/5 to-transparent pointer-events-none" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[200px] -right-[100px] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-lime-light/30 via-green-100/20 to-transparent blur-[80px] pointer-events-none opacity-50"
      />
      <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-lime-light/20 to-transparent blur-[60px] pointer-events-none opacity-30" />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 pt-8 lg:pt-7 z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 space-y-3"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-display text-ayuDark tracking-tight leading-[1.1]">
            Book
            <span className="italic text-ayuMid font-light"> Your Stay</span>
          </h1>
          <p className="text-gray-500 text-[12px] md:text-[13px] font-light max-w-lg mx-auto leading-relaxed">
            Immerse yourself in complete tranquility. Experience nature's touch
            with bespoke accommodations designed for your healing and
            rejuvenation.
          </p>
        </motion.div>

        <div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {dynamicWellnessServices?.length > 0 ?  dynamicWellnessServices.map((service, idx) => {
            const isOutdoor =
              service.serviceName?.toLowerCase().includes("out door") ||
              service.serviceName?.toLowerCase().includes("outdoor");

            return (
              <motion.div
                key={`${service.serviceName}-${idx}`}
                variants={cardVariants}
                className={`group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-lime-light/30 transition-all duration-300 border border-lime-light/20 flex flex-col ${
                  !service.isActive ? "opacity-75 grayscale-[0.3]" : ""
                }`}
              >
                <div className="relative h-[220px] overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    <img
                      src={service.image}
                      alt={service.serviceName}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {!service.isActive && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-[1px]">
                      <span className="bg-white/95 backdrop-blur px-3 py-1.5 rounded text-ayuBrown font-bold tracking-widest text-[10px] shadow-md">
                        UNAVAILABLE
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  <h3 className="absolute bottom-3 left-4 right-4 text-white font-display text-lg font-semibold tracking-wide leading-tight drop-shadow-sm">
                    {service.serviceName || "Premium Suite"}
                  </h3>
                </div>

                <div className="p-4 flex flex-col grow bg-white">
                  <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                    {/* <span className="bg-lime text-ayuDark text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      {service.occupancyLabel}
                    </span> */}

                    <div className=" bg-lime-100 backdrop-blur-md px-2 py-1 rounded-full text-[9px] font-bold text-ayuDark flex items-center gap-1 shadow-sm">
                      <BedIcon sx={{ fontSize: 12 }} className="text-ayuMid" />
                      {service.maxOcc} Guests
                    </div>
                    <span className="bg-orange-50 border border-orange-100 text-ayuBrown text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <FreeBreakfast sx={{ fontSize: 10 }} />
                      Breakfast Included
                    </span>
                  </div>

                  <p className="text-gray-500 text-[11px] leading-relaxed mb-1 font-light line-clamp-2">
                    {service.description ||
                      "A meticulously designed space featuring elegant aesthetics, deep comfort, and seamless integration with the surrounding natural beauty."}
                  </p>
                  <p className="text-gray-500 text-[11px] leading-relaxed mb-1 font-light line-clamp-2">
                    {service.meal || ""}
                  </p>
                  <div className="grid grid-cols-2 gap-y-1.5 gap-x-1.5 text-[10px] text-ayuTulsi mb-2 pt-3 border-t border-gray-50">
                    {isOutdoor ? (
                      <>
                        <div className="flex items-center gap-1.5">
                          <DirectionsWalk
                            sx={{ fontSize: 13 }}
                            className="text-ayuMid"
                          />
                          Nature Trek
                        </div>
                        <div className="flex items-center gap-1.5">
                          <LocalFireDepartment
                            sx={{ fontSize: 13 }}
                            className="text-ayuMid"
                          />
                          Bonfire
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Explore
                            sx={{ fontSize: 13 }}
                            className="text-ayuMid"
                          />
                          Adventure
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircleOutline
                            sx={{ fontSize: 13 }}
                            className="text-ayuMid"
                          />
                          Guided Tour
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-1.5">
                          <Landscape
                            sx={{ fontSize: 13 }}
                            className="text-ayuMid"
                          />
                          Garden View
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bolt sx={{ fontSize: 13 }} className="text-ayuMid" />
                          AC Room
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bathtub
                            sx={{ fontSize: 13 }}
                            className="text-ayuMid"
                          />
                          Ensuite
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircleOutline
                            sx={{ fontSize: 13 }}
                            className="text-ayuMid"
                          />
                          Free Wi-Fi
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-auto flex items-end justify-between border-t border-gray-50">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-display font-semibold text-ayuDark">
                          ₹{(service.price || 0).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="">
                      <button
                        type="button"
                        disabled={!service.isActive}
                        onClick={() => handleBook(service)}
                        className={`px-4 py-1.5 rounded-[5px] flex items-center justify-center transition-all duration-200 ${
                          service.isActive
                            ? "bg-ayuDark text-white hover:bg-ayuMid hover:scale-105 shadow-sm shadow-ayuDark/20"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        title={
                          service.isActive ? "View Details" : "Unavailable"
                        }
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          }):<div className="text-center text-gray-500 text-sm">No rooms available</div>}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 flex items-center justify-center gap-4 opacity-70"
        >
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-ayuMid" />
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-ayuMid">
            Swagrama · Wellness Centre
          </span>
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-ayuMid" />
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
