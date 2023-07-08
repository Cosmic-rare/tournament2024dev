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
  point?: number;
  point2?: number
  edit?: number;
  edit2?: number;
  edit2_data?: number;
}

export async function getStaticProps() {
  const data1 = await prisma.match.findMany({
    where: { gread: 1 },
    orderBy: [{order: 'asc'}]
  });
  const data2 = await prisma.match.findMany({
    where: { gread: 2 },
    orderBy: [{order: 'asc'}]
  });
  const data3 = await prisma.match.findMany({
    where: { gread: 3 },
    orderBy: [{order: 'asc'}]
  });

  return {
    props: {
      data1: data1, data2: data2, data3: data3
    },
    revalidate: 10
  };
}

const width = {
  xs: 0.9, sm: 350, md: 450, lg: 450, xl: 450,
}

interface YourComponentProps {
  data1: any[];
  data2: any[];
  data3: any[];
}

const App: React.FC<YourComponentProps> = ({ data1, data2, data3 }) => {
  const groupedData1 = data1.reduce((groups, item) => {
    const { order } = item;
    if (!groups[order]) {
      groups[order] = [];
    }
    groups[order].push(item);
    return groups;
  }, []);

  const groupedData2 = data2.reduce((groups, item) => {
    const { order } = item;
    if (!groups[order]) {
      groups[order] = [];
    }
    groups[order].push(item);
    return groups;
  }, []);

  const groupedData3 = data3.reduce((groups, item) => {
    const { order } = item;
    if (!groups[order]) {
      groups[order] = [];
    }
    groups[order].push(item);
    return groups;
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>トーナメント表</h2>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <ul style={{ paddingLeft: 20 }}>
            <li>SNS等で不特定多数にシェアしないでください</li>
            <li>各種目をクリックするとトーナメントが開きます</li>
            <li>括弧の中の数字はPKや最高点です</li>
            <li>リロード(更新)すると最新のデータが表示されます</li>
          </ul>
        </Card>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <h2>1年</h2>
          {groupedData1.map((group: any, index: any) => (
            <div key={index} style={{display: "flex", justifyContent: "center", paddingTop: 4, paddingBottom: 4}}>
              {group.map((val: any, i: any) => {
                return <Main data={val} key={i} />
              })}
            </div>
          ))}
        </Card>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <h2>2年</h2>
          {groupedData2.map((group: any, index: any) => (
            <div key={index} style={{display: "flex", justifyContent: "center", paddingTop: 4, paddingBottom: 4}}>
              {group.map((val: any, i: any) => {
                return <Main data={val} key={i} />
              })}
            </div>
          ))}
        </Card>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24, marginBottom: 36 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <h2>3年</h2>
          {groupedData3.map((group: any, index: any) => (
            <div key={index} style={{display: "flex", justifyContent: "center", paddingTop: 4, paddingBottom: 4}}>
              {group.map((val: any, i: any) => {
                return <Main data={val} key={i} />
              })}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default App;
