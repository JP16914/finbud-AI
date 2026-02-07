const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: "Access Denied" });

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Lưu thông tin user vào request
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid Token" });
    }
};