const jwt = require('jsonwebtoken');


module.exports = function(role_id) {
    return function (req, res, next) {
        if(req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token) {
                return res.status(401).json({message: "Пользователь не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if(decoded.role_id !== role_id) {
                return res.status(403).json({message: "Нет доступа"})
            }
            req.user = decoded;
            next();
        } catch (e) {
            res.status(401).json({message: "Пользователь не авторизован"})
        }
    };
};
