import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'query-string';

import sameGraphQl from '@root/utils/sameGraphQl';
import { parse } from '@root/utils/prepareQuery';
import App from '@root/App';

const preloadDataQuery = parse(document.getElementById('preloadDataQuery').innerHTML);
const routerItems = parse(document.getElementById('routerItems').innerHTML);
const { params } = qs.parse(location.search);

sameGraphQl({
    method: 'GET',
    query: preloadDataQuery,
    items: routerItems || {},
    params: params || {},
})
    .then((initalState) => {

        ReactDOM.hydrate(
            <App
                initalState={initalState}
                requestUrl={location.pathname}
            />,
            document.getElementById('root')
        );

    })
    .catch((err) => {

        throw new Error(JSON.stringify(err));

    });
