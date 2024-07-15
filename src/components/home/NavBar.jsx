import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

import navbarList from "../../tools/NavbarList";

function NavBar({ filterName, setfilterName, setshowNavbar, showNavbar }) {
  const userName = JSON.parse(localStorage.getItem("userName"));
  return (
    <div
      className={`filters  z-50 h-[520px] bg-[#18181c] w-[250px] py-[20px]
     px-[22px] rounded-[20px] absolute md:relative top-0 left-0 duration-100 
     ${!showNavbar ? "translate-x-[-100%] md:translate-x-0" : "translate-x-0"} 
     `}
    >
      <div className="flex justify-between items-center text-white mb-[20px]">
        <h3 className="text-[#898ACC]  text-[25px]">filters</h3>
        <RxCross2
          className="cursor-pointer text-[25px] hover:rotate-90 duration-150 block md:hidden"
          onClick={() => setshowNavbar(false)}
        />
      </div>

      <ul className="flex flex-col  gap-1 text-[#7E7E7E]">
        {navbarList.map((item, index) => {
          return (
            <li
              key={index}
              className={`${
                filterName.value === item.value ? "active" : ""
              } flex items-center gap-2`}
              onClick={() => setfilterName(item)}
            >
              {item.name === "today" ? item.name : item.value}
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-2 absolute bottom-0 left-0 p-3">
        <div className="icon_user rounded p-[5xp]">
          <CiUser />
        </div>
        <h4 className="text-[17px] text-[#898acc]  capitalize ">
          {userName && userName.slice(0, 10)}
        </h4>
      </div>
    </div>
  );
}

export default NavBar;
