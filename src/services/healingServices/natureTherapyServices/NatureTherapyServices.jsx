import AxiosInstance from "../../../AxiosInstance";


export const GetNatureTherapySlotsByUser = (userId, date) => {
  return AxiosInstance.get(`/GetNatureTherapySlots?userId=${userId}&date=${date}`);
};

export const BookNatureTherapy = (data) => {
  return AxiosInstance.post(`/BookNatureTherapy`, data);
};
