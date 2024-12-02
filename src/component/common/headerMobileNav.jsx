import { useState } from 'react';
import { navMobile } from '../../data/navbarMobile.json';

// HeaderMobileNav Component
const HeaderMobileNav = () => {
    const [selectedId, setSelectedId] = useState(null); // Track selected ID

    // Function to render modals based on the selected ID
    const renderModal = () => {
        if (selectedId === 2) {
            return <SecondModalMobile setSelectedId={setSelectedId} />;
        } else if (selectedId === 3) {
            return <ThirdModalMobile setSelectedId={setSelectedId} />;
        }
        return <FirstModalMobile setSelectedId={setSelectedId} />;
    };

    return (
        <div className="header-mobile-nav__content">
            {renderModal()}
        </div>
    );
};

// First Modal Component
const FirstModalMobile = ({ setSelectedId }) => {
    // Render navigation items from navDefault
    const renderNavItems = (navItems) => {
        return navItems.map((item, index) => (
            <li className="header-mobile-nav__item" key={index}>
                <a
                    className="header-mobile-nav__link"
                    target={item.external ? "_blank" : null}
                    href={item.link}
                    onClick={() => {
                        if (item.id) {
                            setSelectedId(item.id); // Open modal with id
                        }
                    }}
                >
                    <small>{item.titulo}</small>
                    {item.icon && <img src={item.icon} alt="" width={16} />}
                </a>
            </li>
        ));
    };

    return (
        <ul className="header-mobile-nav__list">
            {renderNavItems(navMobile.navDefault[0].items)}
        </ul>
    );
};

// Second Modal Component
const SecondModalMobile = ({ setSelectedId }) => {
    const handleVolverClick = () => {
        setSelectedId(null); // Go back to the first modal
    };

    return (
        <div className="header-mobile-nav__content">
            <ul className="header-mobile-nav__list">
                {navMobile.navSecond.map((item, index) => (
                    <li className="header-mobile-nav__item" key={index}>
                        <a
                            className="header-mobile-nav__link"
                            href={item.link}
                            onClick={item.volver ? handleVolverClick : null} // Handle "Volver"
                        >
                            <small>{item.titulo}</small>
                            {item.icon && <img src={item.icon} alt="" width={16} />}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Third Modal Component
const ThirdModalMobile = ({ setSelectedId }) => {
    const handleVolverClick = () => {
        setSelectedId(null); // Go back to the first modal
    };

    return (
        <div className="header-mobile-nav__content">
            <ul className="header-mobile-nav__list">
                {navMobile.navThird.map((item, index) => (
                    <li className="header-mobile-nav__item" key={index}>
                        <a
                            className="header-mobile-nav__link"
                            href={item.link}
                            onClick={item.volver ? handleVolverClick : null} // Handle "Volver"
                        >
                            <small>{item.titulo}</small>
                            {item.icon && <img src={item.icon} alt="" width={16} />}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HeaderMobileNav;
