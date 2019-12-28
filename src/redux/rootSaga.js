import { fork } from 'redux-saga/effects';

import testText from '@root/redux/testText/saga';

function* rootSaga() {

    yield fork(testText);

}

export default rootSaga;
