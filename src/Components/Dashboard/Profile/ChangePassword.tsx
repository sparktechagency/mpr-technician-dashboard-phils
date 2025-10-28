/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Typography } from "antd";
import ReuseButton from "../../../ui/Button/ReuseButton";

const ChangePassword = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
    localStorage.removeItem("user_data");
    window.location.reload();
  };
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-base-color font-integralcf my-5 mb-16">
        Change Password
      </h1>
      <div className="w-[70%] mx-auto">
        <Form
          onFinish={onFinish}
          layout="vertical"
          className="bg-transparent w-full"
        >
          <Typography.Title level={4} style={{ color: "#fff" }}>
            Current password
          </Typography.Title>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your current password!",
              },
            ]}
            name="currentPassword"
            className="text-white "
          >
            <Input.Password
              placeholder="Enter your password"
              className="!py-2.5 px-3 text-xl !text-base-color !bg-transparent !border !border-base-color"
            />
          </Form.Item>
          <Typography.Title level={4} style={{ color: "#fff" }}>
            New password
          </Typography.Title>
          <Form.Item
            rules={[
              { required: true, message: "Please enter your new password!" },
            ]}
            name="newPassword"
            className="text-white"
          >
            <Input.Password
              placeholder="Enter your password"
              className="!py-2.5 px-3 text-xl !text-base-color !bg-transparent !border !border-base-color"
            />
          </Form.Item>
          <Typography.Title level={4} style={{ color: "#fff" }}>
            Re-enter new Password
          </Typography.Title>
          <Form.Item
            name="reEnterPassword"
            className="text-white"
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="!py-2.5 px-3 text-xl !text-base-color !bg-transparent !border !border-base-color"
            />
          </Form.Item>

          <Form.Item>
            <ReuseButton variant="secondary" htmlType="submit">
              Change password
            </ReuseButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
