import { call, put, takeEvery, select, all, takeLatest} from 'redux-saga/effects'
import actions  from '../store/actions/acticles'
import * as TYPES from '../store/action-types'
import {addArticle, deleteArticle, fetchArticles, updateArticle,fetchInfo,seachArticles } from '../common/index'

function* yieldAddArticle(action = actions) {
  const { payload } = action
  yield call(addArticle, payload)
}
function* yieldArticles(action = actions) {
  let { payload } = action
  const response = yield call(fetchArticles, payload);
  yield put({ type: TYPES.RECEIVE_ARTICLES, response, payload })
  const info = yield call(fetchInfo)
  yield put({ type: TYPES.RECEIVE_INFO, info })
}


function* yieldSearchArticles(action = actions) {

  let { payload } = action
  const response = yield call(seachArticles, payload);
  yield put({ type: TYPES.RECEIVE_ARTICLES, response, payload,isSearch:true})
}

function* yieldDeleteArticle(action = actions) {
  const response = yield call(deleteArticle, { id: action.id })
  if (response) {
    const payload = yield select((state) => state.articles.payload)
    yield put({ type: TYPES.REQUEST_ARTICLES, payload })
  }
}
function* yieldEditArticle(action = actions) {
  const response = yield call(updateArticle, action.payload)
  if (response) {
    const payload = yield select((state) => state.articles.payload)
    yield put({ type: TYPES.REQUEST_ARTICLES, payload })
  }
}
export function* watchYieldArticles() {
  yield all([
    takeLatest(TYPES.ADD_ARTICLE, yieldAddArticle),
    takeEvery(TYPES.REQUEST_ARTICLES, yieldArticles),
    takeEvery(TYPES.SEARCH_ARTICLES, yieldSearchArticles),
    takeEvery(TYPES.DELETE_ARTICLE, yieldDeleteArticle),
    takeLatest(TYPES.EDIT_ARTICLE, yieldEditArticle)
  ])
}