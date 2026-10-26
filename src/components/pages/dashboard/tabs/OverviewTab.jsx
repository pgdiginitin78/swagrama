import React, { useState, useEffect } from "react";
import {
  GetUserDashboardCounts,
  GetUpcomingActivities,
  GetPreviousActivities,
  GetTodayActivities,
} from "../../../../services/userDashboardServices/UserDashboardServices";
import OverviewSection from "../components/OverviewSection";
import ActivityDetailsDrawer from "../components/ActivityDetailsDrawer";

const OverviewTab = ({ user, setActiveTab }) => {
  const [userDashboardCount, setUserDashboardCount] = useState(null);
  const [activities, setActivities] = useState([]);
  const [filterType, setFilterType] = useState("upcoming");
  const [loading, setLoading] = useState(true);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchCounts = async () => {
    if (!user?.userId) return;
    try {
      const countsRes = await GetUserDashboardCounts(user.userId);
      if (countsRes.data.statusCode === 200) {
        setUserDashboardCount(countsRes.data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard counts:", error);
    }
  };

  const fetchActivities = async (filter = filterType) => {
    if (!user?.userId) return;
    setActivitiesLoading(true);
    try {
      let activitiesRes;
      if (filter === "today") {
        activitiesRes = await GetTodayActivities(user.userId);
      } else if (filter === "previous") {
        activitiesRes = await GetPreviousActivities(user.userId);
      } else {
        activitiesRes = await GetUpcomingActivities(user.userId);
      }
      if (activitiesRes?.data) {
        setActivities(activitiesRes.data.data || []);
      } else {
        setActivities([]);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
      setActivities([]);
    } finally {
      setActivitiesLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      setLoading(true);
      Promise.all([fetchCounts(), fetchActivities(filterType)]).finally(() => {
        setLoading(false);
      });
    }
  }, [user?.userId]);

  const handleFilterChange = (newFilter) => {
    setFilterType(newFilter);
    fetchActivities(newFilter);
  };

  return (
    <>
      <OverviewSection
        user={user}
        userDashboardCount={userDashboardCount}
        upcomingActivities={activities}
        filterType={filterType}
        onFilterChange={handleFilterChange}
        loadingActivities={activitiesLoading}
        setActiveTab={setActiveTab}
        setSelectedItem={setSelectedItem}
      />
      <ActivityDetailsDrawer
        item={selectedItem}
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onRescheduleSuccess={() => fetchActivities(filterType)}
      />
    </>
  );
};

export default OverviewTab;
