import DashboardHeader from "@/components/layout/DashboardHeader";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardHeader />
      <div>{children}</div>
    </div>
  );
};

export default layout;
