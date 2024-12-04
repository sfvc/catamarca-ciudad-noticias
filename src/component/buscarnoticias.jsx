import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";  // Import necessary components
import NoticiasHome from "./home/noticiasHome";

// Create a QueryClient instance

const BuscarNoticias = () => {
    const queryClient = new QueryClient();
    const icons = Array.from({ length: 6 }, () => ({
        icono: "/images/buscarnoticias/calendar.svg"
    }));

  return (
    <QueryClientProvider client={queryClient}>  {/* Wrap with QueryClientProvider */}
      <div className="container p-t-1">
        <div className="buscarnoticias">
          <input type="text" placeholder="Buscar..." className="buscarnoticias__input" />
          <button className="buscarnoticias__button">Buscar</button>
        </div>

        <div className="buscarnoticias__list">
            {icons.map((icon, index) => (
                <button className="buscarnoticias__item" key={index}>
                    <img src={icon.icono} alt={`Icon ${index}`} width={36} />
                </button>
            ))}
        </div>

        <div className="buscarnoticias__container">
          <NoticiasHome /> {/* Render the NoticiasHome component */}
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default BuscarNoticias;
