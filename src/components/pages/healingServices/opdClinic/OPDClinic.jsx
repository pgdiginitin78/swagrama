import { Alarm, Forward, Info, Person } from "@mui/icons-material";
import { CalendarIcon } from "@mui/x-date-pickers";
import { useState } from "react";
import OPDBookingModal from "./OPDBookingModal";
import CompostIcon from "@mui/icons-material/Compost";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import HealingIcon from "@mui/icons-material/Healing";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

const healthcareServices = [
  {
    id: 1,
    serviceName: "स्वायुर्वेदचिचित्सालय Ayurveda OPD Clinic",
    categoryEnglish: "Ayurveda",
    practitionerType: "Community Ayurveda Healers",
    slotDuration: "30 Min",
    icon: CompostIcon,
    color: "emerald",
    practitioners: [
      {
        name: "Vd. Santosh Suryawanshi",
        degree: "MD Ayurveda",
        availability: ["Sunday", "Monday", "Tuesday"],
      },
      {
        name: "Vd. Avanti Nitsure",
        degree: "MD Ayurveda",
        availability: ["Wednesday"],
      },
      {
        name: "Vd. Pradip Taware",
        degree: "MD Ayurveda",
        availability: ["Thursday"],
      },
      {
        name: "Vd. Sandip Mehetre",
        degree: "Ayurvedacharya",
        availability: ["Friday"],
      },
      {
        name: "Vd. Smita Mehetre",
        degree: "MD Ayurveda",
        availability: ["Saturday"],
      },
    ],
    pricing: {
      newAppointmentFee: 750,
      followUpThreeMonths: 300,
      followUpSixMonths: 500,
      note: "After consultation Dispensing Medicine, Counter products & Service will cost extra charges according to patients disease diagnosis.",
    },
  },
  {
    id: 2,
    serviceName: "स्वयोगचिचित्सालय Yoga OPD Clinic",
    categoryEnglish: "Yoga",
    practitionerType: "Community Yoga Healers",
    slotDuration: "45 Min",
    icon: SelfImprovementIcon,
    color: "teal",
    practitioners: [
      {
        name: "Dr. Manisha Suryawanshi",
        degree: "MBBS Dyed Yoga Healer",
        availability: ["By Appointment Only"],
      },
    ],
    pricing: {
      newAppointmentFee: 750,
      followUpThreeMonths: 300,
      followUpSixMonths: 500,
      note: "After consultation Dispensing Medicine, Counter products & Service will cost extra charges according to patients disease diagnosis.",
    },
  },
  {
    id: 3,
    serviceName: "स्वसमचिचित्सालय",
    categoryEnglish: "Homoeopathy",
    practitionerType: "Community Homoeopath Healers",
    slotDuration: "45 Min",
    icon: HealingIcon,
    color: "lime",
    practitioners: [
      {
        name: "Dr. Vaishali Holmukhe",
        degree: "MD Homoeopathi",
        availability: ["By Appointment Only"],
      },
    ],
    pricing: {
      newAppointmentFee: 750,
      followUpThreeMonths: 300,
      followUpSixMonths: 500,
      note: "After consultation Dispensing Medicine, Counter products & Service will cost extra charges according to patients disease diagnosis.",
    },
  },
];

