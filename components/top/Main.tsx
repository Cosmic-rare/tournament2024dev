import Tournament from "@/components/top/Tournament"
import draw from "@/util/draw"
import data1 from "../data1.json"
import _ from "lodash"
import { Modal } from "antd"
import React, { useState } from "react"
import { Button } from "@mui/material"

interface YourComponentProps {
  data: any
}

const Main: React.FC<YourComponentProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const template = _.cloneDeep(data1)

  return (
    <div style={{width: "100%", maxWidth: "50%", paddingLeft: 4, paddingRight: 4}}>
      <Button variant="contained" onClick={showModal} sx={{width: "100%", height: 54, borderRadius: "50rem"}} style={{textTransform: "none", backgroundColor: data.sex === "male" ? "#448aff" : data.sex === "female" ? "#ff5252" : "#8BC34A"}}>
        {data.sex === "male" ? "男" : data.sex === "female" ? "女" : ""}{data.title}
      </Button>
      <Modal 
        title={`${data.sex === "male" ? "男" : data.sex === "female" ? "女" : ""}${data.title} (${data.gread}年)`} 
        open={isModalOpen} 
        onCancel={handleCancel} 
        width={30 * 15 + 24 * 2} 
        footer={[]}
      >
        <div style={{ height: `320px`, overflowX: "hidden", position: "relative" }}>
          <div style={{ width: `${30 * 15}px`, height: `320px`, overflowY: "hidden", position: "relative" }}>
            <Tournament cells={draw(data, template)} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Main