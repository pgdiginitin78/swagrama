import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Brush,
  Circle,
  CloudRain,
  Droplets,
  Feather,
  Flower,
  Flower2,
  Gift,
  Heart,
  Hexagon,
  Leaf,
  Moon,
  Package,
  Palette,
  ShowerHead,
  Sparkles,
  Sprout,
  Star,
  Sun,
  User,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import ScalpConditionerImg from "../../../assets/healingServices/beuty-therapy/ScalpConditioner.png";
import BeutyMassageImg from "../../../assets/membership/healingServices/herbalMassage.jpg";
import BookEventForm from "../../bookEventForm/BookEventForm";

const beautyData = [
  // Beautiful Hair
  {
    category: "beautifulHair",
    serviceName: "केशत्वग्रक्षा Scalp Care",
    description: "Scalp care treatment",
    benefits: "Nourishes scalp, strengthens hair, promotes shine",
    icon: Flower2,
    price: 2300,
    image:
      "https://img.freepik.com/free-photo/top-view-selection-fine-powders-bowls-with-scoops-stones_23-2148774958.jpg?t=st=1768297984~exp=1768301584~hmac=5bc3640dd2d58ae0db6d2492f4cd7a10082d00b59a0258837dd183e0dcc08647&w=1480", // Scalp massage
  },
  {
    category: "beautifulHair",
    serviceName: "केशत्वग्भ्यङ्ग Scalp Oil",
    description: "Oil application to scalp",
    benefits: "Reduces dryness and dandruff",
    icon: Droplets,
    price: 2300,
    image:
      "https://img.freepik.com/free-photo/applying-hair-serum-with-dropper_23-2151982967.jpg?t=st=1768297906~exp=1768301506~hmac=6787c953376e51b8d9a29fcdeef6707c8561d2f017bdb22fcf5bbc6af3c9b8d8&w=1480", // Hair oil
  },
  {
    category: "beautifulHair",
    serviceName: "केशत्वग्लेपन Scalp Mask",
    description: "Herbal scalp mask",
    benefits: "Promotes hair strength, reduces hair fall",
    icon: Leaf,
    price: 2300,
    image:
      "https://img.freepik.com/free-photo/top-view-oil-facial-mask_23-2148678039.jpg?t=st=1768297874~exp=1768301474~hmac=73c81846ef92c70f1190c6fea5b6852fb55100f908a2fd1f9aa457257a4371cd&w=1480", // Hair mask treatment
  },
  {
    category: "beautifulHair",
    serviceName: "केशत्वग्संवाहक Scalp Shampooer",
    description: "Specialized shampooing",
    benefits: "Deeply nourishes scalp, enhances texture",
    icon: ShowerHead,
    price: 2300,
    image:
      "https://img.freepik.com/free-photo/elegant-skin-care-banner-design_23-2149480187.jpg?t=st=1768297796~exp=1768301396~hmac=b134a5a1297c9d539aa24757a6b63aff880956fafde10945505381e16b272a4d&w=1480", // Hair washing
  },
  {
    category: "beautifulHair",
    serviceName: "केशत्वग्नुकूलक Scalp Conditioner",
    description: "Scalp conditioning",
    benefits: "Softens hair, reduces tangles, adds shine",
    icon: Waves,
    image: ScalpConditionerImg,
  },
  {
    category: "beautifulHair",
    serviceName: "केशरक्षा Hair Care",
    description: "Complete hair protection",
    benefits: "Improves health, prevents breakage",
    icon: Sprout,
    price: 1500,
    image:
      "https://img.freepik.com/free-photo/spa-still-life-with-beauty-products_23-2148201389.jpg?t=st=1768297679~exp=1768301279~hmac=32ec5414a1c49264f3f3e946147bc83203a4b8ba6ada32f85d17e7261470bce4&w=1480", // Hair care
  },
  {
    category: "beautifulHair",
    serviceName: "केशतैलाभ्यङ्ग Hair Oil Unguent",
    description: "Hair oil massage",
    benefits: "Strengthens follicles, nourishes scalp",
    icon: Sun,
    price: 1500,
    image:
      "https://img.freepik.com/free-photo/white-towel-avocado-little-glass-bottle-wooden-comb-hair-lie-wooden-table_8353-7042.jpg?t=st=1768297621~exp=1768301221~hmac=b93b8c7932f64058fba4f31cda04d36d91667ae2b842b40c4d26670b5f23918d&w=1480", // Hair oil massage
  },
  {
    category: "beautifulHair",
    serviceName: "केशलेपन Hair Mask",
    description: "Hair mask application",
    benefits: "Repairs damaged hair, adds moisture",
    icon: Flower,
    price: 1500,
    image:
      "https://media.istockphoto.com/id/1317940904/photo/yellow-vanilla-face-mask-in-the-small-white-jar-natural-skin-and-hair-care-concept-top-view.jpg?s=612x612&w=0&k=20&c=wcTiUFAmDWzPW_QbyRE96_-Hse9sP0EDqNcBy4zYogE=", // Hair mask
  },
  {
    category: "beautifulHair",
    serviceName: "केशसंवाहक Hair Shampooer",
    description: "Hair cleansing",
    benefits: "Deep cleaning, removes excess oil",
    icon: CloudRain,
    price: 1500,
    image:
      "https://img.freepik.com/free-photo/organic-cosmetic-product-with-dreamy-aesthetic-fresh-background_23-2151382830.jpg?t=st=1768298098~exp=1768301698~hmac=6b51347a29f5d3f8cae4a89b6628988646563857d0c43da17489f7b486a680fa&w=1480", // Shampoo
  },
  {
    category: "beautifulHair",
    serviceName: "केशानुकूलक Hair Conditioner ",
    description: "Hair conditioning",
    benefits: "Smoothens and protects hair",
    icon: Wind,
    price: 1500,
    image:
      "https://img.freepik.com/free-photo/arranged-olive-coconut-oils-products-composition_23-2148337438.jpg?t=st=1768298155~exp=1768301755~hmac=17a5e92bbf9705699674afe9dcfb69e49a74fceae31e86e0a2c8bf1959c8332f&w=1480", // Conditioner application
  },
  {
    category: "beautifulHair",
    serviceName: "केशरङ्ग Hair Dye",
    description: "Hair coloring",
    benefits: "Enhances color, hides grays",
    price: 1000,
    icon: Palette,
    image:
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&q=80", // Hair coloring
  },
  {
    category: "beautifulHair",
    serviceName: "रक्तगर्भमेन्धिका Red Henna",
    description: "Red henna hair dye",
    benefits: "Natural coloring, conditions hair",
    icon: Heart,
    price: 1000,
    image:
      "https://5.imimg.com/data5/SELLER/Default/2022/12/TT/OA/MN/225978/burgundy-henna-hair-dye-color.jpg", // Henna powder
  },
  {
    category: "beautifulHair",
    serviceName: "कृष्णमेन्धिका Black Henna",
    description: "Black henna hair dye",
    benefits: "Adds black shade, strengthens hair",
    icon: Moon,
    price: 1000,
    image:
      "https://media.istockphoto.com/id/1270260103/photo/woman-hairdresser-applying-dye-to-old-man-hair-beauty-and-people-concept-close-up.jpg?s=612x612&w=0&k=20&c=FGe3FDXl6HFbBK1tFMTvLyjx19emS_eC02FZNjJqhGc=", // Black henna
  },
  // Graceful Women
  {
    category: "gracefulWomen",
    serviceName: "वदनधावन Face Cleansing",
    description: "Facial cleansing",
    benefits: "Removes dirt and impurities, refreshes skin",
    icon: Sparkles,
    price: 2500,
    image:
      "https://img.freepik.com/free-photo/profile-view-young-man-getting-moisturizing-facial-treatment-health-spa_662251-2552.jpg?t=st=1769504219~exp=1769507819~hmac=91c7a8e491d90c09cffd4bbb899a8e1764258f1d038032c90f45b876bcbb827e&w=1480", // Face cleansing
  },
  {
    category: "gracefulWomen",
    serviceName: "वदनअवघर्षण Face Scrubbing",
    description: "Facial exfoliation",
    benefits: "Deep cleans pores, removes dead skin",
    icon: Circle,
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80", // Face scrubbing
  },
  {
    category: "gracefulWomen",
    serviceName: "वदनबाष्पक Face Steaming",
    description: "Facial steaming",
    benefits: "Opens pores, improves circulation",
    icon: Wind,
    price: 2500,
    image:
      "https://media.istockphoto.com/id/1143640491/photo/beauty-treatment-of-face-with-ozone-facial-steamer-in-beauty-center-beaultiful-blonde-girl.jpg?s=612x612&w=0&k=20&c=W1pCM8c4zyjkLvVwcsvUpyH3oLO6Eh70vufsoG-ny2A=", // Face steaming
  },
  {
    category: "gracefulWomen",
    serviceName: "वदनबन्ध Face Pack",
    description: "Facial pack application",
    benefits: "Nourishes skin, improves tone",
    icon: Flower2,
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80", // Face mask
  },
  {
    category: "gracefulWomen",
    serviceName: "वदनभ्यङ्ग Face Unguent",
    description: "Face massage with oil",
    benefits: "Relieves tension, promotes healthy skin",
    icon: Sun,
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80", // Face massage
  },
  {
    category: "gracefulWomen",
    serviceName: "वदनवर्ण्य Face Powder",
    description: "Face powder application",
    benefits: "Enhances complexion, mattifies skin",
    icon: Star,
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80", // Face powder
  },
  {
    category: "gracefulWomen",
    serviceName: "Body Skin Cleansing",
    description: "Full body cleansing",
    benefits: "Removes impurities, softens skin",
    icon: ShowerHead,
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&q=80", // Body cleansing
  },
  {
    category: "gracefulWomen",
    serviceName: "Body Skin Scrubbing",
    description: "Body scrubbing",
    benefits: "Exfoliates dead cells, improves texture",
    icon: Feather,
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80", // Body scrub
  },
  {
    category: "gracefulWomen",
    serviceName: "Body Skin Steaming",
    description: "Body steaming",
    benefits: "Opens pores, detoxifies, relaxes",
    icon: CloudRain,
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80", // Steam room
  },
  {
    category: "gracefulWomen",
    serviceName: "Body Skin Pack",
    description: "Body pack application",
    benefits: "Rejuvenates skin, hydrates",
    icon: Gift,
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80", // Body treatment
  },
  {
    category: "gracefulWomen",
    serviceName: "Body Skin Unguent",
    description: "Oil massage for body",
    benefits: "Nourishes skin and muscles",
    icon: Droplets,
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80", // Body massage oil
  },
  {
    category: "gracefulWomen",
    serviceName: "Body Skin Unguent Bath",
    description: "Oil bath therapy",
    benefits: "Deep hydration, full body nourishment",
    icon: Waves,
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80", // Oil bath
  },
  {
    category: "gracefulWomen",
    serviceName: "Body Skin Powder",
    description: "Body powder application",
    benefits: "Absorbs excess oil, softens skin",
    icon: Sparkles,
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1526045478516-99145907023c?w=400&q=80", // Body powder
  },

  // Graceful Men
  {
    category: "gracefulMen",
    serviceName: "वदनधावन Face Cleansing",
    description: "Facial cleansing",
    benefits: "Removes dirt and impurities",
    icon: Zap,
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80", // Men face cleansing
  },
  {
    category: "gracefulMen",
    serviceName: "वदनअवघर्षण Face Scrubbing",
    description: "Facial exfoliation",
    benefits: "Deep cleans pores, removes dead skin",
    icon: Hexagon,
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1621607003960-46c1c0b88c8d?w=400&q=80", // Men face scrub
  },
  {
    category: "gracefulMen",
    serviceName: "वदनबाष्पक Face Steaming",
    description: "Facial steaming",
    benefits: "Opens pores, improves circulation",
    icon: Wind,
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1485875437342-9b39470b3d95?w=400&q=80", // Men face steam
  },
  {
    category: "gracefulMen",
    serviceName: "वदनबन्ध Face Pack",
    description: "Facial pack application",
    benefits: "Nourishes skin, improves tone",
    icon: Leaf,
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&q=80", // Men face pack
  },
  {
    category: "gracefulMen",
    serviceName: "वदनभ्यङ्ग Face Unguent",
    description: "Face massage with oil",
    benefits: "Relieves tension, healthy skin",
    icon: Sun,
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1498843053639-170ff2122f35?w=400&q=80", // Men face massage
  },
  {
    category: "gracefulMen",
    serviceName: "वदनवर्ण्य Face Powder",
    description: "Face powder application",
    benefits: "Enhances complexion, mattifies",
    icon: Award,
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80", // Men grooming
  },
  {
    category: "gracefulMen",
    serviceName: "कायातनुत्वग्धावन Body Skin Cleansing",
    description: "Full body cleansing",
    benefits: "Removes impurities, softens skin",
    icon: ShowerHead,
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=400&q=80", // Men body wash
  },
  {
    category: "gracefulMen",
    serviceName: "कायातनुत्वग्वघर्षण Body Skin Scrubbing",
    description: "Body scrubbing",
    benefits: "Exfoliates dead cells",
    icon: Brush,
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80", // Men body scrub
  },
  {
    category: "gracefulMen",
    serviceName: "कायातनुत्वग्बाष्पक Body Skin Steaming",
    description: "Body steaming",
    benefits: "Opens pores, detoxifies",
    icon: CloudRain,
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&q=80", // Steam sauna
  },
  {
    category: "gracefulMen",
    serviceName: "कायातनुत्वग्बन्ध Body Skin Pack",
    description: "Body pack application",
    benefits: "Rejuvenates skin, hydrates",
    icon: Package,
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&q=80", // Body treatment men
  },
  {
    category: "gracefulMen",
    serviceName: "कायातनुत्वग्भ्यङ्ग Body Skin Unguent",
    description: "Oil massage for body",
    benefits: "Nourishes skin and muscles",
    icon: Droplets,
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80", // Body massage
  },
  {
    category: "gracefulMen",
    serviceName: "कायातनुत्वग्भ्यङ्गस्नान Body Skin Unguent Bath",
    description: "Oil bath therapy",
    benefits: "Deep hydration, relaxation",
    icon: Waves,
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80", // Oil bath
  },
  {
    category: "gracefulMen",
    serviceName: "कायातनुत्वग्वर्ण्य Body Skin Powder",
    description: "Body powder application",
    benefits: "Absorbs excess oil",
    icon: Star,
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1526045478516-99145907023c?w=400&q=80", // Body powder
  },
];

