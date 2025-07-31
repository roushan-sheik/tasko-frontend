"use client";
import React, { useEffect, useState } from "react";
import { CheckSquare, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useAuth";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { mutate: logout } = useLogout();

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  // Logout handler
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="bg-[color:var(--color-brand-500)] shadow-lg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center cursor-pointer space-x-3">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <CheckSquare className="h-6 w-6 text-[color:var(--color-brand-500)]" />
              </div>
              <h1 className="text-heading2 font-bold text-white">Tasky</h1>
            </div>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link href={"/login"}>
                  <button className="text-body2 cursor-pointer text-white hover:text-[color:var(--color-brand-100)] transition-colors duration-200 hidden sm:flex items-center gap-1">
                    <LogIn className="h-4 w-4" />
                    Login
                  </button>
                </Link>
                <Link href={"/signup"}>
                  <button className="bg-white cursor-pointer text-[color:var(--color-brand-500)] px-4 py-2 rounded-md text-body2 font-medium hover:bg-[color:var(--color-neutral-50)] transition-colors duration-200 shadow-sm">
                    SignUp
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-body2 flex items-center gap-1 cursor-pointer text-white hover:text-[color:var(--color-brand-100)] transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
