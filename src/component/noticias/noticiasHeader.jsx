const NoticiasHeader = () => {
    return (
        <header>
        <div className="panel-pane pane-imagen-destacada">
          <div className="pane-content">
              <div className="row">
                <div className="col-md-12">
                  {/* Title */}
                  <div className="title-description">
                    <h1>Titulo</h1>
                  </div>
                  {/* / Title */}

                  {/* Summary */}
                  <div className="news__lead">
                    <p>
                      La Agencia Nacional de Seguridad Vial brinda una serie de recomendaciones para una conducción segura
                      durante las lluvias que se esperan por la tormenta de Santa Rosa.
                    </p>
                  </div>
                  {/* / Summary */}

                  <div className="row">
                    {/* Published Date */}
                    <div className="col-md-6 col-sm-6 small news__time">
                      <time className="text-muted" dateTime="2024-08-29 15:50:47">
                        29 de agosto de 2024
                      </time>
                    </div>
                    {/* / Published Date */}

                    {/* Social Media Share */}
                    <div className="section-actions col-md-6 social-share news__social-share">
                      <ul className="list-inline">
                        <li>
                          <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.argentina.gob.ar%2Fnoticias%2Ftormenta-de-santa-rosa-cuales-son-las-recomendaciones-para-conducir-con-lluvia&amp;title=Tormenta+de+Santa+Rosa%3A+%C2%BFCu%C3%A1les+son+las+recomendaciones+para+conducir+con+lluvia%3F" target="_blank" rel="noopener noreferrer">
                            <span className="sr-only">Compartir en Facebook</span><i className="icono-arg-facebook-f-" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://twitter.com/share?url=https://www.argentina.gob.ar/noticias/tormenta-de-santa-rosa-cuales-son-las-recomendaciones-para-conducir-con-lluvia&amp;text=Tormenta de Santa Rosa: ¿Cuáles son las recomendaciones para conducir con lluvia?" target="_blank">
                            <span className="sr-only">Compartir en Twitter</span><i className="icono-arg-twitter-pajaro" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fwww.argentina.gob.ar%2Fnoticias%2Ftormenta-de-santa-rosa-cuales-son-las-recomendaciones-para-conducir-con-lluvia" target="_blank" rel="noopener noreferrer">
                            <span className="sr-only">Compartir en Linkedin</span><i className="icono-arg-linkedin-in" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://web.whatsapp.com/send?text=https%3A%2F%2Fwww.argentina.gob.ar%2Fnoticias%2Ftormenta-de-santa-rosa-cuales-son-las-recomendaciones-para-conducir-con-lluvia&amp;title=Tormenta+de+Santa+Rosa%3A+%C2%BFCu%C3%A1les+son+las+recomendaciones+para+conducir+con+lluvia%3F" target="_blank" id="linkWA1" rel="noopener noreferrer">
                            <span className="sr-only">Compartir en Whatsapp</span><i className="icono-arg-whatsapp-telefono" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://t.me/share/url?url=https%3A%2F%2Fwww.argentina.gob.ar%2Fnoticias%2Ftormenta-de-santa-rosa-cuales-son-las-recomendaciones-para-conducir-con-lluvia&amp;text=Tormenta+de+Santa+Rosa%3A+%C2%BFCu%C3%A1les+son+las+recomendaciones+para+conducir+con+lluvia%3F" target="_blank" id="linkTG1" rel="noopener noreferrer">
                            <span className="sr-only">Compartir en Telegram</span><i className="icono-arg-telegram-avion" aria-hidden="true"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* / Social Media Share */}
                  </div>
                </div>
              </div>
            {/* Featured Image */}
            <div className="news__main-image-container" style={{ backgroundImage: "url(https://www.argentina.gob.ar/sites/default/files/styles/jumbotron/public/2024/08/ansv_lluvia_control.jpg)" }} />
            {/* / Featured Image */}
          </div>
        </div>
      </header>
    )
}

export default NoticiasHeader;