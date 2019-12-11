import { UPLOAD } from '@root/redux/someColor/types';

export const changeColor = (color) => ({
    type: UPLOAD,
    payload: color,
});
