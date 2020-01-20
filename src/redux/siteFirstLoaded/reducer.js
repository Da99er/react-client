import { SWITCH } from '@root/redux/siteFirstLoaded/types';

const siteFirstLoadedReducer = (state = false, action) => {

    switch (action.type) {

        case SWITCH:

            return false;

        default:
            break;

    }

    return state;

};

export default siteFirstLoadedReducer;
