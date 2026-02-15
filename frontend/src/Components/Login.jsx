import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
 const dispatch = useDispatch()
 const authState = useSelector(state => state.auth);
 const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Navigate when authentication state changes
  useEffect(() => {
    if(authState.isAuthenticated) {
      if(authState.role === "jobprovider") {
        navigate("/jobProviderDashboard");
      } else {
        navigate("/jobSeekerDashboard");
      }
      console.log("User role:", authState.role);
    }
  }, [authState.isAuthenticated]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      await dispatch(loginUser(data));
  }

  return (
    <div className="flex justify-center align-center flex-col mt-20 gap-5 shadow-lg container w-[30vw] h-[60vh] mx-auto p-5 ">
      <h1 className="text-xl text-center font-bold">Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={data.email}
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
            value={data.password}
            onChange={handleChange}
            className="border border-gray-500 w-full m-2 rounded h-10 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="w-full bg-blue-700 text-white h-10 rounded m-2 cursor-pointer hover:bg-blue-800" type="submit">
          Login
        </button>
        <p className="my-auto">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-700 hover:underline">
            Register here
          </Link>
        </p>
        <p className="m-2">
          <Link to="/forgotPassword" className="text-blue-700 hover:underline">Forgot Password?</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
