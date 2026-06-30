import React, { useState, useEffect } from "react";
import {
  GetUserDashboardCounts,
  GetUpcomingActivities,
} from "../../../../services/userDashboardServices/UserDashboardServices";
import OverviewSection from "../components/OverviewSection";
import ActivityDetailsDrawer from "../components/ActivityDetailsDrawer";

const OverviewTab = ({ user, setActiveTab }) => {
  const [userDashboardCount, setUserDashboardCount] = useState(null);
  const [upcomingActivities, setUpcomingActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    if (!user?.userId) return;
    try {
      const [countsRes, activitiesRes] = await Promise.all([
        GetUserDashboardCounts(user.userId),
        GetUpcomingActivities(user.userId),
      ]);
      if (countsRes.data.statusCode === 200) {
        setUserDashboardCount(countsRes.data.data);
      }
      if (activitiesRes?.data) {
        setUpcomingActivities(activitiesRes.data.data);
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
      <OverviewSection
        user={user}
        userDashboardCount={userDashboardCount}
        upcomingActivities={upcomingActivities}
        setActiveTab={setActiveTab}
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

export default OverviewTab;
