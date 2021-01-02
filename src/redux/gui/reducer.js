import {
    SWITCH_FIRST_TIME_LOADED,
    SWITCH_LOADING_STATUS,
} from './types';

import {
    isSiteFirstTimeLoaded,
    isShowedLoadingStatus,
} from './globals';

function reducer(state = {}, { type, payload }) {

    if (type === SWITCH_FIRST_TIME_LOADED) {

        return {
            ...state,
            [isSiteFirstTimeLoaded]: false,
        };

    }

    if (type === SWITCH_LOADING_STATUS) {

        return {
            ...state,
            [isShowedLoadingStatus]: payload,
        };

    }

    return state;

}

export default reducer;
