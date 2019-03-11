exports.objectWithoutKeys = (object, keys = []) => {
    return Object.keys(object).reduce((result, objKey) => {
        if (!keys.includes(objKey)) {
            result[objKey] = object[objKey];
        }
        return result;
    }, {});
};
