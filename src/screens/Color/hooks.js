import { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { getColor } from '@root/redux/someColor/selectors';
import { changeColor } from '@root/redux/someColor/actions';

export default (routerItems) => {

    const dispatch = useDispatch();

    const handleClick = useCallback(() => {

        dispatch(changeColor({
            color: (`0000${Math.random() / 10}`).slice(-6),
            routerItems,
        }));

    });

    return {
        color: useSelector((state) => getColor(state)),
        handleClick,
    };

};
