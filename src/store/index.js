import {createStore,applyMiddleware,compose} from 'redux';
//import {routerMiddleware} from 'react-router-redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'
const sagaMiddleware = createSagaMiddleware()
//const store = createStore(reducers, applyMiddleware(sagaMiddleware))
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(sagaMiddleware)
  ));
sagaMiddleware.run(rootSaga);
export default store;