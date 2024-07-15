import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import Url from "../tools/Url";
function Login() {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [clicked, setclicked] = useState(false);
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  //get user info from api
  const fetchData = async () => {
    try {
      const response = await axios.post(`${Url}/user/get/${userName}`, {
        userName: userName,
        password: password,
      });
      if (response.data.status == false) {
        setclicked(false);
        toast.error(response.data.msg, toastOptions);
      } else {
        localStorage.clear();
        localStorage.setItem("userid", JSON.stringify(response.data.user._id));
        localStorage.setItem(
          "userName",
          JSON.stringify(response.data.user.userName)
        );
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDate = async (e) => {
    e.preventDefault();
    setclicked(true);
    if (!password || !userName) {
      toast.error("password and username are required!", toastOptions);
      setclicked(false);
    } else {
      fetchData();
    }
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userid"))) {
      navigate("/");
    }
  }, []);
  return (
    <div className="inter-form bg-[#18181c] relative singin flex flex-col justify-center items-center w-full h-screen">
      <ToastContainer />
      <div className="inner-form flex flex-col justify-center items-center p-[7px] w-[300px]">
        <div className="form_title">login</div>
        <h1 className="logo text-white text-[30px] font-bold mb-3">
          Todo.<span className="text-[#704BEC]">ms</span>
        </h1>
        <form action="">
          <label htmlFor="userName">userName:</label>
          <input
            className="w-[100%] mb-3 my-[5px]"
            id="userName"
            type="text"
            name="userName"
            placeholder="username"
            required
            onChange={(e) => {
              setuserName(e.target.value);
            }}
          />
          <label htmlFor="password">password:</label>
          <input
            className="w-[100%] mb-3 my-[5px]"
            id="password"
            type="password"
            name="password"
            placeholder="password"
            required
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />

          <div>
            {clicked ? (
              <Spinner />
            ) : (
              <input
                type="submit"
                value="save"
                className="save"
                onClick={getDate}
              />
            )}
          </div>
        </form>
        <div className="flex justify-between items-center pt-4">
          <p className="text-[#8784ad] text-[12px]">have not an account?</p>
          <button className="text-[#2853ad] pl-2">
            <Link to="/singin">Sing in</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
