import { Card } from "@mui/material"

const width = {
  xs: 0.9, sm: 350, md: 450, lg: 450, xl: 450,
}

const Index = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <code>{localStorage.getItem("id")}</code>
        </Card>
      </div>
    </div>
  )
}

export default Index