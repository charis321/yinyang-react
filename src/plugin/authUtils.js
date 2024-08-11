const TOKEN_NAME = "token";
const UNAUTH_USER = {
  "user_id"   : "-1",
  "username"  : "遊客",
  "token"     : "",
  "status"    : "1",
}

export const setUserAuth = (userData)=>{
  for(const [key, value] of Object.entries(userData)){
    localStorage.setItem(key, value)
  }
}
export const getUserAuth = ()=>{
  
  return localStorage.getItem("user_id")?{
    "user_id":  localStorage.getItem("user_id"),
    "username": localStorage.getItem("username"),
    "token":    localStorage.getItem("token"),
    "status":   localStorage.getItem("status"),
  }
  : UNAUTH_USER
}



export const getAuthToken = ()=>{
  return localStorage.getItem(TOKEN_NAME)
}

export const getUserId = ()=>{
  return parseInt(localStorage.getItem("user_id"))
}
export const setHistoryAuth = (historys)=>{ 
  localStorage.setItem("user_history", JSON.stringify(historys))
}
export const getHistoryAuth = ()=>{
  return JSON.parse(localStorage.getItem("user_history"))
}

export const resetAuth = () => {
  localStorage.clear()
};

