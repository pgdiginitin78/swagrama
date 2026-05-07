import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";
import AgricultureOutlined from "@mui/icons-material/AgricultureOutlined";
import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import CurrencyRupeeOutlined from "@mui/icons-material/CurrencyRupeeOutlined";
import EventNoteOutlined from "@mui/icons-material/EventNoteOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import LocalFloristOutlined from "@mui/icons-material/LocalFloristOutlined";
import SelfImprovementOutlined from "@mui/icons-material/SelfImprovementOutlined";
import SpaOutlined from "@mui/icons-material/SpaOutlined";
import VolunteerActivismOutlined from "@mui/icons-material/VolunteerActivismOutlined";
import WaterDropOutlined from "@mui/icons-material/WaterDropOutlined";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CommunityCeremonyImg from "../../../assets/community-activities/CommunityCeremony.webp";
import ParvatasanaImg from "../../../assets/community-activities/Parvatasana.webp";
import SugarcaneImg from "../../../assets/community-activities/Sugarcane.webp";
import FullDayActivityImg from "../../../assets/community-activities/FullDayActivity.webp";
import YogaMaleImg from "../../../assets/community-activities/YogaMale.webp";
import sanskrutikRitualsImg from "../../../assets/community-activities/sanskrutikRituals.webp";
import VisitorsFormModal from "../vision/VisitorsFormModal";

const eventSlots = [
  {
    serviceName: "स्वसहभावउत्सव Community Ceremony",
    nameHindi: "स्वसहभावउत्सव",
    checkIn: "06:45",
    checkOut: "19:15",
    description:
      "Community festival and group celebrations at Swagrama. Full Day with meal celebration of Indian, Seasonal or Traditional festivals & Rituals.",
    benefits:
      "Encourages bonding, cultural participation, and collective well-being.",
    price: "",
    image: CommunityCeremonyImg,
  },
  {
    serviceName: "ग्रामपूर्णदिनकर्मण्य Full Day Activities",
    nameHindi: "ग्रामपूर्णदिनकर्मण्य",
    checkIn: "06:45",
    checkOut: "19:15",
    description:
      "Full-day structured activities at Swagrama including ceremonies, Ayurveda, Diet, Yoga, Natural Lifestyle, Farming & Gauseva.",
    benefits: "Engages body and mind, promotes wellness and learning.",
    price: "2000",
    image: ParvatasanaImg,
  },
];

const activities = [
  {
    icon: SelfImprovementOutlined,
    label: "Yoga & Meditation",
    color: "#7cb518",
  },
  { icon: LocalFloristOutlined, label: "Ayurveda & Herbs", color: "#a07850" },
  { icon: AgricultureOutlined, label: "Natural Farming", color: "#4a8c2a" },
  { icon: WaterDropOutlined, label: "Panchagavya", color: "#5b9bd5" },
  { icon: SpaOutlined, label: "Dinacharya", color: "#9b6b9e" },
  { icon: GroupsOutlined, label: "Gauseva", color: "#c4956a" },
];

