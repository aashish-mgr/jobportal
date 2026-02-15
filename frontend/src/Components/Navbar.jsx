import React from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/authSlice";
import { Briefcase } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated,role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");

  }

  const handleNavigate=  () => {
   if(role === "jobseeker") {
    navigate('/jobSeekerDashboard');
   }
   else if(role === "jobprovider") {
    navigate('/jobProviderDashboard');
   }
   else {
    navigate('/');
   }
}

  return (
    <>
      <nav className="bg-white  sticky flex gap-5 justify-between container " >
        <div className="flex flex-row">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center m-2">
                <Briefcase className="text-white" size={24} />
              </div>
        <h1 className="text-2xl font-bold text-gray-900 mt-3">
          JobPortal
        </h1>
        </div>
        <div className="flex gap-5">
          <button
           onClick={handleNavigate}
            className="my-auto cursor-pointer hover:text-blue-800 "
          >
            Home
          </button>
          {!localStorage.getItem('user') ?(
            <>
              <Link
                to={"/login"}
                className="my-auto ursor-pointer hover:text-blue-800 "
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className=" text-white p-2 m-2 rounded cursor-pointer bg-indigo-600 hover:bg-indigo-700 "
              >
                Register
              </Link>
            </>
          ): (<button className="p-2 m-2 cursor-pointer border rounded-2xl text-red-500 border-red-500 hover:shadow-2xl " onClick={handleLogout}>Logout</button>)}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
