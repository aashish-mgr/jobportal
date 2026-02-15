const {Job, User} = require("../model");

const createJob = async (req, res) => {
  const { title, company, description, salary, location } = req.body;

  const userId = req.user.id;

  if (!title || !description || !location) {
    return res.status(400).json({ message: "Please provide all details" });
  }

  const job = await Job.create({
    title,
    description,
    company,
    salary,
    location,
    userId,
  });

  res.status(200).json({ message: "Job created successfully" });
};

//get all jobs
const getAllJobs = async (req, res) => {
  const jobs = await Job.findAll({
        include: {
            model: User,
            attributes: ["id", "name", "email"]
        }
    }); //returns array

  // const jobs = await Job.findAll();
  if (jobs.length == 0) {
    return res.status(404).json({
      message: "no jobs found",
    });
  }

  return res.status(200).json({
    message: "jobs fetched successfully",
    jobs,
  });
};

//get single job by id
const getSingleJob = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "Job id is required",
    });
  }
  const job = await Job.findByPk(id, {
    include: {
      model: User,
      attributes: ["id", "name", "email"],
    }
  });
  // const job = await findOne({where: {id}})

  if (!job) {
    return res.status(400).json({
      message: "job not found",
    });
  }
  res.json({
    message: "fetched successfully",
    job,
  });
};

  //delete Job
  const deleteJob = async (req, res) => {
    const id = req.params.id;
    const job = await Job.findOne({ where: { id } });
    if (!job) {
      return res.status(404).json({
        message: "job not found",
      });
    }

    await Job.destroy({ where: { id } });

    return res.json({
      message: "Job deleted successfully",
    });
  };


  //update job
  const updateJob = async (req,res) => {
    const id = req.params.id;
    const {title,
    description,
    company,
    salary,
    location,
    userId } = req.body;

    const job = await Job.findOne({ where: { id } });
    if (!job) {
      return res.status(404).json({
        message: "job not found",
      });
    }

    await Job.update({title,
    description,
    company,
    salary,
    location
    },{where: {id}});

    const updatedJob = await Job.findByPk(id,{
    include: {
      model: User,
      attributes: ["id", "name", "email"],
    }
  });

    res.status(200).json({
      message: "Job updated successfully",
      updatedJob
    })
  }

  const getJobsOfUser = async(req,res) => {
    const {userId} = req.params;

    const jobs = await Job.findAll({where: {userId}, 
      include: [
        {
          model: User,
          attributes: ["id","email","role"]
        }
      ]
    })

    if(!jobs) {
      return res.status(400).json({
        message: "jobs not found"
      })
    }

    return res.status(200).json({
      jobs,
      message: "jobs fetched successfully"
    })


  }

module.exports = { createJob, getAllJobs, getSingleJob, deleteJob, updateJob, getJobsOfUser};
