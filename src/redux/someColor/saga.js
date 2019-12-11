import { LOCATION_CHANGE } from 'redux-first-history';
import { takeEvery } from 'redux-saga/effects';

function* changeLocation({ payload }) {

    const { location, action } = payload;
    // eslint-disable-next-line

    yield console.log('LOCATION_CHANGE', location, action);

}

export default function* rootSaga() {

    yield takeEvery(LOCATION_CHANGE, changeLocation);

}

/* import { call, fork, put, takeEvery } from 'redux-saga/effects';

import { findCases as findCasesBase } from '@/redux/entities/cases/saga';

import { findCasesSuccess } from './actions';
import { FIND_CASES } from './types';

function* findCases(options) {
  const ids = yield call(findCasesBase, options);

  yield put(findCasesSuccess(ids));
}

function* watchFindCases() {
  yield takeEvery(FIND_CASES, findCases);
}

function* casesSaga() {
  yield fork(watchFindCases);
}

export default casesSaga;*/
