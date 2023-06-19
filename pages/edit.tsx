import React from 'react';
import prisma from '@/util/prisma';
import { Button } from 'antd';
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
}

interface YourComponentProps2 {
  data: any;
}

const Main2: React.FC<YourComponentProps2> = ({ data }) => {
  return (
    <div>
      <Button type="primary" href={`edit/${data.id}`}>
        {data.title} ({data.gread}年)
      </Button>
    </div>
  );
};

export async function getServerSideProps() {
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
  return (
    <div style={{ width: `${30 * 15}px` }}>
      <p><code>edit</code></p>
      <Link href="/">index</Link>
      <h2>1年</h2>
      {data1.map((val, index) => {
        return (
          <Main2 data={val} key={index} />
        )
      })}
      <hr />

      <h2>2年</h2>
      {data2.map((val, index) => {
        return (
          <Main2 data={val} key={index} />
        )
      })}
      <hr />

      <h2>3年</h2>
      {data3.map((val, index) => {
        return (
          <Main2 data={val} key={index} />
        )
      })}
    </div>
  );
};

export default App;
