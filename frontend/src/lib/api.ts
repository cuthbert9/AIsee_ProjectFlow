import axios from "axios";

const BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});


export const loginUser = async (data: any) => {
    const response = await api.post("/login", data);
    return response.data;
};

export const registerUser = async (data: any) => {
    const response = await api.post("/register", data);
    return response.data;
};

export const getUser = async () => {
    const response = await api.get("/user");
    return response.data;
};

export const getProjects = async () => {
    const response = await api.get("/projects");
    return response.data;
};

export const createProject = async (projectData: any) => {
    const response = await api.post("/projects", projectData);
    return response.data;
};

export const updateProject = async (id: string, projectData: any) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
};

export const deleteProject = async (id: string) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
};

export default api;
