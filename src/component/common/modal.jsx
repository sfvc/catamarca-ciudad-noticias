import React, { forwardRef } from 'react';

// Modal Component
const Modal = ({ isOpen, onClose, children, clase }, ref) => {
    if (!isOpen) return null;

    return (
        <div className={`${clase}`} onClick={onClose} ref={ref} >
            {children}
        </div>
    );
};

export default forwardRef(Modal);
