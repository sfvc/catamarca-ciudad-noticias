import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { locale, addLocale } from "primereact/api";

const CalendarModal = ({ onClose, onDateSelect, initialDates }) => {
  const [dates, setDates] = useState(initialDates || null); // Store the selected date range (start and end dates)
  const modalRef = useRef(null); // Ref to check for clicks outside the modal content

  // Set the locale for the calendar
  locale("es");

  addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    today: "Hoy",
    clear: "Limpiar",
  });

  // Close modal on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close modal when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Handle date change
  const handleDateChange = (e) => {
    const selectedDates = e.value;
    // If only one date is selected, set both start and end to that same date
    if (selectedDates && selectedDates.length === 1) {
      setDates([selectedDates[0], selectedDates[0]]);
    } else {
      setDates(selectedDates); // Keep both start and end dates if it's a range
    }
    onDateSelect(e.value); // Notify parent with the selected date(s)
  };

  // Reset the calendar to the initial values
  const handleRestablecerClick = () => {
    setDates(initialDates); // Reset to the initial values
    onDateSelect(initialDates); // Notify parent with the initial date(s)
  };

  // Close modal when "Buscar" button is clicked
  const handleBuscarClick = () => {
    onClose(); // Close modal
  };

  return (
    <div className="categorias-modal__overlay">
      <div className="categorias-modal__content-calendar" ref={modalRef}>
        <Calendar
          value={dates}
          onChange={handleDateChange}
          inline
          selectionMode="range"
        />
        <div className="categorias-modal__close-btndiv">
          <button className="calendar-btn__restablecer" onClick={handleRestablecerClick}>Restablecer</button>
          <button className="buscarnoticias__input-btn" onClick={handleBuscarClick}>Buscar</button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;