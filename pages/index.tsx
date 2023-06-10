import React, { useState } from 'react';
import Main from '@/components/Main';
import prisma from '@/util/prisma';

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

export async function getServerSideProps() {
  const data = await prisma.match.findMany();
  return {
    props: {
      data: data
    },
  };
}

interface YourComponentProps {
  data: any[];
}

const App: React.FC<YourComponentProps> = ({ data }) => {
  const [displayPoint, setDisplayPoint] = useState(false)
  return (
    <div style={{ width: `${30 * 15}px` }}>
      {data.map((val, index) => {
        return (
          <Main data={val} key={index} />
        )
      })}
      <button onClick={() => setDisplayPoint((p) => !p)}>{displayPoint ? 'hidden point' : 'display point'}</button>
      <style>{`.point { display: ${displayPoint ? 'inline' : 'none'} }`}</style>
    </div>
  );
};

export default App;
