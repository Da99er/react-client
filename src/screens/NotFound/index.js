import React from 'react';
import PropTypes from 'prop-types';

import Screen from '@root/components/Screen';
import TopMenu from '@root/components/TopMenu';
import useUpdateReducerAfterFetch from '@root/hooks/useUpdateReducerAfterFetch';

import useHook from './hook';
import S from './style';

const NotFound = ({ preloadDataQuery, routerItems }) => {

    const { isLoading } = useUpdateReducerAfterFetch({ preloadDataQuery, routerItems });
    const { text, handleClick } = useHook(routerItems);

    return (
        <Screen>
            <TopMenu />
            <h1 className={S.title} >NotFound page: {text}</h1>
            <button onClick={handleClick} className={S.button}>change text</button>
            <p>routerItems: {JSON.stringify(routerItems)}</p>
            {isLoading && (<p>Loading</p>)}
        </Screen>
    );

};

NotFound.propTypes = {
    preloadDataQuery: PropTypes.object.isRequired,
    routerItems: PropTypes.object.isRequired,
};

export default NotFound;
