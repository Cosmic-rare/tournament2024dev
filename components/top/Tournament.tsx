import { TournamentCellData } from "@/pages/tournament"
import InfoIcon from "@mui/icons-material/Info"

const Tournament: React.FC<{ cells: Record<string, TournamentCellData>, openModal: Function, data: any }> = ({ cells, openModal, data }) => {
  const colors = ["#adb5bd", "#dc3545"]
  const width = 30
  const height = 50

  return (
    <>
      {Object.entries(cells).map(([cell, cellData]) => {
        const cellStyle: React.CSSProperties = {
          position: "absolute",
          top: `${(5 - parseFloat(cell.split("_")[1])) * height}px`,
          left: `${parseFloat(cell.split("_")[0]) * width}px`,
          height: `${height}px`,
          width: `${width}px`,
          paddingRight: cellData.align_left ? "10px" : "0",
          borderTop: cellData.border_top ? `3px solid ${colors[cellData.border_top - 1]}` : "none",
          borderLeft: cellData.border_left ? `3px solid ${colors[cellData.border_left - 1]}` : "none",
          verticalAlign: "bottom",
          display: "flex",
          alignItems: `${cell.split("_")[1] === "0" || cellData.edit !== undefined ? "" : "flex-end"}`,
        }

        // 種目によっては直接点を表示
        return (
          <div key={cell} style={cellStyle}>
            <div className={cellData.class} style={{ fontSize: "0.8em", width: "100%", textAlign: cellData.align_left ? "left" : "center", color: cellData.color ? colors[cellData.color - 1] : "inherit", verticalAlign: "bottom" }}>
              {cellData.text}

              {cellData.edit !== undefined && (data[`p_${cellData.edit!}`].startedAt && data[`p_${cellData.edit!}`].endedAt)
              ? (
                <div
                  onClick={() => openModal(cellData.edit!)}
                  style={{
                    marginTop: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <InfoIcon width={20} height={20} style={{ color: "#777" }}/>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Tournament