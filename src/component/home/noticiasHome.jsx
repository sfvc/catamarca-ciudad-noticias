import { useQuery } from "react-query";
import axios from "axios";

const NoticiasHome = () => {
  
    // Define the base URL for images (replace with the actual base URL if necessary)
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

    return (
        <>
            <section>
                <h2 style={{ textAlign: "center" }}>Noticias Generales</h2>
                <div className="row panels-row">
                    {posts.map((news, index) => (
                        <div className="col-xs-12 col-sm-6 col-md-4" key={index}>
                            <a href={`/noticiasmunicipales/${news.slug}`} className="panel panel-default">
                                <img 
                                    className="home-new__img"
                                    src={`${imageURL}${news.image}`}
                                    alt={news.title} 
                                />
                                <div className="panel-body home-new m-b-1">
                                    <h3 className="home-new__h3">{news.title}</h3>
                                    <p className="home-new__p">{news.excerpt}</p>
                                    <div className="icon-arrow-right text-primary">
                                        <i className="fa fa-arrow-right"></i>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default NoticiasHome;
