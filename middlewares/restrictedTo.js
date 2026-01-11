const restrictedTo = (...roles) => {
    return (req,res,next) => {
        const userRole = req.user.role;
        console.log(userRole);
        if(!roles.includes(userRole)) {
            res.status(400).json({
                message: "You don't have permission"
            })
            return
        }
        next()
    }
}

module.exports = restrictedTo;