import AxiosInstance from "../../../AxiosInstance";

export const BookDetoxTherapy = (data) => {
  return AxiosInstance.post(`/BookTherapy`, data);
}


export const GetDetoxTherapySlotsByUser = (userId, date) => {
  return AxiosInstance.get(`/GetTherapySlotsByUser?userId=${userId}&date=${date}`);
};


