const draw = (remote: any, setCells: Function) => {
  setCells((p_cells: any) => { p_cells['0.5_0'] = { "text": "0-0" }; return p_cells })
}

export default draw