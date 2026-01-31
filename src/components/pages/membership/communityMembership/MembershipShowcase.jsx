import { AnimatePresence, motion } from 'framer-motion';
import {
  Brain,
  Check,
  ChevronDown,
  Hospital,
  Leaf,
  User,
  Users,
  X
} from 'lucide-react';
import { useState } from 'react';

const mergedMemberships = [
  {
    title: "स्वात्मन्सदस्यत्व Self Membership",
    description: "Primary Basic 5% Discount Membership. Open for all.",
    discountText: "Self-Primary / Basic : स्वात्मन्सदस्यत्व Self Membership ; 5% Discount Membership",
    benifits: ["Individual Only"],
    categoryName: "Self : Primary Basic",
    serviceName: "Self Basic Membership",
    membershipNameHi: "स्वात्मन्मूलभूतसदस्यत्व",
    price: 2500,
    primaryDiscount: 2250,
    primaryDiscountAmount: -250,
    additionalDiscount: null,
    couponCode: "BSM5%",
    icon: User,
    gradientClass: "from-lime-200 to-lime-300",
    featured: false,
  },
  {
    title: "स्वकर्मकरगणसदस्यत्व Community Staff Membership",
    description: "स्वकर्मकरगणसदस्यत्व Community Staff Membership : 20% Discount Membership Unlock a world of meaningful benefits tailored exclusively for the dedicated staff of Swagrama Community and our valued partners.",
    discountText: "Staff Family Membership – स्वकर्मकरगणसदस्यत्व Community Staff Membership : 20% Discount Membership",
    benifits: ["Mother", "Father", "Wife", "Husband", "Son", "Daughter", "Brother", "Sister"],
    categoryName: "Jnana Yog Ayu Staff",
    serviceName: "Community Staff Membership",
    membershipNameHi: "स्वकर्मकरगणसदस्यत्व",
    price: 6000,
    primaryDiscount: 5000,
    primaryDiscountAmount: -1000,
    additionalDiscount: "2500 (Only family member)",
    couponCode: "BCSM15%",
    icon: Users,
    gradientClass: "from-green-200 to-green-300",
    featured: true,
  },
  {
    title: "स्वकीयसदस्यत्व Own Membership",
    description: "Designed for Independent Living Souls. Feel Alone in the City? Longing for a Community That Feels Like Family? Swagrama Community introduces the स्वकीयसदस्यत्व, specially crafted for those who live alone.",
    discountText: "Single Person Membership – स्वकीयसदस्यत्व Own Membership: 20% Discount Membership",
    benifits: ["Individual Only"],
    categoryName: "Own : Single / Personal",
    serviceName: "Own Membership",
    membershipNameHi: "स्वकीयसदस्यत्व",
    price: 150000,
    primaryDiscount: 125000,
    primaryDiscountAmount: -25000,
    additionalDiscount: null,
    couponCode: "BOM20%",
    icon: User,
    gradientClass: "from-lime-300 to-green-200",
    featured: false,
  },
  {
    title: "स्वकुटुम्बिनीसदस्यत्व Joint Family Membership",
    description: "Rekindling the Spirit of Living Together. 🏡 Bring Back the Power of Togetherness. In today's fast-paced, fragmented world, the greatest casualty has been the traditional joint family system.",
    discountText: "Joint Family Membership – स्वकुटुम्बिनीसदस्यत्व Joint Family Membership : 20% Discount Membership",
    benifits: ["Self (Group Leader)", "Mother", "Father", "Wife", "Husband", "Son (Up to 2)", "Daughter (Up to 2)"],
    categoryName: "Joint Family",
    serviceName: "Joint Family Membership",
    membershipNameHi: "स्वकुटुम्बिनीसदस्यत्व",
    price: 150000,
    primaryDiscount: 125000,
    primaryDiscountAmount: -25000,
    additionalDiscount: "1,00,000",
    couponCode: "BJFM20%",
    icon: Users,
    gradientClass: "from-green-300 to-lime-200",
    featured: false,
  },
  {
    title: "स्वआदिवैद्यसदस्यत्व Root Healer Membership",
    description: "For Ayurvedic practitioners, this membership is more than a privilege—it's a gateway to living the Ayurvedic life you truly believe in. The Root Healer Membership is your path back to nature.",
    discountText: "Root Healer's Family Membership: स्वआदिवैद्यसदस्यत्व Root Healer Membership : 25% Discount",
    benifits: ["Self (Group Leader)", "Mother", "Father", "Wife", "Husband", "Son (Up to 2)", "Daughter (Up to 2)"],
    categoryName: "Ayurveda Vaidya",
    serviceName: "Root Healer Membership",
    membershipNameHi: "स्ववैद्यसदस्यत्व",
    price: 350000,
    primaryDiscount: 250000,
    primaryDiscountAmount: -100000,
    additionalDiscount: "1,00,000",
    couponCode: "BRHM25%",
    icon: Leaf,
    gradientClass: "from-lime-200 to-green-300",
    featured: false,
  },
  {
    title: "स्वभिषज्सदस्यत्व Physician's Membership",
    description: "Embrace a Holistic Lifestyle with the Physician's Membership. Whether you're trained in Ayurveda, Allopathy, Homeopathy, or any other medical system, this membership welcomes you and your family.",
    discountText: "Self Physician Family Membership - स्वभिषज्सदस्यत्व Physician's Membership : 25% Discount",
    benifits: ["Self (Group Leader)", "Mother", "Father", "Wife", "Husband", "Son (Up to 2)", "Daughter (Up to 2)"],
    categoryName: "Other all Doctors, Physicians",
    serviceName: "Physician's Membership",
    membershipNameHi: "स्वभिषज्सदस्यत्व",
    price: 275000,
    primaryDiscount: 200000,
    primaryDiscountAmount: -75000,
    additionalDiscount: "1,00,000",
    couponCode: "BPM25%",
    icon: Hospital,
    gradientClass: "from-green-200 to-lime-300",
    featured: false,
  },
  {
    title: "स्वसन्तोषणीयसदस्यत्व Propitious Optimistic Membership",
    description: "A prestigious and privileged membership designed exclusively for the Directors, Partners, and their families of the Swagram Community Organization. This 5-year membership recognizes leadership.",
    discountText: "Director Family Membership - स्वसन्तोषणीयसदस्यत्व Propitious Optimistic Membership 30% Discount",
    benifits: ["Self (Group Leader)", "Mother", "Father", "Wife", "Husband", "Son (Up to 2)", "Daughter (Up to 2)"],
    categoryName: "Director of SwaGrama",
    serviceName: "Propitious Optimistic Membership",
    membershipNameHi: "सन्तोषणीयसदस्यत्व",
    price: 600000,
    primaryDiscount: 400000,
    primaryDiscountAmount: -200000,
    additionalDiscount: "1,00,000",
    couponCode: "BPOM30%",
    icon: Brain,
    gradientClass: "from-lime-300 to-green-300",
    featured: true,
  },
];

