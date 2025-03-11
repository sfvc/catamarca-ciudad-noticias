import React, { useState, useEffect } from 'react';

const TagSelected = ({
  allCategories,
  allTags,
  selectedCategories,
  selectedTags,
  onCategorySelect,
  onTagSelect,
  onCategoryRemove,
  onTagRemove
}) => {
  const [categoryPage, setCategoryPage] = useState(1);
  const [tagPage, setTagPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default to 6 (tablet)

  const handleResize = () => {
    const width = window.innerWidth;

    if (width >= 1024) {
      setItemsPerPage(6); // Desktop
    } else if (width >= 768) {
      setItemsPerPage(6); // Tablet
    } else {
      setItemsPerPage(3); // Mobile
    }
  };

  // Update items per page on component mount and when window is resized
  useEffect(() => {
    handleResize(); // Set initial items per page
    window.addEventListener('resize', handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup event listener on unmount
    };
  }, []);

  const handleCategoryPageChange = (direction) => {
    const totalCategoryPages = Math.ceil(allCategories.length / itemsPerPage);
    if (direction === 'next' && categoryPage < totalCategoryPages) {
      setCategoryPage(categoryPage + 1);
    } else if (direction === 'prev' && categoryPage > 1) {
      setCategoryPage(categoryPage - 1);
    }
  };

  const handleTagPageChange = (direction) => {
    const totalTagPages = Math.ceil(allTags.length / itemsPerPage);
    if (direction === 'next' && tagPage < totalTagPages) {
      setTagPage(tagPage + 1);
    } else if (direction === 'prev' && tagPage > 1) {
      setTagPage(tagPage - 1);
    }
  };

  const paginatedCategories = allCategories.slice((categoryPage - 1) * itemsPerPage, categoryPage * itemsPerPage);
  const paginatedTags = allTags.slice((tagPage - 1) * itemsPerPage, tagPage * itemsPerPage);

  return (
    <div className="tag-selected">
      {/* Categories Pagination */}
      <div className="tag-selected-categorias">
        {/* Pagination for available categories */}
        {allCategories.length > itemsPerPage && (
          <div className="pagination">
            <button
              onClick={() => handleCategoryPageChange('prev')}
              disabled={categoryPage === 1}
              className="pagination-btn"
            >
              <img src="/images/buscarnoticias/previous.svg" alt="" width={24} />
            </button>
          </div>
        )}

        <div className="tag-selected-categorias__content">
          {paginatedCategories.map((category) => (
            <span
              key={category}
              className="tag-selected-categorias__item"
              onClick={() => onCategorySelect(category)}
            >
              <img src="/images/buscarnoticias/categorias.svg" alt="" />
              <small>{category}</small>
            </span>
          ))}
        </div>

        {/* Pagination for available categories */}
        {allCategories.length > itemsPerPage && (
          <div className="pagination">
            <button
              onClick={() => handleCategoryPageChange('next')}
              disabled={categoryPage === Math.ceil(allCategories.length / itemsPerPage)}
              className="pagination-btn"
            >
              <img src="/images/buscarnoticias/next.svg" alt="" width={24} />
            </button>
          </div>
        )}
      </div>

      {/* Tags Pagination */}
      <div className="tag-selected-tags">
        {/* Pagination for available tags */}
        {allTags.length > itemsPerPage && (
          <div className="pagination">
            <button
              onClick={() => handleTagPageChange('prev')}
              disabled={tagPage === 1}
              className="pagination-btn"
            >
              <img src="/images/buscarnoticias/previous.svg" alt="" width={24} />
            </button>
          </div>
        )}

        <div className="tag-selected-categorias__content">
          {paginatedTags.map((tag) => (
            <span
              key={tag}
              className="tag-selected-categorias__item"
              onClick={() => onTagSelect(tag)}
            >
              <img src="/images/buscarnoticias/tag.svg" alt="" />
              <small>{tag}</small>
            </span>
          ))}
        </div>

        {/* Pagination for available tags */}
        {allTags.length > itemsPerPage && (
          <div className="pagination">
            <button
              onClick={() => handleTagPageChange('next')}
              disabled={tagPage === Math.ceil(allTags.length / itemsPerPage)}
              className="pagination-btn"
            >
              <img src="/images/buscarnoticias/next.svg" alt="" width={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagSelected;
