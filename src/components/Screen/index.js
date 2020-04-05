import React from 'react';
import PropTypes from 'prop-types';

import 'normalize.css/normalize.css';

import '@root/style/fonts.scss';
import '@root/style/style.scss';

import S from './style';

const Screen = ({ children }) => (
    <div className={S.root} >
        {children}
    </div>
);

Screen.propTypes = {
    children: PropTypes.node,
};

Screen.defaultProps = {
    children: null,
};

export default Screen;
