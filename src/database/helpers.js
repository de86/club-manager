function snakeToCamel(snakeStr) {
    return snakeStr.replace(/_([a-z])/g, (match, p1) => p1.toUpperCase());
}


function convertKeysToCamelCase(obj) {
    if (Array.isArray(obj)) {
        return obj.map(item => convertKeysToCamelCase(item));
    } else if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            const camelKey = snakeToCamel(key);
            acc[camelKey] = convertKeysToCamelCase(obj[key]);

            return acc;
        }, {});
    }

    return obj;
}

module.exports = {convertKeysToCamelCase};
