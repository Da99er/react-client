import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '@root/App';

const appCreator = (initalState, requestUrl) => {

    const element = React.createElement(App, {initalState, requestUrl}, null);

    return ReactDOMServer.renderToString(element);

};

export default appCreator;
