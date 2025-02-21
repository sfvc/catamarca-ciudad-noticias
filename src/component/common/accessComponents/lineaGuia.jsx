import React, { useEffect } from "react";

const LineaGuia = ({ isVisible }) => {
  useEffect(() => {
    const updateLineadeguiaPosition = (event) => {
      if (!isVisible) return; // Only track mouse position if the line is visible
      const lineadeguia = document.querySelector('.lineadeguia');
      if (lineadeguia) {
        lineadeguia.style.left = "0px"; 
        lineadeguia.style.top = `${event.clientY}px`;  
      }
    };

    // Add mousemove event listener
    window.addEventListener('mousemove', updateLineadeguiaPosition);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', updateLineadeguiaPosition);
    };
  }, [isVisible]);

  return (
    <span
      className="lineadeguia"
      style={{
        display: isVisible ? "block" : "none", // Show or hide based on the prop
        position: "fixed", 
        width: "100%", 
        height: "3px", 
        backgroundColor: "#00b4dc", 
        zIndex: 15, 
        pointerEvents: "none",
      }}
    />
  );
};

export default LineaGuia;
