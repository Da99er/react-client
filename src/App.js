import React, { createElement } from 'react';

import { Provider } from 'react-redux';

import { Router, Route, Switch } from 'wouter';

import routes from '@temp/routes';
import createStore from '@root/redux/createStore';

import routerSet from '@root/routerSet';

const allRoutes = (routes || []).map((route) => {

    const Component = routerSet[route.component];

    return (
        <Route
            path={route.path}
            key={route.path}
        >
            {(routerItems) => <Component routerItems={routerItems} preloadDataQuery={route.preloadDataQuery} />}
        </Route>
    );

});

const App = ({ initalState, requestUrl }) => {

    const { store, wouterUseLocation } = createStore(initalState, requestUrl);

    return (
        <Provider store={store} >
            <Router hook={wouterUseLocation} >
                {createElement(Switch, null, allRoutes)}
            </Router>
        </Provider>
    );

};

export default App;
