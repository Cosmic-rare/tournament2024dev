import { Card, Checkbox } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { APIget } from "@/util/api"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const width = {
  xs: 0.9, sm: 350, md: 450, lg: 450, xl: 450,
}

const Schedule = () => {
  const router = useRouter()
  const { targetGrade, targetClass } = router.query

  const [rows, setRows] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      if (!(targetClass && targetGrade)) return
      const res = await APIget(`get/match/${targetGrade}/${targetClass}/`, () => { }, () => { })
      setRows(res)
    }
    fetchData()
  }, [targetGrade, targetClass])

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>スケジュール</h2>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">済</TableCell>
                  <TableCell align="center">種目</TableCell>
                  <TableCell align="center">確定(相)</TableCell>
                  <TableCell align="center">確定(試)</TableCell>
                  <TableCell align="center">相手</TableCell>
                  <TableCell align="center">game</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any) => (
                  <TableRow
                    key={row.data.title}
                  >
                    <TableCell align="center">
                      <Checkbox disabled={false} checked={row.data[`p_${row.game}`].applied} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.data.title}
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox disabled={false} checked={row.certaintyOpponent} />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox disabled={false} checked={row.certaintyMatch} />
                    </TableCell>
                    <TableCell align="left">{row.opponent ? row.opponent.join(", ") : null}</TableCell>
                    <TableCell align="right">
                      {
                        row.data[`p_${row.game}`].scheduledAt ?
                          new Date(row.data[`p_${row.game}`].scheduledAt).toLocaleString('en-us', { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false })
                          : "-"
                      }
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

export default Schedule