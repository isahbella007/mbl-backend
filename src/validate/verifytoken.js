const jwt = require('jsonwebtoken')

const routeVerify = (req, res, next) => { 
    const token = req.header('auth-token')
    if(!token) return res.status(401).send("Access Denied!")

    try{ 
        const verified = jwt.verify(token, process.env.secret)
        req.userId = verified
        next()
    }catch(err){ 
        res.status(401).send("Invalid token")
    }
}

module.exports = routeVerify