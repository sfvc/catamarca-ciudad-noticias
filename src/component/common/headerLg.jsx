import React, { useState, useEffect, useRef } from 'react';
import { dropdowns } from '../../data/header.json'; // Adjust the path as needed

const HeaderLg = () => {
    const [dropdownOpen, setDropdownOpen] = useState({});
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false); // State to control mobile menu visibility
    const dropdownRefs = useRef({});

    // Toggle dropdown visibility
    const toggleDropdown = (menu) => {
        setDropdownOpen((prev) => ({
            ...Object.keys(prev).reduce((acc, key) => {
                if (key !== menu) acc[key] = false; // Close other dropdowns
                return acc;
            }, {}),
            [menu]: !prev[menu], // Toggle the clicked dropdown
        }));
    };

    // Close dropdowns when clicked outside
    const handleClickOutside = (event) => {
        const isOutsideClick = Object.keys(dropdownRefs.current).some((key) => {
            return dropdownRefs.current[key]?.contains(event.target);
        });

        if (!isOutsideClick) {
            setDropdownOpen({}); // Close all dropdowns if clicked outside
        }
    };

    // Toggle mobile menu visibility
    const toggleMobileMenu = () => {
        setMobileMenuVisible((prev) => {
            const newState = !prev;
            // If the mobile menu is open, prevent body scroll by adding 'no-scroll' class
            if (newState) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
            return newState;
        });
    };

    // Close mobile menu when clicking "Cerrar" button
    const closeMobileMenu = () => {
        setMobileMenuVisible(false);
        setDropdownOpen({}); // Close all dropdowns when closing the mobile menu
        document.body.classList.remove('no-scroll'); // Ensure scrolling is re-enabled
    };

    // Close dropdowns on click outside
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar navbar-top navbar-default border-bottom-amarillo header__displaynone">
            <div className="container">
                <div className="navbar-header">
                    <a
                        className="navbar-brand"
                        href="/"
                        id="navbar-brand"
                        aria-label="Argentina.gob.ar Presidencia de la Nación"
                    >
                        <img
                            src="/images/logo-new-2020.png"
                            alt="Argentina.gob.ar"
                            height="50"
                            width="254"
                        />
                    </a>
                </div>


                <div className="header__displaynone">
                    <a className="btn btn-login boton__default" href="https://mail.google.com/mail/?view=cm&fs=1&to=info@catamarcaciudad.gob.ar" target="_blank">Contacto</a>
                    <a className="btn btn-login boton__default" href="/grid/1">Tramites</a>
                    <a className="btn btn-login boton__default" href="https://sfvc.travel/" target="_blank">Turismo</a>
                    
                    {/* Mobile menu dropdowns */}
                    {dropdowns.map(({ name, options }) => (
                        <div className="dropdown" key={name} ref={(el) => (dropdownRefs.current[name] = el)}>
                            <button
                                onClick={() => toggleDropdown(name)}
                                className="btn btn-login boton__default"
                            >
                                {name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' ')}
                            </button>
                            {dropdownOpen[name] && (
                                <ul className="dropdown-menu">
                                    {options.map(({ label, link, external }, index) => (
                                        <li key={index}>
                                            <a
                                                href={link}
                                                rel="noopener noreferrer"
                                                target={external ? "_blank" : "_self"}  // Add target="_blank" if external is true
                                            >
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                    <button className="btn btn-danger m-b-2" onClick={closeMobileMenu}>Cerrar</button>
                                </ul>
                            )}
                        </div>
                    ))}

                </div>

            </div>
        </nav>
    );
};

export default HeaderLg;
