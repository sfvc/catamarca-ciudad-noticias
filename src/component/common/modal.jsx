import { useEffect } from 'react';

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
    // If modal is not open, return null
    if (!isOpen) return null;

    // Disable background scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open'); // Disable body scroll
        } else {
            document.body.classList.remove('modal-open'); // Enable body scroll
        }

        // Cleanup function to ensure we remove the class on unmount or when modal is closed
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);

    return (
        <div className="modal">

                {children}
        </div>
    );
};

export default Modal;
