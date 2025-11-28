"use client";
import { Form } from "antd";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReuseButton from "../../ui/Button/ReuseButton";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import {
  useResendForgetOTPMutation,
  useSignUpOtpVerifyMutation,
} from "../../redux/features/auth/authApi";

const SignupOtpVerify = () => {
  const [form] = Form.useForm();
  const router = useNavigate();
  const [otp, setOtp] = useState("");

  const [otpMatch] = useSignUpOtpVerifyMutation();
  const [resendOtp] = useResendForgetOTPMutation();

  const handleOTPSubmit = async () => {
    if (otp.length === 4) {
      const res = await tryCatchWrapper(
        otpMatch,
        { body: { otp: otp } },
        "Verifying..."
      );
      if (res?.statusCode === 200) {
        setOtp("");
        router("/sign-in");
      }
    }
  };

  const handleResendOtp = async () => {
    await tryCatchWrapper(
      resendOtp,
      {
        body: {
          purpose: "email-verification", // "reset-password" | "forget-password"
        },
      },
      "Sending OTP..."
    );
  };

  return (
    <div className="text-base-color flex flex-col items-center justify-center min-h-screen  gap-5">
      <Container className="z-10">
        <div className="w-full sm:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto ">
          <div className="w-full sm:w-[70%] lg:w-full mx-auto">
            <div className=" mt-5 mb-8">
              <h1 className="text-3xl lg:text-4xl font-semibold text-secondary-color mb-5">
                Verify OTP
              </h1>
              <p className="text-xl lg:text-2xl font-medium mb-2 text-base-color/90">
                Please check your email. We have sent a code to contact on your
                email
                {/* {forgottenEmail} */}
              </p>
            </div>

            <Form
              form={form}
              onFinish={handleOTPSubmit}
              layout="vertical"
              className="bg-transparent w-full"
            >
              <Form.Item className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[35px] !h-[40px] sm:!w-[60px] sm:!h-[70px] text-[20px] sm:text-[30px] !bg-primary-color/0 border !border-secondary-color/80
                      rounded-lg mr-[10px] sm:mr-[20px] !text-base-color "
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>

              <ReuseButton
                variant="secondary"
                htmlType="submit"
                className="!py-6 !px-9 !text-base sm:!text-lg lg:!text-xl !rounded-xl"
                // icon={allIcons.arrowRight}
              >
                Verify OTP
              </ReuseButton>
            </Form>
            <div className="flex justify-center gap-2 py-1 mt-5">
              <p>Didn’t receive code?</p>
              <p
                onClick={handleResendOtp}
                className="!text-secondary-color !underline font-semibold cursor-pointer"
              >
                Click to resend
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignupOtpVerify;
