const jwt = require('jsonwebtoken');

// Checks if the given auth token is valid
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "this_is_a_super_secret_secret");
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid Token!"
        });
    }
}