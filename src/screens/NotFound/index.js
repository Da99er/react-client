import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Screen from '@root/components/Screen';

import useUpdateReducerAfterFetch from '@root/hooks/useUpdateReducerAfterFetch';

import interactive from '@root/style/interactive.scss';

import useHook from './hook';
import S from './style.scss';

function NotFound({ preloadDataQuery, routerItems }) {

    useUpdateReducerAfterFetch({ preloadDataQuery, routerItems });

    const { text, handleClick } = useHook(routerItems);

    return (
        <Fragment>
            <Helmet>
                <title>Не найдено</title>
                <noscript>404</noscript>
            </Helmet>
            <Screen>
                <h1 className={S.title} >По вашему запросу ничего не найдено</h1>
                <div className={S.content} >
                    <p className={S.text}>{text}</p>
                    <button onClick={handleClick} className={interactive.button}>change text</button>
                    <p>routerItems: {JSON.stringify(routerItems)}</p>
                </div>
            </Screen>
        </Fragment>
    );

}

NotFound.propTypes = {
    preloadDataQuery: PropTypes.object.isRequired,
    routerItems: PropTypes.object.isRequired,
};

export default NotFound;
