import Marquee from "react-fast-marquee";
import NoticiasHome from "./home/noticiasHome";
import MarqueeItems from "./home/marquee";

const HomePage = () => {
    return (
      <div className="home-page container">
        
        {/* Search Bar */}
        <div className="home-page__search">
          <input type="text" placeholder="Buscar..." className="home-page__search-input" />
          <button className="home-page__search-button">Buscar</button>
        </div>
        {/* Categories Section */}
        <Marquee speed={30} pauseOnHover="true" gradient={true} gradientColor='white' gradientWidth={10}>
          <MarqueeItems icon= "/images/parquejumeal.webp"/>
        </Marquee>
        {/* News Grid Section */}
        <div className="parent">
            <a href="/noticias/1" className="div1 grid-item"> 
                <h3 className="home-page__news-title">Actividades en el Muse Historico y en el Museo virgen del valle</h3>
                <p className="home-page__news-description">Llega "Desafio Bella Vista", el Campeonato Provincial de montaña, aventura y trail</p>
                <img src="/images/link.svg" alt="link icon" className="link-icon" />

            </a>
            <a href="/noticias/1" className="div2 grid-item"> 
                <h3 className="home-page__news-title">Actividades en el Muse Historico y en el Museo virgen del valle</h3>
                <p className="home-page__news-description ">Descripción breve de la noticia 3.</p>
                <img src="/images/link.svg" alt="link icon" className="link-icon" />

            </a>
            <a href="/noticias/1" className="div3 grid-item"> 
                <h3 className="home-page__news-title">Noticia 3</h3>
                <p className="home-page__news-description ">Descripción breve de la noticia 3.</p>    
                <img src="/images/link.svg" alt="link icon" className="link-icon" />

            </a>
            <a href="/noticias/1" className="div4 grid-item"> 
                <h3 className="home-page__news-title">Noticia 3</h3>
                <p className="home-page__news-description ">Descripción breve de la noticia 3.</p>    
                <img src="/images/link.svg" alt="link icon" className="link-icon" />
            </a>
            <a href="/noticias/1" className="div5 grid-item"> 
                <h3 className="home-page__news-title">Noticia 3</h3>
                <p className="home-page__news-description ">Descripción breve de la noticia 3.</p>    
                <img src="/images/link.svg" alt="link icon" className="link-icon" />
            </a>
            <a href="/noticias/1" className="div6 grid-item"> 
                <h3 className="home-page__news-title">Noticia 3</h3>
                <p className="home-page__news-description home-page__news-description--card-grande">Descripción breve de la noticia 3. Descripción breve de la noticia 3.Descripción breve de la noticia 3.</p>    
                <img src="/images/link.svg" alt="link icon" className="link-icon" />
            </a>
        </div>
        {/* News Section */}
        <NoticiasHome />
  
      </div>
    );
  };
  
  export default HomePage;
  