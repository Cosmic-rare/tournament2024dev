import { winL } from "./wl"

const draw = (r: any, c: any, e: string, a: boolean) => {
  // edit2とedit2のdefaultのためのやつ
  c["0.5_0"] = { "text": `${r.gread}-${r.c_1}`, "edit2": 1, "edit2_data": r.c_1 }
  c["2.5_0"] = { "text": `${r.gread}-${r.c_2}`, "edit2": 2, "edit2_data": r.c_2 }
  c["4.5_0"] = { "text": `${r.gread}-${r.c_3}`, "edit2": 3, "edit2_data": r.c_3 }
  c["6.5_0"] = { "text": `${r.gread}-${r.c_4}`, "edit2": 4, "edit2_data": r.c_4 }
  c["8.5_0"] = { "text": `${r.gread}-${r.c_5}`, "edit2": 5, "edit2_data": r.c_5 }
  c["10.5_0"] = { "text": `${r.gread}-${r.c_6}`, "edit2": 6, "edit2_data": r.c_6 }
  c["13.5_0"] = { "text": `${r.gread}-${r.c_7}`, "edit2": 7, "edit2_data": r.c_7 }

  // 普通にトーナメントの赤線を引く
  if (winL(r.p_1, e, a, r.p_1.applied) == null) {

  } else if (winL(r.p_1, e, a, r.p_1.applied)) {
    c["1_1"] = { "border_left": 2, "border_top": 2 }
  } else {
    c["2_1"] = { "border_top": 2 }
    c["3_1"] = { "border_left": 2 }
  }

  if (winL(r.p_2, e, a, r.p_2.applied) == null) {

  } else if (winL(r.p_2, e, a, r.p_2.applied)) {
    c["5_1"] = { "border_left": 2, "border_top": 2 }
  } else {
    c["6_1"] = { "border_top": 2 }
    c["7_1"] = { "border_left": 2 }
  }

  if (winL(r.p_3, e, a, r.p_3.applied) == null) {

  } else if (winL(r.p_3, e, a, r.p_3.applied)) {
    c["9_1"] = { "border_left": 2, "border_top": 2 }
  } else {
    c["10_1"] = { "border_top": 2 }
    c["11_1"] = { "border_left": 2 }
  }

  if (winL(r.p_4, e, a, r.p_4.applied) == null) {

  } else if (winL(r.p_4, e, a, r.p_4.applied)) {
    c["2_2"] = { "border_left": 2, "border_top": 2 }
    c["3_2"] = { "border_top": 2 }
  } else {
    c["4_2"] = { "border_top": 2 }
    c["5_2"] = { "border_top": 2 }
    c["6_2"] = { "border_left": 2 }
  }

  if (winL(r.p_5, e, a, r.p_5.applied) == null) {

  } else if (winL(r.p_5, e, a, r.p_5.applied)) {
    c["10_2"] = { "border_left": 2, "border_top": 2 }
    c["11_2"] = { "border_top": 2 }
  } else {
    c["14_1"] = { "border_left": 2 }
    c["12_2"] = { "border_top": 2 }
    c["13_2"] = { "border_top": 2 }
    c["14_2"] = { "border_left": 2 }
  }

  if (winL(r.p_6, e, a, r.p_6.applied) == null) {

  } else if (winL(r.p_6, e, a, r.p_6.applied)) {
    c["4_3"] = { "border_left": 2, "border_top": 2 }
    c["5_3"] = { "border_top": 2 }
    c["6_3"] = { "border_top": 2 }
    c["7_3"] = { "border_top": 2 }
  } else {
    c["8_3"] = { "border_top": 2 }
    c["9_3"] = { "border_top": 2 }
    c["10_3"] = { "border_top": 2 }
    c["11_3"] = { "border_top": 2 }
    c["12_3"] = { "border_left": 2 }
  }

  if (r.p_6.l_p1 !== null && r.p_6.h_p1 !== null) {
    c["8_4"] = { "border_left": 2 }
  }

  // リセット(null)じゃないときに点数を表示する仕組み
  if (r.p_1.l_p1 !== null && r.p_1.h_p1 !== null && r.p_1.applied) {
    c["0_1"] = { ...c["0_1"], "point": r.p_1.l_p1 }
    c["3_1"] = { ...c["3_1"], "point": r.p_1.h_p1 }
  }
  if (r.p_2.l_p1 !== null && r.p_2.h_p1 !== null && r.p_2.applied) {
    c["4_1"] = { ...c["4_1"], "point": r.p_2.l_p1 }
    c["7_1"] = { ...c["7_1"], "point": r.p_2.h_p1 }
  }
  if (r.p_3.l_p1 !== null && r.p_3.h_p1 !== null && r.p_3.applied) {
    c["8_1"] = { ...c["8_1"], "point": r.p_3.l_p1 }
    c["11_1"] = { ...c["11_1"], "point": r.p_3.h_p1 }
  }
  if (r.p_4.l_p1 !== null && r.p_4.h_p1 !== null && r.p_4.applied) {
    c["1_2"] = { ...c["1_2"], "point": r.p_4.l_p1 }
    c["6_2"] = { ...c["6_2"], "point": r.p_4.h_p1 }
  }
  if (r.p_5.l_p1 !== null && r.p_5.h_p1 !== null && r.p_5.applied) {
    c["9_2"] = { ...c["9_2"], "point": r.p_5.l_p1 }
    c["14_2"] = { ...c["14_2"], "point": r.p_5.h_p1 }
  }
  if (r.p_6.l_p1 !== null && r.p_6.h_p1 !== null && r.p_6.applied) {
    c["3_3"] = { ...c["3_3"], "point": r.p_6.l_p1 }
    c["12_3"] = { ...c["12_3"], "point": r.p_6.h_p1 }
  }

  // edit-buttonのための位置決め
  c["1.5_1"] = { "edit": 1 }
  c["5.5_1"] = { "edit": 2 }
  c["9.5_1"] = { "edit": 3 }
  c["3.5_2"] = { "edit": 4 }
  c["11.5_2"] = { "edit": 5 }
  c["7.5_3"] = { "edit": 6 }

  // 優勝クラスの描画
  // if (r.p_6.l_p1 === null && r.p_6.h_p1 === null) {
  // } else if (r.p_6.l_p1 > r.p_6.h_p1) {
  //   if (r.p_4.l_p1 > r.p_4.h_p1) {
  //     if (r.p_1.l_p1 > r.p_1.h_p1) {
  //       c["7.5_5"] = { "text": `${r.gread}-${r.c_1}` }
  //     } else {
  //       c["7.5_5"] = { "text": `${r.gread}-${r.c_2}` }
  //     }
  //   } else {
  //     if (r.p_2.l_p1 > r.p_2.h_p1) {
  //       c["7.5_5"] = { "text": `${r.gread}-${r.c_3}` }
  //     } else {
  //       c["7.5_5"] = { "text": `${r.gread}-${r.c_4}` }
  //     }
  //   }
  // } else {
  //   if (r.p_5.l_p1 > r.p_5.h_p1) {
  //     if (r.p_3.l_p1 > r.p_3.h_p1) {
  //       c["7.5_5"] = { "text": `${r.gread}-${r.c_5}` }
  //     } else {
  //       c["7.5_5"] = { "text": `${r.gread}-${r.c_6}` }
  //     }
  //   } else {
  //     c["7.5_5"] = { "text": `${r.gread}-${r.c_7}` }
  //   }
  // }

  return c
}

export default draw
