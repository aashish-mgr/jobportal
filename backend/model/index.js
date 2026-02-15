const Job = require('./jobModel');
const User = require('./UserModel');
const Application = require('./applicationModel')


//Relationship between User and Job
User.hasMany(Job, {foreignKey: 'userId'});
Job.belongsTo(User, {foreignKey: 'userId'});


//Relationship between Application, User and Job
User.hasMany(Application, {foreignKey: 'userId'});
Application.belongsTo(User, {foreignKey: 'userId'});

Job.hasMany(Application, {foreignKey: 'jobId'});
Application.belongsTo(Job, {foreignKey: 'jobId'});



module.exports = {User, Job, Application};
