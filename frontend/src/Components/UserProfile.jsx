import React, { useState,useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { ApiAuthenticatedClient } from '../api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Award, FileText, Edit, Save, X, Linkedin, Github, Globe, GraduationCap,Trash2 } from 'lucide-react';

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const fetchUser = async () => {
    const res = await ApiAuthenticatedClient.get(`/profile/getUserById/${id}`);
    console.log(res.data.user);
    setProfile(res.data.user);
    
  }
  useEffect(() => {
    fetchUser();
    console.log(profile)
  }, [id])
  

  const handleEdit = () => {
    setIsEditing(true);
    
  };

  const handleSave =async (e) => {
    setIsEditing(false);
    e.preventDefault();
    const res = await ApiAuthenticatedClient.patch(`/profile/updateUser/${id}`,profile);
    console.log(profile);
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleBack= (role) => {

    if(role === "jobseeker") {
      navigate('/jobSeekerDashboard');
    }
    else if(role === "jobprovider"){
      navigate('/jobProviderDashboard');
    }
    console.log('back')
  }

  const handleDeleteButton = () => {
    setShowDeleteModal(true);
  }

  const cancelDelete = () => {
    setShowDeleteModal(false);
  }

  const confirmDelete =async (id) => {
    const res =  await ApiAuthenticatedClient.delete(`/profile/deleteUser/${id}`);
    alert(res.data.message);
   dispatch(logoutUser());
  navigate("/");
  setShowDeleteModal(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <div className='flex gap-2'>
          <button
              onClick={() => handleBack(profile.role)}
              className="  bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md"
            >
              Back
            </button>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md"
            >
              <Edit size={18} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors"
              >
                <X size={18} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-md"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          )}
          </div>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <User size={64} className="text-gray-400" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700">
                    <Edit size={16} />
                  </button>
                )}
              </div>

              {/* Name and Title */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2 mb-4">
                    <input
                      type="text"
                      value={profile.name}
                      name = "name"
                      onChange={handleChange}
                      className="text-2xl font-bold w-full border-b-2 border-indigo-600 focus:outline-none"
                    />
                   
                  </div>
                ) : (
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                    
                  </div>
                )}

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Mail size={16} className="text-gray-400" />
                    {isEditing ? (
                      <input
                        type="email"
                        name= "email"
                        value={profile.email}
                        onChange={handleChange}
                        className="border-b border-gray-300 focus:outline-none focus:border-indigo-600"
                      />
                    ) : (
                      <span>{profile.email}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone size={16} className="text-gray-400" />
                    {isEditing ? (
                      <input
                        type="tel"
                        name='phoneNum'
                        value={profile.phoneNum}
                        onChange={handleChange}
                        className="border-b border-gray-300 focus:outline-none focus:border-indigo-600"
                      />
                    ) : (
                      <span>{profile.phoneNum}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} className="text-gray-400" />
                    {isEditing ? (
                      <input
                        type="text"
                        name='location'
                        value={profile.location}
                        onChange={handleChange}
                        className="border-b border-gray-300 focus:outline-none focus:border-indigo-600"
                      />
                    ) : (
                      <span>{profile.location}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User size={20} className="text-indigo-600" />
            About Me
          </h3>
          {isEditing ? (
            <textarea
              value={profile.userDescription}
              name='userDescription'
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{profile.userDescription}</p>
          )}
        </div>

        {/* Links Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Globe size={20} className="text-indigo-600" />
            Links
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                <Globe size={14} /> Portfolio
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={profile.portfolio}
                  onChange={(e) => setProfile({...profile, portfolio: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              ) : (
                <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm">
                  {profile.portfolio}
                </a>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                <Linkedin size={14} /> LinkedIn
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={profile.linkedin}
                  onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              ) : (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm">
                  {profile.linkedin}
                </a>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                <Github size={14} /> GitHub
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={profile.github}
                  onChange={(e) => setProfile({...profile, github: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              ) : (
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm">
                  {profile.github}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* delete accoutt */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Trash2 size={24} className="text-red-600" />
            Delete my Account
          </h3>
           <button
                  onClick={() => {
                    handleDeleteButton()
                  }}
                   className="flex items-center justify-center w-full gap-2 m-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm">
                    Delete
                  </button>
        </div>


        {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete User Account</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete your account
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(profile.id)}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
       
    </div>
  );
}