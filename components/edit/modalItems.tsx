import { Input, Row, Col, Button } from "antd"
import { gameType } from "@/util/type"

export const ModalContent = ({ isLoading, setGame, game }: any) => {
  // must be "ADMIN"
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
              value={game.l_p1}
              disabled={isLoading}
              onChange={(e) => {
                setGame((p: gameType) => { return { ...p, l_p1: parseInt(e.target.value, 10) } })
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
              value={game.h_p1}
              disabled={isLoading}
              onChange={(e) => {
                setGame((p: gameType) => { return { ...p, h_p1: parseInt(e.target.value, 10) } })
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
