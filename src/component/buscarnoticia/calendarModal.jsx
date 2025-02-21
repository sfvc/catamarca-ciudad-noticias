import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { locale, addLocale } from "primereact/api";

export const CalendarModal = ({ onClose, onDateSelect }) => {
  const [dates, setDates] = useState(null); // Store the selected date range (start and end dates)
  const modalRef = useRef(null);

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
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Pass the selected dates to the parent component
  const handleDateChange = (e) => {
    const selectedDates = e.value;

    // If only one date is selected, set both start and end to that same date
    if (selectedDates && selectedDates.length === 1) {
      setDates([selectedDates[0], selectedDates[0]]); // Set both dates to the same selected date
    } else {
      setDates(selectedDates); // Keep both start and end dates if it's a range
    }

    onDateSelect(e.value); // Notify parent with the selected date(s)
  };

  return (
    <div className="categorias-modal__overlay container">
      <div className="categorias-modal__content-calendar" ref={modalRef}>
        <Calendar
          value={dates}
          onChange={handleDateChange}
          inline
          selectionMode="range"
        />
        <div className="categorias-modal__close-btndiv">
          <button className="buscarnoticias__button" onClick={onClose}>Buscar</button>
        </div>
      </div>
    </div>
  );
};
