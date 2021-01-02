import React, { createElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import { parse } from '@root/utils/prepareQuery';

import routerSet from '@root/routerSet';
import routes from '@temp/routes';

const allRoutes = (routes || []).map(({path, component, preloadDataQuery}) => {

    const Component = routerSet[component];

    return (
        <Route
            exact={true}
            path={path}
            key={path}
            render={(props) => {

                const { history, location, match } = props;

                return (
                    <Component
                        history={history}
                        location={location}
                        routerItems={match.params}
                        preloadDataQuery={parse(preloadDataQuery)}
                    />
                );

            }}
        />
    );

});

function App() {

    return createElement(Switch, null, allRoutes);

}

export default App;
