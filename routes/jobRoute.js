const { createJob, getAllJobs,getSingleJob,deleteJob, updateJob } = require('../Controller/jobController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const restrictedTo = require('../middlewares/restrictedTo');

const Router = require('express').Router();

Router.route('/create').post(isAuthenticated,restrictedTo('jobseeker'),createJob);
Router.route('/findAll').get(getAllJobs);
Router.route('/getSingle/:id').get(getSingleJob)
Router.route('/delete/:id').delete(isAuthenticated,deleteJob)
Router.route('/update/:id').patch(isAuthenticated,updateJob)


module.exports = Router