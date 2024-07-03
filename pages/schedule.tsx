import { Card } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { APIget } from "@/util/api"
import { useEffect, useState } from "react"

const width = {
  xs: 0.9, sm: 350, md: 450, lg: 450, xl: 450,
}

const Schedule = () => {
  const [rows, setRows] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await APIget(`get/match/2/`, () => { }, () => { })
      // @ts-ignor
      setRows(res)
    }
    fetchData()
  }, [])

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
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">種目</TableCell>
                  <TableCell align="right">opponent</TableCell>
                  <TableCell align="right">game</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any) => (
                  <TableRow
                    key={row.data.title}
                  >
                    <TableCell component="th" scope="row">
                      {row.data.title}
                    </TableCell>
                    <TableCell align="right">{row.opponent.join(", ")}</TableCell>
                    <TableCell align="right">{new Date(row.data[`p_${row.game}`].scheduledAt).toISOString()}</TableCell>
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