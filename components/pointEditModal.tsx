import React from 'react';
import { Modal, Input, Row, Col, Button } from 'antd';
import { CircularProgress, Backdrop } from '@mui/material';

interface YourComponentProps {
  isModalOpen: boolean
  setIsModalOpen: Function
  isLoading: boolean
  onUpdate: Function
  editPoint: number
  l_point: number
  h_point: number
  setL_point: Function
  setH_point: Function
  l_point2: number
  h_point2: number
  setL_point2: Function
  setH_point2: Function
  type: number
}

const PointEditModal: React.FC<YourComponentProps> = ({ isModalOpen, setIsModalOpen, isLoading, onUpdate, editPoint, l_point, h_point, setL_point, setH_point, type, l_point2, h_point2, setL_point2, setH_point2 }) => {

  return (
    <Modal
      open={isModalOpen}
      closable={false}
      zIndex={9997}
      onCancel={() => setIsModalOpen(false)}
      footer={[
        <Button key="cancel" disabled={isLoading} onClick={() => setIsModalOpen(false)}>Cancel</Button>,
        <Button
          key="reset"
          danger
          disabled={isLoading}
          onClick={() => {
            onUpdate(editPoint, -1, -1, true, -1, -1, type)
          }}>
          Reset
        </Button>,
        <Button
          key="apply"
          type="primary"
          disabled={isLoading}
          onClick={() => {
            onUpdate(editPoint, l_point, h_point, false, l_point2, h_point2, type)
          }}>
          Apply
        </Button>
      ]}
    >
      <div style={{ position: "relative" }}>
        <Backdrop
          sx={{ color: '#fff', zIndex: 9999 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div>
          <Row gutter={16} justify="center">
            <Col span={5}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ marginBottom: '10px', display: "inline-block" }}>{/* 1 */}</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Input
                  value={l_point}
                  disabled={isLoading}
                  onChange={(e) => {
                    setL_point(parseInt(e.target.value, 10))
                  }}
                  type="number"
                  style={{ width: "80%", textAlign: "center" }}
                />
              </div>
            </Col>
            <Col span={2}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ marginTop: '25px', display: 'inline-block' }}>-</span>
              </div>
            </Col>
            <Col span={5}>
              <div style={{ textAlign: 'center' }}>
              <span style={{ marginBottom: '10px', display: "inline-block" }}>{/* 2 */}</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Input
                  value={h_point}
                  disabled={isLoading}
                  onChange={(e) => {
                    setH_point(parseInt(e.target.value, 10))
                  }}
                  type="number"
                  style={{ width: "80%", textAlign: "center" }}
                />
              </div>
            </Col>
          </Row>
          {type === 1 || type === 2 ? <Row gutter={16} justify="center" style={{ marginTop: 8 }}>
            <Col span={4}>
              <div style={{ textAlign: 'center' }}>
                <Input
                  value={l_point2}
                  disabled={isLoading}
                  onChange={(e) => {
                    setL_point2(parseInt(e.target.value, 10))
                  }}
                  type="number"
                  style={{ width: "80%", textAlign: "center" }}
                />
              </div>
            </Col>
            <Col span={4}>
              <div style={{ textAlign: 'center' }}>
                {type === 1 ?
                  <span style={{ marginTop: '5px', display: 'inline-block', fontSize: 14 }}>最高点</span>
                  :
                  <span style={{ marginTop: '5px', display: 'inline-block', fontSize: 14 }}>PK</span>
                }
              </div>
            </Col>
            <Col span={4}>
              <div style={{ textAlign: 'center' }}>
                <Input
                  value={h_point2}
                  disabled={isLoading}
                  onChange={(e) => {
                    setH_point2(parseInt(e.target.value, 10))
                  }}
                  type="number"
                  style={{ width: "80%", textAlign: "center" }}
                />
              </div>
            </Col>
          </Row> : null}
          <div style={{ height: 10 }} />
        </div>
      </div>
    </Modal>
  );
};

export default PointEditModal;
