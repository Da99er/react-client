/* eslint-disable func-style */

import {
    isSiteFirstTimeLoaded,
    isShowedLoadingStatus,
} from './globals';

export const getSiteFirstLoadedStatus = (state) => state.gui[isSiteFirstTimeLoaded];
export const getLoadingStatus = (state) => state.gui[isShowedLoadingStatus] || false;
