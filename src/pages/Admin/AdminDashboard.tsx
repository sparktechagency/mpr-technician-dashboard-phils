import IncomeOverview from "../../Components/Dashboard/Overview/IncomeOverview";
import OverviewCard from "../../Components/Dashboard/Overview/OverviewCards";
// import UserOverview from "../../Components/Dashboard/Overview/UserOverview";

const AdminDashboard = () => {
  return (
    <div>
      <>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-color font-integralcf capitalize">
          Overview
        </h1>
        <div className="my-5">
          <OverviewCard />
        </div>
        <div className="flex flex-col lg:flex-row gap-5 mt-8">
          {/* <UserOverview /> */}
          <IncomeOverview />
        </div>
      </>
    </div>
  );
};

export default AdminDashboard;
