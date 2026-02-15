import React from "react";
import { useNavigate } from "react-router-dom";
import { ApiAuthenticatedClient } from "../api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ViewApplication = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const fetchApplications = async () => {
    try {
      const res = await ApiAuthenticatedClient.get(`/readApplication/${id}`);
      setData(res.data.data? res.data.data : []
      );
      console.log(data);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [id]);

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
       await ApiAuthenticatedClient.patch(
        `/updateApplication/${applicationId}`,
        { status: newStatus }
      );
      fetchApplications();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

   const getStatusCount = (status) => {
    return data? data.filter(a => a.status === status).length: null;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Application Management
          </h1>
          
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-blue-500">
            <div className="text-sm text-gray-600 mb-1">Total Applications: {data ? data.length: null}</div>
            <div className="text-2xl font-bold text-gray-900"></div>
          </div>
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-yellow-500">
            <div className="text-sm text-gray-600 mb-1">Pending: {getStatusCount("pending")}</div>
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

        {/* applications List */}

        <div className="bg-white rounded-lg shadow">
          <div className="divide-y divide-gray-200">
            <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex flex-col  gap-4">
                {/* application Info */}
                {data.length === 0 ? (<p>No Applications Found</p>): (data.map((application) => {
                  return (
                    <div
                      key={application.id}
                      className="p-6 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex flex-col  gap-4">
                        {/* application Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {application.User.name}
                              </h3>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1.5">
                                  <span>Email: {application.User.email}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span>{application.phone}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span>Applied: {application.appliedAt}</span>
                                </div>
                              </div>
                            </div>
                            <div className="">
                              {getStatusBadge(application.status)}
                            </div>
                          </div>
                        </div>

                        {/* Status and Actions */}
                        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start lg:items-end gap-3 lg:min-w-[280px]">
                          <div className="flex gap-2 w-full sm:w-auto">
                            <button
                              onClick={() =>
                                updateApplicationStatus(application.id, "approved")
                              }
                              disabled={ application.status === "approved" || application.status === "rejected"}
                              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                application.status === "approved"
                                  ? "bg-green-100 text-green-700 cursor-not-allowed"
                                  : "bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow"
                              }`}
                            >
                              Approve
                            </button>

                            <button
                              onClick={() =>
                                updateApplicationStatus(application.id, "rejected")
                              }
                              disabled={application.status === "rejected" || application.status === "approved"}
                              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                application.status === "rejected"
                                  ? "bg-red-100 text-red-700 cursor-not-allowed"
                                  : "bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow"
                              }`}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }))}
              </div>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 transition-colors duration-200 m-2 border border-gray-500 p-2 rounded border-2 hover:border-indigo-600">
          <span onClick={() => navigate('/jobProviderDashboard')} className="font-medium cursor-pointer">
            Back to Jobs
          </span>
          </button>
      </div>
      
    </div>
  );
};

export default ViewApplication;
