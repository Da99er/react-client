/* eslint-disable func-style */

import { UPLOAD, UPLOADED } from './types';

export const changeText = (payload) => ({
    type: UPLOAD,
    payload,
});

export const changeTextSuccess = (payload) => ({
    type: UPLOADED,
    payload,
});
