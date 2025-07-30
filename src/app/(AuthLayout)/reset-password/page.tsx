"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Clock,
  CheckSquare,
  Settings,
  Database,
  Loader,
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import { resetPasswordSchema } from "@/schemas/resetPassword.schema";
import { useResetPassword } from "@/hooks/useAuth";

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const resetPasswordMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      // Note: In a real app, you would get the userId from somewhere (like URL params, auth context, etc.)
      // For now, assuming we have user ID available somehow
      const userId = "current-user-id"; // This should come from your auth context or URL params

      await resetPasswordMutation.mutateAsync({
        userId,
        newPassword: data.newPassword,
      });

      // Reset form after successful password reset
      reset();

      // Redirect to login page after successful reset
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      // Error is handled in the mutation
      console.error("Reset password error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[color:var(--color-brand-900)] to-[color:var(--color-neutral-800)] relative overflow-hidden">
      <ToastContainer />
      {/* Background Decorations */}
      <div className="absolute top-10 right-10 opacity-20">
        <div className="flex space-x-4">
          <div className="bg-[color:var(--color-brand-400)] p-3 rounded-lg">
            <Database className="h-6 w-6 text-white" />
          </div>
          <div className="bg-blue-500 p-3 rounded-lg">
            <Settings className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 left-10 opacity-20">
        <div className="bg-[color:var(--color-brand-300)] p-4 rounded-2xl transform rotate-12">
          <CheckSquare className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative">
          {/* Header with Icon */}
          <div className="text-center mb-8">
            <div className="bg-[color:var(--color-brand-500)] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-title3 font-bold mb-2">Reset your Password</h1>
            <p className="text-body3 text-[color:var(--color-neutral-600)]">
              Strong passwords include numbers, letters, and punctuation marks.
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
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="m32220@gmail.com"
                className={`w-full px-4 py-3 focus:outline-none rounded-lg border text-body2 focus:ring-2 focus:ring-[color:var(--color-brand-500)] focus:border-transparent transition-colors ${
                  errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-[color:var(--color-neutral-300)] bg-[color:var(--color-neutral-50)]"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-caption1 text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* New Password Field */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-body3 font-medium text-[color:var(--color-neutral-700)] mb-2"
              >
                Enter New Password
              </label>
              <div className="relative">
                <input
                  {...register("newPassword")}
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  placeholder="New Password"
                  className={`w-full px-4 focus:outline-none py-3 pr-12 rounded-lg border text-body2 focus:ring-2 focus:ring-[color:var(--color-brand-500)] focus:border-transparent transition-colors ${
                    errors.newPassword
                      ? "border-red-500 bg-red-50"
                      : "border-[color:var(--color-neutral-300)] bg-[color:var(--color-neutral-50)]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-[color:var(--color-neutral-500)] hover:text-[color:var(--color-neutral-700)] transition-colors"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-caption1 text-red-600">
                  {errors.newPassword.message}
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
                  className={`w-full px-4 py-3 pr-12 rounded-lg focus:outline-none border text-body2 focus:ring-2 focus:ring-[color:var(--color-brand-500)] focus:border-transparent transition-colors ${
                    errors.confirmPassword
                      ? "border-red-500 bg-red-50"
                      : "border-[color:var(--color-neutral-300)] bg-[color:var(--color-neutral-50)]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-[color:var(--color-neutral-500)] hover:text-[color:var(--color-neutral-700)] transition-colors"
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
              disabled={resetPasswordMutation.isPending}
              className="w-full cursor-pointer bg-[color:var(--color-brand-500)] text-white py-3 px-4 rounded-lg text-body2 font-semibold hover:bg-[color:var(--color-brand-600)] focus:ring-2 focus:ring-[color:var(--color-brand-500)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {resetPasswordMutation.isPending ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <a
              href="/login"
              className="text-body3 text-[color:var(--color-neutral-600)] hover:text-[color:var(--color-brand-500)] transition-colors"
            >
              ← Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
