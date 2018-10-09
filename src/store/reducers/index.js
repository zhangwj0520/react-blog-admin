
import articles from './articles';
import say from './say';
import user from './user';
import info from './info';
import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
//router 是用来把路径同步仓库中的
export default combineReducers({
    articles,
    say,
    user,
    info,
    router:routerReducer
});
