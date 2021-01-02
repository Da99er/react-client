import httpXHR from '@root/utils/httpXHR';
import { stringify } from '@root/utils/prepareQuery';

const headers = {
    Accept: 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/x-www-form-urlencoded',
    'same-graphql': true,
};

function sameGraphQl({ method, params = {} }) {

    if (typeof params === 'object') {

        const fullQuery = Object.entries(params)
            .map((queryPair) => `${queryPair[0]}=${stringify(queryPair[1])}`)
            .join('&');

        if (method === 'GET') {

            return httpXHR({
                method,
                headers,
                url: `/apiv1/same-graphql?${fullQuery}`,
            });

        }

        return httpXHR({
            method,
            headers,
            url: '/apiv1/same-graphql',
            body: fullQuery,
        });

    }

    throw new Error('sameGraphQl: argument have wrong type');

}

export default sameGraphQl;
