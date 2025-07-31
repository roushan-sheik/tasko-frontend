import Header from "@/components/layout/Header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default layout;
