export interface dataType {
  data1: Array<any>
  data2: Array<any>
  data3: Array<any>
}

export interface gameType {
  l_p1?: number
  h_p1?: number
  l_p2?: number
  h_p2?: number
  l_p3?: number
  h_p3?: number
  fHitted?: boolean
  pk?: any
  startedAt?: number
  endedAt?: number
  recorderId?: string
  applied: boolean
}