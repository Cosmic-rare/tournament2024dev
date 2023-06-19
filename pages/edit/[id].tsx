import React, { useState } from 'react';
import prisma from '@/util/prisma';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import data from '../data1.json';
import _ from 'lodash'
import Tournament from '@/components/edit/EditTournament';
import draw from '@/util/draw';
import { Modal, Input, Row, Col, Button } from 'antd';

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

  return (
    <div style={{ width: `${30 * 15}px` }}>
      <h2>{data1.title} ({data1.gread}年)</h2>
      <Link href="/edit">edit</Link><br />
      <Link href="/">index</Link>
      <Modal
        open={isModalOpen}
        closable={false}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel">Cancel</Button>,
          <Button key="reset" danger>Reset</Button>,
          <Button key="apply" type="primary">Apply</Button>
        ]}
      >
        <div>
          <Row gutter={16} justify="center">
            <Col>
              <div style={{ textAlign: 'center' }}>
                <span style={{ marginBottom: '10px' }}>1</span>
              </div>
              <Input
                placeholder="Team 1 Score"
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
                placeholder="Team 2 Score"
                type="number"
              />
            </Col>
          </Row>
        </div>
      </Modal>
      <div style={{ position: "relative" }}>
        <Tournament cells={draw(data1, template)} onModalOpen={() => setIsModalOpen(true)} />
      </div>
    </div>
  );
};

export default App;
