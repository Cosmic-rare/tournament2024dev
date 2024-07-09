import { useState, useEffect } from "react"
import { APIget, APIpost } from "@/util/api"
import { Button, Card } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import getClass from "@/util/cl"
import PointEditModal from "@/components/apply/pointEditModal"
import { useTokenStore } from "@/util/store"
import { notification } from "antd"

const width = {
  xs: 0.9, sm: 350, md: 450, lg: 450, xl: 450,
}

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [applyGame, setApplyGame] = useState<null | number>(null)
  const [isLoading, setIsLoading] = useState(false)
  const token = useTokenStore((s) => s.token)
  const updateToken = useTokenStore((s) => s.setToken)
  const [api, contextHolder] = notification.useNotification()
  const [d, sD] = useState([])

  const fetchData = async () => {
    const res = await APIget(`match/nApplied`, () => { }, () => { })
    sD(res)
  }

  const eAPI = (message: string, description = "だめですごめんなさい") => {
    api.error({ message: message, description: description, duration: 6, placement: "bottomRight", className: "custom-notification" })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const updateFetch = async (id: string, game: number) => {
    setIsLoading(true)
    await APIpost(
      `match/apply/${id}/${game}`,
      { token: token },
      () => eAPI("Faild to update"),
      async () => {
        fetchData()
        setIsLoading(false)
        setIsModalOpen(false)
        setApplyGame(null)
      },
      () => { updateToken("") }
    )
  }

  return (
    <div>
      {contextHolder}

      {applyGame != null ?
        <PointEditModal
          isModalOpen={isModalOpen}
          closeModal={() => { setIsModalOpen(false); setApplyGame(null) }}
          isLoading={isLoading}
          game={d[applyGame]}
          // @ts-ignore
          updateFetch={() => { updateFetch(d[applyGame].id, d[applyGame].game) }}
        />
        : null
      }

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <h2>Apply</h2>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">種目</TableCell>
                  <TableCell align="center">学年</TableCell>
                  <TableCell align="center">クラス</TableCell>
                  <TableCell align="center">ゲーム</TableCell>
                  <TableCell align="center">適用</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {d.map((m: any, i:number) => (
                  <TableRow
                    key={m.id + m.game}
                  >
                    <TableCell align="center">
                      {m.data.title}
                    </TableCell>
                    <TableCell align="center">
                      {m.data.gread}
                    </TableCell>
                    <TableCell align="center">
                      {getClass(m.data, m.data.event)[m.game - 1][0]} - {getClass(m.data, m.data.event)[m.game - 1][1]}
                    </TableCell>
                    <TableCell align="center">
                      {m.game}
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" onClick={() => { setApplyGame(i); setIsModalOpen(true) }}>適用</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </div>
  )
}

export default Index