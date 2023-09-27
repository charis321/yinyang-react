import {gua_data_set} from './data'

export const defineYao=(n)=>{
    if(n<6||n>9)
        return -1
    const nameIndex = {
        6:"陽爻之變爻",
        7:"陽爻",
        8:"陰爻",
        9:"陽爻之變爻"
    }
    let yaoObj = {
        n: n,
        name: nameIndex[n],
        type: n%2===1,
        isAlter:  n===9||n===6,
        size:  '100px',      
        place: ''
    }
    return yaoObj
}

export const defineGua=(yaos_list)=>{
    if(yaos_list.length!==6)return -1
    
        
    let index = 0
    yaos_list.map((yaoObj,i)=>{
        index+= (yaoObj.type?1:0) * (2**i)
    })
   
    return gua_data_set[index]
}
export const defineAlterGua=(yaos_list)=>{
  if(yaos_list.length!==6)return -1
    let result = [];
    yaos_list.map(yaoObj=>{
        let new_yao = {}
        if(yaoObj.isAlter){
            new_yao.type = !yaoObj.type
            new_yao.isAlter = false
        }else{
            new_yao = {...yaoObj}
        }
        result.push(new_yao)
    })
    return result
    
}
/*
    guaObj:
    props:{
        yaos_list:[
            yaoObj:{
                
            }
        ]
    }
*/
/*
    descriptionGUa(guaObj): 
    輸入: guaObj=>{
        yaos_list: yaoObj[]
        data: gua_simple_data{} 
    }
    回傳: descriptionObj=>{
        info: 解釋,
        name: OO掛 之 xx掛  ,
        main: {
            主要判斷辭:
            action: "",
            content: "實際解釋文字"
        },
        support: {
            輔助判斷辭:
            action: "",
            content: "實際解釋文字"
        },

    }
 */
export const desciptionGua=(guaObj)=>{
    const {yaos_list} = guaObj
    const alter_guaObj = defineAlterGua(guaObj)
    let final_desciption = {};
    let alter_n = 0
    yaos_list.map(yaoObj=>{
        alter_n += yaoObj.isAlter?1:0
    })
    let {action, main, support}=defineAction();
    final_desciption={
        name: `${guaObj.name}卦 之 ${alter_guaObj.name}卦`,
        info: action,
        main: main,
        support: support
    }
    return final_desciption
}
export const desciptionGua_logic_set = [
  {
    type: 0,
    name: "六爻不變",
    describe: "以本卦卦辭斷",
    action: {
      main: "normal",
      supper: "null",
      isUseYao: false,
      isUseAlterYao: false
    },
  },
  {
    type: 1,
    name: "一爻變",
    describe: "以本卦變爻爻辭斷",
    action: {
      main: "normal",
      supper: "null",
      isUseYao: false,
      isUseAlterYao: true
    },
  },
  {
    type: 2,
    name: "二爻變",
    describe: "以本卦兩個爻辭斷，但以上者為主",
    action: {
      main: "normal",
      supper: "top-half-gua",
      isUseYao: true,
      isUseAlterYao: true
    },
  },
  {
    type: 3,
    name: "三爻變",
    describe:
      "以本卦與變卦卦辭斷；本卦為貞（體），變卦為悔（用），三爻變表示發展的正反態勢各半，是最複雜的狀況，稱之為「貞悔相爭」",
    action: {
      main: "normal alter",
      supper: "null",
      isUseYao: false,
    },
  },
  {
    type: 4,
    name: "四爻變",
    describe: "以變卦之兩不變爻爻辭斷，但以下者為主",
    action: {
      main: "alter",
      supper: "null",
      isUseYao: false,
    },
  },
  {
    type: 5,
    name: "五爻變",
    describe: "以變卦之不變爻爻辭斷",
    action: {
      main: "normal",
      supper: "null",
      isUseYao: false,
    },
  },
  {
    type: 6,
    name: "六爻變",
    describe: "以變卦之卦辭斷，乾坤兩卦則以「用」辭斷",
    action: {
      main: "normal",
      supper: "null",
      isUseYao: false,
    },
  },
];
const defineAction = ()=>{
    
}