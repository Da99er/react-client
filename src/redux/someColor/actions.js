import { UPLOAD, UPLOADED } from '@root/redux/someColor/types';

export const changeColor = (color) => ({
    type: UPLOAD,
    payload: color,
});

export const changeColorSuccess = (color) => ({
    type: UPLOADED,
    payload: color,
});
