const {registerUser, loginUser, forgotPassword,verifyOtp,resetPassword} = require('../Controller/userController');
const Router = require('express').Router();



Router.post('/register', registerUser);
Router.post('/login',loginUser);
Router.route('/forgotPassword').post(forgotPassword);
Router.route('/verifyOtp').post(verifyOtp);
Router.route('/resetPassword').post(resetPassword);

module.exports = Router;