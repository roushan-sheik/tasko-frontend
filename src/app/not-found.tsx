"use client";
import React from "react";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Main 404 Illustration Container */}
        <div className="relative mb-8">
          {/* Background Circle */}
          <div className="w-80 h-80 mx-auto bg-gradient-to-br from-green-200 to-emerald-300 rounded-full relative overflow-hidden">
            {/* Large 404 Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-black text-gray-800 opacity-20">
                404
              </span>
            </div>

            {/* Cat Character */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="relative">
                {/* Cat Body */}
                <div className="w-16 h-20 bg-white rounded-full relative">
                  {/* Cat Head */}
                  <div className="w-14 h-14 bg-white rounded-full absolute -top-6 left-1/2 transform -translate-x-1/2 border-2 border-gray-300">
                    {/* Ears */}
                    <div className="absolute -top-2 left-2 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-green-400"></div>
                    <div className="absolute -top-2 right-2 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-green-400"></div>

                    {/* Eyes */}
                    <div className="absolute top-4 left-3 w-2 h-2 bg-black rounded-full"></div>
                    <div className="absolute top-4 right-3 w-2 h-2 bg-black rounded-full"></div>

                    {/* Nose */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full"></div>

                    {/* Mouth */}
                    <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-3 h-1 border-b-2 border-gray-600 rounded-b-full"></div>
                  </div>

                  {/* Cat Stripes */}
                  <div className="absolute top-2 left-2 w-2 h-8 bg-green-400 rounded-full opacity-60"></div>
                  <div className="absolute top-2 right-2 w-2 h-8 bg-green-400 rounded-full opacity-60"></div>

                  {/* Cat Paws */}
                  <div className="absolute -bottom-1 left-2 w-3 h-3 bg-white rounded-full border border-gray-300"></div>
                  <div className="absolute -bottom-1 right-2 w-3 h-3 bg-white rounded-full border border-gray-300"></div>
                </div>

                {/* Cat Tail */}
                <div className="absolute top-8 -right-4 w-8 h-3 bg-white border border-gray-300 rounded-full transform rotate-45"></div>
              </div>
            </div>

            {/* Yarn Ball */}
            <div className="absolute bottom-16 left-12 animate-pulse">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full relative">
                <div className="absolute inset-1 border border-white rounded-full opacity-50"></div>
                <div className="absolute inset-2 border border-white rounded-full opacity-30"></div>
              </div>
            </div>

            {/* Plant */}
            <div className="absolute bottom-12 right-16 animate-sway">
              <div className="w-4 h-8 bg-gray-800 rounded-full"></div>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-3 h-6 bg-green-500 rounded-full transform -rotate-12"></div>
                <div className="w-3 h-6 bg-green-500 rounded-full transform rotate-12 absolute top-0 left-1"></div>
                <div className="w-3 h-6 bg-green-500 rounded-full absolute top-0 left-0.5"></div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 right-8 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-24 left-8 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute top-32 left-16 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h1 className="text-6xl font-black text-gray-800 mb-2">404</h1>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">OOPS...</h2>
          <p className="text-lg font-semibold text-gray-600 mb-4">
            PAGE NOT FOUND
          </p>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
            The page you're looking for seems to have wandered off like our
            curious cat friend. Don't worry, let's get you back on the right
            path!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/" className="block">
            <button className="w-full bg-gradient-to-r cursor-pointer from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2">
              <Home size={20} />
              <span>Back To Home</span>
            </button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full bg-white hover:bg-gray-50 cursor-pointer text-gray-700 font-semibold py-3 px-8 rounded-xl border-2 border-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Additional Links */}
        <div className="mt-8 text-sm text-gray-500">
          Need help?{" "}
          <Link
            href="/contact"
            className="text-green-500 hover:text-green-600 underline"
          >
            Contact Support
          </Link>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-10 left-10 w-4 h-4 bg-green-300 rounded-full animate-float opacity-60"></div>
      <div className="fixed top-20 right-20 w-2 h-2 bg-blue-300 rounded-full animate-float-delay opacity-60"></div>
      <div className="fixed bottom-20 left-20 w-3 h-3 bg-pink-300 rounded-full animate-float opacity-60"></div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes sway {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float-delay 4s ease-in-out infinite;
        }

        .animate-sway {
          animation: sway 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
