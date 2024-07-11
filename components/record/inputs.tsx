import { gameType } from "@/util/type"
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
      <Col span={4}>
        <div style={{ textAlign: "center" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
          </div>
          <Button
            onClick={() => {
              setGame((pre: any) => {
                let nPre = { ...pre }
                nPre[`p_${p}`][`l_p${pos}`] = null
                nPre[`p_${p}`][`h_p${pos}`] = null
                return nPre
              })
            }}
          >
            Clear
          </Button>
        </div>
      </Col>
    </Row>
  )
}

const FHitted = ({ i, setGame, game, p }: any) => {
  return (
    <Row justify="center">
      <Col flex={3}>
        <div style={{ textAlign: "left" }}>
          <span style={{ marginTop: "25px", display: "inline-block" }}>先に当てたチーム</span>
        </div>
      </Col>
      <Col flex={9}>
        <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
        <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Radio.Group
            onChange={(e: RadioChangeEvent) =>
              setGame((pre: any) => {
                let pr = { ...pre }
                pr[`p_${p}`].fHitted[`p${i}`] = e.target.value
                return pr
              })
            }
            value={game.fHitted[`p${i}`]}>
            <Radio.Button value={"l"}>{"<"}</Radio.Button>
            <Button
              onClick={() =>
                setGame((pre: any) => {
                  let pr = { ...pre }
                  pr[`p_${p}`].fHitted[`p${i}`] = null
                  return pr
                })
              }
            >
              {"-"}</Button>
            <Radio.Button value={"h"}>{">"}</Radio.Button>
          </Radio.Group>
        </div>
      </Col>
    </Row>
  )
}

export const ModalContent = ({ setGame, game, p }: any) => {
  return (
    <>
      <PointInput pos={1} setGame={setGame} game={game} p={p} />
      {
        !["soccer", "esport"].includes(game.event) ?
          <>
            <PointInput pos={2} setGame={setGame} game={game} p={p} />
            <PointInput pos={3} setGame={setGame} game={game} p={p} />
          </> : null
      }

      {game.event == "dodgeball" ?
        <>
          <FHitted game={game[`p_${p}`]} setGame={setGame} i={1} p={p} />
          <FHitted game={game[`p_${p}`]} setGame={setGame} i={2} p={p} />
          <FHitted game={game[`p_${p}`]} setGame={setGame} i={3} p={p} />
        </>
        : null
      }

      {game.event == "esport" ?
        <Row justify="center">
          <Col flex={3}>
            <div style={{ textAlign: "left" }}>
              <span style={{ marginTop: "25px", display: "inline-block" }}>最高得点者</span>
            </div>
          </Col>
          <Col flex={9}>
            <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
            <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex" }}>
              <Radio.Group
                onChange={(e: RadioChangeEvent) =>
                  setGame((pre: any) => {
                    let pr = { ...pre }
                    // @ts-ignore
                    pr[`p_${p}`].eSport = e.target.value
                    return pr
                  })
                }
                value={game[`p_${p}`].eSport}>
                <Radio.Button value={"l"}>{"<"}</Radio.Button>
                <Button
                  onClick={() =>
                    setGame((pre: any) => {
                      let pr = { ...pre }
                      pr[`p_${p}`].eSport = null
                      return pr
                    })
                  }
                >
                  {"-"}</Button>
                <Radio.Button value={"h"}>{">"}</Radio.Button>
              </Radio.Group>
            </div>
          </Col>
        </Row>
        : null
      }

      {game.event == "soccer" ?
        <Row justify="center">
          <Col flex={3}>
            <div style={{ textAlign: "left" }}>
              <span style={{ marginTop: "25px", display: "inline-block" }}>最高得点者</span>
            </div>
          </Col>
          <Col flex={9}>
            <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
            <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex" }}>
              <Radio.Group
                onChange={(e: RadioChangeEvent) =>
                  setGame((pre: any) => {
                    let pr = { ...pre }
                    // @ts-ignore
                    pr[`p_${p}`].soccer = e.target.value
                    return pr
                  })
                }
                value={game[`p_${p}`].soccer}>
                <Radio.Button value={"l"}>{"<"}</Radio.Button>
                <Button
                  onClick={() =>
                    setGame((pre: any) => {
                      let pr = { ...pre }
                      pr[`p_${p}`].soccer = null
                      return pr
                    })
                  }
                >
                  {"-"}</Button>
                <Radio.Button value={"h"}>{">"}</Radio.Button>
              </Radio.Group>
            </div>
          </Col>
        </Row>
        : null
      }
    </>
  )
}
