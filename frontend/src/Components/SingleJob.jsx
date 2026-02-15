import React, { useEffect } from "react";
import { ApiAuthenticatedClient } from "../api";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleJob = () => {
  const [job, setJob] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
   const authState = useSelector(state => state.auth);
   
  
   const getRole = () => {
    const data = localStorage.getItem('user');
    console.log(data);
   }
  const fetchJobData = async (id) => {
    try {
      const res = await ApiAuthenticatedClient.get(`/job/getSingle/${id}`);
      setJob(res.data.job);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchJobData(id);
    getRole();
  }, [id]);

  const handleBack = () => {
    if(authState.role === "jobseeker") {
      navigate("/jobSeekerDashboard");
    } else if(authState.role === "jobprovider") {
      navigate("/jobProviderDashboard");
    }
   
  };

 

  const handleApply = async () => {
    try {
     const res = await ApiAuthenticatedClient.post(`/apply/${id}`);
     if(res.status === 200) {
      alert("Application successful!");
     
      
     }
    } 
    catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
     
  }
   
  
  

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 transition-colors duration-200">
          <span onClick={handleBack} className="font-medium cursor-pointer">
            Back to Jobs
          </span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-100">
          {/* Header Section */}
          <div className="p-6 md:p-8 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Title: {job.title}
            </h1>
            <div className="flex items-center gap-2 text-lg text-indigo-600 font-medium mb-4">
              <span>Company: {job.company}</span>
            </div>

            {/* Job Meta Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <span>Location: {job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <span>Salary: {job.salary}</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            {/* Description */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                About the Role
              </h2>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="p-6 md:p-8 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-3">
              {authState.role === "jobseeker"?  <button onClick={handleApply} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                Apply Now
              </button>: null}
              
              
              <button
                onClick={handleBack}
                className="flex-1 sm:flex-initial bg-white hover:bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors duration-200 cursor-pointer"
              >
                Back to Listings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJob;
