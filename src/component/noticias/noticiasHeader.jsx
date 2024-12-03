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
              </div>

              {/* Excerpt */}
              <div className="news__lead">
                <p>{excerpt}</p>
              </div>

              {/* Featured Image */}
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
