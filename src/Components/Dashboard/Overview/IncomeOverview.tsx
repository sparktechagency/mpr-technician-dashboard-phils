import { useState } from "react";
import YearOption from "../../../utils/YearOption";
import Line_Chart from "../../Chart/LineChart";
import { useGetEarningsOverviewQuery } from "../../../redux/features/overview/overviewApi";
import { FadeLoader } from "react-spinners";

const IncomeOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { data, isFetching } = useGetEarningsOverviewQuery({ year });

  const earningsData = data?.data;

  if (isFetching) {
    return (
      <div className="flex justify-center items-center w-full h-full min-h-40">
        <FadeLoader color="#fff" />
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-transparent rounded-lg flex flex-col  my-10 mb-16 border border-[#B0B0B0]">
      <div className="flex justify-between items-center text-base-color">
        <div className="flex items-center gap-10 mb-4">
          <p className="text-xl sm:text-2xl lg:text-3xl  text-[#B0B0B0] font-bold ">
            Analytics
          </p>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-secondary-color"></div>
            <p className="text-sm sm:text-base lg:text-lg text-secondary-color font-semibold">
              In progress{" "}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary-color"></div>
            <p className="text-sm sm:text-base lg:text-lg text-primary-color font-semibold">
              Completed{" "}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <YearOption currentYear={currentYear} year={year} setThisYear={setYear} />
          </div>
        </div>
      </div>
      <p className="text-lg sm:text-xl lg:text-2xl  text-base-color/80 mb-10">
        Overall Service
      </p>
      <div>
        <Line_Chart earningsData={earningsData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
