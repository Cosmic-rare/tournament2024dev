import React, { useState } from 'react';
import { signIn } from "next-auth/react"
import Main from '@/components/top/Main';
import prisma from '@/util/prisma';
import Link from 'next/link';
import { Card } from '@mui/material';

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
  edit2_data?: number;
}

export async function getStaticProps() {
  const data1 = await prisma.match.findMany({
    where: { gread: 1 },
    orderBy: [
      {
        order: 'asc',
      },
    ]
  });
  const data2 = await prisma.match.findMany({
    where: { gread: 2 },
    orderBy: [
      {
        order: 'asc',
      },
    ]
  });
  const data3 = await prisma.match.findMany({
    where: { gread: 3 },
    orderBy: [
      {
        order: 'asc',
      },
    ]
  });

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
    <div>
      <p><code>/</code></p>
      <Link href="/edit">edit</Link>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            width: {
              xs: 0.9, // theme.breakpoints.up('xs')
              sm: 400, // theme.breakpoints.up('sm')
              md: 550, // theme.breakpoints.up('md')
              lg: 550, // theme.breakpoints.up('lg')
              xl: 550, // theme.breakpoints.up('xl')
            },
          }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <h2>1年</h2>
          {data1.map((val, index) => {
            return <Main data={val} key={index} />;
          })}
        </Card>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{
            width: {
              xs: 0.9, // theme.breakpoints.up('xs')
              sm: 400, // theme.breakpoints.up('sm')
              md: 550, // theme.breakpoints.up('md')
              lg: 550, // theme.breakpoints.up('lg')
              xl: 550, // theme.breakpoints.up('xl')
            },
          }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <h2>2年</h2>
          {data2.map((val, index) => {
            return <Main data={val} key={index} />;
          })}
        </Card>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{
            width: {
              xs: 0.9, // theme.breakpoints.up('xs')
              sm: 400, // theme.breakpoints.up('sm')
              md: 550, // theme.breakpoints.up('md')
              lg: 550, // theme.breakpoints.up('lg')
              xl: 550, // theme.breakpoints.up('xl')
            },
          }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <h2>3年</h2>
          {data3.map((val, index) => {
            return <Main data={val} key={index} />;
          })}
        </Card>
      </div>

      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

export default App;
