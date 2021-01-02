import React from 'react';
import cx from 'classcat';

import ActiveLink from '@root/components/ActiveLink';
import TopMenu from '@root/components/TopMenu';

import layots from '@root/style/layots.scss';

import S from './style';

function Header() {

    return (
        <div className={S.root} >
            <div className={cx([layots.fullContainer, S.tagLine])} >
                <ActiveLink href="/" className={S.tagLine} >Logo text</ActiveLink>
                <TopMenu className={S.topBarMenu} />
            </div>
        </div>
    );

}

export default Header;
