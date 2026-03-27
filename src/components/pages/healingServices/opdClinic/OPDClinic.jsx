import Alarm from "@mui/icons-material/Alarm";
import Info from "@mui/icons-material/Info";
import Person from "@mui/icons-material/Person";
import CompostIcon from "@mui/icons-material/Compost";
import HealingIcon from "@mui/icons-material/Healing";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import {
  getDepartmentList,
  getDoctorListByLocationDepartment,
} from "../../../../services/healingServices/opdClinic/OPDClinicServices";
import OPDBookingModal from "../../opdBooking/OPDBookingModal";

const iconMap = {
  ayurveda: CompostIcon,
  yoga: SelfImprovementIcon,
  homeopathy: HealingIcon,
};

const colorMap = {
  ayurveda: "from-emerald-600 to-green-500",
  yoga: "from-amber-700 to-amber-900",
  homeopathy: "from-lime-600 to-green-400",
};

const getDeptIcon = (name) => {
  const key = name?.toLowerCase();
  return iconMap[key] ?? CompostIcon;
};

const getDeptGradient = (name) => {
  const key = name?.toLowerCase();
  return colorMap[key] ?? "from-green-600 to-emerald-500";
};

const getSlotDuration = (name) =>
  name?.toLowerCase() === "ayurveda" ? "30 Min" : "45 Min";

