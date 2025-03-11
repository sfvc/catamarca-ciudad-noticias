import React, { useState } from "react";
import AccessBtn from "./accessModal";

const Tooltip = ({ children, text, clase }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div
        className={`tooltip-container ${clase}`}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
        {isVisible && <div className="tooltip">{text}</div>}
      </div>
    </>

  );
};

export default Tooltip;
