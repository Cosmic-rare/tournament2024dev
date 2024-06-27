import { Modal, Radio, Space, Button } from "antd"

interface Props {
  isModalOpen: boolean
  setIsModalOpen: Function
  data: any
}

const PointModal: React.FC<Props> = ({ isModalOpen, setIsModalOpen, data }) => {
  return (
    <Modal
      open={isModalOpen}
      closable={false}
      style={{ maxWidth: 250 }}
      onCancel={() => setIsModalOpen(false)}
      zIndex={9997}
      footer={[]}
    >
      <div style={{ position: "relative" }}>
        <code>{JSON.stringify(data)}</code>
      </div>
    </Modal>
  )
}

export default PointModal