const BeautyTherapyCompact = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const categories = [
    {
      key: "beautifulHair",
      label: "स्त्रीकेशरक्षा Female Hair Care",
      icon: Feather,
    },
    { key: "beautifulHair", label: "पुंकेशरक्षा Male Hair Care", icon: Flower2 },
    { key: "gracefulWomen", label: "स्त्रीरक्षा Women Care", icon: Flower2 },
    { key: "gracefulMen", label: "पुंस्रक्षा Men Care", icon: User },
    { key: "All", label: "All Services", icon: Sparkles },
  ];



  const filteredServices = beautyData.filter((service) => {
    return selectedCategory === "All" || service.category === selectedCategory;
  });

  const displayedServices = filteredServices.slice(0, displayCount);
  const hasMore = displayCount < filteredServices.length;

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

    useEffect(() => {
    setDisplayCount(10);
  }, [selectedCategory]);

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

      <div className="max-w-7xl mx-auto px-3 py-6">
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

            <div className="grid grid-cols-2 md:grid-cols-4 xl:flex xl:gap-0 xl space-x-3 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.key;

                return (
                  <motion.button
                    key={cat.key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`relative overflow-hidden rounded-xl p-3 transition-all ${
                      isSelected
                        ? "bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-md border border-emerald-500"
                        : "backdrop-blur-sm bg-green-800/50 text-emerald-200 hover:bg-green-800/70 border border-emerald-700/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={18} />
                      <span className="text-sm font-medium">{cat.label}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="mb-4 px-1">
          <p className="text-sm text-emerald-800">
            Showing {displayedServices.length} of {filteredServices.length}{" "}
            services
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-6"
        >
          <AnimatePresence mode="popLayout">
            {displayedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={`${service.serviceName}-${index}`}
                  variants={cardVariants}
                  layout
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group bg-white border border0 rounded-xl overflow-hidden shadow-md hover:shadow-xl  transition-all"
                >
                  <div className="relative h-44 md:h-32 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.serviceName}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-emerald-600/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
                    >
                      <Icon className="text-white" size={16} />
                    </motion.div>
                  </div>

                  <div className="p-3">
                    <h3 className="text-sm font-medium text-emerald-800 mb-1 leading-tight line-clamp-2 py-1 ">
                      {service.serviceName}
                    </h3>

                    <p className="text-xs text-emerald-700 mb-1 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="backdrop-blur-sm bg-lime-50 border border-emerald-800/50 rounded-lg p-2 mb-2">
                      <p className="text-xs text-lime-600 leading-snug line-clamp-2">
                        {service.benefits}
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
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDisplayCount((prev) => prev + 12)}
              className="backdrop-blur-md bg-green-900/60 border border-emerald-700/50 text-emerald-200 px-5 py-2 rounded-xl font-medium text-sm shadow-md hover:shadow-lg hover:bg-green-800/70 transition-all flex items-center gap-2 mx-auto"
            >
              Load More
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Sparkles size={16} />
              </motion.div>
            </motion.button>
          </div>
        )}

        {filteredServices.length === 0 && (
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
        <BookEventForm
          open={openModal}
          handleClose={() => {
            setOpenModal(false);
            setSelectedService(false);
          }}
          eventDetails={selectedService}
        />
      )}
    </div>
  );
};

export default BeautyTherapyCompact;
