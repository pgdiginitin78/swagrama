import CompostIcon from "@mui/icons-material/Compost";
import HealingIcon from "@mui/icons-material/Healing";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import { useEffect, useState } from "react";
import AyurvedaIcon from "../../../../assets/AyurvedaIcon.svg";
import {
  getDepartmentList,
  getDoctorListByLocationDepartment,
} from "../../../../services/healingServices/opdClinic/OPDClinicServices";
import AyurvedaForm from "../../opdBooking/AyurvedaFrom";

const iconMap = {

  yoga: SelfImprovementIcon,
  homeopathy: HealingIcon,
};

const colorMap = {
  ayurveda: "from-emerald-600 to-green-500",
  yoga: "from-amber-700 to-amber-900",
  homeopathy: "from-lime-600 to-green-400",
};

const getDeptIcon = (name) => {
  const key = typeof name === "string" ? name.toLowerCase() : "";
  return iconMap[key] ?? CompostIcon;
};

const getDeptGradient = (name) => {
  const key = typeof name === "string" ? name.toLowerCase() : "";
  return colorMap[key] ?? "from-green-600 to-emerald-500";
};

const OPDClinic = () => {


  const [activeTab, setActiveTab] = useState(0);
  const [departmentList, setDepartmentList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const activeDept = departmentList[activeTab] ?? null;
  const activeGradient = activeDept ? getDeptGradient(activeDept) : "";

  useEffect(() => {
    setLoadingDepts(true);
    getDepartmentList(5)
      .then((res) => {
        const data = res.data.data || res.data || [];
        const normalized = data.map((item) =>
          typeof item === "string" ? item : item.item || item.name || ""
        ).filter(Boolean);
        setDepartmentList(normalized);
      })
      .catch(() => setDepartmentList([]))
      .finally(() => setLoadingDepts(false));
  }, []);

  useEffect(() => {
    if (!activeDept) {
      setDoctorList([]);
      return;
    }
    setLoadingDoctors(true);
    setSelectedDoctorId(null);
    getDoctorListByLocationDepartment(5, activeDept)
      .then((res) => setDoctorList(res.data.data ?? []))
      .catch(() => setDoctorList([]))
      .finally(() => setLoadingDoctors(false));
  }, [activeTab, departmentList, activeDept]);

  console.log("activeDept", activeDept);

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

      <div className="relative w-full mx-auto px-2 ">
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
                        {dept === "Ayurveda" ? (
                          <img src={AyurvedaIcon} alt="Ayurveda" className="h-5 w-5" />
                        ) : (
                          <Icon fontSize="small" />
                        )}
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

        {/* {activeDept === "Ayurveda" && ( */}
        <AyurvedaForm
          doctorList={doctorList}
          loadingDoctors={loadingDoctors}
          selectedDoctorId={selectedDoctorId}
          setSelectedDoctorId={setSelectedDoctorId}
          activeGradient={activeGradient}
          activeDept={activeDept}
        />
        {/* // )} */}
      </div>
    </div>
  );
};

export default OPDClinic;
