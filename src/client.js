import React from 'react';
import ReactDOM from 'react-dom';

import sameGraphQl from '@root/utils/sameGraphQl';
import { parse } from '@root/utils/prepareQuery';
import App from '@root/App';

const preloadDataQuery = parse(document.getElementById('preloadDataQuery').innerText);

sameGraphQl({
    method: 'GET',
    params: preloadDataQuery || {},
})
    .then((initalState) => {

        const clientState = {
            ...initalState,
            siteFirstLoaded: true,
        };

        ReactDOM.hydrate(
            <App
                initalState={clientState}
                requestUrl={location.pathname}
            />,
            document.getElementById('root')
        );

    })
    .catch((err) => {

        throw new Error(JSON.stringify(err));

    });
