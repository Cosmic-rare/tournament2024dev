import { useRouter } from "next/router"

const Post = () => {
  const router = useRouter()
  const { id, p } = router.query

  return (
    <div>
      <p>id: {id}, p: {p}</p>
    </div>
  )
}

export default Post