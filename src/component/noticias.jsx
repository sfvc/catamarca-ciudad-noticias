import React, { useState } from 'react';
import NoticiasHeader from './noticias/noticiasHeader';
import NoticiasMain from './noticias/noticiasMain';
import NoticiasTags from './noticias/noticiasTags';
import NoticiasGaleria from './noticias/noticiasGaleria';

const NoticiasPage = ({ noticias }) => {
  const [isReading, setIsReading] = useState(false);

  // Function to handle the text-to-speech functionality
  const handleReadAloud = () => {
    const content = document.querySelector('.news').innerText; // Get the text content of the article section

    // If it's already reading, stop it
    if (isReading) {
      speechSynthesis.cancel(); // Stops the current speech
      setIsReading(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(content); // Create a new SpeechSynthesisUtterance
      utterance.lang = 'es-ES'; // Set the language (Spanish in this case)
      utterance.rate = 1; // Speed of the speech (1 is normal speed)
      utterance.pitch = 1; // Pitch of the speech (1 is normal pitch)

      // Speak the content
      speechSynthesis.speak(utterance);
      setIsReading(true); // Set the state to reading
    }
  };

  const { title, excerpt, content, image, tags } = noticias;
  const imgURL = 'https://archivos-cc.sfo3.digitaloceanspaces.com/';
  
  return (
    <div className="region region-content container">
      <button className="btn btn-warning" onClick={handleReadAloud}>
        {isReading ? 'Pausar lectura' : 'Leer automatico'}
      </button>
      <div id="block-system-main" className="block block-system clearfix">
        <article>
          {/* Pass the necessary data to NoticiasHeader */}
          <NoticiasHeader title={title} excerpt={excerpt} image={`${imgURL}${image}`} />
          
          <h2>Sección de Fotos</h2>
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
