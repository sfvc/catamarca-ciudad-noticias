import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import HeaderMobileNav from './headerMobileNav';
import Modal from './modal';

const HeaderMobile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null); // Reference to modal element

    const openModal = () => {
        setIsModalOpen(true); // Set modal state to open
    };

    const closeModal = () => {
        // Animate the modal closing first
        gsap.to(modalRef.current, {
            y: '100%',  // Move the modal down to hide it
            opacity: 0, // Fade out
            duration: 0.3,
            ease: 'power2.inOut',
            onComplete: () => {
                setIsModalOpen(false); // Close modal after animation completes
            },
        });
    };

    const animateModal = () => {
        gsap.set(modalRef.current, { y: '100%' }); // Initial position off-screen
        gsap.to(modalRef.current, {
            y: '0%', // Slide the modal up into view
            opacity: 1, // Fade in
            duration: 0.3,
            ease: 'power2.inOut',
        });
    };

    const animateModalUp = () => {
        gsap.set(modalRef.current, { y: '0%' }); // Keep the modal in position
        gsap.to(modalRef.current, {
            y: '100%',  // Slide the modal down off-screen
            opacity: 0, // Fade out
            duration: 0.3,
            ease: 'power2.inOut',
        });
    };

    // Handle animation only on state change
    useEffect(() => {
        if (isModalOpen) {
            animateModal(); // Animate modal in when it's opened
        } else {
            animateModalUp(); // Animate modal out when it's closed
        }
    }, [isModalOpen]); // Trigger this effect when isModalOpen changes

    return (
        <nav className="HeaderMobile border-bottom-amarillo">
            <div className="navbar-headerMobile">
                <a href="/" aria-label="Argentina.gob.ar Presidencia de la Nación">
                    <img
                        src="/images/logo-new-2020.png"
                        alt="Argentina.gob.ar"
                        height="42"
                    />
                </a>
                <img
                    src="/images/menu.svg"
                    alt="Menu Icon"
                    onClick={openModal} // Open the modal when the menu icon is clicked
                />
            </div>

            {/* Modal component with GSAP animation */}
            <Modal isOpen={isModalOpen}>
                <div className='modal' onClick={closeModal}></div>
                <div className="modalHeaderMobile" ref={modalRef}>
                    <button
                        className="modal__cerrarbarra"
                        onClick={closeModal} // Close the modal on click
                    >
                        <img className="modal__cerrarbarra-icon" />
                    </button>
                    <HeaderMobileNav />
                </div>
            </Modal>
        </nav>
    );
};

export default HeaderMobile;
