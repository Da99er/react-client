import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from '@root/components/Wrapper';
import TopMenu from '@root/components/TopMenu';
import useUpdateReducerAfterFetch from '@root/hooks/useUpdateReducerAfterFetch';

import useHook from './hook';

const NotFound = ({ preloadDataQuery, routerItems }) => {

    const { isLoading } = useUpdateReducerAfterFetch({ preloadDataQuery, routerItems });
    const { text } = useHook();

    return (
        <Wrapper>
            <TopMenu />
            <h1>NotFound page: {text}</h1>
            {isLoading && (<p>Loading</p>)}
        </Wrapper>
    );

};

NotFound.propTypes = {
    preloadDataQuery: PropTypes.string.isRequired,
};

export default NotFound;
