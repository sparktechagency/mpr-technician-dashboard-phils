import { Modal } from "antd";
import MapComponent from "../MapComponent";
import { IServiceRequest } from "../../types";

interface MapModalProps {
  isModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IServiceRequest | null;
}

const MapModal: React.FC<MapModalProps> = ({
  isModalVisible,
  handleCancel,
  currentRecord,
}) => {
  return (
    <Modal
      open={isModalVisible}
      onCancel={handleCancel}
      cancelText="Cancel"
      centered
      footer={false}
      className="lg:!w-[800px]"
    >
      <div className="">
        <MapComponent
          lat={currentRecord?.location?.latitude || 0}
          lng={currentRecord?.location?.longitude || 0}
        />
      </div>
    </Modal>
  );
};

export default MapModal;