const CommunityActivities = () => {
  const [openEventBookModal, setOpenEventBookModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const containerRef = useRef(null);


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const hoverLift = {
    whileHover: { y: -5, scale: 1.03 },
    transition: { duration: 0.25, ease: "easeOut" }
  };

  const hoverLiftSm = {
    whileHover: { y: -4, scale: 1.04 },
    transition: { duration: 0.22, ease: "easeOut" }
  };

  const hoverBtn = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.2, ease: "easeOut" }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 }
  };

  return (
    <div
      ref={containerRef}
      className="bg-[#f5f8f0] font-sans overflow-x-hidden"
    >
        <section className="ca-hero relative h-[60vw] min-h-[320px] max-h-[520px] overflow-hidden">
          <motion.div style={{ y: heroY }} className="ca-hero-img absolute inset-0">
            <img
              src={SugarcaneImg}
              alt="Swagrama community"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a0a]/40 via-[#1a3a0a]/20 to-[#49584a]" />
          </motion.div>
          <motion.div style={{ opacity: heroOpacity }} className="ca-hero-overlay absolute inset-0 flex flex-col items-center  justify-center px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg tracking-tight">
                स्वकर्मण्य
              </h1>
              <p className="text-[#d4f0a0] text-sm sm:text-lg font-semibold tracking-widest uppercase mt-1">
                Community Activities
              </p>
              <p className="text-white/80 text-xs sm:text-sm mt-2 max-w-xs sm:max-w-md mx-auto">
                coming together to perform natural, meaningful duties.
              </p>
            </motion.div>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-3 sm:px-5 -mt-2">
          <div className="ca-activity-grid grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
            {activities.map(({ icon: Icon, label, color }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.88, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="ca-activity-card bg-white rounded-[9px] p-3 flex flex-col items-center gap-1.5 border border-[#e2efd6] shadow-sm cursor-default z-10"
                {...hoverLiftSm}
              >
                <div
                  className="w-9 h-9 rounded-[5px] flex items-center justify-center"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Icon sx={{ fontSize: 18, color }} />
                </div>
                <span className="text-[10px] sm:text-xs text-[#3d4a2e] font-medium text-center leading-tight">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-3 sm:px-5 mt-10 sm:mt-14">
          <div className="grid lg:grid-cols-5 gap-4 sm:gap-5 items-stretch">
            <motion.div
              {...fadeInUp}
              className="ca-slide-left lg:col-span-3 relative rounded-[9px] overflow-hidden min-h-[240px] sm:min-h-[320px]"
              {...hoverLift}
            >
              <img
                src={sanskrutikRitualsImg}
                alt="Community Ceremony"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a0a]/80 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a0a]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 sm:p-6">
                <span className="text-[#a8d830] text-[10px] font-bold uppercase tracking-widest">
                  Community Ceremony
                </span>
                <h2 className="text-white text-xl sm:text-2xl font-bold leading-tight mt-1">
                  स्वमहाभाव उत्सव
                </h2>
                <p className="text-white/75 text-xs sm:text-sm mt-1 max-w-xs">
                  Indian, seasonal &amp; traditional festivals celebrated in
                  their pure natural form
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="bg-[#a8d830]/20 border border-[#a8d830]/40 text-[#d4f0a0] text-[10px] px-2.5 py-1 rounded-full">
                    46 Days / Year
                  </span>
                  <span className="bg-white/15 border border-white/25 text-white/90 text-[10px] px-2.5 py-1 rounded-full">
                    Full Day
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 40 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.65 }}
               className="ca-slide-right lg:col-span-2 flex flex-col gap-4"
            >
              <div className="bg-white rounded-[9px] border border-[#e2efd6] p-4 sm:p-5 flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#edf7d8] rounded-[5px] flex items-center justify-center">
                    <GroupsOutlined sx={{ fontSize: 16, color: "#7cb518" }} />
                  </div>
                  <p className="text-xs font-bold text-[#2d4a1e] uppercase tracking-wide">
                    स्वमहाभाव उत्सव Community Ceremony
                  </p>
                </div>
                <p className="text-[11px] sm:text-xs text-[#4a5e34] leading-relaxed">
                  <span className="font-semibold text-[#2d6a4f]">
                    भारतीय, ऋतुजन्य आणि पारंपरिक सणांचे&nbsp;
                    <strong>
                      वैज्ञानिक, आरोग्यदायी आणि नैसर्गिक पद्धतीने उत्सवमय साजरे
                      करणारे विशेष सामुदायिक आयोजन.
                    </strong>
                  </span>
                  &nbsp;या उत्सवात सहभागी होणाऱ्या अतिथींना&nbsp;
                  <strong>पूर्ण दिवसाचा अनुभव व भोजनाची व्यवस्था</strong>
                  &nbsp;उपलब्ध असते. वर्षातून निवडक दिवशी आयोजित होणाऱ्या या
                  कार्यक्रमात&nbsp;प्रत्येक वेळी{" "}
                  <strong>१० अतिथींचा मर्यादित सहभाग</strong> ठेवला जातो,
                  जेणेकरून प्रत्येकाला शांत, अर्थपूर्ण आणि समृद्ध अनुभव मिळू
                  शकेल.
                </p>
                <p className="text-[11px] sm:text-xs text-[#4a5e34] leading-relaxed">
                  संपूर्ण वर्षात <strong>एकूण ४६ दिवस</strong> भारतीय सण,
                  ऋतुचक्राशी संबंधित परंपरा, विधी आणि सांस्कृतिक
                  उपक्रमांचा&nbsp;<strong>पूर्ण दिवसाचा उत्सव</strong>
                  &nbsp;म्हणून साजरा केला जातो.
                </p>
                <p className="text-[11px] sm:text-xs text-[#4a5e34] leading-relaxed">
                  पूर्वनियोजित कार्यक्रम जसे की&nbsp;
                  <strong>
                    उत्सव, परिषद (conference) किंवा इतर विशेष आयोजन
                  </strong>
                  &nbsp;असलेल्या दिवशी या समारंभासाठी स्वतंत्र बुकिंग उपलब्ध
                  राहणार नाही.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 mt-4">
            <motion.div {...fadeInUp} className="bg-[#edf7d8]/80 rounded-[9px] border border-[#c5de88]/50 p-4 sm:p-5">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-8 h-8 bg-[#edf7d8] rounded-[5px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <SelfImprovementOutlined
                    sx={{ fontSize: 16, color: "#7cb518" }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-[#2d6a4f] mb-1 text-xs sm:text-sm">
                    स्वसुसंस्कृतिजीवनविधान Well Consecrate Life Style&nbsp;
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#4a5e34] leading-relaxed">
                    स्वसुसंस्कृतिजीवनविधान is a{" "}
                    <strong>
                      natural and scientific way of celebrating life through
                      traditional rituals and festivals
                    </strong>
                    . Rooted in seasonal wisdom, Indian festivals are designed
                    to&nbsp;
                    <strong>
                      enhance health, energy, and spiritual balance
                    </strong>
                    .<br />
                    At <strong>स्वग्राम</strong>, these celebrations are
                    observed in their&nbsp;
                    <strong>
                      pure, natural form, free from toxins and artificiality
                    </strong>
                    , allowing individuals to experience the&nbsp;
                    <strong>
                      true harmony of nature, culture, and spirituality
                    </strong>
                    . Each occasion becomes a&nbsp;
                    <strong>
                      meaningful community experience that nurtures well-being
                      and inner connection
                    </strong>
                    .
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="bg-white rounded-[9px] border border-[#e2efd6] p-4 sm:p-5 flex flex-col gap-3">
              <p className="text-[11px] sm:text-xs text-[#4a5e34] leading-relaxed">
                In addition, enjoy a visit&nbsp;
                <span className="font-semibold text-[#2d6a4f]">
                  स्वग्रामदर्शन Community Vision&nbsp;
                </span>
                &amp;&nbsp;
                <span className="font-semibold text-[#2d6a4f]">
                  गाईत्वग्राम Cow Village Vision&nbsp;
                </span>
                with&nbsp;
                <span className="font-semibold text-[#7cb518]">
                  हरिचाया Green Tea&nbsp;
                </span>
                /&nbsp;
                <span className="font-semibold text-[#7cb518]">
                  ऊर्जापिय Energy Drink&nbsp;
                </span>
                /&nbsp;
                <span className="font-semibold text-[#7cb518]">
                  नैवेद्यप्रसाद Wholesome Offerings&nbsp;
                </span>
                /&nbsp;
                <span className="font-semibold text-[#7cb518]">
                  सात्म्यग्रास Wholesome Bites&nbsp;
                </span>
                &amp;&nbsp;
                <span className="font-semibold text-[#7cb518]">
                  पूर्णाहार Whole Meal&nbsp;
                </span>
                followed by&nbsp;
                <span className="font-semibold text-[#7a5c40]">
                  ताम्बूलभक्षण Betal Chewing&nbsp;
                </span>
                ;
              </p>
              <div className="bg-gradient-to-r from-[#2d6a4f]/10 to-[#7cb518]/10 rounded-[9px] p-3 border-l-4 border-[#2d6a4f]">
                <div className="flex items-center gap-1.5 mb-1">
                  <AccessTimeOutlined sx={{ fontSize: 14, color: "#2d6a4f" }} />
                  <span className="font-semibold text-[#2d6a4f] text-[11px] sm:text-xs">
                    Details of visit :&nbsp;
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs font-semibold text-[#2d2a26]">
                  Full Day session : 06.45 AM to 07.15 PM with two Meal +
                  Aromatic Green Tea / Energy Drink / Wholesome Offerings /
                  Wholesome Bites = Min 10 Persons.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-3 sm:px-5 mt-8 sm:mt-12">
          <div className="grid lg:grid-cols-5 gap-4 sm:gap-5 items-stretch">
            <div className="lg:col-span-2 flex flex-col gap-4 order-2 lg:order-1">
              <motion.div {...fadeInUp} className="bg-[#fdf6ee] rounded-[9px] border border-[#e8d8c0] p-4 sm:p-5 flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#f5e8d8] rounded-[5px] flex items-center justify-center">
                    <AgricultureOutlined
                      sx={{ fontSize: 16, color: "#a07850" }}
                    />
                  </div>
                  <p className="text-xs font-bold text-[#6b3f1a] uppercase tracking-wide">
                    Everyday Activities
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    "Ayurveda & Diet",
                    "Yoga & Natural Lifestyle",
                    "Farming & Gauseva",
                    "Panchagavya Production",
                    "Herb Cultivation",
                    "Skills Development",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircleOutline
                        sx={{ fontSize: 14, color: "#7cb518" }}
                      />
                      <span className="text-[11px] text-[#4a3a28]">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-[#7cb518]/10 rounded-[9px] p-3 border border-[#7cb518]/30 mt-1">
                  <div className="flex items-start gap-2">
                    <LocalFloristOutlined
                      sx={{
                        fontSize: 14,
                        color: "#7cb518",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <p className="font-semibold text-[#2d6a4f] text-[11px] sm:text-xs mb-1">
                        स्वग्राम & गाईत्वग्राम Cow Village
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-[#4a3a28] leading-relaxed">
                        06.45 AM to 07.15 PM. Activity includes experiential
                        celebration of ceremony, seasonal rituals, Ayurveda,
                        Diet, Yoga, Natural Lifestyle, Farming, Gauseva,
                        Wellness Tourism, Production of Panchagavya, Herbs,
                        different medicines & skills development. Booking
                        available every Day Throughout the year.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div {...fadeInUp} className="bg-[#fff8f0] rounded-[9px] border border-[#e8d8c0] p-4 flex items-start gap-3">
                <div className="w-9 h-9 bg-[#f5e8d8] rounded-[5px] flex-shrink-0 flex items-center justify-center">
                  <VolunteerActivismOutlined
                    sx={{ fontSize: 18, color: "#a07850" }}
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#6b3f1a]">
                    स्वग्रामपत्र Community Card
                  </p>
                  <p className="text-[10px] text-[#7a5c40] mt-1 leading-relaxed">
                    Before booking apply for&nbsp;
                    <span className="font-semibold">
                      स्वग्रामपत्र Community Card&nbsp;
                    </span>
                    to start journey towards Hundred Years Natural Lifestyle.
                    Erase Medicine. Delete Diseases. Add Health. Multiply
                    Life.&nbsp;
                    <span className="font-semibold text-[#2d6a4f]">
                      स्वग्रामपत्र Community Card&nbsp;
                    </span>
                    is gateway to complete all needs of Joint Family. It's a
                    Premium Membership with Joint Family Benefit Discount on
                    every Privilege Services.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="ca-slide-right lg:col-span-3 relative rounded-[9px] overflow-hidden min-h-[240px] sm:min-h-[320px] order-1 lg:order-2"
              {...hoverLift}
            >
              <img
                src={YogaMaleImg}
                alt="Full Day Activities"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3d2006]/80 via-[#3d2006]/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#3d2006]/30 to-transparent" />
              <div className="absolute bottom-0 right-0 p-5 sm:p-6 text-right">
                <span className="text-[#f5c07a] text-[10px] font-bold uppercase tracking-widest">
                  Full Day Activities
                </span>
                <h2 className="text-white text-xl sm:text-2xl font-bold leading-tight mt-1">
                  ग्रामपूर्णदिनकर्मण्य
                </h2>
                <p className="text-white/75 text-xs sm:text-sm mt-1 max-w-xs ml-auto">
                  Full Day Activity according to that day special. Experience
                  Natural Lifestyle with two complete whole Diet Meals. Also,
                  enjoy Aromatic Green Tea / Energy Drink / Wholesome Offerings
                  / Wholesome Bites. Introductory tour with an expert guide
                  &amp; mentor to explore ideas of&nbsp;
                  <span className="font-semibold">स्वग्राम</span>
                  &nbsp;&amp;&nbsp;
                  <span className="font-semibold">गाईत्वग्राम Cow Village</span>
                  .
                </p>
                <div className="flex gap-2 mt-3 justify-end">
                  <span className="bg-[#c4956a]/25 border border-[#c4956a]/40 text-[#ffe4c4] text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CurrencyRupeeOutlined sx={{ fontSize: 10 }} />
                    2000
                  </span>
                  <span className="bg-white/15 border border-white/25 text-white/90 text-[10px] px-2.5 py-1 rounded-full">
                    Year-round
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-3 sm:px-5 mt-8 sm:mt-12">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="ca-section-divider flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-[#d4e8b4]" />
            <div className="flex items-center gap-2">
              <InfoOutlined sx={{ fontSize: 16, color: "#7cb518" }} />
              <span className="text-xs font-bold text-[#2d4a1e] uppercase tracking-widest">
                Event Description
              </span>
            </div>
            <div className="h-px flex-1 bg-[#d4e8b4]" />
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <motion.div
              {...fadeInUp}
              className="bg-white rounded-[9px] border border-[#e2efd6] p-4 flex items-start gap-2.5"
              {...hoverLiftSm}
            >
              <CheckCircleOutline
                sx={{
                  fontSize: 16,
                  color: "#7cb518",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <p className="text-[11px] sm:text-xs text-[#3d4a2e] leading-relaxed">
                Daily Lifestyle activity with protocol of&nbsp;
                <span className="font-semibold text-[#2d6a4f]">
                  स्वग्राम&nbsp;
                </span>
                throughout year includes ceremonies, celebrations, Daily events,
                Programs, Rituals & Day special event along with Dinacharya, &
                Rutucharya. Involvement of&nbsp;
                <span className="font-semibold text-[#2d6a4f]">
                  स्वग्राम, स्वगुरुकुल Commune, कुटुम्बिनी Joint Family&nbsp;
                </span>
                with&nbsp;
                <span className="font-semibold text-[#7cb518]">
                  सन्तोषणीय Propitious Optimistic लोक्य Common Living
                </span>
                .
              </p>
            </motion.div>
            <motion.div
              {...fadeInUp}
              className="bg-white rounded-[9px] border border-[#e2efd6] p-4 flex items-start gap-2.5"
              {...hoverLiftSm}
            >
              <CheckCircleOutline
                sx={{
                  fontSize: 16,
                  color: "#7cb518",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <p className="text-[11px] sm:text-xs text-[#3d4a2e] leading-relaxed">
                In addition, enjoy a visit&nbsp;
                <span className="font-semibold text-[#2d6a4f]">
                  स्वग्रामदर्शन Community Vision
                </span>
                &nbsp;&amp;&nbsp;
                <span className="font-semibold text-[#2d6a4f]">
                  गाईत्वग्राम Cow Village Vision
                </span>
                .
              </p>
            </motion.div>
            <motion.div
              {...fadeInUp}
              className="bg-white rounded-[9px] border border-[#e2efd6] p-4 flex items-start gap-2.5"
              {...hoverLiftSm}
            >
              <CheckCircleOutline
                sx={{
                  fontSize: 16,
                  color: "#7cb518",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <p className="text-[11px] sm:text-xs text-[#3d4a2e] leading-relaxed">
                This is an introductory whole day experience with an expert
                guide & mentor to explore ideas of&nbsp;
                <span className="font-semibold text-[#2d6a4f]">
                  स्वग्राम&nbsp;
                </span>
                &&nbsp;
                <span className="font-semibold text-[#2d6a4f]">
                  गाईत्वग्राम Cow Village
                </span>
                . Enjoy Aromatic Green Tea / Energy Drink / Wholesome Offerings
                / Wholesome Bites. Booking available every Day Throughout the
                year.
              </p>
            </motion.div>
            <motion.div
              {...fadeInUp}
              className="bg-white rounded-[9px] border border-[#e2efd6] p-4 flex items-start gap-2.5"
              {...hoverLiftSm}
            >
              <CheckCircleOutline
                sx={{
                  fontSize: 16,
                  color: "#7cb518",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
              <p className="text-[11px] sm:text-xs text-[#3d4a2e] leading-relaxed">
                Max. 10 Visitors allowed. For group bookings ask for customized
                packages to get more benefits & discount.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-3 sm:px-5 mt-10 sm:mt-14 pb-12">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="ca-section-divider flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-[#d4e8b4]" />
            <div className="flex items-center gap-2">
              <CalendarTodayOutlined sx={{ fontSize: 16, color: "#7cb518" }} />
              <span className="text-xs font-bold text-[#2d4a1e] uppercase tracking-widest">
                Event Slots Details
              </span>
            </div>
            <div className="h-px flex-1 bg-[#d4e8b4]" />
          </motion.div>

          <div className="ca-slot-grid grid sm:grid-cols-2 gap-4 sm:gap-5">
            {eventSlots.map((slot, index) => {
              const isFirst = index === 0;
              const accentFrom = isFirst ? "#4a8c2a" : "#a07850";
              const accentTo = isFirst ? "#7cb518" : "#c4956a";
              const features = isFirst
                ? [
                    "Community bonding & rituals",
                    "Two whole meals included",
                    "Min 10 persons group",
                  ]
                : [
                    "Expert guide & mentor tour",
                    "Two whole diet meals",
                    "Booking open year-round",
                  ];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.14 }}
                  className="ca-slot-card bg-white rounded-[9px] overflow-hidden border border-[#e2efd6] flex flex-col shadow-sm"
                  {...hoverLift}
                >
                  <div className="relative h-44 md:h-60 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                      src={slot.image}
                      alt={slot.serviceName}
                      className="w-full h-full object-cover transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[#d4f0a0] text-[10px] font-bold uppercase tracking-wider">
                        {slot.nameHindi}
                      </p>
                      <h3 className="text-white text-base sm:text-lg font-bold leading-tight">
                        {slot.serviceName}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div className="flex gap-2">
                      {[`In ${slot.checkIn}`, `Out ${slot.checkOut}`].map(
                        (t, i) => (
                          <span
                            key={t}
                            className={`flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-full border ${i === 0 ? "bg-[#f0fde4] text-[#2d6a1a] border-[#c5de88]/50" : "bg-[#faf3eb] text-[#7a5030] border-[#d4b896]/40"}`}
                          >
                            <AccessTimeOutlined sx={{ fontSize: 11 }} />
                            {t}
                          </span>
                        ),
                      )}
                    </div>

                    <p className="text-[11px] sm:text-xs text-[#3d4a2e] leading-relaxed">
                      {slot.description}
                    </p>

                    <div className="flex flex-col gap-1.5">
                      {features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <CheckCircleOutline
                            sx={{ fontSize: 14, color: accentFrom }}
                          />
                          <span className="text-[11px] text-[#3d4a2e]">
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-start gap-1.5 bg-[#7cb518]/10 p-2.5 rounded-[5px] border border-[#7cb518]/30">
                      <CheckCircleOutline
                        sx={{
                          fontSize: 14,
                          color: "#7cb518",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                      <p className="text-[10px] sm:text-[11px] text-[#2d2a26]/80">
                        <span className="font-semibold text-[#7cb518]">
                          Benefits :
                        </span>
                        &nbsp;{slot.benefits}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <motion.button
                        {...hoverBtn}
                        onClick={() => {
                          setOpenEventBookModal(true);
                          setSelectedEvent(slot);
                        }}
                        className="w-full text-white font-bold py-2.5 rounded-[9px] text-sm flex items-center justify-center gap-2 border-none cursor-pointer"
                        style={{
                          background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})`,
                        }}
                      >
                        <EventNoteOutlined sx={{ fontSize: 18 }} />
                        Book Event
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="ca-note-banner mt-4 bg-[#f0fde4] border border-[#c5de88]/50 rounded-[9px] px-4 py-3 text-center">
            <p className="text-xs text-[#2d4a1e]">
              <span className="font-bold">Note:</span>&nbsp;Bookings available
              every day throughout the year. For group bookings, ask for
              customized packages to get more benefits &amp; discount.
            </p>
          </motion.div>
        </section>

        {openEventBookModal && (
          <VisitorsFormModal
            open={openEventBookModal}
            handleClose={() => {
              setOpenEventBookModal(false);
              setSelectedEvent(null);
            }}
            serviceDetails={{
              ...selectedEvent,
              price: selectedEvent?.price || "Free",
            }}
            origin={"CommunityActivity"}
          />
        )}
      </div>
    );
};

export default CommunityActivities;
