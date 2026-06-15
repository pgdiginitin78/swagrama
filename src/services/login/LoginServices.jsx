import AxiosInstance from "../../AxiosInstance";
import { API } from "../../http-common";

export const userLogin = (postObj) => {
  return API.post(`loginJYA`, postObj);
};

export const signupJYA = (postObj) => {
  return API.post(`/signupJYA`, postObj);
};

export const verifyUser = (postObj) => {
  return API.post(`/VerifyUser`, postObj);
};

export const DeleteLoggedAccount = (password) => {
  return AxiosInstance.post(`/DeleteAccount?password=${password}`);
};


export const getUserDetails = (userId, role, clinicId) => {
  return AxiosInstance.get(
    `/UserDetails?userId=${userId}&role=${role}&clinicId=${clinicId}`,
  );
};

export const refreshToken = (postObj) => {
  return AxiosInstance.post(`/refresh-token`, postObj);
};

export const updatePatient = (postObj) => {
  return AxiosInstance.post(`/updatePatient`, postObj);
};

export const forgotPassword = (postObj) => {
  return AxiosInstance.post(`/forgot-password`, postObj);
};

export const resetPassword = (postObj) => {
  return AxiosInstance.post(`/reset-password`, postObj);
};

export const verifyOtp = (postObj) => {
  return AxiosInstance.post(`/verify-otp`, postObj);
};