import * as TYPES from '../action-types';
let initSate = {
  isSearch: false,
  articles: [],
  payload: {
    pageIndex:1,
    pageSize:5
  },
  len:0
}
function articles(state = initSate, action) {
  switch (action.type) {
    case TYPES.ADD_ARTICLE:
      return { payload: action.payload };        
    case TYPES.REQUEST_ARTICLES:
      return state;
    case TYPES.RECEIVE_ARTICLES:
        return {
          ...state,
          articles: action.response.data,
          payload: action.payload,
          isSearch: action.isSearch,
          len:action.response.len
        }
      case TYPES.VISIBLE_ARTICLE:
        return action.visible
      default:
        return state
    }
}
export default articles