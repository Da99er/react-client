import React from 'react';

import useHook from './hook';

import S from './style.scss';

function Loading() {

    const { loadingStatus } = useHook();

    if (loadingStatus === true) {

        return (
            <div className={S.root} >
                <div className={S.bar} />
            </div>
        );

    }

    return null;

}

export default Loading;
