import React, { useState, useEffect } from 'react';
import prisma from '@/util/prisma';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import data from '../data1.json';
import _ from 'lodash'
import Tournament from '@/components/edit/EditTournament';
import draw from '@/util/draw';
import { Modal, Input, Row, Col, Button, Spin, Card, notification } from 'antd';
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
  const [cells, setCells] = useState({})

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setCells((p) => draw(d, template))
    console.log("re render")
  }, [d])

  const handleOnOpenModal = (p: number) => {
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
  }

  const [api, contextHolder] = notification.useNotification();

  const onUpdate = (p: number, l_p: number, h_p: number) => {
    if (l_p < 0 || h_p < 0) {
      return api.warning({
        message: 'Valid',
        description:
          'まいなすはないで',
        duration: 10,
      });
    }

    if (l_p === h_p) {
      if (l_p !== -1) {
        return api.warning({
          message: 'Valid',
          description:
            'どうてん無理やで',
          duration: 10,
        });
      }
    }

    setIsLoading(true)

    axios.post(`/api/edit`, { l_p: l_p, h_p: h_p, id: d.id, p: p })
      .then(() => {
        axios.get(`/api/match/${d.id}`)
          .then((res) => {
            sD(res.data);
          })
          .catch((err) => {
            console.log(err)

            api.error({
              message: 'Faild to get new data',
              description:
                'だめですごめんなさい',
              duration: 10,
            });
          })
      })
      .catch((err) => {
        console.log(err)
        api.error({
          message: 'Faild to update',
          description:
            'だめですごめんなさい',
          duration: 10,
        });
      })
      .finally(() => { setIsLoading(false); setIsModalOpen(false) })
  }

  return (
    <div style={{ width: `${30 * 15}px` }}>
      <h2>{d.title} ({d.gread}年)</h2>
      {contextHolder}
      <Link href="/edit">edit</Link><br />
      <Link href="/">index</Link>
      <Modal
        open={isModalOpen}
        closable={false}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" disabled={isLoading} onClick={() => setIsModalOpen(false)}>Cancel</Button>,
          <Button
            key="reset"
            danger
            disabled={isLoading}
            onClick={() => {
              onUpdate(editPoint, -1, -1)
            }}>
            Reset
          </Button>,
          <Button
            key="apply"
            type="primary"
            disabled={isLoading}
            onClick={() => {
              onUpdate(editPoint, l_point, h_point)
            }}>
            Apply
          </Button>
        ]}
      >
        <div style={{ position: "relative" }}>
          {isLoading ?
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 100 }}>
              <Card style={{}} >
                <Spin />
              </Card>
            </div>
            : null}
          <div>
            <Row gutter={16} justify="center">
              <Col>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ marginBottom: '10px' }}>1</span>
                </div>
                <Input
                  value={l_point}
                  disabled={isLoading}
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
                  disabled={isLoading}
                  onChange={(e) => {
                    setH_point(parseInt(e.target.value, 10))
                  }}
                  type="number"
                />
              </Col>
            </Row>
          </div>
        </div>
      </Modal>
      <div style={{ position: "relative" }}>
        <Tournament
          cells={cells}
          onModalOpen={handleOnOpenModal}
        />
      </div>
    </div>
  );
};

export default App;
