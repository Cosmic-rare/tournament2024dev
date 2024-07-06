import { Input, Row, Col, Radio, Button } from "antd"
import type { RadioChangeEvent } from "antd"

const PointInput = ({ setGame, game, pos, p }: any) => {
  return (
    <Row justify="center" gutter={12} wrap={false}>
      <Col span={3}>
        <div style={{ textAlign: "left" }}>
          <span style={{ marginTop: "25px", display: "inline-block" }}>{pos}</span>
        </div>
      </Col>
      <Col span={3.5}>
        <div style={{ textAlign: "center" }}>
          <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
        </div>
        <div style={{ textAlign: "center" }}>
          <Input
            value={game[`p_${p}`][`l_p${pos}`]}
            onChange={(e) => {
              setGame((pre: any) => {
                let nPre = { ...pre }
                nPre[`p_${p}`][`l_p${pos}`] = parseInt(e.target.value, 10)
                return nPre
              })
            }}
            type="number"
            style={{ width: "60%", textAlign: "center" }}
          />
        </div>
      </Col>
      <Col span={2}>
        <div style={{ textAlign: "center" }}>
          <span style={{ marginTop: "25px", display: "inline-block" }}>-</span>
        </div>
      </Col>
      <Col span={3.5}>
        <div style={{ textAlign: "center" }}>
          <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
        </div>
        <div style={{ textAlign: "center" }}>
          <Input
            value={game[`p_${p}`][`h_p${pos}`]}
            onChange={(e) => {
              setGame((pre: any) => {
                let nPre = { ...pre }
                nPre[`p_${p}`][`h_p${pos}`] = parseInt(e.target.value, 10)
                return nPre
              })
            }}
            type="number"
            style={{ width: "60%", textAlign: "center" }}
          />
        </div>
      </Col>
    </Row>
  )
}

export const ModalContent = ({ setGame, game, p }: any) => {
  const onChange = (e: RadioChangeEvent) => {
    setGame((pre: any) => {
      let nPre = { ...pre }
      nPre[`p_${p}`].fHitted = e.target.value
      return nPre
    })
  }

  return (
    <>
      <PointInput pos={1} setGame={setGame} game={game} p={p} />
      {
        !["soccer", "dodgeball", "esport"].includes(game.event) ?
          <>
            <PointInput pos={2} setGame={setGame} game={game} p={p} />
            <PointInput pos={3} setGame={setGame} game={game} p={p} />
          </> : null
      }

      {game.event == "dodgeball" ?
        <Row justify="center">
          <Col flex={3}>
            <div style={{ textAlign: "left" }}>
              <span style={{ marginTop: "25px", display: "inline-block" }}>先当り</span>
            </div>
          </Col>
          <Col flex={9}>
            <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
            <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex" }}>
              <Radio.Group onChange={onChange} value={game[`p_${p}`].fHitted}>
                <Radio.Button value={"l"}>{"<"}</Radio.Button>
                <Button onClick={() => setGame((pre: any) => { let nPre = { ...pre }; nPre[`p_${p}`].fHitted = null; return nPre })}>{"-"}</Button>
                <Radio.Button value={"h"}>{">"}</Radio.Button>
              </Radio.Group>
            </div>
          </Col>
        </Row>
        : null
      }

      <code>{JSON.stringify(game[`p_${p}`])}</code>
    </>
  )
}
