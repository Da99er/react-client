import prefixCreator from '@root/redux/utils/prefixCreator';

const prefix = prefixCreator('testText');

export const UPLOAD = `${prefix}UPLOAD`;
export const UPLOADED = `${prefix}UPLOADED`;
