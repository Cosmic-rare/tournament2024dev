import { Card, Checkbox, FormControlLabel } from "@mui/material"
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
import Head from "next/head"

const width = {
  xs: 0.9, sm: 350, md: 450, lg: 450, xl: 450,
}

const Schedule = () => {
  const router = useRouter()
  const { targetGrade, targetClass } = router.query
  const [displayApplied, setDisplayApplied] = useState(false)
  const [displayConfirmed, setDisplayConfirmed] = useState(false)

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
      <Head>
        <title>{targetGrade}-{targetClass}のスケジュール</title>
      </Head>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{targetGrade}-{targetClass}</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <div>
            <FormControlLabel control={<Checkbox checked={displayApplied} onClick={() => setDisplayApplied((p: any) => !p)} />} label="終わった試合も表示" />
          </div>
          <div>
            <FormControlLabel control={<Checkbox checked={displayConfirmed} onClick={() => setDisplayConfirmed((p: any) => !p)} />} label="確定した試合のみ表示" />
          </div>
        </Card>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">済</TableCell>
                  <TableCell align="center">種目</TableCell>
                  <TableCell align="center">確定(試)</TableCell>
                  <TableCell align="center">相手</TableCell>
                  <TableCell align="center">game</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any) => (
                  <>
                    {
                      (!displayConfirmed || row.certaintyMatch == displayConfirmed) && (displayApplied || !row.data[`p_${row.game}`].applied) ?
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
                        : null
                    }
                  </>
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