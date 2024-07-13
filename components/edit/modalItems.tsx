import { Input, Row, Col, Radio, Button, TimePicker, Select } from "antd"
import { gameType } from "@/util/type"
import type { RadioChangeEvent, TimePickerProps } from "antd"
import dayjs from "dayjs"

const PointInput = ({ setGame, game, pos }: any) => {
  return (
    <Row justify="center" gutter={12} wrap={false}>
      <Col span={3}>
        <div style={{ textAlign: "left" }}>
          <span style={{ marginTop: "25px", display: "inline-block" }}>{pos}</span>
        </div>
      </Col>
      <Col span={3.1}>
        <div style={{ textAlign: "center" }}>
          <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
        </div>
        <div style={{ textAlign: "center" }}>
          <Input
            value={game[`l_p${pos}`]}
            onChange={(e) => {
              setGame((p: gameType) => { return { ...p, [`l_p${pos}`]: parseInt(e.target.value, 10) } })
            }}
            type="number"
            style={{ width: "60%", textAlign: "center" }}
          // style={{ textAlign: "center" }}
          />
        </div>
      </Col>
      <Col span={0.5}>
        <div style={{ textAlign: "center" }}>
          <span style={{ marginTop: "25px", display: "inline-block" }}>-</span>
        </div>
      </Col>
      <Col span={3.1}>
        <div style={{ textAlign: "center" }}>
          <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
        </div>
        <div style={{ textAlign: "center" }}>
          <Input
            value={game[`h_p${pos}`]}
            onChange={(e) => {
              setGame((p: gameType) => { return { ...p, [`h_p${pos}`]: parseInt(e.target.value, 10) } })
            }}
            type="number"
            style={{ width: "60%", textAlign: "center" }}
          // style={{ textAlign: "center" }}
          />
        </div>
      </Col>
      <Col span={4}>
        <div style={{ textAlign: "center" }}>
          <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
          <Button onClick={() => setGame((p: gameType) => { return { ...p, [`l_p${pos}`]: null, [`h_p${pos}`]: null } })}>Clear</Button>
        </div>
      </Col>
    </Row>
  )
}

const DateInput = ({ setGame, game, column, title }: any) => {
  const onChangeTime: TimePickerProps['onChange'] = (date) => {
    const da = new Date(game[column] as number ?? new Date(1721055600000))
    const t = new Date(da.getFullYear(), da.getMonth(), da.getDate(), date?.hour(), date?.minute()).valueOf()
    setGame((p: gameType) => {
      return { ...p, [column]: t }
    })
  }

  const onChangeDate = (e: RadioChangeEvent) => {
    setGame((p: gameType) => {
      // @ts-ignore
      const da = new Date(p[column] as number ?? new Date(1721055600000))
      da.setDate(e.target.value)
      return { ...p, [column]: da.valueOf() }
    })
  }

  return (
    <Row justify="center">
      <Col flex={3}>
        <div style={{ textAlign: "left" }}>
          <span style={{ marginTop: "25px", display: "inline-block" }}>{title}</span>
        </div>
      </Col>
      <Col flex={4.5}>
        <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
        <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <TimePicker
            onChange={onChangeTime}
            format="h:mm"
            value={dayjs(new Date(game[column] ? game[column] : 0))}
            defaultValue={dayjs(new Date(game[column] ?? new Date(1721055600000)).toISOString())}
          />
        </div>
      </Col>
      <Col flex={4.5}>
        <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
        <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Radio.Group onChange={onChangeDate} value={new Date(game[column]).getDate()} defaultValue={16}>
            <Radio.Button value={16}>16</Radio.Button>
            <Radio.Button value={17}>17</Radio.Button>
            <Button onClick={() => setGame((p: gameType) => { return { ...p, [column]: null } })}>{"-"}</Button>
          </Radio.Group>
        </div>
      </Col>
    </Row>
  )
}

