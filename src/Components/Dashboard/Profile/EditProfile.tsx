/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Typography, Upload } from "antd";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { AllImages } from "../../../../public/images/AllImages";
import ReuseButton from "../../../ui/Button/ReuseButton";

const EditProfile = () => {
  const profileData = {
    fullname: "James Mitchell",
    email: "emily@gmail.com",
    address: "Vancouver, BC VG1Z4, Canada",
    contactNumber: "+99-01846875456",
  };

  const [imageUrl, setImageUrl] = useState(AllImages.profile);

  const handleImageUpload = (info: any) => {
    if (info.file.status === "removed") {
      setImageUrl(AllImages.profile); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    console.log(imageUrl);
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-base-color font-integralcf my-5 mb-16">
        Edit Profile
      </h1>
      <div className=" lg:w-[70%] mx-auto">
        <Form
          onFinish={onFinish}
          layout="vertical"
          className="bg-transparent py-10 text-base-color w-full "
        >
          <div className="mt-5 flex flex-col justify-start items-start gap-x-4">
            <div className=" relative">
              <img
                className="h-40 w-40 relative rounded-full border border-secondary-color/10 object-contain"
                src={imageUrl}
                alt=""
              />
              <Form.Item name="image">
                <Upload
                  customRequest={(options) => {
                    setTimeout(() => {
                      if (options.onSuccess) {
                        options.onSuccess("ok");
                      }
                    }, 1000);
                  }}
                  onChange={handleImageUpload}
                  maxCount={1}
                  accept="image/*"
                  listType="text"
                  className="absolute -top-10 !right-3 text-end"
                >
                  <Button
                    style={{
                      zIndex: 1,
                    }}
                    className=" !py-2 !px-1.5 w-fit h-fit !rounded-full shadow !text-secondary-color !border-secondary-color !bg-[#EFEFEF]"
                  >
                    <IoCameraOutline
                      className="w-5 h-5 !text-secondary-color"
                      style={{ color: "#19363D" }}
                    />
                  </Button>
                </Upload>
              </Form.Item>
            </div>
            <p className="text-5xl font-semibold -mt-5 text-secondary-color">
              James Mitchell
            </p>
          </div>

          <div className=" text-white mt-5">
            <Typography.Title level={5} style={{ color: "#fff" }}>
              Email
            </Typography.Title>
            <Form.Item
              initialValue={profileData.email}
              name="email"
              className="text-white "
            >
              <Input
                suffix={<MdOutlineEdit />}
                type="email"
                placeholder="Enter your email"
                className="!py-2.5 px-3 text-xl !text-base-color !bg-transparent !border !border-base-color"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#fff" }}>
              User Name
            </Typography.Title>
            <Form.Item
              initialValue={profileData.fullname}
              name="userName"
              className="text-white"
            >
              <Input
                suffix={<MdOutlineEdit />}
                placeholder="Enter your Name"
                className="!py-2.5 px-3 text-xl !text-base-color !bg-transparent !border !border-base-color"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#fff" }}>
              Contact number
            </Typography.Title>
            <Form.Item
              initialValue={profileData.contactNumber}
              name="contactNumber"
              className="text-white"
            >
              <Input
                suffix={<MdOutlineEdit />}
                placeholder="Enter your Contact number"
                className="!py-2.5 px-3 text-xl !text-base-color !bg-transparent !border !border-base-color"
              />
            </Form.Item>
            <Form.Item>
              <ReuseButton variant="secondary" htmlType="submit">
                Save & Change
              </ReuseButton>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default EditProfile;
