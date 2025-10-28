import { useState } from "react";
import ProfileTap from "../../../Components/Dashboard/Profile/ProfileTap";
import EditProfile from "../../../Components/Dashboard/Profile/EditProfile";
import ChangePassword from "../../../Components/Dashboard/Profile/ChangePassword";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"editProfile" | "changePassword">(
    "editProfile"
  );

  return (
    <div className=" min-h-[90vh] p-10  rounded-xl">
      <ProfileTap activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "editProfile" ? <EditProfile /> : <ChangePassword />}
    </div>
  );
};
export default Profile;
