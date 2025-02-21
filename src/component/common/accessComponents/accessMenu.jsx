import React, { useState } from 'react';
import AccessItems from './accessItems';
import { useAccessibility } from '../accessProvider';
import ModalMobile from '../modalMobile';
import LineaGuia from './lineaGuia';
import Modal from '../modal';

const AccessMenu = ({ toggleMenu, clase, ul }) => {
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

  // State to track which hue rotate and sepia is active
  const [activeHueRotate, setActiveHueRotate] = useState(null);


  // Function to cycle through the hue rotate and sepia states
  const handleCycleHueRotate = () => {
    if (activeHueRotate === null) {
      // Apply 'hueRotate90' (first effect)
      setActiveHueRotate('hueRotate90');
      toggleHueRotate90(); // Activate 90deg
    } else if (activeHueRotate === 'hueRotate90') {
      // Move to 'hueRotateQuarterTurn'
      setActiveHueRotate('hueRotateQuarterTurn');
      toggleHueRotateQuarterTurn(); // Activate -0.25turn
      toggleHueRotate90(); // Deactivate the previous one
    } else if (activeHueRotate === 'hueRotateQuarterTurn') {
      // Move to 'hueRotatePi'
      setActiveHueRotate('hueRotatePi');
      toggleHueRotatePi(); // Activate 3.142rad
      toggleHueRotateQuarterTurn(); // Deactivate the previous one
    } else if (activeHueRotate === 'hueRotatePi') {
      // Move to 'grayscale'
      setActiveHueRotate('grayscale');
      toggleGrayscale(); // Activate grayscale
      toggleHueRotatePi(); // Deactivate the previous one
    } else if (activeHueRotate === 'grayscale') {
      // Move to 'sepia'
      setActiveHueRotate('sepia');
      toggleSepia(); // Activate sepia effect
      toggleGrayscale(); // Deactivate the previous one
    } else if (activeHueRotate === 'sepia') {
      // Reset to default (no effect)
      setActiveHueRotate(null);
      toggleSepia(); // Deactivate sepia effect
    }
  };
  
  
  
  const getHueRotateLabel = () => {
    switch (activeHueRotate) {
      case 'hueRotate90':
        return 'Desactivar Hue Rotate 90deg'; // Label when 90deg is active
      case 'hueRotateQuarterTurn':
        return 'Desactivar Hue Rotate -0.25turn'; // Label when -0.25turn is active
      case 'hueRotatePi':
        return 'Desactivar Hue Rotate 3.142rad'; // Label when 3.142rad is active
      case 'grayscale':
        return 'Desactivar Escala de Grises'; // Label when grayscale is active
      case 'sepia':
        return 'Desactivar Sepia'; // Label when sepia is active
      default:
        return 'Restablecer Valores (Default)'; // Label when no effect is active (default state)
    }
  };
  
  
  // Function to cycle through the theme (default, high contrast, dark mode)
  const handleCycleTheme = () => {
    if (!highContrast && !darkMode) {
      toggleHighContrast();  // Activate High Contrast
    } else if (highContrast && !darkMode) {
      toggleDarkMode();  // Activate Dark Mode
    } else {
      toggleHighContrast();  // Deactivate High Contrast
      toggleDarkMode();  // Deactivate Dark Mode
    }
  };

  return (
    <>
      <div className={`${clase}`} id="AccessItems">
        <ul className={`${ul}`}>
          <AccessItems
            titulo={'Agregar tamaño fuente'}
            icon="fa-text-height"
            label="+16px"
            onClick={increaseFontSize}
          />
          <AccessItems
            titulo='Reducir Tamaño fuente'
            icon="fa-text-height"
            label="-16px"
            onClick={decreaseFontSize}
          />
          
          {/* Button for cycling through themes (default, high contrast, dark mode) */}
          <AccessItems
            titulo='Temas'
            icon="fa-paint-brush"
            label={
              !highContrast && !darkMode
                ? 'Activar Contraste Alto'
                : highContrast && !darkMode
                ? 'Activar Modo Oscuro'
                : 'Restablecer Valores de Tema'
            }
            onClick={handleCycleTheme}
          />

          <AccessItems
            titulo='Dislexia'
            icon="fa-font"
            label={dyslexiaFont ? "Desactivar Fuente Dislexia" : "Activar Fuente Dislexia"}
            onClick={toggleDyslexiaFont}
          />

          <AccessItems
            titulo='Daltonismo'
            icon="fa-adjust"
            label={getHueRotateLabel()}
            onClick={handleCycleHueRotate}
          />

        <AccessItems
          titulo='Linea de Guia'
          icon="fa-eye"
          label={lineaGuiaVisible ? 'Desactivar Linea Guia' : 'Activar Linea Guia'}
          onClick={toggleLineaGuia}  // Toggle LineaGuia
        />
        
        <LineaGuia isVisible={lineaGuiaVisible} /> 

          
          <div className='access-btn-reset-div'>
            <button className="access-btn-reset-div__btn" onClick={resetSettings}>Restablecer</button>
          </div>
        </ul>
      </div>
    </>
  );
};

export default AccessMenu;
