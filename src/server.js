import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '@root/App';

global.window = {
    IS_SERVER: true,
    MODE: process.env.MODE,
    addEventListener() {}, // eslint-disable-line no-empty-function
};

export default (initalState, requestUrl) => {

    const element = React.createElement(App, {initalState, requestUrl}, null);

    return ReactDOMServer.renderToString(element);

};
