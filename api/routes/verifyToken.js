const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    // console.log(req.headers, "ini req header")
    try {
        if(authHeader){
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.JWT_SEC, (err, user) => {
                if(err) res.status(403).json("Token is not Valid!");
                req.user = user;
                next();
            });
        }else{
            res.status(401).json("You're not Authenticated!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You're not Allowed to do that!");
        }
    });
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You're not Admin!");
        }
    });
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};