import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaTools, FaUsersCog } from "react-icons/fa";

const OverviewCards = () => {
  const countData = [
    {
      id: 1,
      background: "#ffffff",
      name: "Total Service",
      icon: (
        <MdOutlineMiscellaneousServices className="size-7 text-base-color" />
      ),
      count: 1000,
    },
    {
      id: 2,
      background: "#ffffff",
      name: "Total Technicians",
      icon: <FaTools className="size-7 text-base-color" />,
      count: 800,
    },
    {
      id: 3,
      background: "#ffffff",
      name: "Technician Requests",
      icon: <FaUsersCog className="size-7 text-base-color" />,
      count: 1500,
    },
  ];
  return (
    <div className="flex flex-row flex-wrap gap-10 lg:gap-20 mb-5 ">
      {/* Company  */}
      {countData.map((item) => (
        <div
          key={item.id}
          className={`flex  rounded-2xl w-full my-2 lg:my-0 flex-1 border border-[#E1E1E1] p-6 text-base-color`}
          style={{
            boxShadow: "0px 0px 3px 0.5px #00000010",
          }}
        >
          <div className="!w-full flex flex-col items-center justify-center">
            <div className="flex items-center justify-between p-3 bg-[#B0B0B044] rounded-full w-fit mb-2">
              <div>{item?.icon}</div>
            </div>
            <p className="text-base sm:text-lg lg:text-xl  font-semibold mb-1  tracking-tight text-nowrap">
              {item.name}
            </p>
            <p className="text-2xl sm:text-3xl lg:text-4xl text-[#B0B0B0] font-bold capitalize">
              {item.count}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
