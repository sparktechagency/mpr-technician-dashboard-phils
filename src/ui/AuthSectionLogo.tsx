"use client";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { AllImages } from "../../public/images/AllImages";

const AuthSectionLogo = ({
  skip = false,
  showLogo = false,
}: {
  skip?: boolean;
  showLogo?: boolean;
}) => {
  return (
    <div
      className={`${
        skip
          ? "hidden"
          : "block absolute top-5 left-5 bg-secondary-color rounded-full"
      }`}
    >
      {showLogo ? (
        <Link to="/">
          <img
            src={AllImages.logo}
            alt="Frafol Logo"
            width={1000}
            height={1000}
            className="w-40 h-auto"
          />
        </Link>
      ) : (
        <IoIosArrowRoundBack
          onClick={() => window.history.back()}
          className="text-3xl text-primary-color font-extrabold cursor-pointer"
        />
      )}
    </div>
  );
};

export default AuthSectionLogo;
