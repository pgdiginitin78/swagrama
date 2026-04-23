
import AxiosInstance from "../../AxiosInstance";

export const GetUpcomingActivities = (userId) => {
  return AxiosInstance.get(`/GetUpcomingActivities?userId=${userId}`);
};

export const GetUserDashboardCounts = (userId) => {
  return AxiosInstance.get(`/GetUserDashboardCounts?userId=${userId}`);
};