import AxiosInstance from "../../AxiosInstance";

export const SaveActivities = (saveObj) => {
  return AxiosInstance.post(`CommunityActivity`, saveObj);
};