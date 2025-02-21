import React, { useState, useRef, useEffect } from 'react';

const CategoriasModalMobile = ({
  selectedCategories,
  selectedTags,
  onCategorySelect,
  onTagSelect,
  onTagRemoveCategory,
  onCategoryRemove
}) => {
  const [isCategorySelected, setIsCategorySelected] = useState(true); // Track if categories or tags are selected
  const [isOpen, setIsOpen] = useState(true); // Modal state
  const modalRef = useRef(null); // Reference to the modal container

  // Handle category click to toggle selection
  const handleCategoryClick = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];
    onCategorySelect(updatedCategories); // Pass to parent
  };

  // Handle tag click to toggle selection
  const handleTagClick = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((item) => item !== tag)
      : [...selectedTags, tag];
    onTagSelect(updatedTags); // Pass to parent
  };

  // Close the modal if the click is outside of it
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal(); // Close modal if clicking outside
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Add modal-open class to body when modal is open, and remove it when closed
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      document.addEventListener('mousedown', handleOutsideClick); // Listen for outside clicks
    } else {
      document.body.classList.remove('modal-open');
      document.removeEventListener('mousedown', handleOutsideClick); // Clean up listener
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick); // Clean up listener on unmount
    };
  }, [isOpen]); // Only run this effect when `isOpen` changes

  return (
    <div className={`categorias-modal-mobile ${isOpen ? 'open' : 'closed'}`} ref={modalRef}>
      <h2 className="categorias-modal-mobile__tags-title">Grupo de tags</h2>

      {/* Category/Tag Toggle buttons */}
      <div className="categorias-modal-mobile__btn-categorias">
        <button
          className={`categorias-modal-mobile__btn ${isCategorySelected ? 'active' : ''}`}
          onClick={() => setIsCategorySelected(true)} // Set to categories view
        >
          Categoría
        </button>
        <button
          className={`categorias-modal-mobile__btn ${!isCategorySelected ? 'active' : ''}`}
          onClick={() => setIsCategorySelected(false)} // Set to tags view
        >
          Tag
        </button>
      </div>

      {/* ItemList for category or tag selection */}
      {isCategorySelected ? (
        <ItemList
          selectedCategories={selectedCategories}
          handleCategoryClick={handleCategoryClick}
        />
      ) : (
        <TagList
          selectedTags={selectedTags}
          handleTagClick={handleTagClick}
        />
      )}

      {/* TagSelected component for selected tags */}
      <TagSelected
        selectedCategories={selectedCategories}
        selectedTags={selectedTags}
        onTagRemoveCategory={onTagRemoveCategory} // Remove category related to tag
      />

      {/* CategorySelected component for selected categories */}
      <CategorySelected
        selectedCategories={selectedCategories}
        onCategoryRemove={onCategoryRemove} // Remove category
      />

      <BtnBuscar />
    </div>
  );
};

// ItemList for category selection in mobile modal
const ItemList = ({ selectedCategories, handleCategoryClick }) => {
  const items = Array.from({ length: 8 }, (_, index) => {
    return { text: `Categoria ${index + 1}` }; // Simulating categories
  });

  return (
    <ul className="categorias-modal-mobile__item-list">
      {items.map((item, index) => (
        <li
          key={index}
          className={`categorias-modal-mobile__item ${selectedCategories.includes(item.text) ? 'selected' : ''}`}
          onClick={() => handleCategoryClick(item.text)}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );
};

// TagList for tag selection
const TagList = ({ selectedTags, handleTagClick }) => {
  const items = Array.from({ length: 8 }, (_, index) => {
    return { text: `Tag ${index + 1}` }; // Simulating tags
  });

  return (
    <ul className="categorias-modal-mobile__item-list">
      {items.map((item, index) => (
        <li
          key={index}
          className={`categorias-modal-mobile__item ${selectedTags.includes(item.text) ? 'selected' : ''}`}
          onClick={() => handleTagClick(item.text)}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );
};

// TagSelected component for displaying and removing tags
const TagSelected = ({ selectedCategories, selectedTags, onTagRemoveCategory }) => {
  return (
    <div className="categorias-modal-mobile__tags-selected">
      <div className="categorias-modal-mobile__tags">
        {selectedTags.length === 0 ? (
          <p>No tags selected</p>
        ) : (
          selectedTags.map((tag) => (
            <span
              key={tag}
              className="categorias-modal-mobile__tag"
              onClick={() => onTagRemoveCategory(tag)} // Remove tag and related categories
            >
              {tag}
            </span>
          ))
        )}
      </div>
    </div>
  );
};

// CategorySelected component for displaying and removing categories
const CategorySelected = ({ selectedCategories, onCategoryRemove }) => {
  return (
    <div className="categorias-modal-mobile__categories-selected">
      <div className="categorias-modal-mobile__categories">
        {selectedCategories.length === 0 ? (
          <p>No categories selected</p>
        ) : (
          selectedCategories.map((category) => (
            <span
              key={category}
              className="categorias-modal-mobile__category"
              onClick={() => onCategoryRemove(category)} // Remove category
            >
              {category}
            </span>
          ))
        )}
      </div>
    </div>
  );
};

// Search button and carousel buttons
const BtnBuscar = () => {
  return (
    <div className="categorias-modal-mobile__btn-buscar">
      <button className="categorias-modal-mobile__btncarousel">
        <img
          className="categorias-modal-mobile__btncarousel-img"
          src="/images/buscarnoticias/next.svg"
          alt="Next"
        />
      </button>
      <button
        className="categorias-modal-mobile__btn-search"
        onClick={() => console.log('Buscar clicked')}
      >
        Buscar
      </button>
      <button className="categorias-modal-mobile__btncarousel">
        <img
          className="categorias-modal-mobile__btncarousel-img"
          src="/images/buscarnoticias/next.svg"
          alt="Next"
        />
      </button>
    </div>
  );
};

export default CategoriasModalMobile;
