import { combineReducers, createStore } from "redux"


const USER = {
   token: localStorage.getItem("token") || null,
   info: null
}


const UserReducer = (state = USER, action) => {
   if (action.type === 'AUTH')
      return ({
         ...state, token: action.payload.token, info: action.payload
      })
   return (state)
}

const Reducers = combineReducers({
   user: UserReducer,
})


const store = createStore(Reducers)


export default store
