import AxiosInstance from "../../AxiosInstance";

export const SaveActivities = (saveObj) => {
  return AxiosInstance.post(`CommunityActivity`, saveObj);
};


export const RefundPayment = (saveObj) => {
  return AxiosInstance.post(`refund`, saveObj);
};
