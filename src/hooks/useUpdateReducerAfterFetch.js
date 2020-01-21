/* eslint-disable max-nested-callbacks */
import { useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import qs from 'query-string';
import { parse } from '@root/utils/prepareQuery';

import prefixCreator from '@root/redux/utils/prefixCreator';
import { getSiteFirstLoadedStatus } from '@root/redux/siteFirstTimeLoaded/selectors';

import sameGraphQl from '@root/utils/sameGraphQl';

export default ({ preloadDataQuery, routerItems }) => {

    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);

    const isSiteFirstLoaded = useSelector(getSiteFirstLoadedStatus);

    useEffect(() => {

        if (isSiteFirstLoaded) {

            dispatch({
                type: `${prefixCreator('siteFirstTimeLoaded')}SWITCH`,
            });

            return;

        }

        const { params } = qs.parse(location.search);
        const parsedParams = parse(params);

        const preloadQuery = {};

        Object.keys(preloadDataQuery).forEach((property) => {

            preloadQuery[property] = {
                ...parsedParams,
                ...routerItems,
                ...preloadDataQuery[property],
                pathname: location.pathname,
            };

        });

        setLoading(true);

        sameGraphQl({
            method: 'GET',
            params: preloadQuery,
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

                setLoading(false);

            })
            .catch((err) => {

                console.error(err); // eslint-disable-line

            });

    }, [dispatch, preloadDataQuery, routerItems]); // eslint-disable-line

    return {
        isLoading,
    };

};