const MembershipShowcase = () => {
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-amber-50">


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
   

        {/* All Memberships Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
        
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mergedMemberships.map((membership, idx) => (
              <motion.div key={idx} variants={item}>
                <MembershipCard
                  membership={membership}
                  isExpanded={expandedCard === idx}
                  onToggle={() => setExpandedCard(expandedCard === idx ? null : idx)}
                  onViewDetails={() => setSelectedMembership(membership)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMembership && (
          <MembershipModal
            membership={selectedMembership}
            onClose={() => setSelectedMembership(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};



const MembershipCard = ({ membership, isExpanded, onToggle, onViewDetails }) => {
  const Icon = membership.icon;
  const discount = Math.abs((membership.primaryDiscountAmount / membership.price) * 100).toFixed(0);

  return (
    <motion.div
      layout
      className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-200 hover:border-green-400 transition-all ${
        membership.featured ? 'ring-4 ring-amber-400' : ''
      }`}
    >
      <div className={`bg-gradient-to-r ${membership.gradientClass} p-6`}>
        <div className="flex items-start justify-between mb-4">
          <div className="bg-white/90 p-3 rounded-xl shadow-lg">
            <Icon className="w-6 h-6 text-green-700" />
          </div>
          <div className="bg-green-700 text-white px-3 py-1 rounded-full text-sm font-bold">
            {discount}% OFF
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-green-900 mb-2 line-clamp-2">
          {membership.serviceName}
        </h3>
        <p className="text-sm text-green-800 font-semibold">{membership.membershipNameHi}</p>
      </div>

      <div className="p-6">
        <div className="bg-green-50 rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 line-through">₹{membership.price.toLocaleString()}</span>
            <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded-full">{membership.couponCode}</span>
          </div>
          <p className="text-2xl font-bold text-green-700">₹{membership.primaryDiscount.toLocaleString()}</p>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <p className="text-sm text-gray-700 mb-3 line-clamp-3">{membership.description}</p>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-green-800">Benefits Include:</p>
                <div className="flex flex-wrap gap-2">
                  {membership.benifits.slice(0, 4).map((benefit, idx) => (
                    <span key={idx} className="text-xs bg-lime-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onToggle}
            className="flex-1 bg-green-100 whitespace-nowrap hover:bg-green-200 text-green-700 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            {isExpanded ? 'Show Less' : 'Learn More'}
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewDetails}
            className="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const MembershipModal = ({ membership, onClose }) => {
  const Icon = membership.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${membership.gradientClass} p-8 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-green-700" />
          </button>
          
          <div className="flex items-start gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <Icon className="w-10 h-10 text-green-700" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-green-900 mb-2">{membership.serviceName}</h2>
              <p className="text-lg text-green-800 font-semibold mb-1">{membership.membershipNameHi}</p>
              <p className="text-sm text-green-700">{membership.categoryName}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Pricing */}
          <div className="bg-gradient-to-r from-green-50 to-lime-50 rounded-2xl p-6 mb-8 border-2 border-green-200">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Original Price</p>
                <p className="text-2xl font-bold text-gray-400 line-through">₹{membership.price.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Discounted Price</p>
                <p className="text-3xl font-bold text-green-700">₹{membership.primaryDiscount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">You Save</p>
                <p className="text-2xl font-bold text-amber-600">₹{Math.abs(membership.primaryDiscountAmount).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between bg-white rounded-lg p-4">
              <span className="text-sm font-semibold text-green-800">Coupon Code:</span>
              <span className="bg-amber-500 text-white px-4 py-2 rounded-lg font-bold">{membership.couponCode}</span>
            </div>

            {membership.additionalDiscount && (
              <div className="mt-4 bg-lime-100 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-800">Additional Discount Available:</p>
                <p className="text-lg font-bold text-green-700">₹{membership.additionalDiscount}</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-green-900 mb-4">About This Membership</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{membership.description}</p>
          </div>

          {/* Benefits */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-green-900 mb-4">Membership Benefits</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {membership.benifits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-200"
                >
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-green-800 font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all"
            >
              Apply Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all"
            >
              Contact Us
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MembershipShowcase;
