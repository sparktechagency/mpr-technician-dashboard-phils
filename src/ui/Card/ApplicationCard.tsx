/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaEye } from "react-icons/fa";
import ReuseButton from "../Button/ReuseButton";
import { Link, useNavigate } from "react-router-dom";
import { IServiceRequest } from "../../types";
import { formatDate } from "../../utils/dateFormet";

const ApplicationCard = ({
  data,
  activeTab,
  showMapModal,
  showCompleteModal,
}: {
  data: IServiceRequest;
  activeTab: string;
  showMapModal: (data: any) => void;
  showCompleteModal?: (data: IServiceRequest) => void;
}) => {
  const router = useNavigate();
  return (
    <div className="py-4 rounded-lg border border-base-color !text-base-color">
      <div className="px-4 flex justify-between items-center gap-5">
        <div className="text-nowrap">
          <div className="flex items-center gap-5">
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold">
              {data?.clientName}
            </h1>
            <p
              className={`text-xs lg:text-sm px-2 py-0.5 rounded-full ${
                activeTab === "pending"
                  ? "bg-warning-color/50 text-base-color"
                  : activeTab === "completed"
                  ? "bg-success-color text-primary-color"
                  : "bg-[#6226EF]/50 text-base-color"
              }`}
            >
              {activeTab === "pending"
                ? "Pending"
                : activeTab === "completed"
                ? "Completed"
                : "In Progress"}
            </p>
          </div>
          {activeTab === "inprogress" ? (
            <p className="text-lg sm:text-xl lg:text-2xl">
              {data?.phoneNumber}
            </p>
          ) : (
            <p className="text-sm sm:text-base lg:text-lg">{data?.email}</p>
          )}

          {activeTab === "inprogress" && (
            <p className="text-xs sm:text-sm lg:text-base  mt-3">
              {formatDate(data?.preferedDate)}at {data?.preferedTime}
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
        ) : activeTab === "inprogress" ? (
          <FaEye
            className="size-7 text-base-color cursor-pointer"
            onClick={() => router(`${data?._id}`)}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="w-full h-[1px] bg-base-color my-4"></div>
      <div className="py-1 flex flex-col  gap-2 text-start px-4">
        <span className="font-semibold text-sm sm:text-base lg:text-lg">
          Service Address:{" "}
        </span>
        <span>{data?.serviceAddress}</span>
      </div>
      <div className="w-full h-[1px] bg-base-color my-2"></div>

      <div
        className={`grid ${
          activeTab === "inprogress"
            ? `grid-cols-1 lg:grid-cols-2`
            : "grid-cols-1"
        }`}
      >
        <div className="px-4">
          <div className="flex items-center justify-between py-1  gap-2 mb-2 font-semibold text-sm sm:text-base">
            <span className="font-semibold">Brand: </span>
            <span className="font-normal">{data?.brand}</span>
          </div>
          <div className="flex items-center justify-between py-1  gap-2 mb-2 font-semibold text-sm sm:text-base">
            <span className="font-semibold">Model: </span>
            <span className="font-normal">{data?.model}</span>
          </div>
          <div className="flex items-center justify-between py-1  gap-2 mb-2 font-semibold text-sm sm:text-base">
            <span className="font-semibold">Issue Type: </span>
            <span className="font-normal">{data?.issueType}</span>
          </div>
          <div className="flex items-start justify-between py-1  gap-2 mb-2 font-semibold text-sm sm:text-base">
            <span className="font-semibold">Details: </span>
            <span className="font-normal">{data?.issueDescription}</span>
          </div>
        </div>
        {activeTab === "inprogress" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 px-4 text-lg">
            <div className=" p-2 font-semibold rounded-lg shadow flex items-center justify-center gap-2 bg-transparent text-secondary-color border border-secondary-color">
              En route
            </div>
            <Link
              to={`tel:${data?.phoneNumber}`}
              className=" p-2 font-semibold rounded-lg shadow flex items-center justify-center gap-2 bg-transparent !text-secondary-color border border-secondary-color"
            >
              Call
            </Link>
            <Link
              to={`https://www.google.com/maps/dir/?api=1&destination=${data?.location?.latitude},${data?.location?.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 font-semibold rounded-lg shadow flex items-center justify-center gap-2 bg-transparent !text-secondary-color border border-secondary-color"
            >
              Navigate
            </Link>
            <div
              onClick={() => showCompleteModal && showCompleteModal(data)}
              className=" p-2 font-semibold rounded-lg shadow flex items-center justify-center gap-2 bg-success-color/50 cursor-pointer"
            >
              Complete
            </div>
          </div>
        )}
      </div>
      {activeTab !== "inprogress" && (
        <div className="flex justify-center gap-5 items-center px-4 mt-10">
          <ReuseButton
            variant="outline"
            className="!px-6 !py-5 mr-4 w-fit flex items-center justify-center gap-2"
            onClick={() => router(`${data?._id}`)}
          >
            See Details
          </ReuseButton>
          {activeTab === "inprogress" && (
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
