import { catamarcaApi } from 'api/catamarcaApi';
import React, { useEffect, useState } from 'react';

const NewsItem = ({ icon, title, description, link }) => {
  const defaultIcon = "https://images2.alphacoders.com/135/thumbbig-1350293.webp"; // Reemplaza con tu URL por defecto
  const backgroundImage = icon ? `url(${icon})` : `url(${defaultIcon})`;

  return (
    <a href={link} rel="noopener noreferrer">
      <div className="news-item" style={{ backgroundImage }}>
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
  
  const [items,setItems] = useState([])
  const [imagenes, setImagenes] = useState({});

  const cargarNoticias = async () =>{
    try {
      const {data} = await catamarcaApi.get("/items/noticias?sort=-date_created&limit=5")
   
      setItems(data.data)
      returnIcon(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const returnIcon = (data) => {
  
    const apiUrl = catamarcaApi.defaults.baseURL || "";

    const nuevasImagenes = data
      .filter((item) => item.imagen)
      .reduce((acc, item) => {
        acc[item.imagen] = `${apiUrl}/assets/${item.imagen}`;
        return acc;
      }, {});

    setImagenes(nuevasImagenes);
  };

  useEffect(()=>{
    cargarNoticias()
  },[])


  return (
    <div className="news-container">
      {items.map((item,index) => (
        <NewsItem
          key={index} // Use a unique key (link in this case) instead of index
          icon={imagenes[item.imagen]}
          title={item.titulo}
          description={item.descripcion}
          link={item.link}
          
        />
      ))}
    </div>
  );
};

export default MarqueeItems;
