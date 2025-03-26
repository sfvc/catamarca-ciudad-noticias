import { useState} from 'react';
import AccessItems from './accessItems';
import { useAccessibility } from '../accessProvider';
import ModalMobile from '../modalMobile';
import LineaGuia from './lineaGuia';
import Modal from '../modal';
import { gsap } from 'gsap';

const AccessMenu = ({ toggleMenu, clase, ul, showHeader, closeModal, modalRef }) => {
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
    highlighted,
    toggleHighlighted,
    toggleTextToSpeech,
    textToSpeechEnabled,
    colorFuente,
    cycleColorFuente
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

  const handleItemClick = (e) => {
    // Prevent the event from propagating and closing the modal
    e.stopPropagation();
  };

  return (
    <>
      <div className={`${clase}`} id="AccessItems" ref={modalRef} onClick={handleItemClick}>
          {showHeader && (
            <div className="border-bottom-amarillo">
              <div className='container'>
                <button className="adaptabilidad-header__cerrar">
                  <span onClick={closeModal}></span>
                </button>
                <header className="adaptabilidad-header">
                  <h5>Configuracion de adaptabilidad</h5>
                  <img src="./images/logo-new-2020.png" alt="" width={124} />
                </header>
              </div>
            </div>
          )}
          <div className="container">
            <ul className={`${ul}`}>
              <AccessItems
                itemDesk={'accessItemDesk'}
                itemMobile={'accessItem'}
                img={'./images/adaptabilidad/textHeight.svg'}
                titulo={'Agregar tamaño fuente'}
                icon="fa-text-height"
                label="+16px"
                onClick={increaseFontSize}
              />
              <AccessItems
                itemDesk={'accessItemDesk'}
                itemMobile={'accessItem'}
                img={'./images/adaptabilidad/textHeight.svg'}
                titulo='Reducir Tamaño fuente'
                icon="fa-text-height"
                label="-16px"
                onClick={decreaseFontSize}
              />
              
              {/* Button for cycling through themes (default, high contrast, dark mode) */}
              <AccessItems
                itemDesk={'accessItemDesk'}
                itemMobile={'accessItem'}
                img={'./images/adaptabilidad/temas.svg'}
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
                itemDesk={'accessItemDesk'}
                itemMobile={'accessItem'}
                img={'./images/adaptabilidad/dislesxia.svg'}
                titulo='Dislexia'
                icon="fa-font"
                label={dyslexiaFont ? "Desactivar Fuente Dislexia" : "Activar Fuente Dislexia"}
                onClick={toggleDyslexiaFont}
              />

              <AccessItems
                itemDesk={'accessItemDesk'}
                itemMobile={'accessItem'}
                img={'./images/adaptabilidad/daltonismo.svg'}
                titulo='Daltonismo'
                icon="fa-adjust"
                label={getHueRotateLabel()}
                onClick={handleCycleHueRotate}
              />
              <AccessItems
              itemDesk={'accessItemDesk'}
              itemMobile={'accessItem'}
              img={'./images/adaptabilidad/lineaGuia.svg'}
              titulo='Linea de Guia'
              icon="fa-eye"
              label={lineaGuiaVisible ? 'Desactivar Linea Guia' : 'Activar Linea Guia'}
              onClick={toggleLineaGuia}  // Toggle LineaGuia
            />

            <AccessItems
              itemDesk={'accessItemDesk'}
              itemMobile={'accessItem'}
              img={'./images/adaptabilidad/highlighted.svg'}
              titulo='Destacar Enlaces y Botones'
              icon="fa-highlighter"
              label={highlighted ? 'Desactivar Destacar Links' : 'Activar Destacar Links'}
              onClick={toggleHighlighted} // Toggle highlighted state
            />

              <AccessItems
                itemDesk={'accessItemDesk'}
                itemMobile={'accessItem'}
                img={'./images/adaptabilidad/textoVoz.svg'}
                titulo='Texto a Voz'
                icon="fa-adjust"
                label={textToSpeechEnabled ? 'Desactivar Texto a Voz' : 'Activar Texto a Voz'}
                onClick={toggleTextToSpeech}
              />

              <AccessItems
                itemDesk={'accessItemDesk'}
                itemMobile={'accessItem'}
                img={'./images/adaptabilidad/textoVoz.svg'}
                titulo='Color Fuente'
                icon="fa-adjust"
                label={colorFuente ? 'Cambiar color' : 'desactivar'}
                onClick={cycleColorFuente}
              />
            
            </ul>
          </div>
            <div className='access-btn-reset-div__deskopt container'>
              <button className="access-btn-reset-div__btn" onClick={resetSettings}>Restablecer</button>
            </div>
        </div>
    </>
  );
};

export default AccessMenu;