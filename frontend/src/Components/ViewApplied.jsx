import React from 'react'
import { useState, useEffect } from 'react';
import { ApiAuthenticatedClient } from '../api';
import { useNavigate } from 'react-router-dom';


const ViewApplied = () => {
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();
    
    const fetchApplications = async () => {
        try {
          const res = await ApiAuthenticatedClient.get(`/myApplications`);
          setApplications(res.data.data);
          console.log(res.data.data);
        } catch (err) {
          alert(err.response?.data?.message || "Something went wrong");
        }
    };
    
    useEffect(() => {
        fetchApplications();
    }, []);
          
    const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200"
    };


    const labels = {
      pending: "Under Review",
      approved: "Approved",
      rejected: "Rejected"
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        
        {labels[status]}
      </span>
    );


  };

 const handleDelete = async (id) => {
    try {
     await ApiAuthenticatedClient.delete(`/deleteApplication/${id}`);
     fetchApplications();
    }
    catch(err) {
        alert(err.response?.data?.message || "Something went wrong");
    }
 }

  const getStatusCount = (status) => {
     return applications.filter(a => a.status === status).length;
  }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Applications
          </h1>
          <p className="text-gray-600">
            Track and manage your job applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-blue-500">
            <div className="text-sm text-gray-600 mb-1">Total Applications: {applications.length}</div>
            <div className="text-2xl font-bold text-gray-900"></div>
          </div>
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-yellow-500">
            <div className="text-sm text-gray-600 mb-1">Under Review: {getStatusCount("pending")}</div>
            <div className="text-2xl font-bold text-yellow-600"></div>
          </div>
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-green-500">
            <div className="text-sm text-gray-600 mb-1">Approved: {getStatusCount("approved")}</div>
            <div className="text-2xl font-bold text-green-600"></div>
          </div>
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-red-500">
            <div className="text-sm text-gray-600 mb-1">Rejected: {getStatusCount("rejected")}</div>
            <div className="text-2xl font-bold text-red-600"></div>
          </div>
        </div>

       
        {/* Applications List */}
        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
              <p className="text-lg">No applications found for this filter.</p>
            </div>
          ) : (
            applications.map((application) => (
              <div 
                key={application.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {application.Job.title}
                          </h3>
                          <div className="flex items-center gap-2 text-indigo-600 font-medium mb-3">
                            
                            <span>{application.Job.company}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1.5">
                              
                              <span>{application.Job.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-green-600 font-semibold">
                              
                              <span>{application.Job.salary}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              
                              <span>Applied: {application.appliedAt}</span>
                            </div>
                          </div>

                          <div className="lg:hidden mt-3">
                            {getStatusBadge(application.status)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex flex-col items-start lg:items-end gap-3 lg:min-w-[200px]">
                      <div className="hidden lg:block">
                        {getStatusBadge(application.status)}
                      </div>
                      
                      <div className="flex gap-2 w-full lg:w-auto">
                        <button
                          onClick={() => navigate(`/singleJob/${application.jobId}`)}
                          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow flex-1 lg:flex-initial justify-center"
                        >
                      
                          View Job
                        </button>
                        {application.status === "pending"? (<button
                          onClick={() => handleDelete(application.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow"
                        >
                          delete
                        </button>): null}
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
<button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 transition-colors duration-200 m-2 border border-gray-500 p-2 rounded border-2 hover:border-indigo-600 ml-25">
          <span onClick={() => navigate('/jobSeekerDashboard')} className="font-medium cursor-pointer ">
            Back to Jobs
          </span>
          </button>
      
    
    </div>
    );
}

export default ViewApplied