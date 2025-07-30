import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h3>Header</h3>
      <div>{children}</div>
      <h2>Footer</h2>
    </div>
  );
};

export default layout;
