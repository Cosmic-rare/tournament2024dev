import React, { useEffect, useState } from 'react';
import axios from "axios"
import Tournament from '@/components/Tournament';

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
  const [cells, setCells] = useState({})

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/hello');
        setCells(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

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
