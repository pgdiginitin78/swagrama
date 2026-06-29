import { Skeleton } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, Leaf, Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllSeasonSpicesImage from "../../assets/eshop/All Season Spices.webp";
import AllSeasonTeaImage from "../../assets/eshop/All Season Tea.webp";
import AsafoetidaHerbsImage from "../../assets/eshop/Asafoetida 8 Herbs.webp";
import BabyHerbsImage from "../../assets/eshop/Baby Herb.webp";
import BarleriaOilImage from "../../assets/eshop/Barleria Oil.webp";
import BetelLeafPortionImage from "../../assets/eshop/Betel Leaf Portion.webp";
import BlackHennaImage from "../../assets/eshop/Black Henna.webp";
import BlackSaltImage from "../../assets/eshop/Black Salt.webp";
import CaneSyrupImage from "../../assets/eshop/Cane Syrup.webp";
import CoconutChutneyImage from "../../assets/eshop/Coconut Chutney.webp";
import CoconutOilImage from "../../assets/eshop/Coconut Oil_Bottle clear pharma grade bottle.webp";
import CowDungImage from "../../assets/eshop/Cow Dung.webp";
import CowHerbsGheeImage from "../../assets/eshop/Cow Herbs Ghee.webp";
import CowNectorImage from "../../assets/eshop/Cow Nector.webp";
import CrackCreamImage from "../../assets/eshop/Crack Cream.webp";
import CurryLeavesChutneyImage from "../../assets/eshop/Curry Leaves Chutney.webp";
import DandruffOilImage from "../../assets/eshop/Dandruff Oil.webp";
import DandruffWashImage from "../../assets/eshop/Dandruff Wash.webp";
import DesiRiceFlourLDEImage from "../../assets/eshop/Desi Rice Flour LDE.webp";
import DesiRiceImage from "../../assets/eshop/Desi Rice.webp";
import DriedGrapeRaisinsImage from "../../assets/eshop/Dried Grape Raisins.webp";
import EarthwormFertilizerImage from "../../assets/eshop/Earthworm Fertilizer.webp";
import EasyDigestiveTonicImage from "../../assets/eshop/Easy Digestive Tonic.webp";
import FairFacePackImage from "../../assets/eshop/Fair Face Pack.webp";
import FemaleAnaemiaImage from "../../assets/eshop/Female Anaemia.webp";
import FemaleEnergyImage from "../../assets/eshop/Female Energy.webp";
import FeverGargleImage from "../../assets/eshop/Fever Gargle.webp";
import FlaxseedChutneyImage from "../../assets/eshop/Flaxseed Chutney.webp";
import FlaxseedsOilImage from "../../assets/eshop/Flaxseeds Oil.webp";
import FractureOilTel from "../../assets/eshop/Fracture Oil Tel.webp";
import GarlicGingerChutneyImage from "../../assets/eshop/Garlic Ginger Chutney.webp";
import GoutOilImage from "../../assets/eshop/Gout Oil.webp";
import GreenTeaImage from "../../assets/eshop/Green Tea.webp";
import HairGrowOilImage from "../../assets/eshop/Hair Grow Oil.webp";
import HairShampooerImage from "../../assets/eshop/Hair Shampooer.webp";
import HoneyImage from "../../assets/eshop/Honey.webp";
import HorseGramFlourImage from "../../assets/eshop/Horse Gram Flour.webp";
import HundredFoldPureGhee from "../../assets/eshop/Hundred Fold Pure Ghee.webp";
import JowarSorghumFlourPouchImage from "../../assets/eshop/Jowar Sorghum Flour Pouch.webp";
import KhapliEmmerWheatFlourImage from "../../assets/eshop/Khapli Emmer Wheat Flour.webp";
import KhapliGahuLapsiImage from "../../assets/eshop/Khapli Emmwr Wheat Porridge.webp";
import LemonGrassFreshImage from "../../assets/eshop/Lemon Grass Fresh.webp";
import LemonGrassPowderImage from "../../assets/eshop/Lemon Grass powder.webp";
import LimeWaterImage from "../../assets/eshop/Lime Water.webp";
import LiverTonicImage from "../../assets/eshop/Liver Tonic.webp";
import MaizeCornPorridgeImage from "../../assets/eshop/Maize-Corn Porridge.webp";
import MouthPurityFragranceImage from "../../assets/eshop/Mouth Purity Fragrance Aroma Antidote.webp";
import NectorDropDrink from "../../assets/eshop/Nector Drop Drink.webp";
import NectorVaporInhailationImage from "../../assets/eshop/Nector Vapor Inhailation.webp";
import NeemSeedOilImage from "../../assets/eshop/Neem Seed Oil.webp";
import NerveMuscleNourishOilImage from "../../assets/eshop/Neuro Muscular Oil.webp";
import NeuroMuscularImage from "../../assets/eshop/NeuroMuscular.webp";
import NigerSeedsChutney from "../../assets/eshop/Niger Seeds Chutney.webp";
import NigerSeedsOilBottleImage from "../../assets/eshop/Niger Seeds Oil  Bottle clear pharma grade bottle.webp";
import NourishingDrinkImage from "../../assets/eshop/Nourishing Drink.webp";
import NourishingSweetmeatImage from "../../assets/eshop/Nourishing Sweetmeat.webp";
import PainReliefOilImage from "../../assets/eshop/Pain Relief Oil.webp";
import PeanutChutneyImage from "../../assets/eshop/Peanut Chutney.webp";
import PeanutOilBottleImage from "../../assets/eshop/Peanut Oil Bottle.webp";
import PearlMilletFlourImage from "../../assets/eshop/PearlMilletFlour.webp";
import PleasurePurginImage from "../../assets/eshop/Pleasure Purgin.webp";
import PsoraleaSeedOilImage from "../../assets/eshop/Psoralea Seed oil.webp";
import PsoriaOilImage from "../../assets/eshop/Psoria Oil.webp";
import PureDesiJaggeryImage from "../../assets/eshop/Pure Desi Jaggery.webp";
import RawSeaSaltImage from "../../assets/eshop/Raw Sea Salt.webp";
import RedChilliPowderImage from "../../assets/eshop/Red Chilly.webp";
import RedHeenaImage from "../../assets/eshop/Red Heena.webp";
import ReumaticOilImage from "../../assets/eshop/Reumatic Oil.webp";
import ReumatoidOilImage from "../../assets/eshop/Reumatoid Oil.webp";
import RockSaltBottleImage from "../../assets/eshop/Rock Salt _Bottle.webp";
import RockSugarPowderImage from "../../assets/eshop/Rock Sugar Powder.webp";
import RockSugarImage from "../../assets/eshop/Rock Sugar.webp";
import RosePetalJamImage from "../../assets/eshop/Rose Petal Jam.webp";
import SafflowerOilImage from "../../assets/eshop/Safflower Oil.webp";
import SeaSaltImage from "../../assets/eshop/Sea Salt Powder.webp";
import SesameChutneyImage from "../../assets/eshop/Sesame Chutney.webp";
import SesameOilBottleImage from "../../assets/eshop/Sesame Oil _Bottle clear pharma grade bottle.webp";
import SharbatMasala from "../../assets/eshop/Sharbat Masala Ashtalavanapetva Nectar.webp";
import SixHerbalInfusionImage from "../../assets/eshop/Six Herbal Infusion.webp";
import SkinOilImage from "../../assets/eshop/Skin Oil.webp";
import SkinTonicImage from "../../assets/eshop/Skin Tonic.webp";
import SpiceDrinkIamge from "../../assets/eshop/Spice Drink.webp";
import StrengtheningOilImage from "../../assets/eshop/Strengthening Oil.webp";
import SulphurEssenceImage from "../../assets/eshop/SulphurEssence.webp";
import SunflowerOilBottleImage from "../../assets/eshop/Sunflower Oil_Bottle clear pharma grade.webp";
import TherapeuticOilImage from "../../assets/eshop/Therapeutic Oil.webp";
import UnguentBathImage from "../../assets/eshop/Unguent Bath.webp";
import UnguentOilImage from "../../assets/eshop/Unguent Oil.webp";
import VaginalHealthOilImage from "../../assets/eshop/Vaginal Health Oil.webp";
import VaraiMilletImage from "../../assets/eshop/Varai Millet.webp";
import WholesomeSpicesImage from "../../assets/eshop/Wholesome Spices.webp";
import WoundCleanerOilImage from "../../assets/eshop/Wound Cleaner Oil.webp";
import WoundHealingOilImage from "../../assets/eshop/Wound Healing oil.webp";
import SafflowerCakeImage from "../../assets/eshop/करडई पेंड.webp";
import NigerSeedsCakeImage from "../../assets/eshop/कारळे पेंड.webp";
import FlaxseedPendImage from "../../assets/eshop/जवस पेंड.webp";
import SesameCakeImage from "../../assets/eshop/तीळ पेंड.webp";
import राणप्राशावलेहVitalElectuaryimage from "../../assets/eshop/राणप्राशावलेह Vital Electuary.webp";
import PeanutCakeImage from "../../assets/eshop/शेंगदाणा पेंड.webp";
import SunflowerSeedCakeImage from "../../assets/eshop/सूर्यफूल पेंड.webp";
import ProductDetailsModal from "./ProductDetailsModal";
import BathPowder from "./productImages/Bath Powder.webp";

