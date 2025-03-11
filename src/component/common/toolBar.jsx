import React from 'react';
import { gsap } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin'; // Import ScrollToPlugin
import AccessBtnMobile from './accessBtnMobile';
import AccessBtn from './accessBtn';
import LineaGuia from './accessComponents/lineaGuia';
import { useAccessibility } from './accessProvider';

gsap.registerPlugin(ScrollToPlugin); // Register the plugin

const ToolBar = () => {
  const { lineaGuiaVisible } = useAccessibility();

  // Function to scroll the page to the top using GSAP ScrollToPlugin
  const scrollToTop = () => {
    gsap.to(window, { 
      scrollTo: { y: 0, autoKill: true }, // Scroll to top
      duration: 1, // Duration of the animation (1 second)
      ease: "power2.inOut" // Ease function for smooth scrolling
    });
  };

  return (
    <div className="toolbar">
      <button className='toolbar__btn' >
        <svg width="36px" height="36px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#000000" strokeWidth="2" strokeLinejoin="round"></path> </g></svg>
      </button>
      <button className='toolbar__btn'>
        <svg fill="#000000" width="36px" height="36px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>pause</title> <path d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.44 0.576t-0.576 1.44v16.16zM18.016 24.096q0 0.832 0.608 1.408t1.408 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.408 0.576t-0.608 1.44v16.16z"></path> </g></svg>
      </button>

      <button className='toolbar__btn'>
        <svg fill="#000000" width="36px" height="36px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>stop</title> <path d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h16.128q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-16.128q-0.832 0-1.44 0.576t-0.576 1.44v16.16z"></path> </g></svg>
      </button>

      <button className='toolbar__btn' onClick={scrollToTop}><img src="/images/buscarnoticias/arrowup.svg" alt="" width={36}/></button>
      <AccessBtnMobile />
      <AccessBtn/>

      <LineaGuia isVisible={lineaGuiaVisible} />
    </div>
  );
};

export default ToolBar;