const OPDClinic = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState(0);
  const [departmentList, setDepartmentList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [openBookModal, setOpenBookModal] = useState(false);
  const [selectdOPDTherapy, setSelectedOPDTherapy] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const activeDept = departmentList[activeTab] ?? null;
  const ActiveIcon = activeDept ? getDeptIcon(activeDept) : null;
  const activeGradient = activeDept ? getDeptGradient(activeDept) : "";

  useEffect(() => {
    if (!user) {
      setDepartmentList([]);
      setDoctorList([]);
      return;
    }
    setLoadingDepts(true);
    getDepartmentList(5)
      .then((res) => setDepartmentList(res.data.data ?? []))
      .catch(() => setDepartmentList([]))
      .finally(() => setLoadingDepts(false));
  }, [user]);

  useEffect(() => {
    if (!user || !activeDept) {
      setDoctorList([]);
      return;
    }
    setLoadingDoctors(true);
    setSelectedDoctorId(null);
    getDoctorListByLocationDepartment(5, activeDept)
      .then((res) => setDoctorList(res.data.data ?? []))
      .catch(() => setDoctorList([]))
      .finally(() => setLoadingDoctors(false));
  }, [user, activeTab, departmentList, activeDept]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center \ p-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <Person sx={{ fontSize: 40, color: "#10b981" }} />
          </div>
          <h2 className="text-xl font-bold text-green-800 mb-2">
            Login Required
          </h2>
          <p className="text-sm text-gray-500">
            Please log in to view OPD Clinic services and book an appointment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-3">
      <style>{`
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.4); }
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardEnter {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .pulse-animation { animation: pulse-scale 2s ease-in-out infinite; }
        .spin-slow       { animation: spin 20s linear infinite; }
        .slide-in        { animation: slideIn 0.6s ease-out forwards; }
        .card-enter      { animation: cardEnter 0.3s ease-out; }
        .shimmer         { animation: shimmer 0.6s ease-in-out; }
      `}</style>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-4 slide-in">
          <h1 className="text-xl md:text-2xl py-2 font-black bg-gradient-to-r from-green-700 via-emerald-600 to-green-600 bg-clip-text text-transparent drop-shadow-sm">
            स्वचिचित्सालय OPD Clinic
          </h1>
        
        </div>

        {loadingDepts ? (
          <div className="flex justify-center mb-4">
            <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
          </div>
        ) : departmentList.length === 0 ? (
          <p className="text-center text-sm text-gray-400 mb-4">
            No departments available.
          </p>
        ) : (
          <div className="flex justify-center mb-4">
            <div className="inline-flex bg-white/80 backdrop-blur-xl p-1.5 rounded-xl shadow-2xl border border-green-200">
              {departmentList.map((dept, index) => {
                const Icon = getDeptIcon(dept);
                const gradient = getDeptGradient(dept);
                return (
                  <button
                    key={dept}
                    onClick={() => setActiveTab(index)}
                    className={`relative px-4 py-2 rounded-lg font-bold text-xs transition-all duration-300 ${
                      activeTab === index
                        ? "text-white"
                        : "text-gray-600 hover:text-gray-900 hover:scale-105"
                    }`}
                  >
                    {activeTab === index && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-lg shadow-lg`}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <span className="text-base">
                        <Icon fontSize="small" />
                      </span>
                      <span className="hidden sm:inline">{dept}</span>
                      <span className="sm:hidden">{dept.substring(0, 6)}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeDept && (
          <div className="max-w-4xl mx-auto card-enter" key={activeTab}>
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-green-100/50 hover:shadow-[0_25px_50px_-12px_rgba(34,197,94,0.25)] transition-shadow duration-300">
              <div
                className={`relative bg-gradient-to-r ${activeGradient} overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, white 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 spin-slow" />
                <div className="relative px-4 py-3">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/95 rounded-xl flex items-center justify-center shadow-xl">
                        <span className="text-2xl text-green-600">
                          {ActiveIcon && <ActiveIcon />}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-white drop-shadow-md capitalize">
                          {activeDept} OPD Clinic
                        </h2>
                        {doctorList[0]?.clinicName && (
                          <p className="text-xs font-bold text-white/90 mt-0.5">
                            {doctorList[0].clinicName}
                          </p>
                        )}
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
                          {getSlotDuration(activeDept)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-4">
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-0.5 h-5 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
                    <h3 className="text-sm font-black text-green-900 capitalize">
                      {activeDept} Doctor
                    </h3>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-animation" />
                  </div>

                  {loadingDoctors ? (
                    <div className="flex justify-center py-8">
                      <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
                    </div>
                  ) : doctorList.length === 0 ? (
                    <div className="flex flex-col items-center py-8 text-center">
                      <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-3">
                        <Person sx={{ fontSize: 32, color: "#6ee7b7" }} />
                      </div>
                      <p className="text-sm font-semibold text-gray-500">
                        No Doctors available for this department.
                      </p>
                    </div>
                  ) : (
                    <div
                      className={`grid ${doctorList.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-3`}
                    >
                      {doctorList.map((doctor, idx) => (
                        <div
                          key={doctor.userId ?? idx}
                          onClick={() => setSelectedDoctorId(doctor.userId)}
                          style={{ animationDelay: `${idx * 100}ms` }}
                          className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-200 ${
                            selectedDoctorId === doctor.userId
                              ? `bg-gradient-to-br from-green-100 to-emerald-200 border-green-500 shadow-md scale-[1.02] ring-2 ring-green-400 ring-offset-1`
                              : `bg-gradient-to-br from-green-50 to-emerald-50/50 border-green-200/50 hover:border-green-400 hover:scale-[1.02] hover:-translate-y-0.5`
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <div
                              className={`w-10 h-10 bg-gradient-to-br ${activeGradient} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}
                            >
                              <span className="text-lg text-white">
                                <Person />
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-black text-green-900">
                                {[
                                  doctor.firstName?.trim(),
                                  doctor.lName?.trim(),
                                ]
                                  .filter(Boolean)
                                  .join(" ")}
                                {doctor.degree?.trim()
                                  ? ` (${doctor.degree.trim()})`
                                  : ""}
                              </p>
                              {doctor.cityName && (
                                <p className="text-xs text-green-600 font-semibold mt-0.5">
                                  <LocationPinIcon /> {doctor.cityName}
                                </p>
                              )}
                              {doctor.address && (
                                <p className="text-xs text-gray-500 mt-0.5 truncate">
                                  {doctor.address}
                                </p>
                              )}
                              {doctor.weekDays?.[0] && (
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {doctor.weekDays[0]
                                    .split(",")
                                    .map((day, dayIdx) =>
                                      day.trim() ? (
                                        <span
                                          key={dayIdx}
                                          className="inline-block bg-white border-2 border-green-300 text-green-700 text-xs font-bold px-2 py-0.5 rounded-md shadow-sm"
                                        >
                                          {day.trim()}
                                        </span>
                                      ) : null,
                                    )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50/50 p-3 rounded-xl border-2 border-amber-200/50">
                  <div className="flex items-start gap-2">
                    <span className="text-base flex-shrink-0 text-amber-700">
                      <Info />
                    </span>
                    <div>
                      <h4 className="text-xs font-black text-amber-900 mb-0.5">
                        Important Information
                      </h4>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        After consultation, dispensing medicine, counter
                        products &amp; service will cost extra charges according
                        to patient's disease diagnosis.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const selectedDoctor = doctorList.find(
                      (d) => d.userId === selectedDoctorId,
                    );
                    setSelectedOPDTherapy({
                      clinicId: selectedDoctor?.clinicId ?? 5,
                      weekDays: selectedDoctor?.weekDays,
                      clinicName:
                        selectedDoctor?.clinicName ?? "Swagram Community",
                      departmentName: activeDept,
                      slotDuration: getSlotDuration(activeDept),
                      gradient: activeGradient,
                      doctorId: selectedDoctor?.userId,
                    });
                    setOpenBookModal(true);
                  }}
                  disabled={!selectedDoctorId}
                  className={`group w-full text-white font-black py-3 px-4 rounded-xl shadow-xl overflow-hidden relative mt-4 text-sm transition-all duration-200 ${
                    selectedDoctorId
                      ? `bg-gradient-to-r ${activeGradient} hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(34,197,94,0.4)] active:scale-[0.98]`
                      : "bg-gray-400 cursor-not-allowed opacity-70"
                  }`}
                >
                  {selectedDoctorId && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:shimmer" />
                  )}
                  <span className="relative flex items-center justify-center gap-1.5">
                    {selectedDoctorId
                      ? "Book Appointment Now"
                      : "Please Select a Doctor"}
                    {selectedDoctorId && <TrendingFlatIcon />}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {openBookModal && (
        <OPDBookingModal
          open={openBookModal}
          handleClose={() => {
            setOpenBookModal(false);
            setSelectedOPDTherapy(null);
          }}
          selectedTherapy={selectdOPDTherapy}
        />
      )}
    </div>
  );
};

export default OPDClinic;
