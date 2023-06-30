import Tournament from '@/components/top/Tournament';
import draw from '@/util/draw';
import data1 from '../data1.json';
import _ from 'lodash'
import { Modal } from 'antd';
import React, { useState } from 'react';
import { Button } from '@mui/material';

interface YourComponentProps {
  data: any;
}

const Main: React.FC<YourComponentProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayPoint, setDisplayPoint] = useState(false)

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const template = _.cloneDeep(data1)

  return (
    <div style={{width: "100%"}}>
      <Button variant="contained" onClick={showModal} sx={{width: "100%"}} style={{textTransform: 'none'}}>
        {data.sex === "male" ? "男" : data.sex === "female" ? "女" : ""}{data.title} ({data.gread}年)
      </Button>
      <Modal 
        title={`${data.sex === "male" ? "男" : data.sex === "female" ? "女" : ""}${data.title} (${data.gread}年)`} 
        open={isModalOpen} 
        onCancel={handleCancel} 
        width={30 * 15 + 24 * 2} 
        footer={[]}
      >
        <button onClick={() => setDisplayPoint((p: boolean) => !p)}>{displayPoint ? 'hidden point' : 'display point'}</button>
        <div style={{ height: `320px`, overflowX: 'scroll', position: "relative" }}>
          <div style={{ width: `${30 * 15}px`, height: `320px`, overflowY: 'scroll', position: "relative" }}>
            <Tournament cells={draw(data, template)} displayPoint={displayPoint} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Main