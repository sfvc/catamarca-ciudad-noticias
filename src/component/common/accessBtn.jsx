import React, { useState, useEffect } from 'react';
import { useAccessibility } from './accessProvider';
import AccessMenu from './accessComponents/accessMenu';
import AccessButton from './accessComponents/accessButton';
import ModalMobile from './modalMobile';
import Modal from './modal';

const AccessBtn = () => {
  const {
    // Accessibility settings
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
    toggleLineaGuia,  // Get the toggle function for LineaGuia
  } = useAccessibility();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuLargeOpen, setIsMenuLargeOpen] = useState(false); // State to track larger screens

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleResize = () => {
    // Check the window width and update the state
    if (window.innerWidth > 1023.98) {
      setIsMenuLargeOpen(true);
    } else {
      setIsMenuLargeOpen(false);
    }
    console.log('Window Width:', window.innerWidth);  // Debugging: Log window width
    console.log('isMenuLargeOpen:', isMenuLargeOpen);  // Debugging: Log the state of large screen modal
  };

  // Add event listener on mount and cleanup on unmount
  useEffect(() => {
    handleResize(); // Initial window size check
    window.addEventListener('resize', handleResize); // Add resize event listener

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuLargeOpen]); // Add isMenuLargeOpen as a dependency for debugging purposes

  useEffect(() => {
    if (dyslexiaFont) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
  }, [dyslexiaFont]);

  return (
    <div>
      <AccessButton toggleMenu={toggleMenu} />
      {isMenuLargeOpen && (
        <Modal isOpen={isMenuOpen} onClose={toggleMenu} className="modal-large">
          <AccessMenu
            clase={'access-menu-large'}
            ul={'access-menu__ul'}
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
      )}

      {!isMenuLargeOpen && isMenuOpen && (
        <ModalMobile isOpen={isMenuOpen} onClose={toggleMenu}>
          <AccessMenu
            clase={'access-menu'}
            ul={'access-menu__ul'}
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
            handleToggleLineaGuia={toggleLineaGuia}  // Pass the toggle handler to AccessMenu
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
          {console.log('Mobile Modal Opened')}
        </ModalMobile>
      )}
    </div>
  );
};

export default AccessBtn;
