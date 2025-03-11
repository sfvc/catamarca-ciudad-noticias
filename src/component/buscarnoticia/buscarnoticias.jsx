import React, { useState, useEffect } from 'react';
import BuscarPaginado from './buscarPaginado';
import BuscarContenidoTest from './buscarContenidoTest';
import TagSelected from './tagsSelected';
import { Modales } from './modales';
import { ModalesMobile } from './modalesMobile';
import Tooltip from 'component/common/tooltip';
import BuscarContenido from './buscarContenido';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const BuscarNoticias = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
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

  const openMobileModal = () => setIsMobileModalOpen(true);
  const closeMobileModal = () => setIsMobileModalOpen(false);
  
  const toggleMenuBar = () => setMenuOpen(!menuOpen);
  const toggleMenuBarMobile = () => setIsMenuBarMobileOpen(prevState => !prevState);

  const [isMobile, setIsMobile] = useState(false);

  const [isAscending, setIsAscending] = useState(true); 
  const [isLast30Days, setIsLast30Days] = useState(false); 

  useEffect(() => {
    fetch('/data/post.json')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setPosts(data.data);
          setAllPosts(data.data); 
        } else {
          console.error('Error: "data" is not an array');
        }
      })
      .catch((error) => console.error('Error loading posts', error));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filteredPosts = posts.filter((news) => {
    // Check if the title matches the search term
    const matchesSearchTerm = news.title.toLowerCase().includes(searchTerm.toLowerCase());
  
    // Match any of the selected categories
    const matchesCategory = Array.isArray(selectedCategories) && selectedCategories.length > 0 
      ? selectedCategories.every((category) => news.categories.includes(category))  // Accumulate by checking if all selected categories are matched
      : true; // If no categories are selected, show all posts
  
    // Match any of the selected tags
    const matchesTags = Array.isArray(selectedTags) && selectedTags.length > 0 
      ? selectedTags.every((tag) => news.tags.includes(tag))  // Accumulate by checking if all selected tags are matched
      : true;  // If no tags are selected, show all posts
  
    // Check if the post's date is within the selected date range
    const matchesDateRange = dateRange 
      ? new Date(news.date) >= new Date(dateRange.startDate) && new Date(news.date) <= new Date(dateRange.endDate) 
      : true;  // If no date range is selected, show all posts
  
    return matchesSearchTerm && matchesCategory && matchesTags && matchesDateRange;
  });
  


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

  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) => {
      const updatedCategories = [...prev, category];
      console.log('Updated Categories:', updatedCategories);  // Log immediately after update
      return updatedCategories;
    });
  };
  
  const handleTagSelect = (tag) => {
    setSelectedTags((prev) => {
      const updatedTags = [...prev, tag];
      console.log('Updated Tags:', updatedTags);  // Log immediately after update
      return updatedTags;
    });
  };
  const handleCategoryRemove = (category) => {
    setSelectedCategories(prev => prev.filter(item => item !== category));
  };
  const handleTagRemove = (tag) => {
    setSelectedTags(prev => prev.filter(item => item !== tag));
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

  const getLast30Days = () => {
    const today = new Date();
    const last30Days = new Date(today.setDate(today.getDate() - 30));
    return last30Days;
  };

  const filterPostsLast30Days = () => {
    const last30Days = getLast30Days();
    return allPosts.filter((news) => new Date(news.date) >= last30Days);
  };

  const handle30DiasClick = () => {
    if (isLast30Days) {
      setPosts(allPosts);
    } else {
      setPosts(filterPostsLast30Days());
    }
    setIsLast30Days(!isLast30Days); 
  };

  const setPrimerUltima = () => {
    setIsAscending(!isAscending); 
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    console.log('selectedCategories (after update):', selectedCategories);
    console.log('selectedTags (after update):', selectedTags);
  }, [selectedCategories, selectedTags]);
  

  return (
    <QueryClientProvider client={queryClient}>
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
            <Tooltip clase={`${isAscending ? '' : 'active-border'}`} text={'Primer / Ultima'}>
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
                onClick={() => setIsModalCalendarMobileOpen(true)}
                src="/images/buscarnoticias/calendar.svg"
                alt=""
                width={24}
              />
            </Tooltip>
          </div>
          <TagSelected
            allCategories={[...new Set(allPosts.flatMap(post => post.categories))]}
            allTags={[...new Set(allPosts.flatMap(post => post.tags))]}
            selectedCategories={selectedCategories}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
            onCategorySelect={handleCategorySelect}
            onTagRemove={handleTagRemove}
            onCategoryRemove={handleCategoryRemove}
          />
        </div>

        <BuscarContenidoTest
          searchTerm={searchTerm}
          selectedCategory={selectedCategories}
          selectedTags={selectedTags}
          first={currentPage}
          rows={postsPerPage}
          dateRange={dateRange}
          sortedPosts={sortedPosts}  
        />

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
          menuOpen={menuOpen}
          handleRowsChange={handleRowsChange}
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
          setDateRange={setDateRange}  
        />

      </div>
    </QueryClientProvider>
  );
};

export default BuscarNoticias;
