import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const AccessibilityContext = createContext();

// Utility functions
const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const resetLocalStorage = () => {
  localStorage.removeItem('fontSize');
  localStorage.removeItem('highContrast');
  localStorage.removeItem('dyslexiaFont');
  localStorage.removeItem('grayscale');
  localStorage.removeItem('darkMode');
  localStorage.removeItem('sepia');
  localStorage.removeItem('hueRotate90');
  localStorage.removeItem('hueRotateQuarterTurn');
  localStorage.removeItem('hueRotatePi');
  localStorage.removeItem('lineaGuiaVisible');  // Reset lineaGuiaVisible
  localStorage.removeItem('textToSpeechEnabled');
  localStorage.removeItem('colorFuente');
};

const AccessProvider = ({ children }) => {
  // State initialization with saved values from localStorage
  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    return savedFontSize ? parseInt(savedFontSize) : 16; // Default to 16
  });

  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('highContrast') === 'true');
  const [dyslexiaFont, setDyslexiaFont] = useState(() => localStorage.getItem('dyslexiaFont') === 'true');
  const [grayscale, setGrayscale] = useState(() => localStorage.getItem('grayscale') === 'true');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [sepia, setSepia] = useState(() => localStorage.getItem('sepia') === 'true');
  const [hueRotate90, setHueRotate90] = useState(() => localStorage.getItem('hueRotate90') === 'true');
  const [hueRotateQuarterTurn, setHueRotateQuarterTurn] = useState(() => localStorage.getItem('hueRotateQuarterTurn') === 'true');
  const [hueRotatePi, setHueRotatePi] = useState(() => localStorage.getItem('hueRotatePi') === 'true');  
  const [lineaGuiaVisible, setLineaGuiaVisible] = useState(() => localStorage.getItem('lineaGuiaVisible') === 'true');
  const [highlighted, setHighlighted] = useState(() => localStorage.getItem('highlighted') === 'true');
  const [textToSpeechEnabled, setTextToSpeechEnabled] = useState(() => localStorage.getItem('textToSpeechEnabled') === 'true');
  const [colorFuente, setColorFuente] = useState(() => localStorage.getItem('colorFuente') === 'true');


  const cycleColorFuente = () => {
    const colorOptions = ['yellow', 'red', 'green', 'blue', 'purple'];
    const currentIndex = colorOptions.indexOf(colorFuente);
    const nextIndex = (currentIndex + 1) % colorOptions.length;
    const newColor = colorOptions[nextIndex];
    setColorFuente(newColor);
    saveToLocalStorage('colorFuente', newColor);
  };

  const toggleTextToSpeech = () => {
    setTextToSpeechEnabled(prev => {
      const newValue = !prev;
      saveToLocalStorage('textToSpeechEnabled', newValue); // Save to localStorage
      return newValue;
    });
  };


  const toggleLineaGuia = () => {
    setLineaGuiaVisible(prevState => {
      const newValue = !prevState;
      saveToLocalStorage('lineaGuiaVisible', newValue);  // Save visibility state to localStorage
      return newValue;
    });
  };

  // Simplified toggle function for settings
  const toggleSetting = (setting, setter, key) => {
    setter(prev => {
      const newValue = !prev;
      saveToLocalStorage(key, newValue);
      return newValue;
    });
  };

  // Reset settings to default
  const resetSettings = () => {
    setFontSize(16);
    setHighContrast(false);
    setDyslexiaFont(false);
    setGrayscale(false);
    setDarkMode(false);
    setSepia(false);
    setHueRotate90(false);
    setHueRotateQuarterTurn(false);
    setHueRotatePi(false);
    setLineaGuiaVisible(false);  // Reset LineaGuia visibility
    setTextToSpeechEnabled(false); 
    setColorFuente('');
    resetLocalStorage();  // Reset localStorage for all settings
  };


    // Function to handle text-to-speech on mouse hover
    const handleMouseEnter = (event) => {
      if (textToSpeechEnabled) {
        const text = event.target.innerText || event.target.value;
        if (text) {
          const speech = new SpeechSynthesisUtterance(text);
          speech.lang = 'en-es';  // Set the language, can be changed as needed
          window.speechSynthesis.speak(speech);
        }
      }
    };
  
    // Function to stop speech when mouse leaves
    const handleMouseLeave = () => {
      window.speechSynthesis.cancel();
    };

  // Increase or decrease font size and save to localStorage
  const increaseFontSize = () => {
    setFontSize((prevSize) => {
      const newSize = prevSize + 2;
      saveToLocalStorage('fontSize', newSize);
      
      // Apply the increased font size and other styles to the body tag
      document.body.style.fontSize = `${newSize}px`;
      document.body.style.fontWeight = 'bold';
      
      // Apply the styles to a broader set of elements (headings, links, buttons, etc.)
      const textElements = document.querySelectorAll(
        'h1, h2, h3, h4, a, button, p, small, textarea, q, span, strong, em, label, li, ul, ol, blockquote, div'
      );
      
      textElements.forEach((element) => {
        // Apply styles with !important-like behavior
        element.style.setProperty('font-size', `${newSize}px`, 'important');
        element.style.setProperty('font-weight', 'bold', 'important');
      });
  
      return newSize;
    });
  };


  // Toggle highlighted state
  const toggleHighlighted = () => {
    setHighlighted((prev) => {
      const newState = !prev;
      saveToLocalStorage('highlighted', newState);
      return newState;
    });
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => {
      const newSize = prevSize - 2;
      saveToLocalStorage('fontSize', newSize);
      
      document.body.style.fontSize = `${newSize}px`;
      document.body.style.fontWeight = 'bold';
      
      // Apply the styles to a broader set of elements (headings, links, buttons, etc.)
      const textElements = document.querySelectorAll(
        'h1, h2, h3, h4, a, button, p, small, textarea, q, span, strong, em, label, li, ul, ol, blockquote, div'
      );
      
      textElements.forEach((element) => {
        // Apply styles with !important-like behavior
        element.style.setProperty('font-size', `${newSize}px`, 'important');
        element.style.setProperty('font-weight', 'bold', 'important');
      });
      return newSize;
    });
  };

  // Apply font size globally
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  // Apply styles for accessibility settings
  useEffect(() => {
    let filterStyle = '';
    let style = document.documentElement.style;
  
    // High contrast and grayscale filters
    if (highContrast) filterStyle += 'invert(1) contrast(100%) ';
    if (grayscale) filterStyle += 'grayscale(100%) ';
  
    // Apply sepia filter when required
    if (sepia) filterStyle += 'sepia(1) ';
  
    // Apply hue-rotate filters
    if (hueRotate90) filterStyle += 'hue-rotate(90deg) ';
    if (hueRotateQuarterTurn) filterStyle += 'hue-rotate(-0.25turn) ';
    if (hueRotatePi) filterStyle += 'hue-rotate(3.142rad) ';
  
    // Apply accessibility styles
    style.filter = filterStyle.trim();
    
    // Apply dyslexia font if enabled
    if (dyslexiaFont) {
      document.body.style.fontFamily = '"Open Dyslexic", sans-serif';
    } else {
      document.body.style.fontFamily = '';
    }

    style.transition = 'background-color 0.3s ease, color 0.3s ease';
  
    // Toggle dark mode styles by adding/removing a class on the documentElement
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    
    const linkElements = document.querySelectorAll('a, button');
    if (highlighted) {
      linkElements.forEach((element) => {
        element.classList.add('highlighted');
      });
    } else {
      linkElements.forEach((element) => {
        element.classList.remove('highlighted');
      });
    }

    // Add mouse event listeners for text-to-speech
    const textElements = document.querySelectorAll(
      'h1, h2, h3, h4, p, span, li, button, label, a'
    );
    textElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    textElements.forEach((element) => {
      element.style.color = colorFuente; // Apply the selected color
    });

    return () => {
      textElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
    

  }, [highContrast, dyslexiaFont, grayscale, darkMode, sepia, hueRotate90, hueRotateQuarterTurn, hueRotatePi, highlighted, textToSpeechEnabled, colorFuente]);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        resetSettings,
        highContrast,
        toggleHighContrast: () => toggleSetting(highContrast, setHighContrast, 'highContrast'),
        dyslexiaFont,
        toggleDyslexiaFont: () => toggleSetting(dyslexiaFont, setDyslexiaFont, 'dyslexiaFont'),
        grayscale,
        toggleGrayscale: () => toggleSetting(grayscale, setGrayscale, 'grayscale'),
        darkMode,
        toggleDarkMode: () => toggleSetting(darkMode, setDarkMode, 'darkMode'),
        sepia,
        toggleSepia: () => toggleSetting(sepia, setSepia, 'sepia'),
        hueRotate90,
        toggleHueRotate90: () => toggleSetting(hueRotate90, setHueRotate90, 'hueRotate90'),
        hueRotateQuarterTurn,
        toggleHueRotateQuarterTurn: () => toggleSetting(hueRotateQuarterTurn, setHueRotateQuarterTurn, 'hueRotateQuarterTurn'),
        hueRotatePi,
        toggleHueRotatePi: () => toggleSetting(hueRotatePi, setHueRotatePi, 'hueRotatePi'),
        lineaGuiaVisible,
        toggleLineaGuia,  // Provide function to toggle LineaGuia
        toggleHighlighted,
        highlighted,
        toggleHighlighted,
        toggleTextToSpeech, // Provide function to toggle text-to-speech
        textToSpeechEnabled,
        colorFuente,
        cycleColorFuente,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

// Hook to access the context
export const useAccessibility = () => useContext(AccessibilityContext);

export default AccessProvider;
