import React, { useState, useEffect } from 'react';
import BuscarPaginado from './buscarPaginado';
import BuscarContenidoTest from './buscarContenidoTest';
import TagSelected from './tagsSelected';
import Tooltip from 'component/common/tooltip';
import BuscarContenido from './buscarContenido';
import { QueryClient, QueryClientProvider } from "react-query";
import CategoriasModal from "./categoriasModal";
import CalendarModal from "./calendarModal";
import MenuBar from "./menuBar";
import ModalMobile from 'component/common/modalMobile';
import CategoriasModalMobile from './categoriasModalMobile';
import CalendarModalMobile from './calendarModalMobile';
import MenuBarMobile from './menuBarMobile';

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
  const [selectedDate, setSelectedDate] = useState(null);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCalendarOpen, setIsModalCalendarOpen] = useState(false);
  const [isModalCategoriesMobileOpen, setIsModalCategoriesMobileOpen] = useState(false);
  const [isModalCalendarMobileOpen, setIsModalCalendarMobileOpen] = useState(false);
  const [isMenuBarMobileOpen, setIsMenuBarMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [isLast30Days, setIsLast30Days] = useState(false);

  const openMobileModal = () => setIsMobileModalOpen(true);
  const closeMobileModal = () => setIsMobileModalOpen(false);

  const toggleMenuBar = () => setMenuOpen(!menuOpen);
  const toggleMenuBarMobile = () => setIsMenuBarMobileOpen(prevState => !prevState);


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
    const matchesCategory = selectedCategories.length > 0
      ? selectedCategories.every(category => news.categories.includes(category))
      : true;

    const matchesTag = selectedTags.length > 0
      ? selectedTags.every(tag => news.tags.includes(tag))
      : true;

    return matchesCategory && matchesTag;
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
      console.log('Updated Categories:', updatedCategories);
      return updatedCategories;
    });
  };

  const handleTagSelect = (tag) => {
    setSelectedTags((prev) => {
      const updatedTags = [...prev, tag];
      console.log('Updated Tags:', updatedTags);
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
            <Tooltip tooltip="tooltip-bottom" clase={`${isAscending ? '' : 'active-border'}`} text={'Primer / Ultima'}>
              <img className="buscarnoticias__input-btn-img" onClick={setPrimerUltima} src="/images/buscarnoticias/lastweek.svg" alt="" width={24} />
            </Tooltip>
            <Tooltip tooltip="tooltip-bottom" clase={`${isLast30Days ? 'active-border' : ''}`} text={'30 Dias'}>
              <img className="buscarnoticias__input-btn-img" onClick={handle30DiasClick} src="/images/buscarnoticias/lastmonth.svg" alt="" width={24} />
            </Tooltip>
            <Tooltip tooltip="tooltip-bottom" clase={`buscarnoticias__input-btn-img ${isMobile ? 'mobile-only' : ''}`} text={'Categorias'}>
              <img  tooltip="tooltip-bottom" className="buscarnoticias__input-btn-img" onClick={() => setIsModalOpen(true)} src="/images/buscarnoticias/categorias.svg" alt="" width={24} />
            </Tooltip>

            <Tooltip tooltip="tooltip-bottom" clase={`buscarnoticias__input-btn-img ${isMobile ? 'mobile-only' : ''}`} text={'Calendario'}>
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
            {isModalOpen && (
              <CategoriasModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCategorySelect={handleCategorySelect}
                onTagSelect={handleTagSelect}
                selectedCategories={selectedCategories}
                selectedTags={selectedTags}
              />
            )}

            {isModalCalendarOpen && (
              <CalendarModal
                isOpen={isModalCalendarOpen}
                onClose={() => setIsModalCalendarOpen(false)}
                onDateSelect={handleDateSelect}
              />
            )}

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

        {dateRange && (
          <div className="buscarnoticias__fechaseleccionada">
            <small>Fecha seleccionada</small>
            <small>
              {dateRange.startDate.toLocaleDateString()} -{" "}
              {dateRange.endDate ? dateRange.endDate.toLocaleDateString() : dateRange.startDate.toLocaleDateString()}
            </small>
          </div>
        )}

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

        {/* Modals for categories and calendar */}
        {isMenuBarMobileOpen && (
          <ModalMobile isOpen={isMenuBarMobileOpen} onClose={toggleMenuBarMobile}>
            <MenuBarMobile
              isOpen={isMenuBarMobileOpen}
              closeModal={toggleMenuBarMobile}
              handleRowsChange={handleRowsChange}
            />
          </ModalMobile>
        )}

        {/* Mobile Modals */}
        {isMobileModalOpen && (
          <ModalMobile isOpen={isMobileModalOpen} onClose={() => setIsMobileModalOpen(false)}>
            <CategoriasModalMobile
              selectedCategories={selectedCategories}
              selectedTags={selectedTags}
              onCategorySelect={handleCategorySelect}
              onTagSelect={handleTagSelect}
              onTagRemoveCategory={handleTagRemove}
            />
          </ModalMobile>
        )}

        {isModalCalendarMobileOpen && (
          <ModalMobile isOpen={isModalCalendarMobileOpen} onClose={() => setIsModalCalendarMobileOpen(false)}>
            <CalendarModalMobile onClose={handleDateSelect} />
          </ModalMobile>
        )}

        {isMenuBarMobileOpen && (
          <ModalMobile isOpen={isMenuBarMobileOpen} onClose={toggleMenuBarMobile}>
            <MenuBarMobile
              isOpen={isMenuBarMobileOpen}
              closeModal={toggleMenuBarMobile}
              handleRowsChange={handleRowsChange}
            />
          </ModalMobile>
        )}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default BuscarNoticias;
