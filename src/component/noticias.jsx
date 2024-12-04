import React from 'react';
import NoticiasHeader from './noticias/noticiasHeader';
import NoticiasMain from './noticias/noticiasMain';
import NoticiasTags from './noticias/noticiasTags';
import NoticiasGaleria from './noticias/noticiasGaleria';

const NoticiasPage = ({ noticias }) => {
  // Destructure the properties you need from the `noticias` object
  const { title, excerpt, content, image, tags } = noticias;
  const imgURL = 'https://archivos-cc.sfo3.digitaloceanspaces.com/';
  return (
    <div className="region region-content container">
      <div id="block-system-main" className="block block-system clearfix">
        
        <article>
          {/* Pass the necessary data to NoticiasHeader */}
          <NoticiasHeader title={title} excerpt={excerpt} image={`${imgURL}${image}`} />
          
          <h2>Seccion de Fotos</h2>
          <NoticiasGaleria/>
          <section className="content_format">
            <div className="news">
              {/* Pass the content to NoticiasMain */}
              <NoticiasMain content={content} />
              
              {/* Pass the tags to NoticiasTags */}
              <NoticiasTags tags={tags} />
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default NoticiasPage;
