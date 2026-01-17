/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, FormInstance } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { AllImages } from "../../../public/images/AllImages";
import { useSignUpMutation } from "../../redux/features/auth/authApi";
import useUserData from "../../hooks/useUserData";
import { useEffect } from "react";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Cookies from "js-cookie";
import { RiLockPasswordFill } from "react-icons/ri";

const inputStructure = [
  {
    name: "name",
    type: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    labelClassName: "!font-medium",
    inputClassName: "!py-2",
    rules: [{ required: true, message: "Full Name is required" }],
  },
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
    name: "phone",
    type: "number",
    label: "Phone Number",
    placeholder: "Enter your Phone Number",
    labelClassName: "!font-medium",
    inputClassName: "!py-2",
    rules: [{ required: true, message: "Phone Number is required" }],
  },
  {
    name: "yearOfExperience",
    type: "number",
    label: "Year Of Experience",
    placeholder: "Enter your Year Of Experience",
    labelClassName: "!font-medium",
    inputClassName: "!py-2",
    rules: [{ required: true, message: "Year Of Experience is required" }],
  },
  {
    name: "specialties",
    type: "text",
    inputType: "textarea",
    label: "Specialties",
    placeholder: "Enter your Specialties",
    labelClassName: "!font-medium",
    inputClassName: "!py-2",
    rules: [{ required: true, message: "Specialties is required" }],
  },
  {
    name: "password",
    type: "password",
    inputType: "password",
    label: "Password",
    rows: 4,
    placeholder: "Enter your password",
    labelClassName: "!font-medium",
    inputClassName: "!py-2",
    rules: [{ required: true, message: "Password is required" }],
  },
  {
    name: "confirmPassword",
    type: "password",
    inputType: "password",
    label: "Confirm Password",
    placeholder: "Confirm your password",
    prefix: <RiLockPasswordFill className="mr-1" />,
    labelClassName: "!font-semibold",
    rules: [
      { required: true, message: "Confirm Password is required" },
      ({
        getFieldValue,
      }: {
        getFieldValue: FormInstance["getFieldValue"];
      }) => ({
        validator(_: unknown, value: string) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("Password does not match!"));
        },
      }),
    ],
  },
];

const SignUp = () => {
  const [form] = Form.useForm();
  const router = useNavigate();

  const [signup] = useSignUpMutation();

  const userExist = useUserData();

  useEffect(() => {
    if (userExist?.role === "admin") {
      router("/", { replace: true });
    }
  }, [router, userExist]);

  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      signup,
      { body: { name: values.name, email: values.email, phone: values.phone, yearOfExperience: values.yearOfExperience, specialties: values.specialties, password: values.password, role: "technician" } },
      "Signing Up..."
    );

    if (res?.statusCode === 200) {
      Cookies.set("mrt_tech_signUpToken", res?.data, {
        path: "/",
        expires: 365,
        secure: false,
      });
      form.resetFields();
      router("/sign-up/verify", { replace: true });
    }
  };

  return (
    <div className="!text-base-color min-h-screen flex items-center justify-center py-10">
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
              <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-semibold !text-base-color mb-5">
                  Tech Portal
                </h1>
                <p className="text-xl lg:text-2xl font-medium mb-2 !text-base-color/90">
                  Go to your repair dashboard
                </p>
                <p className="text-2xl lg:text-3xl font-medium mb-2 !text-base-color/90">
                  Sign Up
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
                  rows={input?.rows}
                  placeholder={input.placeholder}
                  labelClassName={input.labelClassName}
                  inputClassName={input.inputClassName}
                  rules={input.rules}
                />
              ))}
              <ReuseButton
                variant="secondary"
                htmlType="submit"
                className="!py-6 !px-9 !text-base sm:!text-lg lg:!text-xl !rounded-xl"
              >
                Sign Up
              </ReuseButton>
            </ReusableForm>
            <div className="mt-10 flex justify-center items-center gap-2">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="text-secondary-color font-semibold"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignUp;
