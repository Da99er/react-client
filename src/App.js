import React, { createElement } from 'react';

import { Provider } from 'react-redux';
import { pathToRegexp } from 'path-to-regexp';

import { Router, Route, Switch } from 'wouter';
import makeCachedMatcher from 'wouter/matcher';

import routes from '@temp/routes';
import createStore from '@root/redux/createStore';

import { parse } from '@root/utils/prepareQuery';

import routerSet from '@root/routerSet';

const convertPathToRegexp = (path) => {

    const keys = [];
    // we use original pathToRegexp package here with keys
    const regexp = pathToRegexp(path, keys, { strict: false });

    return { keys, regexp };

};

const myMatcher = makeCachedMatcher(convertPathToRegexp);

const allRoutes = (routes || []).map((route) => {

    const Component = routerSet[route.component];
    const preloadDataQuery = parse(route.preloadDataQuery) || {};

    return (
        <Route
            path={route.path}
            key={route.path}
        >
            {(routerItems = {}) => <Component routerItems={routerItems.anything ? {} : routerItems} preloadDataQuery={preloadDataQuery} />}
        </Route>
    );

});

const App = ({ initalState, requestUrl }) => {

    const { store, wouterUseLocation } = createStore(initalState, requestUrl);

    return (
        <Provider store={store} >
            <Router hook={wouterUseLocation} matcher={myMatcher} >
                {createElement(Switch, null, allRoutes)}
            </Router>
        </Provider>
    );

};

export default App;
