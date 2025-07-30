"use client";

import { config } from "@/config";
import React, { createContext, useContext, useReducer, useEffect } from "react";

// Types
interface User {
  _id: string;
  fullName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void>;
  resetPassword: (userId: string, newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}

// Actions
type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; accessToken: string } }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: User }
  | { type: "SET_TOKEN"; payload: string };

// Initial state
const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case "SET_TOKEN":
      return {
        ...state,
        accessToken: action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const userData = localStorage.getItem("userData");

        if (token && userData) {
          const user = JSON.parse(userData);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user, accessToken: token },
          });
        } else {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await fetch(`${config.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      if (result.success && result.data.accessToken) {
        // Store token
        localStorage.setItem("accessToken", result.data.accessToken);

        // Get user data
        const userResponse = await fetch(`${config.baseUrl}/auth/me`, {
          headers: {
            Authorization: `Bearer ${result.data.accessToken}`,
          },
        });

        const userResult = await userResponse.json();

        if (userResult.success) {
          const user = userResult.data;
          localStorage.setItem("userData", JSON.stringify(user));

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user, accessToken: result.data.accessToken },
          });
        } else {
          // If user data fetch fails, still login with token
          dispatch({
            type: "SET_TOKEN",
            payload: result.data.accessToken,
          });
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      throw error;
    }
  };

  // Register function
  const register = async (
    fullName: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await fetch(`${config.baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      if (result.success) {
        // After successful registration, automatically login
        await login(email, password);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (
    userId: string,
    newPassword: string
  ): Promise<void> => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });

      const response = await fetch(
        `${config.baseUrl}/auth/reset-password/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Password reset failed");
      }

      if (!result.success) {
        throw new Error("Password reset failed");
      }
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("accessToken");

      if (token) {
        await fetch(`${config}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Clear local storage and state regardless of API success
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      dispatch({ type: "LOGOUT" });
    }
  };

  // Set user function
  const setUser = (user: User) => {
    localStorage.setItem("userData", JSON.stringify(user));
    dispatch({ type: "SET_USER", payload: user });
  };

  // Set token function
  const setToken = (token: string) => {
    localStorage.setItem("accessToken", token);
    dispatch({ type: "SET_TOKEN", payload: token });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    resetPassword,
    logout,
    setUser,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (undefined === context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
