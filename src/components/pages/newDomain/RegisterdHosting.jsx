import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CampaignIcon from "@mui/icons-material/Campaign";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import {
  AddToCartIcon,
  AMECardIcon,
  DeleteIcon,
  DomainNameIcon,
  EditIcon,
  MasterCardIcon,
  NewsIcon,
  OrderSummaryIcon,
  RegisterNewDomain,
  RuPayCreditCardIcon,
  TransferDomainIcon,
  UPIIcon,
  VISACreditCardIcon,
  WalletIcon,
} from "../../common/assets/CommonAssets";
import { Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "../../common/formFields/InputField";
import DropdownField from "../../common/formFields/DropdownField";
import { ArrowRight } from "@mui/icons-material";

const HOSTING_PLANS = [
  { label: "Monthly", price: "₹ 136.00", sub: null, save: "Save 44%" },
  {
    label: "Quarterly",
    price: "₹ 348.00",
    sub: "Rs.116.00/mo",
    save: "Save 44%",
  },
  {
    label: "Semi-Annually",
    price: "₹ 576.00",
    sub: "Rs.96.00/mo",
    save: "Save 44%",
  },
  {
    label: "Annually",
    price: "₹ 912.00",
    sub: "Rs.76.00/mo",
    save: "Save 44%",
    border: true,
  },
  {
    label: "Biennially",
    price: "₹ 1344.00",
    sub: "Rs.56.00/mo",
    save: "Save 44%",
  },
  {
    label: "Triennially",
    price: "₹ 1296.00",
    sub: "Rs.36.00/mo",
    save: "Save 44%",
  },
];

const DOMAIN_TABS = [
  "Register a new domain",
  "Domain Transfer",
  "Order Hosting Only",
];

const DOMAIN_EXTENSIONS = [".com", ".in", ".co", ".net", ".org", ".io"];

const SUGGESTED_DOMAINS = [
  { name: "xyz", ext: ".com", price: "Rs.800.00" },
  { name: "xyz", ext: ".in", price: "Rs.800.00" },
  { name: "xyz", ext: ".co", price: "Rs.800.00" },
  { name: "xyz", ext: ".net", price: "Rs.800.00" },
];

const DOMAIN_ADDONS = [
  {
    id: 1,
    title: "DNS Management",
    badge: "FREE!",
    duration: "1 Year/s",
    description:
      "External DNS Hosting can help speed up your website and improve availability with increased redundancy.",
    price: null,
  },
  {
    id: 2,
    title: "ID Protection",
    badge: null,
    duration: "1 Year/s",
    description:
      "Protect your personal information and reduce the amount of spam to your inbox by enabling ID Protection.",
    price: "Rs.299.00",
  },
];

const ORDER_SUMMARY_ITEMS = [
  { domain: "PayPal.com", price: "₹ 800.00", yearFieldName: "year1" },
  { domain: "PayPal.com", price: "₹ 3665.00", yearFieldName: "year2" },
];

const PAYMENT_METHODS = [
  {
    methodKey: "card",
    label: "Card",
  },
  {
    methodKey: "upi",
    label: "UPI",
  },
  {
    methodKey: "wallet",
    label: "Wallet",
  },
];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const CartSVGIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
    />
  </svg>
);

const CheckSVGIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export default function SharedHosting() {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [activeDomainTabIndex, setActiveDomainTabIndex] = useState(0);
  const [activeBillingContactTab, setActiveBillingContactTab] = useState("new");
  const [domainSearchInput, setDomainSearchInput] = useState("");
  const [selectedDomainExtension, setSelectedDomainExtension] =
    useState(".com");
  const [isDomainExtensionDropdownOpen, setIsDomainExtensionDropdownOpen] =
    useState(false);
  const [cartItemsMap, setCartItemsMap] = useState({ "xyz.com": true });
  const [addonAddedStateMap, setAddonAddedStateMap] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const paymentMethodSectionRef = useRef(null);

  const { control } = useForm({
    defaultValues: {
      searchDomainName: null,
      domainExtension: null,
      firstName: null,
      lastName: null,
      email: null,
      countryCode: null,
      phoneNumber: null,
      companyName: null,
      address: null,
      city: null,
      state: null,
      postCode: null,
      country: null,
      taxId: null,
      year1: null,
      year2: null,
    },
  });

  const handleToggleCartItem = useCallback((itemKey) => {
    setCartItemsMap((prev) => ({ ...prev, [itemKey]: !prev[itemKey] }));
  }, []);

  const handleAddonAddToCart = useCallback((addonId) => {
    setAddonAddedStateMap((prev) => ({ ...prev, [addonId]: true }));
    setTimeout(() => {
      setAddonAddedStateMap((prev) => ({ ...prev, [addonId]: false }));
    }, 2000);
  }, []);

  const handleClearDomainSearchInput = useCallback(() => {
    setDomainSearchInput("");
  }, []);

  const handleSelectDomainExtension = useCallback((extension) => {
    setSelectedDomainExtension(extension);
    setIsDomainExtensionDropdownOpen(false);
  }, []);

  const handleSelectPaymentMethod = useCallback((methodKey) => {
    setSelectedPaymentMethod(methodKey);
    setTimeout(() => {
      paymentMethodSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  }, []);

  const renderPaymentMethodIcons = (methodKey) => {
    if (methodKey === "card") {
      return (
        <div className="flex gap-2 flex-wrap justify-end">
          <div className="bg-white px-3 py-2 rounded text-center border flex justify-center items-center shadow">
            <VISACreditCardIcon />
          </div>
          <div className="bg-white px-3 py-2 rounded text-center border flex justify-center items-center shadow">
            <RuPayCreditCardIcon />
          </div>
          <div className="bg-white px-3 py-2 rounded text-center border flex justify-center items-center shadow">
            <MasterCardIcon />
          </div>
          <div className="bg-white px-3 py-2 rounded text-center border flex justify-center items-center shadow">
            <AMECardIcon />
          </div>
        </div>
      );
    }
    if (methodKey === "upi") {
      return (
        <div className="bg-white px-3 py-2 rounded text-center border flex justify-center items-center shadow">
          <UPIIcon />
        </div>
      );
    }
    if (methodKey === "wallet") {
      return (
        <div className="bg-white px-3 py-2 rounded text-center border flex justify-center items-center shadow">
          <WalletIcon />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 p-4 md:p-8">
      <motion.div
        className="flex items-center gap-2 mb-3 w-full"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#EEF0FF" }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 rounded-full border border-[#4D4FEC] flex items-center justify-center text-[#4D4FEC] transition-colors"
        >
          <ArrowBackIosNewIcon style={{ fontSize: 14 }} />
        </motion.button>
        <h1 className="text-xl font-bold text-[#4D4FEC]">Shared Hosting</h1>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-3  w-full">
        <div className="w-full mx-auto col-span-2">
          <div className="flex items-center justify-center mb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
              {HOSTING_PLANS.map((plan, planIndex) => (
                <motion.button
                  key={plan.label}
                  onClick={() => setSelectedPlanIndex(planIndex)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: planIndex * 0.06,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 8px 20px rgba(77,79,236,0.15)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative text-left rounded-[9px] p-4 border-2 transition-colors duration-200 ${
                    selectedPlanIndex === planIndex
                      ? "bg-[#4D4FEC] border-[#4D4FEC]"
                      : "bg-[#EBF3FE] border-[#4D4FEC] "
                  }`}
                >
                  <span className="absolute -top-px -right-px bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-tr-[9px] rounded-bl-xl">
                    {plan.save}
                  </span>
                  <p
                    className={`text-sm font-semibold mb-1.5 ${selectedPlanIndex === planIndex ? "text-white" : "text-gray-800"}`}
                  >
                    {plan.label}
                  </p>
                  <p
                    className={`text-sm font-bold ${selectedPlanIndex === planIndex ? "text-white" : "text-[#4D4FEC]"}`}
                  >
                    {plan.price}
                    {plan.sub && (
                      <span
                        className={`text-xs font-normal ml-1 ${selectedPlanIndex === planIndex ? "text-indigo-200" : "text-[#4D4FEC]"}`}
                      >
                        ({plan.sub})
                      </span>
                    )}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center border border-indigo-400 rounded-[9px] p-1 bg-white gap-1 sm:gap-0">
                {DOMAIN_TABS.map((tab, tabIndex) => (
                  <div key={tab} className="flex-1 flex items-center">
                    <motion.button
                      onClick={() => setActiveDomainTabIndex(tabIndex)}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full py-2.5 px-4 text-sm font-semibold rounded-[9px] transition-all ${
                        activeDomainTabIndex === tabIndex
                          ? "bg-[#4D4FEC] text-white shadow-sm"
                          : "text-[#4D4FEC] bg-transparent hover:bg-indigo-50"
                      }`}
                    >
                      {tab}
                    </motion.button>
                    {tabIndex < DOMAIN_TABS.length - 1 && (
                      <div
                        className={`hidden sm:block w-px h-5 shrink-0 ${activeDomainTabIndex === tabIndex || activeDomainTabIndex === tabIndex + 1 ? "bg-transparent" : "bg-gray-300"}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <AnimatePresence mode="wait">
                {activeDomainTabIndex === 0 && (
                  <div className="p-5 border rounded-lg shadow">
                    <motion.div
                      className="flex items-center gap-3 mb-5"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.05 }}
                    >
                      <div className="flex items-center justify-center">
                        <RegisterNewDomain className="text-gray-600" />
                      </div>
                      <h2 className="text-lg font-bold text-gray-800">
                        Register a new domain
                      </h2>
                    </motion.div>

                    <motion.div
                      className="flex flex-col sm:flex-row gap-2 mb-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.1 }}
                    >
                      <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-3 gap-2 bg-white focus-within:border-indigo-300 transition-colors">
                        <input
                          type="text"
                          placeholder="Enter Your Domain Name"
                          value={domainSearchInput}
                          onChange={(e) => setDomainSearchInput(e.target.value)}
                          className="flex-1 py-2.5 text-sm outline-none text-gray-700 placeholder-gray-400"
                        />
                        <AnimatePresence>
                          {domainSearchInput && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              onClick={handleClearDomainSearchInput}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <CloseIcon fontSize="small" />
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="relative">
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            setIsDomainExtensionDropdownOpen(
                              !isDomainExtensionDropdownOpen,
                            )
                          }
                          className="flex items-center gap-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-white hover:border-indigo-300 transition-colors min-w-24 w-full sm:w-auto"
                        >
                          {selectedDomainExtension}
                          <motion.span
                            animate={{
                              rotate: isDomainExtensionDropdownOpen ? 180 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <KeyboardArrowDownIcon
                              fontSize="small"
                              className="text-gray-400"
                            />
                          </motion.span>
                        </motion.button>
                        <AnimatePresence>
                          {isDomainExtensionDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
                              animate={{ opacity: 1, y: 0, scaleY: 1 }}
                              exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                              transition={{ duration: 0.18 }}
                              className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden min-w-24"
                            >
                              {DOMAIN_EXTENSIONS.map(
                                (extension, extensionIndex) => (
                                  <motion.button
                                    key={extension}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      delay: extensionIndex * 0.03,
                                    }}
                                    onClick={() =>
                                      handleSelectDomainExtension(extension)
                                    }
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 transition-colors ${selectedDomainExtension === extension ? "text-[#4D4FEC] font-semibold" : "text-gray-700"}`}
                                  >
                                    {extension}
                                  </motion.button>
                                ),
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center gap-2 bg-[#4D4FEC] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                      >
                        <SearchIcon fontSize="small" />
                        New Domain
                      </motion.button>
                    </motion.div>

                    <motion.div
                      className="flex items-start gap-2 bg-[#D2FFE7] border border-green-200 rounded-xl px-4 py-3 mb-5"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.15 }}
                    >
                      <NewsIcon />
                      <p className="text-sm text-[#10A957]">
                        Great news! You get a
                        <span className="font-semibold">Free Domain</span> +3
                        extra months of
                        <span className="font-semibold">Free Hosting</span> with
                        this order.
                      </p>
                    </motion.div>

                    <motion.div
                      className="flex flex-col sm:flex-row items-baseline gap-3 mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-sm font-bold text-[#2A3547] whitespace-nowrap">
                        Suggested Domains
                      </span>
                      <span className="text-[11px] text-[#9F9F9F]">
                        (Domain name suggestions may not always be available.
                        Availability is checked in real-time at the point of
                        adding to the cart.)
                      </span>
                    </motion.div>

                    <div className="flex flex-col divide-y divide-gray-100">
                      {SUGGESTED_DOMAINS.map((suggestedDomain, domainIndex) => {
                        const cartItemKey =
                          suggestedDomain.name + suggestedDomain.ext;
                        const isDomainInCart = cartItemsMap[cartItemKey];
                        return (
                          <motion.div
                            key={cartItemKey}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.5 + domainIndex * 0.07,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex flex-wrap sm:flex-nowrap items-center justify-between py-3 gap-2"
                          >
                            <span className="text-sm text-gray-700">
                              {suggestedDomain.name}
                              <span className="text-[#4D4FEC] font-semibold">
                                {suggestedDomain.ext}
                              </span>
                            </span>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-700">
                                {suggestedDomain.price}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() =>
                                  handleToggleCartItem(cartItemKey)
                                }
                                className={`flex items-center gap-2 border rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                                  isDomainInCart
                                    ? "border-gray-300 text-gray-500 hover:border-red-300 hover:text-red-500"
                                    : "border-[#4D4FEC] text-[#4D4FEC] hover:bg-indigo-50"
                                }`}
                              >
                                <AnimatePresence mode="wait">
                                  {isDomainInCart ? (
                                    <motion.span
                                      key="remove"
                                      initial={{ opacity: 0, y: 4 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -4 }}
                                      className="flex items-center gap-2"
                                    >
                                      <CloseIcon fontSize="small" />
                                      Remove
                                    </motion.span>
                                  ) : (
                                    <motion.span
                                      key="add"
                                      initial={{ opacity: 0, y: 4 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -4 }}
                                      className="flex items-center gap-2"
                                    >
                                      <AddToCartIcon fontSize="small" />
                                      Add To Cart
                                    </motion.span>
                                  )}
                                </AnimatePresence>
                              </motion.button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {activeDomainTabIndex === 1 && (
                  <motion.div
                    key="transfer"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="py-2 text-center text-gray-400 text-sm"
                  >
                    <div className="bg-white rounded-[9px] shadow w-full border px-6 py-5">
                      <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                        <RegisterNewDomain />

                        <h1 className="text-[18px] font-semibold text-gray-900 leading-tight">
                          Transfer your domain from another registrar
                        </h1>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                        <div className="relative flex-1">
                          <DropdownField
                            control={control}
                            name="domainName"
                            placeholder="Enter Your Domain Name"
                            isClearable={true}
                          />
                        </div>

                        <div className="relative w-full sm:w-36">
                          <DropdownField
                            control={control}
                            name=".com"
                            placeholder=".com"
                            isClearable={true}
                          />
                        </div>

                        <div className="flex-1 sm:max-w-xs">
                          <InputField
                            control={control}
                            name="eppCode"
                            label="EPP Code/ Auth"
                          />
                        </div>

                        <button className="flex items-center justify-center gap-2 bg-[#4D4FEC] text-white font-semibold rounded-[4px] px-5 py-[7.5px] text-sm sm:text-base whitespace-nowrap shadow-sm transition-colors duration-150">
                          <TransferDomainIcon />
                          Transfer Domain
                        </button>
                      </div>

                      <p className="text-start mt-3 text-sm font-medium text-green-600">
                        Your domain is eligible for transfer
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeDomainTabIndex === 2 && (
                  <motion.div
                    key="hosting"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="py-1 text-center text-gray-400 text-sm"
                  >
                    <div className="bg-white rounded-[9px] shadow w-full border px-6 py-5">
                      <div className="flex items-center gap-3 mb-3 pb-3 border-b-2 border-gray-100">
                        <RegisterNewDomain />

                        <h1 className="text-[18px] font-semibold text-gray-900 leading-tight">
                          I will use my existing domain and update my
                          nameservers
                        </h1>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                        <div className="relative flex-1">
                          <DropdownField
                            control={control}
                            name="www"
                            placeholder="www"
                            isClearable={true}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <motion.div
                  key="register"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="my-3 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-white flex items-center justify-center w-full">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="w-full bg-white rounded-[9px] shadow border overflow-hidden"
                    >
                      <div className="px-6 py-3 border-b-2 border-slate-100">
                        <motion.h2
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4 }}
                          className="text-xl sm:text-[18px] font-bold text-slate-800"
                        >
                          Domains Configuration
                        </motion.h2>
                      </div>

                      <div className="p-3 space-y-4">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <span className="text-[#4D4FEC] font-semibold text-sm sm:text-base pl-3">
                            xyz.com
                          </span>
                          <span className="text-slate-300">—</span>
                          <span className="text-indigo-400 font-medium text-sm">
                            Addons
                          </span>
                        </motion.div>

                        <div className="space-y-3">
                          {DOMAIN_ADDONS.map((addon, addonIndex) => {
                            const isAddonAdded = !!addonAddedStateMap[addon.id];
                            return (
                              <motion.div
                                key={addon.id}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.4,
                                  delay: addonIndex * 0.12,
                                  ease: "easeOut",
                                }}
                                className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-[#EAEFF4] bg-[#FAFCFF] hover:border-indigo-100 hover:shadow-md hover:shadow-indigo-50 transition-all duration-300"
                              >
                                <motion.div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-[#4D4FEC] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="flex-1 pl-1">
                                  <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <span className="text-slate-800 font-semibold text-sm">
                                      {addon.title}
                                    </span>
                                    {addon.badge && (
                                      <motion.span
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                          delay: addonIndex * 0.12 + 0.25,
                                        }}
                                        className="text-[10px] font-bold tracking-widest uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full"
                                      >
                                        {addon.badge}
                                      </motion.span>
                                    )}
                                    {addon.price && (
                                      <span className="text-[11px] font-semibold text-[#4D4FEC] bg-indigo-50 px-2 py-0.5 rounded-full">
                                        {addon.price}
                                      </span>
                                    )}
                                    <span className="text-slate-400 text-xs font-medium">
                                      {addon.duration}
                                    </span>
                                  </div>
                                  <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
                                    {addon.description}
                                  </p>
                                </div>

                                <div className="sm:flex-shrink-0">
                                  <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    whileHover={{ scale: 1.03 }}
                                    onClick={() =>
                                      handleAddonAddToCart(addon.id)
                                    }
                                    className={`flex items-center gap-2 border rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                                      isAddonAdded
                                        ? "border-emerald-400 text-emerald-600 bg-emerald-50"
                                        : "border-[#4D4FEC] text-[#4D4FEC] hover:bg-indigo-50"
                                    }`}
                                  >
                                    <AnimatePresence mode="wait">
                                      {isAddonAdded ? (
                                        <motion.span
                                          key="check"
                                          initial={{ opacity: 0, y: 6 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -6 }}
                                          className="flex items-center gap-2"
                                        >
                                          <CheckSVGIcon />
                                          Added!
                                        </motion.span>
                                      ) : (
                                        <motion.span
                                          key="cart"
                                          initial={{ opacity: 0, y: 6 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -6 }}
                                          className="flex items-center gap-2"
                                        >
                                          <AddToCartIcon fontSize="small" />
                                          Add To Cart
                                        </motion.span>
                                      )}
                                    </AnimatePresence>
                                  </motion.button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    variants={fadeUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="bg-white p-5 rounded-[9px] border border-[#EAEFF4]"
                  >
                    <h2 className="text-xl font-semibold">Billing Details</h2>
                    <Divider
                      sx={{
                        borderColor: "#EAEFF4",
                        mt: 1,
                        borderBottomWidth: 2,
                      }}
                    />

                    <motion.div
                      className="border rounded-xl p-6 bg-[#FAFCFF] relative my-3 text-[14px]"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.1 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute top-4 right-4 text-[#4D4FEC]"
                      >
                        <EditIcon />
                      </motion.button>
                      <div className="space-y-3 text-gray-700">
                        <p>
                          <span className="text-gray-500">
                            First & Last Name :&nbsp;
                          </span>
                          <span className="font-semibold">
                            INTRONEXUS WEB SERVICES
                          </span>
                        </p>
                        <p>
                          <span className="text-gray-500">Email :&nbsp;</span>
                          aakashchaudhri@gmail.com
                        </p>
                        <p>
                          <span className="text-gray-500">Address :&nbsp;</span>
                          A1/502, ANAND VIHAR LIG., OPP. AMBIKA HEIGHT, GODADARA
                          Surat, Gujarat, 394210, India
                        </p>
                        <p>
                          <span className="text-gray-500">Phone :&nbsp;</span>
                          +911323225556
                        </p>
                      </div>
                    </motion.div>

                    <Divider
                      sx={{
                        borderColor: "#EAEFF4",
                        mt: 1,
                        borderBottomWidth: 2,
                      }}
                    />

                    <div className="py-2">
                      <h2 className="text-[#4D4FEC] font-semibold text-[16px] mb-2">
                        Domain Registrant Information
                      </h2>
                      <p className="text-[#2A3447] text-xs mb-4 max-w-3xl">
                        You may specify alternative registered contact details
                        for the domain registration(s) in your order when
                        placing an order on behalf of another person or entity.
                        If you do not require this, you can skip this section.
                      </p>
                      <div className="max-w-4xl">
                        <div className="flex border border-[#4D4FEC] rounded-md p-[3px]">
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              setActiveBillingContactTab("default")
                            }
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                              activeBillingContactTab === "default"
                                ? "bg-gradient-to-r from-[#4D4FEC] to-[#6C63FF] text-white shadow"
                                : "text-[#4D4FEC]"
                            }`}
                          >
                            Use Default Contact (Details Above)
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveBillingContactTab("new")}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                              activeBillingContactTab === "new"
                                ? "bg-gradient-to-r from-[#4D4FEC] to-[#6C63FF] text-white shadow"
                                : "text-[#4D4FEC]"
                            }`}
                          >
                            Add New Contact
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm my-2">Personal Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <InputField
                            control={control}
                            name="firstName"
                            label="First Name"
                          />
                        </div>
                        <div>
                          <InputField
                            control={control}
                            name="lastName"
                            label="Last Name"
                          />
                        </div>
                        <div>
                          <InputField
                            control={control}
                            name="email"
                            label="Email"
                          />
                        </div>
                        <div className="flex space-x-0">
                          <div className="w-[25%]">
                            <DropdownField
                              control={control}
                              name="countryCode"
                              placeholder="+91"
                            />
                          </div>
                          <div className="w-full">
                            <InputField
                              control={control}
                              name="phoneNumber"
                              label="Phone Number"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <h4 className="text-sm my-2">Billing Address</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="col-span-1 md:col-span-3">
                          <InputField
                            control={control}
                            name="companyName"
                            label="Company Name (Optional)"
                          />
                        </div>
                        <div className="col-span-1 md:col-span-3">
                          <InputField
                            control={control}
                            name="address"
                            label="Address"
                          />
                        </div>
                        <div>
                          <InputField
                            control={control}
                            name="city"
                            label="City"
                          />
                        </div>
                        <div>
                          <InputField
                            control={control}
                            name="state"
                            label="State"
                          />
                        </div>
                        <div>
                          <InputField
                            control={control}
                            name="postCode"
                            label="Post Code"
                          />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                          <DropdownField
                            control={control}
                            name="country"
                            placeholder={"Country"}
                          />
                        </div>
                        <div>
                          <InputField
                            control={control}
                            name="taxId"
                            label="TAX ID (Optional)"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    ref={paymentMethodSectionRef}
                    variants={fadeUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    className="border rounded-xl p-5 bg-[#FFFFFF] border-[#EAEFF4] mt-3"
                  >
                    <h2 className="font-semibold text-gray-700 mb-4 border-b pb-2">
                      Payment Method
                    </h2>

                    {PAYMENT_METHODS.map(
                      (paymentOption, paymentOptionIndex) => (
                        <motion.button
                          key={paymentOption.methodKey}
                          whileTap={{ scale: 0.98 }}
                          whileHover={{ scale: 1.01 }}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: paymentOptionIndex * 0.08,
                            duration: 0.3,
                          }}
                          onClick={() =>
                            handleSelectPaymentMethod(paymentOption.methodKey)
                          }
                          className={`w-full flex justify-between items-center px-5 py-2 rounded-xl border transition ${paymentOptionIndex < PAYMENT_METHODS.length - 1 ? "mb-3" : ""} ${
                            selectedPaymentMethod === paymentOption.methodKey
                              ? "bg-gradient-to-r from-[#4D4FEC] to-[#6C63FF] text-white border-transparent shadow-md"
                              : "bg-white hover:border-indigo-200"
                          }`}
                        >
                          <span className="font-medium">
                            {paymentOption.label}
                          </span>
                          {renderPaymentMethodIcons(paymentOption.methodKey)}
                        </motion.button>
                      ),
                    )}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-1">
          <div className="sticky md:top-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border border-[#EAEFF4] rounded-md bg-[#FFFFFF] p-4"
            >
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <OrderSummaryIcon /> Order Summary
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <DeleteIcon
                    size={18}
                    className="text-red-500 cursor-pointer"
                  />
                </motion.button>
              </div>

              {ORDER_SUMMARY_ITEMS.map((orderItem, orderItemIndex) => (
                <motion.div
                  key={orderItemIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + orderItemIndex * 0.1,
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border rounded-lg p-4 mb-4 bg-white"
                >
                  <div className="flex justify-between font-semibold mb-2">
                    <span>{orderItem.domain}</span>
                    <span>{orderItem.price}</span>
                  </div>
                  <p className="text-sm text-gray-500 border-b pb-2 mb-2">
                    Addons
                  </p>
                  <div className="bg-white border shadow rounded-lg p-3 flex justify-between mb-2 text-sm">
                    <span>DNS Management</span>
                    <div className="flex gap-2 items-center">
                      <span className="text-sm">(FREE!) 1 Year/s</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <DeleteIcon size={16} className="text-red-500" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="bg-white border shadow rounded-lg p-3 flex justify-between mb-2 text-sm">
                    <span>ID Protection</span>
                    <div className="flex gap-2 items-center">
                      <span className="text-sm">(Rs.299.00) 1 Year/s</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <DeleteIcon size={16} className="text-red-500" />
                      </motion.button>
                    </div>
                  </div>
                  <div>
                    <DropdownField
                      control={control}
                      name={orderItem.yearFieldName}
                      placeholder={"Year"}
                      isClearable={true}
                    />
                  </div>
                </motion.div>
              ))}

              <motion.div
                className="border rounded-lg p-4 bg-white mb-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.35 }}
              >
                <div className="flex justify-between mb-2 text-gray-600">
                  <span>Subtotal</span>
                  <span>₹ 4465.00</span>
                </div>
                <Divider
                  sx={{ borderColor: "#EAEFF4", mt: 1, borderBottomWidth: 2 }}
                />
                <div className="flex justify-between mb-2 text-gray-600 text-sm mt-1">
                  <span>( CGST 9% + SGST 9% ) @ 18.00%</span>
                  <span>₹ 803.70</span>
                </div>
                <Divider
                  sx={{ borderColor: "#EAEFF4", mt: 1, borderBottomWidth: 2 }}
                />
                <div className="flex justify-between font-semibold text-lg mt-1">
                  <span>Total Due Today</span>
                </div>
                <p className="text-[#4D4FEC] text-2xl font-bold">₹ 5268.70</p>
              </motion.div>

              <p className="text-center text-gray-500 text-sm mb-3">
                Do you have a promo code?
              </p>

              <label className="flex items-center gap-2 text-sm mb-4 mx-auto justify-center cursor-pointer">
                <input type="checkbox" />I have read and agree to the
                <span className="underline">Terms of Service</span>
              </label>

              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 20px rgba(77,79,236,0.35)",
                }}
                className="w-full bg-gradient-to-r from-[#4D4FEC] to-[#6C63FF] text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2"
              >
                Complete Order <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
