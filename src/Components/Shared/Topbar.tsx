import { BarsOutlined } from "@ant-design/icons";
// import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
// import { FaBell, FaRegBell } from "react-icons/fa6";

// const notifications = [
//   {
//     id: 1,
//     message: "You have a new notification",
//     time: "Fri, 12:30pm",
//   },
//   {
//     id: 2,
//     message: "You have a new notification",
//     time: "Fri, 12:30pm",
//   },
//   {
//     id: 3,
//     message: "You have a new notification",
//     time: "Fri, 12:30pm",
//   },
//   {
//     id: 4,
//     message: "You have a new notification",
//     time: "Fri, 12:30pm",
//   },
//   {
//     id: 5,
//     message: "You have a new notification",
//     time: "Fri, 12:30pm",
//   },
// ];

const Topbar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const user = JSON.parse(localStorage.getItem("user_data") || "null");

  // const handleMenuClick = () => {
  //   setCollapsed(false);
  // };

  // // const notificationMenu = (
  //   <div
  //     className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg"
  //
  //     onClick={handleMenuClick}
  //   >
  //     {notifications.map((notification) => (
  //       <div className="test-start" key={notification.id}>
  //         <div className="flex items-center gap-2">
  //           <div className="bg-[#EAECFE] p-2 rounded">
  //             <FaRegBell className="text-secondary-color" />
  //           </div>
  //           <div className="flex flex-col items-start">
  //             <p>{notification.message}</p>
  //             <p className="text-gray-400">{notification.time}</p>
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //     <Link
  //       to={`/${user?.role}/notifications`}
  //       className="w-2/3 mx-auto !bg-secondary-color !text-primary-color rounded-xl h-8 py-1"
  //     >
  //       See More
  //     </Link>
  //   </div>
  // );
  return (
    <div className="py-2  flex justify-between gap-0 items-center">
      <div className="flex items-center gap-2 text-base-color ">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl text-primary-color"
        />
      </div>
      <div className="flex items-center justify-center  gap-5">
        {/* <Dropdown
          overlay={notificationMenu}
          trigger={["hover"]}
          placement="bottomRight"
          className="cursor-pointer"
        >
          <FaBell className="text-2xl text-secondary-color" />
        </Dropdown> */}
        <Link to="profile">
          <div className="flex items-center gap-2">
            <img
              src={AllImages.profile}
              alt="profile_pic"
              style={{ width: "40px", height: "40px" }}
              className="rounded-full border border-secondary-color"
            />
            <p className="text-sm sm:text-base lg:text-lg font-medium text-base-color">
              John Doe
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Topbar;
