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
  localStorage.removeItem('lineaGuiaVisible');  // Added lineaGuiaVisible to reset
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
  
  // State for LineaGuia visibility
  const [lineaGuiaVisible, setLineaGuiaVisible] = useState(() => localStorage.getItem('lineaGuiaVisible') === 'true');

  // Toggle LineaGuia visibility
  const toggleLineaGuia = () => {
    setLineaGuiaVisible(prevState => {
      const newValue = !prevState;
      saveToLocalStorage('lineaGuiaVisible', newValue);  // Save visibility state
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
    resetLocalStorage();
  };

  // Increase or decrease font size and save to localStorage
  const increaseFontSize = () => {
    setFontSize(prevSize => {
      const newSize = prevSize + 2;
      saveToLocalStorage('fontSize', newSize);
      return newSize;
    });
  };

  const decreaseFontSize = () => {
    setFontSize(prevSize => {
      const newSize = prevSize - 2;
      saveToLocalStorage('fontSize', newSize);
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
    style.fontFamily = dyslexiaFont ? '"Comic Sans MS", sans-serif' : '';
    style.transition = 'background-color 0.3s ease, color 0.3s ease';
  
    // Toggle dark mode styles by adding/removing a class on the documentElement
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  
  }, [highContrast, dyslexiaFont, grayscale, darkMode, sepia, hueRotate90, hueRotateQuarterTurn, hueRotatePi]);

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
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

// Hook to access the context
export const useAccessibility = () => useContext(AccessibilityContext);

export default AccessProvider;
