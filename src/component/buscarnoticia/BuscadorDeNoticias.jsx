import { useState } from "react";
import TagSelected from "./components/tagsSelected";
import { QueryClient, QueryClientProvider } from "react-query";
import BuscarContenidoTest from "./components/buscarContenidoTest";
import BuscarPaginado from "./components/buscarPaginado";
import FiltrosNoticias from "./components/FiltrosNoticias";

const queryClient = new QueryClient();
const BuscadorDeNoticias = () => {
    //Busqueda , Categorias y Etiquetas
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    //Paginado
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    //Filtros 
    const [sortDirection, setSortDirection] = useState(true)
    const [lastNews, setLastNews] = useState(false)

    const handleCategorySelect = (category) => {
        setSelectedCategories((prev) => {
            const updatedCategories = [...prev, category];
            return updatedCategories;
        });
    };

    const handleTagSelect = (tag) => {
        setSelectedTags((prev) => {
            const updatedTags = [...prev, tag];
            return updatedTags;
        });
    };
    const handleCategoryRemove = (category) => {
        setSelectedCategories(prev => prev.filter(item => item !== category));
    };

    const handleTagRemove = (tag) => {
        setSelectedTags(prev => prev.filter(item => item !== tag));
    };

    const onPageChange = (page) => setCurrentPage(page)
  
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <div className='container' style={{ minHeight: '60vh' }}>
                    <div className='buscarnoticias__input-items'>
                        <div className='buscarnoticias__input-search'>
                            <input
                                className='buscarnoticias__input'
                                type="text"
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value) }}
                                placeholder="Search for news..."
                            />
                            <button className='buscarnoticias__input-btn'>Buscar</button>
                        </div>
                        <FiltrosNoticias
                            sortDirection={sortDirection}
                            setSort={(e)=>setSortDirection(e)}
                            lastNews={lastNews}
                            setLast = {(e)=>setLastNews(e)}
                        />

                        <TagSelected
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
                        currentPage={currentPage}
                        setTotalPages={setTotalPages}
                        sortDirection={sortDirection}
                        lastNews={lastNews}
                    />

                    <div className='buscar-paginado__btnpaginado menu-bar__container'>
                        <BuscarPaginado
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                        />
                    </div>

                </div>
            </QueryClientProvider>

        </>
    )
}

export default BuscadorDeNoticias