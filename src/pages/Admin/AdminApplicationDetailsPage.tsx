/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseButton from "../../ui/Button/ReuseButton";
import CancleModal from "../../ui/Modal/CancleModal";

const AdminApplicationDetailsPage = () => {
  const [isCancleModalVisible, setIsCancleModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showCancleModal = (record: any) => {
    setCurrentRecord(record);
    setIsCancleModalVisible(true);
  };

  const handleCancel = () => {
    setIsCancleModalVisible(false);
    setCurrentRecord(null);
  };
  return (
    <div className=" min-h-[90vh] border border-primary-color rounded-lg p-5">
      <div className="flex justify-between items-center">
        <div className="flex  items-center gap-5 py-2 mb-5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-color font-integralcf capitalize">
            Details
          </h1>
          <p className="text-sm sm:text-base lg:text-lg bg-warning-color/40 text-base-color px-2 py-0.5 rounded-full font-bold">
            Pending
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <div>
          <div className="flex items-center gap-2 text-base sm:text-lg lg:text-xl text-base-color mb-5 font-bold">
            <p className="px-4 py-1.5 rounded-full bg-secondary-color font-bold">
              1
            </p>
            <p>Customer Information</p>
          </div>
          <div className="p-5 text-base-color rounded-lg border border-primary-color text-sm sm:text-base lg:text-lg">
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Name: </span>
              <span>{currentRecord?.name || "abc"}</span>
            </div>
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Phone: </span>
              <span>{currentRecord?.email || "55575757"}</span>
            </div>
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Email: </span>
              <span>{currentRecord?.email || "abc572@example.com"}</span>
            </div>
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Address: </span>
              <span>{currentRecord?.address || "Street, City, Country"}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-base sm:text-lg lg:text-xl text-base-color mb-5 font-bold">
            <p className="px-4 py-1.5 rounded-full bg-secondary-color font-bold">
              2
            </p>
            <p>Device Information</p>
          </div>
          <div className="p-5 text-base-color rounded-lg border border-primary-color text-sm sm:text-base lg:text-lg">
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Brand: </span>
              <span>{currentRecord?.brand || "Apple"}</span>
            </div>
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Product Line: </span>
              <span>{currentRecord?.product_line || "Apple"}</span>
            </div>
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Model: </span>
              <span>{currentRecord?.model || "iPhone 12"}</span>
            </div>
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Variant: </span>
              <span>{currentRecord?.experience || "Standard"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <div>
          <div className="flex items-center gap-2 text-base sm:text-lg lg:text-xl text-base-color mb-5 font-bold">
            <p className="px-4 py-1.5 rounded-full bg-secondary-color font-bold">
              1
            </p>
            <p>Issue Details</p>
          </div>
          <div className="p-5 text-base-color rounded-lg border border-primary-color text-sm sm:text-base lg:text-lg">
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Issue Type: </span>
              <span>{currentRecord?.issue_type || "Screen Damage"}</span>
            </div>
            <div className="flex items-start justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Description: </span>
              <span>
                {currentRecord?.description ||
                  "ooooooooooooooooooooooooghxdfzg  vZEFvc bhvXADFZzxhy jn fuybj njthxdfzxch trvb xrzt"}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-base sm:text-lg lg:text-xl text-base-color mb-5 font-bold">
            <p className="px-4 py-1.5 rounded-full bg-secondary-color font-bold">
              2
            </p>
            <p>Preferred Schedule</p>
          </div>
          <div className="p-5 text-base-color rounded-lg border border-primary-color text-sm sm:text-base lg:text-lg">
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Set date: </span>
              <span>{currentRecord?.set_date || "20-01-2023"}</span>
            </div>
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Set time: </span>
              <span>{currentRecord?.set_time || "09:00 AM"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29208.80556098383!2d90.4036352!3d23.77942835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c712a2fdeb4d%3A0xb2c1d7fcd3ef3458!2sBanani%20Club!5e0!3m2!1sen!2sbd!4v1761543692988!5m2!1sen!2sbd"
          width="100%"
          height="600"
          loading="lazy"
        ></iframe>
      </div>

      <div className="flex items-center justify-center gap-5 my-10">
        <ReuseButton
          variant="outline"
          className="!px-6 !py-5 w-fit flex items-center justify-center gap-2"
          onClick={() => showCancleModal(currentRecord)}
        >
          Cancel Order
        </ReuseButton>
        <ReuseButton
          variant="secondary"
          className="!px-6 !py-5 w-fit flex items-center justify-center gap-2"
          onClick={() => showCancleModal(currentRecord)}
        >
          Accept
        </ReuseButton>
      </div>
      <CancleModal
        isCancleModalVisible={isCancleModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleCancleReq={() => {}}
      />
    </div>
  );
};

export default AdminApplicationDetailsPage;
