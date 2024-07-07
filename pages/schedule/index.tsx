import { Card } from "@mui/material"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Link from "next/link"
import { blueGrey } from "@mui/material/colors"

const width = {
  xs: 0.9, sm: 350, md: 450, lg: 450, xl: 450,
}

const Schedule = () => {
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, md: 3 }}>
              {Array.from(Array(3)).map((_, k) => (
                <Grid item xs={1} key={k}>
                  <h2>{k+1}年</h2>
                  <div style={{ height: 15 }} />
                  {Array.from(Array(7)).map((_, j) => (
                    <div key={j} style={{ marginBottom: 10 }}>
                      <Link
                      href={`/schedule/${k+1}/${j+1}`}
                      style={{ color: blueGrey[900], fontSize: "1.15rem" }}
                      >{k+1}-{j+1}</Link>
                    </div>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      </div>
    </div>
  )
}

export default Schedule