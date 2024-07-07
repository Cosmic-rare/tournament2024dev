import { useState, useEffect } from "react"
import { APIget } from "@/util/api"
import { Card, Checkbox } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

const width = {
  xs: 0.9, sm: 350, md: 450, lg: 450, xl: 450,
}

const Index = () => {
  const [match, setMatch] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await APIget(`match/now`, () => { }, () => { })
      setMatch(res)
    }
    fetchData()
  }, [])

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>スポーツ大会2024</h2>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <h3>開催まで{Math.ceil((new Date(2024, 6, 16).valueOf() - Date.now())/1000/60/60/24)}日</h3>
        </Card>
      </div>
      
      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <h3>開催中の競技</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 0 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">種目</TableCell>
                  <TableCell align="center">pos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {match.map((m: any) => (
                  <TableRow
                    key={m.id}
                  >
                    <TableCell align="center">
                      {m.data.title}
                    </TableCell>
                    <TableCell align="center">
                      {m.game}
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