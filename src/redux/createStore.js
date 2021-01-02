import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '@root/redux/rootSaga';
import reducerObject from '@root/redux/reducerObject';

const sagaMiddleware = createSagaMiddleware();

export default (initalState) => {

    const middlewares = [sagaMiddleware];

    const store = createStore(
        combineReducers({
            ...reducerObject,
        }),
        initalState,
        applyMiddleware(...middlewares),
    );

    sagaMiddleware.run(rootSaga);

    return {
        store,
    };

};
