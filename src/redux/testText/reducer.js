import { UPLOADED } from '@root/redux/testText/types';

const defaultState = {
    text: '',
    error: null,
};

const testTextReducer = (state = defaultState, action) => {

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

export default testTextReducer;
