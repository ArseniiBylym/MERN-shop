exports.objectWithoutKeys = (object, keys = []) => {
    return Object.keys(object).reduce((result, objKey) => {
        if (!keys.includes(objKey)) {
            result[objKey] = object[objKey];
        }
        return result;
    }, {});
};

exports.errorHandler = (msg, status, errorsArray) => {
    const err = new Error(msg);
    err.errors = errorsArray || undefined;
    err.statusCode = status;
    throw err;
};

exports.errorValidationHandlerMap = arr => {
    return arr.map(item => {
        return {field: item.param, errorMessage: item.msg};
    });
};
