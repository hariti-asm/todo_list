import React from "react";

const Spinner = () => {
  return (
    <div className="container todo grid place-content-center">
      <svg className="loader_svg" viewBox="25 25 50 50">
        <circle className="loader_circle" r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};

export default Spinner;
