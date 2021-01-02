const emptyObj = '%7B%7D';

export function stringify(obj) {

    if (obj instanceof Object) {

        return encodeURIComponent(JSON.stringify(obj));

    }

    return emptyObj;

}

export function parse(str) {

    if (typeof str === 'string' && str.length) {

        return JSON.parse(decodeURIComponent(str).trim());

    }

    return {};

}

export default {
    stringify,
    parse,
};
