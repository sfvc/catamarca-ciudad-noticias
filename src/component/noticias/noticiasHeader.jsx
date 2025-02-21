import React from 'react';

const NoticiasHeader = ({ title, excerpt, image }) => {
  return (
    <header>
      <div className="panel-pane pane-imagen-destacada">
        <div className="pane-content">
          <div className="row">
            <div className="col-md-12">
              {/* Title */}
              <div className="title-description">
                <h1>{title}</h1>
                <p>Se lanzó “Mi Capital Conecta”, la plataforma para conectar trabajadores de oficios con ciudadanos</p>
                <small>09 de Diciembre del 2025</small>
              </div>
              <div className="news__main-image-container" 
                   style={{ backgroundImage: `url(${image})` }} />
              </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NoticiasHeader;
