import React from "react";
import { RiMenu3Line } from "react-icons/ri";
function Header({ setshowNavbar, setshowForm }) {
  const handleshowNavbar = () => {
    setshowNavbar(true);
    setshowForm(false);
  };
  return (
    <div className="header container">
      <div className="flex justify-between p-[7xp]  items-center">
        <h1 className="logo text-white text-[35px]">
          Todo.<span className="text-[#704BEC]">ms</span>
        </h1>
        <button
          className="text-white text-[35px] cursor-pointer"
          onClick={handleshowNavbar}
        >
          <RiMenu3Line className="block md:hidden" />
        </button>
      </div>
    </div>
  );
}

export default Header;
