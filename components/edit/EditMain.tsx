import Tournament from '@/components/edit/EditTournament';
import draw from '@/util/draw';
import data1 from '../data1.json';
import _ from 'lodash'
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

interface YourComponentProps {
  data: any;
}

const Main: React.FC<YourComponentProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleReset = () => {
    console.log('reset request!')
    setIsModalOpen(false)
  }

  const template = _.cloneDeep(data1)

  return (
    <div>
      <div style={{ height: `320px`, overflowX: 'hidden', position: "relative" }}>
        <div style={{ width: `${30 * 15}px`, height: `320px`, overflowY: 'hidden', position: "relative" }}>
          <Tournament cells={draw(data, template)} />
        </div>
      </div>
    </div>
  );
};

export default Main