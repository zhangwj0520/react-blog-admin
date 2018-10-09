import * as TYPES from '../action-types';
let user_action={
    RequestToken(payload) {
        return {
          type: TYPES.REQUEST_TOKEN,
          payload
        }       
    },
    ReceiveToken(payload) {
        return {
          type: TYPES.RECEIVE_TOKEN,
          payload
        }       
    },
    ClearToken(payload) {
        return {
          type: TYPES.CLEAR_TOKEN,
          payload
        }       
    },
 
   

};
export default user_action;

