import React from 'react';
import prisma from '@/util/prisma';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import data from '../data1.json';
import _ from 'lodash'
import Tournament from '@/components/edit/EditTournament';
import draw from '@/util/draw';

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
  const template = _.cloneDeep(data)

  return (
    <div style={{ width: `${30 * 15}px` }}>
      <h2>{data1.title} ({data1.gread}年)</h2>
      <Link href="/edit">edit</Link><br />
      <Link href="/">index</Link>
      <div style={{ position: "relative" }}>
        <Tournament cells={draw(data1, template)} />
      </div>
    </div>
  );
};

export default App;
