
import AxiosInstance from "../../../AxiosInstance";

export const getRoomList = () => {
  return AxiosInstance.get(`/RoomList`);
};

export const wellnessStayBooking = (data) => {
  return AxiosInstance.post(`/Booking`, data);
};


export const checkRoomAvailability = (
  roomTypeId,
  checkInDate,
  checkInTime,
  checkOutDate,
  checkOutTime,
) => {
  return AxiosInstance.get(
    `/Getroomtype?roomTypeId=${roomTypeId}&checkInDate=${checkInDate}&checkInTime=${checkInTime}&checkOutDate=${checkOutDate}&checkOutTime=${checkOutTime}`,
  );
};


//https://ayurmitra.in/WellnessAPILive/CheckRoomGender?roomId=3&patientId=16

export const checkRoomGender = (roomId, patientId) => {
  return AxiosInstance.get(`/CheckRoomGender?roomId=${roomId}&userId=${patientId}`);
};


//https://ayurmitra.in/WellnessAPILive/Getroomtype?roomTypeId=1

export const getRoomBookingDetails = (roomTypeId) => {
  return AxiosInstance.get(`/Getroomtype?roomTypeId=${roomTypeId}`);
};