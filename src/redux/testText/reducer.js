import { UPLOADED } from './types';

const defaultState = {
    text: '',
    error: null,
};

function reducer(state = defaultState, { type, payload = {} }) {

    if (type === UPLOADED) {

        return {
            ...state,
            ...payload,
        };

    }

    return state;

}

export default reducer;
