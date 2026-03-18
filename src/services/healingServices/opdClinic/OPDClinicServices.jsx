import AxiosInstance from "../../../AxiosInstance";

export const getDepartmentList = (clinicId) => {
  return AxiosInstance.get(`DepartmentList?clinicId=${clinicId}`);
};

//https://ayurmitra.in/WellnessAPILive/DoctorListByLocationDepartment? clinicId=5&departmentName=Aayurveda

export const getDoctorListByLocationDepartment = (clinicId, departmentName) => {
  return AxiosInstance.get(`DoctorListByLocationDepartment?clinicId=${clinicId}&departmentName=${departmentName}`);
};
