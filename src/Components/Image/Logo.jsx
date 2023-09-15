import React from "react";

const Logo = ({ source, className }) => {
  return (
    <div>
      <div>
        <img className={className} src={source} alt="img" />
      </div>
    </div>
  );
};

export default Logo;
