const { applyForJob, readAllApplications, getApplicationById, updateApplicationStatus,deleteApplication, myApplications} = require('../Controller/applicationController');
const Router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const permittedRole = require('../middlewares/permittedRole')
const asyncError = require('../services/asyncError');

Router.route('/apply/:jobId').post(isAuthenticated,asyncError(applyForJob));
Router.route('/readApplication/:jobId').get(isAuthenticated,permittedRole('jobprovider'),asyncError(readAllApplications))
Router.route('/readSingle/:id').get(isAuthenticated,asyncError(getApplicationById));
Router.route('/updateApplication/:id').patch(isAuthenticated,permittedRole('jobprovider'),asyncError(updateApplicationStatus))
Router.route('/deleteApplication/:id').delete(isAuthenticated,permittedRole('jobprovider','jobseeker'),asyncError(deleteApplication))
Router.route('/myApplications').get(isAuthenticated,permittedRole("jobseeker"),myApplications)

module.exports = Router

