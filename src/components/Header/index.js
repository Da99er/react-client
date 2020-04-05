import React from 'react';
import cx from 'classcat';

import ActiveLink from '@root/components/ActiveLink';
import TopMenu from '@root/components/TopMenu';

import layots from '@root/style/layots.scss';

import S from './style';

const Header = () => (
    <div className={S.root} >
        <div
            className={cx({
                [layots.fullContainer]: true,
                [S.tagLine]: true,
            })}
        >
            <ActiveLink href="/" className={S.tagLine} >Welcome to Worldwide Electronics Store</ActiveLink>
            <TopMenu className={S.topBarMenu} />
        </div>
    </div>
);

export default Header;
