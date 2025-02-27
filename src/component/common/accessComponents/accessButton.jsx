import React from 'react';

const AccessButton = ({ toggleMenu }) => {
  return (
    <button
      className='toolbar__btn'
      onClick={toggleMenu}
    >
      <img src="/images/universalAccess.svg" alt="" />
    </button>
  );
};

export default AccessButton;
