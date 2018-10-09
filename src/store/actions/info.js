import * as TYPES from '../action-types';
let user_action={
    RequestInfo(payload) {
        return {
          type: TYPES.REQUEST_INFO,
          payload
        }       
    },
    ReceiveInfo(payload) {
        return {
          type: TYPES.RECEIVE_INFO,
          payload
        }       
    },
};
export default user_action;

