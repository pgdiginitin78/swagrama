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

export const getPatientDataByMobileNo = (contactNumber, ClinicId) => {
  return AxiosInstance.get(
    `Patients?contactNumber=${contactNumber}&ClinicId=${ClinicId}`,
  );
};

export const getServicesByClinicId = (clinicId) => {
  return AxiosInstance.get(`Services?ClinicFid=${clinicId}`);
};

export const bookAppointment = (saveObj, userId) => {
  return AxiosInstance.post(`bookAppointment?userId=${userId}`, saveObj);
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

export const AddPatient = (saveObj) => {
  return AxiosInstance.post(`AddPatient`, saveObj);
};

export const InitiatePayment = (ClinicId, userId, postObj) => {
  const params = new URLSearchParams();

  params.append("userId", userId);

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
