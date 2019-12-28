import { call, fork, put, takeEvery } from 'redux-saga/effects';

import { changeTextSuccess } from './actions';
import sameGraphQl from '@root/utils/sameGraphQl';

import { UPLOAD } from './types';

function* changeText({ payload }) {

    const { testText } = yield call(sameGraphQl, {
        method: 'POST',
        query: {
            testText: payload,
        },
        items: payload.routerItems || {},
    });

    yield put(changeTextSuccess(testText));

}

function* watchChangeText() {

    yield takeEvery(UPLOAD, changeText);

}

function* rootSaga() {

    yield fork(watchChangeText);

}

export default rootSaga;
