const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    let token = req.header('Authorization');
    if (token) {
        token = token.split(' ')[1];
    } else {
        return res.status(401).json({message: `No token, authorization denied`});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedToken;
        req.token = token;
        next();
    } catch (error) {
        res.status(400).json({message: `Invalid token, authorization denied`});
    }
};

module.exports = auth;
