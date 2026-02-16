import { AddSharp, RemoveSharp, Star } from "@mui/icons-material";
import {
  AwardIcon,
  Calendar,
  Droplets,
  Flower,
  GraduationCap,
  IndianRupee,
  Leaf,
  Snowflake,
  Sparkles,
  Sun,
  Timer,
} from "lucide-react";
import { useState } from "react";
import OPDBookingModal from "../opdBooking/OPDBookingModal";

const academyData = [
  {
    season: "उन्हाळा / Summer",
    dates: "16/02/2026 – 21/06/2026",
    serviceName: "स्वग्रीष्मजाविहार / Summer Academy",
    duration: "Summery 120+ Days",
    price: "1,26,000",
    Icon: Sun,
    iconColor: "text-amber-600",
    img: "https://img.freepik.com/free-photo/flourishing-vegetation-sunny-day_1160-201.jpg?t=st=1768223043~exp=1768226643~hmac=07e8e4536ea16c407748ecd3edd5f66dadbae34b1f4a57c2ffa456c4d2efa312&w=1480",
    gradient: "from-green-700 via-emerald-600 to-lime-500",
    bgGlow: "rgba(251, 146, 60, 0.2)",
  },
  {
 
    season: "पावसाळा / Rainy",
    dates: "18/06/2026 – 23/10/2026",
    serviceName: "स्ववर्ष्यजाविहार / Rainy Academy",
    duration: "Rainy 120+ Days",
    price: "1,26,000",
    Icon: Droplets,
    iconColor: "text-emerald-600",
    img: "https://img.freepik.com/free-photo/cloud-forest-landscape_23-2151794773.jpg?t=st=1768222647~exp=1768226247~hmac=289584922ca6e8557f428047a09912654ee65a617214e0843ecf7d6703e3f3ee&w=1480",
    gradient: "from-green-700 via-emerald-600 to-lime-500",
    bgGlow: "rgba(16, 185, 129, 0.2)",
  },

  {
    season: "हिवाळा / Winter",
    dates: "23/10/2026 – 21/02/2027",
    serviceName: "स्वहैमन्तजाविहार / Winter Academy",
    duration: "Wintry 120+ Days",
    price: "1,26,000",
    Icon: Snowflake,
    iconColor: "text-green-600",
    img: "https://img.freepik.com/free-photo/beautiful-forest-winter_23-2147741925.jpg?t=st=1768222925~exp=1768226525~hmac=980113d34c2c3d608ca57dcad5f55e70abb65fd7e24eb3ce16296e69b6d9ed90&w=1480",
    gradient: "from-green-700 via-emerald-600 to-lime-500",
    bgGlow: "rgba(96, 165, 250, 0.2)",
  },
];