const FHitted = ({ i, setGame, game }: any) => {
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
              setGame((p: gameType) => {
                let pr = { ...p }
                pr.fHitted[`p${i}`] = e.target.value
                return pr
              })
            }
            value={game.fHitted[`p${i}`]}>
            <Radio.Button value={"l"}>{"<"}</Radio.Button>
            <Button
              onClick={() =>
                setGame((p: gameType) => {
                  let pr = { ...p }
                  pr.fHitted[`p${i}`] = null
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

const PlaceInput = ({ setGame, game }: any) => {
  const handleChange = (value: string) => {
    setGame((p: gameType) => { return { ...p, place: value } })
  }

  return (
    <Row justify="center">
      <Col flex={3}>
        <div style={{ textAlign: "left" }}>
          <span style={{ marginTop: "25px", display: "inline-block" }}>場所</span>
        </div>
      </Col>
      <Col flex={9}>
        <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
        <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Select
            defaultValue="lucy"
            style={{ width: 180 }}
            onChange={handleChange}
            value={game.place}
            options={[
              { value: 'a1', label: '1体A(ステージ側・西)' },
              { value: 'b1', label: '1体B(入口側・東)' },
              { value: 'a2', label: '2体A(1体・外側・南西)' },
              { value: 'b2', label: '2体B(プール・外側・北西)' },
              { value: 'c2', label: '2体C(1体・校舎側・南東)' },
              { value: 'd2', label: '2体D(プール・校舎側・北東)' },
              { value: 'mo', label: 'ミニ校庭' },
              { value: 'ma', label: '校庭A(北)' },
              { value: 'mb', label: '校庭B(南)' },
            ]}
          />
        </div>
      </Col>
    </Row>
  )
}

export const ModalContent = ({ setGame, game, event }: any) => {
  // must be "ADMIN"

  return (
    <>
      <PointInput pos={1} setGame={setGame} game={game} />
      {
        !["soccer", "esport"].includes(event) ?
          <>
            <PointInput pos={2} setGame={setGame} game={game} />
            <PointInput pos={3} setGame={setGame} game={game} />
          </> : null
      }

      <DateInput setGame={setGame} game={game} column="scheduledAt" title="予定" />
      <DateInput setGame={setGame} game={game} column="startedAt" title="開始" />
      <DateInput setGame={setGame} game={game} column="endedAt" title="終了" />

      {/* esport, soccer用の入力 */}

      {event == "dodgeball" ?
        <>
          <FHitted game={game} setGame={setGame} i={1} />
          <FHitted game={game} setGame={setGame} i={2} />
          <FHitted game={game} setGame={setGame} i={3} />
        </>
        : null
      }

      {event == "soccer" ?
        <Row justify="center">
          <Col flex={3}>
            <div style={{ textAlign: "left" }}>
              <span style={{ marginTop: "25px", display: "inline-block" }}>PK</span>
            </div>
          </Col>
          <Col flex={9}>
            <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
            <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex" }}>
              <Radio.Group
                onChange={(e: RadioChangeEvent) => {
                  setGame((p: gameType) => { return { ...p, soccer: e.target.value } })
                }}
                value={game.soccer}>
                <Radio.Button value={"l"}>{"<"}</Radio.Button>
                <Button onClick={() => setGame((p: gameType) => { return { ...p, soccer: null } })}>{"-"}</Button>
                <Radio.Button value={"h"}>{">"}</Radio.Button>
              </Radio.Group>
            </div>
          </Col>
        </Row>
        : null
      }

      {event == "esport" ?
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
                onChange={(e: RadioChangeEvent) => {
                  setGame((p: gameType) => { return { ...p, eSport: e.target.value } })
                }}
                value={game.eSport}>
                <Radio.Button value={"l"}>{"<"}</Radio.Button>
                <Button onClick={() => setGame((p: gameType) => { return { ...p, eSport: null } })}>{"-"}</Button>
                <Radio.Button value={"h"}>{">"}</Radio.Button>
              </Radio.Group>
            </div>
          </Col>
        </Row>
        : null
      }

      {
        ["volleyball", "badminton", "dodgeball"].includes(event) ?
          <PlaceInput game={game} setGame={setGame} />
          : null
      }

      <Row justify="center">
        <Col flex={3}>
          <div style={{ textAlign: "left" }}>
            <span style={{ marginTop: "25px", display: "inline-block" }}>適用済</span>
          </div>
        </Col>
        <Col flex={9}>
          <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
          <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex" }}>
            <Radio.Group onChange={(e: RadioChangeEvent) => setGame((p: gameType) => { return { ...p, applied: e.target.value } })} value={game.applied}>
              <Radio.Button value={false}>未</Radio.Button>
              <Radio.Button value={true}>済</Radio.Button>
            </Radio.Group>
          </div>
        </Col>
      </Row>

      <Row justify="center">
        <Col flex={3}>
          <div style={{ textAlign: "left" }}>
            <span style={{ marginTop: "25px", display: "inline-block" }}>記録者</span>
          </div>
        </Col>
        <Col flex={9}>
          <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
          <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex" }}>
            <Input
              style={{ marginRight: 8 }}
              value={game.recorderId}
              onChange={(e: any) => setGame((p: gameType) => { return { ...p, recorderId: e.target.value } })}
            />
            <Button onClick={() => setGame((p: gameType) => { return { ...p, recorderId: null } })}>{"Clear"}</Button>
          </div>
        </Col>
      </Row>
    </>
  )
}
