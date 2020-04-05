import React from 'react';
import PropTypes from 'prop-types';

import Screen from '@root/components/Screen';
import Header from '@root/components/Header';
import useUpdateReducerAfterFetch from '@root/hooks/useUpdateReducerAfterFetch';

import useHook from './hook';
import S from './style';

const TestText = ({ preloadDataQuery, routerItems }) => {

    const { isLoading } = useUpdateReducerAfterFetch({ preloadDataQuery, routerItems });
    const { text, handleClick } = useHook(routerItems);

    return (
        <Screen>
            <Header />
            <h1 className={S.title} >Text page</h1>
            <p>{text}</p>
            <button onClick={handleClick} className={S.button}>change text</button>
            <p>routerItems: {JSON.stringify(routerItems, null, 2)}</p>
            {isLoading && (<p>Loading</p>)}
        </Screen>
    );

};

TestText.propTypes = {
    preloadDataQuery: PropTypes.object.isRequired,
    routerItems: PropTypes.object.isRequired,
};

export default TestText;
