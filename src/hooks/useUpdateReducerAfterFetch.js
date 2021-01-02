import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'query-string';

import { getSiteFirstLoadedStatus } from '@root/redux/gui/selectors';
import {
    switchFirstTimeLoaded,
    switchLoadingStatus,
} from '@root/redux/gui/actions';

import sameGraphQl from '@root/utils/sameGraphQl';
import useUpdateStore from '@root/hooks/useUpdateStore';

function useUpdateReducerAfterFetch({ preloadDataQuery, routerItems }) {

    const dispatch = useDispatch();
    const updateStoreHandle = useUpdateStore();
    const isSiteFirstLoaded = useSelector(getSiteFirstLoadedStatus);

    useEffect(() => {

        if (isSiteFirstLoaded) {

            dispatch(switchFirstTimeLoaded());
            return;

        }

        const parsedParams = qs.parse(window.location.search);
        const preloadQuery = {};

        Object.keys(preloadDataQuery).forEach((property) => {

            preloadQuery[property] = {
                ...parsedParams,
                ...preloadDataQuery[property],
                ...routerItems,
                pathname: location.pathname,
            };

        });

        dispatch(switchLoadingStatus(true));

        sameGraphQl({
            method: 'GET',
            params: preloadQuery,
        })
            .then(updateStoreHandle)
            .catch((error) => {

                throw new Error(error);

            });

    }, [preloadDataQuery, routerItems]); // eslint-disable-line

}

export default useUpdateReducerAfterFetch;
