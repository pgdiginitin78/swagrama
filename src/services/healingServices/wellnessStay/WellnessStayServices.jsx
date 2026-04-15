
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
