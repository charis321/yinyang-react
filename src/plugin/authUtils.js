const TOKEN_NAME = "TOKEN";


export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token)
};

export const getAuthToken = ()=>{
  return localStorage.getItem(TOKEN_NAME)
}
export const setUserInfo = (userData) => {
  for(const [key, value] of Object.entries(userData)){
    localStorage.setItem(key, value)
  }
};

export const getUserId = ()=>{
  return localStorage.getItem("user_id")
}

export const resetAuth = () => {
  localStorage.clear()
};
