import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classcat';

import ActiveLink from '@root/components/ActiveLink';
import SagaLink from '@root/components/SagaLink';

import S from './style';

const TopMenu = ({ className }) => (
    <div
        className={cx({
            [S.root]: true,
            [className]: Boolean(className),
        })}
    >
        <ActiveLink href="/testpath/abcd" className={S.link} active={S.active} >test aaa</ActiveLink>
        <ActiveLink href="/testpath/qwer" className={S.link} active={S.active} >test qwer</ActiveLink>
        <SagaLink href="/testpath/push" params={{tratata: 1212}} className={S.link}
            active={S.active}
        >push qyery &#123;tratata:1212&#125;</SagaLink>
        <ActiveLink href="/notfound" className={S.link} active={S.active} >not found</ActiveLink>
        <ActiveLink href="/testpath/erro" className={S.link} active={S.active} >error</ActiveLink>
    </div>
);

TopMenu.propTypes = {
    className: PropTypes.string,
};

TopMenu.defaultProps = {
    className: '',
};

export default TopMenu;
