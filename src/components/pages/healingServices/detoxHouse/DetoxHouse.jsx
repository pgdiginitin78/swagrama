import ArrowForward from "@mui/icons-material/ArrowForward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import { Filter, Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { MdEco } from "react-icons/md";
import {
  GetDetoxTherapyByServiceCategory,
  GetTherapyNameByServiceCategory,
} from "../../../../services/healingServices/detoxTherapyServices/DetoxTherapyServices";
import DetoxMainImg from "../../../assets/healingServices/detoxTherapy/DetoxMainImg.webp";
import AutoTypingText from "../../../common/hooks/AutoTypeHook";
import BookTherapySession from "./BookTherapySession";

function ServiceCard({ item }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="h-full">
        <div className="group relative h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-green-100 flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-lime-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

          {item?.serviceImage ? (
            <div className="w-full h-72 md:h-56 2xl:h-56 overflow-hidden relative rounded-t-2xl flex-shrink-0">
              <img
                src={item.serviceImage}
                alt={item.serviceName}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none" />
            </div>
          ) : (
            <div className="w-full h-72 md:h-56 2xl:h-56 flex items-center justify-center bg-gradient-to-br from-[#2a5f46] via-[#4f8f73] relative rounded-t-2xl flex-shrink-0">
              <Leaf className="text-white drop-shadow-lg w-12 h-12" />
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          <div className="px-3 sm:px-4 pb-3 pt-2 flex flex-col flex-grow">
            <h3 className="text-xs sm:text-sm 2xl:text-base font-semibold text-green-800 mb-1.5 group-hover:text-green-700 transition-colors duration-300 leading-snug line-clamp-2">
              {item.serviceName}
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-2 flex-grow line-clamp-2">
              {Array.isArray(item.description)
                ? item.description[0]
                : item.description}
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-green-200 to-transparent mb-2.5" />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setModalOpen(true)}
                className="group/btn flex-shrink-0 flex items-center gap-1 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-white bg-[#4f8f73] rounded-lg transition-all duration-300 hover:bg-[#2a5f46] hover:shadow-md active:scale-95"
              >
                View Details
                <ArrowForward
                  className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
                  style={{ fontSize: 13 }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <BookTherapySession
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          item={item}
        />
      )}
    </>
  );
}

export default function DetoxHouse() {
  const [selectedCategory, setSelectedCategory] = useState({
    serviceGroupId: 0,
    serviceGroupName: "All",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const hasMore = count > services?.length;

  const handleCategoryChange = (cat) => {
    if (cat.serviceGroupId === selectedCategory.serviceGroupId) return;
    setSelectedCategory(cat);
    setPage(1);
    setServices([]);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleShowDetoxServices = () => {
    setIsLoading(true);
    GetTherapyNameByServiceCategory(
      5,
      selectedCategory.serviceGroupId,
      "Detox Therapy",
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
    setIsLoading(true);
    GetDetoxTherapyByServiceCategory(5)
      .then((res) => {
        const data = res?.data?.data.filter(
          (item) => item.therapyType === "Detox Therapy ",
        );
        setIsLoading(false);
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

  console.log(services, "services");

  return (
    <div className="min-h-screen pb-5 relative">
      <section
        className="relative overflow-hidden py-8 sm:py-10"
        style={{
          backgroundImage: `url(${DetoxMainImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="absolute inset-0 bg-black/45 backdrop-brightness-75" />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div
            className="mx-auto max-w-3xl
                    backdrop-blur-xl
                    bg-white/10
                    border border-white/20
                    shadow-2xl
                    rounded-2xl
                    px-5 sm:px-8 py-6 sm:py-8"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#e6c86e] font-serif text-xl sm:text-2xl md:text-3xl mb-3 drop-shadow-md"
            >
              पंचकर्म शोधन चिकित्सा सेवा
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#f1d77a] mb-4 drop-shadow-md"
            >
              Panchakarma Detox
              <span className="block mt-1">Therapy Services</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center gap-3 my-5 sm:my-7"
            >
              <div className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-[#e6c86e]" />
              <Leaf className="w-5 h-5 text-[#e6c86e]" />
              <div className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-[#e6c86e]" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed px-2 drop-shadow"
            >
              <AutoTypingText text="Experience the ancient wisdom of Ayurveda through our authentic Panchakarma treatments, designed to purify, rejuvenate, and restore balance to your body and mind." />
            </motion.p>
          </div>
        </div>
      </section>

      <div className="mx-auto px-3 sm:px-5 pt-4 sm:pt-5">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-md border border-[#567865]/25 p-3 sm:p-4 sticky top-14 sm:top-20 z-30">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-green-100 rounded-lg">
              <Filter className="w-3.5 h-3.5 text-[#1f4f3a]" />
            </div>
            <span className="font-semibold text-[#1f4f3a] text-sm sm:text-base">
              Filter by Category
            </span>
            <span className="ml-auto text-xs text-green-700 font-medium bg-green-100 px-2 py-0.5 rounded-full">
              {serviceCategories?.length} service
              {serviceCategories?.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {serviceCategories?.length > 0 &&
              serviceCategories?.map((cat) => {
                // const Icon = cat.icon;
                const isActive =
                  selectedCategory.serviceGroupId === cat.serviceGroupId;
                return (
                  <button
                    key={cat.serviceGroupId}
                    onClick={() => handleCategoryChange(cat)}
                    className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 active:scale-95 ${
                      isActive
                        ? "bg-gradient-to-r from-[#1f4f3a] to-[#4b8b6a] text-white shadow-md scale-[1.02]"
                        : "bg-[#e8f4f0] text-[#1f4f3a] hover:bg-[#d4ebe3] border border-[#1f4f3a]/30"
                    }`}
                  >
                    {/* <Icon
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 ${isActive ? "text-[#e5c76a]" : "text-[#1f4f3a]"}`}
                  /> */}
                    <span className="whitespace-nowrap">
                      {cat.serviceGroupName}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      <div className="relative z-10 px-3 sm:px-5 lg:px-6 mt-4 sm:mt-5">
        {services.length === 0 ? (
          <div className="text-center py-20 text-green-800 text-base font-medium">
            No services found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8">
            {services?.length > 0 &&
              services?.map((item, i) => (
                <ServiceCard key={item.serviceId || i} item={item} />
              ))}
          </div>
        )}

        {hasMore && (
          <div className="text-center pb-4">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="group relative mx-auto flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#1f4f3a] via-[#4b8b6a] to-[#1f4f3a] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {isLoading ? (
                <>
                  <span className="relative w-3.5 h-3.5 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                  <span className="relative">Loading...</span>
                </>
              ) : (
                <>
                  <span className="relative">
                    Load More ({count - services?.length}
                    remaining)
                  </span>
                  <ExpandMoreIcon
                    className="relative transition-transform duration-300 group-hover:translate-y-0.5"
                    style={{ fontSize: 18 }}
                  />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-4 border-t-2 border-green-200/50 text-center px-4">
        <p className="text-gray-700 font-semibold flex items-center justify-center gap-2 text-xs sm:text-sm">
          <MdEco
            className="text-green-700 flex-shrink-0"
            style={{ fontSize: 16 }}
          />
          Authentic Ayurvedic treatments by experienced practitioners
        </p>
      </div>
    </div>
  );
}
