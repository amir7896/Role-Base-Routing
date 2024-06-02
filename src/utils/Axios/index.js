import axios from "axios";
import LocalStorage from "../../Managers/LocalStorage";

const api = axios.create({
  baseURL: "http://localhost:4000/api/",
});

api.interceptors.request.use(function (config) {
  try {
    const token = LocalStorage.getToken();
    config.headers.Authorization = `bearer ${token}`;
    return config;
  } catch (error) {
    throw new Error("Error in setting auth header globally:", error);
  }
});

export default api;
