import React from "react";
import { useState } from "react";
import { ApiAuthenticatedClient } from "../api/index";
import { useNavigate } from "react-router-dom";
const JobCreateForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    salary: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await ApiAuthenticatedClient.post("/job/create", data);
    if (response.status === 200) {
      alert("Job Created Successfully!");
      setData({
        title: "",
        company: "",
        description: "",
        location: "",
        salary: "",
      });
    }
    else {
      alert("Failed to create job. Please try again.");
    }
  };

  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Job</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Job Title</label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Frontend Developer"
            />
          </div>
          {/* Company */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={data.company}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="ABC Pvt. Ltd."
            />
          </div>
          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Job Description
            </label>
            <textarea
              rows={4}
              name="description"
              value={data.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Describe job role..."
              
            />
          </div>
          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Job Location
            </label>
            <input
              type="text"
              value={data.location}
              onChange={handleChange}
              name="location"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Kathmandu"
            />
          </div>
          {/* Salary */}
          <div>
            <label className="block text-sm font-medium mb-1">Salary</label>
            <input
              type="number"
              name="salary"
              value={data.salary}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder={80000}
            />
          </div>
          {/* Submit */}
          <button
            type="submit"

            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Create Job
          </button>
        </form>
         <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 transition-colors duration-200 mt-3">
          <span onClick={() => navigate("/jobProviderDashboard")} className="font-medium cursor-pointer">
            Back to Jobs
          </span>
        </button>
      </div>
    
    </div>
  );
};

export default JobCreateForm;
