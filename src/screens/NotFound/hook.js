import { useSelector, useDispatch } from 'react-redux';

import { getText } from '@root/redux/testText/selectors';
import { changeText } from '@root/redux/testText/actions';

export default (routerItems) => {

    const dispatch = useDispatch();
    const text = useSelector(getText);

    function handleClick() {

        dispatch(changeText({
            text: `text width random number ${Math.random()}`,
            routerItems,
        }));

    }

    return {
        text,
        handleClick,
    };

};
