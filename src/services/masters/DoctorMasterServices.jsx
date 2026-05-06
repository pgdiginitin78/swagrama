import AxiosInstance from "../../AxiosInstance";

export const AddDoctorWithSession = (data, ClinicId) => {
  return AxiosInstance.post(`AddDoctorWithSession?ClinicId=${ClinicId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//https://ayurmitra.in/WellnessAPILive/GetDoctorList?ClinicId=5&page =1&size=2

export const GetDoctorList = (ClinicId, page, size) => {
  return AxiosInstance.get(
    `GetDoctorList?ClinicId=${ClinicId}&page=${page}&size=${size}`,
  );
};
