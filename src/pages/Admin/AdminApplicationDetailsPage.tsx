/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseButton from "../../ui/Button/ReuseButton";
import {
  useAcceptOrderMutation,
  useCompleteOrderMutation,
  useEnRouteMailMutation,
  useGetSingleOrderQuery,
} from "../../redux/features/order/orderApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IServiceRequest } from "../../types";
import { formatDate } from "../../utils/dateFormet";
import MapComponent from "../../ui/MapComponent";
import ApproveModal from "../../ui/Modal/ApproveModal";
import { FadeLoader } from "react-spinners";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import useUserData from "../../hooks/useUserData";

const AdminApplicationDetailsPage = () => {
  const router = useNavigate();
  const [completeOrder] = useCompleteOrderMutation();
  const [enRoute] = useEnRouteMailMutation();

  const { id } = useParams<{ id: string }>();
  const user = useUserData();
  const { data, isFetching, refetch } = useGetSingleOrderQuery(
    {
      orderId: id || "",
    },
    { refetchOnMountOrArgChange: true }
  );
  const [acceptOrder] = useAcceptOrderMutation();

  const serviceData: IServiceRequest = data?.data;
  const [isAcceptModalVisible, setIsAcceptModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showAcceptModal = (record: any) => {
    setCurrentRecord(record);
    setIsAcceptModalVisible(true);
  };

  const handleCancel = () => {
    setIsAcceptModalVisible(false);
    setCurrentRecord(null);
  };
  const handleApprove = async (data: IServiceRequest, value?: any) => {
    console.log(value)
    const res = await tryCatchWrapper(
      acceptOrder,
      { params: data?._id, body: value },
      "Accepting Request..."
    );
    if (res?.statusCode === 200) {
      router("/technician/application", { replace: true });
      handleCancel();
      refetch();
    }
  };
  const handleEnRoute = async (data: IServiceRequest) => {
    const res = await tryCatchWrapper(
      enRoute,
      { params: data?._id },
      "Sending En Route Mail...",
    );
    if (res?.statusCode === 200) {
      handleCancel();
    }
  };

  const handleComplete = async (data: IServiceRequest) => {
    const res = await tryCatchWrapper(
      completeOrder,
      { params: data?._id },
      "Completing Request..."
    );

    if (res.statusCode === 200) {
      handleCancel();
      refetch();
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center w-full h-full min-h-40">
        <FadeLoader color="#fff" />
      </div>
    );
  }


  if (
    serviceData?.status !== "pending" && serviceData?.serviceProviderId !== user?.userId
  ) {
    router("/technician/application", { replace: true });
  }

  return (
    <div className=" min-h-[90vh] border border-primary-color rounded-lg p-5">
      <div className="flex justify-between items-center">
        <div className="flex  items-center gap-5 py-2 mb-5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-color font-integralcf capitalize">
            Details
          </h1>
          <p
            className={`text-sm sm:text-base lg:text-lg 0 text-base-color px-2 py-0.5 rounded-full font-bold ${serviceData?.status === "pending"
              ? "bg-warning-color/50 text-base-color"
              : serviceData?.status === "completed"
                ? "bg-success-color text-primary-color"
                : "bg-[#6226EF]/50 text-base-color"
              }`}
          >
            {serviceData?.status === "pending"
              ? "Pending"
              : serviceData?.status === "completed"
                ? "Completed"
                : serviceData?.status === "inprogress"
                  ? "In Progress"
                  : ""}
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
              <span>{serviceData?.clientName}</span>
            </div>
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Phone: </span>
              <span>{serviceData?.phoneNumber}</span>
            </div>
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Email: </span>
              <span>{serviceData?.email}</span>
            </div>
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Address: </span>
              <span>{serviceData?.serviceAddress}</span>
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
              <span>{serviceData?.brand}</span>
            </div>
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Product Line: </span>
              <span>{serviceData?.productline}</span>
            </div>
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Model: </span>
              <span>{serviceData?.model}</span>
            </div>
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Variant: </span>
              <span>{serviceData?.variant}</span>
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
              <span>{serviceData?.issueType}</span>
            </div>
            <div className="flex items-start justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Description: </span>
              <span>{serviceData?.issueDescription}</span>
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
              <span className="font-medium">Prefered date: </span>
              <span>{formatDate(serviceData?.preferedDate)}</span>
            </div>
            <div className="flex items-center justify-between border-b border-input-color/20 py-1  gap-2 mb-2">
              <span className="font-medium">Prefered time: </span>
              <span>{serviceData?.preferedTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <MapComponent
          lat={serviceData?.location?.latitude || 0}
          lng={serviceData?.location?.longitude || 0}
          height={"500px"}
        />
      </div>

      {serviceData?.status === "pending" && (
        <div className="flex items-center justify-center gap-5 my-10">
          <ReuseButton
            variant="secondary"
            className="!px-6 !py-5 w-fit flex items-center justify-center gap-2"
            onClick={() => showAcceptModal(serviceData)}
          >
            Accept
          </ReuseButton>
        </div>
      )}
      {serviceData?.status === "inprogress" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 px-4 text-lg mt-16">
          <div onClick={() => handleEnRoute(serviceData)} className="cursor-pointer p-2 font-semibold rounded-lg shadow flex items-center justify-center gap-2 bg-transparent text-secondary-color border border-secondary-color">
            En route
          </div>
          <Link
            to={`tel:${serviceData?.phoneNumber}`}
            className=" p-2 font-semibold rounded-lg shadow flex items-center justify-center gap-2 bg-transparent !text-secondary-color border border-secondary-color"
          >
            Call
          </Link>
          <Link
            to={`https://www.google.com/maps/dir/?api=1&destination=${serviceData?.location?.latitude},${serviceData?.location?.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 font-semibold rounded-lg shadow flex items-center justify-center gap-2 bg-transparent !text-secondary-color border border-secondary-color"
          >
            Navigate
          </Link>
          <div
            onClick={() => showAcceptModal(serviceData)}
            className=" p-2 font-semibold rounded-lg shadow flex items-center justify-center gap-2 bg-success-color/50 !text-white cursor-pointer"
          >
            Complete
          </div>
        </div>
      )}
      <ApproveModal
        isApproveModalVisible={isAcceptModalVisible}
        handleCancel={handleCancel}
        description={
          serviceData?.status === "inprogress"
            ? "Are You Sure You want to Complete This Order?"
            : "Are You Sure You want to Accept This Request?"
        }
        showTimeDateModifier={(serviceData?.status === "pending" && true) || false}
        currentRecord={currentRecord}
        handleApprove={(data, value) => {  // ✅ Accept the parameters
          if (serviceData?.status === "inprogress") {
            handleComplete(data);
          } else {
            handleApprove(data, value);  // ✅ Now 'value' is defined
          }
        }}
      />
    </div>
  );
};

export default AdminApplicationDetailsPage;
