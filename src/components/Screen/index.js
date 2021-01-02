import React from 'react';
import PropTypes from 'prop-types';

import Loading from '@root/components/Loading';
import Header from '@root/components/Header';

import 'normalize.css/normalize.css';

import '@root/style/fonts.scss';
import '@root/style/style.scss';

import '@root/assets/favicon.ico';

import S from './style';

function Screen({ children }) {

    return (
        <div className={S.root} >
            <Header />
            {children}
            <Loading />
        </div>
    );

}

Screen.propTypes = {
    children: PropTypes.node,
};

Screen.defaultProps = {
    children: null,
};

export default Screen;
