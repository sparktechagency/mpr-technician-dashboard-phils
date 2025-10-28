/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import ReuseButton from "../Button/ReuseButton";
import ReusableForm from "../Form/ReuseForm";
import ReuseInput from "../Form/ReuseInput";

interface DeclineModalProps<T> {
  isDeclineModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
  handleDecline: (data: T) => void;
}

const DeclineModal: React.FC<DeclineModalProps<any>> = ({
  isDeclineModalVisible,
  handleCancel,
  currentRecord,
  handleDecline,
}) => {
  //   const [blockUser] = useBlockUserMutation();

  return (
    <Modal
      // title="Confirm Delete"
      open={isDeclineModalVisible}
      onOk={handleDecline}
      onCancel={handleCancel}
      cancelText="Cancel"
      centered
      // styles.body={{ textAlign: "center" }}
      footer={false}
    >
      <p className="text-lg sm:text-xl lg:text-2xl  text-base-color font-bold ">
        Decline Reason
      </p>

      <div className="mt-5 px-2">
        <ReusableForm
          handleFinish={handleDecline}
          defaultValues={currentRecord}
          className="space-y-2"
        >
          <ReuseInput
            type="text"
            rows={5}
            inputType="textarea"
            name="reason"
            label="Give Decline Reason"
            placeholder="Enter Decline Reason"
            inputClassName="!border-none !bg-[#EFEFEF]"
            rules={[{ required: true, message: "Reason is required" }]}
          />
          <ReuseButton variant="secondary" htmlType="submit" loading={false}>
            Submit
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default DeclineModal;
