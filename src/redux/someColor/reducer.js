import { UPLOADED } from '@root/redux/someColor/types';

const defaultState = {
    color: '000000',
    error: null,
};

const someColorReducer = (state = defaultState, action) => {

    switch (action.type) {

        case UPLOADED:

            return {
                ...state,
                ...action.payload,
            };

        default:
            break;

    }

    return state;

};

export default someColorReducer;