const OPDClinic = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openAppointmentBookModal, setOpenAppointmentBookModal] =
    useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const activeService = healthcareServices[activeTab];
  const IconComponent = activeService.icon;
  const getGradientClass = (color) => {
    const gradients = {
      emerald: "from-emerald-600 to-green-500",
      teal: "from-amber-700 to-amber-900",
      lime: "from-lime-600 to-green-400",
    };
    return gradients[color];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30 p-3">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(-5px); }
          50% { transform: translateY(5px); }
        }
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.4); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes cardEnter {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .float-animation { animation: float 3s ease-in-out infinite; }
        .pulse-animation { animation: pulse-scale 2s ease-in-out infinite; }
        .shimmer { animation: shimmer 0.6s ease-in-out; }
        .spin-slow { animation: spin 20s linear infinite; }
        .slide-in { animation: slideIn 0.6s ease-out forwards; }
        .card-enter { animation: cardEnter 0.3s ease-out; }
      `}</style>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 slide-in">
          <div className="relative inline-block">
       
            <h1 className="text-2xl sm:text-3xl py-2 font-black bg-gradient-to-r from-green-700 via-emerald-600 to-green-600 bg-clip-text text-transparent drop-shadow-sm">
              स्वचिचित्सालय OPD Clinic
            </h1>
          </div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="text-sm">💚</span>
            <p className="text-xs text-green-800 font-semibold">
              Traditional Wellness & Holistic Healthcare
            </p>
            <span className="text-sm">✨</span>
          </div>
        </div>

        {/* Premium Tab Navigation */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-white/80 backdrop-blur-xl p-1.5 rounded-xl shadow-2xl border border-green-100/50">
            {healthcareServices.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(index)}
                className={`relative px-4 py-2 rounded-lg font-bold text-xs transition-all duration-300 ${
                  activeTab === index
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-900 hover:scale-105"
                }`}
              >
                {activeTab === index && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${getGradientClass(
                      service.color
                    )} rounded-lg shadow-lg transition-all duration-300`}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="text-base">
                    <service.icon fontSize="small" />
                  </span>

                  <span className="hidden sm:inline">
                    {service.categoryEnglish}
                  </span>

                  <span className="sm:hidden">
                    {service.serviceName.substring(2, 8)}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-4xl mx-auto card-enter" key={activeTab}>
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-green-100/50 hover:shadow-[0_25px_50px_-12px_rgba(34,197,94,0.25)] transition-shadow duration-300">
            <div
              className={`relative bg-gradient-to-r ${getGradientClass(
                activeService.color
              )} overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                ></div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 spin-slow" />
              <div className="relative px-4 py-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/95 rounded-xl flex items-center justify-center shadow-xl hover:rotate-[360deg] transition-transform duration-600">
                      <span className="text-2xl text-green-600">
                        {IconComponent && <IconComponent />}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-white drop-shadow-md">
                        {activeService.serviceName}
                      </h2>
                      <p className="text-xs font-bold text-white/90 mt-0.5">
                        {activeService.categoryEnglish}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/95 px-3 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200">
                    <span className="text-base text-green-600">
                      <Alarm />
                    </span>
                    <div>
                      <p className="text-xs text-green-600 font-bold leading-none">
                        Slot Duration
                      </p>
                      <p className="text-xs font-black text-green-900 mt-0.5">
                        {activeService.slotDuration}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-4">
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-0.5 h-5 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                  <h3 className="text-sm font-black text-green-900">
                    {activeService.practitionerType}
                  </h3>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-animation" />
                </div>

                <div
                  className={`grid ${
                    activeService.practitioners.length > 1
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1"
                  } gap-3`}
                >
                  {activeService.practitioners.map((practitioner, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-green-50 to-emerald-50/50 p-3 rounded-xl border-2 border-green-200/50 hover:border-green-400 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex items-start gap-2">
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${getGradientClass(
                            activeService.color
                          )} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}
                        >
                          <span className="text-lg text-white">
                            <Person />
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-black text-green-900">
                            {practitioner.name}
                          </p>
                          <p className="text-xs text-green-700 font-semibold mt-0.5">
                            {practitioner.degree}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {practitioner.availability.map((day, dayIdx) => (
                              <span
                                key={dayIdx}
                                className="inline-block bg-white border-2 border-green-300 text-green-700 text-xs font-bold px-2 py-0.5 rounded-md shadow-sm"
                              >
                                {day}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50/50 p-3 rounded-xl border-2 border-amber-200/50">
                <div className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0 text-ayuBrown">
                    <Info />
                  </span>
                  <div>
                    <h4 className="text-xs font-black text-amber-900 mb-0.5">
                      Important Information
                    </h4>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      {activeService.pricing.note}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedService(activeService);
                  setOpenAppointmentBookModal(true);
                }}
                className={`group w-full bg-gradient-to-r ${getGradientClass(
                  activeService.color
                )} text-white font-black py-3 px-4 rounded-xl shadow-xl overflow-hidden relative mt-4 text-sm hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(34,197,94,0.4)] active:scale-[0.98] transition-all duration-200`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:shimmer" />
                <span className="relative flex items-center justify-center gap-1.5">
                  <span className="text-base">
                    <CalendarIcon />
                  </span>
                  Book Appointment Now
                  <span className="text-base">
                    <TrendingFlatIcon />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {openAppointmentBookModal && (
        <OPDBookingModal
          open={openAppointmentBookModal}
          handleClose={() => {
            setOpenAppointmentBookModal(false);
            setSelectedService(null);
          }}
          selectedService={selectedService}
        />
      )}
    </div>
  );
};

export default OPDClinic;
