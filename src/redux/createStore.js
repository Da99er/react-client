import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createReduxHistoryContext } from 'redux-first-history';
import { createWouterHook } from 'redux-first-history/wouter';
import { createBrowserHistory, createMemoryHistory } from 'history';

import rootSaga from '@root/redux/rootSaga';
import reducerObject from '@root/redux/reducerObject';

const sagaMiddleware = createSagaMiddleware();

if (MODE === 'development') { // eslint-disable-line no-undef

    // middlewares.push(require('redux-logger').logger);

}

export default (initalState, requestUrl) => {

    const historyMeta = window.IS_SERVER ? createMemoryHistory({ initialEntries: [requestUrl] }) : createBrowserHistory();

    const {
        createReduxHistory,
        routerMiddleware,
        routerReducer,
    } = createReduxHistoryContext({ history: historyMeta });

    const middlewares = [sagaMiddleware, routerMiddleware];

    const store = reduxCreateStore(
        combineReducers({
            ...reducerObject,
            router: routerReducer,
        }),
        initalState,
        applyMiddleware(...middlewares),
    );

    const history = createReduxHistory(store);

    sagaMiddleware.run(rootSaga);

    return {
        store,
        wouterUseLocation: createWouterHook(history),
    };

};
