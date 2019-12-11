import { fork } from 'redux-saga/effects';

import someColor from '@root/redux/someColor/saga';

function* rootSaga() {

    yield fork(someColor);

}

export default rootSaga;
