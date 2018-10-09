import * as TYPES from '../action-types';

// blog articles action
let articles_action = {
    AddArticle(payload) {
        return {
            type: TYPES.ADD_ARTICLE,
            payload: payload
        }
    },
    DeleteArticle(id) {
        return {
            type: TYPES.DELETE_ARTICLE,
            id
        }        
    },
    RequestArticles(payload) {
        return {
            type: TYPES.REQUEST_ARTICLES,
            payload: payload
        }
    },
    SearchArticles(payload) {
        return {
            type: TYPES.SEARCH_ARTICLES,
            payload: payload
        }
    },
    ReceiveArticles(payload) {
        return {
            type: TYPES.RECEIVE_ARTICLES,
            payload,
        }        
    },
    VisibleArticle(payload){
        return {
            type: TYPES.VISIBLE_ARTICLE,
            payload,
        }
    },
    EditArticle(payload) {
        return {
            type: TYPES.EDIT_ARTICLE,
            payload,
        }
    }
}
export default articles_action;