import { MyObject } from "@/pages"

const draw = (d3: MyObject, setD2: Function) => {
  if (Object.keys(d3).length !== 0) {
    if (d3["1"].score > d3["2"].score) {
      setD2((d2_p:any) => {d2_p["1_1"] = {border_left: 2, border_top: 2};return d2_p})
    } else if (d3["2"].score > d3["1"].score) {
      setD2((d2_p:any) => {d2_p["2_1"] = {border_top: 2};d2_p["3_1"] = {border_left: 2};return d2_p})
    }
  }
}

export default draw