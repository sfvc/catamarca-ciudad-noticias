import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import AccessModal from './accessModal';
import { useAccessibility } from './accessProvider';
import LineaGuia from './accessComponents/lineaGuia';
import { BtnLectura } from './btnLectura';

gsap.registerPlugin(ScrollToPlugin);

const ToolBar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track the modal state
  const [isToolbarOpen, setIsToolbarOpen] = useState(true); // Track the toolbar state
  const toolbarRef = useRef(null); // Ref for the toolbar element
  const spiner = useRef(null); // Ref for the spinner (gear icon)

  const { lineaGuiaVisible } = useAccessibility();
  
  // Scroll Animation
  const sideAnimation = (position) => {
    gsap.to(window, {
      scrollTo: { x: position, autoKill: true },
      duration: 1,
      ease: "power2.inOut",
    });
  };

  const sideAnimationEntry = () => sideAnimation(0);
  const sideAnimationOut = () => sideAnimation(100);

  // Close/Open Toolbar
  const cerrarToolbar = () => {
    setIsToolbarOpen((prevState) => {
      const newState = !prevState;
      if (!newState) {
        sideAnimationOut();
      } else {
        sideAnimationEntry();
      }
      return newState;
    });
  };

  // Scroll to top
  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0, autoKill: true },
      duration: 1,
      ease: "power2.inOut",
    });
  };

  // Spin animation for the spinner
  const spinSpiner = () => {
    gsap.to(spiner.current, {
      rotation: "+=360", 
      duration: 1,
      ease: "power2.inOut",
    });
  };

  const closeModal = () => {
    gsap.to(toolbarRef.current, {
      opacity: 0,
      maxHeight: 0,
      x: '100%', 
      ease: 'back.inOut',
      duration: 0.5,
    });
  }

  // GSAP animation for opening/closing the toolbar
  useEffect(() => {
    if (toolbarRef.current) {
      if (isToolbarOpen) {
        gsap.to(toolbarRef.current, {
          opacity: 1,
          maxHeight: '750px',
          x: 0, 
          ease: 'back.inOut',
          duration: 0.5,
        });
      } else {
        gsap.to(toolbarRef.current, {
          opacity: 0,
          maxHeight: 0,
          x: '100%', 
          ease: 'back.inOut',
          duration: 0.5,
        });
      }
    }
  }, [isToolbarOpen]);

  // Define closeMenu function to close the modal
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Toggle Toolbar visibility
  const toggleToolbar = () => {
    if (isToolbarOpen) {
      setIsToolbarOpen(false);
      sideAnimationOut();
    } else {
      setIsToolbarOpen(true);
      sideAnimationEntry();
    }
  };

    const [isReading, setIsReading] = useState(false);
  
    // Function to handle the text-to-speech functionality
  const handleReadAloud = () => {
    const content = document.querySelector('.news').innerText; // Get the text content of the article section

    // If it's already reading, stop it
    if (isReading) {
      speechSynthesis.cancel(); // Stops the current speech
      setIsReading(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(content); // Create a new SpeechSynthesisUtterance
      utterance.lang = 'es-ES'; // Set the language (Spanish in this case)
      utterance.rate = 1; // Speed of the speech (1 is normal speed)
      utterance.pitch = 1; // Pitch of the speech (1 is normal pitch)

      // Speak the content
      speechSynthesis.speak(utterance);
      setIsReading(true); // Set the state to reading
    }
  };

  const isParqueElJumealPage = window.location.href === 'https://catamarca-ciudad-noticias.netlify.app/noticiasmunicipales/parque-el-jumeal/';

  return (
    <>
      <div className="toolbar">
        <div className="toolbar__item" ref={toolbarRef} onClick={sideAnimationOut}>
          {isParqueElJumealPage && (
            <BtnLectura/>
          )}
          <button className="toolbar__btn">
            <svg width="36px" height="36px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Your SVG Icon */}
            </svg>
          </button>

          <button className="toolbar__btn">
              <svg fill="#000000" width="36px" height="36px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
              {/* Your SVG Icon */}
            </svg>
          </button>

          <button className="toolbar__btn" onClick={scrollToTop}>
            <img src="/images/buscarnoticias/arrowup.svg" alt="" width={36} />
          </button>

          {/* Access Button */}
          <button className="toolbar__btn" onClick={() => setIsMenuOpen(true)}>
            <svg width="32px" height="32px" viewBox="0 0 24 24"       id="meteor-icon-kit__regular-universal-access" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.15829 9.43979C7.01102 9.74988 8.43637 10.1115 10.1596 10.2832C10.374 13.8305 9.49844 16.967 8.95552 18.0528C8.70853 18.5468 8.90876 19.1474 9.40274 19.3944C9.89672 19.6414 10.4974 19.4412 10.7444 18.9472C11.1883 18.0594 11.7208 16.3624 12 14.2665C12.2792 16.3624 12.8117 18.0594 13.2556 18.9472C13.5026 19.4412 14.1033 19.6414 14.5973 19.3944C15.0912 19.1474 15.2915 18.5468 15.0445 18.0528C14.5029 16.9696 13.6303 13.846 13.8388 10.3095C15.1479 10.1919 16.5081 9.92476 17.8418 9.43979C18.3608 9.25105 18.6286 8.67729 18.4398 8.15825C18.2511 7.63922 17.6773 7.37146 17.1583 7.5602C13.0514 9.05361 8.53955 8.17758 6.84177 7.5602C6.32274 7.37146 5.74897 7.63922 5.56023 8.15825C5.3715 8.67729 5.63925 9.25105 6.15829 9.43979Z" fill="#02a5cd"></path><path d="M12 8C12.9665 8 13.75 7.2165 13.75 6.25C13.75 5.2835 12.9665 4.5 12 4.5C11.0335 4.5 10.25 5.2835 10.25 6.25C10.25 7.2165 11.0335 8 12 8Z" fill="#02a5cd"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#02a5cd"></path></g>
            </svg>
          </button>

        </div>

        {/* Button to toggle toolbar */}
        <button className="toolbar__btn" onClick={toggleToolbar}>
          <svg
            ref={spiner}
            width="48px"
            height="48px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={spinSpiner} // Trigger spin animation on click
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <circle cx="12" cy="12" r="3" stroke="#1C274C" strokeWidth="1.5"></circle>
              <path
                d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
                stroke="#1C274C"
                strokeWidth="1.5"></path>
            </g>

          </svg>
        </button>

      </div>
      

      {/* Pass closeMenu function to close the modal */}
      <AccessModal isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
      
      <LineaGuia isVisible={lineaGuiaVisible} />
    </>
  );
};

export default ToolBar;



            {/* <button className="btn btn-warning readingbutton" onClick={handleReadAloud}>
            {isReading ? 'P' : 'L'}
          </button> */}