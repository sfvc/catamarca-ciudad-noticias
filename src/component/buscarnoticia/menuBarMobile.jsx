import { useRef, useEffect } from "react";

const MenuBarMobile = ({ isOpen, closeModal, handleRowsChange }) => {
  const menuBarMobileRef = useRef(null);

  if (!isOpen) return null; // Only render the modal when isOpen is true

  console.log('MenuBarMobile is open!'); // Check if the modal is being triggered

  const menuItems = [
    {
      label: "Mostrar cada 6 Noticias",
      command: () => {
        handleRowsChange(6);
        closeModal();
      },
    },
    {
      label: "Mostrar cada 12 Noticias",
      command: () => {
        handleRowsChange(12);
        closeModal();
      },
    },
    {
      label: "Mostrar cada 24 Noticias",
      command: () => {
        handleRowsChange(24);
        closeModal();
      },
    },
    {
      label: "Mostrar cada 36 Noticias",
      command: () => {
        handleRowsChange(36);
        closeModal();
      },
    },
  ];

  return (
    <div className="menu-bar-mobile" ref={menuBarMobileRef}>
      <div className="menu-bar-mobile__items">
        {menuItems.map((item, index) => (
          <div
            className="menu-bar-mobile__item"
            key={index}
            onClick={item.command}
          >
            <img
              src="/images/buscarnoticias/mostrarPor.svg"
              className="menu-bar-mobile__item-icon"
              alt="menu-item-icon"
            />
            <span className="menu-bar-mobile__item-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuBarMobile;
