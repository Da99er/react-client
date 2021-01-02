import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { PATH_TO_SITE } from '@root/globals/pathTo';
import { stringify } from '@root/utils/prepareQuery';
import createStore from '@root/redux/createStore';

import App from '@root/App';

function appCreator({
    fileStorage,
    preloadData,
    preloadQuery,
    location,
}) {

    function getFile(file) {

        return (fileStorage[file] || '').replace(PATH_TO_SITE, '');

    }

    global.window = {
        IS_SERVER: true,
        location,
        addEventListener() {}, // eslint-disable-line no-empty-function
        removeEventListener() {}, // eslint-disable-line no-empty-function
    };

    const { store } = createStore(preloadData);
    const context = {};

    const element = (
        <Provider store={store}>
            <StaticRouter location={location.path} context={context} >
                <App />
            </StaticRouter>
        </Provider>
    );

    const content = ReactDOMServer.renderToString(element);

    const helmet = Helmet.renderStatic();

    const regExp = /(2|4|5)[0-9][0-9]/;
    const statusCode = (helmet.noscript.toString().match(regExp) || [])[0];

    const appHtml = `<!DOCTYPE html>
<html lang="ru-RU" >
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
<link rel="icon" type="image/x-icon" href="${getFile('favicon.ico')}" >
${helmet.title.toString()}
${helmet.meta.toString()}
${helmet.link.toString()}
${helmet.script.toString()}
<link rel="preload" href="${getFile('client.js')}" as="script">
<link rel="preload" href="${getFile('client.css')}" as="style">
<link rel="stylesheet" href="${getFile('client.css')}" />
<link rel="preload" href="${getFile('font-electro.woff')}" as="font" crossorigin="anonymous" >
</head>
<body >
<div id="root">${content}</div>
<script type="text/preload" id="preloadDataQuery" >${stringify(preloadQuery)}</script>
<script type="text/javascript" src="${getFile('client.js')}"></script>
</body></html>`;

    return {
        appHtml,
        statusCode,
    };

}

export default appCreator;
