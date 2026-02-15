import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiAuthenticatedClient } from "../api";
import { Briefcase,Clock,Trash2,User } from "lucide-react";
import { useSelector } from "react-redux";

const JobProviderDashboard = () => {
  const authState = useSelector(state => state.auth)
  const [jobData, setJobData] = useState([]);
  const navigate = useNavigate();
  const handleCreateJob = () => {
    navigate("/createJob");
  };

  
  const fetchJobs = async () => {
    const res = await ApiAuthenticatedClient.get(`/job/getJobsOfUser/${authState.data.id}`);
    console.log(res);
    setJobData(res.data.jobs);
    console.log(res.data.jobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await ApiAuthenticatedClient.delete(`/job/delete/${id}`);
      if (res.status === 200) {
        alert("Job deleted successfully");
        fetchJobs();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

   const handleProfile = () => {  
    const id = authState.data.id;
    navigate(`/userProfile/${id}`);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Job Provider Dashboard
        </h1>
        <div className="flex gap-2">
          <button
              onClick={handleProfile}
              className="flex justify-between  bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md"
            >
              <User /> Profile
            </button>
        <button
          onClick={handleCreateJob}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 mx-2"
        >
          + Create Job
        </button>
        
        </div>
      </div>

       {/* status */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-600">Total Jobs</div>
              <Briefcase className="text-blue-500" size={24} />
            </div>
            <div className="text-3xl font-bold text-gray-900">{jobData.length}</div>
          </div>
          
         
          
          
        </div>
      {/* Job Cards */}
       <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Posted Jobs</h2>
        </div>
      <div className="flex flex-wrap flex-row gap-6">
        {jobData.length === 0 ? (
          <p>No jobs Available</p>
        ) : (
          jobData.map((job) => {
            return (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-5 border border-gray-100 cursor-pointer min-w-[30vw]"
              >
                {/* Title and Company */}
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                    {job.title}
                  </h3>
                  <p className="text-sm text-indigo-600 font-medium flex items-center gap-1">
                    {job.company}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {job.description}
                </p>

                {/* Location and Salary */}
                <div className="flex flex-col gap-2 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="line-clamp-1">
                      Location: {job.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                    <span>Rs. {job.salary}</span>
                  </div>
                </div>
                <div className="flex flex-row gap-6">
 <button onClick={() => {navigate(`/singleJob/${job.id}`)
 console.log("Navigating to job details for job ID:", job.id);}
} className="flex items-center justify-center w-full m-1  gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm">
                  View Details
                  </button>
                   <button
          onClick={() => navigate(`/viewApplication/${job.id}`)}
          className="flex items-center justify-center w-full m-1 gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm"
        >
          view job applications
        </button>
        </div>
                <div className="flex flex-row gap-6">
                  <button onClick={() => {
                    navigate(`/editJob/${job.id}`);
                  }} className="flex items-center justify-center w-full m-1 gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm">
                    Edit
                  </button>
                  <button
                  onClick={() => {
                    handleDelete(job.id)
                  }}
                   className="flex items-center justify-center w-full gap-2 m-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm">
                    <Trash2 />
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default JobProviderDashboard;
