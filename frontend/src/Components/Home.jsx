import React, { useState } from 'react';

import { Briefcase, Users, Building2, Search, CheckCircle, TrendingUp, Award, Clock, ArrowRight, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login')
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-white">
     

      {/* Hero Section */}
      <section className="bg-linear-to-br from-indigo-50 via-blue-50 to-purple-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Find Your Dream Job Today
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with top employers and discover opportunities that match your skills. 
                Whether you're a job seeker or hiring, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRegister}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={handleLogin}
                  className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors border-2 border-gray-200 flex items-center justify-center gap-2"
                >
                  Sign In
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-12">
                <div>
                  <div className="text-3xl font-bold text-indigo-600">10K+</div>
                  <div className="text-sm text-gray-600">Active Jobs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600">5K+</div>
                  <div className="text-sm text-gray-600">Companies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600">50K+</div>
                  <div className="text-sm text-gray-600">Job Seekers</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="hidden md:block">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg">
                    <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <Briefcase className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Building2 className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Users className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose JobPortal?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide the tools and features you need to succeed in your job search or hiring process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-linear-to-br from-indigo-50 to-blue-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Search className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Job Search</h3>
              <p className="text-gray-600">
                Advanced filters and AI-powered recommendations to find the perfect job match for your skills and preferences.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-linear-to-br from-blue-50 to-purple-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy Application</h3>
              <p className="text-gray-600">
                Apply to multiple jobs with one click. Track all your applications in one convenient dashboard.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-linear-to-br from-purple-50 to-pink-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Top Companies</h3>
              <p className="text-gray-600">
                Access opportunities from leading companies across various industries and locations worldwide.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-linear-to-br from-green-50 to-teal-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Jobs</h3>
              <p className="text-gray-600">
                All job postings are verified to ensure authenticity and protect you from scams and fraudulent listings.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-linear-to-br from-orange-50 to-red-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Clock className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-Time Updates</h3>
              <p className="text-gray-600">
                Get instant notifications about application status, new job matches, and messages from employers.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-linear-to-br from-yellow-50 to-orange-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <Award className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Career Resources</h3>
              <p className="text-gray-600">
                Access resume tips, interview guides, and career advice to boost your chances of landing your dream job.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and build your professional profile with your resume, skills, and preferences in minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Search & Apply</h3>
              <p className="text-gray-600">
                Browse thousands of jobs, filter by your preferences, and apply to positions that match your goals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Hired</h3>
              <p className="text-gray-600">
                Track your applications, communicate with employers, and land your dream job faster than ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About JobPortal
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                JobPortal is a leading online job marketplace connecting talented professionals with 
                forward-thinking companies. We're committed to making the job search and hiring process 
                simpler, faster, and more effective.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our platform leverages cutting-edge technology to match job seekers with opportunities 
                that align with their skills, experience, and career aspirations. For employers, we 
                provide powerful tools to find, evaluate, and hire the best candidates.
              </p>
              <div className="flex items-center gap-4">
                <TrendingUp className="text-indigo-600" size={48} />
                <div>
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
            <div className="bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
              <p className="text-lg mb-6 opacity-90">
                To empower individuals to achieve their career goals and help businesses build 
                exceptional teams through innovative technology and personalized service.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle size={24} />
                  <span>Transparent and trustworthy platform</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={24} />
                  <span>Advanced matching algorithms</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={24} />
                  <span>Dedicated customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of professionals who have found their dream jobs through JobPortal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRegister}
              className="bg-white hover:bg-gray-100 text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Create Free Account
              <ArrowRight size={20} />
            </button>
            <button
              onClick={handleLogin}
              className="bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors border-2 border-white"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>


    
    </div>
  );
}