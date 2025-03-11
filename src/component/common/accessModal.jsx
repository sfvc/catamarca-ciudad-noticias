import React, { useEffect, useRef } from 'react';
import { useAccessibility } from './accessProvider';
import AccessMenu from './accessComponents/accessMenu';
import Modal from './modal';
import { gsap } from 'gsap';

const AccessModal = ({ isMenuOpen, toggleMenu, closeMenu }) => {
  const accessibility = useAccessibility();

  if (!accessibility) {
    console.error('Accessibility context is undefined');
    return null; // Or provide a fallback UI
  }

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
  } = accessibility;

  const modalRef = useRef(null);

  useEffect(() => {
    if (isMenuOpen) {
      // Modal opening animation (slide up and fade in)
      gsap.set(modalRef.current, { y: '100%', opacity: 0 });
      gsap.to(modalRef.current, {
        y: '0%',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    } 
  }, [isMenuOpen]); // Ensure this runs when `isMenuOpen` changes

  const closeModal = () => {
    // Animate the modal closing first
    gsap.to(modalRef.current, {
      y: '100%',  // Move the modal down to hide it
      opacity: 0, // Fade out
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        closeMenu(); // Call closeMenu after the animation completes
      },
    });
  };
  
  useEffect(() => {
    if (dyslexiaFont) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
  }, [dyslexiaFont]);

  return (
    <div className="displaymobilenone">
      <Modal clase={"modal-deskopt"} isOpen={isMenuOpen} onClose={closeModal}>
        <AccessMenu
          modalRef={modalRef}  // Pass modalRef to AccessMenu
          closeModal={closeModal} // Pass closeModal here
          showHeader={isMenuOpen}
          clase={"access-menu-deskopt"}
          ul={"access-menu-deskopt__ul"}
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

export default AccessModal;
