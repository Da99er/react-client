import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRoute } from 'wouter';
import cx from 'classcat';

const ActiveLink = ({ href, className, active, children }) => {

    const [isActive] = useRoute(href);

    return (
        <Link
            href={href}
            className={cx({
                [className]: true,
                [active]: isActive,
            })}
        >
            {children}
        </Link>
    );

};

ActiveLink.propTypes = {
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
    active: PropTypes.string,
    children: PropTypes.node.isRequired,
};

ActiveLink.defaultProps = {
    className: '',
    active: '',
};

export default ActiveLink;