const getAllProducts = () => {
  const allProducts = [];

  medicineProducts.forEach((item) => {
    if (item.products && Array.isArray(item.products)) {
      item.products.forEach((product) => {
        if (product.id && product.name && product.value !== null) {
          allProducts.push({
            ...product,
            category: item.category,
            categoryDescription: item.categoryDescription,
          });
        }
      });
    } else if (item.id && item.name && item.value !== null) {
      allProducts.push(item);
    }
  });

  console.log(
    `=== getAllProducts: Found ${allProducts.length} total products ===`,
  );
  const categoryCounts = {};
  allProducts.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });
  console.log("Products per category:", categoryCounts);

  return allProducts;
};

const ProductCardSkeleton = ({ index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="bg-gradient-to-br from-lime-50 to-green-50 rounded-xl overflow-hidden shadow-md p-3 h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-2">
        <Skeleton
          variant="rounded"
          width={80}
          height={24}
          sx={{ bgcolor: "rgba(22, 163, 74, 0.1)" }}
        />
        <Skeleton
          variant="circular"
          width={16}
          height={16}
          sx={{ bgcolor: "rgba(22, 163, 74, 0.1)" }}
        />
      </div>

      <Skeleton
        variant="text"
        height={20}
        sx={{ bgcolor: "rgba(22, 163, 74, 0.1)", mb: 1 }}
      />
      <Skeleton
        variant="text"
        width="80%"
        height={16}
        sx={{ bgcolor: "rgba(22, 163, 74, 0.1)", mb: 2 }}
      />

      <div className="space-y-1 mb-2">
        <Skeleton
          variant="text"
          height={14}
          sx={{ bgcolor: "rgba(22, 163, 74, 0.1)" }}
        />
        <Skeleton
          variant="text"
          height={14}
          sx={{ bgcolor: "rgba(22, 163, 74, 0.1)" }}
        />
      </div>

      <div className="border-t border-green-200 py-1.5">
        <div className="flex items-center justify-between">
          <Skeleton
            variant="text"
            width={80}
            height={32}
            sx={{ bgcolor: "rgba(22, 163, 74, 0.1)" }}
          />
          <Skeleton
            variant="rounded"
            width={70}
            height={32}
            sx={{ bgcolor: "rgba(22, 163, 74, 0.1)" }}
          />
        </div>
      </div>

      <div className="border-t border-green-200 pt-2">
        <Skeleton
          variant="text"
          width={100}
          height={14}
          sx={{ bgcolor: "rgba(22, 163, 74, 0.1)", mb: 1 }}
        />
        <Skeleton
          variant="text"
          height={12}
          sx={{ bgcolor: "rgba(22, 163, 74, 0.1)" }}
        />
        <Skeleton
          variant="text"
          height={12}
          width="90%"
          sx={{ bgcolor: "rgba(22, 163, 74, 0.1)" }}
        />
      </div>
    </motion.div>
  );
};

const LazyProductCard = ({ product, index, onOpenModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            setTimeout(() => {
              setIsLoaded(true);
            }, 300);
          }
        });
      },
      {
        rootMargin: "100px",
        threshold: 0.01,
      },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div ref={cardRef} className="h-full">
      {isVisible && isLoaded ? (
        <ProductCard
          product={product}
          index={index}
          onOpenModal={onOpenModal}
        />
      ) : (
        <ProductCardSkeleton index={index} />
      )}
    </div>
  );
};

const ProductCard = ({ product, index, onOpenModal }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="group relative bg-gradient-to-br from-lime-50 to-green-50 rounded-xl overflow-hidden border border-green-100 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col h-full"
    >
      <div className="w-full aspect-square overflow-hidden relative flex-shrink-0 bg-green-50">
        {product?.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        )}

        <div
          className="w-full h-full items-center justify-center"
          style={{ display: product?.image ? "none" : "flex" }}
        >
          <Leaf className="w-10 h-10 text-green-300 opacity-50" />
        </div>

        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
          <Leaf className="w-3.5 h-3.5 text-green-600" />
        </div>
      </div>

      <div className="px-3 pt-2 pb-0 flex flex-col flex-1">
        <motion.h3
          className="text-sm font-bold 2xl:text-[12px] text-green-900 mb-2 line-clamp-2 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {product.name}
        </motion.h3>
      </div>

      <div className="border-t border-green-200 px-3 py-2 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(product);
          }}
          className="bg-gradient-to-r from-green-600 to-lime-600 text-white px-3 py-1.5 rounded font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-xs"
        >
          Read More
        </motion.button>
      </div>
    </motion.div>
  );
};

