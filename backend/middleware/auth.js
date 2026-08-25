const jwt = require('jsonwebtoken');
const logger = require('../logger');

const Auth = (req, res, next) => {
    const token = req.cookies?.session;

    if (!token) {
        logger.warn({path: req.originalUrl}, 'Authentication required');
        return res.status(401).json({error: 'Authentication required'});
    }

    try {
        req.userId = jwt.verify(token, process.env.JWT_Secret).userID;
        next();
    }
    catch (err) {
        logger.warn({err, path: req.originalUrl}, 'Invalid or expired session');
        return res.status(401).json({error: 'Invalid or expired session'});
    }
};

module.exports = Auth;