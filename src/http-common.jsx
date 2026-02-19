import axios from "axios";

export const API_BASE_URL = 'https://ayurmitra.in/WellnessAPILive/';


export const API = axios.create({
    baseURL: API_BASE_URL,
    // withCredentials: true,
});