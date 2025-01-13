import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const authApi = {
  login: (data) => api.post("/api/v1/users/login", data),
  signup: (data) => api.post("/api/v1/users/signup", data),
  logout: () => api.get("/api/v1/users/logout"),
  verifyUser: (token) =>
    api.get("/api/v1/users/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export const carsApi = {
  getAllCars: async () => await api.get("/api/v1/cars"),
  getCarById: async (id) => await api.get(`/api/v1/cars/${id}`),
  addCar: (data) => api.post("/api/v1/cars/add-new-car", data),
};
