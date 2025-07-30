// services/taskService.ts
import axios from "axios";
import {
  TasksResponse,
  SingleTaskResponse,
  TaskFilters,
  UpdateTaskPayload,
  DeleteTaskResponse,
} from "@/types/task";

const API_BASE_URL = "http://localhost:5000/api/v1";

// Create axios instance with interceptor for auth
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to authorization header
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // or wherever you store the token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const taskService = {
  // Get all tasks with filters
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

  // Get task by ID
  getTaskById: async (id: string): Promise<SingleTaskResponse> => {
    const { data } = await apiClient.get<SingleTaskResponse>(`/tasks/${id}`);
    return data;
  },

  // Get tasks by category
  getTaskByCategory: async (category: string): Promise<TasksResponse> => {
    const { data } = await apiClient.get<TasksResponse>(
      `/tasks/category/${encodeURIComponent(category)}`
    );
    return data;
  },

  // Update task
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

  // Delete task
  deleteTask: async (id: string): Promise<DeleteTaskResponse> => {
    const { data } = await apiClient.delete<DeleteTaskResponse>(`/tasks/${id}`);
    return data;
  },
};
