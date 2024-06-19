import React from "react"
import { Modal, Input, Row, Col, Button } from "antd"
import { CircularProgress, Backdrop } from "@mui/material"
import { gameType } from "@/util/type"

interface YourComponentProps {
  isModalOpen: boolean
  setIsModalOpen: Function
  isLoading: boolean
  onUpdate: Function
  editPoint: number
  game: gameType
  setGame: Function
}

const ModalContent = ({ l_point, isLoading, setL_point, h_point, setH_point }: any) => {
  return (
    <>
      <Row gutter={16} justify="center">
        <Col span={2}>
          <div style={{ textAlign: "center" }}>
            <span style={{ marginTop: "25px", display: "inline-block" }}>1st</span>
          </div>
        </Col>
        <Col span={5}>
          <div style={{ textAlign: "center" }}>
            <span style={{ marginBottom: "10px", display: "inline-block" }}>{/* 1 */}</span>
          </div>
          <div style={{ textAlign: "center" }}>
            <Input
              value={l_point}
              disabled={isLoading}
              onChange={(e) => {
                setL_point(parseInt(e.target.value, 10))
              }}
              type="number"
              style={{ width: "80%", textAlign: "center" }}
            />
          </div>
        </Col>
        <Col span={2}>
          <div style={{ textAlign: "center" }}>
            <span style={{ marginTop: "25px", display: "inline-block" }}>-</span>
          </div>
        </Col>
        <Col span={5}>
          <div style={{ textAlign: "center" }}>
            <span style={{ marginBottom: "10px", display: "inline-block" }}>{/* 2 */}</span>
          </div>
          <div style={{ textAlign: "center" }}>
            <Input
              value={h_point}
              disabled={isLoading}
              onChange={(e) => {
                setH_point(parseInt(e.target.value, 10))
              }}
              type="number"
              style={{ width: "80%", textAlign: "center" }}
            />
          </div>
        </Col>
      </Row>

    </>
  )
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
          l_point={game.l_p1}
          isLoading={isLoading}
          setL_point={(d: number) => setGame((p: gameType) => { return { ...p, l_p1: d } })}
          h_point={game.h_p1}
          setH_point={(d: number) => setGame((p: gameType) => { return { ...p, h_p1: d } })}
        />
        <div style={{ height: 10 }} />
      </div>
    </Modal >
  )
}

export default PointEditModal
