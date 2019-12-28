import React from 'react';
import ActiveLink from '@root/components/ActiveLink';
import SagaLink from '@root/components/SagaLink';

import S from './style';

const TopMenu = () => (
    <div className={S.root}>
        <ActiveLink href="/testpath/abcd" className={S.link} active={S.active} >test aaa</ActiveLink>
        <ActiveLink href="/testpath/qwer" className={S.link} active={S.active} >test sdf</ActiveLink>
        <SagaLink href="/testpath/push" params={{tratata: 1212}} className={S.link}
            active={S.active}
        >my qyery in string tratata:1212</SagaLink>
        <ActiveLink href="/notfound" className={S.link} active={S.active} >not found</ActiveLink>
        <ActiveLink href="/testpath/erro" className={S.link} active={S.active} >error</ActiveLink>
    </div>
);

export default TopMenu;
