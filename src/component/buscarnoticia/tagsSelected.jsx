import React, { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import { catamarcaApi } from "api/catamarcaApi";

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
  // const [categoryPage, setCategoryPage] = useState(1);
  // const [tagPage, setTagPage] = useState(1);
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

  // const handleCategoryPageChange = (direction) => {
  //   const totalCategoryPages = Math.ceil(allCategories.length / itemsPerPage);
  //   if (direction === 'next' && categoryPage < totalCategoryPages) {
  //     setCategoryPage(categoryPage + 1);
  //   } else if (direction === 'prev' && categoryPage > 1) {
  //     setCategoryPage(categoryPage - 1);
  //   }
  // };

  // const handleTagPageChange = (direction) => {
  //   const totalTagPages = Math.ceil(allTags.length / itemsPerPage);
  //   if (direction === 'next' && tagPage < totalTagPages) {
  //     setTagPage(tagPage + 1);
  //   } else if (direction === 'prev' && tagPage > 1) {
  //     setTagPage(tagPage - 1);
  //   }
  // };

  // const paginatedCategories = allCategories.slice((categoryPage - 1) * itemsPerPage, categoryPage * itemsPerPage);
  // const paginatedTags = allTags.slice((tagPage - 1) * itemsPerPage, tagPage * itemsPerPage);

  const toggleCategory = (category) => {
    const exists = selectedCategories.some(c => c.id === category.id);
    if (exists) {
      onCategoryRemove(category);
    } else {
      onCategorySelect(category);
    }
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onTagRemove(tag);
    } else {
      onTagSelect(tag);
    }
  };

  const fetchTags = async () => {
    const { data } = await catamarcaApi.get("/items/etiquetas_noticias");
    return data.data;
  };
  const { data: etiquetas = [], errorT, isLoadingT } = useQuery("etiquetas", fetchTags);

  const fetchCategory = async () => {
    const { data } = await catamarcaApi.get("/items/categoria_noticia");
    return data.data;
  };
  const { data: categorias = [], errorC, isLoadingC } = useQuery("categorias", fetchCategory);

  return (
    <div className="tag-selected">

      {/* Categories Pagination */}
      <div className="tag-selected-categorias">
        {/* {allCategories.length > itemsPerPage && (
          <div className="pagination">
            <button
              onClick={() => handleCategoryPageChange('prev')}
              disabled={categoryPage === 1}
              className="pagination-btn"
            >
              <img src="/images/buscarnoticias/previous.svg" alt="" width={24} />

            </button>
          </div>
        )} */}

        <div className="tag-selected-categorias__content">
          {categorias.map((category) => (
            <span
              key={category.id}
              className={`tag-selected-categorias__item ${selectedCategories.includes(category) ? 'active' : ''}`}
              onClick={() => toggleCategory(category)}
            >
              <img src="/images/buscarnoticias/categorias.svg" alt="" />
              <small>{category.nombre}</small>
            </span>
          ))}
        </div>

        {/* {allCategories.length > itemsPerPage && (
          <div className="pagination">
            <button
              onClick={() => handleCategoryPageChange('next')}
              disabled={categoryPage === Math.ceil(allCategories.length / itemsPerPage)}
              className="pagination-btn"
            >
              <img src="/images/buscarnoticias/next.svg" alt="" width={24} />
            </button>
          </div>
        )} */}
      </div>

      {/* Tags Pagination */}
      <div className="tag-selected-tags">
        {/* {etiquetas.length > itemsPerPage && (
          <div className="pagination">
            <button
              onClick={() => handleTagPageChange('prev')}
              disabled={tagPage === 1}
              className="pagination-btn"
            >
              <img src="/images/buscarnoticias/previous.svg" alt="" width={24} />
            </button>
          </div>
        )} */}

        <div className="tag-selected-categorias__content">
          {etiquetas.map((tag) => (
            <span
            
              key={tag.id}
              className={`tag-selected-categorias__item  ${selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => toggleTag(tag)}
            >
              <img src="/images/buscarnoticias/tag.svg" alt="" />
              {/* <small></small> */}
              {tag.nombre}
            </span>
          ))}
        </div>

        {/* {etiquetas.length > itemsPerPage && (
          <div className="pagination">
            <button
              onClick={() => handleTagPageChange('next')}
              disabled={tagPage === Math.ceil(allTags.length / itemsPerPage)}
              className="pagination-btn"
            >
              <img src="/images/buscarnoticias/next.svg" alt="" width={24} />
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TagSelected;
