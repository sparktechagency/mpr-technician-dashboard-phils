import YearOption from "../../../utils/YearOption";
import { useState } from "react";
import { ConfigProvider, Select } from "antd";

const UserOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  console.log(year);
  return (
    <div
      className="w-full lg:w-1/2 p-3 bg-[#FFFFFF] rounded-lg"
      style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
    >
      <div className="flex justify-between items-center text-base-color my-5">
        <p className="text-lg sm:text-xl lg:text-2xl  text-base-color font-bold ">
          User Overview
        </p>
        <div className="flex items-center gap-2">
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  colorTextQuaternary: "#F9FAFB",
                  fontSize: 14,
                  borderRadius: 10,
                  colorBorder: "#AA8FFF",
                  colorText: "#2c2c2c",
                  colorIcon: "#2c2c2c",
                  colorBgContainer: "rgba(0,0,0,0)",
                  colorBgElevated: "#FFFFFF",
                  selectorBg: "#AA8FFF",
                  colorTextPlaceholder: "#F9FAFB",
                },
              },
            }}
          >
            <Select
              className="custom-select"
              placeholder="Select User"
              style={{ width: 150 }}
              defaultValue={"provider"}
            >
              <Select.Option value="provider">Providers </Select.Option>
              <Select.Option value="contractor">Contractors</Select.Option>
            </Select>
          </ConfigProvider>
          <div>
            <YearOption currentYear={currentYear} setThisYear={setYear} />
          </div>
        </div>
      </div>
      {/* <div>
        <Area_Chart />
      </div> */}
    </div>
  );
};

export default UserOverview;
