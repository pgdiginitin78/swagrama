import AxiosInstance from "../../AxiosInstance";

export const GetUpcomingStays = (data) => {
  return AxiosInstance.post(`GetUpcomingStays`, data);
};

export const GetEnquiryByTypeDropdown = () => {
  return AxiosInstance.get(`GetEnquiryByTypeDropdown`);
};

export const GetServiceTypeDropdown = () => {
  return AxiosInstance.get(`GetServiceTypeDropdown`);
};

export const SearchEnquiry = (search) => {
  return AxiosInstance.get(`SearchEnquiry?search=${search}`);
};

export const GetEnquiryList = (searchData) => {
  return AxiosInstance.post(`GetEnquiryList`, searchData);
};

export const GetNext24HoursArrivals = () => {
  return AxiosInstance.get(`GetNext24HoursArrivals`);
};

export const GetOtherBookingsList = (data) => {
  return AxiosInstance.post(`GetCommunityBookings`, data);
};

export const GetTodayOPDCount = (clinicId) => {
  return AxiosInstance.get(`GetTodayOPDCount?clinicId=${clinicId}`);
};

export const GetAllOPDBookingList = (data) => {
  return AxiosInstance.post(`GetOPDBooking`, data);
};