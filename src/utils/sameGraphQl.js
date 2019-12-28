import qs from 'query-string';
import httpXHR from '@root/utils/httpXHR';
import { stringify, parse } from '@root/utils/prepareQuery';

const headers = {
    Accept: 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/x-www-form-urlencoded',
    'same-graphql': true,
};

const sameGraphQl = ({ method, query = {}, params = {}, items = {} }) => {

    if ((typeof query) === (typeof params) === (typeof items === 'object')) {

        const urlQuery = qs.parse(location.search);
        const newParams = Object.keys(params).length ? params : parse(urlQuery.params);

        if (method === 'GET') {

            return httpXHR({
                method,
                headers,
                url: `/apiv1/same-graphql?query=${stringify(query)}&params=${stringify(newParams)}&items=${stringify(items)}`,
            });

        }

        return httpXHR({
            method,
            headers,
            url: `/apiv1/same-graphql?params=${stringify(newParams)}&items=${stringify(items)}`,
            body: stringify(query),
        });

    }

    throw new Error('sameGraphQl: arguments have wrong type');

};

export default sameGraphQl;
