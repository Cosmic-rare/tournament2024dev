import React from 'react';
import Tournament from '@/components/Tournament';
import draw from '@/util/draw';
import data1 from './data1.json';
import _ from 'lodash'

interface YourComponentProps {
  data: any;
}

const Main: React.FC<YourComponentProps> = ({ data }) => {
  const template = _.cloneDeep(data1)

  return (
    <div>
       <div style={{ width: `${30 * 15}px`, height: `320px`, overflowX: 'hidden', position: "relative" }}>
        <h3>{data.title} ({data.gread}年)</h3>
        <Tournament cells={draw(data, template)} />
      </div>
    </div>
  );
};

export default Main