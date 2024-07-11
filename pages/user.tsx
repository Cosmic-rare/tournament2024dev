import { notification } from "antd"
import { Card } from "@mui/material"
import _ from "lodash"
import { APIpost } from "@/util/api"
import { jwtDecode } from "jwt-decode"
import { useState } from "react"
import { useTokenStore } from "@/util/store"
import Head from "next/head"

const width = {
  xs: 0.9, sm: 350, md: 450, lg: 450, xl: 450,
}

const GenToken = ({ token, updateToken }: any) => {
  try {
    return (
      <>
        {// @ts-ignore
          jwtDecode(token).roleType === "ADMIN" ?
            <Card
              sx={{ width: width }}
              style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
            >
              <button onClick={async () => {
                const r = await APIpost(
                  "auth/genToken",
                  { token: token },
                  () => { },
                  () => { },
                  () => updateToken("")
                )
              }}>regenerate role-token</button>
            </Card>
            :
            null
        }
      </>
    )
  } catch (e) {
    console.log(e)
    return null
  }
}

const App = () => {
  const [password, setPassword] = useState("")
  const token = useTokenStore((s) => s.token)
  const updateToken = useTokenStore((s) => s.setToken)
  const [api, contextHolder] = notification.useNotification()
  const e = (message: string, description = "だめですごめんなさい") => {
    api.error({ message: message, description: description, duration: 6, placement: "bottomRight", className: "custom-notification" })
  }

  return (
    <div>
      <Head>
        <title>{token ? "ユーザー" : "ログイン" }</title>
      </Head>

      {contextHolder}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <GenToken token={token} updateToken={updateToken} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <Card
          sx={{ width: width }}
          style={{ backgroundColor: "#eae9eb", borderRadius: 9, padding: 24 }}
        >
          <input value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={async () => {
            const r = await APIpost(
              "auth/login",
              { password: password },
              () => { e("password is wrong") },
              () => { setPassword("") }
            )
            updateToken(r?.token ? r.token : "")
          }}>login</button>
          <button onClick={() => { updateToken("") }}>logout</button>

          <div>
            <code>{localStorage.getItem("id")}</code>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default App
