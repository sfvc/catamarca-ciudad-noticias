import React from 'react';
import NoticiasHeader from './noticias/noticiasHeader';
import NoticiasMain from './noticias/noticiasMain';
import NoticiasTags from './noticias/noticiasTags';

const NoticiasPage = ({ noticias }) => {
  // Generating the tags dynamically

  return (
    <div className="region region-content container">
      <div id="block-system-main" className="block block-system clearfix">
        <article>
          <NoticiasHeader/>

          <section className="content_format">
            <div className="news">
              <NoticiasMain/>
              <NoticiasTags/>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default NoticiasPage;
