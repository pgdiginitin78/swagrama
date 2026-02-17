import React, { useState } from "react";
import { motion } from "framer-motion";
import NatureTwoTone from "@mui/icons-material/NatureTwoTone";
import SpaOutlined from "@mui/icons-material/SpaOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import EventNoteOutlined from "@mui/icons-material/EventNoteOutlined";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";
import LocalFloristOutlined from "@mui/icons-material/LocalFloristOutlined";
import SelfImprovementOutlined from "@mui/icons-material/SelfImprovementOutlined";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CalendarTodayOutlined from "@mui/icons-material/CalendarTodayOutlined";
import CurrencyRupeeOutlined from "@mui/icons-material/CurrencyRupeeOutlined";
import VolunteerActivismOutlined from "@mui/icons-material/VolunteerActivismOutlined";
import BookEventForm from "../../bookEventForm/BookEventForm";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const eventSlots = [
  {
    serviceName: "स्वसहभावउत्सव Community Ceremony",
    checkIn: "06:45",
    checkOut: "19:15",
    description:
      "Community festival and group celebrations at Swagrama. Full Day with meal celebration of Indian, Seasonal or Traditional festivals & Rituals.",
    benefits:
      "Encourages bonding, cultural participation, and collective well-being.",
    value: "",
    image:
      "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=600&h=400&fit=crop",
  },
  {
    serviceName: "ग्रामपूर्णदिनकर्मण्य Full Day Activities",
    checkIn: "06:45",
    checkOut: "19:15",
    description:
      "Full-day structured activities at Swagrama including ceremonies, Ayurveda, Diet, Yoga, Natural Lifestyle, Farming & Gauseva.",
    benefits: "Engages body and mind, promotes wellness and learning.",
    value: "2000",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
  },
];

