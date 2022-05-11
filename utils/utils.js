/**
 * @param {object} obj
 * @param {string} select
 * @returns {object}
 */
exports.getFieldsBySelect = (obj, select) => {
    const keys = select.split(' ');
    return Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));
};
