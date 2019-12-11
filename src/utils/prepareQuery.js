export const stringify = (obj = {}) => encodeURIComponent(JSON.stringify(obj));

export const parse = (str = '%7B%7D') => JSON.parse(decodeURIComponent(str).trim());

export default {
    stringify,
    parse,
};
