import React, { useState, useEffect } from "react";
import {
  GetAllUpcomingTherapies,
  GetAllPreviousTherapies,
  GetAllTodayTherapies,
} from "../../../../services/userDashboardServices/UserDashboardServices";
import GenericSection from "../components/GenericSection";
import ActivityDetailsDrawer from "../components/ActivityDetailsDrawer";
import TherapyIcon from "../../../../assets/TherapyIcon.svg";

const TherapiesTab = ({ user }) => {
  const [filterType, setFilterType] = useState("upcoming");
  const [therapies, setTherapies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async (filter = filterType) => {
    if (!user?.userId) return;
    setLoading(true);
    try {
      let therapiesRes;
      if (filter === "today") {
        therapiesRes = await GetAllTodayTherapies(user.userId);
      } else if (filter === "previous") {
        therapiesRes = await GetAllPreviousTherapies(user.userId);
      } else {
        therapiesRes = await GetAllUpcomingTherapies(user.userId);
      }
      if (therapiesRes?.data) {
        setTherapies(therapiesRes.data.data || []);
      } else {
        setTherapies([]);
      }
    } catch (error) {
      console.error("Error fetching therapies:", error);
      setTherapies([]);
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
        title="Therapies"
        icon={<img src={TherapyIcon} alt="Therapies" className="h-5 w-5" />}
        data={therapies}
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

export default TherapiesTab;
