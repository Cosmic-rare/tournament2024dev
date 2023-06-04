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

const Main: React.FC = () => {
  const [cells, setCells] = useState(data1)
  const [remote, setRemote] = useState()

  const getData = async () => {
    const da = await axios.get("api/hello")
    setRemote(da.data.data)
  }

  useEffect(() => {
    try {
      getData()
    } catch (err) {}
  }, [])

  useEffect(() => {
    draw(remote, setCells)
  }, [remote])

  return (
    <div>
       <div style={{ width: `${30 * 15}px`, height: `320px`, overflowX: 'hidden', position: "relative" }}>
        <Tournament cells={cells} />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div style={{ width: `${30 * 15}px` }}>
      <Main />
    </div>
  );
};

export default App;
