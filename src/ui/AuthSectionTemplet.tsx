import React from "react";
import AuthSectionLogo from "./AuthSectionLogo";

const AuthSectionTemplate = ({
  children,
  imageScr,
  skip = false,
  showLogo = false,
}: {
  children: React.ReactNode;
  imageScr: string;
  skip?: boolean;
  showLogo?: boolean;
}) => {
  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      <div className="relative">
        <img
          src={imageScr}
          alt="Auth Background"
          width={2000}
          height={2000}
          className="hidden lg:block w-full h-screen object-cover "
        />{" "}
        <AuthSectionLogo skip={skip} showLogo={showLogo} />
      </div>
      <div className=" overflow-y-auto">
        <div className="flex flex-col gap-5 h-full">{children}</div>
      </div>
    </div>
  );
};

export default AuthSectionTemplate;
