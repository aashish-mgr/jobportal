
import {BrowserRouter, Routes, Route} from 'react-router-dom'



import About from './Components/About'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import Register from './Components/Register'

import JobProviderDashboard from './Components/JobProviderDashboard'
import JobCreateForm from './Components/JobCreateForm'
import SingleJob from './Components/SingleJob'
import JobSeekerDashboard from './Components/JobSeekerDashboard'
import EditJob from './Components/EditJob'
import ViewApplication from './Components/ViewApplication'
import ViewApplied from './Components/ViewApplied'
import ForgotPassword from './Components/ForgotPassword'
import VerifyOtp from './Components/VerifyOtp'
import ResetPassword from './Components/ResetPassword'
import LandingPage from './Components/Home'
import UserProfile from './Components/userProfile'

const App = () => {

  
  // Restore session on app initialization
 
  return (
    
      
     
       <BrowserRouter>
       <Navbar/>
    <Routes>
     <Route path="/" element={<LandingPage />} /> 
     <Route path="/about" element={<About/>} /> 
     <Route path='/login' element={<Login />} />
     <Route path='/register' element={<Register />} />
     <Route path='/jobProviderDashboard' element={<JobProviderDashboard />} />
     <Route path='/createJob' element={<JobCreateForm />} />
     <Route path = '/singleJob/:id' element ={<SingleJob/>} />
     <Route path = '/jobSeekerDashboard' element ={<JobSeekerDashboard />} />
    <Route path = '/editJob/:id' element ={<EditJob />} />
    <Route path = '/viewApplication/:id' element ={<ViewApplication />} />
    <Route path = '/viewApplied' element ={<ViewApplied/>} />
     <Route path = '/forgotPassword' element ={<ForgotPassword />} />
     <Route path = '/verifyOtp' element ={<VerifyOtp />} />
      <Route path = '/resetPassword' element ={<ResetPassword />} />
      <Route path = '/userProfile/:id' element= {<UserProfile/>} />

      </Routes>
    </BrowserRouter>

    
   
  )
}

export default App