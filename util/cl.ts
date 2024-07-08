import { winL } from "./wl"

const getClass = (r: any, e: string) => {
  const a = true
  let d: any = [[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null]]

  d[1-1][0] = r.c_1
  d[1-1][1] = r.c_2
  d[2-1][0] = r.c_3
  d[2-1][1] = r.c_4
  d[3-1][0] = r.c_5
  d[3-1][1] = r.c_6
  d[5-1][1] = r.c_7

  if (winL(r.p_1, e, a, r.p_1.applied) == null) {

  } else if (winL(r.p_1, e, a, r.p_1.applied)) {
    d[4 - 1][0] = d[1-1][0]
  } else {
    d[4 - 1][0] = d[1-1][1]
  }

  if (winL(r.p_2, e, a, r.p_2.applied) == null) {

  } else if (winL(r.p_2, e, a, r.p_2.applied)) {
    d[4 - 1][1] = d[2-1][0]
  } else {
    d[4 - 1][1] = d[2-1][1]
  }

  if (winL(r.p_3, e, a, r.p_3.applied) == null) {

  } else if (winL(r.p_3, e, a, r.p_3.applied)) {
    d[5 - 1][0] = d[3-1][0]
  } else {
    d[5 - 1][0] = d[3-1][1]
  }

  if (winL(r.p_4, e, a, r.p_4.applied) == null) {

  } else if (winL(r.p_4, e, a, r.p_4.applied)) {
    d[6 - 1][0] = d[4-1][0]
  } else {
    d[6 - 1][0] = d[4-1][1]
  }

  if (winL(r.p_5, e, a, r.p_5.applied) == null) {

  } else if (winL(r.p_5, e, a, r.p_5.applied)) {
    d[6 - 1][1] = d[5-1][0]
  } else {
    d[6 - 1][1] = d[5-1][1]
  }

  if (winL(r.p_6, e, a, r.p_6.applied) == null) {

  } else if (winL(r.p_6, e, a, r.p_6.applied)) {
    d[7 - 1] = d[6-1][0]
  } else {
    d[7 - 1] = d[6-1][1]
  }

  return d
}

export default getClass
