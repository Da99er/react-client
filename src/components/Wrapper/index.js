import React from 'react';
import PropTypes from 'prop-types';

import '@root/style/fonts.scss';
import '@root/style/reset.scss';
import '@root/style/style.scss';

import S from './style.scss';
import useHook from './hook';

const Wrapper = ({ children }) => {

    const {color} = useHook();

    return (
        <div
            className={S.container}
            style={{backgroundColor: `#${color}`}}
        >
            <div className={S.body} >
                {children}
            </div>
        </div>
    );

};

Wrapper.propTypes = {
    children: PropTypes.node,
};

Wrapper.defaultProps = {
    children: null,
};

export default Wrapper;
