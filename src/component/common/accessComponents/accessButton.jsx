import React from 'react';

const AccessButton = ({ toggleMenu }) => {
  return (
    <button
      className="btn btn-login boton__default"
      style={{
        padding: '0px',
        position: 'fixed',  // Change from 'sticky' to 'fixed'
        bottom: '2px',
        right: '2px',
        zIndex: '10', // Ensure the button stays on top of other elements
      }}
      onClick={toggleMenu}
    >
      <img src="/images/universalAccess.svg" alt="" />
    </button>
  );
};

export default AccessButton;
