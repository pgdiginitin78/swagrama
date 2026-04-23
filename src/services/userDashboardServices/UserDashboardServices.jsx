import AxiosInstance from "../../AxiosInstance";

export const GetUpcomingActivities = (userId) => {
  return AxiosInstance.get(`/GetUpcomingActivities?userId=${userId}`);
};

export const GetUserDashboardCounts = (userId) => {
  return AxiosInstance.get(`/GetUserDashboardCounts?userId=${userId}`);
};

export const GetUpcomingOPD = (userId) => {
  return AxiosInstance.get(`/GetUpcomingOPD?userId=${userId}`);
};

export const GetAllUpcomingTherapies = (userId) => {
  return AxiosInstance.get(`/GetAllUpcomingTherapies?userId=${userId}`);
};
