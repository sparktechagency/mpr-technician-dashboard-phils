/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReuseButton from "../Button/ReuseButton";
import ReuseDatePicker from "../Form/ReuseDatePicker";
import ReuseTimePicker from "../Form/ReuseTimePicker";
import ReusableForm from "../Form/ReuseForm";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface ApproveModalProps<T> {
  isApproveModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
  showTimeDateModifier?: boolean;
  handleApprove: (data: T, value?: any) => void;
  description?: string;
}

const ApproveModal: React.FC<ApproveModalProps<any>> = ({
  isApproveModalVisible,
  handleCancel,
  currentRecord,
  showTimeDateModifier,
  handleApprove,
  description = " Are You Sure You want to Accept This Request    ?",
}) => {
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  console.log(currentRecord)
  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        preferedDate: dayjs(currentRecord.preferedDate),
        preferedTime: dayjs(currentRecord.preferedTime, "hh:mm A"),
      });
      setSelectedDate(dayjs(currentRecord.preferedDate || "").format("YYYY-MM-DD"));
    }
  }, [currentRecord, form]);

  return (
    <Modal
      // title="Confirm Delete"
      open={isApproveModalVisible}
      onCancel={handleCancel}
      okText="Unblock"
      cancelText="Cancel"
      centered
      style={{ textAlign: "center" }}
      // styles.body={{ textAlign: "center" }}
      footer={
        null
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4 text-base-color">
        {description}
      </p>
      {
        showTimeDateModifier ? <ReusableForm
          form={form}
          handleFinish={(values) => {
            const formValues = {
              // Always midnight UTC, no matter what time user picked
              preferedDate: dayjs(values.preferedDate).startOf("day").toISOString(),
              // 12-hour format with AM/PM
              preferedTime: dayjs(values.preferedTime).format("hh:mm A"),
            }
            console.log(formValues)
            handleApprove(currentRecord, formValues);
          }}
          onValuesChange={(changedValues) => {
            if (changedValues.preferedDate) {
              setSelectedDate(changedValues.preferedDate);
              form.setFieldsValue({ preferedTime: null }); // Reset time when date changes
            }
          }}
        >
          {/* //** Preferred Schedule */}
          <div className="w-full gap-5 mt-10 text-start!">
            <div className="flex items-center gap-2 text-base sm:text-lg lg:text-xl text-base-color mb-10 font-bold">
              <p className="px-4 py-1.5 rounded-full bg-secondary-color font-bold">
                4
              </p>
              <p>Preferred Schedule</p>
            </div>
            <div className="space-y-5">
              <ReuseDatePicker
                name="preferedDate"
                label="Event Date"
                labelClassName="!font-semibold"
                rules={[{ required: true, message: "Date is required" }]}
                placeholder="Select Date"
                format="MM-DD-YYYY"
              />

              <ReuseTimePicker
                name="preferedTime"
                date={selectedDate as any}
                label="Event Time"
                labelClassName="!font-semibold"
                rules={[{ required: true, message: "Time is required" }]}
                placeholder="Select Time"
                disabled={!selectedDate}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "40px",
              marginTop: "30px",
            }}
          >
            <ReuseButton
              variant="highlight"
              className="!px-6 !py-5 mr-4 w-fit flex items-center justify-center gap-2 !bg-transparent"
              onClick={handleCancel}
            >
              Cancel
            </ReuseButton>
            <ReuseButton
              htmlType="submit"
              variant="secondary"
              className="!px-6 !py-5 w-fit flex items-center justify-center gap-2 !bg-success-color !border-none"
            >
              Accept
            </ReuseButton>
          </div>
        </ReusableForm > :

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "40px",
              marginTop: "30px",
            }}
          >
            <ReuseButton
              variant="highlight"
              className="!px-6 !py-5 mr-4 w-fit flex items-center justify-center gap-2 !bg-transparent"
              onClick={handleCancel}
            >
              Cancel
            </ReuseButton>
            <ReuseButton
              variant="secondary"
              className="!px-6 !py-5 w-fit flex items-center justify-center gap-2 !bg-success-color !border-none"
              onClick={() => handleApprove(currentRecord)}
            >
              Accept
            </ReuseButton>
          </div>}
    </Modal>
  );
};

export default ApproveModal;
