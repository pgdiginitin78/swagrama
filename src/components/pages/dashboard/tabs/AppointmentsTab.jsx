import React, { useState, useEffect } from "react";
import { GetUpcomingOPD } from "../../../../services/userDashboardServices/UserDashboardServices";
import GenericSection from "../components/GenericSection";
import ActivityDetailsDrawer from "../components/ActivityDetailsDrawer";
import { CalendarMonth as CalendarIcon } from "@mui/icons-material";

const AppointmentsTab = ({ user }) => {
  const [upcomingOPD, setUpcomingOPD] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    if (!user?.userId) return;
    try {
      const opdRes = await GetUpcomingOPD(user.userId);
      if (opdRes?.data) {
        setUpcomingOPD(opdRes.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [user?.userId]);

  return (
    <>
      <GenericSection
        title="Consultations"
        icon={<CalendarIcon sx={{ fontSize: 20 }} />}
        data={upcomingOPD}
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

export default AppointmentsTab;
