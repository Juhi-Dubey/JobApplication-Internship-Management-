import axios from "axios";

const API = axios.create({
  // baseURL: "https://jobapplication-internship-management.onrender.com",
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add auth token to headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth endpoints
export const login = async (email, password) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};

export const signup = async (name, email, password) => {
  const response = await API.post("/auth/signup", { name, email, password });
  return response.data;
};

// Job endpoints
export const getJobs = async () => {
  const response = await API.get("/jobs");
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await API.post("/jobs", jobData);
  return response.data;
};

export const updateJob = async (id, jobData) => {
  const response = await API.put(`/jobs/${id}`, jobData);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await API.delete(`/jobs/${id}`);
  return response.data;
};

// Application endpoints
export const applyJob = async (jobId, resumeLink, coverNote) => {
  const response = await API.post("/applications", {
    jobId,
    resumeLink,
    coverNote,
  });
  return response.data;
};

export const getMyApplications = async () => {
  const response = await API.get("/applications/me");
  return response.data;
};

export const getAllApplications = async () => {
  const response = await API.get("/applications");
  return response.data;
};

export const updateApplicationStatus = async (id, status) => {
  const response = await API.put(`/applications/${id}/status`, { status });
  return response.data;
};

export default API;
