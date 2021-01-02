/* eslint-disable func-style */

import {
    SWITCH_FIRST_TIME_LOADED,
    SWITCH_LOADING_STATUS,
} from './types';

export const switchFirstTimeLoaded = () => ({
    type: SWITCH_FIRST_TIME_LOADED,
});

export const switchLoadingStatus = (payload) => ({
    type: SWITCH_LOADING_STATUS,
    payload,
});
