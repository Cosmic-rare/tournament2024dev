import React, { useState } from 'react';
import Main from '@/components/edit/EditMain';
import prisma from '@/util/prisma';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

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

  if (context.params?.id === undefined || context.params?.id === null || typeof(context.params?.id) !== 'string') {
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
  return (
    <div style={{ width: `${30 * 15}px` }}>
      <h2>1年</h2>
      {data1 ? <Main data={data1} /> : <></>}
    </div>
  );
};

export default App;
