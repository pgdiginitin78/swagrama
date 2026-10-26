import { useState, useEffect } from "react";
import {
  GetUserDashboardCounts,
  GetUpcomingActivities,
  GetUpcomingOPD,
  GetAllUpcomingTherapies,
  GetPreviousActivities,
  GetPreviousOPD,
  GetAllPreviousTherapies,
  GetTodayActivities,
  GetTodayOPD,
  GetAllTodayTherapies,
} from "../../../../services/userDashboardServices/UserDashboardServices";

const useUserDashboard = (user) => {
  const [userDashboardCount, setUserDashboardCount] = useState(null);
  const [upcomingActivities, setUpcomingActivities] = useState([]);
  const [upcomingOPD, setUpcomingOPD] = useState([]);
  const [upcomingTherapies, setUpcomingTherapies] = useState([]);
  const [todayActivities, setTodayActivities] = useState([]);
  const [todayOPD, setTodayOPD] = useState([]);
  const [todayTherapies, setTodayTherapies] = useState([]);
  const [previousActivities, setPreviousActivities] = useState([]);
  const [previousOPD, setPreviousOPD] = useState([]);
  const [previousTherapies, setPreviousTherapies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user?.userId) return;
    try {
      const [
        countsRes,
        activitiesRes,
        opdRes,
        therapiesRes,
        todayActivitiesRes,
        todayOpdRes,
        todayTherapiesRes,
        prevActivitiesRes,
        prevOpdRes,
        prevTherapiesRes,
      ] = await Promise.all([
        GetUserDashboardCounts(user.userId),
        GetUpcomingActivities(user.userId),
        GetUpcomingOPD(user.userId),
        GetAllUpcomingTherapies(user.userId),
        GetTodayActivities(user.userId),
        GetTodayOPD(user.userId),
        GetAllTodayTherapies(user.userId),
        GetPreviousActivities(user.userId),
        GetPreviousOPD(user.userId),
        GetAllPreviousTherapies(user.userId),
      ]);
      if (countsRes.data.statusCode === 200) {
        setUserDashboardCount(countsRes.data.data);
      }
      if (activitiesRes?.data) {
        setUpcomingActivities(activitiesRes.data.data || []);
      }
      if (opdRes?.data) {
        setUpcomingOPD(opdRes.data.data || []);
      }
      if (therapiesRes?.data) {
        setUpcomingTherapies(therapiesRes.data.data || []);
      }
      if (todayActivitiesRes?.data) {
        setTodayActivities(todayActivitiesRes.data.data || []);
      }
      if (todayOpdRes?.data) {
        setTodayOPD(todayOpdRes.data.data || []);
      }
      if (todayTherapiesRes?.data) {
        setTodayTherapies(todayTherapiesRes.data.data || []);
      }
      if (prevActivitiesRes?.data) {
        setPreviousActivities(prevActivitiesRes.data.data || []);
      }
      if (prevOpdRes?.data) {
        setPreviousOPD(prevOpdRes.data.data || []);
      }
      if (prevTherapiesRes?.data) {
        setPreviousTherapies(prevTherapiesRes.data.data || []);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [user?.userId]);

  return {
    userDashboardCount,
    upcomingActivities,
    upcomingOPD,
    upcomingTherapies,
    todayActivities,
    todayOPD,
    todayTherapies,
    previousActivities,
    previousOPD,
    previousTherapies,
    loading,
    refresh: fetchData,
  };
};

export default useUserDashboard;
