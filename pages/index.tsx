import React from 'react';
import data from './data.json';

interface TournamentCellData {
  text?: string;
  align_left?: boolean;
  border_top?: number;
  border_left?: number;
  class?: string;
  color?: number;
  point?: string;
}

interface TournamentData {
  name: string;
  cells: Record<string, TournamentCellData>;
}

interface TournamentsData {
  [key: string]: TournamentData;
}

interface MainProps {
  tournaments: TournamentsData;
}

const Main: React.FC<MainProps> = ({ tournaments }) => {
  return (
    <>
      {Object.entries(tournaments).map(([t, tournament]) => (
        <div key={t} style={{ position: 'relative', height: `${Math.max(...Object.keys(tournament.cells).map(cell => parseFloat(cell.split('_')[0]))) + 2}em`, overflowX: 'hidden' }}>
          <Tournament cells={tournament.cells} />
        </div>
      ))}
    </>
  );
};

interface TournamentProps {
  cells: Record<string, TournamentCellData>;
}

const Tournament: React.FC<TournamentProps> = ({ cells }) => {
  const colors = ["#adb5bd", "#dc3545"];

  return (
    <>
      {Object.entries(cells).map(([cell, cellData]) => {
        const cellStyle: React.CSSProperties = {
          position: 'absolute',
          top: `${parseFloat(cell.split('_')[0])}em`,
          left: `${parseFloat(cell.split('_')[1]) * 13}%`,
          height: 'calc(1em + 3px)',
          width: 'calc(13% + 3px)',
          paddingRight: cellData.align_left ? '0' : '10px',
          borderTop: cellData.border_top ? `3px solid ${colors[cellData.border_top - 1]}` : 'none',
          borderLeft: cellData.border_left ? `3px solid ${colors[cellData.border_left - 1]}` : 'none',
          // transform: 'scaleY(0.9999)',
        };

        return (
          <div key={cell} style={cellStyle}>
            <div className={cellData.class} style={{ fontSize: '0.8em', width: '100%', textAlign: cellData.align_left ? 'left' : 'right', color: cellData.color ? colors[cellData.color - 1] : 'inherit' }}>
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
    <div style={{width: 450}}>
      <Main tournaments={data.tournaments} />
    </div>
  );
};

export default App;
