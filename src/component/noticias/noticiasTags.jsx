const NoticiasTags = () => {
    const tags = Array.from({ length: 25 }, (_, index) => ({
        img: "/images/tag.svg",
        tag: `tags para tener noticias organizadas${index + 1}`,
      }));

    return (
        <div className="news__tag">
            <section className="news_tag-section">
                <h2>Tags</h2>
            <ul className="news_tag-ul">
                {tags.map((tag, index) => (
                <li key={index} className="news_tag-li">
                    <a className="news_tag-a" href="/">
                    <img src={tag.img} alt="tag icon" />
                    <small>{tag.tag}</small>
                    </a>
                </li>
                ))}
            </ul>
            </section>
      </div>
    )
}

export default NoticiasTags;