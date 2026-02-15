const {DataTypes} = require('sequelize');

const { sequelize } = require('../db/dbconfig');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },  
    name: {
        type: DataTypes.STRING,
        allowNull: false                    
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    role: {
            type: DataTypes.ENUM('jobseeker','jobprovider'),
            allowNull: false,
            defaultValue: 'jobseeker'
        },
    otp: {
        type: DataTypes.STRING,

    },
    isVerifed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    phoneNum: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.STRING
    },
    userDescription: {
        type: DataTypes.STRING
    }
})


module.exports = User;