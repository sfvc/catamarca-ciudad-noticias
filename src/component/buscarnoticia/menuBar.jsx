import { useRef, useEffect } from "react";

const MenuBar = ({ isOpen, closeModal, handleRowsChange }) => {
  const menuBarRef = useRef(null);

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuBarRef.current && !menuBarRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  

  // Menu items for different posts per page options
  const menuItems = [
    {
      label: "Mostrar cada 6 Noticias",
      command: () => {
        handleRowsChange(6); // Change the posts per page to 6
        closeModal(); // Close the menu after selecting
      },
    },
    {
      label: "Mostrar cada 12 Noticias",
      command: () => {
        handleRowsChange(12); // Change the posts per page to 12
        closeModal();
      },
    },
    {
      label: "Mostrar cada 24 Noticias",
      command: () => {
        handleRowsChange(24); // Change the posts per page to 24
        closeModal();
      },
    },
    {
      label: "Mostrar cada 36 Noticias",
      command: () => {
        handleRowsChange(36); // Change the posts per page to 36
        closeModal();
      },
    },
  ];

  // Return null if the menu is not open
  if (!isOpen) return null;

  return (
    <div className="menu-bar" ref={menuBarRef}>
      <div className="menu-bar__items">
        {menuItems.map((item, index) => (
          <div
            className="menu-bar__item"
            key={index}
            onClick={item.command} // Execute the corresponding command on click
          >
            <img
              src="/images/buscarnoticias/mostrarPor.svg"
              className="menu-bar__item-icon"
              alt="menu-item-icon"
            />
            <span className="menu-bar__item-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuBar;
