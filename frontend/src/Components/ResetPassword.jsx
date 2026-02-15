import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ApiAuthenticatedClient } from "../api";

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const [password, setPassword] = useState("");
    const [confirmPs, setConfirmPs] = useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
      const res = await ApiAuthenticatedClient.post('/auth/resetPassword',{email, newPassword: password,
        confirmPassword: confirmPs
      });
      alert(res.data.message);
      navigate('/login')
    }
    catch(err){
        console.error('Error:', error.response?.data || error.message);
        alert(error.response?.data.message);
    }
    }
  return (
     <div className="flex justify-center align-center flex-col mt-20 gap-5 shadow-lg container w-[30vw] h-[60vh] mx-auto p-5 ">
      <h1 className="text-xl text-center font-bold">Enter the code to verify</h1>
      <form >
        
        <div>
          <label htmlFor="newPassword" className="font-bold">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id='newPassword'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           
            className="border border-gray-500 w-full m-2 rounded  h-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="font-bold">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id='confirmPassword'
            value={confirmPs}
            onChange={(e) => setConfirmPs(e.target.value)}
           
            className="border border-gray-500 w-full m-2 rounded  h-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button onClick={handleSubmit} className="w-full bg-blue-700 text-white h-10 rounded m-2 cursor-pointer hover:bg-blue-800" >
          submit
        </button>
        
       
      </form>
    </div>
  )
}

export default ResetPassword