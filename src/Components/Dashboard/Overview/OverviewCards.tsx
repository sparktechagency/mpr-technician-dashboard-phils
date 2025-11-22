import { MdOutlinePendingActions } from "react-icons/md";
import { BsFillClipboardCheckFill } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { useGetOrderStatusQuery } from "../../../redux/features/overview/overviewApi";
import { MdTrendingUp } from "react-icons/md";
import { MdTrendingDown } from "react-icons/md";
import { MdOutlineTrendingFlat } from "react-icons/md";
import ReuseSelect from "../../../ui/Form/ReuseSelect";
import { ConfigProvider, Form } from "antd";
import SkeletonCard from "./SkeletonCard";

const OverviewCards = () => {
  const [form] = Form.useForm();
  const timeFrame = Form.useWatch("timeframe", form) || "today";
  const { data, isFetching } = useGetOrderStatusQuery({
    period: timeFrame || "today",
  });
  const statusData = data?.data;
  const countData = [
    {
      id: 1,
      color: "#FF7B00",
      name: "Pending",
      icon: (
        <div className="flex items-center justify-between p-3 bg-[#FF7B0044] rounded-3xl w-fit mb-2">
          <MdOutlinePendingActions className="size-8 text-[#FF7B00]" />
        </div>
      ),
      count: statusData?.pending?.count,
      direction: statusData?.pending?.trend?.direction,
      percent: statusData?.pending?.trend?.percent,
      description: statusData?.pending?.trend?.text,
    },
    {
      id: 2,
      color: "#6226EF",
      name: "In Progress",
      icon: (
        <div className="flex items-center justify-between p-3 bg-[#6226EF44] rounded-2xl w-fit mb-2">
          <GiSandsOfTime className="size-8 text-[#6226EF]" />
        </div>
      ),
      count: statusData?.inprogress?.count,
      direction: statusData?.inprogress?.trend?.direction,
      percent: statusData?.inprogress?.trend?.percent,
      description: statusData?.inprogress?.trend?.text,
    },
    {
      id: 3,
      color: "#00B69B",
      name: "Completed",
      icon: (
        <div className="flex items-center justify-between p-3 bg-[#00B69B44] rounded-3xl w-fit mb-2">
          <BsFillClipboardCheckFill className="size-8 text-[#00B69B]" />
        </div>
      ),
      count: statusData?.completed?.count,
      direction: statusData?.completed?.trend?.direction,
      percent: statusData?.completed?.trend?.percent,
      description: statusData?.completed?.trend?.text,
    },
  ];

  return (
    <div>
      <Form
        form={form}
        className="flex justify-end"
        initialValues={{ timeframe: "today" }}
      >
        <ConfigProvider
          theme={{
            components: {
              Select: {
                colorTextQuaternary: "#fff",
                fontSize: 16,
                borderRadius: 10,
                colorBorder: "#AA8FFF00",
                colorText: "#fff",
                colorIcon: "#fff",
                colorBgContainer: "rgba(0,0,0,0)",
                colorBgElevated: "#2c2c2c",
                selectorBg: "#AA8FFF00",
                colorTextPlaceholder: "#2c2c2c",
              },
            },
          }}
        >
          <ReuseSelect
            name="timeframe"
            options={[
              { value: "today", label: "Today" },
              { value: "week", label: "Last 7 Days" },
              { value: "month", label: "Last 30 Days" },
            ]}
            selectClassName="!w-40"
          />
        </ConfigProvider>
      </Form>
      <div className="flex flex-row flex-wrap gap-10 lg:gap-20 mb-5 ">
        {isFetching
          ? [1, 2, 3].map((i) => <SkeletonCard key={i} />)
          : countData.map((item) => (
              <div
                key={item.id}
                className={`flex  rounded-2xl w-full my-2 lg:my-0 flex-1 border border-[#E1E1E1] p-7 text-base-color`}
                style={{
                  boxShadow: "0px 0px 3px 0.5px #00000010",
                }}
              >
                <div className="!w-full flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className="text-sm sm:text-base lg:text-lg  font-semibold mb-1  tracking-tight text-nowrap px-3 py-1 rounded-md w-fit"
                      style={{
                        color: item?.color,
                        backgroundColor: item?.color + "44",
                      }}
                    >
                      {item.name}
                    </p>
                    {item?.icon}
                  </div>

                  <p className="text-xl sm:text-2xl lg:text-3xl text-base-color font-semibold capitalize">
                    {item.count}
                  </p>

                  <div className="space-y-1 text-base mt-2">
                    <div className="flex items-center gap-1">
                      {item.direction === "up" ? (
                        <MdTrendingUp className="text-success-color" />
                      ) : item.direction === "down" ? (
                        <MdTrendingDown className="text-error-color" />
                      ) : (
                        <MdOutlineTrendingFlat className="text-gray-500" />
                      )}{" "}
                      <span
                        className={`${
                          item.direction === "up"
                            ? "text-success-color"
                            : item.direction === "down"
                            ? "text-error-color"
                            : "text-gray-500"
                        }`}
                      >
                        {item.percent}%
                      </span>{" "}
                    </div>
                    <span>{item.description}</span>
                  </div>
                </div>
              </div>
            ))}

        {/* Company  */}
      </div>
    </div>
  );
};

export default OverviewCards;
