export interface User {
  _id: string;
  fullName: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordData {
  email: string;
  newPassword: string;
  confirmPassword: string;
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

export interface ApiError {
  statusCode: number;
  message: string;
  success: false;
}

// Form validation types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordFormData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}