export default function CommuneTabs() {
  const [innocenceAcademyDays, setInnocenceAcademyDays] = useState(0);
  const [liberatedAcademyDays, setLiberatedAcademyDays] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [openAppointementModal, setOpenAppointmentModal] = useState(false);
  const innocenceAcademyPricePerDay = 2000;
  const liberatedAcademyPricePerDay = 2500;

  const calculateInnocenceAcademyTotal = () =>
    innocenceAcademyDays * innocenceAcademyPricePerDay;
  const calculateLiberatedAcademyTotal = () =>
    liberatedAcademyDays * liberatedAcademyPricePerDay;

  const academyProgrammes = [
    {
      programmeId: 1,
      serviceName: "Innocence Academy",
      programmeNameHindi: "स्वमुग्धविहार",
      durationRange: "0 to N days",
      eligibilityCriteria: "Gurukul Students",
      selectedDays: innocenceAcademyDays,
      pricePerDay: innocenceAcademyPricePerDay,
      tagline:
        "Customized short-term stays for those who have completed 3S स्वऋतुविहार / Seasonal Academy and wish to extend their experience",
      info: [
        {
          title: "शिष्य / Disciple",
          desc: "Deepen learning and expertise.",
        },
        {
          title: "शिक्षु / Apprentice",
          desc: "Extra practice and skill refinement.",
        },
        {
          title: "प्रशिक्षु / Trainee",
          desc: "Additional training and guidance.",
        },
        {
          title: "स्वयंसेवक / Volunteer",
          desc: "Contribute as a volunteer while staying.",
        },
      ],
      totalPrice: calculateInnocenceAcademyTotal(),
      price: calculateInnocenceAcademyTotal(),
      gradient: "from-green-600 via-lime-600 to-lime-700",
      accentColor: "#65a30d",
      lightBg: "bg-lime-100",
      onIncrement: () => setInnocenceAcademyDays((prev) => prev + 1),
      onDecrement: () =>
        setInnocenceAcademyDays((prev) => (prev > 1 ? prev - 1 : 0)),
    },
    {
      programmeId: 2,
      serviceName: "Liberated Academy",
      programmeNameHindi: "निर्मुक्तविहार",
      durationRange: "0 to N days",
      eligibilityCriteria: "Anyone",
      selectedDays: liberatedAcademyDays,
      pricePerDay: liberatedAcademyPricePerDay,
      info: [
        "No projects or courses.",
        "Experience lifestyle freely, 365 days a year.",
        "Ideal for those seeking solitude, self-study, or work-from-home experience.",
        "Focus on calm, quiet living and personal growth through स्वग्राम.",
      ],
      totalPrice: calculateLiberatedAcademyTotal(),
      price: calculateLiberatedAcademyTotal(),
      gradient: "from-[#882E2E] via-[#a03838] to-[#b84242]",
      accentColor: "#882E2E",
      lightBg: "bg-[#882E2E]/5",
      onIncrement: () => setLiberatedAcademyDays((prev) => prev + 1),
      onDecrement: () =>
        setLiberatedAcademyDays((prev) => (prev > 1 ? prev - 1 : 0)),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-teal-50 relative overflow-hidden md:px-12">
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          >
            <Sparkles
              className="text-amber-400 opacity-30"
              size={12 + Math.random() * 16}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center px-4 py-5 ">
        <div className="w-full">
          <h1 className="text-xl md:text-3xl  font-black text-center mb-2 animate-fade-in-up">
            <span className="text-xl md:text-4xl inline-block bg-gradient-to-r py-1 from-green-500 via-emerald-600 to-teal-500 bg-clip-text text-transparent animate-gradient-x">
             स्वगुरुकुल 
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r py-1 from-amber-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-x">
              Commune
            </span>
          </h1>
          <div className="relative backdrop-blur-md bg-white/80 rounded-2xl p-6 border-2 border-green-200 shadow-2xl animate-fade-in-up animation-delay-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-amber-100/50 rounded-2xl"></div>
            <div className="relative space-y-4 text-sm leading-relaxed text-gray-700">
              <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-green-600 first-letter:mr-2 first-letter:float-left">
                Today, everyone wants to be healthy for 100 years. Want to do
                natural farming. Want to practice a natural lifestyle. Needs
                toxin-adulteration free pure natural food, panchgavya, herbs and
                medicines. Want to turn cities to villages. Want to revive the
                forgotten tradition of the village. Want to go to villages & to
                do it all in our own home. Can anyone provide a perfect
                representation of the local traditions, especially the Indian
                traditions and centuries-old way of life, in the soil of the
                undivided universe as a whole? Today, everyone is looking for
                it. That search has been completed by&nbsp;
                <strong className="text-green-600 font-bold">
                  स्वग्राम Community
                </strong>
                .
              </p>
              <p className="text-gray-600">
                <strong className="text-green-600 font-bold">
                  स्वग्राम Community &nbsp;
                </strong>
                <strong className="text-amber-600 font-bold">
                  स्वगृहकुल Commune &nbsp;
                </strong>
                will give everyone the strength and training to build their
                dream village or part of the village. This means that India will
                again become a complete and self-sufficient village's country.
                That is why we are coming up with &nbsp;
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-500 to-lime-500 rounded-lg text-white font-bold text-base shadow-lg">
                  'हर ग्राम स्वग्राम'
                </span>
                &nbsp; campaign. To complete this campaign or reality we started
                academy.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 px-4 py-2 md:pt-8 pb-4">
        <div className="text-center mb-3 md:mb-6">
          <h2 className="text-xl md:text-3xl  font-black bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent mb-3">
            Seasonal Academy Admission
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-green-500 to-amber-500 mx-auto rounded-full"></div>
        </div>

        <div className=" p-4 sm:p-6 lg:p-8 ">
          <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {academyData.map((item, i) => {
              return (
                <div key={i} className="group relative">
                  <div
                    className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500"
                    style={{ background: item.bgGlow }}
                  ></div>

                  <div
                    className="relative h-full bg-white/90 rounded-2xl border-2 border-white shadow-xl transform transition-all duration-500 group-hover:scale-[1.02]"
                    style={{ overflow: "visible" }}
                  >
                    <div className="relative h-[200px] overflow-hidden rounded-t-2xl">
                      <img
                        src={item.img}
                        alt={item.serviceName}
                        className="w-full h-full object-cover
                          transition-transform duration-700 ease-out
                          group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                      <div
                        className="absolute bottom-2 right-2
                          px-4 py-1.5
                          rounded-full
                          bg-white/25
                          backdrop-blur-md
                          border border-white/40
                          text-xs font-semibold text-white
                          shadow-lg"
                      >
                        {item.season}
                      </div>
                    </div>

                    <div className="p-3 sm:p-4">
                      <div className="grid gap-2 mb-3">
                        <div className="bg-lime-50 rounded-lg p-2 border border-lime-200">
                          <p className="text-xs text-gray-500 flex space-x-2 items-center">
                            <Calendar className="text-green-600 w-3 h-3" />
                            <span>Dates</span>
                          </p>
                          <p className="text-xs text-gray-800 font-semibold">
                            {item.dates}
                          </p>
                        </div>
                        <div className="bg-lime-50 rounded-lg p-2 border border-lime-200">
                          <p className="text-xs text-gray-500 flex space-x-2 items-center">
                            <Timer className="text-green-600 w-3 h-3" />
                            <span>Duration</span>
                          </p>
                          <p className="text-xs text-gray-800 font-semibold">
                            {item.duration}
                          </p>
                        </div>
                      </div>

                      <div className="bg-lime-50 rounded-lg p-2 border border-lime-200">
                        <p className="text-xs text-gray-500 flex space-x-2 items-center">
                          <GraduationCap className="text-green-600 w-3 h-3" />
                          <span>Academy</span>
                        </p>
                        <p className="text-xs text-gray-800 font-semibold">
                          {item.serviceName}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedService(item);
                            setOpenAppointmentModal(true);
                          }}
                          className={`w-full sm:w-auto px-4 sm:px-5 py-2 bg-gradient-to-r ${item.gradient} rounded-lg text-white text-sm font-bold shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95`}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative z-10 px-6 py-6 ">
        <div className="mx-auto grid md:grid-cols-2 gap-5 max-w-7xl">
          {academyProgrammes.map((programme, index) => (
            <div
              key={programme.programmeId}
              className="group relative"
              style={{
                animation: `slideInScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${
                  index * 0.15
                }s both`,
              }}
            >
              <div
                className="absolute -inset-1 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700 animate-pulse-slow"
                style={{
                  background: `radial-gradient(circle at 30% 50%, ${programme.accentColor}80, ${programme.accentColor}40, transparent 70%)`,
                }}
              ></div>
              <div className="relative h-full backdrop-blur-2xl bg-gradient-to-br from-white/95 to-white/85 rounded-3xl overflow-hidden border border-white/60 shadow-2xl transform group-hover:scale-[1.01] transition-all duration-700">
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-60"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${programme.accentColor}, transparent)`,
                    animation: "shimmer 3s infinite",
                  }}
                ></div>
                <div className="relative overflow-hidden">
                  <div
                    className={`relative p-4 bg-gradient-to-br ${programme.gradient} overflow-hidden`}
                    style={{
                      backgroundImage: `${programme.gradient}, repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out"></div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-black/5 rounded-full blur-2xl"></div>

                    <div className="relative flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative">
                          <div className="absolute inset-0 bg-white/30 rounded-xl blur-md"></div>
                          <div className="relative p-2 bg-white/95 rounded-xl shadow-lg transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                            <GraduationCap
                              className="w-5 h-5"
                              style={{ color: programme.accentColor }}
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-black text-white drop-shadow-lg tracking-tight">
                            {programme.serviceName}
                          </h3>
                          <p className="text-xs font-bold text-white/95 drop-shadow-md">
                            {programme.programmeNameHindi}
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/30 rounded-full blur-sm"></div>
                        <div className="relative h-7 w-7 flex justify-center text-center items-center bg-white/95 rounded-full shadow-lg transform group-hover:scale-110 transition-all duration-300">
                          <span
                            className="font-black text-xs"
                            style={{ color: programme.accentColor }}
                          >
                            #{programme.programmeId}
                          </span>
                        </div>
                      </div>
                    </div>
               
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {programme.tagline && (
                    <div className="relative">
                      <div
                        className="absolute -left-2 top-0 bottom-0 w-0.5 rounded-full"
                        style={{
                          backgroundColor: programme.accentColor,
                          opacity: 0.3,
                        }}
                      ></div>
                      <p className="text-xs text-gray-600 leading-relaxed italic font-light pl-2.5">
                        "{programme.tagline}"
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="relative group/stat overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl"></div>
                      <div
                        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover/stat:opacity-10 transition-opacity duration-500 rounded-xl"
                        style={{ backgroundColor: programme.accentColor }}
                      ></div>
                      <div className="relative p-3 border border-gray-200/50 rounded-xl shadow-sm group-hover/stat:shadow-md group-hover/stat:border-gray-300/70 transition-all duration-300">
                        <Calendar
                          className="w-4 h-4 mb-1.5 opacity-70"
                          style={{ color: programme.accentColor }}
                        />
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">
                          Duration
                        </p>
                        <p className="text-xs text-gray-900 font-bold">
                          {programme.durationRange}
                        </p>
                      </div>
                    </div>

                    <div className="relative group/stat overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl"></div>
                      <div
                        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover/stat:opacity-10 transition-opacity duration-500 rounded-xl"
                        style={{ backgroundColor: programme.accentColor }}
                      ></div>
                      <div className="relative p-3 border border-gray-200/50 rounded-xl shadow-sm group-hover/stat:shadow-md group-hover/stat:border-gray-300/70 transition-all duration-300">
                        <GraduationCap
                          className="w-4 h-4 mb-1.5 opacity-70"
                          style={{ color: programme.accentColor }}
                        />
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">
                          Eligibility
                        </p>
                        <p className="text-xs text-gray-900 font-bold">
                          {programme.eligibilityCriteria}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl border border-gray-200/70 shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-xl"></div>
                    <div className="relative p-3">
                      {Array.isArray(programme.info) &&
                        programme.info.length > 0 && (
                          <div className="space-y-2">
                            {typeof programme.info[0] === "object" ? (
                              <div className="grid grid-cols-2 gap-2">
                                {programme.info.map((item, i) => (
                                  <div
                                    key={i}
                                    className="group/info relative overflow-hidden"
                                    style={{
                                      animation: `fadeInUp 0.5s ease-out ${
                                        0.1 + i * 0.05
                                      }s both`,
                                    }}
                                  >
                                    <div className="absolute inset-0 bg-white rounded-lg opacity-60 group-hover/info:opacity-100 transition-opacity duration-300"></div>
                                    <div
                                      className="absolute inset-0 opacity-0 group-hover/info:opacity-5 transition-opacity duration-300 rounded-lg"
                                      style={{
                                        backgroundColor: programme.accentColor,
                                      }}
                                    ></div>
                                    <div className="relative p-2.5 border border-gray-200/60 rounded-lg group-hover/info:border-gray-300 group-hover/info:shadow-sm transition-all duration-300">
                                      <h4
                                        className="font-black text-xs mb-0.5 tracking-wide"
                                        style={{ color: programme.accentColor }}
                                      >
                                        {item.title}
                                      </h4>
                                      <p className="text-xs text-gray-600 leading-relaxed">
                                        {item.desc}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="space-y-1.5">
                                {programme.info.map((item, i) => (
                                  <div
                                    key={i}
                                    className="group/info flex items-start gap-2 bg-white/60 rounded-lg p-2.5 border border-gray-200/60 hover:bg-white hover:border-gray-300/80 hover:shadow-sm transition-all duration-300"
                                    style={{
                                      animation: `fadeInLeft 0.5s ease-out ${
                                        0.1 + i * 0.05
                                      }s both`,
                                    }}
                                  >
                                    <div className="relative mt-1">
                                      <div
                                        className="absolute inset-0 blur-sm opacity-50 rounded-full"
                                        style={{
                                          backgroundColor:
                                            programme.accentColor,
                                        }}
                                      ></div>
                                      <div
                                        className="relative w-1.5 h-1.5 rounded-full"
                                        style={{
                                          backgroundColor:
                                            programme.accentColor,
                                        }}
                                      ></div>
                                    </div>
                                    <span className="text-xs text-gray-700 leading-relaxed flex-1">
                                      {item}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl border border-gray-200/70 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white/95"></div>
                    <div className="relative p-3">
                      <p className="text-xs text-gray-700 font-bold mb-3 text-center uppercase tracking-wider">
                        Select Number of Days
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={programme.onDecrement}
                          className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${programme.gradient} text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 overflow-hidden group/btn`}
                        >
                          <div className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/20 transition-colors duration-300"></div>
                          <RemoveSharp className="relative w-4 h-4 mx-auto" />
                        </button>

                        <div className="text-center min-w-[60px] relative">
                          <div
                            className="absolute inset-0 blur-xl opacity-20"
                            style={{ backgroundColor: programme.accentColor }}
                          ></div>
                          <div
                            className="relative text-4xl font-black tracking-tighter"
                            style={{ color: programme.accentColor }}
                          >
                            {programme.selectedDays}
                          </div>
                          <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                            {programme.selectedDays === 1 ? "Day" : "Days"}
                          </div>
                        </div>

                        <button
                          onClick={programme.onIncrement}
                          className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${programme.gradient} text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 overflow-hidden group/btn`}
                        >
                          <div className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/20 transition-colors duration-300"></div>
                          <AddSharp className="relative w-4 h-4 mx-auto" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="relative overflow-hidden rounded-xl border-2 shadow-lg"
                    style={{ borderColor: `${programme.accentColor}30` }}
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-br opacity-5"
                      style={{ backgroundColor: programme.accentColor }}
                    ></div>
                    <div
                      className="absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10"
                      style={{ backgroundColor: programme.accentColor }}
                    ></div>

                    <div className="relative p-3.5 bg-gradient-to-br from-white/95 to-gray-50/50 backdrop-blur-sm">
                      <div
                        className="flex items-center justify-between mb-3 pb-3 border-b-2 border-dashed"
                        style={{ borderColor: `${programme.accentColor}20` }}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="p-1.5 rounded-lg shadow-md"
                            style={{
                              backgroundColor: `${programme.accentColor}15`,
                            }}
                          >
                            <IndianRupee
                              className="w-4 h-4"
                              style={{ color: programme.accentColor }}
                            />
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 font-bold uppercase tracking-wide">
                              Per Day
                            </p>
                            <p className="text-xs text-gray-400 font-medium">
                              प्रति दिन
                            </p>
                          </div>
                        </div>
                        <p
                          className="text-2xl font-black tracking-tighter"
                          style={{ color: programme.accentColor }}
                        >
                          ₹{programme.pricePerDay.toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-black text-gray-900 uppercase tracking-wide">
                            Total Amount
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            कुल शुल्क • {programme.selectedDays}{" "}
                            {programme.selectedDays === 1 ? "day" : "days"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className="text-3xl font-black tracking-tighter"
                            style={{ color: programme.accentColor }}
                          >
                            ₹{programme.totalPrice.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedService(programme);
                      setOpenAppointmentModal(true);
                    }}
                    className={`relative w-full py-3 bg-gradient-to-r ${programme.gradient} rounded-xl text-white font-black text-sm shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden group/cta`}
                  >                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000"></div>

                    <div
                      className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500 blur-xl"
                      style={{ backgroundColor: programme.accentColor }}
                    ></div>

                    <span className="relative flex items-center justify-center gap-2 uppercase tracking-wider">
                      Book Programme Now
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <style jsx>{`
        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <style jsx>{`
        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      {openAppointementModal && (
        <OPDBookingModal
          open={openAppointementModal}
          handleClose={() => {
            setOpenAppointmentModal(false);
            setSelectedService(null);
          }}
          selectedService={selectedService}
        />
      )}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-gradient-x { 
          background-size: 200% auto;
          animation: gradient-x 3s linear infinite;
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
        .animation-delay-300 { animation-delay: 0.3s; opacity: 0; }
      `}</style>
    </div>
  );
}
