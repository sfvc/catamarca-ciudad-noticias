import React, { useState, useEffect } from 'react';
import { useAccessibility } from './accessProvider';
import AccessMenu from './accessComponents/accessMenu';
import AccessButton from './accessComponents/accessButton';
import Modal from './modal';

const AccessBtn = () => {
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetSettings,
    highContrast,
    toggleHighContrast,
    dyslexiaFont,
    toggleDyslexiaFont,
    grayscale,
    toggleGrayscale,
    darkMode,
    toggleDarkMode,
    sepia,
    toggleSepia,
    hueRotate90,
    toggleHueRotate90,
    hueRotateQuarterTurn,
    toggleHueRotateQuarterTurn,
    hueRotatePi,
    toggleHueRotatePi,
    lineaGuiaVisible,
    toggleLineaGuia,
  } = useAccessibility();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log("Toggling menu. Current state:", isMenuOpen);
    setIsMenuOpen(prevState => !prevState);
  };

  useEffect(() => {
    if (dyslexiaFont) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
  }, [dyslexiaFont]);

  return (
    <div className='displaymobilenone bgtest'>
      <AccessButton toggleMenu={toggleMenu} />
      <Modal isOpen={isMenuOpen} onClose={toggleMenu}>
        <AccessMenu
          showHeader={isMenuOpen}
          clase={'access-menu-deskopt'}
          ul={'access-menu-deskopt__ul'}
          toggleMenu={toggleMenu}
          handleIncreaseFontSize={increaseFontSize}
          handleDecreaseFontSize={decreaseFontSize}
          handleResetValues={resetSettings}
          handleToggleHighContrast={toggleHighContrast}
          handleToggleDyslexiaFont={toggleDyslexiaFont}
          handleToggleGrayscale={toggleGrayscale}
          handleToggleDarkMode={toggleDarkMode}
          handleToggleSepia={toggleSepia}
          handleToggleHueRotate90={toggleHueRotate90}
          handleToggleHueRotateQuarterTurn={toggleHueRotateQuarterTurn}
          handleToggleHueRotatePi={toggleHueRotatePi}
          handleToggleLineaGuia={toggleLineaGuia}
          highContrast={highContrast}
          dyslexiaFont={dyslexiaFont}
          grayscale={grayscale}
          darkMode={darkMode}
          sepia={sepia}
          hueRotate90={hueRotate90}
          hueRotateQuarterTurn={hueRotateQuarterTurn}
          hueRotatePi={hueRotatePi}
          lineaGuiaVisible={lineaGuiaVisible}
        />
      </Modal>
    </div>
  );
};

export default AccessBtn;