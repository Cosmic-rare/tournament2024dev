import React from "react"
import { Modal, Button } from "antd"
import { CircularProgress, Backdrop } from "@mui/material"
import { ModalContent } from "./modalItems"

interface YourComponentProps {
  isModalOpen: boolean
  closeModal: Function
  isLoading: boolean
  game: any
  updateFetch: Function
}

const PointEditModal: React.FC<YourComponentProps> = ({ isModalOpen, closeModal, isLoading, game, updateFetch }) => {
  return (
    <Modal
      open={isModalOpen}
      closable={false}
      zIndex={9997}
      onCancel={() => closeModal()}
      footer={[
        <Button key="cancel" disabled={isLoading} onClick={() => closeModal()}>Cancel</Button>,
        <Button
          key="apply"
          type="primary"
          disabled={isLoading}
          onClick={() => updateFetch()}>
          Apply
        </Button>
      ]}
    >
      <div style={{ position: "relative", maxWidth: 330, margin: "auto", paddingTop: 25 }}>
        <Backdrop
          sx={{ color: "#fff", zIndex: 9999 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <ModalContent
          g={game}
          event={game.data.event}
        />
        <div style={{ height: 10 }} />
      </div>
    </Modal >
  )
}

export default PointEditModal
