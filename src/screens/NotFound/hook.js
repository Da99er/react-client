import { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { getText } from '@root/redux/testText/selectors';
import { changeText } from '@root/redux/testText/actions';

export default (routerItems) => {

    const dispatch = useDispatch();

    const handleClick = useCallback(() => {

        dispatch(changeText({
            text: `text width random number ${Math.random()}`,
            routerItems,
        }));

    });

    return {
        text: useSelector((state) => getText(state)),
        handleClick,
    };

};
