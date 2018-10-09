import * as TYPES from '../action-types';
let initState =
{
  ArticleNum: 10,
  sayNumber: 22,
  totalAccess:100,
  
}
function info(state = initState, action) {
  //console.log(action)
    switch (action.type) {
      case TYPES.REQUEST_INFO:
        return state
      case TYPES.RECEIVE_INFO:
        return { ...action.info}
      default:
        return state
    }
  }
  export default info