const AccessItems = ({label, onClick, titulo, img, alt, itemMobile, itemDesk }) => {
  return (
    <li className={`${itemMobile} ${itemDesk}`} onClick={onClick}>
        <img src={img} alt={alt} width={36} />
        <p className="access-item__p">{titulo}</p>
        <small className="access-item__small">{label}</small>
    </li>
  );
};

export default AccessItems;
