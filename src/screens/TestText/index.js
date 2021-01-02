import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Screen from '@root/components/Screen';
import useUpdateReducerAfterFetch from '@root/hooks/useUpdateReducerAfterFetch';

import interactive from '@root/style/interactive.scss';

import useHook from './hook';

import S from './style.scss';

function TestText({ preloadDataQuery, routerItems }) {

    useUpdateReducerAfterFetch({ preloadDataQuery, routerItems });
    const { text, handleClick } = useHook(routerItems);

    return (
        <Fragment>
            <Helmet>
                <title>React client</title>
            </Helmet>
            <Screen>
                <h1 className={S.title} >Text page</h1>
                <p className={S.text} >{text}</p>
                <button onClick={handleClick} className={interactive.button}>change text</button>
                <p>routerItems: {JSON.stringify(routerItems, null, 2)}</p>
            </Screen>
        </Fragment>
    );

}

TestText.propTypes = {
    preloadDataQuery: PropTypes.object.isRequired,
    routerItems: PropTypes.object.isRequired,
};

export default TestText;
