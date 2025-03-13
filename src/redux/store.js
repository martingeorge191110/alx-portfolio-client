import { combineReducers, createStore } from "redux"


const USER = {
   token: localStorage.getItem("token") || null,
   loading: false,
   info: null,
   pay: false
}


const UserReducer = (state = USER, action) => {
   if (action.type === 'AUTH')
      return ({
         ...state, token: action.payload.token, info: action.payload.user
      })
   if (action.type === 'TOKEN_VALID')
      return ({
         ...state, info: action.payload
      })
   if (action.type === 'IS_LOADING')
      return ({
         ...state, loading: action.payload
      })
   if (action.type === 'IS_PAYING')
      return ({
         ...state, pay: action.payload
      })
   return (state)
}

const Reducers = combineReducers({
   user: UserReducer,
})


const store = createStore(Reducers)


export default store
