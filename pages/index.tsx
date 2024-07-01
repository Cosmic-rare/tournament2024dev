import { Card } from "@mui/material"

const width = {
  xs: 0.9, sm: 350, md: 450, lg: 450, xl: 450,
}

const Index = () => {
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
    </div>
  )
}

export default Index