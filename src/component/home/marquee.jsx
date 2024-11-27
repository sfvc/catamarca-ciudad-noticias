import React from 'react';

const NewsItem = ({ icon, title, description, link }) => {
  return (
      <a href={link} rel="noopener noreferrer">
        <div className="news-item" style={{ backgroundImage: `url(${icon})` }}>
            <div className="news-content">
                <div>
                    <h3 className="news-title">{title}</h3>
                    <p className="news-description">{description}</p>
                </div>
                <img src="/images/link.svg" alt="link icon" className="link-icon" />
            </div>
        </div>
      </a>
  );
};

const MarqueeItems = () => {
  // Correctly create the newsItems array
  const newsItems = Array.from({ length: 16 }, (_, index) => ({
    icon: "/images/parquejumeal.webp",
    title: `Noticia ${index + 1}`, // Added +1 to start titles from "Titulo 1"
    description: `Texto de descripcion de prueba para noticia Texto de descripcion de prueba para noticiaTexto de descripcion de prueba para noticia${index + 1}`, // Same here for better user experience
    link: `/noticias/${index + 1}` // Dynamically link to each item
  }));

  return (
    <div className="news-container">
      {newsItems.map((item) => (
        <NewsItem
          key={item.link} // Use a unique key (link in this case) instead of index
          icon={item.icon}
          title={item.title}
          description={item.description}
          link={item.link}
        />
      ))}
    </div>
  );
};

export default MarqueeItems;
