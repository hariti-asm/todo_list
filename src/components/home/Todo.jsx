import React, { useState, useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import Url from "../../tools/Url";
function Todo({ list, newFetch, setNewFetch, filterName }) {
  const [filtredTodos, setfiltredTodos] = useState([]);
  const handleDeleteTodo = (id) => {
    axios
      .delete(`${Url}/todos/delete/${id}`)
      .then(() => {
        setNewFetch(!newFetch);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEditTodo = (id) => {
    axios
      .put(`${Url}/todos/update/${id}`)
      .then(() => {
        setNewFetch(!newFetch);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (filterName.name === "all") {
      setfiltredTodos(list);
    } else if (filterName.name === "today") {
      const newlist = list.filter((lst) => {
        return lst.date.slice(5, 10).replace("-", "/") === filterName.value;
      });
      setfiltredTodos(newlist);
    } else {
      const newlist = list.filter(
        (lst) => lst[`${filterName.name}`] === filterName.value
      );
      setfiltredTodos(newlist);
    }
  }, [filterName, list]);

  return (
    <div className="bg-[#18181c] todo h-[520px] py-[20px] px-[22px] relative overflow-y-scroll">
      <h3 className="text-[#898ACC] mb-[20px] text-[25px]">Tasks</h3>
      {filtredTodos.length === 0 ? (
        <h3 className="text-[#7e7e7e] text-[30px] capitalize font-normal w-full text-center mt-[80px]">
          no items to show...
        </h3>
      ) : (
        filtredTodos.map((item) => {
          return (
            <div className="item items-center " key={item._id}>
              <div
                className="content flex items-center w-full lg:w-[350px] cursor-pointer"
                onClick={() => handleEditTodo(item._id)}
              >
                <span
                  className={`comp_icon ${
                    item.priority === "priority 1" ? "brd_red" : "brd_green"
                  }`}
                >
                  <BsCheck
                    className={`${
                      item.status === "complete" ? "" : "hidden"
                    } text-[20px]`}
                  />
                </span>
                <p
                  className={`text_content text-[12px] sm:text-[15px] ${
                    item.status === "complete"
                      ? "line-through text-[#7E7E7E]"
                      : "text-white"
                  }`}
                >
                  {item.content}
                </p>
              </div>

              <div className="status bg-[#704bec] text-white rounded-[5px] py-1 px-3 hidden lg:block text-[10px] md:text-[12px]">
                {item.status}
              </div>
              <div
                className="time bg-[#898acc] text-white rounded-[5px] py-1 px-3 text-[10px] md:text-[12px]
               items-center hidden lg:flex"
              >
                {String(item.date).slice(5, 10).replace("-", "/")}
              </div>
              <div
                className="controlls text-[20px]"
                onClick={() => handleDeleteTodo(item._id)}
              >
                <RiDeleteBin5Line className="fill-[#704bec] hover:fill-red" />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Todo;
