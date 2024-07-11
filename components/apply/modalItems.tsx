import { Radio } from "antd"
import Grid from "@mui/material/Grid"
import getClass from "@/util/cl"

const PointInput = ({ game, pos }: any) => {
  return (
    <Grid container style={{ height: 50 }}>
      <Grid item xs={2}>
        <div style={{ textAlign: "left" }}>
          {pos}
        </div>
      </Grid>
      <Grid item xs={4}>
        <div style={{ textAlign: "center" }}>
          {game[`l_p${pos}`] == null ? "-" : game[`l_p${pos}`]}
        </div>
      </Grid>
      <Grid item xs={2}>
        <div style={{ textAlign: "center" }}>
          {"-"}
        </div>
      </Grid>
      <Grid item xs={4}>
        <div style={{ textAlign: "center" }}>
          {game[`h_p${pos}`] == null ? "-" : game[`h_p${pos}`]}
        </div>
      </Grid>
    </Grid>
  )
}

const DateInput = ({ game, column, title }: any) => {
  return (
    <Grid container style={{ height: 50 }}>
      <Grid item xs={2}>
        <div style={{ textAlign: "left" }}>
          {title}
        </div>
      </Grid>
      <Grid item xs={10}>
        <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center" }}>
          {new Date(game[column]).toLocaleString('en-us', { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false })}
        </div>
      </Grid>
    </Grid>
  )
}

const FHitted = ({ i, game }: any) => {
  return (
    <Grid container style={{ height: 50 }}>
      <Grid item xs={2}>
        <div style={{ textAlign: "left" }}>
          先当り
        </div>
      </Grid>
      <Grid item xs={10}>
        <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <Radio.Group
            value={game.fHitted[`p${i}`]}
          >
            <Radio.Button value={"l"}>{"<"}</Radio.Button>
            <Radio.Button value={"h"}>{">"}</Radio.Button>
          </Radio.Group>
        </div>
      </Grid>
    </Grid>

  )
}

export const ModalContent = ({ g, event }: any) => {
  // must be "ADMIN"
  const game = g.data[`p_${g.game}`]


  return (
    <>
      <h1>
        {g.data.title}
        {" "}
        {g.data.gread}年
      </h1>

      <h3>
        {getClass(g.data, g.data.event)[g.game - 1][0]} - {getClass(g.data, g.data.event)[g.game - 1][1]}
        {" "}
        ({g.game})
      </h3>


      <PointInput pos={1} game={game} />
      <PointInput pos={2} game={game} />
      <PointInput pos={3} game={game} />

      <DateInput game={game} column="scheduledAt" title="予定" />
      <DateInput game={game} column="startedAt" title="開始" />
      <DateInput game={game} column="endedAt" title="終了" />

      {/* esport, soccer用の入力 */}

      {event == "dodgeball" ?
        <>
          <FHitted game={game} i={1} />
          <FHitted game={game} i={2} />
          <FHitted game={game} i={3} />
        </>
        : null
      }

      {event == "soccer" ?
        <Grid container style={{ height: 50 }}>
          <Grid item xs={2}>
            <div style={{ textAlign: "left" }}>
              PK
            </div>
          </Grid>
          <Grid item xs={10}>
            <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex" }}>
              <Radio.Group
                value={game.soccer}>
                <Radio.Button value={"l"}>{"<"}</Radio.Button>
                <Radio.Button value={"h"}>{">"}</Radio.Button>
              </Radio.Group>
            </div>
          </Grid>
        </Grid>
        : null
      }

      {event == "esport" ?
        <Grid container style={{ height: 50 }}>
          <Grid item xs={2}>
            <div style={{ textAlign: "left" }}>
              最高得点者
            </div>
          </Grid>
          <Grid item xs={10}>
            <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex" }}>
              <Radio.Group
                value={game.eSport}>
                <Radio.Button value={"l"}>{"<"}</Radio.Button>
                <Radio.Button value={"h"}>{">"}</Radio.Button>
              </Radio.Group>
            </div>
          </Grid>
        </Grid>
        : null
      }

      <Grid container style={{ height: 50 }}>
        <Grid item xs={2}>
          <div style={{ textAlign: "left" }}>
            記録者
          </div>
        </Grid>
        <Grid item xs={10}>
          <div style={{ textAlign: "center", justifyContent: "center", alignItems: "center", display: "flex" }}>
            <code>{game.recorderId}</code>
          </div>
        </Grid>
      </Grid>
    </>
  )
}
