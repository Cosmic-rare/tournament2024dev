import React from "react"
import { Modal, Input, Row, Col, Button } from "antd"
import { CircularProgress, Backdrop } from "@mui/material"
import { gameType } from "@/util/type"
import { ModalContent } from "./modalItems"

interface YourComponentProps {
  isModalOpen: boolean
  setIsModalOpen: Function
  isLoading: boolean
  onUpdate: Function
  editPoint: number
  game: gameType
  setGame: Function
}

const PointEditModal: React.FC<YourComponentProps> = ({ isModalOpen, setIsModalOpen, isLoading, onUpdate, editPoint, game, setGame }) => {
  return (
    <Modal
      open={isModalOpen}
      closable={false}
      zIndex={9997}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="cancel" disabled={isLoading} onClick={() => setIsModalOpen(false)}>Cancel</Button>,
        <Button
          key="reset"
          danger
          disabled={isLoading}
        >
          Reset
        </Button>,
        <Button
          key="apply"
          type="primary"
          disabled={isLoading}
          onClick={() => {
            onUpdate(game, editPoint, false)
          }}>
          Apply
        </Button>
      ]}
    >
      <div style={{ position: "relative" }}>
        <Backdrop
          sx={{ color: "#fff", zIndex: 9999 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <ModalContent
          isLoading={isLoading}
          setGame={setGame}
          game={game}
        />
        <div style={{ height: 10 }} />
      </div>
    </Modal >
  )
}

export default PointEditModal
