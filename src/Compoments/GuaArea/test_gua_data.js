import {defineYao} from './Logic'

export const test_yaoObj = {
    n: 6,   
    name: '陰爻之變爻',
    type: false,
    isAlter: true,
    size: "100px",
    place: ""
  }
export const test_guaObj = {
  yaos_list: [
    {
        n: 6,
        name: "陰爻之變爻",
        type: false,
        isAlter: true,
        size: "100px",
        place: "",
    },
    {
        n: 7,
        name: "陽爻",
        type: true,
        isAlter: false,
        size: "100px",
        place: "",
    },
    {
        n: 8,
        name: "陰爻",
        type: false,
        isAlter: false,
        size: "100px",
        place: "",
    },
    {
        n: 9,
        name: "陽爻之變爻",
        type: true,
        isAlter: true,
        size: "100px",
        place: "",
    },
    {
        n: 6,
        name: "陰爻之變爻",
        type: false,
        isAlter: true,
        size: "100px",
        place: "",
    },
    {
        n: 7,
        name: "陽爻",
        type: true,
        isAlter: false,
        size: "100px",
        place: "",
    },
  ]
};

export const test_guaObj_random = (number)=>{
    let result = []
    for(let i=0;i<number;i++){
        let n = Math.floor(Math.random()*4)+6
        let yaoObj = defineYao(n)
        result.push(yaoObj)
    }
    return {
        yaos_list: result
    }
}






