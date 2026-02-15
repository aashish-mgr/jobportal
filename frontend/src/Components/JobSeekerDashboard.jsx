import React, { useState, useEffect } from "react";
import { ApiAuthenticatedClient } from "../api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {User} from "lucide-react"

const JobSeekerDashboard = () => {
  const authState = useSelector(state => state.auth);
  const [jobData, setJobData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const fetchJobs = async () => {
    const res = await ApiAuthenticatedClient.get("/job/findAll");
    setJobData(res.data.jobs);
    console.log(res.data.jobs);
  };

  const handleProfile = () => {
    
    
    
    const id = authState.data.id;
    navigate(`/userProfile/${id}`);

  }

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter jobs based on search query
  const filteredJobs = jobData.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600">Discover your next career opportunity</p>
        </div>
        <div className="flex gap-2">
        <button
              onClick={handleProfile}
              className="flex justify-between  bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md"
            >
              <User /> Profile
            </button>
        <button
          onClick={() => navigate("/ViewApplied")}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
        >
          View Applied Jobs
        </button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Find Your Dream Job</h2>
            <p className="text-indigo-100">
              Search thousands of opportunities from top companies
            </p>
          </div>
          <input
            type="search"
            className=" bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-md"
            placeholder="Search Jobs"
            id="search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {/* Job Cards */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            Recommended Jobs
          </h2>
          <p className="text-sm text-gray-600">
            Based on your profile and preferences
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{filteredJobs.length} jobs available</span>
        </div>
      </div>
      <div className="flex flex-wrap flex-row gap-6">
        {filteredJobs.length === 0 ? (
          <p>No jobs Available</p>
        ) : (
          filteredJobs.map((job) => {
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
                <button
                  onClick={() => {
                    navigate(`/singleJob/${job.id}`);
                    console.log(
                      "Navigating to job details for job ID:",
                      job.id,
                    );
                  }}
                  className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                  View Details
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
