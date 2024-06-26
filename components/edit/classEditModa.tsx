import { Modal, Radio, Space, Button } from "antd"
import React, { useState, useEffect } from "react"
import type { RadioChangeEvent } from "antd"
import { CircularProgress, Backdrop } from "@mui/material"

interface YourComponentProps {
  isModalOpen: boolean
  setIsModalOpen: Function
  isLoading: boolean
  onUpdate: Function
  editPoint: number
  gread: number
  defaultClass: number
}

const ClassEditModal: React.FC<YourComponentProps> = ({ isModalOpen, setIsModalOpen, isLoading, onUpdate, editPoint, gread, defaultClass }) => {
  const [value, setValue] = useState(defaultClass)

  useEffect(() => {
    setValue(defaultClass)
  }, [defaultClass])

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value)
    setValue(e.target.value)
  }

  return (
    <Modal
      open={isModalOpen}
      closable={false}
      style={{ maxWidth: 250 }}
      onCancel={() => setIsModalOpen(false)}
      zIndex={9997}
      footer={[
        <Button
          key="cancel"
          disabled={isLoading}
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </Button>,
        <Button
          key="apply"
          type="primary"
          disabled={isLoading}
          onClick={() => {
            onUpdate(editPoint, value)
          }}>
          Apply
        </Button>
      ]}
    >
      <div style={{ position: "relative" }}>
        <Backdrop
          sx={{ color: "#fff", zIndex: 9999 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={1}>{gread}-1</Radio>
              <Radio value={2}>{gread}-2</Radio>
              <Radio value={3}>{gread}-3</Radio>
              <Radio value={4}>{gread}-4</Radio>
              <Radio value={5}>{gread}-5</Radio>
              <Radio value={6}>{gread}-6</Radio>
              <Radio value={7}>{gread}-7</Radio>
            </Space>
          </Radio.Group>
        </div>
      </div>
    </Modal>
  )
}

export default ClassEditModal
