const Router = require('express').Router();
const {getAllUser,getUserById,updateDetails,deleteUser,postDetails} = require('../Controller/userProfileController')

Router.route('/getAllUser').get(getAllUser);
Router.route('/getUserById/:id').get(getUserById);
Router.route('/updateUser/:id').patch(updateDetails);
Router.route('/deleteUser/:id').delete(deleteUser);


module.exports = Router;