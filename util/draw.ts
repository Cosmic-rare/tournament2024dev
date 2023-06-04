const draw = (remote: any, setCells: Function) => {
  if (remote === undefined) { console.log('found undifind'); return }
  
  setCells((p_cells: any) => { 
    console.log(p_cells)

    p_cells['0.5_0'] = { "text": `${remote.gread}-${remote.c_1}` }
    p_cells['2.5_0'] = { "text": `${remote.gread}-${remote.c_2}` }
    p_cells['4.5_0'] = { "text": `${remote.gread}-${remote.c_3}` }
    p_cells['6.5_0'] = { "text": `${remote.gread}-${remote.c_4}` }
    p_cells['8.5_0'] = { "text": `${remote.gread}-${remote.c_5}` }
    p_cells['10.5_0'] = { "text": `${remote.gread}-${remote.c_6}` }
    p_cells['13.5_0'] = { "text": `${remote.gread}-${remote.c_7}` }
    
    if(remote.p_1.l_p > remote.p_1.h_p) {
      p_cells['1_1'] = { "border_left": 2, "border_top": 2 }
    } else {
      p_cells['2_1'] = { "border_top": 2 }
      p_cells['3_1'] = { "border_left": 2 }
    }

    if(remote.p_2.l_p > remote.p_2.h_p) {
      p_cells['5_1'] = { "border_left": 2, "border_top": 2 }
    } else {
      p_cells['6_1'] = { "border_top": 2 }
      p_cells['7_1'] = { "border_left": 2 }
    }

    if(remote.p_3.l_p > remote.p_3.h_p) {
      p_cells['9_1'] = { "border_left": 2, "border_top": 2 }
    } else {
      p_cells['10_1'] = { "border_top": 2 }
      p_cells['11_1'] = { "border_left": 2 }
    }

    if(remote.p_4.l_p > remote.p_4.h_p) {
      p_cells['2_2'] = { "border_left": 2, "border_top": 2 }
      p_cells['3_2'] = { "border_top": 2 }
    } else {
      p_cells['4_1'] = { "border_top": 2 }
      p_cells['5_1'] = { "border_left": 2, "border_top": 2 }
    }

    if(remote.p_5.l_p > remote.p_5.h_p) {
      p_cells['10_2'] = { "border_left": 2, "border_top": 2 }
      p_cells['11_2'] = { "border_top": 2 }
    } else {
      p_cells['14_1'] = { "border_left": 2 }
      p_cells['12_2'] = { "border_top": 2 }
      p_cells['13_2'] = { "border_top": 2 }
      p_cells['14_2'] = { "border_left": 2 }
    }

    if(remote.p_6.l_p > remote.p_6.h_p) {
      p_cells['4_3'] = { "border_left": 2, "border_top": 2 }
      p_cells['5_3'] = { "border_top": 2 }
      p_cells['6_3'] = { "border_top": 2 }
      p_cells['7_3'] = { "border_top": 2 }
    } else {
      p_cells['8_3'] = { "border_top": 2 }
      p_cells['9_3'] = { "border_top": 2 }
      p_cells['10_3'] = { "border_top": 2 }
      p_cells['11_3'] = { "border_top": 2 }
      p_cells['12_3'] = { "border_left": 2 }
    }

    if(remote.p_6.l_p !== 0 && remote.p_6.h_p !== 0) {
      p_cells["8_4"] = { "border_left": 2 }
    }

    console.log(p_cells)

    return p_cells 
  })

  console.log(remote)
}

export default draw