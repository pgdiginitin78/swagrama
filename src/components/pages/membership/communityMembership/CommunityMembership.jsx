import { Nature } from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  Brain,
  Check,
  ChevronDown,
  CreditCard,
  Diamond,
  Heart,
  Home,
  HomeIcon,
  Hospital,
  Leaf,
  Shield,
  Sparkles,
  Stars,
  Sun,
  TreePine,
  User,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import CommunityMembershipImg from "../../../assets/membership/communityMembership.png";
import BookEventForm from "../../bookEventForm/BookEventForm";

const benefits = [
  {
    icon: <Home className="w-5 h-5" />,
    text: "Entry to the world of wisdom. Eligible to do everything related to community.",
  },
  {
    icon: <Sun className="w-5 h-5" />,
    text: "Able to use web applications, Mobile App & use all modules of community.",
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    text: "Allow to read - listen – join स्वग्राम Community health tips, blogs, appointments, presentations, lectures, animations, videos, trainings, Interaction, Chat, information, programs & regular current affairs.",
  },
  {
    icon: <TreePine className="w-5 h-5" />,
    text: "Allow to use all community tools & events: Self-Analysis, Healing Services, Do & Don'ts, 365 Community Activities, Community Ceremony, Joint Activities, Habitation In-out Living, Seasonal Tour, Commune, Barter, Feeds & Calendar.",
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    text: "Each & every person are Eligible for स्वग्रामग्र Community Card physical card.",
  },
  {
    icon: <Award className="w-5 h-5" />,
    text: "Premium membership & Privilege Services.",
  },
  {
    icon: <Hospital className="w-5 h-5" />,
    text: "Able to admit his own patient.",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    text: "Total medicine & medical support backup.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    text: "Software, Clinic, farm, village, hospital & everything setup support.",
  },
  {
    icon: <Diamond className="w-5 h-5" />,
    text: "Permissible to use all coupons & get discounts.",
  },
  {
    icon: <Stars className="w-5 h-5" />,
    text: "Upgradation of membership is possible.",
  },
  {
    icon: <BadgeCheck className="w-5 h-5" />,
    text: "This is non-refundable or transferable.",
  },
];

