


export const AuthAction = (payload) => {
   return ({
      type: "AUTH",  payload
   })
}

export const TokenValidAction = (payload) => {
   return ({
      type: "TOKEN_VALID",  payload
   })
}

export const IsLoadingAction = (payload) => {
   return ({
      type: "IS_LOADING", payload
   })
}

export const IsPayingAction = (payload) => {
   return ({
      type: "IS_PAYING", payload
   })
}
