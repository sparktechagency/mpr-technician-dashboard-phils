import { useState } from "react";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ReusableTabs from "../../utils/ReuseableTabs";
import ApplicationCard from "../../ui/Card/ApplicationCard";
import { Pagination } from "antd";
import MapModal from "../../ui/Modal/MapModal";
import {
  useCompleteOrderMutation,
  useGetAllOrderQuery,
  useGetAllPendingOrdersQuery,
} from "../../redux/features/order/orderApi";
import { IServiceRequest } from "../../types";
import { FadeLoader } from "react-spinners";
import ApproveModal from "../../ui/Modal/ApproveModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const AdminAllApplication = () => {
  const [completeOrder] = useCompleteOrderMutation();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState<string>("pending");

  const limit = 12;

  const { data: pendingData, isFetching } = useGetAllPendingOrdersQuery(
    {
      search: searchText,
      page,
      limit,
    },
    {
      skip: activeTab !== "pending",
      refetchOnMountOrArgChange: true,
    }
  );

  const pendingOrderData = pendingData?.data?.result;
  const totalPendingOrders = pendingData?.data?.meta?.total || 0;

  const {
    data: myOrders,
    isFetching: isInProgressFetching,
    refetch,
  } = useGetAllOrderQuery(
    {
      status: activeTab,
      search: searchText,
      page,
      limit,
    },
    {
      skip: activeTab === "pending",
      refetchOnMountOrArgChange: true,
    }
  );

  const myOrderData = myOrders?.data?.result;
  const totalInProgressOrders = myOrders?.data?.meta?.total || 0;

  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [isCompleteModalVisible, setIsCompleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IServiceRequest | null>(
    null
  );

  const showCompleteModal = (record: IServiceRequest) => {
    setCurrentRecord(record);
    setIsCompleteModalVisible(true);
  };

  const showLocationModal = (record: IServiceRequest) => {
    setCurrentRecord(record);
    setIsLocationModalVisible(true);
  };

  const handleCancel = () => {
    setIsLocationModalVisible(false);
    setIsCompleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleApprove = async () => {
    const res = await tryCatchWrapper(
      completeOrder,
      { params: currentRecord?._id },
      "Completing Request..."
    );

    if (res.statusCode === 200) {
      handleCancel();
      refetch();
    }
  };

  return (
    <div className=" min-h-[90vh]">
      <div className="flex justify-between items-center  py-2 mb-5">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-color font-integralcf capitalize">
          All Application
        </h1>
        <div className="h-fit">
          <ReuseSearchInput
            placeholder="Search ..."
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </div>

      <ReusableTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setPage={setPage}
        tabs={[
          {
            label: "Pending",
            value: "pending",
            content: (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {isFetching ? (
                  <div className="flex justify-center items-center w-full h-full min-h-40 col-span-1 sm:col-span-2 lg:col-span-3">
                    <FadeLoader color="#fff" />
                  </div>
                ) : (
                  pendingOrderData?.map((item: IServiceRequest) => (
                    <ApplicationCard
                      key={item._id}
                      data={item}
                      activeTab={activeTab}
                      showMapModal={showLocationModal}
                    />
                  ))
                )}
              </div>
            ),
          },
          {
            label: "In Progress",
            value: "inprogress",
            content: (
              <div className="grid grid-cols-1  lg:grid-cols-2 gap-5">
                {isInProgressFetching ? (
                  <div className="flex justify-center items-center w-full h-full min-h-40  col-span-1 sm:col-span-2 lg:col-span-3">
                    <FadeLoader color="#fff" />
                  </div>
                ) : (
                  myOrderData?.map((item: IServiceRequest) => (
                    <ApplicationCard
                      key={item._id}
                      data={item}
                      activeTab={activeTab}
                      showMapModal={() => {}}
                      showCompleteModal={showCompleteModal}
                    />
                  ))
                )}
              </div>
            ),
          },
          {
            label: "Completed",
            value: "completed",
            content: (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {isInProgressFetching ? (
                  <div className="flex justify-center items-center w-full h-full min-h-40 col-span-1 sm:col-span-2 lg:col-span-3">
                    <FadeLoader color="#fff" />
                  </div>
                ) : (
                  myOrderData?.map((item: IServiceRequest) => (
                    <ApplicationCard
                      key={item._id}
                      data={item}
                      activeTab={activeTab}
                      showMapModal={() => {}}
                    />
                  ))
                )}
              </div>
            ),
          },
        ]}
      />

      <div className="mt-20 flex items-center justify-center">
        <Pagination
          current={page}
          onChange={(page) => setPage(page)}
          pageSize={limit}
          total={
            activeTab === "pending" ? totalPendingOrders : totalInProgressOrders
          }
        />
      </div>

      <MapModal
        isModalVisible={isLocationModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <ApproveModal
        isApproveModalVisible={isCompleteModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleApprove={handleApprove}
        description="Are You Sure You want to Complete This Order?"
      />
    </div>
  );
};

export default AdminAllApplication;
