import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from '@root/components/Wrapper';
import TopMenu from '@root/components/TopMenu';
import useUpdateReducerAfterFetch from '@root/hooks/useUpdateReducerAfterFetch';

import useHook from './hook';
import S from './style.css';

const TestText = ({ preloadDataQuery, routerItems }) => {

    const { isLoading } = useUpdateReducerAfterFetch({ preloadDataQuery, routerItems });
    const { text, handleClick } = useHook(routerItems);

    return (
        <Wrapper>
            <TopMenu />
            <h1>Text page: {text}</h1>
            <button onClick={handleClick} className={S.button}>change text</button>
            {isLoading && (<p>Loading</p>)}
        </Wrapper>
    );

};

TestText.propTypes = {
    preloadDataQuery: PropTypes.string.isRequired,
};

export default TestText;
