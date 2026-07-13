import React, { useState, useEffect } from "react";
import { GetAllUpcomingTherapies } from "../../../../services/userDashboardServices/UserDashboardServices";
import GenericSection from "../components/GenericSection";
import ActivityDetailsDrawer from "../components/ActivityDetailsDrawer";
import TherapyIcon from "../../../../assets/TherapyIcon.svg";

const TherapiesTab = ({ user }) => {
  const [upcomingTherapies, setUpcomingTherapies] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    if (!user?.userId) return;
    try {
      const therapiesRes = await GetAllUpcomingTherapies(user.userId);
      if (therapiesRes?.data) {
        setUpcomingTherapies(therapiesRes.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user?.userId]);

  return (
    <>
      <GenericSection
        title="Therapies"
        icon={<img src={TherapyIcon} alt="Therapies" className="h-5 w-5" />}
        data={upcomingTherapies}
        setSelectedItem={setSelectedItem}
      />
      <ActivityDetailsDrawer
        item={selectedItem}
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onRescheduleSuccess={fetchData}
      />
    </>
  );
};

export default TherapiesTab;
