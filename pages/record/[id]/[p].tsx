import { APIget, APIpost } from "@/util/api"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useTokenStore } from "@/util/store"
import { notification } from "antd"

const Post = () => {
  const router = useRouter()
  const { id, p } = router.query
  const [d, sD] = useState<null | any>(null)
  const updateToken = useTokenStore((s) => s.setToken)
  const [api, contextHolder] = notification.useNotification()

  const eAPI = (message: string, description = "だめですごめんなさい") => {
    console.log("error!!!!!!")
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
        {},
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
      await APIpost(
        `/match/${id}/${p}/end`,
        {},
        () => { eAPI("Faild to stop game") },
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
  }

  if (d) {
    return (
      <div>
        {contextHolder}
        <p>id: {id}, p: {p}</p>
        <button onClick={handleStartEnd} disabled={d[`p_${p}`].startedAt != null && d[`p_${p}`].endedAt != null}>
          {d[`p_${p}`].startedAt == null ? "start" : d[`p_${p}`].endedAt == null ? "end" : "-"}
        </button>
        <hr />
        <code>{JSON.stringify(d[`p_${p}`])}</code>
      </div>
    )
  } else {
    <>{contextHolder}</>
  }
}

export default Post