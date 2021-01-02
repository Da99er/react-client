import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import smoothscroll from 'smoothscroll-polyfill';

import { isSiteFirstTimeLoaded } from '@root/redux/gui/globals';

import createStore from '@root/redux/createStore';
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
            gui: {
                [isSiteFirstTimeLoaded]: true,
            },
        };

        const { store } = createStore(clientState);

        const element = (
            <Provider store={store}>
                <BrowserRouter >
                    <App />
                </BrowserRouter>
            </Provider>
        );

        ReactDOM.hydrate(element, document.getElementById('root'));

    })
    .catch((error) => {

        throw new Error(error);

    });

smoothscroll.polyfill();