const CommunityActivities = () => {
  const [openEventBookModal, setOpenEventBookModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f7f3] to-[#e8e8e0]" style={{
      backgroundImage: `radial-gradient(circle at 25% 25%, rgba(124, 181, 24, 0.08) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(45, 106, 79, 0.08) 0%, transparent 50%)`
    }}>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-[#2d6a4f] to-[#7cb518] py-4 px-4 sm:py-5 md:py-6 md:px-8"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3">
          <SpaOutlined className="text-[#f8f7f3] text-3xl sm:text-4xl md:text-5xl flex-shrink-0" />
          <h1 className="font-playfair text-lg sm:text-xl md:text-2xl lg:text-3xl  font-bold text-[#f8f7f3] text-center">
            स्वकर्मण्य Community Activities
          </h1>
          <SpaOutlined className="text-[#f8f7f3] text-3xl sm:text-4xl md:text-5xl flex-shrink-0" />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-[#f8f7f3]/90 mt-2  text-sm sm:text-base max-w-3xl mx-auto font-light px-4"
        >
          coming together to perform natural, meaningful duties.
        </motion.p>
      </motion.header>

      <main className="max-w-screen-xl mx-auto py-6 px-4 sm:py-8 md:px-8 md:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 sm:gap-8 md:gap-12"
        >
          <motion.section
            variants={itemVariants}
            className="bg-[#f8f7f3]/80 backdrop-blur-md border border-[#d9ddd0]/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-gradient-to-br from-[#2d6a4f] to-[#7cb518] p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-md flex-shrink-0">
                <GroupsOutlined className="text-[#f8f7f3] text-xl sm:text-2xl md:text-3xl" />
              </div>
              <h2 className="font-playfair text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#2d2a26]">
                स्वमहभावउत्सव Community Ceremony :
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 text-[#2d2a26]/90 leading-relaxed">
              <p className="text-xs sm:text-sm md:text-base">
                <span className="font-semibold text-[#2d6a4f]">
                  celebrating festivals scientifically, healthfully, and
                  naturally.
                </span>
                Full Day with meal: Once in year ceremony Date wise: 10 Guests
                (ज्यावेळी इतर पूर्वनियोजित कार्यक्रम म्हणजे उत्सव, conference,
                etc. असेल त्यादिवशी या दिवशीचे बुकिंग बंद ठेवणे.) Visitors /
                Guests for 46 Days / Year = full Day celebration of Indian or
                Seasonal or Traditional festivals, Rituals.
              </p>

              <motion.div
                variants={scaleVariants}
                className="bg-[#e8e8e0]/50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-[#d9ddd0]/50"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <SelfImprovementOutlined className="text-[#7cb518] text-lg sm:text-xl md:text-2xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#2d6a4f] mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                      स्वसुसंस्कृतिजीवनविधान Well Consecrate Life Style
                    </p>
                    <p className="text-xs sm:text-sm md:text-base">
                      is a Pure & special Rituals of LIFESTYLE = On Date = The
                      scientific method of celebrating festivals throughout the
                      year with natural way to make it complementary for health.
                      Every native or especially Indian festivals have been
                      established according to the season. Every festival is
                      full of energy and health. If every festival is done in a
                      pure form, free of poison & adulteration with natural
                      style then will get direct benefit from mother nature or
                      supernatural powers. It's a different fun to stay in
                      <span className="font-semibold text-[#2d6a4f]">
                        स्वग्राम
                      </span>
                      for all such festivals. The easiest way to achieve
                      spirituality. Each time there will be a special event.
                    </p>
                  </div>
                </div>
              </motion.div>

              <p className="text-xs sm:text-sm md:text-base">
                In addition, enjoy a visit&nbsp;
                <span className="font-semibold text-[#2d6a4f]">
                  स्वग्रामदर्शन Community Vision&nbsp;
                </span>
                &&nbsp;
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
                  सात्म्यग्रास  Wholesome Bites&nbsp;
                </span>
                &&nbsp;
                <span className="font-semibold text-[#7cb518]">
                  पूर्णाहार Whole Meal&nbsp;
                </span>
                followed by&nbsp;
                <span className="font-semibold text-[#7a5c40]">
                  ताम्बूलभक्षण Betal Chewing&nbsp;
                </span>
                ;
              </p>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-[#2d6a4f]/10 to-[#7cb518]/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border-l-4 border-[#2d6a4f]"
              >
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <AccessTimeOutlined className="text-[#2d6a4f] text-base sm:text-lg md:text-xl" />
                  <span className="font-semibold text-[#2d6a4f] text-xs sm:text-sm md:text-base">
                    Details of visit :&nbsp;
                  </span>
                </div>
                <p className="text-xs sm:text-sm md:text-base">
                  Full Day session: 06.45 AM to 07.15 PM with two Meal +
                  Aromatic Green Tea / Energy Drink / Wholesome Offerings /
                  Wholesome Bites = Min 10 Persons.
                </p>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            variants={itemVariants}
            className="bg-[#f8f7f3]/80 backdrop-blur-md border border-[#d9ddd0]/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-gradient-to-br from-[#7a5c40] to-[#4a3728] p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-md flex-shrink-0">
                <EventNoteOutlined className="text-[#f8f7f3] text-xl sm:text-2xl md:text-3xl" />
              </div>
              <h2 className="font-playfair text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#2d2a26]">
                ग्रामपूर्णदिनकर्मण्य Full Day Activities :
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 text-[#2d2a26]/90 leading-relaxed">
              <p className="text-xs sm:text-sm md:text-base">
                Full Day Activity according to that day special. Experience
                Natural Lifestyle with two complete whole Diet Meals. Also,
                enjoy Aromatic Green Tea / Energy Drink / Wholesome Offerings /
                Wholesome Bites. Introductory tour with an expert guide & mentor
                to explore ideas of&nbsp;
                <span className="font-semibold text-[#2d6a4f]">
                  स्वग्राम&nbsp;
                </span>
                &
                <span className="font-semibold text-[#2d6a4f]">
                  &nbsp;गाईत्वग्राम Cow Village
                </span>
                .
              </p>

              <motion.div
                variants={scaleVariants}
                className="bg-[#7cb518]/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-[#7cb518]/30"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <LocalFloristOutlined className="text-[#7cb518] text-lg sm:text-xl md:text-2xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#2d6a4f] mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                      स्वग्राम & गाईत्वग्राम Cow Village
                    </p>
                    <p className="text-xs sm:text-sm md:text-base">
                      06.45 AM to 07.15 PM. Activity includes experiential
                      celebration of ceremony, seasonal rituals, Ayurveda, Diet,
                      Yoga, Natural Lifestyle, Farming, Gauseva, Wellness
                      Tourism, Production of Panchagavya, Herbs, different
                      medicines & skills development. Booking available every
                      Day Throughout the year.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-[#7a5c40]/10 to-[#4a3728]/10 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border-l-4 border-[#7a5c40]"
              >
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                  <VolunteerActivismOutlined className="text-[#7a5c40] text-base sm:text-lg md:text-xl" />
                  <span className="font-semibold text-[#7a5c40] text-xs sm:text-sm md:text-base">
                    स्वग्रामपत्र Community Card
                  </span>
                </div>
                <p className="text-xs sm:text-sm md:text-base">
                  Before booking apply for&nbsp;
                  <span className="font-semibold">
                    स्वग्रामपत्र Community Card&nbsp;
                  </span>
                  to start journey towards Hundred Years Natural Lifestyle.
                  Erase Medicine. Delete Diseases. Add Health. Multiply Life.
                  <span className="font-semibold text-[#2d6a4f]">
                    स्वग्रामपत्र Community Card&nbsp;
                  </span>
                  is gateway to complete all needs of Joint Family. It's a
                  Premium Membership with Joint Family Benefit Discount on every
                  Privilege Services.
                </p>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            variants={itemVariants}
            className="bg-[#f8f7f3]/80 backdrop-blur-md border border-[#d9ddd0]/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-gradient-to-br from-[#7cb518] to-[#a3e635] p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-md flex-shrink-0">
                <InfoOutlined className="text-[#2d2a26] text-xl sm:text-2xl md:text-3xl" />
              </div>
              <h2 className="font-playfair text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#2d2a26]">
                Event Description:
              </h2>
            </div>

            <div className="text-[#2d2a26]/90">
              <ul className="flex flex-col list-none p-0 m-0">
                <motion.li
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-2 sm:gap-3"
                >
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed">
                    Daily Lifestyle activity with protocol of&nbsp;
                    <span className="font-semibold text-[#2d6a4f]">
                      स्वग्राम&nbsp;
                    </span>
                    throughout year includes ceremonies, celebrations, Daily
                    events, Programs, Rituals & Day special event along with
                    Dinacharya, & Rutucharya. Involvement of&nbsp;
                    <span className="font-semibold text-[#2d6a4f]">
                      स्वग्राम, स्वगुरुकुल Commune, कुटुम्बिनी Joint
                      Family&nbsp;
                    </span>
                    with&nbsp;
                    <span className="font-semibold text-[#7cb518]">
                      सन्तोषणीय Propitious Optimistic लोक्य Common Living
                    </span>
                    .
                  </p>
                </motion.li>

                <motion.li
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-2 sm:gap-3"
                >
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed">
                    In addition, enjoy a visit&nbsp;
                    <span className="font-semibold text-[#2d6a4f]">
                      स्वग्रामदर्शन Community Vision
                    </span>
                    &
                    <span className="font-semibold text-[#2d6a4f]">
                      गाईत्वग्राम Cow Village Vision
                    </span>
                    .
                  </p>
                </motion.li>

                <motion.li
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-2 sm:gap-3"
                >
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed">
                    This is an introductory whole day experience with an expert
                    guide & mentor to explore ideas of&nbsp;
                    <span className="font-semibold text-[#2d6a4f]">
                      स्वग्राम&nbsp;
                    </span>
                    &&nbsp;
                    <span className="font-semibold text-[#2d6a4f]">
                      गाईत्वग्राम Cow Village
                    </span>
                    . Enjoy Aromatic Green Tea / Energy Drink / Wholesome
                    Offerings / Wholesome Bites. Booking available every Day
                    Throughout the year.
                  </p>
                </motion.li>

                <motion.li
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-2 sm:gap-3"
                >
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed">
                    Max. 10 Visitors allowed. For group bookings ask for
                    customized packages to get more benefits & discount.
                  </p>
                </motion.li>
              </ul>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-gradient-to-br from-[#2d6a4f] to-[#7cb518] p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-md flex-shrink-0">
                <CalendarTodayOutlined className="text-[#f8f7f3] text-xl sm:text-2xl md:text-3xl" />
              </div>
              <h2 className="font-playfair text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#2d2a26]">
                Event Slots Details
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {eventSlots.map((slot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-[#f8f7f3]/80 backdrop-blur-md border border-[#d9ddd0]/50 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
                >
                  <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                    <img
                      src={slot.image}
                      alt={slot.serviceName}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                      <h3 className="font-playfair text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white drop-shadow-lg">
                        {slot.serviceName}
                      </h3>
                    </div>
                    {slot.value !== "" && (
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#7a5c40] text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1">
                        <CurrencyRupeeOutlined className="text-xs sm:text-sm" />
                        <span className="font-bold text-xs sm:text-sm">
                          {slot.value}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col gap-3 sm:gap-4">
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-[#2d6a4f]/10 text-[#2d6a4f] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm">
                        <AccessTimeOutlined className="text-xs sm:text-sm" />
                        <span>Check-In: {slot.checkIn}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-[#7a5c40]/10 text-[#7a5c40] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm">
                        <AccessTimeOutlined className="text-xs sm:text-sm" />
                        <span>Check-Out: {slot.checkOut}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs sm:text-sm md:text-base text-[#2d2a26]/90 leading-relaxed">
                        {slot.description}
                      </p>
                    </div>

                    <div className="flex items-start gap-1.5 sm:gap-2 bg-[#7cb518]/10 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-[#7cb518]/30">
                      <CheckCircleOutline className="text-[#7cb518] text-base sm:text-lg md:text-xl flex-shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-[#2d2a26]/80">
                        <span className="font-semibold text-[#7cb518]">
                          Benefits :
                        </span>
                        {slot.benefits}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-br from-[#2d6a4f] to-[#7cb518] text-[#f8f7f3] font-semibold py-2.5 px-4 sm:py-3 sm:px-6 rounded-lg sm:rounded-xl shadow-md hover:shadow-xl border-none cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base transition-all duration-300"
                      onClick={() => {
                        setOpenEventBookModal(true);
                        setSelectedEvent(slot);
                      }}
                    >
                      <EventNoteOutlined className="text-base sm:text-lg md:text-xl" />
                      Book Event
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#f8f7f3]/80 backdrop-blur-md border border-[#7cb518]/30 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl"
            >
              <p className="text-xs sm:text-sm md:text-base text-center text-[#2d2a26]/80">
                <span className="font-semibold text-[#2d6a4f]">
                  Note:
                </span>
                Bookings available every day throughout the year. For group
                bookings, ask for customized packages to get more benefits &
                discount.
              </p>
            </motion.div>
          </motion.section>
        </motion.div>
      </main>

      {openEventBookModal && (
        <BookEventForm
          open={openEventBookModal}
          handleClose={() => {
            setOpenEventBookModal(false);
            setSelectedEvent(null);
          }}
          eventDetails={selectedEvent}
        />
      )}
    </div>
  );
};

export default CommunityActivities;