const { Job, User, Application } = require("../model");

const applyForJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    const job = await Job.findByPk(jobId);

    if (!job) {
      res.status(400).json({
        message: "Job not found",
      });
      return;
    }

    const existingJobApplication = await Application.findOne({
      where: { userId, jobId },
    });

    if (existingJobApplication) {
      res.status(400).json({
        message: "Already applied for the job",
      });
      return;
    }
    //create applicaion
    const application = await Application.create({
      userId,
      jobId,
    });

    return res.status(200).json({
      message: "successfully applied for job",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//read all applications for a job
const readAllApplications = async (req, res) => {
  try {
  const jobId = req.params.jobId;

  const data = await Application.findAll({
    where: {
      jobId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "name","email"],
      },
      {
        model: Job,
        attributes: ["id", "title"],
      },
    ],
  });

  if (data.length === 0) {
    res.json({
      message: "No applications found",
    });
    return;
  }

  res.json({
    message: "Succesfully fetched applications",
    data,
  });
}
catch (err) {
  console.log(err);
  res.status(400).json({
    message: "Some error occured"
  })
}
};

//get single application by id 
 
const getApplicationById = async (req,res) => {
  try {
  const id = req.params.id;

  const application = await Application.findByPk(id, {
    include: [{
      model: User,
      attributes: ['id', 'name']
    },
  {
    model: Job,
    attributes: ['id','title']
  }
  ]
  });

  if(!application) {
    res.status(400).json({
      message: "Application not found"
    })
    return 
  };

  res.status(200).json({
    message: "Application successfully fetched",
    data: application,
  })
}
catch (err) {
  console.log(err);
  res.status(400).json({
    message: "Some error occured"
  })
}


}

//update application status
const updateApplicationStatus = async (req,res) => {
  const id = req.params.id;
  const {status} = req.body;
  if(!status) {
    res.status(400).json({
      message: "Please provide status to update"
    })
    return
  }
  const application = await Application.findByPk(id);
  if(!application) {
    res.status(400).json({
      message: "Unable to find application"
    });
    return
  } 

  const updatedApplication = await application.update({
    status
  })

  res.status(200).json({
    message: "Successfully updated status",
    data: updatedApplication
  }) 
}

//delete application by id
const deleteApplication = async (req,res) => {
  const id = req.params.id;
  const application = await Application.findByPk(id);

  if(!application) {
    res.status(400).json({
      message: "Application not found"
    })
    return
  }

  await Application.destroy({where: {id}});

  res.status(200).json({
    message: "Application successfully deleted"
  })
}

// get applications of logged in user
const myApplications = async (req,res) => {
  const userId = req.user.id;

  const applications = await Application.findAll({
    where: {userId}
  ,
  include: [
      {
        model: User,
        attributes: ["id", "name","email"],
      },
      {
        model: Job,
        attributes: ["id", "title","company","location","salary"
        ],
      },
    ],
})
  
  

  res.status(200).json({
    message: "applications fetched successfully",
    data: applications
  })
}


module.exports = { applyForJob, readAllApplications, getApplicationById , updateApplicationStatus,deleteApplication,myApplications};
