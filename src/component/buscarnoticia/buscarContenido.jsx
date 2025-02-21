import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const BuscarContenido = ({ filter, searchTerm }) => {
  const imageURL = "https://archivos-cc.sfo3.digitaloceanspaces.com/";

  const fetchPosts = async () => {
    const response = await axios.get("https://noti.cc.gob.ar/api/posts");
    return response.data; // The entire response object
  };

  const { data, error, isLoading } = useQuery("posts", fetchPosts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Ensure that `data.data` is an array before trying to map over it
  const posts = data?.data || []; // Access the posts array

  // Filter posts based on the searchTerm
  const filteredPosts = posts.filter((news) =>
    news.title.toLowerCase().includes(searchTerm) // Case-insensitive filter
  );

  return (
    <section>
      <div className="row panels-row">
        {filteredPosts.map((news, index) => (
          <div className="col-xs-12 col-sm-6 col-md-4" key={index}>
            <a href={`/noticiasmunicipales/${news.slug}`} className="panel panel-default">
              <img
                className="home-new__img"
                src={`${imageURL}${news.image}`}
                alt={news.title}
              />
              <div className="panel-body home-new">
                <h3 className="home-new__h3">{news.title}</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                      <small style={{color:"gray"}}>10/10/2010</small>
                        <img
                            style={{ width: 36 }}
                            src="/images/buscarnoticias/arrowright.svg"
                            alt=""
                        />
                    </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuscarContenido;
