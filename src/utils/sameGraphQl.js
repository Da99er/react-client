import httpXHR from '@root/utils/httpXHR';
import { stringify } from '@root/utils/prepareQuery';

const sameGraphQl = ({ method, query = {}, params = {}, items = {} }) => {

    if (method === 'GET') {

        return httpXHR({
            method,
            url: `/apiv1/same-graphql?query=${stringify(query)}&params=${stringify(params)}&items=${stringify(items)}`,
        });

    }

    return httpXHR({
        method,
        url: `/apiv1/same-graphql?params=${stringify(params)}&items=${stringify(items)}`,
        body: stringify(query),
    });

};

export default sameGraphQl;