const EShop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [isDesktop, setIsDesktop] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const allProducts = useMemo(() => getAllProducts(), []);

  const categories = useMemo(() => {
    const categorySet = new Set();
    allProducts.forEach((product) => {
      if (product.category) {
        categorySet.add(product.category);
      }
    });
    const uniqueCategories = [...Array.from(categorySet).sort(), "All"];
    console.log(
      `Total categories found: ${uniqueCategories.length}`,
      uniqueCategories,
    );
    return uniqueCategories;
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    console.log("=== FILTERING PRODUCTS ===");
    console.log("Search Query:", searchQuery);
    console.log("Selected Category:", selectedCategory);
    console.log("Price Range:", priceRange);

    let filtered = allProducts.filter((product) => {
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch =
        searchLower === "" ||
        (product.name ?? "").toLowerCase().includes(searchLower) ||
        (product.tagline ?? "").toLowerCase().includes(searchLower) ||
        (product.ingredients ?? "").toLowerCase().includes(searchLower) ||
        (product.category ?? "").toLowerCase().includes(searchLower) ||
        (Array.isArray(product.benefits) &&
          product.benefits.some((b) =>
            (b ?? "").toLowerCase().includes(searchLower),
          ));

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesPrice =
        product.value >= priceRange[0] && product.value <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price-low") return a.value - b.value;
      if (sortBy === "price-high") return b.value - a.value;
      return 0;
    });

    console.log(`Filtered results: ${filtered.length} products`);
    return filtered;
  }, [allProducts, searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-green-100 w-full ">
      <h1
        className="text-center pt-5 text-2xl font-semibold 
                    text-transparent bg-clip-text 
                    bg-gradient-to-r from-green-600 via-lime-500 to-green-600
                    drop-shadow-[0_1px_6px_rgba(34,197,94,0.35)]"
      >
        स्वविपणि Shop
      </h1>
      <div className=" mx-auto px-2 sm:px-4 xl:px-12 py-4 sm:py-6 w-full">
        <div className="lg:hidden mb-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-white rounded-lg shadow-md p-3 flex items-center justify-between text-green-900 font-semibold text-sm"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters & Search
            </span>
            {showFilters ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <AnimatePresence>
            {(showFilters || isDesktop) && (
              <motion.aside
                initial={isDesktop ? false : { x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={isDesktop ? false : { x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`${isDesktop ? "sticky top-4 w-72" : "fixed inset-0 w-full"
                  } bg-white rounded-none lg:rounded-xl shadow-xl p-4 ${isDesktop ? "h-fit" : "h-screen overflow-y-auto"
                  } z-50 lg:z-0`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-green-900 bg-lime-100 rounded-lg px-2 py-1 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-green-600 p-1.5 hover:bg-green-50 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-3 text-center">
                  {isInitialLoading ? (
                    <Skeleton
                      variant="rounded"
                      width={120}
                      height={24}
                      sx={{
                        bgcolor: "rgba(22, 163, 74, 0.1)",
                        margin: "0 auto",
                      }}
                    />
                  ) : (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {filteredProducts.length} of {allProducts.length} products
                    </span>
                  )}
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-lg text-sm text-green-900 placeholder-green-500 outline-none ring-2 ring-lime-400 focus:ring-green-600 shadow transition-all"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-green-800 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 text-sm border-2 border-green-200 rounded-lg outline-none text-green-900 bg-green-50 focus:border-green-600 transition-all cursor-pointer"
                  >
                    <option value="name">Name (A-Z)</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-green-800 mb-2">
                    Category
                  </label>
                  <div className="space-y-1.5 max-h-64 overflow-y-auto no-scrollbar pr-2">
                    {isInitialLoading
                      ? Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton
                          key={i}
                          variant="rounded"
                          height={36}
                          sx={{ bgcolor: "rgba(22, 163, 74, 0.1)" }}
                        />
                      ))
                      : categories.map((cat) => (
                        <motion.button
                          key={cat}
                          whileHover={{ x: 3 }}
                          onClick={() => {
                            setSelectedCategory(cat);
                            if (!isDesktop) {
                              setShowFilters(false);
                            }
                          }}
                          className={`w-full text-left p-2 rounded-lg transition-all duration-300 text-xs ${selectedCategory === cat
                            ? "bg-gradient-to-r from-green-600 to-lime-600 text-white shadow-md"
                            : "bg-green-50 text-green-800 hover:bg-green-100"
                            }`}
                        >
                          {cat}
                        </motion.button>
                      ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedCategory("All");
                    setPriceRange([0, 2000]);
                    setSearchQuery("");
                    setSortBy("name");
                  }}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm"
                >
                  Reset Filters
                </motion.button>
              </motion.aside>
            )}
          </AnimatePresence>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              {isInitialLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3"
                >
                  {Array.from({ length: 9 }).map((_, index) => (
                    <ProductCardSkeleton key={index} index={index} />
                  ))}
                </motion.div>
              ) : filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-xl shadow-xl p-8 text-center"
                >
                  <Leaf className="w-20 h-20 text-green-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    No Products Found
                  </h3>
                  <p className="text-sm text-green-600">
                    Try adjusting your filters or search query
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className="grid  md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4"
                >
                  {filteredProducts.map((product, index) => (
                    <LazyProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      onOpenModal={handleOpenModal}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ProductDetailsModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default EShop;

const medicineProducts = [
  {
    category: "पाकशालाभोजनतत्व Kitchen Meal Essentials",
    categoryDescription:
      "Home Made products for Home : Kitchen & Meal Essentials",
    products: [
      {
        id: 1,
        name: "शुद्ध गूळ -- स्वविमलगुड Pure Desi Jaggery",
        tagline: "Nutritional sweetness from naturally grown sugarcane",
        benefits: [
          "Alternative for white sugar",
          "Provides natural energy quickly",
          "Improves digestion and gut health",
          "Boosts immunity and overall vitality",
          "Supports milk production and quality",
          "Acts as a natural detoxifier",
        ],
        ingredients: "Sugar Cane (Saccharum officinarum)",
        package: "1 kg Pouch",
        value: 280,
        image: PureDesiJaggeryImage
      },
      {
        id: 2,
        name: "शेंदेमीठ -- सैन्धवलवण Rock Salt",
        tagline: "Just a pinch means food with medicine & taste with health",
        benefits: [
          "Improves digestion & metabolic rate",
          "Alternative to regular salt",
        ],
        ingredients: "Halite / Sodium Chloride (NaCl)",
        package: "250 gms Pouch",
        value: 120,
        image: RockSaltBottleImage
      },
      {
        id: 46,
        name: "नैसर्गिक समुद्री मीठ Raw Sea Salt",
        tagline: "Unrefined • Mineral Rich • Naturally Harvested",
        benefits: [
          "Naturally rich in essential trace minerals",
          "Enhances the natural flavor of food",
          "Less processed than refined table salt",
          "Ideal for everyday cooking and seasoning"
        ],
        ingredients: "100% Natural Raw Sea Salt. No additives, anti-caking agents, preservatives, or chemicals.",
        package: "500 gms Pouch",
        value: 120,
        image: RawSeaSaltImage,
      },
      {
        id: 3,
        name: "आबाईचा तिखट मसाला: सर्वर्तुसम्बार All Season Spices",
        tagline: "A complete Indian spice for all seasons & kitchens",
        benefits: [
          "Perfect for daily use in any recipe",
          "Enhance taste and aroma of food naturally",
          "Support digestion and metabolism year-round",
          "Boost immunity and protect against seasonal illnesses",
        ],
        ingredients:
          "6 types of Red Chillis, Coriander, Coconut, Sesame seeds, Salt, Spices",
        package: "1 kg Pouch",
        value: 450,
        image: AllSeasonSpicesImage
      },
      {
        id: 32,
        name: "विडा -- ताम्बूलविडा Betel Leaf Portion",
        tagline: "Mouth freshener & digestive",
        benefits: ["Improves digestion", "Cleanses oral cavity"],
        ingredients:
          "Betel Leaves, Lime, Catechu Betel Leaf, Lime, Catechu, Betel Nut, Cardamom, Cloves, Fennel, Coconut, Nutmeg, Jeshthmadh, Camphor, Kankol, Saffron, Poppy Seeds",
        package: "100 gms Pouch",
        value: 120,
        image: BetelLeafPortionImage
      },
      {
        id: 4,
        name: "तीळ तेल -- तिलतैल Sesame Oil",
        tagline: "Intake in the cold. Apply year-round",
        benefits: ["Best cooking oil in winter", "Multiple external benefits"],
        ingredients: "Sesamum indicum Seed Oil",
        package: "1 litre Bottle",
        value: 550,
        image: SesameOilBottleImage
      },
      {
        id: 470,
        name: "शेंगदाणा तेल Peanut Oil",
        tagline: "Cold Pressed • Chemical Free • Premium Quality",
        benefits: [
          "Rich, in healthy fats and Vitamin E",
          "Suitable for everyday cooking and frying",
          "Supports heart health when used as part of a balanced diet",
          "Naturally retains the aroma and nutrients of peanuts"
        ],
        ingredients: "100% Cold Pressed Peanut Oil. No preservatives, additives, or chemicals.",
        package: "100 ml Bottle",
        value: 200,
        image: PeanutOilBottleImage,
      },
      {
        id: 5,
        name: "खपली गहू पीठ -- स्वगोधूमपिष्टम् Emmer Wheat Flour",
        tagline: "Traditional whole wheat flour",
        benefits: [
          "Rich in protein, fiber, and essential minerals",
          "Low glycemic index - helps regulate blood sugar",
          "Easier to digest than modern wheat",
        ],
        ingredients: "Triticum dicoccum Schrank",
        package: "1 kg Pouch",
        value: 200,
        image: KhapliEmmerWheatFlourImage
      },
      {
        id: 52,
        name: "ज्वारी पीठ Sorghum Flour",
        tagline: "Stone Milled • Gluten Free • Naturally Nutritious",
        benefits: [
          "Naturally gluten free",
          "Rich in dietary fiber for healthy digestion",
          "A good source of essential nutrients and antioxidants",
          "Ideal for making soft rotis and other traditional recipes"
        ],
        ingredients: "100% Stone Milled Jowar (Sorghum). No preservatives, additives, or artificial ingredients.",
        package: "500 gms Pouch",
        value: 150,
        image: JowarSorghumFlourPouchImage,
      },
      {
        id: 505,
        name: "बाजरी पीठ Pearl Millet Flour",
        tagline: "Stone Milled • Naturally Nutritious • Premium Quality",
        benefits: [
          "Rich in dietary fiber for healthy digestion",
          "A good source of protein and essential minerals",
          "Provides sustained energy throughout the day",
          "Ideal for making nutritious bhakri, rotis, and traditional recipes"
        ],
        ingredients: "100% Stone Milled Pearl Millet (Bajra). No preservatives, additives, or artificial ingredients.",
        package: "500 gms Pouch",
        value: 160,
        image: PearlMilletFlourImage,
      },
      {
        id: 511,
        name: "खापली गहू लापशी Godhuma Lapsika (Khapli Wheat Porridge)",
        tagline: "Traditional • Wholesome • Stone Milled",
        benefits: [
          "Rich in dietary fiber for better digestion",
          "Provides sustained energy throughout the day",
          "Naturally nutritious and wholesome",
          "Ideal for breakfast and healthy meals"
        ],
        ingredients: "100% Stone Milled Khapli (Emmer) Wheat. No preservatives, additives, or artificial ingredients.",
        package: "500 gms Pouch",
        value: 180,
        image: KhapliGahuLapsiImage,
      },
      {
        id: 29,
        name: "व्यञ्जनपत्रउपसेचन Curry Leaves Chutney",
        tagline: "Flavorful & healthy",
        benefits: ["Enhances taste", "Digestive benefits"],
        ingredients: "Curry Leaves, Spices",
        package: "100 gms Pouch",
        value: 120,
        image: CurryLeavesChutneyImage
      },
      {
        id: 30,
        name: "लशुनार्द्रकउपसेचन Garlic Ginger Chutney",
        tagline: "Immunity booster",
        benefits: ["Supports digestion & immunity", "Enhances flavor"],
        ingredients: "Garlic, Ginger, Spices",
        package: "100 gms Pouch",
        value: 130,
        image: GarlicGingerChutneyImage
      },
      {
        id: 31,
        name: "सरबत मसाला - अष्टलवणपेत्व Nectar",
        tagline: "Refreshing beverage mix",
        benefits: ["Adds taste & health to drinks"],
        ingredients: "8 salts & spices",
        package: "100 gms Pouch",
        value: 140,
        image: SharbatMasala
      },
      {
        id: 47,
        name: "शतावरीकल्प : शतवीर्याकल्प Female Energy",
        tagline: "Herbal formulation for women",
        benefits: [
          "Supports lactation, menstrual regulation",
          "Fertility & stress management",
          "Antioxidant; adaptogen",
        ],
        ingredients:
          "Shatavari (Asparagus racemosus), Saffron, Cardamom, Sugar",
        package: "250 gms Pouch",
        value: 220,
        image: FemaleEnergyImage,
      },
      {
        id: 19,
        name: "जवस तैल - अतसीतैल Flaxseeds Oil",
        tagline: "Rich omega-3 oil",
        benefits: [
          "Improves heart health",
          "Anti-inflammatory",
          "Supports skin & hair",
        ],
        ingredients: "Linum usitatissimum Linn. Seeds Oil",
        package: "500 ml Bottle",
        value: 400,
        image: FlaxseedsOilImage
      },
      {
        id: 20,
        name: "करडई तैल -- कुसुम्भतैल safflower Oil",
        tagline: "Light, versatile cooking oil",
        benefits: [
          "Supports cardiovascular health",
          "High in unsaturated fats",
        ],
        ingredients: "Carthamus tinctorius Linn. Seeds Oil",
        package: "500 ml Bottle",
        value: 350,
        image: SafflowerOilImage
      },
      {
        id: 21,
        name: "मकाकण्या : वरेणुकमलाप्सिका Maize-Corn Porridge",
        tagline: "Traditional maize porridge",
        benefits: ["Easily digestible", "Energy booster", "Good for all ages"],
        ingredients: "Zea mays Linn.",
        package: "500 gms Pouch",
        value: 200,
        image: MaizeCornPorridgeImage
      },
      {
        id: 22,
        name: "भगरभात: वरई Japanese Millet",
        tagline: "Nutrient-rich millet porridge",
        benefits: [
          "Supports digestion",
          "Gluten-free",
          "Rich in fiber and minerals",
        ],
        ingredients: "Panicum sumatrense Roth ex Roem. & Schult.",
        package: "500 gms Pouch",
        value: 220,
        image: VaraiMilletImage
      },
      {
        id: 23,
        name: "कुळीथ पीठ : कुलत्थपिष्टम् Horse Gram Flour",
        tagline: "Protein-rich flour",
        benefits: [
          "Strengthens muscles",
          "Aids digestion",
          "Suitable for weight management",
        ],
        ingredients: "Macrotyloma uniflorum",
        package: "500 gms Pouch",
        value: 180,
        image: HorseGramFlourImage
      },
    ],
  },
  {
    category: "आहारोषधिरसायन Dietic Herbal Rejuvenation",
    categoryDescription:
      "Healer Made products - Food supplements and wholesome diet",
    products: [
      {
        id: 6,
        name: "मध -- स्वक्षौद्रमधु Honey",
        tagline: "Natural sweetener & medicine",
        benefits: [
          "Supports immunity, digestion & overall health",
          "Natural antibiotic & antiseptic",
          "Relieves fever & cough",
        ],
        ingredients: "Apis cerana indica Honey",
        package: "100 ml Bottle",
        value: 180,
        image: HoneyImage,
      },
      {
        id: 24,
        name: "तिलउपसेचन Sesame Chutney",
        tagline: "Nutritional chutney",
        benefits: ["Supports digestion", "Boosts energy & taste"],
        ingredients: "Sesame seeds, Salt, Spices",
        package: "100 gms Pouch",
        value: 120,
        image: SesameChutneyImage
      },
      {
        id: 25,
        name: "कलायउपसेचन Peanut Chutney",
        tagline: "Protein-rich chutney",
        benefits: ["Enhances taste & nutrition"],
        ingredients: "Peanuts, Salt, Spices",
        package: "100 gms Pouch",
        value: 120,
        image: PeanutChutneyImage
      },
      {
        id: 26,
        name: "नारिकेलउपसेचन Coconut Chutney",
        tagline: "Flavorful & healthy",
        benefits: ["Supports digestion", "Rich in nutrients"],
        ingredients: "Coconut, Salt, Spices",
        package: "100 gms Pouch",
        value: 120,
        image: CoconutChutneyImage
      },
      {
        id: 26,
        name: "Coconut Oil",
        tagline: "Cold Pressed Coconut Oil",
        benefits: ["Supports digestion", "Rich in nutrients", "Good for hair & skin"],
        ingredients: "Coconut",
        package: "100 ml Bottle",
        value: 120,
        image: CoconutOilImage
      },
      {
        id: 27,
        name: "कारळे चटणी -- खुरसणीउपसेचन Niger Seeds Chutney",
        tagline: "Bitter-nutritive chutney",
        benefits: ["Supports metabolism", "Digestive aid"],
        ingredients: "Niger Seeds, Spices",
        package: "100 gms Pouch",
        value: 130,
        image: NigerSeedsChutney
      },
      {
        id: 28,
        name: "जवस चटणी -- अतसी Flaxseed Chutney",
        tagline: "Omega-3 rich chutney",
        benefits: ["Supports heart health & digestion"],
        ingredients: "Flaxseeds, Spices",
        package: "100 gms Pouch",
        value: 130,
        image: FlaxseedChutneyImage
      },
      {
        id: 45,
        name: "लाल तिखट Red Chilli Powder",
        tagline: "Pure • Freshly Ground • No Artificial Colors",
        benefits: [
          "Adds rich color and authentic spicy flavor to dishes",
          "Made from carefully selected premium red chillies",
          "Free from artificial colors, preservatives, and additives",
          "Ideal for daily cooking and traditional Indian recipes"
        ],
        ingredients: "100% Pure Red Chillies. No artificial colors, preservatives, or additives.",
        package: "100 gms Pouch",
        value: 120,
        image: RedChilliPowderImage,
      }
    ],
  },
  {
    category: "आहारोषधिरसायन Dietic Herbal Rejuvenation",
    categoryDescription:
      "Healer Made products for counter preparations by Family, Farmer & Vaidya",
    products: [
      {
        id: 33,
        name: "खडीसाखर -- स्वखण्डशर्करा Candied Sugar",
        tagline: "Best अनुपान (Fluid Vehicle) for most medicines",
        benefits: [
          "Energy booster",
          "Improves fertility",
          "Relieves fever, cough & sore throat",
        ],
        ingredients: "Sugar Cane (Saccharum officinarum), Rock Sugar",
        package: "250 gms Pouch",
        value: 180,
        image: RockSugarImage,
      },
      {
        id: 34,
        name: "खडीसाखरचूर्ण -स्वखण्डशर्कराचूर्ण Candied Sugar Powder",
        tagline: "Uppermost medicinal sweetener",
        benefits: [
          "Energy booster",
          "Improves fertility",
          "Relieves fever, cough & sore throat",
        ],
        ingredients: "Sugar Cane (Saccharum officinarum), Rock Sugar",
        package: "250 gms Pouch",
        value: 180,
        image: RockSugarPowderImage,
      },
      {
        id: 530,
        name: "देशी तांदूळ Desi Rice",
        tagline: "Traditional • Naturally Grown • Wholesome",
        benefits: [
          "Naturally rich in nutrients and energy",
          "Easy to digest and suitable for daily meals",
          "Supports a balanced and healthy diet",
          "Ideal for traditional Indian recipes"
        ],
        ingredients: "100% Naturally Grown Desi Rice. No preservatives, additives, or artificial polishing.",
        package: "1 kg Pouch",
        value: 180,
        image: DesiRiceImage,
      },
      {
        id: 54,
        name: "देशी तांदूळ पीठ Desi Rice Flour",
        tagline: "Stone Milled • Naturally Nutritious • Premium Quality",
        benefits: [
          "Made from naturally grown desi rice",
          "Easy to digest and suitable for everyday cooking",
          "Ideal for rotis, bhakri, dosa, idli, and traditional recipes",
          "Free from preservatives and artificial additives"
        ],
        ingredients: "100% Stone Milled Desi Rice. No preservatives, additives, or artificial ingredients.",
        package: "500 gms LDE Pack",
        value: 150,
        image: DesiRiceFlourLDEImage,
      },
      {
        id: 36,
        name: "काकवी : स्वमत्स्यण्डिका Cane Syrup",
        tagline: "Naturally nurturing liquid sweetener",
        benefits: [
          "Alternative for white sugar",
          "Supports energy & digestion",
        ],
        ingredients: "Sugar Cane (Saccharum officinarum)",
        package: "500 gms Container",
        value: 250,
        image: CaneSyrupImage,
      },
      {
        id: 37,
        name: "ओषधिमसाले -- निरामयसम्बार Wholesome Spices",
        tagline: "Ayurveda-inspired spice blend",
        benefits: [
          "Enhances taste, appetite & supports digestive health",
          "Reverses pathology; enhances taste & appetite",
          "Supports health in acute & chronic conditions",
        ],
        ingredients:
          "Blend of herbs & spices 30+ types, 6 types of Red Chillis, 2 Salts",
        package: "250 gms Pouch",
        value: 180,
        image: WholesomeSpicesImage,
      },
      {
        id: 38,
        name: "गवतीचहा -- अतिगन्ध Lemon Grass ताजा गड्डी",
        tagline: "Great culinary and medicinal",
        benefits: [
          "Pain relief",
          "Anti-inflammatory",
          "Digestive aid",
          "Antibacterial & antioxidant",
          "Aroma for insect repellent",
        ],
        ingredients: "Cymbopogon citratus",
        package: "गड्डी",
        value: 150,
        image: LemonGrassFreshImage,
      },
      {
        id: 39,
        name: "गवतीचहा -- अतिगन्ध Lemon Grass चूर्ण",
        tagline: "Culinary & medicinal tea ingredient",
        benefits: [
          "Pain relief",
          "Anti-inflammatory",
          "Digestive aid",
          "Antibacterial & antioxidant",
        ],
        ingredients: "Cymbopogon citratus",
        package: "250 gm Pouch",
        value: 180,
        image: LemonGrassPowderImage,
      },
      {
        id: 40,
        name: "रोजचा चहा -- सर्वर्तुचाया All Season Tea",
        tagline: "Tea with flavour & health",
        benefits: [
          "Reduce tea addiction",
          "Add health to daily life",
          "Antioxidant",
          "Supports digestion & immunity",
        ],
        ingredients:
          "Camellia sinensis, Ginger, Coriander, Fennel, Black Pepper, Cinnamon, Liquorice",
        package: "250 gms Pouch",
        value: 160,
        image: AllSeasonTeaImage
      },
      {
        id: 41,
        name: "ग्रीन चहा : हरिचाया Green Tea",
        tagline: "Herbal drink",
        benefits: [
          "Alternative to tea",
          "Obesity control",
          "Anticancer",
          "Antioxidant",
          "Antimicrobial",
        ],
        ingredients:
          "Camellia sinensis, Ginger, Coriander, Fennel, Black Pepper",
        package: "250 gm Pouch",
        value: 350,
        image: GreenTeaImage
      },
      {
        id: 42,
        name: "पोषण पेय -- पुष्टिपेय Nourishing Drink",
        tagline: "No tea, no masala, only nourishment",
        benefits: [
          "Nourishment for body, skin, hair",
          "Supports cardiac health",
        ],
        ingredients:
          "Arjuna, Manjistha, Anantmool, Lodhra, Dry Ginger, Cardamom",
        package: "250 gms Pouch",
        value: 170,
        image: NourishingDrinkImage,
      },
      {
        id: 43,
        name: "वनौषधि पाणी : षडङ्गपानीय Six Herbs Infusion",
        tagline: "Think Fever, Think Six Herbs Infusion",
        benefits: ["Fever relief", "Detoxifying", "Supports immunity"],
        ingredients: "Musta, Parpatak, Usheera, Chandana, Uddichya, Nagar",
        package: "100 gms Pouch",
        value: 140,
        image: SixHerbalInfusionImage,
      },
      {
        id: 44,
        name: "काळेमीठ पादेलोण : सौवर्चललवण Black Salt",
        tagline: "Enhances smell, taste & health",
        benefits: [
          "Essential minerals; aids digestion",
          "Reduces bloating; supports heart health",
        ],
        ingredients: "Sodium Chloride, Iron sulfide, Sulfur compounds",
        package: "100 gms Pouch",
        value: 120,
        image: BlackSaltImage,
      },
      {
        id: 44,
        name: "समुद्री मीठ पावडर Sea Salt Powder",
        tagline: "Natural • Mineral Rich • Chemical Free",
        benefits: [
          "Naturally contains essential trace minerals",
          "Enhances the taste of food",
          "Suitable for everyday cooking and seasoning",
          "Less processed than refined table salt"
        ],
        ingredients: "100% Natural Sea Salt. No additives, anti-caking agents, or preservatives.",
        package: "100 gms Pouch",
        value: 120,
        image: SeaSaltImage,
      },
      {
        id: 45,
        name: "मिरचीरहित चटणी : हिङ्ग्वष्टकुपसेचन Asafoetida 8 Herbs Chutney",
        tagline: "Keeps daily indigestion away",
        benefits: [
          "Improves digestion; enhances appetite",
          "Good for joint health & RA",
        ],
        ingredients:
          "Asafoetida, Black Salt, Cumin, Black Pepper, Long Pepper, Dry Ginger, Ajwain, Cow Ghee",
        package: "100 gms Pouch",
        value: 130,
        image: AsafoetidaHerbsImage,
      },
      {
        id: 46,
        name: "विडा मसाला : मुखसुवासशुद्धि Mouth Purity Fragrance",
        tagline: "Herbal mouth freshener",
        benefits: [
          "Cleanses mouth; enhances oral hygiene",
          "Improves digestion; helps control diabetes",
        ],
        ingredients: "Betel, Cloves, Cardamom, Fennel, Nutmeg",
        package: "100 gms Pouch",
        value: 150,
        image: MouthPurityFragranceImage,
      },

      {
        id: 48,
        name: "च्यवनप्राशावलेह Vital Electuary",
        tagline: "Complete rejuvenation for daily health",
        benefits: [
          "Boosts immunity",
          "Anti-aging",
          "Digestion",
          "Respiratory & heart health",
          "Energy & stamina",
          "Brain function",
        ],
        ingredients:
          "Amalaki, Ashwagandha, Shatavari, Ghee, Honey, 40+ Herbs & Spices",
        package: "500 gms Container",
        value: 750,
        image: राणप्राशावलेहVitalElectuaryimage
      },
      {
        id: 49,
        name: "गुलकंद Rose Petal",
        tagline: "Relax in summer with super cool",
        benefits: [
          "Cooling effect",
          "Antacid",
          "Boosts energy",
          "Supports skin, stress relief",
          "Memory & menstrual health",
        ],
        ingredients: "Fresh Rose Petals, Rock Sugar, Cardamom",
        package: "500 gms Container",
        value: 600,
        image: RosePetalJamImage,
      },
      {
        id: 50,
        name: "प्राणप्राशावलेह Vital Electuary",
        tagline: "Rejuvenating herbal formulation",
        benefits: ["Improves vitality & energy", "Enhances immunity"],
        ingredients: "Combination of Ayurvedic herbs & Ghee",
        package: "500 gms Container",
        value: 700,
        image: राणप्राशावलेहVitalElectuaryimage
      },
      {
        id: 51,
        name: "मनुके : स्वशुष्कद्राक्षा Grape Raisin",
        tagline: "Natural sweet & healthy snack",
        benefits: ["Rich in antioxidants", "Supports energy & digestion"],
        ingredients: "Vitis vinifera Linn.",
        package: "250 gms Pouch",
        value: 140,
        image: DriedGrapeRaisinsImage,
      },
      {
        id: 52,
        name: "पोषक लाडू : पुष्टिकरलड्डुक Nourishing Sweetmeat",
        tagline: "Healthy snack for all ages",
        benefits: ["Provides energy", "Improves immunity & supports growth"],
        ingredients: "Flour, Ghee, Jaggery, Nuts",
        package: "250 gms Pouch",
        value: 160,
        image: NourishingSweetmeatImage,
      },
      {
        id: 53,
        name: "मसाला पेय - स्वसम्बारपेय Spice Drink",
        tagline: "Drink with taste, flavour & health",
        benefits: ["Best for digestion", "Overall health booster"],
        ingredients:
          "Ginger, Fennel, Black Pepper, Cinnamon, Liquorice, Cardamom, Clove, Nutmeg",
        package: "250 gm Pouch",
        value: 200,
        image: SpiceDrinkIamge
      },
    ],
  },
  {
    category: "स्वस्यसौन्दर्यतत्वसामग्री Own Beauty Essentials",
    categoryDescription: "Healer Made Beauty Essentials",
    products: [
      {
        id: 54,
        name: "केश्यचूर्ण - केशसंवाहक Hair Shampooer",
        tagline: "Natural hair cleanser",
        benefits: ["Cleanses hair naturally", "Nourishes scalp"],
        ingredients: "Herbal powders",
        package: "100 gms Pouch",
        value: 150,
        image: HairShampooerImage,
      },
      {
        id: 55,
        name: "केशवर्धनतैल Hair Grow Oil",
        tagline: "Hair nourishment",
        benefits: ["Promotes hair growth", "Strengthens hair roots"],
        ingredients: "Herbal oils & extracts",
        package: "100 ml Bottle",
        value: 220,
        image: HairGrowOilImage,
      },
      {
        id: 56,
        name: "लाल मेहंदी - रक्तगर्भमेन्धिका Red Heena",
        tagline: "Hair & scalp care",
        benefits: ["Natural hair dye", "Strengthens hair", "Enhances shine"],
        ingredients: "Lawsonia inermis Linn. Leaves",
        package: "100 gms Pouch",
        value: 180,
        image: RedHeenaImage,
      },
      {
        id: 57,
        name: "काळी मेहंदी - कृष्णमेन्धिका Black Henna",
        tagline: "Hair care",
        benefits: ["Strengthens hair", "Natural coloring"],
        ingredients: "Lawsonia inermis + Indigo",
        package: "100 gms Pouch",
        value: 180,
        image: BlackHennaImage,
      },
      {
        id: 58,
        name: "कोंडाचूर्ण - दारुणकप्रक्षालन Dandruff Wash",
        tagline: "Scalp treatment",
        benefits: ["Reduces dandruff", "Nourishes scalp"],
        ingredients: "Herbal powders",
        package: "100 gms Pouch",
        value: 150,
        image: DandruffWashImage,
      },
      {
        id: 59,
        name: "दारुणकतैल Dandruff Oil",
        tagline: "Scalp therapy",
        benefits: ["Reduces dandruff", "Nourishes scalp"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 200,
        image: DandruffOilImage,
      },
      {
        id: 60,
        name: "अभ्यङ्गतैल Unguent Oil",
        tagline: "Massage & body therapy",
        benefits: ["Relieves fatigue", "Nourishes muscles & skin"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 200,
        image: UnguentOilImage,
      },
      {
        id: 61,
        name: "अभ्यंगचूर्ण - अभ्यङ्गस्नान Unguent Bath",
        tagline: "Massage & bath powder",
        benefits: ["Nourishes skin", "Improves circulation", "Relaxes muscles"],
        ingredients: "Herbal powders",
        package: "100 gms Pouch",
        value: 150,
        image: UnguentBathImage,
      },
      {
        id: 62,
        name: "शरीरबांधा तेल : देहसन्तुलनतैल Body Balance Oil",
        tagline: "Body equilibrium",
        benefits: ["Balances doshas", "Improves circulation & vitality"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 200,
      },
      {
        id: 63,
        name: "रामतिळ तेल Niger Seeds Oil",
        tagline: "Cold Pressed • Chemical Free • Premium Quality",
        benefits: [
          "Rich in natural antioxidants and healthy fats",
          "Supports overall wellness and balanced nutrition",
          "Suitable for everyday cooking and traditional use",
          "Cold pressed to retain natural nutrients and aroma"
        ],
        ingredients: "100% Cold Pressed Niger Seeds Oil. No preservatives, additives, or chemicals.",
        package: "100 ml Clear Pharma Grade Bottle",
        value: 220,
        image: NigerSeedsOilBottleImage,
      },
      {
        id: 60,
        name: "सूर्यफूल तेल  Sunflower Oil",
        tagline: "Cold Pressed • Chemical Free • Premium Quality",
        benefits: [
          "Rich in Vitamin E and antioxidants",
          "Supports heart health",
          "Light and easy to digest",
          "Suitable for everyday cooking"
        ],
        ingredients: "100% Cold Pressed Sunflower Seed Oil. No preservatives, additives, or chemicals.",
        package: "100 ml Bottle",
        value: 200,
        image: SunflowerOilBottleImage
      },
      {
        id: 63,
        name: "ताकद तेल : बल्यतैल Strengthening Oil",
        tagline: "Strength & vigor",
        benefits: ["Improves stamina, muscle strength & energy"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 200,
        image: StrengtheningOilImage,
      },
      {
        id: 64,
        name: "अंघोळचूर्ण - स्नानचूर्ण Bath Powder",
        tagline: "Herbal bath powder",
        benefits: ["Cleanses & refreshes", "Softens skin"],
        ingredients: "Herbal powders",
        package: "100 gms Pouch",
        value: 140,
        image: BathPowder,
      },
      {
        id: 65,
        name: "फेसपॅक - गौरवदनबन्ध Fair Face Pack",
        tagline: "Skin brightening",
        benefits: ["Enhances complexion", "Nourishes & revitalizes skin"],
        ingredients: "Herbal powders",
        package: "100 gms Pouch",
        value: 160,
        image: FairFacePackImage,
      },
      {
        id: 66,
        name: "शतधौतघृत Hundred Fold Pure Ghee",
        tagline: "Medicinal ghee",
        benefits: [
          "Improves Skin tone, Piles, Burn, Sunburn",
          "Nourishes body",
        ],
        ingredients: "Cow Ghee, purified 100 times",
        package: "50 gm Container",
        value: 220,
        image: HundredFoldPureGhee,
      },
      {
        id: 67,
        name: "भेगारीचोपड Crack Cream",
        tagline: "Skin repair cream",
        benefits: ["Heals cracks & rough skin", "Moisturizes"],
        ingredients: "Herbal extracts & oils",
        package: "50 gm Container",
        value: 200,
        image: CrackCreamImage,
      },
      {
        id: 68,
        name: "त्वग्तैल Skin Oil",
        tagline: "Skin nourishment",
        benefits: ["Moisturizes & rejuvenates skin"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 200,
        image: SkinOilImage,
      },
      {
        id: 69,
        name: "करञ्जबीजतैल Pongamia Seed Oil",
        tagline: "Therapeutic oil",
        benefits: ["Anti-inflammatory", "Supports skin & joints"],
        ingredients: "Pongamia seeds",
        package: "100 ml Bottle",
        value: 220,
        image: TherapeuticOilImage
      },
      {
        id: 70,
        name: "निम्बबीजतैल Neem Seed Oil",
        tagline: "Skin & hair therapy",
        benefits: ["Anti-bacterial", "Improves skin & hair health"],
        ingredients: "Neem seeds",
        package: "100 ml Bottle",
        value: 220,
        image: NeemSeedOilImage,
      },
      {
        id: 71,
        name: "सोरीयातैल Psoria Oil",
        tagline: "Skin remedy",
        benefits: ["Supports psoriasis & skin disorders"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
        image: PsoriaOilImage,
      },
      {
        id: 72,
        name: "बाकुचीतैल Psoralea Seed Oil",
        tagline: "Skin therapy",
        benefits: ["Reduces pigmentation", "Supports skin health"],
        ingredients: "Psoralea seeds",
        package: "100 ml Bottle",
        value: 220,
        image: PsoraleaSeedOilImage,
      },
      {
        id: 73,
        name: "त्वग्क्वाथ Skin Tonic",
        tagline: "Herbal skin rejuvenation",
        benefits: ["Enhances skin health", "Nourishes & refreshes"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 350,
        image: SkinTonicImage,
      },
      {
        id: 74,
        name: "गन्धकधृति Sulphur Essence",
        tagline: "Purifying essence",
        benefits: ["Supports skin & internal purification", "Detoxifying"],
        ingredients: "Sulphur essence",
        package: "50 ml Bottle",
        value: 250,
        image: SulphurEssenceImage,
      },
    ],
  },
  {
    category: "ज्ञानेन्द्रियरक्षा Sense Organ Care",
    categoryDescription: "Care for sense organs",
    products: [
      {
        id: 75,
        name: "स्वनेत्ररक्षा Eye Care",
        tagline: "Eye protection",
        benefits: ["Improves vision & eye health"],
        ingredients: "Herbal extracts",
        package: "10 ml Drop Bottle",
        value: 160,
      },
      {
        id: 48,
        name: "वेदनाशामक तेल Pain Relief Oil",
        tagline: "Herbal • Fast Absorbing • Natural Care",
        benefits: [
          "Helps relieve joint and muscle pain",
          "Provides soothing relief from stiffness and soreness",
          "Supports relaxation after physical activity",
          "Ideal for daily massage and body care"
        ],
        ingredients: "A blend of herbal oils including Sesame Oil and traditional Ayurvedic herbs. Free from mineral oil and harmful chemicals.",
        package: "100 ml Bottle",
        value: 250,
        image: PainReliefOilImage,
      },
      {
        id: 76,
        name: "नेत्रपूरण Eye Nourish",
        tagline: "Eye care",
        benefits: ["Strengthens eyes", "Relieves eye strain"],
        ingredients: "Herbal oils & extracts",
        package: "15 ml Drop Bottle",
        value: 180,
      },
      {
        id: 77,
        name: "कर्णशूलहर -- कर्णव्यथातैल Earache Oil",
        tagline: "Ear pain relief",
        benefits: ["Reduces ear pain & discomfort"],
        ingredients: "Herbal oils",
        package: "10 ml Drop Bottle",
        value: 160,
      },
      {
        id: 78,
        name: "कर्णस्त्रावहर -- कर्णसंस्रावतैल Ear Discharge Oil",
        tagline: "Ear discharge therapy",
        benefits: ["Helps reduce ear discharge & infections"],
        ingredients: "Herbal oils",
        package: "10 ml Drop Bottle",
        value: 160,
      },
      {
        id: 79,
        name: "कर्णपूरणतैल Ear Nourish Oil",
        tagline: "Ear nourishment",
        benefits: ["Supports ear health & strength"],
        ingredients: "Herbal oils",
        package: "10 ml Drop Bottle",
        value: 160,
      },
      {
        id: 80,
        name: "अणुतैलनस्य Micro Nourish Nasal Drop",
        tagline: "Nasal nourishment",
        benefits: ["Moisturizes & detoxifies nasal passage"],
        ingredients: "Herbal oils",
        package: "10 ml Drop Bottle",
        value: 160,
      },
      {
        id: 81,
        name: "षड्बिन्दुतैलनस्य Deep Nourish Nasal Drop",
        tagline: "Deep nasal therapy",
        benefits: ["Enhances respiratory health & immunity"],
        ingredients: "Herbal oils",
        package: "10 ml Drop Bottle",
        value: 160,
      },
      {
        id: 82,
        name: "पंचेन्द्रियवर्धनतैल Senses Nourish Nasal Drop",
        tagline: "Sensory support",
        benefits: ["Improves sense organs function"],
        ingredients: "Herbal oils",
        package: "10 ml Drop Bottle",
        value: 160,
      },
      {
        id: 83,
        name: "दन्तधावनछूर्ण Tooth Powder",
        tagline: "Natural tooth cleaner",
        benefits: ["Maintains oral hygiene", "Strengthens gums"],
        ingredients: "Herbal powders",
        package: "100 gms Pouch",
        value: 140,
      },
    ],
  },
  {
    category: "ज्वरशूलवेदना Fever Pain",
    categoryDescription: "Fever and pain relief products",
    products: [
      {
        id: 84,
        name: "तापगुळण्या -- स्वज्वरगण्डूष Fever Gargle",
        tagline: "Herbal remedy for fever",
        benefits: ["Reduces fever symptoms", "Supports immunity"],
        ingredients: "Herbal decoction",
        package: "100 gms Pouch",
        value: 130,
        image: FeverGargleImage,
      },
      {
        id: 85,
        name: "अमृतबिंदुवाफ -- स्वअमृतबाष्पपान Nector Vapor Inhalation",
        tagline: "Herbal inhalation",
        benefits: ["Clears respiratory tract", "Boosts immunity"],
        ingredients: "Herbal decoction",
        package: "10 ml Drop Bottle",
        value: 160,
        image: NectorVaporInhailationImage,
      },
      {
        id: 86,
        name: "अमृतबिंदुपान -- अमृतबिन्दुपान Nector Drop Drink",
        tagline: "Health tonic",
        benefits: ["Boosts immunity & vitality", "Nourishing"],
        ingredients: "Herbal extracts & honey",
        package: "15 ml Drop Bottle",
        value: 180,
        image: NectorDropDrink,
      },
      {
        id: 87,
        name: "शुलघ्नअङ्गमर्दनतैल Pain Relief Massage Oil",
        tagline: "Pain & inflammation",
        benefits: ["Reduces joint & muscle pain", "Relaxes body"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
      },
      {
        id: 88,
        name: "महावातहरतैल Neuro Muscular Oil",
        tagline: "Neuromuscular support",
        benefits: ["Relieves nerve & muscular disorders"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
        image: NerveMuscleNourishOilImage,
      },
      {
        id: 89,
        name: "महास्नायुतैल Nerve Muscle Nourish Oil",
        tagline: "Nerve & muscle nourishment",
        benefits: ["Supports neuromuscular health"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
        image: NerveMuscleNourishOilImage,
      },
      {
        id: 90,
        name: "सैरेयकरतैल Barleria Oil",
        tagline: "Therapeutic oil",
        benefits: ["Anti-inflammatory", "Supports joints & skin"],
        ingredients: "Barleria herb extract",
        package: "100 ml Bottle",
        value: 220,
        image: BarleriaOilImage,
      },
      {
        id: 91,
        name: "निर्गुन्डीतैल Reumatic Oil",
        tagline: "Rheumatism therapy",
        benefits: ["Relieves pain & inflammation in joints"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
        image: ReumaticOilImage,
      },
      {
        id: 92,
        name: "व्रणशोधनतैल Wound Cleaner Oil",
        tagline: "Wound care",
        benefits: ["Cleans & disinfects wounds"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
        image: WoundCleanerOilImage,
      },
      {
        id: 93,
        name: "व्रणरोपणतैल Wound Healing Oil",
        tagline: "Wound healing",
        benefits: ["Promotes tissue regeneration", "Reduces scars"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
        image: WoundHealingOilImage,
      },
      {
        id: 94,
        name: "आमवाततैल Reumatoid Oil",
        tagline: "Arthritis & inflammation",
        benefits: ["Reduces rheumatoid pain & inflammation"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
        image: ReumatoidOilImage,
      },
      {
        id: 95,
        name: "वातरक्ततैल Gout Oil",
        tagline: "Gout & joint support",
        benefits: ["Relieves gout symptoms", "Reduces inflammation"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
        image: GoutOilImage,
      },
      {
        id: 96,
        name: "भग्नतैल Fracture Oil",
        tagline: "Bone & fracture support",
        benefits: ["Aids recovery", "Strengthens fractured bones"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
        image: FractureOilTel,
      },
    ],
  },
  {
    category: "कुटुंबवैद्योषधि Family Physician Herbs",
    categoryDescription: "Healer Made Family Physician Dispensing Herbs",
    products: [
      {
        id: 97,
        name: "बाळगुटी: शिशुगुटिका Baby Herbs",
        tagline: "Infant care",
        benefits: ["Gentle nourishment & immunity support for babies"],
        ingredients: "Herbal extracts & oils",
        package: "As per weight",
        value: 200,
        image: BabyHerbsImage,
      },
      {
        id: 98,
        name: "महागव्योषधिघृत Cow Herbs Ghee",
        tagline: "Nutritive ghee for health & vitality",
        benefits: ["Enhance digestion, immunity, and overall wellness"],
        ingredients: "Cow Ghee, Ayurvedic Herbs",
        package: "500 gms Container",
        value: 850,
        image: CowHerbsGheeImage,
      },
      {
        id: 99,
        name: "शतवीर्याघृतमंडूर Female Anaemia",
        tagline: "Herbal ghee for women's health",
        benefits: [
          "Supports hemoglobin, fertility, and overall female vitality",
        ],
        ingredients: "Shatavari, Herbal Extracts, Ghee",
        package: "500 gms Container",
        value: 800,
        image: FemaleAnaemiaImage,
      },
      {
        id: 16,
        name: "अर्शारिष्ट Piles Tonic",
        tagline: "Relieves piles naturally",
        benefits: ["Reduces inflammation & supports digestive health"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 400,
      },
      {
        id: 17,
        name: "बुद्धिशक्तिवर्धक Intellect Tonic",
        tagline: "Brain & memory booster",
        benefits: ["Enhances focus, memory & cognitive function"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 420,
      },
      {
        id: 101,
        name: "अम्लपित्तहर Liver Tonic",
        tagline: "Liver & digestion support",
        benefits: ["Balances acidity, improves digestion & liver function"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 380,
        image: LiverTonicImage,
      },
      {
        id: 102,
        name: "महावातहररिष्ट Neuro Muscular Tonic",
        tagline: "Nervous system & muscle support",
        benefits: ["Reduces joint pain & neuromuscular issues"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 450,
        image: NeuroMuscularImage,
      },
      {
        id: 103,
        name: "सःशक्तिवर्धक He Tonic",
        tagline: "Male vitality enhancer",
        benefits: ["Boosts energy, stamina & overall health"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 400,
      },
      {
        id: 104,
        name: "साशक्तिवर्धक She Tonic",
        tagline: "Female vitality enhancer",
        benefits: ["Supports energy, immunity & reproductive health"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 400,
      },
      {
        id: 105,
        name: "अतिरज : रिष्ट Control Flow Tonic",
        tagline: "Menstrual regulation",
        benefits: ["Controls excessive bleeding", "Balances hormones"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 420,
      },
      {
        id: 106,
        name: "सूतिकारिष्ट Puerperal Tonic",
        tagline: "Postnatal care",
        benefits: ["Supports recovery after childbirth & lactation"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 450,
      },
      {
        id: 108,
        name: "कासपीनसघ्नलेह्य Cough Cold Tonic",
        tagline: "Respiratory relief",
        benefits: ["Reduces cough, cold & throat irritation"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 380,
      },
      {
        id: 109,
        name: "प्राणश्वासकासघ्नलेह्य Asthma Cough Tonic",
        tagline: "Asthma & breathing support",
        benefits: ["Eases breathing, reduces asthma symptoms"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 450,
      },
      {
        id: 110,
        name: "दुर्लभइंद्रारिष्ट Eminent Gut Tonic",
        tagline: "Digestive health",
        benefits: ["Improves gut function", "Relieves bloating & constipation"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 400,
      },
      {
        id: 111,
        name: "ग्रहणीहरारिष्ट Digestive Tonic",
        tagline: "Digestive support",
        benefits: ["Enhance digestion IBS & nutrient absorption"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 380,
      },
      {
        id: 112,
        name: "चूर्णकजल Lime Water",
        tagline: "Detox & refresh",
        benefits: ["Balances pH", "Aids digestion & detoxification"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 250,
        image: LimeWaterImage,
      },
      {
        id: 113,
        name: "पंचकोलासव Deep Digestive Tonic",
        tagline: "Comprehensive digestive aid",
        benefits: ["Supports digestion & metabolism"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 400,
      },
      {
        id: 114,
        name: "अल्पनष्टपुष्पार्तव Good Flow Tonic",
        tagline: "Women's menstrual support",
        benefits: ["Promotes healthy flow", "Relieves discomfort"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 420,
      },
      {
        id: 115,
        name: "गोजीरकासव Easy Digestive Tonic",
        tagline: "Gentle digestion support",
        benefits: ["Eases digestion & reduces acidity"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 380,
        image: EasyDigestiveTonicImage,
      },
      {
        id: 116,
        name: "गुडभल्लातकासव Strength Tonic",
        tagline: "Natural tonic",
        benefits: ["Improves strength & metabolism"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 400,
      },
      {
        id: 117,
        name: "गौडारिष्ट Health Tonic",
        tagline: "General health tonic",
        benefits: ["Supports immunity & vitality"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 400,
      },
      {
        id: 118,
        name: "नराङ्गपुरण Penis Health Oil",
        tagline: "Male sexual health",
        benefits: ["Improves vitality & reproductive health"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
      },
      {
        id: 119,
        name: "रत्यङ्गधावन Vaginal Wash",
        tagline: "Feminine hygiene",
        benefits: ["Cleanses & maintains vaginal health"],
        ingredients: "Herbal decoction",
        package: "100 gms Pouch",
        value: 150,
      },
      {
        id: 120,
        name: "रत्यङ्गपुरण Vaginal Health Oil",
        tagline: "Feminine health",
        benefits: ["Supports vaginal health & hygiene"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 200,
        image: VaginalHealthOilImage,
      },
      {
        id: 121,
        name: "सुखानुस्त्रलोमन Pleasure Purging",
        tagline: "Digestive & cleansing",
        benefits: ["Supports bowel movement", "Eases constipation"],
        ingredients: "Herbal powders",
        package: "100 gms Pouch",
        value: 130,
        image: PleasurePurginImage,
      },
    ],
  },
  {
    category: "गौकृषिउत्पाद Cow Agro Produce",
    categoryDescription: "Community Grown Cow Agro Produce",
    products: [
      {
        id: 122,
        name: "तीळ पेंड – तिलपिष्टान्न Sesame Cake",
        tagline: "Nutritional cake for cattle",
        benefits: [
          "Rich in protein for muscle development",
          "Enhances milk yield and quality",
          "Supports healthy skin and coat",
        ],
        ingredients: "Sesamum indicum Seed",
        package: "5 kg Pack",
        value: 1200,
        image: SesameCakeImage,
      },
      {
        id: 123,
        name: "शेंगदाणा पेंड – कलायपिष्टान्न Peanut Cake",
        tagline: "Nutritional cake for cattle",
        benefits: [
          "High protein content for muscle and growth",
          "Improves milk production and quality",
          "Supports healthy skin and coat",
        ],
        ingredients: "Arachis hypogaea Seed",
        package: "5 kg Pack",
        value: 1200,
        image: PeanutCakeImage,
      },
      {
        id: 124,
        name: "कारळे पेंड - खुरसणीपिष्टान्न Niger Seeds Cake",
        tagline: "Nutritional cake for cattle",
        benefits: [
          "Rich in protein and energy for growth",
          "Enhances milk yield and quality",
          "Boosts immunity and strength",
        ],
        ingredients: "Guizotia abyssinica Seed",
        package: "5 kg Pack",
        value: 1200,
        image: NigerSeedsCakeImage,
      },
      {
        id: 125,
        name: "जवस पेंड -- अतसीपिष्टान्न Flaxseeds Cake",
        tagline: "Nutritional cake for cattle",
        benefits: [
          "Rich in protein and healthy fats (Omega-3)",
          "Improves milk yield and quality",
          "Enhances immunity and overall health",
        ],
        ingredients: "Linum usitatissimum Linn. Seeds",
        package: "5 kg Pack",
        value: 1200,
        image: FlaxseedPendImage,
      },
      {
        id: 126,
        name: "करडई पेंड -- कुसुम्भपिष्टान्न safflower Cake",
        tagline: "Nutritional cake for cattle",
        benefits: [
          "High in protein for growth and muscle development",
          "Supports milk production and quality",
          "Aids overall health and immunity",
        ],
        ingredients: "Carthamus tinctorius Linn. Seeds",
        package: "5 kg Pack",
        value: 1200,
        image: SafflowerCakeImage,
      },
      {
        id: 127,
        name: "सूर्यफूल पेंड -- सूर्यमुखीपिष्टान्न Sunflower Cake",
        tagline: "Nutritional cake for cattle",
        benefits: [
          "Rich in protein for growth and muscle development",
          "Improves milk yield and quality",
          "Aids digestion and metabolic health",
        ],
        ingredients: "Helianthus annuus Linn. Seed Oil",
        package: "5 kg Pack",
        value: 1200,
        image: SunflowerSeedCakeImage,
      },
      {
        id: 128,
        name: "गांडूळ खत -- भूमिस्नुर्वरक Earthworm Fertilizer",
        tagline: "Natural soil enhancer",
        benefits: [
          "Improves soil fertility",
          "Enriches nutrients for better crop yield",
        ],
        ingredients: "Earthworm Castings",
        package: "1 kg Pouch",
        value: 300,
        image: EarthwormFertilizerImage,
      },
      {
        id: 129,
        name: "गोकृपामृत -- गौमृत Cow Nector",
        tagline: "Purity of cow's essence",
        benefits: [
          "Acts as a natural detoxifier",
          "Boosts immunity and overall vitality",
          "Traditionally used in Ayurvedic therapies",
        ],
        ingredients: "Bos indicus Urina (Gomutra)",
        package: "1 litre Bottle",
        value: 450,
        image: CowNectorImage
      },
      {
        id: 159,
        name: "गोवरी  गोमयुपल Cow Dung Cake",
        tagline: "Natural fertilizer & sacred offering",
        benefits: ["Natural fertilizer & sacred offering for rituals"],
        ingredients: "",
        package: "5kg Pack",
        value: 250,
        image: CowDungImage,
      },
    ],
  },
];
