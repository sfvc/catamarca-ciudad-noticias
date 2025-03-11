import React, { useEffect } from "react";

const LineaGuia = ({ isVisible }) => {
  useEffect(() => {
    if (isVisible) {
      console.log("Linea guia working"); // Log when LineaGuia is visible
    }
  }, [isVisible]); // This will run whenever isVisible changes

  useEffect(() => {
    const updateLineadeguiaPosition = (event) => {
      if (!isVisible) return; // Only track mouse position if the line is visible

      const lineadeguia = document.querySelector('.lineadeguia');
      if (lineadeguia) {
        // For horizontal line (across the screen width)
        lineadeguia.style.left = "0px"; // Position it horizontally across the screen
        lineadeguia.style.top = `${event.clientY}px`;  // Vertical position (following mouse)

        // Optional: for a vertical line (for example, for horizontal mouse tracking)
        // Create a separate line for vertical tracking if needed
        const verticalLine = document.querySelector('.verticalLine');
        if (verticalLine) {
          verticalLine.style.left = `${event.clientX}px`; // Horizontal position (following mouse)
          verticalLine.style.top = "0px"; // Position it from top to bottom
        }
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
    <>
      {/* Horizontal Line */}
      <span
        className="lineadeguia"
        style={{
          display: isVisible ? "block" : "none", // Show or hide based on the prop
          position: "fixed", 
          width: "100%", 
          height: "2px", 
          backgroundColor: "#00b4dc", 
          zIndex: 15, 
          pointerEvents: "none",
        }}
      />
      
      {/* Vertical Line (if needed) */}
      <span
        className="verticalLine"
        style={{
          display: isVisible ? "block" : "none", // Show or hide based on the prop
          position: "fixed", 
          width: "2px", // Vertical line width
          height: "100%", // Fill the height of the screen
          backgroundColor: "#00b4dc", 
          zIndex: 15, 
          pointerEvents: "none",
        }}
      />
    </>
  );
};

export default LineaGuia;
