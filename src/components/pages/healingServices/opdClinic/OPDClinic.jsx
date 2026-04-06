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
import AyurvedaForm from "../../opdBooking/AyurvedaFrom";

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
    setLoadingDepts(true);
    getDepartmentList(5)
      .then((res) => setDepartmentList(res.data.data ?? []))
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

  console.log("selectdOPDTherapy",selectdOPDTherapy);
  

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
