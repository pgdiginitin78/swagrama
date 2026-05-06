import AxiosInstance from "../../AxiosInstance";

export const GetServiceRoomTypeList = (clinicId) => {
  return AxiosInstance.get(`/GetServiceRoomTypeList?ClinicId=${clinicId}`);
};

export const SaveTherapy = (clinicId, data) => {
  return AxiosInstance.post(`/SaveTherapy?ClinicId=${clinicId}`, data);
};