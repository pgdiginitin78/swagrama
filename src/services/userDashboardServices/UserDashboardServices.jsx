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

export const GetPreviousOPD = (userId) => {
  return AxiosInstance.get(`/GetPreviousOPD?userId=${userId}`);
};

export const GetAllPreviousTherapies = (userId) => {
  return AxiosInstance.get(`/GetAllPreviousTherapies?userId=${userId}`);
};

export const GetPreviousActivities = (userId) => {
  return AxiosInstance.get(`/GetPreviousActivities?userId=${userId}`);
};

export const GetTodayOPD = (userId) => {
  return AxiosInstance.get(`/GetTodayOPD?userId=${userId}`);
};

export const GetAllTodayTherapies = (userId) => {
  return AxiosInstance.get(`/GetAllTodayTherapies?userId=${userId}`);
};

export const GetTodayActivities = (userId) => {
  return AxiosInstance.get(`/GetTodayActivities?userId=${userId}`);
};


