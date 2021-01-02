import prefixCreator from '@root/redux/utils/prefixCreator';

const prefix = prefixCreator('comments');

export const SWITCH_FIRST_TIME_LOADED = `${prefix}SWITCH_FIRST_TIME_LOADED`;
export const SWITCH_LOADING_STATUS = `${prefix}SWITCH_LOADING_STATUS`;
