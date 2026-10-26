import React, { useState, useEffect } from "react";
import {
  GetUpcomingOPD,
  GetPreviousOPD,
  GetTodayOPD,
} from "../../../../services/userDashboardServices/UserDashboardServices";
import GenericSection from "../components/GenericSection";
import ActivityDetailsDrawer from "../components/ActivityDetailsDrawer";
import { CalendarMonth as CalendarIcon } from "@mui/icons-material";

const AppointmentsTab = ({ user }) => {
  const [filterType, setFilterType] = useState("upcoming");
  const [opdList, setOpdList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async (filter = filterType) => {
    if (!user?.userId) return;
    setLoading(true);
    try {
      let opdRes;
      if (filter === "today") {
        opdRes = await GetTodayOPD(user.userId);
      } else if (filter === "previous") {
        opdRes = await GetPreviousOPD(user.userId);
      } else {
        opdRes = await GetUpcomingOPD(user.userId);
      }
      if (opdRes?.data) {
        setOpdList(opdRes.data.data || []);
      } else {
        setOpdList([]);
      }
    } catch (error) {
      console.error("Error fetching OPD appointments:", error);
      setOpdList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      fetchData(filterType);
    }
  }, [user?.userId, filterType]);

  const handleFilterChange = (newFilter) => {
    setFilterType(newFilter);
  };

  return (
    <>
      <GenericSection
        title="Consultations"
        icon={<CalendarIcon sx={{ fontSize: 20 }} />}
        data={opdList}
        setSelectedItem={setSelectedItem}
        filterType={filterType}
        onFilterChange={handleFilterChange}
        loading={loading}
      />
      <ActivityDetailsDrawer
        item={selectedItem}
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onRescheduleSuccess={() => fetchData(filterType)}
      />
    </>
  );
};

export default AppointmentsTab;
