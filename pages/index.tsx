import React, { useEffect, useState } from "react"
import { Card } from "@mui/material"
import _ from "lodash"
import { notification } from "antd"
import { APIget } from "@/util/api"
import ViewMain from "@/components/top/Main"
import Main from "@/components/edit/Main"
import dynamic from "next/dynamic"
import { useTokenStore } from "@/util/store"

export interface TournamentCellData {
  text?: string
  align_left?: boolean
  border_top?: number
  border_left?: number
  class?: string
  color?: number
  point?: number
  point2?: number
  edit?: number
  edit2?: number
  edit2_data?: number
}

const width = {
  xs: 0.9, sm: 350, md: 450, lg: 450, xl: 450,
}

const App = () => {
  const [data, setData] = useState<any>()
  const token = useTokenStore((s) => s.token)
  const updateToken = useTokenStore((s) => s.setToken)
  useEffect(() => {
    const fetchData = async () => {
      const res = await APIget("/get/2", () => { }, () => { })
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

  const [api, contextHolder] = notification.useNotification()
  const e = (message: string, description = "だめですごめんなさい") => {
    api.error({ message: message, description: description, duration: 6, placement: "bottomRight", className: "custom-notification" })
  }

  if (data) {
    return (
      <div>
        {contextHolder}
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
              <div key={index} style={{ display: "flex", justifyContent: "center", paddingTop: 4, paddingBottom: 4 }}>
                {group.map((val: any, i: any) => {
                  return token ? 
                  <Main 
                    data={val} 
                    key={i} 
                    eAPI={e} 
                    // @ts-ignore
                    token={token}
                  />
                  :
                  <ViewMain data={val} key={i} />
                })}
              </div>
            ))}
          </Card>
        </div>
      </div>
    )
  } else {
    return (<div />)
  }
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false
})
