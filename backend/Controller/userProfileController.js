const {User} = require('../model');
const bcrypt = require("bcryptjs");



const getAllUser = async (req,res) =>  {
    const users = await User.findAll();
    if(!users){
        return res.status(400).json({
            message: "users not found"
        })
    }

    return res.status(200).json({
        data: users,
        message: "users fetched successfully"
    })
}

const getUserById = async (req,res) => {
    const {id} = req.params;

    if(!id) {
        return res.status(400).json({
            message: "Id is required"
        })
    }

    const user = await User.findByPk(id);
    if(!user) {
        return res.status(400).json({
            message: "user not found"
        })
    }

    return res.status(200).json({
        user,
        message: "user fetched successfully"
    })
}

const deleteUser =async(req,res) => {
    const {id}= req.params;
    if(!id) {
        return res.status(400).json({
            message: "id is required"
        })
    }

    const user =await User.findByPk(id);
    if(!user){
        res.status(400).json({
            message: "user not found"
        })
    }

    await User.destroy({where: {id}});
    res.status(200).json({
        message: "user deleted successfully"
    })

    
}

const updateDetails= async(req,res) => {
    const {id} = req.params;
    const {name,email,password,phoneNum,userDescription,location,education} = req.body;

    const user =await User.findByPk(id);
    if(!user) {
        return res.status(400).json({
            message: "user not found"
        })
    }

  

    await User.update({name,email,password,phoneNum,userDescription,location,education},{where: {id}});

    const updatedUser = await User.findByPk(id);

    return res.status(200).json({
        updatedUser,
        message: "profiles updated successfully"
    })
}

module.exports = {getAllUser,getUserById,updateDetails,deleteUser};