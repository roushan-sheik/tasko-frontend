import DashboardHeader from "@/components/layout/DashboardHeader";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <DashboardHeader />
      <div className="max-w-[1440px] w-full relative mx-auto ">
        <div className="h-screen">
          {/* Main content  */}
          <div className="mx-auto absolute w-full top-[-80px] p-4 lg:p-0">
            <div className="bg-white rounded-xl shadow-lg ">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
