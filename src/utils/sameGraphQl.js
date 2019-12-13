import httpXHR from '@root/utils/httpXHR';
import { stringify } from '@root/utils/prepareQuery';

const headers = {
    Accept: 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/x-www-form-urlencoded',
    'same-graphql': true,
};

const sameGraphQl = ({ method, query = {}, params = {}, items = {} }) => {

    if (method === 'GET') {

        return httpXHR({
            method,
            headers,
            url: `/apiv1/same-graphql?query=${stringify(query)}&params=${stringify(params)}&items=${stringify(items)}`,
        });

    }

    return httpXHR({
        method,
        headers,
        url: `/apiv1/same-graphql?params=${stringify(params)}&items=${stringify(items)}`,
        body: stringify(query),
    });

};

export default sameGraphQl;
