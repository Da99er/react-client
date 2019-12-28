import React from 'react';
import PropTypes from 'prop-types';
import { useRoute } from 'wouter';
import cx from 'classcat';

import useHook from './hook';

const SagaLink = ({ href, params, className, active, children }) => {

    const clearedHref = href.split('?')[0].split('#')[0];

    const [isActive] = useRoute(clearedHref);
    const { handleClick } = useHook(clearedHref, params);

    return (
        <a
            onClick={handleClick}
            href={href}
            className={cx({
                [className]: true,
                [active]: isActive,
            })}
        >
            {children}
        </a>
    );

};

SagaLink.propTypes = {
    href: PropTypes.string.isRequired,
    params: PropTypes.object,
    className: PropTypes.string,
    active: PropTypes.string,
    children: PropTypes.node.isRequired,
};

SagaLink.defaultProps = {
    params: {},
    className: '',
    active: '',
};

export default SagaLink;
