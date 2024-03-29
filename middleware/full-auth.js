const CustomError = require('../errors');
const { isTokenValid } = require('../utils/jwt').default;

const authenticateUser = async (req, res, next) => {
	let token;
	const authHeader = req.headers.authorization;
	if (authHeader && authHeader.startswith('Bearer')) {
		token = authHeader.split(' ')[1];
	} else if (req.cookies.token) {
		token = req.cookies.token;
	}

	if (!token) {
		throw new CustomError.UnauthenticatedError('Authentication invalid.');
	}

	try {
		const payload = isTokenValid(token);
		req.user = {
			userId: payload.user.userId,
		};

		next();
	} catch (error) {
		throw new CustomError.UnauthenticatedError('Authentication invalid.');
	}
};

module.exports = authenticateUser;
