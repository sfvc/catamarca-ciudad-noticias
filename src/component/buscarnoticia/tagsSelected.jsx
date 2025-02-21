import React, { useState } from 'react';

const TagSelected = ({ selectedCategories, selectedTags, onCategoryRemove, onTagRemove }) => {
  // State to track pagination for categories and tags
  const [categoryPage, setCategoryPage] = useState(1);
  const [tagPage, setTagPage] = useState(1);

  const ITEMS_PER_PAGE = 3;

  // Helper functions to paginate the selected categories and tags
  const handleCategoryPageChange = (direction) => {
    const totalCategoryPages = Math.ceil(selectedCategories.length / ITEMS_PER_PAGE);
    if (direction === 'next' && categoryPage < totalCategoryPages) {
      setCategoryPage(categoryPage + 1);
    } else if (direction === 'prev' && categoryPage > 1) {
      setCategoryPage(categoryPage - 1);
    }
  };

  const handleTagPageChange = (direction) => {
    const totalTagPages = Math.ceil(selectedTags.length / ITEMS_PER_PAGE);
    if (direction === 'next' && tagPage < totalTagPages) {
      setTagPage(tagPage + 1);
    } else if (direction === 'prev' && tagPage > 1) {
      setTagPage(tagPage - 1);
    }
  };

  // Slice the selected categories and tags based on the current page
  const paginatedCategories = selectedCategories.slice((categoryPage - 1) * ITEMS_PER_PAGE, categoryPage * ITEMS_PER_PAGE);
  const paginatedTags = selectedTags.slice((tagPage - 1) * ITEMS_PER_PAGE, tagPage * ITEMS_PER_PAGE);

  return (
    <div className="tag-selected">

      {selectedCategories.length > 0 && (
        <div className="tag-selected-categorias">
          {selectedCategories.length > ITEMS_PER_PAGE && (
            <div className="pagination">
              <button onClick={() => handleCategoryPageChange('prev')} disabled={categoryPage === 1}>
                <img src="/images/buscarnoticias/previous.svg" alt="" width={24}/>
              </button>
            </div>
          )}
          {paginatedCategories.map((category) => (
            <span
              key={category}
              className="tag-selected-categorias__item"
              onClick={() => onCategoryRemove(category)} // Trigger removal when a category is clicked
            >
              <img src="/images/buscarnoticias/categorias.svg" alt="" />
              <small>
                {category} 
              </small>
            </span>
          ))}
          
          {/* Pagination for categories */}
          {selectedCategories.length > ITEMS_PER_PAGE && (
            <div className="pagination">
              <button onClick={() => handleCategoryPageChange('next')} disabled={categoryPage === Math.ceil(selectedCategories.length / ITEMS_PER_PAGE)}>
                <img src="/images/buscarnoticias/next.svg" alt="" width={24}/>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Display selected tags with pagination */}
      {selectedTags.length > 0 && (
        <div className="tag-selected-tags">
                    {/* Pagination for tags */}
          {selectedTags.length > ITEMS_PER_PAGE && (
            <div className="pagination">
              <button onClick={() => handleTagPageChange('prev')} disabled={tagPage === 1}>
                <img src="/images/buscarnoticias/previous.svg" alt="" width={24}/>
              </button>
            </div>
          )}
          {paginatedTags.map((tag) => (
            <span
              key={tag}
              className="tag-selected-categorias__item"
              onClick={() => onTagRemove(tag)} // Trigger removal when a tag is clicked
            >
              <img src="/images/buscarnoticias/tag.svg" alt="" />
              <small>

                {tag}
              </small>
            </span>
          ))}
          {selectedTags.length > ITEMS_PER_PAGE && (
            <div className="pagination">
              <button onClick={() => handleTagPageChange('next')} disabled={tagPage === Math.ceil(selectedTags.length / ITEMS_PER_PAGE)}>
                <img src="/images/buscarnoticias/next.svg" alt="" width={24}/>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TagSelected;
