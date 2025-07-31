/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { useAuth as useAuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { LoginCredentials, RegisterData } from "@/types/auth";

export const useAuth = () => {
  const context = useAuthContext();
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Login mutation
export const useLogin = () => {
  const { setUser, setToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await authService.login({
        email: credentials.email,
        password: credentials.password,
      });
      return response;
    },
    onSuccess: async (data) => {
      if (data.success && data.data.accessToken) {
        // Set token
        setToken(data.data.accessToken);

        // Fetch user data
        try {
          const userResponse = await authService.getCurrentUser();
          if (userResponse.success) {
            setUser(userResponse.data);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }

        // Invalidate queries
        queryClient.invalidateQueries({ queryKey: ["user"] });

        toast.success(data.message || "Login successful!");
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || error.message || "Login failed";
      toast.error(errorMessage);
    },
  });
};

// Register mutation
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: RegisterData) => {
      const response = await authService.register({
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
      });
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(data.message || "Registration successful!");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Registration failed";
      toast.error(errorMessage);
    },
  });
};

// Reset password mutation
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      newPassword,
    }: {
      userId: string;
      newPassword: string;
    }) => {
      const response = await authService.resetPassword(userId, { newPassword });
      return response;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successful!");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Password reset failed";
      toast.error(errorMessage);
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
      toast.success("Logged out successfully!");

      // Redirect to login page
      window.location.href = "/login";
    },
    onError: (error: any) => {
      console.error("Logout error:", error);
      // Still clear queries and redirect even if API fails
      queryClient.clear();
      window.location.href = "/login";
    },
  });
};

// Get current user query
export const useCurrentUser = () => {
  const { isAuthenticated, accessToken } = useAuth();

  return useQuery({
    queryKey: ["user", "current"],
    queryFn: () => authService.getCurrentUser(),
    enabled: isAuthenticated && !!accessToken,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};

// Get user by ID query
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => authService.getUserById(userId),
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
