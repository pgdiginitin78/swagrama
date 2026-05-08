import AxiosInstance from "../../AxiosInstance";

export const GetUpcomingStays = (clinicId, data) => {
  return AxiosInstance.post(`GetUpcomingStays?ClinicFid=${5}`, data);
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

export const GetDoctorDashboard = (clinicId) => {
  return AxiosInstance.get(`GetDoctorDashboard?ClinicId=${clinicId}`);
};

export const GetClinicRevenue = (clinicId, filter) => {
  return AxiosInstance.get(
    `GetClinicRevenue?clinicId=${clinicId}&filter=${filter}`,
  );
};

export const GetRevenueTrends = (clinicId, filter) => {
  return AxiosInstance.get(
    `GetRevenueTrends?clinicId=${clinicId}&filter=${filter}`,
  );
};

export const GetTherapySplit = (clinicId, filter) => {
  return AxiosInstance.get(
    `GetTherapySplit?clinicId=${clinicId}&Filter=${filter}`,
  );
};

export const GetDashboardCount = (clinicId, filter) => {
  return AxiosInstance.get(
    `GetDashboardCount?clinicId=${clinicId}&filter=${filter}`,
  );
};

export const GetTherapyBookingList = (clinicId, page, size, filters = {}) => {
  let url = `GetTherapyBookingList?clinicId=${clinicId}&page=${page}&size=${size}`;
  if (filters.paymentStatus && filters.paymentStatus !== "all") {
    url += `&paymentStatus=${filters.paymentStatus}`;
  }
  if (filters.bookingStatus && filters.bookingStatus !== "all") {
    url += `&bookingStatus=${filters.bookingStatus}`;
  }
  return AxiosInstance.get(url);
};

export const UpdateStayCheckInOut = (bookingId, ClinicId) => {
  return AxiosInstance.post(
    `UpdateStayCheckInOut?bookingId=${bookingId}&ClinicFid=${ClinicId}`,
  );
};
