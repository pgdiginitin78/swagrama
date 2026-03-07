import Skeleton from "@mui/material/Skeleton";
import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import AboutUs from "./components/pages/aboutUs/AboutUs";
import { API } from "./http-common";
import ScrollToTopButton from "./ScrollToTopButton";
import TermsAndConditon from "./components/pages/terms&conditon/TermsAndConditon";

const HomePage = lazy(() => import("./components/homePage/HomePage"));
const ServicesTabs = lazy(
  () => import("./components/pages/healingServices/ServicesTabs"),
);
const CommunityMembership = lazy(
  () =>
    import("./components/pages/membership/communityMembership/CommunityMembership"),
);
const CommunityActivitiesTabs = lazy(
  () =>
    import("./components/pages/communityActivities/CommunityActivitiesTabs"),
);
const CommuneTabs = lazy(() => import("./components/pages/commune/Commune"));
const EShop = lazy(() => import("./components/pages/eShop/EShop"));
const EventCalander = lazy(
  () => import("./components/pages/eventsCalander/EventCalander"),
);

function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Skeleton variant="rectangular" height={260} sx={{ borderRadius: 2 }} />
      <Skeleton height={48} sx={{ mt: 2 }} />
      <Skeleton height={32} width="60%" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    let interval;

    const refreshTokenApi = async () => {
      try {
        const accessToken = localStorage.getItem("refreshToken");
        const expiresIn = localStorage.getItem("expiresIn");

        if (!accessToken) {
          console.log("No refresh token found");
          return;
        }

        console.log("Calling refresh token API...", accessToken);
        const res = await API.post("refresh-token", {
          refreshToken: accessToken,
        });

        const apiData = res.data;
        localStorage.setItem("accessToken", apiData.accessToken);
        localStorage.setItem("refreshToken", apiData.refreshToken);
        localStorage.setItem("expiresIn", apiData.expiresIn);
        localStorage.setItem("tokenSetTime", Date.now());

        console.log("Token refreshed successfully");

        if (interval) {
          clearInterval(interval);
        }

        const expiresInMs = (parseInt(apiData.expiresIn) - expiresIn) * 1000;
        interval = setInterval(refreshTokenApi, expiresInMs);
      } catch (err) {
        console.error("Token refresh failed:", err);

        if (err.response?.status === 401 || err.response?.status === 403) {
          // localStorage.clear();
          // window.location.href = "/";
        }
      }
    };

    const accessToken = localStorage.getItem("accessToken");
    const expiresIn = localStorage.getItem("expiresIn");
    const tokenSetTime = localStorage.getItem("tokenSetTime");

    if (accessToken) {
      if (tokenSetTime && expiresIn) {
        const currentTime = Date.now();
        const timeElapsed = (currentTime - parseInt(tokenSetTime)) / 1000;

        if (timeElapsed >= parseInt(expiresIn)) {
          console.log("Token expired, calling refresh API");
          refreshTokenApi();
        }
      } else {
        refreshTokenApi();
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);
  
  return (
    <>
      <Navbar userData={userData} setUserData={setUserData} />
      <div className="md:pt-20 bg-gradient-to-br from-[#FFF8D6]/60 via-[#F1FFF5]/70 to-[#D8EEFF]/60 outline-none">
        <Suspense fallback={<PageSkeleton />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage userData={userData} />} />
            <Route path="/healing" element={<ServicesTabs userData={userData}/>} />
            <Route path="/membership" element={<CommunityMembership userData={userData} />} />
            <Route
              path="/community-activities"
              element={<CommunityActivitiesTabs userData={userData} />}
            />
            <Route path="/commune" element={<CommuneTabs userData={userData} />} />
            <Route path="/eShop" element={<EShop userData={userData} />} />
            <Route path="/calendar" element={<EventCalander userData={userData}/>} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/termsAndConditions" element={<TermsAndConditon />} />

       
          </Routes>
        </Suspense>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <ScrollToTopButton />
      </div>

      <Footer />
    </>
  );
}
