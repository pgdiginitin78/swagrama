import axios from "axios";

export const API_BASE_URL = 'https://kompasshr.com/WellnessAPI/api/';


export const API = axios.create({
    baseURL: API_BASE_URL,
    // withCredentials: true,
});