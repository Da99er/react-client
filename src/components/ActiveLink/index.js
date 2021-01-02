import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classcat';

import useHook from './hook';

import {
    Link,
} from 'react-router-dom';

function ActiveLink({
    href,
    children,
    alt,
    rel,
    className,
    active,
    isTargetBlank,
    disabled,
}) {

    const {
        isActive,
        isAnchor,
        handleClick,
    } = useHook({ href, isTargetBlank });

    if (typeof href !== 'string') {

        return null;

    }

    if (disabled) {

        return (
            <span className={className} >
                {children}
            </span>
        );

    }

    if (isAnchor) {

        return (
            <a
                href={href}
                alt={alt}
                target={'_blank'}
                rel="noreferrer"
                className={className}
            >
                {children}
            </a>
        );

    }

    return (
        <Link
            to={href}
            alt={alt}
            rel={rel}
            className={cx([className, isActive ? active : ''])}
            onClick={handleClick}
        >
            {children}
        </Link>
    );

}

ActiveLink.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    alt: PropTypes.string,
    rel: PropTypes.string,
    className: PropTypes.string,
    active: PropTypes.string,
    isTargetBlank: PropTypes.bool,
    disabled: PropTypes.bool,
};

ActiveLink.defaultProps = {
    alt: '',
    rel: '',
    className: '',
    active: '',
    isTargetBlank: false,
    disabled: false,
};

export default ActiveLink;
