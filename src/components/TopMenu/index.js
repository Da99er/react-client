import React from 'react';
import ActiveLink from '@root/components/ActiveLink';

import S from './style';

const TopMenu = () => (
    <div className={S.root}>
        <ActiveLink href="/color/000000" className={S.link} active={S.active} >black</ActiveLink>
        <ActiveLink href="/color/278222" className={S.link} active={S.active} >Blue</ActiveLink>
        <ActiveLink href="/notfound" className={S.link} active={S.active} >not found</ActiveLink>
    </div>
);

export default TopMenu;
