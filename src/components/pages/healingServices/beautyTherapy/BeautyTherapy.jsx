import { AnimatePresence, motion } from "framer-motion";
import {
  Flower2,
  Sparkles
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  GetDetoxTherapyByServiceCategory,
  GetTherapyNameByServiceCategory,
} from "../../../../services/healingServices/detoxTherapyServices/DetoxTherapyServices";
import BeutyMassageImg from "../../../assets/membership/healingServices/herbalMassage.webp";
import BeautyTherapyBookingModal from "./BeautyTherapyBookingModal";



const BeautyTherapy = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState({
    serviceGroupId: 0,
    serviceGroupName: "All",
  });

  const hasMore = count > services.length;

  const handleCategoryChange = (cat) => {
    if (cat.serviceGroupId === selectedCategory.serviceGroupId) return;
    setSelectedCategory(cat);
    setPage(1);
    setServices([]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const handleShowDetoxServices = () => {
    setIsLoading(true);
    GetTherapyNameByServiceCategory(
      5,
      selectedCategory.serviceGroupId,
      "Beauty Therapy",
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
          (item) => item.therapyType === "Beauty Therapy",
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
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-green-100">
      <header
        className="relative h-96 overflow-hidden"
        style={{
          backgroundImage: `url(${BeutyMassageImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 " />

        <div className="">
          <motion.div
            transition={{ duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 w-full
             bg-green-900/60 
             backdrop-blur-md 
             WebkitBackdropFilter-[blur(12px)]
             p-2.5  
             border border-emerald-700/40 
             shadow-lg text-center"
          >
            <h1 className="text-xl md:text-3xl font-semibold text-white mb-2">
              सौन्दर्यचिकित्सा Beauty Therapy
            </h1>
            <p className="text-sm md:text-base text-emerald-300">
              Ayurvedic Beauty Therapy – Radiance Rooted in Wellness : Natural
              treatments for timeless beauty
            </p>
          </motion.div>
        </div>
      </header>

      <div className="w-full mx-auto px-3 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <div className="backdrop-blur-md bg-green-900/50 border border-emerald-700/30 rounded-2xl p-3 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="text-emerald-100" size={20} />
              <h2 className="text-base font-semibold text-emerald-100">
                Select Category
              </h2>
            </div>

            <div className="grid  md:grid-cols-4 xl:flex xl:gap-0 xl space-x-3 gap-2">
              {serviceCategories?.length > 0 &&
                serviceCategories.map((cat) => {
                  const isSelected =
                    selectedCategory.serviceGroupId === cat.serviceGroupId;

                  return (
                    <motion.button
                      key={cat.serviceGroupId}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategoryChange(cat)}
                      className={`relative overflow-hidden rounded-xl p-3 transition-all ${
                        isSelected
                          ? "bg-white text-green-900 shadow-lg border border-white font-semibold"
                          : "backdrop-blur-sm bg-green-800/60 text-emerald-100 hover:bg-green-700/60 border border-emerald-600/30"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {cat.serviceGroupName}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
            </div>
          </div>
        </motion.div>

        <div className="mb-4 px-1">
          <p className="text-sm text-emerald-800">
            Showing {services.length} of {count} services
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 mb-6"
        >
          <AnimatePresence mode="popLayout">
            {services?.length > 0 &&
              services.map((service, index) => {
                // const Icon = service.icon;
                return (
                  <motion.div
                    key={`${service.serviceName}-${index}`}
                    variants={cardVariants}
                    layout
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group bg-white border border0 rounded-xl overflow-hidden shadow-md hover:shadow-xl  transition-all"
                  >
                    <div className="relative h-44 md:h-32 xl:h-44 overflow-hidden">
                      <img
                        src={service.serviceImage}
                        alt={service.serviceName}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* 
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-emerald-600/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                    >
                      <Icon className="text-white" size={16} />
                    </motion.div> */}
                    </div>

                    <div className="p-3">
                      <h3 className="text-sm font-semibold 2xl:text-lg text-emerald-800 mb-1 leading-tight line-clamp-2 py-1 ">
                        {service.serviceName}
                      </h3>

                      <p className="text-xs 2xl:text-sm  text-emerald-700 mb-1 line-clamp-2">
                        {service.description}
                      </p>

                      <div className="backdrop-blur-sm bg-lime-50 border border-emerald-800/50 rounded-lg p-2 mb-2">
                        <p className="text-xs 2xl:text-sm  text-lime-600 leading-snug line-clamp-2">
                          {service.uses}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedService(service);
                          setOpenModal(true);
                        }}
                        className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-medium py-2 rounded-lg shadow-sm hover:shadow-md hover:from-emerald-500 hover:to-green-500 transition-all"
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="text-center mb-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage((prev) => prev + 1)}
              disabled={isLoading}
              className="backdrop-blur-md bg-green-900/60 border border-emerald-700/50 text-emerald-200 px-5 py-2 rounded-xl font-medium text-sm shadow-md hover:shadow-lg hover:bg-green-800/70 transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "Load More"}
              {!isLoading && (
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Sparkles size={16} />
                </motion.div>
              )}
            </motion.button>
          </div>
        )}

        {services.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 backdrop-blur-md bg-green-900/60 border border-emerald-700/50 rounded-2xl"
          >
            <Flower2 className="text-emerald-600 mx-auto mb-3" size={48} />
            <h3 className="text-lg font-semibold text-emerald-200 mb-1">
              No services found
            </h3>
            <p className="text-sm text-emerald-400">Try a different category</p>
          </motion.div>
        )}
      </div>
      {openModal && (
        <BeautyTherapyBookingModal
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

export default BeautyTherapy;
