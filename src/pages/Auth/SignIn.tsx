/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Checkbox, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { AllImages } from "../../../public/images/AllImages";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import useUserData from "../../hooks/useUserData";
import { useEffect } from "react";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Cookies from "js-cookie";
import { toast } from "sonner";

const inputStructure = [
  {
    name: "email",
    type: "email",
    inputType: "email",
    label: "Email",
    placeholder: "Enter your email",
    labelClassName: "!font-medium",
    inputClassName: "!py-2",
    rules: [{ required: true, message: "Email is required" }],
  },
  {
    name: "password",
    type: "password",
    inputType: "password",
    label: "Password",
    placeholder: "Enter your password",
    labelClassName: "!font-medium",
    inputClassName: "!py-2",
    rules: [{ required: true, message: "Password is required" }],
  },
];

const SignIn = () => {
  const [form] = Form.useForm();
  const router = useNavigate();

  const [login] = useLoginMutation();

  const userExist = useUserData();

  useEffect(() => {
    if (userExist?.role === "admin") {
      router("/", { replace: true });
    }
  }, [router, userExist]);

  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(login, { body: values }, "Logging In...");
    console.log(res?.data?.user?.role);
    if (res?.statusCode === 200 && res?.data?.user?.role === "technician") {
      Cookies.set("mrt_tech_accessToken", res?.data?.accessToken, {
        path: "/",
        expires: 365,
        secure: false,
      });
      form.resetFields();
      router("/", { replace: true });
      Cookies.remove("mrt_tech_signUpToken");
    } else if (
      res?.statusCode === 200 &&
      res?.data?.user?.role !== "technician"
    ) {
      form.resetFields();
      toast.error("Access Denied", {
        duration: 2000,
      });
    }
  };

  return (
    <div className="!text-base-color min-h-screen flex items-center justify-center">
      <Container className="z-10">
        <div className="w-full sm:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto flex flex-col items-center justify-items-center gap-5">
          <img
            src={AllImages.logo}
            alt="logo"
            className="w-[250px] object-cover"
          />
          <div className="w-full sm:w-[70%] lg:w-full mx-auto">
            {/* -------- Sign In Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mt-5 mb-8">
                <h1 className="text-3xl lg:text-4xl font-semibold !text-base-color mb-5">
                  Tech Portal
                </h1>
                <p className="text-xl lg:text-2xl font-medium mb-2 !text-base-color/90">
                  Please enter your email and password to continue.
                </p>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <ReusableForm form={form} handleFinish={onFinish}>
              {inputStructure.map((input, index) => (
                <ReuseInput
                  key={index}
                  name={input.name}
                  Typolevel={4}
                  inputType={input.inputType}
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  labelClassName={input.labelClassName}
                  inputClassName={input.inputClassName}
                  rules={input.rules}
                />
              ))}
              <div className="flex justify-between items-center text-base mt-10 mb-5">
                <Checkbox className="!!text-base-color">Remember me</Checkbox>
                <Link
                  to="/forgot-password"
                  className="!underline font-bold !text-secondary-color"
                >
                  Forgot Password?
                </Link>
              </div>
              <ReuseButton
                variant="secondary"
                htmlType="submit"
                className="!py-6 !px-9 !text-base sm:!text-lg lg:!text-xl !rounded-xl"
              >
                Sign In
              </ReuseButton>
            </ReusableForm>

            <div className="mt-10 flex justify-center items-center gap-2">
              haven't any account?{" "}
              <Link
                to="/sign-up"
                className="text-secondary-color font-semibold"
              >
                {" "}
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignIn;
