import {
  CheckCircle,
  Groups,
  LocalHospital,
  LocalOffer,
  Person,
  Psychology,
  Spa
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useState } from "react";
import OPDBookingModal from "../../healingServices/opdClinic/OPDBookingModal";

const memberships = [
  {
    categoryName: "Self : Primary Basic",
    serviceName: "Self Basic Membership",
    membershipNameHi: "स्वात्मन्मूलभूतसदस्यत्व",
    price: 2500,
    primaryDiscount: 2250,
    primaryDiscountAmount: -250,
    additionalDiscount: null,
    amountReducible: "Not Deductible",
    couponCode: "BSM5%",
    icon: Person,
    color: "from-lime-400 to-lime-600",
  },
  {
    categoryName: "Jnana Yog Ayu Staff",
    serviceName: "Community Staff Membership",
    membershipNameHi: "स्वकर्मकरगणसदस्यत्व",
    price: 6000,
    primaryDiscount: 5000,
    primaryDiscountAmount: -1000,
    additionalDiscount: "2500 (Only family member)",
    amountReducible: "-",
    couponCode: "BCSM15%",
    icon: Groups,
    color: "from-green-600 to-green-700",
    featured: true,
  },
  {
    categoryName: "Own : Single / Personal",
    serviceName: "Own Membership",
    membershipNameHi: "स्वकीयसदस्यत्व",
    price: 150000,
    primaryDiscount: 125000,
    primaryDiscountAmount: -25000,
    additionalDiscount: null,
    amountReducible: "Yes",
    couponCode: "BOM20%",
    icon: Person,
    color: "from-lime-700 to-green-600",
  },
  {
    categoryName: "Joint Family",
    serviceName: "Joint Family Membership",
    membershipNameHi: "स्वकुटुम्बिनीसदस्यत्व",
    price: 150000,
    primaryDiscount: 125000,
    primaryDiscountAmount: -25000,
    additionalDiscount: "1,00,000",
    amountReducible: "Yes",
    couponCode: "BJFM20%",
    icon: Groups,
    color: "from-green-700 to-lime-600",
  },
  {
    categoryName: "Ayurveda Vaidya",
    serviceName: "Root Healer Membership",
    membershipNameHi: "स्ववैद्यसदस्यत्व",
    price: 350000,
    primaryDiscount: 250000,
    primaryDiscountAmount: -100000,
    additionalDiscount: "1,00,000",
    amountReducible: "Yes",
    couponCode: "BRHM25%",
    icon: Spa,
    color: "from-lime-600 to-green-700",
  },
  {
    categoryName: "Other all Doctors, Physicians",
    serviceName: "Physician'sMembership",
    membershipNameHi: "स्वभिषज्सदस्यत्व",
    price: 275000,
    primaryDiscount: 200000,
    primaryDiscountAmount: -75000,
    additionalDiscount: "1,00,000",
    amountReducible: "Yes",
    couponCode: "BPM25%",
    icon: LocalHospital,
    color: "from-green-600 to-lime-600",
  },
  {
    categoryName: "Director of SwaGrama",
    serviceName: "Propitious Optimistic Membership",
    membershipNameHi: "सन्तोषणीयसदस्यत्व",
    price: 600000,
    primaryDiscount: 400000,
    primaryDiscountAmount: -200000,
    additionalDiscount: "1,00,000",
    amountReducible: "Yes",
    couponCode: "BPOM30%",
    icon: Psychology,
    color: "from-lime-700 to-green-700",
  },
];

