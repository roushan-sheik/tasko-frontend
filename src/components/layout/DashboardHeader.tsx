import React from "react";
import { Clock, List, RotateCcw, ChevronDown } from "lucide-react";
import Link from "next/link";

const DashboardHeader = () => {
  return (
    <div className="relative min-h-[340px] bg-gradient-to-br from-teal-800 via-gray-950 to-teal-900 overflow-hidden">
      <header className="w-[1440px] mx-auto">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        </div>

        {/* Navigation Header */}
        <nav className="relative z-10 px-4 sm:px-6 lg:p-0">
          <div className="flex items-center justify-between py-4">
            {/* Left Side - Brand and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Brand */}
              <Link href={"/dashboard"}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-semibold text-lg">
                    Tasko
                  </span>
                </div>
              </Link>

              {/* Navigation Items */}
              <nav className="hidden md:flex items-center space-x-6">
                <div className="flex items-center space-x-2 px-3 py-2 bg-white/15 rounded-lg backdrop-blur-sm border border-white/20">
                  <List className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">
                    Task List
                  </span>
                </div>

                <div className="flex items-center space-x-2 px-3 py-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
                  <RotateCcw className="w-4 h-4 text-white/80" />
                  <span className="text-white/80 text-sm font-medium">
                    Spin
                  </span>
                </div>
              </nav>
            </div>

            {/* Right Side - User Profile */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-white/15 rounded-lg backdrop-blur-sm border border-white/20 cursor-pointer hover:bg-white/20 transition-colors">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">T</span>
              </div>
              <span className="text-white text-sm font-medium hidden sm:block">
                Thomas M.
              </span>
              <ChevronDown className="w-4 h-4 text-white/80" />
            </div>
          </div>

          {/* Illustration Area - Right Side */}
          <div className="absolute top-24 right-8 hidden lg:block">
            <div className="relative w-64 h-32">
              {/* Illustration elements matching the Figma design */}
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

              {/* Connecting lines */}
              <div className="absolute top-8 left-8 w-20 h-0.5 bg-gradient-to-r from-white/30 to-transparent transform rotate-12"></div>
              <div className="absolute top-16 right-16 w-16 h-0.5 bg-gradient-to-l from-white/30 to-transparent transform -rotate-45"></div>

              {/* Small dots */}
              <div className="absolute top-2 left-12 w-2 h-2 bg-white/40 rounded-full"></div>
              <div className="absolute top-6 right-20 w-1.5 h-1.5 bg-emerald-300/60 rounded-full"></div>
              <div className="absolute bottom-6 left-8 w-2.5 h-2.5 bg-orange-300/40 rounded-full"></div>
            </div>
          </div>
        </nav>

        {/* hero  */}
        <div className="mt-10 p-4 lg:p-0">
          <h4 className=" text_pri font-bold lg:text-2xl text-xl">Hi Thomas</h4>
          <h3 className="text-gray-100 lg:text-4xl text-2xl font-bold  mt-4">
            Welcome to Dashboard
          </h3>
        </div>
      </header>
    </div>
  );
};

export default DashboardHeader;
