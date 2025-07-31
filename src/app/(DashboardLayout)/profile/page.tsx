"use client";
import { useCurrentUser } from "@/hooks/useAuth";
import React from "react";
import { User, Mail, Settings, Edit3 } from "lucide-react";

const Profile = () => {
  const { data: user, isLoading, error } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">Error loading profile</div>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const userData = user?.data;

  return (
    <div className="min-h-screen rounded-2xl mb-20 bg-gray-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Main Profile Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#00cc7d] to-teal-800 px-6 sm:px-8 py-8 sm:py-12">
            <div className="text-center">
              {/* Profile Avatar */}
              <div className="mx-auto h-20 w-20 sm:h-24 sm:w-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                <User className="h-10 w-10 sm:h-12 sm:w-12 text-gray-600" />
              </div>

              {/* User Info */}
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {userData?.fullName || "User Profile"}
              </h1>
              <p className="text-blue-100 text-sm sm:text-base">
                Professional Account
              </p>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 sm:px-8 py-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Account Information
                </h2>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Edit3 className="h-5 w-5" />
                </button>
              </div>

              {/* Username/Name Field */}
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Full Name
                    </label>
                    <p className="text-base sm:text-lg font-medium text-gray-900 break-words">
                      {userData?.fullName || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-sm font-medium text-gray-500 mb-1">
                      Email Address
                    </label>
                    <p className="text-base sm:text-lg font-medium text-gray-900 break-all">
                      {userData?.email || "email@example.com"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button className="flex-1 cursor-pointer flex items-center justify-center px-6 py-3 bg_pri text-white font-medium rounded-lg hover:bg-teal-800 transition-colors">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
              <button className="flex-1 cursor-pointer flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-white shadow-lg rounded-xl p-6 sm:p-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Profile Status
            </h3>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Active
            </div>
            <p className="text-gray-600 mt-4 text-sm sm:text-base">
              Your profile is set up and ready to use. Update your information
              anytime to keep it current.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
