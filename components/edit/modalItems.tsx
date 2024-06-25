import { Input, Row, Col, Button } from "antd"
import { useTokenStore } from "@/util/store"
import { jwtDecode } from "jwt-decode"

export const ModalContent = ({ l_point, isLoading, setL_point, h_point, setH_point }: any) => {
  const token = useTokenStore((s) => s.token)
  const updateToken = useTokenStore((s) => s.setToken)

  try {
    // @ts-ignore
    const roleType = jwtDecode(token).roleType

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
  } catch (e) {
    console.log(e)
    return null
  }  
}

