import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Divider } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  AddToCartIcon,
  AIWebsiteBuilderIcon,
  AMECardIcon,
  CustomerSupportIcon,
  DeleteIcon,
  DoneIcon,
  EditIcon,
  FindYourDomainIcon,
  FreeSSlIcon,
  MasterCardIcon,
  OrderSummaryIcon,
  RuPayCreditCardIcon,
  UnavailableDomainIcon,
  UPIIcon,
  VISACreditCardIcon,
  WalletIcon,
} from "../../common/assets/CommonAssets";
import CommonButton from "../../common/button/CommonButton";
import DropdownField from "../../common/formFields/DropdownField";
import InputField from "../../common/formFields/InputField";
import SearchDropdown from "../../common/formFields/SearchDropdown";

const sugestedDomainData = [
  { id: 1, domainName: "xyz.com", price: "Rs.800.00" },
  { id: 2, domainName: "xyz.in", price: "Rs.800.00" },
  { id: 3, domainName: "xyz.co", price: "Rs.800.00" },
  { id: 4, domainName: "xyz.net", price: "Rs.800.00" },
];

const addons = [
  {
    title: "DNS Management - (FREE!) 1 Year/s",
    desc: "External DNS Hosting can help speed up your website and improve availability with increased redundancy.",
  },
  {
    title: "ID Protection - (Rs.299.00) 1 Year/s",
    desc: "Protect your personal information and reduce the amount of spam to your inbox by enabling ID Protection.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const slideDown = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

function NewDomain() {
  const [active, setActive] = useState("default");
  const [activePaymentMethod, setActivePaymentMethod] = useState("");
  const navigate = useNavigate();

  const { control } = useForm({
    defaultValues: {
      searchDomainName: null,
      domainExtension: null,
    },
  });

  return (
    <div className="px-4">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="py-2 flex items-center space-x-3 text-[#4D4FEC]"
      >
        <span
          onClick={() => navigate(-1)}
          className="border border-[#4D4FEC] rounded-full p-1 cursor-pointer"
        >
          <ArrowBackIosNewIcon />
        </span>
        <h1 className="font-semibold text-[22px]">Register a New Domain</h1>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-3">
        <div className="xl:col-span-2 space-y-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="border rounded-lg shadow bg-white p-5"
          >
            <div className="flex items-center space-x-3">
              <FindYourDomainIcon />
              <h2 className="font-semibold text-[18px]">Find Your Domain</h2>
            </div>
            <Divider
              sx={{ borderColor: "#EAEFF4", mt: 1, borderBottomWidth: 2 }}
            />
            <div className="my-2">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                <div className="sm:col-span-3">
                  <SearchDropdown
                    control={control}
                    name="searchDomainName"
                    placeholder="Enter Your Domain Name"
                    searchIcon={true}
                    isClearable={true}
                    handleInputChange={(e) =>
                      console.log("enter domain Name", e)
                    }
                  />
                </div>
                <div>
                  <DropdownField
                    control={control}
                    name="domainExtension"
                    placeholder={".com"}
                    isClearable={true}
                  />
                </div>
                <div>
                  <CommonButton
                    type={"button"}
                    searchIcon={true}
                    label={"New Domain"}
                    className={"bg-[#4D4FEC] text-white"}
                  />
                </div>
              </div>

              <AnimatePresence>
                <motion.div
                  variants={slideDown}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overflow-hidden"
                >
                  <div className="flex space-x-2 text-[14px] items-center p-2 bg-[#FFDEDD] my-2 rounded-md text-[#EA1400] px-3">
                    <UnavailableDomainIcon />
                    <span>
                      Unfortunately the domain you selected is unavailable
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <Divider
                sx={{ borderColor: "#EAEFF4", my: 1, borderBottomWidth: 2 }}
              />

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center my-1 gap-1">
                  <h5 className="font-semibold text-sm">Suggested Domains</h5>
                  <p className="text-[#9F9F9F] text-[11px]">
                    (Domain name suggestions may not always be available.
                    Availability is checked in real-time at the point of adding
                    to the cart.)
                  </p>
                </div>
                <div
                  className="space-y-2 max-h-60 overflow-y-auto pr-1 scroll-smooth
                            [&::-webkit-scrollbar]:w-[6px]
                            [&::-webkit-scrollbar]:h-[6px]
                            [&::-webkit-scrollbar-track]:bg-[#EAEFF4]
                            [&::-webkit-scrollbar-track]:rounded-full
                            [&::-webkit-scrollbar-thumb]:bg-gradient-to-br
                            [&::-webkit-scrollbar-thumb]:from-[#4D4FEC]
                            [&::-webkit-scrollbar-thumb]:to-[#6C63FF]
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            hover:[&::-webkit-scrollbar-thumb]:bg-[#4D4FEC]
                            [scrollbar-width:thin]
                            [scrollbar-color:#4D4FEC_#EAEFF4]"
                >
                  {sugestedDomainData?.map((list, index) => {
                    const name = list.domainName || "";
                    const lastDot = name.lastIndexOf(".");
                    const base = lastDot !== -1 ? name.slice(0, lastDot) : name;
                    const ext = lastDot !== -1 ? name.slice(lastDot) : "";
                    return (
                      <motion.div
                        key={index}
                        custom={index}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm p-2 border px-4 rounded-md bg-[#EAEFF4] gap-2"
                      >
                        <h6 className="text-[#111827]">
                          {base}
                          <span className="text-[#4D4FEC]">{ext}</span>
                        </h6>
                        <div className="text-sm text-[#111827] flex space-x-2 items-center">
                          <span>{list.price}</span>
                          <motion.button
                            whileTap={{ scale: 0.94 }}
                            type="button"
                            className="font-semibold border border-[#4d4fec] px-3 py-2 rounded-[4px] text-[#4d4fec] transition whitespace-nowrap flex space-x-2 items-center"
                          >
                            <AddToCartIcon />
                            <span>Add To Cart</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#EBF3FE] p-5 rounded-md border border-[#EAEFF4]"
          >
            <h2 className="text-xl font-semibold text-[#43297A] mb-4">
              Get a FREE Domain with Hosting
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {[
                  { text: "99.9% Uptime Guarantee", icon: <DoneIcon /> },
                  {
                    text: "24/7 Customer Support",
                    icon: <CustomerSupportIcon />,
                  },
                  { text: "Unlimited Free SSL", icon: <FreeSSlIcon /> },
                  {
                    text: "AI Website Builder for Beginners",
                    icon: <AIWebsiteBuilderIcon />,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-center gap-3 bg-white px-4 py-2 rounded-md"
                  >
                    {item.icon}
                    <span className="text-[#43297A] font-medium">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="bg-white rounded-xl p-6 flex flex-col justify-center items-center text-center">
                <h3 className="text-3xl font-bold text-[#4B2E83]">
                  ₹ 219 <span className="text-gray-500 text-lg">/month</span>
                </h3>
                <p className="text-[#4B2E83] mt-2 text-sm">
                  Billed annually: ₹2,628 for 1 year
                </p>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  className="mt-5 w-full bg-[#4D4FEC] text-white font-semibold py-3 rounded-lg"
                >
                  Add Hosting
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white p-5 rounded-md border border-[#EAEFF4]"
          >
            <h2 className="text-xl font-semibold">Domains Configuration</h2>
            <Divider
              sx={{ borderColor: "#EAEFF4", mt: 1, borderBottomWidth: 2 }}
            />
            <div className="p-4 space-y-6">
              {[1, 2].map((section) => (
                <div key={section}>
                  <h3 className="text-[#4D4FEC] font-semibold mb-3">
                    xyz.com - Addons
                  </h3>
                  <div className="space-y-3">
                    {addons.map((item, i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-[#F4F6FA] border rounded-lg p-4 gap-3"
                      >
                        <div>
                          <h4 className="font-semibold text-[#111827]">
                            {item.title}
                          </h4>
                          <p className="text-sm text-[#696969] mt-1">
                            {item.desc}
                          </p>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.94 }}
                          type="button"
                          className="font-semibold border border-[#4d4fec] px-3 py-2 rounded-[4px] text-[#4d4fec] transition whitespace-nowrap flex space-x-2 items-center shrink-0"
                        >
                          <AddToCartIcon />
                          <span>Add To Cart</span>
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white p-5 rounded-md border border-[#EAEFF4]"
          >
            <h2 className="text-xl font-semibold">Nameservers</h2>
            <Divider
              sx={{ borderColor: "#EAEFF4", mt: 1, borderBottomWidth: 2 }}
            />
            <p className="text-[12px] text-[#2A3447] mt-2">
              If you want to use custom nameservers then enter them below. By
              default, new domains will use our nameservers for hosting on our
              network.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div>
                <InputField
                  control={control}
                  name="nameServers1"
                  label="NameServers1"
                />
              </div>
              <div>
                <InputField
                  control={control}
                  name="nameServers2"
                  label="NameServers2"
                />
              </div>
              <div>
                <InputField
                  control={control}
                  name="nameServers3"
                  label="NameServers3"
                />
              </div>
              <div>
                <InputField
                  control={control}
                  name="nameServers4"
                  label="NameServers4"
                />
              </div>
              <div>
                <InputField
                  control={control}
                  name="nameServers5"
                  label="NameServers5"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white p-5 rounded-md border border-[#EAEFF4]"
          >
            <h2 className="text-xl font-semibold">Billing Details</h2>
            <Divider
              sx={{ borderColor: "#EAEFF4", mt: 1, borderBottomWidth: 2 }}
            />
            <div className="border rounded-xl p-6 bg-[#FAFCFF] relative my-3">
              <button className="absolute top-4 right-4 text-[#4D4FEC]">
                <EditIcon />
              </button>
              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="text-gray-500">First & Last Name :</span>
                  <span className="font-semibold">INTRONEXUS WEB SERVICES</span>
                </p>
                <p>
                  <span className="text-gray-500">Email :</span>
                  aakashchaudhri@gmail.com
                </p>
                <p>
                  <span className="text-gray-500">Address :</span> A1/502, ANAND
                  VIHAR LIG., OPP. AMBIKA HEIGHT, GODADARA Surat, Gujarat,
                  394210, India
                </p>
                <p>
                  <span className="text-gray-500">Phone :</span> +911323225556
                </p>
              </div>
            </div>

            <Divider
              sx={{ borderColor: "#EAEFF4", mt: 1, borderBottomWidth: 2 }}
            />

            <div className="py-2">
              <h2 className="text-[#4D4FEC] font-semibold text-lg mb-2">
                Domain Registrant Information
              </h2>
              <p className="text-[#2A3447] text-xs mb-4 max-w-3xl">
                You may specify alternative registered contact details for the
                domain registration(s) in your order when placing an order on
                behalf of another person or entity. If you do not require this,
                you can skip this section.
              </p>
              <div className="max-w-4xl">
                <div className="flex border border-[#4D4FEC] rounded-md p-[3px]">
                  <button
                    onClick={() => setActive("default")}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                      active === "default"
                        ? "bg-gradient-to-r from-[#4D4FEC] to-[#6C63FF] text-white shadow"
                        : "text-[#4D4FEC]"
                    }`}
                  >
                    Use Default Contact (Details Above)
                  </button>
                  <button
                    onClick={() => setActive("new")}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                      active === "new"
                        ? "bg-gradient-to-r from-[#4D4FEC] to-[#6C63FF] text-white shadow"
                        : "text-[#4D4FEC]"
                    }`}
                  >
                    Add New Contact
                  </button>
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
                  <InputField control={control} name="email" label="Email" />
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
                  <InputField control={control} name="city" label="City" />
                </div>
                <div>
                  <InputField control={control} name="state" label="State" />
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
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border rounded-xl p-5 bg-[#FFFFFF] border-[#EAEFF4]"
          >
            <h2 className="font-semibold text-gray-700 mb-4 border-b pb-2">
              Payment Method
            </h2>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePaymentMethod("card")}
              className={`w-full flex justify-between items-center px-5 py-2 rounded-xl border transition mb-3 ${
                activePaymentMethod === "card"
                  ? "bg-gradient-to-r from-[#4D4FEC] to-[#6C63FF] text-white border-transparent"
                  : "bg-white"
              }`}
            >
              <span className="font-medium">Card</span>
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
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePaymentMethod("upi")}
              className={`w-full flex justify-between items-center px-5 py-2 rounded-xl border transition mb-3 ${
                activePaymentMethod === "upi"
                  ? "bg-gradient-to-r from-[#4D4FEC] to-[#6C63FF] text-white border-transparent"
                  : "bg-white"
              }`}
            >
              <span className="font-medium">UPI</span>
              <div className="bg-white px-3 py-2 rounded text-center border flex justify-center items-center shadow">
                <UPIIcon />
              </div>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePaymentMethod("wallet")}
              className={`w-full flex justify-between items-center px-5 py-2 rounded-xl border transition ${
                activePaymentMethod === "wallet"
                  ? "bg-gradient-to-r from-[#4D4FEC] to-[#6C63FF] text-white border-transparent"
                  : "bg-white"
              }`}
            >
              <span className="font-medium">Wallet</span>
              <div className="bg-white px-3 py-2 rounded text-center border flex justify-center items-center shadow">
                <WalletIcon />
              </div>
            </motion.button>
          </motion.div>
        </div>

        <div className="xl:col-span-1">
          <div className="sticky top-6">
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
                <DeleteIcon size={18} className="text-red-500 cursor-pointer" />
              </div>

              <div className="border rounded-lg p-4 mb-4 bg-white">
                <div className="flex justify-between font-semibold mb-2">
                  <span>PayPal.com</span>
                  <span>₹ 800.00</span>
                </div>
                <p className="text-sm text-gray-500 border-b pb-2 mb-2">
                  Addons
                </p>
                <div className="bg-white border shadow rounded-lg p-3 flex justify-between mb-2 text-sm">
                  <span>DNS Management</span>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm">(FREE!) 1 Year/s</span>
                    <DeleteIcon size={16} className="text-red-500" />
                  </div>
                </div>
                <div className="bg-white border shadow rounded-lg p-3 flex justify-between mb-2 text-sm">
                  <span>ID Protection</span>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm">(Rs.299.00) 1 Year/s</span>
                    <DeleteIcon size={16} className="text-red-500" />
                  </div>
                </div>
                <div>
                  <DropdownField
                    control={control}
                    name="year1"
                    placeholder={"Year"}
                    isClearable={true}
                  />
                </div>
              </div>

              <div className="border rounded-lg p-4 mb-4 bg-white">
                <div className="flex justify-between font-semibold mb-2">
                  <span>PayPal.com</span>
                  <span>₹ 3665.00</span>
                </div>
                <p className="text-sm text-gray-500 border-b pb-2 mb-3">
                  Addons
                </p>
                <div className="bg-white border shadow rounded-lg p-3 flex justify-between mb-2 text-sm">
                  <span>DNS Management</span>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm">(FREE!) 1 Year/s</span>
                    <DeleteIcon size={16} className="text-red-500" />
                  </div>
                </div>
                <div className="bg-white border shadow rounded-lg p-3 flex justify-between mb-2 text-sm">
                  <span>ID Protection</span>
                  <div className="flex gap-2 items-center">
                    <span className="text-sm">(Rs.299.00) 1 Year/s</span>
                    <DeleteIcon size={16} className="text-red-500" />
                  </div>
                </div>
                <div>
                  <DropdownField
                    control={control}
                    name="year2"
                    placeholder={"Year"}
                    isClearable={true}
                  />
                </div>
              </div>

              <div className="border rounded-lg p-4 bg-white mb-2">
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
              </div>

              <p className="text-center text-gray-500 text-sm mb-3">
                Do you have a promo code?
              </p>

              <label className="flex items-center gap-2 text-sm mb-4 mx-auto justify-center">
                <input type="checkbox" />I have read and agree to the
                <span className="underline">Terms of Service</span>
              </label>

              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
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

export default NewDomain;
