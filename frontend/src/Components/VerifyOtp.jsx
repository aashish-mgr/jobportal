import { useState } from 'react';
import { ApiAuthenticatedClient } from '../api';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const [code, setCode] = useState("");
    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {
          const res = await ApiAuthenticatedClient.post('/auth/verifyOtp',{email,otp:code});
          console.log(res.data);
          navigate('/resetPassword', { state: { email } });
        } catch (error) {
          console.error('Error:', error.response?.data || error.message);
          alert(error.response?.data.message);
        }

    }
  return (
    <div className="flex justify-center align-center flex-col mt-20 gap-5 shadow-lg container w-[30vw] h-[60vh] mx-auto p-5 ">
      <h1 className="text-xl text-center font-bold">Enter the code to verify</h1>
      <form >
        
        <div>
          <label htmlFor="code" className="font-bold">
            Code
          </label>
          <input
            type="text"
            name="code"
            id='code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
           
            className="border border-gray-500 w-full m-2 rounded  h-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button onClick={handleSubmit} className="w-full bg-blue-700 text-white h-10 rounded m-2 cursor-pointer hover:bg-blue-800" >
          verify
        </button>
        
       
      </form>
    </div>
  )
}

export default VerifyOtp