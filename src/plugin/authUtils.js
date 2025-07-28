const TOKEN_NAME = "token";
const UNAUTH_USER = {
  "userId"   :  -1,
  "username"  : "遊客",
  "token"     : "",
  "status"    : "1",
  "userHistory": "[]"
}

export const setUserAuth = (userData)=>{
  for(const [key, value] of Object.entries(userData)){
    localStorage.setItem(key, value)
  }
}
export const getUserAuth = ()=>{
  
  return localStorage.getItem("userId")?{
    "userId":  parseInt(localStorage.getItem("userId")),
    "username": localStorage.getItem("username"),
    "token":    localStorage.getItem("token"),
    "status":   localStorage.getItem("status"),
    "userHistory":   localStorage.getItem("userHistory"),
  }
  : UNAUTH_USER
}



export const getAuthToken = ()=>{
  return localStorage.getItem(TOKEN_NAME)
}

export const getUserId = ()=>{
  return parseInt(localStorage.getItem("userId"))
}
export const setHistoryAuth = (historys)=>{ 
  localStorage.setItem("userHistory", JSON.stringify(historys))
}
export const getHistoryAuth = ()=>{
  const localHistory = JSON.parse(localStorage.getItem("userHistory"))
  return localHistory? localHistory: []
}

export const resetAuth = () => {
  localStorage.clear()
};

