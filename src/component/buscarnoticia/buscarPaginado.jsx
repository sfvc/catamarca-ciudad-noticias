import React, { useState, useEffect } from 'react';

const BuscarPaginado = ({ currentPage, totalPages, onPageChange, onInputChange, postsPerPage }) => {
  const [inputValue, setInputValue] = useState(currentPage);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1023.98);

  // Update isLargeScreen when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1023.98);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setInputValue(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      onPageChange(totalPages);
    }
  }, [postsPerPage, totalPages, currentPage, onPageChange]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onInputChange(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const page = parseInt(inputValue);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        onPageChange(page);
      } else {
        setInputValue(currentPage);
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page buttons (for large screen)
  const renderPageButtons = () => {
    const buttons = [];
    // Show first 4 pages or all available pages if less than 4
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
    // If there are more pages, add the ellipsis
    if (totalPages > 5) {
      buttons.push(<span key="ellipsis">...</span>);
      // Show the last 4 pages
      for (let i = totalPages - 5; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={currentPage === i ? 'active' : ''}
          >
            {i}
          </button>
        );
      }
    }
    return buttons;
  };

  // Only render pagination if totalPages > 0
  if (totalPages === 0) {
    return null; // Don't render anything if there are no pages
  }

  return (
    <>
      <div className='buscar-paginado__btn-container'>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <img src="/images/buscarnoticias/previous.svg" alt="" width={24} />
        </button>

        {/* Conditional rendering for small screen vs large screen */}
        {isLargeScreen ? renderPageButtons() : (
          <>
            {/* Always show the first page */}
            <button
              onClick={() => onPageChange(1)}
              className={currentPage === 1 ? 'active' : ''}
            >
              1
            </button>

            {/* Always show the ellipsis */}
            {totalPages > 1 && <span>...</span>}

            {/* Always show the last page */}
            {totalPages > 1 && (
              <button
                onClick={() => onPageChange(totalPages)}
                className={currentPage === totalPages ? 'active' : ''}
              >
                {totalPages}
              </button>
            )}
          </>
        )}

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <img src="/images/buscarnoticias/next.svg" alt="" width={24} />
        </button>
      </div>

      <input
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className='buscar-paginado__input'
        min={1}
        max={totalPages}
      />
    </>
  );
};

export default BuscarPaginado;
