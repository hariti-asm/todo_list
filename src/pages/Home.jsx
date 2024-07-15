import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import Todo from "../components/home/Todo";
import Header from "../components/home/Header";
import AddForm from "../components/home/AddForm";
import NavBar from "../components/home/NavBar";
import { useNavigate } from "react-router-dom";
import { CiMedicalCross } from "react-icons/ci";
import Url from "../tools/Url";
const Home = ({ userInfo }) => {
  const [filterName, setfilterName] = useState({ name: "all", value: "all" });
  const [showForm, setshowForm] = useState(false);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newFetch, setNewFetch] = useState(true);
  const userId = JSON.parse(localStorage.getItem("userid"));
  const userName = JSON.parse(localStorage.getItem("userName"));
  const [showNavbar, setshowNavbar] = useState(false);
  const navigate = useNavigate();
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Url}/todos/get/${userId}`);
      setList(response.data.todoList);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userid"))) {
      fetchData();
    } else {
      navigate("/singin");
    }
  }, [newFetch]);

  return (
    <div className="h-[100vh] w-full bg-[#121215] flex items-center justify-center overflow-hidden ">
      <div className="home w-full md:w-[80%] lg:w-70% py-1 mr-auto ml-auto">
        <Header setshowNavbar={setshowNavbar} setshowForm={setshowForm} />

        <div
          className="todo_body flex items-cnter justify-center 
          overflow-x-hidden
         w-full  mr-auto ml-auto relative gap-[10px]"
        >
          <button
            className="save absolute right-2 bottom-3 z-50 "
            onClick={() => setshowForm(true)}
          >
            <CiMedicalCross />
          </button>
          <NavBar
            setfilterName={setfilterName}
            filterName={filterName}
            setshowNavbar={setshowNavbar}
            showNavbar={showNavbar}
          />
          <AddForm
            userInfo={userInfo}
            setNewFetch={setNewFetch}
            newFetch={newFetch}
            showForm={showForm}
            setshowForm={setshowForm}
            setshowNavbar={setshowNavbar}
          />
          {loading ? (
            <Spinner />
          ) : (
            <Todo
              list={list}
              setNewFetch={setNewFetch}
              newFetch={newFetch}
              setshowForm={setshowForm}
              filterName={filterName}
            />
          )}
        </div>
      </div>
      )
    </div>
  );
};

export default Home;
