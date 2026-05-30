import { useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { eventsData2026 } from "../pages/eventsCalander/EventCalander";
import OPDBookingModal from "../pages/opdBooking/OPDBookingModal";
import { getNextTwoEvents } from "./HomePageConstants";

// Sections
import VisitorsFormModal from "../pages/communityActivities/vision/VisitorsFormModal";
import CommunityHealers from "./sections/CommunityHealers";
import FounderSection from "./sections/FounderSection";
import HeroSection from "./sections/HeroSection";
import PillarsSection from "./sections/PillarsSection";
import ServicesSection from "./sections/ServicesSection";
import TopStoriesModals from "./sections/TopStoriesModals";
import TopStoriesSection from "./sections/TopStoriesSection";
import UpcomingEventsSection from "./sections/UpcomingEventsSection";

export default function AyurvedaLanding({ userData }) {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [openEventRegisterModal, setOpenRegisterModal] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState(null);
  const [openAppointementModal, setOpenAppointmentModal] = useState(false);

  const foundersRef = useRef(null);
  const healersRef = useRef(null);

  const isFoundersInView = useInView(foundersRef, {
    once: true,
    margin: "-100px",
  });

  const isHealersInView = useInView(healersRef, {
    once: true,
    margin: "-100px",
  });

  const upcommingEvent = useMemo(() => getNextTwoEvents(eventsData2026), []);

  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-br from-lime-50 via-green-50 to-amber-50">
      <Helmet>
        <title>स्वग्राम SwaGrama | Ayurveda • Yoga • Nisarga • Agro • Tourism</title>
        <meta name="description" content="SwaGrama is a self-sufficient village connected to cultural roots, embracing the traditional Indian science of health - Ayurveda and Yoga." />
      </Helmet>

      <HeroSection
        userData={userData}
        setOpenAppointmentModal={setOpenAppointmentModal}
      />

      <ServicesSection />

      <TopStoriesSection setModal1={setModal1} setModal2={setModal2} />

      <UpcomingEventsSection
        eventsDataUpdated={upcommingEvent}
        setOpenRegisterModal={setOpenRegisterModal}
        setSelectedEvents={setSelectedEvents}
      />

      <FounderSection
        foundersRef={foundersRef}
        isFoundersInView={isFoundersInView}
      />

      <PillarsSection
        healersRef={healersRef}
        isHealersInView={isHealersInView}
      />

      <CommunityHealers />

      <TopStoriesModals
        modal1={modal1}
        setModal1={setModal1}
        modal2={modal2}
        setModal2={setModal2}
      />

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
    </div>
  );
}
