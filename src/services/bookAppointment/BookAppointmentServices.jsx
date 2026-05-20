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

//https://ayurmitra.in/WellnessAPILive/Patients?contactNumber=7385395192&userId=124&Type=IPD&ClinicId=5

export const getPatientDataByMobileNo = (
  contactNumber,
  userId,
  type,
  ClinicId,
) => {
  return AxiosInstance.get(
    `Patients?contactNumber=${contactNumber}&userId=${userId}&Type=${type}&ClinicId=${ClinicId}`,
  );
};

export const getServicesByClinicId = (clinicId, userId) => {
  return AxiosInstance.get(`Services?ClinicFid=${clinicId}&userId=${userId}`);
};

export const bookAppointment = (saveObj, userId) => {
  return AxiosInstance.post(`bookAppointment?userId=${userId}`, saveObj);
};

export const RescheduleAppointment = (saveObj, userId) => {
  return AxiosInstance.post(`RescheduleAppointment?userId=${userId}`, saveObj);
};

export const RescheduleBooking = (saveObj, userId) => {
  return AxiosInstance.post(`RescheduleBooking?userId=${userId}`, saveObj);
};

export const getDoctorAvailableSlots = (
  doctorId,
  appointmentDate,
  ClinicFid,
) => {
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

//https://ayurmitra.in/WellnessAPILive/AddPatient?type=therapy&ClinicFid=11
export const AddPatient = (type, clinicId, saveObj) => {
  return AxiosInstance.post(
    `AddPatient?type=${type}&ClinicFid=${clinicId}`,
    saveObj,
  );
};

export const InitiatePayment = (ClinicId, userId, postObj) => {
  const params = new URLSearchParams();

  if (userId !== null && userId !== undefined) {
    params.append("userId", userId);
  }

  if (ClinicId !== null && ClinicId !== undefined) {
    params.append("ClinicId", ClinicId);
  }

  return AxiosInstance.post(`InitiatePayment?${params.toString()}`, postObj);
};

export const CheckPaymentStatus = (clinicId, clientTxnId) => {
  const params = new URLSearchParams();

  if (clinicId !== null && clinicId !== undefined) {
    params.append("clinicId", clinicId);
  }

  if (clientTxnId !== null && clientTxnId !== undefined) {
    params.append("clientTxnId", clientTxnId);
  }

  return AxiosInstance.get(`CheckPaymentStatus?${params.toString()}`);
};

//https://ayurmitra.in/WellnessAPILive/AgeDetails

export const getAgeDetails = () => {
  return AxiosInstance.get(`AgeDetails`);
};
