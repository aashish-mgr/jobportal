const jwt = require('jsonwebtoken');
const User = require('../model/UserModel')


const isAuthenticated = async (req,res,next) => {
//get token from headers
 const token = req.headers.authorization;
if(!token) {
    res.status(403).json({
        message: "Invalid token"
    })
    return
}

//verify token 
await jwt.verify(token,process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if(err){
        res.status(400).json({
            messgage: "token couldn't be verified"
        });
        return
    }
    try{
    
    const userData = await User.findByPk(decoded.id);

    if(!userData) {
        res.status(400).json({
            message: "user not found"
        })
        return
    }

    req.user = userData;
   

    next();
}
catch (err) {
    res.status(500).json({
        message: "something went wrong"
    })
}
    
})

}

module.exports = isAuthenticated;