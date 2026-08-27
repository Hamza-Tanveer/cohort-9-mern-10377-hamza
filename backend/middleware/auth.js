const jwt = require('jsonwebtoken');
const logger = require('../logger');

const Auth = (req, res, next) => {
    const token = req.cookies?.session;

    if (!token) {
        logger.warn("Token missing from the request.");
        return res.status(401).json({error: 'Authentication required'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_Secret);
        req.userId = decoded.userID;
        next();
    }
    catch (err) {
        logger.warn("Token is expired or invalid");
        return res.status(401).json({error: 'Invalid or expired session'});
    }
};

module.exports = Auth;