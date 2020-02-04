import { UPLOADED } from '@root/redux/testText/types';

const defaultState = {
    text: '',
    error: null,
};

const testTextReducer = (state = defaultState, { type, payload = {} }) => {

    if (type === UPLOADED) {

        return {
            ...state,
            ...payload,
        };

    }

    return state;

};

export default testTextReducer;
