const { createJob } = require('../Controller/jobController');

const Router = require('express').Router();

Router.route('/create').post(createJob);

module.exports = Router