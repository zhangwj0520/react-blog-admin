import * as TYPES from '../action-types';

const say = (state = { say: [],payload:{pageIndex:1,pageSize:10} }, action) => {
    switch (action.type) {
      case TYPES.REQUEST_SAY:
        return state
      case TYPES.RECEIVE_SAY:
        return {   
          ...state,
          say: action.response,
          payload: action.payload
        }
      default:
        return state
    }
  }
  export default say
  