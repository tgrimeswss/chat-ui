import {MESSAGES,LOADING,USERNAME,TYPING} from '../actions/types'


let initialState = {
  messages:[],
  loading:false,
  username:'',
  typing:null
}


function storeData(state=initialState,action) {
  switch(action.type) {
    case MESSAGES:
    return {
      ...state,
      messages:[...state.messages,action.data]
    }
    case LOADING:
      return {
        ...state,
        loading: action.data
      }
    case USERNAME:
      return {
        ...state,
        username: action.data
      }
    case TYPING:
      return {
        ...state,
        typing:action.data
      }
    default:
      return state
  }
}

export default storeData
