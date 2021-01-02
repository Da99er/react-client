import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classcat';

import ActiveLink from '@root/components/ActiveLink';

import S from './style';

function TopMenu({ className }) {

    return (
        <div className={cx([S.root, className])} >
            <ActiveLink href="/testpath/abcd" className={S.link} active={S.active} >test aaa</ActiveLink>
            <ActiveLink href="/testpath/qwer" className={S.link} active={S.active} >test qwer</ActiveLink>
            <ActiveLink href="/testpath/qwer?tratata=121212" className={S.link} active={S.active} >tratata 121212</ActiveLink>
            <ActiveLink href="/notfound" className={S.link} active={S.active} >not found</ActiveLink>
            <ActiveLink href="/testpath/erro" className={S.link} active={S.active} >error</ActiveLink>
        </div>
    );

}

TopMenu.propTypes = {
    className: PropTypes.string,
};

TopMenu.defaultProps = {
    className: '',
};

export default TopMenu;
