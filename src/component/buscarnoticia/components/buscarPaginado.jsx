import React, { useState, useEffect } from 'react';

const BuscarPaginado = ({ currentPage, totalPages, onPageChange }) => {
  const [inputValue, setInputValue] = useState(currentPage);

  useEffect(() => {
    setInputValue(currentPage);
  }, [currentPage]);


  if (totalPages === 0) {
    return null;
  }

  const renderPageNumbers = () => {
    const pageButtons = [];

    const delta = 2;
    const range = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    let lastPage = 0;

    // Botón Anterior
    if (currentPage > 1) {
      pageButtons.push(
        <button
          key="prev"
          onClick={() => onPageChange(currentPage - 1)}
          className="paginado nav-button"
        >
          ← Anterior
        </button>
      );
    }

    range.forEach((page) => {
      if (page - lastPage > 1) {
        pageButtons.push(
          <span key={`ellipsis-${page}`} className="paginado-ellipsis">
            ...
          </span>
        );
      }

      pageButtons.push(
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`paginado ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </button>
      );

      lastPage = page;
    });

    // Botón Siguiente
    if (currentPage < totalPages) {
      pageButtons.push(
        <button
          key="next"
          onClick={() => onPageChange(currentPage + 1)}
          className="paginado nav-button"
        >
          Siguiente →
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <>
      <div className='buscar-paginado__btn-container'>

        <div className="buscar-paginado__pages">
          {renderPageNumbers()}
        </div>

      </div>
    </>
  );
};

export default BuscarPaginado;
