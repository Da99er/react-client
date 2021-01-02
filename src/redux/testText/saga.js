import { call, put, takeEvery } from 'redux-saga/effects';

import { changeTextSuccess } from './actions';
import sameGraphQl from '@root/utils/sameGraphQl';

import { UPLOAD } from './types';

function* changeText({ payload }) {

    const { testText } = yield call(sameGraphQl, {
        method: 'POST',
        params: {
            testText: payload,
        },
    });

    yield put(changeTextSuccess(testText));

}

function* rootSaga() {

    yield takeEvery(UPLOAD, changeText);

}

export default rootSaga;
