/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaEye } from "react-icons/fa";
import ReuseButton from "../Button/ReuseButton";
import { useNavigate } from "react-router-dom";

const ApplicationCard = ({
  data,
  activeTab,
  showMapModal,
  showDeleteModal,
}: {
  data: any;
  activeTab: string;
  showMapModal: (data: any) => void;
  showDeleteModal: (data: any) => void;
}) => {
  const router = useNavigate();
  return (
    <div className="py-4 rounded-lg border border-base-color !text-base-color">
      <div className="px-4 flex justify-between items-center gap-5">
        <div className="text-nowrap">
          <div className="flex items-center gap-5">
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold">
              John Doe
            </h1>
            <p
              className={`text-xs lg:text-sm px-2 py-0.5 rounded-full ${
                activeTab === "pending"
                  ? "bg-warning-color/50 text-base-color"
                  : activeTab === "complete"
                  ? "bg-success-color text-primary-color"
                  : "bg-[#6226EF]/50 text-base-color"
              }`}
            >
              {activeTab === "pending"
                ? "Pending"
                : activeTab === "complete"
                ? "Complete"
                : "In Progress"}
            </p>
          </div>
          {activeTab === "inProgress" ? (
            <p className="text-lg sm:text-xl lg:text-2xl">54564646</p>
          ) : (
            <p className="text-sm sm:text-base lg:text-lg">abc@gmail.com</p>
          )}

          {activeTab === "inProgress" && (
            <p className="text-xs sm:text-sm lg:text-base  mt-3">
              Tue, jan 21, 2025, 400 AM
            </p>
          )}
        </div>{" "}
        {activeTab === "pending" ? (
          <ReuseButton
            variant="secondary"
            onClick={() => showMapModal(data)}
            className="bg-secondary-color/70 w-fit !py-2 !px-3"
          >
            View Location
          </ReuseButton>
        ) : activeTab === "inProgress" ? (
          <FaEye
            className="size-7 text-base-color cursor-pointer"
            onClick={() => router(`/admin/application/${data?.id}`)}
          />
        ) : (
          activeTab === "complete" && (
            <ReuseButton
              variant="secondary"
              onClick={() => showMapModal(data)}
              className="bg-secondary-color/70 w-fit !py-2 !px-3"
            >
              View Location
            </ReuseButton>
          )
        )}
      </div>
      <div className="w-full h-[1px] bg-base-color my-4"></div>
      <div className="py-1 flex flex-col  gap-2 text-start px-4">
        <span className="font-semibold text-sm sm:text-base lg:text-lg">
          Service Address:{" "}
        </span>
        <span>Block C, New York</span>
      </div>
      <div className="w-full h-[1px] bg-base-color my-2"></div>

      <div
        className={`grid ${
          activeTab === "inProgress"
            ? `grid-cols-1 lg:grid-cols-2`
            : "grid-cols-1"
        }`}
      >
        <div className="px-4">
          <div className="flex items-center justify-between py-1  gap-2 mb-2 font-semibold text-sm sm:text-base">
            <span className="font-semibold">Brand: </span>
            <span className="font-normal">Apple</span>
          </div>
          <div className="flex items-center justify-between py-1  gap-2 mb-2 font-semibold text-sm sm:text-base">
            <span className="font-semibold">Model: </span>
            <span className="font-normal">Iphone 14</span>
          </div>
          <div className="flex items-center justify-between py-1  gap-2 mb-2 font-semibold text-sm sm:text-base">
            <span className="font-semibold">Issue Type: </span>
            <span className="font-normal">Water Damage</span>
          </div>
          <div className="flex items-start justify-between py-1  gap-2 mb-2 font-semibold text-sm sm:text-base">
            <span className="font-semibold">Details: </span>
            <span className="font-normal">
              Water Damage in the screen of the phone after a heavy rain storm
              in New York City last week of 2023 at 5:00 PM EST on Monday. The
              phone is not water proof.
            </span>
          </div>
        </div>
        {activeTab === "inProgress" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 px-4">
            <div className=" p-3 rounded-lg shadow flex items-center justify-center gap-2 bg-success-color/50">
              En route
            </div>
            <div className=" p-3 rounded-lg shadow flex items-center justify-center gap-2 bg-[#6226EF]/50">
              Call
            </div>
            <div className=" p-3 rounded-lg shadow flex items-center justify-center gap-2 bg-[#6226EF]/50">
              Navigate
            </div>
            <div className=" p-3 rounded-lg shadow flex items-center justify-center gap-2 bg-success-color/50">
              Complete
            </div>
          </div>
        )}
      </div>
      {activeTab !== "inProgress" && (
        <div className="flex justify-center gap-5 items-center px-4 mt-10">
          <ReuseButton
            variant="outline"
            className="!px-6 !py-5 mr-4 w-fit flex items-center justify-center gap-2"
            onClick={() => router(`/admin/application/${data?.id}`)}
          >
            See Details
          </ReuseButton>
          {activeTab === "pending" ? (
            <ReuseButton
              variant="secondary"
              className="!px-6 !py-5 w-fit flex items-center justify-center gap-2"
              onClick={() => showDeleteModal(data)}
            >
              Delete
            </ReuseButton>
          ) : (
            <ReuseButton
              variant="secondary"
              className="!px-6 !py-5 w-fit flex items-center justify-center gap-2 !cursor-default !bg-success-color !border-success-color"
            >
              Complete
            </ReuseButton>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;
