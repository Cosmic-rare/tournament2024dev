import React from 'react';
import Tournament from '@/components/Tournament';

interface YourComponentProps {
  data: any;
}

const Main: React.FC<YourComponentProps> = ({ data }) => {
  return (
    <div>
       <div style={{ width: `${30 * 15}px`, height: `320px`, overflowX: 'hidden', position: "relative" }}>
        <Tournament cells={data} />
      </div>
    </div>
  );
};

export default Main