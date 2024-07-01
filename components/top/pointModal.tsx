import { Modal, Radio, Space, Button } from "antd"
import { Grid } from "@mui/material"

interface Props {
  isModalOpen: boolean
  setIsModalOpen: Function
  data: any
  event: string
}

const Point = ({ l, h, t }: any) => {
  return (
    <Grid container spacing={2} style={{ justifyContent: "center", textAlign: "center", fontSize: "1.1em" }}>
      <Grid item xs={2}>
        <div>{t}</div>
      </Grid>
      <Grid item xs={4}>
        <div>{l}</div>
      </Grid>
      <Grid item xs={2}>
        <div>-</div>
      </Grid>
      <Grid item xs={4}>
        <div>{h}</div>
      </Grid>
    </Grid>
  )
}

const PK = ({ pk }: any) => {
  return (
    <Grid container spacing={2} style={{ justifyContent: "center", textAlign: "center", fontSize: "1.1em" }}>
      <Grid item xs={12}>
        <div>{JSON.stringify(pk)}</div>
      </Grid>
    </Grid>
  )
}

const PointModal: React.FC<Props> = ({ isModalOpen, setIsModalOpen, data, event }) => {
  return (
    <Modal
      open={isModalOpen}
      closable={false}
      style={{ maxWidth: 300 }}
      onCancel={() => setIsModalOpen(false)}
      zIndex={9997}
      footer={[]}
    >
      <div style={{ position: "relative" }}>
        {/* eventで分けながらdata表示 */}
        <h4>得点</h4>
        <Point l={data?.l_p1} h={data?.h_p1} t="1st" />
        <Point l={data?.l_p2} h={data?.h_p2} t="2nd" />
        <Point l={data?.l_p3} h={data?.h_p3} t="3rd" />

        {event == "soccer" ? <PK pk={data?.pk} /> : null}
      </div>
    </Modal>
  )
}

export default PointModal
