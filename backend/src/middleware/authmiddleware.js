const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        if (token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // JWT me sign karte waqt 'id' property use ki thi
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware; // 👈 ye simple export hi hona chahiye
