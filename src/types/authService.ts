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
