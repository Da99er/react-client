import { SWITCH } from '@root/redux/siteFirstTimeLoaded/types';

const siteFirstTimeLoadedReducer = (state = false, action) => {

    switch (action.type) {

        case SWITCH:

            return false;

        default:
            break;

    }

    return state;

};

export default siteFirstTimeLoadedReducer;
