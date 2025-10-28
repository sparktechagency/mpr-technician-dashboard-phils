/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import UnblockModal from "../../../ui/Modal/UnblockModal";
import BlockModal from "../../../ui/Modal/BlockModal";
import UserModal from "../../../ui/Modal/User/UserModal";
import AllTechniciansTable from "../../../ui/Tables/AllTechniciansTable";

const RecentUser = () => {
  const recentUserData = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    phone: `123-456-789${index + 1}`,
    address: `123 Main St, City ${index + 1}`,
    date: new Date(2025, 0, index + 1).toLocaleDateString(),
    status: "Pending",
  }));

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isUnBlockModalVisible, setIsUnBlockModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showUnblockModal = (record: any) => {
    setCurrentRecord(record);
    setIsUnBlockModalVisible(true);
  };
  const showBlockModal = (record: any) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsUnBlockModalVisible(false);
    setIsBlockModalVisible(false);
    setCurrentRecord(null);
  };

  const handleUnBlock = (data: any) => {
    console.log(data);
    handleCancel();
  };

  const handleBlock = (data: any) => {
    console.log(data);
    handleCancel();
  };
  return (
    <div className="mt-10  rounded-xl">
      <div
        className="border border-primary-color !bg-transparent rounded-lg mt-5"
        style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
      >
        <AllTechniciansTable
          data={recentUserData}
          loading={false}
          showViewModal={showViewUserModal}
          showUnblockModal={showUnblockModal}
          showBlockModal={showBlockModal}
          setPage={() => {}}
          page={1}
          total={recentUserData.length}
          limit={6}
        />
      </div>
      <UserModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <UnblockModal
        isUnblockModalVisible={isUnBlockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleUnblock={handleUnBlock}
      />
      <BlockModal
        isBlockModalVisible={isBlockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleBlock={handleBlock}
      />
    </div>
  );
};

export default RecentUser;
