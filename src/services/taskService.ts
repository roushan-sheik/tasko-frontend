// services/taskService.ts
import axios from "axios";
import {
  TasksResponse,
  SingleTaskResponse,
  TaskFilters,
  UpdateTaskPayload,
  DeleteTaskResponse,
  CreateTaskPayload, // Add this import
} from "@/types/task";
import { config } from "@/config";

const API_BASE_URL = config.baseUrl;

// Create axios instance with interceptor for auth
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to authorization header
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const taskService = {
  // Add this new method
  createTask: async (
    payload: CreateTaskPayload
  ): Promise<SingleTaskResponse> => {
    const { data } = await apiClient.post<SingleTaskResponse>(
      "/tasks/",
      payload
    );
    return data;
  },

  // Your existing methods
  getTasks: async (filters: TaskFilters = {}): Promise<TasksResponse> => {
    const params = new URLSearchParams();

    if (filters.category) params.append("category", filters.category);
    if (filters.status) params.append("status", filters.status);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.searchTerm) params.append("searchTerm", filters.searchTerm);

    const { data } = await apiClient.get<TasksResponse>(
      `/tasks?${params.toString()}`
    );
    return data;
  },

  getTaskById: async (id: string): Promise<SingleTaskResponse> => {
    const { data } = await apiClient.get<SingleTaskResponse>(`/tasks/${id}`);
    return data;
  },

  getTaskByCategory: async (category: string): Promise<TasksResponse> => {
    const { data } = await apiClient.get<TasksResponse>(
      `/tasks/category/${encodeURIComponent(category)}`
    );
    return data;
  },

  updateTask: async (
    id: string,
    payload: UpdateTaskPayload
  ): Promise<SingleTaskResponse> => {
    const { data } = await apiClient.patch<SingleTaskResponse>(
      `/tasks/${id}`,
      payload
    );
    return data;
  },

  deleteTask: async (id: string): Promise<DeleteTaskResponse> => {
    const { data } = await apiClient.delete<DeleteTaskResponse>(`/tasks/${id}`);
    return data;
  },
};
