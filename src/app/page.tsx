"use client";
import React from "react";
import { CheckSquare, TrendingUp, FolderOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import { useCurrentUser } from "@/hooks/useAuth";

const HomePage = () => {
  const { data: user } = useCurrentUser();
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[color:var(--color-brand-50)] to-[color:var(--color-neutral-50)]">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className="text-display2 sm:text-display1 font-bold mb-8 leading-tight">
              Welcome to Tasky
            </h1>

            {/* Subtitle */}
            <p className="text-body1 sm:text-heading3 max-w-3xl mx-auto mb-12 text-[color:var(--color-neutral-600)]">
              Your personal task management solution. Organize, prioritize, and
              accomplish your goals with ease.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link href={`${user ? "/dashboard" : "/login"}`}>
                <button className="cursor-pointer group bg-[color:var(--color-brand-500)] text-white px-8 py-4 rounded-lg text-body1 font-semibold hover:bg-[color:var(--color-brand-600)] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 w-full sm:w-auto">
                  GET STARTED
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </Link>
              {!user && (
                <div>
                  <Link href={"/login"}>
                    <button className="cursor-pointer bg-white text-[color:var(--color-brand-500)] px-8 py-4 rounded-lg text-body1 font-semibold border-2 border-[color:var(--color-brand-500)] hover:bg-[color:var(--color-brand-50)] transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto">
                      LOGIN
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Organize Tasks Card */}
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-[color:var(--color-neutral-200)]">
                <div className="bg-[color:var(--color-brand-100)] p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:bg-[color:var(--color-brand-200)] transition-colors duration-300">
                  <CheckSquare className="h-8 w-8 text-[color:var(--color-brand-600)]" />
                </div>
                <h3 className="text-heading2 font-bold mb-4">Organize Tasks</h3>
                <p className="text-body2 text-[color:var(--color-neutral-600)] leading-relaxed">
                  Create, edit, and organize your tasks efficiently with our
                  intuitive interface.
                </p>
              </div>

              {/* Track Progress Card */}
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-[color:var(--color-neutral-200)]">
                <div className="bg-[color:var(--color-brand-100)] p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:bg-[color:var(--color-brand-200)] transition-colors duration-300">
                  <TrendingUp className="h-8 w-8 text-[color:var(--color-brand-600)]" />
                </div>
                <h3 className="text-heading2 font-bold mb-4">Track Progress</h3>
                <p className="text-body2 text-[color:var(--color-neutral-600)] leading-relaxed">
                  Mark tasks as complete and track your productivity over time.
                </p>
              </div>

              {/* Manage Categories Card */}
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-[color:var(--color-neutral-200)]">
                <div className="bg-[color:var(--color-brand-100)] p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:bg-[color:var(--color-brand-200)] transition-colors duration-300">
                  <FolderOpen className="h-8 w-8 text-[color:var(--color-brand-600)]" />
                </div>
                <h3 className="text-heading2 font-bold mb-4">
                  Manage Categories
                </h3>
                <p className="text-body2 text-[color:var(--color-neutral-600)] leading-relaxed">
                  Organize tasks with completed and trash sections for better
                  management.
                </p>
              </div>
            </div>
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-[color:var(--color-brand-200)] rounded-full blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-[color:var(--color-brand-300)] rounded-full blur-2xl opacity-50 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[color:var(--color-brand-100)] rounded-full blur-lg opacity-60 animate-bounce delay-500"></div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
