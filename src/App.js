import Skeleton from "@mui/material/Skeleton";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import AboutUs from "./components/pages/aboutUs/AboutUs";
import SharedHosting from "./components/pages/newDomain/RegisterdHosting";
import ScrollToTopButton from "./ScrollToTopButton";
import ViewInvoices from "./components/pages/newDomain/myInvoices/ViewInvoices";

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
  return (
    <>
      <Navbar />
      <div className="md:pt-20 bg-gradient-to-br from-[#FFF8D6]/60 via-[#F1FFF5]/70 to-[#D8EEFF]/60 outline-none">
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/healing" element={<ServicesTabs />} />
            <Route path="/membership" element={<CommunityMembership />} />
            <Route
              path="/community-activities"
              element={<CommunityActivitiesTabs />}
            />
            <Route path="/commune" element={<CommuneTabs />} />
            <Route path="/eShop" element={<EShop />} />
            <Route path="/calendar" element={<EventCalander />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            {/* <Route path="/newDomain" element={<NewDomain />} /> */}
            <Route path="/newDomain" element={<ViewInvoices />} />

            

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
