import React, { useState } from "react";
import axios from "axios";
import Selector from "../selector";
import navbarList from "../../tools/NavbarList";
import Url from "../../tools/Url";
function AddForm({ setNewFetch, newFetch, showForm, setshowForm }) {
  const dt = new Date();
  const [content, setContent] = useState("");
  const [date, setdate] = useState(
    `${dt.getFullYear()}/${navbarList[1].value}`
  );
  const [priority, setpriority] = useState("priority 2");

  const handleSaveTodo = () => {
    const userid = JSON.parse(localStorage.getItem("userid"));

    axios
      .post(`${Url}/todos/create`, {
        user_id: userid,
        content: content,
        priority: priority,
        date: date,
      })
      .then(() => {
        setNewFetch(!newFetch);
        setshowForm(false);
        setContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className={` add_form flex origin-center ${
        showForm ? "scale-1 " : "scale-0"
      } duration-200 
       items-center justify-center  absolute top-0 left-0 w-full h-full bg-[#18181c]`}
    >
      <div className="w-[300px] h-[350px] flex flex-col  gap-6">
        <h3 className="w-full text-white text-center capitalize text-[25px] font-normal">
          add new task
        </h3>
        <input
          className="add_input bg-gray-700 text-gray-200 border-0 rounded-md p-2"
          onChange={(e) => setContent(e.target.value)}
          type="text"
          value={content}
          placeholder="add some tasks..."
        />
        <input
          className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
          type="date"
          name="date"
          defaultValue={date}
          onChange={(e) => setdate(e.target.value)}
        />
        <Selector setpriority={setpriority} priority={priority} />

        <div className="flex justify-center items-center gap-3">
          <button className="save" onClick={handleSaveTodo}>
            save
          </button>
          <button className="save" onClick={() => setshowForm(false)}>
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddForm;
