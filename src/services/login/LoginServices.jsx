import AxiosInstance from "../../AxiosInstance";
import { API } from "../../http-common";

export const userLogin = (postObj) => {
  return API.post(`loginJYA`, postObj);
};

export const signupJYA = (postObj) => {
  return API.post(`/signupJYA`, postObj);
};

export const DeleteLoggedAccount = (password) => {
  return AxiosInstance.post(`/DeleteAccount?password=${password}`);
};

export const getUserDetails = (userId) => {
  return AxiosInstance.get(`/UserDetails?userId=${userId}`);
};

export const refreshToken = (postObj) => {
  return AxiosInstance.post(`/refresh-token`, postObj);
};

export const updatePatient = (postObj) => {
  return AxiosInstance.post(`/updatePatient`, postObj);
};
