import React from 'react';
import data1 from './data1.json';
import data2 from './data2.json';
import data3 from './data3.json';
import data4 from './data4.json';

interface TournamentCellData {
  text?: string;
  align_left?: boolean;
  border_top?: number;
  border_left?: number;
  class?: string;
  color?: number;
  point?: string;
}

const Main: React.FC<{ data: Record<string, TournamentCellData> }> = ({ data }) => {
  return (
    <details>
      <summary>ひらく</summary>
      <div style={{ width: `${30 * 15}px`, height: `320px`, overflowX: 'hidden', position: "relative" }}>
        <Tournament cells={data} />
      </div>
    </details>
  );
};

const Tournament: React.FC<{ cells: Record<string, TournamentCellData> }> = ({ cells }) => {
  const colors = ["#adb5bd", "#dc3545"];
  const width = 30
  const height = 50

  return (
    <>
      {Object.entries(cells).map(([cell, cellData]) => {
        const cellStyle: React.CSSProperties = {
          position: 'absolute',
          top: `${(5 - parseFloat(cell.split('_')[1])) * height}px`,
          left: `${parseFloat(cell.split('_')[0]) * width}px`,
          height: `${height}px`,
          width: `${width}px`,
          paddingRight: cellData.align_left ? '10px' : '0',
          borderTop: cellData.border_top ? `3px solid ${colors[cellData.border_top - 1]}` : 'none',
          borderLeft: cellData.border_left ? `3px solid ${colors[cellData.border_left - 1]}` : 'none',
          verticalAlign: "bottom",
          display: "flex",
          alignItems: `${cell.split("_")[1] === "0" ? "" : "flex-end"}`,
        };

        return (
          <div key={cell} style={cellStyle}>
            <div className={cellData.class} style={{ fontSize: '0.8em', width: '100%', textAlign: cellData.align_left ? 'left' : 'center', color: cellData.color ? colors[cellData.color - 1] : 'inherit', verticalAlign: "bottom" }}>
              {cellData.point ? cellData.point : cellData.text}
            </div>
          </div>
        );
      })}
    </>
  );
};

const App: React.FC = () => {
  return (
    <div style={{ width: `${30 * 15}px` }}>
      <Main data={data1} />
      <Main data={data2} />
      <Main data={data3} />
      <Main data={data4} />
    </div>
  );
};

export default App;
