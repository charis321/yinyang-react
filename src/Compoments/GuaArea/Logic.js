import {gua_64_set} from './data.js'

export const defineYao=(n)=>{
    // n為 字串或整數 [6-9] 
  
    if(typeof n==="string")n = parseInt(n)
    if(n<6||n>9) return -1

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

export const defineGua=(yaosList)=>{
    if(yaosList.length!==6)return -1

    let alter_yao = []     
    let index = 0
    yaosList.map((yaoObj,i)=>{
        index+= (yaoObj.type?1:0) * (2**(5-i))
        if(yaoObj.isAlter) alter_yao.push(i)
    })
    const result = gua_64_set[index]
    result['yaosList'] = yaosList 
    result['alter_yao'] = alter_yao

    return result
}
/*
  guaLite: gua儲存在資料庫的形式，包含最低程度的訊息，降低體積
  - title
  - yaosList
*/
export const getGuaLite=(yaosList)=>{
  const gua = defineGua(yaosList)
  const alter_gua = defineAlterGua(yaosList)
  const title = gua.name===alter_gua.name?`${gua.name}`:`${gua.name}之${alter_gua.name}`

  const yaosList_str = yaosList.map(yaoObj => yaoObj.n).join('')
  const guaLite = {
    title,
    yaosList: yaosList_str,
  }
  
  return guaLite
}
export const getGuaLiteByStr=(yaosList_str)=>{
  
  const yaosList = getYaosListByStr(yaosList_str)
  const gua = defineGua(yaosList)
  const alter_gua = defineAlterGua(yaosList)
  const title = gua.name===alter_gua.name?`${gua.name}`:`${gua.name}之${alter_gua.name}`


  const guaLite = {
    title,
    yaosList: yaosList_str,
  }
  
  return guaLite
}

/*
  1.history:
  - historyId   
  - userId        
  - createTime 
  - title            卦的名子
  - yaosList        以純數字字串表示的'爻'陣列, ex: "677967"
  
*/
export const defineAlterGua=(yaosList)=>{
    if(yaosList.length!==6)return -1
      
    let normal_yao = []     
    let index = 0
    let new_yaosList = []
    yaosList.map((yaoObj,i)=>{
        let new_yaoObj = {...yaoObj}
        new_yaoObj.type = yaoObj.isAlter?!yaoObj.type:yaoObj.type
        index+= (new_yaoObj.type?1:0) * (2**(5-i))
        new_yaoObj.n = yaoObj.n%2===0?8:7
        new_yaoObj.isAlter = false
        if(!yaoObj.isAlter) normal_yao.push(i)
        
        new_yaosList.push(new_yaoObj)
    })
    const result = gua_64_set[index]
    result['yaosList'] = new_yaosList 
    result['normal_yao'] = normal_yao
    return result
    
}
/*
    guaObj:
    props:{
        yaosList:[
            yaoObj:{
                
            }
        ]
    }
*/
/*
    descriptionGUa(guaObj): 
    輸入: guaObj=>{
        yaosList: yaoObj[]
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
export const descriptionGua=(guaObj)=>{
    const {yaosList} = guaObj
    let alter_n = 0
    yaosList.map(yaoObj=>{
        alter_n += yaoObj.isAlter?1:0
    })
    const final_desciption= desciptionGua_logic_set[alter_n];
  
    return final_desciption
}
export const getYaosListByStr=(yaosList_str)=>{
  let yaos_array = yaosList_str.split('')

  let yaosList = yaos_array.map((yaos_n)=>{
    let yaoObj = defineYao(yaos_n)
    return yaoObj
  })
  return yaosList
}

export const desciptionGua_logic_set = [
  {
    type: 0,
    name: "六爻不變",
    describe: "以本卦卦辭斷",
    action: {
      main: "normal",
      support: "null",
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
      support: "null",
      isUseYao: false,
      isUseAlterYao: true
    },
  },
  {
    type: 2,
    name: "二爻變",
    describe: "以本卦兩個爻辭斷，但以上者為主",
    action: {
      main: "top",
      support: "down",
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
      support: "null",
      isUseYao: false,
      isUseAlterYao: true
    },
  },
  {
    type: 4,
    name: "四爻變",
    describe: "以變卦之兩不變爻爻辭斷，但以下者為主",
    action: {
      main: "alter",
      support: "null",
      isUseYao: false,
      isUseAlterYao: true
    },
  },
  {
    type: 5,
    name: "五爻變",
    describe: "以變卦之不變爻爻辭斷",
    action: {
      main: "normal",
      support: "null",
      isUseYao: false,
      isUseAlterYao: true
    },
  },
  {
    type: 6,
    name: "六爻變",
    describe: "以變卦之卦辭斷，乾坤兩卦則以「用」辭斷",
    action: {
      main: "normal",
      support: "null",
      isUseYao: false,
      isUseAlterYao: true
    },
  },
];
