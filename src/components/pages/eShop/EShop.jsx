import { AddSharp, RemoveSharp } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, Leaf, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../../redux/CartSlice";

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
    `=== getAllProducts: Found ${allProducts.length} total products ===`
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
      className="bg-gradient-to-br from-lime-50 to-green-50 rounded-xl overflow-hidden shadow-md p-3"
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

const LazyProductCard = ({ product, index }) => {
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
      }
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
    <div ref={cardRef}>
      {isVisible && isLoaded ? (
        <ProductCard product={product} index={index} />
      ) : (
        <ProductCardSkeleton index={index} />
      )}
    </div>
  );
};

const ProductCard = ({ product, index }) => {
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
      className="group relative border bg-gradient-to-br from-lime-50 to-green-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full flex flex-col"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-lime-200/30 to-green-300/30 rounded-bl-full -z-0" />

      <div className="relative p-3 flex flex-col h-full">
        <div className="flex items-start justify-between mb-2">
          <div className="bg-gradient-to-r from-green-600 to-lime-600 text-white px-2 py-1 rounded-full text-[11px] font-semibold w-auto">
            {product.category}
          </div>
          <Leaf className="w-4 h-4 text-green-600 opacity-60" />
        </div>

        <motion.h3
          className="text-sm sm:text-base font-bold text-green-900 mb-1 sm:mb-2 line-clamp-2 min-h-[2.5rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {product.name}
        </motion.h3>

        <p className="text-[11px] text-green-700 mb-2 italic line-clamp-1 min-h-[1.2rem]">
          {product.tagline}
        </p>

        <div className="space-y-1 mb-2">
          <div className="flex items-center text-[10px] text-green-800">
            <span className="font-semibold mr-1 whitespace-nowrap">
              Package :
            </span>
            <span className="text-green-600 truncate">{product.package}</span>
          </div>
          <div className="flex items-start text-[10px] text-green-800 min-h-[2.8em]">
            <span className="font-semibold mr-1 whitespace-nowrap">
              Ingredients :
            </span>
            <span className="text-green-600 line-clamp-2">
              {product.ingredients}
            </span>
          </div>
        </div>

        <div className="border-t border-green-200 py-1.5 mt-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-900">
                <span className="text-[10px] text-green-600">Price</span> ₹
                {product.value}
              </p>
            </div>

            {cartItem ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: product.id,
                        quantity: cartItem.quantity - 1,
                      })
                    )
                  }
                  className="bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold hover:bg-red-600 transition-colors text-sm"
                >
                  <RemoveSharp />
                </button>

                <span className="font-bold text-green-900 min-w-[1.5rem] text-center text-sm">
                  {cartItem.quantity}
                </span>

                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: product.id,
                        quantity: cartItem.quantity + 1,
                      })
                    )
                  }
                  className="bg-green-600 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold hover:bg-green-700 transition-colors text-sm"
                >
                  <AddSharp />
                </button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch(addToCart(product))}
                className="bg-gradient-to-r from-green-600 to-lime-600 text-white px-3 py-1.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-1.5 text-xs"
              >
                <ShoppingCart className="w-3 h-3" />
                Add
              </motion.button>
            )}
          </div>
        </div>
        
        <div className="border-t border-green-200 pt-2 min-h-[3.5rem]">
          <p className="text-[10px] font-semibold text-green-800 mb-1">
            Key Benefits :
          </p>

          <ul className="list-none">
            {product.benefits.slice(0, 2).map((benefit, i) => (
              <li
                key={i}
                className="text-[10px] text-green-700 flex space-x-2 items-center m-0"
              >
                <span className="line-clamp-1">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
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
      uniqueCategories
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
            (b ?? "").toLowerCase().includes(searchLower)
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-green-100 w-full">
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
                className={`${
                  isDesktop ? "sticky top-4 w-72" : "fixed inset-0 w-full"
                } bg-white rounded-none lg:rounded-xl shadow-xl p-4 ${
                  isDesktop ? "h-fit" : "h-screen overflow-y-auto"
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
                  <div className="space-y-1.5 max-h-64 overflow-y-auto pr-2">
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
                            className={`w-full text-left p-2 rounded-lg transition-all duration-300 text-xs ${
                              selectedCategory === cat
                                ? "bg-gradient-to-r from-green-600 to-lime-600 text-white shadow-md"
                                : "bg-green-50 text-green-800 hover:bg-green-100"
                            }`}
                          >
                            {cat}
                          </motion.button>
                        ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-green-800 mb-2">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([parseInt(e.target.value), priceRange[1]])
                      }
                      className="w-full accent-green-600"
                    />
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full accent-green-600"
                    />
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
                  className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3"
                >
                  {filteredProducts.map((product, index) => (
                    <LazyProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
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
        name: "शुद्ध गूळ -- स्वविमलगुड Pure Jaggery",
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
      },
      {
        id: 4,
        name: "तीळ तेल -- तिलतैल Sesame Oil",
        tagline: "Intake in the cold. Apply year-round",
        benefits: ["Best cooking oil in winter", "Multiple external benefits"],
        ingredients: "Sesamum indicum Seed Oil",
        package: "1 litre Bottle",
        value: 550,
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
      },
      {
        id: 19,
        name: "जवस तैल -- अतसीतैल Flaxseeds Oil",
        tagline: "Rich omega-3 oil",
        benefits: [
          "Improves heart health",
          "Anti-inflammatory",
          "Supports skin & hair",
        ],
        ingredients: "Linum usitatissimum Linn. Seeds Oil",
        package: "500 ml Bottle",
        value: 400,
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
      },
      {
        id: 21,
        name: "मकाकण्या : वरेणुकमलाप्सिका Maize-Corn Porridge",
        tagline: "Traditional maize porridge",
        benefits: ["Easily digestible", "Energy booster", "Good for all ages"],
        ingredients: "Zea mays Linn.",
        package: "500 gms Pouch",
        value: 200,
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
      },
      {
        id: 8,
        name: "गुलकंद Rose Petal",
        tagline: "Relax in summer with super cool",
        benefits: [
          "Cooling effect",
          "Antacid",
          "Boosts energy",
          "Supports skin, stress relief",
        ],
        ingredients: "Fresh Rose Petals, Rock Sugar, Cardamom",
        package: "500 gms Container",
        value: 600,
      },
      {
        id: 9,
        name: "रोजचा चहा -- सर्वर्तुचाया All Season Tea",
        tagline: "Tea with flavour & health",
        benefits: [
          "Reduce tea addiction",
          "Add health to daily life",
          "Antioxidant",
          "Supports digestion & immunity",
        ],
        ingredients: "Camellia sinensis, Ginger, Coriander, Fennel, Spices",
        package: "250 gms Pouch",
        value: 160,
      },
      {
        id: 24,
        name: "तिलउपसेचन Sesame Chutney",
        tagline: "Nutritional chutney",
        benefits: ["Supports digestion", "Boosts energy & taste"],
        ingredients: "Sesame seeds, Salt, Spices",
        package: "100 gms Pouch",
        value: 120,
      },
      {
        id: 25,
        name: "कलायउपसेचन Peanut Chutney",
        tagline: "Protein-rich chutney",
        benefits: ["Enhances taste & nutrition"],
        ingredients: "Peanuts, Salt, Spices",
        package: "100 gms Pouch",
        value: 120,
      },
      {
        id: 26,
        name: "नारिकेलउपसेचन Coconut Chutney",
        tagline: "Flavorful & healthy",
        benefits: ["Supports digestion", "Rich in nutrients"],
        ingredients: "Coconut, Salt, Spices",
        package: "100 gms Pouch",
        value: 120,
      },
      {
        id: 27,
        name: "कारळे चटणी -- खुरसणीउपसेचन Niger Seeds Chutney",
        tagline: "Bitter-nutritive chutney",
        benefits: ["Supports metabolism", "Digestive aid"],
        ingredients: "Niger Seeds, Spices",
        package: "100 gms Pouch",
        value: 130,
      },
      {
        id: 28,
        name: "जवस चटणी -- अतसी Flaxseed",
        tagline: "Omega-3 rich chutney",
        benefits: ["Supports heart health & digestion"],
        ingredients: "Flaxseeds, Spices",
        package: "100 gms Pouch",
        value: 130,
      },
      {
        id: 29,
        name: "व्यञ्जनपत्रउपसेचन Curry Leaves Chutney",
        tagline: "Flavorful & healthy",
        benefits: ["Enhances taste", "Digestive benefits"],
        ingredients: "Curry Leaves, Spices",
        package: "100 gms Pouch",
        value: 120,
      },
      {
        id: 30,
        name: "लशुनार्द्रकउपसेचन Garlic Ginger Chutney",
        tagline: "Immunity booster",
        benefits: ["Supports digestion & immunity", "Enhances flavor"],
        ingredients: "Garlic, Ginger, Spices",
        package: "100 gms Pouch",
        value: 130,
      },
      {
        id: 31,
        name: "सरबत मसाला - अष्टलवणपेत्व Nectar",
        tagline: "Refreshing beverage mix",
        benefits: ["Adds taste & health to drinks"],
        ingredients: "8 salts & spices",
        package: "100 gms Pouch",
        value: 140,
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
      },
    ],
  },
  {
    category: "स्वस्यसौन्दर्यतत्वसामग्री Own Beauty Essentials",
    categoryDescription: "Beauty Products - Applied Herbs for beauty and care",
    products: [
      {
        id: 10,
        name: "केशवर्धनतैल Hair Grow Oil",
        tagline: "Hair nourishment",
        benefits: ["Promotes hair growth", "Strengthens hair roots"],
        ingredients: "Herbal oils & extracts",
        package: "100 ml Bottle",
        value: 220,
      },
      {
        id: 11,
        name: "लाल मेहंदी - रक्तगर्भमेन्धिका Red Henna",
        tagline: "Hair & scalp care",
        benefits: ["Natural hair dye", "Strengthens hair", "Enhances shine"],
        ingredients: "Lawsonia inermis Linn. Leaves",
        package: "100 gms Pouch",
        value: 180,
      },
      {
        id: 12,
        name: "फेसपॅक - गौरवदनबन्ध Fair Face Pack",
        tagline: "Skin brightening",
        benefits: ["Enhances complexion", "Nourishes & revitalizes skin"],
        ingredients: "Herbal powders",
        package: "100 gms Pouch",
        value: 160,
      },
      {
        id: 13,
        name: "त्वग्तैल Skin Oil",
        tagline: "Skin nourishment",
        benefits: ["Moisturizes & rejuvenates skin"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 200,
      },
    ],
  },
  {
    category: "ज्ञानेन्द्रियरक्षा Sense Organ Care",
    categoryDescription: "Care for sense organs",
    products: [
      {
        id: 14,
        name: "स्वनेत्ररक्षा Eye Care",
        tagline: "Eye protection",
        benefits: ["Improves vision & eye health"],
        ingredients: "Herbal extracts",
        package: "10 ml Drop Bottle",
        value: 160,
      },
      {
        id: 15,
        name: "नेत्रपूरण Eye Nourish",
        tagline: "Eye care",
        benefits: ["Strengthens eyes", "Relieves eye strain"],
        ingredients: "Herbal oils & extracts",
        package: "15 ml Drop Bottle",
        value: 180,
      },
    ],
  },
  {
    category: "गौकृषिउत्पाद Cow Agro Produce",
    categoryDescription: "Community Grown Cow Agro Produce",
    products: [
      {
        id: 18,
        name: "तीळ पेंड -- तिलपिष्टान्न Sesame Cake",
        tagline: "Nutritional cake for cattle",
        benefits: [
          "Rich in protein for muscle development",
          "Enhances milk yield and quality",
          "Supports healthy skin and coat",
        ],
        ingredients: "Sesamum indicum Seed",
        package: "5 kg Pack",
        value: 1200,
      },
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
      },
      {
        id: 34,
        name: "खडीसाखरचूर्ण -- स्वखण्डशर्कराचूर्ण Candied Sugar Powder",
        tagline: "Uppermost medicinal sweetener",
        benefits: [
          "Energy booster",
          "Improves fertility",
          "Relieves fever, cough & sore throat",
        ],
        ingredients: "Sugar Cane (Saccharum officinarum), Rock Sugar",
        package: "250 gms Pouch",
        value: 180,
      },
      {
        id: 36,
        name: "काकवी: स्वमत्स्यण्डिका Cane Syrup",
        tagline: "Naturally nurturing liquid sweetener",
        benefits: [
          "Alternative for white sugar",
          "Supports energy & digestion",
        ],
        ingredients: "Sugar Cane (Saccharum officinarum)",
        package: "500 gms Container",
        value: 250,
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
      },
      {
        id: 43,
        name: "6 वनोषधि पाणी : षडङ्गपानीय Six Herbs Infusion",
        tagline: "Think Fever, Think Six Herbs Infusion",
        benefits: ["Fever relief", "Detoxifying", "Supports immunity"],
        ingredients: "Musta, Parpatak, Usheera, Chandana, Uddichya, Nagar",
        package: "100 gms Pouch",
        value: 140,
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
      },
      {
        id: 50,
        name: "प्राणप्राशावलेह Vital Electuary",
        tagline: "Rejuvenating herbal formulation",
        benefits: ["Improves vitality & energy", "Enhances immunity"],
        ingredients: "Combination of Ayurvedic herbs & Ghee",
        package: "500 gms Container",
        value: 700,
      },
      {
        id: 51,
        name: "मनुके : स्वशुष्कद्राक्षा Grape Raisin",
        tagline: "Natural sweet & healthy snack",
        benefits: ["Rich in antioxidants", "Supports energy & digestion"],
        ingredients: "Vitis vinifera Linn.",
        package: "250 gms Pouch",
        value: 140,
      },
      {
        id: 52,
        name: "पोषक लाडू : पुष्टिकरलड्डुक Nourishing Sweetmeat",
        tagline: "Healthy snack for all ages",
        benefits: ["Provides energy", "Improves immunity & supports growth"],
        ingredients: "Flour, Ghee, Jaggery, Nuts",
        package: "250 gms Pouch",
        value: 160,
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
      },
      {
        id: 55,
        name: "केशवर्धनतैल Hair Grow Oil",
        tagline: "Hair nourishment",
        benefits: ["Promotes hair growth", "Strengthens hair roots"],
        ingredients: "Herbal oils & extracts",
        package: "100 ml Bottle",
        value: 220,
      },
      {
        id: 56,
        name: "लाल मेहंदी - रक्तगर्भमेन्धिका Red Henna",
        tagline: "Hair & scalp care",
        benefits: ["Natural hair dye", "Strengthens hair", "Enhances shine"],
        ingredients: "Lawsonia inermis Linn. Leaves",
        package: "100 gms Pouch",
        value: 180,
      },
      {
        id: 57,
        name: "काळी मेहंदी - कृष्णमेन्धिका Black Henna",
        tagline: "Hair care",
        benefits: ["Strengthens hair", "Natural coloring"],
        ingredients: "Lawsonia inermis + Indigo",
        package: "100 gms Pouch",
        value: 180,
      },
      {
        id: 58,
        name: "कोंडाचूर्ण - दारुणकप्रक्षालन Dandruff Wash",
        tagline: "Scalp treatment",
        benefits: ["Reduces dandruff", "Nourishes scalp"],
        ingredients: "Herbal powders",
        package: "100 gms Pouch",
        value: 150,
      },
      {
        id: 59,
        name: "दारुणकतैल Dandruff Oil",
        tagline: "Scalp therapy",
        benefits: ["Reduces dandruff", "Nourishes scalp"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 200,
      },
      {
        id: 60,
        name: "अभ्यङ्गतैल Unguent Oil",
        tagline: "Massage & body therapy",
        benefits: ["Relieves fatigue", "Nourishes muscles & skin"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 200,
      },
      {
        id: 61,
        name: "अभ्यंगचूर्ण - अभ्यङ्गस्नान Unguent Bath",
        tagline: "Massage & bath powder",
        benefits: ["Nourishes skin", "Improves circulation", "Relaxes muscles"],
        ingredients: "Herbal powders",
        package: "100 gms Pouch",
        value: 150,
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
        name: "ताकद तेल : बल्यतैल Strengthening Oil",
        tagline: "Strength & vigor",
        benefits: ["Improves stamina, muscle strength & energy"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 200,
      },
      {
        id: 64,
        name: "अंघोळचूर्ण - स्नानचूर्ण Bath Powder",
        tagline: "Herbal bath powder",
        benefits: ["Cleanses & refreshes", "Softens skin"],
        ingredients: "Herbal powders",
        package: "100 gms Pouch",
        value: 140,
      },
      {
        id: 65,
        name: "फेसपॅक - गौरवदनबन्ध Fair Face Pack",
        tagline: "Skin brightening",
        benefits: ["Enhances complexion", "Nourishes & revitalizes skin"],
        ingredients: "Herbal powders",
        package: "100 gms Pouch",
        value: 160,
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
      },
      {
        id: 67,
        name: "भेगारीचोपड Crack Cream",
        tagline: "Skin repair cream",
        benefits: ["Heals cracks & rough skin", "Moisturizes"],
        ingredients: "Herbal extracts & oils",
        package: "50 gm Container",
        value: 200,
      },
      {
        id: 68,
        name: "त्वग्तैल Skin Oil",
        tagline: "Skin nourishment",
        benefits: ["Moisturizes & rejuvenates skin"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 200,
      },
      {
        id: 69,
        name: "करञ्जबीजतैल Pongamia Seed Oil",
        tagline: "Therapeutic oil",
        benefits: ["Anti-inflammatory", "Supports skin & joints"],
        ingredients: "Pongamia seeds",
        package: "100 ml Bottle",
        value: 220,
      },
      {
        id: 70,
        name: "निम्बबीजतैल Neem Seed Oil",
        tagline: "Skin & hair therapy",
        benefits: ["Anti-bacterial", "Improves skin & hair health"],
        ingredients: "Neem seeds",
        package: "100 ml Bottle",
        value: 220,
      },
      {
        id: 71,
        name: "सोरीयातैल Psoria Oil",
        tagline: "Skin remedy",
        benefits: ["Supports psoriasis & skin disorders"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
      },
      {
        id: 72,
        name: "बाकुचीतैल Psoralea Seed Oil",
        tagline: "Skin therapy",
        benefits: ["Reduces pigmentation", "Supports skin health"],
        ingredients: "Psoralea seeds",
        package: "100 ml Bottle",
        value: 220,
      },
      {
        id: 73,
        name: "त्वग्क्वाथ Skin Tonic",
        tagline: "Herbal skin rejuvenation",
        benefits: ["Enhances skin health", "Nourishes & refreshes"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 350,
      },
      {
        id: 74,
        name: "गन्धकधृति Sulphur Essence",
        tagline: "Purifying essence",
        benefits: ["Supports skin & internal purification", "Detoxifying"],
        ingredients: "Sulphur essence",
        package: "50 ml Bottle",
        value: 250,
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
      },
      {
        id: 85,
        name: "अमृतबिंदुवाफ -- स्वअमृतबाष्पपान Nector Vapor Inhalation",
        tagline: "Herbal inhalation",
        benefits: ["Clears respiratory tract", "Boosts immunity"],
        ingredients: "Herbal decoction",
        package: "10 ml Drop Bottle",
        value: 160,
      },
      {
        id: 86,
        name: "अमृतबिंदुपान -- अमृतबिन्दुपान Nector Drop Drink",
        tagline: "Health tonic",
        benefits: ["Boosts immunity & vitality", "Nourishing"],
        ingredients: "Herbal extracts & honey",
        package: "15 ml Drop Bottle",
        value: 180,
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
      },
      {
        id: 89,
        name: "महास्नायुतैल Nerve Muscle Nourish Oil",
        tagline: "Nerve & muscle nourishment",
        benefits: ["Supports neuromuscular health"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
      },
      {
        id: 90,
        name: "सैरेयकरतैल Barleria Oil",
        tagline: "Therapeutic oil",
        benefits: ["Anti-inflammatory", "Supports joints & skin"],
        ingredients: "Barleria herb extract",
        package: "100 ml Bottle",
        value: 220,
      },
      {
        id: 91,
        name: "निर्गुन्डीतैल Reumatic Oil",
        tagline: "Rheumatism therapy",
        benefits: ["Relieves pain & inflammation in joints"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
      },
      {
        id: 92,
        name: "व्रणशोधनतैल Wound Cleaner Oil",
        tagline: "Wound care",
        benefits: ["Cleans & disinfects wounds"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
      },
      {
        id: 93,
        name: "व्रणरोपणतैल Wound Healing Oil",
        tagline: "Wound healing",
        benefits: ["Promotes tissue regeneration", "Reduces scars"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
      },
      {
        id: 94,
        name: "आमवाततैल Reumatoid Oil",
        tagline: "Arthritis & inflammation",
        benefits: ["Reduces rheumatoid pain & inflammation"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
      },
      {
        id: 95,
        name: "वातरक्ततैल Gout Oil",
        tagline: "Gout & joint support",
        benefits: ["Relieves gout symptoms", "Reduces inflammation"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
      },
      {
        id: 96,
        name: "भग्नतैल Fracture Oil",
        tagline: "Bone & fracture support",
        benefits: ["Aids recovery", "Strengthens fractured bones"],
        ingredients: "Herbal oils",
        package: "100 ml Bottle",
        value: 220,
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
      },
      {
        id: 98,
        name: "महागव्योषधिघृत Cow Hebs Ghee",
        tagline: "Nutritive ghee for health & vitality",
        benefits: ["Enhance digestion, immunity, and overall wellness"],
        ingredients: "Cow Ghee, Ayurvedic Herbs",
        package: "500 gms Container",
        value: 850,
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
      },
      {
        id: 102,
        name: "महावातहररिष्ट Neuro Muscular Tonic",
        tagline: "Nervous system & muscle support",
        benefits: ["Reduces joint pain & neuromuscular issues"],
        ingredients: "Ayurvedic herbal Dispense",
        package: "200 ml Bottle",
        value: 450,
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
      },
      {
        id: 121,
        name: "सुखानुस्त्रलोमन Pleasure Purging",
        tagline: "Digestive & cleansing",
        benefits: ["Supports bowel movement", "Eases constipation"],
        ingredients: "Herbal powders",
        package: "100 gms Pouch",
        value: 130,
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
      },
    ],
  },
];

