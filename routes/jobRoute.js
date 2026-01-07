const { createJob, getAllJobs,getSingleJob,deleteJob, updateJob } = require('../Controller/jobController');

const Router = require('express').Router();

Router.route('/create').post(createJob);
Router.route('/findAll').get(getAllJobs);
Router.route('/getSingle/:id').get(getSingleJob)
Router.route('/delete/:id').delete(deleteJob)
Router.route('/update/:id').patch(updateJob)


module.exports = Router