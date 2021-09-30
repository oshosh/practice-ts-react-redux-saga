import { compose, createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas';


const sagaMiddleWare = createSagaMiddleware()
const middlewares = [sagaMiddleWare] // 미들웨어 추가시..
const enhance = compose(applyMiddleware(...middlewares))

const store = createStore(rootReducer, enhance)
sagaMiddleWare.run(rootSaga)

export default store;