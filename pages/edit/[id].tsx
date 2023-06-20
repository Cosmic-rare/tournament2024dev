import React, { useState, useEffect } from 'react';
import prisma from '@/util/prisma';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import data from '../data1.json';
import _ from 'lodash'
import Tournament from '@/components/edit/EditTournament';
import draw from '@/util/draw';
import { Modal, Input, Row, Col, Button } from 'antd';
import axios from 'axios';

export interface TournamentCellData {
  text?: string;
  align_left?: boolean;
  border_top?: number;
  border_left?: number;
  class?: string;
  color?: number;
  point?: string;
  edit?: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let id: string

  if (context.params?.id === undefined || context.params?.id === null || typeof (context.params?.id) !== 'string') {
    id = ""
  } else {
    id = context.params?.id
  }

  const d = await prisma.match.findFirst({ where: { id: id } });

  return {
    props: {
      data1: d,
    },
  };
};

interface YourComponentProps {
  data1: any;
}

const App: React.FC<YourComponentProps> = ({ data1 }) => {
  const template = _.cloneDeep(data)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [l_point, setL_point] = useState(-1)
  const [h_point, setH_point] = useState(-1)
  const [editPoint, setEditPoint] = useState(0)
  const [d, sD] = useState(data1)
  const [di, sDi] = useState(draw(data1, template))

  useEffect(() => {
    sDi(draw(d, _.cloneDeep(data)))
    console.log("re render")
  }, [d])

  const onUpdate = (p: number, l_p: number, h_p: number) => {
    if (p===0) {
      return
    }
    
    axios.post(`/api/edit`, { l_p: l_p, h_p: h_p, id: d.id, p: p })
      .then((res) => { 
        axios.get(`/api/match/${d.id}`)
          .then((res) => { sD(res.data); console.log(l_p, h_p) })
          .catch((err) => (console.log(err)))
      })
      .catch((err) => {console.log(err)})
  }

  return (
    <div style={{ width: `${30 * 15}px` }}>
      <h2>{d.title} ({d.gread}年)</h2>
      <Link href="/edit">edit</Link><br />
      <Link href="/">index</Link>
      <Modal
        open={isModalOpen}
        closable={false}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>Cancel</Button>,
          <Button 
            key="reset" 
            danger 
            onClick={() => {
              onUpdate(editPoint, -1, -1)
              setIsModalOpen(false)
          }}>
            Reset
          </Button>,
          <Button 
            key="apply" 
            type="primary" 
            onClick={() => {
              onUpdate(editPoint, l_point, h_point)
              setIsModalOpen(false)
          }}>
            Apply
          </Button>
        ]}
      >
        <div>
          <Row gutter={16} justify="center">
            <Col>
              <div style={{ textAlign: 'center' }}>
                <span style={{ marginBottom: '10px' }}>1</span>
              </div>
              <Input
                value={l_point}
                onChange={(e) => {
                  setL_point(parseInt(e.target.value, 10))
                }}
                type="number"
              />
            </Col>
            <Col>
              <div style={{ textAlign: 'center' }}>
                <span style={{ marginTop: '25px', display: 'inline-block' }}>-</span>
              </div>
            </Col>
            <Col>
              <div style={{ textAlign: 'center' }}>
                <span style={{ marginBottom: '10px' }}>2</span>
              </div>
              <Input
                value={h_point}
                onChange={(e) => {
                  setH_point(parseInt(e.target.value, 10))
                }}
                type="number"
              />
            </Col>
          </Row>
        </div>
      </Modal>
      <div style={{ position: "relative" }}>
        <Tournament 
          cells={di} 
          onModalOpen={(p:number) => {
            setEditPoint(p)

            if (d[`p_${p}`]["l_p"] === -1) {
              setL_point(0)  
            } else {
              setL_point(d[`p_${p}`]["l_p"])
            }

            if (d[`p_${p}`]["h_p"] === -1) {
              setH_point(0)  
            } else {
              setH_point(d[`p_${p}`]["h_p"])
            }

            setIsModalOpen(true)
          }} 
        />
      </div>
    </div>
  );
};

export default App;
