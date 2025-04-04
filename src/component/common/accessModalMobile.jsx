import React, { useState, useEffect } from 'react';
import { useAccessibility } from './accessProvider';
import AccessMenu from './accessComponents/accessMenu';
import AccessButton from './accessComponents/accessButton';
import ModalMobile from './modalMobile';

const AccessBtnMobile = ({isMenuMobileOpen, closeMenuMobile}) => {
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

  const [isMenuOpenMobile, setIsMenuOpenMobile] = useState(false);

  const toggleMenu = () => setIsMenuOpenMobile(!isMenuOpenMobile);

  useEffect(() => {
    if (dyslexiaFont) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
  }, [dyslexiaFont]);

  return (
    <div className='displaymobile'>
      {isMenuMobileOpen && (
        <ModalMobile isOpen={isMenuMobileOpen} onClose={closeMenuMobile}>
          <AccessMenu
            clase={'access-menu__mobile'}
            ul={'access-menu__ul__mobile'}
            toggleMenu={toggleMenu}
            closeModal={closeMenuMobile} // Pass closeMenuMobile as closeModal
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

export default AccessBtnMobile;
