/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  List,
  RotateCcw,
  ChevronDown,
  User,
  LogOut,
  CheckSquare,
  LoaderPinwheel,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { useCurrentUser, useLogout } from "@/hooks/useAuth";

const DashboardHeader = () => {
  const { data: user } = useCurrentUser();
  const { mutate: logout } = useLogout();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative min-h-[340px] bg-gradient-to-br from-teal-800 via-gray-950 to-teal-900 overflow-hidden">
      <header className="w-full max-w-[1440px] mx-auto">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>

        {/* Navigation Header */}
        <nav className="relative z-10 px-4 sm:px-6 lg:px-0">
          <div className="flex items-center justify-between py-4">
            {/* Left Side - Logo */}
            <div className="flex items-center">
              <Link href={"/"}>
                <div className="flex items-center cursor-pointer space-x-3">
                  <div className="bg-white/40 p-2 rounded-lg shadow-sm">
                    <CheckSquare className="h-6 w-6 text-[color:var(--color-brand-500)]" />
                  </div>
                  <h1 className="text-heading2 font-bold text-white">Tasky</h1>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {/* Spin Navigation */}
              <Link href={"/dashboard"}>
                <div className="flex items-center bg-white/10 space-x-2 px-3 py-2 hover:bg-white/30 rounded-lg transition-colors cursor-pointer">
                  <ClipboardList className="text_pri" />
                  <span className="hidden lg:flex text-white/80 text-sm font-medium">
                    Task Lists
                  </span>
                </div>
              </Link>
              <Link href={"/spin-wheel"}>
                <div className="flex items-center bg-white/10 space-x-2 px-3 py-2 hover:bg-white/30 rounded-lg transition-colors cursor-pointer">
                  <LoaderPinwheel className="text_pri" />
                  <span className="text-white/80 text-sm font-medium">
                    Spin
                  </span>
                </div>
              </Link>
            </div>

            {/* Right Side - Navigation and User */}
            <div className="flex items-center space-x-4">
              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 bg-white/15 rounded-lg backdrop-blur-sm border border-white/20 cursor-pointer hover:bg-white/20 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#00cc7d] to-teal-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.data?.fullName?.[0]}
                    </span>
                  </div>
                  <span className="text-white text-sm font-medium hidden sm:inline-block">
                    {user?.data?.fullName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-white/80" />
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="flex items-center cursor-pointer gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side Illustration */}
          <div className="absolute top-24 right-8 hidden lg:block">
            <div className="relative w-64 h-32">
              <div className="absolute top-4 right-8 w-16 h-16 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 transform rotate-12">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-400/30 rounded"></div>
                </div>
              </div>
              <div className="absolute top-8 left-4 w-12 h-12 bg-orange-400/20 rounded-lg backdrop-blur-sm border border-orange-300/20 transform -rotate-6">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-orange-400/50 rounded"></div>
                </div>
              </div>
              <div className="absolute bottom-2 right-12 w-10 h-10 bg-teal-400/20 rounded-full backdrop-blur-sm border border-teal-300/20">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-teal-400/50 rounded-full"></div>
                </div>
              </div>

              <div className="absolute top-8 left-8 w-20 h-0.5 bg-gradient-to-r from-white/30 to-transparent transform rotate-12"></div>
              <div className="absolute top-16 right-16 w-16 h-0.5 bg-gradient-to-l from-white/30 to-transparent transform -rotate-45"></div>

              <div className="absolute top-2 left-12 w-2 h-2 bg-white/40 rounded-full"></div>
              <div className="absolute top-6 right-20 w-1.5 h-1.5 bg-emerald-300/60 rounded-full"></div>
              <div className="absolute bottom-6 left-8 w-2.5 h-2.5 bg-orange-300/40 rounded-full"></div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <div className="mt-10 p-4 lg:p-0">
          <h4 className="text_pri font-bold lg:text-2xl text-xl">
            {"Hi "}
            {user?.data?.fullName}
          </h4>
          <h3 className="text-gray-100 lg:text-4xl text-2xl font-bold mt-4">
            Welcome to Dashboard
          </h3>
        </div>
      </header>
    </div>
  );
};

export default DashboardHeader;
