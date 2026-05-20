import AxiosInstance from "../../AxiosInstance";

export const SaveActivities = (saveObj) => {
  return AxiosInstance.post(`CommunityActivity`, saveObj);
};


//https://ayurmitra.in/WellnessAPILive/refund

export const RefundPayment = (saveObj) => {
  return AxiosInstance.post(`refund`, saveObj);
};