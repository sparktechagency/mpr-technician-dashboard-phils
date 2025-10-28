import { Link } from "react-router-dom";

const activities = [
  {
    id: "1",
    activity: "New user has joined in your application.",
    time: "2:00 PM",
  },
  {
    id: "2",
    activity: "New user has joined in your application.",
    time: "2:00 PM",
  },
  {
    id: "3",
    activity: "New user has joined in your application.",
    time: "2:00 PM",
  },
  {
    id: "4",
    activity: "New user has joined in your application.",
    time: "2:00 PM",
  },
  {
    id: "5",
    activity: "New user has joined in your application.",
    time: "2:00 PM",
  },
  {
    id: "6",
    activity: "New user has joined in your application.",
    time: "2:00 PM",
  },
  {
    id: "7",
    activity: "New user has joined in your application.",
    time: "3:00 PM",
  },
  {
    id: "8",
    activity: "New user has joined in your application.",
    time: "3:30 PM",
  },
  {
    id: "9",
    activity: "New user has joined in your application.",
    time: "4:00 PM",
  },
  {
    id: "10",
    activity: "New user has joined in your application.",
    time: "4:15 PM",
  },
  {
    id: "11",
    activity: "New user has joined in your application.",
    time: "5:00 PM",
  },
  {
    id: "12",
    activity: "New user has joined in your application.",
    time: "5:30 PM",
  },
  {
    id: "13",
    activity: "New user has joined in your application.",
    time: "6:00 PM",
  },
  {
    id: "14",
    activity: "New user has joined in your application.",
    time: "6:15 PM",
  },
  {
    id: "15",
    activity: "New user has joined in your application.",

    time: "6:30 PM",
  },
];

const RecentNotification = () => {
  const user = JSON.parse(localStorage.getItem("user_into") || "null");
  return (
    <div
      className="w-full max-h-[300px] xl:max-h-[600px] overflow-y-auto  rounded-xl relative"
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className="flex justify-between items-center sticky top-0 p-5 bg-white z-10">
        <h1 className="text-xl font-semibold">Recent Activity</h1>
        <Link to={`/${user?.role}/notifications`}>
          <p className="cursor-pointer text-[#898c8d] underline ">View all</p>
        </Link>
      </div>

      <div className="flex flex-col gap-5 p-5">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-start gap-2">
            <div>
              <p className="text-[#242424] text-base font-medium">
                {activity.activity}
              </p>

              <p className="text-sm text-[#8A8D8E] mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNotification;
