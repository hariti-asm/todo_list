import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../components/Spinner";
import "react-toastify/dist/ReactToastify.css";
import Url from "../tools/Url";
function Singin() {
  const [email, setEmail] = useState("");
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
  //send and save data in the database
  const sendData = async (e) => {
    e.preventDefault();
    setclicked(true);
    const isValidEmail = (eml) => {
      // Regular expression for a basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(eml);
    };
    if (!isValidEmail(email)) {
      toast.error("invalid gmail!", toastOptions);
      setclicked(false);
    } else if (userName.length <= 8) {
      toast.error("The username must be more than 8 characters!", toastOptions);
      setclicked(false);
    } else if (password.length <= 8) {
      toast.error("The password must be more than 8 characters!", toastOptions);
      setclicked(false);
    } else {
      const { data } = await axios.post(`${Url}/user/create`, {
        userName: userName,
        gmail: email,
        password: password,
      });
      setclicked(false);
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userid"))) {
      navigate("/");
    }
  }, []);
  return (
    <div className="bg-[#18181c]">
      <ToastContainer />
      <div className="inter-form singin flex flex-col justify-center items-center w-full h-screen">
        <div className="inner-form bg-[#18181c] flex flex-col justify-center items-center gap-2 p-[7px] w-[300px]">
          <div className="form_title">create acount</div>
          <h1 className="logo text-white text-[30px] font-bold mb-3">
            Todo.<span className="text-[#704BEC]">ms</span>
          </h1>
          <form>
            <label htmlFor="gmail">gmail:</label>
            <input
              className="w-[100%]  my-[5px]"
              id="gmail"
              type="email"
              name="gmail"
              placeholder="gmail"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="userName">userName:</label>
            <input
              className="w-[100%]  my-[5px]"
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
              className="w-[100%]  my-[5px]"
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
                  className="save mt-3"
                  onClick={sendData}
                />
              )}
            </div>
          </form>

          <div className="flex justify-between items-center pt-4">
            <p className="text-[#8784ad] text-[12px]">you have account?</p>
            <button className="text-[#2853ad] pl-2">
              <Link to="/login">login</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singin;
