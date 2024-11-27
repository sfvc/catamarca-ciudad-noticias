const NoticiasHome = () => {

    const newsPoncho = Array.from({ length: 16 }, (_, index) => ({
        titulo: `titulo ${index + 1}`,
        descripcion: `descripcion ${index + 1}`,
    }));

    return (
        <>
            <section>
                <h2 style={{textAlign:"center"}}>Noticias Generales</h2>
                <div className="row panels-row">
                    {/* Correcting the .map() syntax */}
                    {newsPoncho.map((news, index) => (
                        <div className="col-xs-12 col-sm-6 col-md-4" key={index}>
                            <a href="/tema/documentacion" className="panel panel-default">
                                <img src="/images/parquejumeal.webp" alt="" style={{ width: "100%" }} />
                                <div className="panel-body home-new m-b-1">
                                    <p className="h3">{news.titulo}</p>
                                    <p>{news.descripcion}</p>
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
