import React, { useState } from 'react';
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

  const data1 = await prisma.match.findFirst({ where: { id: id } });

  return {
    props: {
      data1: data1,
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

  const onUpdate = (p: number, l_p: number, h_p: number) => {
    if (p===0) {
      return
    }
    
    axios.post(`/api/edit`, { l_p: l_p, h_p: h_p, id: data1.id, p: p })
      .then((res) => {console.log("sucess")})
      .catch((err) => {console.log(err)})
  }

  return (
    <div style={{ width: `${30 * 15}px` }}>
      <h2>{data1.title} ({data1.gread}年)</h2>
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
          cells={draw(data1, template)} 
          onModalOpen={(p:number) => {
            setEditPoint(p)

            if (data1[`p_${p}`]["l_p"] === -1) {
              setL_point(0)  
            } else {
              setL_point(data1[`p_${p}`]["l_p"])
            }

            if (data1[`p_${p}`]["h_p"] === -1) {
              setH_point(0)  
            } else {
              setH_point(data1[`p_${p}`]["h_p"])
            }

            setIsModalOpen(true)
          }} 
        />
      </div>
    </div>
  );
};

export default App;
