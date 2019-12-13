import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from '@root/components/Wrapper';
import TopMenu from '@root/components/TopMenu';
import useUpdateReducerAfterFetch from '@root/hooks/useUpdateReducerAfterFetch';

import useHook from './hooks';
import S from './style.css';

const Color = ({ preloadDataQuery, routerItems }) => {

    const { isLoading } = useUpdateReducerAfterFetch({ preloadDataQuery, routerItems });
    const { color, handleClick } = useHook(routerItems);

    return (
        <Wrapper>
            <TopMenu />
            <h1>Color page: {color}</h1>
            <button onClick={handleClick} className={S.button}>change color</button>
            {isLoading && (<p>Loading</p>)}
        </Wrapper>
    );

};

Color.propTypes = {
    preloadDataQuery: PropTypes.string.isRequired,
};

export default Color;
