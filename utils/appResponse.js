/**
 * @param {resObject} res resObject
 * @param {any} data
 * @param {number} status=200
 */
module.exports.ReS = (res, data, status = 200) => {
	return res.status(status).json({
		status: 'success',
		data
	});
};
