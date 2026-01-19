const permittedRole = (...roles) => { //rest operator to accept multiple roles and store them in an array
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

module.exports = permittedRole;
