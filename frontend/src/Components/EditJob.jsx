import React, { useState, useEffect } from 'react'
import { ApiAuthenticatedClient } from '../api/index';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { TiArrowBack } from "react-icons/ti";

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        title: "",
        company: "",
        description: "",
        location: "",
        salary: "",
      });
    const [loading, setLoading] = useState(true);

    // Fetch job data when component mounts
    useEffect(() => {
      const fetchJobData = async () => {
        try {
          const response = await ApiAuthenticatedClient.get(`/job/getSingle/${id}`);
          if (response.status === 200) {
            const jobData = response.data.job;
            setData({
              title: jobData.title || "",
              company: jobData.company || "",
              description: jobData.description || "",
              location: jobData.location || "",
              salary: jobData.salary || "",
            });
          }
        } catch (error) {
          console.log(error);
          alert("Failed to load job data");
        } finally {
          setLoading(false);
        }
      };
      fetchJobData();
    }, [id]);

       const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await ApiAuthenticatedClient.patch(`/job/update/${id}`, data);
    if (response.status === 200) {
      alert("Job Edited Successfully!");
      setData({
        title: "",
        company: "",
        description: "",
        location: "",
        salary: "",
      });
      navigate("/jobProviderDashboard");
    }
    else {
      alert("Failed to edit job. Please try again.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow">
        
        
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Job</h2>
        <button onClick={() => navigate("/jobProviderDashboard")} className='cursor-pointer mb-4 border border-black rounded'> <TiArrowBack /></button>
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading job data...</p>
          </div>
        ) : (
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
            Edit Job
          </button>
        </form>
        )}
      </div>
    </div>
  )
}

export default EditJob