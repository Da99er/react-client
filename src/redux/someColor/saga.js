import { call, fork, put, takeEvery } from 'redux-saga/effects';

import { changeColorSuccess } from './actions';
import sameGraphQl from '@root/utils/sameGraphQl';

import { UPLOAD } from './types';

function* changeColor({ payload }) {

    const { someColor } = yield call(sameGraphQl, {
        method: 'POST',
        query: {
            someColor: payload,
        },
        items: payload.routerItems || {},
    });

    yield put(changeColorSuccess(someColor));

}

function* watchChangeColor() {

    yield takeEvery(UPLOAD, changeColor);

}

function* rootSaga() {

    yield fork(watchChangeColor);

}

export default rootSaga;
