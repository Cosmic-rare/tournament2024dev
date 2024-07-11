import { Card } from "@mui/material"
import Head from "next/head"

const width = {
  xs: 0.9, sm: 350, md: 450, lg: 450, xl: 450,
}

const Documents = () => {
  return (
    <div>
      <Head>
        <title>ルール・要項</title>
      </Head>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>ルール・要項</h2>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          
        </Card>
      </div>
    </div>
  )
}

export default Documents