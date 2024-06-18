import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { APIget } from '@/util/api'
import draw from '@/util/draw';
import data1 from '@/components/data1.json';
import _ from 'lodash'
import { Modal } from 'antd';
import { Button, FormControlLabel, Checkbox } from '@mui/material';

// ----- Main.tsx -----

interface YourComponentProps {
  data: any;
}

const Main: React.FC<YourComponentProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayPoint, setDisplayPoint] = useState(true)

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const template = _.cloneDeep(data1)

  return (
    <div style={{width: "100%", maxWidth: "50%", paddingLeft: 4, paddingRight: 4}}>
      <Button variant="contained" onClick={showModal} sx={{width: "100%", height: 54, borderRadius: "50rem"}} style={{textTransform: 'none', backgroundColor: data.sex === "male" ? "#448aff" : data.sex === "female" ? "#ff5252" : "#8BC34A"}}>
        {data.sex === "male" ? "男" : data.sex === "female" ? "女" : ""}{data.title}
      </Button>
      <Modal 
        title={`${data.sex === "male" ? "男" : data.sex === "female" ? "女" : ""}${data.title} (${data.gread}年)`} 
        open={isModalOpen} 
        onCancel={handleCancel} 
        width={30 * 15 + 24 * 2} 
        footer={[]}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: "column" }}>
          <FormControlLabel
            control={<Checkbox checked={displayPoint} onChange={() => setDisplayPoint((p: boolean) => !p)} />}
            label="点数表示"
          />
        </div>
        <div style={{ height: `320px`, overflowX: 'hidden', position: "relative" }}>
          <div style={{ width: `${30 * 15}px`, height: `320px`, overflowY: 'hidden', position: "relative" }}>
            <Tournament cells={draw(data, template)} displayPoint={displayPoint} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

// --------------------

// ----- Tournament.tsx -----

const Tournament: React.FC<{ cells: Record<string, TournamentCellData>, displayPoint: boolean }> = ({ cells, displayPoint }) => {
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
          alignItems: `${cell.split("_")[1] === "0" || cellData.edit !== undefined ? "" : "flex-end"}`,
        };

        return (
          <div key={cell} style={cellStyle}>
            <div className={cellData.class} style={{ fontSize: '0.8em', width: '100%', textAlign: cellData.align_left ? 'left' : 'center', color: cellData.color ? colors[cellData.color - 1] : 'inherit', verticalAlign: "bottom" }}>
              {(cellData.point || cellData.point === 0 ) && displayPoint  ? 
                cellData.point2 || cellData.point2 === 0 ? 
                  <span style={{color: colors[1]}}>{cellData.point}<br />({cellData.point2})</span>
                  :
                  <span style={{color: colors[1]}}>{cellData.point}<br /><span style={{ visibility: "hidden" }}>{"A"}</span></span>
                :
                cellData.text
              }
            </div>
          </div>
        );
      })}
    </>
  );
};

// --------------------------

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

const width = {
  xs: 0.9, sm: 350, md: 450, lg: 450, xl: 450,
}

const App = () => {
  const [data, setData] = useState<any>()
  useEffect(() => {
    const fetchData = async () => {
      const res = await APIget("/get/2", () => {}, () => {})
      // @ts-ignore
      const groupedData1 = res.data1.reduce((groups, item) => {
        const { order } = item
        if (!groups[order]) { groups[order] = [] }
        groups[order].push(item)
        return groups
      }, [])
      setData({ data1: groupedData1 })
    }
    fetchData()
  }, [])

  

  if (data) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>トーナメント表</h2>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <h2>1年</h2>
          {data.data1.map((group: any, index: any) => (
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
} else {
  return (<div />)
}
};

export default App;
