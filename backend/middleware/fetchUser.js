const jwt = require("jsonwebtoken");
const JWT_SECRET = "scam2022";

const fetchUser = (req, res, next) => {
    try {
        const token = req.header('auth-token');

        if (!token) {
            res.status(401).send({ error: 'Authorized token not found' });
        }

        try {
            var data = jwt.verify(token, JWT_SECRET);
        } catch (error) {
            res.status(401).send({ error: 'Invalid authorization token' });
        }

        req.userID = data.id;
        next();
    } catch (error) {
        res.status(401).send({ error: 'internal error' })
    }
}

module.exports = fetchUser;