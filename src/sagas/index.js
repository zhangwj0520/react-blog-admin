import { all } from 'redux-saga/effects'
import { watchYieldArticles } from './articles'
import { watchYieldSay } from './say'
import { watchYieldLogin } from './user'
import { watchYieldInfo } from './info'
export default function* rootSaga() {
  yield all([
    watchYieldArticles(),
    watchYieldSay(),
    watchYieldLogin(),
    watchYieldInfo()
  ])
}
