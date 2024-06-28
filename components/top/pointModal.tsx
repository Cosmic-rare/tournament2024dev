import { Modal, Radio, Space, Button } from "antd"

interface Props {
  isModalOpen: boolean
  setIsModalOpen: Function
  data: any
  event: string
}

const PointModal: React.FC<Props> = ({ isModalOpen, setIsModalOpen, data, event }) => {
  return (
    <Modal
      open={isModalOpen}
      closable={false}
      style={{ maxWidth: 300 }}
      onCancel={() => setIsModalOpen(false)}
      zIndex={9997}
      footer={[]}
    >
      <div style={{ position: "relative" }}>
        <code>{JSON.stringify(data)}</code>
        <code>{event}</code>
        {/* eventで分けながらdata表示 */}
      </div>
    </Modal>
  )
}

export default PointModal
