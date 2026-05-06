import { useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { eventsData2026 } from "../pages/eventsCalander/EventCalander";
import BookEventForm from "../pages/bookEventForm/BookEventForm";
import OPDBookingModal from "../pages/opdBooking/OPDBookingModal";
import { getNextTwoEvents } from "./HomePageConstants";

// Sections
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import TopStoriesSection from "./sections/TopStoriesSection";
import UpcomingEventsSection from "./sections/UpcomingEventsSection";
import FounderSection from "./sections/FounderSection";
import PillarsSection from "./sections/PillarsSection";
import CommunityHealers from "./sections/CommunityHealers";
import TopStoriesModals from "./sections/TopStoriesModals";
import VisitorsFormModal from "../pages/communityActivities/vision/VisitorsFormModal";

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
