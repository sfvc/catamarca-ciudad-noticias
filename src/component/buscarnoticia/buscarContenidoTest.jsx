import React from "react";
// import axios from "axios";
import { useQuery } from "react-query";
import { catamarcaApi } from "api/catamarcaApi";

const BuscarContenidoTest = ({
  searchTerm,
  selectedCategory,
  selectedTags,
  first,
  rows,
  dateRange,
  sortedPosts,
}) => {
  const fetchNews = async () => {
    const tagIds = selectedTags.map(tag => tag.id);
    const categoryIds = selectedCategory.map(category => category.id);
  
    const filter = {};
    
  
    if (searchTerm) {
      filter.titulo = { _icontains: searchTerm };
    }
  
    if (tagIds.length > 0) {
      filter.etiquetas = { _in: tagIds };
    }
  
    if (categoryIds.length > 0) {
      filter.categoria = { _in: categoryIds }; // CORRECTO
    }
  
    try {
      const { data } = await catamarcaApi.get("/items/noticias", {
        params: {
          filter,
          fields: "*,etiquetas.id,etiquetas.nombre,categoria.id,categoria.nombre"
        },
      });
      
      return data.data;
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  };

  const imageURL = "https://archivos-cc.sfo3.digitaloceanspaces.com/";
  const { data: noticias = [], error, isLoading } = useQuery(
    ["noticiasDestacadas", selectedTags, searchTerm, selectedCategory], // Clave dinámica basada en selectedTags
    fetchNews,
    {
      enabled: !!selectedTags, // Evita ejecutar si selectedTags es null o undefined
    }
  );


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  

  return (

    <section style={{ marginTop: "0.5rem", minHeight: "60dvh" }}>
      <div className="row panels-row ">
        {noticias.length > 0 ? (
          noticias.map((news, index) => {

            return (
              <div className="col-xs-12 col-sm-6 col-md-4" key={news.id || index}>
                <a href={`/noticiasmunicipales/${news.slug}`} className="panel panel-default">
                  <img
                    className="home-new__img"
                    src="/images/parquejumeal.webp"
                    alt={news.title}
                  />
                  <div className="panel-body home-new">
                    <h3 className="home-new__h3">{news.titulo}</h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <small style={{ color: "gray" }}>
                        {news.fecha}
                      </small>

                      <img
                        style={{ width: 36 }}
                        src="/images/buscarnoticias/arrowright.svg"
                        alt="arrow"
                      />
                    </div>

                    {news.categories && news.categories.length > 0 && (
                      <div className="post-categories">
                        <strong>Categories: </strong>
                        {news.categories.join(", ")}
                      </div>
                    )}

                    {news.etiquetas && news.etiquetas.length > 0 && (
                      <div className="post-tags">
                        <strong>Tags: </strong>
                        {news.etiquetas.map((tag) => tag.nombre).join(", ")}
                      </div>
                    )}
                  </div>
                </a>
              </div>
            );
          })
        ) : (
          <div className="buscarcontenido-noencontrado">
            <img src="/images/buscarnoticias/novedades-lineal.svg" alt="" width={64} />
            <h2 style={{ color: "black" }}>Noticias no encontradas.</h2>
            <small>Ingresa el nombre correcto en el buscador o la fecha apropiada en el calendario.</small>
          </div>
        )}
      </div>
    </section>
  );
};


export default BuscarContenidoTest;
