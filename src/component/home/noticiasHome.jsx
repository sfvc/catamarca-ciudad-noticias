import { useMemo } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { catamarcaApi } from "api/catamarcaApi";


const queryClient = new QueryClient();

const fetchNews = async () => {
  const { data } = await catamarcaApi.get(
    "/items/noticias?filter[destacado][_eq]=true&sort=-date_created&limit=3"
  );
  return data.data;
};

const NoticiasHome = () => {
  const { data: destacados = [], isLoading } = useQuery("noticiasDestacadas", fetchNews);

  const imagenes = useMemo(() => {
    const apiUrl = catamarcaApi.defaults.baseURL || "";
    return destacados.reduce((acc, item) => {
      if (item.imagen) acc[item.imagen] = `${apiUrl}/assets/${item.imagen}`;
      return acc;
    }, {});
  }, [destacados]);

  if (isLoading) return <p>Cargando noticias...</p>;

 
  return (
    <section>
      <div className="row panels-row">
        {destacados.map((news) => (
          <div className="col-xs-12 col-sm-6 col-md-4" key={news.id}>
            <a href={`/noticiasmunicipales/${news.id}`} className="panel panel-default">
              {imagenes[news.imagen] && (
                <img className="home-new__img" src={imagenes[news.imagen]} alt={news.titulo} />
              )}
              <div className="panel-body home-new m-b-1">
                <h3 className="home-new__h3">{news.titulo}</h3>
                <p>{news.subTitulo}</p>
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

const NoticiasHomeWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <NoticiasHome />
  </QueryClientProvider>
);

export default NoticiasHomeWithQueryClient;