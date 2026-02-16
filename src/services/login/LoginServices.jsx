import AxiosInstance from "../../AxiosInstance";
import { API } from "../../http-common";

export const userLogin = (postObj) => {
  return API.post(`loginJYA`, postObj);
};

export const signupJYA = (postObj) => {
  return API.post(`signupJYA`, postObj);
};

export const DeleteLoggedAccount = (password) => {
  return AxiosInstance.post(`DeleteAccount?password=${password}`);
};
