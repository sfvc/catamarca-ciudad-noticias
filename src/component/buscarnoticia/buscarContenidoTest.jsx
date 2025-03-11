import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const BuscarContenidoTest = ({
  searchTerm,
  selectedCategory,
  selectedTags,
  first,
  rows,
  dateRange,
  sortedPosts,
}) => {
  const imageURL = "https://archivos-cc.sfo3.digitaloceanspaces.com/";

  // Function to fetch posts with filters applied
  const fetchPosts = async () => {
    const params = {
      searchTerm: searchTerm || "",
      selectedCategory: selectedCategory || [],
      selectedTags: selectedTags || [],
      first: first || 0,
      rows: rows || 10,
      startDate: dateRange?.startDate || "",
      endDate: dateRange?.endDate || "",
    };

    // Make the API request with query parameters
    const response = await axios.get("https://noti.cc.gob.ar/api/posts", { params });
    return response.data; // The response data should contain the posts
  };

  const { data, error, isLoading } = useQuery(
    ["posts", searchTerm, selectedCategory, selectedTags, first, rows, dateRange],
    fetchPosts
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Ensure that `data.data` is an array before trying to map over it
  const posts = data?.data || []; // Access the posts array

  // Modify the rendering of the date to ensure validity
  const paginatedPosts = posts.slice(first, first + rows);

  return (
    <section style={{ marginTop: "0.5rem", minHeight:"60dvh" }}>
      <div className="row panels-row ">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((news, index) => {
            // Check if news.date is valid before attempting to format it
            const formattedDate = news.date
              ? new Date(news.date)
              : null;

            const formattedDateString = formattedDate && !isNaN(formattedDate.getTime())
              ? formattedDate.toISOString().split("T")[0] // Get YYYY-MM-DD
              : "Invalid date"; // Fallback in case of an invalid date

            return (
              <div className="col-xs-12 col-sm-6 col-md-4" key={news.id || index}>
                <a href={`/noticiasmunicipales/${news.slug}`} className="panel panel-default">
                  <img
                    className="home-new__img"
                    src="/images/parquejumeal.webp"
                    alt={news.title}
                  />
                  <div className="panel-body home-new">
                    <h3 className="home-new__h3">{news.title}</h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <small style={{ color: "gray" }}>
                        {formattedDateString}
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

                    {news.tags && news.tags.length > 0 && (
                      <div className="post-tags">
                        <strong>Tags: </strong>
                        {news.tags.map((tag) => tag.name).join(", ")}
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
