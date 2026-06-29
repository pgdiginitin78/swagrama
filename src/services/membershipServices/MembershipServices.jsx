import AxiosInstance from "../../AxiosInstance";


export const SaveEnquiry = (data) => {
  return AxiosInstance.post(`/SaveEnquiry`, data);
}
