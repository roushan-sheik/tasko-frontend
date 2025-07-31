"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Calendar,
  Clock,
  CheckSquare,
  Loader,
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import { signUpSchema } from "@/schemas/signup.schema";
import { useRegister, useAuth } from "@/hooks/useAuth";
import SectionContainer from "@/components/shared/SectionContainer";

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await registerMutation.mutateAsync({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      // Reset form after successful registration
      reset();

      // Redirect to login page after successful registration
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      // Error is handled in the mutation
      console.error("Registration error:", error);
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
    <SectionContainer>
      <div className="  flex">
        <ToastContainer />
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[color:var(--color-neutral-800)] to-[color:var(--color-brand-900)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-brand-900)] to-[color:var(--color-neutral-800)] opacity-90"></div>

          {/* Illustration Elements */}
          <div className="relative z-10 flex items-center justify-center w-full p-12">
            <div className="text-center space-y-8">
              {/* Daily To-Do Board Illustration */}
              <div className="bg-[color:var(--color-neutral-700)] rounded-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300 border-4 border-blue-400">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-body3 font-bold mb-4">
                  DAILY TO-DO
                </div>
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-white text-body3">08:00</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-green-400" />
                    <span className="text-white text-body3">30:00</span>
                  </div>
                  <div className="text-yellow-300 text-body2 font-handwriting">
                    ✓ Task 1<br />
                    ○ Task 2<br />⚡ Priority
                  </div>
                </div>
              </div>

              {/* Character Illustrations */}
              <div className="flex justify-center space-x-6">
                <div className="bg-[color:var(--color-brand-400)] w-12 h-12 rounded-full flex items-center justify-center animate-bounce delay-100">
                  <CheckSquare className="h-6 w-6 text-white" />
                </div>
                <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center animate-bounce delay-300">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>

              <div className="text-white">
                <h2 className="text-heading1 text-white font-bold mb-4">
                  Join Tasky Today
                </h2>
                <p className="text-body2 text-gray-200 opacity-90">
                  Create your account and start organizing your daily tasks like
                  a pro!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[color:var(--color-neutral-50)]">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-title3 font-bold mb-2">Sign Up</h1>
              <p className="text-body2 text-[color:var(--color-neutral-600)]">
                To Create Account, Please Fill In the Form Below.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-body3 font-medium text-[color:var(--color-neutral-700)] mb-2"
                >
                  Full Name
                </label>
                <input
                  {...register("fullName")}
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 focus:outline-none rounded-lg border text-body2 focus:ring-2 focus:ring-[color:var(--color-brand-500)] focus:border-transparent transition-colors ${
                    errors.fullName
                      ? "border-red-500 bg-red-50"
                      : "border-[color:var(--color-neutral-300)] bg-white"
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-caption1 text-red-600">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-body3 font-medium text-[color:var(--color-neutral-700)] mb-2"
                >
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className={`w-full px-4 focus:outline-none py-3 rounded-lg border text-body2 focus:ring-2 focus:ring-[color:var(--color-brand-500)] focus:border-transparent transition-colors ${
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
                    placeholder="Password"
                    className={`w-full px-4 py-3 pr-12 focus:outline-none rounded-lg border text-body2 focus:ring-2 focus:ring-[color:var(--color-brand-500)] focus:border-transparent transition-colors ${
                      errors.password
                        ? "border-red-500 bg-red-50"
                        : "border-[color:var(--color-neutral-300)] bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[color:var(--color-neutral-500)] hover:text-[color:var(--color-neutral-700)] transition-colors"
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

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-body3 font-medium text-[color:var(--color-neutral-700)] mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Retype password"
                    className={`w-full px-4 py-3  focus:outline-none pr-12 rounded-lg border text-body2 focus:ring-2 focus:ring-[color:var(--color-brand-500)] focus:border-transparent transition-colors ${
                      errors.confirmPassword
                        ? "border-red-500 bg-red-50"
                        : "border-[color:var(--color-neutral-300)] bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[color:var(--color-neutral-500)] hover:text-[color:var(--color-neutral-700)] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-caption1 text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full cursor-pointer bg-[color:var(--color-brand-500)] text-white py-3 px-4 rounded-lg text-body2 font-semibold hover:bg-[color:var(--color-brand-600)] focus:ring-2 focus:ring-[color:var(--color-brand-500)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
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

              {/* Login Link */}
              <div className="text-center">
                <p className="text-body3 text-[color:var(--color-neutral-600)]">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-[color:var(--color-brand-500)] hover:text-[color:var(--color-brand-600)] font-medium transition-colors"
                  >
                    Log In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default SignUp;
