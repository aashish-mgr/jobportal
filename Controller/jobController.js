const Job = require("../model/jobModel");

const createJob = async (req,res) => {
    const {title, company, description, salary, location, userId} = req.body;

  if(!title || !description || !location) {
    return res.status(400).json({"message": "Please provide all details"});
  }

  const job = await Job.create({
    title,
    description,
     company,
     salary,
     location,
     userId
  })

  res.status(200).json({"message": "Job created successfully"})
}

module.exports = {createJob}