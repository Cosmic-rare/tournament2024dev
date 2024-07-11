import { gameType } from "./type";

export const wl = (d: gameType, e: string, a: boolean, da: boolean) => {
  if (["volleyball", "badminton"].includes(e)) {
    if (a && !da) return null
    // p1~p3で判別 (1,2がnullなら未決着カウント)
    let r = 0 // +l -h
    if (!(d.l_p1 == null || d.h_p1 == null)) {
      r = r + (d.l_p1 > d.h_p1 ? 1 : -1)
    } else return null
    if (!(d.l_p2 == null || d.h_p2 == null)) {
      r = r + (d.l_p2 > d.h_p2 ? 1 : -1)
    } else return null
    if (!(d.l_p3 == null || d.h_p3 == null)) {
      r = r + (d.l_p3 > d.h_p3 ? 1 : -1)
    }
    return r > 0 ? "l" : "h"
  } else if ("dodgeball" == e) {
    // p1~p3で判別 (それぞれにfHitted)
    let r = 0 // +l -h
    if (d.l_p1 == d.h_p1 && d.l_p1 != null) {
      r = r + (d.fHitted.p1 == "l" ? -1 : 1)
    } else if (!(d.l_p1 == null || d.h_p1 == null)) {
      r = r + (d.l_p1 > d.h_p1 ? -1 : 1)
    } else return null
    if (d.l_p2 == d.h_p2 && d.l_p2 != null) {
      r = r + (d.fHitted.p2 == "l" ? -1 : 1)
    } else if (!(d.l_p2 == null || d.h_p2 == null)) {
      r = r + (d.l_p2 > d.h_p2 ? -1 : 1)
    } else return null
    if (d.l_p3 == d.h_p3 && d.l_p3 != null) {
      r = r + (d.fHitted.p3 == "l" ? -1 : 1)
    } else if (!(d.l_p3 == null || d.h_p3 == null)) {
      r = r + (d.l_p3 > d.h_p3 ? -1 : 1)
    }
    return r > 0 ? "l" : "h"
  } else if ("esport" == e) {
    if (a && !da) return null
    // p1と追加したフィールドで判別
    if (d.l_p1 == d.h_p1) {
      return d.eSport
    } else {
      if (!(d.l_p1 == null || d.h_p1 == null)) {
        return d.l_p1 > d.h_p1 ? "l" : "h"
      }
    }
  } else if ("soccer" == e) {
    if (a && !da) return null
    // p1と追加したフィールドで判別
    if (d.l_p1 == d.h_p1) {
      return d.soccer
    } else {
      if (!(d.l_p1 == null || d.h_p1 == null)) {
        return d.l_p1 > d.h_p1 ? "l" : "h"
      }
    }
  }
}

export const winL = (d: gameType, e: string, a: boolean, da: boolean) => {
  return wl(d, e, a, da) == null ? null : wl(d, e, a, da) == "l"
}

