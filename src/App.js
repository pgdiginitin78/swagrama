import Skeleton from "@mui/material/Skeleton";
import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import AboutUs from "./components/pages/aboutUs/AboutUs";
import SwagramaPrivacyPolicy from "./components/pages/privacypolicy/PrivacyPolicyNew";
import TermsAndConditon from "./components/pages/terms&conditon/TermsAndConditon";
import { useAuth } from "./context/AuthContext";
import ScrollToTopButton from "./ScrollToTopButton";

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
  const { user: userData } = useAuth();
  // Token refresh is handled automatically by the AxiosInstance
  // response interceptor on 401 — no manual interval needed here.

  return (
    <>
      <Navbar />
      <div className="md:pt-20 bg-gradient-to-br from-[#FFF8D6]/60 via-[#F1FFF5]/70 to-[#D8EEFF]/60 outline-none">
        <Suspense fallback={<PageSkeleton />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage userData={userData} />} />
            <Route
              path="/healing"
              element={<ServicesTabs userData={userData} />}
            />
            <Route
              path="/membership"
              element={<CommunityMembership userData={userData} />}
            />
            <Route
              path="/community-activities"
              element={<CommunityActivitiesTabs userData={userData} />}
            />
            <Route
              path="/commune"
              element={<CommuneTabs userData={userData} />}
            />
            <Route path="/eShop" element={<EShop userData={userData} />} />
            <Route
              path="/calendar"
              element={<EventCalander userData={userData} />}
            />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/termsAndConditions" element={<TermsAndConditon />} />
            <Route path="/privacyPolicy" element={<SwagramaPrivacyPolicy />} />
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
