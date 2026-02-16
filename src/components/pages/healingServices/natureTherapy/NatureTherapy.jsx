import {
  Air,
  BookOnline,
  FilterList,
  FitnessCenter,
  Grass,
  Pool,
  Spa,
} from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GiMountains } from "react-icons/gi";
import AirTherepayImg from "../../../assets/healingServices/natureTherapy/AirTherapy.png";
import OPDBookingModal from "../../opdBooking/OPDBookingModal";

const therapiesData = [
  {
    id: 1,
    category: "MudTherapy",
    icon: "Spa",
    nameEnglish: "स्वपुंस्मृत्तिकास्नान Male MudBath",
    room: "पुंस्मृत्तिकास्नानकक्ष Male Mud BathRoom",
    description: "Therapeutic male mud bath using mineral-rich soil.",
    benefits:
      "Detoxifies body, improves circulation, nourishes skin, relieves muscle tension.",
    price: "1000/1",
    priceRange: "750/2-5",
    bulkPrice: "500/5 or More",
    image:
      "https://img.freepik.com/free-photo/wellness-practices-self-care-world-health-day_23-2151256765.jpg?t=st=1768284672~exp=1768288272~hmac=38db3e4cbd3d333f5fd94680dc0011dd89579499b4352c2555d9efc2414c2a3a&w=1480",
  },
  {
    id: 2,
    category: "MudTherapy",
    icon: "Spa",
    nameEnglish: "स्वस्त्रीमृत्तिकास्नान Female Mud Bath",
    room: "स्त्रीमृत्तिकास्नानकक्ष Female Mud BathRoom",
    description: "Therapeutic female mud bath with rejuvenating soil therapy.",
    benefits:
      "Rejuvenates skin and body, relieves fatigue, detoxifies, improves vitality.",
    price: "1000/1",
    priceRange: "750/2-5",
    bulkPrice: "500/5 or More",
    image:
      "https://img.freepik.com/free-photo/view-ancient-pottery-vessels-earthenware_23-2151538250.jpg?t=st=1768285083~exp=1768288683~hmac=e714ed7a9837a3d71124aba6e0c4a3568bac1fd511aa3d1a5c3492e76bc337f4&w=1480",
  },
  {
    id: 3,
    category: "WaterTherapy",
    icon: "Pool",
    nameEnglish: "स्वजलतरणचिकित्सा Swimming Therapy",
    room: "जलतरणचिकित्साकूप Swimming Therapy Well",
    description: "Guided swimming sessions in clean water.",
    benefits:
      "Enhances flexibility, strengthens muscles, improves cardiovascular health, reduces stress.",
    price: "1000/1",
    priceRange: "750/2-5",
    bulkPrice: "500/5 or More",
    image:
      "https://img.freepik.com/premium-photo/top-view-ultimate-relaxation-man-relaxing-spa-pool-soaked-scents-fresh-flowers_955712-41623.jpg?w=1480",
  },
  {
    id: 4,
    category: "AirTherapy",
    icon: "Air",
    nameEnglish: "स्ववातातपिकरसायन Wind Sun Rejuvenation",
    room: "वातातपिकरसायनभूमि Wind Sun Rejuvenation Land",
    description:
      "व्यायाम, श्रम, कोष्णनिवास, उबदार पांघरून, उपवास, उष्ण सेवन, भय, क्रोध, लेपन, क्रिडा, आतप. Exposure to controlled wind and sun, combined with gentle exercise, labour, warm covering, fasting, warm intake, and physical therapy.",
    benefits:
      "Improves immunity, enhances energy, detoxifies body, strengthens metabolism.",
    price: "1000/1",
    priceRange: "750/2-5",
    bulkPrice: "500/5 or More",
    image: AirTherepayImg,
  },
  {
    id: 5,
    category: "PhysicalTherapy",
    icon: "FitnessCenter",
    nameEnglish: "स्वमल्लचिकित्सा Athletic Therapy",
    room: "मल्लचिकित्साभूमि Athletic Therapy Land",
    description: "Personalized athletic exercises and therapy.",
    benefits:
      "Builds strength, improves endurance, supports recovery, promotes overall fitness.",
    price: "1000/1",
    priceRange: "750/2-5",
    bulkPrice: "500/5 or More",
    image:
      "https://img.freepik.com/free-photo/side-view-man-relaxing-spa_23-2150911793.jpg?t=st=1768286560~exp=1768290160~hmac=70132af760bb9266d8de21d1ac305c6bc918590fe8a3614216f8fd978ab13743&w=1480",
  },
  {
    id: 6,
    category: "SoilTherapy",
    icon: "Grass",
    nameEnglish: "स्वउर्वराचिकित्सा Fertile Soil Therapy",
    room: "उर्वराचिकित्साभूमि Fertile Soil Therapy Land",
    description: "Walking or lying in fertile soil for therapeutic effects.",
    benefits:
      "Grounds body, improves circulation, detoxifies, enhances vitality and mental balance.",
    price: "1000/1",
    priceRange: "750/2-5",
    bulkPrice: "500/5 or More",
    image:
      "https://img.freepik.com/free-photo/high-angle-hand-holding-gardening-scoop_23-2149412606.jpg?t=st=1768286721~exp=1768290321~hmac=14de49a8a30b9f4d381bb3b03047725ed621b22e89baab75349a7427e6288dd8&w=1480",
  },
];
         
