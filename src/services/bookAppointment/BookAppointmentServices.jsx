import AxiosInstance from "../../AxiosInstance";

export const getLocationList = () => {
  return AxiosInstance.get(`locationList`);
};

export const getClinicList = (locationId) => {
  return AxiosInstance.get(`ClinicList?LocationId=${locationId}`);
};

export const getDoctorsByClinicId = (clinicId) => {
  return AxiosInstance.get(`Doctors?ClinicFid=${clinicId}`);
};

export const getPatientDataByMobileNo = (contactNumber,ClinicId) => {
  return AxiosInstance.get(`Patients?contactNumber=${contactNumber}&ClinicId=${ClinicId}`);
};

export const getServicesByClinicId = (clinicId) => {
  return AxiosInstance.get(`Services?ClinicFid=${clinicId}`);
};

export const bookAppointment = (saveObj, userId) => {
  return AxiosInstance.post(`bookAppointment?userId=${userId}`, saveObj);
};

export const getDoctorAvailableSlots = (doctorId, appointmentDate,ClinicFid) => {
  return AxiosInstance.get(
    `DoctorAvailableSlots?doctorId=${doctorId}&appointmentDate=${appointmentDate}&ClinicFid=${ClinicFid}`,
  );
};

//
export const getPrescriptionsByPatient = (patientFid) => {
  return AxiosInstance.get(`PrescriptionsByPatient?patientFid=${patientFid}`);
};

export const getDoctorsProfile = (DoctorFid) => {
  return AxiosInstance.get(`DoctorsProfile?DoctorFid=${DoctorFid}`);
};

export const AddPatient = (saveObj) => {
  return AxiosInstance.post(`AddPatient`, saveObj);
};
