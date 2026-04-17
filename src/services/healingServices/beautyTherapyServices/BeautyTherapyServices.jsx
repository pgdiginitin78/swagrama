

//https://ayurmitra.in/WellnessAPILive/GetBeautyTherapySlots?userId=1&date=2026-04-20


import AxiosInstance from "../../../AxiosInstance";

export const BookBeautyTherapy = (data) => {
  return AxiosInstance.post(`/BookBeautyTherapy`, data);
}


export const GetBeautyTherapySlots = (userId, date) => {
  return AxiosInstance.get(`/GetBeautyTherapySlots?userId=${userId}&date=${date}`);
};