

//https://ayurmitra.in/WellnessAPILive/RoomList

import AxiosInstance from "../../../AxiosInstance";

export const getRoomList = () => {
  return AxiosInstance.get(`/RoomList`);
};

//https://ayurmitra.in/WellnessAPILive/Getroomtype?roomTypeId=1&date=2026-04-07

export const checkRoomAvailability = (roomTypeId, date) => {
  return AxiosInstance.get(`/Getroomtype?roomTypeId=${roomTypeId}&date=${date}`);
};

//https://ayurmitra.in/WellnessAPILive/Booking

export const wellnessStayBooking = (data) => {
  return AxiosInstance.post(`/Booking`, data);
};