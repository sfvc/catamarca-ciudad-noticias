import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Modal from './modal'; // Assuming Modal is a common container component

const ModalMobile = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null); // Reference to modal element
  const overlayRef = useRef(null); // Reference to the overlay to detect outside clicks

  const closeModal = () => {
    // Animate the modal closing first
    gsap.to(modalRef.current, {
      y: '100%',  // Move the modal down to hide it
      opacity: 0, // Fade out
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        if (onClose) onClose(); // Close modal after animation completes
      },
    });
  };

  const handleOutsideClick = (e) => {
    if (overlayRef.current && !overlayRef.current.contains(e.target)) {
      closeModal(); // Close the modal if the click is outside the modal content
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Open animation: Slide up and fade in
      gsap.set(modalRef.current, { y: '100%', opacity: 0 }); // Start position off-screen
      gsap.to(modalRef.current, {
        y: '0%', // Slide the modal up into view
        opacity: 1, // Fade in
        duration: 0.3,
        ease: 'power2.inOut', // Ease for smooth animation
      });

      // Add event listener for detecting outside clicks
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      // Remove event listener when modal is closed
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      // Clean up the event listener on unmount
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  if (!isOpen) return null; // Don't render the modal component until it is open

  return (
    <Modal clase={'modal'} isOpen={isOpen} onClose={closeModal}>
      <div
        className="modal-overlay"
        ref={overlayRef} // Reference the overlay for outside click detection
      >
        <div className="modalHeaderMobile" ref={modalRef}>
          <button className="modal__cerrarbarra" onClick={closeModal}>
            <img className="modal__cerrarbarra-icon" src="/path-to-close-icon.png" alt="close" />
          </button>
          {children} {/* Children will be the dynamic content like CalendarModalMobile */}
        </div>
      </div>
    </Modal>
  );
};

export default ModalMobile;
