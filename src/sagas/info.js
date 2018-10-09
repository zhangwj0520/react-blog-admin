import { call, put, takeEvery } from 'redux-saga/effects'
import  * as TYPES from '../store/action-types'
import {fetchInfo } from '../common/index'

function* yieldInfo() {
  const info = yield call(fetchInfo)
  yield put({ type: TYPES.RECEIVE_INFO, info })
}
export function* watchYieldInfo() {
  yield takeEvery(TYPES.REQUEST_INFO, yieldInfo)
}
