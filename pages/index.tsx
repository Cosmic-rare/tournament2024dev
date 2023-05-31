import React, { useEffect, useState } from 'react';
import data1 from './data1.json';
import axios from "axios"
import Tournament from '@/components/Tournament';
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

export interface MyObject {
  [key: string]: any;
}

interface Score {
  id: string
  matchId: string
  position: number
  score?: number
  class: number
}

const Main: React.FC<{ data: Record<string, TournamentCellData> }> = ({ data }) => {
  const [d, setD] = useState<Score[]>([])
  const [d2, setD2] = useState(data)

  const getData = async () => {
    const da = await axios.get("http://localhost:3000/api/hello")
    setD(da.data.data)
  }

  useEffect(() => {
    try {
      getData()
    } catch (err) {}
  }, [])
  
  useEffect(() => {
    let d3:MyObject = {}
    d.forEach((val) => {
      d3[val.position.toString()] = val
    })

    draw(d3, setD2)
  }, [d, d2])

  return (
    <>
      <div style={{ width: `${30 * 15}px`, height: `320px`, overflowX: 'hidden', position: "relative" }}>
        <Tournament cells={d2} />
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <div style={{ width: `${30 * 15}px` }}>
      <Main data={data1} />
    </div>
  );
};

export default App;
