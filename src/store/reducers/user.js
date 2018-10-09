import * as TYPES from '../action-types';
const initState = {
  loading: false,
  token:""
}
  
const user = (state = initState, action) => {
  //console.log(action)
    switch (action.type) {
      case TYPES.REQUEST_TOKEN:
        return { ...state,loading: true }
      case TYPES.RECEIVE_TOKEN:
        return { userName: action.res.userName,token:action.res.token, identity:action.res.identity,loading: true }
      case TYPES.CLEAR_TOKEN:
        return { ...state,loading: false }
      default:
        return state
    }
  }
  export default user