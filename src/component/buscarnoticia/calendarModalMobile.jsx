import React, { useState, useRef } from 'react';
import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { locale, addLocale } from 'primereact/api';

const CalendarModalMobile = ({ onClose }) => {
    const [dates, setDates] = useState(null);  // Store the selected date range (start and end dates)

    // Create a ref for the modal container
    const modalRef = useRef(null);

    // Set the locale for the calendar
    locale('es');    

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar',
        // ...
    });

    const handleLimpiar = () => {
        setDates(null);  // Reset the dates to default (null)
    };

    const handleBuscar = () => {
        if (onClose) {
            onClose(dates);  // Pass the selected dates to the parent when "Buscar" is clicked
        }
    };

    return (
        <div className="categorias-modal-mobile__overlay">
            <div
                className="categorias-modal-mobile__content-calendar"
                ref={modalRef}  // Attach the ref to the modal container
            >
                <Calendar 
                    value={dates} 
                    onChange={(e) => setDates(e.value)} 
                    inline 
                    selectionMode="range"  // Enable range selection
                />
                <div className="categorias-modal-mobile__close-btndiv">
                    <button
                        className="buscarnoticias__button"
                        style={{ padding: "6px", textAlign: "center", backgroundColor: 'blue', width: '33%', marginBlock: '1rem' }}
                        onClick={handleLimpiar} // Call the reset function on "Limpiar"
                    >
                        Limpiar
                    </button>

                    {/* Buscar Button */}
                    <button
                        className="buscarnoticias__button"
                        style={{ padding: "6px", textAlign: "center", backgroundColor: 'blue', width: '33%', marginBlock: '1rem' }}
                        onClick={handleBuscar} // Call the function to pass the dates and close modal on "Buscar"
                    >
                        Buscar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CalendarModalMobile;
