import { Input, Row, Col, Radio, Button, TimePicker } from "antd"
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
      da.setDate(e.target.value + 1)
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
          <Radio.Group onChange={onChangeDate} value={new Date(game[column]).getDate() - 1} defaultValue={16}>
            <Radio.Button value={16}>16</Radio.Button>
            <Radio.Button value={17}>17</Radio.Button>
            <Button onClick={() => setGame((p: gameType) => { return { ...p, [column]: null } })}>{"-"}</Button>
          </Radio.Group>
        </div>
      </Col>
    </Row>
  )
}

export const ModalContent = ({ setGame, game, event }: any) => {
  // must be "ADMIN"

  const onChange = (e: RadioChangeEvent) => {
    setGame((p: gameType) => { return { ...p, fHitted: e.target.value } })
  }

  return (
    <>
      <PointInput pos={1} setGame={setGame} game={game} />
      {
        !["soccer", "dodgeball", "esport"].includes(event) ?
          <>
            <PointInput pos={2} setGame={setGame} game={game} />
            <PointInput pos={3} setGame={setGame} game={game} />
          </> : null
      }

      <DateInput setGame={setGame} game={game} column="scheduledAt" title="予定" />
      <DateInput setGame={setGame} game={game} column="startedAt" title="開始" />
      <DateInput setGame={setGame} game={game} column="endedAt" title="終了" />

      {event == "dodgeball" ?
        <Row justify="center">
          <Col flex={3}>
            <div style={{ textAlign: "left" }}>
              <span style={{ marginTop: "25px", display: "inline-block" }}>先当り</span>
            </div>
          </Col>
          <Col flex={9}>
            <span style={{ marginBottom: "10px", display: "inline-block" }}></span>
            <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex" }}>
              <Radio.Group onChange={onChange} value={game.fHitted}>
                <Radio.Button value={"l"}>{"<"}</Radio.Button>
                <Button onClick={() => setGame((p: gameType) => { return { ...p, fHitted: null } })}>{"-"}</Button>
                <Radio.Button value={"h"}>{">"}</Radio.Button>
              </Radio.Group>
            </div>
          </Col>
        </Row>
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
    </>
  )
}
