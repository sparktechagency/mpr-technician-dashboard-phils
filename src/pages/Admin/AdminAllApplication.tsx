/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import DeleteModal from "../../ui/Modal/DeleteModal";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ReusableTabs from "../../utils/ReuseableTabs";
import ApplicationCard from "../../ui/Card/ApplicationCard";
import { Pagination } from "antd";
import MapModal from "../../ui/Modal/MapModal";

const AdminAllApplication = () => {
  const data = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `John ${index + 1}`,
    phone: `+1 (123) 456-789${index + 1}`,
    email: `john${index + 1}@example.com`,
  }));
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  const limit = 12;

  console.log(searchText, limit);

  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showLocationModal = (record: any) => {
    setCurrentRecord(record);
    setIsLocationModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsLocationModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
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
        setPage={() => {}}
        tabs={[
          {
            label: "Pending",
            value: "pending",
            content: (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {data?.map((item) => (
                  <ApplicationCard
                    key={item.id}
                    data={item}
                    activeTab={activeTab}
                    showMapModal={showLocationModal}
                    showDeleteModal={showDeleteModal}
                  />
                ))}
              </div>
            ),
          },
          {
            label: "In Progress",
            value: "inProgress",
            content: (
              <div className="grid grid-cols-1  lg:grid-cols-2 gap-5">
                {data?.map((item) => (
                  <ApplicationCard
                    key={item.id}
                    data={item}
                    activeTab={activeTab}
                    showMapModal={() => {}}
                    showDeleteModal={showDeleteModal}
                  />
                ))}
              </div>
            ),
          },
          {
            label: "Completed",
            value: "complete",
            content: (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {data?.map((item) => (
                  <ApplicationCard
                    key={item.id}
                    data={item}
                    activeTab={activeTab}
                    showMapModal={() => {}}
                    showDeleteModal={showDeleteModal}
                  />
                ))}
              </div>
            ),
          },
        ]}
      />

      <Pagination current={page} onChange={(page) => setPage(page)} />

      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleDelete={() => {}}
      />
      <MapModal
        isModalVisible={isLocationModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AdminAllApplication;
