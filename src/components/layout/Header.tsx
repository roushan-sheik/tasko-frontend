import React from "react";
import { CheckSquare } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[color:var(--color-brand-500)] shadow-lg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href={"/"}>
            <div className="flex items-center cursor-pointer space-x-3">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <CheckSquare className="h-6 w-6 text-[color:var(--color-brand-500)]" />
              </div>
              <h1 className="text-heading2 font-bold text-white">Tasky</h1>
            </div>
          </Link>

          {/* Navigation - Hidden on mobile, shown on desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-body2 text-white hover:text-[color:var(--color-brand-100)] transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-body2 text-white hover:text-[color:var(--color-brand-100)] transition-colors duration-200"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-body2 text-white hover:text-[color:var(--color-brand-100)] transition-colors duration-200"
            >
              About
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href={"/login"}>
              <button className="text-body2 cursor-pointer text-white hover:text-[color:var(--color-brand-100)] transition-colors duration-200 hidden sm:block">
                Login
              </button>
            </Link>
            <Link href={"/signup"}>
              <button className="bg-white  cursor-pointer text-[color:var(--color-brand-500)] px-4 py-2 rounded-md text-body2 font-medium hover:bg-[color:var(--color-neutral-50)] transition-colors duration-200 shadow-sm">
                SignUp
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