const MembershipCard = ({
  membership,
  index,
  setOpenMembershipModal,
  setSelectedService,
}) => {
  const IconComponent = membership.icon;
  const discountPercent = Math.abs(
    Math.round(
      (membership.primaryDiscountAmount / membership.price) * 100
    )
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <div
        className={`relative h-full bg-white rounded-xl overflow-hidden transition-all duration-300 ${
          membership.featured
            ? "shadow-xl ring-2 ring-green-500 ring-offset-2"
            : "shadow-lg hover:shadow-xl border border-gray-200"
        }`}
      >
        {" "}
        <div className={`bg-gradient-to-br ${membership.color} p-5`}>
          <div className="flex items-start justify-between mb-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg">
              <IconComponent className="text-white" style={{ fontSize: 28 }} />
            </div>
            <div className="bg-white/25 backdrop-blur-sm px-3 py-1.5 rounded-lg text-center">
              <div className="text-white font-bold text-base leading-tight">
                {discountPercent}%
              </div>
              <div className="text-white/90 text-xs">SAVE</div>
            </div>
          </div>

          <h3 className="text-white font-bold text-base mb-1 leading-tight">
            {membership.categoryName}
          </h3>
          <p className="text-white/95 text-sm mb-1">
            {membership.serviceName}
          </p>
          <p className="text-white/80 text-xs">{membership.membershipNameHi}</p>
        </div>
        <div className="p-5">
          <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-sm">Original Price</span>
              <span className="text-gray-400 line-through text-sm">
                ₹{membership.price.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-300">
              <span className="text-gray-800 text-sm font-semibold pt-1">
                Member Price
              </span>
              <div className="text-right">
                <div
                  className={`bg-gradient-to-r ${membership.color} bg-clip-text text-transparent font-bold text-xl mb-1`}
                >
                  ₹{membership.primaryDiscount.toLocaleString("en-IN")}
                </div>
                <div className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded inline-block">
                  Save ₹
                  {Math.abs(membership.primaryDiscountAmount).toLocaleString(
                    "en-IN"
                  )}
                </div>
              </div>
            </div>

            {membership.additionalDiscount && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Additional Member</span>
                <span className="text-green-600 font-bold text-sm">
                  {membership.additionalDiscount}
                </span>
              </div>
            )}
          </div>
          <div className="space-y-2.5 mb-4">
            <div className="flex items-center gap-2.5 bg-green-50 rounded-lg p-3 border border-green-100">
              <div className="bg-green-500 rounded-full p-1 flex-shrink-0 h-8 w-8 text-center flex justify-center items-center">
                <LocalOffer className="text-white" style={{ fontSize: 16 }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-gray-600 text-xs">Coupon Code</div>
                <div className="text-gray-900 text-sm font-bold">
                  {membership.couponCode}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="bg-gray-500 rounded-full p-1 flex-shrink-0 h-8 w-8 text-center flex justify-center items-center">
                <CheckCircle className="text-white" style={{ fontSize: 16 }} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-gray-600 text-xs">Amount Reducible</div>
                <div className="text-gray-900 text-sm font-bold">
                  {membership.amountReducible}
                </div>
              </div>
            </div>
          </div>
          <motion.button
            type="buton"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setOpenMembershipModal(true);
              setSelectedService(membership)
            }}
            className={`w-full bg-gradient-to-r ${membership.color} text-white font-semibold text-sm py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            Choose This Plan →
          </motion.button>
        </div>
        <div className={`h-1 bg-gradient-to-r ${membership.color}`}></div>
      </div>
    </motion.div>
  );
};

export default function MembershipCards() {
  const [openMembershipModal, setOpenMembershipModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-lime-50/30 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto mb-8 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 via-lime-600 to-green-600 bg-clip-text text-transparent mb-2">
          Choose Your Family Membership
        </h1>
        <p className="text-gray-600 text-sm">
          Extend Your Joint Family: Self / Mother / Father / Wife / Husband /
          Son / Daughter
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-lime-500 mx-auto mt-3 rounded-full"></div>
      </motion.div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {memberships.map((membership, index) => (
            <MembershipCard
              key={index}
              membership={membership}
              index={index}
              setOpenMembershipModal={setOpenMembershipModal}
              setSelectedService={setSelectedService}
            />
          ))}
        </div>
      </div>
      {openMembershipModal && (
        <OPDBookingModal
          open={openMembershipModal}
          handleClose={() => {
            setOpenMembershipModal(false);
            setSelectedService(null);
          }}
          selectedService={selectedService}
        />
      )}
    </div>
  );
}
