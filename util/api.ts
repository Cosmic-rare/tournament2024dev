import axios from "axios"

const BASEURL = "http://localhost:3001"

export const APIget = async (path: string, e: Function, f: Function) => {
  try {
    const res = await axios.get(new URL(path, BASEURL).href)
    f()
    return res.data
  } catch (err) {
    e(err)
  }
  f()
}

export const APIpost = async (path: string, body: any, e: Function, f: Function) => {
  try {
    const res = await axios.post(new URL(path, BASEURL).href, body)
    f()
    return res.data
  } catch (err) {
    e(err)
  }
  f()
}
