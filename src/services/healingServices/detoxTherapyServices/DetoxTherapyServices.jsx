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

// https://ayurmitra.in/WellnessAPILive/TherapyName?ClinicFid=5&ServiceGroupId=1&TherapyType=Detox
