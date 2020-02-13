import React from 'react';
import PropTypes from 'prop-types';

import '@root/style/fonts.scss';
import '@root/style/reset.scss';
import '@root/style/style.scss';

import S from './style';
import useHook from './hook';
const Wrapper = ({ children }) => {

    const {text} = useHook();

    const color = (`${text.split('').reduce((acc, letter) => (acc + letter.charCodeAt()), 0)}000000`).slice(0, 6);

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
