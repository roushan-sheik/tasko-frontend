import React from "react";

type SectionContainerProps = {
  children: React.ReactNode;
  containerWrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  containerInnerProps?: React.HTMLAttributes<HTMLDivElement>;
};

const SectionContainer = ({
  children,
  containerWrapperProps = {},
  containerInnerProps = {},
}: SectionContainerProps) => {
  return (
    <div
      className={`flex items-center justify-center mx-auto max-w-[1440px] w-full     ${
        containerWrapperProps.className || ""
      }`}
      {...containerWrapperProps}
    >
      <div
        className={`flex flex-col mx-auto lg:mt-14 mt-6 px-4 w-full ${
          containerInnerProps.className || ""
        }`}
        {...containerInnerProps}
      >
        {children}
      </div>
    </div>
  );
};

export default SectionContainer;
