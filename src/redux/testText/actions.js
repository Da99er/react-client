import { UPLOAD, UPLOADED } from '@root/redux/testText/types';

export const changeText = (text) => ({
    type: UPLOAD,
    payload: text,
});

export const changeTextSuccess = (text) => ({
    type: UPLOADED,
    payload: text,
});
