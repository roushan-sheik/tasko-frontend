"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  CheckSquare,
  BarChart3,
  Users,
  Loader,
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import { loginSchema } from "@/schemas/login.schema";
import { useLogin, useAuth } from "@/hooks/useAuth";
import SectionContainer from "@/components/shared/SectionContainer";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });

      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch (error) {
      // Error is handled in the mutation
      console.error("Login error:", error);
    }
  };

  // Show loading if checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-[color:var(--color-brand-500)]" />
      </div>
    );
  }

  // Don't render if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div>
      <SectionContainer>
        <div className=" flex">
          <ToastContainer />
          {/* Left Side - Illustration */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[color:var(--color-neutral-800)] to-[color:var(--color-brand-900)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-brand-900)] to-[color:var(--color-neutral-800)] opacity-90"></div>

            {/* Illustration Elements */}
            <div className="relative z-10 flex items-center justify-center w-full p-12">
              <div className="text-center space-y-8">
                {/* Animated Icons */}
                <div className="flex justify-center space-x-8 mb-12">
                  <div className="bg-[color:var(--color-brand-500)] p-4 rounded-2xl animate-bounce delay-100">
                    <CheckSquare className="h-8 w-8 text-white" />
                  </div>
                  <div className="bg-red-500 p-4 rounded-2xl animate-bounce delay-300">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <div className="bg-blue-500 p-4 rounded-2xl animate-bounce delay-500">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Decorative Cards */}
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="h-3 bg-[color:var(--color-brand-400)] rounded mb-2"></div>
                    <div className="h-2 bg-white/60 rounded mb-1"></div>
                    <div className="h-2 bg-white/40 rounded w-3/4"></div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="h-3 bg-blue-400 rounded mb-2"></div>
                    <div className="h-2 bg-white/60 rounded mb-1"></div>
                    <div className="h-2 bg-white/40 rounded w-2/3"></div>
                  </div>
                </div>

                <div className="text-white">
                  <h2 className="text-heading1 text-white font-bold mb-4">
                    Manage Your Tasks
                  </h2>
                  <p className="text-body2 text-gray-200 opacity-90">
                    Stay organized and boost your productivity with our
                    intuitive task management system.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[color:var(--color-neutral-50)]">
            <div className="w-full max-w-md space-y-8">
              {/* Header */}
              <div className="text-center">
                <h1 className="text-title3 font-bold mb-2">Login</h1>
                <p className="text-body2 text-[color:var(--color-neutral-600)]">
                  Welcome Back. Please Enter your Details to Log In.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-body3 font-medium text-[color:var(--color-neutral-700)] mb-2"
                  >
                    Email Adders
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    placeholder="m32220@gmail.com"
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none text-body2 focus:ring-2 focus:ring-[color:var(--color-brand-500)] focus:border-transparent transition-colors ${
                      errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-[color:var(--color-neutral-300)] bg-white"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-caption1 text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-body3 font-medium text-[color:var(--color-neutral-700)] mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="••••••••••••••••"
                      className={`w-full px-4 py-3 focus:outline-none pr-12 rounded-lg border text-body2 focus:ring-2 focus:ring-[color:var(--color-brand-500)] focus:border-transparent transition-colors ${
                        errors.password
                          ? "border-red-500 bg-red-50"
                          : "border-[color:var(--color-neutral-300)] bg-white"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[color:var(--color-neutral-500)] hover:text-[color:var(--color-neutral-700)] transition-colors cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-caption1 text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      {...register("rememberMe")}
                      type="checkbox"
                      className="h-4 w-4 text-[color:var(--color-brand-500)] focus:ring-[color:var(--color-brand-500)] border-[color:var(--color-neutral-300)] rounded"
                    />
                    <span className="ml-2 text-body3 text-[color:var(--color-neutral-600)]">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="/reset-password"
                    className="text-body3 text-[color:var(--color-brand-500)] hover:text-[color:var(--color-brand-600)] transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full cursor-pointer bg-[color:var(--color-brand-500)] text-white py-3 px-4 rounded-lg text-body2 font-semibold hover:bg-[color:var(--color-brand-600)] focus:ring-2 focus:ring-[color:var(--color-brand-500)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {authLoading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Log In"
                  )}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[color:var(--color-neutral-300)]" />
                  </div>
                  <div className="relative flex justify-center text-body3">
                    <span className="px-2 bg-[color:var(--color-neutral-50)] text-[color:var(--color-neutral-500)]">
                      Or
                    </span>
                  </div>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-body3 text-[color:var(--color-neutral-600)]">
                    Don&apos;t have an account?{" "}
                    <a
                      href="/signup"
                      className="text-[color:var(--color-brand-500)] hover:text-[color:var(--color-brand-600)] font-medium transition-colors"
                    >
                      Sign Up
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default LoginPage;
