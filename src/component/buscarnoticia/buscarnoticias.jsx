import React, { useState, useEffect } from 'react';
import BuscarPaginado from './buscarPaginado';
import BuscarContenidoTest from './buscarContenidoTest';
import TagSelected from './tagsSelected';
import { Modales } from './modales';
import { ModalesMobile } from './modalesMobile';
import Tooltip from 'component/common/tooltip';

const BuscarNoticias = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]); // Save all posts for resetting
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState('');
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [menuOpen, setMenuOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [dateRange, setDateRange] = useState(null);

  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCalendarOpen, setIsModalCalendarOpen] = useState(false);
  const [isModalCategoriesMobileOpen, setIsModalCategoriesMobileOpen] = useState(false);
  const [isModalCalendarMobileOpen, setIsModalCalendarMobileOpen] = useState(false);
  const [isMenuBarMobileOpen, setIsMenuBarMobileOpen] = useState(false);
  // Mobile Modal Logic
  const openMobileModal = () => setIsMobileModalOpen(true);
  const closeMobileModal = () => setIsMobileModalOpen(false);
  // Toggle menu bar logic
  const toggleMenuBar = () => setMenuOpen(!menuOpen);
  const toggleMenuBarMobile = () => {
    setIsMenuBarMobileOpen(prevState => !prevState); // Toggle the state of the menu bar
  };
  const [isMobile, setIsMobile] = useState(false);

  const [isAscending, setIsAscending] = useState(true); // true for ascending, false for descending
  const [isLast30Days, setIsLast30Days] = useState(false); // Track whether the "Last 30 Days" filter is active

  useEffect(() => {
    fetch('/data/post.json')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setPosts(data.data);
          setAllPosts(data.data); // Save all posts for resetting
        } else {
          console.error('Error: "data" no es un array');
        }
      })
      .catch((error) => console.error('Error al cargar los posts', error));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Apply filtering logic based on search, category, tags, and date range
  const filteredPosts = posts.filter((news) => {
    const matchesSearchTerm = news.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length > 0 ? selectedCategories.some((category) => news.categories.includes(category)) : true;
    const matchesTags = selectedTags.length > 0 ? selectedTags.some((tag) => news.tags.includes(tag)) : true;
    const matchesDateRange = dateRange ? 
      new Date(news.date) >= new Date(dateRange.startDate) && new Date(news.date) <= new Date(dateRange.endDate) : true;

    return matchesSearchTerm && matchesCategory && matchesTags && matchesDateRange;
  });

  // Sort posts based on the order selected
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return isAscending ? dateA - dateB : dateB - dateA;
  });

  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setInputPage(pageNumber.toString());
    }
  };

  const handleCategorySelect = (categories) => setSelectedCategories(categories);
  const handleTagSelect = (tags) => setSelectedTags(tags);
  const handleCategoryRemove = (category) => {
    setSelectedCategories(prev => prev.filter(item => item !== category));
  };
  const handleTagRemove = (tag) => {
    setSelectedTags(prev => prev.filter(item => item !== tag));
    setSelectedCategories(prev => prev.filter(category => !category.includes(tag)));
  };

  const handleDateSelect = (dates) => {
    setDateRange({
      startDate: dates[0],
      endDate: dates[1] || dates[0]
    });
  };

  const handleInputChange = (value) => {
    setInputPage(value);
    const page = parseInt(value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsChange = (rows) => {
    setPostsPerPage(rows);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Calculate the date 30 days ago
  const getLast30Days = () => {
    const today = new Date();
    const last30Days = new Date(today.setDate(today.getDate() - 30));
    return last30Days;
  };

  // Filter posts by the last 30 days
  const filterPostsLast30Days = () => {
    const last30Days = getLast30Days();
    return allPosts.filter((news) => new Date(news.date) >= last30Days);
  };

  // Function to handle the "30 Dias" tooltip click
  const handle30DiasClick = () => {
    if (isLast30Days) {
      // If "Last 30 Days" is active, reset to show all posts
      setPosts(allPosts);
    } else {
      // Filter posts for the last 30 days
      setPosts(filterPostsLast30Days());
    }
    setIsLast30Days(!isLast30Days); // Toggle the filter state
  };

  // Function to toggle between "first to last" and "last to first"
  const setPrimerUltima = () => {
    setIsAscending(!isAscending); // Toggle the order
  };

  useEffect(() => {
    const handleResize = () => {
      // Just update state with current window width (no condition)
      setIsMobile(window.innerWidth);
    };
  
    // Initial check for window size
    handleResize();
  
    // Add event listener on window resize
    window.addEventListener('resize', handleResize);
  
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  return (
    <div className='container' style={{ minHeight: '60vh' }}>
      <div className='buscarnoticias__input-items'>
        <div className='buscarnoticias__input-search'>
          <input
            className='buscarnoticias__input'
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for news..."
          />
          <button className='buscarnoticias__input-btn'>Buscar</button>
        </div>
        <div className="buscarnoticias__input-btn-continer">
          <Tooltip clase={`${isAscending ? 'active-border' : ''}`} text={'Primer / Ultima'}>
            <img className="buscarnoticias__input-btn-img" onClick={setPrimerUltima} src="/images/buscarnoticias/lastweek.svg" alt="" width={24} />
          </Tooltip>
          <Tooltip clase={`${isLast30Days ? 'active-border' : ''}`} text={'30 Dias'}>
            <img className="buscarnoticias__input-btn-img" onClick={handle30DiasClick} src="/images/buscarnoticias/lastmonth.svg" alt="" width={24} />
          </Tooltip>
          <Tooltip clase={`buscarnoticias__input-btn-img ${isMobile ? 'mobile-only' : ''}`} text={'Categorias'}>
            <img className="buscarnoticias__input-btn-img" onClick={() => setIsModalOpen(true)} src="/images/buscarnoticias/categorias.svg" alt="" width={24} />
          </Tooltip>

          <Tooltip clase={`buscarnoticias__input-btn-img ${isMobile ? 'mobile-only' : ''}`} text={'Calendario'}>
            <img
              className="buscarnoticias__input-btn-img"
              onClick={() => setIsModalCalendarOpen(true)}
              src="/images/buscarnoticias/calendar.svg"
              alt=""
              width={24}
            />
          </Tooltip>

          <Tooltip clase={`buscarnoticias__input-btn-img ${isMobile ? 'larger-only' : ''}`} text={'Categorias Mobile'}>
            <img
              className={`buscarnoticias__input-btn-img`}
              onClick={openMobileModal}
              src="/images/buscarnoticias/categorias.svg"
              alt=""
              width={24}
            />
          </Tooltip>

          <Tooltip clase={`buscarnoticias__input-btn-img ${isMobile ? 'larger-only' : ''}`} text={'Calendario Mobile'}>
            <img
              className={`buscarnoticias__input-btn-img`}
              onClick={() => setIsModalCalendarMobileOpen(true)} // Open calendar modal for mobile
              src="/images/buscarnoticias/calendar.svg"
              alt=""
              width={24}
            />
          </Tooltip>
        </div>
        <TagSelected
          selectedCategories={selectedCategories}
          selectedTags={selectedTags}
          onCategoryRemove={handleCategoryRemove}
          onTagRemove={handleTagRemove}
        />
      </div>

      <BuscarContenidoTest
        searchTerm={searchTerm}
        selectedCategory={selectedCategories}
        selectedTags={selectedTags}
        first={currentPage}
        rows={postsPerPage}
        dateRange={dateRange}
        sortedPosts={sortedPosts}  // Pass sortedPosts here
      />

      {/* Pagination and modals */}
      <div className='buscar-paginado__btnpaginado menu-bar__container'>
        <BuscarPaginado
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
          onInputChange={handleInputChange}
        />
        <button 
          className='buscar-paginado__input' 
          onClick={() => setMenuOpen(!menuOpen) || toggleMenuBarMobile(true)}
        >
        {postsPerPage}
        </button>
        <Modales
          menuOpen={menuOpen}
          handleRowsChange={handleRowsChange}
        />
      </div>

      {/* Modales */}
      <Modales
        selectedCategories={selectedCategories}
        selectedTags={selectedTags}
        handleCategorySelect={handleCategorySelect}
        handleTagSelect={handleTagSelect}
        handleTagRemove={handleTagRemove}
        handleDateSelect={handleDateSelect}
        isMobileModalOpen={isMobileModalOpen}
        setIsMobileModalOpen={setIsMobileModalOpen}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isModalCalendarOpen={isModalCalendarOpen}
        setIsModalCalendarOpen={setIsModalCalendarOpen}
        isModalCategoriesMobileOpen={isModalCategoriesMobileOpen}
        setIsModalCategoriesMobileOpen={setIsModalCategoriesMobileOpen}
        isModalCalendarMobileOpen={isModalCalendarMobileOpen}
        setIsModalCalendarMobileOpen={setIsModalCalendarMobileOpen}
        isMenuBarMobileOpen={isMenuBarMobileOpen}
        toggleMenuBarMobile={toggleMenuBarMobile}
        toggleMenuBar={toggleMenuBar}
      />

      <ModalesMobile
        isMobileModalOpen={isMobileModalOpen}
        setIsMobileModalOpen={setIsMobileModalOpen}
        isModalCalendarMobileOpen={isModalCalendarMobileOpen}
        setIsModalCalendarMobileOpen={setIsModalCalendarMobileOpen}
        isMenuBarMobileOpen={isMenuBarMobileOpen}
        setIsMenuBarMobileOpen={setIsMenuBarMobileOpen}
        toggleMenuBarMobile={toggleMenuBarMobile}
        selectedCategories={selectedCategories}
        selectedTags={selectedTags}
        handleCategorySelect={handleCategorySelect}
        handleTagSelect={handleTagSelect}
        handleTagRemove={handleTagRemove}
        handleRowsChange={handleRowsChange}
        setDateRange={setDateRange}  // Pass setDateRange here
      />

    </div>
  );
};

export default BuscarNoticias;
