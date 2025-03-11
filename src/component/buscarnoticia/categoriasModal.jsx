import React, { useEffect, useRef, useState } from 'react';
import TagSelected from './tagsSelected';

const CategoriasModal = ({
  isOpen,
  onClose,
  onCategorySelect,
  onTagSelect,
  selectedCategories,
  selectedTags
}) => {
  if (!isOpen) return null;

  const [isCategorySelected, setIsCategorySelected] = useState(true);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const modalContentRef = useRef(null); // Ref to the modal content for detecting outside clicks

  // Fetch categories and tags from the JSON file
  useEffect(() => {
    fetch('/data/post.json')
      .then((response) => response.json())
      .then((data) => {
        const allCategories = Array.from(new Set(data.data.flatMap(item => item.categories)));
        const allTags = Array.from(new Set(data.data.flatMap(item => item.tags)));
        setCategories(allCategories);
        setTags(allTags);
      })
      .catch((error) => {
        console.error('Error fetching the JSON file:', error);
      });
  }, []);

  // Close the modal if the user clicks outside of the modal content
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        onClose(); // Close the modal if clicked outside
      }
    };

    // Add the event listener for click
    document.addEventListener('mousedown', handleOutsideClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  // Toggle category selection
  const handleCategoryClick = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];
    onCategorySelect(updatedCategories); // Update the selected categories in the parent
  };

  // Toggle tag selection
  const handleTagClick = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((item) => item !== tag)
      : [...selectedTags, tag];
    onTagSelect(updatedTags); // Update the selected tags in the parent
  };

  // Remove category when clicked
  const handleCategoryRemove = (category) => {
    const updatedCategories = selectedCategories.filter((item) => item !== category);
    onCategorySelect(updatedCategories); // Update the categories in the parent
  };

  // Remove category when a tag is clicked
  const handleTagRemoveCategory = (tag) => {
    // Remove the tag from the selectedTags array
    const updatedTags = selectedTags.filter((item) => item !== tag);
    onTagSelect(updatedTags); // Update the tags in the parent

    // Now, remove related categories when a tag is clicked
    const updatedCategories = selectedCategories.filter(
      (category) => !category.includes(tag) // Remove categories that include the clicked tag
    );
    onCategorySelect(updatedCategories); // Update the selected categories in the parent
  };

  // Remove a specific tag
  const handleTagRemove = (tag) => {
    const updatedTags = selectedTags.filter((item) => item !== tag);
    onTagSelect(updatedTags); // Update the tags in the parent
  };

  // Reset all selected categories and tags
  const onRestart = () => {
    onCategorySelect([]); // Clear categories
    onTagSelect([]); // Clear tags
  };

  // Handle input change for search
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter categories or tags based on the search term
  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="categorias-modal__overlay container">
      <div ref={modalContentRef} className="categorias-modal__content">
        <div className="categorias-modal__btns">
          <button
            className={`categorias-modal__toggle-btn ${isCategorySelected ? 'active' : ''}`}
            onClick={() => setIsCategorySelected(true)}
          >
            Categorías
          </button>
          <button
            className={`categorias-modal__toggle-btn ${!isCategorySelected ? 'active' : ''}`}
            onClick={() => setIsCategorySelected(false)}
          >
            Tags
          </button>
        </div>

        {isCategorySelected ? (
          <ul className="categorias-modal__list">
            {filteredCategories.map((category, index) => (
              <li
                key={index}
                className={`categorias-modal__item ${selectedCategories.includes(category) ? 'selected' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                <img src="/images/buscarnoticias/categorias.svg" alt="" />
                {category}
              </li>
            ))}
          </ul>
        ) : (
          <ul className="categorias-modal__list">
            {filteredTags.map((tag, index) => (
              <li
                key={index}
                className={`categorias-modal__item ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                <img src="/images/buscarnoticias/tag.svg" alt="" />
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="categorias-modal__list-actions">
          <div>
            <input
              className="categorias-modal__search"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar..."
            />
          </div>
          <div>
            <button className="buscarnoticias__input-btn" onClick={onRestart}>
              Restablecer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriasModal;
