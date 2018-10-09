import * as TYPES from '../action-types';

let say_action={
    RequestSAY(payload) {
        return {
          type: TYPES.REQUEST_SAY,
          payload
        }       
    },
    ReceiveSAY(payload) {
          return {
            type: TYPES.RECEIVE_SAY,
            payload
          }       
    },
    AddSAY(payload) {
        //console.log(payload)
          return {
            type: TYPES.ADD_SAY,
            payload
          }       
    },
    DeleteSAY(id) {
          return {
            type: TYPES.DELETE_SAY,
            id
          }       
    }
};
export default say_action;
