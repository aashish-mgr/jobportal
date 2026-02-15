import {useState} from 'react'
import { ApiAuthenticatedClient } from '../api';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const  [email, setEmail] = useState("")
    const handleSubmit= async(e) => {
      e.preventDefault();
      try {
        const res = await ApiAuthenticatedClient.post('/auth/forgotPassword',{email});
        alert(res.data.message);
        navigate('/verifyOtp', { state: { email } });
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        alert(error.response?.data.message);
      }
    }
   

  return (
      <div className="flex justify-center align-center flex-col mt-20 gap-5 shadow-lg container w-[30vw] h-[60vh] mx-auto p-5 ">
      <h1 className="text-xl text-center font-bold">Enter your registered email</h1>
      <form >
        <div>
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           
            className="border border-gray-500 w-full m-2 rounded  h-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        
        <button className="w-full bg-blue-700 text-white h-10 rounded m-2 cursor-pointer hover:bg-blue-800" onClick={handleSubmit}>
          submit
        </button>
        
       
      </form>
    </div>
  )
}

export default ForgotPassword