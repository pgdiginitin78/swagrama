import axios from "axios";

// Live Production API
export const API_LIVE_URL = "https://ayurmitra.in/WellnessAPILive/";

// Local .NET Web API (Wellness)
export const API_LOCAL_URL = "http://localhost:5227/";

// Auto-select local URL if REACT_APP_USE_LOCAL_API is "true", otherwise default to live
export const IS_LOCAL = process.env.REACT_APP_USE_LOCAL_API === "true";

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
  ? process.env.REACT_APP_API_BASE_URL
  : (IS_LOCAL ? API_LOCAL_URL : API_LIVE_URL);

export const API = axios.create({
  baseURL: API_BASE_URL,
  // withCredentials: true,
});
