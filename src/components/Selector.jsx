import React, { useState } from "react";
import { IoIosArrowDropup } from "react-icons/io";
function Selector({ setpriority, priority }) {
  const [showMenu, setshowMenu] = useState(false);
  const selectpriority = (prio) => {
    setpriority(prio);
    setshowMenu(false);
  };
  return (
    <div
      id="priority"
      className="relative bg-gray-700 text-gray-200 border-0 rounded-md p-2  focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setshowMenu(!showMenu)}
      >
        <p>{priority}</p>
        <IoIosArrowDropup
          onClick={() => setshowMenu(!showMenu)}
          className={`hover:scale-[1.2] text-[17px] duration-500 ${
            showMenu ? "rotate-180" : ""
          }`}
        />
      </div>
      <ul
        className={`absolute top-[44px] left-0 w-full duration-100 origin-top ${
          showMenu ? "scale-y-1" : "scale-y-0"
        } bg-[#18181c]`}
      >
        <li
          className="text-[14px]"
          onClick={() => selectpriority("priority 1")}
        >
          priority 1
        </li>
        <li
          className="text-[14px]"
          onClick={() => selectpriority("priority 2")}
        >
          priority 2
        </li>
      </ul>
    </div>
  );
}

export default Selector;
