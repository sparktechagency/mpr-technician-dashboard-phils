/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Typography, Upload } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { AllImages } from "../../../../public/images/AllImages";
import ReuseButton from "../../../ui/Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { getImageUrl } from "../../../helpers/config/envConfig";
import Loading from "../../../ui/Loading";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/features/profile/profileApi";

const EditProfile = () => {
  const [form] = Form.useForm();
  const imageApiUrl = getImageUrl();
  const { data, isFetching } = useGetProfileQuery({});
  console.log(data);
  const [updateProfile] = useUpdateProfileMutation({});

  const profileData = data?.data;

  const profileImage =
    profileData?.profileImage?.length > 0
      ? imageApiUrl + profileData?.profileImage
      : AllImages.profile;

  const [imageUrl, setImageUrl] = useState(profileImage);

  useEffect(() => {
    setImageUrl(profileImage);
    form.setFieldsValue({
      email: profileData?.email,
      name: profileData?.name,
      phone: profileData?.phone,
      yearOfExperience: profileData?.yearOfExperience,
      specialties: profileData?.specialties,
    });
  }, [
    form,
    profileData?.email,
    profileData?.name,
    profileData?.phone,
    profileData?.specialties,
    profileData?.yearOfExperience,
    profileImage,
  ]);

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

  const onFinish = async (values: any) => {
    const formData = new FormData();
    if (values?.image?.file?.originFileObj) {
      formData.append("image", values?.image?.file?.originFileObj);
    }
    const data = {
      name: values?.name,
      phone: values?.phone,
      yearOfExperience: values?.yearOfExperience,
      specialties: values?.specialties,
    };
    formData.append("data", JSON.stringify(data));
    await tryCatchWrapper(
      updateProfile,
      { body: formData },
      "Updating Profile..."
    );
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[90vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-base-color font-integralcf my-5 mb-16">
        Edit Profile
      </h1>
      <div className=" lg:w-[70%] mx-auto">
        <Form
          form={form}
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
                  onChange={(info) => {
                    handleImageUpload(info);
                    console.log(info);
                    // Restrict file list to the first 10 images
                    if (info.fileList[0]?.name?.length > 10) {
                      info.fileList[0].name = info.fileList[0].name.slice(
                        0,
                        10
                      );
                    }
                  }}
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
            <Form.Item name="email" className="text-white ">
              <Input
                disabled
                suffix={<MdOutlineEdit />}
                type="email"
                placeholder="Enter your email"
                className="!py-2.5 px-3 text-xl !text-base-color !bg-transparent !border !border-base-color"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#fff" }}>
              Full Name
            </Typography.Title>
            <Form.Item name="name" className="text-white">
              <Input
                suffix={<MdOutlineEdit />}
                placeholder="Enter your Name"
                className="!py-2.5 px-3 text-xl !text-base-color !bg-transparent !border !border-base-color"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#fff" }}>
              Phone number
            </Typography.Title>
            <Form.Item name="phone" className="text-white">
              <Input
                type="number"
                suffix={<MdOutlineEdit />}
                placeholder="Enter your Contact number"
                className="!py-2.5 px-3 text-xl !text-base-color !bg-transparent !border !border-base-color"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#fff" }}>
              Year of Experience
            </Typography.Title>
            <Form.Item name="yearOfExperience" className="text-white">
              <Input
                type="number"
                suffix={<MdOutlineEdit />}
                placeholder="Enter your Experience"
                className="!py-2.5 px-3 text-xl !text-base-color !bg-transparent !border !border-base-color"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#fff" }}>
              Specialties
            </Typography.Title>
            <Form.Item name="specialties" className="text-white">
              <Input.TextArea
                rows={4}
                placeholder="Enter your Specialties"
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
