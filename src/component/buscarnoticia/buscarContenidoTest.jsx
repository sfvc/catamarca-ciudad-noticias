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
    const filter = {};
    if (searchTerm) {
      filter.titulo = { _icontains: searchTerm }; // Solo filtrar por título si searchTerm tiene valor
    }
    const { data } = await catamarcaApi.get("/items/noticias", {
      params: {
        filter, 
        deep: {
          etiquetas: {
            etiquetas_noticias: {
              id: {
                _in: tagIds // Filtra las noticias que tengan al menos una etiqueta en selectedTags
              }
            }
          }
        }
      }
    });
    console.log(data);
    return data.data;
  };

  const imageURL = "https://archivos-cc.sfo3.digitaloceanspaces.com/";
  const { data: noticias = [], error, isLoading } = useQuery(
    ["noticiasDestacadas", selectedTags,searchTerm], // Clave dinámica basada en selectedTags
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
                        {news.etiquetas.map((tag) => tag).join(", ")}
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
