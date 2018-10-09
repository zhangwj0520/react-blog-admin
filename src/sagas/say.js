import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import actions  from '../store/actions/say'
import * as TYPES from '../store/action-types'
import {blogPost, getSay,fetchInfo } from '../common/index'


function* yieldSay(action=actions) {
  const response = yield call(getSay, action.payload)
  yield put({ type: TYPES.RECEIVE_SAY, response, payload: action.payload })
  const info = yield call(fetchInfo)
  yield put({ type: TYPES.RECEIVE_INFO, info })
}
function* yieldAddSay(action = actions) {
  yield call(blogPost,'/add', action.payload,"POST")
  const payload = yield select((state) => state.say.payload)
  //console.log(payload)
  yield put({ type: TYPES.REQUEST_SAY,payload})
}
function* yieldDeleteSay(action = actions) {
  yield call(blogPost, 'delete/'+action.id, action,"DELETE")
  const payload = yield select((state) => state.say.payload)
  yield put({ type: TYPES.REQUEST_SAY,payload})
}
export function* watchYieldSay() {
  yield all([
    takeLatest(TYPES.REQUEST_SAY, yieldSay),
    takeLatest(TYPES.DELETE_SAY, yieldDeleteSay),
    takeLatest(TYPES.ADD_SAY, yieldAddSay)
  ])
}
