import { useState, useEffect } from "react"

export default function T() {
  const [column, setColumn] = useState(10)
  const [row, setRow] = useState(10)

  const cssContent = `
    .box-4-0::after {
      content: "Hello!";
      color: red;
    }

    .box-4-0 {
      background-color: #FFF !important;
      border: solid 1px black !important;
    }
    
    .box-5-1 {
      border-top: solid 5px red !important;
    }

    .box-5-2 {
      border-top: solid 5px red !important;
    }

    .box-5-2 {
      border-right: solid 5px red !important;
    }

    .box-5-3 {
      border-bottom: solid 5px red !important;
    }

    .column > div:first-child {
      background-color: red;
      position: relative;
      top: 10px;
    }

    .box-${column - 1}-0 {
      height: 0px !important;
    }
  `
  
  return (
    <div className={`wrapper`}>
      {Array.from({ length: column }, (_, i) => (
        <div key={i} style={{display: "flex"}} className={`column-${i} column`}>
          {Array.from({ length: row }, (_, j) => (
            <div className={`box-${i}-${j}`} style={{width: 50, height: 20, border: "solid 1px black"}} key={j} />
          ))}
        </div>
      ))}
      
      <style dangerouslySetInnerHTML={{ __html: cssContent }} />
    </div>
  )
}
