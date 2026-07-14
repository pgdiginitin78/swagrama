import FilterList from "@mui/icons-material/FilterList";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  GetDetoxTherapyByServiceCategory,
  GetTherapyNameByServiceCategory,
} from "../../../../services/healingServices/detoxTherapyServices/DetoxTherapyServices";
import NatureTherapyBookingModal from "./NatureTherapyBookingModal";

const NATURE_THERAPY_PRICE_MAP = {
  114: { single: 400, group: 200, bulk: 100 },
  168: { single: 400, group: 300, bulk: 200 },
  111: { single: 750, group: 500, bulk: 250 },
  110: { single: 750, group: 500, bulk: 250 },
  115: { single: 400, group: 200, bulk: 100 },
  112: { single: 400, group: 200, bulk: 100 },
  113: { single: 750, group: 500, bulk: 250 },
};

const getTherapyPricing = (therapy) => {
  const mapped = NATURE_THERAPY_PRICE_MAP[therapy?.serviceId];
  if (mapped) return mapped;

  const base = therapy?.charges || 0;
  return {
    single: base,
    group: Math.round(base * 0.5),
    bulk: Math.round(base * 0.25),
  };
};

export default function NatureTherapy() {
  const [selectedCategory, setSelectedCategory] = useState({
    serviceGroupId: 0,
    serviceGroupName: "All",
  });

  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = count > services.length;

  const handleCategoryChange = (cat) => {
    if (cat.serviceGroupId === selectedCategory.serviceGroupId) return;
    setSelectedCategory(cat);
    setPage(1);
    setServices([]);
  };

  const headerRef = useRef(null);

  const handleBooking = (therapy) => {
    setSelectedTherapy(therapy);
    setOpenBookingModal(true);
  };

  const handleShowDetoxServices = () => {
    setIsLoading(true);
    GetTherapyNameByServiceCategory(
      5,
      selectedCategory.serviceGroupId,
      "Nature Therapy",
      page,
      10,
    )
      .then((res) => {
        const responseData = res?.data?.data;
        if (responseData) {
          const newServices = responseData.data || [];
          if (page === 1) {
            setServices(newServices);
          } else {
            setServices((prev) => [...prev, ...newServices]);
          }
          setCount(responseData.totalRecords || 0);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    GetDetoxTherapyByServiceCategory(5)
      .then((res) => {
        const data = res?.data?.data.filter(
          (item) => item.therapyType === "Nature Therapy",
        );
        if (data?.length) {
          setServiceCategories([
            {
              serviceGroupId: 0,
              serviceGroupName: "All",
            },
            ...data.map((d) => ({
              serviceGroupId: d?.serviceGroupId,
              serviceGroupName: d?.serviceGroupName,
            })),
          ]);
        }
      })
      .catch((err) => err);
  }, []);

  useEffect(() => {
    if (selectedCategory !== null && selectedCategory !== undefined) {
      handleShowDetoxServices();
    }
  }, [selectedCategory, page]);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      <div ref={headerRef} className="text-center pt-6 pb-4 px-4">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl md:text-3xl flex space-x-2 justify-center items-center font-bold tracking-wide text-center 
          bg-gradient-to-r from-green-600 via-lime-600 to-green-600
          bg-clip-text text-transparent pt-2 "
        >
          &nbsp; नैसर्गचिकित्सा Nature Therapy &nbsp;
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xs md:text-sm text-green-700 font-medium max-w-4xl mx-auto"
        >
          Nature's Embrace: Grounded Healing, Natural Renewal.
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-5xl mx-auto px-4 pb-8"
      >
        <div className="rounded-xl shadow-lg border border-green-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-lime-600 px-4 py-3">
            <h3 className="text-white font-bold text-sm md:text-base text-center">
              Available Time Slots - 1 Hr Sessions
            </h3>
            <p className="text-white/90 text-xs text-center mt-1">
              Nature's Embrace: Grounded Healing, Natural Renewal
            </p>
          </div>

          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {[
              "06:00 AM to 07:00 AM",
              "07:00 AM to 09:00 AM: Agnihotra and Morning Meal Break",
              "09:00 AM to 10:00 AM",
              "10:00 AM to 11:00 AM",
              "11:00 AM to 12:00 PM",
              "12:00 PM to 01:00 PM",
              "01:00 PM to 02:00 PM",
              "02:00 PM to 03:00 PM",
              "03:00 PM to 04:00 PM",
              "04:00 PM to 05:00 PM",
              "05:00 PM to 07:00 PM: Agnihotra & Evening Meal Break",
            ].map((slot, index) => {
              const isBreakTime = slot.includes("Agnihotra");

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className={`
                    rounded-lg p-2.5 text-center transition-all duration-200 cursor-pointer
                    ${
                      isBreakTime
                        ? "bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 hover:border-orange-400"
                        : "bg-gradient-to-br from-green-50 to-lime-50 border border-green-200 hover:border-green-400"
                    }
                  `}
                >
                  <p
                    className={`text-xs font-semibold leading-relaxed ${
                      isBreakTime ? "text-orange-800" : "text-green-800"
                    }`}
                  >
                    {slot}
                  </p>
                </motion.div>
              );
            })}
          </div>
          <div className="bg-green-50 px-4 py-2 border-t border-green-100">
            <p className="text-xs text-green-700 text-center">
              💚 Book your preferred slot for a rejuvenating nature therapy
              experience
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 px-4"
      >
        {serviceCategories?.length > 0 &&
          serviceCategories.map((category, index) => {
            return (
              <motion.button
                key={category.serviceGroupId}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange(category)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md ${
                  selectedCategory.serviceGroupId === category.serviceGroupId
                    ? "bg-gradient-to-r from-green-600 to-lime-600 text-white shadow-lg"
                    : "bg-white text-green-800 border border-lime-300 hover:bg-green-50 hover:border-green-500"
                }`}
              >
                <span className="text-xs md:text-sm">
                  {category.serviceGroupName}
                </span>
              </motion.button>
            );
          })}
      </motion.div>

      {services.length > 0 ? (
        <div className="w-full mx-auto px-4 pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {services.map((therapy, index) => {
                const pricing = getTherapyPricing(therapy);

                return (
                  <motion.div
                    key={therapy.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100 hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="relative h-56 2xl:h-64 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        src={therapy.serviceImage}
                        alt={therapy.serviceName}
                        className="w-full h-full object-cover"
                      />

                      <div
                        className="
                          absolute bottom-0 left-0 right-0
                          p-3 text-center
                          bg-white/25
                          backdrop-blur-md backdrop-saturate-150
                          border-t border-white/30
                        "
                      >
                        <h3 className="text-white font-bold text-sm leading-tight drop-shadow-lg">
                          {therapy.serviceName}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4 space-y-2.5">
                      <div className="bg-green-50 rounded-lg p-2">
                        <p className="text-xs text-green-900">
                          <span className="font-bold">Room :</span>
                          <span className="text-green-700 ml-1">
                            {therapy.roomNames}
                          </span>
                        </p>
                      </div>
                      <div className="bg-lime-50 rounded-lg p-2">
                        <p className="text-xs text-green-900 line-clamp-2">
                          <span className="font-bold">Description :</span>
                          <span className="text-green-700 ml-1">
                            {therapy.description}
                          </span>
                        </p>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-2">
                        <p className="text-xs text-green-900 line-clamp-2">
                          <span className="font-bold">Benefits :</span>
                          <span className="text-green-700 ml-1">
                            {therapy.uses}
                          </span>
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-lg p-2.5 space-y-1.5 border border-green-100">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-green-900 font-semibold">
                            Single
                          </span>
                          <span className="text-green-900 font-bold">
                            ₹ {pricing.single}/1
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs border-t border-green-200 pt-1.5">
                          <span className="text-green-900 font-semibold">
                            2-5 People
                          </span>
                          <span className="text-green-900 font-bold">
                            ₹ {pricing.group}/2-5
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs border-t border-green-200 pt-1.5">
                          <span className="text-green-900 font-semibold">
                            5+ People
                          </span>
                          <span className="text-green-900 font-bold">
                            ₹ {pricing.bulk}/5 or More
                          </span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                          handleBooking({ ...therapy, pricing })
                        }
                        className="w-full bg-gradient-to-r from-green-600 to-lime-600 text-white font-semibold text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 group-hover:from-green-700 group-hover:to-lime-700"
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {hasMore && (
            <div className="text-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage((prev) => prev + 1)}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-600 to-lime-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <FilterList className="text-lg" />
                )}
                {isLoading
                  ? "Loading..."
                  : `Load More (${count - services.length} remaining)`}
              </motion.button>
            </div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl text-green-600 mb-4 inline-block"
          >
            <FilterList />
          </motion.div>
          <p className="text-xl text-green-800 font-bold">
            No therapies found in this category
          </p>
          <p className="text-sm text-green-600 mt-2">
            Try selecting a different category
          </p>
        </motion.div>
      )}

      {openBookingModal && (
        <NatureTherapyBookingModal
          open={openBookingModal}
          handleClose={() => setOpenBookingModal(false)}
          therapy={selectedTherapy}
        />
      )}
    </div>
  );
}