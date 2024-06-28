import { APIget, APIpost } from "@/util/api"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useTokenStore } from "@/util/store"
import { notification } from "antd"
import { ModalContent } from "@/components/record/inputs"
import { CircularProgress, Backdrop } from "@mui/material"

const Post = () => {
  const router = useRouter()
  const { id, p } = router.query
  const [d, sD] = useState<null | any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const token = useTokenStore((s) => s.token)
  const updateToken = useTokenStore((s) => s.setToken)
  const [api, contextHolder] = notification.useNotification()

  const eAPI = (message: string, description = "だめですごめんなさい") => {
    api.error({ message: message, description: description, duration: 6, placement: "bottomRight", className: "custom-notification" })
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!(id && p)) { return }
      const r = await APIget(
        `/match/${id}`,
        () => { },
        () => { }
      )
      sD(r)
    }
    fetchData()
  }, [id, p])

  const handleStartEnd = async () => {
    if (d[`p_${p}`].startedAt == null && d[`p_${p}`].endedAt == null) {
      await APIpost(
        `/match/${id}/${p}/start`,
        { token: token, recorderId: localStorage.getItem("id") },
        () => { eAPI("Faild to start game") },
        async () => {
          const r = await APIget(
            `/match/${id}`,
            () => { eAPI("Faild to fetch game") },
            () => { }
          )
          sD(r)
        },
        () => updateToken("")
      )
    }
    if (d[`p_${p}`].startedAt != null && d[`p_${p}`].endedAt == null) {
      setIsLoading(true)
      await APIpost(
        `/match/${id}/${p}/end`,
        { token: token, recorderId: localStorage.getItem("id"), game: d[`p_${p}`] },
        () => { eAPI("Faild to stop game") },
        async () => {
          const r = await APIget(
            `/match/${id}`,
            () => { eAPI("Faild to fetch game") },
            () => { setIsLoading(false) }
          )
          sD(r)
        },
        () => updateToken("")
      )
    }
  }

  if (d) {
    return (
      <div>
        <div style={{ position: "relative", maxWidth: 330, margin: "auto" }}>
          <Backdrop
            sx={{ color: "#fff", zIndex: 9999 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <div style={{ height: 10 }} />
        </div>
        {contextHolder}

        <p>id: {id}, p: {p}</p>
        <button onClick={handleStartEnd} disabled={d[`p_${p}`].startedAt != null && d[`p_${p}`].endedAt != null}>
          {d[`p_${p}`].startedAt == null ? "start" : d[`p_${p}`].endedAt == null ? "submit & end" : "-"}
        </button>
        <hr />
        <code>{JSON.stringify(d[`p_${p}`])}</code>
        <hr />
        <ModalContent setGame={sD} p={p} game={d} />
      </div>
    )
  } else {
    <>{contextHolder}</>
  }
}

export default Post