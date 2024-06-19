import React, { useEffect, useState } from 'react'
import { Card } from '@mui/material'
import { APIget } from '@/util/api'
import draw from '@/util/draw'
import _ from 'lodash'
import { Modal } from 'antd'
import { Button, FormControlLabel, Checkbox } from '@mui/material'
import Edit from '@/components/edit.svg'
import cellTemplate from '@/components/data1.json'

// ----- Main.tsx -----

const Main = ({ data }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


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
        <div style={{ height: `320px`, overflowX: 'hidden', position: "relative" }}>
          <div style={{ width: `${30 * 15}px`, height: `320px`, overflowY: 'hidden', position: "relative" }}>
            <EditTournament data={data} onModalOpen={() => {}} onClassEditModalOpen={() => {}} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

// --------------------

// ----- edit-tournament ---

const EditTournament: React.FC<{ data: any, onModalOpen: Function, onClassEditModalOpen: Function }> = ({ data, onModalOpen, onClassEditModalOpen }) => {
  const colors = ["#adb5bd", "#dc3545"];
  const width = 30
  const height = 50

  const template = _.cloneDeep(cellTemplate)

  const cells: Array<TournamentCellData> = draw(data, template)

  const onEdit = (p: number) => {
    onModalOpen(p)
  }

  const onEdit2 = (p: number, d: number) => {
    onClassEditModalOpen(p, d)
  }

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
              {cellData.point || cellData.point === 0 ? 
                cellData.point2 || cellData.point2 === 0 ? 
                  <span style={{color: colors[1]}}>{cellData.point}<br />({cellData.point2})</span>
                  :
                  <span style={{color: colors[1]}}>{cellData.point}<br /><span style={{ visibility: "hidden" }}>{"A"}</span></span>
                :
                cellData.text
              }

              {cellData.edit !== undefined ? (
                <div
                  onClick={() => onEdit(cellData.edit!)}
                  style={{
                    marginTop: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Edit width={20} height={20} stroke={'#bbb'} strokeWidth={2.5} />
                  </div>
                </div>
              ) : null}

              {cellData.edit2 !== undefined ? (
                <div>
                  <div
                    onClick={() => onEdit2(cellData.edit2!, cellData.edit2_data!)}
                    style={{
                      marginTop: 10,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Edit width={20} height={20} stroke={'#bbb'} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </>
  );
};

// -------------------------

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
