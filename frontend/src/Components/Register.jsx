import {use, useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
 const [userData, setUserData] = useState({
  name: "",
  email: "",
  password: "",
  role: ""
 })
  const dispatch = useDispatch();
  

  const {status,error} = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const {name,value} = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const result = dispatch(registerUser(userData));
    console.log(result);
    navigate('/login');

  }
  return (
    <div className="flex justify-center align-center flex-col mt-20 gap-5 shadow-lg container w-[30vw] h-[60vh] mx-auto p-5 " >
      <h1 className="text-xl text-center font-bold">Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="font-bold">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={userData.name}
            required
            onChange={handleChange}
            className="border border-gray-500 w-full m-2 rounded  h-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={userData.email}
            onChange={handleChange}
            className="border border-gray-500 w-full m-2 rounded  h-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="font-bold">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            value={userData.password}
            onChange={handleChange}
            className="border border-gray-500 w-full m-2 rounded  h-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div  className="flex flex-row gap-2 justify-between w-full m-2 rounded h-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <label htmlFor="role" className="font-bold">
            Chooose your role
          </label>
          <input
            type="radio"
            name="role"
            id="jobseeker"
            required
            value="jobseeker"
            onChange={handleChange}
            
          />
          <label htmlFor="jobseeker">jobseeker</label>
          <input
            type="radio"
            name="role"
            id="jobprovider"
            required
            value="jobprovider"
            onChange={handleChange}
           
          />
          <label htmlFor="jobprovider">jobprovider</label>
        </div>
        

        <button className="w-full bg-blue-700 text-white h-10 rounded m-2 cursor-pointer hover:bg-blue-800" type="submit">
          Register
        </button>
        <p className="my-auto">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
