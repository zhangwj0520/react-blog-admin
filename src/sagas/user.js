import { message } from 'antd'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import actions  from '../store/actions/user'
import  * as TYPES from '../store/action-types'
import {login } from '../common/index'


function* yieldLogin(action = actions) {
  const res = yield call(login, action.payload)
  localStorage.setItem('token', JSON.stringify(res.token))
  localStorage.setItem('identity', JSON.stringify(res.identity))
  localStorage.setItem('userName', JSON.stringify(res.userName))
  //const info = yield call(fetchInfo)
  //yield put({ type: TYPES.RECEIVE_INFO, info })
  yield put({ type: TYPES.RECEIVE_TOKEN, res })
}
function* yieldLogout() {
  localStorage.removeItem('user')
  yield message.warning('退出登录')
}
export function* watchYieldLogin() {
  yield all([
    takeLatest(TYPES.REQUEST_TOKEN, yieldLogin),
    takeLatest(TYPES.CLEAR_TOKEN, yieldLogout)
  ])
}