const mergedMemberships = [
  {
    title: "स्वात्मन्सदस्यत्व Self Membership",
    description: "Primary Basic 5% Discount Membership. Open for all.",
    discountText:
      "Self-Primary / Basic : स्वात्मन्सदस्यत्व Self Membership ; 5% Discount Membership",
    benifits: ["Individual Only"],
    categoryName: "Self : Primary Basic",
    serviceName: "Self Basic Membership",
    membershipNameHi: "स्वात्मन्सदस्यत्व",
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
    description:
      "स्वकर्मकरगणसदस्यत्व Community Staff Membership : 20% Discount Membership Unlock a world of meaningful benefits tailored exclusively for the dedicated staff of Swagrama Community and our valued partners.",
    discountText:
      "Staff Family Membership – स्वकर्मकरगणसदस्यत्व  Community Staff Membership : 20% Discount Membership",
    benifits: [
      "Mother",
      "Father",
      "Wife",
      "Husband",
      "Son",
      "Daughter",
      "Brother",
      "Sister",
    ],
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
    description:
      "Designed for Independent Living Souls. Feel Alone in the City? Longing for a Community That Feels Like Family? Swagrama Community introduces the स्वकीयसदस्यत्व, specially crafted for those who live alone.",
    discountText:
      "Single Person Membership – स्वकीयसदस्यत्व Own Membership : 20% Discount Membership",
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
    description:
      "Rekindling the Spirit of Living Together. 🏡 Bring Back the Power of Togetherness. In today's fast-paced, fragmented world, the greatest casualty has been the traditional joint family system.",
    discountText:
      "Joint Family Membership – स्वकुटुम्बिनीसदस्यत्व Joint Family Membership : 20% Discount Membership",
    benifits: [
      "Self (Group Leader)",
      "Mother",
      "Father",
      "Wife",
      "Husband",
      "Son (Up to 2)",
      "Daughter (Up to 2)",
    ],
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
    title: "स्ववैद्यसदस्यत्व Root Healer Membership",
    description:
      "For Ayurvedic practitioners, this membership is more than a privilege—it's a gateway to living the Ayurvedic life you truly believe in. The Root Healer Membership is your path back to nature.",
    discountText:
      "Root Healer's Family Membership: स्ववैद्यसदस्यत्व Root Healer Membership : 25% Discount",
    benifits: [
      "Self (Group Leader)",
      "Mother",
      "Father",
      "Wife",
      "Husband",
      "Son (Up to 2)",
      "Daughter (Up to 2)",
    ],
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
    description:
      "Embrace a Holistic Lifestyle with the Physician's Membership. Whether you're trained in Ayurveda, Allopathy, Homeopathy, or any other medical system, this membership welcomes you and your family.",
    discountText:
      "Self Physician Family Membership - स्वभिषज्सदस्यत्व Physician's Membership : 25% Discount",
    benifits: [
      "Self (Group Leader)",
      "Mother",
      "Father",
      "Wife",
      "Husband",
      "Son (Up to 2)",
      "Daughter (Up to 2)",
    ],
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
    title: "सन्तोषणीयसदस्यत्व Propitious Optimistic Membership",
    description:
      "A prestigious and privileged membership designed exclusively for the Directors, Partners, and their families of the Swagram Community Organization. This 5-year membership recognizes leadership.",
    discountText:
      "Director Family Membership - सन्तोषणीयसदस्यत्व Propitious Optimistic Membership 30% Discount",
    benifits: [
      "Self (Group Leader)",
      "Mother",
      "Father",
      "Wife",
      "Husband",
      "Son (Up to 2)",
      "Daughter (Up to 2)",
    ],
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

const CommunityMembership = () => {
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [openEventRegistrationModal, setOpenEventRegistrationModal] =
    useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="  w-full">
      <section className="relative w-full h-screen overflow-hidden -mt-20 sm:-mt-24 md:mt-0">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat w-full"
          style={{ backgroundImage: `url(${CommunityMembershipImg})` }}
        />

        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/40 via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex h-full items-end justify-center px-2 md:px-0   pb-3 sm:pb-6 md:pb-0"
        >
          <div className="w-full max-w-full backdrop-blur-md bg-green-200/40 px-4 py-3 sm:py-5 md:py-5 border border-white/50 shadow-xl text-center rounded-2xl md:rounded-none">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1.5 drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]">
              <span className="bg-gradient-to-r from-green-800 via-lime-700 to-amber-800 bg-clip-text text-transparent">
                स्वग्रामसदस्यत्व
              </span>
            </h1>

            <h2 className="text-base sm:text-xl md:text-2xl lg:text-2xl font-bold text-green-900 mb-1.5 sm:mb-2 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">
              Community Membership
            </h2>

            <p className="text-xs sm:text-sm  text-green-900 font-bold leading-relaxed mb-1.5 sm:mb-2 drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
              A step towards wellness and organizational upliftment. समाजातून
              आरोग्यापूर्ण सेवेत आणणार विश्वसनीय एक स्वयंपूर्ण गांव.
            </p>

            <p className="text-[11px] sm:text-sm  text-amber-900 font-bold drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
              A self-dependent village in the world leading from disease to
              health. सोपी आणि व्यवहारिक वैद्यकीय सेवा!
            </p>
          </div>
        </motion.div>
      </section>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="my-5 px-4 md:px-12"
      >
        <div className="relative bg-gradient-to-br from-lime-100 to-green-100 backdrop-blur-xl rounded-3xl p-5 md:p-10 border border-lime-300 shadow">
          <div className="absolute -top-5 -right-5 w-40 h-40 bg-gradient-to-br from-lime-300 via-green-300 to-lime-300 rounded-full blur-3xl opacity-50" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <Nature className="text-2xl md:text-4xl text-green-600" />
              <h3 className="text-lg md:text-2xl font-bold text-green-800">
                जन्मत : प्रत्येकजण निसर्गाशी
              </h3>
            </div>
            <div className="prose prose-lg text-xs md:text-sm max-w-none text-green-900 leading-relaxed space-y-4">
              <p>
                जन्मत : प्रत्येकजण निसर्गाशी जवळीक साधारा निसर्गमैत्री आहे.
                रहाणपण शुद्ध निसर्म, अन्नपाणी आणि दिन-ऋतुयेत त्याने घालविल्याने
                त्यालाही निसर्गाच्या साहित्यात जावें, एकनित्र कुटुंबात राहावे,
                विहीरीतील पाणी प्यावे, सनमेवा खावा असे वाटते. आपल्या कुटुंबधानी
                सुद्धा निसर्म, एकनित्र कुटुंब पद्धती आणि आयुर्वेदीय नैसर्गिक
                जीवनशैलीचा अनुभव घ्यावा असे त्याला वाटत असते. त्याच्या स्वभातील
                आयुर्वेदिक गांव, घर, चिकित्सालय, आतुरालय, वनौषधि जंगल, गोशाला,
                औषधिकरण इत्यादि सर्वेकाही त्याला अनुभवायचे असते. हजारो वर्षे
                रोकड़ा पिढ्यांनी 100 वर्षे जगण्यासाठी हवी असणारी नैसर्गिक
                आयुर्वेदीय जीवनशैली जगायची असते.
              </p>
              <p>
                जणकरस्त आपल्यापाती सर्वाचा छद विश्वास निर्माण होईल. आजकाल मोठाली
                बोती पुन्हा वरील बायका चालवा पाहण्यात येते ती ही स्वग्राम चालवा
                पाहत आहेत त्या स्वग्राम बरोबर ३६५ दिवस १०० वेळ जरुर स्वग्राम
                चालवा पाहत आहेत. रवाव्हे पन्नाशी अशाही देतात्यांकड़े उपलब्ध नाही
                उपलब्ध होणार? कोणाचे मॉडेल तर कोणाचे मार्गदर्शन गाइड तर साहाय्य
                जणा, स्वतःचे गांव तर बहुताशी खेड़ता राहणारीचे सुद्धा गांव
                हरवितेच आहे. वरल हे सगळेच जसेच्या तसे तुम्हाला स्वग्राममधे
                मिळेल. सहभागी व्हा दैवाणेवाण करण्यासाठी.
              </p>
              <p>
                अट्विशेष नाडी परीक्षा आणि वैद साल्याने स्वतःचे कुटुंब नक्की
                आरोग्यपूर्ण ठेवण्याची संधी. तुमच्या आत्तामधे रुपाले.ल्या कळा आणि
                ज्ञानाला जागृत करणार स्वप्नरुकूल इथे उपलब्ध आहे. की ज्यामधे 100
                वर्षे जगण्यासाठी पूर्क असा जीवनशैलीला पूर्ण करणार 10 क्षेत्रातील
                20 कोर्स आहेत. ते चार महीने देवग्राममधे चालतात. सातत्याने सहभागी
                होऊन विश्वातील तब्बे गुरुच्या साधियात राहून स्वतःचे एकदिवस गुरु
                बनण्याच्या पातळीला बनणार असाल तर देवग्राम पूरेसे आहे.
              </p>
              <p>
                स्वतःच्या मुलंना पुढील पिक्षासाठी तुमच्यातील आदर्श
                दाखवायेप्रमाणे नाही सोधी. सर्व प्रपंचाचा अनुभव थोडाक्यात घेणार
                आहे असाल तर स्वग्रामुट्ट्या येथे व्यावसायिकी देखील संगाणित्र
                होता आहे. हे, मुकुच्या मिळकतीचा रीतसरी, येथा, गोपाळक, बरळेदार
                आणि निसर्गप्रेमी कर्माचे नक्कीचे वाटणारा हे सदस्यराष्ट्र एकदे
                म्या किंवा कुटुंबासोबत म्या.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-4 md:px-12"
      >
        <div className="relative bg-gradient-to-br from-yellow-50 to-amber-50 backdrop-blur-xl rounded-3xl p-5 md:p-10 border border-yellow-300 shadow">
          <div className="absolute -bottom-5 -left-5 w-40 h-40 bg-gradient-to-br from-yellow-300 to-amber-300 rounded-full blur-3xl opacity-50" />
          <div className="relative">
            <div className="prose prose-lg text-xs md:text-sm max-w-none text-amber-900 leading-relaxed space-y-4">
              <p>
                एक व्यक्तीला एक कुटुंब लागते. एका कुटुंबाला एकत्रित कुटुंब
                पद्धती गरजेची आहे. अशी अनेक एकत्रित कुटुंबे आपल्या गरजा
                भागविण्यासाठी एकत्र येतात त्यावेळी एक समाज बनतो. अशा समाजाचा
                समुदाय एका उद्देशाने एकत्र आल्यावर एक ग्राम स्वग्राम बनते.
                प्रत्येकाला एक हक्काची जागा मिळते. माहेर मिळते. सुट्टीला मामाचे
                घर त्या गावात असते. म्हातारपण सुद्धा तरुणांसारखे जगविण्याची ताकद
                त्या गावात असते. कामाने थकलेल्याला हे गाव विश्रांती देते.
                उन्हं-वारा-पावसात न्हावूनसुद्धा आरोग्यप्राप्ती या गावात होते.
                विहिरीत पोहणे, झाडावर चढणे. शेतात काम करणे. बीज संवर्धन अशी अनेक
                कार्ये या गावात होतात. अशा अनेक कुटुंबांना एकत्रित करणारे असे
                गाव म्हणजे स्वग्राम!
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="md:px-10 w-full">
        <section className="py-4 md:py-8  w-full">
          <div className=" px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-4 md:mb-5"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-100 text-green-700 text-sm font-medium mb-2 border border-lime-200">
                <Sparkles className="w-4 h-4" />
                स्वसदस्यत्व Benefits
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-1">
                Membership Benefits
              </h2>
              <p className="text-amber-700/80  text-sm md:text-lg mx-auto">
                स्वग्राम Community is a self-dependent village. It's a practical
                experience of need base life.
              </p>
            </motion.div>

            <div className="min-h-screen">
              <div className="w-full mx-auto">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 gap-4"
                >
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ x: 8, scale: 1.01 }}
                      className="group relative"
                    >
                      <div
                        className="flex items-start gap-6 p-3 rounded-2xl transition-all duration-300
                          bg-gradient-to-br from-slate-50 via-emerald-50 to-sky-50 backdrop-blur-xl shadow-sm hover:shadow-xl
                          border  border-l-4 border-l-emerald-400
                          hover:border-emerald-500 hover:border-l-emerald-600"
                      >
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-emerald-500/50 transition-shadow duration-300"
                        >
                          {benefit.icon}
                        </motion.div>
                        <div className="flex-1 pt-1">
                          <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                            {benefit.text}
                          </p>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-5 w-full ">
          <div className="px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-4 md:mb-5 w-full"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-2 border border-amber-200">
                <CreditCard className="w-4 h-4" />
                Choose Your Plan
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-1">
                Membership Plans
              </h2>
              <p className="text-amber-700/80  text-center text-sm md:text-lg">
                Select the perfect membership that suits your needs and join our
                wellness community.
              </p>
            </motion.div>

            <div className="w-full">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mergedMemberships.map((membership, idx) => (
                    <motion.div key={idx} variants={item}>
                      <MembershipCard
                        membership={membership}
                        isExpanded={expandedCard === idx}
                        onToggle={() =>
                          setExpandedCard(expandedCard === idx ? null : idx)
                        }
                        onViewDetails={() => setSelectedMembership(membership)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedMembership && (
          <MembershipModal
            membership={selectedMembership}
            onClose={() => setSelectedMembership(null)}
            setOpenEventRegistrationModal={setOpenEventRegistrationModal}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {openEventRegistrationModal && (
          <BookEventForm
            open={openEventRegistrationModal}
            handleClose={() => {
              setOpenEventRegistrationModal(false);
            }}
            eventDetails={selectedMembership}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const MembershipCard = ({
  membership,
  isExpanded,
  onToggle,
  onViewDetails,
}) => {
  const Icon = membership.icon;

  return (
    <motion.div
      layout
      className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden border border-green-200 hover:border-green-400 transition-all"
    >
      <div
        className={`bg-gradient-to-r ${membership.gradientClass} p-2.5 sm:p-3 md:p-4`}
      >
        <div className="flex items-start gap-2">
          <div className="bg-white/90 p-2 sm:p-2.5 rounded-lg sm:rounded-xl shadow-md flex-shrink-0">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-700" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-green-900 truncate">
              {membership.serviceName}
            </h3>
            <p className="text-xs sm:text-sm text-green-800 font-semibold truncate">
              {membership.membershipNameHi}
            </p>
          </div>
        </div>
      </div>

      <div className="p-2.5 sm:p-3 md:p-4 lg:p-5">
        <div className="bg-green-50 rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-3 mb-2 sm:mb-3">
          <div className="flex items-center justify-between gap-3 mb-1.5 sm:mb-2">
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              ₹{membership.price.toLocaleString()}
            </span>

            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-amber-700">
              {membership.couponCode}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-green-700">
              ₹{membership.primaryDiscount.toLocaleString()}
            </p>
            <span
              className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border
                ${
                  (membership?.benifits?.length || 0) === 1
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-lime-50 text-lime-700 border-lime-200"
                }`}
            >
              {(membership?.benifits?.length || 0) === 1
                ? "Individual"
                : "Per Person"}
            </span>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-2 sm:mb-3"
            >
              <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 line-clamp-3">
                {membership.description}
              </p>
              <div className="space-y-1.5 sm:space-y-2">
                <p className="text-[10px] sm:text-xs font-semibold text-green-800">
                  Benefits Include:
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {membership.benifits.map((benefit, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] sm:text-xs bg-lime-100 text-green-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1"
                    >
                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                      <span className="truncate max-w-[80px] sm:max-w-none">
                        {benefit}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-1.5 sm:gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onToggle}
            className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 font-semibold py-1.5 sm:py-2 px-2 sm:px-3 md:px-4 rounded-lg flex items-center justify-center gap-1 sm:gap-2 transition-colors text-xs sm:text-sm"
          >
            <span className="hidden xs:inline">
              {isExpanded ? "Show Less" : "Learn More"}
            </span>
            <span className="xs:hidden">{isExpanded ? "Less" : "More"}</span>
            <ChevronDown
              className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewDetails}
            className="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-1.5 sm:py-2 px-2 sm:px-3 md:px-4 rounded-lg transition-colors text-xs sm:text-sm"
          >
            Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const MembershipModal = ({
  membership,
  onClose,
  setOpenEventRegistrationModal,
}) => {
  const Icon = membership.icon;

  return (
    <Modal
      open={membership}
      onClose={onClose}
      aria-labelledby="booking-modal-title"
    >
      <Box
        sx={style}
        className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[70%] max-h-[90%] overflow-y-auto max-w-3xl rounded-xl relative bg-white"
      >
        <div>
          <div
            className={`bg-gradient-to-r ${membership.gradientClass} p-3 sm:p-4 md:p-5 relative`}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 hover:bg-white p-1 sm:p-1.5 rounded-full transition-colors z-10"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-green-700" />
            </button>

            <div className="flex items-start gap-2 sm:gap-3 pr-8 sm:pr-10">
              <div className="bg-white p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-700" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-green-900 mb-0.5 sm:mb-1 line-clamp-2">
                  {membership.serviceName}
                </h2>
                <p className="text-sm sm:text-base text-green-800 font-semibold truncate">
                  {membership.membershipNameHi}
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-4 md:p-5">
            <div className="bg-gradient-to-r from-green-50 to-lime-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 md:mb-5 border border-green-200">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3">
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-600 mb-0.5">
                    Original
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-gray-400 line-through">
                    ₹{membership.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-600 mb-0.5">
                    Price
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-700">
                    ₹{membership.primaryDiscount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-600 mb-0.5">
                    Savings
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-amber-600">
                    ₹
                    {Math.abs(
                      membership.primaryDiscountAmount,
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white rounded-lg p-2 sm:p-2.5">
                <span className="text-[10px] sm:text-xs font-semibold text-green-800">
                  Coupon:
                </span>
                <span className="bg-amber-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-bold">
                  {membership.couponCode}
                </span>
              </div>

              {membership.additionalDiscount && (
                <div className="mt-2 sm:mt-3 bg-lime-100 rounded-lg p-2 sm:p-2.5">
                  <p className="text-[10px] sm:text-xs font-semibold text-green-800">
                    Extra Discount: ₹{membership.additionalDiscount}
                  </p>
                </div>
              )}
            </div>

            <div className="mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-bold text-green-900 mb-1.5 sm:mb-2">
                About
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {membership.description}
              </p>
            </div>

            <div className="mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-bold text-green-900 mb-1.5 sm:mb-2">
                Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                {membership.benifits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start sm:items-center gap-1.5 sm:gap-2 bg-green-50 p-2 rounded-lg border border-green-200"
                  >
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-xs sm:text-sm text-green-800 font-medium">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpenEventRegistrationModal(true)}
                className="flex-1 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-lg transition-all text-sm sm:text-base"
              >
                Book Now
              </motion.button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CommunityMembership;