const categories = [
  { name: "मृत्तिकास्नान Mud Therapy", icon: Spa, value: "MudTherapy" },
  { name: "जलचिकित्सा Water Therapy", icon: Pool, value: "WaterTherapy" },
  { name: "वायुचिकित्सा Winds & Air Therapy", icon: Air, value: "AirTherapy" },
  { name: "व्यायामचिकित्सा Physical Therapy", icon: FitnessCenter, value: "PhysicalTherapy" },
  { name: "मृदचिकित्सा Soil Therapy", icon: Grass, value: "SoilTherapy" },
  { name: "All", icon: FilterList, value: "All" },
];

const getIcon = (iconName) => {
  const icons = {
    Spa: Spa,
    Pool: Pool,
    Air: Air,
    FitnessCenter: FitnessCenter,
    Grass: Grass,
  };
  const IconComponent = icons[iconName];
  return IconComponent ? <IconComponent /> : <Spa />;
};

export default function NatureTherapy() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredTherapies, setFilteredTherapies] = useState(therapiesData);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [selectedTherapy, setSelectedTherapy] = useState(null);

  const headerRef = useRef(null);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredTherapies(therapiesData);
    } else {
      setFilteredTherapies(
        therapiesData.filter((therapy) => therapy.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  const handleBooking = (therapy) => {
    setSelectedTherapy(therapy);
    setOpenBookingModal(true);
  };

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
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-green-700 text-2xl "
          >
            <GiMountains />
          </motion.span>
          &nbsp; नैसर्गचिकित्सा Nature Therapy &nbsp;
          <motion.span
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-green-700 text-2xl"
          >
            <GiMountains />
          </motion.span>
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
        <div className="bg-white rounded-xl shadow-lg border border-green-100 overflow-hidden">
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
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <motion.button
              key={category.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md ${
                selectedCategory === category.value
                  ? "bg-gradient-to-r from-green-600 to-lime-600 text-white shadow-lg"
                  : "bg-white text-green-800 border border-lime-300 hover:bg-green-50 hover:border-green-500"
              }`}
            >
              <IconComponent className="text-base" />
              <span className="text-xs md:text-sm">{category.name}</span>
            </motion.button>
          );
        })}
      </motion.div>
      {filteredTherapies.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredTherapies.map((therapy, index) => (
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
                  <div className="relative h-44 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      src={therapy.image}
                      alt={therapy.nameEnglish}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-3 left-3 
                        bg-green-500/25 
                        backdrop-blur-md 
                        WebkitBackdropFilter-[blur(12px)]
                        p-2.5 rounded-xl 
                        border border-white/30 
                        shadow-lg"
                    >
                      <span className="text-green-400 text-xl">
                        {getIcon(therapy.icon)}
                      </span>
                    </motion.div>
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
                        {therapy.nameEnglish}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-2.5">
                    <div className="bg-green-50 rounded-lg p-2">
                      <p className="text-xs text-green-900">
                        <span className="font-bold">Room :</span>
                        <span className="text-green-700 ml-1">
                          {therapy.room}
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
                          {therapy.benefits}
                        </span>
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-lg p-2.5 space-y-1.5 border border-green-100">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-green-900 font-semibold">
                          Single
                        </span>
                        <span className="text-green-900 font-bold">
                          ₹{therapy.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs border-t border-green-200 pt-1.5">
                        <span className="text-green-900 font-semibold">
                          2-5 People
                        </span>
                        <span className="text-green-900 font-bold">
                          ₹{therapy.priceRange}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs border-t border-green-200 pt-1.5">
                        <span className="text-green-900 font-semibold">
                          5+ People
                        </span>
                        <span className="text-green-900 font-bold">
                          ₹{therapy.bulkPrice}
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleBooking(therapy)}
                      className="w-full bg-gradient-to-r from-green-600 to-lime-600 text-white font-semibold text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 group-hover:from-green-700 group-hover:to-lime-700"
                    >
                      <BookOnline className="text-lg" />
                      Book Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
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
        <OPDBookingModal
          open={openBookingModal}
          handleClose={() => setOpenBookingModal(false)}
          therapy={selectedTherapy}
        />
      )}
    </div>
  );
}
