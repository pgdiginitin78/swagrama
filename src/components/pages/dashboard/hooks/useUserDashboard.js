import { useState, useEffect } from "react";
import {
  GetUserDashboardCounts,
  GetUpcomingActivities,
  GetUpcomingOPD,
  GetAllUpcomingTherapies,
} from "../../../../services/userDashboardServices/UserDashboardServices";

const useUserDashboard = (user) => {
  const [userDashboardCount, setUserDashboardCount] = useState(null);
  const [upcomingActivities, setUpcomingActivities] = useState([]);
  const [upcomingOPD, setUpcomingOPD] = useState([]);
  const [upcomingTherapies, setUpcomingTherapies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.userId) return;

    setLoading(true);

    const fetchData = async () => {
      try {
        const [countsRes, activitiesRes, opdRes, therapiesRes] =
          await Promise.all([
            GetUserDashboardCounts(user.userId),
            GetUpcomingActivities(user.userId),
            GetUpcomingOPD(user.userId),
            GetAllUpcomingTherapies(user.userId),
          ]);

        console.log("activitiesRes", activitiesRes);
        console.log("opdRes", opdRes);
        console.log("therapiesRes", therapiesRes);

        if (countsRes.data.statusCode === 200) {
          setUserDashboardCount(countsRes.data.data);
        }
        if (activitiesRes?.data) {
          setUpcomingActivities(activitiesRes.data.data);
        }
        if (opdRes?.data) {
          setUpcomingOPD(opdRes.data.data);
        }
        if (therapiesRes?.data) {
          setUpcomingTherapies(therapiesRes.data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.userId]);

  return {
    userDashboardCount,
    upcomingActivities,
    upcomingOPD,
    upcomingTherapies,
    loading,
  };
};

export default useUserDashboard;
