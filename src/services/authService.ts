import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1";

// Types
export interface User {
  _id: string;
  fullName: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  newPassword: string;
}

export interface AuthResponse {
  statusCode: number;
  data: {
    accessToken: string;
  };
  message: string;
  success: boolean;
}

export interface RegisterResponse {
  statusCode: number;
  data: User;
  message: string;
  success: boolean;
}

export interface UserResponse {
  statusCode: number;
  data: User;
  message: string;
  success: boolean;
}

export interface ResetPasswordResponse {
  statusCode: number;
  message: string;
  success: boolean;
}

// Create axios instance
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

export const authService = {
  // Login
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    return data;
  },

  // Register
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const { data } = await apiClient.post<RegisterResponse>(
      "/auth/register",
      userData
    );
    return data;
  },

  // Get current user
  getCurrentUser: async (): Promise<UserResponse> => {
    const { data } = await apiClient.get<UserResponse>("/auth/me");
    return data;
  },

  // Get user by ID
  getUserById: async (userId: string): Promise<UserResponse> => {
    const { data } = await apiClient.get<UserResponse>(`/auth/user/${userId}`);
    return data;
  },

  // Reset password
  resetPassword: async (
    userId: string,
    payload: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> => {
    const { data } = await apiClient.patch<ResetPasswordResponse>(
      `/auth/reset-password/${userId}`,
      payload
    );
    return data;
  },

  // Logout
  logout: async (): Promise<{ success: boolean; message: string }> => {
    const { data } = await apiClient.post("/auth/logout");
    return data;
  },

  // Verify token
  verifyToken: async (): Promise<boolean> => {
    try {
      const response = await apiClient.get("/auth/me");
      return response.data.success;
    } catch {
      return false;
    }
  },
};
