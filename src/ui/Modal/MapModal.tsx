/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";

interface MapModalProps<T> {
  isModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
}

const MapModal: React.FC<MapModalProps<any>> = ({
  isModalVisible,
  handleCancel,
  currentRecord,
}) => {
  console.log(currentRecord);
  return (
    <Modal
      open={isModalVisible}
      onCancel={handleCancel}
      cancelText="Cancel"
      centered
      footer={false}
      className="lg:!w-[800px]"
    >
      <div className="mt-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29208.80556098383!2d90.4036352!3d23.77942835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c712a2fdeb4d%3A0xb2c1d7fcd3ef3458!2sBanani%20Club!5e0!3m2!1sen!2sbd!4v1761543692988!5m2!1sen!2sbd"
          width="100%"
          height="600"
          loading="lazy"
        ></iframe>
      </div>
    </Modal>
  );
};

export default MapModal;
