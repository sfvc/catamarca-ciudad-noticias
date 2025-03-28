import React from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";

// Initialize the QueryClient
const queryClient = new QueryClient();

const NoticiasHome = ({ filter, searchTerm }) => {
  const imageURL = "https://archivos-cc.sfo3.digitaloceanspaces.com/";

  // Function to fetch posts
  const fetchPosts = async () => {
    const response = await axios.get("https://noti.cc.gob.ar/api/posts");
    return response.data; // Return the entire response object
  };

  // Use useQuery hook to fetch data
  const { data, error, isLoading } = useQuery("posts", fetchPosts);

  // Handle loading and error states
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
              <div className="panel-body home-new m-b-1">
                <h3 className="home-new__h3">{news.title}</h3>
                <div className="icon-arrow-right text-primary">
                  <i className="fa fa-arrow-right"></i>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

const NoticiasHomeWithQueryClient = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NoticiasHome {...props} />
    </QueryClientProvider>
  );
};

export default NoticiasHomeWithQueryClient;
