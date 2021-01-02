import { useCallback } from 'react';

import {
    useRouteMatch,
} from 'react-router-dom';

export default function({ href = '/', isTargetBlank = false }) {

    const match = useRouteMatch({
        path: href,
        exact: true,
    });

    const handleClick = useCallback((event) => {

        if (href === window.location.href.replace(window.location.origin, '')) {

            event.preventDefault();
            return false;

        }

        setTimeout(() => {

            window.scroll({ top: 0, left: 0, behavior: 'smooth' });

        }, 10);

        return true;

    }, [href]);

    return {
        isActive: Boolean(match),
        isAnchor: isTargetBlank || href.indexOf('http') === 0,
        handleClick,
    };

}
