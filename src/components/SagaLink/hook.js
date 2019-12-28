import { useCallback } from 'react';

import { useDispatch } from 'react-redux';
import { push } from 'redux-first-history';

import { stringify } from '@root/utils/prepareQuery';

export default (href, params = {}) => {

    const dispatch = useDispatch();

    const handleClick = useCallback((event) => {

        event && event.preventDefault();
        dispatch(push(`${href}?params=${stringify(params)}`));

    });

    return {
        handleClick,
    };

};
