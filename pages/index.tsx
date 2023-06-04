import React, { useEffect, useState } from 'react';
import axios from "axios"
import Main from '@/components/Main';
import { PrismaClient } from '@prisma/client'
import data1 from './data1.json';
import draw from '@/util/draw';

export interface TournamentCellData {
  text?: string;
  align_left?: boolean;
  border_top?: number;
  border_left?: number;
  class?: string;
  color?: number;
  point?: string;
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  
  const data = await prisma.match.findFirst({ where: { id: 'clignzwna0000vch8i35ps7vx' } });
  const data2 = draw(data, data1)

  return {
    props: {
      data: data2
    },
  };
}

interface YourComponentProps {
  data: any;
}

const App: React.FC<YourComponentProps> = ({ data }) => {
  return (
    <div style={{ width: `${30 * 15}px` }}>
      <Main data={data} />
    </div>
  );
};

export default App;
