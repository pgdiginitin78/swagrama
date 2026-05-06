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
  Hospital,
  Leaf,
  Shield,
  Sparkles,
  Stars,
  Sun,
  TreePine,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import CommunityMembershipImg from "../../../assets/membership/communityMembership.webp";
import MembershipRegistrationModal from "./MembershipRegistrationModal";

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
    duration: "5 Years",
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
    duration: "5 Years",
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
    duration: "5 Years",
  },
  {
    title: "स्वकुटुम्बिनीसदस्यत्व Joint Family Membership",
    description: "Rekindling the Spirit of Living Together.",
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
    duration: "5 Years",
  },
  {
    title: "स्ववैद्यसदस्यत्व Root Healer Membership",
    description:
      "For Ayurvedic practitioners, this membership is more than a privilege.",
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
    duration: "5 Years",
  },
  {
    title: "स्वभिषज्सदस्यत्व Physician's Membership",
    description:
      "Embrace a Holistic Lifestyle with the Physician's Membership.",
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
    duration: "5 Years",
  },
  {
    title: "सन्तोषणीयसदस्यत्व Propitious Optimistic Membership",
    description:
      "A prestigious and privileged membership designed exclusively for Directors.",
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
    duration: "5 Years",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

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
      <section className="relative w-full lg:h-screen overflow-hidden   md:mt-0">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat w-full hidden lg:block"
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
              आरोग्य आणि संस्थात्मक उन्नतीकडे एक पाऊल. समाजातून आरोग्यपूर्ण सेवा
              देणारे विश्वासार्ह, स्वयंपूर्ण गाव
            </p>
          </div>
        </motion.div>
      </section>

      <div className="py-8 px-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="my-5 px-4 md:px-12"
        >
          <div className="relative bg-gradient-to-br from-lime-100 to-green-100 backdrop-blur-xl rounded-2xl p-5 border border-lime-300 shadow-md overflow-hidden">
            <div className="absolute -top-8 -right-8 w-44 h-44 bg-gradient-to-br from-lime-300 via-green-300 to-lime-300 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-green-200 to-lime-200 rounded-full blur-2xl opacity-30 pointer-events-none" />

            <div className="relative">
              <div className="flex items-start gap-3 mb-3">
                <div className="mt-1 w-1.5 shrink-0 self-stretch bg-gradient-to-b from-lime-400 to-green-600 rounded-full" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-green-800 leading-snug">
                  रोगातून आरोग्याकडे – स्वग्रामचा नैसर्गिक प्रवास
                </h3>
              </div>

              <h4 className="text-base sm:text-lg font-semibold text-green-700 mb-3 pl-4 border-l-2 border-lime-400">
                सोपी आणि व्यवहार्य वैद्यकीय सेवा
              </h4>

              <div className="space-y-3 text-xs sm:text-sm md:text-base text-green-900 leading-relaxed">
                <p>
                  जन्मतः प्रत्येक मनुष्य&nbsp;
                  <span className="font-semibold bg-lime-200 px-1 rounded">
                    निसर्गाशी जवळीक साधणारा आणि निसर्गमैत्री असणारा
                  </span>
                  &nbsp;असतो. शुद्ध निसर्ग, नैसर्गिक अन्न-पाणी आणि
                  दिनचर्या-ऋतुचर्या यांच्या सहवासात राहण्याची त्याची नैसर्गिक ओढ
                  असते.
                </p>
                <p>
                  माणसाला&nbsp;
                  <span className="font-semibold bg-lime-200 px-1 rounded">
                    एकत्र कुटुंबात राहणे, विहिरीचे पाणी पिणे, नैसर्गिक अन्न सेवन
                    करणे&nbsp;
                  </span>
                  आणि आयुर्वेदीय व नैसर्गिक जीवनशैलीचा अनुभव घेणे आवडते. अशा
                  जीवनपद्धतीमध्ये&nbsp;
                  <span className="font-semibold bg-lime-200 px-1 rounded">
                    आयुर्वेदीय गाव, घर, चिकित्सालय, आतुरालय, वनौषधि वन, गोशाला,
                    औषधिकरण
                  </span>
                  &nbsp;यांसारख्या व्यवस्थांचा समावेश असतो.
                </p>
                <p>
                  हजारो वर्षांपासून आपल्या पिढ्यांनी&nbsp;
                  <span className="font-semibold bg-lime-200 px-1 rounded">
                    १०० वर्षे निरोगी आयुष्य जगण्यासाठी आवश्यक असलेली आयुर्वेदीय
                    व नैसर्गिक जीवनशैली
                  </span>
                  &nbsp;जपली आहे. स्वग्राम या परंपरेला पुन्हा एकदा व्यवहारात
                  आणण्याचा प्रयत्न करत आहे.
                </p>
                <p>
                  आज अनेकांना&nbsp;
                  <span className="font-semibold bg-lime-200 px-1 rounded">
                    नैसर्गिक जीवनशैली, एकत्र कुटुंबपद्धती आणि आयुर्वेदीय
                    आरोग्यव्यवस्था
                  </span>
                  &nbsp;अनुभवण्याची इच्छा आहे. हे सर्व अनुभव&nbsp;
                  <span className="font-semibold bg-lime-200 px-1 rounded">
                    स्वग्राममध्ये प्रत्यक्ष स्वरूपात उपलब्ध
                  </span>
                  &nbsp;आहे. येथे समाजाला विश्वास देणारे आणि आरोग्यपूर्ण जीवनाची
                  दिशा देणारे वातावरण निर्माण केले आहे.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
          className="px-4 md:px-12"
        >
          <div className="relative bg-gradient-to-br from-yellow-50 to-amber-50 backdrop-blur-xl rounded-2xl p-5 border border-yellow-300 shadow-md overflow-hidden">
            <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-gradient-to-br from-yellow-300 to-amber-300 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-full blur-2xl opacity-30 pointer-events-none" />

            <div className="relative space-y-4 text-xs sm:text-sm md:text-base text-amber-900 leading-relaxed">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-full shrink-0" />
                <h2 className="text-lg sm:text-xl font-bold text-amber-800">
                  विशेष संधी
                </h2>
              </div>

              <div className="space-y-2 pl-2">
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0 mt-0.5">
                    ➤
                  </span>
                  <p>
                    <span className="font-semibold">नाडी परीक्षा</span> आणि
                    वैद्य सल्ल्याद्वारे संपूर्ण कुटुंबाचे आरोग्य जपण्याची संधी
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0 mt-0.5">
                    ➤
                  </span>
                  <p>आयुर्वेदीय आणि नैसर्गिक जीवनशैलीचा प्रत्यक्ष अनुभव</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0 mt-0.5">
                    ➤
                  </span>
                  <p>शरीर, मन आणि निसर्ग यांचा संतुलित अभ्यास</p>
                </div>
              </div>

              <div className="bg-amber-100 border border-amber-200 rounded-xl p-4 space-y-2">
                <p>
                  येथे&nbsp;
                  <span className="font-semibold text-amber-700">
                    १० क्षेत्रांमधील २० अभ्यासक्रम
                  </span>
                  &nbsp;उपलब्ध आहेत, जे&nbsp;
                  <span className="font-semibold text-amber-700">
                    ४ महिन्यांच्या कालावधीत
                  </span>
                  &nbsp;शिकवले जातात. या अभ्यासक्रमांद्वारे १०० वर्षे निरोगी
                  आयुष्य जगण्यासाठी आवश्यक असलेली जीवनशैली समजून घेता येते.
                </p>
                <p>
                  या प्रवासात सहभागी होताना तुम्हाला&nbsp;
                  <span className="font-semibold text-amber-700">
                    अनुभवी गुरूंच्या मार्गदर्शनाखाली
                  </span>
                  &nbsp;शिकण्याची आणि पुढे स्वतःही ज्ञान देण्याच्या पातळीपर्यंत
                  पोहोचण्याची संधी मिळू शकते.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
          className="px-4 md:px-12 mt-6"
        >
          <div className="relative bg-gradient-to-br from-green-50 to-lime-50 backdrop-blur-xl rounded-2xl p-5 border border-green-300 shadow-md overflow-hidden">
            <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-gradient-to-br from-green-300 to-lime-300 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-lime-200 to-green-300 rounded-full blur-2xl opacity-30 pointer-events-none" />

            <div className="relative space-y-4 text-xs sm:text-sm md:text-base text-green-900 leading-relaxed">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-1.5 h-8 bg-gradient-to-b from-green-400 to-lime-600 rounded-full shrink-0" />
                <h2 className="text-lg sm:text-xl font-bold text-green-800">
                  कुटुंबासाठी आदर्श जीवनशैली
                </h2>
              </div>

              <p>
                स्वग्राम हा केवळ आरोग्याचा केंद्र नाही, तर&nbsp;
                <span className="font-semibold">
                  पुढील पिढ्यांसाठी आदर्श जीवनपद्धती घडविण्याचा एक प्रयोग
                </span>
                &nbsp;आहे. येथे कुटुंबासोबत राहून नैसर्गिक, संतुलित आणि आनंदी
                जीवन जगण्याचा अनुभव घेता येतो.
              </p>

              <div className="flex items-start gap-2 bg-green-100 border border-green-200 rounded-xl px-4 py-3">
                <span className="text-green-500 font-bold text-lg shrink-0">
                  ☆
                </span>
                <p className="font-semibold">
                  निसर्गप्रेमी, आरोग्यसजग आणि समाजाभिमुख जीवन जगू इच्छिणाऱ्या
                  प्रत्येकासाठी स्वग्राम हे एक प्रेरणादायी स्थान आहे.
                </p>
              </div>

              <div className="space-y-3">
                <p>
                  एक व्यक्तीला एक <strong>कुटुंब</strong> आवश्यक असते. प्रत्येक
                  कुटुंबाला <strong>एकत्र कुटुंब पद्धतीची</strong> गरज असते. अशा
                  अनेक एकत्र कुटुंबांनी आपापल्या गरजा पूर्ण करण्यासाठी जेव्हा
                  एकत्र येतात, तेव्हा त्यातून एक समाज निर्माण होतो. आणि असा समाज
                  जेव्हा एका सामूहिक उद्देशाने एकत्र येतो, तेव्हा त्या
                  समुदायातून एक ग्राम — <strong>स्वग्राम</strong> निर्माण होते.
                </p>
                <p>
                  स्वग्राम ही अशी संकल्पना आहे की जिथे प्रत्येकाला&nbsp;
                  <strong>आपुलकीची जागा, माहेरपणाची ऊब</strong>&nbsp;आणि&nbsp;
                  <strong>सुट्टीसाठी आपलेसे घर</strong>&nbsp;मिळते. येथे
                  तरुणांना जगण्याची प्रेरणा मिळते आणि ज्येष्ठांना शांत,
                  आरोग्यपूर्ण जीवन जगण्याचा आधार मिळतो.
                </p>
                <p>
                  कामाच्या धकाधकीने थकलेल्या मनाला आणि शरीराला&nbsp;
                  <strong>स्वग्राम विश्रांती, ऊर्जा</strong>&nbsp;आणि{" "}
                  <strong>आरोग्य</strong>&nbsp;प्रदान करते. येथे
                  निसर्गाच्या&nbsp;सान्निध्यात राहून{" "}
                  <strong>उन्हे, वारा</strong>&nbsp;<strong>आणि पावसाचा</strong>
                  &nbsp;अनुभव घेत आरोग्य प्राप्त करण्याची संधी मिळते.
                </p>
                <p>
                  गावातील जीवनात अनेक नैसर्गिक आणि आनंददायी अनुभव असतात.&nbsp;
                  <strong>
                    विहिरीचे पाणी पिणे, झाडांवर चढणे, शेतात काम करणे, बीज
                    संवर्धन करणे
                  </strong>
                  , आणि निसर्गाशी पुन्हा एकदा नाते जोडणे.
                </p>
                <p>
                  अशा प्रकारे अनेक कुटुंबांना&nbsp;
                  <strong>
                    एकत्र आणणारे, निसर्गाशी जोडणारे आणि आरोग्यपूर्ण जीवन
                    जगण्याची प्रेरणा देणारे गाव म्हणजे स्वग्राम.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

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

            <div className="h-auto">
              <div className="w-full mx-auto">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid md:grid-cols-2 gap-4"
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {mergedMemberships.map((membership, idx) => (
                    <motion.div key={idx} variants={item}>
                      <MembershipCard
                        membership={membership}
                        isExpanded={expandedCard === idx}
                        onToggle={() =>
                          setExpandedCard(expandedCard === idx ? null : idx)
                        }
                        onViewDetails={() => setSelectedMembership(membership)}
                        setOpenEventRegistrationModal={
                          setOpenEventRegistrationModal
                        }
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
        {openEventRegistrationModal && (
          <MembershipRegistrationModal
            open={openEventRegistrationModal}
            handleClose={() => {
              setOpenEventRegistrationModal(false);
            }}
            membershipDetails={selectedMembership}
            origin={"Membership"}
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
  setOpenEventRegistrationModal,
}) => {
  const Icon = membership.icon;

  return (
    <motion.div
      layout
      className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden border border-green-200 hover:border-green-400 transition-all"
    >
      <div
        className={`bg-gradient-to-r ${membership.gradientClass} p-2.5 sm:p-3 flex justify-between space-x-2 `}
      >
        <div className="flex  items-start gap-2">
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

      <div className="p-2.5 sm:p-3 md:p-4 ">
        <p className="text-xs pt-2 whitespace-nowrap text-green-600  items-center space-x-1 font-semibold flex justify-end pb-2">
          Duration :&nbsp;<span>({membership?.duration})</span>
        </p>
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
            className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 font-semibold py-1.5 sm:py-2 px-2 sm:px-3 md:px-4 rounded-[5px] flex items-center justify-center gap-1 sm:gap-2 transition-colors text-xs sm:text-sm"
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
            onClick={() => {
              setOpenEventRegistrationModal(true);
              onViewDetails();
            }}
            className="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-1.5 sm:py-2 px-2 sm:px-3 md:px-4 rounded-[5px] transition-colors text-xs sm:text-sm"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
export default CommunityMembership;