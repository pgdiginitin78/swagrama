import { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { getNextTwoEvents } from "./HomePageConstants";

// Above-the-fold sections
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";

// Below-the-fold sections (code-split for fast initial paint)
const TopStoriesSection = lazy(() => import("./sections/TopStoriesSection"));
const UpcomingEventsSection = lazy(
  () => import("./sections/UpcomingEventsSection"),
);
const FounderSection = lazy(() => import("./sections/FounderSection"));
const PillarsSection = lazy(() => import("./sections/PillarsSection"));
const CommunityHealers = lazy(() => import("./sections/CommunityHealers"));

// Lazy-loaded modals (never in the critical render path)
const TopStoriesModals = lazy(() => import("./sections/TopStoriesModals"));
const VisitorsFormModal = lazy(
  () => import("../pages/communityActivities/vision/VisitorsFormModal"),
);
const OPDBookingModal = lazy(() => import("../pages/opdBooking/OPDBookingModal"));

export default function AyurvedaLanding({ userData }) {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [openEventRegisterModal, setOpenRegisterModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState(null);
  const [openAppointementModal, setOpenAppointmentModal] = useState(false);
  const [upcommingEvent, setUpcomingEvent] = useState([]);

  useEffect(() => {
    let isMounted = true;
    import("../pages/eventsCalander/eventsData2026")
      .then((m) => {
        if (isMounted && m.eventsData2026) {
          setUpcomingEvent(getNextTwoEvents(m.eventsData2026));
        }
      })
      .catch((err) => console.error("Error loading events", err));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-br from-lime-50 via-green-50 to-amber-50">
      <Helmet>
        <title>स्वग्राम SwaGrama | Ayurveda • Yoga • Nisarga • Agro • Tourism</title>
        <meta
          name="description"
          content="SwaGrama is a self-sufficient village connected to cultural roots, embracing the traditional Indian science of health - Ayurveda and Yoga."
        />
      </Helmet>

      <HeroSection
        userData={userData}
        setOpenAppointmentModal={setOpenAppointmentModal}
      />

      <ServicesSection />

      <Suspense fallback={null}>
        <TopStoriesSection setModal1={setModal1} setModal2={setModal2} />

        <UpcomingEventsSection
          eventsDataUpdated={upcommingEvent}
          setOpenRegisterModal={setOpenRegisterModal}
          setSelectedEvents={setSelectedEvents}
        />

        <FounderSection />

        <PillarsSection />

        <CommunityHealers />
      </Suspense>

      <Suspense fallback={null}>
        {(modal1 || modal2) && (
          <TopStoriesModals
            modal1={modal1}
            setModal1={setModal1}
            modal2={modal2}
            setModal2={setModal2}
          />
        )}

        {openEventRegisterModal && (
          <VisitorsFormModal
            open={openEventRegisterModal}
            handleClose={() => {
              setOpenRegisterModal(false);
              setSelectedEvents(null);
            }}
            serviceDetails={selectedEvents}
            origin={"AnnualEvents"}
          />
        )}

        {openAppointementModal && (
          <OPDBookingModal
            open={openAppointementModal}
            handleClose={() => setOpenAppointmentModal(false)}
          />
        )}
      </Suspense>
    </div>
  );
}
