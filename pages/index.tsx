import React, { useState } from 'react';
import Main from '@/components/top/Main';
import prisma from '@/util/prisma';
import Link from 'next/link';

export interface TournamentCellData {
  text?: string;
  align_left?: boolean;
  border_top?: number;
  border_left?: number;
  class?: string;
  color?: number;
  point?: string;
  edit?: number;
  edit2?: number;
}

export async function getStaticProps() {
  const data1 = await prisma.match.findMany({where: {gread: 1}});
  const data2 = await prisma.match.findMany({where: {gread: 2}});
  const data3 = await prisma.match.findMany({where: {gread: 3}});

  return {
    props: {
      data1: data1,
      data2: data2,
      data3: data3
    },
  };
}

interface YourComponentProps {
  data1: any[];
  data2: any[];
  data3: any[];
}

const App: React.FC<YourComponentProps> = ({ data1, data2, data3 }) => {
  const [displayPoint, setDisplayPoint] = useState(false)
  return (
    <div style={{ width: `${30 * 15}px` }}>
      <p><code>/</code></p>
      <Link href="/edit">edit</Link>
      <h2>1年</h2>
      {data1.map((val, index) => {
        return (
          <Main data={val} key={index} />
        )
      })}
      <hr />

      <h2>2年</h2>
      {data2.map((val, index) => {
        return (
          <Main data={val} key={index} />
        )
      })}
      <hr />

      <h2>3年</h2>
      {data3.map((val, index) => {
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
