import AxiosInstance from "../../../AxiosInstance";

export const BookDetoxTherapy = (data) => {
  return AxiosInstance.post(`/SaveTherapyBooking`, data);
};

export const GetDetoxTherapySlotsByUser = (userId, date) => {
  return AxiosInstance.get(
    `/GetTherapySlotsByUser?userId=${userId}&date=${date}`,
  );
};

export const GetDetoxTherapyByServiceCategory = (clinicFid) => {
  return AxiosInstance.get(`/ServiceCategories?ClinicFid=${clinicFid}`);
};

export const GetTherapyNameByServiceCategory = (
  clinicFid,
  serviceGroupId,
  TherapyType,
  page,
  size,
) => {
  return AxiosInstance.get("/TherapyName", {
    params: {
      ClinicFid: clinicFid,
      ServiceGroupId: serviceGroupId,
      TherapyType: TherapyType,
      page: page,
      size: size,
    },
  });
};


export const GetTherapySlots = (fromDate, serviceFid, toDate, clinicFId) => {
  return AxiosInstance.get(
    `/GetTherapySlots?fromDate=${fromDate}&serviceFid=${serviceFid}&toDate=${toDate}&clinicFId=${clinicFId}`,
  );
};


export const TherapySlots = (serviceId, date) => {
  return AxiosInstance.get(`/TherapySlots?serviceId=${serviceId}&date=${date}`);
};
// https://ayurmitra.in/wellnessapilive/TherapySlots?serviceId=164&date=2026-09-30