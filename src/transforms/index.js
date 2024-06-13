module.exports = {
    transformObjectKeysFromCamelToSnakeCase,
    transformObjectKeysFromSnakeToCamelCase,
};

/**
 * Transforms a snake_case string to camelCase.
 * @param {string} str - The snake_case string.
 * @returns {string} - The camelCase string.
 */
function transformSnakeToCamel(snakeStr) {
    return snakeStr.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase());
}


/**
 * Transforms a camelCase string to snake_case.
 * @param {string} str - The camelCase string.
 * @returns {string} - The snake_case string.
 */
function transformCamelToSnake(str) {
    return str.replace(/([A-Z])/g, match => `_${match.toLowerCase()}`);
}


/**
 * Transforms the keys of the given object to the targetTransform format
 * @param {Object} obj - Object to be transformed
 * @param {Function} targetTransform - Transform function
 * @returns {Object} - Transformed object
 */
function transformObjectKeys(obj, targetTransform) {
    if (Array.isArray(obj)) {
        return obj.map(item => transformObjectKeys(item, targetTransform));
    } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            const camelKey = targetTransform(key);
            acc[camelKey] = transformObjectKeys(obj[key], targetTransform);

            return acc;
        }, {});
    }

    return obj;
}


/**
 * Transforms the keys of the given object to camel_case
 * @param {*} obj - Object to be transformed
 * @returns {Object} - Transformed object
 */
function transformObjectKeysFromCamelToSnakeCase (obj) {
    return transformObjectKeys(obj, transformCamelToSnake);
}


/**
 * Transforms the keys of the given object to snakeCase
 * @param {*} obj - Object to be transformed
 * @returns {Object} - Transformed object
 */
function transformObjectKeysFromSnakeToCamelCase (obj) {
    return transformObjectKeys(obj, transformSnakeToCamel);
}
