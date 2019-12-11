/* eslint-disable max-nested-callbacks */
import { useEffect, useState } from 'react';
import { batch, useDispatch } from 'react-redux';
import qs from 'query-string';

import prefixCreator from '@root/redux/prefixCreator';

import sameGraphQl from '@root/utils/sameGraphQl';

import { parse } from '@root/utils/prepareQuery';

export default ({ preloadDataQuery, routerItems }) => {

    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {

        const fetchQueryObj = parse(preloadDataQuery);
        const { params } = qs.parse(location.search);

        setLoading(true);

        sameGraphQl({
            method: 'GET',
            query: fetchQueryObj,
            items: routerItems || {},
            params: params || {},
        })
            .then((loaderProperties) => {

                // name of action must be like "redux/SOMECOLOR/UPLOADED"

                batch(() => {

                    Object.keys(loaderProperties).forEach((property) => {

                        dispatch({
                            type: `${prefixCreator(property)}UPLOADED`,
                            payload: loaderProperties[property],
                        });

                    });

                });

            })
            .catch((err) => {

                console.error(err); // eslint-disable-line no-console

            }).finally(() => setLoading(false));

    }, [preloadDataQuery, routerItems]);

    return {
        isLoading,
    };

};
