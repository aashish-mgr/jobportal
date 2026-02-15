const { createJob, getAllJobs,getSingleJob,deleteJob, updateJob,getJobsOfUser } = require('../Controller/jobController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const permittedRole = require('../middlewares/permittedRole');
const asyncError = require('../services/asyncError');

const Router = require('express').Router();

Router.route('/create').post(isAuthenticated,permittedRole('jobprovider'),asyncError(createJob));
Router.route('/findAll').get(asyncError(getAllJobs));
Router.route('/getSingle/:id').get(asyncError(getSingleJob))
Router.route('/delete/:id').delete(isAuthenticated,asyncError(deleteJob))
Router.route('/update/:id').patch(isAuthenticated,asyncError(updateJob))
Router.route('/getJobsOfUser/:userId').get(isAuthenticated,asyncError(getJobsOfUser))


module.exports = Router