import React, { useState, useEffect } from "react";

const BuscarContenidoTest = ({
  searchTerm,
  selectedCategory,
  selectedTags,
  first,
  rows,
  dateRange,
  sortedPosts

}) => {
  const imageURL = "https://archivos-cc.sfo3.digitaloceanspaces.com/";
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/data/post.json");
        const data = await response.json();
        setPosts(data.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Filter posts based on searchTerm, selectedCategory, selectedTags, and dateRange
  const filteredPosts = posts.filter((news) => {
    const matchesSearchTerm =
      news.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory.length > 0
        ? selectedCategory.some((category) =>
            news.categories.includes(category)
          )
        : true;

    const matchesTags =
      selectedTags.length > 0
        ? selectedTags.some((tag) => news.tags.includes(tag))
        : true;

    let matchesDateRange = true;
    if (dateRange) {
      const startDate = new Date(dateRange.startDate);
      const endDate = dateRange.endDate
        ? new Date(dateRange.endDate)
        : startDate; // If no endDate, treat it as the same date as startDate

      // Ensure startDate and endDate are valid before proceeding
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error("Invalid date range:", dateRange);
        return false; // Skip filtering if the date range is invalid
      }

      // Convert to YYYY-MM-DD format
      const normalizedStartDate = startDate.toISOString().split("T")[0]; // Get YYYY-MM-DD
      const normalizedEndDate = endDate.toISOString().split("T")[0]; // Get YYYY-MM-DD

      // Check if the news date is valid
      const normalizedNewsDate = new Date(news.date);
      if (isNaN(normalizedNewsDate.getTime())) {
        console.error("Invalid date format:", news.date);
        return false; // Skip this post if the date is invalid
      }
      
      const normalizedNewsDateString = normalizedNewsDate
        .toISOString()
        .split("T")[0]; // Get YYYY-MM-DD

      // Ensure we compare the normalized date strings
      if (normalizedStartDate === normalizedEndDate) {
        matchesDateRange = normalizedNewsDateString === normalizedStartDate;
      } else {
        matchesDateRange =
          normalizedNewsDateString >= normalizedStartDate &&
          normalizedNewsDateString <= normalizedEndDate;
      }
    }

    return (
      matchesSearchTerm &&
      matchesCategory &&
      matchesTags &&
      matchesDateRange
    );
  });

  const paginatedPosts = sortedPosts.slice(first, first + rows);

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error loading posts: {error.message}</div>;
  }

  return (
    <section style={{ marginTop: "0.5rem" }}>
      <div className="row panels-row">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((news, index) => (
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
                      {new Date(news.date).toISOString().split("T")[0]}{" "}
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
                      {news.tags.join(", ")}
                    </div>
                  )}
                </div>
              </a>
            </div>
          ))
        ) : (
          <div className="buscarcontenido-noencontrado">
            <img src="/images/buscarnoticias/novedades-lineal.svg" alt="" width={64}/>
            <h2 style={{color:'black'}}>Noticias no encontradas.</h2>
            <small>Ingresa el nombre correcto en el buscador o la fecha apropiada en el calendario.</small>
          </div>
        )}
      </div>
    </section>
  );
};

export default BuscarContenidoTest;
